from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={'width':1600,'height':900}); errs=[]; pg.on('pageerror',lambda e:errs.append(str(e)[:300]))
    pg.goto('file:///home/claude/taverne.html'); pg.wait_for_timeout(1200)
    r=pg.evaluate("""()=>{ const out=[]; V.screen='atelier'; A.set=clone(SET); A.setDirty=false; A.ed=null; try{render();}catch(e){out.push('rendu atelier : '+e);} 
      const ids=Object.keys(C).filter(c=>/^(nk_|sp_|si_|tk_k|tk_gama|tk_manda)/.test(c)); let n=0;
      for(const id of ids){ try{ atlOpen(id); render(); n++; const t=document.querySelector('#app').textContent; if(/undefined|NaN|\\[object/.test(t)) out.push(CD(id).n+' : texte cassé dans la fiche'); }catch(e){ out.push(CD(id).n+' : '+String(e).slice(0,160)); } }
      for(const tab of ['cards','tribes','univ','kw','val','rules']){ try{ A.tab=tab; A.ed=null; render(); const t=document.querySelector('#app').textContent; if(/undefined|NaN|\\[object/.test(t)) out.push('onglet '+tab+' : texte cassé : '+(t.match(/.{40}(undefined|NaN|\\[object).{40}/)||[''])[0]); }catch(e){ out.push('onglet '+tab+' : '+String(e).slice(0,200)); } }
      const v=atlValidateSet?atlValidateSet(clone(SET)):null; out.push('fiches ouvertes '+n+'/'+ids.length, 'validation '+JSON.stringify(v).slice(0,300)); return out}""")
    for x in r: print(x[:300])
    print(errs[:4]); b.close()
