# Seigneur des Anneaux : répartition 4 Peuples libres / 4 Ombre avant le choix du héros (15/11/2026)
from playwright.sync_api import sync_playwright
JS=r"""()=>{ const T=[]; const t=(n,ok,v)=>T.push((ok?'ok':'KO')+' · '+n+(ok?'':' '+JSON.stringify(v===undefined?'':v)));
window.CS_NOANIM=1; V.mp=null; const camp=h=>HEROES[h].shadow?'O':'L';
const LH=Object.keys(HEROES).filter(h=>/^lh_/.test(h));
t('27 héros : 15 Peuples libres, 12 Ombre', LH.filter(h=>camp(h)==='L').length===15&&LH.filter(h=>camp(h)==='O').length===12, LH.length);
t('chaque nouveau héros de l’Ombre a un portrait', ['lh_gothmog','lh_lurtz','lh_arachne','lh_khamul','lh_balrog','lh_sharku','lh_grima'].every(h=>typeof HART[h]==='function'));
let bad={split:0,n3:0,side:0,dup:0,bot:0,roll:0,meL:0,meO:0,priv:0};
for(let r=0;r<200;r++){ V.univSel=['Le Seigneur des Anneaux']; startSolo(); clearInterval(H.tick); const G=H.G;
  const L=G.ps.filter(p=>p.camp==='L'), O=G.ps.filter(p=>p.camp==='O');
  if(L.length!==4||O.length!==4) bad.split++;
  if(!G.ps.every(p=>p.ho.length===3)) bad.n3++;
  if(!G.ps.every(p=>p.ho.every(h=>camp(h)===p.camp))) bad.side++;
  for(const team of [L,O]){ const all=team.flatMap(p=>p.ho); if(new Set(all).size!==all.length) bad.dup++; }
  if(!G.ps.every(p=>!p.bot||(p.hero&&camp(p.hero)===p.camp))) bad.bot++;
  if(!G.ps.every(p=>p.hrr===0&&p.hrm===0)) bad.roll++;
  if(G.ps[0].camp==='L') bad.meL++; else bad.meO++;
  if(loCamp(G.ps[0])!==G.ps[0].camp) bad.priv++; }
t('200 parties : 4 joueurs par camp', !bad.split, bad.split);
t('3 héros proposés à chacun', !bad.n3, bad.n3);
t('héros proposés toujours du camp du joueur', !bad.side, bad.side);
t('aucun héros proposé deux fois dans un même camp', !bad.dup, bad.dup);
t('les IA prennent un héros de leur camp', !bad.bot, bad.bot);
t('pas de relance dans cet univers', !bad.roll, bad.roll);
t('le joueur tombe dans les deux camps (tirage au sort)', bad.meL>60&&bad.meO>60, [bad.meL,bad.meO]);
t('le camp est connu avant le choix du héros', !bad.priv, bad.priv);

{ V.univSel=['Le Seigneur des Anneaux']; startSolo(); clearInterval(H.tick); const G=H.G, p=G.ps[0], c=p.camp; p.hero=p.ho[2]; finishHero(); clearInterval(H.tick);
  t('après le choix, le camp reste celui tiré au sort', G.ps.every(q=>loCamp(q)===q.camp)&&loCamp(p)===c);
  t('la taverne ne propose que des cartes du camp', p.sh.every(m=>loSee(p,m.c)), p.sh.map(m=>m.c)); }
{ V.univSel=['Naruto']; startSolo(); clearInterval(H.tick); const G=H.G; t('Naruto inchangé : pas de camp, 3 héros, 2 relances', G.ps.every(p=>!p.camp&&p.ho.length===3&&p.hrr===2)); }
return T; }"""
with sync_playwright() as pw:
    b=pw.chromium.launch(); pg=b.new_page(viewport={'width':1280,'height':800}); errs=[]
    pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('file:///home/claude/taverne.html'); pg.wait_for_timeout(1200)
    T=pg.evaluate(JS); ko=[x for x in T if x.startswith('KO')]
    print(len(T),'contrôles,',len(ko),'KO'); [print(x) for x in (ko or T)]; print('errs',errs[:3])
    # écran de choix du héros
    pg.evaluate("()=>{ V.mp=null; V.univSel=['Le Seigneur des Anneaux']; startSolo(); }"); pg.wait_for_timeout(1500); pg.screenshot(path='/tmp/bld/choix.png'); b.close()
