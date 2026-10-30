/* =====================================================================
   SORTS DE TAVERNE — une étagère à sorts dans la taverne, des sorts de
   niveau 1 à 6 et six familles. Nouvelles mécaniques : ciblage,
   enchantements permanents, effets « prochain combat », or différé,
   découverte, métamorphose, sacrifice.
   ===================================================================== */
const SP_TYPES = {
  renf:{ n:'Renfort', col:'#c8963e' }, eco:{ n:'Économie', col:'#4f8a3a' }, arc:{ n:'Arcane', col:'#3f6fb0' },
  ombre:{ n:'Ombre', col:'#5a3d7a' }, comb:{ n:'Combat', col:'#a8322a' }, nat:{ n:'Nature', col:'#3f8a6a' },
};
const SPELLS = {
  sp_pinte:{ n:'Pinte offerte', t:1, c:1, ty:'renf', tg:1, tx:'Donne +2/+1 à un de tes serviteurs.' },
  sp_tournee:{ n:'Nouvelle tournée', t:1, c:0, ty:'eco', tx:'Rafraîchit la taverne gratuitement.' },
  sp_placement:{ n:'Placement prudent', t:1, c:1, ty:'eco', tx:'Au début de ton prochain tour, gagne 2 or.' },
  sp_aube:{ n:'Bénédiction de l\'aube', t:2, c:2, ty:'renf', tg:1, tx:'Donne Bouclier divin à un de tes serviteurs.' },
  sp_chopes:{ n:'Échange de chopes', t:2, c:1, ty:'arc', tg:1, tx:'Échange l\'attaque et la vie d\'un de tes serviteurs.' },
  sp_graine:{ n:'Graine de vigueur', t:2, c:2, ty:'nat', tg:1, tx:'Enchante un serviteur : « Fin de tour : gagne +1/+1 ». L\'enchantement reste pour toute la partie.' },
  sp_rabot:{ n:'Coup de rabot', t:2, c:1, ty:'eco', tx:'Améliorer la taverne coûte 3 or de moins.' },
  sp_souffle:{ n:'Souffle d\'outre-tombe', t:3, c:2, ty:'ombre', tg:1, tx:'Donne Renaissance à un de tes serviteurs.' },
  sp_berserk:{ n:'Rage du berserker', t:3, c:2, ty:'comb', tg:1, tx:'Prochain combat seulement : un de tes serviteurs gagne +4 attaque et Furie des vents.' },
  sp_meta:{ n:'Métamorphose ascendante', t:3, c:2, ty:'arc', tg:1, tx:'Transforme un de tes serviteurs en un serviteur aléatoire d\'un niveau au-dessus.' },
  sp_meute:{ n:'Sang de la meute', t:3, c:3, ty:'renf', tg:1, tx:'Donne +1/+1 à un serviteur et à tous tes serviteurs de sa tribu.' },
  sp_lettre:{ n:'Lettre de recommandation', t:4, c:3, ty:'arc', tx:'Découvre un serviteur d\'un niveau au-dessus de ta taverne : choisis-en un parmi trois.' },
  sp_ruee:{ n:'Ruée vers l\'or', t:4, c:3, ty:'eco', tx:'Gagne 1 or au début de chacun de tes 4 prochains tours.' },
  sp_rituel:{ n:'Sacrifice rituel', t:4, c:0, ty:'ombre', tg:1, tx:'Détruit un de tes serviteurs. Un autre de tes serviteurs, au hasard, gagne son attaque et sa vie.' },
  sp_alchimie:{ n:'Alchimie dorée', t:5, c:5, ty:'arc', tg:1, tx:'Rend doré un de tes serviteurs : ses stats de base sont doublées et ses effets aussi.' },
  sp_tempete:{ n:'Tempête de mana', t:5, c:3, ty:'comb', tx:'Prochain combat seulement : tous tes serviteurs gagnent +3/+3.' },
  sp_reflet:{ n:'Double reflet', t:6, c:4, ty:'arc', tg:1, tx:'Ajoute à ta main une copie exacte d\'un de tes serviteurs, bonus compris.' },
  sp_ascension:{ n:'Ascension', t:6, c:6, ty:'renf', tx:'Donne +2/+2 et Bouclier divin à tous tes serviteurs.' },
};
const SPELL_IDS = Object.keys(SPELLS);
function drawSpell(t) { const ids = SPELL_IDS.filter(id => SPELLS[id].t <= t); return ids.length ? { sp:pickR(ids), u:UID++ } : null; }

