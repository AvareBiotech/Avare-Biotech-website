import html, json, datetime

CSS = open('css_learn', encoding='utf-8').read()
OVERRIDES = """
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; background: #020202; }
.av-lang__dropdown { display: none; }
.av-lang.open .av-lang__dropdown { display: grid; grid-template-columns: 1fr 1fr; }
.nav-lang-mob button { flex: none; }
@media (max-width: 640px) {
  .learn-nav-pill.mobile-open .nav-lang-mob { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
}
#casesOverlay.open { display: flex !important; }
.av-case-card:hover { background: rgba(162,168,132,0.1) !important; border-color: rgba(162,168,132,0.3) !important; }
.learn-crumbs { display:flex; flex-wrap:wrap; align-items:center; gap:8px; font-family:'Satoshi',sans-serif; font-size:13px; margin-bottom:18px; }
.learn-crumbs a { color:rgba(246,246,246,0.55); text-decoration:none; transition:color .2s; }
.learn-crumbs a:hover { color:var(--accent); }
.learn-crumbs__sep { color:rgba(246,246,246,0.3); }
.learn-crumbs__cur { color:rgba(246,246,246,0.75); }
@media (max-width: 640px) { #casesOverlay [data-cases-grid] { grid-template-columns: 1fr !important; } }
.carousel-arrow { border-radius: 50% !important; }
.carousel-arrow svg { width: 18px; height: 18px; display: block; }
.learn-card-tags .tag { display: inline-block; font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; font-weight: 700; padding: 4px 10px; border-radius: 4px; margin-bottom: 0; }
.tag-guide, .tag-case, .tag-protocol { background: rgba(162,168,132,0.12); color: var(--accent); }
.tag-articles { background: rgba(162,168,132,0.22); color: var(--accent); }
.learn-card-dl{background:transparent;color:var(--text);border:1px solid var(--border);}
"""
LIGHT_THEME = r"""
/* ===== THEME TOGGLE ===== */
.learn-nav .learn-nav-logo{margin-right:auto}
.learn-nav .theme-toggle{margin-left:10px}
.theme-toggle{display:inline-flex;align-items:center;justify-content:center;width:38px;height:38px;border-radius:9px;cursor:pointer;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);color:#F6F6F6;flex-shrink:0;transition:background .2s,color .2s,border-color .2s;padding:0}
.theme-toggle:hover{background:rgba(255,255,255,0.14)}
.theme-toggle .tt-moon{display:none}.theme-toggle .tt-sun{display:block}
html.light .theme-toggle .tt-sun{display:none}html.light .theme-toggle .tt-moon{display:block}
html.light .theme-toggle{background:rgba(0,0,0,0.05);border-color:rgba(0,0,0,0.12);color:#1A1A1A}
html.light .theme-toggle:hover{background:rgba(0,0,0,0.09)}
.learn-nav-logo .logo-dark{display:none}
html.light .learn-nav-logo .logo-white{display:none}
html.light .learn-nav-logo .logo-dark{display:block}

/* ===== LIGHT THEME ===== */
html.light{--bg:#F5F5F4;--text:#1A1A1A;--surface:#FFFFFF;--border:#E3E1DB;--muted:#5F5F5A;--accent:#57624A}
html.light body,html.light .learn-page{background:#F5F5F4 !important;color:#1A1A1A}
html.light{color-scheme:light}

/* NAVBAR (внешняя панель .learn-nav — она была тёмной) */
html.light .learn-nav{background:#F5F5F4 !important;border-bottom:1px solid rgba(0,0,0,0.07)}
html.light .learn-nav-pill a,html.light .nav-kb{color:#1A1A1A !important}
html.light .learn-nav-pill a:hover{color:#57624A !important;background:rgba(0,0,0,0.05) !important}
html.light .learn-nav-pill .nav-kb{background:rgba(0,0,0,0.06) !important}
html.light .learn-nav-pill .sep{background:rgba(0,0,0,0.12) !important}
html.light .learn-nav-pill.mobile-open{background:rgba(245,245,244,0.98) !important}
html.light .learn-burger span{background:#1A1A1A !important}

/* lang switcher */
html.light .av-lang__toggle{background:rgba(0,0,0,0.05) !important;color:#1A1A1A !important;border-color:rgba(0,0,0,0.12) !important}
html.light .av-lang__toggle .av-lang__arrow{color:#1A1A1A !important}
html.light .av-lang__dropdown{background:#FFFFFF !important;border-color:rgba(0,0,0,0.1) !important;box-shadow:0 8px 32px rgba(0,0,0,0.12)}
html.light .av-lang__opt{color:#5F5F5A !important}
html.light .av-lang__opt:hover,html.light .av-lang__opt.active{background:rgba(0,0,0,0.05) !important;color:#1A1A1A !important}
html.light .nav-lang-mob button{background:rgba(0,0,0,0.05) !important;color:#5F5F5A !important;border-color:rgba(0,0,0,0.12) !important}
html.light .nav-lang-mob button.active{background:#1A1A1A !important;color:#FFF !important}

/* hero + crumbs + tag + date */
html.light .learn-hero h1{color:#141414 !important}
html.light .learn-crumbs a{color:rgba(20,20,20,0.6) !important}
html.light .learn-crumbs__cur{color:rgba(20,20,20,0.85) !important}
html.light .learn-crumbs__sep{color:rgba(20,20,20,0.3) !important}
html.light .learn-date{color:#6B6B66 !important}
html.light .tag-guide,html.light .tag-case,html.light .tag-protocol,html.light .tag-articles{background:rgba(87,98,74,0.15) !important;color:#4A5340 !important}

/* content */
html.light .learn-content,html.light .learn-content p,html.light .learn-content li,html.light .learn-content h2,html.light .learn-content h3,html.light .learn-content h4,html.light .learn-content strong,html.light .learn-content blockquote{color:#20201E !important}
html.light .learn-content h2,html.light .learn-content h3{color:#141414 !important}
html.light .learn-content a{color:#57624A !important}
html.light .learn-content blockquote{border-left-color:#57624A !important;background:rgba(87,98,74,0.06) !important;color:#3A3A38 !important}
html.light .learn-content code,html.light .learn-content pre{background:rgba(0,0,0,0.05) !important;color:#20201E !important}
html.light .learn-content table th{background:rgba(0,0,0,0.05) !important;color:#141414 !important}
html.light .learn-content table td,html.light .learn-content table th{border-color:rgba(0,0,0,0.12) !important}
html.light .learn-content hr,html.light .learn-divider{border-color:rgba(0,0,0,0.1) !important;background:rgba(0,0,0,0.1) !important}

/* carousel */
html.light .learn-others-title{color:#141414 !important}
html.light .carousel-card{background:#FFFFFF !important;border-color:rgba(0,0,0,0.08) !important;box-shadow:0 2px 14px rgba(0,0,0,0.06)}
html.light .carousel-card *{color:#20201E !important}
html.light .carousel-card .tag{color:#4A5340 !important}
html.light .carousel-arrow{background:#FFFFFF !important;border-color:rgba(0,0,0,0.12) !important;color:#1A1A1A !important}

/* footer -> #F5F5F4, стор-кнопки ОСТАЮТСЯ тёмными (белый текст + белый эппл) */
html.light .av-footer-main,html.light .av-footer{background:#F5F5F4 !important;border-color:rgba(0,0,0,0.07) !important;color:#3A3A38}
html.light .av-footer-main__title{color:#141414 !important}
html.light .av-footer-main a,html.light .av-footer a,html.light .av-footer-main__col,html.light .av-footer-main__col *{color:#3A3A38 !important}
html.light .av-footer-main__store-btn{background:rgba(0,0,0,0.05) !important;color:#1A1A1A !important;border-color:rgba(0,0,0,0.12) !important}
html.light .av-footer-main__store-btn *{color:#1A1A1A !important}
html.light .av-footer-main__store-btn:hover{background:rgba(0,0,0,0.09) !important}
/* только иконка яблока (белая) -> тёмная, чтобы была видна на светлой кнопке; Google Play остаётся цветной */
html.light .av-footer-main__store-btn img[src*="apple"]{filter:brightness(0)}

/* faq + modals */
html.light .av-faq-popup,html.light .av-video-popup,html.light .av-protocol-popup,html.light .av-pdf-wrap{background:#FFFFFF !important;color:#1A1A1A}
html.light .av-faq-title,html.light .av-video-title,html.light .av-protocol-title,html.light .av-video-label{color:#141414 !important}
html.light .av-faq-item{background:rgba(0,0,0,0.03) !important;border-color:rgba(0,0,0,0.08) !important}
html.light .av-faq-question{color:#1A1A1A !important}
html.light .av-faq-question:hover{background:rgba(0,0,0,0.04) !important}
html.light .av-faq-answer{color:#4A4A47 !important}
html.light .av-faq-close,html.light .av-video-close,html.light .av-protocol-close,html.light .av-pdf-close{background:rgba(0,0,0,0.06) !important;color:#1A1A1A !important}
/* светлая тема: читаемый текст в карточках карусели, модалках протокола/кейсов */
html.light .carousel-track .learn-card{background:#FFFFFF !important;border-color:rgba(0,0,0,0.08) !important}
html.light .learn-card:hover{border-color:rgba(0,0,0,0.22) !important}
html.light .learn-card-meta,html.light .learn-card-date{color:#6B6B66 !important}
html.light .av-protocol-file{background:rgba(0,0,0,0.03) !important;border-color:rgba(0,0,0,0.08) !important}
html.light .av-protocol-file-name{color:#3A3A38 !important}
html.light .av-protocol-file-btn{color:#1A1A1A !important;background:rgba(0,0,0,0.06) !important;border-color:rgba(0,0,0,0.12) !important}
html.light .av-protocol-file-btn:hover{background:rgba(0,0,0,0.1) !important}
html.light .av-case-card{background:rgba(0,0,0,0.03) !important;border-color:rgba(0,0,0,0.1) !important}
html.light .av-case-card span:not([style*="D32F2F"]){color:#3A3A38 !important}
html.light .learn-lock-label{color:#4A5340 !important}
html.light .learn-download-btn{background:#1A1A1A !important;color:#FFFFFF !important}
/* попап скачивания: светлая плашка, тёмная кнопка-крестик с белым крестиком, белый текст на кнопках */
html.light .learn-modal{background:#FFFFFF !important;border-color:rgba(0,0,0,0.1) !important}
html.light .learn-modal-header{border-bottom-color:rgba(0,0,0,0.08) !important}
html.light .learn-modal-title{color:#141414 !important}
html.light .learn-modal-close{background:#1A1A1A !important;color:#FFFFFF !important;border-color:rgba(0,0,0,0.2) !important}
html.light .learn-modal-close:hover{background:#000000 !important;color:#FFFFFF !important}
html.light .learn-lock-form{background:#F5F5F4 !important}
html.light .learn-lock-form p{color:#5F5F5A !important}
html.light .learn-lock-form input{background:#FFFFFF !important;border-color:rgba(0,0,0,0.15) !important;color:#1A1A1A !important}
html.light .learn-lock-submit{background:#1A1A1A !important;color:#FFFFFF !important}
html.light .learn-success-msg{color:#141414 !important}
html.light .learn-success-detail{color:#4A4A47 !important}
/* кнопки в карточках карусели: Read — чёрная с белым текстом; Download — белая с тёмной рамкой */
html.light .learn-card-read{background:#1A1A1A !important;color:#FFFFFF !important}
html.light .learn-card-dl{background:#FFFFFF !important;color:#1A1A1A !important;border:1px solid rgba(0,0,0,0.25) !important}
"""

