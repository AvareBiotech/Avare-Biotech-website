import re, os, html, json, glob, urllib.parse
E=html.escape
NS={}
exec(open('build_pages.py',encoding='utf-8').read(), NS)   # генератор + RAW, build_page, modal_html...
RAW=NS['RAW']

CAT_MAP={'guide':('Guide','tag-guide'),'articles':('Articles','tag-articles'),
         'protocol':('Protocol','tag-protocol'),'article':('Articles','tag-articles')}

def inline(t):
    t=E(t)
    t=re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', t)
    t=re.sub(r'(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)', r'<em>\1</em>', t)
    return t

IMG_RE = r'^(cover|img\d+)([-_][a-z0-9_-]+)?\.(jpg|jpeg|png|webp|avif)$'

def _file_map(content_dir, slug):
    """ключ (cover/img1/...) -> РЕАЛЬНОЕ имя файла на диске (с SEO-словами).
    Принимает и старое 'img1.png', и новое 'img1-artificial-insemination.jpg'."""
    import os, re as _re
    m={}
    if content_dir:
        d=os.path.join(content_dir, slug)
        if os.path.isdir(d):
            for fn in os.listdir(d):
                mm=_re.match(IMG_RE, fn.lower())
                if mm: m[mm.group(1)]=fn   # храним настоящее имя файла
    return m

def _alt_from_name(fn):
    """запасной alt из имени файла: 'img1-artificial-insemination.jpg' -> 'artificial insemination'"""
    import os, re as _re
    base=os.path.splitext(fn or '')[0]
    base=_re.sub(r'^(cover|img\d+)[-_]?', '', base)
    return base.replace('-', ' ').replace('_', ' ').strip()

def parse_md(path, slug, content_dir=None):
    _files=_file_map(content_dir, slug)
    def _imgsrc(name, base):
        fn=_files.get(name)
        return f"{base}/{fn}" if fn else f"{base}/{name}.jpg"
    raw=open(path,encoding='utf-8').read()
    fm={}
    m=re.match(r'^---\n(.*?)\n---\n(.*)$', raw, re.S)
    body=raw
    if m:
        for line in m.group(1).split('\n'):
            if ':' in line: k,v=line.split(':',1); fm[k.strip().lower()]=v.strip()
        body=m.group(2)
    img_base=f"{RAW}/learn/{slug}"
    cover_src=_imgsrc('cover', img_base)
    lines=body.split('\n')
    sections=[]; cur={'heading':None,'level':2,'blocks':[]}
    ul=None; tbl=None
    def flush_ul():
        nonlocal ul
        if ul: cur['blocks'].append(('ul',ul)); ul=None
    def flush_tbl():
        nonlocal tbl
        if tbl: cur['blocks'].append(('table',tbl)); tbl=None
    def push():
        if cur['heading'] or cur['blocks']: sections.append(cur.copy())
    i=0
    while i<len(lines):
        ln=lines[i].rstrip(); t=ln.strip()
        if t=='':
            flush_ul(); flush_tbl(); i+=1; continue
        if t.startswith('## ') or t.startswith('### '):
            flush_ul(); flush_tbl(); push()
            lvl=2 if t.startswith('## ') else 3
            cur={'heading':t.lstrip('#').strip(),'level':lvl,'blocks':[]}
        elif re.match(r'^\[img(\d+)\]$', t):
            flush_ul(); flush_tbl()
            n=re.match(r'^\[img(\d+)\]$', t).group(1)
            cap=''
            if i+1<len(lines):
                nx=lines[i+1].strip()
                if nx.startswith('*') and nx.endswith('*') and not nx.startswith('**'):
                    cap=nx.strip('*'); i+=1
            cur['blocks'].append(('img', _imgsrc(f'img{n}', img_base), cap, (cap or _alt_from_name(_files.get(f'img{n}','')))))
        elif t.startswith('- '):
            flush_tbl()
            if ul is None: ul=[]
            ul.append(t[2:].strip())
        elif t.startswith('|'):
            flush_ul()
            if re.match(r'^\|[\s\-\|:]+\|$', t): i+=1; continue
            cells=[c.strip() for c in t.strip('|').split('|')]
            if tbl is None: tbl=[]
            tbl.append(cells)
        else:
            flush_ul(); flush_tbl()
            cur['blocks'].append(('p', t))
        i+=1
    flush_ul(); flush_tbl(); push()
    # описание: из fm или первый параграф
    desc=fm.get('description','')
    if not desc:
        for s in sections:
            for b in s['blocks']:
                if b[0]=='p': desc=b[1][:155]; break
            if desc: break
    cat=fm.get('category','Guide'); label,tagc=CAT_MAP.get(cat.lower(),(cat,'tag-guide'))
    return {
        'slug':slug,'title':fm.get('title',slug),'description':desc,
        'datePublished':fm.get('date','2026-01-01'),
        'coverImage':cover_src,
        'categoryLabel':label,'tagClass':tagc,'content':sections,
        'downloadTitle':fm.get('title',slug),
        'downloadDescription':'Enter your email to get the full PDF version of this article.',
    }

