
// ----- habillage Hearthstone (2e pack) : givre de la taverne gelée, bandeaux de phase, lueurs, bannière de niveau, flèche de triple -----
// Les images sont dans assets/hs/ ; les sons restent ceux de la planche sonore du jeu.
function hsPop(k, txt) {
  try {
    document.querySelectorAll('.hs-pop').forEach(e => e.remove());
    const d = document.createElement('div'); d.className = 'hs-pop hs-pop-' + k; d.setAttribute('aria-hidden', 'true');
    d.innerHTML = '<span><i></i><b>' + txt + '</b></span>'; document.body.appendChild(d); setTimeout(() => d.remove(), 2100);
  } catch (e) {}
}
(function () { const s0 = sfxPub; sfxPub = function (P, d) {
  try { if (P && d && d.ph !== P.ph) { if (d.ph === 'combat') hsPop('combat', 'Combat'); else if (d.ph === 'recruit') setTimeout(() => hsPop('recrutement', 'Recrutement'), P.ph === 'combat' ? 750 : 0); } } catch (e) {}
  return s0.apply(this, arguments); }; })();
function hsSync() {
  try {
    const z = V.screen === 'game' ? document.querySelector('.keeper-zone.frozen:not(.enemy) .counter-line') : null;
    if (!z) { document.querySelectorAll('.hs-gel,.hs-gelb').forEach(e => e.remove()); V.hsFz = false; return; }
    const fresh = !V.hsFz ? ' in' : '';
    if (!z.querySelector(':scope > .hs-gelb')) { const b = document.createElement('i'); b.className = 'hs-gelb' + fresh; z.insertBefore(b, z.firstChild); }
    z.querySelectorAll(':scope > .mn').forEach((m, k) => {
      if (m.querySelector(':scope > .hs-gel')) return;
      const s = m.querySelector('.mn-svg'), i = document.createElement('i'); i.className = 'hs-gel' + fresh; i.style.animationDelay = (k * 55) + 'ms';
      if (s) { const a = m.getBoundingClientRect(), b = s.getBoundingClientRect(); if (a.width > 0 && b.width > 0) { i.style.left = ((b.left - a.left) / a.width * 100) + '%'; i.style.top = ((b.top - a.top) / a.height * 100) + '%'; i.style.width = (b.width / a.width * 100) + '%'; i.style.height = (b.height / a.height * 100) + '%'; } }
      m.appendChild(i);
    });
    V.hsFz = true;
  } catch (e) {}
}
(function () { const r0 = render; render = function () { const out = r0.apply(this, arguments); hsSync(); return out; }; })();
(function () { const st = document.createElement('style'); st.id = 'hs-css'; st.textContent = `
.hs-pop{position:fixed;inset:0;z-index:9000;display:grid;place-items:center;pointer-events:none}
.hs-pop > span{position:relative;display:block;width:min(46vw,76vh);aspect-ratio:720/436;animation:hsPop 2s cubic-bezier(.2,.9,.25,1) both;filter:drop-shadow(0 10px 22px rgba(0,0,0,.6))}
.hs-pop i{position:absolute;inset:0;background:center/contain no-repeat}
.hs-pop-recrutement i{background-image:url(assets/hs/bandeau-recrutement.webp)}
.hs-pop-combat i{background-image:url(assets/hs/bandeau-combat.webp)}
.hs-pop b{position:absolute;left:0;right:0;text-align:center;font:800 min(3.3vw,5.4vh)/1 var(--ft, Georgia, serif);letter-spacing:.04em;color:#fff3d0;text-shadow:0 2px 0 #1a0d06,0 0 10px rgba(0,0,0,.8),0 0 2px #000}
.hs-pop-recrutement b{top:37%;transform:rotate(-2deg)}
.hs-pop-combat b{top:61.5%;font-size:min(2.9vw,4.8vh);color:#e9edf2}
@keyframes hsPop{0%{opacity:0;transform:scale(.45)}14%{opacity:1;transform:scale(1.08)}22%{transform:scale(1)}78%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(1.12) translateY(-4%)}}
html.lite .hs-pop > span{animation-duration:1.4s}
:root:root:root:root:root body .hs-gel,:root:root:root:root:root body .hs-gelb{pointer-events:none!important}
.mn > .hs-gel{position:absolute;left:0;top:0;width:100%;height:100%;z-index:5;display:block;border-radius:50%;
  background:url(assets/hs/gel-anneau.webp) center/112% 108% no-repeat,radial-gradient(ellipse at 50% 45%,rgba(190,235,255,.05) 40%,rgba(150,215,255,.24) 72%,rgba(120,200,255,0) 74%);filter:drop-shadow(0 0 6px rgba(150,220,255,.75));-webkit-mask-image:linear-gradient(#000 66%,transparent 82%);mask-image:linear-gradient(#000 66%,transparent 82%)}
.mn > .hs-gel::before,.mn > .hs-gel::after{content:'';position:absolute;background:center/contain no-repeat;pointer-events:none}
.mn > .hs-gel::before{left:-16%;bottom:26%;width:40%;height:34%;background-image:url(assets/hs/gel-eclat.webp);transform:rotate(-18deg)}
.mn > .hs-gel::after{right:-9%;top:2%;width:24%;height:52%;background-image:url(assets/hs/gel-bloc.webp);transform:rotate(14deg);opacity:.9}
.mn > .hs-gel.in{animation:hsGel .5s cubic-bezier(.2,.9,.3,1.2) both}
@keyframes hsGel{0%{opacity:0;transform:scale(1.35);filter:brightness(2.4) drop-shadow(0 0 14px #dff6ff)}60%{opacity:1}100%{opacity:1;transform:scale(1)}}
.counter-line > .hs-gelb{position:absolute;left:1%;right:1%;top:-14%;bottom:-14%;z-index:0;display:block;background:url(assets/hs/gel-bord.webp) center/100% 100% no-repeat;opacity:.3;animation:hsGelB 3.2s ease-in-out infinite}
.counter-line > .hs-gelb.in{animation:hsGelIn .6s ease-out both,hsGelB 3.2s ease-in-out .6s infinite}
@keyframes hsGelB{50%{opacity:.45}}
@keyframes hsGelIn{0%{opacity:0;transform:scale(.9)}100%{opacity:.3;transform:scale(1)}}
html.lite .hs-gelb,html.lite .mn > .hs-gel.in{animation:none}
:root:root body .keeper-zone.frozen .counter-line .mn-svg{filter:saturate(.8) brightness(1.06) drop-shadow(0 4px 4px rgba(0,0,0,.45))}   /* plus de virage bleu sous la glace : le givre suffit */
.keeper-zone .mn.tripok > .ptag::before{content:'';position:absolute;left:50%;bottom:92%;width:2.3em;height:2.3em;margin-left:-1.15em;background:url(assets/hs/fleche-triple.webp) center/contain no-repeat;filter:drop-shadow(0 0 3px #0a2c55) drop-shadow(0 0 5px rgba(120,200,255,.9));animation:hsFl 1s ease-in-out infinite}
@keyframes hsFl{50%{transform:translateY(-18%)}}
html.lite .keeper-zone .mn.tripok > .ptag::before{animation:none}
@media (hover:hover){.table:not([class*="awk-"]) .fan .cd:hover::after{content:'';position:absolute;inset:-76% -104%;z-index:-1;pointer-events:none;background:url(assets/hs/lueur-carte.webp) center/100% 100% no-repeat;animation:hsLu 1.4s ease-in-out infinite}}
@keyframes hsLu{50%{opacity:.65}}
` + rnCss(`
/* surbrillance du bouton Prêt : un halo qui épouse la forme du bouton (l'ancien cadre lumineux était plus grand que lui) */
§ .hero-zone .bell:not(:disabled):hover .bell-t{filter:drop-shadow(0 0 3u #fff) drop-shadow(0 0 7u #fff6c0) drop-shadow(0 0 14u rgba(255,236,150,.85))}
§ .hero-zone .bell.rung .bell-t::before{content:'';position:absolute;right:-22u;top:-28u;width:76u;height:76u;background:url(assets/hs/coche.webp) center/contain no-repeat;pointer-events:none;animation:hsCo .45s cubic-bezier(.2,.9,.3,1.4) both¤}
§ .keeper .kc::after{content:'Niveau ' attr(data-t);position:absolute;left:-150u;top:30u;width:164u;height:46u;padding:6u 26u 0 0;box-sizing:border-box;background:url(assets/hs/niveau-banniere.webp) 0 0/100% 100% no-repeat;font:800 fs(17,7)/30u var(--ft, Georgia, serif);color:#3a2206;text-align:center;text-shadow:0 1px 0 rgba(255,240,190,.7);pointer-events:none}
`) + '@keyframes hsCo{0%{opacity:0;transform:scale(.3) rotate(-25deg)}100%{opacity:1;transform:none}}';
  document.head.appendChild(st); })();

// ----- sélection du héros (pack Roni-Selection-Heros) : cadre en arche de Champs de bataille autour des portraits du jeu -----
function heroArchHS(art, hp) {
  const base = heroArchH(art, hp, 'hp-arch'), k = base.indexOf('<span class="harch-hp">'), tail = k < 0 ? '</span>' : base.slice(k);
  return `<span class="harch hp-arch hsarch"><span class="hsa-im"><svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><use href="#${art}" width="100" height="100"/></svg></span><i class="hsa-fr"></i><i class="hsa-gl"></i>${tail}`;
}
(function () { const st = document.createElement('style'); st.id = 'hs-hero-css'; st.textContent = `
.hp-card{aspect-ratio:400/480!important}
.hsarch{display:block;isolation:isolate;filter:drop-shadow(0 8px 6px rgba(10,6,14,.7))}
.hsarch .hsa-im,.hsarch .hsa-fr,.hsarch .hsa-gl{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;display:block}
.hsarch .hsa-im{background:#1a120c;clip-path:polygon(50% 12%,63% 15%,73% 20%,80% 28%,84% 37%,87% 46%,87% 90%,13% 90%,13% 48%,15% 38%,19% 28%,25% 21%,36% 15%)}
.hsarch .hsa-im svg{position:absolute;left:11%;top:10%;width:78%;height:82%}
.hsarch .hsa-fr{background:url(assets/hs/heros-cadre.webp) center/100% 100% no-repeat}
.hp-col.on .hsarch .hsa-fr{background-image:url(assets/hs/heros-cadre-or.webp)}
.hsarch .hsa-gl{opacity:0;background:url(assets/hs/heros-survol.webp) center/100% 100% no-repeat;transition:opacity .15s}
.hp-col .hp-card:hover .hsa-gl,.hp-col .hp-card:focus-visible .hsa-gl{opacity:.85}
.hp-col.on .hp-card{filter:brightness(1.05) drop-shadow(0 0 18px rgba(255,205,110,.55))!important}
.hp-card .hsarch .harch-hp{right:-6%;bottom:2%}
.hp-pc{background:linear-gradient(95deg,rgba(48,38,34,.82),rgba(42,37,36,.92)),url(assets/hs/heros-parchemin.webp) center/100% 100% no-repeat!important;border:1px solid #755b45!important;border-radius:8px!important;box-shadow:0 10px 26px rgba(0,0,0,.55)!important}
.hp-pc .pwb-med{position:relative;background:none!important;box-shadow:none!important;width:92px;height:92px;margin-top:-16px}
.hp-pc .pwb-med::after{content:'';position:absolute;inset:0;background:url(assets/hs/heros-medaillon.webp) center/contain no-repeat;pointer-events:none}
.hp-pc .pwb-med .pwart{width:62px;height:62px}
.hp-go{font-size:clamp(14px,1.7vh,18px)}
`; document.head.appendChild(st); })();