THEME_JS = r"""(function(){var KEY='avare-theme';var root=document.documentElement;
try{if(localStorage.getItem(KEY)==='light')root.classList.add('light');}catch(e){}
function bind(){var b=document.getElementById('themeToggle');if(!b)return;
b.addEventListener('click',function(){root.classList.toggle('light');
try{localStorage.setItem(KEY,root.classList.contains('light')?'light':'dark');}catch(e){}});}
if(document.readyState!=='loading')bind();else document.addEventListener('DOMContentLoaded',bind);})();"""

CSS_ALL = CSS + "\n" + OVERRIDES + "\n" + LIGHT_THEME

LEARN_SCRIPT = "https://script.google.com/macros/s/AKfycbwuKsYVg_3x3RbBnxY0RUlFjE4tldmErUWRddqPDXg4xQxsOqqT19wTeGsxRqcW5jyK/exec"
RAW = "https://raw.githubusercontent.com/AvareBiotech/Avare-Biotech-website/main/assets/media"
LANGS = [("en","EN"),("pt","PT"),("es","ES"),("ar","AR"),("af","AF"),("ur","UR"),("tr","TR"),("de","DE"),("fr","FR"),("it","IT"),("hi","HI"),("ja","JA"),("zh","ZH"),("el","EL")]
PROTO_EN = RAW+"/qa-protocols/02_Semen_QA_Protocol_Avare_Biotech_en.pdf"
PROTO_PT = RAW+"/qa-protocols/01_Protocolo_QA_semen_Avare_Biotech_pt.pdf"
FAQ = [
 ("What is MAKSA?","MAKSA (Mobile Assisted Key Semen Analysis) is a smartphone app that analyzes livestock semen quality using AI. It measures total motility, progressive motility, and concentration without expensive CASA equipment."),
 ("How accurate is MAKSA compared to CASA?","MAKSA achieves a correlation of r > 0.90 with traditional CASA systems, validated across 500K+ labeled cells over 3 years of R&D."),
 ("What equipment do I need?","You only need a smartphone and a basic microscope. No servers, no expensive hardware, no consumables required."),
 ("Which species are supported?","MAKSA is validated for 5 species: cattle, horses, sheep, goats, and camels."),
 ("Is there a free trial?","Yes, we offer 10 free tests to get started. Contact us for a demo and early adopter discounts of up to 50% off."),
 ("Which microscopes are compatible with MAKSA?","Any standard bright-field microscope at 100-200x magnification. Phase contrast microscopes are not compatible."),
 ("What affects the accuracy of results?","Video quality is the key factor. Unstable footage, incorrect magnification, or wrong dilution factor reduce accuracy."),
 ("Can MAKSA be used for post-thaw semen checks?","Yes, MAKSA delivers results in 30-60 seconds right in the field."),
 ("I already evaluate semen under a microscope - why do I need MAKSA?","Subjective evaluation is not reproducible. MAKSA generates a timestamped PDF report that protects you in any dispute."),
 ("How accurate is concentration measurement?","Motility is the primary indicator - MAKSA measures it with r > 0.90 correlation vs CASA."),
 ("We already have CASA - why would we need this?","MAKSA goes where CASA can't - into the field, onto the farm, to technicians without lab infrastructure."),
]

