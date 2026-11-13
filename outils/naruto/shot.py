from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={'width':1600,'height':900}); errs=[]; pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('file:///home/claude/taverne.html'); pg.wait_for_timeout(1200)
    pg.evaluate("()=>{V.mp=null; V.univSel=['Naruto']; startSolo();}"); pg.wait_for_timeout(2500); pg.screenshot(path='nk/s_hero.png')
    pg.evaluate("""()=>{try{finishHero()}catch(e){} clearInterval(H.tick); const G=H.G,p=G.ps[0]; p.t=5; p.g=10; p.ck=9;
      p.bd=['nk_naruto','nk_kakashi','nk_gaara','nk_sasuke','nk_zabuza','tk_gamabunta'].map(c=>mk(c,0)); doNkTf(G,p,p.bd[3]); p.ck=9; p.hd=[mk('nk_pain',0),mk('nk_orochimaru',0)]; broadcast(); }""")
    pg.wait_for_timeout(4500); pg.screenshot(path='nk/s_game.png')
    bx=pg.eval_on_selector('.board-zone .mn:nth-child(1)',"e=>{const r=e.getBoundingClientRect();return [r.left+r.width/2,r.top+r.height/2]}")
    pg.mouse.move(bx[0],bx[1]); pg.wait_for_timeout(900); pg.screenshot(path='nk/s_hover.png')
    print(errs[:5]); b.close()