// ----- phase de combat (pack Roni-Phase-Combat) : impacts, étoiles de dégâts, têtes de mort, fissures, mots-clés et 44 bruitages (planche assets/sons/combat.mp3) -----
Object.assign(SFX.map, {"c_att":[[60233,285,1]],"c_hit1":[[55377,1491,1]],"c_hit2":[[58805,1278,1]],"c_hit3":[[57018,1637,1]],"c_armure":[[97470,479,1]],"c_bd_acquis":[[108767,3326,1]],"c_bd_rupture":[[46276,2723,1]],"c_bd_touche":[[49149,2213,1]],"c_bd_renforce":[[51511,3716,1]],"c_mort":[[71970,3141,1],[75261,3078,1],[78489,3296,1],[81935,2524,1],[84609,2919,1],[87678,2668,1]],"c_soin":[[69385,2435,1]],"c_soin_depart":[[60668,2807,1],[63625,3132,1],[66907,2327,1]],"c_soin_ombre":[[93691,3630,1]],"c_vol_vie":[[33309,1970,1]],"c_etoiles":[[10934,2925,1],[14009,3017,1],[17176,3012,1]],"c_proj":[[27198,1912,1],[29261,1819,1],[31229,1930,1]],"c_himpact":[[20338,1932,1],[22420,2247,1],[24817,2232,1]],"c_prov":[[113880,1361,1]],"c_prov_fin":[[112243,1487,1]],"c_rb_acquis":[[101188,2594,1]],"c_rb_mort":[[103932,2161,1]],"c_rb_retour":[[106243,2374,1]],"c_rale":[[98099,2939,1]],"c_rale_rebond":[[43585,2541,1]],"c_bascule_c":[[38542,2410,1]],"c_bascule_r":[[41102,2333,1]],"c_combat":[[35430,2962,1]],"c_recrut":[[90496,3045,1]],"c_p1":[[2733,4221,1]],"c_p4":[[7104,3680,1]],"c_p8":[[0,2583,1]]});
function hsSprite(x, y, img, size, ms, cls) {
  if (FX_OFF() || !V.pub || V.pub.ph !== 'combat') return; const e = document.createElement('i'); e.className = 'hs-spr ' + (cls || '');
  e.style.cssText = `left:${f1(x - size / 2)}px;top:${f1(y - size / 2)}px;width:${f1(size)}px;height:${f1(size)}px;background-image:url(assets/hs/${img}.webp)`;
  fxLayer.appendChild(e);
  const k = []; for (let i = 0; i < 8; i++) k.push({ backgroundPosition:`${(i % 4) * 100 / 3}% ${i < 4 ? 0 : 100}%`, easing:'steps(1)' }); k.push({ backgroundPosition:'100% 100%' });
  try { e.animate(k, { duration:ms || 380 }).onfinish = () => e.remove(); } catch (er) { setTimeout(() => e.remove(), ms || 380); }
}
function hsDecal(x, y, img, size, cls, ms) { if (FX_OFF() || !V.pub || V.pub.ph !== 'combat') return; const e = document.createElement('i'); e.className = 'hs-dec ' + cls; e.style.cssText = `left:${f1(x - size / 2)}px;top:${f1(y - size / 2)}px;width:${f1(size)}px;height:${f1(size)}px;background-image:url(assets/hs/${img}.webp)`; fxLayer.appendChild(e); setTimeout(() => e.remove(), ms); }
function hsCombatFrame() {
  const F = V.fight; if (!F || V.fi === 0 || !V.pub || V.pub.ph !== 'combat') return;
  const pa = F.r.frames[V.fi - 1]; if (!pa) return;
  if (pa.at) {
    const a = fq(pa.at), t = fq(pa.tg), d = Math.max(t ? +t.dataset.dmg || 0 : 0, a ? +a.dataset.dmg || 0 : 0);
    sfx(d >= 7 ? 'c_hit3' : d >= 4 ? 'c_hit2' : 'c_hit1', d >= 7 ? 1 : .85);
    if (t) {
      const r = t.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height * .45, s = r.width;
      hsSprite(x, y, 'c-impact', s * 1.5, 360); setTimeout(() => hsSprite(x, y, 'c-eclair', s * 1.2, 300, 'add'), 40);
      hsDecal(x, r.top + r.height * .8, 'c-trace-impact', s * 1.25, 'trace', 1300);
      if (d >= 7) hsDecal(x, y, 'c-onde-lourde', s * 1.3, 'onde', 600);
      if (a && /[vn]/.test(a.dataset.f || '') && t.classList.contains('dying')) { const g = t.querySelector('.dmg'); if (g) g.classList.add('psn'); }
    }
  }
  if (pa.fb) sfx('c_hit2', .8);
  if (document.querySelector('.arena .mn.shbreak')) sfx('c_bd_rupture', .8);
  const dead = document.querySelectorAll('.arena .mn.dying');
  if (dead.length) {
    const rb = [...dead].some(el => el.querySelector('.dmg.rbd')), dr = [...dead].some(el => el.classList.contains('dr'));
    setTimeout(() => sfx(rb ? 'c_rb_mort' : 'c_mort', .8), 260); if (rb) F.hsRb = 1;
    if (dr) setTimeout(() => sfx('c_rale', .7), 520);
  }
  if (F.hsRb && !dead.length && document.querySelector('.arena .mn.born')) { F.hsRb = 0; sfx('c_rb_retour', .8); }
}
(function () {
  const f0 = fxFrame; fxFrame = function () { const out = f0.apply(this, arguments); try { hsCombatFrame(); } catch (e) {} return out; };
  const l0 = fxLunge; fxLunge = function () { const out = l0.apply(this, arguments); try { sfx('c_att', .8); } catch (e) {} return out; };
  const e0 = fxEnd; fxEnd = function () {
    const F = V.fight, fresh = F && !F.fxDone; const out = e0.apply(this, arguments);
    try { if (fresh && F.r && F.r.w != null && F.r.w >= 0 && Math.min(F.cap || 99, F.r.dmg) > 0) { sfx('c_proj', .7); setTimeout(() => { sfx('c_himpact', .8); sfx('c_etoiles', .5); }, 380); } } catch (e) {}
    return out; };
  const a0 = sfxAct; sfxAct = function (a) {
    try { if (a && a.t === 'play' && V.me && V.me.hd && V.me.hd[a.i]) { const m = V.me.hd[a.i], f = (m.f || '') + (m.tmp && m.tmp.f ? m.tmp.f : ''); if (f.includes('t')) setTimeout(() => sfx('c_prov', .7), 180); else if (f.includes('s')) setTimeout(() => sfx('c_bd_acquis', .6), 180); else if (f.includes('r')) setTimeout(() => sfx('c_rb_acquis', .6), 180); } } catch (e) {}
    return a0.apply(this, arguments); };
  const p0 = sfxPub; sfxPub = function (P, d) {
    try { if (P && d && d.ph !== P.ph) { if (d.ph === 'combat') sfx('c_bascule_c', .45); else if (d.ph === 'recruit' && P.ph === 'combat') sfx('c_bascule_r', .45); } } catch (e) {}
    return p0.apply(this, arguments); };
  // mots-clés : écu de Provocation et bulle de Bouclier divin de Hearthstone à la place des dessins vectoriels
  try {
    const tk = document.getElementById('tk-taunt'); if (tk) tk.innerHTML = '<image href="assets/hs/c-provocation.webp" x="-11" y="-17" width="122" height="152" preserveAspectRatio="none"/>';
    const sh = document.getElementById('tk-shield'); if (sh) sh.innerHTML = '<image href="assets/hs/c-bouclier-divin.webp" x="-13" y="-22" width="126" height="152" preserveAspectRatio="none" opacity=".4" style="mix-blend-mode:screen"/>';
  } catch (e) {}
  const st = document.createElement('style'); st.id = 'hs-combat-css'; st.textContent = `
.hs-spr,.hs-dec{position:absolute;pointer-events:none;background-repeat:no-repeat}
.hs-spr{background-size:400% 200%}.hs-spr.add{mix-blend-mode:screen}
.hs-dec{background-size:100% 100%}
.hs-dec.trace{opacity:.55;transform:scaleY(.42);animation:hsTrace 1.3s linear both;mix-blend-mode:multiply}
@keyframes hsTrace{0%{opacity:0}8%{opacity:.6}60%{opacity:.5}100%{opacity:0}}
.hs-dec.onde{animation:hsOnde .6s ease-out both;mix-blend-mode:screen}
@keyframes hsOnde{0%{opacity:.9;transform:scale(.4)}100%{opacity:0;transform:scale(1.9)}}
.dmg::before{inset:-34%!important;clip-path:none!important;background:url(assets/hs/c-degats.webp) center/contain no-repeat!important}
.dmg.psn::before{background-image:url(assets/hs/c-poison.webp)!important}
.dmg.mort::before{inset:-12%!important;background-image:url(assets/hs/c-mort.webp)!important}
.dmg.mort.psn::before{inset:-34%!important}
.mn .hs-fis{position:absolute;left:10%;right:10%;top:6%;bottom:24%;z-index:6;pointer-events:none;background:url(assets/hs/c-fissures.webp) center/100% 100% no-repeat;mix-blend-mode:screen;animation:hsFis .45s ease-out both}
@keyframes hsFis{0%{opacity:0;transform:scale(.6)}40%{opacity:1}100%{opacity:1;transform:scale(1.05)}}
.fxtxt.hdmg{width:92px!important;height:92px!important}
.fxtxt.hdmg::before{clip-path:none!important;background:url(assets/hs/c-degats-heros.webp) center/contain no-repeat!important;inset:-18%!important}
.bub-run{display:none!important}
/* téléphone en portrait (ancienne disposition) : même plateau d'univers que sur grand écran */
:root:root:root body.u-lo:not(.rn) .table{background:linear-gradient(180deg,rgba(8,10,16,.25),rgba(8,10,16,0) 18%,rgba(8,10,16,0) 72%,rgba(8,10,16,.55)),url(assets/plateaux/seigneur-des-anneaux.webp) center/cover no-repeat,#22242c!important}
:root:root:root body.u-nj:not(.rn) .table{background:linear-gradient(180deg,rgba(8,10,16,.25),rgba(8,10,16,0) 18%,rgba(8,10,16,0) 72%,rgba(8,10,16,.55)),url(assets/plateaux/naruto.webp) center/cover no-repeat,#22242c!important}
:root:root:root body.u-db:not(.rn) .table{background:linear-gradient(180deg,rgba(8,10,16,.25),rgba(8,10,16,0) 18%,rgba(8,10,16,0) 72%,rgba(8,10,16,.55)),url(assets/plateaux/dragon-ball.webp) center/cover no-repeat,#22242c!important}
:root:root:root body.u-rm:not(.rn) .table{background:linear-gradient(180deg,rgba(8,10,16,.25),rgba(8,10,16,0) 18%,rgba(8,10,16,0) 72%,rgba(8,10,16,.55)),url(assets/plateaux/rick-et-morty.webp) center/cover no-repeat,#22242c!important}
:root:root:root body.u-sp:not(.rn) .table{background:linear-gradient(180deg,rgba(8,10,16,.25),rgba(8,10,16,0) 18%,rgba(8,10,16,0) 72%,rgba(8,10,16,.55)),url(assets/plateaux/south-park.webp) center/cover no-repeat,#22242c!important}
:root:root:root body.u-sim:not(.rn) .table{background:linear-gradient(180deg,rgba(8,10,16,.25),rgba(8,10,16,0) 18%,rgba(8,10,16,0) 72%,rgba(8,10,16,.55)),url(assets/plateaux/les-simpson.webp) center/cover no-repeat,#22242c!important}
body:has(#app .ov) #fxl{display:none}   /* aucun effet de combat par-dessus l'écran de fin ou un panneau plein écran */
.fxtxt.intro{display:none!important}
.mn-svg .hs-rb{opacity:.9;animation:hsRb 2.2s ease-in-out infinite;pointer-events:none;filter:brightness(1.7) saturate(1.4) drop-shadow(0 0 2px rgba(60,255,220,.9))}
.mn.rf .mn-svg .hs-rb:not(.in){display:none}
@keyframes hsRb{50%{opacity:.55}}
html.lite .mn-svg .hs-rb{animation:none}
`; document.head.appendChild(st);
})();

