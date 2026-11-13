from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={'width':1600,'height':900}); pg.goto('file:///home/claude/taverne.html'); pg.wait_for_timeout(1200)
    pg.evaluate("()=>{window.CS_NOANIM=1; V.mp=null; V.univSel=['Naruto']; startSolo(); try{finishHero()}catch(e){} clearInterval(H.tick); broadcast();}"); pg.wait_for_timeout(4200)
    print(pg.evaluate("""()=>[...document.querySelectorAll('#app *')].filter(e=>{const r=e.getBoundingClientRect(); return r.left>1380&&r.top<90&&r.width>20&&r.width<90&&r.height>20;}).map(e=>e.tagName+'.'+e.className+' '+[...e.attributes].filter(a=>a.name!=='class'&&a.name!=='style').map(a=>a.name+'='+a.value.slice(0,60)).join(' ')).slice(0,14)"""))
    b.close()