E = html.escape
def fmt_date(iso):
    try: d=datetime.date.fromisoformat(iso); return d.strftime("%B %-d, %Y")
    except: return iso

def lang_href(code, slug):
    if code=="ar": return "/ar"
    if code=="en": return "/learn/"+slug
    return "/"+code+"/learn/"+slug

def sec_html(s):
    out="<div>"
    if s.get("heading"): out+="<h2>"+E(s["heading"])+"</h2>"
    if s.get("items"): out+="<ul>"+"".join("<li>"+E(i)+"</li>" for i in s["items"])+"</ul>"
    if s.get("paragraph"): out+="<p>"+E(s["paragraph"])+"</p>"
    return out+"</div>"

def single_pdf(a):
    return a.get("pdfUrl") or (RAW+"/learn-pdf/"+a["slug"]+".pdf")

def modal_html(prefix, a):
    pdfs=a.get("pdfs") or []
    if pdfs:
        succ='<p class="learn-success-detail" style="margin-bottom:12px">Choose your language:</p>'
        for p in pdfs:
            succ+='<button class="learn-lock-submit" style="margin-bottom:8px" data-dl="'+p["url"]+'">&darr; '+E(p["label"])+'</button>'
        single_attr=""
    else:
        sp=single_pdf(a)
        succ='<p class="learn-success-detail" style="margin-bottom:16px">Your PDF is downloading. If it did not start, <a href="'+sp+'" target="_blank" rel="noopener" style="color:var(--accent);text-decoration:underline">click here</a>.</p><button class="learn-lock-submit" data-dl="'+sp+'">Download PDF</button>'
        single_attr=' data-single="'+sp+'"'
    return ('<div class="learn-modal-overlay" id="'+prefix+'Overlay"><div class="learn-modal">'
      '<div class="learn-modal-header"><div class="learn-modal-title">'+E(a["downloadTitle"])+'</div>'
      '<button class="learn-modal-close" data-close="'+prefix+'Overlay">&#10005;</button></div>'
      '<div class="learn-modal-body"><div class="learn-lock-form">'
      '<div id="'+prefix+'Form">'
      '<div class="learn-lock-label">&darr; Download — enter your email</div>'
      '<p>'+E(a["downloadDescription"])+'</p>'
      '<input type="email" id="'+prefix+'Email" placeholder="Email address"/>'
      '<button class="learn-lock-submit" data-submit="'+prefix+'">Download PDF</button>'
      '</div>'
      '<div id="'+prefix+'Success"'+single_attr+' style="display:none">'
      '<p class="learn-success-msg">&#10003; Subscribed!</p>'+succ+'</div>'
      '</div></div></div></div>')

