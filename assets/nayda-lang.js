/* Avare Biotech — единый переключатель языков для Nayda (server-side перевод).
   Подключается на всех страницах: <script src="/assets/nayda-lang.js" defer></script>
   Куда вставлять переключатель: <div class="nayda-lang" data-ar="/ar"></div>
   data-ar — адрес арабской версии этой страницы (отдельная ручная страница, открывается в новой вкладке).
   Языки берутся из <html lang="xx">, который проставляет Nayda. Навигация — реальные переходы на /xx/<путь>. */
(function () {
  // Языки Nayda + AR (AR — отдельная ручная страница). Порядок: EN, PT, ES, AR, затем остальные.
  var LANGS = [
    ['en', 'EN'], ['pt', 'PT'], ['es', 'ES'], ['ar', 'AR'],
    ['af', 'AF'], ['ur', 'UR'], ['tr', 'TR'], ['de', 'DE'],
    ['fr', 'FR'], ['it', 'IT'], ['ru', 'RU']
  ];
  var NAYDA = ['en', 'pt', 'es', 'af', 'ur', 'tr', 'de', 'fr', 'it', 'ru']; // языки, которые даёт Nayda (без AR)

  function currentLang() {
    var h = (document.documentElement.getAttribute('lang') || '').toLowerCase().slice(0, 2);
    if (NAYDA.indexOf(h) !== -1) return h;
    var seg = (location.pathname.split('/').filter(Boolean)[0] || '').toLowerCase();
    if (NAYDA.indexOf(seg) !== -1 && seg !== 'en') return seg;
    return 'en';
  }

  // Строит путь /xx/<тот же путь>, убирая текущий языковой префикс. EN = корень.
  function langURL(code) {
    var parts = location.pathname.split('/').filter(Boolean);
    if (parts.length && NAYDA.indexOf(parts[0].toLowerCase()) !== -1 && parts[0].toLowerCase() !== 'en') {
      parts.shift();
    }
    var base = parts.join('/');
    if (code === 'en') return base ? '/' + base : '/';
    return base ? '/' + code + '/' + base : '/' + code + '/';
  }

  function go(code, arUrl) {
    if (code === 'ar') { window.open(arUrl || '/ar', '_blank'); return; } // AR — отдельная страница, новая вкладка
    window.location.href = langURL(code);
  }
  window.naydaGo = go; // можно дёргать из любых кнопок: onclick="naydaGo('de')"

  function injectCSS() {
    if (document.getElementById('nl-css')) return;
    var st = document.createElement('style');
    st.id = 'nl-css';
    st.textContent =
      '.nl{position:relative;display:inline-block;font-family:inherit;line-height:1;}' +
      '.nl-btn{font-family:inherit;font-size:14px;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:5px;padding:7px 12px;border-radius:8px;background:rgba(127,127,127,.14);border:1px solid rgba(127,127,127,.30);color:inherit;}' +
      '.nl-arr{font-size:9px;opacity:.55;}' +
      '.nl-menu{display:none;position:absolute;top:calc(100% + 6px);right:0;min-width:66px;max-height:62vh;overflow:auto;background:#1e1e1e;border:1px solid rgba(255,255,255,.12);border-radius:10px;padding:4px;box-shadow:0 8px 28px rgba(0,0,0,.45);z-index:2147483647;}' +
      '.nl.nl-open .nl-menu{display:block;}' +
      '.nl-opt{font-family:inherit;font-size:13px;font-weight:600;cursor:pointer;width:100%;text-align:center;padding:8px 14px;border:none;background:none;color:rgba(255,255,255,.6);border-radius:6px;display:block;white-space:nowrap;}' +
      '.nl-opt:hover{background:rgba(255,255,255,.08);color:#fff;}' +
      '.nl-opt.nl-active{color:#fff;font-weight:800;}';
    document.head.appendChild(st);
  }

  function build(el) {
    var arUrl = el.getAttribute('data-ar') || '/ar';
    var cur = currentLang();
    el.classList.add('nl');
    var html = '<button type="button" class="nl-btn">' + cur.toUpperCase() +
      ' <span class="nl-arr">&#9662;</span></button><div class="nl-menu">';
    for (var i = 0; i < LANGS.length; i++) {
      html += '<button type="button" class="nl-opt' + (LANGS[i][0] === cur ? ' nl-active' : '') +
        '" data-code="' + LANGS[i][0] + '">' + LANGS[i][1] + '</button>';
    }
    html += '</div>';
    el.innerHTML = html;
    var btn = el.querySelector('.nl-btn');
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = el.classList.contains('nl-open');
      document.querySelectorAll('.nl.nl-open').forEach(function (n) { n.classList.remove('nl-open'); });
      if (!open) el.classList.add('nl-open');
    });
    el.querySelectorAll('.nl-opt').forEach(function (o) {
      o.addEventListener('click', function (e) {
        e.stopPropagation();
        go(o.getAttribute('data-code'), arUrl);
      });
    });
  }

  function init() {
    injectCSS();
    document.querySelectorAll('.nayda-lang').forEach(build);
    document.addEventListener('click', function () {
      document.querySelectorAll('.nl.nl-open').forEach(function (n) { n.classList.remove('nl-open'); });
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