# рендер секций с картинками/таблицами — переопределяем sec_html в namespace генератора
def sec_html2(s):
    out="<div>"
    if s.get('heading'):
        lvl=s.get('level',2); out+=f"<h{lvl}>"+E(s['heading'])+f"</h{lvl}>"
    for b in s.get('blocks',[]):
        if b[0]=='p': out+="<p>"+inline(b[1])+"</p>"
        elif b[0]=='ul': out+="<ul>"+"".join("<li>"+inline(x)+"</li>" for x in b[1])+"</ul>"
        elif b[0]=='img':
            src,cap=b[1],b[2]; alt=b[3] if len(b)>3 else cap
            out+='<figure style="margin:24px 0"><img src="'+src+'" alt="'+E(alt)+'" style="width:100%;border-radius:12px;display:block"/>'
            if cap: out+='<figcaption style="font-size:13px;color:rgba(246,246,246,0.5);margin-top:8px;text-align:center">'+E(cap)+'</figcaption>'
            out+='</figure>'
        elif b[0]=='table':
            out+='<table style="width:100%;border-collapse:collapse;margin:20px 0">'
            for ri,row in enumerate(b[1]):
                tag='th' if ri==0 else 'td'
                out+='<tr>'+''.join('<'+tag+' style="border:1px solid rgba(255,255,255,0.12);padding:8px 12px;text-align:left">'+inline(c)+'</'+tag+'>' for c in row)+'</tr>'
            out+='</table>'
    return out+"</div>"
NS['sec_html']=sec_html2

def pick_other(cur_slug):
    mats=json.load(open('materials.json',encoding='utf-8'))
    for m in mats:
        if m.get('slug')!=cur_slug:
            return {'slug':m['slug'],'title':m['title'],'coverImage':m.get('coverImage') or f"{RAW}/images/Cover-{m['slug']}.png",
                    'categoryLabel':m.get('categoryLabel','Guide'),'tagClass':m.get('tagClass','tag-guide'),
                    'description':m.get('description',''),'downloadTitle':m['title'],
                    'downloadDescription':'Enter your email to download.'}
    return None

def pdf_name_in_folder(slug, content_dir='/tmp/content'):
    """вернуть имя единственного настоящего PDF в папке (с SEO-именем) или None."""
    import os
    d=os.path.join(content_dir, slug)
    if not os.path.isdir(d): return None
    for fn in sorted(os.listdir(d)):
        if fn.lower().endswith('.pdf'):
            with open(os.path.join(d,fn),'rb') as f:
                if f.read(5).startswith(b'%PDF'): return fn   # реально PDF, а не переименованный файл
    return None

def pdf_in_folder(slug, content_dir='/tmp/content'):
    return pdf_name_in_folder(slug, content_dir) is not None

