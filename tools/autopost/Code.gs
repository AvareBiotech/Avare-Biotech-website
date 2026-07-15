/**********************************************************************
 *  AVARE — АВТОПОСТИНГ СТАТЕЙ  (Google Apps Script)
 *  ------------------------------------------------------------------
 *  Читает Google-доки из папки «На публикацию», забирает картинки,
 *  PDF и вложения-гугл-таблицы (attach-…), кладёт всё в GitHub
 *  (папка content/<slug>/), после чего перекладывает статью
 *  в «Опубликовано».
 *
 *  ВЛОЖЕНИЯ-ТАБЛИЦЫ: гугл-таблица с именем attach-<имя>[-<язык>]
 *  экспортируется в .xlsx и становится кнопкой скачивания.
 *  Примеры: attach-semen-log-en, attach-semen-log-pt, attach-semen-log
 *  Дальше GitHub Action сам собирает страницу, карточку и sitemap.
 *
 *  ЧТО НУЖНО СДЕЛАТЬ ОДИН РАЗ:
 *   1) Вставить токен GitHub в GITHUB_TOKEN ниже.
 *   2) Запустить testDryRun() — пробный прогон (ничего не меняет),
 *      проверить лог.
 *   3) Запустить setupDailyTrigger() — включить таймер раз в день.
 **********************************************************************/

// ======================= НАСТРОЙКИ =======================
var GITHUB_TOKEN        = 'токен';   // github_pat_...  (только в этом приватном скрипте)
var OWNER               = 'AvareBiotech';
var REPO                = 'Avare-Biotech-website';
var BRANCH              = 'main';
var INBOX_FOLDER_ID     = '1L88AeF1rwidkMyqwAdi0gsEy8k0YUlu6';      // «На публикацию»
var PUBLISHED_FOLDER_ID = '1o3BHsM1jII0V1xCG-08qSj1k-HKZ5Kgl';      // «Опубликовано»
var TZ                  = 'Europe/Moscow';
var ATTACH_PREFIX       = 'attach-';   // так помечаются вложения (гугл-таблицы)
var XLSX_MIME           = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
// =========================================================


/** Боевой запуск (его дёргает таймер). */
function runAutopost() {
  var inbox = DriveApp.getFolderById(INBOX_FOLDER_ID);
  var folders = inbox.getFolders();
  var count = 0;
  while (folders.hasNext()) {
    var f = folders.next();
    try {
      var r = processFolder(f, false);
      if (r) count++;
    } catch (e) {
      Logger.log('[ERROR] ' + f.getName() + ': ' + (e && e.message ? e.message : e));
    }
  }
  Logger.log('Готово. Опубликовано статей: ' + count);
}

/** ПРОБНЫЙ ПРОГОН — ничего не коммитит и не перемещает. Только показывает, что увидел. */
function testDryRun() {
  var inbox = DriveApp.getFolderById(INBOX_FOLDER_ID);
  var folders = inbox.getFolders();
  var any = false;
  while (folders.hasNext()) {
    any = true;
    var f = folders.next();
    try {
      processFolder(f, true);
    } catch (e) {
      Logger.log('[ERROR] ' + f.getName() + ': ' + (e && e.message ? e.message : e));
    }
  }
  if (!any) Logger.log('В папке «На публикацию» нет подпапок со статьями.');
  Logger.log('Пробный прогон завершён. НИЧЕГО не закоммичено и не перемещено.');
}

/** Установить таймер: каждый день ~07:00 по Москве. */
function setupDailyTrigger() {
  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (t.getHandlerFunction() === 'runAutopost') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('runAutopost')
    .timeBased().atHour(7).everyDays(1).inTimezone(TZ).create();
  Logger.log('Таймер создан: каждый день ~07:00 (' + TZ + ').');
}


// ===================== ОБРАБОТКА ОДНОЙ СТАТЬИ =====================

