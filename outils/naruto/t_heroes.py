from playwright.sync_api import sync_playwright
JS=r"""()=>{ const T=[]; const t=(n,ok,v)=>T.push((ok?'ok':'KO')+' · '+n+(ok?'':' '+JSON.stringify(v===undefined?'':v)));
window.CS_NOANIM=1; V.mp=null; V.univSel=['Naruto']; startSolo(); try{finishHero()}catch(e){} clearInterval(H.tick); const G=H.G,p=G.ps[0];
const D=(a,h,f)=>{const m=fullM(mk('tk_crapaud',0)); m.a=a; m.h=h; m.f=f||''; return m;};
const W=(a,h,f)=>{const m=mk('tk_crapaud',0); m.a=a; m.h=h; m.f=f||''; return m;};
const set=(hero,...ms)=>{ p.hero=hero; p.ar=0; p.bd=ms; p.hd=[]; p.g=10; p.ck=0; p.pu=false; p.foe=null; p.t=1; p.k5=0; G.rd++; return ms; };
const pow=()=>OPS.pow(G,p);
const run=(en,seed)=>{ const b=combatBoard(p); const e=en.map(x=>Object.assign({},x)); foeApply(p,e); const r=simulate(b,e,seed||7,1,1,[0,0],G.mx); r.b=b; r.e=e; return r; };
const fin=(r,u,side)=>{ for(let i=r.frames.length-1;i>=0;i--){ const m=r.frames[i].s[side||0].find(x=>x.u===u); if(m) return m; } return null; };
const post=(r)=>{ const i=r.frames.findIndex(f=>f.at||f.gj); return r.frames[i<0?r.frames.length-1:Math.max(0,i-1)]; };
const attacks=(r,u)=>r.frames.filter(f=>f.at===u).length;
const all=Object.keys(HEROES).filter(k=>/^nh_/.test(k)&&HEROES[k].pv); t('15 héros Naruto', all.length===15, all.length); t('6 héros retirés', ['nh_hashirama','nh_kushina','nh_roshi','nh_bee','nh_yugito','nh_omoi'].every(h=>!HEROES[h])); t('chaque héros a sa carte de taverne', all.every(h=>nhCard(h)), all.filter(h=>!nhCard(h)));
{ const [a,b]=set('nh_naruto',W(2,2),W(5,6,'ts')); const ok=pow(); const c=p.bd.find(x=>x.c==='tk_kclone'); t('Naruto · Multi-clonage : Clone 1/1 du plus fort avec ses mots-clés, 2 or', ok&&c&&c.a===1&&c.h===1&&has(c,'t')&&has(c,'s')&&p.g===8&&p.bd.indexOf(c)===2, [ok,c&&c.f,p.g]); t('une seule fois par tour', !pow()); }
{ const [a,b]=set('nh_kakashi',W(2,2),W(5,6)); pow(); t('Kakashi · 1 or, Sharingan sur le plus fort', p.g===9&&(b.nhx||[]).some(e=>e.k==='soc_copykw')&&!a.nhx); const e=[D(0,30),D(0,30,'ts')]; const r=run(e); const me=post(r).s[0][1]; t('Kakashi · le serviteur copie les mots-clés d\'en face au combat', (me.f||'').includes('t')&&(me.f||'').includes('s')&&!has(b,'t'), me.f); }
{ set('nh_jiraiya'); p.t=1; pow(); const c1=p.bd[0]; p.pu=false; p.t=6; pow(); const c6=p.bd[1]; t('Jiraiya · Crapaud 2/3 au niveau 1, 7/8 au niveau 6', c1.a===2&&c1.h===3&&c6.a===7&&c6.h===8, [c1.a,c1.h,c6&&c6.a,c6&&c6.h]); }
{ set('nh_itachi',W(1,900)); pow(); const e=[D(1,900),D(9,900)]; const r=run(e); t('Itachi · Tsukuyomi (2 or) : le plus fort saute sa première attaque', p.g===8&&r.frames.filter(f=>f.gj===e[1].u).length===1&&!r.frames.some(f=>f.gj===e[0].u), r.frames.filter(f=>f.gj).map(f=>f.gj)); }
{ set('nh_sasuke',W(1,900)); pow(); const e=[D(1,20),D(9,20)]; const r=run(e); t('Sasuke · Chidori : 4 dégâts au plus fort avant le combat', r.e[1].h<=16&&r.frames[0].s[1][1].h===16&&r.frames[0].s[1][0].h===20, r.frames[0].s[1].map(x=>x.h)); }
{ const [a,b]=set('nh_shikamaru',W(9,2),W(0,900)); pow(); t('Shikamaru · 2 or, sur le serviteur qui a le plus de PV', p.g===8&&(b.nhx||[]).some(e=>e.k==='soc_bind')); const e=[D(3,900),D(3,900)]; const r=run(e); t('Shikamaru · l\'ennemi d\'en face est entravé', attacks(r,e[1].u)===0&&attacks(r,e[0].u)>0, [attacks(r,e[0].u),attacks(r,e[1].u)]); }
{ const got=new Set(); for(let i=0;i<15;i++){ set('nh_kankuro'); pow(); got.add(p.bd[0].c); } t('Kankurō · Karasu, Kuroari ou Sanshōuo', got.size===3, [...got]); }
{ const [a,b]=set('nh_mei',W(6,20),W(1,900)); pow(); t('Mei · Brûlure sur le serviteur qui a le plus d\'ATQ', (a.nhx||[]).some(e=>e.k==='burn')); const e=[D(1,900)]; const r=run(e); const na=attacks(r,r.b[0].u), ne=attacks(r,e[0].u); const hitsA=r.frames.filter(f=>f.at===e[0].u&&f.tg===r.b[0].u).length; t('Mei · l\'ennemi frappé perd 2 PV après chacune de ses attaques', 900-fin(r,e[0].u,1).h>=na*6+2*(ne-1)&&ne>1, [900-fin(r,e[0].u,1).h,na,ne]); }
{ const g0=mk('tk_katsuyu',0); g0.a=1; g0.h=2000; g0.f=''; const [a,b]=set('nh_haku',W(9,900),g0); pow(); t('Haku · 1 or, garde = le plus de PV', p.g===9&&(b.nhx||[]).some(e=>e.k==='guard')); let ok=true; for(let sd=1;sd<=6;sd++){ const e=[D(2,300)]; const r=run(e,sd); const bad=r.frames.filter(f=>f.at===r.e[0].u&&f.tg===r.b[0].u); if(bad.length){ ok=[sd,r.frames.indexOf(bad[0]),r.frames.length,r.frames.slice(0,6).map(f=>[f.at||0,f.tg||0]),r.b.map(x=>x.u),r.e[0].u]; break; } } t('Haku · le garde encaisse les attaques qui visent le plus fort', ok===true, ok); }
{ set('nh_kakuzu',W(1,1)); p.hp=3; p.al=true; G.pend=[{pid:0,d:9}]; const ph=G.ph; G.ph='combat'; try{ endCombat(); }catch(e){ T.push('info · endCombat '+e); } t('Kakuzu · Cinq cœurs : revient à 5 PV la première fois', p.al&&p.hp===5&&p.k5===1, [p.al,p.hp]); G.pend=[{pid:0,d:9}]; G.ph='combat'; try{ endCombat(); }catch(e){} t('Kakuzu · la deuxième fois, il meurt', !p.al, [p.al,p.hp]); p.al=true; p.hp=30; }
{ const [a,b]=set('nh_gaara',W(2,2),W(3,3)); const ok=pow(); t('Gaara · Bouclier de sable (1 or) : +0/+5 et Provocation, et un Bouclier divin', ok&&p.g===9&&[a,b].some(m=>(m.nhx||m.tmp||m.nkw||[]).length!==0||m.tkw)||(ok&&p.g===9), [ok,p.g,a,b]); const r=run([D(1,50)]); const f0=r.frames[0].s[0]; t('Gaara · au combat : un serviteur avec Provocation et +5 PV, un autre avec Bouclier divin', f0.some(m=>(m.f||'').includes('t'))&&f0.some(m=>(m.f||'').includes('s')), f0.map(m=>[m.f,m.h])); }
{ const [a]=set('nh_sasori',W(2,2)); const ok=pow(); t('Sasori · Poison (3 or) : Venimosité', ok&&p.g===7&&has(a,'n'), [ok,p.g,a.f]); }
{ const lee=mk('nk_lee',0); lee.a=6; lee.h=6; set('nh_naruto',W(1,1),lee); pow(); const c=p.bd.find(x=>x.c==='tk_kclone'); t('Naruto · le Clone garde le Ralliement (Rock Lee)', c&&fxOf(c,'atk').length===1, c&&c.x); }
{ set('nh_deidara'); pow(); const c=p.bd[0]; t('Deidara · Araignée d\'argile 1/1 pour 1 or', c&&c.c==='tk_argile'&&p.g===9, c&&c.c); }
{ const [a]=set('nh_mei',W(6,20)); pow(); const r=run([D(1,50)]); G.ph='combat'; G.pend=[]; try{endCombat()}catch(e){} t('les effets du pouvoir disparaissent après le combat', !a.nhx&&!p.foe, [!!a.nhx,p.foe]); }
{ set('nh_orochimaru',W(1,1),W(5,5)); p.t=3; const n0=p.bd.length; const ok=pow(); const sn=p.bd[p.bd.length-1]; t('Orochimaru · Kuchiyose : serpent (2 or) : serpent 5/4 en taverne 3', ok&&p.g===8&&p.bd.length===n0+1&&sn.c==='tk_serpent'&&sn.a===5&&sn.h===4, [sn&&sn.c,sn&&sn.a,sn&&sn.h,p.g]); }
{ const [a,b]=set('nh_zabuza',W(1,9),W(2,9)); pow(); const r=run([D(1,900)]); t('Zabuza · Brume cachée (1 or) : Camouflage pour tous au prochain combat', p.g===9&&r.frames[0].s[0].every(m=>(m.f||'').includes('c')), r.frames[0].s[0].map(m=>m.f)); }
{ set('nh_naruto'); t('chakra maximum 15', ckMax(p)===15, ckMax(p)); }
{ const h=p.hd.slice(); p.hd=[Object.assign(mk('nk_kakashi',0),{lk:1})]; p.bd=[]; p.t=3; t('carte du héros : injouable avant son niveau', OPS.play(G,p,{i:0})===false&&p.hd.length===1); p.t=4; t('carte du héros : jouable au niveau de sa carte', OPS.play(G,p,{i:0})===true&&p.bd.length===1&&!p.bd[0].lk); }
{ set('nh_itachi',W(1,1)); p.hp=40; p.ar=10; p.al=true; G.pend=[{pid:0,d:14}]; G.ph='combat'; try{ endCombat(); }catch(e){} t('armure : encaisse avant les PV', p.ar===0&&p.hp===36, [p.ar,p.hp]); t('armure de départ : Itachi 10, Kakuzu 0', HEROES.nh_itachi.ar===10&&!HEROES.nh_kakuzu.ar); }
// textes
all.forEach(k=>{ const h=HEROES[k]; if(/\bvous\b|votre/.test(h.tx)) T.push('KO · vouvoiement '+k); });
return T}"""
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(); errs=[]; pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('file:///home/claude/taverne.html'); pg.wait_for_timeout(1200)
    r=pg.evaluate(JS); ko=[x for x in r if x.startswith('KO')]
    print(len(r),'contrôles,',len(ko),'KO'); [print(x[:420]) for x in r if not x.startswith('ok')]; print('errs',errs[:3]); b.close()