// pourquoi un sort ne peut pas être lancé (null = il peut)
function spellBlock(p, id, tgt) {
  const S = SPELLS[id];
  if (S.tg && !tgt) return 'Choisis un de tes serviteurs.';
  if (id === 'sp_chopes' && tgt.a < 1) return 'Ce serviteur n\'a pas d\'attaque à échanger.';
  if (id === 'sp_rabot' && p.t >= 6) return 'Ta taverne est déjà au niveau maximum.';
  if (id === 'sp_meta' && tierOf(tgt) >= 6) return 'Ce serviteur est déjà au niveau maximum.';
  if (id === 'sp_rituel' && p.bd.length < 2) return 'Il faut un autre serviteur pour recevoir ses stats.';
  if (id === 'sp_alchimie' && (tgt.g || CD(tgt.c).tok)) return 'Ce serviteur ne peut pas devenir doré.';
  if (id === 'sp_reflet' && p.hd.length > 10) return 'Ta main est pleine.';
  if ((id === 'sp_tempete' || id === 'sp_ascension') && !p.bd.length) return 'Tu n\'as aucun serviteur.';
  return null;
}
function castSpell(G, p, hi, tg) { const it = p.hd[hi], S0 = it && SPELLS[it.sp]; const ok = withSrc(S0 ? 'Sort : ' + S0.n : BSRC, () => castSpell0(G, p, hi, tg)); if (ok && inMechAny(G, 'resonance')) withSrc('Résonance', () => { const c = p.bd.filter(m => inMech(G, 'resonance', m)); for (let k = 0; k < 2 && c.length; k++) buff(c.splice(Math.floor(Math.random() * c.length), 1)[0], 1, 1); }); return ok; }
function castSpell0(G, p, hi, tg) {
  const id = p.hd[hi].sp, S = SPELLS[id]; if (!S) return false;
  const tgt = S.tg ? p.bd[tg] : null;
  if (spellBlock(p, id, tgt)) return false;
  p.hd.splice(hi, 1);
  switch (id) {
    case 'sp_pinte': buff(tgt, 2, 1); break;
    case 'sp_tournee': p.fz = false; fillShop(G, p); trigBoard(G, p, 'roll'); break;
    case 'sp_placement': p.inc = p.inc || []; p.inc[0] = (p.inc[0] || 0) + 2; break;
    case 'sp_aube': addF(tgt, 's'); break;
    case 'sp_chopes': { const a = tgt.a; tgt.a = tgt.h; tgt.h = a; break; }
    case 'sp_graine': (tgt.x = tgt.x || []).push({ k:'eot_self', a:1, h:1, src:'Graine de vigueur' }); break;
    case 'sp_rabot': p.uc = Math.max(0, p.uc - 3); break;
    case 'sp_souffle': addF(tgt, 'r'); break;
    case 'sp_berserk': tgt.tmp = { a:((tgt.tmp && tgt.tmp.a) || 0) + 4, h:(tgt.tmp && tgt.tmp.h) || 0, f:'w', s:'Rage du berserker' }; break;
    case 'sp_meta': {
      const nm = drawOne(G, 6, Math.min(6, tierOf(tgt) + 1)) || drawAny(Math.min(6, tierOf(tgt) + 1));
      if (!nm) { p.hd.splice(hi, 0, { sp:id, u:UID++ }); return false; }
      if (tgt.g) { nm.g = 1; nm.a *= 2; nm.h *= 2; }
      toPool(G, tgt); p.bd[tg] = nm; break;
    }
    case 'sp_meute': { const tr = tribe(tgt); buff(tgt, 1, 1); if (tr !== 'neu') p.bd.forEach(x => { if (x !== tgt && tribe(x) === tr) buff(x, 1, 1); }); break; }
    case 'sp_lettre': {
      const t = Math.min(6, p.t + 1), opts = [];
      for (let k = 0; k < 3; k++) { const m = drawOne(G, 6, t) || drawAny(t); if (m) opts.push(m); }
      if (!opts.length) { p.hd.splice(hi, 0, { sp:id, u:UID++ }); return false; }
      p.disc = opts; break;
    }
    case 'sp_ruee': p.inc = p.inc || []; for (let k = 0; k < 4; k++) p.inc[k] = (p.inc[k] || 0) + 1; break;
    case 'sp_rituel': { p.bd.splice(tg, 1); toPool(G, tgt); const o = pickR(p.bd); buff(o, tgt.a, tgt.h); break; }
    case 'sp_alchimie': { const b = CD(tgt.c); tgt.g = 1; tgt.a += b.a; tgt.h += b.h; break; }
    case 'sp_tempete': p.tma = { a:((p.tma && p.tma.a) || 0) + 3, h:((p.tma && p.tma.h) || 0) + 3 }; break;
    case 'sp_reflet': { const c = clone(tgt); c.u = UID++; delete c.tmp; p.hd.push(c); break; }
    case 'sp_ascension': p.bd.forEach(x => { buff(x, 2, 2); addF(x, 's'); }); break;
  }
  trigBoard(G, p, 'cast');
  checkTriple(G, p);
  return true;
}
// un serviteur hors réserve (si la réserve est vide pour ce niveau)
function drawAny(t) { const ids = POOL_IDS.filter(id => C[id].t === t); return ids.length ? mk(pickR(ids), 0) : null; }
// plateau de combat : on ajoute les bonus « prochain combat » sans toucher au vrai plateau
function combatBoard(p) {
  return p.bd.map(m => {
    const c = { ...m }; delete c.tmp;
    if (m.tmp) { c.a += m.tmp.a || 0; c.h += m.tmp.h || 0; if (m.tmp.f) addF(c, m.tmp.f); }
    if (p.tma) { c.a += p.tma.a; c.h += p.tma.h; }
    return c;
  });
}