LANG_LABELS={'en':'English','pt':'Português','es':'Español','ar':'العربية','fr':'Français','de':'Deutsch','it':'Italiano','tr':'Türkçe','ur':'اردو','hi':'हिन्दी','ru':'Русский','af':'Afrikaans','ja':'日本語','zh':'中文','el':'Ελληνικά'}
LANG_ORDER=['en','pt','es','ar','af','ur','tr','de','fr','it','hi','ja','zh','el']
ATTACH_PREFIX='attach-'   # так помечаются вложения-гугл-таблицы в папке «На публикацию»

def _lang_files(slug, content_dir, ext, magic=None, prefix=None):
    """Файлы <ext> с языковым суффиксом (…-en.pdf, …-pt.xlsx) -> список в порядке LANG_ORDER."""
    import os, re as _re, urllib.parse as _up
    d=os.path.join(content_dir, slug)
    if not os.path.isdir(d): return []
    found={}
    for fn in os.listdir(d):
        low=fn.lower()
        if not low.endswith(ext): continue
        if prefix and not low.startswith(prefix): continue
        # вариант 1: …-en.pdf / …_pt.xlsx   (дефис или подчёркивание, строчные)
        m=_re.search(r'[-_]([a-z]{2})'+_re.escape(ext)+r'$', low)
        code=m.group(1) if m else None
        # вариант 2: «… Avare Biotech EN.pdf» — пробел + ЗАГЛАВНЫЕ (человекочитаемые SEO-имена)
        if not code:
            m2=_re.search(r'[ ]([A-Z]{2})'+_re.escape(ext.upper())+r'$', fn) or \
               _re.search(r'[ ]([A-Z]{2})'+_re.escape(ext)+r'$', fn)
            if m2: code=m2.group(1).lower()
        if not code: continue
        if code not in LANG_LABELS: continue
        if magic:
            try:
                with open(os.path.join(d,fn),'rb') as f:
                    if not f.read(len(magic)).startswith(magic): continue
            except Exception:
                continue
        found[code]=fn
    out=[]
    for code in LANG_ORDER:
        if code in found:
            out.append({'label':LANG_LABELS[code],'code':code,'name':found[code],
                        'url':RAW+'/learn/'+slug+'/'+_up.quote(found[code])})
    return out

def pdfs_in_folder(slug, content_dir='/tmp/content'):
    """PDF с языковым суффиксом (…-en.pdf, …-pt.pdf)."""
    return _lang_files(slug, content_dir, '.pdf', magic=b'%PDF')

def sheets_in_folder(slug, content_dir='/tmp/content'):
    """Гугл-таблицы (экспорт .xlsx) с языковым суффиксом: attach-…-en.xlsx / attach-…-pt.xlsx."""
    return _lang_files(slug, content_dir, '.xlsx', magic=b'PK', prefix=ATTACH_PREFIX)

def sheet_name_in_folder(slug, content_dir='/tmp/content'):
    """Одна гугл-таблица без языкового суффикса: attach-….xlsx -> имя файла или None."""
    import os, re as _re
    d=os.path.join(content_dir, slug)
    if not os.path.isdir(d): return None
    for fn in sorted(os.listdir(d)):
        low=fn.lower()
        if not (low.startswith(ATTACH_PREFIX) and low.endswith('.xlsx')): continue
        if _re.search(r'[-_]([a-z]{2})\.xlsx$', low): continue   # это языковой вариант
        try:
            with open(os.path.join(d,fn),'rb') as f:
                if not f.read(2).startswith(b'PK'): continue
        except Exception:
            continue
        return fn
    return None

def build(slug):
    a=parse_md(f'/tmp/content/{slug}/article.md', slug, f'/tmp/content/{slug}'.rsplit('/',1)[0])
    pdf_name=pdf_name_in_folder(slug)
    a['hasPdf']=pdf_name is not None
    a['pdfUrl']=f"{RAW}/learn/{slug}/{urllib.parse.quote(pdf_name or 'download.pdf')}"
    other=pick_other(slug)
    if other: other['hasPdf']=True; other['pdfUrl']=card_pdf_url(other['slug'], '/tmp/content')  # ищем PDF по формату
    page=NS['build_page'](a, other)
    out=f'/mnt/user-data/outputs/learn/{slug}'; os.makedirs(out,exist_ok=True)
    open(out+'/index.html','w',encoding='utf-8').write(page)
    return a, page

