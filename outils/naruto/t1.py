from playwright.sync_api import sync_playwright
import json
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={'width':1600,'height':900}); errs=[]; pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('file:///home/claude/taverne.html'); pg.wait_for_timeout(1200)
    r=pg.evaluate("""()=>{V.mp=null; V.univSel=['Naruto']; startSolo(); clearInterval(H.tick); const G=H.G,p=G.ps[0]; const pool=Object.keys(G.pool);
      const out={pool:pool.length, non_nk:pool.filter(x=>!/^nk_/.test(x)), ho:p.ho, tiers:[1,2,3,4,5,6].map(t=>pool.filter(x=>CD(x).t===t).length), noart:pool.concat(Object.keys(C).filter(x=>/^tk_(kclone|crapaud|karasu|ninken|katsuyu|gamabunta|manda|kamatari|cerbere)$/.test(x))).filter(x=>!ART[x]), heroes:Object.keys(HEROES).filter(h=>/^nh_/.test(h)).length};
      out.txt=pool.map(id=>CD(id).n+' T'+CD(id).t+' '+CD(id).a+'/'+CD(id).h+' '+CD(id).f+' :: '+(CD(id).fxAll||[]).map(e=>fxText(e)).join(' | '));
      return out}""")
    for t in r.pop('txt'): print(t)
    print(json.dumps(r,ensure_ascii=False)); print('errs',errs[:5]); b.close()
