#!/usr/bin/env python3
"""Проходит по content/<slug>/, публикует ещё не опубликованные статьи."""
import os, sys, json
REPO = os.environ.get('GITHUB_WORKSPACE') or (sys.argv[1] if len(sys.argv)>1 else os.getcwd())
CONTENT = os.path.join(REPO, 'content')
os.chdir(os.path.dirname(os.path.abspath(__file__)))   # где лежат build_pages.py и зависимости
import autopost

def main():
    if not os.path.isdir(CONTENT):
        print("нет папки content/, нечего публиковать"); return
    results=[]
    for slug in sorted(os.listdir(CONTENT)):
        d=os.path.join(CONTENT, slug)
        if not os.path.isdir(d): continue
        if not os.path.exists(os.path.join(d,'article.md')):
            print(f"[skip] {slug}: нет article.md"); continue
        # уже опубликована? (страница есть и карточка на лендинге есть)
        page_exists=os.path.exists(os.path.join(REPO,'learn',slug,'index.html'))
        try:
            r=autopost.publish(slug, repo=REPO, content_dir=CONTENT)
            results.append(r); print(f"[ok] {slug}: {r}")
        except Exception as e:
            print(f"[ERROR] {slug}: {type(e).__name__}: {e}")
            results.append({'slug':slug,'error':str(e)})
    print("ИТОГО:", json.dumps(results, ensure_ascii=False))
    # вернуть ненулевой код, если были ошибки
    if any('error' in r for r in results): sys.exit(1)

if __name__=='__main__':
    main()