if __name__=='__main__':
    a,page=build('10-artificial-insemination-mistakes')
    print("СТРАНИЦА СОБРАНА, символов:", len(page))
    import re as _r
    checks={
      'nav (Knowledge Base)':'Knowledge Base' in page,
      'крошки':'learn-crumbs' in page,
      'обложка cover.jpg':'/cover.jpg' in page,
      'h2 разделов': page.count('<h2>'),
      'картинки <img ...img':'img1.jpg' in page and 'img8.jpg' in page,
      'figure-подписи':'figcaption' in page,
      'карусель':'carousel' in page,
      'футер':'av-footer' in page,
      'JSON-LD':'application/ld+json' in page,
      'og:title':'og:title' in page,
      'тег категории':a['tagClass'] in page,
    }
    for k,v in checks.items(): print(f"  {k}: {v}")


import html as _htmlmod
SPECIAL_PDF={
    "semen-storage-handling":"/assets/media/learn-pdf/semen-storage-handling.pdf",
    "semen-quality-analysis":"/assets/media/qa-protocols/02_Semen_QA_Protocol_Avare_Biotech_en.pdf",
}
def card_pdf_url(slug, content_dir=None):
    # 1) ПО ФОРМАТУ: реальный PDF (по %PDF-байтам) в content/<slug>/ — как и на странице статьи
    if content_dir:
        name=pdf_name_in_folder(slug, content_dir)
        if name:
            return "/assets/media/learn/"+slug+"/"+urllib.parse.quote(name)
    # 2) спец-случаи (старые статьи без content/*.md)
    if slug in SPECIAL_PDF:
        return SPECIAL_PDF[slug]
    # 3) запасной вариант
    return "/assets/media/learn/"+slug+"/download.pdf"

def parse_landing_cards(landing_html, exclude_slug, content_dir=None):
    cards=[]
    blocks=re.split(r'(?=<div class="card" data-type=)', landing_html)
    for b in blocks:
        if not b.startswith('<div class="card" data-type='): continue
        mslug=re.search(r'href="/learn/([^"#]+)"', b)
        if not mslug: continue
        slug=mslug.group(1)
        if slug==exclude_slug: continue
        mcov=re.search(r'card-img[^>]*>\s*<img src="([^"]+)"', b)
        mtitle=re.search(r'card-title[^>]*>([^<]*)</div>', b)
        mdesc=re.search(r'card-desc[^>]*>([^<]*)</div>', b)
        mtag=re.search(r'<span class="tag (tag-[a-z]+)"[^>]*>([^<]*)</span>', b)
        cards.append({'slug':slug,
            'coverImage': mcov.group(1) if mcov else '',
            'title': _htmlmod.unescape(mtitle.group(1)) if mtitle else slug,
            'description': _htmlmod.unescape(mdesc.group(1)) if mdesc else '',
            'tagClass': mtag.group(1) if mtag else 'tag-guide',
            'categoryLabel': _htmlmod.unescape(mtag.group(2)) if mtag else 'Guide',
            'hasPdf': ('btn-dl' in b),
            'pdfUrl': (card_pdf_url(slug, content_dir) if ('btn-dl' in b) else None)})
    return cards

# ============ ЧАСТЬ 2: карточка на /learn + sitemap ============
CARD_TAGMAP={'guide':'tag-guide','articles':'tag-articles','protocol':'tag-protocol'}

