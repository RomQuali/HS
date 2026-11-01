/* mode léger : téléphones et petites machines (forçable avec ?lite ou ?full) */
const LITE = (() => { try { const q = new URLSearchParams(location.search); if (q.has('full')) return false; if (q.has('lite')) return true; } catch (e) {} try { return matchMedia('(pointer:coarse)').matches || (navigator.hardwareConcurrency || 8) <= 4; } catch (e) { return false; } })();
if (LITE) document.documentElement.classList.add('lite');
/* =====================================================================
   INTERFACE
   ===================================================================== */
let savedUniv = []; try { savedUniv = JSON.parse(localStorage.getItem('tav-univ') || '[]'); savedUniv = Array.isArray(savedUniv) ? savedUniv.slice(0, 1).map(n => n === 'Les Cinq Nations' ? 'Ninja' : n) : []; } catch (e) { savedUniv = []; }
let savedName = ''; try { savedName = localStorage.getItem('tav-name') || ''; } catch (e) {}
const V = { screen:'menu', name:savedName || 'Aventurier', nameRaw:savedName, pub:null, pubAt:0, me:null, sel:null, fight:null, fi:0, hostGone:false, univSel:savedUniv };

function onPub(d) {
  if (!d || typeof d !== 'object') return;
  const key = JSON.stringify(Object.assign({}, d, { rem:0 }));
  const screen = d.ph === 'lobby' ? 'lobby' : 'game';
  const same = key === V.pubKey && screen === V.screen;
  const pk = d.ph + ':' + d.rd;
  if (pk !== V.phKey) { V.phKey = pk; V.phTotal = Math.max(1, d.rem || 1); }
  // multijoueur : au lancement, tout le monde franchit la porte (la partie s'affiche derrière l'éblouissement)
  if (V.screen === 'lobby' && screen === 'game' && typeof csEnter === 'function') csEnter(() => render());
  if (V.screen === 'game' && screen === 'lobby') { V.me = null; V.fight = null; V.sel = null; V.aim = null; V.privKey = null; }
  V.pub = d; V.pubAt = Date.now(); V.pubKey = key; V.screen = screen;
  if (d.cv && d.cv !== CAT_REV && Net.role === 'client' && !V.cvWarn) { V.cvWarn = true; toast('Les cartes de l\'hôte diffèrent des tiennes : recharge la page avant la prochaine partie.'); }
  if (d.ph === 'recruit' && V.fight && V.fight.rd !== d.rd) V.fight = null;
  if (!same) render();
}
function onPriv(d) {
  if (!d || typeof d !== 'object') return;
  const key = JSON.stringify(d);
  if (key === V.privKey) return;
  V.privKey = key; V.me = d;
  if (V.chestRev && d.choice) { const R = V.chestRev; V.chestRev = null; V.choiceAt = R.at + 950; setTimeout(render, Math.max(0, V.choiceAt - Date.now()) + 20); }
  else if (V.chestRev && d.loot) { const R = V.chestRev; V.chestRev = null; const got = d.loot.slice(); if (got.length) setTimeout(() => chestReveal(got), Math.max(0, 950 - (Date.now() - R.at))); }
  if (V.sel) { const z = V.sel.z === 'ss' ? [d.sp, d.sp2] : V.sel.z === 'sh' ? d.sh : V.sel.z === 'bd' ? d.bd : d.hd; if (!z || !z[V.sel.i]) V.sel = null; }
  if (V.aim != null && !(d.hd[V.aim] && d.hd[V.aim].sp)) V.aim = null;
  render();
}
function onFight(d) {
  if (!d || typeof d !== 'object' || !Array.isArray(d.a) || !Array.isArray(d.b)) return;
  if (V.fight && V.fight.rd === d.rd) return;
  const r = simulate(d.a, d.b, d.seed, d.ta, d.tb, d.fire, d.mx);
  V.fight = { ...d, r, done:false }; V.fi = 0; V.sel = null;
  clearTimeout(V.fightT); clearTimeout(V.duelT);
  if (d.duel && d.duel.seed != null) { try { V.fight.dr = simulate(d.duel.a, d.duel.b, d.duel.seed, d.ta, d.tb, [0, 0], Object.assign({}, d.mx, { first:1 })); } catch (e) { V.fight.dr = null; } V.di = 0; }
  stepFight();
  if (V.fight.dr) { duelTaunt(V.fight); V.duelT = setTimeout(stepDuel, 2600); }
}
function fq(u) { return document.querySelector(`.arena [data-u="${u}"]:not(.dying)`) || document.querySelector(`.arena [data-u="${u}"]`); }
/* Chaque image du combat montre l'état AVANT l'action qu'elle annonce (at = attaque, fb = boule de feu) :
   on joue l'élan sur l'image courante, puis on passe à l'image suivante qui montre le résultat. */
function stepFight() {
  const F = V.fight; if (!F) return;
  clearTimeout(V.fightT);
  render(); fxFrame();
  const last = F.r.frames.length - 1;
  if (V.fi >= last) { F.done = true; render(); fxEnd(); return; }
  const fr = F.r.frames[V.fi], pa = V.fi > 0 ? F.r.frames[V.fi - 1] : null;
  const hold = V.fi === 0 ? 1050 : pa && pa.at ? 520 : pa && pa.fb ? 650 : 420;
  V.fightT = setTimeout(() => {
    if (!V.fight || V.fight !== F || F.done) return;
    if (fr.at) { const t = fxLunge(fr); V.fightT = setTimeout(() => { V.fi++; stepFight(); }, t); }
    else if (fr.fb) { fxFireball(fr); V.fightT = setTimeout(() => { V.fi++; stepFight(); }, 560); }
    else { V.fi++; stepFight(); }
  }, hold);
}
function fxLunge(fr) {
  const F = V.fight, a = fq(fr.at), t = fq(fr.tg); F.dx = F.dy = 0;
  if (!a || !t || FX_OFF()) return 120;
  const ra = a.getBoundingClientRect(), rt = t.getBoundingClientRect();
  F.dx = ((rt.left + rt.width / 2) - (ra.left + ra.width / 2)) * 0.82; F.dy = ((rt.top + rt.height / 2) - (ra.top + ra.height / 2)) * 0.82;
  a.style.zIndex = 9; t.classList.add('targeted');
F.lunge = a.animate([{ transform:'none' }, { transform:`translate(${f1(-F.dx * .07)}px,${f1(-F.dy * .07)}px) scale(1.12) rotate(${F.dx > 0 ? -4 : 4}deg)`, offset:.42 }, { transform:`translate(${f1(F.dx)}px,${f1(F.dy)}px) scale(1.06)` }], { duration:340, easing:'cubic-bezier(.55,0,.8,.4)', fill:'forwards' });
  return 340;
}
function fxFireball(fr) {
  const t = fq(fr.fb); if (!t) return;
  t.insertAdjacentHTML('beforeend', '<span class="fireball" aria-hidden="true"></span>');
}
// effets de l'action qui a mené à l'image affichée
function fxFrame() {
  const F = V.fight; if (!F) return;
  if (F.lunge) { try { F.lunge.cancel(); } catch (e) {} F.lunge = null; }
  if (FX_OFF()) return;
  if (V.fi === 0) { fxIntro(); return; }
  const pa = F.r.frames[V.fi - 1];
  if (pa.at) {
    const a = fq(pa.at), t = fq(pa.tg);
    if (a && (F.dx || F.dy)) { a.style.zIndex = 9; a.animate([{ transform:`translate(${f1(F.dx * .9)}px,${f1(F.dy * .9)}px) scale(1.06)` }, { transform:'none' }], { duration:420, easing:'cubic-bezier(.2,.9,.3,1)' }); }
    if (t) {
      const r = t.getBoundingClientRect(), x = r.left + r.width / 2 - Math.sign(F.dx) * r.width * .18, y = r.top + r.height / 2 - Math.sign(F.dy) * r.height * .26;
      const big = (+t.dataset.dmg || 0) >= 6 || (a && +a.dataset.dmg >= 6);
      fxRing(x, y, big ? '#ffe39a' : '#fff1c8', big ? 1.6 : 1); fxBurst(x, y, 'hit', big ? 22 : 13, big ? 1.4 : 1);
      if (a && (a.dataset.f || '').includes('v') && t.classList.contains('dying')) fxBurst(x, y, 'psn', 14);
      if (big) fxShake(document.querySelector('.arena'), 9);
    }
    F.dx = F.dy = 0;
  }
  if (pa.fb) { const t = fq(pa.fb); if (t) { const r = t.getBoundingClientRect(); fxRing(r.left + r.width / 2, r.top + r.height * .45, '#ffb04a', 1.8); fxBurst(r.left + r.width / 2, r.top + r.height * .45, 'fire', 22, 1.3); } }
  document.querySelectorAll('.arena .mn.shbreak').forEach(el => { const r = el.getBoundingClientRect(); fxBurst(r.left + r.width / 2, r.top + r.height * .45, 'ice', 16, 1.2); });
  document.querySelectorAll('.arena .mn.zapd').forEach(el => { const r = el.getBoundingClientRect(); fxBurst(r.left + r.width / 2, r.top + r.height * .4, 'zap', 10); });
  document.querySelectorAll('.arena .mn.buffed').forEach(el => { const r = el.getBoundingClientRect(); fxBurst(r.left + r.width / 2, r.top + r.height * .5, 'buff', 8, .8); });
  document.querySelectorAll('.arena .mn.chilled').forEach(el => { const r = el.getBoundingClientRect(); fxBurst(r.left + r.width / 2, r.top + r.height * .45, 'ice', 9, .8); });
  document.querySelectorAll('.arena .mn.born').forEach(el => { const r = el.getBoundingClientRect(); setTimeout(() => fxRing(r.left + r.width / 2, r.top + r.height * .5, '#cfe8ff', 1.1), 280); });
  document.querySelectorAll('.arena .mn.dying').forEach(el => { const r = el.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height * .45; setTimeout(() => { fxBurst(x, y, 'shard', 16, 1.1); if (el.classList.contains('dr')) fxBurst(x, y - 10, 'soul', 10); }, 330); });
}
function toast(msg) { const t = $('#toast'); t.textContent = msg; t.hidden = false; clearTimeout(toast.t); toast.t = setTimeout(() => t.hidden = true, 3400); }
function $(s) { return document.querySelector(s); }

/* ---------- composants ---------- */
const icon = (name, cls = '') => `<svg class="ic ${cls}" viewBox="0 0 24 24" aria-hidden="true"><use href="#ic-${name}" width="24" height="24"/></svg>`;
const faceH = (sym, cls = 'face') => `<span class="${cls}"><svg viewBox="12 8 76 76" aria-hidden="true"><use href="#${sym}" width="100" height="100"/></svg></span>`;
const playerSym = p => p && p.h && HART[p.h] ? heroArt(p.h, p.haw) : avatarSym(p ? p.n : '?');
const tierStars = (t, only) => `<span class="ts" aria-label="Niveau ${t}">${Array.from({ length:only ? t : 6 }, (_, k) => `<i class="${k < t ? 'on' : ''}"></i>`).join('')}</span>`;
const dataAttrs = m => `data-c="${m.c}" data-a="${m.a}" data-h="${m.h}" data-g="${m.g ? 1 : 0}" data-f="${esc(m.f || '')}"${m.u ? ` data-u="${m.u}"` : ''}`;
const ariaM = m => `${CD(m.c).n}${m.g ? ' doré' : ''}, ${m.a} attaque, ${m.h} vie`;
const demo = (id, g) => { const b = CD(id); return { c:id, a:b.a * (g ? 3 : 1), h:b.h * (g ? 3 : 1), g:g ? 1 : 0, f:b.f }; };
const hpGem = hp => `<svg class="hpg" viewBox="0 0 40 40" aria-label="${hp} points de vie"><use href="#gem-h" width="40" height="40"/><text class="gt" x="20" y="25" dy=".36em">${hp}</text></svg>`;
const KWI = { t:['k_taunt', '#d8c8a8', 'Provocation'], s:['k_div', '#ffe58a', 'Bouclier divin'], v:['drop', '#8fe36a', 'Toxique'], r:['k_reborn', '#9fe8ff', 'Renaissance'], w:['wind', '#cdeeff', 'Furie des vents'],
  bc:['k_horn', '#ffcf7a', 'Cri de guerre'], play:['k_spark', '#ffd54a', 'Quand vous jouez'], dr:['skull', '#efe2c2', 'Râle d\'agonie'], soc:['k_cross', '#ffb27a', 'Début du combat'], eot:['k_glass', '#ffe39a', 'Fin de tour'], sot:['k_sun', '#ffe39a', 'Début de tour'],
  atk:['sword', '#ff9a8a', 'Après avoir attaqué'], surv:['k_heart', '#ff7a8a', 'Survit à des dégâts'], sell:['k_coin', '#f2c14e', 'Vente'], die:['k_tomb', '#c8c0d8', 'Quand un allié meurt'], aura:['twin', '#e9d5ff', 'Aura'],
  cast:['star', '#b48cff', 'Quand vous lancez un sort'], shield:['k_div', '#ffe58a', 'Bouclier perdu'], roll:['roll', '#9ad8ff', 'Actualisation'], up:['up', '#a6e07a', 'Amélioration'], pow:['crown', '#ffd86a', 'Pouvoir héroïque'] };
function kwIcons(m) {
  const by = CD(m.c).by || {}, out = [], f = m.f || '';
  for (const k of ['t', 's', 'v', 'r', 'w']) if (f.includes(k)) out.push(KWI[k]);
  for (const tr of Object.keys(KWI)) if (tr.length > 1 && ((by[tr] && by[tr].length) || (m.x || []).some(e => ET[e.k] && ET[e.k].tr === tr))) out.push(KWI[tr]);
  return out.slice(0, 8);
}
const KW_ANG = [62, -62, 92, -92, 34, -34, 120, -120];
const SHIELD_D = 'M50 -4 C 85 -4, 102 28, 102 60 C 102 93, 79 115, 50 115 C 21 115, -2 93, -2 60 C -2 28, 15 -4, 50 -4 Z';
function tokenH(m, z, i, o = {}) {
  const b = CD(m.c), f = (m.f || '') + (m.tmp && m.tmp.f ? m.tmp.f : ''), g = !!m.g;   // mots-clés permanents + ceux du prochain combat
  const sel = V.sel && V.sel.z === z && V.sel.i === i;
  const cls = ['mn', z === 'f' && C[m.c] && (C[m.c].comp || /^nb_/.test(m.c)) && 'cp-join', ...['s', 't', 'r', 'w', 'v'].filter(k => f.includes(k)).map(k => 'kw-' + k), o.trip && 'tripok', o.pair && 'pairok', m.awk && !isComp(m) && 'mn-awk', g && 'g', f.includes('r') && 'rb', sel && 'sel', m.tmp && 'tmp', V.aim != null && z === 'bd' && 'aimable', o.cls].filter(Boolean).join(' ');
  const ics = kwIcons(m);
  const up = (v, base) => v > base * (g ? 3 : 1) ? ' up' : '';
  const svg = `<svg class="mn-svg" viewBox="-4 -6 108 132" aria-hidden="true">`
    + (f.includes('t') ? '<use href="#tk-taunt"/>' : '')
    + `<use href="#tk-frame${g ? '-g' : ''}"/><g clip-path="url(#tk-clip)"><use href="#art-${m.c}" x="12" y="9.5" width="76" height="91.5"/></g><use href="#tk-rim"/>`
    + (f.includes('s') ? `<g class="bubg"><use class="bub" href="#tk-shield"/><path class="bub-run" pathLength="100" d="${SHIELD_D}"/></g>` : '')
    + (b.t && z === 'sh' ? `<g class="tflag"><path d="M37 -6 H63 V17 L50 12 L37 17 Z" fill="#4a4044" stroke="#0c0808" stroke-width="2"/><path d="M39.5 -4 H60.5 V14 L50 10 L39.5 14 Z" fill="none" stroke="#ffb050" stroke-width="1.2"/>${Array.from({ length:b.t }, (_, k) => { const row = k < 3 ? 0 : 1, n = row ? b.t - 3 : Math.min(3, b.t), j = row ? k - 3 : k; return `<text x="${f1(50 + (j - (n - 1) / 2) * 6.4)}" y="${row ? 9 : 2.6}" font-size="7" text-anchor="middle" fill="#ffd27a">★</text>`; }).join('')}</g>` : '')
    + ics.map(([ic, col, nm], k) => { const a = KW_ANG[k] * Math.PI / 180; return `<g class="kwi" transform="translate(${f1(50 + 51 * Math.sin(a))} ${f1(55 - 58 * Math.cos(a))})"><title>${nm}</title><circle r="8.4" fill="#1b120b" stroke="${col}" stroke-width="1.8"/><use href="#ic-${ic}" x="-5.6" y="-5.6" width="11.2" height="11.2" style="color:${col}"/></g>`; }).join('')
    + (isComp(m) && compEl(m) ? `<g class="elb"><title>Élément : ${ELS[compEl(m)].n}${m.fu ? ' · combo : ' + m.fu : ''}</title><circle cx="14" cy="12" r="10" fill="${ELS[compEl(m)].col}" stroke="#120a06" stroke-width="2.2"/><text x="14" y="12" dy=".36em" text-anchor="middle" font-size="10" font-weight="700" fill="#120a06">${ELS[compEl(m)].n[0]}</text></g>` : '')
    + (isComp(m) ? `<g><title>Niveau d'entraînement ${compLv(m)} · ${m.xp || 0} expérience${compLv(m) < 5 ? ' (prochain niveau à ' + XP_LV[compLv(m)] + ')' : ''}</title><rect x="38" y="113" width="24" height="12" rx="6" fill="#2a6ad8" stroke="#120a06" stroke-width="1.8"/><text x="50" y="119" dy=".36em" text-anchor="middle" font-size="8.5" font-weight="700" fill="#fff">Nv ${compLv(m)}</text></g>` : '')
    + (m.sl ? `<g class="slb"><title>${m.sl} sceau${m.sl > 1 ? 'x' : ''}${m.sl >= 5 ? ' : Bouclier divin obtenu' : ' (5 : Bouclier divin)'}</title><path d="M4 4 h20 v14 l-10 7 l-10 -7 Z" fill="${m.sl >= 5 ? '#ffd86a' : '#c8304a'}" stroke="#120a06" stroke-width="2"/><text x="14" y="13" dy=".36em" text-anchor="middle" font-size="10" font-weight="700" fill="${m.sl >= 5 ? '#120a06' : '#fff3c0'}">${m.sl}</text></g>` : '')
    + (m.eq && m.eq.length ? `<g><title>Équipements : ${m.eq.map(e => SPELLS[e] ? SPELLS[e].n : e).join(', ')}</title><rect x="72" y="4" width="22" height="14" rx="7" fill="#8a6a3a" stroke="#120a06" stroke-width="2"/><text x="83" y="11" dy=".36em" text-anchor="middle" font-size="9" font-weight="700" fill="#fff3c0">⚒${m.eq.length}</text></g>` : '')
    + `<use href="#gem-a" x="-1" y="90" width="34" height="34"/><text class="gt${up(m.a, b.a)}" x="16" y="107" dy=".36em">${m.a}</text>`
    + `<use href="#gem-h" x="67" y="88" width="34" height="34"/><text class="gt${up(m.h, b.h)}" x="84" y="108.6" dy=".36em">${m.h}</text></svg>`;
  const md = z === 'bd' && !m.awk && (b.fxAll || []).find(e => e.k === 'ckm'), mdC = md ? (V.me ? Math.max(0, md.c - ((htr(V.me, 'pawk') || {}).n || 0)) : md.c) : 0, mdOk = md && V.me && (V.me.ck || 0) >= mdC && V.pub && V.pub.ph === 'recruit';
  const mdH = md ? `<span class="ckm-b${mdOk ? ' ok' : ''}" role="button" tabindex="0" data-act="ckm" data-i="${i}" data-tip="${esc('Éveil (' + mdC + ' chakra, une seule fois) : +' + md.c * mult(m) + '/+' + md.c * mult(m) + ', puis chaque tour : ' + mTx(md.m, mult(m)))}" aria-label="Éveiller ce serviteur">${ckMarkH(mdC)}</span>` : '';
  return `<div class="${cls}" data-z="${z}" data-i="${i}" ${dataAttrs(m)}${o.dmg ? ` data-dmg="${o.dmg}"` : ''}${o.drag ? ' data-drag="1"' : ''} tabindex="0" role="button" aria-label="${esc(ariaM(m))}">${svg}${mdH}${o.name === false ? '' : `<span class="mn-nm">${esc(b.n)}</span>`}${m.tr ? '<span class="tri">Triple !</span>' : o.trip ? '<span class="tri pulse">Triple !</span>' : ''}${o.extra || ''}</div>`;
}
// pièce de coût en haut à gauche ; en vert avec l'ancien prix barré quand une réduction est active
function costGemH(c, base) {
  const d = c < base;
  return `<svg class="cd-gem cost${d ? ' disc' : ''}" viewBox="0 0 40 40" aria-label="Coût ${c} or"><circle cx="20" cy="20" r="16" fill="url(#gr-atk)" ${so(2.4)}/><circle cx="20" cy="20" r="11.6" fill="none" stroke="#8a5a12" stroke-width="1.3" opacity=".75"/><text class="gt" x="20" y="20" dy=".36em">${c}</text></svg>${d ? `<span class="cost-was" aria-hidden="true">${base}</span>` : ''}`;
}
const MINION_COST = 3;
function cardH(m, z, i, o = {}) {
  const b = CD(m.c), g = !!m.g;
  const sel = V.sel && V.sel.z === z && V.sel.i === i;
  const up = (v, base) => v > base * (g ? 3 : 1) ? ' up' : '';
  return `<div class="cd${g ? ' g' : ''}${sel ? ' sel' : ''}${m.tr ? ' newgold' : ''}" data-z="${z}" data-i="${i}" ${dataAttrs(m)}${o.drag ? ' data-drag="1"' : ''}${o.style ? ` style="${o.style}"` : ''} tabindex="0" role="button" aria-label="${esc(ariaM(m))}">`
    + `<div class="cd-art"><svg viewBox="0 0 100 92" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><use href="#art-${m.c}" y="-4" width="100" height="100"/></svg></div>`
    + (b.t ? `<div class="cd-tier" aria-label="Niveau ${b.t}">${'<i></i>'.repeat(b.t)}</div>` : '')
    + `<div class="cd-nm"><span>${esc(b.n)}</span></div>${(() => { const t = cardTextH(m.c, g), n = t.replace(/<[^>]+>/g, '').length; return `<div class="cd-tx${n > 95 ? ' xlong' : n > 62 ? ' long' : ''}">${t}</div>`; })()}`
    + (b.tr !== 'neu' && trName(b.tr) ? `<div class="cd-tb">${esc(b.tr2 && trName(b.tr2) ? trName(b.tr).replace(/^Clan /, '') + ' + ' + trName(b.tr2).replace(/^Clan /, '') : trName(b.tr))}</div>` : b.tok ? '<div class="cd-tb">Jeton</div>' : '')
    + `<svg class="cd-gem a" viewBox="0 0 40 40" aria-hidden="true"><use href="#gem-a" width="40" height="40"/><text class="gt${up(m.a, b.a)}" x="20" y="20" dy=".36em">${m.a}</text></svg>`
    + `<svg class="cd-gem h" viewBox="0 0 40 40" aria-hidden="true"><use href="#gem-h" width="40" height="40"/><text class="gt${up(m.h, b.h)}" x="20" y="25" dy=".36em">${m.h}</text></svg>`
    + (m.tr ? '<span class="tri">Triple !</span>' : '') + (z === 'hd' ? '<i class="hx" aria-hidden="true"></i>' : '') + '</div>';
}
const med = (act, ic, label, cost, dis, on) => `<button class="med${on ? ' on' : ''}" data-act="${act}" ${dis ? 'disabled' : ''}><span class="disc">${icon(ic)}</span>${cost != null ? `<span class="cost">${cost}</span>` : ''}<span class="ml">${label}</span></button>`;

/* ---------- rendu ---------- */
/* mise à jour ciblée : on ne touche que ce qui a changé (pas de clignotement, les animations continuent) */
const keyOf = n => n.nodeType === 1 && n.hasAttribute('data-u') ? n.nodeName + ':' + n.getAttribute('data-u') + (n.classList.contains('dying') ? ':d' : '') : null;
function morph(o, n) {
  if (o.nodeType !== n.nodeType || o.nodeName !== n.nodeName) { o.replaceWith(n); return n; }
  if (o.nodeType !== 1) { if (o.nodeValue !== n.nodeValue) o.nodeValue = n.nodeValue; return o; }
  if (o.isEqualNode(n)) return o;
  for (const a of [...o.attributes]) if (!n.hasAttribute(a.name)) o.removeAttribute(a.name);
  for (const a of [...n.attributes]) if (o.getAttribute(a.name) !== a.value) o.setAttribute(a.name, a.value);
  if ((o.tagName === 'INPUT' || o.tagName === 'TEXTAREA') && o !== document.activeElement && o.value !== n.value) o.value = n.value;
  if (o.tagName === 'SELECT' && o !== document.activeElement) { morphChildren(o, n); if (o.value !== n.value) o.value = n.value; return o; }
  morphChildren(o, n); return o;
}
function morphChildren(oldP, newP) {
  const old = new Map(); for (const c of oldP.childNodes) { const k = keyOf(c); if (k && !old.has(k)) old.set(k, c); }
  const kids = [...newP.childNodes]; let i = 0;
  for (const nn of kids) {
    const ref = oldP.childNodes[i] || null, k = keyOf(nn);
    let m = null;
    if (k) { m = old.get(k) || null; if (m) old.delete(k); }
    else if (ref && !keyOf(ref) && ref.nodeName === nn.nodeName) m = ref;
    if (m) { if (m !== ref) oldP.insertBefore(m, ref); morph(m, nn); }
    else oldP.insertBefore(nn, ref);
    i++;
  }
  while (oldP.childNodes.length > i) oldP.removeChild(oldP.lastChild);
}
function render() {
  if (DRAG) { V.pendingRender = true; return; }
  V.pendingRender = false; hidePeek();
  const act = document.activeElement, fid = act && act !== document.body ? act.id : '';
  let keep = null; try { if (fid && typeof act.selectionStart === 'number') keep = [act.selectionStart, act.selectionEnd]; } catch (e) {}
  const ks = {}; document.querySelectorAll('[data-ks]').forEach(el => { if (el.id) ks[el.id] = el.scrollTop; });
  const flip = fxBefore();
  comboWatch();
  V.waitTable = V.screen === 'game' && waitingAtTable();
  const html = V.screen === 'menu' ? menuH() : V.screen === 'lobby' ? lobbyH() : V.screen === 'atelier' ? atelierH() : V.waitTable ? menuH(waitTableH()) : gameH();
  const app = $('#app');
  if (html !== V.lastHtml || !app.firstChild) {
    V.lastHtml = html;
    if (V.screen !== V.lastScreen || !app.firstChild) { app.innerHTML = html; V.lastScreen = V.screen; }
    else { const t = document.createElement('template'); t.innerHTML = html; morphChildren(app, t.content); }
  }
  if (V.screen === 'atelier' && typeof atlAfterRender === 'function') atlAfterRender();
  fxAfter(flip);
  if (typeof sceneMode === 'function') sceneMode();
  if (V.aim == null && !DRAG && typeof aimHide === 'function') aimHide();
  const inArena = !!document.querySelector('.arena');
  if (V.hadArena && !inArena) arenaCleanup();
  V.hadArena = inArena;
  placeDuelCol(); awkWatch();
  for (const id in ks) { const el = document.getElementById(id); if (el) el.scrollTop = ks[id]; }
  if (fid) { const n = document.getElementById(fid); if (n) { try { n.focus({ preventScroll:true }); if (keep) n.setSelectionRange(keep[0], keep[1]); } catch (e) {} } }
}

const STEPS = [
  ['Recrute', 'Achète des serviteurs 3 or, revends-les 1 or. Améliore la taverne pour croiser des serviteurs plus forts.'],
  ['Fusionne', 'Trois copies du même serviteur deviennent une version dorée qui additionne les stats des trois (bonus compris), avec des effets doublés et un cadeau de niveau supérieur.'],
  ['Combats', 'Les combats sont automatiques. Le perdant subit le niveau de taverne du gagnant plus le niveau de ses survivants.'],
];
function menuH(side) {
  const online = !!Net.room, games = Net.games.filter(g => g.code);
  const pref = ['b_roi', 'r_colosse', 's_liche', 'n_taver', 'p_kraken', 'b_cerf', 's_lueur', 'r_bombe', 'sz_tonnerre', 'sg_yeti'].filter(id => C[id]);
  const extra = POOL_IDS.filter(id => !pref.includes(id)).sort((a, b) => C[b].t - C[a].t);
  const crew = pref.concat(extra).slice(0, 8);
  const tok = (id, k) => `<div class="t-mate" style="--k:${k}">${tokenH(demo(id, k === 1 || k === 6 ? 1 : 0), 'x', k, { name:false })}</div>`;
  const embers = Array.from({ length:26 }, (_, k) => `<i style="--x:${(k * 37) % 100}%;--d:${(5 + (k * 7) % 6).toFixed(1)}s;--dl:${(-(k * 1.3) % 9).toFixed(1)}s;--s:${2 + (k % 3)}px;--w:${(k % 5) * 6 - 12}px"></i>`).join('');
  const btn = (act, ic, t, sub, cls = '') => `<button class="t-btn ${cls}" data-act="${act}"><span class="t-ic">${icon(ic)}</span><span class="t-lb"><b>${t}</b><small>${sub}</small></span></button>`;
  return `<div class="title${side ? ' with-side' : ''}">
    <div class="t-scene" aria-hidden="true"><div class="t-hearth"></div><div class="t-beams"></div><div class="embers">${embers}</div></div>
    <header class="t-bar">
      <label class="t-name" for="nm">${faceH(avatarSym(V.name))}<span class="t-nmw"><small>Ton nom</small><input id="nm" maxlength="20" value="${esc(V.nameRaw != null ? V.nameRaw : V.name)}" placeholder="Aventurier" autocomplete="nickname" spellcheck="false"></span>${icon('pen', 'pen')}</label>
    </header>
    <main class="t-main">
      <div class="t-logo">
        <p class="t-kick"><span>Auto-combat de taverne</span></p>
        <h1><span class="l1">Mêlée</span><span class="l2">de Taverne</span></h1>
        <p class="t-tag">Recrute, fusionne, survis. Huit à table, un seul debout.</p>
      </div>
      <div class="t-stage">
        <div class="t-crew l">${crew.slice(0, 4).map((id, k) => tok(id, k)).join('')}</div>
        <nav class="t-menu" aria-label="Menu principal">
          ${btn('m-solo', 'sword', 'Jouer', 'Seul contre 7 IA', 'pri')}
          ${btn('m-online', 'users', 'Créer une partie', online ? 'Invite tes amis, les IA complètent' : 'À plusieurs, en ligne', side ? 'on' : '')}
          ${btn('m-join', 'key', 'Rejoindre', 'Avec le code d\'un ami')}
          <button class="t-link" data-act="atl-open">${icon(DATA.admin ? 'gear' : 'book')}${DATA.admin ? 'Atelier des cartes' : 'Toutes les cartes'}${DATA.admin ? '<span class="badge-admin">Admin</span>' : ''}</button>
        </nav>
        <div class="t-crew r">${crew.slice(4, 8).map((id, k) => tok(id, k + 4)).join('')}</div>
      </div>
      ${side || ''}
    </main>
    ${side ? '' : `<footer class="t-how">${STEPS.map(([t, d], k) => `<div class="t-step"><span>${k + 1}</span><b>${t}</b><p>${d}</p></div>`).join('')}</footer>`}
    ${side ? '' : menuPanelH(online, games)}
  </div>`;
}
function menuPanelH(online, games) {
  const m = V.mp; if (!m) return '';
  const head = (t, s) => `<div class="mp-h"><h2>${t}</h2>${s ? `<p>${s}</p>` : ''}<button class="mp-x" data-act="m-close" aria-label="Fermer">×</button></div>`;
  let body = '';
  if (m === 'solo' || m === 'online') {
    const go = m === 'solo' ? '<button class="t-go" data-act="solo">Lancer la partie</button>'
      : online ? '<button class="t-go" data-act="create">Ouvrir la table</button>' : `<p class="mp-warn">${offlineWhy()}</p>`;
    body = head(m === 'solo' ? 'Partie solo' : 'Nouvelle table', m === 'solo' ? 'Toi contre sept IA.' : 'Tu reçois un code à partager. Les places libres sont prises par des IA au lancement.')
      + univPickH(V.univSel, true, go);
  } else {
    const list = window.STANDALONE || !online ? '' : games.length
      ? `<h3 class="mp-sub">Tables ouvertes</h3><ul class="games-l">${games.map(g => `<li class="gi">${faceH(avatarSym(g.nm || 'Partie'))}<div><b>${esc(g.nm || 'Partie')}</b><small>${Number(g.n) || 1}/8 joueurs${g.st ? (g.end ? ' · terminée' : ' · en cours') : ' · en attente'}</small></div><button class="btn sm ${g.st ? '' : 'pri'}" data-act="join" data-code="${esc(g.code)}" ${g.st ? 'disabled' : ''}>${g.st ? 'En cours' : 'Rejoindre'}</button></li>`).join('')}</ul>`
      : '<p class="mp-note">Aucune table ouverte pour l\'instant.</p>';
    body = head('Rejoindre une table', 'Demande le code à l\'hôte : il s\'affiche en grand dans son salon.')
      + `<div class="mp-code"><input id="jcode" class="code" maxlength="20" placeholder="tav-xxxxx" autocomplete="off" autocapitalize="off" spellcheck="false" value="${esc(V.jcode || '')}" ${online ? '' : 'disabled'}><button class="t-go" data-act="joincode" ${online ? '' : 'disabled'}>Rejoindre</button></div>`
      + (online ? '' : `<p class="mp-warn">${offlineWhy()}</p>`) + list;
  }
  return `<div class="mp-back" data-act="m-close"></div><section class="mp${m === 'join' ? '' : ' wide'}" role="dialog" aria-modal="true">${body}</section>`;
}

// identité d'un univers (valeurs d'origine si l'univers enregistré ne les a pas)
function univLook(u) { const d = (DEFAULT_SETTINGS.univ || []).find(x => x.n === u.n) || {}; return { col:u.col || d.col || '#5a3a1e', ic:u.ic || d.ic || 'dice', lore:u.lore != null ? u.lore : (d.lore || '') }; }
/* le choix des univers : des étendards à lever */
// schéma d'un cycle d'éléments : 5 pastilles en cercle, une flèche de chacune vers la suivante
function elCycleSvg(order, col, title) {
  const P = order.map((e, k) => { const a = (-90 + k * 72) * Math.PI / 180; return [50 + Math.cos(a) * 34, 52 + Math.sin(a) * 34]; });
  const arrows = P.map((a, k) => { const b = P[(k + 1) % 5], dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L;
    const x1 = a[0] + ux * 12, y1 = a[1] + uy * 12, x2 = b[0] - ux * 13, y2 = b[1] - uy * 13;
    return `<path d="M${x1.toFixed(1)} ${y1.toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)}" stroke="${col}" stroke-width="2.6" marker-end="url(#ar-${col.slice(1)})"/>`; }).join('');
  const dots = order.map((e, k) => `<g><circle cx="${P[k][0].toFixed(1)}" cy="${P[k][1].toFixed(1)}" r="10.5" fill="${ELS[e].col}" stroke="#120a06" stroke-width="2"/><text x="${P[k][0].toFixed(1)}" y="${P[k][1].toFixed(1)}" dy=".36em" text-anchor="middle" font-size="7.4" font-weight="700" fill="#120a06">${ELS[e].n}</text></g>`).join('');
  return `<svg class="elc" viewBox="0 0 100 100" role="img" aria-label="${esc(title)} : ${order.map(e => ELS[e].n).join(' → ')} → ${ELS[order[0]].n}"><defs><marker id="ar-${col.slice(1)}" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="${col}"/></marker></defs>${arrows}${dots}</svg>`;
}
// explication de la loi du chakra (étendard de l'univers, choix du héros)
function chakraLawH(big) {
  const combo = (a, b, F) => `<i style="--c:${F.col}"><em style="background:${ELS[a].col}"></em><em style="background:${ELS[b].col}"></em><b>${esc(F.n)}</b></i>`;
  const pairs = Object.entries(FUSIONS).map(([k, F]) => { const [a, b] = k.split('+'); return combo(a, b, F); }).join('') + Object.entries(PURES).map(([e, F]) => combo(e, e, F)).join('');
  const sec = (ic, t, body) => `<div class="njl-s"><b class="njl-h"><span>${ic}</span>${t}</b>${body}</div>`;
  const ctr = (n, col, tx) => `<span class="njl-ctr" style="--c:${col}"><b>${n}</b> ${tx}</span>`;
  const vil = (tb, ic, t, d, m, f) => sec(ic, esc((TRIBES[tb] || {}).n || t), `<small><b>Début</b> : ${d}</small><small><b>Milieu</b> : ${m}</small><small><b>Fin</b> : ${f}</small>`);
  return `<span class="ban-law ck-law njl${big ? ' big' : ''}">
    ${sec('🪙', 'Ressources', `<small><b>Or</b> : acheter les serviteurs, monter la taverne et certains pouvoirs de héros.</small><small><b>Chakra</b> : chaque ninja en jeu en donne 1 par tour (10 au plus). Il lance les <b>sorts</b>, <b>éveille</b> les serviteurs (une seule fois : la goutte bleue au-dessus d'eux) et paie certains pouvoirs de héros.</small>`)}
    ${vil('n_feu', '🔥', 'Konoha', 'petits dégâts au début du combat.', 'ils s\'additionnent : 1 dégât par allié de Konoha.', 'grandes explosions qui touchent tous les ennemis.')}
    ${vil('n_vent', '🏜️', 'Suna', 'invoque des marionnettes 1/1.', 'les marionnettes se renforcent chaque tour.', 'bouclier de sable sur tout le plateau.')}
    ${vil('n_eau', '🌫️', 'Kiri', 'beaucoup de PV, ils grandissent en survivant.', 'Bouclier divin et soins de fin de tour.', 'Renaissance pour toute Kiri.')}
    ${vil('n_foudre', '⚡', 'Kumo', 'des jinchūriki faibles.', 'ils grandissent à chaque combat gagné.', 'en mourant, ils libèrent une Bijū 8/8.')}
    ${vil('n_terre', '⛰️', 'Iwa', 'Provocation et gros PV.', 'ils invoquent des Doryūheki.', 'Avalanche : un quart de leur vie en dégâts au début du combat.')}
    ${sec('🧬', 'Kekkei genkai', `<small>Quelques serviteurs appartiennent à <b>deux villages</b> : ils profitent des bonus des deux et grandissent quand un combo du réservoir contient une de leurs natures.</small>`)}
  </span>`;
}
// style de jeu de chaque village (étendard, cartes de héros)
const NJ_STYLE = { n_feu:'Explosions', n_vent:'Kugutsu et sable', n_eau:'Survie et soins', n_foudre:'Jinchūriki', n_terre:'Forteresse' };
const NJ_VIC = { n_feu:'🔥', n_vent:'🏜️', n_eau:'🌫️', n_foudre:'⚡', n_terre:'⛰️' };
// fiche de l'univers Ninja : cinq règles courtes (le détail est sur l'écran du héros)
function ninjaCardH() {
  const row = (ic, col, t, x) => `<span class="nj-r"><i class="nj-i" style="--c:${col}">${ic}</i><span><b>${t}</b><small>${x}</small></span></span>`;
  return `<span class="ban-law nj-law"><b>Les nouvelles mécaniques</b>
    ${row(ckMarkH('', 'nj-ck'), '#1e3a5a', 'Le chakra', 'Une 2e ressource à côté de l\'or. Chaque ninja de ton plateau te donne 1 chakra au début du tour (10 au plus) ; il se garde d\'un tour à l\'autre. Il sert à lancer les sorts et à éveiller.')}
    ${row('<span class="rl-scroll"><i style="background:#ff7a2a"></i><i style="background:#4ab0e8"></i></span>', '#2a3a5a', 'Le combo de sorts', 'Les sorts s\'achètent 1 or et se lancent au chakra. Chaque sort de village remplit une moitié du réservoir ; le 2e déclenche un combo des deux villages, ou leur ultime si c\'est le même village. Plus ta taverne est haute, plus le combo est fort.')}
    ${row('<span class="nj-tx">💧</span>', '#1e4a5a', 'L\'éveil', 'Serviteurs : paie une fois leur goutte bleue, ils gagnent des stats et leur effet revient gratuitement à chaque tour. Héros : accomplis leur quête, ils s\'éveillent avec un nouveau pouvoir.')}
  </span>`;
}
function univPickH(sel, edit, actions) {
  const on = SET.tribes.filter(t => t.on !== false).map(t => t.id);
  const us = (SET.univ || []).filter(u => u.tribes.some(t => on.includes(t)));
  const ch = univChosen(sel);
  const banner = u => {
    const k = (SET.univ || []).indexOf(u), a = ch.us.includes(u.n), L = univLook(u), M = u.mech && u.mech !== 'none' ? MECHS[u.mech] : null;
    const heroes = Object.keys(HEROES).filter(h => heroFam(h).some(t => u.tribes.includes(t)));
    const fams = u.tribes.filter(t => on.includes(t));
    return `<button type="button" class="ban${a ? ' on' : ''}${u.mech === 'chakra' ? ' ban-nj' : ''}" style="--uc:${esc(L.col)}" ${edit ? `data-act="univ" data-u="${k}"` : 'disabled'} aria-pressed="${a}">
      ${a ? '<span class="ban-rib">Levé</span>' : ''}
      <span class="ban-hd"><span class="ban-em">${icon(L.ic)}</span><span class="ban-t"><b>${esc(u.n)}</b>${L.lore ? `<i>${esc(L.lore)}</i>` : ''}</span></span>
      ${u.mech === 'chakra' ? `<span class="lawdr${(V.lawOpen || {})[u.n] ? ' open' : ''}"><span class="lawdr-b" role="button" tabindex="0" data-act="lawtog" data-u="${esc(u.n)}" aria-expanded="${!!(V.lawOpen || {})[u.n]}">${(V.lawOpen || {})[u.n] ? 'Masquer les règles ▴' : 'Voir les règles ▾'}</span><span class="lawdr-c">${ninjaCardH()}</span></span>` : M ? `<span class="ban-law"><b>Loi · ${esc(M.n)}</b><small>${esc(M.d)}</small></span>` : ''}
      <span class="ban-fam">${fams.map(t => `<i style="--c:${esc((TRIBES[t] || {}).col || '#888')}">${esc(trName(t) || t)}</i>`).join('')}</span>
      <span class="ban-her">${heroes.slice(0, 6).map(h => `<span class="ban-h" title="${esc(HEROES[h].n)}">${faceH('art-h-' + h)}</span>`).join('')}<small>${heroes.length} héros</small></span>
    </button>`;
  };
  const rnd = !ch.us.length, n = +RU().tribesPerGame || 0;
  const sum = rnd ? 'Au hasard · un univers tiré au sort' : `${ch.us[0]} · ${ch.trs.length} familles en jeu`;
  const laws = rnd ? 'Sa loi s\'appliquera à la partie.' : 'Loi active : ' + ch.us.map(nm => { const u = SET.univ.find(x => x.n === nm); return u && MECHS[u.mech] && u.mech !== 'none' ? MECHS[u.mech].n : null; }).filter(Boolean).join(' · ');
  return `<div class="upick">
    <div class="bans">${us.map(banner).join('')}</div>
    <div class="ubar"><div class="ubar-t"><b>${sum}</b><span>${esc(laws)}</span></div>${edit ? `<button type="button" class="btn ubar-r${rnd ? ' on' : ''}" data-act="univ" data-u="-1" aria-pressed="${rnd}">${icon('dice')}Au hasard</button>` : ''}${actions || ''}</div>
  </div>`;
}

function offlineWhy() {
  if (!DATA.ready && !DATA.user) return 'Connexion en cours…';
  if (!DATA.user) return 'Cet appareil n\'est pas reconnu comme connecté à claude.ai : la page a été ouverte sans compte, ou par un lien public. Connecte-toi à claude.ai sur cet appareil, puis rouvre le lien.';
  return 'Ton compte est reconnu, mais le jeu en ligne n\'est pas proposé dans cette vue. Ouvre le lien dans un navigateur (Chrome, Safari…) connecté à claude.ai plutôt que dans une autre app.';
}
function lobbyH() {
  if (V.hostGone) return `<div class="menu"><section class="plaque solo-msg"><h2>L'hôte a quitté la table</h2><p class="note">La partie s'est arrêtée avec lui.</p><div class="btns"><button class="btn pri" data-act="leave">Retour au menu</button></div></section></div>`;
  return menuH(roundTableH());
}
// en ligne, un joueur éliminé attend à la table la fin de la partie
function waitingAtTable() {
  const d = V.pub; if (!d || !d.pl || (Net.role !== 'host' && Net.role !== 'client') || d.ph === 'lobby' || d.ph === 'end') return false;
  const me = V.me, mine = me ? d.pl.find(p => p.pid === me.pid) : null;
  if (!mine || mine.al) return false;
  return !(V.fight && !V.fight.done);   // on finit de regarder son dernier combat
}
function waitTableH() {
  const d = V.pub, pos = (deg, r) => { const a = deg * Math.PI / 180; return `left:${(50 + r * Math.cos(a)).toFixed(2)}%;top:${(50 + r * Math.sin(a)).toFixed(2)}%`; };
  const hum = d.pl.filter(p => !p.ai), live = d.pl.filter(p => p.al).length, out = d.pl.filter(p => !p.al).sort((a, b) => a.pl - b.pl);
  const seats = Array.from({ length:8 }, (_, i) => { const p = hum[i];
    return `<div class="rt-seat${p ? (p.al ? ' in playing' : ' in') : ''}" style="${pos(90 + i * 45, 44)}">${p ? faceH(playerSym(p)) : '<span class="rt-free">·</span>'}<small>${p ? esc(p.n) + ' · ' + (p.al ? 'en jeu' : p.pl + 'e') : ''}</small></div>`; }).join('');
  return `<aside class="rt" aria-label="La table">
    <div class="rt-hd"><div><h2>À table</h2><p>Tu es éliminé. Attends ici la fin de la partie : la table se reformera pour la suivante.</p></div></div>
    <div class="rt-body">
      <div class="rt-tw"><div class="rt-top"></div><div class="rt-code" aria-live="polite"><small>Manche ${d.rd || 0}</small><b>${live} en lice</b></div>${seats}</div>
      <div class="rt-side"><b class="rt-st">Classement</b>${out.map(p => `<div class="rt-ch"><b>${p.pl}e · ${esc(p.n)}</b><small>${p.ai ? 'IA' : 'Joueur'}</small></div>`).join('')}</div>
    </div>
    <div class="rt-ft"><span class="rt-sum">La partie continue sans toi…</span><button class="btn" data-act="leave">Quitter la table</button></div>
  </aside>`;
}
const lastGameH = last => last && last.length ? `<div class="rt-last"><b class="rt-st">Dernière partie</b>${last.slice(0, 3).map(p => `<div class="rt-ch"><b>${p.pl === 1 ? '♛ ' : ''}${p.pl}e · ${esc(p.n)}</b><small>${p.ai ? 'IA' : 'Joueur'}</small></div>`).join('')}</div>` : '';
// la table ronde : 8 places autour, les jetons des univers posés dessus
function roundTableH() {
  const isHost = Net.role === 'host', d = V.pub, pl = d && d.pl ? d.pl : [];
  const univ = SET.univ || [], sel = isHost ? (V.univSel || []) : (d ? d.us || [] : []);
  const code = H.code || (d && d.code) || '';
  const pos = (deg, r) => { const a = deg * Math.PI / 180; return `left:${(50 + r * Math.cos(a)).toFixed(2)}%;top:${(50 + r * Math.sin(a)).toFixed(2)}%`; };
  const toks = univ.map((u, k) => {
    const L = univLook(u), on = sel.includes(u.n), M = u.mech && u.mech !== 'none' ? MECHS[u.mech] : null;
    return `<button class="rt-tok${on ? ' on' : ''}" style="--uc:${esc(L.col)};${pos(-90 + k * 360 / univ.length, univ.length > 8 ? 22 : 20)}" data-act="univ" data-u="${k}" aria-pressed="${on}" ${isHost ? '' : 'disabled'} data-tip="${esc(u.n + (M ? ' · ' + M.n : ''))}">${icon(L.ic)}</button>`;
  }).join('');
  const seats = Array.from({ length:8 }, (_, i) => {
    const p = pl[i];
    return `<div class="rt-seat${p ? (i === 0 ? ' host' : ' in') : ''}" style="${pos(90 + i * 45, 44)}">${p ? faceH(avatarSym(p.n)) : '<span class="rt-free">+</span>'}<small>${p ? esc(p.n) + (i === 0 ? ' · hôte' : '') : 'Libre'}</small></div>`;
  }).join('');
  const chosen = univ.filter(u => sel.includes(u.n));
  const list = chosen.length ? chosen.map(u => { const M = u.mech && u.mech !== 'none' ? MECHS[u.mech] : null; return `<div class="rt-ch" style="--uc:${esc(univLook(u).col)}"><b>${esc(u.n)}</b>${M ? `<small>Loi · ${esc(M.n)}</small>` : ''}</div>`; }).join('')
    : `<p class="rt-note">Aucun jeton posé : un univers sera tiré au sort.</p>`;
  const foot = !d ? '<span class="rt-sum">Connexion à l\'hôte…</span>'
    : `<span class="rt-sum"><b>${pl.length} / 8</b> à table · ${pl.length < 8 ? 'les places libres iront aux IA' : 'table complète'}</span>`
      + (isHost ? `<button class="btn" data-act="univ" data-u="-1">${icon('dice')}Au hasard</button><button class="t-go" data-act="launch">Lancer la partie</button>` : '<span class="rt-wait">En attente de l\'hôte…</span>');
  return `<aside class="rt" aria-label="La table">
    <div class="rt-hd"><div><h2>${isHost ? 'Ta table' : 'À table'}</h2><p>${isHost ? 'Pose sur la table les jetons des univers, donne le code à tes amis, puis lance la partie.' : 'L\'hôte choisit les univers. La partie démarre à son signal.'}</p></div><button class="rt-x" data-act="leave" aria-label="Quitter la table">×</button></div>
    <div class="rt-body">
      <div class="rt-tw"><div class="rt-top"></div>${toks}<button class="rt-code" data-act="copycode" ${isHost ? 'data-tip="Copier le code"' : 'disabled'}><small>Code</small><b>${esc(code.toUpperCase())}</b></button>${seats}</div>
      <div class="rt-side"><b class="rt-st">Sur la table</b>${list}${lastGameH(d && d.last)}</div>
    </div>
    <div class="rt-ft">${foot}</div>
  </aside>`;
}

function timerTxt() {
  const d = V.pub; if (!d || d.rem == null) return '';
  const s = Math.ceil(Math.max(0, d.rem - (Date.now() - V.pubAt)) / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}
function ringP() {
  const d = V.pub; if (!d || d.ph !== 'recruit') return 0;
  return Math.min(1, Math.max(0, d.rem - (Date.now() - V.pubAt)) / (V.phTotal || 1)).toFixed(3);
}
const PH = { hero:'Choix du héros', recruit:'Recrutement', combat:'Combat', end:'Fin de partie' };

function gameH() {
  const d = V.pub, me = V.me; if (!d) return '<div class="menu"><p class="note">Chargement…</p></div>';
  const myPid = me ? me.pid : -1;
  const players = d.pl.slice().sort((a, b) => (b.al - a.al) || (b.hp - a.hp) || (a.pl - b.pl));
  const fightOpp = V.fight ? V.fight.on : null;
  const opps = players.map(p => `<li class="op${p.pid === myPid ? ' me' : ''}${p.al ? '' : ' dead'}${fightOpp && p.n === fightOpp ? ' vs' : ''}" data-hov="op" data-n="${esc(p.n)}">
      <span class="op-face${p.haw ? ' haw' : ''}">${faceH(playerSym(p))}<b class="op-hp">${p.al ? Math.max(0, p.hp) : p.pl + 'e'}</b><span class="op-t">${p.t}</span>${d.ph === 'recruit' && p.r && p.al ? '<span class="op-r">✓</span>' : ''}${p.el && ELS[p.el] && p.al ? `<span class="op-el" style="--c:${ELS[p.el].col}" title="${esc('Compagnon ' + ELS[p.el].n + ' · ' + p.mk + ' ' + MK_N[p.el].toLowerCase())}"><svg viewBox="-12 -12 24 24">${EL_ICON[p.el]}</svg></span>` : ''}</span>
      <span class="op-n">${esc(p.n)}</span></li>`).join('');
  const myInfo = d.pl.find(p => p.pid === myPid), alive = !!(myInfo && myInfo.al);
  const hud = `<div class="hud"><span class="round">Manche<b>${d.rd || 0}</b></span><span class="phase">${PH[d.ph] || ''}</span>${d.ev && d.rd >= d.ev ? '<span class="eveil" data-tip="Éveil : la moitié des ninjas sont tombés à 20 PV ou moins. Les clans libèrent leur pouvoir ultime, ton compagnon prend sa forme éveillée, le pouvoir de ton héros est renforcé, chaque technique gagne son effet d\'Éveil et des techniques interdites apparaissent.">Éveil</span>' : ''}${d.laws && d.laws.length && d.ph !== 'end' ? `<span class="hud-laws">${d.laws.map(l => { const M = MECHS[l.k] || MECHS.none; return `<span class="hl" data-hov="law" data-tip="${esc(M.n + ' : ' + M.d)}">${icon(M.ic)}</span>`; }).join('')}${V.me && V.me.souls ? `<span class="souls" data-tip="Âmes récoltées : toutes les 3 âmes, tes serviteurs des Ténèbres gagnent +1/+1 au début du tour.">${icon('skull')}<b>${V.me.souls}</b></span>` : ''}</span>` : ''}<span class="sp"></span><span class="timer" id="tm">${d.ph === 'end' ? '' : timerTxt()}</span><span class="rot-hint">${icon('roll')}Tourne ton téléphone</span>${document.fullscreenEnabled ? `<button class="btn sm fs-b" data-act="fs" aria-label="Plein écran">${document.fullscreenElement ? 'Réduire' : 'Plein écran'}</button>` : ''}<button class="btn sm" data-act="leave">Quitter</button></div>`;
  let table;
  if (me && alive) {
    const canAct = d.ph === 'recruit';
    const fighting = !!(V.fight && (d.ph === 'combat' || !V.fight.done));
    const own = {}; me.hd.concat(me.bd).forEach(m => { if (!m.sp && !m.g && m.c) own[m.c] = (own[m.c] || 0) + 1; });
    const freeRoll = me.hero === 'rivet' && me.rr === 0;
    const hero = HX(me), HQ = HEROES[me.hero] && HEROES[me.hero].q;
    if (me.haw && hero && V.hawToast !== me.hawId) { V.hawToast = me.hawId; const id = me.hawId; setTimeout(() => toast('Éveil de ' + hero.n.split(' ')[0] + ' : ' + (hero.awn || '') + ' ! Ton héros a un nouveau pouvoir.'), 60); setTimeout(() => { V.hawSeen = id; }, 1700); }
    let topZone, boardRow, banner = '';
    if (fighting) {
      const F = V.fight, last = F.r.frames.length - 1, fr = F.r.frames[Math.min(V.fi, last)];
      const mine = F.me;
      const enHero = mine ? F.ha : F.hb;
      topZone = `<section class="keeper-zone enemy${F.duel ? ' has-cp' : ''}"><div class="keeper">${faceH(enHero && HART[enHero] ? 'art-h-' + enHero : avatarSym(F.on), 'face kf')}<div class="kname kn-en"><b>${esc(F.on)}</b>${tierStars(mine ? F.ta : F.tb, true)}</div></div>
        <div class="line counter-line">${fightRow(F, 1 - mine)}</div></section>`;
      boardRow = fightRow(F, mine);
      if (F.done) {
        const won = F.r.w === mine, lost = F.r.w === 1 - mine, dmg = Math.min(F.cap || 99, F.r.dmg);
        banner = `<div class="table-banner"><div class="banner ${won ? 'win' : lost ? 'loss' : 'draw'}">${won ? 'Victoire !' : lost ? 'Défaite' : 'Égalité'}</div><p class="banner-s">${won ? `Tu infliges ${dmg} dégâts à ${esc(F.on)}.` : lost ? `Tu subis ${dmg} dégâts.` : 'Personne ne perd de points de vie.'}</p>${duelLine(F)}${d.ph === 'combat' ? '<p class="mute">Les autres tables terminent leur combat…</p>' : ''}</div>`;
      } else banner = `<div class="table-skip"><button class="btn sm" data-act="skip">Passer l'animation</button></div>`;
    } else {
      topZone = `<section class="keeper-zone${me.fz ? ' frozen' : ''}" data-drop="sh" aria-label="Taverne">
        <div class="keeper">${medal('up', 'up', me.t >= 6 ? 'Niveau max' : 'Améliorer', me.t >= 6 ? null : me.uc, !canAct || me.t >= 6 || me.g < me.uc)}
          <div class="kc"><span class="face kf arch"><svg viewBox="12 8 76 76" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><use href="#art-h-keeper" width="100" height="100"/></svg></span><div class="kname"><b>Bastien, tavernier</b><span class="lv">${tierStars(me.t)}</span></div></div>
          <div class="kr">${medal('roll', 'roll', 'Actualiser', freeRoll ? 0 : 1, !canAct || (me.g < 1 && !freeRoll))}${medal('frz', 'frz', me.fz ? 'Gelée' : 'Geler', null, !canAct, me.fz)}</div></div>
        <div class="line counter-line">${me.sh.length ? me.sh.map((m, i) => tokenH(m, 'sh', i, { drag:canAct, trip:(own[m.c] || 0) >= 2, pair:(own[m.c] || 0) === 1 })).join('') : '<p class="hint">La taverne est vide. Actualise pour faire entrer du monde.</p>'}${me.sp || me.sp2 ? `<div class="shelf${me.sp2 ? ' two' : ''}" title="Étagère à sorts"><span class="shelf-l">Sort${me.sp2 ? 's' : ''}</span><span class="shelf-row">${me.sp ? spellTokenH(me.sp, 'ss', 0, { drag:canAct }) : ''}${me.sp2 ? spellTokenH(me.sp2, 'ss', 1, { drag:canAct }) : ''}</span></div>` : ''}</div>
        ${d.trs ? `<span class="trs ktrs">${d.trs.map(t => `<i style="--c:${esc((TRIBES[t] || {}).col || '#888')}">${esc(trName(t) || t)}</i>`).join('')}</span>` : ''}</section>`;
      boardRow = me.bd.length ? me.bd.map((m, i) => tokenH(m, 'bd', i, { drag:canAct })).join('') : '<p class="hint">Joue tes serviteurs ici. Ils attaquent de gauche à droite.</p>';
    }
    const aimS = !fighting && V.aim != null && me.hd[V.aim] && me.hd[V.aim].sp ? SPELLS[me.hd[V.aim].sp] : null;
    const sockets = Array.from({ length:7 }, () => '<i></i>').join('');
    const cpSide = me.cp && !fighting ? cpSideH(me, null, 0) : '';
    const board = `<section class="board-zone${aimS ? ' aim' : ''}${me.cp && (!fighting || V.fight.duel) ? ' has-cp' : ''}" ${fighting ? '' : 'data-drop="bd"'} aria-label="Ton plateau">${cpSide}
      ${aimS ? `<div class="aimbar"><span>${icon('bolt')}<b>${esc(aimS.n)}</b> : touche le serviteur à cibler.</span><button class="btn sm" data-act="aimcancel">Annuler</button></div>` : ''}
      ${!fighting && me.tma ? `<span class="tma-b">Prochain combat : +${me.tma.a}/+${me.tma.h} pour tous</span>` : ''}
      <div class="line" id="bdrow">${boardRow}</div></section>`;
    const nono = me.hero === 'nono', locked = nono && (me.rd || 0) < 3;
    const powSub = nono ? `${me.fb} dégât${me.fb > 1 ? 's' : ''}` : me.pu ? 'Utilisé' : '';
    const power = hero && hero.cost ? `<button class="powm${me.pu ? ' used' : ''}${canAct && !locked && powCan(me, me.rd || (V.pub && V.pub.rd)) ? ' can' : ''}" data-act="pow" ${!canAct || me.pu || locked || (me.ckPay ? (me.ck || 0) : me.g) < hero.cost ? 'disabled' : ''} aria-label="${esc(hero.n + ' : ' + hero.tx + ' Coût : ' + hero.cost + (me.ckPay ? ' chakra.' : ' or.'))}"><span class="pcost${me.ckPay ? ' ck' : ''}">${me.ckPay ? ckMarkH(hero.cost, 'pc-ck', 'Coût : ' + hero.cost + ' chakra') : hero.cost}</span>${powArtH(me.hero)}<small>${locked ? 'Manche 3' : powSub || powerTitle(hero)[0] || 'Pouvoir'}</small><span class="pc-tx">${esc(powerTitle(hero)[1])}</span></button>`
      : `<span class="powm passive" aria-label="${esc(hero ? hero.tx : '')}">${hero ? powArtH(me.hero) : icon('crown')}<small>Passif</small>${hero ? `<span class="pc-tx">${esc(hero.tx)}</span>` : ''}</span>`;
    const coins = canAct ? `<div class="purse" aria-label="${me.g} or sur ${me.mg}"><b>${me.g}<small>/${me.mg}</small></b><span class="coinrow" aria-hidden="true">${Array.from({ length:Math.max(me.mg, me.g) }, (_, k) => `<i class="coin${k < me.g ? '' : ' off'}"></i>`).join('')}</span>${me.inc ? `<span class="inc">+${me.inc} au prochain tour</span>` : ''}</div>` : '';
    const heroZone = `<section class="hero-zone">
      <div class="hz-left">${trainH(d, me, canAct)}${me.cp || (!NJ_COMP && (d.laws || []).some(l => l.k === 'chakra')) ? '' : `<span class="hov" data-hov="comp">${compMedal(canAct, own)}</span>`}</div>
      <div class="hz-hero${me.haw ? ' haw' : ''}${me.haw && V.hawSeen !== me.hawId ? ' haw-new' : ''}" data-hov="hero">${me.haw ? hawFrameH(hero) : ''}<span class="face hf arch"><svg viewBox="12 8 76 76" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><use href="#${me.hero ? heroArt(me.hero, me.haw) : avatarSym(V.name)}" width="100" height="100"/></svg></span>${hpGem(Math.max(0, me.hp))}${mkOrbsH(d, me)}<span class="hname">${hero ? esc(hero.n) : esc(V.name)}</span>${HQ ? (me.haw ? `<span class="hq done">${esc(hero.awn || 'Éveillé')}</span>` : `<span class="hq" data-tip="${esc('Quête d\'éveil : ' + HQ.tx + ' Récompense : ' + HEROES[me.hero].aw.nm + ' (nouveau pouvoir).')}"><i style="--p:${Math.min(1, (me.qp || 0) / HQ.n)}"></i>${Math.min(me.qp || 0, HQ.n)}/${HQ.n}</span>`) : ''}</div>
      <div class="hz-right"><span class="hov" data-hov="pow">${power}</span><span class="purses">${coins}${canAct ? ckGauge(d, me) : ''}</span>${rsvH(d, me)}</div>
      <div class="bellwrap" id="bellw" style="--p:${ringP()}"><button class="bell${me.rdy ? ' rung' : ''}" data-act="rdy" ${canAct ? '' : 'disabled'} aria-pressed="${me.rdy ? 'true' : 'false'}"><span class="bell-shine" aria-hidden="true"></span>${icon('bell')}<span class="bell-t">${me.rdy ? 'Prêt !' : 'Prêt'}</span><small class="bell-s">${me.rdy ? 'en attente' : 'fin du tour'}</small></button></div></section>`;
    const n = me.hd.length;
    const hand = fighting ? '' : `<section class="hand" data-drop="hd" aria-label="Ta main · ${n}/10"><div class="fan${n > 7 ? ' many' : n > 4 ? ' some' : ''}" style="--n:${n}">${n ? me.hd.map((m, i) => { const o = i - (n - 1) / 2, op = { drag:canAct, style:`--o:${f1(o)};--o2:${f1(o * o)}` }; return m.sp ? spellCardH(m.sp, 'hd', i, op) : cardH(m, 'hd', i, op); }).join('') : ''}</div></section>`;
    const det = !fighting && V.sel ? `<div class="detail-pop">${detailH(canAct)}<button class="dp-x" data-act="unsel" aria-label="Fermer">×</button></div>` : '';
    const duelCol = fighting && V.fight.duel && me.cp ? `<div class="duel-col" aria-label="Duel des compagnons">${cpSideH(me, V.fight, 1)}<span class="duel-vs">VS</span>${cpSideH(me, V.fight, 0)}</div>` : '';
    table = `<div class="table${fighting ? ' fighting arena' + (V.fight.duel ? '' : (me.cp ? ' joined' : '')) : ''}${awakeUI() && (d.laws || []).some(l => l.k === 'chakra') ? ' awakened' + awkElCls(me) : ''}">${duelCol}${hud}${topZone}${board}${banner}${heroZone}${hand}${det}</div>${bigChestH(d, me)}${choiceH(d, me)}`;
  } else if (myInfo) {
    table = `<div class="table">${hud}<section class="plaque solo-msg"><h2>Éliminé · ${myInfo.pl}e place</h2><p class="note">Tu peux suivre la fin de la partie à gauche ou retourner au menu.</p><div class="btns"><button class="btn" data-act="leave">Retour au menu</button></div></section></div>`;
  } else {
    table = `<div class="table">${hud}<section class="plaque solo-msg"><h2>Spectateur</h2><p class="note">Tu observes cette partie.</p></section></div>`;
  }
  return `<div class="stage"><aside class="opps" aria-label="Joueurs"><ol>${opps}</ol></aside>${table}</div>${overlayH()}`;
}
// fin de combat : un grand coffre au centre de l'écran, à ouvrir d'un clic
function bigChestH(d, me) {
  if (!me || !me.pend || d.ph !== 'recruit' || (V.fight && !V.fight.done) || V.chestRev || awkPending()) return '';
  const q = me.pend.slice(0, 3), t = +me.pend.slice(3), maj = q === 'maj';
  return `<div class="bigchest ${q}" role="dialog" aria-label="Coffre de fin de combat"><div class="bc-in">
    <b class="bc-t">${me.cp && me.chFav ? 'Coffre de l\'Éveil : tu es parmi les derniers' : me.cp && V.pub && V.pub.ev && V.pub.rd >= V.pub.ev ? 'Coffre de l\'Éveil' : me.cp ? (maj ? 'Duel gagné : coffre majeur' : 'Duel perdu : coffre mineur') : (maj ? 'Victoire : coffre majeur' : 'Coffre mineur')} · niveau ${t}</b>
    <button class="bc-box" data-act="chest" aria-label="Ouvrir le coffre"><svg viewBox="0 0 80 70" aria-hidden="true"><rect x="6" y="30" width="68" height="36" rx="4" fill="${maj ? '#e2b04e' : '#a8744a'}" stroke="#120a06" stroke-width="3"/><path d="M6 44 H74" stroke="#120a06" stroke-width="2" opacity=".4"/><path d="M6 30 Q40 2 74 30 Z" fill="${maj ? '#c88a26' : '#8a5a32'}" stroke="#120a06" stroke-width="3"/><rect x="34" y="32" width="12" height="12" rx="2" fill="${maj ? '#ffd24a' : '#6fd0ff'}" stroke="#120a06" stroke-width="2"/></svg></button>
    <small class="bc-s">Clique sur le coffre pour l'ouvrir</small></div></div>`;
}
// après l'ouverture : les cartes obtenues en grand au centre de l'écran
function chestReveal(ids) {
  const el = document.createElement('div'); el.className = 'chrev'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-label', 'Contenu du coffre');
  el.innerHTML = `<div class="chrev-in"><b class="chrev-t">Tu obtiens</b><div class="chrev-cards">${ids.map((o, k) => { const it = typeof o === 'string' ? { id:o } : o, id = it.id;
    return `<div class="chrev-c${it.up ? ' up' : ''}" style="--k:${k}">${spellCardH(id, 'p', 0)}<small>${it.up ? `Amélioré · niveau ${it.lv}${it.worn ? ' (sur ton compagnon)' : ''}` : SPELLS[id] && SPELLS[id].eq ? 'Rangé dans l\'inventaire' : 'Ajouté à ta main'}</small>${it.up ? `<em class="chrev-b">${esc(eqBonusTx(id, it.lv))}</em>` : ''}</div>`; }).join('')}</div><small class="chrev-x">Clique pour fermer</small></div>`;
  const close = () => { el.classList.add('out'); setTimeout(() => el.remove(), 250); };
  el.addEventListener('click', close); document.body.appendChild(el); setTimeout(close, 3200 + ids.length * 400);
}
// animation d'ouverture : le coffre vient au centre, tremble, s'ouvre dans un halo (bleu = mineur, doré = majeur)
function fxChest(btn) {
  const maj = btn.classList.contains('maj') || !!btn.closest('.bigchest.maj'), r = btn.getBoundingClientRect(), col = maj ? '#ffd24a' : '#6fd0ff';
  const el = document.createElement('div'); el.className = 'chfx ' + (maj ? 'maj' : 'min');
  el.style.setProperty('--x', (r.left + r.width / 2 - innerWidth / 2) + 'px'); el.style.setProperty('--y', (r.top + r.height / 2 - innerHeight / 2) + 'px'); el.style.setProperty('--c', col);
  el.innerHTML = `<span class="chfx-halo"></span><span class="chfx-rays"></span><svg class="chfx-box" viewBox="0 0 80 70" aria-hidden="true">
    <rect x="6" y="30" width="68" height="36" rx="4" fill="${maj ? '#e2b04e' : '#a8744a'}" stroke="#120a06" stroke-width="3"/><path d="M6 44 H74" stroke="#120a06" stroke-width="2" opacity=".4"/>
    <g class="chfx-lid"><path d="M6 30 Q40 2 74 30 Z" fill="${maj ? '#c88a26' : '#8a5a32'}" stroke="#120a06" stroke-width="3"/></g>
    <rect x="34" y="32" width="12" height="12" rx="2" fill="${col}" stroke="#120a06" stroke-width="2"/></svg>
    ${Array.from({ length:12 }, (_, k) => `<i class="chfx-sp" style="--a:${k * 30}deg;--d:${(k % 3) * .06}s"></i>`).join('')}`;
  document.body.appendChild(el); setTimeout(() => el.remove(), 1700);
}
// l'inventaire : coffres (ouverture gratuite) et médailles d'équipement (posées sur le compagnon contre du chakra)
// les 5 pièces du compagnon : bordure = meilleure rareté obtenue, badge = nombre d'améliorations
const pieceIco = (pc, cls = '') => typeof pc === 'object' ? (pc.kind === 'mn' ? `<svg class="pc-ico ${cls}" viewBox="0 0 100 100" aria-hidden="true"><clipPath id="pci-x-${cls}-${pc.c}"><circle cx="50" cy="50" r="46"/></clipPath><g clip-path="url(#pci-x-${cls}-${pc.c})"><use href="#art-${pc.c}" width="100" height="100"/></g></svg>` : `<svg class="pc-ico ${cls}" viewBox="0 0 100 100" aria-hidden="true"><clipPath id="pci-s-${cls}-${pc.sp}"><circle cx="50" cy="50" r="46"/></clipPath><g clip-path="url(#pci-s-${cls}-${pc.sp})"><use href="#sp-${pc.sp}" width="100" height="100"/></g></svg>`) : pieceIco0(pc, cls);
const pieceIco0 = (pc, cls = '') => `<svg class="pc-ico ${cls}" viewBox="0 0 100 100" aria-hidden="true"><clipPath id="pci-${pc}-${cls}"><circle cx="50" cy="50" r="44"/></clipPath><g clip-path="url(#pci-${pc}-${cls})"><use href="#sp-${PIECES[pc].art}" width="100" height="100"/></g></svg>`;
function pieceList(c, pc) { const L = (c && c.pc && c.pc[pc]) || []; return L; }
function piecesH(c) {
  return PIECE_IDS.map(pc => { const L = pieceList(c, pc), best = L.length ? Math.max(...L) : -1, col = best >= 0 ? RARS[best].col : '#5a4a3a';
    const tip = `${PIECES[pc].n}${L.length ? ' : ' + L.map(r => RARS[r].n + ' (' + upTx({ pc, r }) + ')').join(' · ') : ' : aucune amélioration'}`;
    return `<span class="pcs" style="--rc:${col}" data-tip="${esc(tip)}" aria-label="${esc(tip)}">${pieceIco(pc)}${L.length ? `<b class="pcs-n">${L.length}</b>` : ''}</span>`; }).join('');
}
// survol d'une amélioration rangée : la carte de la pièce, sa rareté, son effet, son coût et ce que la pièce a déjà
function upPeekH(me, i) {
  const o = (me.ups || [])[i]; if (!o) return '';
  const R = RARS[o.r], L = o.kind ? [] : pieceList(me.cp, o.pc), c = upgCost(o), ok = (me.ck || 0) >= c;
  return `<div class="uppk" style="--rc:${R.col}"><span class="upc-r">${R.n}</span>${pieceIco(o.kind ? o : o.pc, 'big')}<b>${esc(o.kind ? (o.kind === 'mn' ? 'Serviteur' : 'Technique') : PIECES[o.pc].n)}</b><span class="upc-tx">${esc(upTx(o, me.cp))}</span>
    <span class="uppk-c">${ckMarkH(c)}<small>${ok ? 'Clique pour la poser sur ton compagnon' : `Il te faut ${c} chakra`}</small></span>
    <small class="uppk-h">${L.length ? 'Déjà sur cette pièce : ' + L.map(r => `<em style="color:${RARS[r].col}">${RARS[r].n}</em>`).join(', ') : 'Aucune amélioration sur cette pièce'}</small></div>`;
}
// coffre ouvert : 3 améliorations au choix (et la technique bonus éventuelle)
// styles des récompenses (10 au choix, mémorisés sur l'appareil)
const RW_NAMES = ['Bois de taverne', 'Parchemin', 'Médaillon', 'Cristal de chakra', 'Talisman scellé', 'Bannière', 'Pierre runique', 'Néon', 'Holographique', 'Épuré'];
function rwSet(n) { V.rw = n; document.body.className = document.body.className.replace(/\brw-\d+\b/g, '').trim() + ' rw-' + n; try { localStorage.setItem('mdt-rw', String(n)); } catch (e) {} }
V.rw = 5;   // style retenu : Bannière
setTimeout(() => rwSet(5), 0);
function choiceH(d, me) {
  if (!me || !me.choice || !me.cp || Date.now() < (V.choiceAt || 0) || d.ph !== 'recruit' || awkPending()) return '';
  const tech = (me.loot || []).filter(o => SPELLS[o.id]);
  return `<div class="upch" role="dialog" aria-label="Choisis une amélioration"><div class="upch-in">
    <b class="upch-t">Choisis ta récompense</b>${me.chFav ? '<small class="upch-s fav">Coffre de l\'Éveil · tu es parmi les derniers : raretés Épique ou mieux, et la carte va gratuitement dans ta main.</small>' : ''}<small class="upch-s"${me.chFav ? ' hidden' : ''}>Une seule : elle se range dans l'inventaire, et tu la poses sur ${esc(C[me.cp.c] ? C[me.cp.c].n : 'ton compagnon')} avec du chakra.</small>
    <div class="upch-row">${me.choice.map((o, i) => { const R = RARS[o.r], n = o.kind ? 0 : pieceList(me.cp, o.pc).length;
      return `<button class="upc r${o.r}" style="--rc:${R.col};--k:${i}" data-act="upick" data-i="${i}"><span class="upc-r">${R.n}</span>${pieceIco(o.kind ? o : o.pc, 'big')}<b>${esc(o.kind ? (o.kind === 'mn' ? 'Serviteur' : 'Technique') : PIECES[o.pc].n)}</b><span class="upc-tx">${esc(upTx(o, me.cp))}</span>${o.kind && me.chFav ? '<span class="uppk-c"><small>gratuit</small></span>' : `<span class="uppk-c">${ckMarkH(upgCost(o))}<small>à poser</small></span>`}<small>${o.kind ? (me.chFav ? 'Gratuit · directement en main' : 'À poser au chakra') : n ? `Déjà ${n} amélioration${n > 1 ? 's' : ''}` : 'Première amélioration'}</small></button>`; }).join('')}</div>
    ${tech.length ? `<p class="upch-b">Bonus du coffre : <b>${tech.map(o => esc(SPELLS[o.id].n)).join(', ')}</b> ajoutée à ta main</p>` : ''}
  </div></div>`;
}
function trainH(d, me, canAct) {
  if (!(d.laws || []).some(l => l.k === 'chakra') || (!NJ_COMP && !me.cp)) return '';
  if (me.cp) { const ups = me.ups || [];
    const md = ups.map((o, i) => { const c = upgCost(o), ok = canAct && (me.ck || 0) >= c;
      return `<button class="upm" style="--rc:${RARS[o.r].col}" data-act="uapply" data-i="${i}" data-hov="upm" ${ok ? '' : 'aria-disabled="true"'} aria-label="${esc((o.kind ? 'Carte' : PIECES[o.pc].n) + ' ' + RARS[o.r].n + ' : ' + upTx(o, me.cp) + '. Poser coûte ' + c + ' chakra.')}">${pieceIco(o.kind ? o : o.pc)}<span class="upm-c">${ckMarkH(c)}</span></button>`; }).join('');
    return `<section class="train" aria-label="Inventaire"><b class="tr-h">Inventaire · récompenses à poser</b><div class="tr-row med pcs-row">${md || '<small class="tr-e">Les récompenses choisies dans les coffres se rangent ici : pose-les avec du chakra.</small>'}</div></section>`; }
  const ks = Object.keys(me.chests || {}).filter(k => me.chests[k] > 0).sort((a, b) => a.slice(3) - b.slice(3) || (a < b ? 1 : -1));
  const comps = me.cp ? [me.cp] : (me.bd || []).filter(isComp), full = (me.eqs || []).length >= EQS_MAX;
  const chests = ks.map(k => { const q = k.slice(0, 3), t = +k.slice(3);
    return `<button class="chest ${q}" data-act="chest" data-k="${k}" ${canAct && !full ? '' : 'disabled'} data-tip="Coffre ${q === 'maj' ? 'majeur' : 'mineur'} de niveau ${t} : ${q === 'maj' ? (t >= 6 ? 'deux équipements rares et une technique' : t >= 4 ? 'deux équipements rares' : 'un équipement rare') : t <= 3 ? 'un équipement commun' : 'un équipement'}. Clique pour l'ouvrir (gratuit).${full ? ' Ton inventaire est plein.' : ''}" aria-label="Ouvrir un coffre ${q === 'maj' ? 'majeur' : 'mineur'} de niveau ${t} (${me.chests[k]} en réserve)">
      <svg viewBox="0 0 40 34" aria-hidden="true"><rect x="3" y="13" width="34" height="18" rx="2" fill="${q === 'maj' ? '#e2b04e' : '#a8744a'}" stroke="#120a06" stroke-width="2"/><path d="M3 13 Q20 -1 37 13 Z" fill="${q === 'maj' ? '#c88a26' : '#8a5a32'}" stroke="#120a06" stroke-width="2"/><rect x="16" y="15" width="8" height="8" rx="1.5" fill="#6fd0ff" stroke="#120a06" stroke-width="1.4"/></svg>
      <b class="ch-n">×${me.chests[k]}</b><small>${q === 'maj' ? 'Majeur' : 'Mineur'} · ${t}</small></button>`; }).join('');
  const medals = (me.eqs || []).map((id, i) => { const S = SPELLS[id], c = EQ_COST(id);
    const why = !comps.length ? 'Recrute ton compagnon pour l\'équiper.' : !comps.some(m => (m.eq || []).length < eqSlots(m) && !(m.eq || []).includes(id)) ? 'Ton compagnon porte déjà cet équipement, ou n\'a plus d\'emplacement libre.' : (me.ck || 0) < c ? `Il te faut ${c} chakra.` : '';
    return `<button class="eqm" data-act="equip" data-i="${i}" data-sp="${id}" data-why="${esc('Équiper coûte ' + c + ' chakra.' + (why ? ' ' + why : ''))}" ${canAct && !why ? '' : 'aria-disabled="true"'} aria-label="Équiper ${esc(S.n)} pour ${c} chakra"><svg viewBox="0 0 100 100" aria-hidden="true"><clipPath id="eqc${i}"><circle cx="50" cy="50" r="44"/></clipPath><g clip-path="url(#eqc${i})"><use href="#sp-${id}" width="100" height="100"/></g><circle cx="50" cy="50" r="44" fill="none" stroke="#f2c14e" stroke-width="6"/></svg><span class="ch-c ckx">${ckMarkH(c)}</span>${(me.eqlv || {})[id] > 1 ? `<b class="eq-lv">${me.eqlv[id]}</b>` : ''}</button>`; }).join('');
  return `<section class="train" aria-label="Inventaire"><b class="tr-h">Inventaire</b>
    <div class="tr-row med">${medals || '<small class="tr-e">Les équipements des coffres de fin de combat se rangent ici.</small>'}</div></section>`;
}
// la jauge de chakra (univers des Cinq Nations) : un grand orbe bleu et dix perles
// le réservoir des techniques : deux moitiés (bas = 1re technique, haut = 2e)
// fiche du compagnon au survol : niveau, élément, pouvoir du combo, équipements
function compSheetH(mc, lv, eq) {
  const L = compLv(mc), nx = L < 5 ? XP_LV[L] : null, el = compEl(mc), E = el && ELS[el];
  const fu = (mc.x || []).find(e => e.fusion), fuCol = fu ? (Object.values(FUSIONS).concat(Object.values(PURES)).find(F => F.n === mc.fu) || {}).col : null;
  const eqH = eq.length ? eq.map(id => `<div class="peq-i"><svg viewBox="0 0 100 100" aria-hidden="true"><clipPath id="pq-${id}"><circle cx="50" cy="50" r="44"/></clipPath><g clip-path="url(#pq-${id})"><use href="#sp-${id}" width="100" height="100"/></g><circle cx="50" cy="50" r="44" fill="none" stroke="#f2c14e" stroke-width="6"/></svg><span><b>${esc(SPELLS[id].n)}${(lv[id] || 1) > 1 ? ` · niv. ${lv[id]}` : ''}</b><small>${esc(eqBonusTx(id, lv[id] || 1))}</small></span></div>`).join('') : '<small class="peq-e">Aucun équipement : pose-lui des médailles depuis l\'entraînement.</small>';
  return `<div class="peq">
    <div class="pq-row"><span class="pq-lv"><b>Niveau ${L}</b><small>${nx ? `${mc.xp || 0} / ${nx} expérience` : 'Niveau maximum'}</small></span>
      ${E ? `<span class="pq-el" style="--c:${E.col}"><i></i><span><b>${E.n}${mc.elLock ? ' · fixé' : ''}</b><small>Résonance : +${Math.floor(((V.me && V.me[MK[el]]) || 0) / RES_K)}/+${Math.floor(((V.me && V.me[MK[el]]) || 0) / RES_K)} en duel (1 par ${RES_K} ${MK_N[el].toLowerCase()})</small></span></span>` : ''}</div>
    ${(() => { const A = COMP_AWK[CLAN_EL[CD(mc.c).tr]]; return A ? `<div class="pq-awk${mc.awk ? ' on' : ''}"><b>${mc.awk ? 'Forme éveillée' : 'À l\'Éveil'} · ${esc(A.n)}</b><small>${esc(A.tx)}</small></div>` : ''; })()}
    ${(() => { const n = (mc.pact || []).length, el = CLAN_EL[CD(mc.c).tr], bc = el && C['nb_' + el]; if (!bc) return ''; const b = V.me && V.me.bst; return `<div class="pq-awk pq-bst${b ? ' on' : ''}"><b>${b ? 'Bête invoquée' : 'Invocation à l\'Éveil'} · ${esc(bc.n)}</b><small>${b ? `${b.a}/${b.h} · combat avec lui dans le duel` : n ? `${n} parchemin${n > 1 ? 's' : ''} de pacte : elle apparaîtra à l'Éveil et combattra avec lui dans le duel.` : 'Pose des parchemins de pacte (coffres) pour qu\'elle apparaisse à l\'Éveil.'}</small></div>`; })()}
    ${(() => { const P = COMP_LV[CLAN_EL[CD(mc.c).tr]]; return P ? `<div class="pq-lvp">${[3, 5].map(l => `<span class="${L >= l ? 'on' : ''}"><b>Niv. ${l}</b> ${esc(P[l][0])}</span>`).join('')}</div>` : ''; })()}
    <div class="pq-combo${fu ? '' : ' none'}" style="--c:${fuCol || '#8a7a5a'}"><b>${fu ? 'Combo · ' + esc(mc.fu) : 'Aucun combo'}</b><small>${fu ? esc(fxText(fu)) : 'Remplis le réservoir avec deux techniques : le combo lui donne un pouvoir hybride.'}</small></div>
    <b class="peq-t">Pièces · ${PIECE_IDS.reduce((t, pc) => t + pieceList(mc, pc).length, 0)} amélioration(s)</b>${PIECE_IDS.map(pc => { const L = pieceList(mc, pc); return `<div class="peq-i">${pieceIco(pc)}<span><b>${esc(PIECES[pc].n)}</b><small>${L.length ? L.map(r => `<em style="color:${RARS[r].col}">${RARS[r].n}</em> ${esc(upTx({ pc, r }, mc))}`).join(' · ') : 'Aucune amélioration'}</small></span></div>`; }).join('')}
    <small class="pq-duel">En combat, il affronte seulement le compagnon adverse : s'il gagne, coffre majeur.</small>
  </div>`;
}
function rsvH(d, me) {

  if (!(d.laws || []).some(l => l.k === 'chakra')) return '';
  const r = me.rsv || [], a = r[0], col = e => ELS[e] ? ELS[e].col : 'transparent';
  const next = a ? Object.keys(ELS).map(e => { const F = comboOf(a, e); return F ? `${ELS[e].n} → ${F.n}` : ''; }).filter(Boolean).join(' · ') : '';
  const tip = a ? `Réservoir : moitié ${ELS[a].n}. Ta prochaine technique déclenche un combo : ${next}.` : 'Réservoir vide : ta prochaine technique en remplit la moitié avec son élément.';
  // un rouleau de parchemin : moitié gauche = 1re technique, moitié droite = la suivante
  const half = (x0, e) => e ? `<rect x="${x0}" y="9" width="27" height="32" fill="${col(e)}" opacity=".72"/><g transform="translate(${x0 + 13.5} 25) scale(.95)">${EL_ICON[e]}</g>` : `<text x="${x0 + 13.5}" y="25" dy=".36em" text-anchor="middle" font-size="11" fill="rgba(90,60,30,.45)" font-family="Grenze,serif">${x0 < 40 ? '1' : '2'}</text>`;
  const roller = x => `<rect x="${x}" y="4" width="9" height="42" rx="4" fill="url(#rsv-wood)" stroke="#120a06" stroke-width="1.8"/><rect x="${x + 1.5}" y="1" width="6" height="5" rx="2" fill="#c8963e" stroke="#120a06" stroke-width="1.3"/><rect x="${x + 1.5}" y="44" width="6" height="5" rx="2" fill="#c8963e" stroke="#120a06" stroke-width="1.3"/>`;
  return `<span class="rsv scroll${a ? ' half' : ''}" data-hov="rsv" data-tip="${esc(tip)}" aria-label="${esc(tip)}"><svg viewBox="0 0 80 50" aria-hidden="true">
    <defs><linearGradient id="rsv-wood" x1="0" x2="1"><stop offset="0" stop-color="#5a3418"/><stop offset=".5" stop-color="#a8744a"/><stop offset="1" stop-color="#4a2a12"/></linearGradient>
      <linearGradient id="rsv-paper" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6ead0"/><stop offset="1" stop-color="#dcc48e"/></linearGradient></defs>
    <path d="M13 8 Q40 5 67 8 L67 42 Q40 45 13 42 Z" fill="url(#rsv-paper)" stroke="#120a06" stroke-width="2"/>
    ${half(13, a)}${half(40, null)}
    <path d="M40 9 V41" stroke="#7a5a32" stroke-width="1.2" stroke-dasharray="2.5 2.5"/>
    <path d="M16 13 H36 M44 13 H64 M16 37 H36 M44 37 H64" stroke="rgba(120,80,40,.35)" stroke-width=".9"/>
    ${roller(6)}${roller(65)}
  </svg><small>${a ? ELS[a].n : 'Réservoir'}</small></span>`;
}
// survol du réservoir : la liste des combos possibles (ceux de la moitié en place, ou les 15)
function rsvPeekH(me) {
  const a = (me.rsv || [])[0], E = Object.keys(ELS);
  const dot = e => `<i class="rp-d" style="background:${ELS[e].col}" title="${ELS[e].n}"></i>`;
  const row = (x, y) => { const F = comboOf(x, y); if (!F) return ''; const cur = a && (x === a || y === a);
    return `<li class="rp-r${x === y ? ' pure' : ''}" style="--cc:${F.col}"><span class="rp-e">${dot(x)}${dot(y)}</span><span class="rp-t"><b>${esc(F.n)}</b><em class="rp-n">${ELS[x].n} + ${ELS[y].n}</em>${x === y ? '<em>pur</em>' : ''}<small>${esc(comboTx(F))}</small></span></li>`; };
  let rows;
  if (a) rows = E.map(e => row(a, e)).join('');
  else { const pairs = []; E.forEach((x, i) => E.slice(i).forEach(y => pairs.push([x, y]))); pairs.sort((p, q) => (p[0] === p[1]) - (q[0] === q[1])); rows = pairs.map(([x, y]) => row(x, y)).join(''); }
  return `<div class="rpeek${a ? '' : ' all'}"><b class="rp-h">${a ? `Réservoir · moitié ${ELS[a].n}` : 'Réservoir vide'}</b><small class="rp-s">${a ? 'Ta prochaine technique déclenche :' : 'Lance deux techniques : leur mélange déclenche un combo. Le compagnon gagne aussi son pouvoir hybride.'}</small><ul>${rows}</ul></div>`;
}
// marqueurs de clan : 5 orbes autour du portrait du héros (anneau = progression vers le prochain palier)
const MK_COL = { feu:'#ff7a2a', vent:'#6fd8a0', eau:'#4ab0e8', foudre:'#ffd23a', terre:'#c8a878' };
function mkOrbsH(d, me) {
  if (!NJ_MK) return '';
  if (!(d.laws || []).some(l => l.k === 'chakra')) return '';
  const els = ['feu', 'vent', 'foudre', 'terre', 'eau'];
  return `<span class="mkorbs" data-hov="mk" aria-label="Marqueurs de clan">${els.map((e, k) => {
    const v = me[MK[e]] || 0, tot = (me.mkl || {})[e] || 0, t = MK_STEPS.filter(s => tot >= s).length, nx = MK_STEPS[t], pr = nx ? (tot - (MK_STEPS[t - 1] || 0)) / (nx - (MK_STEPS[t - 1] || 0)) : 1;
    const a = (-162 + k * 31) * Math.PI / 180;
    return `<span class="mko t${t}${v >= 5 ? ' ready' : ''}" style="--c:${MK_COL[e]};--p:${pr.toFixed(2)};left:calc(50% + ${Math.cos(a).toFixed(3)} * var(--orr));top:calc(46% + ${Math.sin(a).toFixed(3)} * var(--orr))"><svg viewBox="-12 -12 24 24" aria-hidden="true">${EL_ICON[e]}</svg><b>${v}</b>${t ? `<i>${'★'.repeat(t)}</i>` : ''}</span>`; }).join('')}</span>`;
}
function mkPeekH(me) {
  const row = e => { const v = me[MK[e]] || 0, tot = (me.mkl || {})[e] || 0, t = MK_STEPS.filter(s => tot >= s).length;
    const steps = MK_STEPS.map((s, i) => { const B = MK_TIER[e][i]; return `<li class="${tot >= s ? 'on' : ''}"><b>${s}</b> ${MK_TIER_TX[e]} : +${B[0]}/+${B[1]}${B[2] ? ' et ' + MK_KW[B[2]] : ''} en combat</li>`; }).join('');
    return `<div class="mkp-r" style="--c:${MK_COL[e]}"><span class="mkp-h"><svg viewBox="-12 -12 24 24">${EL_ICON[e]}</svg><b>${MK_N[e]}</b><em>${v} en réserve · ${tot} gagnés</em></span><ul>${steps}</ul><small>Éclat (combo avec l'élément ${ELS[e].n}, 5 ${MK_N[e].toLowerCase()}) : ${esc(MK_BURST[e][0])}</small></div>`; };
  return `<div class="mkpeek"><b class="mkp-t">Marqueurs de clan</b><small class="mkp-s">Gagnés par les techniques de leur nature (+1), les serviteurs du clan et les Sceaux de clan des coffres. Les paliers comptent tout ce que tu as gagné ; chaque combo consomme 5 marqueurs de ses éléments pour leur éclat.</small><div class="mkp-g">${['feu', 'vent', 'eau', 'foudre', 'terre'].map(row).join('')}</div></div>`;
}
// combo déclenché : grande annonce au centre de l'écran
const vilN = el => { const t = Object.keys(CLAN_EL).find(k => CLAN_EL[k] === el); return t && TRIBES[t] ? TRIBES[t].n.replace(/^Village (de la |du |de l')/, '') : ((ELS[el] || {}).n || ''); };
function comboWatch() {
  if (!V.me) return; const c = V.me.combo; if (!c) { if (V.comboSeen === undefined) V.comboSeen = null; return; } if (V.comboSeen === c.id) return;
  const first = V.comboSeen === undefined; V.comboSeen = c.id; if (first) return;
  const el = document.createElement('div'); el.className = 'combo-fx';
  el.innerHTML = `<div class="cbx" style="--c1:${ELS[c.a] ? ELS[c.a].col : c.col};--c2:${ELS[c.b] ? ELS[c.b].col : c.col};--cc:${c.col}"><span class="cbx-orb"></span><small>${c.pure ? 'Ultime · ' + esc(vilN(c.a)) : 'Combo · ' + esc(vilN(c.a)) + ' + ' + esc(vilN(c.b))}</small><b>${esc(c.n)}</b><p>${esc(comboTx({ n:c.n }))}</p>${(c.bursts || []).map(e => `<p class="cbx-b" style="color:${MK_COL[e]}">Éclat · ${MK_N[e]} : ${esc(MK_BURST[e][0])}</p>`).join('')}</div>`;
  document.body.appendChild(el); setTimeout(() => el.remove(), 2600);
}
function ckGauge(d, me) {
  const law = (d.laws || []).find(l => l.k === 'chakra'); if (!law) return '';
  const ck = me.ck || 0, inc = (me.bd || []).filter(m => (law.trs || []).includes(CD(m.c).tr)).length;
  return `<div class="purse ckp" aria-label="${ck} chakra sur 10" data-tip="Chakra : il lance tes techniques ninja et le pouvoir de ton héros. Chaque serviteur Ninja en génère 1 au début de ton tour (10 au plus).${inc ? ' +' + inc + ' au prochain tour.' : ''}"><b>${ck}<small>/10</small></b><span class="coinrow" aria-hidden="true">${Array.from({ length:10 }, (_, k) => `<i class="ckc${k < ck ? '' : ' off'}"></i>`).join('')}</span></div>`;
}
// compteurs de clan (braises, marée, charge) sous le chakra
const clanCtrH = me => { const c = [['braise', 'Braises', '#ff9a5a', 'Braises (Clan Katon) : chaque technique les attise. Après l\'Éveil, Phénix : tes serviteurs Katon gagnent +1/+1 par paire de braises et Renaissance.'], ['maree', 'Marée', '#6fc8ff', 'Marée (Clan Suiton) : elle monte à chaque fin de tour. Après l\'Éveil, raz-de-marée : tous tes serviteurs gagnent +1/+1 par tranche de 4.'], ['charge', 'Charge', '#ffe14a', 'Charge (Clan Raiton) : elle s\'accumule à chaque fin de tour. Après l\'Éveil, orage total : la moitié frappe l\'ennemi au début de chaque combat.']].filter(([k]) => me[k]);
  return c.length ? `<span class="ctrs">${c.map(([k, n, col, tip]) => `<span class="ctr" style="--cc:${col}" data-tip="${esc(tip)}">${n} <b>${me[k]}</b></span>`).join('')}</span>` : ''; };
const medal = (act, ic, label, cost, dis, on) => `<button class="medal${on ? ' on' : ''}" data-act="${act}" ${dis ? 'disabled' : ''} title="${label}">${icon(ic)}${cost != null ? `<span class="cost">${cost}</span>` : ''}<small>${label}</small></button>`;
// Cinq Nations : le compagnon, déjà triplé, se tient à côté du héros (hors plateau)
// pendant le combat, il affronte seulement le compagnon adverse : ce duel décide du coffre
function duelRes(F) { if (!F || !F.duel) return null; return F.duel.w === F.me ? 'win' : F.duel.w === 1 - F.me ? 'loss' : 'draw'; }
function duelLine(F) {
  const st = F && F.stl ? [F.stl[F.me], F.stl[1 - F.me]] : [0, 0];
  const stH = st[0] || st[1] ? `<p class="duel-l stl">${st[0] ? `Vol de chakra : <b>+${st[0]}</b>` : ''}${st[0] && st[1] ? ' · ' : ''}${st[1] ? `${esc(F.on)} te vole <b>${st[1]}</b> chakra` : ''}</p>` : '';
  return stH + duelLine0(F);
}
function duelLine0(F) {
  if (F && !F.duel && V.me && V.me.cp && F.r && F.r.alive) { const up = (F.r.alive[F.me] || []).includes(V.me.cp.c); return `<p class="duel-l ${up ? 'win' : 'loss'}">Ton compagnon ${up ? 'est encore debout · coffre majeur' : 'est tombé · coffre mineur'}</p>`; }
  const r = duelRes(F); if (!r) return '';
  return `<p class="duel-l ${r}">Duel des compagnons : ${r === 'win' ? 'gagné · coffre majeur' : r === 'loss' ? 'perdu · coffre mineur' : 'égalité · coffre mineur'}</p>`;
}
// compagnon Ninja posé sur le bord gauche de la zone de jeu, séparé par un fil léger
// side 0 : le mien (plateau du bas) · side 1 : celui de l'adversaire (pendant le duel)
// animation du duel des compagnons : il avance en parallèle du combat des plateaux
function duelPaint() { const F = V.fight; if (!F || !V.me || !V.me.cp) return; [0, 1].forEach(s => { const el = document.getElementById('cps' + s); if (el) el.outerHTML = cpSideH(V.me, F, s); }); placeDuelCol(); }
/* répliques des compagnons avant le duel (second degré assumé) */
const TAUNT = {
  adv:{
    'feu>vent':['Même Sasukeur-de-flammes aurait honte de ton petit courant d\'air.', 'Ton vent ? Kakachiche, je le dévore en trois secondes chrono, sans même lever mon bandeau.', 'Ton vent nourrit mes flammes, crétin ! C\'est écrit dans tous les rouleaux de l\'Académie !', 'Souffle, souffle… chaque bourrasque, c\'est un bol de ramen offert à mon brasier !', 'Ma volonté brûle, et toi tu fais l\'éventail. Merci du coup de main, abruti !'],
    'vent>foudre':['Narutrop lent, l\'ampoule ! Mon vent te coupe avant ton premier signe.', 'Ta foudre ressemble au Chidoudou d\'un débutant. Rentre chez toi.', 'Tes éclairs ? Je les tranche avant même que t\'aies fini tes signes, l\'ampoule !', 'Le vent coupe la foudre. Révise tes bases, t\'as séché les cours ou quoi ?', 'Hé, la pile ! Ma lame de vent va te faire sauter les plombs !'],
    'foudre>terre':['Je te fais un Raïkiri-rikiki direct dans la caillasse, tête de pioche !', 'Gaarapide ou pas, ton sable va finir en verre.', 'Ton mur de pierre ? Ma foudre le traverse comme du papier de parchemin, tête de pioche !', 'Je vais t\'en mettre mille volts dans la caillasse. Ça, c\'est ma voie du ninja !', 'Un caillou contre l\'éclair ? T\'as triché à l\'examen chûnin, toi.'],
    'terre>eau':['Ta vague ? Je l\'avale comme Jiraiyaourt avale ses romans : d\'une traite et sans honte.', 'Même un clone de Kisamerde nagerait mieux que toi dans ma boue.', 'Ta vague s\'écrase sur mon rempart. Et toi tu finis en boue, petite flaque de merde !', 'Je bois ton eau comme un sol sec en été. Glou. Glou. Perdu.', 'Les clones d\'eau, c\'est mignon. Moi je suis une montagne, bordel.'],
    'eau>feu':['L\'allumette fait sa Itachiante ? Pschhht, plus de Katon, que du Kaput.', 'Je t\'éteins plus vite qu\'Orochimarre change de corps.', 'L\'allumette veut jouer ? Pschhht ! Retourne t\'entraîner avec ton sensei !', 'Ta grande boule de feu ? Moi j\'ai une grande vague. Devine qui gagne, abruti.', 'Je vais t\'éteindre si fort que tu vas fumer jusqu\'au prochain arc narratif !'],
  },
  dis:{
    'vent<feu':['Désavantage ? Pas grave. Narutrop m\'a appris à jamais abandonner. Même cuit à point.', 'Putain… chaque fois que je souffle, il grandit. C\'est pas du tout ce que mon sensei m\'avait promis !', 'Bon. Plan B : je hurle très fort et j\'espère un flashback qui me donne la puissance.'],
    'foudre<vent':['Il coupe mes éclairs comme Gaarapide coupe les conversations. Super.', 'Il coupe mes éclairs en rondelles… Je retire ce que j\'ai dit sur les rouleaux, ils mentent pas.', 'Désavantage élémentaire ? Pas grave : le héros gagne toujours au dernier chapitre. Hein ? HEIN ?'],
    'terre<foudre':['Je vais me faire griller comme le jambon-beurre de Choujihihi.', 'La foudre. Sur moi. Le caillou. Génial, je vais servir de paratonnerre à tout le village.', 'Quelqu\'un a un parchemin d\'isolation ? Non ? Fait chier.'],
    'eau<terre':['Je coule… Rock Lie m\'avait dit de faire des pompes, j\'aurais dû l\'écouter.', 'Un mur de terre… je vais finir en boue. Quelle merde. Littéralement.', 'Il m\'absorbe comme une éponge… Ma voie du ninja, c\'est de ne jamais abandonner. Même trempé.'],
    'feu<eau':['De l\'eau ?! Kakachiche, rends-moi mon Sharingant, j\'y vois plus rien !', 'De l\'eau ?! Bordel, j\'ai oublié de signer le contrat d\'invocation avec un parapluie !', 'Je vais m\'éteindre… mais pas avant d\'avoir crié mon attaque super fort !'],
  },
  same:['Même élément ? C\'est Narutrop contre Sasukeur, version budget.', 'Rivaux éternels, comme Kakachiche et Gaïgaïe. Prépare tes collants verts.', 'Même élément ? On est rivaux, alors. Je te préviens : je reviens jamais sur ma parole !', 'Deux comme nous ? Ça sent l\'arc du rival, ça. Et c\'est moi le perso principal, abruti.', 'Même chakra, même style… mais moi j\'ai plus de flashbacks tristes. J\'suis plus fort.'],
  even:['Croyez-moi, dattebaillon ! Je vais te mettre une Rasengalette !', 'Je vais te faire le coup des mille ans de souffrance. Version Kakachiche. Retourne-toi pas.', 'Multi-clonage ! …Bon, j\'en ai qu\'un. Mais il est très motivé.', 'Pas d\'avantage ? Parfait ! On règle ça avec du sang, de la sueur et des signes de main !', 'Ni chaud ni froid. Juste toi, moi, et un combat qui va durer trois chapitres.', 'Les éléments s\'en foutent. Moi j\'ai la rage de vaincre. Viens là, mon pote !', 'Je vais pas courir les bras en arrière pour rien, crois-moi !'],
  replyAdv:['T\'as la confiance d\'Orochimarre devant un nouveau corps. Ça finit mal, en général.', 'Parle moins, Narutrop. Frappe plus.', 'Cause toujours, petit genin. Le dernier qui m\'a dit ça faisait la vaisselle à l\'Académie.', 'Ouais ouais, tous les méchants disent ça avant leur flashback.', 'Ta gueule et forme tes signes.'],
  replyDis:['Je crois que je vais faire un Hinatatouille dans mon coin.', 'Je peux invoquer Jiraiyaourt en renfort ? Non ? Bon.', '…Merde. Je peux appeler mon sensei ?', 'Attends, je dois aller acheter des ramen, là, tout de suite.', 'C\'est… c\'est pas grave. Je vais débloquer un nouveau pouvoir. Probablement.'],
};
// bulle de dialogue au-dessus d'un compagnon du duel (une seule bulle par côté)
function cpSay(side, txt, cls = '', lab = '', ms = 2600) {
  const host = document.getElementById('cps' + side); if (!host || !V.fight || FX_OFF()) return;
  document.querySelectorAll('.taunt.s' + side).forEach(x => x.remove());
  const r = host.getBoundingClientRect(), b = document.createElement('div');
  b.className = 'taunt s' + side + ' ' + (side ? 'th ' : 'me ') + cls; b.innerHTML = (lab ? `<small>${esc(lab)}</small>` : '') + esc(txt);
  b.style.left = (r.right + 8) + 'px'; b.style.top = (r.top + r.height * .25) + 'px';
  document.body.appendChild(b); setTimeout(() => { b.classList.add('out'); setTimeout(() => b.remove(), 300); }, ms);
}
// joute verbale pendant le duel
const BANTER = {
  hit:['Et ÇA, c\'est pour mon sensei !', 'Tu l\'as pas vu venir, hein ? Moi non plus, j\'avais les yeux fermés.', 'Technique secrète : la baffe ! Interdite dans trois villages.', 'Sens ce chakra, crétin ! Enfin… surtout sens mon poing.', 'Ça, c\'est pas un clone. Ça, c\'est la vraie douleur.', 'Rasengalette ! Avec supplément beurre salé !', 'Un coup pour chaque bol de ramen que tu m\'as pas payé !', 'Je l\'ai répétée trois épisodes de remplissage, celle-là !', 'Oups. J\'ai encore oublié de crier le nom de mon attaque.'],
  hurt:['Aïe ! Bordel, c\'était pas dans le script !', 'Ça… ça chatouille. Si si. Je pleure pas, c\'est la fumée.', 'Pas grave, je vais débloquer un nouveau pouvoir dans un flashback.', 'Tu frappes comme Narutrop au premier chapitre !', 'Merde, il est sérieux, lui.', 'C\'est pas juste ! J\'avais pas fini ma pose dramatique !', 'Kakachiche, si tu me regardes, c\'est le moment d\'intervenir.', 'Ça va laisser une cicatrice stylée au moins ?'],
  shield:['Hé hé ! Bouclier ! Tu croyais quoi, Gaarapide ?', 'Raté ! Mon sable… enfin ma bulle… enfin bref, raté !'],
  ko:['Je… reviendrai… au prochain arc…', 'Dites à ma mère… que j\'ai jamais rangé mes rouleaux…', 'C\'était… un genjutsu… pas vrai ?', 'Itachiant… jusqu\'au bout…'],
  win:['Victoire ! Croyez-moi, dattebaillon !', 'Et c\'est comme ça qu\'on devient Hokagrue !', 'Trop facile. Je vais quand même dramatiser ça en flashback.', 'Ramen pour tout le monde ! C\'est le perdant qui paie.'],
  draw:['Match nul ? On dirait la fin d\'une saison sans budget.', 'On reprendra ça au prochain chapitre, rival.'],
};
const bPick = (k, n) => BANTER[k][Math.abs(n) % BANTER[k].length];
function duelBanter(F, fr, prevFr) {
  if (!F || !F.dr || !prevFr || V.duelChat === F.seed + ':' + V.di) return; V.duelChat = F.seed + ':' + V.di;
  const n = (F.seed || 0) + V.di * 7, sideOf = s => s === F.me ? 0 : 1;   // 0 = mon compagnon (bas), 1 = adverse
  for (const s of [0, 1]) {
    const before = {}, now = {}; prevFr.s[s].forEach(x => before[x.u] = x); fr.s[s].forEach(x => now[x.u] = x);
    for (const u in before) { const b = before[u], a = now[u];
      if (!a) { cpSay(sideOf(s), bPick('ko', n + s), 'dis'); if (fr.s[1 - s].length) cpSay(1 - sideOf(s), bPick('win', n + 3), 'adv'); return; }
      if (a.h < b.h) { cpSay(sideOf(s), bPick('hurt', n + s), ''); setTimeout(() => cpSay(1 - sideOf(s), bPick('hit', n + 5), ''), 700); return; }
      if ((b.f || '').includes('s') && !(a.f || '').includes('s')) { cpSay(sideOf(s), bPick('shield', n), 'adv'); return; } }
  }
}
function duelTaunt(F) {
  if (!F || !F.duel || FX_OFF()) return;
  const mine = (F.me ? F.duel.b : F.duel.a)[0], th = (F.me ? F.duel.a : F.duel.b)[0]; if (!mine || !th) return;
  const em = mine.el || CLAN_EL[CD(mine.c).tr], et = th.el || CLAN_EL[CD(th.c).tr]; if (!em || !et) return;
  const pick = (L, k) => L[Math.abs(((F.seed || 1) >> k) + k) % L.length];
  let me, them;
  if (em === et) { me = pick(TAUNT.same, 1); them = pick(TAUNT.replyAdv, 3); }
  else if (EL_DOM[em] === et) { me = pick(TAUNT.adv[em + '>' + et] || TAUNT.even, 1); them = pick(TAUNT.replyDis, 2); }
  else if (EL_DOM[et] === em) { me = pick(TAUNT.dis[em + '<' + et] || TAUNT.even, 1); them = pick(TAUNT.replyAdv, 2); }
  else { me = pick(TAUNT.even, 1); them = pick(TAUNT.even, 4); if (them === me) them = pick(TAUNT.replyAdv, 5); }
  const tag = EL_DOM[em] === et ? ['adv', 'Avantage ' + ELS[em].n] : EL_DOM[et] === em ? ['dis', 'Désavantage ' + ELS[em].n] : ['eq', ELS[em].n + ' contre ' + ELS[et].n];
  const say = (side, txt, d, cls, lab) => setTimeout(() => cpSay(side, txt, cls, lab, 3000), d);
  say(0, me, 150, tag[0], tag[1]); say(1, them, 1500, '', '');
}
function stepDuel() {
  const F = V.fight; if (!F || !F.dr) return;
  clearTimeout(V.duelT);
  duelPaint(); duelFx();
  const D = F.dr.frames, last = D.length - 1;
  if (V.di > 0) duelBanter(F, D[V.di], D[V.di - 1]);
  if (V.di >= last && F.duel && F.duel.w === -1) cpSay(0, bPick('draw', F.seed || 0), 'eq');
  if (V.di >= last) { F.ddone = true; duelPaint(); const el = document.getElementById('cps0'); if (el && !FX_OFF()) { const r = el.querySelector('.mn').getBoundingClientRect(), w = duelRes(F) === 'win'; fxRing(r.left + r.width / 2, r.top + r.height / 2, w ? '#ffe39a' : '#9ab0c8', 1.4); if (w) fxBurst(r.left + r.width / 2, r.top + r.height / 2, 'buff', 14, 1.1); } return; }
  const fr = D[V.di];
  V.duelT = setTimeout(() => {
    if (V.fight !== F) return;
    if (fr.at) { const t = duelLunge(fr); V.duelT = setTimeout(() => { V.di++; stepDuel(); }, t); }
    else if (fr.fb) { V.duelT = setTimeout(() => { V.di++; stepDuel(); }, 420); }
    else { V.di++; stepDuel(); }
  }, V.di === 0 ? 300 : 1100);
}
const duelTok = u => document.querySelector(`.cp-side [data-u="${u}"]`);
function duelLunge(fr) {
  const a = duelTok(fr.at), t = duelTok(fr.tg); if (!a || !t || FX_OFF()) return 160;
  const ra = a.getBoundingClientRect(), rt = t.getBoundingClientRect(), dx = (rt.left - ra.left) * .82, dy = (rt.top - ra.top) * .82;
  // un double du jeton fait l'attaque au-dessus de la page : le rendu du combat des plateaux ne peut pas l'interrompre
  const cl = a.cloneNode(true); cl.removeAttribute('data-u'); cl.classList.add('duel-ghost'); cl.style.cssText = `position:fixed;left:${f1(ra.left)}px;top:${f1(ra.top)}px;width:${f1(ra.width)}px;--tw:${f1(ra.width)}px;z-index:80;pointer-events:none;margin:0`;
  document.body.appendChild(cl); V.dHide = fr.at; a.classList.add('dhide');
  const an = cl.animate([{ transform:'none' }, { transform:`translate(${f1(-dx * .07)}px,${f1(-dy * .07)}px) scale(1.12)`, offset:.4 }, { transform:`translate(${f1(dx)}px,${f1(dy)}px) scale(1.05)` }, { transform:'none' }], { duration:620, easing:'cubic-bezier(.5,0,.5,1)' });
  an.onfinish = an.oncancel = () => { cl.remove(); V.dHide = null; const o = duelTok(fr.at); if (o) o.classList.remove('dhide'); };
  setTimeout(() => { const r = t.getBoundingClientRect(); if (!FX_OFF()) { fxRing(r.left + r.width / 2, r.top + r.height / 2, '#fff1c8', 1); fxBurst(r.left + r.width / 2, r.top + r.height / 2, 'hit', 12); } }, 380);
  return 640;
}
function duelFx() { document.querySelectorAll('.cp-side .mn.dead').forEach(el => { const r = el.getBoundingClientRect(); if (!FX_OFF() && !el.dataset.fxd) { el.dataset.fxd = 1; fxBurst(r.left + r.width / 2, r.top + r.height * .45, 'shard', 14); } }); }
// en combat : les deux compagnons face à face, dans la même colonne, chacun à la hauteur de sa rangée
// après l'Éveil : les cartes prennent l'effet de l'élément qui a le plus de marqueurs (braises = Feu, marée = Eau, charge = Foudre)
function awkElCls(me) { if (!me || !me.bd) return ''; const n = {}; me.bd.forEach(m => { const e = CLAN_EL[CD(m.c).tr]; if (e) n[e] = (n[e] || 0) + 1; }); const top = Object.keys(n).sort((a, b) => n[b] - n[a])[0]; return top ? ' awk-' + top + (n[top] >= 4 ? ' awk-hi' : '') : ''; }
// l'Éveil : grande annonce plein écran, une seule fois
const awkKey = () => (V.pub.code || '') + ':' + V.pub.ev;
// l'annonce de l'Éveil est en attente (ou affichée) : on cache le reste, coffre compris, jusqu'au clic
function awkPending() { return V.screen === 'game' && V.pub && V.pub.ph === 'recruit' && awakeUI() && (V.pub.laws || []).some(l => l.k === 'chakra') && V.awkDone !== awkKey(); }
function awkWatch() {
  if (!awkPending() || document.querySelector('.awk-fx')) return;
  const key = awkKey(); V.awkSeen = key;
  const el = document.createElement('div'); el.className = 'awk-fx'; el.setAttribute('role', 'dialog'); el.tabIndex = 0;
  el.innerHTML = `<div class="awk-in"><span class="awk-rays"></span><small>La moitié des ninjas vacillent</small><b>Éveil</b><p>Les clans libèrent leur pouvoir · ton compagnon s'éveille · ton héros se renforce · tes techniques gagnent leur effet d'Éveil</p><button class="awk-go">Continuer</button></div>`;
  const close = () => { if (V.awkDone === key) return; V.awkDone = key; el.classList.add('out'); setTimeout(() => el.remove(), 300); render(); };
  el.addEventListener('click', close); el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') close(); });
  document.body.appendChild(el); el.focus();
}
window.addEventListener('resize', () => { clearTimeout(V.rzT); V.rzT = setTimeout(() => { placeDuelCol(); }, 60); });
document.addEventListener('fullscreenchange', () => setTimeout(() => { if (V.screen === 'game') render(); }, 120));
function placeDuelCol() {
  const col = document.querySelector('.duel-col'), tb = document.querySelector('.table'); if (!col || !tb) return;
  const T = tb.getBoundingClientRect(), bz = document.querySelector('.board-zone'), top = document.querySelector('.counter-line'), mine = document.getElementById('bdrow');
  if (!bz || !top || !mine) return;
  const x = bz.getBoundingClientRect().left - T.left + 14, cy = el => { const r = el.getBoundingClientRect(), tk = el.querySelector('.mn:not(.dying)'); if (!tk) return r.top - T.top + r.height / 2; let o = 0, n = tk; while (n && n !== el) { o += n.offsetTop; n = n.offsetParent; } if (n !== el) o = tk.offsetTop; return r.top - T.top + Math.min(r.height / 2, o + tk.offsetHeight * .45); };   // position de mise en page (sans l'élan des attaques)
  const a = document.getElementById('cps1'), b = document.getElementById('cps0'), vs = col.querySelector('.duel-vs');
  [[a, cy(top)], [b, cy(mine)]].forEach(([el, y]) => { if (el) { el.style.left = x + 'px'; el.style.top = y + 'px'; } });
  if (vs && a && b) { const ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect(); vs.style.left = (ra.left - T.left + ra.width / 2 - 7) + 'px'; vs.style.top = ((ra.bottom + rb.top) / 2 - T.top) + 'px'; }
}
function cpSideH(me, F, side) {
  let list = [me.cp].concat(me.bst ? [me.bst] : []), lab = `Compagnon · niv. ${compLv(me.cp)}${me.bst ? ' + bête' : ''}`, cls = '';
  const fx = {};   // u -> [classe, extra]
  if (F && F.duel) {
    const mine = F.me ? F.duel.b : F.duel.a, theirs = F.me ? F.duel.a : F.duel.b, r = (F.dr ? F.ddone : F.done) ? duelRes(F) : null;
    list = (side ? theirs : mine).slice(); if (!list.length) return '';
    if (F.dr) {   // état animé du duel
      const D = F.dr.frames, i = Math.min(V.di || 0, D.length - 1), sd = (side ? 1 - F.me : F.me);
      const now = {}, bef = {}; D[i].s[sd].forEach(x => now[x.u] = x); if (i > 0) D[i - 1].s[sd].forEach(x => bef[x.u] = x);
      list = list.map(m => { const cur = now[m.u], prev = bef[m.u];
        if (!cur) { fx[m.u] = ['dead', '']; return Object.assign({}, m, { h:0 }); }
        if (prev && cur.h < prev.h) fx[m.u] = ['hit', `<span class="dmg"><b>-${prev.h - cur.h}</b></span>`];
        return Object.assign({}, m, { a:cur.a, h:cur.h, f:cur.f }); });
    }
    lab = side ? 'Compagnon adverse' : r ? (r === 'win' ? 'Duel gagné · coffre majeur' : r === 'loss' ? 'Duel perdu · coffre mineur' : 'Égalité · coffre mineur') : 'Duel des compagnons';
    cls = r ? (side ? (r === 'win' ? ' loss' : r === 'loss' ? ' win' : '') : ' ' + r) : '';
  }
  const toks = list.map((m, k) => { const [tc, ex] = fx[m.u] || ['', ''];
    return tokenH(m, side ? 'duelb' : 'cp', k, { cls:'cp-tok' + (k ? ' bst-tok' : '') + (m.awk ? ' awk' : '') + (tc ? ' ' + tc : '') + (V.dHide != null && V.dHide === m.u ? ' dhide' : '') }).replace(/<\/div>$/, ex + '</div>'); }).join('');
  const elPick = !F && !side && me.cp && V.pub && V.pub.ph === 'recruit' ? `<span class="cp-els" aria-label="Fixer l'élément du compagnon (2 chakra)">${['feu', 'vent', 'foudre', 'terre', 'eau'].map(e => `<button class="cp-el${compEl(me.cp) === e ? ' on' : ''}" style="--c:${ELS[e].col}" data-act="cpel" data-el="${e}" ${compEl(me.cp) === e || (me.ck || 0) < 2 ? 'disabled' : ''} title="${esc('Élément ' + ELS[e].n + ' : résonne avec tes ' + MK_N[e].toLowerCase() + ' (' + ((me[MK[e]]) || 0) + '). Fixer coûte 2 chakra.')}"><svg viewBox="-12 -12 24 24">${EL_ICON[e]}</svg></button>`).join('')}</span>` : '';
  return `<div class="cp-side${cls}${list.length > 1 ? ' two' : ''}" id="cps${side}" aria-label="${esc(lab)}"><span class="cp-toks">${toks}</span>${elPick}<small>${esc(lab)}</small></div>`;
}
function cpSlotH(me, F) {
  const lv = compLv(me.cp);
  if (F && F.duel) {
    const mine = F.me ? F.duel.b : F.duel.a, theirs = F.me ? F.duel.a : F.duel.b, r = F.done ? duelRes(F) : null;
    const tk = (m, k) => m ? tokenH(m, 'duel', k, { cls:'cp-tok' }) : '<span class="cp-none">—</span>';
    return `<div class="cpz duel${r ? ' ' + r : ''}" aria-label="Duel des compagnons"><b class="cpz-h">Duel des compagnons</b><div class="cpz-row">${tk(mine[0], 0)}<span class="vs">VS</span>${tk(theirs[0], 1)}</div><small>${r ? (r === 'win' ? 'Gagné · coffre majeur' : r === 'loss' ? 'Perdu · coffre mineur' : 'Égalité · coffre mineur') : 'Le gagnant ouvre un coffre majeur'}</small></div>`;
  }
  return `<div class="cpz" aria-label="Ton compagnon"><b class="cpz-h">Compagnon</b>${tokenH(me.cp, 'cp', 0, { cls:'cp-tok' })}<small>Niveau ${lv} · hors plateau</small></div>`;
}
function compMedal(canAct, own) {
  const me = V.me, id = me.cid; if (!id || !C[id]) return '';
  const lim = compLimit(me.rd || 0), cb = me.cb || 0, c = C[id];
  const label = cb >= 3 ? 'Complet' : cb >= lim ? (cb === 0 ? 'Manche 3' : cb === 1 ? 'Manche 5' : 'Manche 6') : 'Recruter';
  const trip = (own[id] || 0) >= 2 && cb < 3 && cb < lim;
  const ok = canAct && cb < lim && cb < 3 && me.g >= 3 && me.hd.length < 10;
  return `<button class="compm${trip ? ' tripok' : ''}" data-act="comp" ${ok ? '' : 'disabled'} aria-label="${esc(c.n + ' : ' + fxText((c.fx || [])[0] || {}))}">${faceH('art-' + id, 'face cf')}<span class="pcost">3</span><small>${label} · ${cb}/3</small></button>`;
}
function famH(d) {
  if (!d.trs) return '';
  const chip = t => `<i style="--c:${esc((TRIBES[t] || {}).col || '#888')}">${esc(trName(t) || t)}</i>`;
  return `<div class="fams">${d.univ && d.univ.length ? `<span class="fu">Univers : <b>${d.univ.map(esc).join(' · ')}</b></span>` : ''}<span class="fl">Familles en jeu</span><span class="trs">${d.trs.map(chip).join('')}</span>${d.ban && d.ban.length ? `<span class="fl">Bannies</span><span class="trs ban">${d.ban.map(chip).join('')}</span>` : ''}</div>`;
}
function compBtnH(canAct, own) {
  const me = V.me, id = me.cid; if (!id || !C[id]) return '';
  const lim = compLimit(me.rd || 0), cb = me.cb || 0, c = C[id];
  const label = cb >= 3 ? 'Les 3 sont recrutés' : cb >= lim ? (cb === 0 ? 'Dès la manche 3' : cb === 1 ? '2e dès la manche 5' : '3e dès la manche 6') : `Recruter · 3 or`;
  const trip = (own[id] || 0) >= 2 && cb < 3;
  const ok = canAct && cb < lim && cb < 3 && me.g >= 3 && me.hd.length < 10;
  return `<button class="compb${trip && cb < lim ? ' tripok' : ''}" data-act="comp" ${ok ? '' : 'disabled'} title="${esc(fxText((c.fx || [])[0] || {}))}">${faceH('art-' + id)}<span><b>${esc(c.n)}</b><small>${label} · ${cb}/3${trip ? ' · Triple !' : ''}</small></span></button>`;
}
function detailH(canAct) {
  const me = V.me, s = V.sel;
  if (!s) {
    if (me.res) { const r = me.res; return `<p class="tip">Dernier combat contre <b>${esc(r.o)}</b> : ${r.r === 'win' ? `victoire, ${r.d} dégâts infligés.` : r.r === 'loss' ? `défaite, ${r.d} dégâts subis.` : 'égalité, personne ne perd de vie.'}</p>`; }
    return '<p class="tip">Touche un serviteur ou un sort pour l\'acheter, le jouer ou le vendre. Sur ordinateur, glisse-le : <b>taverne → main</b> pour acheter, <b>main → plateau</b> pour jouer, <b>plateau → taverne</b> pour vendre.</p>';
  }
  if (s.z === 'ss' || (s.z === 'hd' && me.hd[s.i] && me.hd[s.i].sp)) {
    const id = s.z === 'ss' ? (s.i === 1 ? me.sp2 : me.sp) : me.hd[s.i].sp; if (!id) return '';
    const S = SPELLS[id];
    let acts = '';
    if (canAct && s.z === 'ss') { const c = me.spc != null ? me.spc : S.c;
      acts = `<button class="btn pri" data-act="buysp" data-k="${s.i || 0}" ${me.g < c || me.hd.length >= 10 ? 'disabled' : ''}>Acheter · ${c} or</button>`; }
    if (canAct && s.z === 'hd') acts = S.tg ? `<button class="btn pri" data-act="aim" ${me.bd.length ? '' : 'disabled'}>Lancer sur un serviteur</button>` : `<button class="btn pri" data-act="cast">Lancer le sort</button>`;
    return `<div class="det">${spellCardH(id, 'd', 0)}<div class="det-s"><b>${esc(S.n)}</b><span class="meta">Sort · ${esc(SP_TYPES[S.ty].n)} · ${s.z === 'ss' ? 'sur l\'étagère de la taverne' : 'dans ta main'}</span><div class="acts">${acts}</div></div></div>`;
  }
  const z = s.z === 'sh' ? me.sh : s.z === 'bd' ? me.bd : me.hd, m = z[s.i]; if (!m) return '';
  const b = CD(m.c);
  let acts = '';
  if (canAct) {
    if (s.z === 'sh') acts = `<button class="btn pri" data-act="buy" ${me.g < 3 || me.hd.length >= 10 ? 'disabled' : ''}>Acheter · 3 or</button>`;
    if (s.z === 'hd') acts = `<button class="btn pri" data-act="play" ${me.bd.length >= 7 ? 'disabled' : ''}>Jouer sur le plateau</button>`;
    if (s.z === 'bd') acts = `<button class="btn" data-act="mvl" ${s.i === 0 ? 'disabled' : ''} aria-label="Déplacer à gauche">◀</button><button class="btn" data-act="mvr" ${s.i >= me.bd.length - 1 ? 'disabled' : ''} aria-label="Déplacer à droite">▶</button><button class="btn" data-act="sell">Vendre · +${sellValue(m)} or</button>`;
  }
  const where = s.z === 'sh' ? 'Dans la taverne' : s.z === 'bd' ? `Sur ton plateau, position ${s.i + 1}` : 'Dans ta main';
  return `<div class="det">${cardH(m, 'd', 0)}<div class="det-s"><b>${esc(b.n)}${m.g ? ' doré' : ''}</b><span class="meta">${where}${m.tr ? ' · joue-le pour recevoir un serviteur de niveau supérieur' : ''}</span><div class="acts">${acts}</div></div></div>`;
}

// choix du héros : trois médaillons, on en met un en avant puis on le porte
/* ===== choix du héros (univers Ninja) : héros à gauche, règles illustrées en onglets à droite ===== */
const RULE_TABS = [['tour', 'Le tour'], ['ck', 'Chakra et éveil'], ['sort', 'Sorts et réservoir'], ['hero', 'Héros et quêtes'], ['vil', 'Villages']];
function ruleTabH(k) {
  const el = e => `<i class="rl-el" style="--c:${ELS[e].col}"><svg viewBox="-12 -12 24 24">${EL_ICON[e]}</svg></i>`;
  const step = (n, t, x, vis) => `<li class="rl-step"><span class="rl-n">${n}</span><span class="rl-v">${vis || ''}</span><span><b>${t}</b><small>${x}</small></span></li>`;
  const coin = '<i class="rl-coin"></i>', ck = ckMarkH('', 'rl-ck');
  switch (k) {
    case 'tour': return `<ol class="rl-steps">
      ${step(1, 'Recrute', `Achète des ninjas à la taverne (3 ${coin}), place-les sur ton plateau, monte de niveau pour en trouver de plus forts. Tu gagnes un peu plus d'or à chaque manche.`, faceH('art-n_f1'))}
      ${step(2, 'Triples', 'Trois exemplaires d\'une même créature (jetons compris) fusionnent en une version dorée : stats additionnées, et une carte de niveau supérieur en récompense.', '<span class="rl-pow">✦</span>')}
      ${step(3, 'Chakra, sorts, pouvoir', 'Dépense ton chakra : éveille tes serviteurs, lance tes sorts. Utilise le pouvoir de ton héros (en or, en chakra, ou passif).', ck)}
      ${step(4, 'Début du combat', 'Les effets de Début du combat des deux camps et les dégâts préparés se déclenchent tous avant qu\'une créature ne meure.', '<span class="rl-pow">⚡</span>')}
      ${step(5, 'Combat', 'Tes serviteurs attaquent de gauche à droite ; chaque attaquant subit aussi l\'attaque du défenseur. Le perdant prend des dégâts à son héros. Le dernier héros debout gagne.', '<span class="rl-vs">VS</span>')}
    </ol>`;
    case 'ck': return `<div class="rl-p">
      <p><b>Chakra</b> : au début de chaque tour, chaque ninja de ton plateau te donne 1 ${ck}, jusqu'à 10. Le chakra non dépensé reste d'un tour à l'autre.</p>
      <p><b>Éveil d'un serviteur</b> : la goutte bleue au-dessus de certains serviteurs indique un coût. Paie-le <b>une seule fois</b> : le serviteur gagne autant d'attaque et de vie, puis son effet d'éveil se déclenche <b>gratuitement au début de chaque tour</b>. Une aura brille autour de lui.</p>
      <ul class="rl-ul"><li>Konoha : dégâts au prochain combat.</li><li>Suna : invoque un Kugutsu.</li><li>Kiri : Bouclier divin à un allié.</li><li>Kumo : se renforce.</li><li>Iwa : renforce la vie d'un allié.</li></ul>
      <p>Le chakra paie aussi les <b>sorts</b> et le pouvoir de certains héros.</p></div>`;
    case 'hero': {
      const mcs = Object.entries(NJ_MC).map(([k, [n, c]]) => `<i style="--c:${c}">${esc(n)}</i>`).join('');
      return `<div class="rl-p">
      <p>Les héros n'appartiennent à <b>aucun village</b> : chacun renforce une <b>mécanique</b>, quel que soit le village de tes serviteurs.</p>
      <div class="rl-mcs">${mcs}</div>
      <ul class="rl-ul"><li><b>Pouvoir</b> : payé en or, en chakra (goutte bleue), ou passif. Un pouvoir actif remplit aussi une moitié du réservoir avec ton village le plus présent.</li>
      <li><b>Bonus</b> : beaucoup de héros ont un petit effet passif en plus, qui distingue les deux héros d'une même mécanique.</li>
      <li><b>Quête d'éveil</b> : une barre sous ton portrait suit ta progression (ex. « Former un triple de jetons », « Lancer 6 sorts »).</li>
      <li><b>Éveil du héros</b> : quête accomplie, le héros prend sa forme éveillée, son pouvoir est <b>remplacé par un nouveau</b> (utilisable aussitôt) et son portrait se pare d'un cadre doré.</li></ul>
      <p class="rl-hint">Survole un héros pour voir son pouvoir, sa quête et son éveil.</p></div>`; }
    case 'vil': return `<div class="rl-p">${chakraLawH(true)}
      <ul class="rl-ul"><li><b>Pacte</b> : des invocateurs font apparaître des animaux (crapaud, limace, serpent, requin).</li><li><b>Sceaux</b> : +1/+1 par sceau ; à 5 sceaux, Bouclier divin.</li><li><b>Sacrifice</b> : des Râles d'agonie qui renforcent ou blessent.</li><li><b>Économie</b> : or au début du tour ou à la vente.</li><li><b>Sorts</b> : serviteurs qui grandissent quand tu lances un sort.</li></ul></div>`;
    case 'sort': {
      const chip = (a, b, F) => `<li class="rl-cb" style="--c:${F.col}"><span class="rl-cbe">${el(a)}${el(b)}</span><span><b>${esc(F.n)}</b><small>${esc(((COMBO_BD[F.n] || [''])[0]).replace(/^[^:]+ : /, ''))}</small></span></li>`;
      const vn = e => { const t = Object.keys(CLAN_EL).find(k => CLAN_EL[k] === e); return t && TRIBES[t] ? TRIBES[t].n : ELS[e].n; };
      const fus = Object.entries(FUSIONS).map(([kk, F]) => { const [a, b] = kk.split('+'); return chip(a, b, F); }).join('');
      const pur = Object.entries(PURES).map(([e, F]) => chip(e, e, F)).join('');
      return `<div class="rl-p">
        <ul class="rl-ul"><li><b>Acheter</b> : chaque sort coûte <b>1 or</b> à la taverne. Un 2e emplacement de sort, à droite du premier, s'ouvre au <b>niveau 4</b>.</li>
        <li><b>Lancer</b> : de 1 à 6 ${ck} chakra selon le sort. Chaque village a 4 sorts, dont un <b>rare</b> au niveau 6 ; les 5 sorts <b>neutres</b> n'ont pas de village.</li></ul>
        <div class="rl-rsv"><span class="rl-scroll big"><i style="background:#ff7a2a"></i><i></i></span><span>→</span><span class="rl-scroll big"><i style="background:#ff7a2a"></i><i style="background:#c8a878"></i></span><span>→</span><b class="rl-boom">Combo !</b></div>
        <p>Un <b>sort de village</b> remplit une moitié du <b>réservoir</b> avec son village ; un <b>pouvoir de héros actif</b>, avec ton village le plus présent sur le plateau (les sorts neutres ne le remplissent pas). La 2e moitié remplie déclenche un <b>combo</b> qui renforce les deux villages concernés, puis le réservoir se vide. La moitié remplie reste d'un tour à l'autre.</p>
        <p>Deux fois le même village : son <b>ultime</b>. Les combos sont <b>×1</b> aux niveaux 1–2, <b>×2</b> aux niveaux 3–4, <b>×3</b> aux niveaux 5–6. Les serviteurs <b>kekkei genkai</b> (deux villages) grandissent quand un combo touche l'un de leurs villages.</p>
        <h4 class="rl-h4">Ultimes</h4><ul class="rl-cbs">${pur}</ul>
        <h4 class="rl-h4">Combos de deux villages</h4><ul class="rl-cbs">${fus}</ul>
      </div>`; }
    case 'tech': {
      const pairs = Object.entries(FUSIONS).map(([kk, F]) => { const [a, b] = kk.split('+'); return `<i style="--c:${F.col}">${el(a)}${el(b)}<b>${esc(F.n)}</b></i>`; }).join('') + Object.entries(PURES).map(([e, F]) => `<i style="--c:${F.col}">${el(e)}${el(e)}<b>${esc(F.n)}</b></i>`).join('');
      return `<div class="rl-p"><p>Chaque technique a une <b>nature</b> : ${['feu', 'vent', 'eau', 'foudre', 'terre'].map(el).join('')}. Celles de l'élément de ton héros coûtent <b>1 chakra de moins</b>.</p>
        <div class="rl-rsv"><span class="rl-scroll big"><i style="background:#4ab0e8"></i><i></i></span><span>→</span><span class="rl-scroll big"><i style="background:#4ab0e8"></i><i style="background:#ff7a2a"></i></span><span>→</span><b class="rl-boom">Combo !</b></div>
        <p>La 1re technique remplit une moitié du <b>réservoir</b>, la 2e l'autre : le mélange déclenche un <b>combo</b> (effet sur ton plateau), puis le réservoir se vide. Deux fois le même élément : <b>combo pur</b>. La moitié remplie reste d'un tour à l'autre.</p>
        <ul class="rl-ul"><li><b>Katon · Kinjutsu</b> : se paient en PV du héros au lieu du chakra.</li><li><b>Suiton · Rouleaux</b> : utilisables 2 fois.</li><li><b>Raiton · Combiné</b> : bonus si tu as déjà lancé une technique d'une autre nature ce tour.</li><li><b>Doton · Mode ermite</b> : bonus si ton chakra est plein ou si tu n'as rien dépensé au tour précédent.</li><li><b>Hiden</b> (1 par clan) : il faut 3 serviteurs du clan. <b>Henge</b> : transforme un serviteur en un de son clan d'un niveau plus haut.</li></ul>
        <div class="njl-combos">${pairs}</div></div>`; }
    case 'comp': return `<div class="rl-p"><div class="rl-duel">${faceH('art-c_nj_glaces')}<span class="rl-vs">VS</span>${faceH('art-c_nj_kurama')}</div>
      <p>Ton compagnon est <b>déjà en jeu, doré</b>, à côté de ton plateau. Il ne combat que le <b>compagnon adverse</b> et ne blesse jamais le héros.</p>
      <ul class="rl-ul"><li><b>Frappe en premier</b> : un compagnon abattu ne riposte pas. Nul seulement si les deux tombent ensemble.</li>
      <li><b>Élément</b> : celui de ta dernière technique, ou fixé pour 2 ${ck}. Il résonne avec tes marqueurs : <b>+1/+1 par 3 marqueurs</b> de son élément. Petit avantage (+2/+2) s'il domine celui d'en face.</li>
      <li><b>Croissance</b> : par les coffres et chaque combo. L'expérience débloque un pouvoir aux niveaux 3 et 5.</li>
      <li>Duel gagné : <b>coffre majeur</b> et +2 marqueurs de son élément.</li></ul></div>`;
    case 'coffre': return `<div class="rl-p"><p>Après chaque combat, un coffre du niveau de ta taverne : <b>majeur</b> si ton compagnon gagne le duel, <b>mineur</b> sinon. Tu dois choisir <b>1 récompense sur 3</b>.</p>
      <div class="njl-rar">${RARS.map((R, i) => `<i style="--c:${R.col}">${R.n} · ${i + 1} chakra</i>`).join('')}</div>
      <ul class="rl-ul"><li><b>Pièces</b> du compagnon : lame, armure, bandeau, gantelets, talisman.</li><li><b>Parchemins de pacte</b> : préparent la bête d'invocation de l'Éveil.</li><li><b>Sceaux de clan</b> : des marqueurs en plus.</li><li><b>Techniques</b> ninja.</li></ul>
      <p>La récompense va dans l'<b>inventaire</b> (en bas à gauche) : pose-la avec du chakra quand tu veux.</p></div>`;
    case 'mk': return `<div class="rl-p"><div class="rl-mks">${['feu', 'vent', 'eau', 'foudre', 'terre'].map(e => `<span style="--c:${MK_COL[e]}">${el(e)}<b>${MK_N[e]}</b></span>`).join('')}</div>
      <ul class="rl-ul"><li><b>Gain</b> : +1 par technique de leur nature, serviteurs du clan, .</li>
      <li><b>Paliers</b> à 5, 10 et 20 marqueurs gagnés : tes serviteurs du clan gagnent des stats en combat, puis un mot-clé.</li>
      <li><b>Éclat</b> : chaque combo consomme 5 marqueurs de chacun de ses éléments pour un effet en plus.</li>
      <li><b>Pureté</b> : 5 serviteurs d'un même clan donnent +1 chakra par tour et doublent les marqueurs gagnés.</li></ul>
      <p class="rl-hint">Ils tournent en orbes autour de ton héros.</p></div>`;
    case 'eveil': return `<div class="rl-p"><p class="rl-awk">Quand <b>la moitié des ninjas en vie sont à 20 PV ou moins</b> (ou qu'il n'en reste que 3), tout le monde s'éveille au tour suivant :</p>
      <ul class="rl-ul"><li><b>Clans</b> : pouvoir ultime (Phénix, Ouragan, Raz-de-marée, Orage total, Avalanche).</li>
      <li><b>Héros</b> : pouvoir renforcé.</li>
      <li><b>Techniques</b> : chacune gagne son effet d'Éveil ; des techniques interdites apparaissent.</li>
</ul></div>`;
  }
  return '';
}
// relance d'un héros : 3 par partie, sur n'importe lequel des héros proposés
const rollH = (me, i) => `<span class="h-roll${(me.hrr || 0) > 0 ? '' : ' off'}" role="button" tabindex="0" data-act="hroll" data-i="${i}" aria-label="Relancer ce héros" data-tip="${(me.hrr || 0) > 0 ? 'Relancer ce héros (' + me.hrr + ' restante' + (me.hrr > 1 ? 's' : '') + ')' : 'Plus de relance'}">${icon('roll')}</span>`;
const rollInfoH = me => `<p class="h-rolls">${icon('roll')} Relances : ${Array.from({ length:me.hrm || 3 }, (_, k) => `<i class="${k < (me.hrr || 0) ? 'on' : ''}"></i>`).join('')}<small>clique sur ${icon('roll')} pour changer un héros</small></p>`;
// choix du héros façon auto-battler : grands portraits en rangée, pouvoir en médaillon sous chaque héros
function heroPickRowH(d, me) {
  const nin = (d.laws || []).some(l => l.k === 'chakra'), sel = me.ho.includes(V.heroSel) ? V.heroSel : null;
  const pcs = [];
  const card = (h, i) => { const x = HEROES[h], on = h === sel, cid = compOf(h) || COMPANIONS[h], c = cid && C[cid], el = x.clan, vt = (x.fam || [])[0], col = x.mc && NJ_MC[x.mc] ? NJ_MC[x.mc][1] : el && ELS[el] ? ELS[el].col : TRIBES[vt] && TRIBES[vt].col || '#d8a84a';
    const pw = x.pwn || (x.cost ? 'Pouvoir héroïque' : 'Pouvoir passif'), cap = t => (t || '').charAt(0).toUpperCase() + (t || '').slice(1);
    const main = (x.trx ? x.tx.replace(' Bonus : ' + x.trx, '') : x.tx || '').replace(/^Passif : /, '');
    const gem = x.cost ? (nin && x.pay !== 'g' ? `<span class="hpc-gem ck">${ckMarkH(x.cost)}</span>` : `<span class="hpc-gem g"><b>${x.cost}</b></span>`) : '<span class="hpc-gem p"><b>∞</b></span>';
    const A = x.aw;
    pcs[i] = `<div class="hp-pc k${i}${on ? ' on' : ''}" style="--c:${col}">
        ${powBannerH(x, h, nin)}
        <div class="hpc-side">${x.mc && NJ_MC[x.mc] ? `<span class="hpc-mc" style="--c:${NJ_MC[x.mc][1]}">Mécanique · ${esc(NJ_MC[x.mc][0])}</span>` : ''}
        ${x.trx ? `<p class="hpc-bonus"><b>Bonus</b> ${esc(x.trx)}</p>` : ''}
        ${x.q && A ? `<div class="hpc-q"><span class="hpc-qh"><b>Quête d'éveil</b> ${esc(x.q.tx)}</span>
          <div class="hpc-aw">${HART[h + '_aw'] ? faceH('art-h-' + h + '_aw', 'face hpc-awf') : ''}<span><b>Éveil · ${esc(A.nm)}</b><small>${esc(A.tx)}</small></span></div></div>` : ''}
        ${c && (!nin || NJ_COMP) ? `<span class="hp-cp">${faceH('art-' + cid)}<em>${esc(c.n)}</em></span>` : ''}</div>
      </div>`;
    return `<div class="hp-col${on ? ' on' : ''}" style="--c:${col};--k:${i}">
      <button class="hp-card" data-act="hsel" data-h="${h}" aria-pressed="${on}" aria-label="${esc(x.n + ' : ' + pw + '. ' + main)}">
        ${rollH(me, i)}
        ${heroArchH('art-h-' + h, +RU().hp || 40, 'hp-arch')}
        <span class="hp-nm">${esc(x.n)}</span>
        ${x.stars || x.diff ? `<span class="hp-st">${'★'.repeat(x.stars || x.diff)}</span>` : ''}
      </button>
      ${on ? `<button class="t-go hp-go" data-act="hero" data-h="${h}">Choisir</button>` : ''}
    </div>`; };
  const tab = V.ruleTab || 'tour', rules = nin && V.hpRules;
  return `<div class="ov hp-ov"><div class="hp-wrap">
    <h2 class="hp-t">Choisis ton héros</h2><p class="hp-sub">Survole un héros pour voir son pouvoir, clique pour le choisir.</p>${rollInfoH(me)}
    <div class="hp-row">${me.ho.map(card).join('')}</div>
    <div class="hp-infos">${pcs.join('')}<p class="hp-ph">Survole un héros pour voir son pouvoir.</p></div>
    ${nin ? `<button class="btn sm hp-rb" data-act="hprules">${rules ? 'Masquer les règles' : 'Comment on joue ?'}</button>` : ''}
    ${rules ? `<div class="hpick-r hp-rules"><div class="rl-tabs" role="tablist">${RULE_TABS.map(([k, n]) => `<button role="tab" class="rl-tab${k === tab ? ' on' : ''}" data-act="rtab" data-k="${k}" aria-selected="${k === tab}">${n}</button>`).join('')}</div><div class="rl-body">${ruleTabH(tab)}</div></div>` : ''}
  </div></div>`;
}
function heroPickNinjaH(d, me) {
  const sel = me.ho.includes(V.heroSel) ? V.heroSel : me.ho[0], tab = V.ruleTab || 'tour';
  const card = (h, i) => { const x = HEROES[h], on = h === sel, cid = COMPANIONS[h], c = cid && C[cid], el = x.clan;
    return `<button class="hpk${on ? ' on' : ''}" data-act="hsel" data-h="${h}" aria-pressed="${on}" style="--c:${ELS[el] ? ELS[el].col : '#c8a86a'}">
      ${rollH(me, i)}<span class="hpk-face">${faceH('art-h-' + h)}${x.cost ? `<span class="hpk-ck">${ckMarkH(x.cost)}</span>` : '<span class="hpk-pas">Passif</span>'}</span>
      <span class="hpk-b"><b>${esc(x.n)}</b><span class="hpk-d">${x.stars ? '★'.repeat(x.stars) : x.diff ? '★'.repeat(x.diff) + '☆'.repeat(3 - x.diff) + ' ' + ['', 'Simple', 'Intermédiaire', 'Expert'][x.diff] : ''}</span>
        <small>${x.pwn ? `<b class="hpk-pn">${esc(x.pwn)}</b> · ` : ''}${esc((t => t.charAt(0).toUpperCase() + t.slice(1))(x.tx.replace(/^Passif : /, '')))}</small>
        ${c ? `<span class="hpk-c">${faceH('art-' + cid)}<em>${esc(c.n)} · ${c.a * 3}/${c.h * 3}</em></span>` : ''}</span></button>`; };
  return `<div class="ov hpick-ov"><div class="hpick">
    <div class="hpick-l"><h2 class="ov-t">Choisis ton héros</h2><p class="ov-s">Son pouvoir et son compagnon t'accompagnent toute la partie.</p>${rollInfoH(me)}
      <div class="hpk-g">${me.ho.map(card).join('')}</div>
      <button class="t-go md-go" data-act="hero" data-h="${sel}">Jouer ${esc(HEROES[sel].n.split(' ')[0])}</button></div>
    <div class="hpick-r"><div class="rl-head"><small>Univers · Ninja</small><b>Comment on joue</b></div>
      <div class="rl-tabs" role="tablist">${RULE_TABS.map(([k, n]) => `<button role="tab" class="rl-tab${k === tab ? ' on' : ''}" data-act="rtab" data-k="${k}" aria-selected="${k === tab}">${n}</button>`).join('')}</div>
      <div class="rl-body">${ruleTabH(tab)}</div></div>
  </div></div>`;
}
function heroMedalsH(me) {
  const sel = me.ho.includes(V.heroSel) ? V.heroSel : me.ho[Math.floor((me.ho.length - 1) / 2)];
  const md = me.ho.map((h, i) => {
    const x = HEROES[h], on = h === sel, cid = COMPANIONS[h] && C[COMPANIONS[h]] ? COMPANIONS[h] : null, c = cid ? C[cid] : null;
    return `<button class="md${on ? ' on' : ''}" data-act="hsel" data-h="${h}" aria-pressed="${on}">
      <span class="md-coin">${rollH(me, i)}<span class="md-in"></span>${faceH('art-h-' + h)}<span class="md-gem" title="${x.cost ? 'Coût du pouvoir' : 'Pouvoir passif'}">${x.cost || '∞'}</span><span class="md-shine"></span></span>
      <span class="md-rib">${esc(x.n)}</span>${x.mc && NJ_MC[x.mc] ? `<span class="famc"><i style="--c:${NJ_MC[x.mc][1]}">${esc(NJ_MC[x.mc][0])}</i></span>` : famChips(heroFam(h))}
      ${c ? `<span class="md-chain"></span><span class="md-comp">${faceH('art-' + cid)}<small><b>${esc(c.n)} ${c.a}/${c.h}</b><br>${esc(fxText((c.fx || [])[0] || {}))}</small></span>` : ''}
      <span class="md-tx"><b>${x.cost ? `Pouvoir · ${x.cost} ${V.pub && (V.pub.laws || []).some(l => l.k === 'chakra') ? 'chakra' : 'or'}` : 'Passif'} ·</b> ${esc(x.tx.replace(/^Passif : /, ''))}</span>
    </button>`;
  }).join('');
  return `${rollInfoH(me)}<div class="mds n${me.ho.length}">${md}</div><button class="t-go md-go" data-act="hero" data-h="${sel}">Porter le médaillon de ${esc(HEROES[sel].n.split(' ')[0])}</button>`;
}
function overlayH() {
  const d = V.pub, me = V.me;
  if (me && me.disc && d.ph === 'recruit') return `<div class="ov"><div class="ov-box"><h2 class="ov-t">Découverte</h2><p class="ov-s">Choisis un serviteur. Les deux autres retournent dans la réserve.</p>
    <div class="disc">${me.disc.map((m, i) => `<button class="disc-b" data-act="pick" data-i="${i}" aria-label="Choisir ${esc(CD(m.c).n)}">${cardH(m, 'disc', i)}</button>`).join('')}</div></div></div>`;
  if (d.ph === 'hero' && me) {
    if (!me.hero) return heroPickRowH(d, me);
    if (!me.hero && (d.laws || []).some(l => l.k === 'chakra')) return heroPickNinjaH(d, me);
    if (!me.hero) return `<div class="ov"><div class="ov-box"><h2 class="ov-t">Choisis ton héros</h2><p class="ov-s">Son pouvoir et son compagnon t'accompagnent toute la partie.</p>${lawBigH(d)}
      ${heroMedalsH(me)}</div></div>`;
    return `<div class="ov"><div class="ov-box wait">${faceH('art-h-' + me.hero, 'face big')}<h2 class="ov-t">${esc(HEROES[me.hero].n)}</h2><p class="ov-s">En attente des autres joueurs…</p></div></div>`;
  }
  if (d.ph === 'end') {
    const st = d.pl.slice().sort((a, b) => a.pl - b.pl), mine = me ? d.pl.find(p => p.pid === me.pid) : null;
    const title = mine ? (mine.pl === 1 ? 'Victoire !' : `${mine.pl}e place`) : 'Partie terminée';
    const sub = mine ? (mine.pl === 1 ? 'Tu es le dernier debout dans la taverne.' : mine.pl <= 4 ? 'Belle partie : tu finis dans la moitié haute.' : 'La taverne a eu raison de toi cette fois.') : '';
    return `<div class="ov"><div class="ov-box"><h2 class="ov-t">${title}</h2><p class="ov-s">${sub}</p>
      <ol class="slate stand">${st.map(p => `<li class="${me && p.pid === me.pid ? 'me' : ''}"><span class="rk">${p.pl}</span>${faceH(playerSym(p))}<span class="nm chalk">${esc(p.n)}</span><span class="mute">${p.ai ? 'IA' : 'Joueur'}</span>${p.pl === 1 ? icon('crown', 'crown') : '<span></span>'}</li>`).join('')}</ol>
      <div class="btns"><button class="btn pri big" data-act="leave">Retour au menu</button></div></div></div>`;
  }
  const meAlive = me && d.pl.some(p => p.pid === me.pid && p.al);
  if (!meAlive && V.fight && (d.ph === 'combat' || !V.fight.done)) return fightH();
  return '';
}

/* ligne de combat : jetons vivants + fantômes de ceux qui viennent de mourir */
function fightRow(F, side) {
  const last = F.r.frames.length - 1, i = Math.min(V.fi, last), fr = F.r.frames[i];
  const cur = fr.s, prev = i > 0 ? F.r.frames[i - 1].s : null, pa = i > 0 ? F.r.frames[i - 1] : null;
  const pm = {}; if (prev) prev.forEach(a => a.forEach(m => pm[m.u] = m));
  const alive = new Set(); cur.forEach(a => a.forEach(m => alive.add(m.u)));
  const atk = pa && pa.at ? pa.at : null, tg = pa && pa.at ? pa.tg : null;
  const out = cur[side].map((m, k) => {
    const p = pm[m.u], cls = [], ex = [];
    if (prev && !p) cls.push('born');
    if (p) {
      const pf = p.f || '', mf = m.f || '';
      if (m.h < p.h) { cls.push('hit'); ex.push(`<span class="dmg" style="--d:${k % 2 ? .05 : 0}s"><b>-${p.h - m.h}</b></span>`); if (atk && m.u !== atk && m.u !== tg) cls.push('zapd'); }
      else if (pf.includes('s') && !mf.includes('s')) { cls.push('shbreak'); ex.push('<span class="flt sh">Bouclier !</span>'); }
      if (m.a > p.a || m.h > p.h) { cls.push('buffed'); ex.push(`<span class="buffn">${m.a > p.a ? '+' + (m.a - p.a) : '+0'}/${m.h > p.h ? '+' + (m.h - p.h) : '+0'}</span>`); }
      else if (m.a < p.a) cls.push('chilled');
    }
    if (m.u === atk) cls.push('atk');
    return { k, html:tokenH(m, 'f', k, { name:false, cls:cls.join(' '), extra:ex.join(''), dmg:p && m.h < p.h ? p.h - m.h : 0 }) };
  });
  if (prev) {
    const ps = prev[side]; let after = -1;
    const ghosts = [];
    ps.forEach(m => {
      if (alive.has(m.u)) { after = cur[side].findIndex(x => x.u === m.u); return; }
      const dr = !!(CD(m.c).by || {}).dr;
      ghosts.push({ at:after, html:tokenH(m, 'f', -1, { name:false, cls:'dying' + (dr ? ' dr' : ''), extra:`<span class="dmg"><b>${m.h > 0 ? '-' + m.h : '✖'}</b></span>` }) });
    });
    for (let g = ghosts.length - 1; g >= 0; g--) out.splice(ghosts[g].at + 1, 0, { html:ghosts[g].html });
  }
  return out.length ? out.map(o => o.html).join('') : '<p class="hint">Plus personne debout.</p>';
}

function fightH() {
  const F = V.fight, last = F.r.frames.length - 1, fr = F.r.frames[Math.min(V.fi, last)];
  const mine = F.me;
  const myHero = mine ? F.hb : F.ha, enHero = mine ? F.ha : F.hb;
  let res = '';
  if (F.done) {
    const won = F.r.w === mine, lost = F.r.w === 1 - mine, dmg = Math.min(F.cap || 99, F.r.dmg);
    res = `<div class="banner ${won ? 'win' : lost ? 'loss' : 'draw'}">${won ? 'Victoire !' : lost ? 'Défaite' : 'Égalité'}</div><p class="banner-s">${won ? `Tu infliges ${dmg} dégâts à ${esc(F.on)}.` : lost ? `Tu subis ${dmg} dégâts.` : 'Personne ne perd de points de vie.'}</p>`;
  }
  return `<div class="ov"><div class="ov-box">
    <div class="felt arena">
      <div class="who">${faceH(enHero && HART[enHero] ? 'art-h-' + enHero : avatarSym(F.on))}<span class="chalk">${esc(F.on)}</span><span class="mute">taverne ${mine ? F.ta : F.tb}</span></div>
      <div class="line">${fightRow(F, 1 - mine)}</div>
      <div class="vs" aria-hidden="true">Combat · manche ${F.rd}</div>
      <div class="line">${fightRow(F, mine)}</div>
      <div class="who">${faceH(myHero && HART[myHero] ? 'art-h-' + myHero : avatarSym(V.name))}<span class="chalk">Toi</span><span class="mute">taverne ${mine ? F.tb : F.ta}</span></div>
    </div>${res}
    <div class="btns">${F.done ? (V.pub.ph === 'combat' ? '<span class="mute">Les autres tables terminent leur combat…</span>' : '') : '<button class="btn" data-act="skip">Passer l\'animation</button>'}</div></div></div>`;
}

/* ---------- interactions ---------- */
document.addEventListener('input', e => {
  if (e.target.id === 'jcode') { V.jcode = e.target.value; return; }
  if (e.target.id !== 'nm') return;
  V.nameRaw = e.target.value; V.name = e.target.value.trim().slice(0, 20) || 'Aventurier';
  try { localStorage.setItem('tav-name', V.name); } catch (er) {}
});
const PLAY_ZONES = ['sh', 'bd', 'hd', 'ss'];
document.addEventListener('click', e => {
  const btn = e.target.closest('[data-act]');
  if (btn && !btn.disabled) { doAct(btn.dataset.act, btn); return; }
  const card = e.target.closest('.mn,.cd,.spt');
  if (card && V.screen === 'atelier' && card.dataset.z === 'atl') { atlOpen(card.dataset.c); return; }
  if (card && V.screen === 'game' && V.aim != null && card.dataset.z === 'bd') { sendAct({ t:'cast', i:V.aim, tg:+card.dataset.i }); V.aim = null; V.sel = null; render(); return; }
  if (card && V.screen === 'game' && PLAY_ZONES.includes(card.dataset.z)) {
    const z = card.dataset.z, i = +card.dataset.i;
    if (V.aim != null) V.aim = null;
    V.sel = V.sel && V.sel.z === z && V.sel.i === i ? null : { z, i };
    render();
  }
});
document.addEventListener('dblclick', e => {
  const card = e.target.closest('.mn,.cd,.spt'); if (!card || !V.me || !V.pub || V.pub.ph !== 'recruit') return;
  const z = card.dataset.z, i = +card.dataset.i;
  if (z === 'sh') sendAct({ t:'buy', i }); else if (z === 'ss') sendAct({ t:'buysp', k:i }); else if (z === 'hd' && !card.dataset.sp) sendAct({ t:'play', i });
  V.sel = null;
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && V.mp && V.screen === 'menu') { V.mp = null; render(); return; }
  if (e.key === 'Enter' && e.target.id === 'jcode') { e.preventDefault(); doAct('joincode', e.target); return; }
  if ((e.key === 'Enter' || e.key === ' ') && e.target.matches && e.target.matches('.mn,.cd,.spt')) { e.preventDefault(); e.target.click(); }
});
function doAct(act, btn) {
  const s = V.sel;
  if (V.screen === 'lobby' && (act === 'm-solo' || act === 'm-join' || act === 'atl-open')) { leaveGame().then(() => doAct(act, btn)); return; }
  switch (act) {
    case 'solo': V.mp = null; startSolo(); break;
    case 'm-solo': if (typeof csEnter === 'function' && csEnter(() => { V.mp = 'solo'; render(); })) break; V.mp = 'solo'; render(); break;
    case 'm-online': if (V.screen === 'lobby') break; if (Net.room) { V.mp = null; createOnline(); break; } V.mp = 'online'; render(); break;
    case 'm-join': V.mp = 'join'; render(); setTimeout(() => { const j = document.getElementById('jcode'); if (j && !j.disabled && matchMedia('(hover:hover)').matches) j.focus(); }, 30); break;
    case 'm-close': V.mp = null; render(); break;
    case 'fs': {
      if (document.fullscreenElement) { document.exitFullscreen().catch(() => {}); break; }
      document.documentElement.requestFullscreen({ navigationUI:'hide' }).then(() => { try { screen.orientation.lock('landscape').catch(() => {}); } catch (e) {} }).catch(() => toast('Le plein écran n\'est pas disponible ici.'));
      break;
    }
    case 'univ': {
      const k = +btn.dataset.u, u = (SET.univ || [])[k];
      let sel = (V.univSel || []).slice();
      if (k < 0 || !u) sel = []; else sel = sel[0] === u.n ? [] : [u.n];   // un seul univers à la fois
      V.univSel = sel; try { localStorage.setItem('tav-univ', JSON.stringify(sel)); } catch (e) {}
      if (Net.role === 'host' && !H.G) sendPub(); else render();
      break;
    }
    case 'create': V.mp = null; createOnline(); break;
    case 'join': joinOnline(btn.dataset.code); break;
    case 'joincode': {
      let c = (V.jcode || '').trim().toLowerCase().replace(/\s+/g, '');
      if (c && !c.startsWith('tav-')) c = 'tav-' + c;
      if (!/^tav-[a-z0-9]{3,12}$/.test(c)) { toast('Ce code n\'est pas valide. Il ressemble à « tav-ab3kz ».'); break; }
      joinOnline(c); break;
    }
    case 'copycode': { const c = H.code || ''; try { navigator.clipboard.writeText(c).then(() => toast('Code copié : ' + c), () => toast('Code : ' + c)); } catch (e) { toast('Code : ' + c); } break; }
    case 'launch': hostLaunch(); break;
    case 'leave': leaveGame(); break;
    case 'hero': sendAct({ t:'hero', h:btn.dataset.h }); V.heroSel = null; break;
    case 'hsel': V.heroSel = btn.dataset.h; render(); break;
    case 'ckm': sendAct({ t:'ckm', i:+btn.dataset.i }); break;
    case 'hprules': V.hpRules = !V.hpRules; render(); if (V.hpRules) requestAnimationFrame(() => { const r = document.querySelector('.hp-rules'); if (r) r.scrollIntoView({ block:'end', behavior:'smooth' }); }); break;
    case 'rwst': rwSet(((V.rw || 0) + (+btn.dataset.d) + 10) % 10); render(); break;
    case 'hroll': if ((V.me.hrr || 0) > 0) { if (V.heroSel === V.me.ho[+btn.dataset.i]) V.heroSel = null; sendAct({ t:'hroll', i:+btn.dataset.i }); } break;
    case 'skip': if (V.fight) { clearTimeout(V.fightT); clearTimeout(V.duelT); if (V.fight.dr) { V.di = V.fight.dr.frames.length - 1; V.fight.ddone = true; } if (V.fight.lunge) { try { V.fight.lunge.cancel(); } catch (e) {} V.fight.lunge = null; } V.fi = V.fight.r.frames.length - 1; V.fight.done = true; render(); fxEnd(); } break;
    case 'buy': if (s) { sendAct({ t:'buy', i:s.i }); V.sel = null; } break;
    case 'buysp': sendAct({ t:'buysp', k:+(btn.dataset.k || 0) }); V.sel = null; break;
    case 'cpel': sendAct({ t:'cpel', el:btn.dataset.el }); break;
    case 'uapply': { const o = V.me && (V.me.ups || [])[+btn.dataset.i]; if (o && (V.me.ck || 0) < upgCost(o)) { toast(`Il te faut ${upgCost(o)} chakra pour poser cette amélioration.`); break; } sendAct({ t:'uapply', i:+btn.dataset.i }); hidePeek(); break; }
    case 'lawtog': { const n = btn.dataset.u; V.lawOpen = V.lawOpen || {}; V.lawOpen[n] = !V.lawOpen[n]; render(); break; }
    case 'rtab': V.ruleTab = btn.dataset.k; render(); break;
    case 'upick': sendAct({ t:'upick', i:+btn.dataset.i }); hidePeek(); break;
    case 'chest': V.chestRev = { eq:(V.me && V.me.eqs || []).slice(), hd:(V.me && V.me.hd || []).map(x => x.u), at:Date.now() }; fxChest(btn); { const o = btn.closest('.bigchest'); if (o) o.remove(); } sendAct({ t:'chest' }); break;
    case 'equip': if (btn.getAttribute('aria-disabled') === 'true') { toast(btn.dataset.why || ''); break; } sendAct({ t:'equip', i:+btn.dataset.i }); hidePeek(); break;
    case 'cast': if (s) { sendAct({ t:'cast', i:s.i }); V.sel = null; } break;
    case 'aim': if (s) { V.aim = s.i; V.sel = null; render(); } break;
    case 'aimcancel': V.aim = null; render(); break;
    case 'pick': sendAct({ t:'pick', i:+btn.dataset.i }); break;
    case 'unsel': V.sel = null; render(); break;
    case 'play': if (s) { sendAct({ t:'play', i:s.i }); V.sel = null; } break;
    case 'sell': if (s) { sendAct({ t:'sell', i:s.i }); V.sel = null; } break;
    case 'mvl': if (s) { sendAct({ t:'move', i:s.i, to:s.i - 1 }); V.sel = { z:'bd', i:s.i - 1 }; } break;
    case 'mvr': if (s) { sendAct({ t:'move', i:s.i, to:s.i + 1 }); V.sel = { z:'bd', i:s.i + 1 }; } break;
    case 'rdy': { const r = btn.getBoundingClientRect(), on = !btn.classList.contains('rung'); if (!FX_OFF()) { fxRing(r.left + r.width / 2, r.top + r.height / 2, on ? '#b8ff8a' : '#ffd86a', 1.8); if (on) fxBurst(r.left + r.width / 2, r.top + r.height / 2, 'buff', 18, 1.3); } btn.closest('.bellwrap') && btn.closest('.bellwrap').classList.add('bump'); sendAct({ t:'rdy' }); break; }
    default: if (act.startsWith('atl-') || act.startsWith('ed-')) atlAct(act, btn); else sendAct({ t:act });
  }
}
// glisser-déposer : la carte décolle et suit le pointeur (souris comme doigt)
let DRAG = null, DC = null;
// achat : la main ou le plateau ; jouer depuis la main : le plateau ou la taverne
const dropAllowed = (from, to, sp) => ((from === 'sh' || from === 'ss') && (to === 'hd' || to === 'bd')) || (from === 'hd' && (to === 'bd' || (to === 'sh' && !(sp && SPELLS[sp] && SPELLS[sp].tg)))) || (from === 'bd' && (to === 'bd' || to === 'sh'));
const dragLayer = (() => { const l = document.createElement('div'); l.id = 'dragl'; l.setAttribute('aria-hidden', 'true'); l.hidden = true; document.body.appendChild(l); return l; })();
document.addEventListener('dragstart', e => { if (V.screen === 'game') e.preventDefault(); });
document.addEventListener('pointerdown', e => {
  if ((e.pointerType === 'mouse' && e.button !== 0) || V.screen !== 'game' || DRAG) return;
  const c = e.target.closest && e.target.closest('[data-drag]');
  DC = c && PLAY_ZONES.includes(c.dataset.z) ? { el:c, x:e.clientX, y:e.clientY, id:e.pointerId, type:e.pointerType } : null;
  if (DC && e.pointerType === 'mouse') e.preventDefault();
});
document.addEventListener('pointermove', e => {
  if (DRAG) { if (e.pointerId === DRAG.id) dragMove(e.clientX, e.clientY); return; }
  if (!DC || e.pointerId !== DC.id) return;
  if (LP && LP.on) { DC = null; return; }
  if (Math.hypot(e.clientX - DC.x, e.clientY - DC.y) < (DC.type === 'mouse' ? 5 : 9)) return;
  const d = DC; DC = null; dragStart(d, e.clientX, e.clientY);
});
document.addEventListener('pointerup', e => { DC = null; if (DRAG && e.pointerId === DRAG.id) dragEnd(e.clientX, e.clientY, false); });
document.addEventListener('pointercancel', e => { DC = null; if (DRAG && e.pointerId === DRAG.id) dragEnd(0, 0, true); });
window.addEventListener('blur', () => { if (DRAG) dragEnd(0, 0, true); });
function dragStart(d, x, y) {
  const c = d.el; if (!document.contains(c)) return;
  const r = c.getBoundingClientRect();
  hidePeek(); if (LP) { clearTimeout(LP.tm); LP = null; }
  if (tiltEl) { tiltEl.classList.remove('tilt'); tiltEl = null; }
  DRAG = { src:c, z:c.dataset.z, i:+c.dataset.i, sp:c.dataset.sp || null, u:c.dataset.u, id:d.id, w:r.width, h:r.height, x, y, vx:0, rot:0, r0:r, zone:null };
  const g = c.cloneNode(true);
  g.classList.remove('sel', 'tilt', 'tripok', 'aimable', 'lp', 'born', 'buffed');
  g.removeAttribute('style'); g.style.cssText = `width:${f1(r.width)}px;--hw:${f1(r.width)}px;--tw:${f1(r.width)}px`;
  dragLayer.innerHTML = `<div class="dragc">${g.outerHTML}<span class="dragtag" hidden></span></div>`;
  dragLayer.hidden = false;
  if (DRAG.z === 'hd' && DRAG.sp && SPELLS[DRAG.sp] && SPELLS[DRAG.sp].tg) {
    // carte à cible : elle se pose au-dessus de la main, une flèche la relie au viseur
    const tb = (document.querySelector('.table') || document.body).getBoundingClientRect();
    DRAG.aim = true; DRAG.ax = Math.max(8, tb.left + 14); DRAG.ay = Math.max(8, innerHeight - r.height * .78);
    dragLayer.classList.add('aimcard');
    dragLayer.animate([{ transform:`translate(${f1(r.left)}px,${f1(r.top)}px)` }, { transform:`translate(${f1(DRAG.ax)}px,${f1(DRAG.ay)}px)` }], { duration:220, easing:'cubic-bezier(.2,1.2,.4,1)' });
    dragLayer.style.transform = `translate(${f1(DRAG.ax)}px,${f1(DRAG.ay)}px)`;
  }
  c.classList.add('drag-src'); document.body.classList.add('dragging');
  dzShow();
  dragMove(x, y);
  const tick = () => { if (!DRAG) return; if (DRAG.aim) { const cc = dragLayer.firstChild; if (cc) cc.style.transform = 'scale(1.12)'; return; } DRAG.vx *= 0.82; const rot = Math.max(-20, Math.min(20, DRAG.vx * 1.4)); DRAG.rot += (rot - DRAG.rot) * 0.35; const cc = dragLayer.firstChild; if (cc) cc.style.transform = `rotate(${f1(DRAG.rot)}deg) scale(1.14)`; requestAnimationFrame(tick); };
  requestAnimationFrame(tick);
}
// trois grands rectangles jointifs (taverne, plateau, main) qui couvrent toute la table ; la rangée du héros est partagée
function dzRects(from) {
  const tb = document.querySelector('.table'), sh = document.querySelector('.keeper-zone[data-drop]'), bd = document.querySelector('.board-zone[data-drop]'), hd = document.querySelector('.hand[data-drop]'), hz = document.querySelector('.hero-zone');
  if (!tb || !sh || !bd || !hd) return [];
  const T = tb.getBoundingClientRect(), S = sh.getBoundingClientRect(), B = bd.getBoundingClientRect(), Hd = hd.getBoundingClientRect(), Z = hz ? hz.getBoundingClientRect() : null;
  const b1 = (S.bottom + B.top) / 2, side = Z && Z.left >= B.right - 10;
  const b2 = Z && !side ? (Z.top + Z.bottom) / 2 : (B.bottom + Math.max(B.bottom, Hd.top)) / 2;
  const l = T.left, r = side ? Z.left : T.right;
  const bot = Math.max(T.bottom, innerHeight);
  // une seule zone, taillée selon l'action : acheter → la main (tout sous la taverne) ; jouer → le plateau (tout au-dessus de la main) ; vendre → la taverne
  // zone de prise large, mais le rectangle affiché (v) est posé sur l'endroit où la carte arrive
  if (from === 'sh' || from === 'ss') return [{ drop:'hd', el:hd, l, r, t:b1, b:bot }];
  if (from === 'hd') return [{ drop:'bd', el:bd, l, r, t:T.top, b:b2, v:[b1, b2] }];
  if (from === 'bd') return [{ drop:'sh', el:sh, l, r, t:T.top, b:b1 }, { drop:'bd', el:bd, l, r, t:b1, b:bot, hide:1 }];
  return [];
}
function dzAt(x, y, from) { return dzRects(from).find(z => x >= z.l && x <= z.r && y >= z.t && y < z.b) || null; }
const dzLayer = (() => { const l = document.createElement('div'); l.id = 'dzl'; l.setAttribute('aria-hidden', 'true'); l.hidden = true; document.body.appendChild(l); return l; })();
function dzShow(on) {
  if (!DRAG) return dzHide();
  const R = dzRects(DRAG.z).filter(z => !z.hide && dropAllowed(DRAG.z, z.drop, DRAG.sp)); if (!R.length) return dzHide();
  const lbl = { sh:'Vendre', bd:'Jouer', hd:'Acheter' };
  dzLayer.innerHTML = R.map(z => `<div class="dz${z.drop === on ? ' on' : ''}${z.drop === 'sh' && DRAG.z === 'bd' ? ' sell' : ''}" style="left:${f1(z.l)}px;top:${f1((z.v || [z.t])[0])}px;width:${f1(z.r - z.l)}px;height:${f1(Math.min((z.v || [0, z.b])[1], innerHeight) - (z.v || [z.t])[0])}px"><span>${lbl[z.drop]}</span></div>`).join('');
  dzLayer.hidden = false;
}
function dzHide() { dzLayer.hidden = true; dzLayer.innerHTML = ''; }
function boardPos(line, x, from, i) {
  const cards = [...line.querySelectorAll('.mn:not(.drag-src):not(.cp-tok)')]; let pos = 0;   // le compagnon (bord gauche) ne compte pas
  cards.forEach(c => { const r = c.getBoundingClientRect(); if (x > r.left + r.width / 2) pos++; });
  return { cards, pos };
}
function aimTarget(x, y) {
  let best = null;
  document.querySelectorAll('.board-zone .mn:not(.cp-tok)').forEach(el => { const r = el.getBoundingClientRect(); if (x > r.left - 12 && x < r.right + 12 && y > r.top - 16 && y < r.bottom + 16) best = el; });
  return best;
}
function dragMove(x, y) {
  const D = DRAG;
  if (D.aim) {
    D.x = x; D.y = y;
    document.querySelectorAll('.tg-hover').forEach(el => el.classList.remove('tg-hover'));
    const tgt = aimTarget(x, y); D.lock = tgt;
    let ex = x, ey = y;
    if (tgt) { tgt.classList.add('tg-hover'); const r = tgt.getBoundingClientRect(); ex = r.left + r.width / 2; ey = r.top + r.height * .45; }
    aimDraw(D.ax + D.w / 2, D.ay + D.h * .12, ex, ey, !!tgt);
    const tg = dragLayer.querySelector('.dragtag'); if (tg) { tg.hidden = false; tg.textContent = tgt ? `Lancer sur ${CD(tgt.dataset.c).n}` : 'Choisis une cible'; tg.classList.toggle('ok', !!tgt); }
    return;
  }
  D.vx += (x - D.x) * 0.5; D.x = x; D.y = y;
  dragLayer.style.transform = `translate(${f1(x - D.w / 2)}px,${f1(y - D.h * .42)}px)`;
  const t = document.elementFromPoint(x, y);
  const zi = dzAt(x, y, D.z), okz = zi && dropAllowed(D.z, zi.drop, D.sp) ? zi : null, ok = okz ? okz.el : null;
  dzShow(okz ? okz.drop : null);
  document.querySelectorAll('.mk-l,.mk-r,.tg-hover').forEach(el => el.classList.remove('mk-l', 'mk-r', 'tg-hover'));
  const to = okz ? okz.drop : null;
  let tag = '';
  if (to === 'bd' && D.sp) { const tm = t.closest('.mn'); if (SPELLS[D.sp] && SPELLS[D.sp].tg) { if (tm && tm.dataset.z === 'bd') { tm.classList.add('tg-hover'); tag = 'Lancer'; } else tag = 'Vise un serviteur'; } else tag = 'Lancer'; }
  else if (to === 'bd' && (D.z === 'sh' || D.z === 'ss')) tag = D.z === 'ss' ? 'Acheter le sort' : 'Acheter · 3 or';
  else if (to === 'sh' && D.z === 'hd') tag = D.sp ? 'Lancer' : 'Jouer';
  else if (to === 'bd') { const { cards, pos } = boardPos(ok, x); if (cards[pos - 1]) cards[pos - 1].classList.add('mk-l'); if (cards[pos]) cards[pos].classList.add('mk-r'); tag = D.z === 'hd' ? 'Jouer' : 'Déplacer'; }
  else if (to === 'hd') tag = D.z === 'ss' ? 'Acheter le sort' : 'Acheter · 3 or';
  else if (to === 'sh') tag = 'Vendre · +1 or';
  const tg = dragLayer.querySelector('.dragtag'); if (tg) { tg.hidden = !tag; tg.textContent = tag; tg.classList.toggle('sell', to === 'sh' && D.z === 'bd'); }
}
function dragEnd(x, y, cancel) {
  const D = DRAG; DRAG = null;
  document.body.classList.remove('dragging');
  document.querySelectorAll('.drop-can,.drop-ok').forEach(z => z.classList.remove('drop-can', 'drop-ok'));
  document.querySelectorAll('.mk-l,.mk-r,.tg-hover').forEach(el => el.classList.remove('mk-l', 'mk-r', 'tg-hover'));
  V.lpBlock = Date.now();
  const t = cancel ? null : document.elementFromPoint(x, y);
  const zi = cancel ? null : dzAt(x, y, D.z), z = zi ? zi.el : null; dzHide();
  const cr = dragLayer.firstChild ? dragLayer.firstChild.getBoundingClientRect() : null;
  let sent = false;
  aimHide(); dragLayer.classList.remove('aimcard');
  if (D.aim) {
    const tgt = cancel ? null : aimTarget(x, y);
    if (tgt) { const r = tgt.getBoundingClientRect(); V.sel = null; sendAct({ t:'cast', i:D.i, tg:+tgt.dataset.i }); fxRing(r.left + r.width / 2, r.top + r.height * .45, '#d8b8ff', 1.6); fxBurst(r.left + r.width / 2, r.top + r.height * .45, 'magic', 22, 1.2); sent = true; }
  } else if (zi && dropAllowed(D.z, zi.drop, D.sp)) {
    V.dropFrom = cr ? { u:D.u, r:cr, z:D.z, at:Date.now() } : null;
    sent = doDrop(zi.drop, D, t, x, z);
  }
  const src = D.src && document.contains(D.src) ? D.src : null;
  document.querySelectorAll('.drag-src').forEach(el => { if (el !== src) el.classList.remove('drag-src'); });
  if (sent) { dragLayer.hidden = true; dragLayer.innerHTML = ''; if (src) src.classList.remove('drag-src'); if (V.pendingRender) render(); return; }
  // retour à la case départ
  const back = src && document.contains(src) ? src.getBoundingClientRect() : D.r0;
  const anim = dragLayer.animate([{ transform:dragLayer.style.transform }, { transform:`translate(${f1(back.left)}px,${f1(back.top)}px)` }], { duration:220, easing:'cubic-bezier(.3,.7,.4,1)' });
  const done = () => { dragLayer.hidden = true; dragLayer.innerHTML = ''; dragLayer.style.transform = ''; if (src) src.classList.remove('drag-src'); if (V.pendingRender) render(); };
  anim.onfinish = done; setTimeout(done, 400);
}
function doDrop(to, D, t, x, z) {
  const from = D.z, i = D.i, dsp = D.sp; V.sel = null;
  if (from === 'ss') { sendAct({ t:'buysp', k:+(D.i || 0) }); return true; }
  if (from === 'hd' && dsp) {
    const tgEl = t && t.closest('.mn');
    if (!SPELLS[dsp].tg) { sendAct({ t:'cast', i }); return true; }
    if (tgEl && tgEl.dataset.z === 'bd') { sendAct({ t:'cast', i, tg:+tgEl.dataset.i }); return true; }
    toast('Dépose ce sort sur un de tes serviteurs.'); return false;
  }
  if (from === 'sh') { sendAct({ t:'buy', i }); return true; }
  if (from === 'bd' && to === 'sh') { sendAct({ t:'sell', i }); return true; }
  if (from === 'hd' && to === 'sh') { sendAct({ t:'play', i, pos:(V.me && V.me.bd ? V.me.bd.length : 0) }); return true; }
  const { pos } = boardPos(z, x);
  if (from === 'hd') sendAct({ t:'play', i, pos }); else { if (pos === i) return false; sendAct({ t:'move', i, to:pos }); }
  return true;
}
// aperçu de la carte au survol (souris)
const peekEl = document.createElement('div'); peekEl.id = 'peek'; peekEl.hidden = true; peekEl.setAttribute('aria-hidden', 'true'); document.body.appendChild(peekEl);
let peekFor = null;
let TIPT = null;
function hidePeek() { peekFor = null; peekEl.hidden = true; clearTimeout(TIPT); }
function placePeek(r, pw, ph, touch) {
  let x, y;
  if (touch) { x = Math.max(8, Math.min(innerWidth - pw - 8, r.left + r.width / 2 - pw / 2)); y = r.top - ph - 12; if (y < 8) { x = r.right + 12; if (x + pw > innerWidth - 8) x = r.left - pw - 12; x = Math.max(8, Math.min(innerWidth - pw - 8, x)); y = Math.max(8, Math.min(innerHeight - ph - 8, r.top + r.height / 2 - ph / 2)); } }
  else { x = r.right + 14; if (x + pw > innerWidth - 8) x = r.left - pw - 14; if (x < 8) x = Math.max(8, Math.min(innerWidth - pw - 8, r.left)); y = Math.max(8, Math.min(innerHeight - ph - 8, r.top + r.height / 2 - ph / 2)); }
  peekEl.style.left = x + 'px'; peekEl.style.top = y + 'px';
}
function peekSize() { const v = parseFloat(getComputedStyle(peekEl).getPropertyValue('--hw')) || 176; return [v, v * 1.4]; }
function showPeek(t, touch) {
  const r = t.getBoundingClientRect();
  if (t.classList.contains('eqm') && t.dataset.sp) { peekFor = t; peekEl.innerHTML = spellCardH(t.dataset.sp, 'p', 0) + `<div class="peek-note">${esc(t.dataset.why || '')}</div>`; peekEl.hidden = false; const [pw, ph] = peekSize(); placePeek(r, pw, ph + 40, touch); return true; }
  if (t.classList.contains('spt') && t.dataset.sp) { peekFor = t; peekEl.innerHTML = spellCardH(t.dataset.sp, 'p', 0); peekEl.hidden = false; const [pw, ph] = peekSize(); placePeek(r, pw, ph, touch); return true; }
  if (t.matches('.mn,.cd')) {
    if (t.dataset.sp) { peekFor = t; peekEl.innerHTML = spellCardH(t.dataset.sp, 'p', 0); peekEl.hidden = false; const [pw, ph] = peekSize(); placePeek(r, pw, ph, touch); return true; }
    const c = t.dataset.c; if (!c || (!C[c] && c !== '__edit')) return false;
    if (!touch && t.classList.contains('cd') && r.width >= 150) return false;
    peekFor = t; peekEl.innerHTML = cardH({ c, a:+t.dataset.a, h:+t.dataset.h, g:+t.dataset.g, f:t.dataset.f || '' }, 'p', 0); peekEl.hidden = false;
    { const mc = findMine(t.dataset.u); if (mc && isComp(mc)) { const lv = (V.me && V.me.eqlv) || {}; const eq = mc.eq || [];
      peekEl.insertAdjacentHTML('beforeend', compSheetH(mc, lv, eq)); } }
    const [pw, ph] = peekSize(); placePeek(r, pw, ph + (peekEl.querySelector('.peq') ? peekEl.querySelector('.peq').offsetHeight + 8 : 0), touch);
    // après un instant de survol : la bulle des améliorations
    clearTimeout(TIPT); const mm = findMine(t.dataset.u);
    if (mm) TIPT = setTimeout(() => {
      if (peekFor !== t || peekEl.hidden) return; const h = bonusTipH(mm); if (!h) return;
      peekEl.insertAdjacentHTML('beforeend', h); const tip = peekEl.querySelector('.btip'), pr = peekEl.getBoundingClientRect();
      if (pr.right + tip.offsetWidth + 14 > innerWidth) tip.classList.add('left');
      const tr = tip.getBoundingClientRect(); if (tr.bottom > innerHeight - 8) tip.style.top = f1(innerHeight - 8 - tr.height - pr.top) + 'px';
    }, touch ? 650 : 900);
    return true;
  }
  if (t.matches('.compm') && V.me && compOf(V.me.hero) && C[compOf(V.me.hero)]) {
    peekFor = t; peekEl.innerHTML = cardH(demo(compOf(V.me.hero), 0), 'p', 0) + `<p class="tip-s">${esc(t.querySelector('small') ? t.querySelector('small').textContent : '')}</p>`; peekEl.hidden = false;
    const [pw, ph] = peekSize(); placePeek(r, pw, ph + 30, touch); return true;
  }
  const hv = t.dataset.hov;
  if (hv && hv !== 'law' && (V.me || hv === 'op')) {
    let html = '';
    if (hv === 'op' && V.pub) { const p = V.pub.pl.find(x => x.n === t.dataset.n); if (p && HEROES[p.h]) html = oppPeekH(p); }
    else if ((hv === 'pow' || hv === 'hero') && HEROES[V.me.hero]) { const h = HX(V.me); html = heroCardH(V.me.hero, { aw:V.me.haw, qp:V.me.qp, foot:h.cost ? (V.me.pu ? 'Déjà utilisé ce tour' : h.minRound && (V.me.rd || 0) < h.minRound ? `Disponible dès la manche ${h.minRound}` : 'Disponible') : 'Toujours actif' }); }
    else if (hv === 'comp' && compOf(V.me.hero) && C[compOf(V.me.hero)]) html = compCardH(V.me.hero, compOf(V.me.hero), V.me);
    else if (hv === 'rsv') html = rsvPeekH(V.me);
    else if (hv === 'mk') html = mkPeekH(V.me);
    else if (hv === 'upm') html = upPeekH(V.me, +t.dataset.i);
    if (html) { peekFor = t; peekEl.innerHTML = html; peekEl.hidden = false; const q = peekEl.firstElementChild.getBoundingClientRect(); placePeek(r, q.width, q.height, touch); return true; }
  }
  // héros, pouvoir, adversaires, boutons : une bulle d'explication
  let tt = t.dataset.tip || t.getAttribute('title') || t.getAttribute('aria-label') || '';
  if (t.matches('.op') && V.pub) { const p = V.pub.pl.find(x => x.n === t.getAttribute('title')); if (p) { const h = HEROES[p.h]; tt = `${p.n}${h ? ' · ' + h.n : ''} : ${Math.max(0, p.hp)} PV, taverne ${p.t}${h ? '. ' + h.tx : ''}`; } }
  if (!tt) return false;
  const i = tt.indexOf(' : ');
  peekFor = t; peekEl.innerHTML = `<div class="tip">${i > 0 && i < 40 ? `<b>${esc(tt.slice(0, i))}</b>${esc(tt.slice(i + 3))}` : esc(tt)}</div>`; peekEl.hidden = false;
  const tr = peekEl.firstChild.getBoundingClientRect(); placePeek(r, tr.width, tr.height, touch); return true;
}
document.addEventListener('pointerover', e => {
  if (e.pointerType && e.pointerType !== 'mouse') return;
  const t = e.target.closest ? e.target.closest('.mn,.cd,.spt,.eqm,[data-hov]') : null;
  if (!t || DRAG || t.closest('#peek') || t.closest('.det') || t.closest('.parade') || t.closest('.atl') || t.closest('.ed')) { if (!t) hidePeek(); return; }
  if (t === peekFor) return;
  if (!showPeek(t, false)) hidePeek();
});
/* téléphone : appui long = aperçu (carte, créature, pouvoir, compagnon, héros, adversaire…) */
const LP_SEL = '.mn,.cd,.spt,.eqm,[data-hov],.medal,.bell,.kc,.purse';
let LP = null;
document.addEventListener('pointerdown', e => {
  if (e.pointerType === 'mouse') return;
  const t = e.target.closest ? e.target.closest(LP_SEL) : null;
  if (LP) clearTimeout(LP.tm);
  if (!t || t.closest('#peek') || t.closest('.atl') || t.closest('.ed')) { LP = null; return; }
  LP = { t, x:e.clientX, y:e.clientY, on:false };
  LP.tm = setTimeout(() => { if (!LP || LP.t !== t || !document.contains(t)) return; if (showPeek(t, true)) { LP.on = true; t.classList.add('lp'); try { navigator.vibrate && navigator.vibrate(10); } catch (er) {} } }, 380);
}, { passive:true });
document.addEventListener('pointermove', e => { if (LP && !LP.on && Math.hypot(e.clientX - LP.x, e.clientY - LP.y) > 12) { clearTimeout(LP.tm); LP = null; } }, { passive:true });
const lpEnd = () => { if (!LP) return; clearTimeout(LP.tm); if (LP.on) { V.lpBlock = Date.now(); LP.t.classList.remove('lp'); hidePeek(); } LP = null; };
document.addEventListener('pointerup', lpEnd); document.addEventListener('pointercancel', lpEnd);
document.addEventListener('contextmenu', e => { if (e.target.closest && e.target.closest(LP_SEL)) e.preventDefault(); });
document.addEventListener('click', e => { if (V.lpBlock && Date.now() - V.lpBlock < 450) { e.preventDefault(); e.stopPropagation(); V.lpBlock = 0; } }, true);
document.addEventListener('pointerout', e => { const t = e.target.closest ? e.target.closest('.mn,.cd,.spt,.eqm,[data-hov]') : null; if (t && t === peekFor && !t.contains(e.relatedTarget)) hidePeek(); });
setInterval(() => {
  if (!V.pub || V.screen !== 'game') return;
  const left = V.pub.rem - (Date.now() - V.pubAt);
  const t = $('#tm'); if (t && V.pub.ph !== 'end') { t.textContent = timerTxt(); t.classList.toggle('low', left < 10000); }
  const b = $('#bellw'); if (b) { b.style.setProperty('--p', ringP()); b.classList.toggle('low', V.pub.ph === 'recruit' && left < 10000); }
}, 250);

buildDefs();
buildSpellDefs();
rebuildCatalog();
render();
netBoot();
dataBoot();

document.addEventListener('fullscreenchange', () => { if (V.screen === 'game') render(); });

/* =====================================================================
   EFFETS VISUELS — particules, ondes de choc, secousses, survol 3D
   ===================================================================== */
const FX_OFF = () => { try { return matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { return false; } };
const fxLayer = (() => { const l = document.createElement('div'); l.id = 'fxl'; l.setAttribute('aria-hidden', 'true'); document.body.appendChild(l); return l; })();
const FXK = {
  hit:{ c:['#fff6c8', '#ffd34d', '#ff9a3a', '#ff6a2a'], d:[34, 80], s:[3, 7], streak:1 },
  fire:{ c:['#fff1b8', '#ffd34d', '#ff7a1a', '#e8402a'], d:[30, 90], s:[5, 11] },
  shard:{ c:['#6b4528', '#8a5f34', '#c8963e', '#3e2614', '#a89a88'], d:[26, 70], s:[4, 9], fall:1 },
  ice:{ c:['#ffffff', '#cfefff', '#9fd8ff', '#6fb8e8'], d:[26, 70], s:[3, 8], fall:1 },
  psn:{ c:['#c8ff8a', '#8fe36a', '#4ab02a'], d:[20, 56], s:[5, 10], fall:1 },
  zap:{ c:['#ffffff', '#fff36a', '#ffd23a'], d:[20, 60], s:[2, 5], streak:1 },
  buff:{ c:['#eaffc8', '#a6e07a', '#ffe68a'], d:[16, 46], s:[3, 6], rise:1 },
  soul:{ c:['#e9d5ff', '#b48cff', '#8a6ad8'], d:[10, 40], s:[6, 12], rise:1 },
  gold:{ c:['#fff1b8', '#f2c14e', '#c8963e'], d:[30, 90], s:[5, 9], fall:1, coin:1 },
  conf:{ c:['#f2c14e', '#ff6a8a', '#6fd0c0', '#9fd8ff', '#a6e07a', '#ffffff'], d:[60, 180], s:[5, 9], fall:1, conf:1 },
  dust:{ c:['#d8c2a0', '#b8a07a', '#8a7a5a'], d:[24, 64], s:[6, 12], flat:1 },
  magic:{ c:['#ffffff', '#e9d5ff', '#b48cff', '#ffe68a'], d:[20, 70], s:[3, 7], rise:1 },
};
const rnd = (a, b) => a + Math.random() * (b - a);
function fxBurst(x, y, kind, n, k = 1) {
  if (FX_OFF()) return; const K = FXK[kind] || FXK.hit; let h = ''; if (LITE) n = Math.ceil(n * .5);
  for (let i = 0; i < n; i++) {
    const ang = K.flat ? rnd(Math.PI * 1.05, Math.PI * 1.95) + (Math.random() < .5 ? 0 : Math.PI * -0.0) : K.rise ? rnd(Math.PI * 1.15, Math.PI * 1.85) : rnd(0, Math.PI * 2);
    const d = rnd(K.d[0], K.d[1]) * k, dx = Math.cos(ang) * d, dy = Math.sin(ang) * d * (K.flat ? .35 : 1);
    const sz = rnd(K.s[0], K.s[1]) * Math.sqrt(k), col = K.c[i % K.c.length], dur = rnd(.45, .8) * (K.conf ? 1.9 : K.rise ? 1.5 : 1);
    const cls = 'pt' + (K.streak ? ' streak' : '') + (K.fall ? ' fall' : '') + (K.coin ? ' coin' : '') + (K.conf ? ' conf' : '') + (K.rise ? ' rise' : '');
    const rot = K.streak ? Math.atan2(dy, dx) * 180 / Math.PI : rnd(-200, 200);
    h += `<i class="${cls}" style="left:${f1(x)}px;top:${f1(y)}px;--x:${f1(dx)}px;--y:${f1(dy)}px;--s:${f1(sz)}px;--c:${col};--r:${f1(rot)}deg;--t:${f1(dur)}s;--dl:${f1(rnd(0, .06))}s"></i>`;
  }
  const w = document.createElement('div'); w.className = 'ptw'; w.innerHTML = h; fxLayer.appendChild(w);
  setTimeout(() => w.remove(), K.conf ? 1900 : 1400);
}
function fxRing(x, y, col, k = 1) { if (FX_OFF()) return; const r = document.createElement('i'); r.className = 'fxring'; r.style.cssText = `left:${f1(x)}px;top:${f1(y)}px;--c:${col};--k:${k}`; fxLayer.appendChild(r); setTimeout(() => r.remove(), 700); }
function fxLabel(x, y, txt, cls) { const e = document.createElement('div'); e.className = 'fxtxt ' + (cls || ''); e.innerHTML = txt; e.style.cssText = `left:${f1(x)}px;top:${f1(y)}px;visibility:hidden`; fxLayer.appendChild(e); const w = e.offsetWidth; const cx = Math.max(w / 2 + 8, Math.min(innerWidth - w / 2 - 8, x)); e.style.left = f1(cx) + 'px'; e.style.top = f1(Math.max(24, y)) + 'px'; e.style.visibility = ''; setTimeout(() => e.remove(), 1500); }
function fxShake(el, amp = 6) { if (!el || FX_OFF() || !el.animate) return; const k = []; for (let i = 0; i < 7; i++) { const f = (7 - i) / 7; k.push({ transform:`translate(${f1(rnd(-amp, amp) * f)}px,${f1(rnd(-amp, amp) * f * .6)}px)` }); } k.push({ transform:'none' }); el.animate(k, { duration:380, easing:'ease-out' }); }
function fxCenter(el, fy = .5) { const r = el.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height * fy]; }
function fxIntro() {
  const a = document.querySelector('.arena'); if (!a) return; const r = a.getBoundingClientRect();
  fxLabel(r.left + r.width / 2, r.top + r.height * .42, '<b>Au combat !</b>', 'intro');
  setTimeout(() => { fxRing(r.left + r.width / 2, r.top + r.height * .42, '#ffe39a', 2.4); fxBurst(r.left + r.width / 2, r.top + r.height * .42, 'hit', 18, 1.5); }, 220);
}
function fxEnd() {
  const F = V.fight; if (!F || F.fxDone || FX_OFF()) return; F.fxDone = true;
  const mine = F.me, won = F.r.w === mine, lost = F.r.w === 1 - mine, dmg = Math.min(F.cap || 99, F.r.dmg);
  const b = document.querySelector('.banner'); if (!b) return;
  const [bx, by] = fxCenter(b);
  if (won) {
    fxBurst(bx, by, 'conf', 46, 1); setTimeout(() => fxBurst(bx, by, 'gold', 14, 1.2), 150);
    const ef = document.querySelector('.keeper-zone.enemy .face, .ov .who .face');
    if (ef && dmg) { ef.classList.add('herohit'); const [x, y] = fxCenter(ef); fxBurst(x, y, 'hit', 18, 1.3); fxLabel(x, y, `<b>-${dmg}</b>`, 'hdmg'); }
  } else if (lost) {
    fxShake(document.querySelector('.table, .ov-box'), 10);
    const mf = document.querySelector('.hz-hero .face, .ov .who:last-child .face');
    if (mf && dmg) { mf.classList.add('herohit'); const [x, y] = fxCenter(mf); fxBurst(x, y, 'hit', 18, 1.3); fxLabel(x, y, `<b>-${dmg}</b>`, 'hdmg'); }
    const v = document.createElement('i'); v.className = 'fxvig'; fxLayer.appendChild(v); setTimeout(() => v.remove(), 1200);
  }
}

/* Recrutement : les cartes glissent d'une zone à l'autre (FLIP) et réagissent */
function fxBefore() {
  if (V.screen !== 'game' || !V.me || V.fight && !V.fight.done) return null;
  const rects = {}; document.querySelectorAll('.table [data-u]').forEach(el => { if (!el.classList.contains('dying')) rects[el.dataset.u] = { r:el.getBoundingClientRect(), z:el.dataset.z }; });
  return rects;
}
// un bonus arrive sur un serviteur : aura dorée, étincelles et étiquette avec la source
// compagnon : colonne de chakra à la couleur de son élément, double onde, étincelles et halo durable
function cpBoostFx(e, da, dh) {
  const el = V.me && V.me.cp ? compEl(V.me.cp) : null, col = el && ELS[el] ? ELS[el].col : '#ffe39a';
  const [x, y] = fxCenter(e, .45);
  e.style.setProperty('--cpc', col);
  e.classList.remove('cpboost'); void e.offsetWidth; e.classList.add('cpboost'); setTimeout(() => e.classList.remove('cpboost'), 1800);
  fxRing(x, y, col, 1.8); setTimeout(() => fxRing(x, y, '#ffffff', 1.3), 160);
  fxBurst(x, y, 'magic', 22, 1.3); setTimeout(() => fxBurst(x, y - 20, 'buff', 14, 1.1), 200);
  const big = da + dh >= 6; if (big) setTimeout(() => fxRing(x, y, col, 2.6), 320);
  const side = e.closest('.cp-side'); if (side) { side.style.setProperty('--cpc', col); side.classList.remove('cpflash'); void side.offsetWidth; side.classList.add('cpflash'); setTimeout(() => side.classList.remove('cpflash'), 1600); }
}
function comboGain(p, c) {
  const L = c[4] || {}, B = p[4] || {};
  return Object.keys(L).some(k => /^Combo/.test(k) && (L[k][0] > (B[k] || [0])[0] || L[k][1] > (B[k] || [0, 0])[1] || L[k][2].length > ((B[k] || [0, 0, ''])[2] || '').length)) || (c[3] && c[3] !== p[3] && /Combo/.test(c[5] || ''));
}
// bonus d'un combo : un orbe aux deux couleurs part du réservoir et frappe le serviteur
function comboHitFx(e, cb, k, dv, born) {
  if (FX_OFF()) return;
  const c1 = ELS[cb.a] ? ELS[cb.a].col : cb.col, c2 = ELS[cb.b] ? ELS[cb.b].col : cb.col;
  const src = document.querySelector('.rsv') || document.querySelector('.hz-hero');
  const go = () => {
    if (!e.isConnected) return; const [tx, ty] = fxCenter(e, .42);
    const [sx, sy] = src ? fxCenter(src) : [tx, ty + 200];
    const o = document.createElement('i'); o.className = 'cb-shot'; o.style.cssText = `left:${f1(sx)}px;top:${f1(sy)}px;--c1:${c1};--c2:${c2};--cc:${cb.col}`; fxLayer.appendChild(o);
    const mx = (sx + tx) / 2 + (k % 2 ? 60 : -60), my = Math.min(sy, ty) - 90;
    const a = o.animate([{ transform:'translate(-50%,-50%) scale(.5)' }, { transform:`translate(calc(-50% + ${f1(mx - sx)}px),calc(-50% + ${f1(my - sy)}px)) scale(1.1)`, offset:.5 }, { transform:`translate(calc(-50% + ${f1(tx - sx)}px),calc(-50% + ${f1(ty - sy)}px)) scale(.8)` }], { duration:520, easing:'cubic-bezier(.4,0,.6,1)', fill:'forwards' });
    a.onfinish = () => {
      o.remove();
      e.classList.remove('cbhit'); void e.offsetWidth; e.classList.add('cbhit', 'buffed'); e.style.setProperty('--c1', c1); e.style.setProperty('--c2', c2); setTimeout(() => e.classList.remove('cbhit'), 1500);
      fxRing(tx, ty, c1, 1.5); setTimeout(() => fxRing(tx, ty, c2, 1.1), 140); fxBurst(tx, ty, 'magic', 16, 1.2); fxBurst(tx, ty, 'buff', 10, 1);
      const parts = [];
      if (born) parts.push('<b class="bl-st">Invoqué !</b>');
      if (dv && (dv[0] > 0 || dv[1] > 0)) parts.push(`<b class="bl-st">${dv[0] >= 0 ? '+' + dv[0] : dv[0]}/${dv[1] >= 0 ? '+' + dv[1] : dv[1]}</b>`);
      if (dv && dv[2]) parts.push(`<b class="bl-kw">${esc(kwNames(dv[2]))}</b>`);
      if (dv && dv[3]) { const m = dv[3].match(/^(-?\d+)\/(-?\d+)(.*)$/) || [0, 0, 0, '']; const st = +m[1] || +m[2] ? '+' + m[1] + '/+' + m[2] + ' ' : ''; parts.push(`<b class="bl-tmp">Prochain combat : ${esc(st + (m[3] ? kwNames(m[3]) : ''))}</b>`); }
      fxLabel(tx, ty - 34, parts.join(' ') + `<small class="bl-src" style="color:${cb.col}">Combo · ${esc(cb.n)}</small>`, 'buffinfo cbinfo');
    };
  };
  setTimeout(go, 750 + k * 140);
}
function buffFx(e, p, c) {
  const da = c[0] - p[0], dh = c[1] - p[1], kwNew = (c[2] || '').split('').filter(k => !(p[2] || '').includes(k)), tmpNew = c[3] && c[3] !== p[3];
  if (!(da > 0 || dh > 0 || kwNew.length || tmpNew)) return;
  // sources : ce qui a augmenté dans le journal des bonus
  const src = Object.keys(c[4] || {}).filter(k => { const a = c[4][k], b = (p[4] || {})[k] || [0, 0, '']; return a[0] > b[0] || a[1] > b[1] || a[2].length > b[2].length; });
  const srcTx = src.length ? src.slice(0, 2).join(' · ') : (tmpNew && c[5] ? c[5] : '');
  const [x, y] = fxCenter(e, .42);
  e.classList.remove('buffup'); void e.offsetWidth; e.classList.add('buffed', 'buffup'); setTimeout(() => e.classList.remove('buffup'), 1500);
  if (e.classList.contains('cp-tok') && (da > 0 || dh > 0 || kwNew.length)) cpBoostFx(e, da, dh);
  if (da > 0 || dh > 0) { fxRing(x, y, '#ffe39a', 1.2); fxBurst(x, y, 'buff', 16, 1.1); }
  if (kwNew.length) { fxRing(x, y, '#cfe8ff', 1.4); fxBurst(x, y, 'magic', 14, 1); }
  if (tmpNew) { e.classList.add('tmpup'); setTimeout(() => e.classList.remove('tmpup'), 1400); }
  const parts = [];
  if (da > 0 || dh > 0) parts.push(`<b class="bl-st">${da >= 0 ? '+' + da : da}/${dh >= 0 ? '+' + dh : dh}</b>`);
  if (kwNew.length) parts.push(`<b class="bl-kw">${esc(kwNames(kwNew.join('')))}</b>`);
  if (tmpNew) parts.push(`<b class="bl-tmp">Prochain combat ${c[3].replace(/[a-z]+$/, '').split('/').map(v => '+' + v).join('/')}</b>`);
  fxLabel(x, y - 34, parts.join(' ') + (srcTx ? `<small class="bl-src">${esc(srcTx)}</small>` : ''), 'buffinfo');
}
function fxAfter(rects) {
  const me = V.me, d = V.pub;
  if (V.screen !== 'game' || !me || !d) { V.fxPrev = null; return; }
  const fighting = !!(V.fight && (d.ph === 'combat' || !V.fight.done));
  const cur = { bd:{}, hd:new Set(me.hd.map(m => m.u)), sh:new Set(me.sh.map(m => m.u)), t:me.t, g:me.g, rd:d.rd };
  me.bd.concat(me.cp ? [me.cp] : []).forEach(m => cur.bd[m.u] = [m.a, m.h, m.f || '', m.tmp ? (m.tmp.a || 0) + '/' + (m.tmp.h || 0) + (m.tmp.f || '') : '', Object.fromEntries((m.bn || []).map(e => [e.s, [e.a, e.h, e.k || '']])), m.tmp && m.tmp.s || '']); cur.tma = me.tma ? me.tma.a + '/' + me.tma.h : '';
  if (me.cp) { cur.cpLv = compLv(me.cp); cur.cpEl = compEl(me.cp); }
  cur.cmb = me.combo ? me.combo.id : 0; cur.njf = me.njf || 0;
  const P = V.fxPrev; V.fxPrev = cur;
  if (fighting || !P || P.rd !== cur.rd || FX_OFF()) return;
  const el = u => document.querySelector(`.table [data-u="${u}"]`);
  if (rects) for (const u in rects) {
    const e = el(u); if (!e || !e.animate) continue;
    let o = rects[u]; const n = e.getBoundingClientRect(); if (!n.width) continue;
    const df = V.dropFrom; if (df && df.u === u && Date.now() - df.at < 2500 && (e.dataset.z !== df.z || df.z === 'bd')) { o = { r:df.r, z:df.z }; V.dropFrom = null; }
    const dx = o.r.left + o.r.width / 2 - (n.left + n.width / 2), dy = o.r.top + o.r.height / 2 - (n.top + n.height / 2);
    if (Math.abs(dx) + Math.abs(dy) < 3) continue;
    const sc = o.r.width / n.width;
    const toBoard = o.z === 'hd' && e.dataset.z === 'bd';
    const base = getComputedStyle(e).transform; const end = base && base !== 'none' ? base : 'none';
    e.animate([{ transform:`translate(${f1(dx)}px,${f1(dy)}px) scale(${f1(sc)})`, zIndex:30 }, ...(toBoard ? [{ transform:'translateY(-26px) scale(1.18)', offset:.7, zIndex:30 }] : []), { transform:end }],
      { duration:toBoard ? 430 : 300, easing:toBoard ? 'cubic-bezier(.3,.7,.4,1)' : 'cubic-bezier(.2,.8,.3,1)' });
    if (toBoard) setTimeout(() => { const [x, y] = fxCenter(e, .92); fxBurst(x, y, 'dust', 14, 1); fxRing(x, y - 10, '#f6e2b0', .9); if ((CD(e.dataset.c).by || {}).bc) fxBurst(x, y - 30, 'magic', 14, 1); fxShake(e, 3); }, 300);
  }
  const cmb = cur.cmb && cur.cmb !== P.cmb ? me.combo : null; let ck = 0;
  for (const u in cur.bd) {
    const p = P.bd[u], c = cur.bd[u]; const e = el(u); if (!e) continue;
    if (!p) { if (!P.hd.has(+u) && !(rects && rects[u])) { if (cmb) comboHitFx(e, cmb, ck++, null, true); else { e.classList.add('born'); const [x, y] = fxCenter(e); fxRing(x, y, '#cfe8ff', 1); } } continue; }
    if (cmb && comboGain(p, c)) comboHitFx(e, cmb, ck++, [c[0] - p[0], c[1] - p[1], (c[2] || '').split('').filter(k => !(p[2] || '').includes(k)).join(''), c[3] && c[3] !== p[3] ? c[3] : '']);
    else buffFx(e, p, c);
  }
  if (cmb && cur.njf > (P.njf || 0)) { const r0 = document.querySelector('.rsv'); if (r0) { const [x, y] = fxCenter(r0, .2); setTimeout(() => fxLabel(x, y - 20, `<b>Prochain combat : +${cur.njf - (P.njf || 0)} dégâts</b><small class="bl-src">Combo · ${esc(cmb.n)}</small>`, 'buffinfo cbinfo'), 900); } }
  if (cur.tma && cur.tma !== P.tma) document.querySelectorAll('#bdrow .mn').forEach((e, k) => setTimeout(() => { const [x, y] = fxCenter(e, .4); fxRing(x, y, '#9fd8ff', 1); e.classList.add('tmpup'); setTimeout(() => e.classList.remove('tmpup'), 1400); }, k * 60));
  if (cur.tma && cur.tma !== P.tma) { const r0 = document.querySelector('#bdrow'); if (r0) { const [x, y] = fxCenter(r0, .1); fxLabel(x, y, `<b>Prochain combat : ${cur.tma.split('/').map(v => '+' + v).join('/')} pour tous</b>`, 'bufftmp'); } }
  const purse = document.querySelector('.purse');
  if (cur.g > P.g && purse) { const [x, y] = fxCenter(purse); fxBurst(x, y, 'gold', 10, .9); fxLabel(x, y - 18, `+${cur.g - P.g}`, 'gold'); }
  if (me.cp && P.cpLv != null) { const e = document.querySelector('.cp-side .cp-tok'), lv = compLv(me.cp), ce = compEl(me.cp);
    if (e && lv > P.cpLv) { const [x, y] = fxCenter(e, .4); cpBoostFx(e, 0, 0); setTimeout(() => { fxRing(x, y, '#fff1b8', 2.4); fxBurst(x, y, 'gold', 26, 1.4); fxLabel(x, y - 46, `<b>Compagnon niveau ${lv} !</b>`, 'tier'); }, 250); }
    else if (e && ce && ce !== P.cpEl) { const [x, y] = fxCenter(e, .4); cpBoostFx(e, 0, 0); fxLabel(x, y - 46, `<b>${esc(ELS[ce] ? ELS[ce].n : ce)}</b>`, 'buffinfo'); } }
  if (cur.t > P.t) { const k = document.querySelector('.kname'); if (k) { const [x, y] = fxCenter(k); fxRing(x, y, '#ffe39a', 2); fxBurst(x, y, 'gold', 22, 1.3); fxLabel(x, y - 30, `<b>Taverne niveau ${cur.t} !</b>`, 'tier'); } }
  document.querySelectorAll('.table .cd.newgold').forEach(e => { if (e.dataset.fx) return; e.dataset.fx = 1; const [x, y] = fxCenter(e); fxRing(x, y, '#fff1b8', 2.2); fxBurst(x, y, 'gold', 20, 1.3); });
}

/* survol : la carte s'incline vers la souris, un reflet suit le curseur */
let tiltEl = null;
document.addEventListener('pointermove', e => {
  if (e.pointerType !== 'mouse' || DRAG) return;
  const t = e.target.closest ? e.target.closest('.mn,.spt,.cd') : null;
  if (tiltEl && tiltEl !== t) { tiltEl.style.removeProperty('--rx'); tiltEl.style.removeProperty('--ry'); tiltEl.classList.remove('tilt'); tiltEl = null; }
  if (!t || t.closest('#peek') || t.closest('.arena') || t.closest('.parade')) return;
  const r = t.getBoundingClientRect(), px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
  t.style.setProperty('--rx', f1((0.5 - py) * 18) + 'deg'); t.style.setProperty('--ry', f1((px - 0.5) * 22) + 'deg');
  t.style.setProperty('--mx', f1(px * 100) + '%'); t.style.setProperty('--my', f1(py * 100) + '%');
  t.classList.add('tilt'); tiltEl = t;
}, { passive:true });

/* flèche de visée : relie la carte à sa cible */
function aimEl() {
  let w = document.getElementById('aiml'); if (w) return w;
  w = document.createElement('div'); w.id = 'aiml'; w.hidden = true; w.setAttribute('aria-hidden', 'true');
  w.innerHTML = '<svg width="100%" height="100%"><path class="aim-g"/><path class="aim-p"/><g class="aim-r"><circle class="ar1" r="20"/><circle class="ar2" r="7"/><path class="ar3" d="M-30 0H-14M14 0H30M0 -30V-14M0 14V30"/></g></svg>';
  document.body.appendChild(w); return w;
}
function aimDraw(x0, y0, x1, y1, locked) {
  const aimSvg = aimEl(); const d = Math.hypot(x1 - x0, y1 - y0); if (d < 4) { aimSvg.hidden = true; return; }
  const cx = (x0 + x1) / 2 + (x1 - x0) * .05, cy = Math.min(y0, y1) - 40 - d * .22;
  const P = `M${f1(x0)} ${f1(y0)} Q${f1(cx)} ${f1(cy)} ${f1(x1)} ${f1(y1)}`;
  aimSvg.querySelector('.aim-p').setAttribute('d', P); aimSvg.querySelector('.aim-g').setAttribute('d', P);
  aimSvg.querySelector('.aim-r').setAttribute('transform', `translate(${f1(x1)} ${f1(y1)})`);
  aimSvg.classList.toggle('locked', locked); aimSvg.hidden = false;
}
function aimHide() { const w = document.getElementById('aiml'); if (w) w.hidden = true; document.querySelectorAll('.tg-hover').forEach(el => el.classList.remove('tg-hover')); }
// visée au clic (bouton « Lancer » puis clic sur la cible) : la flèche suit aussi la souris
document.addEventListener('pointermove', e => {
  if (DRAG || V.aim == null || V.screen !== 'game') return;
  const c = document.querySelector('.cd.aiming'); if (!c) { aimHide(); return; }
  const r = c.getBoundingClientRect(), tgt = aimTarget(e.clientX, e.clientY);
  document.querySelectorAll('.tg-hover').forEach(el => { if (el !== tgt) el.classList.remove('tg-hover'); });
  let ex = e.clientX, ey = e.clientY; if (tgt) { tgt.classList.add('tg-hover'); const q = tgt.getBoundingClientRect(); ex = q.left + q.width / 2; ey = q.top + q.height * .45; }
  aimDraw(r.left + r.width / 2, r.top + r.height * .12, ex, ey, !!tgt);
}, { passive:true });

/* ---------- cartes de héros, de pouvoir et de compagnon (aperçu au survol) ---------- */
const HTHEME = { nh_kushina:'fire', nh_jiraiya:'fire', nh_sasuke:'fire', nh_mikoto:'fire', nh_itachi:'fire', nh_temari:'wind', nh_naruto:'wind', nh_kankuro:'wind', nh_shikamaru:'wind', nh_gaara:'wind', nh_haku:'bubble', nh_zabuza:'bubble', nh_suigetsu:'bubble', nh_mangetsu:'bubble', nh_mei:'bubble', nh_omoi:'storm', nh_darui:'storm', nh_samui:'storm', nh_bee:'storm', nh_kakashi:'storm', nh_roshi:'rock', nh_akatsuchi:'rock', nh_hashirama:'rock', nh_deidara:'rock', nh_kurotsuchi:'rock', nh_karin:'fire', nh_asuma:'fire', nh_madara:'fire', nh_konohamaru:'wind', nh_pakura:'wind', nh_baki:'wind', nh_chojuro:'bubble', nh_ao:'bubble', nh_kisame:'bubble', nh_yugito:'storm', nh_raikage:'storm', nh_c:'storm', nh_kitsuchi:'rock', nh_onoki:'rock', nh_yamato:'rock', rivet:'spark', egide:'holy', ondine:'potion', barnabe:'coin', maelle:'leaf', oren:'rune', gor:'rock', ilka:'spark', selene:'blood', brok:'ember', sylvara:'arcane', grumbo:'steam', vaskor:'soul', pyra:'fire', paul:'fire', leon:'leaf', zoe:'bubble', jeanne:'wind', nono:'fire' };
const THC = { storm:'#ffe14a', fire:'#ff7a2a', ember:'#ff9a3a', spark:'#ffc24a', holy:'#ffe08a', potion:'#6fe0a0', coin:'#f2c14e', leaf:'#8fd05a', rune:'#7ac4ff', rock:'#c8a878', blood:'#e0405a', arcane:'#b48cff', steam:'#f0e2d0', soul:'#7dffb0', bubble:'#6fc8ff', wind:'#bff0e6' };
const THN = { storm:'Foudre', fire:'Feu', ember:'Forge', spark:'Mécanique', holy:'Lumière', potion:'Alchimie', coin:'Commerce', leaf:'Nature', rune:'Savoir', rock:'Force', blood:'Sang', arcane:'Arcanes', steam:'Festin', soul:'Nécromancie', bubble:'Eau', wind:'Vent' };
const PWART = {
  fire:'<path d="M20 6c3 6 9 9 9 17a9 9 0 0 1-18 0c0-5 3-7 4-11 1 3 2 4 3 4 0-4 0-7 2-10z" fill="#ff8a2a"/><path d="M20 17c2 3 5 5 5 9a5 5 0 0 1-10 0c0-3 2-4 3-6 1 1 1 2 2 2 0-2-1-3 0-5z" fill="#ffe27a"/>',
  ember:'<path d="M9 18h18l-3 4h-3v4h4v4H15v-4h4v-4h-6z" fill="#b8bcc8"/><path d="M28 10l2-4M31 14l4-2M24 9l-1-4" stroke="#ffb04a" stroke-width="2.4" stroke-linecap="round"/><circle cx="27" cy="16" r="2" fill="#ff8a3a"/>',
  spark:'<circle cx="20" cy="20" r="8" fill="none" stroke="#ffc24a" stroke-width="5" stroke-dasharray="4 2.3"/><circle cx="20" cy="20" r="4" fill="#ffe9a8"/>',
  holy:'<circle cx="20" cy="20" r="6.5" fill="#fff1b8"/><path d="M20 6v5M20 29v5M6 20h5M29 20h5M10 10l3.5 3.5M26.5 26.5L30 30M30 10l-3.5 3.5M13.5 26.5L10 30" stroke="#ffe08a" stroke-width="2.6" stroke-linecap="round"/>',
  potion:'<path d="M17 7h6v6l6 11a5 5 0 0 1-4.5 8h-9A5 5 0 0 1 11 24l6-11z" fill="#e8f4ff" opacity=".9"/><path d="M13 23h14l1.5 2.5A3 3 0 0 1 26 30H14a3 3 0 0 1-2.5-4.5z" fill="#6fe0a0"/><circle cx="18" cy="26" r="1.4" fill="#fff"/>',
  coin:'<ellipse cx="17" cy="25" rx="8" ry="3.5" fill="#a87418"/><ellipse cx="17" cy="22" rx="8" ry="3.5" fill="#f2c14e"/><circle cx="24" cy="14" r="7" fill="#ffd86a" stroke="#a87418" stroke-width="1.6"/><path d="M24 10v8" stroke="#a87418" stroke-width="2"/>',
  leaf:'<path d="M9 31C9 17 17 9 31 9c0 14-8 22-22 22z" fill="#8fd05a"/><path d="M10 30L26 14" stroke="#3e6a1e" stroke-width="2" stroke-linecap="round"/>',
  rune:'<path d="M12 8h16l3 24H9z" fill="#5a6a86"/><path d="M17 13v14M17 15l6 4M17 21l6 4" stroke="#7ac4ff" stroke-width="2.4" stroke-linecap="round"/>',
  rock:'<path d="M12 18c0-3 2-4 4-4h9c3 0 4 2 4 5v5c0 5-3 8-8 8h-3c-4 0-6-3-6-6z" fill="#c8a878"/><path d="M16 14v6M20 14v6M24 14v6" stroke="#6a4e2e" stroke-width="1.8"/><path d="M7 12l3 2M8 6l3 4M14 5l1 4" stroke="#fff1b8" stroke-width="2" stroke-linecap="round"/>',
  blood:'<path d="M20 6c5 8 10 12 10 18a10 10 0 0 1-20 0c0-6 5-10 10-18z" fill="#e0405a"/><path d="M15 23a5 5 0 0 0 4 6" stroke="#ffb0bc" stroke-width="2" fill="none" stroke-linecap="round"/>',
  arcane:'<path d="M20 5l7 12-7 18-7-18z" fill="#b48cff"/><path d="M20 5l7 12h-14z" fill="#e2d0ff"/><path d="M8 10l1 2 2 1-2 1-1 2-1-2-2-1 2-1zM32 24l1 2 2 1-2 1-1 2-1-2-2-1 2-1z" fill="#fff"/>',
  steam:'<path d="M23 17a7 7 0 1 1-6-6l9 9 4-1 2 2-2 2 1 3-2 2-2-4z" fill="#d89a5a"/><circle cx="17" cy="17" r="5" fill="#f0c890"/><path d="M12 9c-1-2 1-3 0-5M17 8c-1-2 1-3 0-5" stroke="#f0e2d0" stroke-width="1.8" fill="none" stroke-linecap="round"/>',
  soul:'<path d="M11 18a9 9 0 0 1 18 0v6l-3 2v4h-12v-4l-3-2z" fill="#e8ffe8"/><circle cx="16" cy="20" r="2.6" fill="#1a3a2a"/><circle cx="24" cy="20" r="2.6" fill="#1a3a2a"/><path d="M17 27v3M20 27v3M23 27v3" stroke="#1a3a2a" stroke-width="1.4"/>',
  bubble:'<circle cx="16" cy="22" r="8" fill="#6fc8ff" opacity=".85"/><circle cx="27" cy="13" r="5" fill="#6fc8ff" opacity=".85"/><circle cx="28" cy="27" r="3" fill="#6fc8ff" opacity=".85"/><circle cx="13" cy="19" r="2" fill="#fff"/><circle cx="25.5" cy="11.5" r="1.3" fill="#fff"/>',
  storm:'<path d="M23 4 L12 22 H19 L15 36 L29 16 H21 Z" fill="#ffe14a"/><path d="M8 10 L12 14 M32 26 L28 22" stroke="#fff6c0" stroke-width="2.4" stroke-linecap="round"/>',
  wind:'<path d="M6 15h17a4 4 0 1 0-4-4M6 21h24a4 4 0 1 1-4 4M6 27h11" stroke="#bff0e6" stroke-width="3" fill="none" stroke-linecap="round"/>'
};
const powArtH = hid => { const th = HTHEME[hid] || 'spark', col = THC[th]; return `<svg class="ic pwart" viewBox="0 0 40 40" style="--hc:${col}" aria-hidden="true">${PWART[th]}</svg>`; };
const RUNES = 'ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛞᛟ';
function hfxH(th, n = 18) {
  let h = '';
  for (let k = 0; k < n; k++) {
    const x = (k * 53 + 11) % 100, y = (k * 37 + 7) % 100, d = 2.4 + (k * 7) % 5 * .55, dl = -((k * 1.7) % 6), sz = 4 + (k * 5) % 7;
    const g = th === 'rune' ? RUNES[(k * 7) % RUNES.length] : th === 'arcane' ? '✦' : th === 'holy' && k % 3 === 0 ? '✧' : '';
    h += `<i style="--x:${x}%;--y:${y}%;--d:${d.toFixed(2)}s;--dl:${dl.toFixed(2)}s;--s:${sz}px;--w:${(k % 5 - 2) * 9}px">${g}</i>`;
  }
  return h;
}
function powerTitle(h) {
  if (h.pwn) return [h.pwn, h.tx || '', ''];
  const tx = h.tx || ''; const dot = tx.indexOf(' · '); const body = dot > 0 ? tx.slice(dot + 3) : tx;
  const c = body.indexOf(' : ');
  if (c > 0 && c < 26 && !/^(Passif|Dès|Prochain|Après|Quand|Au début|À la fin)/.test(body)) return [body.slice(0, c), body.slice(c + 3), dot > 0 ? tx.slice(0, dot) : ''];
  return [null, body.replace(/^Passif : /, ''), dot > 0 ? tx.slice(0, dot) : ''];
}
// cadre du héros éveillé : anneau doré gravé de marques (sceaux, éclairs…) selon sa mécanique
const HAW_MK = { tok:'✦', seal:'卍', pact:'☯', dr:'✸', eco:'◈', spl:'✧', cbt:'⚔', ckm:'◉', cmb:'✺', kg:'❖' };
function hawFrameH(h) {
  const col = h && h.mc && NJ_MC[h.mc] ? NJ_MC[h.mc][1] : '#ffd86a', mk = HAW_MK[h && h.mc] || '✦';
  const marks = Array.from({ length:8 }, (_, k) => { const a = (k * 45 - 90) * Math.PI / 180; return `<text x="${(50 + Math.cos(a) * 47).toFixed(1)}" y="${(50 + Math.sin(a) * 47).toFixed(1)}" dy=".35em" text-anchor="middle" font-size="9" fill="${col}" stroke="#120a06" stroke-width=".6">${mk}</text>`; }).join('');
  return `<svg class="haw-fr" viewBox="0 0 100 100" aria-hidden="true"><defs><linearGradient id="hawg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff2b0"/><stop offset=".5" stop-color="#e0a83a"/><stop offset="1" stop-color="#8a5a12"/></linearGradient></defs>
    <circle cx="50" cy="50" r="47" fill="none" stroke="url(#hawg)" stroke-width="7"/><circle cx="50" cy="50" r="47" fill="none" stroke="${col}" stroke-width="1.6" stroke-dasharray="4 5" opacity=".9"/>${marks}</svg>`;
}
// style commun des héros et des pouvoirs : portrait en arche dorée pointue + bannière bleue du pouvoir
let ARCH_N = 0;
function heroArchH(art, hp, cls = '') {
  const id = 'hac' + (++ARCH_N);
  return `<span class="harch ${cls}"><svg viewBox="0 0 100 122" aria-hidden="true"><defs><clipPath id="${id}"><path d="M11 115 V52 C11 30 29 15 50 10 C71 15 89 30 89 52 V115 Z"/></clipPath>
    <linearGradient id="${id}g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff0b0"/><stop offset=".35" stop-color="#d8a640"/><stop offset=".7" stop-color="#9a6a1e"/><stop offset="1" stop-color="#e8c060"/></linearGradient></defs>
    <rect x="0" y="0" width="100" height="122" fill="#1a1008" clip-path="url(#${id})"/>
    <g clip-path="url(#${id})"><svg x="2" y="8" width="96" height="112" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice"><use href="#${art}" width="100" height="100"/></svg></g>
    <path fill-rule="evenodd" d="M3 121 V50 C3 24 25 6 50 1 C75 6 97 24 97 50 V121 Z M11 115 V52 C11 30 29 15 50 10 C71 15 89 30 89 52 V115 Z" fill="url(#${id}g)" stroke="#2a1806" stroke-width="1.6"/>
    <path d="M11 115 V52 C11 30 29 15 50 10 C71 15 89 30 89 52 V115 Z" fill="none" stroke="#3a2408" stroke-width="1.4"/>
    <path d="M6.5 118 V51 C6.5 27 27 10 50 5.5" fill="none" stroke="#fff6c8" stroke-width=".9" opacity=".7"/></svg>${hp != null ? `<span class="harch-hp"><svg viewBox="0 0 100 110"><defs><radialGradient id="${id}d" cx=".42" cy=".62" r=".6"><stop offset="0" stop-color="#ff7a5a"/><stop offset=".7" stop-color="#c0180e"/><stop offset="1" stop-color="#7a0a06"/></radialGradient></defs><path d="M50 3 C60 26 92 46 92 70 A42 40 0 0 1 8 70 C8 46 40 26 50 3 Z" fill="url(#${id}d)" stroke="#2a1806" stroke-width="4"/><path d="M30 56 C34 46 40 40 44 34" stroke="#ffd0c0" stroke-width="5" fill="none" stroke-linecap="round" opacity=".7"/></svg><b>${hp}</b></span>` : ''}</span>`;
}
function powBannerH(x, hid, nin) {
  const cost = x.cost ? (nin && x.pay !== 'g' ? `<span class="pwb-cost ck">${ckMarkH(x.cost)}</span>` : `<span class="pwb-cost g"><b>${x.cost}</b></span>`) : '<span class="pwb-cost p"><b>∞</b></span>';
  const main = (x.trx ? x.tx.replace(' Bonus : ' + x.trx, '') : x.tx || '').replace(/^Passif : /, '');
  return `<div class="pwb">${cost}<span class="pwb-med">${powArtH(hid)}</span><b class="pwb-nm">${esc(x.pwn || (x.cost ? 'Pouvoir héroïque' : 'Pouvoir passif'))}</b>
    <p class="pwb-tx"><small>${x.cost ? 'Pouvoir héroïque' : 'Pouvoir passif'}</small>${esc(main.charAt(0).toUpperCase() + main.slice(1))}</p></div>`;
}
// survol d'un joueur du classement (façon Champs de bataille) : héros, pouvoir, et parchemin des statistiques
function oppPeekH(p) {
  const B = HEROES[p.h], x = p.haw && B.awd ? B.awd : B, nin = !!B.mc, col = B.mc && NJ_MC[B.mc] ? NJ_MC[B.mc][1] : '#c8963e';
  const main = (x.trx ? x.tx.replace(' Bonus : ' + x.trx, '') : x.tx || '').replace(/^Passif : /, '');
  const gem = x.cost ? (nin && x.pay !== 'g' ? `<span class="hpc-gem ck">${ckMarkH(x.cost)}</span>` : `<span class="hpc-gem g"><b>${x.cost}</b></span>`) : '<span class="hpc-gem p"><b>∞</b></span>';
  const shield = t => `<span class="op-sh"><svg viewBox="0 0 40 46"><path d="M3 3 H37 V28 L20 43 L3 28 Z" fill="url(#opsh)" stroke="#120a06" stroke-width="2.4"/><path d="M6.5 6.5 H33.5 V26.6 L20 38.6 L6.5 26.6 Z" fill="none" stroke="#e0b8f0" stroke-width="1.2"/>
      <defs><linearGradient id="opsh" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9a3aa8"/><stop offset="1" stop-color="#4a1260"/></linearGradient></defs>
      ${Array.from({ length:t }, (_, k) => { const cols = t > 3 ? 3 : t, r = Math.floor(k / 3), c = k % 3, n = Math.min(3, t - r * 3); return `<path transform="translate(${(20 + (c - (n - 1) / 2) * 9).toFixed(1)} ${(14 + r * 9).toFixed(1)}) scale(.36)" d="M0 -10 L2.9 -3.1 L10 -3.1 L4.3 1.2 L6.2 8.1 L0 4 L-6.2 8.1 L-4.3 1.2 L-10 -3.1 L-2.9 -3.1 Z" fill="#ffd86a" stroke="#5a3a10" stroke-width="1.4"/>`; }).join('')}</svg></span>`;
  const stat = (ic, v, tip) => `<span class="op-st" title="${tip}">${ic}<b>${v}</b></span>`;
  const rows = (p.hs || []).map(h => `<div class="op-row"><span class="op-sw">⚔</span><span class="op-burst${h.d > 0 ? ' w' : h.d < 0 ? ' l' : ''}"><b>${h.d > 0 ? '+' + h.d : h.d}</b></span>${h.h && HART[h.h] ? faceH('art-h-' + h.h, 'face op-of') : `<span class="op-of face">${esc((h.n || '?').slice(0, 1))}</span>`}</div>`).join('') || '<p class="op-none">Aucun combat pour l\'instant.</p>';
  return `<div class="oph" style="--c:${col}">
    <div class="oph-hero">${heroArchH(heroArt(p.h, p.haw), p.al ? Math.max(0, p.hp) : p.pl + 'e', 'oph-arch')}<b class="oph-nm">${esc(B.n)}</b><small class="oph-who">${esc(p.n)}${p.haw ? ' · éveillé' : ''}</small></div>
    ${powBannerH(x, p.h, nin)}
    <div class="oph-parch"><div class="op-stats">${shield(p.t || 1)}${stat('<svg class="op-tri" viewBox="0 0 44 44"><rect x="4" y="10" width="20" height="28" rx="3" fill="#8a96a8" stroke="#120a06" stroke-width="2" transform="rotate(-14 14 24)"/><rect x="10" y="8" width="20" height="28" rx="3" fill="#a8b4c4" stroke="#120a06" stroke-width="2"/><path d="M33 30 V14 L28 19 M33 14 L38 19" stroke="#2a7ad8" stroke-width="4" fill="none" stroke-linecap="round"/></svg>', p.tc || 0, 'Triples')}${stat('<span class="op-ic fire">🔥</span>', p.ws || 0, 'Victoires d\'affilée')}</div><div class="op-rows">${rows}</div></div>
  </div>`;
}
function heroCardH(hid, o = {}) {
  const h0 = HEROES[hid]; if (!h0) return ''; const h = o.aw && h0.awd ? h0.awd : h0;
  const th = HTHEME[hid] || 'spark', col = THC[th];
  const [ptitle, body, aff] = powerTitle(h);
  return `<div class="hcard th-${th}" style="--hc:${col}">
    <div class="hc-fx" aria-hidden="true">${hfxH(th)}</div>
    <div class="hc-port">${faceH(heroArt(hid, o.aw), 'face')}${h.cost ? `<span class="hc-cost">${h.cost}</span>` : ''}</div>
    <div class="hc-nm">${esc(h.n)}</div>${h.stars ? `<div class="hc-diff d${h.diff}" title="Rang">${'★'.repeat(h.stars)}</div>` : h.diff ? `<div class="hc-diff d${h.diff}" title="Difficulté">${'★'.repeat(h.diff)}${'☆'.repeat(3 - h.diff)} <small>${['', 'Simple', 'Intermédiaire', 'Expert'][h.diff]}</small></div>` : ''}
    ${o.who && o.who !== h.n ? `<div class="hc-who">joué par ${esc(o.who)}</div>` : ''}
    <div class="hc-kind">${h.cost ? 'Pouvoir héroïque' : 'Pouvoir passif'}${h.mc ? '' : ' · ' + (aff ? esc(aff) : THN[th])}</div>
    ${HEROES[hid] && HEROES[hid].mc && NJ_MC[HEROES[hid].mc] ? `<span class="famc"><i style="--c:${NJ_MC[HEROES[hid].mc][1]}">${esc(NJ_MC[HEROES[hid].mc][0])}</i></span>` : famChips(heroFam(hid))}
    ${ptitle ? `<div class="hc-pt">${esc(ptitle)}</div>` : ''}
    <p class="hc-tx">${esc(body)}</p>
    ${h0.q ? `<div class="hc-q${o.aw ? ' done' : ''}"><b>${o.aw ? 'Éveillé · ' + esc(h0.aw.nm) : 'Quête d\'éveil' + (o.qp != null ? ' · ' + Math.min(o.qp || 0, h0.q.n) + '/' + h0.q.n : '')}</b><small>${o.aw ? 'Nouveau pouvoir actif.' : esc(h0.q.tx) + ' → <b>' + esc(h0.aw.nm) + '</b> : ' + esc(h0.aw.tx)}</small></div>` : ''}
    ${h.pw && /^nh_/.test(hid) && NJ_AWK ? `<p class="hc-awk${awakeUI() ? ' on' : ''}"><b>Éveil :</b> ${esc(heroAwkTx(h))}</p>` : ''}
    ${o.foot ? `<div class="hc-foot">${esc(o.foot)}</div>` : ''}
  </div>`;
}
function compCardH(hid, id, me) {
  const th = HTHEME[hid] || 'spark', col = THC[th], h = HEROES[hid] || { n:'?' };
  const lim = compLimit(me.rd || 0), cb = me.cb || 0;
  const st = cb >= 3 ? 'Les trois sont recrutés' : cb >= lim ? (cb === 0 ? 'Recrutable dès la manche 3' : cb === 1 ? '2e exemplaire dès la manche 5' : '3e exemplaire dès la manche 6') : `Recruter pour 3 or · ${cb}/3`;
  return `<div class="hcomp th-${th}" style="--hc:${col}">
    <div class="hc-fx" aria-hidden="true">${hfxH(th, 16)}</div>
    <div class="hc-tag">${faceH('art-h-' + hid, 'face')}<span>Compagnon de <b>${esc(h.n)}</b></span></div>
    ${cardH(demo(id, 0), 'p', 0)}
    <div class="hc-foot">${esc(st)}</div>
  </div>`;
}

/* ---------- bulle des améliorations d'un serviteur ---------- */
function findMine(u) {
  if (u == null || !V.me) return null;
  for (const L of [V.me.bd, V.me.hd, V.me.sh, V.me.disc || [], V.me.cp ? [V.me.cp] : []]) { const m = (L || []).find(x => x && x.u != null && String(x.u) === String(u)); if (m) return m; }
  return null;
}
const sgn = v => (v >= 0 ? '+' : '') + v;
const kwNames = k => (k || '').split('').map(x => (SET.kw[x] || {}).n).filter(Boolean).join(', ');
function bonusTipH(m) {
  if (!m || m.sp) return '';
  const b = CD(m.c), g = m.g ? 3 : 1, ba = b.a * g, bh = b.h * g;
  const rows = []; let la = 0, lh = 0;
  (m.bn || []).forEach(e => {
    la += e.a; lh += e.h;
    const st = e.a || e.h ? `${sgn(e.a)}/${sgn(e.h)}` : '', kw = kwNames(e.k);
    rows.push(`<li><b>${[st, kw].filter(Boolean).join(' · ')}</b><span>${esc(e.s)}${e.n > 1 ? ` <i>×${e.n}</i>` : ''}</span></li>`);
  });
  const ra = m.a - ba - la, rh = m.h - bh - lh;
  if (ra || rh) rows.push(`<li><b>${sgn(ra)}/${sgn(rh)}</b><span>Autres effets</span></li>`);
  (m.x || []).forEach(e => rows.push(`<li class="ench"><b>Enchantement</b><span>${esc(fxText(e))}${e.src ? ` <i>${esc(e.src)}</i>` : ''}</span></li>`));
  if (m.tmp) { const kw = kwNames(m.tmp.f); rows.push(`<li class="tmp"><b>Prochain combat · ${sgn(m.tmp.a || 0)}/${sgn(m.tmp.h || 0)}${kw ? ' · ' + kw : ''}</b><span>${m.tmp.s ? esc(m.tmp.s) : 'Effet temporaire'}</span></li>`); }
  if (V.me && V.me.tma && V.me.bd.includes(m)) rows.push(`<li class="tmp"><b>Prochain combat · ${sgn(V.me.tma.a)}/${sgn(V.me.tma.h)}</b><span>Bonus pour tous tes serviteurs</span></li>`);
  if (!rows.length) return '';
  return `<div class="btip"><div class="bt-h">Améliorations<small>base ${ba}/${bh} → <b>${m.a}/${m.h}</b></small></div><ul>${rows.join('')}</ul></div>`;
}

/* =====================================================================
   LA SALLE DE LA TAVERNE — fond vivant : des héros s'affrontent autour
   de tables à hologrammes ; la table du premier plan est la tienne.
   ===================================================================== */
const SCENE_DUELS = [['nono', 'selene', 250, 655, .8], ['brok', 'sylvara', 1350, 655, .8], ['vaskor', 'egide', 545, 560, .5], ['pyra', 'grumbo', 1055, 560, .5], ['zoe', 'paul', 95, 545, .42], ['oren', 'maelle', 1505, 545, .42]];
function sceneSVG() {
  const okH = id => HART[id] ? id : 'rivet';
  const heroes = [...new Set(SCENE_DUELS.flatMap(d => [okH(d[0]), okH(d[1])]))];
  const sym = heroes.map(id => `<symbol id="hs-${id}" viewBox="0 0 100 106" overflow="visible">${HART[id]()}</symbol>`).join('');
  const CR = ['o_brute', 'g_alpha', 'o_bagarreur', 'gb_chapardeur', 'm_squelette', 'r_bombe', 'dg_dragonnet', 's_lueur', 'v_chauve', 'sf_braise', 'se_goutte', 'st_patate', 'b_chat', 'gb_dynamiteur', 'p_pilleur', 'd_brasseur', 'sg_bonhomme', 'sf_piment', 'sg_pingouin', 'sz_zap', 'se_meduse', 'sv_tornade', 'se_baleine', 'sf_volcan', 'sv_plume', 'st_champi'].filter(id => ART[id]);
  const crs = CR.map(id => `<symbol id="cr-${id}" viewBox="0 0 100 100" overflow="visible">${ART[id]()}</symbol>`).join('');
  const defs = `<defs>${sym}${crs}
    <radialGradient id="sc-fb"><stop offset="0" stop-color="#fffbe0"/><stop offset=".35" stop-color="#ffd34d"/><stop offset=".7" stop-color="#ff6a1a"/><stop offset="1" stop-color="#ff3a0a" stop-opacity="0"/></radialGradient>
    <radialGradient id="sc-boom"><stop offset="0" stop-color="#fff6c8"/><stop offset=".4" stop-color="#ffb03a" stop-opacity=".9"/><stop offset="1" stop-color="#ff5a1a" stop-opacity="0"/></radialGradient>
    <radialGradient id="sc-psn"><stop offset="0" stop-color="#c8ff8a" stop-opacity=".7"/><stop offset="1" stop-color="#4ab02a" stop-opacity="0"/></radialGradient>
    <radialGradient id="sc-scorch"><stop offset="0" stop-color="#0a0503" stop-opacity=".9"/><stop offset="1" stop-color="#0a0503" stop-opacity="0"/></radialGradient>
    <linearGradient id="sc-wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#140a05"/><stop offset=".55" stop-color="#2b170b"/><stop offset="1" stop-color="#3a2010"/></linearGradient>
    <linearGradient id="sc-floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a2210"/><stop offset="1" stop-color="#170c05"/></linearGradient>
    <linearGradient id="sc-beam" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#1c0f07"/><stop offset=".5" stop-color="#3a2210"/><stop offset="1" stop-color="#1c0f07"/></linearGradient>
    <linearGradient id="sc-top" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a5a30"/><stop offset="1" stop-color="#4a2c14"/></linearGradient>
    <linearGradient id="sc-beamh" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#7ff0ff" stop-opacity=".55"/><stop offset=".6" stop-color="#5fd8ff" stop-opacity=".12"/><stop offset="1" stop-color="#5fd8ff" stop-opacity="0"/></linearGradient>
    <radialGradient id="sc-warm"><stop offset="0" stop-color="#ffc06a" stop-opacity=".75"/><stop offset=".4" stop-color="#ff8a2a" stop-opacity=".25"/><stop offset="1" stop-color="#ff8a2a" stop-opacity="0"/></radialGradient>
    <radialGradient id="sc-cool"><stop offset="0" stop-color="#8ff4ff" stop-opacity=".55"/><stop offset=".5" stop-color="#3fb8ff" stop-opacity=".15"/><stop offset="1" stop-color="#3fb8ff" stop-opacity="0"/></radialGradient>
    <radialGradient id="sc-fire" cx="50%" cy="100%" r="80%"><stop offset="0" stop-color="#fff2b0"/><stop offset=".3" stop-color="#ffb03a"/><stop offset=".65" stop-color="#e8501a" stop-opacity=".7"/><stop offset="1" stop-color="#e8501a" stop-opacity="0"/></radialGradient>
    <radialGradient id="sc-night" cx="50%" cy="20%" r="90%"><stop offset="0" stop-color="#3a5a90"/><stop offset="1" stop-color="#0e1630"/></radialGradient>
    <clipPath id="sc-seat" clipPathUnits="userSpaceOnUse"><rect x="-420" y="-700" width="840" height="632"/></clipPath>
    <radialGradient id="sc-vig" cx="50%" cy="45%" r="75%"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".75"/></radialGradient>
  </defs>`;
  const OUTL = 'stroke="#0d0603" stroke-width="3" stroke-linejoin="round"';
  // mur, poutres, fenêtres, bannières rivales, âtre
  let s = `<rect width="1600" height="900" fill="url(#sc-wall)"/>`;
  s += [0, 1, 2, 3, 4, 5, 6, 7].map(k => `<rect x="${k * 200}" y="0" width="200" height="570" fill="${k % 2 ? '#24130a' : '#2a160b'}" opacity=".5"/>`).join('');
  s += [[300, 175], [1300, 175]].map(([x, y]) => `<g transform="translate(${x} ${y})"><path d="M-80 120 V-20 A80 80 0 0 1 80 -20 V120 Z" fill="url(#sc-night)" ${OUTL}/>
      <circle cx="30" cy="-30" r="20" fill="#f6efd0" opacity=".9"/><circle cx="38" cy="-36" r="18" fill="#2a4270"/>${[[-50, -10], [-20, 30], [50, 50], [-60, 70], [10, -60]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="1.8" fill="#fff" opacity=".8"/>`).join('')}
      <path d="M0 -100 V120 M-80 40 H80" stroke="#1a0e06" stroke-width="7"/><path d="M-80 120 V-20 A80 80 0 0 1 80 -20 V120 Z" fill="none" stroke="#5a3a1e" stroke-width="10"/><rect x="-96" y="118" width="192" height="14" rx="3" fill="#5a3a1e" ${OUTL}/></g>`).join('');
  s += `<rect x="0" y="70" width="1600" height="34" fill="url(#sc-beamh)" opacity="0"/><rect x="0" y="66" width="1600" height="30" fill="#24130a" ${OUTL}/>`;
  s += [110, 520, 1080, 1490].map(x => `<rect x="${x - 22}" y="0" width="44" height="575" fill="url(#sc-beam)" ${OUTL}/>`).join('');
  const banner = (x, col, dark, emblem) => `<g class="sc-ban" transform="translate(${x} 96)"><path d="M-48 0 H48 V190 L0 160 L-48 190 Z" fill="${col}" ${OUTL}/><path d="M-48 0 H48 V20 H-48 Z" fill="${dark}"/><path d="M-36 22 V172 M36 22 V172" stroke="#f2c14e" stroke-width="3" opacity=".7"/>${emblem}</g>`;
  s += banner(430, '#8a1e1a', '#5a1210', `<g transform="translate(0 86)"><path d="M-26 -26 L22 22 M26 -26 L-22 22" stroke="#f2c14e" stroke-width="8" stroke-linecap="round"/><path d="M-26 -26 L22 22 M26 -26 L-22 22" stroke="#fff1b8" stroke-width="3" stroke-linecap="round"/><circle r="9" fill="#f2c14e" ${OUTL}/></g>`);
  s += banner(1170, '#1a3a8a', '#10245a', `<g transform="translate(0 86)"><path d="M0 -32 L28 -20 V4 C 28 22, 14 32, 0 38 C -14 32, -28 22, -28 4 V-20 Z" fill="#f2c14e" ${OUTL}/><path d="M0 -20 V24 M-14 0 H14" stroke="#10245a" stroke-width="5"/></g>`);
  // âtre au fond
  s += `<g transform="translate(800 575)"><path d="M-190 0 V-190 Q-190 -260 0 -270 Q190 -260 190 -190 V0 Z" fill="#3a2a22" ${OUTL}/>
    ${[-150, -90, -30, 30, 90, 150].map((x, k) => `<rect x="${x - 28}" y="${-180 - (k % 2) * 6}" width="56" height="30" rx="5" fill="#4a382c" stroke="#1a0e08" stroke-width="2"/>`).join('')}
    <path d="M-120 0 V-120 Q-120 -175 0 -180 Q120 -175 120 -120 V0 Z" fill="#120804" ${OUTL}/>
    <ellipse class="sc-fire" cx="0" cy="-10" rx="110" ry="120" fill="url(#sc-fire)"/>
    <g class="sc-flames">${[[-50, 1], [0, 1.3], [48, .95], [-22, .8], [24, .85]].map(([x, k]) => `<path d="M${x} 0 C ${x - 26 * k} -40, ${x - 8 * k} -70, ${x} ${-110 * k} C ${x + 10 * k} -70, ${x + 26 * k} -40, ${x} 0 Z" fill="#ffb03a" opacity=".85"/>`).join('')}</g>
    <rect x="-100" y="-12" width="200" height="14" rx="6" fill="#3a2010" ${OUTL}/></g>
    <circle cx="800" cy="520" r="420" fill="url(#sc-warm)" class="sc-hglow"/>`;
  // sol en planches (perspective)
  s += `<path d="M0 570 H1600 V900 H0 Z" fill="url(#sc-floor)"/>` + Array.from({ length:17 }, (_, k) => { const x = k * 100; return `<path d="M${800 + (x - 800) * .32} 570 L${800 + (x - 800) * 2.3} 900" stroke="#1a0d05" stroke-width="2" opacity=".55"/>`; }).join('')
    + [600, 640, 700, 790].map(y => `<path d="M0 ${y} H1600" stroke="#1a0d05" stroke-width="1.5" opacity=".35"/>`).join('');
  // lanternes
  s += [[220, 150, 0], [660, 120, 1], [940, 120, 2], [1380, 150, 3]].map(([x, l, k]) => `<g class="sc-lan" style="--k:${k}" transform="translate(${x} 96)"><path d="M0 0 V${l}" stroke="#1a0e06" stroke-width="3"/><g transform="translate(0 ${l})"><circle r="120" fill="url(#sc-warm)" class="sc-lglow"/><path d="M-16 0 H16 L12 34 H-12 Z" fill="#ffd27a" ${OUTL}/><path d="M-20 -4 H20 M-16 36 H16" stroke="#2a1608" stroke-width="6" stroke-linecap="round"/><path d="M0 4 V30" stroke="#fff6d0" stroke-width="3" opacity=".7"/></g></g>`).join('');
  s += chaosBack(OUTL);
  // tables de duel
  const table = ([L, Rh, x, y, k], i, mine) => {
    const holo = mine
      ? `<g class="sc-holo idle"><path d="M-34 -84 L-150 -330 L150 -330 L34 -84 Z" fill="url(#sc-beamh)" opacity=".55"/><ellipse cx="0" cy="-230" rx="120" ry="30" fill="none" stroke="#8ff4ff" stroke-width="3" stroke-dasharray="14 10" class="sc-ring"/><ellipse cx="0" cy="-230" rx="80" ry="20" fill="none" stroke="#8ff4ff" stroke-width="2" opacity=".7" class="sc-ring r2"/><circle cx="0" cy="-230" r="160" fill="url(#sc-cool)"/></g>`
      : `<g class="sc-holo" style="--i:${i}"><path d="M-30 -82 L-112 -262 L112 -262 L30 -82 Z" fill="url(#sc-beamh)"/>
        <path d="M-96 -188 H96 L78 -236 H-78 Z" fill="#5fd8ff" fill-opacity=".1" stroke="#8ff4ff" stroke-width="2.4"/><path d="M-87 -212 H87" stroke="#8ff4ff" stroke-width="1.4" opacity=".6"/>
        ${[-60, -20, 20, 60].map((tx, j) => `<g class="sc-tok" style="--j:${j}"><circle cx="${tx}" cy="-198" r="9" fill="#ff6a5a" fill-opacity=".55" stroke="#ffd0c8" stroke-width="2"/><circle cx="${tx * .82}" cy="-226" r="8" fill="#5ab0ff" fill-opacity=".55" stroke="#d8f0ff" stroke-width="2"/></g>`).join('')}
        <g class="sc-spark"><path d="M0 -262 L7 -246 L22 -244 L10 -233 L14 -218 L0 -226 L-14 -218 L-10 -233 L-22 -244 L-7 -246 Z" fill="#fff6b0"/></g>
        <circle cx="0" cy="-215" r="130" fill="url(#sc-cool)"/></g>`;
    const seat = mine ? ''
      : `<g class="sc-duelist l"><use class="sc-h2d" data-h="${okH(L)}" href="#hs-${okH(L)}" x="-215" y="-232" width="135" height="143"/><rect class="sc-hpb" x="-200" y="-252" width="104" height="8" rx="4" fill="#3a0a06"/><rect class="sc-hp" x="-200" y="-252" width="${70 + (i * 17) % 34}" height="8" rx="4" fill="#ff5a4a"/></g>
         <g class="sc-duelist r"><g transform="scale(-1 1)"><use class="sc-h2d" data-h="${okH(Rh)}" href="#hs-${okH(Rh)}" x="-215" y="-232" width="135" height="143"/></g><rect class="sc-hpb" x="96" y="-252" width="104" height="8" rx="4" fill="#0a1a3a"/><rect class="sc-hp" x="96" y="-252" width="${64 + (i * 23) % 40}" height="8" rx="4" fill="#5ab0ff"/></g>`;
    return `<g class="sc-table${mine ? ' mine' : ''}" transform="translate(${x} ${y}) scale(${k})">
      <ellipse cx="0" cy="58" rx="250" ry="34" fill="#000" opacity=".45"/>
      ${seat}${holo}
      <path d="M-210 -76 V-56 Q0 -6 210 -56 V-76 Z" fill="#3a2010" ${OUTL}/>
      <ellipse cx="0" cy="-76" rx="210" ry="48" fill="url(#sc-top)" ${OUTL}/><ellipse cx="0" cy="-78" rx="186" ry="38" fill="none" stroke="#a8743e" stroke-width="2" opacity=".6"/>
      <rect x="-20" y="-50" width="40" height="104" fill="#3a2010" ${OUTL}/><ellipse cx="0" cy="56" rx="70" ry="14" fill="#2a1608" ${OUTL}/>
      <ellipse cx="0" cy="-84" rx="34" ry="9" fill="#c8963e" ${OUTL}/><ellipse cx="0" cy="-87" rx="22" ry="5" fill="#8ff4ff" class="sc-core"/>
    </g>`;
  };
  s += SCENE_DUELS.slice().sort((a, b) => a[3] - b[3]).map((d, i) => table(d, i, false)).join('');
  s += table([null, null, 800, 1035, 2.05], 9, true);
  s += chaosFront(OUTL);
  s += `<rect width="1600" height="900" fill="url(#sc-vig)"/>`;
  return `<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${defs}${s}</svg>`;
}
function sceneMode() {
  let el = document.getElementById('scene');
  if (!el) { el = document.createElement('div'); el.id = 'scene'; document.body.prepend(el); }
  if (!el.dataset.cs) { try { castleScene(el); } catch (e) { console.warn(e); } }
  const m = V.screen === 'menu' ? 'sc-menu' : V.screen === 'lobby' || V.waitTable ? 'sc-lobby' : V.screen === 'atelier' ? 'sc-atl' : 'sc-game';
  if (!document.body.classList.contains(m)) { document.body.classList.remove('sc-menu', 'sc-lobby', 'sc-atl', 'sc-game'); document.body.classList.add(m); }
  if (V.screen === 'menu' && !V.mp && typeof csLeave === 'function') csLeave();
  document.body.classList.toggle('cs-still', (V.screen === 'menu' && !!V.mp) || V.screen === 'lobby' || !!V.waitTable);
}

try { sceneMode(); } catch (e) {}

/* ---------- la bagarre générale ---------- */
const crU = (id, x, y, w, extra = '') => ART[id] ? `<use href="#cr-${id}" x="${x}" y="${y}" width="${w}" height="${w}" ${extra}/>` : '';
const comic = (x, y, txt, cls, rot = -8, size = 44) => `<g transform="translate(${x} ${y}) rotate(${rot})"><g class="sc-pow ${cls}"><path d="${starPath(0, 0, size * 1.45, size * .95, 12)}" fill="#fff36a" stroke="#2a1204" stroke-width="4"/><path d="${starPath(0, 0, size * 1.2, size * .78, 12)}" fill="#ff7a2a" opacity=".85"/><text x="0" y="${size * .32}" text-anchor="middle" font-family="Lilita One,Arial Black,sans-serif" font-size="${size}" fill="#fff" stroke="#2a1204" stroke-width="7" paint-order="stroke" letter-spacing="1">${txt}</text></g></g>`;
function starPath(cx, cy, r1, r2, n) { let d = ''; for (let k = 0; k < n * 2; k++) { const r = k % 2 ? r2 : r1, a = Math.PI * k / n - Math.PI / 2; d += (k ? 'L' : 'M') + f1(cx + Math.cos(a) * r) + ' ' + f1(cy + Math.sin(a) * r); } return d + 'Z'; }
const barrel = (x, y, w, h, O) => `<g transform="translate(${x} ${y})"><rect x="${-w / 2}" y="${-h}" width="${w}" height="${h}" rx="${w * .3}" fill="#6a4020" ${O}/><path d="M${-w / 2 + 3} ${-h * .22} Q0 ${-h * .16} ${w / 2 - 3} ${-h * .22} M${-w / 2 + 3} ${-h * .78} Q0 ${-h * .72} ${w / 2 - 3} ${-h * .78}" fill="none" stroke="#2a1608" stroke-width="6"/><ellipse cx="0" cy="${-h}" rx="${w / 2 - 2}" ry="${w * .14}" fill="#4a2a12" ${O}/></g>`;
function chaosBack(O) {
  let s = '';
  // tonneaux (une patate s'y cache, un chat dort dessus)
  s += crU('st_patate', 40, 318, 72, 'class="sc-peek"') + barrel(70, 575, 84, 104, O) + barrel(156, 575, 84, 104, O) + barrel(112, 474, 84, 100, O);
  s += crU('b_chat', 1486, 326, 64) + barrel(1478, 575, 84, 104, O) + barrel(1562, 575, 84, 104, O) + barrel(1520, 474, 84, 100, O);
  // trou dans le mur, avec des jambes qui gigotent
  s += `<g transform="translate(300 430)"><path d="M-62 -40 L-40 -58 L-8 -50 L20 -64 L52 -44 L66 -10 L50 30 L12 44 L-30 38 L-60 14 Z" fill="#0a0503" ${O}/>
    ${[[-70, -52, 20], [58, -58, -14], [70, 22, 10], [-66, 30, -18]].map(([a, b, r]) => `<rect x="${a}" y="${b}" width="26" height="14" rx="3" fill="#4a382c" stroke="#1a0e08" stroke-width="2" transform="rotate(${r} ${a} ${b})"/>`).join('')}
    <g class="sc-kick"><path d="M-14 0 L-30 60 L-12 62 L4 4 Z" fill="#5a3a7a" ${O}/><path d="M-34 56 L-8 58 L-4 74 L-44 76 Z" fill="#2a1608" ${O}/></g>
    <g class="sc-kick k2"><path d="M8 0 L26 58 L42 52 L24 -2 Z" fill="#5a3a7a" ${O}/><path d="M22 54 L46 48 L56 62 L26 72 Z" fill="#2a1608" ${O}/></g></g>`;
  // affiche « Recherché »
  s += `<g transform="translate(470 395) rotate(5)"><rect x="-44" y="-56" width="88" height="112" rx="3" fill="#ecd9a8" ${O}/><text x="0" y="-38" text-anchor="middle" font-family="Grenze,Georgia,serif" font-weight="700" font-size="14" fill="#5a1a10">RECHERCHÉ</text>
    <rect x="-28" y="-30" width="56" height="50" fill="#c8b080" stroke="#5a3a1e" stroke-width="2"/>${crU('gb_dynamiteur', -27, -30, 54)}
    <text x="0" y="34" text-anchor="middle" font-family="Grenze,Georgia,serif" font-size="10" fill="#3a2010">pour la 3e fois</text><text x="0" y="48" text-anchor="middle" font-family="Grenze,Georgia,serif" font-weight="700" font-size="11" fill="#7a1a10">10 or</text>
    <circle cx="0" cy="-52" r="3" fill="#8a8a8a"/></g>`;
  // panneau calciné, avec une flèche plantée
  s += `<g transform="translate(1300 420) rotate(-9)"><rect x="-92" y="-30" width="184" height="60" rx="6" fill="#8a5a30" ${O}/><circle cx="70" cy="-14" r="38" fill="url(#sc-scorch)"/>
    <text x="-8" y="-6" text-anchor="middle" font-family="Grenze,Georgia,serif" font-weight="700" font-size="16" fill="#f6e2b0">PRIÈRE DE NE PAS</text><text x="-8" y="16" text-anchor="middle" font-family="Grenze,Georgia,serif" font-weight="700" font-size="16" fill="#f6e2b0">LANCER DE SORTS</text>
    <path d="M-60 -60 L-30 -4" stroke="#3a2010" stroke-width="4"/><path d="M-66 -70 L-58 -56 L-50 -66 Z" fill="#e8e0d0" ${O}/></g>`;
  // cible et hache
  s += `<g transform="translate(1170 372)"><circle r="34" fill="#e8d8b0" ${O}/><circle r="24" fill="#b8302a"/><circle r="14" fill="#e8d8b0"/><circle r="6" fill="#b8302a"/>
    <g transform="rotate(-30)"><rect x="-4" y="-56" width="8" height="52" rx="3" fill="#7a4a28" ${O}/><path d="M-4 -52 C -26 -60, -30 -36, -4 -30 Z" fill="#c8c8d0" ${O}/></g></g>`;
  // lustre, avec un gobelin qui fait de la balançoire
  s += `<g class="sc-chand"><path d="M800 96 V128" stroke="#1a0e06" stroke-width="4"/>${crU('gb_chapardeur', 748, 44, 104)}
    <ellipse cx="800" cy="132" rx="96" ry="16" fill="none" stroke="#3a2010" stroke-width="9"/><ellipse cx="800" cy="132" rx="96" ry="16" fill="none" stroke="#c8963e" stroke-width="3"/>
    ${[-80, -40, 40, 80].map(dx => `<rect x="${796 + dx}" y="${112 + Math.abs(dx) * .05}" width="8" height="16" fill="#f6efd0" stroke="#1a0e06" stroke-width="1.5"/><ellipse class="sc-candle" cx="${800 + dx}" cy="${108 + Math.abs(dx) * .05}" rx="4" ry="7" fill="#ffd34d"/>`).join('')}</g>`;
  // flaques, éclats, cartes et pièces par terre
  s += [[640, 640, 60], [985, 690, 48], [335, 770, 70], [1260, 780, 56]].map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * .28}" fill="#e8a83a" opacity=".38"/>`).join('');
  s += [[600, 700, 20], [720, 760, -30], [1010, 760, 50], [1100, 650, -12], [380, 690, 70], [880, 680, 15]].map(([x, y, r]) => `<rect x="${x}" y="${y}" width="22" height="30" rx="3" fill="#f2e6c8" stroke="#3a2010" stroke-width="2" transform="rotate(${r} ${x} ${y})"/>`).join('');
  s += [[560, 740], [690, 690], [930, 740], [1180, 690], [460, 650], [1060, 720]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="8" ry="4" fill="#f2c14e" stroke="#5a3a10" stroke-width="1.5"/>`).join('');
  // dans l'âtre : une braise ravie, une goutte paniquée
  s += `<g class="sc-bob">${crU('sf_braise', 862, 470, 84)}</g><g class="sc-panic">${crU('se_goutte', 592, 500, 70)}<path d="M664 506 C 670 514, 670 520, 664 522 C 658 520, 658 514, 664 506 Z" fill="#bfe8ff" stroke="#1a0e06" stroke-width="1.5"/></g>`;
  // la bombe ambulante traverse le fond… puis explose
  s += `<g class="sc-bomb">${crU('r_bombe', -40, -86, 80)}</g><g transform="translate(990 560)"><g class="sc-bombboom"><circle r="90" fill="url(#sc-boom)"/></g></g>${comic(990, 520, 'BOUM !', 'pb', 6, 40)}`;
  return s;
}
function chaosFront(O) {
  let s = '';
  // dragonnet perché sur la bannière bleue, qui crache du feu
  s += `${crU('dg_dragonnet', 1120, 10, 92)}<g transform="translate(1124 62)"><g class="sc-breath"><ellipse cx="-70" cy="10" rx="70" ry="22" fill="url(#sc-fb)"/></g></g>`;
  // fantôme à la fenêtre
  s += `<g class="sc-ghost">${crU('s_lueur', 1226, 250, 92)}</g>`;
  // ogre caché derrière une table renversée (avec flèches plantées)
  s += `<g class="sc-duck">${crU('o_bagarreur', 1402, 610, 120)}</g>
    <g transform="translate(1440 790)"><ellipse cx="0" cy="0" rx="58" ry="118" fill="url(#sc-top)" ${O}/><ellipse cx="0" cy="0" rx="44" ry="100" fill="none" stroke="#a8743e" stroke-width="2" opacity=".6"/>
    <rect x="50" y="-12" width="90" height="22" rx="6" fill="#3a2010" ${O}/><ellipse cx="140" cy="0" rx="12" ry="26" fill="#2a1608" ${O}/>
    ${[[-30, -40, -24], [8, 10, 18], [-16, 60, -6]].map(([x, y, r]) => `<g transform="translate(${x} ${y}) rotate(${r})"><path d="M0 0 L-58 0" stroke="#5a3a1e" stroke-width="4"/><path d="M-58 0 L-70 -8 M-58 0 L-70 8 M-50 0 L-62 -8 M-50 0 L-62 8" stroke="#e8e0d0" stroke-width="3"/></g>`).join('')}</g>`;
  // squelette KO, avec ses étoiles
  s += `<g transform="translate(190 830) rotate(-78)">${crU('m_squelette', -50, -50, 100)}</g>
    <g transform="translate(150 755)"><g class="sc-stars">${[0, 120, 240].map(a => `<path d="${starPath(Math.cos(a * Math.PI / 180) * 34, Math.sin(a * Math.PI / 180) * 12, 10, 4.4, 5)}" fill="#fff36a" stroke="#2a1204" stroke-width="2"/>`).join('')}</g></g>
    ${[[250, 860, 30], [110, 870, -20], [290, 820, 70]].map(([x, y, r]) => `<g transform="translate(${x} ${y}) rotate(${r})"><rect x="-16" y="-4" width="32" height="8" rx="4" fill="#f2ecdc" stroke="#1a0e06" stroke-width="2"/><circle cx="-16" cy="-4" r="5" fill="#f2ecdc" stroke="#1a0e06" stroke-width="2"/><circle cx="-16" cy="4" r="5" fill="#f2ecdc" stroke="#1a0e06" stroke-width="2"/><circle cx="16" cy="-4" r="5" fill="#f2ecdc" stroke="#1a0e06" stroke-width="2"/><circle cx="16" cy="4" r="5" fill="#f2ecdc" stroke="#1a0e06" stroke-width="2"/></g>`).join('')}`;
  // ===== la bande des Squishys =====
  // la Baleine dodue s'est assise en plein sur une partie en cours
  s += `<g class="sc-squash">${crU('se_baleine', 990, 400, 130)}</g>${comic(1130, 405, 'POUF !', 'pp', 10, 28)}`;
  // le Volcan rigolo entre en éruption sur une table
  s += `${crU('sf_volcan', 500, 420, 100)}${[[-30, 0], [0, 1], [26, 2], [-12, 3]].map(([dx, k]) => `<circle class="sc-lava" style="--k:${k};--dx:${dx}px" cx="${550}" cy="${430}" r="${7 + k % 2 * 3}" fill="#ff7a2a" stroke="#2a1204" stroke-width="2"/>`).join('')}`;
  // la Tornade gigoteuse aspire les pions de l'hologramme
  s += `<g transform="translate(250 470)"><g class="sc-tornado">${crU('sv_tornade', -48, -60, 96)}</g>${[0, 1, 2].map(k => `<circle class="sc-suck" style="--k:${k}" cx="${-70 + k * 50}" cy="40" r="7" fill="${k % 2 ? '#5ab0ff' : '#ff6a5a'}" fill-opacity=".7" stroke="#fff" stroke-width="1.5"/>`).join('')}</g>`;
  // bataille de boules de neige : glace contre feu
  s += `<g class="sc-throw">${crU('sg_bonhomme', 452, 596, 104)}</g><g class="sc-hit">${crU('sf_piment', 1092, 606, 96)}</g>
    <g class="sc-fly snow"><circle r="13" fill="#f4fbff" stroke="#2a1204" stroke-width="3"/><circle cx="-4" cy="-4" r="4" fill="#fff"/></g>
    <g transform="translate(1140 660)"><g class="sc-splat">${[0, 60, 120, 180, 240, 300].map(a => `<circle cx="${f1(Math.cos(a * Math.PI / 180) * 22)}" cy="${f1(Math.sin(a * Math.PI / 180) * 22)}" r="7" fill="#f4fbff" stroke="#2a1204" stroke-width="2"/>`).join('')}</g></g>${comic(1150, 580, 'SPLOTCH !', 'ps', -8, 30)}`;
  // le Pingouin glisse sur la bière
  s += `<g class="sc-slide"><g transform="rotate(-78)">${crU('sg_pingouin', -45, -45, 90)}</g><path d="M50 30 L90 30 M46 44 L80 44" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".8"/></g>${comic(760, 770, 'WIIII !', 'pw', -6, 26)}`;
  // le Petit zap électrise la Méduse gélatine
  s += `<g class="sc-jelly">${crU('se_meduse', 1300, 470, 84)}</g>${crU('sz_zap', 1222, 476, 70)}<g class="sc-zapb"><path d="M1282 506 L1298 498 L1294 512 L1312 504" fill="none" stroke="#fff36a" stroke-width="5" stroke-linejoin="round"/><path d="M1282 516 L1300 522 L1292 530 L1312 534" fill="none" stroke="#fff" stroke-width="3" stroke-linejoin="round"/></g>`;
  // Plumette s'envole avec une carte
  s += `<g class="sc-fly plume">${crU('sv_plume', -36, -36, 72)}<rect x="22" y="12" width="20" height="28" rx="3" fill="#f2e6c8" stroke="#3a2010" stroke-width="2" transform="rotate(18 32 26)"/></g>`;
  // nuage de poison
  s += `<g transform="translate(70 800)">${[0, 1, 2, 3].map(k => `<circle class="sc-psn" style="--k:${k}" cx="${k * 26 - 30}" cy="${-k * 8}" r="${46 - k * 6}" fill="url(#sc-psn)"/>`).join('')}</g>`;
  // nuages de bagarre (poings, bottes, têtes)
  const brawl = (x, y, k, a, b, word, cls) => `<g transform="translate(${x} ${y}) scale(${k})"><g class="sc-brawl">
      ${crU(a, -150, -205, 130, `class="sc-head"`)}${crU(b, 20, -215, 130, `class="sc-head h2"`)}
      ${[[-70, -10, 60], [-10, -40, 72], [56, -8, 62], [10, 26, 58], [-50, 30, 50], [80, 34, 44]].map(([cx, cy, r]) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#efe2c4" ${O}/>`).join('')}
      ${[[-70, -10, 60], [-10, -40, 72], [56, -8, 62], [10, 26, 58], [-50, 30, 50], [80, 34, 44]].map(([cx, cy, r]) => `<circle cx="${cx}" cy="${cy}" r="${r - 4}" fill="#efe2c4"/>`).join('')}
      <g class="sc-limb l1"><path d="M-120 -20 L-160 -40" stroke="#3a2010" stroke-width="12" stroke-linecap="round"/><circle cx="-166" cy="-44" r="16" fill="#f0c8a0" ${O}/></g>
      <g class="sc-limb l2"><path d="M120 10 L170 -6" stroke="#5a3a7a" stroke-width="13" stroke-linecap="round"/><path d="M162 -20 L196 -18 L198 2 L166 4 Z" fill="#2a1608" ${O}/></g>
      <g class="sc-limb l3"><path d="M30 -100 L48 -150" stroke="#3a2010" stroke-width="12" stroke-linecap="round"/><circle cx="50" cy="-156" r="15" fill="#8fbf6a" ${O}/></g>
      <g class="sc-limb l4"><path d="M-40 80 L-70 124" stroke="#5a3a7a" stroke-width="13" stroke-linecap="round"/><path d="M-90 118 L-58 116 L-56 136 L-94 138 Z" fill="#2a1608" ${O}/></g>
      ${[[-30, -20], [30, 10], [-6, 30]].map(([cx, cy], j) => `<path class="sc-twk" style="--j:${j}" d="${starPath(cx, cy, 14, 6, 5)}" fill="#fff36a" stroke="#2a1204" stroke-width="2"/>`).join('')}
    </g></g>${comic(x + (cls === 'pa' ? 90 : -90) * k, y - 150 * k, word, cls, cls === 'pa' ? 10 : -10, 42 * Math.max(.8, k))}`;
  s += brawl(440, 805, .95, 'o_brute', 'g_alpha', 'BAM !', 'pa') + brawl(1150, 812, .72, 'p_pilleur', 'd_brasseur', 'PAF !', 'pb2');
  s += comic(255, 740, 'AÏE !', 'pc', -14, 30);
  // éclair qui s'abat sur les tonneaux
  s += `<g class="sc-bolt"><path d="M70 60 L120 170 L84 180 L140 300 L104 306 L128 380" fill="none" stroke="#fff" stroke-width="9" stroke-linejoin="round"/><path d="M70 60 L120 170 L84 180 L140 300 L104 306 L128 380" fill="none" stroke="#8fd8ff" stroke-width="4" stroke-linejoin="round"/></g>${comic(200, 330, 'KRAK !', 'pk', 8, 34)}`;
  // éclat de givre près de la fenêtre de droite
  s += `<g transform="translate(1420 300)"><g class="sc-frost">${[0, 45, 90, 135, 180, 225, 270, 315].map(a => `<g transform="rotate(${a})"><path d="M0 -10 L0 -46 M0 -30 L-10 -40 M0 -30 L10 -40" stroke="#dff6ff" stroke-width="4" stroke-linecap="round"/></g>`).join('')}<circle r="14" fill="#bfe8ff" ${O}/></g></g>`;
  // ce qui vole : boule de feu, chaise, chope, chauves-souris
  s += `<g class="sc-fly fb"><ellipse cx="-40" cy="0" rx="60" ry="14" fill="#ff8a2a" opacity=".45"/><circle r="26" fill="url(#sc-fb)"/></g><g transform="translate(1330 400)"><g class="sc-fbboom"><circle r="100" fill="url(#sc-boom)"/></g></g>${comic(1330, 330, 'BOUM !', 'pf', -6, 38)}`;
  s += `<g class="sc-fly chair"><g transform="translate(-30 -40)"><rect x="0" y="40" width="60" height="12" rx="3" fill="#7a4a28" ${O}/><rect x="2" y="0" width="10" height="44" fill="#7a4a28" ${O}/><rect x="48" y="0" width="10" height="44" fill="#7a4a28" ${O}/><rect x="2" y="6" width="56" height="8" fill="#5a3a1e" ${O}/><path d="M6 52 L4 92 M54 52 L56 92" stroke="#5a3a1e" stroke-width="8" stroke-linecap="round"/></g></g>`;
  s += `<g class="sc-fly mug"><g transform="translate(-20 -24)"><rect x="0" y="6" width="34" height="42" rx="5" fill="#d8b070" ${O}/><path d="M34 16 C 48 16, 48 38, 34 38" fill="none" stroke="#2a1608" stroke-width="6"/><path d="M-2 8 C 6 -4, 18 4, 22 -2 C 28 -6, 38 2, 36 10 Z" fill="#fff8e8" ${O}/><circle cx="-10" cy="-8" r="5" fill="#e8a83a"/><circle cx="-20" cy="4" r="4" fill="#e8a83a"/></g></g>`;
  s += `<g class="sc-fly bat b1">${crU('v_chauve', -50, -30, 100)}</g><g class="sc-fly bat b2">${crU('v_chauve', -40, -24, 80)}</g>`;
  return s;
}

/* les héros des tables deviennent des figurines 3D (une par une, en fondu) */
function sceneHeroes3D() {
  const el = document.getElementById('scene'); if (!el || typeof heroRenderer !== 'function') return;
  const uses = [...el.querySelectorAll('use.sc-h2d')]; if (!uses.length) return;
  const R = heroRenderer(); if (!R) return;
  const ids = [...new Set(uses.map(u => u.dataset.h))]; const cache = {};
  const NS = 'http://www.w3.org/2000/svg';
  const step = () => {
    const id = ids.shift(); if (!id) { R.done(); return; }
    let url = null; try { url = R.render(id); } catch (e) { url = null; }
    if (url && url.length > 2000) {
      cache[id] = url;
      uses.filter(u => u.dataset.h === id).forEach(u => {
        const im = document.createElementNS(NS, 'image');
        // cadrage : tête au même endroit que le portrait dessiné, mains posées sur la table
        im.setAttribute('href', url); im.setAttribute('x', '-262'); im.setAttribute('y', '-330'); im.setAttribute('width', '225'); im.setAttribute('height', '272');
        im.setAttribute('class', 'sc-h3d'); im.setAttribute('clip-path', 'url(#sc-seat)');
        u.replaceWith(im);
      });
      el.querySelectorAll('.sc-hpb,.sc-hp').forEach(b => b.setAttribute('y', '-338'));
    }
    setTimeout(step, 16);
  };
  step();
}

/* ---------- affichage des lois des univers ---------- */
const famChips = trs => `<span class="famc">${trs.map(t => `<i style="--c:${esc((TRIBES[t] || {}).col || '#888')}">${esc(trName(t) || t)}</i>`).join('')}</span>`;
// grand encart de la loi de l'univers (écran du choix du héros)
function lawBigH(d) {
  const laws = d.laws || []; if (!laws.length) return '';
  return laws.map(l => { const M = MECHS[l.k] || MECHS.none, u = (SET.univ || []).find(x => x.n === l.u), L = u ? univLook(u) : { col:'#9a7228', ic:M.ic };
    return `<section class="lawbig" style="--uc:${esc(L.col)}"><span class="lb-em">${icon(M.ic)}</span><div class="lb-t"><small>Univers · ${esc(l.u || '')}</small><b>Loi : ${esc(M.n)}</b>${l.k === 'chakra' ? chakraLawH(true) : `<p>${esc(M.d)}</p>`}
      <span class="lb-fam">${(l.trs || []).map(t => `<i style="--c:${esc((TRIBES[t] || {}).col || '#888')}">${esc(trName(t) || t)}</i>`).join('')}</span></div></section>`; }).join('');
}
function lawsH(laws, compact) {
  if (!laws || !laws.length) return '';
  return `<div class="laws${compact ? ' compact' : ''}">${laws.map(l => { const M = MECHS[l.k] || MECHS.none; return `<div class="law" data-tip="${esc(M.n + ' : ' + M.d + ' Familles : ' + l.trs.map(trName).join(', ') + '.')}">${icon(M.ic, 'lic')}<span><b>${esc(M.n)}</b>${compact ? '' : `<small>${esc(l.u)} · ${esc(M.d)}</small>`}</span></div>`; }).join('')}</div>`;
}

/* après un combat : on efface toute trace d'animation sur les cartes réutilisées */
function arenaCleanup() {
  if (V.fight && V.fight.lunge) { try { V.fight.lunge.cancel(); } catch (e) {} V.fight.lunge = null; }
  document.querySelectorAll('#app .mn, #app .cd').forEach(el => {
    try { el.getAnimations().forEach(a => a.cancel()); } catch (e) {}
    el.style.removeProperty('z-index'); el.style.removeProperty('transform');
  });
}

/* compagnon des Cinq Nations, à côté du héros */
(function(){ const st = document.createElement('style'); st.textContent = `
.cpz{display:flex;flex-direction:column;align-items:center;gap:2px;padding:4px 8px 6px;border-radius:12px;background:rgba(20,12,6,.55);box-shadow:inset 0 0 0 1.5px rgba(242,193,78,.45);flex:none}
.cpz-h{font:700 10px/1 Grenze,serif;letter-spacing:.12em;text-transform:uppercase;color:#f2c14e}
.cpz small{font-size:10px;color:#e8d6b0;white-space:nowrap}
.cpz .mn.cp-tok{--tw:64px;transform:none;margin:0}
.cpz-row{display:flex;align-items:center;gap:4px}
.cpz .vs{font:700 14px Grenze,serif;color:#ff9a5a;text-shadow:0 1px 0 #000}
.cpz.win{box-shadow:inset 0 0 0 2px #f2c14e,0 0 14px rgba(242,193,78,.6)}
.cpz.loss{box-shadow:inset 0 0 0 2px #7a8aa0}
.duel-l{margin:4px 0 0;font-size:13px;color:#e8d6b0}.duel-l.win{color:#f2c14e}
`; document.head.appendChild(st); })();

/* fiche de l'univers Ninja */
(function(){ const st = document.createElement('style'); st.textContent = `
.nj-law{gap:7px}
.nj-r{display:grid;grid-template-columns:26px 1fr;gap:7px;align-items:start}
.nj-i{width:26px;height:26px;border-radius:50%;display:grid;place-items:center;background:var(--c);box-shadow:inset 0 0 0 1.5px rgba(255,220,150,.45)}
.nj-i svg{width:18px;height:18px}
.nj-r b,.nj-el b{display:block;font-size:12.5px;color:#ffd86a;font-family:var(--f-label)}
.nj-r small,.nj-el small{font-size:11.5px;line-height:1.3}
.nj-el{display:grid;grid-template-columns:74px 1fr;gap:7px;align-items:center;margin-top:2px;padding-top:7px;border-top:1px solid rgba(242,193,78,.25)}
.nj-el .elc{width:74px;height:74px}
`; document.head.appendChild(st); })();

/* réservoir des techniques et annonce de combo */
(function(){ const st = document.createElement('style'); st.textContent = `
.rsv{display:flex;flex-direction:column;align-items:center;gap:1px;flex:none;cursor:help}
.rsv svg{width:52px;height:60px;filter:drop-shadow(0 2px 3px rgba(0,0,0,.6))}
.rsv small{font:700 10px/1 var(--f-label),serif;color:#f2c14e;letter-spacing:.06em;text-transform:uppercase}
.rsv.half svg{filter:drop-shadow(0 0 6px rgba(111,200,255,.55)) drop-shadow(0 2px 3px rgba(0,0,0,.6))}
.rsv-lo{animation:rsvw 2.4s ease-in-out infinite alternate}
@keyframes rsvw{from{transform:translateY(1px)}to{transform:translateY(-1px)}}
.combo-fx{position:fixed;inset:0;display:grid;place-items:center;pointer-events:none;z-index:90;animation:cbf 2.6s ease forwards}
.cbx{display:grid;justify-items:center;gap:4px;padding:22px 34px 18px;border-radius:18px;background:rgba(14,8,4,.88);box-shadow:0 0 0 2px var(--cc),0 0 40px var(--cc);text-align:center;max-width:360px}
.cbx-orb{width:84px;height:84px;border-radius:50%;background:linear-gradient(180deg,var(--c2) 0 50%,var(--c1) 50% 100%);box-shadow:inset 0 0 0 3px #120a06,0 0 30px var(--cc);animation:cbo 1.1s ease-in-out forwards}
.cbx small{font-size:12px;color:#e8d6b0;letter-spacing:.08em;text-transform:uppercase}
.cbx b{font:700 34px/1 Grenze,serif;color:var(--cc);text-shadow:0 2px 0 #000}
.cbx p{margin:0;font-size:13px;color:#f1e4c6}
@keyframes cbo{0%{transform:scale(.6) rotate(0)}60%{transform:scale(1.1) rotate(200deg)}100%{transform:scale(1) rotate(360deg)}}
@keyframes cbf{0%{opacity:0;transform:scale(.85)}12%{opacity:1;transform:scale(1)}80%{opacity:1}100%{opacity:0}}
`; document.head.appendChild(st); })();

(function(){ const st = document.createElement('style'); st.textContent = `
.rpeek{width:330px;padding:12px 12px 10px;border-radius:14px;background:rgba(16,10,5,.96);box-shadow:0 0 0 2px #f2c14e,0 10px 30px rgba(0,0,0,.6);color:#f1e4c6;text-align:left}
.rpeek.all{width:560px}
.rp-h{display:block;font:700 15px Grenze,serif;color:#f2c14e}
.rp-s{display:block;font-size:11.5px;color:#e8d6b0;margin:2px 0 8px}
.rpeek ul{list-style:none;margin:0;padding:0;display:grid;gap:5px}
.rpeek.all ul{grid-template-columns:1fr 1fr}
.rp-r{display:grid;grid-template-columns:34px 1fr;gap:7px;align-items:center;padding:5px 7px;border-radius:9px;background:rgba(255,255,255,.04);box-shadow:inset 3px 0 0 var(--cc)}
.rp-r.pure{background:rgba(242,193,78,.08)}
.rp-e{display:flex}
.rp-d{width:17px;height:17px;border-radius:50%;box-shadow:0 0 0 1.5px #120a06}
.rp-d+.rp-d{margin-left:-5px}
.rp-t b{font-size:13px;color:var(--cc)}
.rp-t em{margin-left:6px;font-style:normal;font-size:10px;text-transform:uppercase;letter-spacing:.06em;color:#f2c14e}
.rp-t em.rp-n{color:#bfae8a;text-transform:none;letter-spacing:0;font-size:10.5px}
.rp-t small{display:block;font-size:11px;line-height:1.3}
`; document.head.appendChild(st); })();

(function(){ const st = document.createElement('style'); st.textContent = `
.pq-row{display:flex;gap:8px;align-items:stretch;margin-bottom:6px}
.pq-lv,.pq-el{flex:1;display:flex;flex-direction:column;justify-content:center;padding:5px 8px;border-radius:9px;background:rgba(255,255,255,.05)}
.pq-el{flex-direction:row;align-items:center;gap:7px}
.pq-el i{width:18px;height:18px;border-radius:50%;background:var(--c);box-shadow:0 0 0 2px #120a06,0 0 8px var(--c);flex:none}
.pq-lv b,.pq-el b{font-size:12.5px;color:#f2c14e}.pq-el b{color:var(--c)}
.pq-lv small,.pq-el small{display:block;font-size:10.5px;color:#e8d6b0}
.pq-combo{margin-bottom:7px;padding:6px 8px;border-radius:9px;background:rgba(255,255,255,.05);box-shadow:inset 3px 0 0 var(--c)}
.pq-combo b{display:block;font-size:12.5px;color:var(--c)}.pq-combo small{display:block;font-size:11px;line-height:1.3}
.pq-combo.none b{color:#bfae8a}
.pq-duel{display:block;margin-top:6px;font-size:10.5px;color:#bfae8a}
`; document.head.appendChild(st); })();

/* univers Ninja : marqueur de chakra (flamme bleue), pastilles de nature, zone d'entraînement agrandie */
(function(){ const st = document.createElement('style'); st.textContent = `
.ckm{display:block;overflow:visible;filter:drop-shadow(0 0 4px rgba(80,170,255,.7))}
.ckm-t{font-family:var(--f-num);font-size:17px;font-weight:700;paint-order:stroke;stroke:#0c2a6a;stroke-width:3px}
svg.ck-gem{position:absolute;right:-6%;top:-7%;z-index:3;width:30cqi;height:32cqi;background:none;box-shadow:none;border-radius:0}
svg.ck-gem.aff{box-shadow:none;filter:drop-shadow(0 0 5px rgba(155,227,106,.95))}
.pcost.ck{background:none!important;box-shadow:none!important;padding:0}
.pcost.ck .pc-ck{width:100%;height:118%;margin-top:-12%}
.eqm .ch-c.ckx{background:none;box-shadow:none;width:22px;height:24px;right:-7px;top:-9px}
.eqm .ch-c.ckx .ckm{width:100%;height:100%}
.el-tag{display:inline-flex;align-items:center;gap:1.5cqi}
.el-tag .elbadge{width:9cqi;height:9cqi;margin-left:-2cqi}
.train{flex:1 1 auto;min-width:360px}
.train .tr-row.med{padding:10px 8px 7px 7px;gap:10px;min-height:56px;overflow-x:auto;overflow-y:visible}
@media (min-width:821px){ .train{min-width:380px;padding:4px 12px 6px} .eqm,.eqm svg{width:44px;height:44px} }
`; document.head.appendChild(st); })();

/* compagnon sur le bord gauche de la zone de jeu */
(function(){ const st = document.createElement('style'); st.textContent = `
.has-cp{position:relative}
:root body .table:has(.has-cp){--tw:min(98px, calc((100cqi - 130px) / 8.9))}
@media (min-width:821px){ :root body .table .board-zone.has-cp{--tw:min(110px, calc((100cqi - 190px) / 8.6), 13vh)} .board-zone.has-cp .cp-side{width:calc(var(--tw) + 12px)} }
.board-zone.has-cp,.keeper-zone.has-cp{padding-left:calc(var(--tw) + 40px)}
.keeper-zone.has-cp > .cp-side{top:auto;bottom:16px;transform:none}
.cp-side{position:absolute;left:14px;top:50%;transform:translateY(-50%);z-index:2;display:flex;flex-direction:column;align-items:center;gap:3px;width:calc(var(--tw) + 12px);padding-right:14px}
.cp-side::after{content:'';position:absolute;right:0;top:-6%;bottom:-6%;width:1.5px;background:linear-gradient(180deg,transparent,rgba(242,193,78,.55) 18%,rgba(242,193,78,.55) 82%,transparent);box-shadow:0 0 6px rgba(242,193,78,.35)}
.cp-side .mn.cp-tok{margin:0}
.cp-side small{font:700 10px/1.15 var(--f-label),serif;color:#f2c14e;text-align:center;letter-spacing:.04em;text-shadow:0 1px 2px #000}
.cp-side.win small{color:#ffe27a}.cp-side.loss small{color:#a8b4c8}
.cp-side.win .mn{filter:drop-shadow(0 0 10px rgba(242,193,78,.8))}
@media (max-width:820px){ :root body .table:has(.has-cp){--tw:min(80px, calc((100cqi - 40px) / 8.6))} .board-zone.has-cp,.keeper-zone.has-cp{padding-left:calc(var(--tw) + 22px)} .cp-side{left:4px;padding-right:8px} .cp-side small{display:none} }
`; document.head.appendChild(st); })();

(function(){ const st = document.createElement('style'); st.textContent = `
.mn.dhide{visibility:hidden}
.duel-ghost .dmg{display:none}
.cp-side .mn.dead{filter:grayscale(1) brightness(.55);opacity:.7;transform:rotate(-6deg) scale(.94)}
.cp-side .mn.hit{animation:cphit .4s ease-out}
@keyframes cphit{20%{transform:translateX(-4px)}40%{transform:translateX(4px)}60%{transform:translateX(-2px)}}
.cp-side .mn .dmg{position:absolute;left:50%;top:30%;transform:translateX(-50%);z-index:5;pointer-events:none}
`; document.head.appendChild(st); })();

/* améliorations du compagnon : pièces, rareté, choix parmi 3 */
(function(){ const st = document.createElement('style'); st.textContent = `
.pcs-row{gap:12px!important}
.pcs{position:relative;flex:none;width:44px;height:44px;border-radius:50%;box-shadow:0 0 0 3px var(--rc),0 0 10px var(--rc);cursor:help}
.pcs .pc-ico{width:100%;height:100%;display:block}
.pcs-n{position:absolute;right:-6px;bottom:-6px;min-width:18px;height:18px;padding:0 4px;display:grid;place-items:center;border-radius:9px;font:700 11px var(--f-num);color:#120a06;background:var(--rc);box-shadow:0 0 0 2px #120a06}
.peq-i .pc-ico{width:34px;height:34px;flex:none;border-radius:50%;box-shadow:0 0 0 2px #f2c14e}
.peq-i em{font-style:normal;font-weight:700}
.upch{position:fixed;inset:0;z-index:72;display:grid;place-items:center;background:radial-gradient(circle,rgba(10,6,4,.45),rgba(10,6,4,.85));animation:chrevIn .3s ease-out}
.upch-in{display:grid;justify-items:center;gap:6px;padding:16px}
.upch-t{font-family:var(--f-disp);font-size:32px;color:#ffd86a;text-shadow:0 3px 0 #120a06}
.upch-s{color:#e8d6b0;font-size:13px;margin-bottom:6px}
.upch-row{display:flex;gap:18px;flex-wrap:wrap;justify-content:center}
.upc{width:190px;display:grid;justify-items:center;gap:6px;padding:12px 12px 14px;border:0;border-radius:16px;cursor:pointer;font:inherit;color:#f1e4c6;text-align:center;
  background:linear-gradient(180deg,rgba(40,28,20,.97),rgba(18,12,8,.97));box-shadow:0 0 0 3px var(--rc),0 0 24px color-mix(in srgb,var(--rc) 60%,transparent),0 12px 24px rgba(0,0,0,.6);
  animation:upcIn .45s cubic-bezier(.2,1.3,.4,1) both;animation-delay:calc(var(--k) * .12s);transition:transform .15s}
.upc:hover,.upc:focus-visible{transform:translateY(-6px) scale(1.04)}
.upc-r{padding:2px 10px;border-radius:99px;font:700 11px var(--f-label);letter-spacing:.1em;text-transform:uppercase;color:#120a06;background:var(--rc)}
.upc .pc-ico.big{width:96px;height:96px;border-radius:50%;box-shadow:0 0 0 3px var(--rc),0 0 18px var(--rc)}
.upc b{font-family:var(--f-label);font-size:16px;color:#fff3c0}
.upc-tx{font-size:14px;font-weight:700;color:var(--rc);min-height:36px;display:grid;place-items:center}
.upc small{font-size:11px;color:#bfae8a}
.upc.r3{background:linear-gradient(180deg,rgba(70,40,14,.97),rgba(24,14,6,.97))}
.upch-b{margin:8px 0 0;color:#e8d6b0;font-size:13px}.upch-b b{color:#ffd86a}
@keyframes upcIn{from{opacity:0;transform:translateY(30px) scale(.8)}}
@media (max-width:700px){ .upc{width:150px} .upc .pc-ico.big{width:70px;height:70px} }
`; document.head.appendChild(st); })();

/* pouvoir du héros : un médaillon rond au contour épais */
(function(){ const st = document.createElement('style'); st.textContent = `
:root body .hero-zone .powm:not(.passive),:root body .hero-zone .powm.passive{width:92px;height:92px;min-height:0;padding:0;margin:14px 6px 14px;gap:0;border-radius:50%;display:grid;place-items:center;align-content:center;
  background:radial-gradient(circle at 40% 32%,#4a4258,#1a1424 78%);box-shadow:0 0 0 2px #120a06,0 0 0 9px #d8a84a,0 0 0 11px #120a06,inset 0 0 0 2px rgba(255,230,160,.35),0 10px 18px rgba(0,0,0,.6)}
:root body .hero-zone .powm.passive{background:radial-gradient(circle at 40% 32%,#7a5232,#2e1a0c 78%);box-shadow:0 0 0 2px #120a06,0 0 0 9px #a8744a,0 0 0 11px #120a06,0 10px 18px rgba(0,0,0,.6)}
:root body .hero-zone .powm .ic,:root body .hero-zone .powm .ic.pwart{width:100%;height:100%;padding:0;border-radius:50%;box-shadow:none}
:root body .hero-zone .powm .pc-tx{display:none}
:root body .hero-zone .powm small{position:absolute;left:50%;bottom:-22px;transform:translateX(-50%);width:auto;min-width:72px;padding:2px 8px;border-radius:99px;clip-path:none;font-size:10.5px;white-space:nowrap;
  background:linear-gradient(180deg,#6a5a48,#3a2e24);box-shadow:0 0 0 1.5px #120a06,0 0 0 3px #d8a84a;z-index:3}
:root body .hero-zone .powm .pcost{top:-18px;left:50%;transform:translateX(-50%);z-index:4}
:root body .hero-zone .powm.can:not(:disabled){animation:usableR 1.6s ease-in-out infinite}
@keyframes usableR{0%,100%{box-shadow:0 0 0 2px #120a06,0 0 0 9px #d8a84a,0 0 0 11px #120a06,0 0 0 13px #6fd0ff,0 0 22px 8px rgba(80,180,255,.7)}50%{box-shadow:0 0 0 2px #120a06,0 0 0 9px #f2c14e,0 0 0 11px #120a06,0 0 0 14px #9fe4ff,0 0 34px 12px rgba(80,180,255,.9)}}
:root body .hero-zone .powm.used,:root body .hero-zone .powm:disabled{filter:saturate(.6) brightness(.85)}
@media (max-width:820px),(max-height:540px){ :root body .hero-zone .powm:not(.passive),:root body .hero-zone .powm.passive{width:60px;height:60px;margin:10px 4px;box-shadow:0 0 0 2px #120a06,0 0 0 6px #d8a84a,0 0 0 8px #120a06} :root body .hero-zone .powm small{display:none} }
`; document.head.appendChild(st); })();

(function(){ const st = document.createElement('style'); st.textContent = `
.upm{position:relative;flex:none;width:44px;height:44px;padding:0;border:0;border-radius:50%;cursor:pointer;background:none;box-shadow:0 0 0 3px var(--rc),0 0 10px var(--rc)}
.upm .pc-ico{width:100%;height:100%;display:block}
.upm[aria-disabled="true"]{filter:saturate(.55) brightness(.8)}
.upm-c{position:absolute;right:-8px;top:-10px;width:22px;height:24px}
.upm-c .ckm{width:100%;height:100%}
.uppk{width:210px;display:grid;justify-items:center;gap:6px;padding:12px 12px 12px;border-radius:16px;text-align:center;color:#f1e4c6;background:linear-gradient(180deg,rgba(40,28,20,.98),rgba(18,12,8,.98));box-shadow:0 0 0 3px var(--rc),0 0 20px color-mix(in srgb,var(--rc) 55%,transparent),0 12px 24px rgba(0,0,0,.6)}
.uppk .pc-ico.big{width:84px;height:84px;border-radius:50%;box-shadow:0 0 0 3px var(--rc),0 0 16px var(--rc)}
.uppk b{font-family:var(--f-label);font-size:15px;color:#fff3c0}
.uppk .upc-tx{font-size:13.5px;font-weight:700;color:var(--rc)}
.uppk-c{display:flex;align-items:center;gap:6px}.uppk-c .ckm{width:24px;height:26px}.uppk-c small{font-size:11px;color:#e8d6b0}
.uppk-h{font-size:10.5px;color:#bfae8a}.uppk-h em{font-style:normal;font-weight:700}
`; document.head.appendChild(st); })();

/* réservoir en rouleau de parchemin, infobulle en parchemin déroulé */
(function(){ const st = document.createElement('style'); st.textContent = `
.rsv.scroll svg{width:92px;height:58px;filter:drop-shadow(0 3px 3px rgba(0,0,0,.6))}
.rsv.scroll.half svg{filter:drop-shadow(0 0 7px rgba(255,220,140,.55)) drop-shadow(0 3px 3px rgba(0,0,0,.6))}
.rpeek{position:relative;margin:14px 0;padding:16px 18px 14px;border-radius:4px;color:#3a2410;
  background:radial-gradient(ellipse at 30% 20%,rgba(255,255,255,.35),transparent 60%),linear-gradient(180deg,#f4e6c4,#e6d0a0 55%,#d8bd85);
  box-shadow:inset 0 0 30px rgba(120,80,30,.35),inset 0 0 0 1px rgba(90,60,20,.4),0 14px 30px rgba(0,0,0,.6)}
.rpeek::before,.rpeek::after{content:'';position:absolute;left:-10px;right:-10px;height:16px;border-radius:8px;
  background:linear-gradient(180deg,#4a2a12,#a8744a 45%,#5a3418);box-shadow:0 0 0 1.5px #120a06,0 3px 6px rgba(0,0,0,.5)}
.rpeek::before{top:-10px}.rpeek::after{bottom:-10px}
.rpeek .rp-h{color:#5a2e0c;font-size:17px;text-shadow:none}
.rpeek .rp-s{color:#5a4228}
.rpeek .rp-r{background:rgba(120,80,30,.08);box-shadow:inset 3px 0 0 var(--cc),inset 0 0 0 1px rgba(120,80,30,.18)}
.rpeek .rp-r.pure{background:rgba(200,140,40,.14)}
.rpeek .rp-t b{color:color-mix(in srgb,var(--cc) 42%,#1a0c02)}
.rpeek.all{padding:12px 16px 10px;width:780px}.rpeek.all ul{grid-template-columns:1fr 1fr 1fr}.rpeek.all ul{gap:4px}.rpeek.all .rp-r{padding:3px 7px}.rpeek.all .rp-t small{font-size:10.5px;line-height:1.2}
.rpeek .rp-t em{color:#8a5a12}.rpeek .rp-t em.rp-n{color:#6a5236}
.rpeek .rp-t small{color:#3a2410}
.rpeek .rp-d{box-shadow:0 0 0 1.5px #3a2410}
`; document.head.appendChild(st); })();

(function(){ const st = document.createElement('style'); st.textContent = `
.duel-col{position:absolute;inset:0;pointer-events:none;z-index:6}
.duel-col .cp-side{position:absolute;transform:translateY(-50%);padding-right:0;pointer-events:auto}
.duel-col .cp-side::after{display:none}
.duel-col #cps1 small{display:none}
.duel-vs{position:absolute;transform:translate(-50%,-50%);font:700 22px Grenze,serif;color:#ff9a5a;text-shadow:0 2px 0 #000,0 0 10px rgba(255,120,40,.6);padding:2px 10px;border-radius:99px;background:rgba(20,12,6,.7);box-shadow:0 0 0 2px #d8a84a}
.keeper-zone .line.counter-line{padding-left:calc(var(--tw) + 40px)}
`; document.head.appendChild(st); })();

/* Éveil : héros, compagnon, techniques, plateau */
(function(){ const st = document.createElement('style'); st.textContent = `
.hc-awk{margin:4px 8px 0;padding:4px 8px;border-radius:8px;font-size:11px;line-height:1.3;color:#bfae8a;background:rgba(255,160,60,.08);box-shadow:inset 0 0 0 1px rgba(255,170,80,.25)}
.hc-awk b{color:#ffb050}.hc-awk.on{color:#fff3c0;background:rgba(255,140,40,.22);box-shadow:inset 0 0 0 1.5px #ffb050,0 0 12px rgba(255,150,60,.5)}
.tx-awk{display:block;margin-top:2px;color:#9a8a6a;font-size:.92em}.tx-awk b{color:#b8862a}.tx-awk.on{color:#a85a10;font-weight:700}.tx-awk.on b{color:#d8701a}
.pq-awk{margin-bottom:7px;padding:6px 8px;border-radius:9px;background:rgba(255,150,50,.08);box-shadow:inset 3px 0 0 #ffb050}
.pq-awk b{display:block;font-size:12.5px;color:#ffb050}.pq-awk small{display:block;font-size:11px;line-height:1.3}
.pq-awk.on{background:rgba(255,150,50,.2);box-shadow:inset 3px 0 0 #ffb050,0 0 10px rgba(255,150,60,.4)}
.mn.cp-tok.awk .mn-svg{filter:drop-shadow(0 0 8px #ffb050) drop-shadow(0 0 16px rgba(255,120,40,.8));animation:awkGlow 2s ease-in-out infinite}
@keyframes awkGlow{50%{filter:drop-shadow(0 0 12px #ffd27a) drop-shadow(0 0 26px rgba(255,120,40,.95))}}
.table.awakened{box-shadow:inset 0 0 60px rgba(255,120,40,.35),inset 0 0 0 2px rgba(255,170,80,.4)}
.awk-fx{position:fixed;inset:0;z-index:95;display:grid;place-items:center;pointer-events:none;background:radial-gradient(circle,rgba(255,120,40,.25),rgba(10,4,2,.85) 70%);animation:awkF 3.4s ease forwards}
.awk-in{position:relative;display:grid;justify-items:center;gap:6px;text-align:center;max-width:560px;padding:20px}
.awk-rays{position:absolute;left:50%;top:50%;width:620px;height:620px;margin:-310px 0 0 -310px;border-radius:50%;background:repeating-conic-gradient(rgba(255,190,90,.35) 0 6deg,transparent 6deg 18deg);animation:awkR 3.4s linear;z-index:-1;mask:radial-gradient(circle,#000 20%,transparent 68%)}
.awk-in small{font:700 13px var(--f-label);letter-spacing:.2em;text-transform:uppercase;color:#ffd27a}
.awk-in b{font:700 92px/1 Grenze,serif;color:#ffb050;text-shadow:0 4px 0 #3a1404,0 0 30px rgba(255,140,40,.9);animation:awkB 3.4s ease}
.awk-in p{margin:0;font-size:15px;color:#fff3c0;text-shadow:0 2px 4px #000}
@keyframes awkF{0%{opacity:0}10%{opacity:1}80%{opacity:1}100%{opacity:0}}
@keyframes awkB{0%{transform:scale(.4);opacity:0}18%{transform:scale(1.15);opacity:1}30%{transform:scale(1)}}
@keyframes awkR{to{transform:rotate(360deg)}}
`; document.head.appendChild(st); })();



/* description de l'univers Ninja (choix du héros) */
(function(){ const st = document.createElement('style'); st.textContent = `
.njl.big{display:grid;grid-template-columns:1fr 1fr;gap:10px 16px;text-align:left}
.njl-s{display:grid;gap:4px;align-content:start;padding:8px 10px;border-radius:10px;background:rgba(10,5,2,.32);box-shadow:inset 0 0 0 1px rgba(242,193,78,.18)}
.njl-h{display:flex;align-items:center;gap:6px;font:700 14px var(--f-label),serif;color:#ffd86a;letter-spacing:.02em}
.njl-h span{font-size:15px}
.njl small{display:block;font-size:12px;line-height:1.35;color:#f1e4c6}.njl small b{color:#ffd86a}
.njl-combos{display:flex;flex-wrap:wrap;gap:3px 4px;margin-top:2px}
.njl-combos i{display:inline-flex;align-items:center;gap:2px;padding:1px 6px 1px 3px;border-radius:99px;font-style:normal;font-size:10.5px;background:rgba(0,0,0,.35);box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--c) 60%,transparent)}
.njl-combos em{width:9px;height:9px;border-radius:50%;box-shadow:0 0 0 1px #120a06}.njl-combos em+em{margin-left:-3px}
.njl-combos b{margin-left:3px;color:var(--c);font-weight:700}
.njl-row{display:grid;grid-template-columns:1fr;gap:8px;align-items:center}.njl-row .elc{width:78px;height:78px}
.njl-rar{display:flex;flex-wrap:wrap;gap:4px}.njl-rar i{padding:1px 7px;border-radius:99px;font-style:normal;font-size:10.5px;font-weight:700;color:#120a06;background:var(--c)}
.njl-ctrs{display:grid;gap:3px}.njl-ctr{font-size:11.5px;line-height:1.3;color:#f1e4c6}.njl-ctr b{color:var(--c)}
@media (max-width:820px){ .njl.big{grid-template-columns:1fr} }
`; document.head.appendChild(st); })();
(function(){ const st = document.createElement('style'); st.textContent = `
:root body .lb-t .njl b{font-family:inherit;font-size:inherit;line-height:inherit;text-shadow:none;color:#ffd86a}
:root body .lb-t .njl b.njl-h{display:flex;font:700 14px/1.2 var(--f-label),serif;color:#ffd86a}
:root body .lb-t .njl-combos b{color:var(--c);font-size:10.5px}
:root body .lb-t .njl-ctr b{color:var(--c)}
@media (min-width:1100px){ .njl.big{grid-template-columns:1fr 1fr 1fr} }
.njl.big .njl-s{padding:6px 9px}
.njl.big small{font-size:11.5px;line-height:1.3}
`; document.head.appendChild(st); })();

/* tiroir des règles dans le choix de l'univers */
(function(){ const st = document.createElement('style'); st.textContent = `
.lawdr{display:grid;gap:6px}
.lawdr-b{justify-self:start;padding:4px 12px;border-radius:99px;font:700 12px var(--f-label),serif;color:#ffd86a;background:rgba(10,5,2,.45);box-shadow:inset 0 0 0 1.5px rgba(242,193,78,.5);cursor:pointer}
.lawdr-b:hover,.lawdr-b:focus-visible{background:rgba(242,193,78,.18)}
.lawdr-c{display:grid;grid-template-rows:0fr;transition:grid-template-rows .3s ease}
.lawdr-c > *{overflow:hidden;min-height:0}
.lawdr.open .lawdr-c{grid-template-rows:1fr}
.lawdr:not(.open) .lawdr-c .ban-law{padding-top:0;padding-bottom:0}
`; document.head.appendChild(st); })();
/* grands écrans (plein écran) : la place en plus est répartie entre les zones, le héros et sa barre restent en bas */
(function(){ const st = document.createElement('style'); st.textContent = `
@media (min-height:950px) and (min-width:821px){ :root body .table:not(.fighting){align-content:stretch;grid-template-rows:auto auto 1fr auto auto} :root body .table:not(.fighting) .board-zone{align-self:center} :root body .table.fighting{align-content:stretch;grid-template-rows:auto auto 1fr auto;padding-bottom:5vh} }
`; document.head.appendChild(st); })();

/* bouton Prêt : grand médaillon doré, minuteur en anneau, effets */
(function(){ const st = document.createElement('style'); st.textContent = `
:root body .hero-zone .bellwrap{width:128px;height:128px;padding:9px;position:relative;
  background:conic-gradient(from -90deg,var(--ring) calc(var(--p) * 360deg),rgba(20,12,6,.75) 0);
  box-shadow:0 0 0 3px #120a06,0 0 0 6px #8a5a22,0 0 0 8px #120a06,0 10px 22px rgba(0,0,0,.65),0 0 calc(10px + var(--p) * 18px) color-mix(in srgb,var(--ring) 55%,transparent)}
:root body .hero-zone .bellwrap::before{content:'';position:absolute;inset:-14px;border-radius:50%;pointer-events:none;
  background:repeating-conic-gradient(from 0deg,rgba(255,215,120,.0) 0 10deg,rgba(255,215,120,.22) 10deg 12deg);-webkit-mask:radial-gradient(circle,transparent 62%,#000 64%,#000 72%,transparent 74%);mask:radial-gradient(circle,transparent 62%,#000 64%,#000 72%,transparent 74%);animation:bellSpin 18s linear infinite}
:root body .hero-zone .bellwrap.low{--ring:#ff4a3a;animation:bellLow .8s ease-in-out infinite}
:root body .hero-zone .bellwrap.bump{animation:bellBump .45s cubic-bezier(.2,1.6,.4,1)}
:root body .hero-zone .bell{position:relative;overflow:hidden;gap:1px;font-size:24px;text-shadow:0 1px 0 rgba(255,240,190,.7);
  background:radial-gradient(circle at 36% 26%,#fff6cf 0,#ffd86a 22%,#e3a63a 50%,#a8701c 78%,#6a420e 100%);
  box-shadow:inset 0 0 0 3px rgba(255,236,170,.55),inset 0 -8px 14px rgba(80,40,0,.45),inset 0 6px 10px rgba(255,255,230,.5),0 3px 0 #5a3608,0 6px 14px rgba(0,0,0,.55);transition:transform .15s,filter .15s}
:root body .hero-zone .bell .ic{width:38px;height:38px;filter:drop-shadow(0 1px 0 rgba(255,240,190,.6))}
:root body .hero-zone .bell .bell-t{font-family:var(--f-disp);font-size:24px;line-height:1}
:root body .hero-zone .bell .bell-s{font:700 9px var(--f-label),serif;letter-spacing:.16em;text-transform:uppercase;opacity:.75}
:root body .hero-zone .bell .bell-shine{position:absolute;inset:-40%;background:linear-gradient(115deg,transparent 40%,rgba(255,255,255,.65) 50%,transparent 60%);transform:translateX(-70%);animation:bellShine 3.2s ease-in-out infinite;pointer-events:none}
:root body .hero-zone .bell:not(:disabled):not(.rung) .ic{animation:bellSwing 2.6s ease-in-out infinite;transform-origin:50% 10%}
:root body .hero-zone .bell:hover:not(:disabled){transform:translateY(-3px) scale(1.04);filter:brightness(1.1)}
:root body .hero-zone .bell:active:not(:disabled){transform:scale(.94)}
:root body .hero-zone .bell.rung{background:radial-gradient(circle at 36% 26%,#f2ffe0 0,#b8f080 24%,#6fc040 52%,#3e7a1c 80%,#22480c 100%);color:#123004;text-shadow:0 1px 0 rgba(230,255,200,.7);
  box-shadow:inset 0 0 0 3px rgba(220,255,180,.55),inset 0 -8px 14px rgba(10,40,0,.45),0 3px 0 #1e3a08,0 0 22px rgba(140,230,90,.75)}
:root body .hero-zone .bell.rung .bell-shine{animation:none;opacity:0}
:root body .hero-zone .bell:disabled{filter:grayscale(.65) brightness(.65)}
:root body .hero-zone .bell:disabled .bell-shine{display:none}
@keyframes bellShine{0%,55%{transform:translateX(-70%)}85%,100%{transform:translateX(70%)}}
@keyframes bellSwing{0%,70%,100%{transform:rotate(0)}76%{transform:rotate(14deg)}82%{transform:rotate(-12deg)}88%{transform:rotate(7deg)}94%{transform:rotate(-4deg)}}
@keyframes bellSpin{to{transform:rotate(360deg)}}
@keyframes bellLow{50%{box-shadow:0 0 0 3px #120a06,0 0 0 6px #a82a1a,0 0 0 8px #120a06,0 10px 22px rgba(0,0,0,.65),0 0 30px rgba(255,60,40,.9)}}
@keyframes bellBump{0%{transform:scale(1)}40%{transform:scale(1.12)}100%{transform:scale(1)}}
@media (max-height:1000px) and (min-width:821px){ :root body .hero-zone .bellwrap{width:112px;height:112px;padding:8px;margin-top:-6px} :root body .hero-zone .bell .ic{width:32px;height:32px} :root body .hero-zone .bell .bell-t{font-size:21px} }
@media (max-width:820px),(max-height:540px){ :root body .hero-zone .bellwrap{width:72px;height:72px;padding:5px} :root body .hero-zone .bell .ic{width:22px;height:22px} :root body .hero-zone .bell .bell-t{font-size:15px} :root body .hero-zone .bell .bell-s{display:none} :root body .hero-zone .bellwrap::before{display:none} }
@media (prefers-reduced-motion:reduce){ :root body .hero-zone .bell .bell-shine,:root body .hero-zone .bellwrap::before,:root body .hero-zone .bell .ic{animation:none} }
`; document.head.appendChild(st); })();

/* effets de bonus sur les serviteurs */
(function(){ const st = document.createElement('style'); st.textContent = `
.mn.buffup .mn-svg{animation:buffUp 1.3s ease-out}
.mn.buffup::before{content:'';position:absolute;left:-12%;right:-12%;top:-6%;bottom:12%;border-radius:50%;pointer-events:none;z-index:3;
  background:radial-gradient(ellipse at 50% 50%,transparent 52%,rgba(255,220,110,.75) 64%,transparent 78%),repeating-conic-gradient(rgba(255,230,140,.55) 0 6deg,transparent 6deg 24deg);
  -webkit-mask:radial-gradient(ellipse at 50% 50%,transparent 46%,#000 58%,transparent 80%);mask:radial-gradient(ellipse at 50% 50%,transparent 46%,#000 58%,transparent 80%);animation:buffHalo 1.3s ease-out forwards}
.mn.tmpup .mn-svg{filter:drop-shadow(0 0 10px rgba(120,200,255,.95))}
@keyframes buffUp{0%{transform:scale(1);filter:brightness(1)}18%{transform:scale(1.16) translateY(-4px);filter:brightness(1.5) drop-shadow(0 0 14px #ffd86a)}45%{transform:scale(1.04);filter:brightness(1.2) drop-shadow(0 0 10px #ffd86a)}100%{transform:scale(1);filter:none}}
@keyframes buffHalo{0%{transform:scale(.7) rotate(0);opacity:0}20%{opacity:1}100%{transform:scale(1.25) rotate(60deg);opacity:0}}
.fxtxt.buffinfo{display:grid;justify-items:center;gap:1px;padding:4px 10px 5px;border-radius:10px;background:rgba(20,12,6,.86);box-shadow:0 0 0 1.5px #d8a84a,0 6px 14px rgba(0,0,0,.5);white-space:nowrap;animation-duration:2.2s}
.fxtxt.buffinfo .bl-st{font:700 20px Grenze,serif;color:#9be36a;text-shadow:0 2px 0 #0c2004}
.fxtxt.buffinfo .bl-kw{font:700 14px var(--f-label),serif;color:#bfe8ff}
.fxtxt.buffinfo .bl-tmp{font:700 13px var(--f-label),serif;color:#9fd8ff}
.fxtxt.buffinfo .bl-src{font-size:10.5px;color:#e8d6b0;letter-spacing:.02em}
.fxtxt.bufftmp b{font:700 15px var(--f-label),serif;color:#9fd8ff;text-shadow:0 2px 0 #000}
@media (prefers-reduced-motion:reduce){.mn.buffup .mn-svg,.mn.buffup::before{animation:none}}
`; document.head.appendChild(st); })();

/* effets visibles des mots-clés, au recrutement comme au combat */
(function(){ const st = document.createElement('style'); st.textContent = `
.mn[class*="kw-"]{--kwz:2}
.mn.kw-s::after,.mn.kw-r::after,.mn.kw-w::after,.mn.kw-v::after,.mn.kw-t::after{content:'';position:absolute;pointer-events:none;z-index:var(--kwz)}
/* Bouclier divin : bulle dorée scintillante */
.mn.kw-s .mn-svg{filter:drop-shadow(0 0 9px rgba(255,220,100,.95)) drop-shadow(0 0 18px rgba(255,200,60,.55)) drop-shadow(0 4px 4px rgba(0,0,0,.45))}
.mn.kw-s::after{left:-4%;right:-4%;top:-2%;bottom:14%;border-radius:50%;
  background:radial-gradient(ellipse at 34% 26%,rgba(255,255,255,.55),transparent 22%),radial-gradient(ellipse at 50% 50%,transparent 58%,rgba(255,236,150,.55) 70%,rgba(255,210,80,.85) 76%,transparent 80%);
  box-shadow:0 0 14px rgba(255,220,110,.6);animation:kwShield 2.4s ease-in-out infinite}
@keyframes kwShield{50%{transform:scale(1.04);opacity:.8}}
/* Provocation : rempart de pierre lumineux */
.mn.kw-t .mn-svg{filter:drop-shadow(0 0 0 #000) drop-shadow(0 0 6px rgba(200,180,140,.9))}
/* Renaissance : esprit vert qui monte */
.mn.kw-r::after{left:15%;right:15%;top:-8%;bottom:30%;border-radius:50%;background:radial-gradient(circle at 30% 80%,rgba(160,255,220,.9) 0 3%,transparent 4%),radial-gradient(circle at 70% 70%,rgba(160,255,220,.8) 0 2.5%,transparent 3.5%),radial-gradient(circle at 50% 40%,rgba(160,255,220,.7) 0 2%,transparent 3%);animation:kwReborn 2.2s linear infinite}
@keyframes kwReborn{from{transform:translateY(20%);opacity:0}30%{opacity:1}to{transform:translateY(-25%);opacity:0}}
/* Furie des vents : tourbillon */
.mn.kw-w::after{left:-10%;right:-10%;top:4%;bottom:18%;border-radius:50%;background:conic-gradient(from 0deg,transparent 0 20%,rgba(200,255,230,.7) 24%,transparent 30% 70%,rgba(200,255,230,.6) 74%,transparent 80%);
  -webkit-mask:radial-gradient(circle,transparent 60%,#000 66%,transparent 74%);mask:radial-gradient(circle,transparent 60%,#000 66%,transparent 74%);animation:kwWind 1.6s linear infinite}
@keyframes kwWind{to{transform:rotate(360deg)}}
/* Toxique : halo vert */
.mn.kw-v .mn-svg{filter:drop-shadow(0 0 8px rgba(120,230,60,.9)) drop-shadow(0 4px 4px rgba(0,0,0,.45))}
.mn.kw-v.kw-s .mn-svg{filter:drop-shadow(0 0 9px rgba(255,220,100,.95)) drop-shadow(0 0 14px rgba(120,230,60,.8))}
/* plusieurs effets : pseudo-élément partagé, le bouclier a la priorité visuelle */
.mn.kw-s.kw-w::after{background:radial-gradient(ellipse at 34% 26%,rgba(255,255,255,.55),transparent 22%),radial-gradient(ellipse at 50% 50%,transparent 58%,rgba(255,236,150,.55) 70%,rgba(255,210,80,.85) 76%,transparent 80%);-webkit-mask:none;mask:none;animation:kwShield 2.4s ease-in-out infinite}
.mn.kw-s.kw-r::after{animation:kwShield 2.4s ease-in-out infinite}
@media (prefers-reduced-motion:reduce){.mn[class*="kw-"]::after{animation:none}}
html.lite .mn[class*="kw-"]::after{display:none}
`; document.head.appendChild(st); })();
/* ===== téléphone (paysage) : colonne du héros compacte, entraînement et réservoir qui tiennent, duel lisible ===== */
(function(){ const st = document.createElement('style'); st.textContent = `
@media (orientation:landscape) and (max-height:540px){
  :root body .hero-zone{width:108px;padding:2px 2px 4px;gap:4px;justify-content:flex-start;overflow:hidden}
  :root body .hero-zone .face.hf.arch{width:52px}
  :root body .hz-left{order:4;width:100%;display:flex;justify-content:center}
  :root body .train{min-width:0;width:100%;padding:3px 4px;border-radius:10px;gap:2px;flex:none}
  :root body .train .tr-h,:root body .train .tr-e{display:none}
  :root body .train:not(:has(.upm)){display:none}
  :root body .train .tr-row.med{min-height:0;padding:6px 4px 2px;gap:8px!important;flex-wrap:wrap;justify-content:center;overflow:visible}
  :root body .upm{width:30px;height:30px}
  :root body .upm-c{width:16px;height:18px;right:-6px;top:-8px}
  :root body .hz-right{flex-direction:column;gap:3px}
  :root body .hero-zone .powm:not(.passive),:root body .hero-zone .powm.passive{width:50px;height:50px;margin:8px 0 2px;box-shadow:0 0 0 2px #120a06,0 0 0 5px #d8a84a,0 0 0 7px #120a06}
  :root body .hero-zone .powm .pcost{top:-12px;transform:translateX(-50%) scale(.8)}
  :root body .purses{flex-direction:row;gap:6px;align-items:center}
  :root body .hero-zone .purse b{font-size:15px}
  :root body .ckp .coinrow,:root body .ctrs{display:none}
  :root body .rsv.scroll svg{width:58px;height:36px}
  :root body .rsv small{font-size:8.5px}
  :root body .hero-zone .bellwrap{width:60px;height:60px;padding:4px;margin-top:auto}
  :root body .hero-zone .bell .ic{width:18px;height:18px}
  :root body .hero-zone .bell .bell-t{font-size:13px}
  :root body .hero-zone .bellwrap::before{display:none}
  /* compagnon et duel */
  .cp-side small{display:none}
  .cp-side{padding-right:6px}
  :root body .board-zone.has-cp,.keeper-zone.has-cp{padding-left:calc(var(--tw) + 22px)}
  .duel-col .mn.cp-tok{--tw:46px}
  .duel-vs{font-size:13px;padding:1px 6px}
  .rpeek.all{width:min(92vw,640px)} .rpeek.all ul{grid-template-columns:1fr 1fr}
  .upc{width:min(30vw,170px);padding:8px} .upc .pc-ico.big{width:56px;height:56px} .upch-t{font-size:22px}
  .awk-in b{font-size:54px}
}
/* mode allégé (téléphones, petits processeurs) : on coupe les animations continues et les filtres coûteux */
html.lite .table[class*="awk-"] .hand .cd::after{display:none}
html.lite .table[class*="awk-"] .board-zone .mn .mn-svg{filter:none}

html.lite .table.awk-eau .board-zone .mn{box-shadow:0 0 0 2px rgba(80,180,255,.8);border-radius:50%}
html.lite .table.awk-foudre .board-zone .mn{box-shadow:0 0 0 2px rgba(255,220,60,.8);border-radius:50%}
html.lite .mn.buffup::before{display:none}
html.lite .mn.buffup .mn-svg{animation-duration:.6s}
html.lite .hero-zone .bell .bell-shine,html.lite .hero-zone .bellwrap::before{display:none}
html.lite .hero-zone .bell:not(:disabled) .ic,html.lite .rsv-lo,html.lite .mn.cp-tok.awk .mn-svg,html.lite .hero-zone .powm.can:not(:disabled){animation:none}
html.lite .rsv.scroll svg,html.lite .rsv.scroll.half svg,html.lite .ckm{filter:none}
html.lite .awk-rays{display:none}
html.lite .table.awakened{box-shadow:inset 0 0 0 2px rgba(255,170,80,.5)}
html.lite .upc{animation:none}
`; document.head.appendChild(st); })();
(function(){ const st = document.createElement('style'); st.textContent = `
@media (orientation:landscape) and (max-height:540px){
  :root body .table > .hud .timer{position:static;min-width:0;height:auto;padding:1px 8px;border-radius:8px;font-size:15px;background:rgba(10,5,2,.55);box-shadow:inset 0 0 0 1px rgba(242,193,78,.4);transform:none}
  .keeper-zone.has-cp .kname span{display:none}
}
`; document.head.appendChild(st); })();

(function(){ const st = document.createElement('style'); st.textContent = `
.cp-toks{display:flex;align-items:center;gap:4px}
.cp-side.two .cp-toks{--bw:calc(var(--tw) * .72)}
.cp-side.two .mn.bst-tok{--tw:var(--bw)}
:root body .board-zone.has-cp:has(.cp-side.two),:root body .keeper-zone.has-cp:has(.cp-side.two){padding-left:calc(var(--tw) * 1.75 + 46px)}
.table:has(.duel-col .cp-side.two) .keeper-zone.has-cp,.table:has(.duel-col .cp-side.two) .board-zone.has-cp{padding-left:calc(var(--tw) * 1.75 + 46px)}
.cp-side.two{width:auto}
.mn.bst-tok .mn-svg{filter:drop-shadow(0 0 8px rgba(255,170,80,.75)) drop-shadow(0 3px 3px rgba(0,0,0,.5))}
html.lite .mn.bst-tok .mn-svg{filter:none}
`; document.head.appendChild(st); })();

(function(){ const st = document.createElement('style'); st.textContent = `
:root body .table.fighting.joined .board-zone,:root body .table.fighting.joined .keeper-zone{--tw:min(96px, calc((100cqi - 80px) / 9.6), 12vh)}
.mn.cp-join .mn-svg{filter:drop-shadow(0 0 8px rgba(255,190,90,.9)) drop-shadow(0 3px 3px rgba(0,0,0,.5))}
.mn.cp-join::before{content:'';position:absolute;left:50%;bottom:-2px;transform:translateX(-50%);width:60%;height:4px;border-radius:2px;background:#ffb050;box-shadow:0 0 6px #ffb050;z-index:3}
html.lite .mn.cp-join .mn-svg{filter:none}
`; document.head.appendChild(st); })();
/* combat harmonieux : alliés et ennemis à la même taille, rangées centrées l'une sur l'autre */
(function(){ const st = document.createElement('style'); st.textContent = `
:root body .table.fighting{--tw:min(100px, calc((100cqi - 90px) / 7.8), 12.5vh)}
:root body .table.fighting:has(.duel-col){--tw:min(96px, calc((100cqi - 300px) / 7.6), 12vh)}
:root body .table.fighting.joined{--tw:min(94px, calc((100cqi - 90px) / 9.6), 12vh)}
:root body .table.fighting .board-zone,:root body .table.fighting .keeper-zone,:root body .table.fighting .board-zone.has-cp,:root body .table.fighting .keeper-zone.has-cp,
:root body .table.fighting.joined .board-zone,:root body .table.fighting.joined .keeper-zone{--tw:inherit}
:root body .table.fighting .board-zone,:root body .table.fighting .keeper-zone{padding-left:12px;padding-right:12px}
:root body .table.fighting:has(.duel-col) .board-zone,:root body .table.fighting:has(.duel-col) .keeper-zone{padding-left:calc(var(--tw) + 44px);padding-right:calc(var(--tw) + 44px)}
:root body .table.fighting .line{justify-content:center}
:root body .table.fighting .keeper-zone .line.counter-line,:root body .table.fighting #bdrow{padding-left:0;padding-right:0;justify-self:stretch;width:100%;box-sizing:border-box}
:root body .table.fighting .duel-col .mn.cp-tok{--tw:inherit}
:root body .table.fighting .duel-col .cp-side.two .cp-toks{--bw:var(--tw)}
@media (orientation:landscape) and (max-height:540px){
  :root body .table.fighting{--tw:min(62px, calc((100cqi - 140px) / 7.8))}
  :root body .table.fighting:has(.duel-col){--tw:min(54px, calc((100cqi - 220px) / 7.6))}
  :root body .table.fighting.joined{--tw:min(54px, calc((100cqi - 140px) / 9.6))}
  :root body .table.fighting:has(.duel-col) .board-zone,:root body .table.fighting:has(.duel-col) .keeper-zone{padding-left:calc(var(--tw) + 20px);padding-right:calc(var(--tw) + 20px)}
}
`; document.head.appendChild(st); })();

(function(){ const st = document.createElement('style'); st.textContent = `
.hz-hero{position:relative}
.mkorbs{--orr:66px;position:absolute;inset:0;pointer-events:auto;cursor:help}
.mko{position:absolute;width:30px;height:30px;transform:translate(-50%,-50%);border-radius:50%;display:grid;place-items:center;z-index:4;
  background:radial-gradient(circle at 38% 32%,color-mix(in srgb,var(--c) 40%,#fff),var(--c) 55%,color-mix(in srgb,var(--c) 50%,#000));
  box-shadow:0 0 0 2px #120a06,0 0 0 4px rgba(0,0,0,.35),0 0 0 4px var(--c) inset,0 3px 6px rgba(0,0,0,.5);
  -webkit-mask:none}
.mko::before{content:'';position:absolute;inset:-5px;border-radius:50%;background:conic-gradient(var(--c) calc(var(--p) * 360deg),rgba(0,0,0,.45) 0);-webkit-mask:radial-gradient(circle,transparent 62%,#000 64%);mask:radial-gradient(circle,transparent 62%,#000 64%)}
.mko svg{width:15px;height:15px;opacity:.55;position:absolute}
.mko b{position:relative;font:700 14px var(--f-num);color:#fff;text-shadow:0 1px 0 #000,0 0 3px #000}
.mko i{position:absolute;bottom:-11px;left:50%;transform:translateX(-50%);font-style:normal;font-size:8px;letter-spacing:-1px;color:#ffe27a;text-shadow:0 1px 0 #000}
.mko.ready{animation:mkReady 1.6s ease-in-out infinite}
@keyframes mkReady{50%{box-shadow:0 0 0 2px #120a06,0 0 14px 4px var(--c)}}
html.lite .mko.ready{animation:none;box-shadow:0 0 0 2px #120a06,0 0 0 4px var(--c)}
.mkpeek{width:520px;padding:12px 14px;border-radius:14px;background:rgba(16,10,5,.97);box-shadow:0 0 0 2px #f2c14e,0 10px 30px rgba(0,0,0,.6);color:#f1e4c6}
.mkp-t{display:block;font:700 16px Grenze,serif;color:#f2c14e}.mkp-s{display:block;font-size:11px;color:#e8d6b0;margin:2px 0 8px}
.mkp-g{display:grid;grid-template-columns:1fr 1fr;gap:6px}
.mkp-r{padding:6px 8px;border-radius:9px;background:rgba(255,255,255,.04);box-shadow:inset 3px 0 0 var(--c)}
.mkp-h{display:flex;align-items:center;gap:5px}.mkp-h svg{width:16px;height:16px}.mkp-h b{color:var(--c);font-size:13px}.mkp-h em{margin-left:auto;font-style:normal;font-size:10px;color:#bfae8a}
.mkp-r ul{list-style:none;margin:3px 0;padding:0;display:grid;gap:1px}.mkp-r li{font-size:10.5px;color:#8a7a5a}.mkp-r li b{display:inline-block;min-width:16px;color:#8a7a5a}
.mkp-r li.on{color:#f1e4c6}.mkp-r li.on b{color:var(--c)}
.mkp-r small{font-size:10.5px;color:#e8d6b0}
.cbx-b{font-weight:700;font-size:13px!important}
@media (orientation:landscape) and (max-height:540px){ .mkorbs{--orr:40px} .mko{width:18px;height:18px} .mko b{font-size:10px} .mko svg,.mko i{display:none} .mkpeek{width:min(92vw,520px)} }
`; document.head.appendChild(st); })();

(function(){ const st = document.createElement('style'); st.textContent = `.duel-l.stl{color:#8fd8ff}.duel-l.stl b{color:#bfe8ff}`; document.head.appendChild(st); })();

(function(){ const st = document.createElement('style'); st.textContent = `.upch-s.fav{color:#ffb050;font-weight:700}`; document.head.appendChild(st); })();

(function(){ const st = document.createElement('style'); st.textContent = `
.cp-els{display:flex;gap:3px;margin-top:2px}
.cp-el{width:20px;height:20px;padding:0;border:0;border-radius:50%;cursor:pointer;display:grid;place-items:center;background:#1b120b;box-shadow:0 0 0 1.5px var(--c);opacity:.75}
.cp-el svg{width:14px;height:14px}
.cp-el.on{opacity:1;box-shadow:0 0 0 2px var(--c),0 0 8px var(--c)}
.cp-el:disabled:not(.on){opacity:.35;cursor:not-allowed}
.cp-el:hover:not(:disabled){opacity:1;transform:scale(1.15)}
.pq-lvp{display:grid;gap:2px;margin-bottom:7px}
.pq-lvp span{font-size:10.5px;color:#8a7a5a;padding:3px 7px;border-radius:7px;background:rgba(255,255,255,.03)}
.pq-lvp span b{color:#8a7a5a;margin-right:4px}
.pq-lvp span.on{color:#f1e4c6;background:rgba(111,200,255,.1)}.pq-lvp span.on b{color:#8fd8ff}
@media (orientation:landscape) and (max-height:540px){ .cp-el{width:14px;height:14px} .cp-el svg{width:10px;height:10px} }
`; document.head.appendChild(st); })();

(function(){ const st = document.createElement('style'); st.textContent = `
.awk-fx{pointer-events:auto;cursor:pointer;animation:awkIn .5s ease forwards;background:radial-gradient(circle,#4a1e08 0,#1a0a04 55%,#080302 100%)}
.awk-fx.out{animation:awkOut .3s ease forwards}
@keyframes awkIn{from{opacity:0}to{opacity:1}}
@keyframes awkOut{to{opacity:0}}
.awk-fx .awk-rays{animation:awkR 12s linear infinite}
.awk-go{margin-top:14px;padding:10px 28px;border:0;border-radius:99px;cursor:pointer;font:700 16px var(--f-label),serif;color:#2a1404;background:linear-gradient(180deg,#ffd27a,#e08a2a);box-shadow:0 0 0 2px #120a06,0 0 20px rgba(255,150,60,.7);animation:awkPulse 1.6s ease-in-out infinite}
@keyframes awkPulse{50%{transform:scale(1.06)}}
html.lite .awk-go{animation:none}
`; document.head.appendChild(st); })();

(function(){ const st = document.createElement('style'); st.textContent = `
.op-el{position:absolute;left:-5px;bottom:-4px;width:17px;height:17px;border-radius:50%;display:grid;place-items:center;background:#1b120b;box-shadow:0 0 0 1.5px var(--c);z-index:2}
.op-el svg{width:12px;height:12px}
`; document.head.appendChild(st); })();

(function(){ const st = document.createElement('style'); st.textContent = `
.taunt{position:fixed;z-index:85;max-width:250px;padding:8px 11px;border-radius:14px 14px 14px 4px;font-size:12.5px;line-height:1.3;color:#2a1a0a;background:#fff6dc;box-shadow:0 0 0 2px #120a06,0 6px 14px rgba(0,0,0,.5);pointer-events:none;animation:tauntIn .25s cubic-bezier(.2,1.5,.4,1)}
.taunt::before{content:'';position:absolute;left:-9px;top:12px;border:7px solid transparent;border-right-color:#120a06}
.taunt small{display:block;font:700 10px var(--f-label),serif;letter-spacing:.08em;text-transform:uppercase;margin-bottom:2px}
.taunt.adv small{color:#2a8a2a}.taunt.dis small{color:#b02a1a}.taunt.eq small{color:#8a6a2a}
.taunt.th{background:#e8e2ff}
.taunt.out{opacity:0;transform:translateY(-6px);transition:.3s}
@keyframes tauntIn{from{opacity:0;transform:scale(.6)}}
`; document.head.appendChild(st); })();

(function(){ const st = document.createElement('style'); st.textContent = `.hc-diff{text-align:center;font-size:13px;color:#ffd86a;letter-spacing:1px;margin-top:-2px}.hc-diff small{font:700 10px var(--f-label),serif;letter-spacing:.08em;text-transform:uppercase;color:#e8d6b0;margin-left:3px}.hc-diff.d3{color:#ff9a5a}`; document.head.appendChild(st); })();

(function(){ const st = document.createElement('style'); st.textContent = `
.hpick-ov{align-items:center}
.hpick{width:min(1240px,96vw);max-height:94vh;display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,1fr);gap:22px;align-items:stretch}
.hpick-l{display:flex;flex-direction:column;align-items:center;gap:10px;min-height:0}
.hpick-l .ov-t{margin:0}.hpick-l .ov-s{margin:0 0 4px}
.hpk-g{display:grid;grid-template-columns:1fr 1fr;gap:12px;width:100%}
.hpk{position:relative;display:grid;grid-template-columns:78px 1fr;gap:10px;align-items:start;padding:12px;border:0;border-radius:16px;cursor:pointer;text-align:left;font:inherit;color:#f1e4c6;
  background:linear-gradient(160deg,color-mix(in srgb,var(--c) 22%,#2a1c12),#160e08 70%);box-shadow:inset 0 0 0 1.5px color-mix(in srgb,var(--c) 45%,transparent),0 6px 14px rgba(0,0,0,.5);transition:transform .15s,box-shadow .15s}
.hpk:hover{transform:translateY(-3px)}
.hpk.on{box-shadow:inset 0 0 0 2.5px #f2c14e,0 0 22px rgba(242,193,78,.45),0 8px 18px rgba(0,0,0,.6);transform:translateY(-3px)}
.hpk-face{position:relative}.hpk-face .face{width:78px;height:78px;border-radius:50%;box-shadow:0 0 0 3px var(--c),0 0 0 5px #120a06}
.hpk-ck{position:absolute;right:-6px;top:-8px;width:28px;height:30px}.hpk-ck .ckm{width:100%;height:100%}
.hpk-pas{position:absolute;left:50%;bottom:-6px;transform:translateX(-50%);padding:1px 7px;border-radius:99px;font:700 9px var(--f-label);letter-spacing:.08em;text-transform:uppercase;color:#120a06;background:#c8a86a}
.hpk-b{display:grid;gap:3px;min-width:0}
.hpk-b b{font:700 16px var(--f-label),serif;color:#fff3c0}
.hpk-d{font-size:11px;color:#ffd86a;letter-spacing:.5px}
.hpk-b small{font-size:12px;line-height:1.3;color:#f1e4c6}
.hpk-c{display:flex;align-items:center;gap:6px;margin-top:3px;padding-top:5px;border-top:1px solid rgba(242,193,78,.18)}
.hpk-c .face{width:26px;height:26px;border-radius:50%}.hpk-c em{font-style:normal;font-size:11px;color:#bfae8a}
.hpick-r{display:flex;flex-direction:column;min-height:0;border-radius:18px;padding:14px 16px;background:linear-gradient(180deg,#3a1e12,#1c0e08);box-shadow:inset 0 0 0 2px #a8402a,0 10px 26px rgba(0,0,0,.6)}
.rl-head small{display:block;font:700 11px var(--f-label);letter-spacing:.18em;text-transform:uppercase;color:#e8d6b0}
.rl-head b{font:700 26px Grenze,serif;color:#ffd86a}
.rl-tabs{display:flex;flex-wrap:wrap;gap:5px;margin:8px 0 10px}
.rl-tab{padding:5px 11px;border:0;border-radius:99px;cursor:pointer;font:700 12px var(--f-label),serif;color:#e8d6b0;background:rgba(0,0,0,.35);box-shadow:inset 0 0 0 1px rgba(242,193,78,.3)}
.rl-tab.on{color:#2a1404;background:linear-gradient(180deg,#ffd27a,#e0a03a)}
.nj-vs{display:flex;flex-wrap:wrap;gap:3px 4px;margin-top:3px}
.nj-v{font-style:normal;font-size:11px;padding:1px 7px;border-radius:99px;background:rgba(0,0,0,.35);box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--c) 65%,transparent);color:#f1e4c6}
.nj-v b{display:inline!important;color:var(--c)!important;font-size:11px!important}
.nj-tx{font-size:14px;line-height:1}.nj-i .rl-scroll{width:20px;height:13px;box-shadow:0 0 0 1px #7a4a28}.nj-i .nj-ck{transform:scale(.8)}
.rl-h4{margin:10px 0 5px;font:700 14px var(--f-label),serif;color:#ffd86a}
.rl-cbs{list-style:none;margin:0 0 6px;padding:0;display:grid;grid-template-columns:repeat(auto-fill,minmax(195px,1fr));gap:5px}
.rl-v .ckm.rl-ck{width:34px;height:34px}
.rl-cb{display:flex;gap:7px;align-items:flex-start;padding:5px 7px;border-radius:8px;background:rgba(0,0,0,.3);box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--c) 55%,transparent)}
.rl-cbe{display:flex;flex:0 0 auto}.rl-cbe .rl-el+.rl-el{margin-left:-6px}
.rl-cb b{display:block;color:var(--c)!important;font-size:13px}.rl-cb small{display:block;font-size:12px;line-height:1.35;color:#f1e4c6}
.hz-hero{position:relative}
.haw-fr{position:absolute;left:50%;top:0;width:118%;aspect-ratio:1;transform:translate(-50%,-9%);pointer-events:none;z-index:3;filter:drop-shadow(0 0 6px rgba(255,210,110,.75));animation:hawspin 24s linear infinite}
.hz-hero.haw .hf{box-shadow:0 0 0 3px #ffd86a,0 0 22px 6px rgba(255,200,90,.65)!important}
.hz-hero.haw-new .haw-fr{animation:hawburst 1.6s cubic-bezier(.2,.9,.3,1) 1,hawspin 24s linear 1.6s infinite}
.hz-hero.haw-new .hf{animation:hawflash 1.6s ease-out 1}
@keyframes hawspin{to{transform:translate(-50%,-9%) rotate(360deg)}}
@keyframes hawburst{0%{transform:translate(-50%,-9%) scale(.4) rotate(-90deg);opacity:0}60%{transform:translate(-50%,-9%) scale(1.25);opacity:1}100%{transform:translate(-50%,-9%) scale(1)}}
@keyframes hawflash{0%{filter:brightness(1)}25%{filter:brightness(2.4) saturate(1.6)}100%{filter:brightness(1)}}
.hq{position:absolute;left:50%;bottom:-20px;transform:translateX(-50%);display:inline-flex;align-items:center;gap:5px;padding:1px 8px 1px 4px;border-radius:99px;background:rgba(12,6,3,.85);box-shadow:inset 0 0 0 1.5px #a8743a;font:700 11px var(--f-label),serif;color:#ffd86a;white-space:nowrap;z-index:4}
.hq i{width:26px;height:6px;border-radius:3px;background:linear-gradient(90deg,#ffd86a calc(var(--p)*100%),rgba(255,255,255,.15) 0)}
.hq.done{padding:1px 9px;background:linear-gradient(180deg,#ffe28a,#c88a26);color:#2a1606;box-shadow:0 0 10px rgba(255,200,90,.7)}
.op-face.haw{box-shadow:0 0 0 2px #ffd86a,0 0 10px rgba(255,200,90,.7);border-radius:10px}
.hc-q{margin-top:6px;padding:6px 8px;border-radius:8px;background:rgba(0,0,0,.35);box-shadow:inset 0 0 0 1px #a8743a;display:grid;gap:2px}
.hc-q b{color:#ffd86a;font-size:12.5px}.hc-q small{font-size:12px;line-height:1.35;color:#f1e4c6}.hc-q.done{box-shadow:inset 0 0 0 1.5px #ffd86a,0 0 10px rgba(255,200,90,.4)}
.hp-q{display:block;font-size:clamp(11px,1.3vh,13.5px);line-height:1.3;color:#cfe4ff;font-style:normal}.hp-q b{color:#ffd86a}
.cb-shot{position:fixed;width:26px;height:26px;border-radius:50%;z-index:95;pointer-events:none;background:linear-gradient(90deg,var(--c1) 0 50%,var(--c2) 50% 100%);box-shadow:0 0 0 2px #120a06,0 0 18px 6px var(--cc),0 0 40px 10px color-mix(in srgb,var(--cc) 50%,transparent);animation:cbspin .5s linear infinite}
@keyframes cbspin{to{rotate:360deg}}
.mn.cbhit{animation:cbhit 1.4s ease-out 1}
@keyframes cbhit{0%{filter:brightness(1)}15%{filter:brightness(2) drop-shadow(0 0 14px var(--c1)) drop-shadow(0 0 22px var(--c2));transform:scale(1.12)}100%{filter:none;transform:none}}
.fxtxt.cbinfo{box-shadow:0 0 0 1.5px currentColor,0 4px 14px rgba(0,0,0,.6)}
.hp-sub{margin:-4px 0 0;font-size:clamp(12px,1.5vh,16px);color:#e8d6b0}
.hp-col{position:relative}
.hp-infos{position:relative;width:min(760px,94vw);min-height:clamp(150px,19vh,210px);margin-top:4px}
.hp-ph{position:absolute;inset:0;display:grid;place-items:center;margin:0;color:#bfae8a;font-style:italic;transition:opacity .15s}
.hp-pc{position:absolute;left:0;right:0;top:0;display:grid;grid-template-columns:auto 1fr 1fr;grid-template-areas:"art nm aw" "art tx aw" "art bn aw";column-gap:16px;row-gap:4px;align-items:start;padding:14px 18px 14px 14px;border-radius:16px;
  background:linear-gradient(180deg,#3a2414,#1a0e07);box-shadow:0 0 0 3px #120a06,0 0 0 5px #c8963e,0 0 0 7px #120a06,0 12px 30px rgba(0,0,0,.6),0 0 24px color-mix(in srgb,var(--c) 40%,transparent);
  opacity:0;visibility:hidden;transition:opacity .15s;text-align:left}
.hp-wrap:has(.hp-col:nth-child(1):hover) .hp-pc.k0,.hp-wrap:has(.hp-col:nth-child(2):hover) .hp-pc.k1,.hp-wrap:has(.hp-col:nth-child(3):hover) .hp-pc.k2,.hp-wrap:has(.hp-col:nth-child(4):hover) .hp-pc.k3,.hp-wrap:has(.hp-col:nth-child(5):hover) .hp-pc.k4,
.hp-wrap:not(:has(.hp-col:hover)) .hp-pc.on{opacity:1;visibility:visible}
.hp-wrap:has(.hp-col:hover) .hp-ph,.hp-wrap:has(.hp-pc.on) .hp-ph{opacity:0}
.hp-pc > *{min-width:0}
.hp-pc .hpc-art{grid-area:art;position:relative!important;top:auto!important;left:auto!important;transform:none!important;margin:6px 0 0 6px}
.hp-pc .hpc-gem{top:-12px;left:-12px}
.hp-pc .hpc-mc{grid-area:nm;align-self:start;margin-top:0}
.hp-pc .hpc-nm{grid-area:nm;margin-top:14px}
.hp-pc .hpc-kind{grid-area:nm;margin-top:42px}
.hp-pc .hpc-tx{grid-area:tx;margin-top:6px}
.hp-pc .hpc-bonus{grid-area:bn}
.hp-pc .hpc-q{grid-area:aw;border-top:0;border-left:1px solid rgba(242,193,78,.25);padding:0 0 0 14px}
.hp-col .hp-card:hover{filter:brightness(1.08);transform:translateY(-8px)}
@media (max-width:820px){ .hp-infos{min-height:0} .hp-ph{display:none} .hp-pc{position:relative;display:none;grid-template-columns:1fr;grid-template-areas:"nm" "tx" "bn" "aw";padding:16px} .hp-pc.on{display:grid;opacity:1;visibility:visible} .hp-pc .hpc-art{display:none} .hp-pc .hpc-q{border-left:0;padding:8px 0 0;border-top:1px solid rgba(242,193,78,.25)} .hp-pc > *{grid-area:auto!important} .hp-pc{grid-template-areas:none} .hp-pc .hpc-nm,.hp-pc .hpc-kind,.hp-pc .hpc-mc{margin-top:0} .hp-pc .hpc-gem{top:8px;left:auto;right:8px} }
.hpc-art{position:absolute;top:-34px;left:50%;transform:translateX(-50%);width:72px;height:72px;border-radius:50%;display:grid;place-items:center;background:radial-gradient(circle at 40% 35%,#5a3a20,#1a0e06);box-shadow:0 0 0 3px #120a06,0 0 0 6px #c8963e,0 0 18px color-mix(in srgb,var(--c) 60%,transparent)}
.hpc-art .pwart{width:46px;height:46px}
.hpc-gem{position:absolute;top:-14px;left:-10px;width:42px;height:42px;border-radius:50%;display:grid;place-items:center;box-shadow:0 0 0 3px #120a06}
.hpc-gem.g{background:radial-gradient(circle at 35% 30%,#ffe9a0,#c8901e)}.hpc-gem.g b{font:700 22px var(--f-disp),serif;color:#2a1606}
.hpc-gem.ck{background:radial-gradient(circle at 35% 30%,#bfe6ff,#2a7ad8)}.hpc-gem.ck .ckm{width:34px;height:34px}
.hpc-gem.p{background:#2a1a0e;box-shadow:0 0 0 3px #120a06,0 0 0 5px #c8963e}.hpc-gem.p b{color:#ffd86a;font-size:20px}
.hpc-mc{font:700 11px var(--f-label),serif;text-transform:uppercase;letter-spacing:.08em;color:var(--c)}
.hpc-nm{font:700 clamp(17px,2.1vh,22px) var(--f-disp),serif;color:#ffd86a;line-height:1.1}
.hpc-kind{font-size:11.5px;color:#bfae8a;margin-top:-4px}
.hpc-tx{margin:2px 0 0;font-size:clamp(13px,1.6vh,15.5px);line-height:1.4;color:#f6ead0}
.hpc-bonus{margin:0;padding:6px 8px;border-radius:8px;background:rgba(255,216,106,.08);font-size:12.5px;line-height:1.35;color:#f1e4c6}.hpc-bonus b{color:#ffd86a;margin-right:4px}
.hpc-q{width:100%;display:grid;gap:6px;padding-top:8px;border-top:1px solid rgba(242,193,78,.25);text-align:left}
.hpc-qh{font-size:12.5px;line-height:1.35;color:#cfe4ff}.hpc-qh b{display:block;color:#9fd8ff;font-size:12px;text-transform:uppercase;letter-spacing:.06em}
.hpc-aw{display:grid;grid-template-columns:auto 1fr;gap:8px;align-items:center;padding:6px;border-radius:10px;background:linear-gradient(90deg,rgba(255,200,90,.16),rgba(255,200,90,.04));box-shadow:inset 0 0 0 1px #c8963e}
.hpc-aw .hpc-awf{width:46px;height:46px;border-radius:50%;box-shadow:0 0 0 2px #ffd86a,0 0 10px rgba(255,200,90,.6)}
.hpc-aw b{display:block;color:#ffd86a;font-size:12.5px}.hpc-aw small{font-size:12px;line-height:1.3;color:#f1e4c6}
.rl-mcs{display:flex;flex-wrap:wrap;gap:4px;margin:2px 0 10px}.rl-mcs i{font-style:normal;font-size:12px;font-weight:700;padding:2px 9px;border-radius:99px;background:rgba(0,0,0,.35);color:var(--c);box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--c) 60%,transparent)}
.rl-tabs{flex-wrap:wrap}
.keeper-zone.enemy .keeper{position:relative}
.keeper-zone.enemy .kn-en{position:absolute;left:calc(100% + 14px);top:50%;margin:0;transform:translateY(-50%);display:grid;gap:4px;justify-items:start;text-align:left;pointer-events:none}
.keeper-zone.enemy .kn-en b{display:block!important;font:700 clamp(18px,2.6vh,28px) var(--f-disp),serif;color:#ffd86a;text-shadow:0 2px 0 #120a06,0 0 12px rgba(0,0,0,.8);white-space:nowrap}
.keeper-zone.enemy .kn-en .ts{display:flex;gap:3px}
.keeper-zone.enemy .kn-en .ts i{display:block;width:clamp(14px,2vh,20px);height:clamp(14px,2vh,20px);background:linear-gradient(#fff1b8,#f2c14e 60%,#b7802a);clip-path:polygon(50% 0,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%);filter:drop-shadow(0 1px 1px #000)}
@media (max-width:820px){ .keeper-zone.enemy .kn-en{left:calc(100% + 8px)} .keeper-zone.enemy .kn-en b{font-size:16px} }
#peek:has(.oph){background:none!important;box-shadow:none!important;padding:0!important;max-width:none!important;width:auto!important}
.oph{display:flex;align-items:center;gap:18px;padding:6px;filter:drop-shadow(0 14px 24px rgba(0,0,0,.6))}
.oph-hero{position:relative;width:200px;display:grid;justify-items:center}
.oph-port{display:block;width:200px;aspect-ratio:.82;border-radius:50% 50% 8px 8px/40% 40% 8px 8px;overflow:hidden;background:#1a1008;box-shadow:inset 0 0 0 2px #1a1008,0 0 0 5px #e2b04e,0 0 0 7px #6a4410,0 0 0 10px #c8963e,0 0 0 12px #2a1806}
.oph-port .face{width:100%;height:100%;border-radius:0}.oph-port .face svg{width:100%;height:100%}
.oph-nm{position:absolute;left:0;right:0;bottom:30px;text-align:center;font:700 22px var(--f-disp),serif;color:#fff6dc;text-shadow:0 2px 0 #000,0 0 8px #000}
.oph-hp{position:absolute;right:-14px;bottom:18px;width:52px;height:52px;display:grid;place-items:center;border-radius:50% 50% 50% 50%/60% 60% 42% 42%;background:radial-gradient(circle at 35% 35%,#ff7a6a,#b01e14);box-shadow:0 0 0 3px #120a06;font:700 22px var(--f-disp),serif;color:#fff;text-shadow:0 2px 0 #000}
.oph-hp::after{content:attr(data-x)}
.oph-who{margin-top:10px;font-size:12px;color:#e8d6b0}
.oph-pw{position:relative;width:190px;display:grid;justify-items:center;gap:5px;padding:46px 12px 14px;border-radius:8px 8px 40px 40px;text-align:center;
  background:linear-gradient(180deg,#4a5aa8,#2c376e);box-shadow:inset 0 0 0 1.5px #10142a,inset 0 0 0 3.5px #c8b07a,inset 0 0 0 5px #10142a}
.oph-pw .hpc-art{position:absolute;top:-30px;left:50%;transform:translateX(-50%);width:66px;height:66px;border-radius:50%;display:grid;place-items:center;background:radial-gradient(circle at 40% 35%,#5a3a20,#1a0e06);box-shadow:0 0 0 3px #120a06,0 0 0 6px #c8963e}
.oph-pw .hpc-art .pwart{width:42px;height:42px}
.oph-pw .hpc-gem{position:absolute;top:-40px;left:50%;transform:translateX(-50%);width:34px;height:34px;border-radius:50%;display:grid;place-items:center;box-shadow:0 0 0 3px #120a06;z-index:2}
.oph-pw .hpc-gem.g{background:radial-gradient(circle at 35% 30%,#ffe9a0,#c8901e)}.oph-pw .hpc-gem.g b{font:700 18px var(--f-disp),serif;color:#2a1606}
.oph-pw .hpc-gem.ck{background:radial-gradient(circle at 35% 30%,#bfe6ff,#2a7ad8)}.oph-pw .hpc-gem.ck .ckm{width:28px;height:28px}
.oph-pw .hpc-gem.p{background:#2a1a0e;box-shadow:0 0 0 3px #120a06,0 0 0 5px #c8963e}.oph-pw .hpc-gem.p b{color:#ffd86a;font-size:16px}
.oph-pw .hpc-nm{width:calc(100% + 26px);padding:4px 0;font:700 15px var(--f-label),serif;color:#2a1c10;background:linear-gradient(180deg,#f3ead2,#c9b88e);clip-path:polygon(0 0,100% 0,95% 50%,100% 100%,0 100%,5% 50%)}
.oph-pw .hpc-tx{margin:0;padding:8px;border-radius:6px;font-size:12.5px;line-height:1.35;color:#2a2018;background:linear-gradient(180deg,#ece2ca,#d6c8a8)}
.oph-pw .hpc-bonus{margin:0;font-size:11.5px;line-height:1.3;color:#f1e4c6}.oph-pw .hpc-bonus b{color:#ffd86a;margin-right:3px}
.oph-parch{width:250px;padding:18px 18px 16px;border-radius:6px;background:linear-gradient(180deg,#e2cfa2,#c8b080);box-shadow:inset 0 0 0 2px #8a6a40,inset 0 0 0 5px #e9d9b2,inset 0 0 0 6.5px #9a5aa8,0 0 0 2px #3a2a14}
.op-stats{display:flex;justify-content:space-around;align-items:center;padding-bottom:12px;border-bottom:2px solid rgba(90,60,30,.3)}
.op-sh svg{width:42px;height:48px;filter:drop-shadow(0 2px 2px rgba(0,0,0,.4))}
.op-st{position:relative;display:grid;place-items:center;width:46px;height:46px}.op-st .op-ic{font-size:34px;line-height:1;color:#7a8aa0;filter:drop-shadow(0 2px 1px rgba(0,0,0,.4))}
.op-tri{width:44px;height:44px;filter:drop-shadow(0 2px 1px rgba(0,0,0,.4))}
.op-st b{position:absolute;inset:0;display:grid;place-items:center;font:700 22px var(--f-disp),serif;color:#fff;text-shadow:0 0 3px #000,0 2px 0 #000}
.op-rows{display:grid;gap:8px;margin-top:12px}
.op-row{display:grid;grid-template-columns:30px 54px 1fr;align-items:center;gap:6px;padding:6px 8px;border-radius:6px;background:rgba(90,60,30,.12);box-shadow:inset 0 0 0 1px rgba(90,60,30,.25)}
.op-sw{font-size:22px;color:#6a6a74}
.op-burst{display:grid;place-items:center;width:50px;height:46px;clip-path:polygon(50% 0,61% 22%,85% 10%,78% 35%,100% 45%,79% 58%,90% 84%,63% 76%,50% 100%,37% 76%,10% 84%,21% 58%,0 45%,22% 35%,15% 10%,39% 22%);background:radial-gradient(circle,#fff3a0,#e8b020)}
.op-burst b{font:700 15px var(--f-disp),serif;color:#2a1606}.op-burst.l{background:radial-gradient(circle,#ffd0c0,#d84a2a)}.op-burst.l b{color:#fff;text-shadow:0 1px 0 #000}
.op-of{justify-self:end;width:46px;height:46px;border-radius:8px;overflow:hidden;box-shadow:0 0 0 2px #120a06,0 0 0 4px #b01e14;display:grid;place-items:center;background:#3a2a1a;color:#fff;font-weight:700}
.op-of svg{width:100%;height:100%}
.op-none{margin:6px 0 0;font-size:12.5px;font-style:italic;color:#5a4428;text-align:center}
@media (max-width:820px){ .oph{flex-wrap:wrap;justify-content:center;gap:10px;max-width:92vw} .oph-hero,.oph-port{width:130px} .oph-pw{width:160px} .oph-parch{width:220px} }
.harch{position:relative;display:block;width:100%;aspect-ratio:100/122}
.harch > svg{display:block;width:100%;height:100%;filter:drop-shadow(0 6px 10px rgba(0,0,0,.6))}
.harch-hp{position:absolute;right:-6%;bottom:-3%;width:30%;aspect-ratio:.85;display:grid;place-items:center;padding-top:8%;box-sizing:border-box;font:700 clamp(18px,2.6vh,30px) var(--f-disp),serif;color:#fff;text-shadow:0 0 3px #000,0 2px 0 #000;
  background:radial-gradient(circle at 40% 62%,#ff6a52,#b0140c 70%);clip-path:path('M50 0 C62 22 92 46 92 70 A42 42 0 0 1 8 70 C8 46 38 22 50 0 Z');}
.harch-hp{clip-path:none!important;background:none!important;padding:0!important}.harch-hp svg{position:absolute;inset:0;width:100%;height:100%;filter:drop-shadow(0 3px 3px rgba(0,0,0,.6))}.harch-hp b{position:relative;margin-top:22%;font:inherit}
.hp-card .hp-arch{position:absolute;inset:0;width:100%;height:auto}
.hp-card{aspect-ratio:100/122!important}
.hp-card .hp-nm{bottom:6%!important}
.hp-col.on .hp-card .harch > svg{filter:drop-shadow(0 0 16px var(--c)) drop-shadow(0 6px 10px rgba(0,0,0,.6))}
.pwb{position:relative;width:clamp(170px,14vw,210px);display:grid;justify-items:center;gap:6px;padding:52px 14px 30px;text-align:center;box-sizing:border-box;
  background:repeating-linear-gradient(90deg,rgba(255,255,255,.04) 0 3px,transparent 3px 9px),linear-gradient(180deg,#4a5cae,#2c3a7a 70%,#253066);
  box-shadow:inset 7px 0 0 #c8a04a,inset -7px 0 0 #c8a04a,inset 9px 0 0 #3a2408,inset -9px 0 0 #3a2408,inset 0 3px 0 #c8a04a;
  clip-path:polygon(0 0,100% 0,100% 90%,50% 100%,0 90%);filter:drop-shadow(0 8px 12px rgba(0,0,0,.55))}
.pwb-cost{position:absolute;top:-2px;left:50%;transform:translateX(-50%);width:38px;height:38px;border-radius:50%;display:grid;place-items:center;z-index:2;box-shadow:0 0 0 3px #3a2408,0 0 0 5px #e2b04e,0 0 0 6.5px #3a2408}
.pwb-cost.g{background:radial-gradient(circle at 40% 35%,#fff0b0,#d8a640 60%,#9a6a1e)}.pwb-cost.g b{font:700 20px var(--f-disp),serif;color:#2a1606}
.pwb-cost.ck{background:radial-gradient(circle at 35% 30%,#bfe6ff,#2a7ad8)}.pwb-cost.ck .ckm{width:30px;height:30px}
.pwb-cost.p{background:radial-gradient(circle at 40% 35%,#6a4a2a,#2a1a0e)}.pwb-cost.p b{color:#ffd86a;font-size:18px}
.pwb-med{width:76px;height:76px;margin-top:-12px;border-radius:50%;display:grid;place-items:center;background:radial-gradient(circle at 40% 35%,#6a4a2a,#1a0e06);box-shadow:inset 0 0 0 3px #2a1806,0 0 0 5px #5a3a1a,0 0 0 8px #c8a04a,0 0 0 10px #2a1806}
.pwb-med .pwart{width:48px;height:48px}
.pwb-nm{width:calc(100% + 30px);margin-top:8px;padding:5px 0 6px;font:700 15px var(--f-label),serif;color:#2a1c10;background:linear-gradient(180deg,#f6eed8,#d8c89e 60%,#b8a478);box-shadow:inset 0 0 0 1px #5a4a30;
  clip-path:polygon(0 0,100% 0,94% 50%,100% 100%,0 100%,6% 50%);filter:drop-shadow(0 2px 2px rgba(0,0,0,.5))}
.pwb-tx{margin:2px 0 0;width:100%;padding:8px 8px 10px;box-sizing:border-box;font-size:12.5px;line-height:1.35;color:#2a2018;background:linear-gradient(180deg,#e6dfcf,#c9bfa8);box-shadow:inset 0 0 0 1.5px #6a5a40,inset 0 0 0 3px #e9e1cf}
.pwb-tx small{display:block;font-weight:700;color:#4a3a28;margin-bottom:2px}
.hp-pc{grid-template-columns:auto 1fr!important;grid-template-areas:none!important;align-items:center!important;padding:16px 20px!important;column-gap:22px!important}
.hp-pc > *{grid-area:auto!important}
.hpc-side{display:grid;gap:10px;align-content:center;min-width:0}
.hpc-side .hpc-q{border:0;border-top:1px solid rgba(242,193,78,.25);padding:8px 0 0}
.oph-arch{width:200px}
.oph-nm{bottom:40px}
@media (max-width:820px){ .hp-pc{grid-template-columns:1fr!important;justify-items:center} .hpc-side{width:100%} .oph-arch{width:130px} .pwb{width:170px} }
.hpc-side > *{grid-area:auto!important;margin:0!important;align-self:auto!important}
.hp-infos{min-height:clamp(290px,36vh,350px)!important}
.hp-col{flex-basis:clamp(150px,14vw,236px)!important}
.hp-card .hp-nm{position:absolute!important;top:100%!important;bottom:auto!important;left:-4%!important;right:-4%!important;margin-top:6px}
.hp-card{margin-bottom:46px}
.hp-card .harch-hp{right:-8%;bottom:-4%}
.rl-body{overflow:auto;min-height:0;padding-right:4px;text-align:left}
.rl-p p,.rl-ul li{font-size:13px;line-height:1.45;color:#f1e4c6;margin:0 0 8px}.rl-p b,.rl-ul b,.rl-step b{color:#ffd86a}
.rl-ul{margin:0 0 8px;padding-left:18px}
.rl-steps{list-style:none;margin:0;padding:0;display:grid;gap:8px}
.rl-step{display:grid;grid-template-columns:26px 46px 1fr;gap:8px;align-items:center;padding:7px 9px;border-radius:12px;background:rgba(0,0,0,.25)}
.rl-step small{display:block;font-size:12px;line-height:1.35;color:#f1e4c6}
.rl-n{width:26px;height:26px;border-radius:50%;display:grid;place-items:center;font:700 14px var(--f-num);color:#2a1404;background:#ffd27a}
.rl-v{display:grid;place-items:center}.rl-v .face{width:42px;height:42px;border-radius:50%}
.rl-el{display:inline-grid;place-items:center;width:20px;height:20px;border-radius:50%;background:#1b120b;box-shadow:0 0 0 1.5px var(--c);vertical-align:middle;margin:0 1px}.rl-el svg{width:14px;height:14px}
.rl-coin{display:inline-block;width:13px;height:13px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff3b0,#e2b04e 60%,#8a5a12);vertical-align:-2px}
.rl-ck{display:inline-block;width:14px;height:16px;vertical-align:-3px}
.rl-scroll{display:inline-flex;width:40px;height:24px;border-radius:3px;background:#f1e2bd;box-shadow:0 0 0 2px #7a4a28;overflow:hidden}.rl-scroll i{flex:1}.rl-scroll i+i{border-left:1px dashed #7a5a32}
.rl-scroll.big{width:64px;height:36px}
.rl-rsv{display:flex;align-items:center;gap:10px;margin:6px 0 10px;color:#ffd86a;font-weight:700}
.rl-boom{font:700 20px Grenze,serif;color:#ff9a5a}
.rl-pow{width:36px;height:36px;border-radius:50%;display:grid;place-items:center;color:#ffd86a;background:#2a1a3a;box-shadow:0 0 0 3px #d8a84a}
.rl-vs{font:700 18px Grenze,serif;color:#ff9a5a}
.rl-chest{width:34px;height:26px;border-radius:4px 4px 3px 3px;background:linear-gradient(180deg,#c88a26 45%,#e2b04e 45%);box-shadow:0 0 0 2px #120a06}
.rl-duel{display:flex;align-items:center;justify-content:center;gap:14px;margin-bottom:8px}.rl-duel .face{width:56px;height:56px;border-radius:50%;box-shadow:0 0 0 3px #d8a84a}
.rl-mks{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:8px}.rl-mks span{display:flex;align-items:center;gap:4px}.rl-mks b{color:var(--c);font-size:13px}
.rl-hint{font-size:12px!important;color:#bfae8a!important}
.rl-awk{font-size:14px!important}
@media (max-width:900px){ .hpick{grid-template-columns:1fr;overflow:auto} .hpk-g{grid-template-columns:1fr} }
@media (orientation:landscape) and (max-height:540px){ .hpick{gap:10px} .hpk{grid-template-columns:48px 1fr;padding:7px} .hpk-face .face{width:48px;height:48px} .hpk-b small{font-size:10.5px} .hpk-c{display:none} .hpick-l .ov-s{display:none} .rl-head b{font-size:18px} .rl-p p,.rl-ul li,.rl-step small{font-size:11px} }
`; document.head.appendChild(st); })();

(function(){ const st = document.createElement('style'); st.textContent = `
.h-roll{position:absolute;z-index:3;left:-6px;top:-8px;width:30px;height:30px;display:grid;place-items:center;border-radius:50%;cursor:pointer;color:#120a06;background:radial-gradient(circle at 40% 35%,#ffe9a8,#c88a26);box-shadow:0 0 0 2.5px #120a06,0 3px 8px rgba(0,0,0,.5);transition:transform .15s}
.h-roll svg{width:17px;height:17px}.h-roll:hover{transform:rotate(-30deg) scale(1.12)}
.h-roll.off{filter:grayscale(1) brightness(.6);cursor:not-allowed;pointer-events:none}
.md-coin .h-roll{left:2%;top:2%;width:22%;height:auto;aspect-ratio:1}
.h-rolls{display:flex;align-items:center;justify-content:center;gap:6px;margin:0 0 6px;font:700 13px var(--f-label),serif;color:#ffe27a}
.h-rolls svg{width:15px;height:15px}.h-rolls i{width:11px;height:11px;border-radius:50%;background:#3a2a1a;box-shadow:inset 0 0 0 1.5px #c8963e}.h-rolls i.on{background:#ffd86a;box-shadow:0 0 6px #ffd86a}
.h-rolls small{font:400 11.5px inherit;color:#bfae8a;margin-left:6px;display:inline-flex;align-items:center;gap:3px}.h-rolls small svg{width:12px;height:12px}
.mds.n5{gap:clamp(6px,1.6cqi,22px)}.mds.n5 .md{flex-basis:220px}.mds.n5 .md-coin{width:min(160px,80%)}.mds.n5 .md-tx{font-size:12.5px}.mds.n5 .md-comp{padding:6px 8px;gap:6px}.mds.n5 .md-comp .face{width:36px;height:36px}.mds.n5 .md-comp small{font-size:11px}
.mds.n5 .md:nth-child(2){transform:rotateY(8deg) scale(.94)}.mds.n5 .md:nth-child(4){transform:rotateY(-8deg) scale(.94)}.mds.n5 .md.on{transform:scale(1.04)}
.hpk-g .hpk:last-child:nth-child(odd){grid-column:1 / -1;justify-self:center;width:calc(50% - 6px)}
@media (max-width:900px){.hpk-g .hpk:last-child:nth-child(odd){width:100%}}
@media (orientation:landscape) and (max-height:540px){.mds.n5 .md-coin{width:min(92px,74%)}.mds.n5 .md-tx{display:none}.h-roll{width:24px;height:24px}.h-rolls small{display:none}}
`; document.head.appendChild(st); })();
(function(){ const st = document.createElement('style'); st.textContent = `
@media (orientation:landscape) and (max-height:540px){
  .ov-box:has(.mds.n5){max-height:96vh;overflow:auto;padding-top:8px;padding-bottom:8px}
  .ov-box:has(.mds.n5) .ov-t{font-size:24px;margin:0}.ov-box:has(.mds.n5) .ov-s{display:none}
  .ov-box:has(.mds.n5) .law-big{padding:6px 10px;margin:4px auto}
  .mds.n5 .md-chain,.mds.n5 .md-comp{display:none}.mds.n5 .md-rib{font-size:11px;padding:3px 10px}
  .h-rolls{margin:2px 0}
}`; document.head.appendChild(st); })();
(function(){ const st = document.createElement('style'); st.textContent = `
.hpk .h-roll{left:4px;top:4px}.hpk-face{margin-top:6px}
@media (orientation:landscape) and (max-height:540px){
  .hpick .hpk-g{grid-template-columns:1fr 1fr;gap:6px}.hpick .hpk-g .hpk:last-child:nth-child(odd){width:calc(50% - 3px)}
  .hpick-l .ov-t{font-size:24px}.hpk .h-roll{width:22px;height:22px}.hpk .h-roll svg{width:13px;height:13px}
}`; document.head.appendChild(st); })();

(function(){ const st = document.createElement('style'); st.textContent = `.hpk-b small .hpk-pn{font-size:12px;color:#ffd86a;font-weight:700}`; document.head.appendChild(st); })();

(function(){ const st = document.createElement('style'); st.textContent = `.tx-tag{display:inline-block;padding:0 5px;margin-right:2px;border-radius:6px;font-weight:700;font-size:.9em;color:#120a06;background:#c8e8ff}.tx-tag.kin{background:#ff9a7a}.tx-tag.hid{background:#ffd86a}`; document.head.appendChild(st); })();

(function(){ const st = document.createElement('style'); st.textContent = `
.cp-tok.cpboost{animation:cpBoost 1.6s ease-out}
.cp-tok.cpboost::after{content:'';position:absolute;left:50%;bottom:20%;width:70%;height:240%;transform:translateX(-50%);pointer-events:none;border-radius:50% 50% 10% 10%;background:linear-gradient(0deg,color-mix(in srgb,var(--cpc,#ffe39a) 85%,transparent),transparent 85%);filter:blur(6px);opacity:0;animation:cpPillar 1.4s ease-out}
@keyframes cpBoost{0%{transform:scale(1);filter:none}18%{transform:scale(1.16);filter:drop-shadow(0 0 18px var(--cpc,#ffe39a)) brightness(1.35)}45%{transform:scale(1.04);filter:drop-shadow(0 0 12px var(--cpc,#ffe39a))}100%{transform:scale(1);filter:none}}
@keyframes cpPillar{0%{opacity:0;transform:translateX(-50%) scaleY(.2)}25%{opacity:.9;transform:translateX(-50%) scaleY(1)}100%{opacity:0;transform:translateX(-50%) scaleY(1.15)}}
.cp-side.cpflash{animation:cpFlash 1.5s ease-out}
@keyframes cpFlash{0%,100%{box-shadow:none}25%{box-shadow:0 0 0 2px var(--cpc,#ffe39a),0 0 30px color-mix(in srgb,var(--cpc,#ffe39a) 60%,transparent)}}
body.lite .cp-tok.cpboost::after{display:none}
@media (prefers-reduced-motion:reduce){.cp-tok.cpboost,.cp-tok.cpboost::after,.cp-side.cpflash{animation:none}}
`; document.head.appendChild(st); })();
/* PC : la table occupe toute la page ; combats symétriques autour du centre */
(function(){ const st = document.createElement('style'); st.textContent = `
@media (min-width:1100px) and (min-height:700px){
  body .stage{max-width:none;width:100%;height:calc(100vh - 20px);min-height:0;grid-template-columns:104px minmax(0,1fr);box-sizing:border-box}
  :root body .table{height:100%;align-content:stretch;--tw:min(150px, calc((100cqi - 80px) / 7.4), 15.5vh);--hw:min(178px, calc((100cqi - 40px) / 8.2), 22vh)}
  :root body .table:not(.fighting){grid-template-rows:auto auto minmax(0,1fr) auto auto}
  :root body .table:not(.fighting) .board-zone{align-self:center}
  :root body .table.fighting{grid-template-rows:auto minmax(0,1.5fr) minmax(0,1fr) auto auto;--tw:min(140px, calc((100cqi - 120px) / 7.8), 15vh)}
  :root body .table.fighting:has(.duel-col){--tw:min(134px, calc((100cqi - 330px) / 7.6), 14.5vh)}
  :root body .table.fighting.joined{--tw:min(128px, calc((100cqi - 120px) / 9.6), 14vh)}
  :root body .table.fighting .keeper-zone.enemy{display:flex;flex-direction:column;justify-content:space-between;align-items:stretch;padding-bottom:calc(var(--tw) * .12)}
  :root body .table.fighting .keeper-zone.enemy > .keeper{align-self:center}
  :root body .table.fighting .board-zone{align-self:start;padding-top:calc(var(--tw) * .12)}
  :root body .table.fighting #bdrow,:root body .table.fighting .counter-line{min-height:0}
}
`; document.head.appendChild(st); })();

/* Éveil : manteau de chakra autour des créatures, selon le marqueur dominant (anneau tournant + particules de l'élément) */
(function(){ const st = document.createElement('style'); st.textContent = `
.table[class*="awk-"]{--ak1:#ffb050;--ak2:#ff6a1a;--akg:rgba(255,140,40,.85)}
.table.awk-feu{--ak1:#ffd54f;--ak2:#ff3d00;--akg:rgba(255,110,20,.9)}
.table.awk-vent{--ak1:#d8ffe6;--ak2:#2ee08a;--akg:rgba(80,230,150,.85)}
.table.awk-eau{--ak1:#c8f0ff;--ak2:#1e9be0;--akg:rgba(70,180,255,.9)}
.table.awk-foudre{--ak1:#fff7b0;--ak2:#ffd000;--akg:rgba(255,220,60,.95)}
.table.awk-terre{--ak1:#f0d38a;--ak2:#8a5a2a;--akg:rgba(220,170,90,.85)}
.table[class*="awk-"] .board-zone .mn:not(.dying)::before,.table[class*="awk-"] .board-zone .mn:not(.dying)::after{content:'';position:absolute;pointer-events:none;z-index:0}
.table[class*="awk-"] .board-zone .mn .mn-svg{position:relative;z-index:1}
/* l'anneau : un halo ovale qui tourne autour du portrait */
.table[class*="awk-"] .board-zone .mn:not(.dying)::before{left:-5%;right:-5%;top:-5%;bottom:13%;border-radius:50%;
  -webkit-mask:radial-gradient(farthest-side,transparent 80%,#000 86%,#000 94%,transparent 100%);mask:radial-gradient(farthest-side,transparent 80%,#000 86%,#000 94%,transparent 100%);
  filter:drop-shadow(0 0 6px var(--akg));animation:akSpin 4s linear infinite}
.table[class*="awk-"] .board-zone .mn .mn-svg{filter:drop-shadow(0 0 7px var(--akg)) drop-shadow(0 2px 3px rgba(0,0,0,.5))}
.table.awk-hi .board-zone .mn .mn-svg{filter:drop-shadow(0 0 12px var(--akg)) drop-shadow(0 0 22px var(--akg))}
@keyframes akSpin{to{transform:rotate(360deg)}}
/* Katon : anneau de flammes + braises qui montent */
.table.awk-feu .board-zone .mn:not(.dying)::before{background:conic-gradient(from 0deg,#ff3d00,#ffd54f 12%,#ff6d00 25%,#ffb300 40%,#ff3d00 55%,#ffd54f 70%,#ff6d00 85%,#ff3d00);animation:akSpin 3s linear infinite,akFlick .25s steps(2) infinite}
.table.awk-feu .board-zone .mn:not(.dying)::after{left:-4%;right:-4%;top:-30%;bottom:34%;mix-blend-mode:screen;
  background:radial-gradient(circle,#ffe082 0 1.6px,transparent 2.6px) 0 0/22% 34%,radial-gradient(circle,#ff9100 0 2px,transparent 3px) 11% 15%/29% 41%,radial-gradient(circle,#ffd54f 0 1.3px,transparent 2.3px) 5% 7%/17% 27%;
  -webkit-mask:linear-gradient(0deg,transparent,#000 30%,#000 60%,transparent);mask:linear-gradient(0deg,transparent,#000 30%,#000 60%,transparent);animation:akEmber 1.6s linear infinite}
@keyframes akFlick{50%{opacity:.78}}
@keyframes akEmber{from{background-position:0 100%,11% 115%,5% 107%}to{background-position:0 0,11% 15%,5% 7%}}
/* Fûton : bourrasques qui tournoient vite + traînées */
.table.awk-vent .board-zone .mn:not(.dying)::before{background:conic-gradient(transparent 0 8%,#d8ffe6 8% 20%,transparent 20% 33%,#2ee08a 33% 45%,transparent 45% 58%,#d8ffe6 58% 70%,transparent 70% 83%,#2ee08a 83% 95%,transparent 95%);animation:akSpin 1.1s linear infinite}
.table.awk-vent .board-zone .mn:not(.dying)::after{left:-18%;right:-18%;top:10%;bottom:40%;mix-blend-mode:screen;
  background:linear-gradient(90deg,transparent,rgba(216,255,230,.9) 45%,transparent 55%) 0 20%/60% 2px no-repeat,linear-gradient(90deg,transparent,rgba(46,224,138,.9) 45%,transparent 55%) 0 60%/45% 2px no-repeat,linear-gradient(90deg,transparent,rgba(216,255,230,.8) 45%,transparent 55%) 0 90%/55% 2px no-repeat;
  animation:akGust 1.2s linear infinite}
@keyframes akGust{from{background-position:-80% 20%,-60% 60%,-90% 90%}to{background-position:180% 20%,170% 60%,190% 90%}}
/* Suiton : anneau d'eau lent + ondes qui s'élargissent */
.table.awk-eau .board-zone .mn:not(.dying)::before{background:conic-gradient(from 0deg,#1e9be0,#c8f0ff 15%,#4fc3f7 30%,#0277bd 50%,#b3e5fc 70%,#29b6f6 85%,#1e9be0);animation:akSpin 6s linear infinite}
.table.awk-eau .board-zone .mn:not(.dying)::after{left:-2%;right:-2%;top:-2%;bottom:16%;border-radius:50%;box-shadow:0 0 0 2px rgba(200,240,255,.85),0 0 12px rgba(70,180,255,.8);animation:akRipple 2s ease-out infinite}
@keyframes akRipple{0%{transform:scale(.95);opacity:.95}100%{transform:scale(1.28);opacity:0}}
/* Raiton : arcs électriques qui crépitent */
.table.awk-foudre .board-zone .mn:not(.dying)::before{background:conic-gradient(transparent 0 6%,#fff7b0 6% 8%,transparent 8% 22%,#ffd000 22% 25%,transparent 25% 41%,#b8e4ff 41% 43%,transparent 43% 58%,#fff7b0 58% 61%,transparent 61% 76%,#ffd000 76% 78%,transparent 78% 92%,#b8e4ff 92% 94%,transparent 94%);
  -webkit-mask:radial-gradient(farthest-side,transparent 74%,#000 80%,#000 100%);mask:radial-gradient(farthest-side,transparent 74%,#000 80%,#000 100%);animation:akBolt .32s steps(3) infinite}
.table.awk-foudre .board-zone .mn:not(.dying)::after{left:-3%;right:-3%;top:-3%;bottom:15%;border-radius:50%;box-shadow:0 0 0 1.5px rgba(255,247,176,.9),0 0 14px rgba(255,220,60,.9),inset 0 0 10px rgba(140,200,255,.6);animation:akZap .9s steps(2) infinite}
@keyframes akBolt{0%{transform:rotate(0)}33%{transform:rotate(71deg)}66%{transform:rotate(203deg)}100%{transform:rotate(290deg)}}
@keyframes akZap{50%{opacity:.35}}
/* Doton : halo de roche ambrée et éclats qui orbitent lentement */
.table.awk-terre .board-zone .mn:not(.dying)::before{background:conic-gradient(from 0deg,#b07a3a,#ffe7a0 14%,#8a5a2a 30%,#f5d27a 48%,#b07a3a 64%,#ffdf8a 80%,#b07a3a);
  -webkit-mask:radial-gradient(farthest-side,transparent 78%,#000 84%,#000 97%,transparent 100%);mask:radial-gradient(farthest-side,transparent 78%,#000 84%,#000 97%,transparent 100%);animation:akSpin 12s linear infinite,akPulse 2.4s ease-in-out infinite}
.table.awk-terre .board-zone .mn:not(.dying)::after{left:-9%;right:-9%;top:-9%;bottom:9%;border-radius:50%;
  background:radial-gradient(circle at 50% 4%,#ffe7a0 0 5%,#5a3a1a 6.5%,transparent 7.5%),radial-gradient(circle at 96% 52%,#f5d27a 0 4.5%,#5a3a1a 6%,transparent 7%),radial-gradient(circle at 50% 96%,#ffe7a0 0 5%,#5a3a1a 6.5%,transparent 7.5%),radial-gradient(circle at 4% 48%,#f5d27a 0 4.5%,#5a3a1a 6%,transparent 7%);
  animation:akSpin 7s linear infinite reverse}
@keyframes akPulse{50%{filter:drop-shadow(0 0 12px var(--akg)) brightness(1.25)}}
/* main : liseré lumineux de l'élément */
.table[class*="awk-"] .hand .cd{box-shadow:0 0 0 2px var(--ak2),0 0 14px var(--akg)}
html.lite .table[class*="awk-"] .board-zone .mn::before,html.lite .table[class*="awk-"] .board-zone .mn::after{animation:none}
html.lite .table[class*="awk-"] .board-zone .mn::after{display:none}
@media (prefers-reduced-motion:reduce){.table[class*="awk-"] .board-zone .mn::before,.table[class*="awk-"] .board-zone .mn::after{animation:none}}
`; document.head.appendChild(st); })();
(function(){ const st = document.createElement('style'); st.textContent = `
@media (min-width:1100px) and (min-height:700px) and (max-height:900px){
  :root body .table{--tw:min(130px, calc((100cqi - 80px) / 7.4), 13vh);--hw:min(150px, calc((100cqi - 40px) / 8.2), 19vh)}
  :root body .table.fighting{--tw:min(120px, calc((100cqi - 120px) / 7.8), 12vh)}
  :root body .table.fighting:has(.duel-col){--tw:min(116px, calc((100cqi - 330px) / 7.6), 11.5vh)}
  :root body .table.fighting.joined{--tw:min(110px, calc((100cqi - 120px) / 9.6), 11.5vh)}
}
@media (min-width:1100px) and (min-height:1200px){
  :root body .table{--tw:min(190px, calc((100cqi - 80px) / 7.4), 15vh)}
  :root body .table.fighting:has(.duel-col){--tw:min(170px, calc((100cqi - 380px) / 7.6), 14vh)}
}
`; document.head.appendChild(st); })();
/* PC : tout plus grand et plus lisible (créatures, noms, cartes, interface) */
(function(){ const st = document.createElement('style'); st.textContent = `
@media (min-width:1100px) and (min-height:700px){
  body .stage{grid-template-columns:clamp(104px, 7vw, 150px) minmax(0,1fr)}
  :root body .table{--tw:min(200px, calc((100cqi - 60px) / 7.1), 17.5vh);--hw:min(210px, calc((100cqi - 40px) / 7.4), 19vh)}
  :root body .table.fighting{--tw:min(180px, calc((100cqi - 100px) / 7.6), 16vh)}
  :root body .table.fighting:has(.duel-col){--tw:min(170px, calc((100cqi - 300px) / 7.4), 15.5vh)}
  :root body .table.fighting.joined{--tw:min(160px, calc((100cqi - 100px) / 9.2), 15vh)}
  :root body .table .mn-nm{font-size:clamp(12px, 1.5vh, 20px)}
  :root body .table .cd-nm{font-size:clamp(12px, 1.55vh, 19px)}
  :root body .table .cd-tx{font-size:clamp(11.5px, 1.4vh, 17px)}
  .hud,.hero-zone,.opps,.table-skip,.shop-tools,.kz-tools{zoom:1.12}
  #peek .tip,.tip{font-size:15.5px}
}
@media (min-width:1100px) and (min-height:950px){
  .hud,.hero-zone,.opps,.table-skip{zoom:1.28}
}
@media (min-width:1100px) and (min-height:1300px){
  .hud,.hero-zone,.opps,.table-skip{zoom:1.55}
  :root body .table{--tw:min(260px, calc((100cqi - 60px) / 7.1), 17.5vh)}
}
@media (min-width:1100px) and (min-height:700px) and (max-height:900px){
  :root body .table{--tw:min(160px, calc((100cqi - 60px) / 7.1), 15.5vh);--hw:min(170px, calc((100cqi - 40px) / 7.6), 17vh)}
  :root body .table.fighting{--tw:min(140px, calc((100cqi - 100px) / 7.6), 13.5vh)}
  :root body .table.fighting:has(.duel-col){--tw:min(134px, calc((100cqi - 300px) / 7.4), 13vh)}
}
`; document.head.appendChild(st); })();
(function(){ const st = document.createElement('style'); st.textContent = `
@media (min-width:1100px) and (min-height:700px){
  :root body .table:not(.fighting) .board-zone,:root body .table:not(.fighting) .board-zone.has-cp{--tw:min(190px, calc((100cqi - 280px) / 7.6), 15vh)}
  :root body .table:not(.fighting) .keeper-zone{--tw:min(170px, calc((100cqi - 280px) / 7.6), 13.5vh)}
}
@media (min-width:1100px) and (min-height:700px) and (max-height:900px){
  :root body .table:not(.fighting) .board-zone,:root body .table:not(.fighting) .board-zone.has-cp{--tw:min(150px, calc((100cqi - 260px) / 7.6), 12.5vh)}
  :root body .table:not(.fighting) .keeper-zone{--tw:min(130px, calc((100cqi - 260px) / 7.6), 11.5vh)}
}
`; document.head.appendChild(st); })();
(function(){ const st = document.createElement('style'); st.textContent = `@media (min-width:1100px) and (min-height:700px) and (max-height:800px){ .hud,.hero-zone,.opps,.table-skip{zoom:1} }`; document.head.appendChild(st); })();
/* PC : survols grands et lisibles */
(function(){ const st = document.createElement('style'); st.textContent = `
@media (min-width:1100px) and (min-height:700px){
  #peek{--hw:clamp(250px, 29vh, 420px)}
  #peek .cd-nm{font-size:clamp(15px, 2.1vh, 26px)}
  #peek .cd-tx{font-size:clamp(13px, 1.75vh, 22px);line-height:1.3}
  #peek .cd-tb{font-size:clamp(11px, 1.3vh, 16px)}
  #peek .tip,#peek .hcard,#peek .peek-note{zoom:1.35}
  #peek .peq{zoom:1.08}
  .tip{font-size:16px}
}
@media (min-width:1100px) and (min-height:1200px){
  #peek .tip,#peek .hcard,#peek .peek-note{zoom:1.7}
  #peek .peq{zoom:1.35}
}
@media (min-width:1100px) and (min-height:700px) and (max-height:820px){
  #peek .tip,#peek .hcard,#peek .peek-note{zoom:1.15}
  #peek .peq{zoom:1}
}
`; document.head.appendChild(st); })();
(function(){ const st = document.createElement('style'); st.textContent = `@media (min-width:1100px) and (min-height:700px){ #peek .peq{max-height:calc(100vh / 1.1 - 24px);overflow:auto} }`; document.head.appendChild(st); })();
/* taverne : un serviteur que tu possèdes déjà (paire) ou deux fois (triple) se signale */
(function(){ const st = document.createElement('style'); st.textContent = `
.keeper-zone .mn.pairok::after,.keeper-zone .mn.tripok::after{position:absolute;left:50%;top:-4%;transform:translateX(-50%);z-index:6;padding:2px 9px;border-radius:99px;font:700 clamp(10px, calc(var(--tw) * .12), 15px)/1.2 var(--f-label),serif;white-space:nowrap;pointer-events:none;letter-spacing:.03em}
.keeper-zone .mn.pairok::after{content:'Paire ×2';color:#e8f4ff;background:linear-gradient(180deg,#5a7aa8,#2a3e62);box-shadow:0 0 0 1.5px #bcd6ff,0 2px 6px rgba(0,0,0,.6)}
.keeper-zone .mn.tripok::after{content:'Triple !';color:#3a2206;background:linear-gradient(180deg,#fff1b8,#e2a83a);box-shadow:0 0 0 1.5px #fff6d0,0 0 14px rgba(255,210,90,.9);animation:tripTag 1s ease-in-out infinite}
.keeper-zone .mn.pairok .mn-svg{filter:drop-shadow(0 0 6px rgba(150,200,255,.95)) drop-shadow(0 0 2px #fff)}
.keeper-zone .mn.pairok::before{content:'';position:absolute;left:2%;right:2%;top:2%;bottom:18%;border-radius:50%;pointer-events:none;z-index:0;box-shadow:0 0 0 2px rgba(190,220,255,.8),0 0 16px rgba(120,180,255,.7);animation:pairPulse 1.8s ease-in-out infinite}
.keeper-zone .mn.tripok::before{content:'';position:absolute;left:-14%;right:-14%;top:-10%;bottom:6%;border-radius:50%;pointer-events:none;z-index:0;
  background:repeating-conic-gradient(rgba(255,226,130,.85) 0 7deg,transparent 7deg 22deg);-webkit-mask:radial-gradient(farthest-side,transparent 52%,#000 66%,transparent 100%);mask:radial-gradient(farthest-side,transparent 52%,#000 66%,transparent 100%);animation:akSpin 5s linear infinite}
.keeper-zone .mn.pairok .mn-svg,.keeper-zone .mn.tripok .mn-svg{position:relative;z-index:1}
@keyframes pairPulse{50%{box-shadow:0 0 0 3px rgba(220,236,255,.95),0 0 26px rgba(120,180,255,.9)}}
@keyframes tripTag{50%{transform:translateX(-50%) scale(1.1)}}
html.lite .keeper-zone .mn.tripok .mn-svg{filter:drop-shadow(0 0 8px rgba(255,210,90,.95))}
html.lite .keeper-zone .mn.pairok::before,html.lite .keeper-zone .mn.tripok::before,html.lite .keeper-zone .mn.tripok::after{animation:none}
`; document.head.appendChild(st); })();
/* PC : proportions d'un auto-battler classique (portraits ~16 % de la hauteur, créatures ~17 %, rangées à 35 % / 57 %, héros à 80 %, main qui dépasse du bas) */
(function(){ const st = document.createElement('style'); st.textContent = `
@media (min-width:1100px) and (min-height:700px){
  :root body .table:not(.fighting) .board-zone,:root body .table:not(.fighting) .board-zone.has-cp,:root body .table:not(.fighting) .keeper-zone,
  :root body .table.fighting,:root body .table.fighting:has(.duel-col),:root body .table.fighting.joined{--tw:min(200px, calc((100cqi - 300px) / 7.6), 14.2vh)}
  :root body .table{--hw:min(230px, calc((100cqi - 40px) / 7.4), 20vh)}
  :root body .table .hand{height:calc(var(--hw) * .5);overflow:visible}
  :root body .table .keeper{zoom:1.55}
  :root body .table .hero-zone{zoom:1.35}
  :root body .table.fighting{grid-template-rows:auto minmax(0,1.65fr) minmax(0,1fr) auto auto}
}
@media (min-width:1100px) and (min-height:700px) and (max-height:900px){
  :root body .table .keeper{zoom:1.25}
  :root body .table .hero-zone{zoom:1.05}
}
`; document.head.appendChild(st); })();
(function(){ const st = document.createElement('style'); st.textContent = `
@media (min-width:1100px) and (min-height:700px) and (max-height:900px){ :root body .table.fighting{grid-template-rows:auto minmax(0,1.3fr) minmax(0,1fr) auto auto} }
@media (min-width:1100px) and (min-height:1200px){ :root body .table .keeper{zoom:2.05} :root body .table .hero-zone{zoom:1.8} }
`; document.head.appendChild(st); })();

/* récompenses : plus grandes + 10 styles */
(function(){ const st = document.createElement('style'); st.textContent = `
.rw-pick{display:flex;align-items:center;gap:10px;margin-top:14px;color:#e8d6b0;font:700 13px var(--f-label),serif}
.rw-pick span{min-width:200px;text-align:center}
@media (min-width:900px){
  .upch-t{font-size:clamp(32px,4.5vh,52px)} .upch-s{font-size:clamp(13px,1.6vh,18px)}
  .upch-row{gap:clamp(18px,2.4vw,40px)}
  .upc{width:clamp(220px,17vw,320px);padding:clamp(14px,1.8vh,24px) 16px clamp(16px,2vh,26px);gap:10px}
  .upc .pc-ico.big{width:clamp(110px,14vh,170px);height:clamp(110px,14vh,170px)}
  .upc b{font-size:clamp(17px,2.1vh,24px)} .upc-tx{font-size:clamp(15px,1.85vh,21px);min-height:2.6em} .upc small{font-size:clamp(12px,1.4vh,15px)}
  .upc-r{font-size:clamp(11px,1.3vh,15px);padding:3px 14px}
  :root body .upm{width:clamp(48px,5.6vh,72px);height:clamp(48px,5.6vh,72px)}
  :root body .upm-c{width:26px;height:28px}
}
/* 2 · Parchemin */
body.rw-1 .upc{color:#3a2412;border-radius:6px;background:radial-gradient(120% 90% at 50% 40%,#f6e8c4,#e3c98e 70%,#c9a564);box-shadow:0 0 0 2px #7a5426,0 0 0 5px var(--rc),0 14px 26px rgba(0,0,0,.6);
  -webkit-mask:radial-gradient(6px at 50% 0,#0000 98%,#000) 50% 0/14px 51% repeat-x,radial-gradient(6px at 50% 100%,#0000 98%,#000) 50% 100%/14px 51% repeat-x}
body.rw-1 .upc b{color:#4a2a0e} body.rw-1 .upc-tx{color:#7a2a12} body.rw-1 .upc small{color:#6a5032}
/* 3 · Médaillon */
body.rw-2 .upc{border-radius:50%;aspect-ratio:1;align-content:center;padding:28px;background:radial-gradient(circle,#3a2614,#160c06 70%);box-shadow:0 0 0 6px #120a06,0 0 0 12px #d8a84a,0 0 0 15px var(--rc),0 0 40px color-mix(in srgb,var(--rc) 70%,transparent)}
body.rw-2 .upc .pc-ico.big{width:clamp(80px,10vh,120px);height:clamp(80px,10vh,120px)}
/* 4 · Cristal de chakra */
body.rw-3 .upc{border-radius:22px;background:linear-gradient(160deg,color-mix(in srgb,var(--rc) 35%,rgba(255,255,255,.15)),rgba(10,20,40,.55));backdrop-filter:blur(8px);box-shadow:inset 0 0 0 1.5px rgba(255,255,255,.55),inset 0 20px 40px rgba(255,255,255,.12),0 0 30px color-mix(in srgb,var(--rc) 70%,transparent),0 14px 26px rgba(0,0,0,.5)}
body.rw-3 .upc::after{content:'';position:absolute;inset:0;border-radius:inherit;pointer-events:none;background:linear-gradient(115deg,transparent 30%,rgba(255,255,255,.35) 45%,transparent 55%);background-size:250% 100%;animation:rwShine 3s linear infinite}
body.rw-3 .upc{position:relative;overflow:hidden}
@keyframes rwShine{from{background-position:120% 0}to{background-position:-120% 0}}
/* 5 · Talisman scellé */
body.rw-4 .upc{border-radius:3px;color:#2a1608;background:linear-gradient(180deg,#fbf3dc,#efe0b4);box-shadow:inset 0 0 0 3px #fbf3dc,inset 0 0 0 5px #b8322a,0 0 0 2px var(--rc),0 14px 26px rgba(0,0,0,.6);position:relative}
body.rw-4 .upc .pc-ico.big{box-shadow:0 0 0 5px #b8322a,0 0 0 8px #fbf3dc,0 0 0 10px #b8322a}
body.rw-4 .upc b{color:#2a1608;writing-mode:horizontal-tb} body.rw-4 .upc-tx{color:#8a1e16} body.rw-4 .upc small{color:#6a4a2a}
body.rw-4 .upc-r{background:#b8322a;color:#fbf3dc}
/* 6 · Bannière */
body.rw-5 .upc{border-radius:6px 6px 0 0;padding-bottom:46px;background:linear-gradient(180deg,color-mix(in srgb,var(--rc) 55%,#3a1a0a),color-mix(in srgb,var(--rc) 25%,#160a04));clip-path:polygon(0 0,100% 0,100% 100%,50% 90%,0 100%);box-shadow:none;filter:drop-shadow(0 0 3px var(--rc)) drop-shadow(0 12px 14px rgba(0,0,0,.6))}
body.rw-5 .upc::before{content:'';position:absolute;left:-6%;right:-6%;top:-10px;height:12px;border-radius:6px;background:linear-gradient(180deg,#e2b452,#8a5a1a)}
body.rw-5 .upc{position:relative;overflow:visible}
/* 7 · Pierre runique */
body.rw-6 .upc{border-radius:14px 14px 30px 30px;background:radial-gradient(120% 80% at 30% 20%,#5a5a62,#2a2a30 60%,#18181c);box-shadow:inset 0 0 0 2px #6a6a74,inset 0 0 18px rgba(0,0,0,.7),0 0 0 3px #1a1a1e,0 0 22px color-mix(in srgb,var(--rc) 70%,transparent)}
body.rw-6 .upc b,body.rw-6 .upc-tx{color:var(--rc);text-shadow:0 0 8px var(--rc)}
/* 8 · Néon */
body.rw-7 .upc{border-radius:10px;background:#0a0814;box-shadow:0 0 0 2px var(--rc),0 0 12px var(--rc),inset 0 0 14px color-mix(in srgb,var(--rc) 50%,transparent);font-family:ui-monospace,Menlo,monospace}
body.rw-7 .upc b{font-family:inherit;color:#fff;text-shadow:0 0 8px var(--rc)} body.rw-7 .upc-tx{color:var(--rc);text-shadow:0 0 6px var(--rc)}
body.rw-7 .upc .pc-ico.big{box-shadow:0 0 0 2px var(--rc),0 0 22px var(--rc)}
/* 9 · Holographique */
body.rw-8 .upc{position:relative;isolation:isolate;border-radius:18px;background:linear-gradient(180deg,#1c1424,#0c0812);box-shadow:0 14px 26px rgba(0,0,0,.6)}
body.rw-8 .upc::before{content:'';position:absolute;inset:-3px;border-radius:20px;z-index:-1;background:conic-gradient(from var(--hg,0deg),#ff6ad5,#ffd36a,#6affb4,#6ad5ff,#b46aff,#ff6ad5);animation:rwHolo 4s linear infinite}
body.rw-8 .upc b{background:linear-gradient(90deg,#ffd36a,#6affb4,#6ad5ff);-webkit-background-clip:text;color:transparent}
@property --hg{syntax:'<angle>';inherits:false;initial-value:0deg}
@keyframes rwHolo{to{--hg:360deg}}
/* 10 · Épuré */
body.rw-9 .upc{border-radius:12px;background:#17120e;box-shadow:inset 0 3px 0 var(--rc),0 0 0 1px rgba(255,255,255,.12),0 10px 22px rgba(0,0,0,.5)}
body.rw-9 .upc .pc-ico.big{box-shadow:none} body.rw-9 .upc-r{background:none;color:var(--rc);padding:0}
html.lite body .upc::after,html.lite body .upc::before{animation:none}
`; document.head.appendChild(st); })();
(function(){ const st = document.createElement('style'); st.textContent = `
.keeper-zone .mn.pairok::before{left:-14%;right:-14%;top:-10%;bottom:6%;box-shadow:none;
  background:repeating-conic-gradient(rgba(140,200,255,.9) 0 7deg,transparent 7deg 22deg);-webkit-mask:radial-gradient(farthest-side,transparent 52%,#000 66%,transparent 100%);mask:radial-gradient(farthest-side,transparent 52%,#000 66%,transparent 100%);animation:akSpin 5s linear infinite}
.keeper-zone .mn.pairok::after{color:#0a1a33;background:linear-gradient(180deg,#d8ecff,#5aa0f0);box-shadow:0 0 0 1.5px #e8f4ff,0 0 14px rgba(110,170,255,.9);animation:tripTag 1s ease-in-out infinite}
.keeper-zone .mn.pairok .mn-svg{filter:drop-shadow(0 0 8px rgba(110,170,255,.95))}
html.lite .keeper-zone .mn.pairok::after{animation:none}
`; document.head.appendChild(st); })();

/* choix du héros : rangée de grands portraits */
(function(){ const st = document.createElement('style'); st.textContent = `
.hp-ov{align-items:center;background:radial-gradient(ellipse at 50% 40%,rgba(60,30,12,.9),rgba(8,4,2,.97))}
.hp-wrap{width:min(1600px,96vw);max-height:96vh;overflow:auto;display:grid;justify-items:center;gap:10px;padding:10px}
.hp-t{margin:0;font:700 clamp(30px,4.6vh,56px) var(--f-disp),serif;color:#ffd86a;text-shadow:0 4px 0 #120a06,0 0 24px rgba(255,170,60,.5)}
.hp-row{display:flex;justify-content:center;align-items:flex-start;gap:clamp(10px,1.6vw,30px);width:100%;margin-top:6px}
.hp-col{flex:0 1 clamp(150px,17vw,280px);display:grid;justify-items:center;gap:10px;animation:hpIn .5s cubic-bezier(.2,1.2,.4,1) both;animation-delay:calc(var(--k) * .08s)}
@keyframes hpIn{from{opacity:0;transform:translateY(40px) scale(.9)}}
.hp-card{position:relative;width:100%;aspect-ratio:3/4;padding:0;border:0;cursor:pointer;background:none;font:inherit;transition:transform .2s,filter .2s;filter:brightness(.82)}
.hp-card:hover{filter:brightness(1);transform:translateY(-6px)}
.hp-col.on .hp-card{filter:brightness(1.06) drop-shadow(0 0 22px var(--c));transform:translateY(-10px) scale(1.04)}
.hp-port{position:absolute;inset:0;border-radius:50% 50% 14% 14% / 38% 38% 10% 10%;overflow:hidden;background:#1a120c;
  box-shadow:0 0 0 4px #120a06,0 0 0 9px #c8963e,0 0 0 11px #120a06,0 0 0 13px var(--c),0 16px 30px rgba(0,0,0,.7)}
.hp-port .face{position:absolute;inset:0;width:100%;height:100%;border-radius:0}
.hp-port .face svg{width:100%;height:100%}
.hp-hp{position:absolute;right:-4%;bottom:6%;width:22%;aspect-ratio:1;display:grid;place-items:center;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:radial-gradient(circle at 35% 35%,#ff7a6a,#b01e14);box-shadow:0 0 0 3px #120a06;
  font:700 clamp(16px,2.4vh,28px) var(--f-disp),serif;color:#fff}
.hp-hp::first-line{}
.hp-nm{position:absolute;left:-6%;right:-6%;bottom:-4%;padding:6px 10px;font:700 clamp(14px,2vh,22px) var(--f-label),serif;color:#fff3c0;text-align:center;
  background:linear-gradient(180deg,#8a1e1a,#5a1010);clip-path:polygon(0 0,100% 0,96% 50%,100% 100%,0 100%,4% 50%);text-shadow:0 2px 0 #120a06}
.hp-st{position:absolute;left:50%;top:-5%;transform:translateX(-50%);padding:2px 10px;border-radius:99px;background:#120a06;color:#ffd86a;font-size:clamp(12px,1.6vh,18px);box-shadow:0 0 0 2px #c8963e}
.hp-card .h-roll{left:-2%;top:2%;width:clamp(30px,3.6vh,44px);height:auto;aspect-ratio:1;z-index:3}
.hp-pow{display:grid;grid-template-columns:auto 1fr;gap:10px;align-items:start;width:100%;margin-top:clamp(14px,2vh,24px);padding:10px 12px;border-radius:14px;
  background:linear-gradient(180deg,rgba(36,24,14,.95),rgba(16,10,6,.95));box-shadow:inset 0 0 0 1.5px color-mix(in srgb,var(--c) 55%,transparent),0 8px 18px rgba(0,0,0,.5)}
.hp-pw-ico{width:clamp(40px,5vh,60px);aspect-ratio:1;display:grid;place-items:center;border-radius:50%;background:radial-gradient(circle at 40% 35%,#4a3420,#1a0e06);box-shadow:0 0 0 3px #120a06,0 0 0 6px #c8963e}
.hp-pw-ico .ckm{width:80%;height:80%}.hp-pw-ico b{font:700 clamp(18px,2.4vh,28px) var(--f-disp),serif;color:#ffe9a8}
.hp-pw-tx{display:grid;gap:4px;min-width:0}
.hp-pw-tx b{font:700 clamp(13px,1.7vh,19px) var(--f-label),serif;color:#ffd86a}
.hp-pw-tx small{font-size:clamp(12px,1.5vh,16px);line-height:1.35;color:#f1e4c6}
.hp-cp{display:flex;align-items:center;gap:6px;margin-top:4px;padding-top:6px;border-top:1px solid rgba(242,193,78,.2)}
.hp-cp .face{width:clamp(26px,3.4vh,40px);height:clamp(26px,3.4vh,40px);border-radius:50%}
.hp-cp em{font-style:normal;font-size:clamp(11px,1.4vh,15px);color:#bfae8a}
.hp-go{font-size:clamp(16px,2.2vh,24px);padding:8px 30px;animation:hpIn .3s both}
.hp-rb{margin-top:6px}
.hp-rules{width:min(1100px,94vw);max-height:62vh;overflow:auto}
@media (max-width:820px),(max-height:540px){
  .hp-row{flex-wrap:nowrap;overflow-x:auto;justify-content:flex-start;padding-bottom:6px}
  .hp-col{flex:0 0 clamp(120px,30vw,170px)} .hp-pw-tx small{font-size:11px} .hp-cp{display:none}
  .hp-t{font-size:24px}
}
@media (orientation:landscape) and (max-height:540px){ .hp-col{flex-basis:clamp(110px,17vw,150px)} .hp-card{aspect-ratio:4/4.4} .hp-pow{margin-top:8px;padding:6px 8px} .hp-pw-tx small{display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden} }
html.lite .hp-col{animation:none}
`; document.head.appendChild(st); })();
(function(){ const st = document.createElement('style'); st.textContent = `
.hp-port{background:radial-gradient(circle at 50% 40%,color-mix(in srgb,var(--c) 40%,#2a1a0e),#120a06 75%)}
.hp-port .face{inset:16% 18% 24% 18%;width:auto;height:auto;border-radius:50%;box-shadow:0 0 0 3px #120a06,0 0 0 6px var(--c),0 0 24px color-mix(in srgb,var(--c) 60%,transparent)}
.hp-hp{transform:none;border-radius:50%}
.hp-row{margin-top:clamp(16px,3vh,34px)}
`; document.head.appendChild(st); })();
(function(){ const st = document.createElement('style'); st.textContent = `
.ckm-b{position:absolute;left:50%;top:-12%;transform:translateX(-50%);z-index:7;display:block;width:clamp(22px,30%,44px);aspect-ratio:1/1.07;height:auto;cursor:pointer;filter:grayscale(.7) brightness(.75);transition:transform .15s}
.ckm-b .ckm{width:100%;height:100%}
.ckm-b.ok{filter:drop-shadow(0 0 6px #6fd0ff);animation:ckmPulse 1.4s ease-in-out infinite}
.ckm-b.ok:hover{transform:translateX(-50%) scale(1.15)}
.ckm-b.used{opacity:.35;cursor:default}
@keyframes ckmPulse{50%{filter:drop-shadow(0 0 12px #6fd0ff) brightness(1.2)}}
.hp-gold{color:#ffd86a!important}
.hp-vil{font-style:normal;font-size:clamp(11px,1.3vh,14px);color:var(--c);font-weight:700}
html.lite .ckm-b.ok{animation:none}
`; document.head.appendChild(st); })();
(function(){ const st = document.createElement('style'); st.textContent = `
.mn.mn-awk .mn-svg{filter:drop-shadow(0 0 6px #6fd0ff) drop-shadow(0 0 14px rgba(80,170,255,.75));animation:mnAwk 2.2s ease-in-out infinite}
@keyframes mnAwk{50%{filter:drop-shadow(0 0 10px #bfe8ff) drop-shadow(0 0 22px rgba(80,170,255,.95))}}
html.lite .mn.mn-awk .mn-svg{animation:none}
`; document.head.appendChild(st); })();
(function(){ const st = document.createElement('style'); st.textContent = `.shelf-row{display:flex;gap:clamp(6px,1cqi,14px);align-items:flex-start}.shelf-l{justify-self:center}`; document.head.appendChild(st); })();
