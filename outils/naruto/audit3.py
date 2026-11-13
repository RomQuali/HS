from playwright.sync_api import sync_playwright
JS=r"""()=>{ const T=[]; const t=(n,ok,v)=>T.push((ok?'ok':'KO')+' · '+n+(ok?'':' '+JSON.stringify(v===undefined?'':v)));
const start=(hero)=>{V.mp=null; V.univSel=['Naruto']; startSolo(); const G=H.G,p=G.ps[0]; if(hero){p.ho=[hero,p.ho[1],p.ho[2]]; p.hero=hero;} try{finishHero()}catch(e){} clearInterval(H.tick); if(hero) H.G.ps[0].hero=hero; return [H.G,H.G.ps[0]];};
let [G,p]=start('nh_bee'); const set=(...c)=>{p.bd=c.map(x=>mk(x,0)); p.hd=[]; p.ck=10; p.g=0; G.rd++; return p.bd;}; const st=m=>[m.a,m.h];
// ---- invocations renforcées, à chaque jutsu
{ let [j,ts]=set('nk_jiraiya','nk_tsunade'); const got=[]; for(let i=0;i<2;i++){ G.rd++; p.ck=10; doJutsu(G,p,j); p.ck=10; doJutsu(G,p,ts); } const gb=p.bd.filter(x=>x.c==='tk_gamabunta'), ka=p.bd.filter(x=>x.c==='tk_katsuyu');
  t('Sannin à 2 : chaque Gamabunta 16/16, chaque Katsuyu 11/18, à chaque jutsu', gb.length===2&&gb.every(x=>x.a===16&&x.h===16&&!x.g)&&ka.length===2&&ka.every(x=>x.a===11&&x.h===18&&has(x,'t')), [gb.map(st),ka.map(st)]); }
{ let [j,ts,o]=set('nk_jiraiya','nk_tsunade','nk_orochimaru'); p.sh=[]; doJutsu(G,p,j); p.ck=10; doJutsu(G,p,o); p.ck=10; doJutsu(G,p,ts); const x=c=>p.bd.find(y=>y.c===c);
  t('Sannin à 3 : invocations dorées +8/+8', x('tk_gamabunta').g&&x('tk_gamabunta').a===24&&x('tk_manda').g&&x('tk_manda').a===28&&x('tk_manda').h===22&&x('tk_katsuyu').g&&x('tk_katsuyu').h===28, ['tk_gamabunta','tk_manda','tk_katsuyu'].map(c=>[x(c).g,x(c).a,x(c).h])); }
{ let [pa,ko]=set('nk_pain','nk_konan'); doJutsu(G,p,pa); G.rd++; p.ck=10; doJutsu(G,p,pa); const ch=p.bd.filter(x=>x.c==='tk_cerbere'); t('Anges d\'Ame : chaque Chien de Pain arrive doré 14/14 Réincarnation', ch.length===2&&ch.every(x=>x.g&&x.a===14&&x.h===14&&has(x,'r')), ch.map(x=>[x.g,x.a,x.h,x.f])); }
{ let [pa]=set('nk_pain'); doJutsu(G,p,pa); const ch=p.bd.find(x=>x.c==='tk_cerbere'); t('Pain seul : chien normal 7/7', ch&&!ch.g&&ch.a===7, ch&&[ch.g,ch.a]); }
{ let [ka]=set('nk_kakashi'); doJutsu(G,p,ka); G.rd++; p.ck=10; doJutsu(G,p,ka); const n=p.bd.filter(x=>x.c==='tk_ninken'); t('Kakashi : une meute 4/4 par jutsu', n.length===2&&n.every(x=>x.a===4&&x.h===4), n.map(st)); }
{ let b=set('nk_temari','nk_ao','nk_ao','nk_ao','nk_ao','nk_ao','nk_ao'); t('plateau plein : jutsu d\'invocation refusé, chakra gardé', !doJutsu(G,p,b[0])&&p.ck===10&&p.bd.length===7, [p.ck,p.bd.length]); }
// ---- ventes, à chaque vente
{ let b=set('nk_gaara','nk_temari','tk_karasu','tk_karasu','tk_karasu'); const [ga,te]=b; const g0=st(ga), t0=st(te); for(let i=0;i<3;i++) OPS.sell(G,p,{i:2});
  // Gaara : Fratrie +2/+2 par vente ; Temari : Fratrie +2/+2 et le passif de Gaara (+1/+1 aux autres Suna)
  t('Fratrie à 2 : +2/+2 à chaque vente (3 ventes)', ga.a===g0[0]+6&&ga.h===g0[1]+6&&te.a===t0[0]+9&&te.h===t0[1]+9&&p.g===3, [ga.a-g0[0],te.a-t0[0],p.g]); }
{ let b=set('nk_gaara','nk_temari','nk_kankuro','tk_karasu','tk_karasu'); const [ga,te,kk]=b; const g0=st(ga), k0=st(kk); OPS.sell(G,p,{i:3}); OPS.sell(G,p,{i:3});
  t('Fratrie à 3 : +5/+5 et +1 or à chaque vente (2 ventes)', ga.a===g0[0]+10&&kk.a===k0[0]+12&&p.g===4, [ga.a-g0[0],kk.a-k0[0],p.g]); }
{ let b=set('nk_chiyo','nk_ebizo','nk_ao','nk_ao'); p.ck=0; OPS.sell(G,p,{i:2}); OPS.sell(G,p,{i:2}); t('Anciens de Suna à 2 : 1 chakra par vente', p.ck===2, p.ck); }
{ let b=set('nk_chiyo','nk_ebizo','nk_pakura','nk_ao','nk_ao'); p.ck=0; const c0=st(b[0]), pk=st(b[2]); OPS.sell(G,p,{i:3}); OPS.sell(G,p,{i:3});
  // Chiyo : +2/+2 du groupe et +1/+0 du passif de Pakura, par vente ; Pakura : +2/+2 du groupe
  t('Anciens de Suna à 3 : 2 chakra et +2/+2 aux Suna par vente', p.ck===4&&b[0].a===c0[0]+6&&b[0].h===c0[1]+4&&b[2].a===pk[0]+4, [p.ck,b[0].a-c0[0],b[0].h-c0[1],b[2].a-pk[0]]); }
{ let b=set('nk_matsuri','nk_yashamaru','nk_baki','nk_pakura','nk_rasa','nk_ebizo','nk_ao'); p.ck=0; const [ma,ya,ba,pa,ra,eb]=b; const b0=st(ba), p0=st(pa), r0=st(ra);
  OPS.sell(G,p,{i:6}); const s1={g:p.g,ck:p.ck,ba:ba.a-b0[0],pa:pa.a-p0[0],ra:ra.a-r0[0]};
  t('vente d\'un serviteur quelconque : Baki +1/+1, Suna +1/+0 (Pakura), +1 chakra (Rasa), 1 or', s1.g===1&&s1.ck===1&&s1.ba===2&&s1.pa===0&&s1.ra===1, s1);
  OPS.sell(G,p,{i:0}); t('vente de Matsuri : 2 or', p.g===1+2, p.g);
  const r1=st(ra); OPS.sell(G,p,{i:0}); t('vente de Yashamaru : +1/+1 aux autres Suna', ra.h===r1[1]+1, [ra.a-r1[0],ra.h-r1[1]]);
  const c1=p.ck; OPS.sell(G,p,{i:p.bd.indexOf(eb)}); t('vente d\'Ebizō : +3 chakra (+1 par Rasa)', p.ck===Math.min(10,c1+4), [c1,p.ck]); }
// ---- Engloutir
{ let [jo,ki]=set('nk_jirobo','nk_kidomaru'); const res=[]; for(let i=0;i<2;i++){ G.rd++; p.ck=10; p.sh=[mk('nk_zaku',0)]; const a0=st(jo); doJutsu(G,p,jo); res.push([jo.a-a0[0],jo.h-a0[1],p.sh.length]); } t('Cinq du Son à 2 : Engloutir compte double, à chaque jutsu', res.every(r=>r[0]===4&&r[1]===2&&r[2]===0), res); }
{ let [jo,ki,ta]=set('nk_jirobo','nk_kidomaru','nk_tayuya'); p.sh=[mk('nk_zaku',0)]; const a0=st(jo), t0=st(ta); doJutsu(G,p,jo); t('Cinq du Son à 3 : triple ; Tayuya +1/+1 quand un allié engloutit', jo.a===a0[0]+6&&jo.h===a0[1]+3&&ta.a===t0[0]+1, [jo.a-a0[0],jo.h-a0[1],ta.a-t0[0]]); }
{ let [jo]=set('nk_jirobo','nk_ao'); p.sh=[mk('nk_zaku',0)]; const a0=st(jo); doJutsu(G,p,jo); t('Jirōbō sans groupe : Engloutir simple', jo.a===a0[0]+2&&jo.h===a0[1]+1, [jo.a-a0[0],jo.h-a0[1]]); }
{ let b=set('nk_jirobo','nk_kidomaru','nk_sakon','nk_tayuya','nk_kimimaro'); p.sh=['nk_zaku','nk_zaku','nk_zaku','nk_zaku','nk_zaku','nk_zaku'].map(x=>mk(x,0)); const s0=b.map(st); nkGroupsEot(G,p);
  // chacun engloutit un Zaku 2/1 au triple (+6/+3) ; Tayuya gagne en plus +1/+1 pour chacun des 4 autres
  t('Cinq du Son à 5 : chacun engloutit en fin de tour', b.every((m,i)=>m.a-s0[i][0]===(m.c==='nk_tayuya'?10:6))&&p.sh.length===1, [b.map((m,i)=>m.a-s0[i][0]),p.sh.length]); }
{ p.bd=[]; p.hd=[mk('nk_orochimaru',0)]; p.g=10; p.sh=[mk('nk_zaku',0)]; OPS.play(G,p,{i:0,pos:0}); const o=p.bd[0]; t('Orochimaru : Cri de guerre Engloutir', o&&o.a===8&&o.h===8&&p.sh.length===0, o&&[o.a,o.h,p.sh.length]); }
{ let [ka,ao]=set('nk_kabuto','nk_ao'); doNkTf(G,p,ka); p.ck=10; p.sh=['nk_zaku','nk_zaku','nk_zaku'].map(x=>mk(x,0)); const a0=st(ka); doJutsu(G,p,ka); t('Kabuto transformé : engloutit deux fois', ka.a===a0[0]+4&&p.sh.length===1, [ka.a-a0[0],p.sh.length]); }
// ---- élèves : à chaque jutsu d'un autre ninja de Konoha
{ let [na,ko,le,ne,sk,za]=set('nk_naruto','nk_konohamaru','nk_lee','nk_neji','nk_sakura','nk_zaku'); const s0=[na,ko,le,ne].map(st); p.sh=[];
  doJutsu(G,p,za); const d1=[na,ko,le,ne].map((m,i)=>m.a-s0[i][0]); p.ck=10; doJutsu(G,p,sk); p.ck=10; G.rd++; doJutsu(G,p,sk); const s2=[na,ko,le,ne].map(st);
  // Sakura lance deux fois : chaque élève gagne deux fois (Naruto +2/+2, les autres +1/+1) ; le soin aléatoire de Sakura (+0/+2) ne touche que les PV
  t('élèves : rien quand un ninja d\'Oto lance', d1.every(x=>x===0), d1);
  t('élèves : bonus à chaque jutsu d\'un autre Konoha', s2[0][0]-s0[0][0]===4&&s2[1][0]-s0[1][0]===2&&s2[2][0]-s0[2][0]===2&&s2[3][0]-s0[3][0]===2, s2.map((x,i)=>x[0]-s0[i][0]));
  const k0=st(ko); p.ck=10; G.rd++; doJutsu(G,p,ko); t('élève : pas de bonus pour son propre jutsu (seulement +1/+1 du jutsu)', ko.a===k0[0]+1, ko.a-k0[0]); }
// ---- fin de tour « solitaire »
{ let b=set('nk_itachi','nk_zetsu','nk_ao','nk_ao'); const i0=st(b[0]), z0=st(b[1]); for(const m of p.bd) fxOf(m,'eot').forEach(e=>runRecruit(G,p,m,e)); t('Solitaires à 4 serviteurs : Itachi +2/+2, Zetsu +1/+1', b[0].a===i0[0]+2&&b[1].a===z0[0]+1, [b[0].a-i0[0],b[1].a-z0[0]]);
  p.bd.push(mk('nk_ao',0)); const i1=st(b[0]); for(const m of p.bd) fxOf(m,'eot').forEach(e=>runRecruit(G,p,m,e)); t('Solitaires à 5 serviteurs : rien', b[0].a===i1[0], b[0].a-i1[0]); }
// ---- début de tour : chakra par serviteur (jetons compris), plafond, jutsu réarmé, or différé
{ [G,p]=start('nh_bee'); p.bd=['nk_shikamaru','nk_ao','tk_gamabunta','tk_karasu'].map(x=>mk(x,0)); p.ck=2; doJutsu(G,p,p.bd[0]); const ck1=p.ck; endRecruit(); clearInterval(H.tick); endCombat(); clearInterval(H.tick); G=H.G; p=G.ps[0]; const g1=p.g;
  t('début de tour : +1 chakra par serviteur, invocations comprises', p.ck===ck1+4, [ck1,p.ck]); t('jutsu de nouveau disponible au tour suivant', p.bd[0].ju!==G.rd&&!jutBlock(G,p,p.bd[0]), jutBlock(G,p,p.bd[0]));
  let [G2,p2]=start('nh_bee'); p2.bd=['nk_ao'].map(x=>mk(x,0)); endRecruit(); clearInterval(H.tick); endCombat(); clearInterval(H.tick); t('Shikamaru (jutsu) : +1 or au tour suivant', g1===H.G.ps[0].g+1, [g1,H.G.ps[0].g]);
  G=H.G; p=G.ps[0]; p.bd=['nk_ao','nk_ao','nk_ao','nk_ao','nk_ao','nk_ao','nk_ao'].map(x=>mk(x,0)); p.ck=8; endRecruit(); clearInterval(H.tick); endCombat(); clearInterval(H.tick); t('chakra plafonné à 10', H.G.ps[0].ck===10, H.G.ps[0].ck); }
// ---- héros
const hero=(h,fn)=>{ [G,p]=start(h); p.g=10; p.ck=10; try{fn();}catch(e){t('héros '+h,false,String(e));} };
const pw=()=>{ const g0=p.g,c0=p.ck; const ok=OPS.pow(G,p); return [ok,g0-p.g,c0-p.ck]; };
hero('nh_naruto',()=>{p.bd=[mk('nk_ao',0)]; const r=pw(); t('Naruto : 2 or, Clone 1/1', r[0]&&r[1]===2&&r[2]===0&&p.bd.some(x=>x.c==='tk_kclone'&&x.a===1&&x.h===1), [r,p.bd.map(x=>x.c)]); t('Naruto : une fois par tour', !OPS.pow(G,p)); });
hero('nh_kakashi',()=>{p.bd=[mk('nk_naruto',0),mk('nk_konohamaru',0),mk('nk_ao',0)]; t('Kakashi : jutsus −1, 1 au minimum', jutCost(p,p.bd[0])===5&&jutCost(p,p.bd[2])===1&&jutCost(p,p.bd[1])===0, p.bd.map(m=>jutCost(p,m))); });
hero('nh_jiraiya',()=>{p.bd=[mk('nk_ao',0)]; const r=pw(); t('Jiraiya : 2 or, Crapaud 2/3', r[0]&&r[1]===2&&p.bd.some(x=>x.c==='tk_crapaud'&&x.a===2&&x.h===3), r); });
hero('nh_itachi',()=>{p.bd=[mk('nk_ao',0)]; const r=pw(); t('Itachi : 1 or, 2 ennemis −2 ATQ au prochain combat', r[0]&&r[1]===1&&p.foe&&JSON.stringify(p.foe.chill)==='[2,2]', [r,p.foe]); });
hero('nh_sasuke',()=>{p.bd=[mk('nk_ao',0),mk('nk_yagura',0)]; const y=p.bd[1], a0=[y.a,y.h]; const r=pw(); t('Sasuke : 1 or, +2/+1 au plus fort', r[0]&&r[1]===1&&y.a===a0[0]+2&&y.h===a0[1]+1, [r,y.a-a0[0],y.h-a0[1]]); });
hero('nh_shikamaru',()=>{p.bd=[mk('nk_ao',0)]; p.ck=0; endRecruit(); clearInterval(H.tick); endCombat(); clearInterval(H.tick); t('Shikamaru : +2 chakra à chaque début de tour', H.G.ps[0].ck===3, H.G.ps[0].ck); const c=H.G.ps[0].ck; endRecruit(); clearInterval(H.tick); endCombat(); clearInterval(H.tick); t('Shikamaru : encore au tour suivant', H.G.ps[0].ck===c+3, [c,H.G.ps[0].ck]); });
hero('nh_hashirama',()=>{p.bd=[mk('nk_ao',0)]; const m=p.bd[0], a0=[m.a,m.h]; const r=pw(); t('Hashirama : 2 or, Provocation et +1/+3', r[0]&&r[1]===2&&has(m,'t')&&m.a===a0[0]+1&&m.h===a0[1]+3, [r,m.f,m.a,m.h]); });
hero('nh_kushina',()=>{p.bd=[mk('nk_ao',0)]; const m=p.bd[0]; const r=pw(); t('Kushina : 4 chakra, Bouclier divin', r[0]&&r[1]===0&&r[2]===4&&has(m,'s'), [r,m.f]); });
hero('nh_gaara',()=>{p.bd=[mk('nk_ao',0),mk('nk_zaku',0)]; const r=pw(); const tm=p.bd.map(m=>m.tmp); t('Gaara : 1 or, +0/+5 Provocation à l\'un, Bouclier divin à un autre (prochain combat)', r[0]&&r[1]===1&&tm.filter(x=>x&&x.h===5&&x.f.includes('t')).length===1&&tm.filter(x=>x&&x.f.includes('s')).length===1&&tm.every(x=>x), [r,tm]); });
hero('nh_kankuro',()=>{p.bd=[mk('nk_ao',0)]; const r=pw(); t('Kankuro : 2 or, Karasu 2/2', r[0]&&r[1]===2&&p.bd.some(x=>x.c==='tk_karasu'), r); });
hero('nh_sasori',()=>{p.bd=[mk('nk_ao',0)]; const r=pw(); t('Sasori : 3 or, Venimosité', r[0]&&r[1]===3&&has(p.bd[0],'n'), [r,p.bd[0].f]); });
hero('nh_rasa',()=>{ p.bd=[mk('nk_ao',0)]; endRecruit(); clearInterval(H.tick); endCombat(); clearInterval(H.tick); const g=H.G.ps[0].g; let [G2,p2]=start('nh_bee'); p2.bd=[mk('nk_ao',0)]; endRecruit(); clearInterval(H.tick); endCombat(); clearInterval(H.tick); t('Rasa : +1 or au début du tour', g===H.G.ps[0].g+1, [g,H.G.ps[0].g]); });
hero('nh_mei',()=>{p.bd=[mk('nk_ao',0)]; const r=pw(); t('Mei : 1 or, 1 dégât à tous les ennemis', r[0]&&r[1]===1&&p.foe&&p.foe.aoe===1, [r,p.foe]); });
hero('nh_haku',()=>{p.bd=[mk('nk_ao',0)]; const r=pw(); t('Haku : 2 or, Bouclier divin', r[0]&&r[1]===2&&has(p.bd[0],'s'), [r,p.bd[0].f]); });
hero('nh_bee',()=>{p.bd=[mk('nk_ao',0)]; const m=p.bd[0], a0=m.a; const r=pw(); t('Killer Bee : 1 or, deux fois +1/+1', r[0]&&r[1]===1&&m.a===a0+2, [r,m.a-a0]); });
hero('nh_kakuzu',()=>{p.bd=[mk('nk_ao',0),mk('nk_ao',0)]; p.g=0; OPS.sell(G,p,{i:0}); OPS.sell(G,p,{i:0}); t('Kakuzu : chaque vente rapporte 2 or', p.g===4, p.g); });
hero('nh_yugito',()=>{p.bd=[mk('nk_ao',0)]; const r=pw(); t('Yugito : 1 or, 3 dégâts au prochain combat', r[0]&&r[1]===1&&p.njf===3, [r,p.njf]); });
hero('nh_omoi',()=>{p.bd=[mk('nk_ao',0)]; p.ck=3; const r=pw(); t('Omoi : 1 or, +2 chakra', r[0]&&r[1]===1&&p.ck===5, [r,p.ck]); });
hero('nh_deidara',()=>{p.bd=[mk('nk_ao',0)]; const r=pw(); t('Deidara : 2 or, Râle « 3 dégâts »', r[0]&&r[1]===2&&(p.bd[0].x||[]).some(e=>e.k==='dr_dmg'&&e.d===3), [r,p.bd[0].x]); });
hero('nh_roshi',()=>{p.bd=[mk('nk_naruto',0),mk('nk_sakura',0)]; t('Roshi : transformations −3', nkTfCost(p,p.bd[0])===7&&nkTfCost(p,p.bd[1])===2, p.bd.map(m=>nkTfCost(p,m))); });
return T}"""
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(); errs=[]; pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('file:///home/claude/taverne.html'); pg.wait_for_timeout(1200)
    r=pg.evaluate(JS); ko=[x for x in r if x.startswith('KO')]
    print(len(r),'contrôles,',len(ko),'KO'); [print(x[:420]) for x in ko]; print('errs',errs[:3]); b.close()