/* ---------- IA ---------- */
function aiPlayAll(G, p) {
  for (let guard = 0; guard < 12 && p.bd.length < 7; guard++) {
    const i = p.hd.findIndex(m => !m.sp); if (i < 0) break;
    OPS.play(G, p, { i });
  }
}
const aiBestIndex = (p, list) => { let bi = 0; list.forEach((m, i) => { if (aiScore(p, m) > aiScore(p, list[bi])) bi = i; }); return bi; };
function aiTarget(p, id) {
  const pool = p.bd.map((m, i) => ({ m, i }));
  const by = (f, ok = () => true) => { const c = pool.filter(x => ok(x.m)); if (!c.length) return null; c.sort((a, b) => f(b.m) - f(a.m)); return c[0].i; };
  switch (id) {
    case 'sp_aube': return by(m => m.a + m.h, m => !has(m, 's'));
    case 'sp_souffle': return by(m => m.a + m.h, m => !has(m, 'r'));
    case 'sp_berserk': return by(m => m.a, m => !has(m, 'w'));
    case 'sp_meta': return by(m => -tierOf(m) * 10 - m.a - m.h, m => tierOf(m) < 6 && !m.g);
    case 'sp_alchimie': return by(m => CD(m.c).a + CD(m.c).h + tierOf(m) * 3, m => !m.g && !CD(m.c).tok);
    case 'sp_meute': { const cnt = {}; p.bd.forEach(m => { const t = tribe(m); if (t !== 'neu') cnt[t] = (cnt[t] || 0) + 1; }); return by(m => (cnt[tribe(m)] || 0) * 10 + m.a); }
    default: return by(m => m.a + m.h + tierOf(m) * 2);
  }
}
const AI_SKIP = ['sp_chopes', 'sp_rituel'];
function aiSpells(G, p) {
  for (let guard = 0; guard < 6; guard++) {
    const S = p.sp && SPELLS[p.sp.sp];
    if (S && !AI_SKIP.includes(p.sp.sp) && p.g >= S.c && p.hd.length < 10 && !(S.tg && !p.bd.length)) OPS.buysp(G, p);
    const hi = p.hd.findIndex(m => m.sp && !AI_SKIP.includes(m.sp)); if (hi < 0) break;
    const id = p.hd[hi].sp, tg = SPELLS[id].tg ? aiTarget(p, id) : null;
    if (!castSpell(G, p, hi, tg)) break;
    if (p.disc) OPS.pick(G, p, { i:aiBestIndex(p, p.disc) });
    aiPlayAll(G, p);
  }
}