// ----- choix du héros, mise en page façon Champs de bataille : plaque de titre, grands portraits, bandeau du nom, relance sous chaque héros, bannière du pouvoir au survol, bouton OK -----
(function () { const st = document.createElement('style'); st.id = 'hs-hero2-css'; st.textContent = `
.hp-ov{background:radial-gradient(ellipse at 50% 45%,#12101c,#050409 78%)!important}
.hp-wrap{position:relative;width:min(1560px,97vw)!important;max-height:97vh!important;gap:clamp(6px,1.4vh,16px)!important;padding:clamp(10px,2vh,26px) clamp(10px,2vw,40px) clamp(12px,2.4vh,30px)!important;box-sizing:border-box;border-radius:28px;
  background:linear-gradient(180deg,rgba(255,255,255,.035),transparent 30%),radial-gradient(ellipse at 50% 30%,#23202e,#14121d 60%,#0d0c15);box-shadow:inset 0 0 0 3px #0a0910,inset 0 0 0 7px #2d2a3a,inset 0 0 0 9px #0a0910,inset 0 0 90px rgba(0,0,0,.75),0 24px 70px rgba(0,0,0,.8)}
.hp-head{position:relative;display:grid;justify-items:center;gap:2px;min-width:min(620px,86vw);padding:clamp(8px,1.6vh,18px) clamp(40px,7vw,120px) clamp(10px,2vh,22px);box-sizing:border-box;
  background:radial-gradient(ellipse at 50% 0,#8b44c8,#5a2296 55%,#3c1466);clip-path:polygon(3% 8%,10% 0,24% 5%,40% 0,58% 4%,76% 0,90% 5%,97% 9%,100% 46%,96% 86%,88% 96%,72% 91%,56% 100%,42% 93%,26% 100%,12% 93%,4% 88%,0 50%);filter:drop-shadow(0 0 18px rgba(150,80,255,.55))}
.hp-t{margin:0!important;font:800 clamp(24px,4.4vh,50px)/1.05 var(--f-disp),serif!important;color:#fff!important;text-shadow:0 0 2px #000,0 3px 0 #1a0a2c,0 0 12px rgba(20,0,40,.9)!important;letter-spacing:.01em}
.hp-fams{margin:0;max-width:min(520px,70vw);font:700 clamp(11px,1.9vh,20px)/1.2 var(--f-label),serif;color:#f6a6ee;text-align:center;text-shadow:0 1px 0 #2a0a44}
.hp-row{align-items:flex-start!important;gap:clamp(8px,2.6vw,52px)!important;margin-top:clamp(4px,1.6vh,18px)!important}
.hp-col{flex:0 1 clamp(110px,min(18vw,23vh),240px)!important;gap:0!important;justify-items:center}
.hp-card{margin-bottom:0!important;overflow:visible}
.hp-col .hp-card:hover{transform:translateY(-4px)!important;filter:none!important}
.hp-col.on .hp-card{transform:translateY(-4px) scale(1.03)!important;filter:drop-shadow(0 0 10px #46ff5a) drop-shadow(0 0 22px rgba(60,255,90,.75))!important}
.hp-col.on .hsarch .hsa-fr{background-image:url(assets/hs/heros-cadre.webp)!important}
.hp-card .hp-nm{position:absolute!important;top:86%!important;bottom:auto!important;left:-7%!important;right:-7%!important;margin:0!important;padding:0!important;height:30%;display:grid!important;place-items:center;z-index:3;border-radius:0!important;box-shadow:none!important;
  background:linear-gradient(180deg,#8a3fc4,#6a2aa6 45%,#4a1a7c)!important;clip-path:polygon(0 0,6% 6%,94% 6%,100% 0,100% 62%,95% 74%,90% 70%,84% 84%,74% 78%,62% 92%,50% 84%,38% 94%,26% 80%,16% 86%,10% 72%,5% 76%,0 64%);filter:drop-shadow(0 4px 4px rgba(0,0,0,.6))}
.hp-card .hp-nm.lg i{font-size:clamp(10px,min(1.55vw,2.7vh),23px)!important;white-space:nowrap;padding:0 2%!important}
.hp-card .hp-nm i{display:block;margin-top:-10%;padding:0 8%;font:800 clamp(12px,min(1.9vw,3.2vh),28px)/1.05 var(--f-label),serif;font-style:normal;color:#fff;text-shadow:0 0 2px #000,0 2px 0 #1c0830,0 0 6px #1c0830;text-wrap:balance}
.hp-card .hp-st{top:-4%!important;z-index:4}
.hp-card .hsarch .harch-hp{right:-9%!important;top:44%!important;bottom:auto!important;width:29%!important;z-index:4}
.hp-rr{position:relative;display:flex;align-items:center;margin-top:calc(26% + 6px);padding:0 14px 0 0;height:clamp(28px,5vh,46px);width:88%;border:0;border-radius:8px;cursor:pointer;font:inherit;
  background:linear-gradient(180deg,#f7e6b4,#dcc081 55%,#b7955a);box-shadow:inset 0 0 0 2px #7a5c2c,inset 0 0 0 4px rgba(255,246,210,.5),0 4px 8px rgba(0,0,0,.6);transition:filter .15s,transform .15s}
.hp-rr:hover{filter:brightness(1.1);transform:translateY(-1px)}
.hp-rr b{flex:1;text-align:center;font:800 clamp(10px,min(1.2vw,2.1vh),17px) var(--f-label),serif;color:#5a3d18;padding-left:8px}
.hp-rrn{flex:none;display:grid;place-items:center;height:150%;aspect-ratio:1;margin-left:-8%;border-radius:50%;background:radial-gradient(circle at 38% 30%,#b9c7d6,#5d7186 55%,#2f3e50);box-shadow:inset 0 0 0 3px #2a3644,inset 0 0 0 5px #8fa4b8,0 3px 6px rgba(0,0,0,.6);
  font:800 clamp(15px,2.9vh,28px) var(--f-num),serif;color:#3dff4a;text-shadow:0 0 2px #000,0 2px 0 #062a08,0 0 6px #0a3a0c}
.hp-rr.off{filter:grayscale(.9) brightness(.62);cursor:not-allowed}.hp-rr.off .hp-rrn{color:#c9c9c9}
.hp-pop{position:absolute;z-index:8;left:66%;top:-9%;opacity:0;visibility:hidden;pointer-events:none;transform:translateY(8px) scale(.94);transform-origin:0 40%;transition:opacity .14s,transform .14s,visibility .14s}
.hp-col:last-child .hp-pop,.hp-col:nth-child(n+3):nth-last-child(-n+2) .hp-pop{left:auto;right:66%;transform-origin:100% 40%}
.hp-col:hover .hp-pop{opacity:1;visibility:visible;transform:none}
/* la bulle du pouvoir ne recouvre plus les portraits : vers l'extérieur pour les héros des bords, décalée hors de la goutte de vie pour ceux du milieu */
.hp-row .hp-col .hp-pop{left:94%;right:auto;transform-origin:0 40%}
.hp-row .hp-col:nth-child(n+3):nth-last-child(-n+2) .hp-pop{left:auto;right:94%;transform-origin:100% 40%}
@media (min-width:1000px){.hp-row.hp-row .hp-col.hp-col:first-child .hp-pop{left:auto;right:98%;transform-origin:100% 40%}.hp-row.hp-row .hp-col.hp-col:last-child .hp-pop{left:104%;right:auto;transform-origin:0 40%}}
@media (min-width:1000px){.hp-row.hp-row.hp-row .hp-col.hp-col:nth-child(2):nth-last-child(2) .hp-pop,.hp-row.hp-row.hp-row .hp-col.hp-col:nth-child(3):nth-last-child(2) .hp-pop{left:calc(204% + clamp(8px,2.6vw,52px));right:auto;transform-origin:0 40%}.hp-row.hp-row.hp-row .hp-col.hp-col:nth-child(2):nth-last-child(3) .hp-pop{left:auto;right:calc(198% + clamp(8px,2.6vw,52px));transform-origin:100% 40%}}
.hp-row .hp-col:hover{z-index:9}
.hpc-pw{margin:0 0 4px;font-size:clamp(12px,1.7vh,15px);line-height:1.3;color:#f3e6c8}.hpc-pw b{color:#ffd86a;margin-right:6px}
.hp-pop .pwb{width:clamp(168px,min(15vw,30vh),236px)}
.hp-ok{margin-top:clamp(2px,1vh,10px);min-width:clamp(120px,12vw,196px);height:clamp(44px,8.6vh,92px);padding:0 30px;border:0;border-radius:30px/46%;cursor:pointer;
  font:800 clamp(20px,4vh,40px) var(--f-disp),serif;color:#fff;text-shadow:0 0 2px #000,0 3px 0 #2a2a30;background:linear-gradient(180deg,#f2f2f6,#c9cad2 45%,#8c8e9a);box-shadow:inset 0 0 0 3px #6c6e7a,inset 0 0 0 7px rgba(255,255,255,.55),0 6px 14px rgba(0,0,0,.7);transition:filter .15s,transform .15s}
.hp-ok:not(:disabled){background:linear-gradient(180deg,#fff4c8,#f0c860 45%,#c08a26);box-shadow:inset 0 0 0 3px #7a5414,inset 0 0 0 7px rgba(255,250,220,.6),0 0 22px rgba(255,210,90,.7),0 6px 14px rgba(0,0,0,.7);text-shadow:0 0 2px #000,0 3px 0 #5a3a08;animation:hpOk 1.6s ease-in-out infinite}
.hp-ok:not(:disabled):hover{filter:brightness(1.1);transform:scale(1.04)}
.hp-ok:disabled{cursor:default;filter:brightness(.8) saturate(.6)}
@keyframes hpOk{50%{box-shadow:inset 0 0 0 3px #7a5414,inset 0 0 0 7px rgba(255,250,220,.6),0 0 34px rgba(255,220,110,.95),0 6px 14px rgba(0,0,0,.7)}}
.hp-infos{min-height:clamp(96px,22vh,210px)!important;width:min(820px,94vw)!important;margin:0!important}
.hp-pc{position:relative!important;display:none!important;grid-template-columns:auto 1fr!important;padding:8px 16px!important;column-gap:16px!important;row-gap:2px!important;font-size:clamp(11px,1.5vh,13px);opacity:1!important;visibility:visible!important}
.hp-wrap:has(.hp-col:nth-child(1):hover) .hp-pc.k0,.hp-wrap:has(.hp-col:nth-child(2):hover) .hp-pc.k1,.hp-wrap:has(.hp-col:nth-child(3):hover) .hp-pc.k2,.hp-wrap:has(.hp-col:nth-child(4):hover) .hp-pc.k3,.hp-wrap:not(:has(.hp-col:hover)) .hp-pc.on{display:grid!important}
.hpc-who{align-self:center;font:800 clamp(14px,2vh,20px) var(--f-label),serif;color:#ffe0a6}
@media (max-width:820px){.hp-pop{left:50%!important;right:auto!important;top:auto;bottom:-6%;transform-origin:50% 100%!important;margin-left:-84px}.hp-pc{grid-template-columns:1fr!important}}
@media (orientation:landscape) and (max-height:540px){.hp-col{flex:0 0 clamp(80px,24vh,110px)!important}.hp-row{justify-content:center!important;margin-top:14px!important}.hp-wrap{justify-content:center}.hp-card{aspect-ratio:400/480!important}.hp-fams{display:none}.hp-infos{display:none!important}.hp-pop{top:-30%}}
html.lite .hp-ok{animation:none!important}
`; document.head.appendChild(st); })();

