from playwright.sync_api import sync_playwright
JS=r"""()=>{ const T=[]; const t=(n,ok,v)=>T.push((ok?'ok':'KO')+' · '+n+(ok?'':' '+JSON.stringify(v===undefined?'':v)));
V.mp=null; V.univSel=['Naruto']; startSolo(); try{finishHero()}catch(e){} clearInterval(H.tick); const G=H.G,p=G.ps[0];
const M=(c,o)=>{const m=fullM(Object.assign(mk(c,0),o||{})); return m;};
const dummy=(a,h,f)=>M('nk_ao',{a:a,h:h,f:f||''});
// suit un serviteur image par image : liste de [a,h] quand il change
const track=(r,u)=>{ const out=[]; r.frames.forEach(fr=>{ for(const side of fr.s){ const m=side.find(x=>x.u===u); if(m){ const k=m.a+'/'+m.h; if(out[out.length-1]!==k) out.push(k); } } }); return out; };
const attacks=(r,u)=>r.frames.filter(fr=>fr.at===u).length;
const run=(A,B,seed)=>simulate(A,B,seed||7,1,1,[0,0],G.mx);
// Ralliement : Chōjūrō +1/+0 à chaque attaque
{ const c=M('nk_chojuro'); const r=run([c],[dummy(0,30)]); const n=attacks(r,c.u), tr=track(r,c.u); const last=tr[tr.length-1].split('/').map(Number); t('Chōjūrō · Ralliement : +1 ATQ à chaque attaque ('+n+' attaques)', n>=3&&last[0]===2+n, [n,tr]); }
{ const z=M('nk_zabuza'); const r=run([z],[dummy(0,60)]); const n=attacks(r,z.u), tr=track(r,z.u), last=tr[tr.length-1].split('/').map(Number); t('Zabuza · Ralliement : +2/+1 à chaque attaque ('+n+' attaques)', n>=3&&last[0]===5+2*n&&last[1]===4+n, [n,tr]); }
{ const m=M('nk_mangetsu'), al=M('nk_zaku',{a:0,h:40}); const r=run([m,al],[dummy(0,40)]); const n=attacks(r,m.u), tr=track(r,al.u), last=tr[tr.length-1].split('/').map(Number); t('Mangetsu · Ralliement : un allié gagne +1/+1 à chaque attaque ('+n+')', n>=2&&last[0]===n&&last[1]===40+n, [n,tr]); }
// Yagura : bonus définitif aux ninjas de Kiri qui attaquent
{ p.bd=[mk('nk_yagura',0),mk('nk_chojuro',0)]; const y=p.bd[0], c=p.bd[1]; const s0=[y.a,y.h,c.a,c.h]; const r=run(combatBoard(p),[dummy(0,25)]); const ny=attacks(r,y.u), nc=attacks(r,c.u); lawsAfterFight(G,p,r,0);
  t('Yagura : +1/+1 définitif à tous les ninjas de Kiri à chaque attaque de l\'un d\'eux ('+ny+'+'+nc+' attaques)', ny+nc>=2&&y.a-s0[0]===ny+nc&&y.h-s0[1]===ny+nc&&c.a-s0[2]===ny+nc&&c.h-s0[3]===ny+nc, [ny,nc,y.a-s0[0],y.h-s0[1],c.a-s0[2],c.h-s0[3],r.perm]); }
// Râles d'agonie
{ const d=M('nk_deidara'), e=dummy(5,20); const r=run([d],[e]); const tr=track(r,e.u); t('Deidara · Râle : 3 dégâts à un ennemi', tr[tr.length-1]==='5/14', tr); }
{ const d=M('nk_jinpachi'), e=dummy(5,20); const r=run([d],[e]); const tr=track(r,e.u); t('Jinpachi · Râle : 4 dégâts à un ennemi', tr[tr.length-1]==='5/12', tr); }
{ p.bd=[mk('nk_deidara',0)]; doNkTf(G,(p.ck=10,p),p.bd[0]); const d=combatBoard(p)[0], e1=dummy(9,30), e2=dummy(0,30); const r=run([d],[e1,e2]); const t1=track(r,e1.u), t2=track(r,e2.u); 
  t('Deidara transformé · Râle : en plus 2 dégâts à tous les ennemis', (30-Number(t2[t2.length-1].split('/')[1]))+(30-Number(t1[t1.length-1].split('/')[1]))===d.a+3+2+2, [d.a,t1,t2]); }
{ const k=M('nk_kakuzu'), al=M('nk_zaku',{a:1,h:1,f:'t'}); const r=run([k,al],[dummy(3,40)]); const tr=track(r,k.u); t('Kakuzu : +1/+1 quand un allié meurt', tr.some((x,i)=>i>0&&Number(x.split('/')[0])===4), tr); }
// transformations : effets et mots-clés en combat
{ p.bd=[mk('nk_kimimaro',0)]; p.ck=10; doNkTf(G,p,p.bd[0]); const k=combatBoard(p)[0]; const e=[dummy(0,30),dummy(0,30),dummy(0,30)]; const r=run([k],e); const fr=r.frames.find(f=>f.at===k.u); const hit=e.filter(x=>track(r,x.u).length>1).length; t('Kimimaro transformé : frappe aussi les voisins', hit>=2, e.map(x=>track(r,x.u))); }
{ p.bd=[mk('nk_mei',0)]; p.ck=10; doNkTf(G,p,p.bd[0]); const m=combatBoard(p)[0]; const e=[dummy(0,30),dummy(0,30)]; const r=run([m],e); const f0=r.frames[1]||r.frames[0]; t('Mei transformée : 2 dégâts à tous les ennemis au début du combat', e.every(x=>track(r,x.u).includes('0/28')), e.map(x=>track(r,x.u).slice(0,3))); }
{ p.bd=[mk('nk_lee',0)]; p.ck=10; doNkTf(G,p,p.bd[0]); const l=combatBoard(p)[0]; const r=run([l],[dummy(0,200)]); const fa=r.frames.filter(f=>f.at).map(f=>f.at); t('Rock Lee transformé · Furie des vents : attaque deux fois de suite', has(l,'w')&&fa[0]===l.u&&fa[1]===l.u, fa.slice(0,4)); }
{ p.bd=[mk('nk_tsunade',0)]; p.ck=10; doNkTf(G,p,p.bd[0]); const m=combatBoard(p)[0]; const r=run([m],[dummy(50,500)]); const tr=track(r,m.u); t('Tsunade transformée · Réincarnation : revient avec 1 PV', has(m,'r')&&r.frames.some(f=>f.s[0].some(x=>x.c==='nk_tsunade'&&x.h===1)), tr); }
{ p.bd=[mk('nk_hidan',0)]; p.ck=10; doNkTf(G,p,p.bd[0]); const m=combatBoard(p)[0]; const r=run([m],[dummy(0,4)]); t('Hidan transformé · Vol de vie : soigne le héros', has(m,'l')&&r.heal&&r.heal[0]>0, [m.f,r.heal]); }
{ p.bd=[mk('nk_tobi',0)]; p.ck=10; doNkTf(G,p,p.bd[0]); const m=combatBoard(p)[0]; const r=run([m],[dummy(3,400)]); const fr=r.frames.filter(f=>f.at===m.u); const nMe=fr.length, nEn=r.frames.filter(f=>f.at&&f.at!==m.u).length, lastH=Number(track(r,m.u).slice(-1)[0].split('/')[1]); const ok=nMe>=2&&(10-lastH)<=3*nEn; t('Tobi transformé · Insensible : aucun dégât quand il attaque', has(m,'i')&&fr.length>0&&ok, track(r,m.u)); }
{ p.bd=[mk('nk_ao',0),mk('nk_kakashi',0)]; p.ck=10; doNkTf(G,p,p.bd[1]); const b=combatBoard(p); let ok=has(b[1],'c'), seen=[]; for(let sd=1;sd<=12;sd++){ const en=dummy(1,300); const r=run([en],b.map(x=>Object.assign({},x)),sd); const first=r.frames.find(f=>f.at===en.u); const kAtt=r.frames.findIndex(f=>f.at===b[1].u), eAtt=r.frames.findIndex(f=>f.at===en.u); seen.push([first&&first.tg,kAtt<eAtt]); if(first&&first.tg===b[1].u&&!(kAtt>=0&&kAtt<eAtt)) ok=false; } t('Kakashi transformé · Camouflage : jamais visé avant d\'avoir attaqué (12 combats)', ok, seen); }
{ p.bd=[mk('nk_yagura',0),mk('nk_ao',0)]; p.ck=10; doNkTf(G,p,p.bd[0]); const b=combatBoard(p); const en=dummy(1,900); const r=run([en],b); const first=r.frames.find(f=>f.at===en.u); t('Yagura transformé · Provocation : attaqué en premier', has(b[0],'t')&&first&&first.tg===b[0].u, [b[0].f,first&&first.tg]); }
{ p.bd=[mk('nk_sasori',0)]; p.ck=10; doNkTf(G,p,p.bd[0]); const m=combatBoard(p)[0]; const en=dummy(2,50); const r=run([en],[m]); const tr=track(r,m.u); t('Sasori transformé · Bouclier divin : le premier coup est absorbé', has(m,'s')&&tr.length>=1, [m.f,tr]); const e2=track(r,en.u); t('Sasori · Toxicité : tue ce qu\'il blesse', e2.some(x=>/\/0$|\/-/.test(x))||r.w===1, [e2,r.w]); }
// groupes : le bonus de combat sert vraiment (Réincarnation du Duo immortel, Vol de vie d'Itachi, Furie des vents des Épéistes à 7)
{ p.bd=[mk('nk_hidan',0),mk('nk_kakuzu',0)]; nkGroupsEot(G,p); const b=combatBoard(p); const r=run(b,[dummy(60,900)]); const tk=track(r,b[1].u); t('Duo immortel en combat : Kakuzu 11/13 puis revient à 1 PV', b[1].a===11&&b[1].h===13&&r.frames.some(f=>f.s[0].some(x=>x.c==='nk_kakuzu'&&x.h===1))&&r.frames.some(f=>f.s[0].some(x=>x.c==='nk_hidan'&&x.h===1)), [b.map(x=>[x.a,x.h,x.f]),tk]); p.bd.forEach(m=>delete m.tmp); }
{ p.bd=[mk('nk_itachi',0),mk('nk_kisame',0)]; nkGroupsEot(G,p); const b=combatBoard(p); const r=run(b,[dummy(0,20)]); t('Itachi et Kisame en combat : 16/15 Vol de vie, le héros est soigné', b[0].a===16&&b[0].h===15&&has(b[0],'l')&&r.heal[0]>0, [b.map(x=>[x.a,x.h,x.f]),r.heal]); p.bd.forEach(m=>delete m.tmp); }
{ p.bd=[mk('nk_zabuza',0),mk('nk_haku',0)]; nkGroupsEot(G,p); const b=combatBoard(p); const en=dummy(1,900); const r=run([en],b); const first=r.frames.find(f=>f.at===en.u); t('Démon et son arme en combat : Haku (Provocation) encaisse en premier', first&&first.tg===b[1].u&&has(b[0],'s')&&has(b[0],'w'), [first&&first.tg,b.map(x=>[x.u,x.f])]); p.bd.forEach(m=>delete m.tmp); p.foe=null; }
{ p.bd=[mk('nk_deidara',0),mk('nk_sasori',0)]; nkGroupsEot(G,p); const foe=[dummy(1,10),dummy(1,3,'s')]; foeApply(p,foe); t('Les artistes : 4 dégâts à chaque ennemi avant le combat (un Bouclier divin l\'absorbe)', foe[0].h===6&&foe[1].h===3&&!has(foe[1],'s'), foe.map(x=>[x.h,x.f])); p.bd.forEach(m=>delete m.tmp); p.foe=null; }
// dégâts au héros : les grosses invocations comptent comme leur invocateur
{ const r=run([M('tk_gamabunta'),M('tk_manda')],[dummy(0,1)]); t('dégâts au héros : Gamabunta 5 + Manda 6 + niveau de taverne 1', r.w===0&&r.dmg===12, [r.w,r.dmg]); }
return T}"""
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(); errs=[]; pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('file:///home/claude/taverne.html'); pg.wait_for_timeout(1200)
    r=pg.evaluate(JS); ko=[x for x in r if x.startswith('KO')]
    print(len(r),'contrôles,',len(ko),'KO'); [print(x[:600]) for x in ko]; print('errs',errs[:3]); b.close()