/* ---------- illustrations des sorts ---------- */
const SPART = {
  sp_pinte: () => softGlow(50, 54, 30, '#ffe39a', .25) + '<g transform="translate(30 30) scale(1.45)">' + P('M0 7 L18 7 L17 29 Q9 32 1 29 Z', '#d99a3e', so()) + Ln('M2.5 13 L15.5 13 M2.5 21 L15.5 21', '#8a5a22', 1.4) + Ln('M18 12 C 27 12, 27 24, 17.4 24', OUT, 5) + Ln('M18 12 C 27 12, 27 24, 17.4 24', '#d99a3e', 2.4) + P('M-2 8 C -3 0, 5 -2, 7 1 C 9 -3, 17 -2, 18 2 C 22 2, 22 8, 19 9 L18 12 C 16 9, 12 10, 9 9 C 6 11, 1 10, -2 8 Z', '#fff8e6', so(1.6)) + E(4, 4, 2, 1.4, '#fff', 'opacity=".9"') + '</g>' + [[24, 30, 2.2], [76, 26, 1.6], [72, 40, 1.2], [28, 44, 1.4]].map(([x, y, r]) => Ci(x, y, r, '#fff8e6', so(0.8))).join('') + P(starD(76, 72, 6, 2.4, 4), '#fff1b8', GLOW),
  sp_tournee: () => P('M14 70 Q50 82 86 70 L84 76 Q50 89 16 76 Z', '#8a5a2b', so()) + [[28, 46], [44, 40], [60, 46]].map(([x, y], k) => `<g transform="translate(${x} ${y}) scale(.95) rotate(${(k - 1) * 8})">` + P('M0 7 L14 7 L13 26 Q7 28 1 26 Z', '#d99a3e', so(1.8)) + Ln('M14 11 C 20 11, 20 21, 13.6 21', OUT, 4) + Ln('M14 11 C 20 11, 20 21, 13.6 21', '#d99a3e', 2) + P('M-1.4 8 C -2 2, 4 1, 6 3 C 8 0, 14 1, 15 4 C 17 5, 16 8, 14.6 8.4 Z', '#fff8e6', so(1.4)) + '</g>').join('') + P(starD(50, 22, 7, 2.4, 4), '#fff1b8', GLOW) + P(starD(24, 26, 3.4, 1.2, 4), '#fff1b8', GLOW) + P(starD(78, 30, 4, 1.4, 4), '#fff1b8', GLOW),
  sp_placement: () => P('M30 52 C 22 62, 22 86, 50 88 C 78 86, 78 62, 70 52 C 66 46, 34 46, 30 52 Z', '#7a4a28', so()) + P('M36 50 C 40 42, 60 42, 64 50 Z', '#5a321c', so(1.8)) + Ln('M38 48 Q50 54 62 48', '#e2b452', 2.6) + P(starD(50, 70, 7, 3, 4), '#e2b452', so(1)) + [[50, 30, 0], [42, 22, -12], [58, 18, 14]].map(([x, y, r]) => `<g transform="translate(${x} ${y}) rotate(${r})">${E(0, 0, 8, 8, '#f2c14e', so(1.8))}${E(0, 0, 5, 5, 'none', 'stroke="#b37c26" stroke-width="1.4"')}</g>`).join('') + Ln('M50 40 L50 46', '#fff1b8', 1.6) + Ln('M76 76 L82 70 L86 74', '#a6e07a', 2.6),
  sp_aube: () => softGlow(50, 64, 30, '#ffe7a0', .5) + Array.from({ length:11 }, (_, k) => { const a = Math.PI + k / 10 * Math.PI; return Ln(`M${f1(50 + Math.cos(a) * 24)} ${f1(66 + Math.sin(a) * 24)} L${f1(50 + Math.cos(a) * 42)} ${f1(66 + Math.sin(a) * 42)}`, '#ffe39a', 2.4, 'opacity=".8"'); }).join('') + P('M10 100 L10 70 Q30 60 50 70 Q70 60 90 70 L90 100 Z', '#6a7f4a', so()) + P('M50 30 L70 38 L68 60 C 66 72, 58 80, 50 84 C 42 80, 34 72, 32 60 L30 38 Z', '#f6ead0', so()) + P('M50 36 L64 42 L62.6 60 C 61 69, 56 75, 50 78 Z', '#e2b452', 'opacity=".8"') + P(starD(50, 56, 7, 3, 8), '#fff6c8', GLOW),
  sp_chopes: () => ['#c8392f', '#3f6fb0'].map((col, k) => `<g transform="translate(${k ? 56 : 22} 34) rotate(${k ? 16 : -16})">` + P('M0 7 L16 7 L15 30 Q8 33 1 30 Z', col, so()) + Ln('M16 12 C 23 12, 23 24, 15.5 24', OUT, 4.4) + Ln('M16 12 C 23 12, 23 24, 15.5 24', col, 2.2) + P('M-1.5 8 C -2 2, 5 1, 7 3 C 9 0, 16 1, 17 4 C 19 5, 18 8, 16.5 8.4 Z', '#fff8e6', so(1.4)) + '</g>').join('') + Ln('M32 20 Q50 8 68 20', '#fff1b8', 2.6) + P('M66 14 L71 21 L63 22 Z', '#fff1b8') + Ln('M68 84 Q50 96 32 84', '#fff1b8', 2.6) + P('M34 90 L29 83 L37 82 Z', '#fff1b8'),
  sp_graine: () => softGlow(50, 60, 26, '#b6ff9a', .3) + P('M18 100 Q50 80 82 100 Z', '#5a3a22', so()) + E(50, 82, 9, 6, '#a8744a', so()) + Ln('M50 78 C 50 64, 46 54, 50 40', '#3f7a2a', 4.4) + Ln('M50 78 C 50 64, 46 54, 50 40', '#6fbf4a', 2.4) + P('M49 58 C 38 56, 30 48, 28 38 C 38 38, 46 44, 49 58 Z', '#7fd05a', so(1.8)) + P('M51 50 C 60 46, 68 38, 70 28 C 60 28, 52 36, 51 50 Z', '#8fe36a', so(1.8)) + Ln('M30 40 Q40 46 48 56 M68 30 Q60 38 52 48', '#3f7a2a', 1.1) + P(starD(50, 34, 6, 2.2, 4), '#fff6c8', GLOW) + [[30, 26], [74, 52], [24, 64]].map(([x, y]) => Ci(x, y, 1.4, '#d9ffcf', GLOW)).join(''),
  sp_rabot: () => '<g transform="translate(50 56) rotate(-12)">' + P('M-30 -4 L30 -4 L34 12 L-34 12 Z', '#b07a43', so()) + P('M-24 -4 C -22 -16, -8 -18, -4 -4 Z', '#7a4a28', so(1.8)) + P('M6 -4 L14 -20 L20 -18 L14 -4 Z', '#9aa3ab', so(1.8)) + Ln('M-30 4 L30 4', '#8a5a2b', 1.2) + '</g>' + Ln('M20 76 C 26 70, 34 72, 32 80 C 30 86, 22 84, 24 78', '#e6c08a', 3) + Ln('M66 78 C 72 72, 80 76, 76 84 C 72 88, 66 84, 70 80', '#e6c08a', 3) + P('M46 30 L50 18 L54 30 Z', '#a6e07a', so(1.4)) + Ln('M50 30 L50 40', '#a6e07a', 3.4) + P('M62 34 L66 22 L70 34 Z', '#a6e07a', so(1.4)) + Ln('M66 34 L66 42', '#a6e07a', 3.4),
  sp_souffle: () => Ln('M30 84 C 10 70, 20 40, 44 46 C 64 50, 60 72, 44 70 C 32 68, 34 54, 46 56', '#9fffd6', 4.2, 'opacity=".85" ' + GLOW) + Ln('M56 30 C 70 24, 84 34, 80 48', '#9fffd6', 2.6, 'opacity=".6"') + '<g transform="translate(66 64)">' + `<rect x="-6" y="-2" width="12" height="20" rx="2" fill="#efe4c8" ${so(1.6)}/>` + Ln('M0 -2 L0 -6', OUT, 1.4) + P('M0 -18 C 4 -12, 4 -8, 0 -6 C -4 -8, -4 -12, 0 -18 Z', '#9fffd6', GLOW) + '</g>' + Ci(42, 58, 1.4, '#fff', GLOW) + Ci(48, 58, 1.4, '#fff', GLOW) + E(45, 63, 1.4, 1.8, '#0d2a2a'),
  sp_berserk: () => softGlow(50, 50, 30, '#ff6a2a', .35) + Ln('M50 92 L50 14', OUT, 6) + Ln('M50 92 L50 14', '#7a4a28', 3.6) + ['M50 22 C 36 14, 22 18, 16 30 C 22 40, 36 42, 50 36 Z', 'M50 22 C 64 14, 78 18, 84 30 C 78 40, 64 42, 50 36 Z'].map(d => P(d, '#c4c9ce', so(2))).join('') + Ln('M20 30 C 24 36, 34 38, 46 34 M80 30 C 76 36, 66 38, 54 34', '#fff', 1.2, 'opacity=".6"') + ['M30 64 C 26 52, 34 46, 34 38 C 40 46, 42 54, 38 64 Z', 'M66 70 C 62 58, 70 52, 70 44 C 76 52, 78 60, 74 70 Z', 'M48 82 C 44 70, 52 64, 52 56 C 58 64, 60 72, 56 82 Z'].map(d => P(d, '#ff8a2a', so(1.4)) ).join(''),
  sp_meta: () => softGlow(50, 52, 30, '#bfe3ff', .35) + P('M50 20 C 64 30, 64 70, 50 86 C 36 70, 36 30, 50 20 Z', '#8a6a9a', so()) + Ln('M42 40 Q50 44 58 40 M41 52 Q50 56 59 52 M43 64 Q50 68 57 64', '#5a3d7a', 1.4) + P('M50 20 L46 34 L52 40 L47 52', 'none', 'stroke="#fff6c8" stroke-width="2.4" stroke-linejoin="round"' + ' ' + GLOW) + ['M50 44 C 34 26, 14 30, 16 44 C 18 58, 36 56, 50 50 Z', 'M50 44 C 66 26, 86 30, 84 44 C 82 58, 64 56, 50 50 Z'].map(d => P(d, '#7fb8ff', so(1.8) + ' opacity=".9"')).join('') + Ci(28, 42, 3, '#fff1b8') + Ci(72, 42, 3, '#fff1b8') + P('M44 96 L50 86 L56 96 Z', '#a6e07a', so(1.2)),
  sp_meute: () => softGlow(50, 54, 30, '#ff8a72', .25) + E(50, 62, 16, 13, '#a8322a', so()) + [[30, 42, 6, 7.5, -20], [42, 32, 6, 8, -6], [58, 32, 6, 8, 6], [70, 42, 6, 7.5, 20]].map(([x, y, rx, ry, r]) => `<g transform="rotate(${r} ${x} ${y})">${E(x, y, rx, ry, '#a8322a', so())}</g>`).join('') + E(46, 58, 4, 2.6, '#ff8a72', 'opacity=".6"') + [[22, 74], [80, 72], [70, 86]].map(([x, y]) => P(`M${x} ${y - 6} C ${x + 3} ${y - 1} ${x + 3} ${y + 3} ${x} ${y + 3} C ${x - 3} ${y + 3} ${x - 3} ${y - 1} ${x} ${y - 6} Z`, '#c8392f', so(1.2))).join(''),
  sp_lettre: () => '<g transform="rotate(-8 50 56)">' + `<rect x="18" y="34" width="64" height="42" rx="3" fill="#f6ead0" ${so()}/>` + Ln('M18 36 L50 60 L82 36', '#b79f72', 2) + Ln('M18 76 L42 56 M82 76 L58 56', '#d9c69c', 1.4) + Ci(50, 60, 8, '#a8322a', so(1.8)) + P(starD(50, 60, 4.4, 2, 5), '#e2b452') + '</g>' + '<g transform="translate(72 20) rotate(30)">' + P('M0 0 C 8 10, 8 30, 2 46 L-1 46 C -4 30, -6 12, 0 0 Z', '#f3ecdc', so(1.6)) + Ln('M0 4 L0 50', '#8a7a62', 1) + '</g>',
  sp_ruee: () => softGlow(50, 40, 26, '#ffe39a', .4) + [[34, 46, 7], [46, 40, 8], [58, 44, 7], [68, 48, 6], [40, 52, 6], [54, 52, 6], [28, 52, 5]].map(([x, y, r]) => P(`M${x - r} ${y} L${x - r * 0.4} ${y - r} L${x + r * 0.6} ${y - r * 0.8} L${x + r} ${y + r * 0.2} L${x + r * 0.2} ${y + r * 0.8} L${x - r * 0.7} ${y + r * 0.6} Z`, '#f2c14e', so(1.4))).join('') + P('M18 50 L82 50 L76 78 L24 78 Z', '#7a5232', so()) + Ln('M22 58 L78 58 M23 68 L77 68', '#5a3a1c', 1.4) + Ci(32, 84, 7, '#5a5f69', so()) + Ci(68, 84, 7, '#5a5f69', so()) + Ci(32, 84, 2, '#c4c9ce') + Ci(68, 84, 2, '#c4c9ce') + P(starD(48, 28, 5, 1.8, 4), '#fffbe6', GLOW),
  sp_rituel: () => P('M14 82 L86 82 L80 98 L20 98 Z', '#3a2f3a', so()) + `<rect x="10" y="76" width="80" height="8" rx="2" fill="#4a3d4a" ${so(1.8)}/>` + [[22, 60], [78, 60]].map(([x, y]) => `<rect x="${x - 4}" y="${y}" width="8" height="16" rx="1.5" fill="#efe4c8" ${so(1.4)}/>` + P(`M${x} ${y - 10} C ${x + 3.4} ${y - 5} ${x + 3} ${y - 2} ${x} ${y - 1} C ${x - 3} ${y - 2} ${x - 3.4} ${y - 5} ${x} ${y - 10} Z`, '#ffb04a', GLOW)).join('') + '<g transform="translate(50 46) rotate(180)">' + P('M-4 -6 L4 -6 L3 -38 L0 -46 L-3 -38 Z', '#c4c9ce', so(1.8)) + P('M-12 -6 L12 -6 L12 -2 L-12 -2 Z', '#5a3d7a', so(1.6)) + P('M-3 -2 L3 -2 L3 12 L-3 12 Z', '#2b2330', so(1.4)) + Ci(0, 14, 3, '#a8322a', so(1)) + '</g>' + P('M50 94 C 53 90, 53 87, 50 84 C 47 87, 47 90, 50 94 Z', '#c8392f', so(1)),
  sp_alchimie: () => softGlow(50, 58, 30, '#ffe39a', .5) + P('M44 18 L56 18 L56 40 C 74 46, 80 66, 70 80 C 64 88, 36 88, 30 80 C 20 66, 26 46, 44 40 Z', '#e8f4f6', so() + ' opacity=".9"') + P('M28 66 C 40 62, 60 70, 72 64 C 74 72, 72 78, 68 82 C 60 88, 40 88, 32 82 C 28 78, 26 72, 28 66 Z', '#f2c14e') + P('M44 18 L56 18 L56 40 C 74 46, 80 66, 70 80 C 64 88, 36 88, 30 80 C 20 66, 26 46, 44 40 Z', 'none', so()) + `<rect x="42" y="12" width="16" height="7" rx="2" fill="#a0703e" ${so(1.6)}/>` + [[44, 74, 2], [54, 70, 1.6], [60, 78, 1.4], [50, 60, 1.2]].map(([x, y, r]) => Ci(x, y, r, '#fff6c8')).join('') + P(starD(76, 30, 6, 2, 4), '#fff1b8', GLOW) + P(starD(24, 36, 4, 1.4, 4), '#fff1b8', GLOW) + Ln('M38 50 C 36 56, 36 60, 38 64', '#fff', 1.6, 'opacity=".7"'),
  sp_tempete: () => softGlow(50, 36, 30, '#9fd8ff', .3) + P('M20 50 C 10 50, 10 34, 22 34 C 22 22, 40 18, 46 28 C 52 16, 74 18, 74 32 C 88 30, 92 50, 78 50 Z', '#5a6a8a', so()) + E(40, 30, 8, 3, '#fff', 'opacity=".2"') + P('M44 48 L36 66 L46 66 L40 88 L60 60 L50 60 L58 48 Z', '#fff1b8', so(1.6) + ' ' + GLOW) + P('M70 50 L66 60 L72 60 L68 72 L78 56 L72 56 L76 50 Z', '#bfe3ff', so(1.2)) + [[22, 62], [28, 76], [82, 70]].map(([x, y]) => Ln(`M${x} ${y} L${x - 3} ${y + 8}`, '#9fd8ff', 1.8)).join(''),
  sp_reflet: () => ['#c8963e', '#3f6fb0'].map((col, k) => `<g transform="translate(${k ? 60 : 40} 50) rotate(${k ? 10 : -10})">` + E(0, -6, 17, 22, col, so()) + E(0, -6, 13, 18, '#cfe9f2', so(1.6)) + E(-4, -14, 4, 7, '#fff', 'opacity=".6"') + `<rect x="-3.6" y="16" width="7.2" height="22" rx="2" fill="${col}" ${so(1.6)}/>` + P(starD(0, -6, 6, 2.6, 5), k ? '#7fb8ff' : '#f2c14e', GLOW) + '</g>').join(''),
  sp_ascension: () => softGlow(50, 46, 34, '#fff1b8', .45) + ['M50 52 C 36 40, 20 42, 8 30 C 14 50, 24 60, 46 62 Z', 'M50 52 C 64 40, 80 42, 92 30 C 86 50, 76 60, 54 62 Z'].map(d => P(d, '#f6f0e0', so(1.8))).join('') + Ln('M14 36 C 24 46, 34 50, 46 56 M86 36 C 76 46, 66 50, 54 56 M20 44 C 28 50, 36 54, 46 58 M80 44 C 72 50, 64 54, 54 58', '#c8b89a', 1.1) + P(starD(50, 40, 14, 5.6, 5), '#f2c14e', so(1.8) + ' ' + GLOW) + Ln('M50 64 L50 92 M42 72 L50 64 L58 72', '#fff1b8', 3),
};
function spellBg(ty) {
  const col = SP_TYPES[ty].col;
  return `<radialGradient id="spbg-${ty}" cx="50%" cy="42%" r="70%"><stop offset="0" stop-color="${shade(col, 0.45)}"/><stop offset=".6" stop-color="${col}"/><stop offset="1" stop-color="${shade(col, -0.55)}"/></radialGradient>`;
}
function buildSpellDefs() {
  let s = Object.keys(SP_TYPES).map(spellBg).join('');
  const runes = [[12, 14], [88, 18], [10, 86], [90, 84]].map(([x, y]) => Ci(x, y, 3.4, 'none', 'stroke="#fff" stroke-width=".8" opacity=".35"') + P(starD(x, y, 2, 0.6, 4), '#fff', 'opacity=".45"')).join('');
  for (const id in SPELLS) s += `<symbol id="sp-${id}" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice"><rect width="100" height="100" fill="url(#spbg-${SPELLS[id].ty})"/>${Ci(50, 50, 40, 'none', 'stroke="#fff" stroke-width=".8" stroke-dasharray="2 3" opacity=".35"')}${runes}${SPART[id]()}</symbol>`;
  document.body.insertAdjacentHTML('afterbegin', `<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>${s}${Object.values(SOFT).join('')}</defs></svg>`);
}