// ----- disposition Champs de bataille (captures de référence 1916×1047 ramenées au canevas 1672×941) : décors Roni et ovales bronze conservés,
// tavernier en arche et boutons de taverne en haut au centre, deux rangées de serviteurs sur la table, classement en colonne, héros en arche + médaillon, plaque chrono/Prêt, or en bas à droite -----
(function () { const st = document.createElement('style'); st.id = 'bg-layout-css'; st.textContent = rnCss(`
/* fond : plateau de l'univers, plein écran (pack Roni-Tavernes-Cinq-Univers) ; l'ancienne table et l'ancien décor ne sont plus affichés */
html:root:root:root:root:root:root:root:root body.rn[class] .rn-tb,html:root:root:root:root:root:root:root:root body.rn[class] .rn-surf{display:none}
§ .stage::after{background:#312723 url(assets/plateaux/dragon-ball.webp) 0 0/100% 100% no-repeat}
§ .stage::before{background:linear-gradient(rgba(8,5,3,.6),rgba(8,5,3,.6)),#0b0705 url(assets/plateaux/dragon-ball.webp) center/cover no-repeat}
§.u-lo .stage::after{background-image:url(assets/plateaux/seigneur-des-anneaux.webp)}§.u-lo .stage::before{background-image:linear-gradient(rgba(8,5,3,.6),rgba(8,5,3,.6)),url(assets/plateaux/seigneur-des-anneaux.webp)}§.u-nj .stage::after{background-image:url(assets/plateaux/naruto.webp)}§.u-nj .stage::before{background-image:linear-gradient(rgba(8,5,3,.6),rgba(8,5,3,.6)),url(assets/plateaux/naruto.webp)}
§.u-sp .stage::after{background-image:url(assets/plateaux/south-park.webp)}§.u-sp .stage::before{background-image:linear-gradient(rgba(8,5,3,.6),rgba(8,5,3,.6)),url(assets/plateaux/south-park.webp)}
§.u-rm .stage::after{background-image:url(assets/plateaux/rick-et-morty.webp)}§.u-rm .stage::before{background-image:linear-gradient(rgba(8,5,3,.6),rgba(8,5,3,.6)),url(assets/plateaux/rick-et-morty.webp)}
§.u-sim .stage::after{background-image:url(assets/plateaux/les-simpson.webp)}§.u-sim .stage::before{background-image:linear-gradient(rgba(8,5,3,.6),rgba(8,5,3,.6)),url(assets/plateaux/les-simpson.webp)}
/* zones */
§ .keeper-zone{height:470u;--tw:112u}
§ .keeper-zone:not(.enemy)::before{content:none}
§ .board-zone{top:470u;height:220u;--tw:112u}
§ .board-zone #bdrow{left:260u;top:15u;width:1130u;height:140u}
§ .board-zone #bdrow .mn,§ .keeper-zone:not(.enemy) .counter-line .mn,§ .keeper-zone.enemy .counter-line .mn{width:112u;margin:0 3u;gap:1u}
§ .board-zone.drop-ok::after{left:250u;top:7u;width:1150u;height:156u}
§ .board-zone .hint{top:44u}
§ .keeper-zone:not(.enemy) .counter-line{left:260u;top:319u;width:1130u;height:140u}
§ .keeper-zone.enemy .counter-line{left:260u;top:319u;width:1130u;height:140u}
§ .keeper-zone .hint{top:370u}
§ .keeper-zone .shelf{margin:0 0 0 8u;padding:2u 5u 4u;min-width:96u;--tw:84u}
§ .keeper-zone .shelf.two{--tw:70u}
/* tavernier en arche, blason du niveau */
§ .keeper .kc{left:769u;top:86u;width:134u;height:160u;background:none}
§ .keeper .kc::after{content:none}
§ .keeper .kc::before{content:'';position:absolute;inset:0;z-index:2;background:url(assets/hs/heros-cadre.webp) 0 0/100% 100% no-repeat;pointer-events:none}
§ .keeper .kc .face{display:block;position:absolute;inset:0;width:100%;height:100%;margin:0;border:0;border-radius:0;box-shadow:none;background:#1a120c;clip-path:polygon(50% 12%,63% 15%,73% 20%,80% 28%,84% 37%,87% 46%,87% 90%,13% 90%,13% 48%,15% 38%,19% 28%,25% 21%,36% 15%)}
§ .keeper .kc .face svg{position:absolute;left:11%;top:10%;width:78%;height:82%}
§ .keeper .kc .lv{left:-30u;top:84u;width:60u;height:61u;z-index:3;background:url(assets/hs/b-blason-niveau.webp) 0 0/100% 100% no-repeat}
§ .keeper .kc .ts{position:absolute;left:14u;top:13u;width:32u;height:30u;display:flex;flex-wrap:wrap;align-content:center;justify-content:center;gap:0}
§ .keeper .kc .ts i{flex:none;display:none;width:15u;height:15u;background:url(assets/hs/b-etoile-niveau.webp) center/118% no-repeat}
§ .keeper .kc .ts i.on{display:block;background:url(assets/hs/b-etoile-niveau.webp) center/118% no-repeat}
/* boutons de taverne */
§ .keeper .medal{border-radius:0}
§ .keeper .medal[data-act="up"]{left:646u;top:110u;width:84u;height:114u;border-radius:0;background-image:url(assets/hs/b-ameliorer.webp)}
§ .keeper .medal[data-act="up"] small{display:none}
§ .keeper .medal[data-act="up"] .cost,§ .keeper .medal .cost{left:50%;top:-13u;width:34u;height:34u;margin:0 0 0 -17u;font-size:fs(21,9);color:#fff;text-shadow:0 0 2u #000,0 2u 0 #3a2206,0 0 4u #3a2206;background:url(assets/hs/b-piece-or.webp) center/100% 100% no-repeat;box-shadow:none}
§ .keeper .medal[data-act="roll"]{left:932u;top:110u;width:84u;height:114u;background-image:url(assets/hs/b-renouveler.webp)}
§ .keeper .medal[data-act="frz"]{left:1028u;top:92u;width:76u;height:103u;background-image:url(assets/hs/b-geler.webp)}
§ .keeper .medal:not(:disabled){filter:drop-shadow(0 0 3u #38ff4a) drop-shadow(0 0 5u rgba(60,255,90,.7))}
§ .keeper .medal:not(:disabled):hover{filter:drop-shadow(0 0 4u #7dff8a) drop-shadow(0 0 8u rgba(60,255,90,.9)) brightness(1.15)}
§ .keeper .medal[data-act="frz"].on{filter:drop-shadow(0 0 5u #8fe8ff) drop-shadow(0 0 9u #8fe8ff) brightness(1.15)}
/* adversaire en combat : arche en haut au centre */
§ .keeper-zone.enemy .keeper{left:769u;top:86u;width:134u;height:160u;transform:none;display:block;padding:0;border-radius:0;background:none;box-shadow:none}
§ .keeper-zone.enemy .keeper::before{content:'';position:absolute;inset:0;z-index:2;background:url(assets/hs/heros-cadre.webp) 0 0/100% 100% no-repeat;pointer-events:none}
§ .keeper-zone.enemy .keeper .face.kf{position:absolute;inset:0;width:100%;height:100%;margin:0;border:0;border-radius:0;box-shadow:none;background:#1a120c;clip-path:polygon(50% 12%,63% 15%,73% 20%,80% 28%,84% 37%,87% 46%,87% 90%,13% 90%,13% 48%,15% 38%,19% 28%,25% 21%,36% 15%)}
§ .keeper-zone.enemy .keeper .face.kf svg{position:absolute;left:11%;top:10%;width:78%;height:82%}
§ .keeper-zone.enemy .kn-en{position:absolute;left:142u;top:44u;width:max-content;display:grid;gap:4u;padding:6u 14u;border-radius:12u;background:rgba(16,10,8,.72);box-shadow:inset 0 0 0 1.5u rgba(200,150,62,.5)}
§ .keeper-zone.enemy .kn-en b{font-size:fs(22,9)}
§ .keeper-zone.enemy .kn-en .ts i{width:fs(17,7);height:fs(17,7)}
§ .table-skip{top:262u}
/* classement en colonne étroite : portraits carrés, vie dessous, nom au survol */
§ .opps{left:222u;top:124u;width:92u}
§ .opps::before{content:'';position:absolute;left:-6u;right:-6u;top:-12u;bottom:-10u;border-radius:30u;background:linear-gradient(180deg,rgba(40,70,124,.92),rgba(16,28,58,.95));box-shadow:inset 0 0 0 2u rgba(130,190,255,.6),inset 0 0 20u rgba(60,130,255,.4),0 0 14u rgba(50,120,255,.5);pointer-events:none}
§ .opps .op{width:92u;height:70u;margin:0 0 9u;background:none}
§ .opps .op-face .face{left:13u;top:2u;width:66u;height:66u;border-radius:10u;box-shadow:0 0 0 3u #b3201c,0 0 0 5u #3a0808,0 3u 6u rgba(0,0,0,.6);background:#2a1a10}
§ .opps .op.me .op-face .face{box-shadow:0 0 0 3u #2c8fd8,0 0 0 5u #082a4a,0 3u 6u rgba(0,0,0,.6)}
§ .opps .op.vs .op-face .face{box-shadow:0 0 0 3u #ff3a2a,0 0 0 5u #3a0808,0 0 12u #ff3a2a}
§ .opps .op.me,§ .opps .op.vs{filter:none}
§ .opps .op-hp{left:52u;top:44u;width:36u;height:30u;font-size:fs(15,7.5);background:url(assets/hs/b-vie.webp) center/contain no-repeat}
§ .opps .op-t{left:0;top:-6u}
§ .opps .op-r{right:auto;left:68u;top:-6u}
§ .opps .op-el{left:0;top:46u}
§ .opps .op-n{display:none}
/* héros du joueur en arche, vie, quête, médaillon du pouvoir, emplacements */
§ .hz-hero{left:769u;top:2u;width:134u;height:160u;background:none}
§ .hz-hero::after{content:'';position:absolute;inset:0;z-index:2;background:url(assets/hs/heros-cadre-or.webp) 0 0/100% 100% no-repeat;pointer-events:none}
§ .hz-hero .face.hf{left:0;top:0;width:100%;height:100%;border-radius:0;box-shadow:none;clip-path:polygon(50% 12%,63% 15%,73% 20%,80% 28%,84% 37%,87% 46%,87% 90%,13% 90%,13% 48%,15% 38%,19% 28%,25% 21%,36% 15%)}
§ .hz-hero .face.hf svg{position:absolute;left:11%;top:10%;width:78%;height:82%}
§ .hz-hero .haw-fr{display:none}
§ .hz-hero .hpg{left:94u;top:100u;width:50u;height:66u;z-index:4;background:url(assets/hs/b-vie.webp) center/contain no-repeat}
§ .hz-hero .hq{left:100u;top:50u;width:50u;height:58u;z-index:4;background:url(assets/hs/b-armure.webp) 0 0/100% 100% no-repeat}
§ .hero-zone .hz-right > .hov{left:929u;top:14u;width:114u;height:114u}
§ .hero-zone .powm:not(.pwh-nh_sasuke)::after{background-image:url(assets/hs/heros-medaillon.webp)}
§ .hero-zone .powm:not(.pwh-nh_sasuke):not(:disabled):not(.passive):hover::after{background-image:url(assets/hs/heros-medaillon.webp);filter:brightness(1.25) drop-shadow(0 0 5u #ffe08a)}
§ .hero-zone .powm:not(.pwh-nh_sasuke).used::after{background-image:url(assets/hs/heros-medaillon.webp);filter:grayscale(1) brightness(.7)}
§ .hero-zone .powm:not(.pwh-nh_sasuke) .pwart{left:16%;top:16%;width:68%;height:68%}
§ .hero-zone .powm .pcost:not(.ck){top:-12u;width:34u;height:34u;margin:0 0 0 -17u;color:#fff;text-shadow:0 0 2u #000,0 2u 0 #3a2206,0 0 4u #3a2206;background:url(assets/hs/b-piece-or.webp) center/100% 100% no-repeat}
§ .hero-zone .powm small{top:112u}
§ .hero-zone .hz-left{right:1080uz;top:20uz}
/* or en bas à droite */
§ .hero-zone .purses{left:1060u;top:20u}
§ .hero-zone .purses .purse:not(.ckp):not(.kip):not(.pfp){left:-18u;top:176u;width:330u;height:46u;background:none}
§ .hero-zone .purses .purse:not(.ckp):not(.kip):not(.pfp) b{left:0;top:3u;width:76u;height:40u;border-radius:20u;background:linear-gradient(#2a1c10,#120a06);box-shadow:inset 0 0 0 2u #8a6a2c,0 2u 5u rgba(0,0,0,.6);font-size:fs(22,10);color:#ffe9a0;text-shadow:0 1px 2px #000;display:flex;align-items:baseline;justify-content:center;gap:1u;padding-top:8u;box-sizing:border-box}
§ .hero-zone .purses .purse:not(.ckp):not(.kip):not(.pfp) b small{position:static;width:auto;font-size:fs(17,8);color:#ffe9a0}
§ .hero-zone .purses .purse:not(.ckp):not(.kip):not(.pfp) .coinrow{left:84u;top:6u;width:244u;height:34u;padding:0;gap:1u;background:none;box-shadow:none;border-radius:0}
§ .hero-zone .purses .purse:not(.ckp):not(.kip):not(.pfp) .coin{flex:0 1 23u;border-radius:50%;box-shadow:none;background:url(assets/hs/b-piece-or.webp) center/100% 100% no-repeat}
§ .hero-zone .purses .purse:not(.ckp):not(.kip):not(.pfp) .coin.off{filter:grayscale(1) brightness(.45);opacity:.8}
§ .hero-zone .purses .purse:not(.ckp):not(.kip):not(.pfp) .inc{right:auto;left:86u;top:-15u}
§ .hero-zone .rsv{left:1240uz;top:10uz}
/* plaque du chrono : c'est aussi le bouton Prêt */
§ .hero-zone .bellwrap{left:1336u;top:-252u;width:134u;height:74u;background:none}
§ .hero-zone .bell .bell-t{left:0;top:0;width:100%;height:100%;border-radius:0;box-shadow:none;display:grid;place-items:end center;padding:0 0 9u;box-sizing:border-box;font-size:fs(13,6.5);color:#4a3a06;text-shadow:0 1px 0 rgba(255,250,200,.7);background:url(assets/hs/b-fin-tour.webp) 0 0/100% 100% no-repeat}
§ .hero-zone .bell.rung .bell-t{background:url(assets/hs/b-pret.webp) 0 0/100% 100% no-repeat;color:#0c3a08}
§ .hero-zone .bell:disabled .bell-t{display:grid;place-items:center;padding:0;font-size:0;background:url(assets/hs/b-fin-inactive.webp) 0 0/100% 100% no-repeat}
§ .hero-zone .bell:disabled .bell-t::after{content:'Combat';position:static;inset:auto;background:none;font-size:fs(21,9);color:#fff;text-shadow:0 0 2u #000,0 2u 0 #222,0 0 5u #000}
§ .hero-zone .bell.rung .bell-t::before{right:-16u;top:-22u;width:54u;height:54u}
§ .hero-zone .bell .bell-t,§ .hero-zone .bell:disabled .bell-t{place-items:center;padding:0;font-size:0}
§ .hero-zone .bell .bell-t::after,§ .hero-zone .bell:disabled .bell-t::after{content:attr(data-l);position:absolute;inset:auto;left:50%;top:100%;transform:translateX(-50%);margin-top:3u;white-space:nowrap;background:none;font-size:fs(16,9);line-height:1;color:#ffe9a8;text-shadow:0 0 2u #000,0 1u 0 #000,0 0 6u #000;pointer-events:none}
§ .hero-zone .bell:disabled .bell-t::after{content:'Combat';color:#fff}
/* ===== interface v2 (éléments fournis le 14/11/2026) : plaque de bois derrière « Manche · phase » ===== */
§ .hud::before{content:'';position:absolute;left:4u;top:10u;width:232u;height:50u;z-index:0;pointer-events:none;background:url(assets/hs/v2/rec-synergie.webp) 0 0/100% 100% no-repeat;filter:drop-shadow(0 3u 4u rgba(0,0,0,.55))}
§ .hud .round,§ .hud .phase{position:relative;z-index:1}
§ .hud .timer{left:1336u;top:404u;width:134u;height:40u;font-size:fs(27,11);color:#fff;text-shadow:0 0 2u #000,0 2u 0 #3a2a06,0 0 6u rgba(0,0,0,.9)}
/* bannière de résultat du combat : entre le classement et la plaque du chrono */
§ .table-banner{left:336u;width:920u}
/* fiche de la carte sélectionnée : dans le coin libre en haut à droite, plus sur la rangée de la taverne */
§ .table .detail-pop{left:1120u;top:118uz;transform:none}
/* joueur éliminé ou spectateur : le chrono garde une plaque même sans bouton Prêt */
§ .table:not(:has(.hero-zone .bellwrap)) .hud .timer{background:url(assets/hs/b-fin-inactive.webp) 0 0/100% 100% no-repeat;top:398u;height:74u;display:grid;place-items:center}
/* main : cartes à la taille Champs de bataille */
§ .table .hand{--hw:max(64px,132u)}
`); document.head.appendChild(st); })();

