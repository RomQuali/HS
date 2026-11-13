from playwright.sync_api import sync_playwright
JS=r"""()=>{ const T=[]; const t=(n,ok,v)=>T.push((ok?'ok':'KO')+' · '+n+(ok?'':' '+JSON.stringify(v===undefined?'':v)));
window.CS_NOANIM=1;
const start=(U,hero,aw)=>{V.mp=null; V.univSel=[U]; startSolo(); H.G.ps.forEach(q=>{q.hero=q.hero||q.ho[0];}); if(hero) H.G.ps[0].hero=hero; try{finishHero()}catch(e){} clearInterval(H.tick); const p=H.G.ps[0]; if(hero){p.hero=hero; p.qp=0; p.haw=0; p.pu=false;} if(aw) heroAwaken(p); return [H.G,p];};
const next=()=>{ H.G.ps.forEach(q=>{ q.hp=40; }); endRecruit(); clearInterval(H.tick); const f=V.fight; endCombat(); clearInterval(H.tick); return f; };
const st=m=>[m.a,m.h];
const pool=(G,tb)=>Object.keys(G.pool).filter(c=>!tb||CD(c).tr===tb);
// cartes « calmes » : aucun effet de début de combat, d'aura, de fin de tour ni de pose, pour ne mesurer que la règle testée
const calm=(G,tb)=>pool(G,tb).filter(c=>!(CD(c).fxAll||[]).some(e=>['soc','aura','eot','play','bc','sot','sell','buy','spend','hand','don','donc','die','atk','aatk'].includes((ET[e.k]||{}).tr)));
const dummy=(G,a,h)=>{const m=fullM(mk(calm(G)[0],0)); m.a=a; m.h=h; m.f=''; m.x=[]; return m;};
// serviteurs neutres (sans effet gênant) rattachés à la famille voulue, comme le fait une conversion : on ne mesure que la règle de cohésion
const distinct=(G,tb,n)=>{const own=calm(G,tb), any=calm(G).filter(x=>!own.includes(x)); return own.concat(any).slice(0,n).map(x=>{const m=mk(x,0); if(CD(x).tr!==tb) m.fam=tb; m.f=''; return m;});};
// état de mon plateau juste après les effets de début de combat (avant la première attaque)
const socState=(G,p,bd)=>{ p.bd=bd; const b=combatBoard(p); const r=simulate(b,[dummy(G,0,900)],5,1,1,[0,0],G.mx); const i=r.frames.findIndex(f=>f.at); const fr=r.frames[Math.max(0,i-1)].s[0]; return b.map(m=>{const x=fr.find(y=>y.u===m.u); return x?[x.a-m.a,x.h-m.h,[...(x.f||'')].filter(k=>!(m.f||'').includes(k)).join('')]:null;}); };
// ================= SOUTH PARK : Cohésion de groupe =================
{ let [G,p]=start('South Park','sh_kenny'); const TR=G.laws[0].trs;
  for(const tb of TR){ const nm=trName(tb), oth=TR.find(x=>x!==tb);
    const mk3=()=>{const d=distinct(G,tb,3); d.forEach(m=>{m.a=5;m.h=50;}); return d;}; const o1=()=>{const m=distinct(G,oth,1)[0]; m.a=5; m.h=50; return m;};
    let c=mk3(); const solo=c.map(m=>socState(G,p,[m])[0]);
    c=mk3(); const d2=socState(G,p,[c[0],c[1]]); t(nm+' : deux voisins, chacun +1/+1 au début du combat', [0,1].every(i=>d2[i][0]-solo[i][0]===1&&d2[i][1]-solo[i][1]===1), [solo,d2]);
    c=mk3(); const ds=socState(G,p,[c[0],o1(),c[1]]); t(nm+' : séparés par une autre famille, aucun bonus', ds[0][0]-solo[0][0]===0&&ds[2][0]-solo[1][0]===0, ds);
    c=mk3(); const d3=socState(G,p,c).map((d,i)=>[d[0]-solo[i][0],d[1]-solo[i][1],d[2]]);
    const E={s_gin:[[3,3],[4,4],[3,3]], s_adu:[[1,4],[2,5],[1,4]], s_got:[[1,1],[2,2],[1,1]], s_cel:[[1,1],[2,2],[1,1]], s_ani:[[1,1],[2,2],[1,1]]}[tb], F={s_got:'n',s_cel:'s',s_ani:'r'}[tb];
    t(nm+' : bande de 3 activée ('+BAND_FX[tb][0]+')', d3.every((d,i)=>d[0]===E[i][0]&&d[1]===E[i][1]&&(!F||d[2].includes(F)||has(c[i],F))), d3); }
  // 3 tours réels : la bande d'Adultes rapporte 1 or à chaque tour, et les bonus de cohésion ne restent pas
  const run3=(tb)=>{ [G,p]=start('South Park','sh_kenny'); p.bd=distinct(G,tb,3); const g=[], keep=[], inc=[]; for(let i=0;i<3;i++){ p=H.G.ps[0]; const s0=p.bd.map(st); const f=next(); p=H.G.ps[0]; g.push(p.g); inc.push(f.r.inc?f.r.inc[f.me===1?1:0]:0); keep.push(p.bd.length===3&&p.bd.every((m,j)=>m.a===s0[j][0]&&m.h===s0[j][1])); } return [g,keep,inc]; };
  const ctrl=run3('s_cel'), adu=run3('s_adu');
  t('bande d\'Adultes : 1 or de plus au début de chacun des 3 tours', adu[0].every((g,i)=>g===ctrl[0][i]+1)&&adu[2].every(x=>x===1), [ctrl[0],adu[0],adu[2]]);
  t('cohésion : bonus valables pour le combat seulement (stats identiques après chacun des 3 combats)', adu[1].every(Boolean)&&ctrl[1].every(Boolean), [adu[1],ctrl[1]]);
  { [G,p]=start('South Park','sh_kenny'); const co=pool(G,'s_ani').find(c=>(CD(c).fxAll||[]).some(e=>e.k==='soc_kw')); const o=mk(pool(G,'s_ani').find(c=>!(CD(c).f||'').includes('r')&&c!==co),0); o.h=50; const d=socState(G,p,[mk(co,0),distinct(G,'s_cel',1)[0],o]); t(CD(co).n+' : Réincarnation à un autre Animal au début du combat', d[2][2].includes('r'), d); }
  { [G,p]=start('South Park','sh_kenny'); const je=pool(G,'s_cel').find(c=>(CD(c).fxAll||[]).some(e=>e.k==='soc_kw')); const o=mk(pool(G,'s_cel').find(c=>!(CD(c).f||'').includes('s')&&c!==je),0); o.h=50; const d=socState(G,p,[mk(je,0),distinct(G,'s_adu',1)[0],o]); t(CD(je).n+' : Bouclier divin à une autre Célébrité au début du combat', d[2][2].includes('s'), d); }
}
// ================= HÉROS : pouvoir de base puis pouvoir éveillé, 3 tours de suite chacun =================
const H3=(U,h,aw,label,setup,check)=>{ let [G,p]=start(U,h,aw); const res=[]; try{ for(let turn=0;turn<3;turn++){ G=H.G; p=G.ps[0]; p.g=10; p.hd=[]; setup(G,p,turn); const g0=p.g; const ok=OPS.pow(G,p); const again=OPS.pow(G,p); const cost=HX(p).cost; const r=check(G,p,turn); res.push(ok&&!again&&g0-p.g===cost-(HX(p).pw.s.some(s=>s.k==='raf'&&s.g)?1:0)&&r===true?1:[ok,again,g0-p.g,r]); p.bd=p.bd.slice(0,2); next(); if(H.G.ph!=='recruit') break; } }catch(e){res.push(String(e).slice(0,160));} t(HEROES[h].n+(aw?' (éveillé)':'')+' : '+label+' — à chacun des 3 tours, une fois par tour', res.length===3&&res.every(x=>x===1), res); };
const famBd=(G,tb,n)=>{const d=distinct(G,tb,n); d.forEach(m=>{m.x=[];}); return d;};
let s0;
for(const aw of [0,1]){ const k=aw?2:1;
 H3('South Park','sh_cartman',aw,'voisins de même famille '+(aw?'+2/+1':'+1/+1'),(G,p)=>{p.bd=famBd(G,'s_adu',2).concat(famBd(G,'s_cel',1)); s0=p.bd.map(st);},(G,p)=>(p.bd[0].a===s0[0][0]+k&&p.bd[0].h===s0[0][1]+1&&p.bd[1].a===s0[1][0]+k&&p.bd[2].a===s0[2][0])||[p.bd.map(st),s0]);
 H3('South Park','sh_stan',aw,(aw?'2 Bestioles':'1 Bestiole')+', puis Bestioles +1/+1',(G,p)=>{p.bd=famBd(G,'s_adu',1);},(G,p)=>{const b=p.bd.filter(m=>m.c==='tk_bestiole'); return (b.length===k&&b.every(m=>m.a===2+1+1&&m.h===1+1+(aw?1:0)))||b.map(m=>[m.g,m.a,m.h]);});
 H3('South Park','sh_kyle',aw,(aw?'deux fois ':'')+'une suite de voisins +1/+1',(G,p)=>{p.bd=famBd(G,'s_adu',3); s0=p.bd.map(st);},(G,p)=>p.bd.every((m,i)=>m.a===s0[i][0]+k&&m.h===s0[i][1]+k)||[p.bd.map(st),s0]);
 H3('South Park','sh_kenny',aw,'Réincarnation et '+(aw?'+1/+2':'+0/+1'),(G,p)=>{p.bd=famBd(G,'s_adu',1); p.bd[0].f=''; s0=p.bd.map(st);},(G,p)=>(has(p.bd[0],'r')&&p.bd[0].a===s0[0][0]+(aw?1:0)&&p.bd[0].h===s0[0][1]+(aw?2:1))||[p.bd[0].f,st(p.bd[0]),s0]);
 H3('South Park','sh_butters',aw,aw?'+3/+3 et 2 ennemis −3 ATQ':'+2/+2 puis +1/+1',(G,p)=>{p.bd=famBd(G,'s_adu',1); p.foe=null; s0=p.bd.map(st);},(G,p)=>(p.bd[0].a===s0[0][0]+3&&p.bd[0].h===s0[0][1]+3&&(!aw||(p.foe&&JSON.stringify(p.foe.chill)==='[3,3]')))||[st(p.bd[0]),s0,p.foe]);
 H3('South Park','sh_garrison',aw,'regroupe, voisins +1/+1, bande '+(aw?'+2/+2':'+2/+1'),(G,p)=>{const a=famBd(G,'s_adu',3), c=famBd(G,'s_cel',1); p.bd=[a[0],c[0],a[1],a[2]]; s0=new Map(p.bd.map(m=>[m.u,st(m)]));},(G,p)=>{const ad=p.bd.filter(m=>famOf(m)==='s_adu'), ce=p.bd.find(m=>famOf(m)==='s_cel'); const i=p.bd.map(m=>famOf(m)).join(); return (i.includes('s_adu,s_adu,s_adu')&&ad.every(m=>m.a===s0.get(m.u)[0]+3&&m.h===s0.get(m.u)[1]+(aw?3:2))&&ce.a===s0.get(ce.u)[0])||[i,p.bd.map(m=>[m.a-s0.get(m.u)[0],m.h-s0.get(m.u)[1]])];});
 H3('South Park','sh_chef',aw,'un objet culte en main',(G,p)=>{p.bd=famBd(G,'s_adu',1);},(G,p)=>(p.hd.length===1&&!!p.hd[0].sp)||p.hd.map(x=>x.sp||x.c));
 H3('South Park','sh_mackey',aw,(aw?'deux serviteurs gagnent':'un serviteur gagne')+' un effet de fin de tour',(G,p)=>{p.bd=famBd(G,'s_adu',3);},(G,p)=>p.bd.filter(m=>(m.x||[]).length===1).length===k||p.bd.map(m=>(m.x||[]).length));
 H3('South Park','sh_wendy',aw,'famille la plus nombreuse '+(aw?'+2/+2':'+1/+1'),(G,p)=>{p.bd=famBd(G,'s_adu',2).concat(famBd(G,'s_cel',1)); s0=p.bd.map(st);},(G,p)=>(p.bd[0].a===s0[0][0]+k&&p.bd[1].h===s0[1][1]+k&&p.bd[2].a===s0[2][0])||[p.bd.map(st),s0]);
 const any=G=>mk(calm(G)[0],0);
 H3('Les Simpson','smh_homer',aw,aw?'trois Donuts':'deux Donuts',(G,p)=>{p.bd=[any(G)];},(G,p)=>p.hd.filter(x=>x.sp===DON).length===k+1||p.hd.map(x=>x.sp));
 H3('Les Simpson','smh_marge',aw,'Bouclier divin à '+(aw?'deux serviteurs':'un serviteur')+' pour le prochain combat',(G,p)=>{p.bd=calm(G).slice(0,3).map(c=>{const m=mk(c,0); m.f=''; return m;});},(G,p)=>p.bd.filter(m=>m.tmp&&(m.tmp.f||'').includes('s')).length===k||p.bd.map(m=>m.tmp));
 H3('Les Simpson','smh_maggie',aw,(aw?'2 dégâts':'1 dégât')+' à tous les ennemis au prochain combat',(G,p)=>{p.bd=[any(G)]; p.foe=null;},(G,p)=>(p.foe&&p.foe.aoe===k)||p.foe);
 H3('Les Simpson','smh_ned',aw,(aw?'+2/+2':'+1/+1')+', et autant par serviteur acheté ce tour',(G,p)=>{p.bd=[any(G)]; p.sh=[mk(calm(G)[1],0)]; p.bt=null; OPS.buy(G,p,{i:0}); p.hd=[]; p.g=10; s0=st(p.bd[0]);},(G,p)=>(p.bd[0].a===s0[0]+2*k&&p.bd[0].h===s0[1]+2*k)||[st(p.bd[0]),s0,p.bt]);
 H3('Les Simpson','smh_bart',aw,'copie du premier ennemi tué'+(aw?' et 1 or récupéré':''),(G,p)=>{p.bd=[any(G)];},(G,p)=>true);
 // Bart : la copie arrive vraiment, à chaque combat
 { let [G,p]=start('Les Simpson','smh_bart',aw); const res=[]; for(let i=0;i<3;i++){ p=H.G.ps[0]; p.g=10; p.bd=[any(H.G)]; p.bd[0].a=50; p.bd[0].h=200; p.hd=[]; OPS.pow(H.G,p); H.G.ps.forEach((q,j)=>{ if(j) q.bd=[mk(calm(H.G)[2],0)]; }); next(); p=H.G.ps[0]; res.push(p.hd.filter(x=>!x.sp).map(x=>x.c)); } t('Bart'+(aw?' (éveillé)':'')+' : une copie du premier ennemi tué arrive en main après chacun des 3 combats', res.every(x=>x.length===1&&x[0]===calm(H.G)[2]), res); }
}
// Mackey : l'effet donné agit à chaque fin de tour
{ let [G,p]=start('South Park','sh_mackey',1); p.bd=famBd(G,'s_adu',3); p.g=10; OPS.pow(G,p); const res=[]; for(let i=0;i<3;i++){ p=H.G.ps[0]; const a=p.bd.map(st); next(); p=H.G.ps[0]; res.push(p.bd.reduce((s,m,j)=>s+m.a-a[j][0],0)); } t('Mackey : l\'effet donné agit à chacune des 3 fins de tour', res.every(x=>x>=2), res); }
// passifs : or du tour, actualisation gratuite, ventes
const gold3=(U,h,aw)=>{ let [G,p]=start(U,h,aw); p.bd=[mk(calm(G)[0],0)]; const g=[]; for(let i=0;i<3;i++){ next(); g.push(H.G.ps[0].g); } return g; };
const rolls3=(U,h,aw)=>{ let [G,p]=start(U,h,aw); p.bd=[mk(calm(G)[0],0)]; const r=[]; for(let i=0;i<3;i++){ p=H.G.ps[0]; p.g=5; const g0=p.g; OPS.roll(H.G,p); const g1=p.g; OPS.roll(H.G,p); r.push([g0-g1,g1-p.g]); next(); } return r; };
const sells3=(U,h,aw)=>{ let [G,p]=start(U,h,aw); const r=[]; for(let i=0;i<3;i++){ p=H.G.ps[0]; p.bd=[mk(calm(H.G)[0],0),mk(calm(H.G)[1],0),mk(calm(H.G)[2],0)]; p.g=0; OPS.sell(H.G,p,{i:2}); OPS.sell(H.G,p,{i:1}); r.push(p.g); next(); } return r; };
{ const c=gold3('South Park','sh_kenny',0), r0=gold3('South Park','sh_randy',0), r1=gold3('South Park','sh_randy',1);
  t('Randy : +1 or à chaque début de tour (base et éveillé)', r0.every((x,i)=>x===c[i]+1)&&r1.every((x,i)=>x===c[i]+1), [c,r0,r1]);
  t('Randy de base : actualisation payante, vente à 1 or', rolls3('South Park','sh_randy',0).every(r=>r[0]===1&&r[1]===1)&&sells3('South Park','sh_randy',0).every(x=>x===2), [rolls3('South Park','sh_randy',0),sells3('South Park','sh_randy',0)]);
  t('Randy éveillé : première actualisation gratuite à chaque tour, ventes à 2 or', rolls3('South Park','sh_randy',1).every(r=>r[0]===0&&r[1]===1)&&sells3('South Park','sh_randy',1).every(x=>x===4), [rolls3('South Park','sh_randy',1),sells3('South Park','sh_randy',1)]); }
{ const c=gold3('Les Simpson','smh_homer',0);
  const a0=gold3('Les Simpson','smh_abe',0), a1=gold3('Les Simpson','smh_abe',1); t('Abe de base : sieste, aucun or aux 2 premiers tours', a0[0]===0, a0); t('Abe éveillé : +1 or à chaque début de tour', a1.every((x,i)=>x===c[i]+1), [c,a1]);
  { let [G,p]=start('Les Simpson','smh_abe',0); const d=[]; for(let i=0;i<3;i++){ next(); p=H.G.ps[0]; d.push([H.G.rd,p.g,!!p.disc,p.disc?p.disc.map(m=>CD(m.c).t):null]); if(p.disc){ let n=0; while(p.disc&&n<5){ OPS.pick(H.G,p,{i:0}); n++; } d[d.length-1].push(n, p.hd.filter(x=>!x.sp).length); } } t('Abe de base : au tour 3, trois découvertes de niveau 3 à la suite', d.some(x=>x[2]&&x[3].every(v=>v===3)&&x[4]===3&&x[5]===3), d); }
  const b0=gold3('Les Simpson','smh_burns',0), b1=gold3('Les Simpson','smh_burns',1); t('Burns : +1 or à chaque début de tour (base et éveillé)', b0.every((x,i)=>x===c[i]+1)&&b1.every((x,i)=>x===c[i]+1), [c,b0,b1]);
  t('Burns éveillé : première actualisation gratuite à chaque tour', rolls3('Les Simpson','smh_burns',1).every(r=>r[0]===0&&r[1]===1)&&rolls3('Les Simpson','smh_burns',0).every(r=>r[0]===1), [rolls3('Les Simpson','smh_burns',1),rolls3('Les Simpson','smh_burns',0)]);
  { let [G,p]=start('Les Simpson','smh_burns',0); const inc=[]; for(let i=0;i<3;i++){ p=H.G.ps[0]; p.bd=[mk(calm(H.G)[0],0),mk(calm(H.G)[1],0),mk(calm(H.G)[2],0)]; const g0=p.g; OPS.sell(H.G,p,{i:2}); OPS.sell(H.G,p,{i:1}); const spare=p.g; p.g=0; next(); inc.push(H.G.ps[0].g-b0[i]); } t('Burns : la première vente de chaque tour (elle seule) rapporte 1 or au tour suivant', inc.every(x=>x===1), inc); }
  const cu=(h,aw)=>{ let [G,p]=start('Les Simpson',h,aw); const a=upCost(p); next(); next(); return [a,upCost(H.G.ps[0])]; };
  const u0=cu('smh_homer',0), um=cu('smh_moe',0), ul0=cu('smh_lisa',0), ul1=cu('smh_lisa',1);
  t('Moe : améliorer la taverne coûte 1 or de moins, à chaque tour', um[0]===u0[0]-1&&um[1]===Math.max(0,u0[1]-1), [u0,um]); t('Moe éveillé : première actualisation gratuite à chaque tour', rolls3('Les Simpson','smh_moe',1).every(r=>r[0]===0&&r[1]===1)&&rolls3('Les Simpson','smh_moe',0).every(r=>r[0]===1), [rolls3('Les Simpson','smh_moe',1),rolls3('Les Simpson','smh_moe',0)]);
  t('Lisa : coût normal de base, 1 or de moins une fois éveillée', ul0[0]===u0[0]&&ul1[0]===u0[0]-1&&ul1[1]===Math.max(0,u0[1]-1), [u0,ul0,ul1]);
  for(const aw of [0,1]){ let [G,p]=start('Les Simpson','smh_lisa',aw); const res=[]; for(let i=0;i<3;i++){ p=H.G.ps[0]; p.g=20; p.hd=[]; p.disc=null; const t0=p.t; const ok=OPS.up(H.G,p); res.push([ok,!!p.disc,p.disc&&p.disc.length,p.disc&&p.disc.every(m=>CD(m.c).t===t0)]); if(p.disc) OPS.pick(H.G,p,{i:0}); next(); } t('Lisa'+(aw?' (éveillée)':'')+' : à chacune des 3 améliorations, découvre un serviteur du niveau quitté (un parmi trois)', res.every(r=>r[0]&&r[1]&&r[2]===3&&r[3]), res); }
  for(const aw of [0,1]){ let [G,p]=start('Les Simpson','smh_krusty',aw); const res=[], sot=[]; for(let i=0;i<3;i++){ p=H.G.ps[0]; sot.push(p.sh.filter(x=>!x.sp).map(m=>[m.a-CD(m.c).a,m.h-CD(m.c).h])); p.bd=[mk(calm(H.G)[0],0),mk(calm(H.G)[1],0)]; const s=()=>p.sh.filter(x=>!x.sp).reduce((a,m)=>a+m.a+m.h,0); const a=s(); OPS.sell(H.G,p,{i:1}); res.push(s()-a); next(); }
    t('Krusty'+(aw?' (éveillé)':'')+' : chaque vente donne '+(aw?'quatre':'trois')+' fois +1/+1 dans la taverne', res.every(x=>x===(aw?8:6)), res); t('Krusty'+(aw?' (éveillé)':'')+' : à chaque début de tour, la taverne gagne '+(aw?'+1/+1':'+1 ATQ'), sot.slice(1).every(b=>b.length&&b.every(d=>d[0]===1&&d[1]===(aw?1:0))), sot); } }
// Chef : bonus quand on utilise un objet culte
for(const aw of [0,1]){ let [G,p]=start('South Park','sh_chef',aw); const res=[]; for(let i=0;i<3;i++){ p=H.G.ps[0]; p.g=10; p.hd=[]; p.bd=[mk(calm(H.G)[0],0)]; p.bd[0].h=30; OPS.pow(H.G,p); const it=p.hd[0], S=it&&SPELLS[it.sp]; const a=st(p.bd[0]); const ok=it?OPS.cast(H.G,p,{i:0,tg:0}):false; res.push([it&&it.sp,ok,p.bd[0].a-a[0],p.bd[0].h-a[1]]); p.hd=[]; next(); } t('Chef'+(aw?' (éveillé)':'')+' : objet reçu puis utilisé à chacun des 3 tours (bonus du passif en plus de l\'objet)', res.every(r=>r[0]&&r[1]), res); }
// Donuts
{ let [G,p]=start('Les Simpson','smh_moe'); const v=calm(G); p.bd=[mk(v[0],0),mk(v[1],0),mk(v[2],0)]; p.hd=[]; const m=p.bd[1], s1=st(m); giveDonut(p,1); const di=p.hd.findIndex(x=>x.sp===DON); OPS.cast(G,p,{i:di,tg:1}); t('Donut : +1/+1 définitif sur le serviteur choisi', m.a===s1[0]+1&&m.h===s1[1]+1, [st(m),s1]);
  const up=pool(G).find(c=>(CD(c).fxAll||[]).some(e=>e.k==='bc_donut_up')), e=CD(up).fxAll.find(x=>x.k==='bc_donut_up'); p.hd=[mk(up,0)]; p.g=10; OPS.play(G,p,{i:0,pos:3}); const s2=st(m); p.hd=[]; giveDonut(p,1); OPS.cast(G,p,{i:0,tg:1}); t(CD(up).n+' : les Donuts suivants donnent '+fxText(e).replace(/.*donnent /,'').replace(/ pour.*/,''), m.a-s2[0]===1+(e.a||0)&&m.h-s2[1]===1+(e.h||0), [m.a-s2[0],m.h-s2[1],e]);
  const L=pool(G).find(c=>(CD(c).fxAll||[]).some(e=>e.k==='eot_donut_l')), R=pool(G).find(c=>(CD(c).fxAll||[]).some(e=>e.k==='eot_donut_r'));
  [G,p]=start('Les Simpson','smh_moe'); p.bd=[mk(v[0],0),mk(L,0),mk(R,0),mk(v[1],0)]; const res=[]; for(let i=0;i<3;i++){ p=H.G.ps[0]; const a=[st(p.bd[0]),st(p.bd[3])]; next(); p=H.G.ps[0]; res.push([p.bd[0].a-a[0][0],p.bd[0].h-a[0][1],p.bd[3].a-a[1][0],p.bd[3].h-a[1][1]]); }
  t(CD(L).n+' et '+CD(R).n+' : un Donut sur le voisin de gauche et de droite à chacune des 3 fins de tour', res.every(r=>r.every(x=>x===1)), res); }
return T}"""
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(); errs=[]; pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('file:///home/claude/taverne.html'); pg.wait_for_timeout(1200); pg.set_default_timeout(600000)
    r=pg.evaluate(JS); ko=[x for x in r if x.startswith('KO')]
    print(len(r),'contrôles,',len(ko),'KO'); [print(x[:600]) for x in ko]; print('errs',errs[:3]); b.close()
