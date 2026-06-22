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
    ['fr', 'FR'], ['it', 'IT'], ['ru', 'RU'],
    ['hi', 'HI'], ['ja', 'JA'], ['zh', 'ZH'], ['el', 'EL']
  ];
  var NAYDA = ['en', 'pt', 'es', 'af', 'ur', 'tr', 'de', 'fr', 'it', 'ru', 'hi', 'ja', 'zh', 'el']; // языки, которые даёт Nayda (без AR)

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
      '.nl{position:relative;display:inline-block;flex-shrink:0;}' +
      '.nl-btn{font-family:"Satoshi",sans-serif;font-size:clamp(14px,1.1vw,18px);font-weight:500;color:#fff;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);border-radius:8px;padding:6px 10px;cursor:pointer;display:flex;align-items:center;gap:6px;}' +
      '.nl-arr{font-size:13px;color:rgba(255,255,255,0.5);transition:transform .2s;line-height:1;}' +
      '.nl.nl-open .nl-arr{transform:rotate(180deg);}' +
      '.nl-menu{display:none;position:absolute;top:calc(100% + 8px);right:0;background:#1a1a1a;border:1px solid rgba(255,255,255,0.1);border-radius:8px;overflow:hidden;overflow-y:auto;min-width:132px;max-height:62vh;z-index:10000;}' +
      '.nl.nl-open .nl-menu{display:grid;grid-template-columns:1fr 1fr;}' +
      '.nl-opt{font-family:"Satoshi",sans-serif;font-size:clamp(12px,0.9vw,15px);font-weight:500;color:#888;background:none;border:none;padding:8px 14px;width:100%;text-align:left;cursor:pointer;white-space:nowrap;display:block;}' +
      '.nl-opt:hover,.nl-opt.nl-active{color:#fff;background:rgba(255,255,255,0.06);}';
    document.head.appendChild(st);
  }

  function build(el) {
    var arUrl = el.getAttribute('data-ar') || '/ar';
    var cur = currentLang();
    el.classList.add('nl');
    var html = '<button type="button" class="nl-btn">' + cur.toUpperCase() +
      ' <span class="nl-arr">&#9660;</span></button><div class="nl-menu">';
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