// ----- cadres de serviteur de Champs de bataille : anneau gris (doré pour les cartes dorées), portrait qui remplit l'anneau, gemmes d'attaque et de vie -----
(function () {
  try { document.body.insertAdjacentHTML('afterbegin', '<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs><clipPath id="hsf-clip"><ellipse cx="50" cy="62" rx="34.5" ry="52.5"/></clipPath></defs></svg>'); } catch (e) {}
  // cartes (main, survol, découverte) : mêmes gemmes d'attaque et de vie que sur le plateau
  try { const ga = document.getElementById('fr-atk'), gh = document.getElementById('fr-hp');
    if (ga) ga.innerHTML = '<image href="assets/hs/f-gemme-attaque.webp" x="40" y="54" width="250" height="250" preserveAspectRatio="none"/>';
    if (gh) gh.innerHTML = '<image href="assets/hs/f-gemme-vie.webp" x="48" y="22" width="170" height="256" preserveAspectRatio="none"/>'; } catch (e) {}
  const of0 = ufOf, in0 = ufIn;
  ufOf = function (m) { if (V.screen !== 'game' || !V.pub || !m || m.sp || !C[m.c]) return null; return 'hs'; };
  ufIn = function (m, id, up) {
    if (id !== 'hs') return in0(m, id, up);
    const b = CD(m.c);
    return `<ellipse cx="50" cy="62" rx="34.5" ry="52.5" fill="#1a110a"/><g clip-path="url(#hsf-clip)"><use href="#art-${artOf(m)}" x="-3" y="9" width="106" height="106"/></g>`
      + `<image class="hsf-f" href="assets/hs/f-cadre-${m.g ? 'dore' : 'serviteur'}.webp" x="-3.75" y="-6" width="107.5" height="132" preserveAspectRatio="none"/>`
      + ((m.f || '').includes('r') ? '<g class="hs-rb in"><title>Réincarnation</title><image href="assets/hs/k-reincarnation.webp" x="-12" y="-16" width="124" height="152" preserveAspectRatio="none"/></g>' : '')
      + (b.t ? `<g class="hsf-t"><title>Niveau ${b.t}</title><image href="assets/hs/b-blason-niveau.webp" x="34" y="-13" width="32" height="32.5"/>${Array.from({ length:b.t }, (_, k) => { const row = b.t > 3 ? (k < Math.ceil(b.t / 2) ? 0 : 1) : 0, n = b.t > 3 ? (row ? b.t - Math.ceil(b.t / 2) : Math.ceil(b.t / 2)) : b.t, i = b.t > 3 && row ? k - Math.ceil(b.t / 2) : k, sz = b.t > 3 ? 7 : b.t > 1 ? 8.4 : 11; return `<image href="assets/hs/b-etoile-niveau.webp" x="${f1(50 - n * sz / 2 + i * sz)}" y="${f1((b.t > 3 ? -5.5 + row * 6.6 : 2.2 - sz / 2))}" width="${sz}" height="${sz}"/>`; }).join('')}</g>` : '')
      + `<image href="assets/hs/f-gemme-attaque.webp" x="3" y="87" width="31" height="31"/><image href="assets/hs/f-gemme-vie.webp" x="69" y="85" width="22" height="33"/>`
      + `<text class="gt uf-s${up(m.a, b.a)}" x="18.5" y="103" dy=".36em">${m.a}</text><text class="gt uf-s${up(m.h, b.h)}" x="80" y="104" dy=".36em">${m.h}</text>`
      + hsBadges(m);
  };
  // mots-clés façon Champs de bataille : un insigne sous le serviteur (crâne, fiole, cor, éclair) à la place des pastilles rondes
  const k0 = kwIcons; kwIcons = function (m) { return ufOf(m) === 'hs' ? [] : k0(m); };
  const st = document.createElement('style'); st.id = 'hs-frame-css'; st.textContent = `
.mn-svg .hsf-t .uf-r{font-size:9px;fill:#3a2206;stroke:none;paint-order:normal}
.mn-svg .hsf-f{pointer-events:none}
/* le fanion du niveau n'apparaît que dans la boutique, comme dans Champs de bataille */
#bdrow .mn-svg .hsf-t,.keeper-zone.enemy .mn-svg .hsf-t,.arena .mn-svg .hsf-t{display:none}
` + rnCss(`
§ .keeper-zone .shelf{background:none;box-shadow:none;padding:0;margin:0 0 0 6u;min-width:0;--tw:104u}
§ .keeper-zone .shelf.two{--tw:88u}
§ .keeper-zone .shelf .shelf-l{display:none}
§ .keeper .medal[data-act="frz"]::before{content:'0';position:absolute;left:50%;top:-12u;width:30u;height:30u;margin:0 0 0 -15u;display:grid;place-items:center;font:700 fs(18,8)/1 var(--f-num),serif;color:#fff;text-shadow:0 0 2u #000,0 2u 0 #3a2206,0 0 4u #3a2206;background:url(assets/hs/b-piece-or.webp) center/100% 100% no-repeat}
`) + `
`; document.head.appendChild(st);
})();

