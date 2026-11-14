from playwright.sync_api import sync_playwright
import json, sys
N=int(sys.argv[1]) if len(sys.argv)>1 else 6
JS=r"""(n)=>{window.CS_NOANIM=1; const out={len:[],errs:[],ring:0,shadow:0,et:[],lg:[],rows:[],held:0,fell:0,objs:0};
 for(let g=0;g<n;g++){ try{ V.mp=null; V.univSel=['Le Seigneur des Anneaux']; startSolo(); const G=H.G; G.ps.forEach(p=>{ p.hero=p.hero||p.ho[Math.floor(Math.random()*p.ho.length)]; if(p===G.ps[0]){ p.ai=1; p.bot=1; } }); finishHero();
   const last={}; let k=0;
   while(H.G.ph!=='end'&&k++<260){ if(H.G.ph==='recruit'){ endRecruit(); H.G.ps.forEach((p,i)=>{ if(p.al&&p.bd.length){ const L=nkLv(p); last[i]={ rd:H.G.rd, et:p.et||0, lg:p.lg||0, bd:p.bd.map(m=>({c:m.c,g:m.g?1:0,tf:m.tf||0,s:m.a+m.h,ring:m.ring?1:0})), gr:Object.keys(L).filter(id=>L[id].l>0).map(id=>id+':'+L[id].l) }; if(p.bd.some(m=>m.ring)) out.held++; } if(p.fell){ out.fell++; p.fell=null; } }); } if(H.G.ph==='combat') endCombat(); }
   if(H.G.ph!=='end'){ out.errs.push('no end rd'+H.G.rd); continue; }
   out.len.push(H.G.rd); if(H.G.ringWin){ out.ring++; if(H.G.ringWin.shadow) out.shadow++; }
   H.G.ps.forEach((p,i)=>{ const place=p.al?1:p.place; out.et.push(p.et||0); out.rows.push(Object.assign({hero:p.hero,place,ringWin:!!(H.G.ringWin&&H.G.ringWin.pid===p.pid)}, last[i]||{bd:[],gr:[]})); });
 }catch(e){ out.errs.push(String(e.stack||e).slice(0,400)); } }
 return out; }"""
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(); perr=[]; pg.on('pageerror',lambda e:perr.append(str(e)[:200])); pg.goto('file:///home/claude/taverne.html'); pg.wait_for_timeout(1000)
    A={'len':[],'errs':[],'ring':0,'shadow':0,'et':[],'rows':[],'held':0,'fell':0}
    while len(A['len'])+len(A['errs'])<N:
        r=pg.evaluate(JS,6)
        for k in A: A[k]=A[k]+r[k]
    json.dump(A,open(sys.argv[2] if len(sys.argv)>2 else 'lo/g.json','w'))
    L=A['len']; print('parties',len(L),'errs',A['errs'][:2],'pageerr',perr[:2]); 
    if L: print('manches moy',round(sum(L)/len(L),1),'min',min(L),'max',max(L),'| victoires par l\'Anneau',A['ring'],'dont Ombre',A['shadow'],'| tours avec porteur',A['held'],'porteurs tombés',A['fell']); 
    import collections; print('étape finale',sorted(collections.Counter(A['et']).items()))
    b.close()
