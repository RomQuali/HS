from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={'width':1600,'height':900}); errs=[]; pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('file:///home/claude/taverne.html'); pg.wait_for_timeout(1200)
    print(pg.evaluate("""()=>{V.mp=null; V.univSel=['Naruto']; startSolo(); try{finishHero()}catch(e){} clearInterval(H.tick); const G=H.G,p=G.ps[0];
      p.bd=['nk_hidan','nk_kakuzu'].map(x=>mk(x,0)); endRecruit(); const f=V.fight||{}; const fr=(f.frames||[])[0]; return [H.G.ph, fr? (fr.s[0].length?fr.s:fr.s).map(side=>side.map(m=>[m.c,m.a,m.h,m.f])) : Object.keys(f)]}"""))
    pg.evaluate("""()=>{ const G=H.G,p=G.ps[0]; endCombat(); clearInterval(H.tick); p.t=5; p.ck=10; p.bd=['nk_naruto','nk_sasuke','nk_kakashi','nk_jiraiya','nk_zabuza','nk_haku'].map(x=>mk(x,0)); broadcast(); }""")
    pg.wait_for_timeout(4500); pg.screenshot(path='nk/s_groups.png'); print(errs[:3]); b.close()