// ----- bulles au survol des éléments qui n'en avaient pas (boutons de taverne, Prêt, or, tavernier, chrono, vie, héros adverse) -----
function tipSync() {
  try {
    if (V.screen !== 'game' || !V.pub) return; const me = V.me || {}, q = s => document.querySelector('.table ' + s), set = (el, tx) => { if (el && tx) { el.dataset.tip = tx; el.dataset.xt = '1'; if (el.hasAttribute('title')) { if (!el.getAttribute('aria-label')) el.setAttribute('aria-label', el.getAttribute('title')); el.removeAttribute('title'); } } };
    const up = q('.keeper .medal[data-act="up"]'), cost = up && up.querySelector('.cost') ? up.querySelector('.cost').textContent.trim() : '';
    set(up, (me.t || 1) >= 6 ? 'Améliorer : ta taverne est au niveau maximum.' : `Améliorer : passe la taverne au niveau ${(me.t || 1) + 1} pour ${cost || '?'} or. Tu y trouveras des serviteurs plus forts ; le prix baisse de 1 à chaque tour.`);
    const roll = q('.keeper .medal[data-act="roll"]'), rc = roll && roll.querySelector('.cost') ? roll.querySelector('.cost').textContent.trim() : '1';
    set(roll, `Actualiser : remplace les serviteurs proposés par la taverne pour ${rc} or.`);
    set(q('.keeper .medal[data-act="frz"]'), me.fz ? 'Dégeler : la taverne sera de nouveau renouvelée au prochain tour.' : 'Geler : garde les serviteurs de la taverne pour le prochain tour. Gratuit.');
    { const bell = q('.hero-zone .bell'); if (bell) { delete bell.dataset.tip; bell.removeAttribute('title'); } }   // bouton Prêt : pas de bulle au survol, seulement le halo vert
    const pu = q('.hero-zone .purses .purse:not(.ckp):not(.kip):not(.pfp)'); set(pu, `Or : ${me.g != null ? me.g : '?'} pièce${me.g > 1 ? 's' : ''} à dépenser ce tour. Tu en reçois une de plus à chaque tour, jusqu'à 10. L'or non dépensé est perdu.`);
    set(q('.keeper .kc'), `Tavernier : taverne de niveau ${me.t || 1}. Il propose de nouveaux serviteurs à chaque tour ; fais glisser un serviteur vers lui pour le vendre 1 or.`);
    { const tm = q('.hud .timer'); if (tm) { delete tm.dataset.tip; tm.removeAttribute('title'); } }
    set(q('.hz-hero .hpg'), `Points de vie : ${me.hp != null ? Math.max(0, me.hp) : '?'}. À 0, tu es éliminé.`);
    document.querySelectorAll('.table .fan .cd').forEach((el, i) => el.classList.toggle('tmpc', !!(me.hd && me.hd[i] && me.hd[i].tmpc)));
    const ek = q('.keeper-zone.enemy .keeper'); if (ek) { const b = ek.querySelector('.kn-en b'); if (b && b.textContent) { ek.dataset.hov = 'op'; ek.dataset.n = b.textContent; } }
  } catch (e) {}
}
(function () {
  const r0 = render; render = function () {
    const had = !peekEl.hidden && peekFor && peekFor.matches && peekFor.matches('[data-xt],[data-tip]');
    const out = r0.apply(this, arguments); tipSync();
    // un rendu ferme la bulle : on la rouvre si la souris est toujours sur l'élément
    try { if (had && peekEl.hidden && PTR.x != null && !DRAG) { const el = document.elementFromPoint(PTR.x, PTR.y), n = el && el.closest ? el.closest('[data-xt],[data-tip]') : null; if (n && !n.closest('.mn,.cd,.spt,[data-hov]')) showPeek(n, false); } } catch (e) {}
    return out; };
  document.addEventListener('pointerover', e => {
    if (e.pointerType && e.pointerType !== 'mouse') return; if (typeof DRAG !== 'undefined' && DRAG) return;
    const t = e.target.closest ? e.target.closest('[data-xt],[data-tip]') : null; if (!t || t.closest('.mn,.cd,.spt,[data-hov]')) return;
    if (t === peekFor) return; showPeek(t, false);
  });
  document.addEventListener('pointerout', e => { const t = e.target.closest ? e.target.closest('[data-xt],[data-tip]') : null; if (t && t === peekFor && !t.contains(e.relatedTarget)) hidePeek(); });
  const st = document.createElement('style'); st.textContent = '.hov > button:disabled{pointer-events:none}#peek .tip{max-width:300px}'; document.head.appendChild(st);
})();

// insignes de mots-clés (pack Atlas, dossier mots-cles) : Râle d'agonie, Toxicité, Venimosité, Ralliement, capacité déclenchée ; rubans de Furie des vents
function hsBadges(m) {
  const by = CD(m.c).by || {}, f = m.f || '', xs = m.x || [], has = tr => (by[tr] && by[tr].length) || xs.some(e => ET[e.k] && ET[e.k].tr === tr), L = [];
  if (has('dr')) L.push(['rale-d-agonie', 'Râle d\'agonie', 1]);
  if (f.includes('v')) L.push(['toxicite', 'Toxicité', 1.05]); else if (f.includes('n')) L.push(['venimosite', 'Venimosité', 1.05]);
  if (f.includes('l')) L.push(['vol-de-vie', 'Vol de vie', 1]);
  if ((by.bc || []).concat(xs).some(e => e.k === 'craft')) L.push(['sorcellerie-rune', 'Sorcellerie : donne un sort temporaire à chaque tour', 1.05]);
  if (has('atk') || has('aatk')) L.push(['ralliement', 'Ralliement : se déclenche quand il attaque', 1]);
  if (['soc', 'eot', 'sot', 'surv', 'die', 'cast', 'shield', 'roll', 'up', 'pow', 'sell', 'buy', 'play', 'reborn', 'don', 'donc', 'spend', 'hand', 'combo', 'win'].some(has)) L.push(['declenchement', 'Capacité déclenchée', .8]);
  const B = L.slice(0, 2), n = B.length, sz = n > 1 ? 21 : 25;
  return (f.includes('c') ? '<g class="hs-cam"><title>Camouflage</title><image href="assets/hs/k-camouflage-ombre.webp" x="-8" y="-12" width="116" height="146" preserveAspectRatio="none"/></g>' : '')
    + (f.includes('i') ? '<g class="hs-imm"><title>Insensible</title><ellipse cx="50" cy="60" rx="45" ry="60" fill="none" stroke="#fff2b0" stroke-width="2.2"/></g>' : '')
    + (f.includes('w') ? '<g class="hs-wind"><title>Furie des vents</title><image href="assets/hs/k-furie-des-vents-filage.webp" x="-6" y="30" width="112" height="26" preserveAspectRatio="none"/><image href="assets/hs/k-furie-des-vents-filage.webp" x="-6" y="62" width="112" height="22" preserveAspectRatio="none"/></g>' : '')
    + B.map(([img, nm, k], i) => { const w = sz * k, x = 50 + (n > 1 ? (i ? 11.5 : -11.5) : 0) - w / 2; return `<g class="hs-bdg"><title>${nm}</title><image href="assets/hs/k-${img}.webp" x="${f1(x)}" y="${f1(112.5 - w / 2)}" width="${f1(w)}" height="${f1(w)}"/></g>`; }).join('');
}
(function () { const st = document.createElement('style'); st.id = 'hs-kw-css'; st.textContent = `
.mn-svg .hs-bdg{filter:drop-shadow(0 1px 1.5px rgba(0,0,0,.8))}
.mn-svg .hs-wind{mix-blend-mode:screen;opacity:.55;pointer-events:none}
.mn-svg .hs-wind image{animation:hsWind 1.3s linear infinite}
.mn-svg .hs-wind image + image{animation-duration:1.7s;animation-direction:reverse;opacity:.7}
@keyframes hsWind{0%{transform:translateX(-14px);opacity:0}25%{opacity:1}75%{opacity:1}100%{transform:translateX(14px);opacity:0}}
html.lite .mn-svg .hs-wind image{animation:none}
/* activations : crâne rouge quand un Râle d'agonie se résout, coquille brisée quand un Bouclier divin saute, éclat vert du Cri de guerre */
.arena .mn.dying.dr .dmg.mort::before{inset:-18%!important;background-image:url(assets/hs/k-rale-d-agonie-activation.webp)!important}
.arena .mn.shbreak::after{content:'';position:absolute;left:-12%;right:-12%;top:-6%;bottom:8%;z-index:6;pointer-events:none;background:url(assets/hs/k-bouclier-divin-rupture.webp) center/contain no-repeat;animation:hsShb .55s ease-out both}
@keyframes hsShb{0%{opacity:1;transform:scale(.8)}100%{opacity:0;transform:scale(1.35)}}
.hs-bc{position:fixed;z-index:60;pointer-events:none;background:url(assets/hs/k-cri-de-guerre-eclat.webp) center/contain no-repeat;animation:hsBc .7s ease-out both}
@keyframes hsBc{0%{opacity:0;transform:scale(.6)}25%{opacity:1}100%{opacity:0;transform:scale(1.5)}}
`; document.head.appendChild(st);
  // Cri de guerre : éclat autour du serviteur qui vient d'être posé
  const a0 = sfxAct; sfxAct = function (a) {
    try { if (a && a.t === 'play' && V.me && V.me.hd && V.me.hd[a.i] && !FX_OFF()) { const c = V.me.hd[a.i].c, bc = C[c] && ((CD(c).by || {}).bc || []).length; if (bc) { const pos = a.pos == null ? (V.me.bd || []).length : a.pos; setTimeout(() => { const el = document.querySelectorAll('#bdrow .mn')[pos]; if (!el || el.dataset.c !== c) return; const r = el.getBoundingClientRect(), e = document.createElement('i'); e.className = 'hs-bc'; const s = r.width * 1.9; e.style.cssText = `left:${r.left + r.width / 2 - s / 2}px;top:${r.top + r.height * .46 - s / 2}px;width:${s}px;height:${s}px`; document.body.appendChild(e); setTimeout(() => e.remove(), 750); }, 220); } } } catch (e) {}
    return a0.apply(this, arguments); };
})();

// Camouflage, Insensible, Choix des armes, sorts temporaires (Sorcellerie)
(function () { const st = document.createElement('style'); st.id = 'hs-kw2-css'; st.textContent = `
.mn.kw-c .mn-svg{opacity:.78}
.mn-svg .hs-cam{pointer-events:none;opacity:.9}
.mn-svg .hs-imm{pointer-events:none;filter:drop-shadow(0 0 2.5px #ffe680) drop-shadow(0 0 5px rgba(255,230,120,.8));animation:hsRb 1.8s ease-in-out infinite}
.cho{display:grid;grid-template-columns:1fr 1fr;gap:18px;width:min(720px,90vw);margin:6px auto 0}
.cho-b{min-height:150px;padding:18px 20px;border:0;border-radius:14px;cursor:pointer;font:600 clamp(15px,2.2vh,19px)/1.35 var(--f-body,inherit);color:#3a2206;text-wrap:balance;
  background:linear-gradient(180deg,#f7e6b4,#dcc081 60%,#b7955a);box-shadow:inset 0 0 0 2px #7a5c2c,inset 0 0 0 5px rgba(255,246,210,.5),0 8px 18px rgba(0,0,0,.6);transition:transform .15s,filter .15s}
.cho-b:hover,.cho-b:focus-visible{transform:translateY(-4px);filter:brightness(1.1);box-shadow:inset 0 0 0 2px #7a5c2c,inset 0 0 0 5px rgba(255,246,210,.5),0 0 22px rgba(255,210,90,.8),0 8px 18px rgba(0,0,0,.6)}
@media (max-width:560px){.cho{grid-template-columns:1fr}}
.fan .cd.tmpc::before{content:'Temporaire';position:absolute;left:50%;top:-9%;transform:translateX(-50%);z-index:5;padding:1px 8px;border-radius:9px;font:700 10px/1.5 var(--f-label,inherit);color:#dff6ff;background:#1c4a7a;box-shadow:0 0 0 1.5px #7fd0ff,0 0 10px rgba(110,200,255,.8);white-space:nowrap;pointer-events:none}
.fan .cd.tmpc{filter:drop-shadow(0 0 6px rgba(110,200,255,.9))}
`; document.head.appendChild(st); })();

