from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(); pg.goto('file:///home/claude/taverne.html'); pg.wait_for_timeout(1000)
    r=pg.evaluate("""()=>Object.keys(HEROES).filter(h=>/^(sh|smh)_/.test(h)).map(h=>{const x=HEROES[h]; const f=o=>[o.cost||0,o.pay||'',JSON.stringify(o.pw),o.tr?JSON.stringify(o.tr):'',o.tx,o.trx||''].join(' ¦ '); return h+'\\n  BASE '+f(x)+'\\n  QUÊTE '+(x.q?JSON.stringify(x.q):'-')+'\\n  ÉVEIL '+(x.aw?f(x.aw):'-')})""")
    print('\n'.join(r)); b.close()