JS = open('page_js.js', encoding='utf-8').read()
import json as _json
CASES = _json.load(open('cases.json', encoding='utf-8'))
def cases_popup_html():
    OV='display:none;position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.7);z-index:99999;align-items:center;justify-content:center;backdrop-filter:blur(4px);'
    BOX='background:linear-gradient(135deg,#1e1e1e,#2a2a2a);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:32px;width:1100px;max-width:calc(100vw - 80px);position:relative;font-family:Satoshi,sans-serif;max-height:80vh;display:flex;flex-direction:column;overflow:hidden;box-sizing:border-box;'
    CLOSE='position:absolute;top:16px;right:16px;width:32px;height:32px;border-radius:8px;background:rgba(255,255,255,0.08);border:none;color:#fff;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;'
    TTL='font-size:20px;font-weight:700;color:#F6F6F6;margin-bottom:24px;'
    SCROLL='overflow-y:auto;overflow-x:hidden;flex:1;display:flex;flex-direction:column;gap:24px;'
    LBL='font-size:15px;font-weight:600;color:#A2A884;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:8px;'
    GRID='display:grid;grid-template-columns:repeat(2,1fr);gap:8px;'
    CARD='background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:6px;padding:8px 10px;cursor:pointer;display:flex;flex-direction:column;gap:4px;min-width:0;overflow:hidden;'
    BADGE='display:inline-block;font-size:13px;font-weight:700;color:#FFFFFF;padding:1px 6px;border-radius:3px;width:fit-content;background:#D32F2F;flex-shrink:0;'
    NAME='font-size:13px;color:rgba(246,246,246,0.7);line-height:1.3;overflow:hidden;text-overflow:ellipsis;'
    cards=""
    for name, raw in CASES:
        cards+=('<div class="av-case-card" data-view="'+raw+'" style="'+CARD+'">'
                '<span style="'+BADGE+'">PDF</span>'
                '<span style="'+NAME+'">'+E(name)+'</span></div>')
    return ('<div id="casesOverlay" style="'+OV+'"><div style="'+BOX+'">'
            '<button data-close="casesOverlay" style="'+CLOSE+'">&#10005;</button>'
            '<div style="'+TTL+'">Case Studies</div>'
            '<div style="'+SCROLL+'"><div>'
            '<div style="'+LBL+'">Reports</div>'
            '<div data-cases-grid style="'+GRID+'">'+cards+'</div>'
            '</div></div></div></div>')