/* ===== Naruto (refonte) : goutte du jutsu, étoile de transformation, nom de la forme ===== */
(function () { const st = document.createElement('style'); st.id = 'nk-css'; st.textContent = `
.mn .tf-b.nk-tf{right:-17%;top:-13%;width:clamp(30px,43%,58px);aspect-ratio:1;clip-path:none;background:url(assets/hs/n-etoile-chakra.webp) center/contain no-repeat;filter:brightness(.82) saturate(.8);animation:none}
.mn .tf-b.nk-tf b{margin-top:6%;font:800 clamp(13px,2vh,22px) var(--f-num),var(--f-disp),serif;color:#fbefd2;-webkit-text-stroke:.9px #2a1404;paint-order:stroke fill;text-shadow:0 1px 0 #2a1404,0 0 3px #2a1404}
/* assez de chakra : halo bleu qui pulse, sur l'étoile d'évolution comme sur la goutte du jutsu */
.mn .tf-b.nk-tf.lock{filter:grayscale(.9) brightness(.7);cursor:help}.mn .tf-b.nk-tf.lock b{font-size:clamp(10px,1.5vh,16px);-webkit-text-stroke:0}
.mn .tf-b.nk-tf.ok{filter:drop-shadow(0 0 4px #bfeaff) drop-shadow(0 0 9px #2f9bff) drop-shadow(0 0 16px rgba(47,155,255,.85));animation:nkBlue 1.15s ease-in-out infinite alternate}
.mn .jut-b.ok{filter:drop-shadow(0 0 4px #bfeaff) drop-shadow(0 0 9px #2f9bff) drop-shadow(0 0 16px rgba(47,155,255,.85));animation:nkBlueJ 1.15s ease-in-out infinite alternate}
.mn .jut-b:not(.ok):not(.used):not(.prep){filter:brightness(.85) saturate(.8)}
/* jutsu de combat préparé : la goutte reste allumée en doré jusqu'au combat */
.mn .jut-b.prep{opacity:1;filter:hue-rotate(185deg) saturate(1.6) drop-shadow(0 0 6px #ffd84a);cursor:default;animation:none}
@keyframes nkBlue{from{filter:drop-shadow(0 0 2px #bfeaff) drop-shadow(0 0 5px #2f9bff)}to{filter:drop-shadow(0 0 5px #e4f6ff) drop-shadow(0 0 12px #2f9bff) drop-shadow(0 0 22px rgba(47,155,255,.95));transform:scale(1.08)}}
@keyframes nkBlueJ{from{filter:drop-shadow(0 0 2px #bfeaff) drop-shadow(0 0 5px #2f9bff)}to{filter:drop-shadow(0 0 5px #e4f6ff) drop-shadow(0 0 12px #2f9bff) drop-shadow(0 0 22px rgba(47,155,255,.95))}}
html.lite .mn .tf-b.nk-tf.ok,html.lite .mn .jut-b.ok{animation:none}
.mn .jut-b.used{opacity:.35;filter:grayscale(1);cursor:default;animation:none}
body.u-nj .mn .tf-n{top:auto;bottom:-11%;font-size:clamp(8px,1.05vh,11px);padding:1px 7px;z-index:8}
`; document.head.appendChild(st); })();

/* ===== Le Seigneur des Anneaux : route du voyage, porteur de l'Anneau, nom des formes transformées ===== */
function loSync(tb, on) {
  let el = document.getElementById('lo-route'); if (!on) { if (el) el.remove(); return; }
  const me = V.me, pub = V.pub || {}, camp = me.camp === 'O' ? 'O' : 'L', d = me.duo && typeof loDuoId === 'function' ? loDuoId(me.duo) : null, al = me.ally;
  const hold = pub.ringp != null ? (pub.pl || []).find(x => x.pid === pub.ringp) : null, mine = !!me.ring, ours = mine || !!(al && al.ring);
  const ring = !hold ? `<div class="lr-t" data-tip="À la manche 3, l'Anneau arrive dans la main d'un joueur des Peuples libres.">L'Anneau dort encore <small>(manche 3)</small></div>`
    : `<div class="lr-t${ours ? ' me' : ''}" data-tip="${esc('Quand celui qui tient l\'Anneau pose un serviteur, celui-ci réagit à l\'Anneau (texte 💍 de la carte). On le passe à son allié par le portail. Si son duo perd un combat, l\'Anneau passe au duo vainqueur.')}">💍 ${mine ? 'Tu tiens l\'Anneau' : ours ? 'Ton allié tient l\'Anneau' : 'Anneau : <b>' + esc(hold.n) + '</b>'}</div>`;
  const ab = al ? `<div class="lr-al"><span>Allié : ${esc(al.n)}${al.hero && HEROES[al.hero] ? ' · ' + esc(HEROES[al.hero].n) : ''} · taverne ${al.t || 1}</span></div>` : '';   // le plateau de l'allié se voit par le portail
  const nb = LO_BAT.find(b => b.rd >= (pub.rd || 0));
  const bat = nb ? `<div class="lr-b${nb.rd === pub.rd ? ' now' : ''}" data-tip="${esc('Grande bataille · ' + nb.n + ' (manche ' + nb.rd + ') : ' + nb[camp].tx + '. Si ton duo gagne ce combat, chacun choisit un objet légendaire parmi trois.')}">${nb.rd === pub.rd ? 'Bataille ce tour' : 'Bataille manche ' + nb.rd} · <b>${esc(nb.n)}</b></div>` : '';
  const h = `<div class="lr-c">${camp === 'O' ? 'Camp de l\'Ombre' : 'Peuples libres'}${d ? ` · <b data-tip="${esc(d.bn + ' : ' + d.tx)}">${esc(d.n)}</b>` : ''}</div>${ring}${ab}${bat}`;
  if (!el) { el = document.createElement('div'); el.id = 'lo-route'; } if (el.parentNode !== tb) tb.appendChild(el); if (el.innerHTML !== h) el.innerHTML = h;
  tb.querySelectorAll('.mn[data-z="bd"]').forEach(e => { const m = (me.bd || [])[+e.dataset.i]; let t = e.querySelector(':scope > .tf-n');
    if (m && m.tfn) { if (!t) { t = document.createElement('span'); t.className = 'tf-n'; e.appendChild(t); } if (t.textContent !== m.tfn) t.textContent = m.tfn; } else if (t) t.remove(); });
}
(function () { const st = document.createElement('style'); st.textContent = `#lo-route .lr-al{display:flex;flex-direction:column;gap:3px;max-width:clamp(160px,17vw,260px)}#lo-route .lr-al span{font-size:.9em;opacity:.9}
#lo-route .lr-ab{display:flex;flex-wrap:wrap;gap:2px}#lo-route .lr-ab i{position:relative;width:clamp(22px,2.6vh,30px);aspect-ratio:1;border-radius:50%;overflow:hidden;box-shadow:0 0 0 1px #8a6a2c}#lo-route .lr-ab svg{width:100%;height:100%;display:block}
#lo-route .lr-ab u{position:absolute;left:0;right:0;bottom:0;text-decoration:none;text-align:center;font:800 8px/1.2 var(--f-num),sans-serif;background:rgba(0,0,0,.6)}#lo-route .lr-ab small{opacity:.7;font-weight:500}`; document.head.appendChild(st); })();
(function () { const st = document.createElement('style'); st.textContent = `
#lo-route{position:absolute;left:1.1%;top:11.5%;z-index:6;display:flex;flex-direction:column;gap:4px;padding:8px 12px 9px;border-radius:10px;background:linear-gradient(180deg,rgba(58,38,20,.94),rgba(28,18,8,.94));box-shadow:inset 0 0 0 2px #8a6a2c,inset 0 0 0 3px rgba(255,230,160,.18);color:#f3e2bf;font:700 clamp(10px,1.3vh,14px) var(--f-label),serif;filter:drop-shadow(0 3px 5px rgba(0,0,0,.55))}
#lo-route .lr-t b{font-family:var(--f-num);font-size:1.25em;color:#ffe08a}#lo-route .lr-t small{opacity:.8;font-weight:600}
#lo-route .lr-r{display:flex;flex-direction:column;gap:1px}
#lo-route .lr-s{display:flex;align-items:center;gap:6px;opacity:.55;cursor:help;white-space:nowrap}
#lo-route .lr-s i{width:9px;height:9px;border-radius:50%;border:2px solid #cdbfa6;box-sizing:border-box;flex:none}
#lo-route .lr-s.done{opacity:.9}#lo-route .lr-s.done i{background:#ffd24a;border-color:#fff3c0}
#lo-route .lr-s.cur{opacity:1;color:#ffe9a0}#lo-route .lr-s.cur i{box-shadow:0 0 8px #ffd24a}
#lo-route .lr-t{white-space:nowrap}#lo-route .lr-t.me{color:#ffd24a;text-shadow:0 0 6px rgba(255,200,60,.7)}#lo-route .lr-c{font-size:.82em;letter-spacing:.06em;text-transform:uppercase;opacity:.75}#lo-route .lr-s u{text-decoration:none;margin-left:2px}#lo-route .lr-b{margin-top:3px;padding-top:4px;border-top:1px solid rgba(255,230,160,.25);white-space:nowrap;cursor:help}#lo-route .lr-b.now{color:#ffb060}#lo-route .lr-b b{color:#ffe08a}#lo-route .lr-ring{margin-top:2px;white-space:nowrap;color:#ffd24a;text-shadow:0 0 6px rgba(255,200,60,.7);cursor:help}
.table.fighting #lo-route{display:none}
@media (max-width:900px){#lo-route{display:none}}
.mn .lo-ring{position:absolute;left:50%;top:-12%;transform:translateX(-50%);z-index:9;padding:1px 7px;border-radius:99px;background:#1a1206;color:#ffd24a;font:800 clamp(9px,1.2vh,13px) var(--f-num),serif;box-shadow:0 0 0 1.5px #ffd24a,0 0 10px rgba(255,200,60,.8);white-space:nowrap;cursor:help}
body.u-lo .mn .tf-n{top:auto;bottom:-11%;font-size:clamp(8px,1.05vh,11px);padding:1px 7px;z-index:8}
.lo-obj{display:grid;justify-items:center;gap:6px;width:clamp(150px,15vw,230px);padding:14px 12px 16px;border-radius:14px;background:linear-gradient(180deg,#3a2a14,#1c1208);box-shadow:inset 0 0 0 2px #b08a2e,0 6px 14px rgba(0,0,0,.6);color:#f3e2bf;text-align:center}
.lo-obj-a{width:62%;aspect-ratio:1}.lo-obj b{font:700 clamp(14px,1.9vh,20px) var(--f-disp),serif;color:#ffe08a}.lo-obj i{font-style:normal;font-size:clamp(11px,1.45vh,14px);line-height:1.3}.lo-obj em{font-style:normal;font-size:clamp(10px,1.3vh,13px);color:#9fe0a8}
.disc-b:hover .lo-obj{box-shadow:inset 0 0 0 2px #ffe08a,0 0 18px rgba(255,210,90,.6)}
`; document.head.appendChild(st); })();