function processFolder(folder, dryRun) {
  var doc = findDoc(folder);
  if (!doc) { Logger.log('[skip] ' + folder.getName() + ': нет Google-документа'); return null; }

  var parsed = docToMarkdown(DocumentApp.openById(doc.getId()));
  // slug (адрес статьи) берём из ИМЕНИ ПАПКИ — он стабилен: можно менять заголовок,
  // и URL не поменяется (главное — не переименовывать саму папку).
  var slug = slugify(folder.getName());
  if (!slug) { Logger.log('[skip] ' + folder.getName() + ': не удалось получить адрес (slug) из имени папки'); return null; }

  var assets = collectAssets(folder);
  var hasPdf = assets.some(function (a) { return /\.pdf$/i.test(a.path); });
  var hasCover = assets.some(function (a) { return a.path.toLowerCase().indexOf('cover') === 0; });
  var attachN  = assets.filter(function (a) { return /\.xlsx$/i.test(a.path); }).length;
  var date = Utilities.formatDate(new Date(), TZ, 'yyyy-MM-dd');
  var md = '---\n' +
           'title: ' + parsed.title + '\n' +
           'category: ' + parsed.category + '\n' +
           'date: ' + date + '\n' +
           '---\n\n' + parsed.body + '\n';

  if (dryRun) {
    Logger.log('[DRY] папка="' + folder.getName() + '"  ->  slug=' + slug +
               '  | категория=' + parsed.category +
               '  | обложка=' + hasCover + '  | pdf=' + hasPdf + '  | таблиц=' + attachN +
               '  | файлы: ' + assets.map(function (a) { return a.path; }).join(', '));
    Logger.log('----- начало article.md -----\n' + md.substring(0, 600) + '\n----- ... -----');
    if (!hasCover) Logger.log('   ⚠ нет cover-... в папке — обложка не появится');
    return { slug: slug };
  }

  var sha = ghCommitArticle(slug, md, assets);
  Logger.log('[ok] ' + slug + ' — закоммичено (' + sha.substring(0, 7) + '), pdf=' + hasPdf);
  folder.moveTo(DriveApp.getFolderById(PUBLISHED_FOLDER_ID));
  return { slug: slug, commit: sha };
}

function findDoc(folder) {
  var it = folder.getFilesByType(MimeType.GOOGLE_DOCS);
  return it.hasNext() ? it.next() : null;
}

function collectAssets(folder) {
  var out = [];
  var files = folder.getFiles();
  while (files.hasNext()) {
    var f = files.next();
    var name = f.getName();            // сохраняем ОРИГИНАЛЬНОЕ (SEO) имя файла
    var low = name.toLowerCase();
    // cover-... / img1-... / img2-... (старые cover.jpg / img1.png тоже подходят)
    if (/^(cover|img\d+)([-_][a-z0-9_-]+)?\.(jpg|jpeg|png|webp|avif)$/.test(low)) {
      out.push({ path: name, blob: f.getBlob() });
    } else if (/\.pdf$/.test(low)) {     // любой PDF с описательным именем
      var bytes = f.getBlob().getBytes();
      if (isPdf(bytes)) out.push({ path: name, blob: f.getBlob() });
      else Logger.log('   ⚠ ' + name + ' не является настоящим PDF — пропущен');

    } else if (f.getMimeType() === MimeType.GOOGLE_SHEETS && low.indexOf(ATTACH_PREFIX) === 0) {
      // вложение-гугл-таблица: у неё нет расширения и нет обычного содержимого,
      // поэтому забираем её через export -> .xlsx
      var xb = exportSheetXlsx(f.getId(), name);
      if (xb) { out.push({ path: name + '.xlsx', blob: xb }); Logger.log('   + таблица ' + name + ' -> ' + name + '.xlsx'); }

    } else if (/\.xlsx$/.test(low) && low.indexOf(ATTACH_PREFIX) === 0) {
      // уже готовый .xlsx, загруженный в папку файлом
      out.push({ path: name, blob: f.getBlob() });
    }
  }
  return out;
}

