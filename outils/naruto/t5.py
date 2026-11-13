from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={'width':1600,'height':900}); errs=[]; pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('file:///home/claude/taverne.html'); pg.wait_for_timeout(1200)
    print(pg.evaluate("""()=>{V.mp=null; V.univSel=['Naruto']; startSolo(); try{finishHero()}catch(e){} clearInterval(H.tick); const G=H.G,p=G.ps[0];
      const miss=Object.keys(G.pool).filter(c=>!NK_GOF[c]); p.t=5; p.ck=10; p.g=10; p.bd=['nk_naruto','nk_sasuke','nk_kakashi','nk_jiraiya','nk_zabuza','nk_haku'].map(x=>mk(x,0)); p.sh=['nk_sakura','nk_tsunade','nk_zaku','nk_itachi'].map(x=>mk(x,0)); p.hd=[mk('nk_konohamaru',0)]; broadcast(); return ['sans groupe',miss]}"""))
    pg.wait_for_timeout(4500); pg.screenshot(path='nk/s_groups.png'); pg.hover('#nk-groups .nkg:nth-child(1)'); pg.wait_for_timeout(700); pg.screenshot(path='nk/s_groups2.png',clip={'x':900,'y':120,'width':700,'height':320}); print(errs[:3]); b.close()