def build_card(a):
    cat=a.get('categoryLabel','Guide'); key=cat.lower()
    tagc=CARD_TAGMAP.get(key,'tag-guide')
    dt=a.get('datePublished','')
    dl=''  # download-кнопку с карточек убрали — только Read
    return ('<div class="card" data-type="'+key+'">\n'
      '    <div class="card-img" style="padding:0;"><img src="'+a['coverImage']+'" alt="" style="width:100%;height:100%;object-fit:cover;display:block;"/></div>\n'
      '    <div class="card-body">\n'
      '      <div class="card-tags"><span class="tag '+tagc+'">'+E(cat)+'</span></div>\n'
      '      <div class="card-date" data-date="'+dt+'"></div>\n'
      '      <div class="card-title">'+E(a['title'])+'</div>\n'
      '      <div class="card-desc">'+E(a.get('description',''))+'</div>\n'
      '      <div class="card-actions">\n'
      '        <a class="btn-read" href="/learn/'+a['slug']+'">Read</a>\n'
      '        '+dl+'\n'
      '      </div>\n'
      '    </div>\n'
      '  </div>\n  ')

GRID_MARK='<div class="cards-grid" id="grid">'
def insert_card(landing_html, a):
    # идемпотентно: если карточка статьи уже есть — не дублируем
    if 'href="/learn/'+a['slug']+'"' in landing_html:
        return landing_html, False
    card=build_card(a)
    return landing_html.replace(GRID_MARK, GRID_MARK+'\n  '+card, 1), True

SITEMAP_LANGS=['en','pt','es','ar','af','ur','tr','de','fr','it','hi','ja','zh','el']
def _sm_url(lang, path):
    return 'https://avareit.com/'+path if lang=='en' else 'https://avareit.com/'+lang+'/'+path