/* ---------- rendu ---------- */
function spellTokenH(id, z, i, o = {}) {
  const S = SPELLS[id], sel = V.sel && V.sel.z === z && V.sel.i === i;
  return `<div class="spt${sel ? ' sel' : ''}" data-z="${z}" data-i="${i}" data-sp="${id}"${o.drag ? ' data-drag="1"' : ''} tabindex="0" role="button" aria-label="Sort ${esc(S.n)}, coût ${S.c} or">
    <svg class="spt-svg" viewBox="-4 -6 108 124" aria-hidden="true"><path d="M8 6 Q50 -4 92 6 L92 96 Q50 106 8 96 Z" fill="#f1e2bd" ${so(2.6)}/>
    <clipPath id="spc-${z}-${i}"><path d="M14 12 Q50 4 86 12 L86 90 Q50 98 14 90 Z"/></clipPath><g clip-path="url(#spc-${z}-${i})"><use href="#sp-${id}" x="14" y="4" width="72" height="94"/></g>
    <path d="M14 12 Q50 4 86 12 L86 90 Q50 98 14 90 Z" fill="none" ${so(2)}/>
    <rect x="0" y="-2" width="100" height="10" rx="5" fill="#7a4a28" ${so(2)}/><rect x="0" y="94" width="100" height="10" rx="5" fill="#7a4a28" ${so(2)}/>
    <circle cx="14" cy="104" r="12" fill="url(#gr-badge)" stroke="#e2b452" stroke-width="2.2"/><text class="gt" x="14" y="104" dy=".36em" style="fill:${spellCostFor(id, z) < S.c ? '#b8ff8a' : '#ffe39a'}">${spellCostFor(id, z)}</text>
    <circle cx="50" cy="0" r="8.4" fill="url(#gr-badge)" stroke="#e2b452" stroke-width="2"/><text class="gt tb" x="50" y="0" dy=".36em">${S.t}</text></svg>
    <span class="mn-nm">${esc(S.n)}</span></div>`;
}
// coût réel pour le joueur (réductions actives), et coût de base
function spellCostFor(id, z) { const S = SPELLS[id]; if (V.me && V.me.sp === id && V.me.spc != null && (z === 'ss' || z === 'p')) return V.me.spc; return S.c; }
function spellCardH(id, z, i, o = {}) {
  const S = SPELLS[id], sel = V.sel && V.sel.z === z && V.sel.i === i, ty = SP_TYPES[S.ty];
  const n = S.tx.length + (S.n.length > 16 ? 30 : 0);   // un nom sur deux lignes laisse moins de place au texte
  return `<div class="cd spc${sel ? ' sel' : ''}${V.aim != null && V.aim === i && z === 'hd' ? ' aiming' : ''}" data-z="${z}" data-i="${i}" data-sp="${id}"${o.drag ? ' data-drag="1"' : ''}${o.style ? ` style="${o.style}"` : ''} tabindex="0" role="button" aria-label="Sort ${esc(S.n)}">`
    + `<div class="cd-art"><svg viewBox="0 0 100 92" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><use href="#sp-${id}" y="-4" width="100" height="100"/></svg></div>`
    + `<div class="cd-tier" aria-hidden="true">${'<i></i>'.repeat(S.t)}</div>`
    + `<div class="cd-nm"><span>${esc(S.n)}</span></div><div class="cd-tx${n > 95 ? ' xlong' : n > 62 ? ' long' : ''}">${esc(S.tx)}</div>`
    + `<div class="cd-tb" style="background:${ty.col}">${esc(ty.n)}</div>`
    + costGemH(spellCostFor(id, z), S.c) + `${z === 'hd' ? '<i class="hx" aria-hidden="true"></i>' : ''}</div>`;
}