def carousel_cards_html(others):
    out=""
    for o in (others or []):
        out+=('<div class="learn-card">'
          '<a href="/learn/'+o["slug"]+'" class="learn-card-link">'
          '<div class="learn-card-img" style="padding:0"><img src="'+o.get("coverImage","")+'" alt="'+E(o.get("title",""))+'" style="width:100%;height:100%;object-fit:cover;display:block"/></div>'
          '<div class="learn-card-body">'
          '<div class="learn-card-tags"><span class="tag '+o.get("tagClass","tag-guide")+'">'+E(o.get("categoryLabel","Guide"))+'</span></div>'
          '<div class="learn-card-title">'+E(o.get("title",""))+'</div>'
          '<div class="learn-card-desc">'+E(o.get("description",""))+'</div>'
          '</div></a>'
          '<div class="learn-card-actions"><a href="/learn/'+o["slug"]+'" class="learn-card-read">Read</a>'+('<a href="'+o.get("pdfUrl","")+'" download class="learn-card-dl">&darr; Download</a>' if o.get("pdfUrl") else '')+'</div>'
          '</div>')
    if not out:
        out='<div class="learn-card"><div class="learn-card-body"><div class="learn-card-desc" style="padding:24px">More articles coming soon.</div></div></div>'
    return out

CAROUSEL_JS = (
 "(function(){"
 "var vp=document.querySelector('.carousel-viewport');"
 "var tr=document.querySelector('.carousel-track');"
 "var L=document.querySelector('.carousel-arrow-left');"
 "var R=document.querySelector('.carousel-arrow-right');"
 "if(!vp||!tr)return;var pos=0;"
 "function mx(){return Math.max(0,tr.scrollWidth-vp.clientWidth);}"
 "function apply(){var m=mx();if(pos>m)pos=m;if(pos<0)pos=0;"
 "tr.style.transform='translateX('+(-pos)+'px)';"
 "if(L)L.disabled=pos<=0;if(R)R.disabled=pos>=m-1;}"
 "if(L)L.addEventListener('click',function(){pos-=vp.clientWidth+16;apply();});"
 "if(R)R.addEventListener('click',function(){pos+=vp.clientWidth+16;apply();});"
 "window.addEventListener('resize',function(){pos=0;apply();});"
 "setTimeout(apply,150);})();"
)

CARD_CLICK_JS = (
 "(function(){"
 "document.querySelectorAll('.learn-card').forEach(function(card){"
 "var link=card.querySelector('a.learn-card-link, a.learn-card-read');"
 "if(!link)return;var href=link.getAttribute('href');"
 "if(!href||href==='#')return;card.style.cursor='pointer';"
 "card.addEventListener('click',function(e){"
 "if(e.target.closest('a, button'))return;"
 "window.location.href=href;});});})();"
)

