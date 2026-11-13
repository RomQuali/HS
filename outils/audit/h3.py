from playwright.sync_api import sync_playwright
JS=r"""()=>{ window.CS_NOANIM=1; const out={};
 const start=U=>{V.mp=null; V.univSel=[U]; startSolo(); clearInterval(H.tick); H.G.ps.forEach(p=>{p.hero=p.hero||p.ho[0]}); finishHero(); clearInterval(H.tick); const me=H.G.ps[0]; me.ki=30; me.ck=30; me.g=30; return [H.G,me];};
 { const [G,me]=start('Les Simpson');
   for(const id of ['si_edna','si_lovejoy']){ me.bd=[mk('si_chalmers',0)]; const h=me.bd[0], sa=h.a+CD(id).a, sh=h.h+CD(id).h; me.hd=[mk(id,0)]; OPS.play(G,me,{i:0,pos:0}); out['magnet '+id]=[me.bd.map(m=>m.c+' '+m.a+'/'+m.h+' f='+m.f+' x='+((m.x||[]).map(e=>e.k).join('+'))), 'attendu '+sa+'/'+sh];
     me.bd=[mk('si_chalmers',0)]; me.hd=[mk(id,0)]; OPS.play(G,me,{i:0,pos:1}); out['magnet-droite '+id]=me.bd.length;
     me.bd=[mk('si_homer',0)]; me.hd=[mk(id,0)]; OPS.play(G,me,{i:0,pos:0}); out['magnet-autre '+id]=me.bd.length; }
   me.bd=[mk('si_snake',0),mk('si_fattony',0)].filter(m=>C[m.c]); const cra=Object.keys(C).filter(id=>CD(id).tr==='si_cra'&&id!=='si_louie'); me.bd=cra.slice(0,2).map(x=>mk(x,0)); me.sh=[mk(cra[2],0),mk(cra[3],0)]; me.hd=[]; OPS.buy(G,me,{i:0}); OPS.buy(G,me,{i:0}); const s0=me.bd.reduce((q,m)=>q+m.a+m.h,0); me.hd.push(mk('si_louie',0)); OPS.play(G,me,{i:me.hd.length-1}); out.louie=[me.bt, me.bd.reduce((q,m)=>q+m.a+m.h,0)-s0-7, 'attendu 4']; }
 { const [G,me]=start('Dragon Ball'); me.bd=[mk('d_vegetto',0),mk('d_goku',0)]; const v=me.bd[0], a0=v.a,h0=v.h; const ok=OPS.tf(G,me,{i:1}); out.vegetto_tfo=[ok,v.a-a0,v.h-h0,'attendu 2/2']; 
   me.bd=[mk('d_vegeta',0),mk('d_goku',0)]; const w=me.bd[0], b0=w.a; OPS.tf(G,me,{i:1}); out.vegeta_tfo=[w.a-b0]; }
 { const [G,me]=start('Naruto'); me.bd=[mk('n_v3',0),mk('tk_puppet',0),mk('tk_puppet',0)]; const s0=me.bd.map(m=>m.a+'/'+m.h).join(' '); fxOf(me.bd[0],'eot').forEach(e=>runRecruit(G,me,me.bd[0],e)); out.n_v3=[s0,'→',me.bd.map(m=>m.a+'/'+m.h).join(' ')];
   out.puppetSources=Object.keys(C).filter(id=>JSON.stringify(C[id].fx||CD(id).fxAll||[]).includes('tk_puppet')).map(id=>id+':'+CD(id).n+(id in G.pool?'':' (hors réserve)')); }
 { const [G,me]=start('Rick et Morty'); const N=(a,h,x)=>{const m=mk('rm_gromflomite',0); m.a=a;m.h=h;m.f='';m.c='rm_gromflomite'; m.x=x; return m;};
   const run=w=>{ const d=mk('rm_morty',0); const cand=Object.keys(C).filter(id=>(CD(id).fxAll||[]).some(e=>e.k==='dr_buff_all')&&/^rm_/.test(id)); const A=[Object.assign(mk(cand[0],0),{a:1,h:1}), Object.assign(mk('rm_summer',0),{a:0,h:500})].concat(w?[Object.assign(mk('rm_unity',0),{a:0,h:500})]:[]); const r=simulate(A,[Object.assign(mk('rm_jerry',0),{a:5,h:500})],1,1,1,null,G.mx); const f=r.frames[r.frames.length-1].s[0]; return [cand[0], f.map(m=>m.c+' '+m.a+'/'+m.h)]; };
   out.unity=[run(0),run(1)]; }
 return out; }"""
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(); pg.goto('file:///home/claude/taverne.html'); pg.wait_for_timeout(1000)
    for k,v in pg.evaluate(JS).items(): print(k,v)
    b.close()
