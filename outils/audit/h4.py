from playwright.sync_api import sync_playwright
import json
JS=r"""()=>{ window.CS_NOANIM=1; const out={unity:[],sp:[],pw:[],err:[]};
 const start=(U,hero)=>{V.mp=null; V.univSel=[U]; startSolo(); clearInterval(H.tick); H.G.ps.forEach((p,k)=>{p.hero=(k===0&&hero)||p.hero||p.ho[0]}); finishHero(); clearInterval(H.tick); const me=H.G.ps[0]; return [H.G,me];};
 const dig=(G,p)=>JSON.stringify(p,(k,v)=>k==='_hin'?undefined:v)+JSON.stringify(G.ps.map(q=>[q.hp,q.bd.map(m=>m.a+'/'+m.h+(m.f||''))]));
 { const [G,me]=start('Rick et Morty'); const ali=Object.keys(C).filter(id=>CD(id).tr==='r_ali'&&id!=='rm_birdperson'&&!(CD(id).fxAll||[]).length)[0]||Object.keys(C).filter(id=>CD(id).tr==='r_ali'&&id!=='rm_birdperson')[0];
   for(const w of [0,1]){ const A=[Object.assign(mk('rm_birdperson',0),{a:1,h:1,f:'t'}), Object.assign(mk(ali,0),{a:0,h:900,f:''})].concat(w?[Object.assign(mk('rm_unity',0),{a:0,h:900,f:''})]:[]); const r=simulate(A,[Object.assign(mk('rm_jerry',0),{a:3,h:900,f:''})],1,1,1,null,G.mx); const fr=r.frames.find(f=>f.s[0].length&&f.s[0][0].c!=='rm_birdperson'); out.unity.push(fr?fr.s[0].map(m=>m.c+' '+m.a):'?'); } }
 const trU={}; (SET.univ||[]).forEach(u=>(u.tribes||[]).forEach(t=>trU[t]=u.n));
 for(const U of ['South Park','Rick et Morty','Les Simpson','Dragon Ball','Naruto']){
   const [G,me]=start(U); const all=Object.keys(C).filter(id=>trU[CD(id).tr]===U&&id in G.pool);
   // sorts : tous ceux que la taverne peut proposer dans cet univers
   const seen=new Set(); for(let t=1;t<=6;t++) for(let k=0;k<400;k++){ const s=drawSpell(t); if(s) seen.add(s.sp); }
   Object.keys(SPELLS).forEach(id=>{ const S=SPELLS[id]; if((U==='Dragon Ball'&&S.db)||(U==='Rick et Morty'&&S.rm)||(U==='South Park'&&S.spk)||(U==='Les Simpson'&&S.sim)||(U==='Naruto'&&S.nin)) seen.add(id); });
   for(const id of seen){ let changed=0, cast=0, why='';
     for(let c=0;c<6&&!changed;c++){ try{ me.bd=Array.from({length:5},(_,i)=>mk(all[(i*7+c*3)%all.length],0)); if(/hiden$/.test(id)){ const trs=[...new Set(all.map(x=>CD(x).tr))]; const tr=trs[c%trs.length]; me.bd=all.filter(x=>CD(x).tr===tr).slice(0,5).map(x=>mk(x,0)); } me.hd=[{sp:id,u:UID++}, mk(all[c],0)]; me.g=30; me.ck=30; me.ki=30; me.pf=5; me.hp=20; me.disc=null; me.rsv=['feu','vent','eau','terre','foudre'].slice(0,2); me.sh=[mk(all[1],0),mk(all[2],0),mk(all[3],0)]; me.fz=false; me.lastRes=c%2?'loss':'win'; me.dbRes=c%2?'loss':'win'; me.dbDied=2;
        const d0=dig(G,me); let ok=false; for(let tg=0;tg<5&&!ok;tg++) ok=castSpell(G,me,0,tg); if(ok){cast++; const d1=dig(G,me); const strip=s=>s; if(d1!==d0) changed=1; } else why=String(typeof spellBlock==='function'?spellBlock(me,id,me.bd[0]):''); }catch(x){ out.err.push('sort '+id+' : '+String(x&&x.stack||x).slice(0,220)); } }
     out.sp.push({u:U,id,n:SPELLS[id].n,cast,changed,why}); }
   // pouvoirs héroïques
   const PFX={'South Park':/^sh_/,'Rick et Morty':/^rh_|^rmh_/,'Les Simpson':/^smh_/,'Dragon Ball':/^dh_|^dbh_/,'Naruto':/^nh_/}; const offered=new Set(); for(let k=0;k<60;k++){ V.mp=null; V.univSel=[U]; startSolo(); clearInterval(H.tick); H.G.ps.forEach(p=>p.ho.forEach(x=>offered.add(x))); } const hs=[...offered];
   out.hn=(out.hn||[]).concat([[U,hs.length]]);
   for(const h of hs){ try{ const [G2,m2]=start(U,h); m2.hero=h; if(m2.hero!==h){ out.pw.push({u:U,h,n:HEROES[h].n,st:'non attribué'}); continue; }
       const pool=Object.keys(C).filter(id=>trU[CD(id).tr]===U&&id in G2.pool); let ok=0, ch=0, can=0;
       for(let c=0;c<6&&!ch;c++){ m2.bd=Array.from({length:5},(_,i)=>mk(pool[(i*5+c*3)%pool.length],0)); m2.hd=[mk(pool[c],0)]; m2.g=30; m2.ck=30; m2.ki=30; m2.pf=5; m2.hp=20; m2.disc=null; m2.pu=false; m2.rd=9; G2.rd=9; m2.sh=[mk(pool[1],0),mk(pool[2],0),mk(pool[3],0)]; m2.dbDied=2; m2.bt={}; m2.btN=1;
         const d0=dig(G2,m2); if(powCan(m2,9)) can++; const r=OPS.pow(G2,m2); if(r){ok++; if(dig(G2,m2)!==d0) ch++;} }
       const B=HX(m2); out.pw.push({u:U,h,n:HEROES[h].n,cost:B.cost,passive:!B.cost&&!B.pw||!!(B.tr&&!B.pw),ok,ch,can,tx:(B.pt||B.tx||'').slice(0,90)}); }catch(x){ out.err.push('pouvoir '+h+' : '+String(x&&x.stack||x).slice(0,220)); } }
 }
 return out; }"""
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(); pg.set_default_timeout(600000); pg.goto('file:///home/claude/taverne.html'); pg.wait_for_timeout(1000)
    r=pg.evaluate(JS); b.close()
print('unity',r['unity']); print('err',r['err'][:10])
from collections import Counter
print('sorts',len(r['sp']),Counter(x['u'] for x in r['sp']))
print('heros',r.get('hn'))
for x in r['pw']:
    if x.get('st') or (not x['ch']): print('POUVOIR',x)
for x in r['sp']:
    if x['cast'] and not x['changed']: print('SANS EFFET',x)
for x in r['sp']:
    if not x['cast']: print('NON LANCÉ',x['u'][:6],x['id'],x['n'],x['why'][:80])