def update_sitemap(xml, slug):
    import datetime
    path='learn/'+slug
    loc='https://avareit.com/'+path
    if loc+'<' in xml or loc+'</loc>' in xml:
        return xml, False
    # гарантируем namespace xhtml для hreflang-альтернатив (на случай старого sitemap)
    if 'xmlns:xhtml' not in xml:
        xml=xml.replace('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
                        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n        xmlns:xhtml="http://www.w3.org/1999/xhtml">', 1)
    today=datetime.date.today().isoformat()
    alts=''
    for l in SITEMAP_LANGS:
        alts+='    <xhtml:link rel="alternate" hreflang="'+l+'" href="'+_sm_url(l,path)+'"/>\n'
    alts+='    <xhtml:link rel="alternate" hreflang="x-default" href="'+_sm_url('en',path)+'"/>\n'
    entry=''
    for l in SITEMAP_LANGS:
        entry+=('  <url>\n    <loc>'+_sm_url(l,path)+'</loc>\n'
                '    <lastmod>'+today+'</lastmod>\n'
                '    <changefreq>monthly</changefreq>\n'
                '    <priority>0.8</priority>\n'
                +alts+
                '  </url>\n')
    return xml.replace('</urlset>', entry+'</urlset>', 1), True

def _track_span(html_):
    """Границы содержимого <div class="carousel-track"> ... </div> с учётом вложенности."""
    key='<div class="carousel-track">'
    i=html_.find(key)
    if i<0: return None
    start=i+len(key); depth=1; j=start
    while depth and j<len(html_):
        nd=html_.find('<div', j); cd=html_.find('</div>', j)
        if cd<0: return None
        if nd!=-1 and nd<cd: depth+=1; j=nd+4
        else:
            depth-=1; j=cd+6
    return (start, j-6)

def rebuild_carousels(repo, content_dir='/tmp/content'):
    """Перерисовать блок «More from the Knowledge Base» на КАЖДОЙ странице статьи.
    Без этого новая статья появляется только в карусели самой себя, а старые страницы
    остаются с каруселью на момент их сборки."""
    import glob as _glob, os as _os
    land=open(repo+'/learn/index.html',encoding='utf-8').read()
    done=[]
    for path in sorted(_glob.glob(repo+'/learn/*/index.html')):
        slug=_os.path.basename(_os.path.dirname(path))
        html_=open(path,encoding='utf-8').read()
        span=_track_span(html_)
        if not span: continue
        others=parse_landing_cards(land, slug, content_dir)
        cards=NS['carousel_cards_html'](others)
        new=html_[:span[0]]+cards+html_[span[1]:]
        if new!=html_:
            open(path,'w',encoding='utf-8').write(new)
            done.append(slug)
    return done

def publish(slug, repo='/tmp/repo', content_dir='/tmp/content'):
    import os, shutil, re as _re
    a=parse_md(os.path.join(content_dir,slug,'article.md'), slug, content_dir)
    pdf_name=pdf_name_in_folder(slug, content_dir)
    a['hasPdf']=pdf_name is not None
    a['pdfUrl']=RAW+'/learn/'+slug+'/'+urllib.parse.quote(pdf_name or 'download.pdf')
    _multi=pdfs_in_folder(slug, content_dir)
    if len(_multi)>=2:
        a['pdfs']=_multi
        a['hasPdf']=True
    # вложения-гугл-таблицы (экспортированы Apps Script в .xlsx)
    _sheets=sheets_in_folder(slug, content_dir)
    _sheet1=sheet_name_in_folder(slug, content_dir)
    _files=[]
    if len(_multi)>=2:
        _files+= [{'kind':'PDF','label':p['label'],'url':p['url'],'name':p['name']} for p in _multi]
    elif pdf_name and (_sheets or _sheet1):
        _files.append({'kind':'PDF','label':None,'url':a['pdfUrl'],'name':pdf_name})
    if _sheets:
        _files+= [{'kind':'XLSX','label':x['label'],'url':x['url'],'name':x['name']} for x in _sheets]
    elif _sheet1:
        import urllib.parse as _up2
        _files.append({'kind':'XLSX','label':None,'name':_sheet1,
                       'url':RAW+'/learn/'+slug+'/'+_up2.quote(_sheet1)})
    if _files and (len(_multi)>=2 or _sheets or _sheet1):
        a['dlFiles']=_files
        a['hasPdf']=True
    # если статья уже была опубликована — сохранить исходную дату публикации
    existing=os.path.join(repo,'learn',slug,'index.html')
    if os.path.exists(existing):
        try:
            old=open(existing,encoding='utf-8').read()
            md=_re.search(r'article:published_time" content="(\d{4}-\d{2}-\d{2})"', old)
            if md: a['datePublished']=md.group(1)
        except Exception: pass
    # перенести картинки/pdf в assets/media/learn/<slug>/ с их РЕАЛЬНЫМИ (SEO) именами,
    # предварительно почистив старые/переименованные файлы
    src=os.path.join(content_dir,slug); dst=os.path.join(repo,'assets','media','learn',slug)
    if os.path.isdir(dst): shutil.rmtree(dst)
    os.makedirs(dst, exist_ok=True)
    _multi_names={p['name'] for p in _multi}
    _file_names={f['name'] for f in _files}
    for fn in os.listdir(src):
        is_img=_re.match(IMG_RE, fn.lower())
        is_pdf=(pdf_name and fn==pdf_name) or (fn in _multi_names)
        is_att=(fn in _file_names)
        if is_img or is_pdf or is_att:
            shutil.copy2(os.path.join(src,fn), os.path.join(dst,fn))
    land=open(repo+'/learn/index.html',encoding='utf-8').read()
    others=parse_landing_cards(land, slug, content_dir)   # без лимита: в карусель идут ВСЕ статьи
    page=NS['build_page'](a, others)
    os.makedirs(repo+'/learn/'+slug, exist_ok=True)
    open(repo+'/learn/'+slug+'/index.html','w',encoding='utf-8').write(page)
    land2,added=insert_card(land,a); open(repo+'/learn/index.html','w',encoding='utf-8').write(land2)
    rebuilt=rebuild_carousels(repo, content_dir)   # чтобы новая статья появилась в каруселях СТАРЫХ страниц
    sm=open(repo+'/sitemap.xml',encoding='utf-8').read()
    sm2,smadded=update_sitemap(sm,slug); open(repo+'/sitemap.xml','w',encoding='utf-8').write(sm2)
    return {'slug':slug,'hasPdf':a['hasPdf'],'card_added':added,'sitemap_added':smadded,'page_len':len(page),'carousels_rebuilt':rebuilt}
