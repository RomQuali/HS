from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(); pg.goto('file:///home/claude/taverne.html'); pg.wait_for_timeout(1000)
    print(pg.evaluate("""()=>{const o={}; for(const U of ['Les Simpson','South Park','Naruto']){ V.mp=null; V.univSel=[U]; startSolo(); clearInterval(H.tick); const G=H.G; const P=Object.keys(G.pool);
      o[U]={gag:P.filter(c=>/[Gg]ag/.test(cardTextH(c,0))).map(c=>CD(c).n), loi:MECHS[G.laws[0].k].n, lore:(SET.univ.find(u=>u.n===U)||{}).lore,
        vous:P.filter(c=>/\\b(vos|votre|vous)\\b/i.test(cardTextH(c,0).replace(/<[^>]+>/g,''))).length, tu:P.filter(c=>/\\b(tes|ton|ta|tu)\\b/i.test(cardTextH(c,0).replace(/<[^>]+>/g,''))).length,
        mixte:P.filter(c=>{const t=cardTextH(c,0).replace(/<[^>]+>/g,''); return /\\b(vos|votre|vous)\\b/i.test(t)&&/\\b(tes|ton|ta|tu)\\b/i.test(t)}).map(c=>CD(c).n)}; } return JSON.stringify(o,null,1)}""")); b.close()