# Считает клики по кнопкам сторов (App Store / Google Play) как событие GA4 store_click.
# Делегирование на document -> ловит и кнопки, появляющиеся позже (после формы/подписки).
STORE_CLICK_JS = (
 "(function(){document.addEventListener('click',function(e){"
 "var a=e.target.closest&&e.target.closest('a[href]');if(!a)return;"
 "var h=a.href||'';var s='';"
 "if(h.indexOf('apps.apple.com')>-1)s='appstore';"
 "else if(h.indexOf('play.google.com')>-1)s='googleplay';"
 "if(!s)return;"
 "if(typeof window.gtag==='function'){window.gtag('event','store_click',"
 "{store:s,link_url:h,page_path:location.pathname});}"
 "},true);})();"
)

# GA4 + Microsoft Clarity + тумблер «свой трафик» (?internal=1 ставит cookie -> аналитика не грузится).
TRACKING = """<script>
(function(){
  try{
    var qs=location.search;
    if(qs.indexOf('internal=1')>-1){document.cookie='av_internal=1; path=/; max-age='+(60*60*24*365*2);}
    else if(qs.indexOf('internal=0')>-1){document.cookie='av_internal=; path=/; max-age=0';}
  }catch(e){}
  if(document.cookie.indexOf('av_internal=1')>-1) return;
  var s=document.createElement('script'); s.async=1;
  s.src='https://www.googletagmanager.com/gtag/js?id=G-H6T6GPHFGS';
  document.head.appendChild(s);
  window.dataLayer=window.dataLayer||[];
  function gtag(){dataLayer.push(arguments);}
  window.gtag=gtag;
  gtag('js', new Date());
  gtag('config', 'G-H6T6GPHFGS');
  (function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window, document, "clarity", "script", "wi97i4lcbh");
})();
</script>"""