/** Гугл-таблица -> .xlsx (getBlob() на Google-файлах отдаёт PDF, поэтому нужен export). */
function exportSheetXlsx(fileId, name) {
  var url = 'https://www.googleapis.com/drive/v3/files/' + fileId +
            '/export?mimeType=' + encodeURIComponent(XLSX_MIME);
  var res = UrlFetchApp.fetch(url, {
    headers: { Authorization: 'Bearer ' + ScriptApp.getOAuthToken() },
    muteHttpExceptions: true
  });
  if (res.getResponseCode() !== 200) {
    Logger.log('   ⚠ не удалось экспортировать таблицу "' + name + '" (' + res.getResponseCode() + '): ' +
               res.getContentText().substring(0, 200));
    return null;
  }
  return res.getBlob().setName(name + '.xlsx');
}

function isPdf(bytes) {
  return bytes && bytes.length > 4 &&
         bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46; // %PDF
}


// ===================== GOOGLE DOC -> MARKDOWN =====================

function docToMarkdown(doc) {
  var body = doc.getBody();
  var n = body.getNumChildren();
  var title = null, category = 'Guide', lines = [], gotTitle = false;

  for (var i = 0; i < n; i++) {
    var el = body.getChild(i);
    var type = el.getType();

    if (type === DocumentApp.ElementType.PARAGRAPH) {
      var p = el.asParagraph();
      var h = p.getHeading();
      var t = p.getText();
      var tt = t.trim();

      if (h === DocumentApp.ParagraphHeading.HEADING1 && !gotTitle) {
        title = tt; gotTitle = true; continue;
      }
      if (tt.toLowerCase().indexOf('category:') === 0) {
        category = tt.substring(tt.indexOf(':') + 1).trim() || 'Guide'; continue;
      }
      if (h === DocumentApp.ParagraphHeading.HEADING2)      lines.push('## '  + tt);
      else if (h === DocumentApp.ParagraphHeading.HEADING3) lines.push('### ' + tt);
      else if (tt === '')                                   lines.push('');
      else                                                  lines.push(inlineMd(p.editAsText()));

    } else if (type === DocumentApp.ElementType.LIST_ITEM) {
      lines.push('- ' + inlineMd(el.asListItem().editAsText()));

    } else if (type === DocumentApp.ElementType.TABLE) {
      lines.push(tableToMd(el.asTable()));
      lines.push('');
    }
  }

  var bodyMd = lines.join('\n').replace(/\n{3,}/g, '\n\n').replace(/^\n+|\n+$/g, '');
  return { title: title || 'Untitled', category: category, body: bodyMd };
}

/** Текст абзаца -> markdown, сохраняя **жирный** и *курсив*. */
function inlineMd(textEl) {
  var s = textEl.getText();
  if (!s) return '';
  var idx = textEl.getTextAttributeIndices();
  if (!idx || !idx.length) return s;
  var out = '';
  for (var i = 0; i < idx.length; i++) {
    var start = idx[i];
    var end = (i + 1 < idx.length) ? idx[i + 1] : s.length;
    var chunk = s.substring(start, end);
    if (chunk.trim()) {
      if (textEl.isBold(start))        chunk = '**' + chunk + '**';
      else if (textEl.isItalic(start)) chunk = '*' + chunk + '*';
    }
    out += chunk;
  }
  // склеить соседние одинаковые маркеры: **a****b** -> **ab**
  out = out.replace(/\*\*\*\*/g, '').replace(/(?<!\*)\*\*(?!\*)/g, '**');
  return out;
}

