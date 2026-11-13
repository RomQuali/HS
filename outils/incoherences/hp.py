from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={'width':1600,'height':900}); errs=[]; pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
    pg.goto('file:///home/claude/taverne.html'); pg.wait_for_timeout(1200)
    pg.evaluate("()=>{V.mp=null; V.univSel=['Naruto']; startSolo(); const p=H.G.ps[0]; p.ho=['nh_kakashi','nh_kushina','nh_roshi']; broadcast();}"); pg.wait_for_timeout(1800)
    pg.click('.hp-col:nth-child(2) .hp-card',force=True); pg.wait_for_timeout(500); pg.screenshot(path='inc/hp1.png')
    print(pg.evaluate("()=>[...document.querySelectorAll('.hp-pc *')].filter(e=>e.children.length===0&&e.textContent.trim()).map(e=>e.className+': '+e.textContent.trim().slice(0,90))"))
    pg.click('.hp-ok',force=True); pg.wait_for_timeout(1500); pg.evaluate("()=>{clearInterval(H.tick); const p=H.G.ps[0]; p.ck=6; p.bd=[mk('nk_ao',0)]; broadcast();}"); pg.wait_for_timeout(4200)
    bx=pg.evaluate("()=>{const e=document.querySelector('.pw, .hero-pw, [data-act=pow]'); if(!e) return null; const r=e.getBoundingClientRect(); return [r.left+r.width/2,r.top+r.height/2, e.className]}"); print(bx)
    if bx: pg.mouse.move(bx[0],bx[1]); pg.wait_for_timeout(700)
    pg.screenshot(path='inc/hp2.png'); print(errs[:3]); b.close()