/* ===== Naruto : bandeau des groupes emblématiques (actifs en doré, incomplets en gris) ===== */
function nkGroupsSync() {
  const tb = document.querySelector('#app .table'); let el = document.getElementById('nk-groups');
  const lo = !!(V.pub && (V.pub.laws || []).some(l => l.k === 'voyage'));
  const on = tb && V.screen === 'game' && V.me && V.pub && (lo || (V.pub.laws || []).some(l => l.k === 'chakra')) && typeof nkLv === 'function';
  try { loSync(tb, lo && on); } catch (e) {}
  if (!on) { if (el) el.remove(); return; }
  const L = nkLv(V.me), rows = NK_GROUPS.filter(g => /^lo_/.test(g.id) === lo && L[g.id] && (L[g.id].l || L[g.id].n >= 1)).sort((a, b) => (L[b.id].l - L[a.id].l) || (L[b.id].n - L[a.id].n));
  const h = rows.slice(0, 9).map(g => { const x = L[g.id], next = g.th[x.l], names = g.m.map(c => CD(c).n.split(' ')[0]).join(', ');
    const tip = g.n + ' (' + names + '). ' + g.th.map((t, i) => (g.th.length > 1 ? t + ' : ' : '') + g.tx[i]).join(' ') + (x.l ? '' : ' Il te manque ' + (g.th[0] - x.n) + ' membre' + (g.th[0] - x.n > 1 ? 's' : '') + '.');
    return `<span class="nkg${x.l ? ' on' : ''}" data-tip="${esc(tip)}"><b>${esc(g.n + (g.el ? ' · ' + CD(g.el).n.split(' ')[0] : ''))}</b><i>${x.n}/${next || g.th[g.th.length - 1]}</i></span>`; }).join('');
  if (!el) { el = document.createElement('div'); el.id = 'nk-groups'; }
  if (el.parentNode !== tb) tb.appendChild(el);
  if (el.innerHTML !== h) el.innerHTML = h;
  // plateau : halo doré sur les membres d'un groupe actif ; taverne et main : étiquette sur les cartes qui font avancer un de mes groupes
  const act = new Set(); NK_GROUPS.forEach(g => { if (L[g.id] && L[g.id].l) g.m.forEach(c => act.add(c)); });
  const have = new Set((V.me.bd || []).map(m => m.c));
  tb.querySelectorAll('.mn[data-z="bd"]').forEach(e => { const m = (V.me.bd || [])[+e.dataset.i]; e.classList.toggle('nk-in', !!(m && act.has(m.c))); });
  const mark = (e, m) => { const gs = m && !m.sp && !have.has(m.c) ? (NK_GOF[m.c] || []).filter(g => g.m.some(c => c !== m.c && have.has(c))) : []; let t = e.querySelector(':scope > .nk-tag');
    if (!gs.length) { if (t) t.remove(); return; }
    const done = gs.some(g => { const n = g.m.filter(c => have.has(c)).length + 1; return g.th.includes(n); }), tx = (done ? '★ ' : '') + gs[0].n + (gs[0].el ? ' · ' + CD(gs[0].el).n.split(' ')[0] : '') + (gs.length > 1 ? ' +' + (gs.length - 1) : '');
    if (!t) { t = document.createElement('span'); t.className = 'nk-tag'; e.appendChild(t); } t.classList.toggle('done', done); if (t.textContent !== tx) t.textContent = tx; };
  tb.querySelectorAll('.mn[data-z="sh"]').forEach(e => mark(e, (V.me.sh || [])[+e.dataset.i]));
  tb.querySelectorAll('.cd[data-z="hd"]').forEach(e => mark(e, (V.me.hd || [])[+e.dataset.i]));
  // objet de la taverne : étiquette des propriétaires, au style des groupes (dorée si tu en as un sur le plateau ou dans la main)
  tb.querySelectorAll('.spt[data-sp^="ni_"]').forEach(e => { const id = e.dataset.sp; if (!SPELLS[id] || !SPELLS[id].ow) return; let t = e.querySelector(':scope > .nk-tag.it-ow'); const tx = itOwners(id).join(' · '), on = itOwnerIn(V.me, id);
    if (!t) { t = document.createElement('span'); t.className = 'nk-tag it-ow'; e.appendChild(t); } t.classList.toggle('done', on); if (t.textContent !== tx) t.textContent = tx; });
}
(function () { const r0 = render; render = function () { const out = r0.apply(this, arguments); try { nkGroupsSync(); } catch (e) {} return out; };
  const st = document.createElement('style'); st.id = 'nk-groups-css'; st.textContent = `
#nk-groups{position:absolute;right:1.2%;top:19%;z-index:6;display:flex;flex-direction:column;align-items:flex-end;gap:5px;pointer-events:auto}
#nk-groups .nkg{display:flex;align-items:center;gap:7px;padding:3px 10px 3px 12px;border-radius:99px;font:700 clamp(10px,1.35vh,14px) var(--f-label),serif;color:#cdbfa6;background:rgba(20,14,10,.72);border:1px solid rgba(160,130,90,.5);cursor:help;white-space:nowrap}
#nk-groups .nkg i{font-style:normal;font-family:var(--f-num);opacity:.85}
#nk-groups .nkg.on{color:#2a1606;background:linear-gradient(180deg,#ffe28a,#d09a2a);border-color:#fff3c0;box-shadow:0 0 10px rgba(255,200,60,.65)}
.table.fighting #nk-groups{display:none}
@media (max-width:900px){#nk-groups{display:none}}
.mn.nk-in > svg{filter:drop-shadow(0 0 5px #ffd65a) drop-shadow(0 0 11px rgba(255,170,40,.75))}
.nk-tag{position:absolute;left:50%;bottom:-13%;transform:translateX(-50%);z-index:8;padding:1px 8px;border-radius:99px;font:700 clamp(8px,1.1vh,12px) var(--f-label),serif;white-space:nowrap;pointer-events:none;color:#fff3c0;background:rgba(40,24,10,.9);border:1px solid #c8a04a}
.nk-tag.done{color:#2a1606;background:linear-gradient(180deg,#ffe28a,#d09a2a);border-color:#fff3c0;box-shadow:0 0 9px rgba(255,200,60,.8)}
.cd > .nk-tag{bottom:auto;top:-4%}
`; document.head.appendChild(st); })();

/* ===== texte des cartes : réduit la police tant que le texte dépasse de son cadre (fiches au survol, main, découvertes) ===== */
function fitCdTx(root) {
  if (!root) return;
  root.querySelectorAll('.cd-tx').forEach(tx => {
    if (!tx.offsetParent) return;
    tx.style.fontSize = ''; let fs = parseFloat(getComputedStyle(tx).fontSize) || 12, n = 0;
    while (tx.scrollHeight > tx.clientHeight + 1 && fs > 6.5 && n++ < 16) { fs *= 0.95; tx.style.fontSize = fs + 'px'; }
  });
}
(function () {
  const r0 = render; render = function () { const out = r0.apply(this, arguments); try { fitCdTx(document.getElementById('app')); } catch (e) {} return out; };
  const arm = () => { try { if (typeof peekEl !== 'undefined' && peekEl && !peekEl._fit) { peekEl._fit = 1; new MutationObserver(() => { try { fitCdTx(peekEl); } catch (e) {} }).observe(peekEl, { childList:true, subtree:true, attributes:true, attributeFilter:['hidden'] }); } } catch (e) {} };
  arm(); document.addEventListener('pointerover', arm, { once:true });
})();

/* ===== interface v2 (éléments fournis le 14/11/2026) : sélection du héros, groupes, chakra ===== */
(function () { const st = document.createElement('style'); st.textContent = `
.hp-head{background:url(assets/hs/v2/sel-bandeau.webp) center/100% 100% no-repeat!important;clip-path:none!important;filter:drop-shadow(0 6px 12px rgba(0,0,0,.65))!important;padding-top:clamp(12px,2.4vh,26px)!important;padding-bottom:clamp(14px,2.8vh,30px)!important}
.hp-card .hp-nm{background:url(assets/hs/v2/sel-nom.webp) center/100% 100% no-repeat!important;clip-path:none!important;height:27%!important;left:-10%!important;right:-10%!important}
.hp-card .hp-nm i{margin-top:-3%!important;padding:0 14%!important}
.hp-card .hp-st{background:url(assets/hs/v2/sel-rang.webp) center/100% 100% no-repeat!important;box-shadow:none!important;border-radius:0!important;padding:5px 20px 6px!important;filter:drop-shadow(0 2px 3px rgba(0,0,0,.6))}
.hp-rr{background:url(assets/hs/v2/sel-relancer.webp) center/100% 100% no-repeat!important;box-shadow:none!important;border-radius:0!important;filter:drop-shadow(0 4px 6px rgba(0,0,0,.6))}
.hp-rr.off{filter:grayscale(.9) brightness(.62)}
.hp-rrn{background:url(assets/hs/v2/sel-jeton.webp) center/100% 100% no-repeat!important;box-shadow:none!important;border-radius:0!important}
.hp-ok{background:url(assets/hs/v2/sel-ok.webp) center/100% 100% no-repeat!important;box-shadow:none!important;border-radius:0!important;animation:none!important;min-width:clamp(130px,13vw,210px)!important}
.hp-ok:not(:disabled){filter:sepia(1) saturate(3.2) hue-rotate(-12deg) brightness(1.12) drop-shadow(0 0 14px rgba(255,210,90,.75));text-shadow:0 0 2px #000,0 3px 0 #5a3a08!important}
.hp-ok:not(:disabled):hover{transform:scale(1.04)}
.hp-ok:disabled{filter:brightness(.92)}
.hp-rb{background:url(assets/hs/v2/sel-aide.webp) center/100% 100% no-repeat!important;border:0!important;box-shadow:none!important;border-radius:0!important;padding:8px 22px!important;color:#fff3d6!important;text-shadow:0 1px 0 #2a1404}
#nk-groups{gap:3px}
#nk-groups .nkg{background:url(assets/hs/v2/rec-synergie.webp) center/100% 100% no-repeat!important;border:0!important;border-radius:0!important;padding:6px 18px 7px 20px!important;color:#f3e2bf!important;text-shadow:0 1px 0 #1c0d04;opacity:.82;filter:saturate(.75) drop-shadow(0 2px 3px rgba(0,0,0,.5))}
#nk-groups .nkg.on{background-image:url(assets/hs/v2/rec-etiquette.webp)!important;color:#2a1606!important;text-shadow:none;opacity:1;box-shadow:none!important;filter:drop-shadow(0 0 7px rgba(255,205,70,.75))}
.ckp .coinrow .ckc{background:url(assets/hs/v2/ic-ck.webp) center/contain no-repeat!important;box-shadow:none!important;border:0!important;border-radius:0!important}
.ckp .coinrow .ckc.off{background-image:url(assets/hs/v2/ic-ck0.webp)!important;filter:none!important;opacity:1!important}
`; document.head.appendChild(st); })();
