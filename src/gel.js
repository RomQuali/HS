
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
  background:url(assets/hs/gel-anneau.webp) center/112% 108% no-repeat,radial-gradient(ellipse at 50% 45%,rgba(190,235,255,.08) 40%,rgba(150,215,255,.38) 72%,rgba(120,200,255,0) 74%);filter:drop-shadow(0 0 6px rgba(150,220,255,.75))}
.mn > .hs-gel::before,.mn > .hs-gel::after{content:'';position:absolute;background:center/contain no-repeat;pointer-events:none}
.mn > .hs-gel::before{left:-12%;bottom:-6%;width:46%;height:40%;background-image:url(assets/hs/gel-eclat.webp);transform:rotate(-18deg)}
.mn > .hs-gel::after{right:-9%;top:2%;width:24%;height:52%;background-image:url(assets/hs/gel-bloc.webp);transform:rotate(14deg);opacity:.9}
.mn > .hs-gel.in{animation:hsGel .5s cubic-bezier(.2,.9,.3,1.2) both}
@keyframes hsGel{0%{opacity:0;transform:scale(1.35);filter:brightness(2.4) drop-shadow(0 0 14px #dff6ff)}60%{opacity:1}100%{opacity:1;transform:scale(1)}}
.counter-line > .hs-gelb{position:absolute;left:1%;right:1%;top:-14%;bottom:-14%;z-index:0;display:block;background:url(assets/hs/gel-bord.webp) center/100% 100% no-repeat;opacity:.3;animation:hsGelB 3.2s ease-in-out infinite}
.counter-line > .hs-gelb.in{animation:hsGelIn .6s ease-out both,hsGelB 3.2s ease-in-out .6s infinite}
@keyframes hsGelB{50%{opacity:.45}}
@keyframes hsGelIn{0%{opacity:0;transform:scale(.9)}100%{opacity:.3;transform:scale(1)}}
html.lite .hs-gelb,html.lite .mn > .hs-gel.in{animation:none}
.keeper-zone .mn.tripok > .ptag::before{content:'';position:absolute;left:50%;bottom:92%;width:2.3em;height:2.3em;margin-left:-1.15em;background:url(assets/hs/fleche-triple.webp) center/contain no-repeat;filter:drop-shadow(0 0 3px #0a2c55) drop-shadow(0 0 5px rgba(120,200,255,.9));animation:hsFl 1s ease-in-out infinite}
@keyframes hsFl{50%{transform:translateY(-18%)}}
html.lite .keeper-zone .mn.tripok > .ptag::before{animation:none}
@media (hover:hover){.table:not([class*="awk-"]) .fan .cd:hover::after{content:'';position:absolute;inset:-76% -104%;z-index:-1;pointer-events:none;background:url(assets/hs/lueur-carte.webp) center/100% 100% no-repeat;animation:hsLu 1.4s ease-in-out infinite}}
@keyframes hsLu{50%{opacity:.65}}
` + rnCss(`
§ .hero-zone .bell:not(:disabled):hover .bell-t::after{content:'';position:absolute;left:-9%;right:-11%;top:-28%;bottom:-27%;background:url(assets/hs/lueur-bouton.webp) center/100% 100% no-repeat;pointer-events:none}
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
  if (FX_OFF()) return; const e = document.createElement('i'); e.className = 'hs-spr ' + (cls || '');
  e.style.cssText = `left:${f1(x - size / 2)}px;top:${f1(y - size / 2)}px;width:${f1(size)}px;height:${f1(size)}px;background-image:url(assets/hs/${img}.webp)`;
  fxLayer.appendChild(e);
  const k = []; for (let i = 0; i < 8; i++) k.push({ backgroundPosition:`${(i % 4) * 100 / 3}% ${i < 4 ? 0 : 100}%`, easing:'steps(1)' }); k.push({ backgroundPosition:'100% 100%' });
  try { e.animate(k, { duration:ms || 380 }).onfinish = () => e.remove(); } catch (er) { setTimeout(() => e.remove(), ms || 380); }
}
function hsDecal(x, y, img, size, cls, ms) { if (FX_OFF()) return; const e = document.createElement('i'); e.className = 'hs-dec ' + cls; e.style.cssText = `left:${f1(x - size / 2)}px;top:${f1(y - size / 2)}px;width:${f1(size)}px;height:${f1(size)}px;background-image:url(assets/hs/${img}.webp)`; fxLayer.appendChild(e); setTimeout(() => e.remove(), ms); }
function hsCombatFrame() {
  const F = V.fight; if (!F || V.fi === 0) return;
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
    const sh = document.getElementById('tk-shield'); if (sh) sh.innerHTML = '<image href="assets/hs/c-bouclier-divin.webp" x="-13" y="-22" width="126" height="152" preserveAspectRatio="none" opacity=".55" style="mix-blend-mode:screen"/>';
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
.fxtxt.intro{display:none!important}
.mn-svg .hs-rb{mix-blend-mode:screen;opacity:.85;animation:hsRb 2.4s ease-in-out infinite;pointer-events:none}
@keyframes hsRb{50%{opacity:.45}}
html.lite .mn-svg .hs-rb{animation:none}
`; document.head.appendChild(st);
})();