function tableToMd(tbl) {
  var lines = [];
  var rows = tbl.getNumRows();
  for (var r = 0; r < rows; r++) {
    var row = tbl.getRow(r);
    var cells = [];
    for (var c = 0; c < row.getNumCells(); c++) {
      cells.push(row.getCell(c).getText().replace(/\n/g, ' ').trim());
    }
    lines.push('| ' + cells.join(' | ') + ' |');
    if (r === 0) {
      lines.push('| ' + cells.map(function () { return '---'; }).join(' | ') + ' |');
    }
  }
  return lines.join('\n');
}


// ===================== SLUG =====================

function slugify(s) {
  var base = String(s).toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  if (base.length > 80) {            // длинный заголовок — режем по границе слова
    base = base.substring(0, 80);
    var cut = base.lastIndexOf('-');
    if (cut > 40) base = base.substring(0, cut);
  }
  return base.replace(/-+$/g, '');
}


// ===================== GITHUB (один атомарный коммит на статью) =====================

function ghCommitArticle(slug, articleMd, assets) {
  var base = 'https://api.github.com/repos/' + OWNER + '/' + REPO + '/git';

  // блобы (файлы) загружаем один раз — они не зависят от состояния ветки
  var tree = [];
  var mdBlob = ghReq('POST', base + '/blobs', {
    content: Utilities.base64Encode(articleMd, Utilities.Charset.UTF_8),
    encoding: 'base64'
  });
  tree.push({ path: 'content/' + slug + '/article.md', mode: '100644', type: 'blob', sha: mdBlob.sha });
  for (var i = 0; i < assets.length; i++) {
    var b = ghReq('POST', base + '/blobs', {
      content: Utilities.base64Encode(assets[i].blob.getBytes()),
      encoding: 'base64'
    });
    tree.push({ path: 'content/' + slug + '/' + assets[i].path, mode: '100644', type: 'blob', sha: b.sha });
  }

  // коммит + обновление ветки: берём СВЕЖУЮ голову ветки и при гонке (422) повторяем
  var lastErr = null;
  for (var attempt = 0; attempt < 5; attempt++) {
    var ref = ghReq('GET', base + '/refs/heads/' + BRANCH);
    var baseCommitSha = ref.object.sha;
    var baseCommit = ghReq('GET', base + '/commits/' + baseCommitSha);
    var newTree = ghReq('POST', base + '/trees', { base_tree: baseCommit.tree.sha, tree: tree });
    var newCommit = ghReq('POST', base + '/commits', {
      message: 'Add article: ' + slug,
      tree: newTree.sha,
      parents: [baseCommitSha]
    });
    var res = ghReqRaw('PATCH', base + '/refs/heads/' + BRANCH, { sha: newCommit.sha });
    if (res.code >= 200 && res.code < 300) return newCommit.sha;
    lastErr = 'PATCH ' + res.code + ': ' + res.body.substring(0, 200);
    if (res.code === 422) { Utilities.sleep(1500); continue; } // ветка ушла вперёд — берём свежую голову и повторяем
    throw new Error('GitHub ' + lastErr);
  }
  throw new Error('GitHub не удалось обновить ветку после нескольких попыток: ' + lastErr);
}

function ghReq(method, url, payload) {
  var res = ghReqRaw(method, url, payload);
  if (res.code < 200 || res.code >= 300) {
    throw new Error('GitHub ' + method + ' ' + res.code + ': ' + (res.body ? res.body.substring(0, 300) : ''));
  }
  return res.body ? JSON.parse(res.body) : {};
}

function ghReqRaw(method, url, payload) {
  var opt = {
    method: method,
    headers: {
      Authorization: 'token ' + GITHUB_TOKEN,
      Accept: 'application/vnd.github+json',
      'User-Agent': 'avare-autopost'
    },
    muteHttpExceptions: true
  };
  if (payload) { opt.contentType = 'application/json'; opt.payload = JSON.stringify(payload); }
  var resp = UrlFetchApp.fetch(url, opt);
  return { code: resp.getResponseCode(), body: resp.getContentText() };
}