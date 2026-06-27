import re, os, html, json, glob
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

def parse_md(path, slug):
    raw=open(path,encoding='utf-8').read()
    fm={}
    m=re.match(r'^---\n(.*?)\n---\n(.*)$', raw, re.S)
    body=raw
    if m:
        for line in m.group(1).split('\n'):
            if ':' in line: k,v=line.split(':',1); fm[k.strip().lower()]=v.strip()
        body=m.group(2)
    img_base=f"{RAW}/learn/{slug}"
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
            cur['blocks'].append(('img', f"{img_base}/img{n}.jpg", cap))
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
        'coverImage':f"{img_base}/cover.jpg",
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
            src,cap=b[1],b[2]
            out+='<figure style="margin:24px 0"><img src="'+src+'" alt="'+E(cap)+'" style="width:100%;border-radius:12px;display:block"/>'
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

def pdf_in_folder(slug, content_dir='/tmp/content'):
    import os
    p=os.path.join(content_dir, slug, 'download.pdf')
    if not os.path.exists(p): return False
    with open(p,'rb') as f: head=f.read(5)
    return head.startswith(b'%PDF')   # реально PDF, а не переименованный файл

def build(slug):
    a=parse_md(f'/tmp/content/{slug}/article.md', slug)
    a['hasPdf']=pdf_in_folder(slug)
    a['pdfUrl']=f"{RAW}/learn/{slug}/download.pdf"
    other=pick_other(slug)
    if other: other['hasPdf']=True  # существующие статьи из materials имеют PDF
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

# ============ ЧАСТЬ 2: карточка на /learn + sitemap ============
CARD_TAGMAP={'guide':'tag-guide','articles':'tag-articles','protocol':'tag-protocol'}

def build_card(a):
    cat=a.get('categoryLabel','Guide'); key=cat.lower()
    tagc=CARD_TAGMAP.get(key,'tag-guide')
    dt=a.get('datePublished','')
    dl=''
    if a.get('hasPdf'):
        dl=('<a class="btn-dl btn-locked" href="/learn/'+a['slug']+'">\U0001F512 Download</a>')
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

def update_sitemap(xml, slug):
    loc='https://avareit.com/learn/'+slug
    if loc+'<' in xml or loc+'</loc>' in xml:
        return xml, False
    entry='  <url>\n    <loc>'+loc+'</loc>\n    <changefreq>weekly</changefreq>\n  </url>\n'
    return xml.replace('</urlset>', entry+'</urlset>', 1), True

def publish(slug, repo='/tmp/repo', content_dir='/tmp/content'):
    import os, shutil
    a=parse_md(os.path.join(content_dir,slug,'article.md'), slug)
    a['hasPdf']=pdf_in_folder(slug, content_dir); a['pdfUrl']=RAW+'/learn/'+slug+'/download.pdf'
    other=pick_other(slug)
    if other: other['hasPdf']=True
    # перенести cover/imgN/download.pdf в assets/media/learn/<slug>/ (откуда их тянет сайт)
    src=os.path.join(content_dir,slug); dst=os.path.join(repo,'assets','media','learn',slug)
    os.makedirs(dst, exist_ok=True)
    for fn in os.listdir(src):
        low=fn.lower()
        if low=='cover.jpg' or low=='cover.png' or low.startswith('img') or low=='download.pdf':
            if low=='download.pdf' and not pdf_in_folder(slug, content_dir): continue
            shutil.copy2(os.path.join(src,fn), os.path.join(dst,fn))
    page=NS['build_page'](a, other)
    os.makedirs(repo+'/learn/'+slug, exist_ok=True)
    open(repo+'/learn/'+slug+'/index.html','w',encoding='utf-8').write(page)
    land=open(repo+'/learn/index.html',encoding='utf-8').read()
    land2,added=insert_card(land,a); open(repo+'/learn/index.html','w',encoding='utf-8').write(land2)
    sm=open(repo+'/sitemap.xml',encoding='utf-8').read()
    sm2,smadded=update_sitemap(sm,slug); open(repo+'/sitemap.xml','w',encoding='utf-8').write(sm2)
    return {'slug':slug,'hasPdf':a['hasPdf'],'card_added':added,'sitemap_added':smadded,'page_len':len(page)}
