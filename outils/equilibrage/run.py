from playwright.sync_api import sync_playwright
import json, sys, time
N=int(sys.argv[1]); out=sys.argv[2]
JS=r"""(n)=>{window.CS_NOANIM=1; const rows=[], len=[], errs=[];
 for(let g=0;g<n;g++){ try{ V.mp=null; V.univSel=['Naruto']; startSolo(); const G=H.G; G.ps.forEach(p=>{ p.hero=p.hero||p.ho[Math.floor(Math.random()*p.ho.length)]; if(p===G.ps[0]) p.ai=1; }); finishHero();
   const last={}; let k=0;
   while(H.G.ph!=='end'&&k++<220){ if(H.G.ph==='recruit'){ endRecruit(); H.G.ps.forEach((p,i)=>{ if(p.al&&p.bd.length){ const L=nkLv(p); last[i]={ rd:H.G.rd, t:p.t, bd:p.bd.map(m=>({c:m.c,g:m.g?1:0,tf:m.tf||0,s:m.a+m.h})), gr:Object.keys(L).filter(id=>L[id].l>0).map(id=>id+':'+L[id].l) }; } }); } if(H.G.ph==='combat') endCombat(); }
   if(H.G.ph!=='end'){ errs.push('no end'); continue; }
   len.push(H.G.rd); H.G.ps.forEach((p,i)=>{ const place=p.al?1:p.place; rows.push(Object.assign({hero:p.hero,place}, last[i]||{bd:[],gr:[]})); });
 }catch(e){ errs.push(String(e).slice(0,200)); } }
 return {rows,len,errs}; }"""
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(); pg.goto('file:///home/claude/taverne.html'); pg.wait_for_timeout(1000)
    allr={'rows':[],'len':[],'errs':[]}; t0=time.time()
    while len(allr['len'])+len(allr['errs'])<N:
        r=pg.evaluate(JS,6)
        for k in allr: allr[k]+=r[k]
        json.dump(allr,open(out,'w')); print(len(allr['len']),round(time.time()-t0),flush=True)
    b.close()
