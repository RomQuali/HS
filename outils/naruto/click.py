from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={'width':1600,'height':900}); errs=[]; pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('file:///home/claude/taverne.html'); pg.wait_for_timeout(1200)
    pg.evaluate("()=>{V.mp=null; V.univSel=['Naruto']; startSolo();}"); pg.wait_for_timeout(2000)
    pg.click('.hp-col:nth-child(1) .hp-card',force=True); pg.wait_for_timeout(400); pg.screenshot(path='nk/s_hero2.png'); pg.click('.hp-ok',force=True); pg.wait_for_timeout(1500)
    pg.evaluate("""()=>{clearInterval(H.tick); const G=H.G,p=G.ps[0]; p.t=5; p.g=10; p.ck=10; p.bd=['nk_naruto','nk_kakashi','nk_konohamaru'].map(c=>mk(c,0)); broadcast(); }"""); pg.wait_for_timeout(4500)
    st=lambda: pg.evaluate("()=>{const p=H.G.ps[0]; return [p.ck, p.bd.map(m=>[m.c,m.a,m.h,m.tf||0,m.ju||0])]}")
    print(st()); pg.click('.board-zone .mn:nth-child(3) .jut-b',force=True); pg.wait_for_timeout(500); print('jutsu',st())
    pg.click('.board-zone .mn:nth-child(2) .nk-tf',force=True); pg.wait_for_timeout(500); print('tf',st())
    pg.hover('.board-zone .mn:nth-child(2) .jut-b',force=True); pg.wait_for_timeout(700); pg.screenshot(path='nk/s_tip.png')
    print(pg.evaluate("()=>[document.querySelector('.board-zone .mn:nth-child(3) .jut-b').className, document.querySelectorAll('.nk-tf').length]"), errs[:3]); b.close()
