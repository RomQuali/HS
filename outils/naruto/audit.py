from playwright.sync_api import sync_playwright
import json
JS=r"""()=>{V.mp=null; V.univSel=['Naruto']; startSolo(); try{finishHero()}catch(e){} clearInterval(H.tick); const G=H.G,p=G.ps[0]; p.hero='nh_bee';
const T=[]; const t=(n,ok,v)=>T.push((ok?'ok':'KO')+' · '+n+(ok?'':' '+JSON.stringify(v===undefined?'':v)));
const NEU=['nk_ao','nk_zaku','nk_ameyuri'];   // figurants
const reset=(ids)=>{p.bd=ids.map(x=>mk(x,0)); p.hd=[]; p.g=0; p.ck=10; p.uc=5; p.inc=[]; p.foe=null; p.sh=['nk_matsuri','nk_dosu','nk_suigetsu'].map(x=>mk(x,0)); G.rd=(G.rd||1)+1; return p.bd;};
const snap=()=>({g:p.g,ck:p.ck,uc:p.uc,inc:(p.inc||[])[0]||0,n:p.bd.length,sh:p.sh.filter(x=>!x.sp).length,shs:p.sh.reduce((s,x)=>s+x.a+x.h,0),bd:p.bd.map(m=>({u:m.u,c:m.c,a:m.a,h:m.h,f:m.f||'',g:m.g||0}))});
// vérifie une liste d'effets de jutsu en comparant avant/après
function expectFx(name, fxs, m, B, A, k){ let da=0,dh=0; const me0=B.bd.find(x=>x.u===m.u), me1=A.bd.find(x=>x.u===m.u); const oth=(u)=>{const a=A.bd.find(x=>x.u===u),b=B.bd.find(x=>x.u===u); return a&&b?[a.a-b.a,a.h-b.h]:null;};
  const others=B.bd.filter(x=>x.u!==m.u); let ok=true, why=[];
  let selfA=0,selfH=0, expG=0, expUc=0, expInc=0, expSum=[], tribeBuff={}, randBuff=[], kwGive=[], selfKw=[], dev=0, rob=0;
  fxs.forEach(e=>{ switch(e.k){ case 'bc_self': selfA+=e.a*k; selfH+=e.h*k; break; case 'bc_gold': expG+=e.n*k; break; case 'bc_upd': expUc+=e.n*k; break; case 'bc_inc': expInc+=e.n*k; break;
    case 'bc_summon': for(let i=0;i<e.n;i++) expSum.push(e.card); break; case 'bc_buff_tribe': tribeBuff[e.tb]=[(tribeBuff[e.tb]||[0,0])[0]+e.a*k,(tribeBuff[e.tb]||[0,0])[1]+e.h*k]; break;
    case 'bc_buff_rand': randBuff.push([e.a*k,e.h*k,e.tb]); break; case 'bc_kw': kwGive.push([e.kw,e.n*k,e.tb||'']); break; case 'bc_kwself': selfKw.push(e.kw); break; case 'bc_devour': dev++; break; case 'bc_robshop': rob+=e.n; break; default: why.push('effet non vérifié '+e.k); ok=false; } });
  if(A.g-B.g!==expG){ok=false;why.push('or '+(A.g-B.g)+'≠'+expG);} if(B.uc-A.uc!==Math.min(expUc,B.uc)){ok=false;why.push('amélioration');} if(A.inc-B.inc!==expInc){ok=false;why.push('or prochain tour');}
  const newc=A.bd.filter(x=>!B.bd.some(y=>y.u===x.u)).map(x=>x.c).sort(); if(JSON.stringify(newc)!==JSON.stringify(expSum.slice().sort())){ok=false;why.push('invocations '+newc);}
  // bonus attendus sur les autres
  let totOther=[0,0]; others.forEach(o=>{const d=oth(o.u); if(d){totOther[0]+=d[0]; totOther[1]+=d[1];}});
  let expOther=[0,0]; for(const tb in tribeBuff){ const n=others.filter(o=>!tb||CD(o.c).tr===tb).length; expOther[0]+=tribeBuff[tb][0]*n; expOther[1]+=tribeBuff[tb][1]*n; }
  randBuff.forEach(r=>{ if(others.some(o=>!r[2]||CD(o.c).tr===r[2])){expOther[0]+=r[0]; expOther[1]+=r[1];} });
  // les invocations fraîches reçoivent aussi les bonus de famille appliqués après elles : on tolère en recalculant sur l'état final
  const fresh=A.bd.filter(x=>!B.bd.some(y=>y.u===x.u)); let freshBonus=[0,0]; fresh.forEach(x=>{const b=CD(x.c); freshBonus[0]+=x.a-b.a*(x.g?2:1); freshBonus[1]+=x.h-b.h*(x.g?2:1);});
  if(totOther[0]!==expOther[0]||totOther[1]!==expOther[1]){ok=false;why.push('bonus aux autres '+totOther+'≠'+expOther);}
  // soi-même : bc_self + engloutir + vol de taverne
  const dS=[me1.a-me0.a,me1.h-me0.h];
  if(dev){ if(B.sh-A.sh!==Math.min(dev,B.sh)){ok=false;why.push('taverne non mangée '+(B.sh-A.sh));} if(dS[0]<=selfA||dS[1]<=selfH){ok=false;why.push('engloutir sans gain');} }
  else if(rob){ if(B.shs-A.shs<=0||dS[0]+dS[1]!==(B.shs-A.shs)*k+selfA+selfH){ok=false;why.push('vol '+dS+' taverne '+(B.shs-A.shs));} }
  else if(dS[0]!==selfA||dS[1]!==selfH){ok=false;why.push('soi '+dS+'≠'+[selfA,selfH]);}
  selfKw.forEach(kw=>{ if(!me1.f.includes(kw)){ok=false;why.push('mot-clé soi '+kw);} });
  kwGive.forEach(([kw,n,tb])=>{ const cand=others.filter(o=>!o.f.includes(kw)&&(!tb||CD(o.c).tr===tb)).length, got=others.filter(o=>!o.f.includes(kw)&&A.bd.find(x=>x.u===o.u).f.includes(kw)).length; if(got!==Math.min(n,cand)){ok=false;why.push('mot-clé donné '+kw+' '+got+'/'+Math.min(n,cand));} });
  t(name, ok, why);
}
const ids=Object.keys(G.pool).sort((a,b)=>CD(a).t-CD(b).t);
// 1) jutsus et transformations de chaque carte, isolée de ses groupes (figurants neutres), normale puis dorée
for(const id of ids){ for(const gold of [0,1]){ const J=jutOf({c:id}), nm=CD(id).n+(gold?' (dorée)':'');
  const fig=NEU.filter(x=>x!==id).slice(0,2).concat(CD(id).tr==='nk_kon'?[]:[]); reset([]); p.bd=[mk(id,gold)].concat(fig.map(x=>mk(x,0))); const m=p.bd[0], k=gold?2:1;
  const cost=jutCost(p,m); if(cost!==CD(id).t){ t(nm+' : coût du jutsu = niveau', false, [cost,CD(id).t]); }
  let B=snap(); const ok1=OPS.jutsu(G,p,{i:0}); let A=snap();
  if(!ok1){ t(nm+' : jutsu lancé', false, jutBlock(G,p,m)); continue; }
  if(B.ck-A.ck!==cost) t(nm+' : chakra dépensé', false, [B.ck-A.ck,cost]);
  expectFx(nm+' · jutsu « '+J.nm+' »', J.fx, m, B, A, k);
  if(OPS.jutsu(G,p,{i:p.bd.indexOf(m)})) t(nm+' : une seule fois par tour', false);
  if(J.tf){ const TF=J.tf; reset([]); p.bd=[mk(id,gold)].concat(fig.map(x=>mk(x,0))); const m2=p.bd[0]; p.ck=10; const c=nkTfCost(p,m2); const b=snap(); const okT=OPS.nktf(G,p,{i:0}); const a=snap(); const d=[m2.a-b.bd[0].a,m2.h-b.bd[0].h];
    t(nm+' · transformation « '+TF.nm+' »', okT&&c===TF.c&&b.ck-a.ck===TF.c&&d[0]===TF.a*k&&d[1]===TF.h*k&&(!TF.kw||has(m2,TF.kw))&&(TF.x||[]).every(o=>(m2.x||[]).some(y=>y.k===o.k))&&m2.tf===1&&m2.tfn===TF.nm&&nkTfCost(p,m2)===null&&!OPS.nktf(G,p,{i:0})&&!!ART[id+'_tf1'], [okT,c,b.ck-a.ck,d,m2.f,m2.x,m2.tfn]);
    if(TF.fx){ G.rd++; p.ck=10; p.sh=['nk_matsuri','nk_dosu','nk_suigetsu'].map(x=>mk(x,0)); const B2=snap(); const o2=OPS.jutsu(G,p,{i:p.bd.indexOf(m2)}); const A2=snap(); if(!o2) t(nm+' : jutsu renforcé lancé', false, jutBlock(G,p,m2)); else expectFx(nm+' · jutsu renforcé', TF.fx, m2, B2, A2, k); }
  } } }
return T}"""
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(); errs=[]; pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('file:///home/claude/taverne.html'); pg.wait_for_timeout(1200)
    r=pg.evaluate(JS); ko=[x for x in r if x.startswith('KO')]
    print(len(r),'contrôles,',len(ko),'KO'); [print(x[:330]) for x in ko]; print('errs',errs[:3]); b.close()
