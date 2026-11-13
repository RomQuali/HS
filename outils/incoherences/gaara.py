from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(); pg.goto('file:///home/claude/taverne.html'); pg.wait_for_timeout(1000)
    print(pg.evaluate("""()=>{let same=0; for(let i=0;i<40;i++){ V.mp=null; V.univSel=['Naruto']; startSolo(); H.G.ps[0].hero='nh_gaara'; try{finishHero()}catch(e){} clearInterval(H.tick); const p=H.G.ps[0]; p.hero='nh_gaara'; p.g=10; p.bd=[mk('nk_ao',0),mk('nk_zaku',0)]; OPS.pow(H.G,p); if(p.bd.filter(m=>m.tmp).length!==2) same++; } return 'même serviteur : '+same+'/40'}""")); b.close()
