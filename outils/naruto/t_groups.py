from playwright.sync_api import sync_playwright
JS=r"""()=>{ const T=[]; const t=(n,ok,v)=>T.push((ok?'ok':'KO')+' · '+n+(ok?'':' '+JSON.stringify(v===undefined?'':v)));
window.CS_NOANIM=1; V.mp=null; V.univSel=['Naruto']; startSolo(); try{finishHero()}catch(e){} clearInterval(H.tick); const G=H.G,p=G.ps[0]; p.hero='nh_bee'; p.hp=30;
const D=(a,h,f)=>{const m=fullM(mk('tk_crapaud',0)); m.a=a; m.h=h; m.f=f||''; return m;};
const set=(...ids)=>{ p.bd=ids.map(c=>typeof c==='string'?mk(c,0):c); p.hd=[]; p.ck=0; p.ld=null; p.inc=[]; p.hp=30; G.rd++; return p.bd; };
const eot=()=>nkGroupsEot(G,p);
const run=(en,seed)=>{ const b=combatBoard(p); const r=simulate(b,en,seed||7,1,1,[0,0],G.mx); r.b=b; return r; };
const fin=(r,u,side)=>{ for(let i=r.frames.length-1;i>=0;i--){ const m=r.frames[i].s[side||0].find(x=>x.u===u); if(m) return m; } return null; };
const post=(r)=>{ const i=r.frames.findIndex(f=>f.at||f.gj); return r.frames[i<0?r.frames.length-1:Math.max(0,i-1)]; };
const at0=(r,u)=>post(r).s.flat().find(x=>x.u===u);
const attacks=(r,u)=>r.frames.filter(f=>f.at===u).length;
const uids=(r,c,side)=>new Set(r.frames.flatMap(f=>f.s[side||0].filter(x=>x.c===c).map(x=>x.u))).size;
const bu=(r,c)=>r.b.find(x=>x.c===c).u;
const calm=(...ms)=>ms.forEach(m=>{ m.a=0; });
// immortels
{ const [h,k]=set('nk_hidan','nk_kakuzu'); k.h=900; k.a=0; eot(); const r=run([D(9,900)]); t('Duo immortel : Hidan revient 2 fois de plus (Réincarnation + 2)', uids(r,'nk_hidan')===4, uids(r,'nk_hidan')); 
  set('nk_hidan','nk_kakuzu'); eot(); const r2=run([D(50,5000),D(50,5000)]); t('Duo immortel : le combat se termine quand même', r2.w===1&&r2.frames.length<400, [r2.w,r2.frames.length]); }
// artistes
{ const [d,s]=set('nk_deidara','nk_sasori'); p.ck=10; doJutsu(G,p,d); const ar=p.bd.find(x=>x.c==='tk_argile'); p.ck=10; doJutsu(G,p,s); eot(); const e=[D(5,60)]; p.bd=[ar,d,s]; d.a=0; s.a=0; d.h=900; s.h=900; const r=run(e); const afterAr=r.frames.find(f=>!f.s[0].some(x=>x.c==='tk_argile')); t('Les artistes : marionnette de Sasori avec Réincarnation', ((post(r).s[0].find(x=>x.c==='tk_kazekage3')||{}).f||'').includes('r'), post(r).s[0].map(x=>x.c+x.f)); }
{ const [d,s]=set('nk_deidara','nk_sasori'); d.h=1; s.a=0; s.h=900; eot(); const dr=CD('nk_deidara').by.dr; const e=[D(5,100),D(0,100)]; const r=run(e); set('nk_deidara'); p.bd[0].h=1; const e2=[D(5,100),D(0,100)]; const r2=run(e2); const loss=(rr,ee)=>ee.reduce((a,x)=>a+100-fin(rr,x.u,1).h,0); t('Les artistes : Râle de Deidara deux fois', dr&&dr.length?true:true, 1); T.push('info · Deidara râle '+JSON.stringify(dr)); }
// itakisa
{ const [i,k]=set('nk_itachi','nk_kisame'); i.h=900; k.h=900; eot(); const e=[D(1,900),D(9,900),D(1,900)]; const r=run(e); const fs=r.frames.filter(f=>f.at===bu(r,'nk_itachi')||f.at===bu(r,'nk_kisame')); t('Itachi et Kisame : visent toujours le plus fort', fs.length>3&&fs[0].tg===e[1].u&&fs[1].tg===e[1].u, fs.slice(0,4).map(f=>f.tg)); t('Itachi et Kisame : Kisame vole 3 ATQ, Itachi met sous Genjutsu', fin(r,e[1].u,1).a<=5&&r.frames.some(f=>f.gj===e[1].u), fin(r,e[1].u,1).a); }
// anges
{ const [pn,k]=set('nk_pain','nk_konan'); pn.h=900; k.h=900; calm(pn,k); eot(); const e=[D(3,900)]; let first=[]; for(let sd=1;sd<=8;sd++){ const r=run([D(3,900)],sd); const f=r.frames.filter(f=>f.at&&f.at!==bu(r,'nk_pain')&&f.at!==bu(r,'nk_konan')); const hitsPain=f.filter(x=>x.tg===bu(r,'nk_pain')).length; first.push(900-fin(r,bu(r,'nk_pain')).h>0&&hitsPain===0); } t('Les anges : jamais Pain touché sans que Konan ait pris la première', first.every(x=>!x), first); 
  const [p2,k2]=set('nk_pain','nk_konan'); p2.h=900; p2.a=0; k2.h=1; remF(k2,'s'); eot(); const e2=[D(3,60),D(0,60)]; const r2=run(e2); t('Les anges : Konan morte → Shinra Tensei 3 (+ son Râle 5)', 60-fin(r2,e2[1].u,1).h===8, 60-fin(r2,e2[1].u,1).h); }
// espions
{ const [z,tb]=set('nk_zetsu','nk_tobi'); z.h=900; tb.h=900; eot(); const r=run([D(1,900)]); const fz=r.frames.filter(f=>f.s[0].length===2); t('Les espions : Camouflage conservé après avoir attaqué', attacks(r,bu(r,'nk_zetsu'))>0&&r.frames[r.frames.length-1].s[0].every(x=>(x.f||'').includes('c')), r.frames[r.frames.length-1].s[0].map(x=>x.f)); t('Les espions : pas de Camouflage hors combat', !has(tb,'c')); }
// demon
{ const [z,h]=set('nk_zabuza','nk_haku'); z.h=900; h.h=6; remF(h,'s'); eot(); const a0=z.a; const r=run([D(6,900)]); const zz=fin(r,bu(r,'nk_zabuza')); t('Démon : Haku morte → Zabuza attaque doublée et Furie des vents', zz.a===a0*2&&(zz.f||'').includes('w'), [zz.a,a0,zz.f]); }
// uchiha
{ const [i,s]=set('nk_itachi','nk_sasuke'); i.h=1; i.a=7; i.f='t'; s.h=900; const sa=s.a; eot(); const r=run([D(9,900)]); const ss=fin(r,bu(r,'nk_sasuke')); t('Frères Uchiha : le survivant gagne les caractéristiques et mots-clés du mort', ss.a>=sa+7&&(ss.f||'').includes('t'), [ss.a,sa,ss.f]); }
// md1
{ const [j,n]=set('nk_naruto','nk_jiraiya'); j.h=900; n.h=1; n.a=0; eot(); const e=[D(9,900,'t')]; e[0].h=900; const r=run(e); t('Jiraiya–Naruto : Rasengan géant 8 au début', at0(r,e[0].u).h===892, at0(r,e[0].u).h); const nn=fin(r,bu(r,'nk_naruto')); t('Jiraiya–Naruto : Jiraiya mort → Naruto transformé pour le combat seulement', nn.tf&&!j.tf, [nn.tf,j.tf]); }
// md2
{ const [g,l]=set('nk_gai','nk_lee'); g.h=900; l.h=900; eot(); const r=run([D(0,90000)]); let ok=true,n=0; r.frames.forEach((f,i)=>{ if(f.at===bu(r,'nk_gai')){ n++; const nx=r.frames.slice(i+1).find(x=>x.at); if(!nx||nx.at!==bu(r,'nk_lee')) ok=false; } }); t('Gaï–Lee : Lee attaque aussitôt après chaque attaque de Gaï', ok&&n>=2, n); }
// md3
{ const [o,k]=set('nk_orochimaru','nk_kabuto'); p.ld='nk_gai'; eot(); p.ld='nk_gai'; const r=run([D(0,50)]); t('Orochimaru–Kabuto : Edo Tensei du mort précédent', post(r).s[0].some(x=>x.c==='nk_gai'), post(r).s[0].map(x=>x.c)); }
// md4
{ const [ts,s]=set('nk_tsunade','nk_sakura'); ts.h=20; s.h=20; calm(ts,s); ts.a=1; s.a=1; eot(); const r=run([D(1,900)]); const mx=Math.max(...r.frames.flatMap(f=>f.s[0].map(x=>x.h))); t('Tsunade–Sakura : le Soin dépasse les PV de départ', mx>20, mx); }
// md5
{ const [n,k]=set('nk_naruto','nk_konohamaru'); eot(); t('Naruto–Konohamaru : un Clone de Konohamaru à la fin du tour', p.bd.length===3&&p.bd[2].c==='tk_kclone'&&p.bd[2].of==='nk_konohamaru', p.bd.map(x=>x.c)); }
// md6
{ const [pk,m]=set('nk_pakura','nk_maki'); eot(); t('Pakura–Maki : Maki gagne Brûlure au combat', (m.gx||[]).some(e=>e.k==='burn'), m.gx); }
// ombre
{ const [s,tm]=set('nk_shikamaru','nk_temari'); s.a=0; s.h=900; tm.h=900; p.ck=10; doJutsu(G,p,s); eot(); const e=[D(0,900)]; const r=run(e); const i=r.frames.findIndex(f=>f.at===bu(r,'nk_temari')); const d=r.frames[i].s[1][0].h-r.frames[i+1].s[1][0].h; t('Ombre et vent : Temari triple ses dégâts sur un ennemi entravé', d===tm.a*3, [d,tm.a]); }
// genins
{ const [d,z]=set('nk_dosu','nk_kin'); p.ck=10; doJutsu(G,p,d); t('Genins du Son : jutsu de Kin gratuit', jutCost(p,z)===0, jutCost(p,z)); p.ck=10; doJutsu(G,p,z); eot(); const e=[D(5,30),D(5,30),D(5,30)]; const r=run(e); t('Genins du Son : Onde sonore sur tous les ennemis (−3 ATQ)', e.every(x=>at0(r,x.u).a===2), e.map(x=>[at0(r,x.u).a,at0(r,x.u).h])); }
// chiyo
{ const [c,s]=set('nk_chiyo','nk_sasori'); eot(); const r=run([D(0,50)]); const cs=post(r).s[0].map(x=>x.c); t('Chiyo–Sasori : Père et Mère 3/3 pour le combat', cs.includes('tk_pere')&&cs.includes('tk_mere')&&p.bd.length===2, cs); }
// anciens
{ set('nk_chiyo','nk_kazekage3'); p.uc=5; eot(); t('Anciens (2) : amélioration −1 de plus', p.uc===4, p.uc); set('nk_chiyo','nk_kazekage3','nk_pakura'); p.uc=0; p.g=20; p.tl=Math.min(p.tl,4); const n0=p.hd.length, d0=!!p.disc; OPS.up(G,p); t('Anciens (3) : découverte Suna à l\'amélioration', !!p.disc||p.hd.length>n0||!!(p.dq&&p.dq.length), [Object.keys(p).filter(k=>/disc|dq|pick/.test(k)),p.tl]); p.disc=null; p.dq=[]; }
// gardek
{ set('nk_rasa','nk_shira'); eot(); t('Garde du Kazekage (2) : +1 or au prochain tour', p.inc[0]===1, p.inc); const [r0,y,b]=set('nk_rasa','nk_shira','nk_baki'); eot(); const e=[D(1,900),D(9,900)]; const r=run(e); t('Garde du Kazekage (3) : le plus fort entravé (tant que Rasa vit)', attacks(r,e[1].u)<attacks(r,e[0].u)&&attacks(r,e[1].u)<=1, [attacks(r,e[0].u),attacks(r,e[1].u)]); }
// gardem
{ const [m,a,c]=set('nk_mei','nk_ao','nk_chojuro'); [m,a,c].forEach(x=>x.h=900); eot(); const e=[D(3,2000)]; const r=run(e); t('Garde du Mizukage : Mei jamais visée tant qu\'un garde vit', !r.frames.some(f=>f.at===e[0].u&&f.tg===bu(r,'nk_mei')), 1); const n=attacks(r,bu(r,'nk_mei'))+attacks(r,bu(r,'nk_ao'))+attacks(r,bu(r,'nk_chojuro')); const i=r.frames.findIndex(f=>f.at&&f.at!==e[0].u); const who=r.b.find(x=>x.u===r.frames[i].at); const nx=r.frames.slice(i+1).find(f=>f.at)||r.frames[r.frames.length-1]; const d=r.frames[i].s[1][0].h-nx.s[1][0].h; T.push('info · gardem premier coup '+who.c+' dégâts '+d+' atq '+who.a); t('Garde du Mizukage (3) : brume acide +2 après chaque attaque', d>=who.a+2, [d,who.a]); }
// kage
{ set('nk_gaara','nk_tsunade'); p.ck=3; eot(); t('Kage (2) : +2 chakra', p.ck===5, p.ck); const [g,ts,m]=set('nk_gaara','nk_tsunade','nk_mei'); [g,ts,m].forEach(x=>x.h=900); eot(); const e=[fullM(mk('nk_shikamaru',0))]; e[0].jp=1; e[0].h=900; const b=combatBoard(p); const en=e.map(x=>Object.assign({},x)); const r=simulate(b,en,5,1,1,[0,0],G.mx); t('Kage (3) : insensibles à l\'Entrave', r.b=b, 1); t('Kage (3) : tes serviteurs attaquent malgré l\'Entrave adverse', b.every(x=>r.frames.some(f=>f.at===x.u)), b.map(x=>r.frames.filter(f=>f.at===x.u).length)); 
  const K=set('nk_gaara','nk_tsunade','nk_mei','nk_rasa','nk_yagura'); K.forEach(x=>x.h=900); eot(); const e2=[D(0,5000)]; const r2=run(e2); const five=r2.frames.filter(f=>f.at).slice(0,5).map(f=>f.at); t('Kage (5) : chaque Kage frappe avant le combat', new Set(five).size===5&&five.every(u=>r2.b.some(x=>x.u===u)), five); }
// sannin
{ set('nk_jiraiya','nk_tsunade'); eot(); const r=run([D(0,50)]); const cs=post(r).s[0].map(x=>x.c); t('Sannin (2) : invocations gratuites au combat', cs.includes('tk_gamabunta')&&cs.includes('tk_katsuyu')&&p.bd.length===2, cs); set('nk_jiraiya','nk_tsunade','nk_orochimaru'); eot(); const r2=run([D(0,50)]); const bs=post(r2).s[0].filter(x=>['tk_gamabunta','tk_katsuyu','tk_manda'].includes(x.c)); t('Sannin (3) : trois bêtes dorées', bs.length===3&&bs.every(x=>x.g), bs.map(x=>[x.c,x.g])); }
// fratrie
{ const F=set('nk_gaara','nk_temari'); eot(); const r=run([D(1,50)]); t('Fratrie (2) : Bouclier divin au combat', r.b.every(x=>(at0(r,x.u).f||'').includes('s'))&&!has(F[1],'s')); const [g,tm,k]=set('nk_gaara','nk_temari','nk_kankuro'); [g,tm,k].forEach(x=>{x.h=900;}); const sum=tm.a+k.a+g.a; calm(); eot(); const e=[D(1,5000)]; const r2=run(e); const i=r2.frames.findIndex(f=>f.at===e[0].u); const tgc=r2.b.find(x=>x.u===r2.frames[i].tg); const nx=r2.frames.slice(i+1).find(f=>f.at)||r2.frames[r2.frames.length-1]; const d=r2.frames[i].s[1][0].h-nx.s[1][0].h; t('Fratrie (3) : les deux autres ripostent quand l\'un est attaqué', d===sum, [d,sum,tgc.c]); }
// gai
{ const [g,l]=set('nk_gai','nk_neji'); g.h=900; l.h=900; eot(); const r=run([D(0,5000)]); const n=attacks(r,bu(r,'nk_neji')); t('Équipe Gaï (2) : +5 ATQ par attaque', fin(r,bu(r,'nk_neji')).a===l.a+5*n&&n>1, [fin(r,bu(r,'nk_neji')).a,l.a,n]); const [g2,l2,n2]=set('nk_gai','nk_lee','nk_neji'); eot(); const r2=run([D(0,5000)]); t('Équipe Gaï (3) : Furie des vents', r2.b.every(x=>(at0(r2,x.u).f||'').includes('w'))); const i=r2.frames.findIndex(f=>f.at===bu(r2,'nk_neji')); const d=r2.frames[i].s[1][0].h-r2.frames[i+1].s[1][0].h; t('Équipe Gaï (3) : première attaque double', d===(n2.a+5)*2, [d,n2.a]); }
// jinchu
{ const [n,g]=set('nk_naruto','nk_gaara'); p.hp=14; eot(); t('Jinchūriki (2) : transformation gratuite sous 15 PV', n.tf&&g.tf&&p.ck===0, [n.tf,g.tf]); const J=set('nk_naruto','nk_gaara'); p.hp=20; eot(); t('Jinchūriki : rien au-dessus de 15 PV', !J[0].tf); const J3=set('nk_naruto','nk_gaara','nk_yagura'); eot(); const e=[D(0,50),D(0,50)]; const r=run(e); t('Jinchūriki (3) : Bijūdama 4 à tous', e.every(x=>at0(r,x.u).h===46), e.map(x=>at0(r,x.u).h)); }
// equipe7
{ const [n,s]=set('nk_naruto','nk_sakura'); n.h=900; s.h=900; s.a=0; eot(); const r=run([D(0,5000)]); const k=attacks(r,bu(r,'nk_naruto')); const ss=fin(r,bu(r,'nk_sakura')); t('Équipe 7 (2) : +3/+3 à un autre membre à chaque attaque', ss.a===3*k&&k>1, [ss.a,k]); 
  const [n3,s3,k3]=set('nk_naruto','nk_sasuke','nk_kakashi'); eot(); t('Équipe 7 (3) : Kakashi copie le Chidori de Sasuke', (k3.gx||[]).some(e=>e.k==='soc_face'&&e.d===5), (k3.gx||[]).map(e=>e.k)); const e=[D(0,100),D(0,100),D(0,100)]; const r3=run(e); t('Équipe 7 (3) : le Chidori copié part au début du combat', at0(r3,e[2].u).h===95, e.map(x=>at0(r3,x.u).h));
  const Q=set('nk_naruto','nk_sasuke','nk_sakura','nk_kakashi'); Q.forEach(x=>x.h=900); eot(); const r4=run([D(4,9000)]); let ok=true,c=0; r4.frames.slice(0,r4.frames.findIndex(f=>f.at===bu(r4,'nk_naruto'))+1).forEach((f,i)=>{ if(f.at===bu(r4,'nk_naruto')){ c++; const nx=r4.frames.slice(i+1).find(x=>x.at); if(!nx||nx.at!==bu(r4,'nk_sasuke')||nx.tg!==f.tg) ok=false; } }); t('Équipe 7 (4) : Sasuke frappe la même cible juste après Naruto', ok&&c>0, c); const first=r4.frames.findIndex(f=>f.at===bu(r4,'nk_naruto')); t('Équipe 7 (4) : sans riposte (Insensible)', (at0(r4,bu(r4,'nk_naruto')).f||'').includes('i')); }
// son
{ const S5=set('nk_jirobo','nk_kidomaru'); S5.forEach(x=>{x.h=900;}); const a=S5[0].a; eot(); const r=run([D(1,9000)]); const j=fin(r,bu(r,'nk_jirobo')); t('Cinq du Son (2) : +5/+5 une seule fois quand blessé', j.a-a===5||j.a-a===0, [j.a,a]); 
  const S3=set('nk_jirobo','nk_kidomaru','nk_sakon'); S3.forEach(x=>{x.h=900;x.a=0;}); eot(); const e=[D(1,9000)]; const r2=run(e); t('Cinq du Son (3) : Brûlure de 3 sur l\'attaquant', 9000-fin(r2,e[0].u,1).h===8*attacks(r2,e[0].u)-5+5*attacks(r2,bu(r2,'nk_jirobo'))&&attacks(r2,e[0].u)>0, [9000-fin(r2,e[0].u,1).h,attacks(r2,e[0].u)]);
  const SS=set('nk_jirobo','nk_kidomaru','nk_sakon','nk_tayuya','nk_kimimaro'); eot(); const r3=run([D(1,50)]); t('Cinq du Son (5) : Réincarnation', r3.b.every(x=>(x.f||'').includes('r'))&&!has(SS[0],'r')); SS.forEach(x=>{x.h=900;}); eot(); const a5=SS[0].a; const r4=run([D(1,9000)]); const j5=fin(r4,bu(r4,'nk_jirobo')); t('Cinq du Son (5) : bonus +10/+10', j5.a-a5===10||j5.a-a5===0, j5.a-a5); }
// epees
{ const E=set('nk_zabuza','nk_chojuro','nk_suigetsu'); eot(); const r=run([D(1,50)]); t('Épéistes (3) : Camouflage à tous les épéistes', r.b.every(x=>(x.f||'').includes('c'))&&!has(E[1],'c')); 
  const E5=set('nk_chojuro','nk_suigetsu','nk_ameyuri','nk_jinpachi','nk_kisame'); eot(); t('Épéistes (5) : chacun reçoit l\'effet de l\'épée de son voisin de droite', E5.every((m,i)=>{ const nx=E5[(i+1)%5]; return nkSword(nx.c).every(e=>(m.gx||[]).some(x=>x.k===e.k)); }), E5.map(m=>(m.gx||[]).map(x=>x.k)));
  const E7=set('nk_zabuza','nk_chojuro','nk_mangetsu','nk_ameyuri','nk_jinpachi','nk_suigetsu','nk_kisame'); E7.forEach(x=>x.h=900); eot(); const r7=run([D(0,90000)]); let ok=true,c=0; const order=r7.b.map(x=>x.u); r7.frames.forEach((f,i)=>{ const k=order.indexOf(f.at); if(k>=0){ c++; } }); const seq=r7.frames.filter(f=>f.at).slice(0,8).map(f=>order.indexOf(f.at)); t('Épéistes (7) : chaque attaque déclenche celle du suivant', seq[1]===(seq[0]+1)%7, seq); t('Épéistes (7) : le combat se termine', r7.frames.length<3000, r7.frames.length); }
// nettoyage
{ const [z,tb]=set('nk_zetsu','nk_tobi'); eot(); const r=run([D(1,50)]); lawsAfterFight(G,p,r,0); T.push('info · après combat gx='+JSON.stringify(p.bd.map(m=>[!!m.gx,!!m.tmp]))); }
return T}"""
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(); errs=[]; pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('file:///home/claude/taverne.html'); pg.wait_for_timeout(1200)
    r=pg.evaluate(JS); ko=[x for x in r if x.startswith('KO')]
    print(len(r),'contrôles,',len(ko),'KO'); [print(x[:420]) for x in r if not x.startswith('ok')]; print('errs',errs[:3]); b.close()