def build_page(a, others):
    slug=a["slug"]
    _url="https://avareit.com/learn/"+slug
    _logo={"@type":"ImageObject","url":RAW+"/images/fav.png"}
    _org={"@type":"Organization","name":"Avare Biotech Inc.","url":"https://avareit.com","logo":_logo}
    _schema=[
      {"@context":"https://schema.org","@type":"TechArticle","headline":a["title"],
       "description":a.get("description",""),"image":[a["coverImage"]],"inLanguage":"en",
       "datePublished":a["datePublished"],"dateModified":a["datePublished"],
       "author":_org,"publisher":_org,
       "mainEntityOfPage":{"@type":"WebPage","@id":_url}},
      {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[
       {"@type":"ListItem","position":1,"name":"Home","item":"https://avareit.com"},
       {"@type":"ListItem","position":2,"name":"Knowledge Base","item":"https://avareit.com/learn"},
       {"@type":"ListItem","position":3,"name":a["title"],"item":_url}]}
    ]
    _ld=json.dumps(_schema, ensure_ascii=False).replace("<","\\u003c")
    seo=(
      '<meta property="og:title" content="'+E(a["title"])+'"/>'
      '<meta property="og:description" content="'+E(a.get("description",""))+'"/>'
      '<meta property="og:url" content="'+_url+'"/>'
      '<meta property="og:image" content="'+a["coverImage"]+'"/>'
      '<meta property="og:type" content="article"/>'
      '<meta property="og:site_name" content="Avare Biotech"/>'
      '<meta property="article:published_time" content="'+a["datePublished"]+'"/>'
      '<meta name="twitter:card" content="summary_large_image"/>'
      '<meta name="twitter:title" content="'+E(a["title"])+'"/>'
      '<meta name="twitter:description" content="'+E(a.get("description",""))+'"/>'
      '<meta name="twitter:image" content="'+a["coverImage"]+'"/>'
      '<script type="application/ld+json">'+_ld+'</script>'
    )
    lang_opts="".join('<button class="av-lang__opt" data-code="'+c+'">'+l+'</button>' for c,l in LANGS)
    lang_mob="".join('<button data-code="'+c+'">'+l+'</button>' for c,l in LANGS)
    sections="".join(sec_html(s) for s in a["content"])
    has_pdf=a.get("hasPdf", True)
    dl_button_main=('<button class="learn-download-btn" data-modal="dlMain"><span class="dl-lock">🔒</span> Download PDF</button>' if has_pdf else '')
    modal_main=(modal_html("dlMain", a) if has_pdf else '')
    modal_other=''
    others_cards=carousel_cards_html(others)
    faq="".join('<div class="av-faq-item"><div class="av-faq-question"><span>'+E(q)+'</span><span class="av-faq-arrow">&#9660;</span></div><div class="av-faq-answer">'+E(ans)+'</div></div>' for q,ans in FAQ)
    desc=a.get("description","")
    page=f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
{TRACKING}
<title>{E(a["title"])} — Avare Biotech</title>
<meta name="description" content="{E(desc)}"/>
<link rel="canonical" href="https://avareit.com/learn/{slug}"/>
{seo}
<link rel="icon" type="image/png" href="{RAW}/images/fav.png"/>
<link rel="preconnect" href="https://api.fontshare.com"/>
<link href="https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,400,300&display=swap" rel="stylesheet"/>
<style>{CSS_ALL}</style>
</head>
<body>
<div class="learn-page">
  <nav class="learn-nav">
    <a href="/" class="learn-nav-logo"><img class="logo-white" src="{RAW}/images/49.png" alt="Avare Biotech"/><img class="logo-dark" src="{RAW}/images/48.png" alt="Avare Biotech"/></a>
    <button class="learn-burger" id="burger" aria-label="Menu"><span></span><span></span><span></span></button>
    <button class="theme-toggle" id="themeToggle" aria-label="Toggle theme" title="Light / Dark"><svg class="tt-sun" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg><svg class="tt-moon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg></button>
    <div class="learn-nav-pill" id="navPill">
      <a href="/"><svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13"><path d="M12 2.1L1 12h3v9h7v-6h2v6h7v-9h3L12 2.1z"></path></svg>Home</a>
      <a href="/learn" class="nav-kb">Knowledge Base</a>
      <a href="/#contacts">Contacts</a>
      <span class="sep"></span>
      <div class="av-lang" id="avLang">
        <button class="av-lang__toggle" id="langToggle">EN <span class="av-lang__arrow">&#9660;</span></button>
        <div class="av-lang__dropdown" id="langDropdown" style="grid-template-columns:1fr 1fr;min-width:132px">{lang_opts}</div>
      </div>
      <div class="nav-lang-mob" style="flex-wrap:wrap">{lang_mob}</div>
    </div>
  </nav>
  <section class="learn-hero"><div class="learn-hero-inner">
    <nav class="learn-crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span class="learn-crumbs__sep">&rsaquo;</span><a href="/learn">Knowledge Base</a><span class="learn-crumbs__sep">&rsaquo;</span><span class="learn-crumbs__cur">{E(a["title"])}</span></nav>
    <span class="tag {a["tagClass"]}">{E(a["categoryLabel"])}</span>
    <h1>{E(a["title"])}</h1>
    <div class="learn-date">{E(fmt_date(a["datePublished"]))}</div>
  </div></section>
  <div class="learn-cover"><div class="learn-cover-img">
    <img src="{a["coverImage"]}" alt="{E(a["title"])}" style="width:100%;height:100%;object-fit:cover;border-radius:12px"/>
  </div></div>
  <article class="learn-content">
    {sections}
    {dl_button_main}
  </article>
  <hr class="learn-divider"/>
  <section class="learn-others"><div class="carousel">
    <div class="learn-others-title">More from the Knowledge Base</div>
    <div class="carousel-stage">
      <button class="carousel-arrow carousel-arrow-left" disabled aria-label="Previous"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg></button>
      <div class="carousel-viewport"><div class="carousel-track">
        {others_cards}
      </div></div>
      <button class="carousel-arrow carousel-arrow-right" disabled aria-label="Next"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></button>
    </div>
  </div></section>
  <footer>
    <div class="av-footer-main">
      <div class="av-footer-main__map"><img src="{RAW}/images/premium_dotted_world_map_avare%203.svg" alt=""/></div>
      <div class="av-footer-main__grid">
        <div class="av-footer-main__col"><div class="av-footer-main__title">Download the App</div>
          <div class="av-footer-main__stores">
            <a href="https://apps.apple.com/ae/app/avare-biotech/id6744607449" target="_blank" rel="noopener" class="av-footer-main__store-btn"><img src="{RAW}/images/apple-white.svg" alt=""/> App Store</a>
            <a href="https://play.google.com/store/apps/details?id=com.biotech.app.android&hl=en" target="_blank" rel="noopener" class="av-footer-main__store-btn"><img src="https://www.logo.wine/a/logo/Google_Play/Google_Play-Icon-Logo.wine.svg" alt="" style="width:18px;height:18px"/> Google Play</a>
          </div></div>
        <div class="av-footer-main__col"><div class="av-footer-main__title">Product</div>
          <div class="av-footer-main__links">
            <a href="/#maksa" target="_blank" rel="noopener" class="av-footer-main__link">MAKSA</a>
            <a href="/learn" class="av-footer-main__link">Learn</a>
            <a href="/#pricing" target="_blank" rel="noopener" class="av-footer-main__link">Pricing</a>
            <a href="#" class="av-footer-main__link" id="openCases">Case Studies</a>
            <a href="#" class="av-footer-main__link" id="openVideo">Video Instruction</a>
            <a href="#" class="av-footer-main__link" id="openProtocol">Protocol</a>
            <a href="#" class="av-footer-main__link" id="openFaq">FAQ</a>
          </div></div>
        <div class="av-footer-main__col"><div class="av-footer-main__title">Legal</div>
          <div class="av-footer-main__links">
            <a href="/privacy-policy" target="_blank" rel="noopener" class="av-footer-main__link">Privacy Policy</a>
            <a href="/terms-of-use" target="_blank" rel="noopener" class="av-footer-main__link">Terms of Use</a>
          </div></div>
        <div class="av-footer-main__col"><div class="av-footer-main__title">Support</div>
          <div class="av-footer-main__links">
            <a href="https://api.whatsapp.com/send/?phone=971506412775&text&type=phone_number&app_absent=0" target="_blank" rel="noopener" class="av-footer-main__link">Contact Support</a>
          </div></div>
      </div>
    </div>
    <div class="av-footer"><span class="av-footer__copy">© 2026 Avare Biotech. All rights reserved.</span></div>
  </footer>

  {modal_main}
  {modal_other}
  {cases_popup_html()}

  <div class="av-faq-overlay" id="faqOverlay"><div class="av-faq-popup"><button class="av-faq-close" data-close="faqOverlay">&#10005;</button>
    <div class="av-faq-title">Frequently Asked Questions</div><div class="av-faq-list">{faq}</div></div></div>

  <div class="av-video-overlay" id="videoOverlay"><div class="av-video-popup"><button class="av-video-close" data-close="videoOverlay">&#10005;</button>
    <div class="av-video-title">Video Instruction</div>
    <div class="av-video-grid">
      <div class="av-video-item"><div class="av-video-thumb" data-yt="CdFFHB0CZUg"><img src="https://img.youtube.com/vi/CdFFHB0CZUg/hqdefault.jpg" alt="English"/><div class="av-video-play"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"></path></svg></div></div><span class="av-video-label">English</span></div>
      <div class="av-video-item"><div class="av-video-thumb" data-yt="B8y8rR0Y4Xw"><img src="https://img.youtube.com/vi/B8y8rR0Y4Xw/hqdefault.jpg" alt="Portugu&ecirc;s"/><div class="av-video-play"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"></path></svg></div></div><span class="av-video-label">Portugu&ecirc;s</span></div>
    </div></div></div>
  <div class="av-video-player-overlay" id="playerOverlay"><div class="av-video-player-wrap"><button class="av-video-close" data-close="playerOverlay" data-clear="ytFrame">&#10005;</button><iframe id="ytFrame" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe></div></div>

  <div class="av-protocol-overlay" id="protoOverlay"><div class="av-protocol-popup"><button class="av-protocol-close" data-close="protoOverlay">&#10005;</button>
    <div class="av-protocol-title">Semen QA Protocol</div>
    <div class="av-protocol-files">
      <div class="av-protocol-file"><span class="av-protocol-file-badge">PDF</span><span class="av-protocol-file-name">Semen QA Protocol (English)</span><div class="av-protocol-file-actions"><button class="av-protocol-file-btn av-protocol-view-btn" data-view="{PROTO_EN}">View</button><a href="{PROTO_EN}" download class="av-protocol-file-btn av-protocol-download-btn">Download</a></div></div>
      <div class="av-protocol-file"><span class="av-protocol-file-badge">PDF</span><span class="av-protocol-file-name">Protocolo QA Semen (Portugu&ecirc;s)</span><div class="av-protocol-file-actions"><button class="av-protocol-file-btn av-protocol-view-btn" data-view="{PROTO_PT}">View</button><a href="{PROTO_PT}" download class="av-protocol-file-btn av-protocol-download-btn">Download</a></div></div>
    </div></div></div>
  <div class="av-pdf-overlay" id="pdfOverlay"><div class="av-pdf-wrap"><button class="av-pdf-close" data-close="pdfOverlay" data-clear="pdfFrame">&#10005;</button><iframe id="pdfFrame" frameborder="0"></iframe></div></div>
</div>
<script>window.SCRIPT={LEARN_SCRIPT!r};window.SLUG={slug!r};</script>
<script>{JS}</script>
<script>{CAROUSEL_JS}</script>
<script>{CARD_CLICK_JS}</script>
<script>{STORE_CLICK_JS}</script>
<script>{THEME_JS}</script>
</body>
</html>
'''
    return page

print("генератор готов (build_page определён)")
