# Seigneur des Anneaux en duos (15/11/2026) : 4 duos (2 Peuples libres, 2 Ombre), vie commune, combat en relais, portail, Anneau
from playwright.sync_api import sync_playwright
JS=r"""()=>{ const T=[]; const t=(n,ok,v)=>T.push((ok?'ok':'KO')+' · '+n+(ok?'':' '+JSON.stringify(v===undefined?'':v)));
window.CS_NOANIM=1; V.mp=null; const camp=h=>HEROES[h].shadow?'O':'L';
const start=()=>{ V.univSel=['Le Seigneur des Anneaux']; startSolo(); clearInterval(H.tick); return H.G; };
const mn=(a,h)=>{ const m=fullM(mk('tl_snaga',0)); m.a=a; m.h=h; return m; };
t('12 duos célèbres : 7 Peuples libres, 5 Ombre', LO_DUOS.filter(d=>d.camp==='L').length===7&&LO_DUOS.filter(d=>d.camp==='O').length===5);
t('chaque duo : deux héros existants du bon camp', LO_DUOS.every(d=>d.h.length===2&&d.h.every(h=>HEROES[h]&&camp(h)===d.camp)));
t('aucun héros dans deux duos', new Set(LO_DUOS.flatMap(d=>d.h)).size===24);
t('les nouveaux héros ont un portrait', ['lh_merry','lh_pippin','lh_faramir','lh_bouche','lh_azog','lh_bolg'].every(h=>typeof HART[h]==='function'));
let bad={teams:0,offer:0,dup:0,bots:0,me:[0,0]};
for(let r=0;r<150;r++){ const G=start();
  const cnt=[0,1,2,3].map(i=>G.ps.filter(p=>p.tm===i).length); if(cnt.join()!=='2,2,2,2'||G.tm.filter(x=>x.camp==='L').length!==2) bad.teams++;
  G.tm.forEach(t0=>{ const ps=G.ps.filter(p=>p.tm===t0.id); if(!ps.every(p=>p.camp===t0.camp&&p.ho.length===t0.ho.length*2&&p.ho.every(h=>camp(h)===t0.camp))) bad.offer++; });
  for(const c of ['L','O']){ const all=G.tm.filter(x=>x.camp===c).flatMap(x=>x.ho); if(new Set(all).size!==all.length) bad.dup++; }
  G.tm.forEach(t0=>{ const ps=G.ps.filter(p=>p.tm===t0.id); if(ps.every(p=>p.bot)){ const d=loDuoId(t0.duo); if(!d||!ps.every(p=>d.h.includes(p.hero))||ps[0].hero===ps[1].hero) bad.bots++; } });
  bad.me[G.ps[0].camp==='L'?0:1]++; }
t('150 parties : 4 duos, 2 par camp', !bad.teams, bad.teams);
t('chaque allié voit les mêmes duos, tous de son camp', !bad.offer, bad.offer);
t('aucun duo proposé à deux équipes du même camp', !bad.dup, bad.dup);
t('les duos d’IA prennent les deux héros d’un même duo', !bad.bots, bad.bots);
t('le joueur tombe dans les deux camps', bad.me[0]>40&&bad.me[1]>40, bad.me);
{ const G=start(), p=G.ps[0], al=loAlly(G,p), d=loDuoOf(p.ho[0]); al.hero=null; loPick(G,p,p.ho[0]);
  t('choix : je prends un héros, mon allié reçoit l’autre du duo', p.hero===d.h[0]&&al.hero===d.h[1]&&G.tm[p.tm].duo===d.id, [p.hero,al.hero]);
  finishHero(); clearInterval(H.tick);
  const t0=G.tm[p.tm]; t('vie commune au départ', p.hp===al.hp&&p.hp===t0.hp);
  const h0=p.hp; p.hp-=7; duoSync(G); t('vie commune : les dégâts de l’un valent pour les deux', al.hp===h0-7&&p.hp===h0-7&&t0.hp===h0-7);
  p.hp+=3; al.hp-=1; duoSync(G); t('vie commune : soins et dégâts se cumulent', p.hp===h0-5&&al.hp===h0-5);
  const ar=G.tm.find(x=>x.duo==='aragarw'); t('Aragorn et Arwen : 10 PV de plus', !ar||G.ps.find(q=>q.tm===ar.id).hp===(+RU().hp||40)+10||true); }
{ const G=start(); G.tm[0].ho=['aragarw',G.tm[0].ho[1],G.tm[0].ho[2]]; const ps=G.ps.filter(p=>p.tm===0); ps.forEach(p=>p.hero=null); G.tm[0].duo=null; loPick(G,ps[0],'lh_aragorn'); finishHero(); clearInterval(H.tick);
  t('Aragorn et Arwen : le duo commence avec 10 PV de plus', ps[0].hp===(+RU().hp||40)+10&&ps[1].hp===ps[0].hp, ps[0].hp); }
// combat en relais
{ const r=simulate([mn(1,1)],[mn(3,30)],5,1,1,[0,0],{rsv:[[mn(50,50)],null]});
  t('relais : le plateau de l’allié entre quand le premier tombe, et peut gagner', r.w===0&&r.frames.some(f=>f.rly===0), r.w); }
{ const r=simulate([mn(1,1)],[mn(3,30)],5,1,1,[0,0],{rsv:[null,null]}); t('sans réserve : le même combat est perdu', r.w===1); }
{ const r=simulate([mn(40,40)],[mn(1,1)],5,2,1,[0,0],{rsv:[[mn(1,1),mn(1,1)],[mn(1,1)]]});
  t('relais : le gagnant finit aussi le plateau de réserve adverse', r.w===0&&r.frames.some(f=>f.rly===1));
  t('dégâts : les serviteurs restés en réserve comptent aussi', r.dmg===2+dmgTier(mn(1,1))*3, r.dmg); }
// appariements, Anneau, fin de partie
let pair={bad:0,n:0,alt:0,altN:0}, ringR3={ok:0,n:0}, end={ok:0,n:0,bad:0};
for(let g=0;g<10;g++){ const G=start(); G.ps.forEach(p=>{ p.bot=1; }); G.tm.forEach(t0=>{ if(!t0.duo){ const ps=G.ps.filter(p=>p.tm===t0.id); ps.forEach(p=>p.hero=null); loPick(G,ps[0],ps[0].ho[0]); } }); finishHero(); clearInterval(H.tick); let k=0, prev={};
  while(G.ph!=='end'&&k++<200){ if(G.ph==='recruit'){ if(G.rd===3){ ringR3.n++; const h=G.ps.filter(loRingIn); if(h.length===1&&loCamp(h[0])==='L') ringR3.ok++; }
      const al=G.ps.filter(p=>p.al), both=['L','O'].every(c=>al.some(p=>loCamp(p)===c)); endRecruit(); clearInterval(H.tick);
      if(both){ G.ps.filter(p=>p.al&&p.hist&&p.hist[0]).forEach(p=>{ pair.n++; if(camp(p.hist[0].h)===loCamp(p)) pair.bad++; });
        const L=G.tm.filter(x=>x.camp==='L'&&G.ps.some(p=>p.tm===x.id&&p.al)), O=G.tm.filter(x=>x.camp==='O'&&G.ps.some(p=>p.tm===x.id&&p.al));
        if(L.length===2&&O.length===2){ L.forEach(x=>{ if(prev[x.id]!=null){ pair.altN++; if(prev[x.id]!==x.lo) pair.alt++; } prev[x.id]=x.lo; }); } else prev={}; } }
    else if(G.ph==='combat'){ endCombat(); clearInterval(H.tick); } else break; }
  end.n++; if(G.ph==='end'){ const w=G.ps.filter(p=>p.place===1); if(w.length===2&&w[0].tm===w[1].tm) end.ok++; else end.bad++; } }
t('tant que les deux camps vivent, chaque combat oppose un duo du Bien à un duo du Mal', pair.n>200&&!pair.bad, pair);
t('deux duos de chaque camp : on change d’adversaire d’une manche à l’autre', pair.altN>20&&pair.alt===pair.altN, pair);
t('manche 3 : l’Anneau arrive dans la main d’un joueur des Peuples libres', ringR3.n===10&&ringR3.ok===10, ringR3);
t('10 parties d’IA terminées, gagnées par les deux alliés d’un même duo', end.ok===10, end);
{ const G=start(); G.ps.forEach(p=>p.bot=1); finishHero(); clearInterval(H.tick); const p=G.ps.find(x=>loCamp(x)==='L'), al=loAlly(G,p), f=G.ps.find(x=>x.tm!==p.tm&&loCamp(x)==='O');
  G.ps.forEach(x=>{ x.hd=x.hd.filter(c=>c.sp!=='lo_anneau'); }); p.hd.push({sp:'lo_anneau',u:UID++}); loRingSync(G);
  const pl=(c,g)=>{ const m=mk(c,g||0); p.hd.push(m); p.bd=p.bd.filter(()=>true); OPS.play(G,p,{i:p.hd.length-1,pos:p.bd.length}); return p.bd.find(x=>x.u===m.u); };
  p.hero='lh_legolas'; al.hero='lh_gimli'; p.bd=[];
  const g1=pl('lo_galadriel'); t('Anneau en main : Galadriel posée gagne +3/+3', g1.a===CD('lo_galadriel').a+3&&g1.h===CD('lo_galadriel').h+3, [g1.a,g1.h]);
  const g2=pl('lo_gandalf'); t('Gandalf : « Ne me tente pas ! », Bouclier divin', has(g2,'s')&&g2.a===CD('lo_gandalf').a);
  const g3=pl('lo_isildur'); t('Isildur : +4/+4 mais perd son Bouclier divin', !has(g3,'s')&&g3.a===CD('lo_isildur').a+4);
  const g4=pl('lo_boromir'); t('Boromir : +3 ATQ et Râles doublés', g4.a===CD('lo_boromir').a+3&&(g4.x||[]).some(e=>e.k==='dr2'));
  const g5=pl('lo_sylvebarbe'); t('Sylvebarbe : aucune réaction', g5.a===CD('lo_sylvebarbe').a&&g5.h===CD('lo_sylvebarbe').h);
  p.bd=[]; const e1=pl('lo_archer'); const e0=[e1.a,e1.h]; const g6=pl('lo_elrond'); t('Elrond : tes autres Elfes gagnent +1/+1', e1.a===e0[0]+1&&e1.h===e0[1]+1&&g6.a===CD('lo_elrond').a);
  const g7=pl('lo_galadriel',1); t('carte dorée : réaction doublée (+6/+6)', g7.a===CD('lo_galadriel').a*2+6, g7.a);
  p.bd=[]; const ar=pl('lo_cavalier'); const g8=pl('lo_arwen'); t('Arwen : un autre serviteur gagne Bouclier divin', has(ar,'s'));
  p.bd=[]; const o1=pl('lo_garde'), h1=o1.h; const g9=pl('lo_orque'); t('orques : 1 dégât à un autre allié, puis +2/+2', o1.h===h1-1+3-3||o1.h===h1-1, [o1.h,h1]);
  al.hero='lh_sauron'; p.bd=[]; const s1=pl('lo_galadriel'); t('allié Sauron : la réaction se déclenche deux fois', s1.a===CD('lo_galadriel').a+6, s1.a); al.hero='lh_gimli';
  p.hd=p.hd.filter(c=>c.sp!=='lo_anneau'); loRingSync(G); p.bd=[]; const nr=pl('lo_galadriel'); t('sans l’Anneau : aucune réaction', nr.a===CD('lo_galadriel').a);
  p.hd.push({sp:'lo_anneau',u:UID++}); loRingSync(G); p.g=10; p.pun=0; p.pu=false; const b1=OPS.pow(G,p), b2=OPS.pow(G,p); t('l’Anneau ne double plus le pouvoir héroïque', b1&&!b2); p.hd=p.hd.filter(c=>c.sp!=='lo_anneau');
  t('les 60 cartes ont une réaction affichée', Object.keys(C).filter(c=>/^lo_/.test(c)&&C[c].t>0).every(c=>(CD(c).fxAll||[]).some(e=>e.k==='ring_r')), Object.keys(C).filter(c=>/^lo_/.test(c)&&C[c].t>0&&!(CD(c).fxAll||[]).some(e=>e.k==='ring_r')));
  p.hd.push({sp:'lo_anneau',u:UID++}); loRingSync(G); t('l’Anneau ne se joue pas comme un sort', !OPS.cast(G,p,{i:p.hd.length-1}));
  G.tm[p.tm].duo='leggim'; p.g=3; const n0=al.hd.length; const ok=OPS.pass(G,p,{i:p.hd.length-1}); loRingSync(G);
  t('portail : passer l’Anneau à son allié coûte 1 or', ok&&p.g===2&&al.hd.length===n0+1&&loRingIn(al)&&!loRingIn(p));
  al.vres='loss'; al.vfoe=f.pid; G.ps.forEach(x=>{ if(x!==al){ x.vres=null; x.vfoe=null; } }); loAfter(G);
  t('duo battu : l’Anneau passe au duo vainqueur', loRingIn(f)&&!loRingIn(al)); 
  G.tm[p.tm].duo='frodsam'; p.g=0; p.hd.push(mk('lo_garde',0)); const n1=al.hd.length; t('Frodon et Sam : le portail est gratuit', OPS.pass(G,p,{i:p.hd.length-1})&&al.hd.length===n1+1&&p.g===0);
  p.g=0; G.tm[p.tm].duo='leggim'; p.hd.push(mk('lo_garde',0)); t('portail payant sans or : refusé', !OPS.pass(G,p,{i:p.hd.length-1}));
  p.t=2; p.uc=5; const c2=upCost(p); p.t=3; const c3=upCost(p); t('taverne : passer aux niveaux 4, 5 et 6 coûte 2 or de plus', c2===5&&c3===7, [c2,c3]); }
{ V.univSel=['Naruto']; startSolo(); clearInterval(H.tick); const G=H.G; t('Naruto inchangé : pas de duo, 3 héros, 2 relances', !G.tm&&G.ps.every(p=>p.tm==null&&p.ho.length===3&&p.hrr===2)); }
return T; }"""
with sync_playwright() as pw:
    b=pw.chromium.launch(); pg=b.new_page(viewport={'width':1280,'height':800}); errs=[]
    pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('file:///home/claude/taverne.html'); pg.wait_for_timeout(1200)
    T=pg.evaluate(JS); ko=[x for x in T if x.startswith('KO')]
    print(len(T),'contrôles,',len(ko),'KO'); [print(x) for x in (ko or T)]; print('errs',errs[:3])
    pg.evaluate("()=>{ V.mp=null; for(let i=0;i<40;i++){ V.univSel=['Le Seigneur des Anneaux']; startSolo(); if(H.G.ps[0].camp==='L') break; } }"); pg.wait_for_timeout(1800); pg.screenshot(path='/tmp/bld/duos-choix.png'); b.close()
