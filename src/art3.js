/* =====================================================================
   ART 3 — l'univers des Squishys : petites boules molles et rigolotes
   ===================================================================== */
Object.assign(BGS, (() => {
  const dots = (col, pts) => pts.map(([x, y, r]) => Ci(x, y, r, col, 'opacity=".35"')).join('');
  return {
    sqfeu: dots('#fff1b8', [[12, 14, 4], [86, 20, 3], [20, 70, 3], [80, 74, 5], [50, 10, 2.4]]) + [[30, 24], [72, 40]].map(([x, y]) => P(`M${x} ${y} C ${x + 3} ${y - 4} ${x + 6} ${y} ${x + 3} ${y + 4} C ${x} ${y} ${x - 3} ${y + 4} ${x} ${y} Z`, '#ffe14a', 'opacity=".5"')).join(''),
    sqeau: [[14, 18, 6], [84, 26, 4], [24, 72, 5], [78, 80, 7], [56, 12, 3]].map(([x, y, r]) => Ci(x, y, r, 'none', 'stroke="#fff" stroke-width="1.2" opacity=".55"') + Ci(x - r * 0.35, y - r * 0.35, r * 0.25, '#fff', 'opacity=".6"')).join(''),
    sqterre: dots('#fff6d8', [[14, 16, 3], [86, 14, 4], [16, 80, 4], [84, 76, 3]]) + P('M0 100 Q20 88 40 96 Q60 86 80 94 Q92 90 100 96 L100 100 Z', '#7a9a4a', 'opacity=".55"') + leaves([[22, 90, -30], [74, 88, 200]], '#8fd05a'),
    sqglace: [[16, 18, 5], [82, 22, 4], [22, 76, 4], [80, 78, 6], [52, 10, 3]].map(([x, y, r]) => `<g transform="translate(${x} ${y})" opacity=".6">${[0, 60, 120].map(a => Ln(`M0 ${-r} L0 ${r}`, '#fff', 1.2, `transform="rotate(${a})"`)).join('')}</g>`).join('') + P('M0 100 Q25 92 50 98 Q75 92 100 98 L100 100 Z', '#fff', 'opacity=".5"'),
    sqfoudre: [[14, 20, 1], [84, 70, -1], [80, 16, 1]].map(([x, y, sx]) => `<g transform="translate(${x} ${y}) scale(${sx} 1)">${P('M0 0 L6 -2 L2 6 L8 5 L-2 18 L1 9 L-4 10 Z', '#fff36a', 'opacity=".55"')}</g>`).join('') + dots('#fff8c0', [[30, 84, 2.4], [60, 8, 2], [90, 44, 2.6], [8, 54, 2]]),
    sqvent: [[18, 20, 8], [80, 16, 6], [70, 82, 9]].map(([x, y, r]) => Ci(x, y, r, '#fff', 'opacity=".45"') + Ci(x + r * 0.9, y + 1, r * 0.75, '#fff', 'opacity=".45"') + Ci(x - r * 0.9, y + 2, r * 0.65, '#fff', 'opacity=".45"')).join('') + Ln('M8 52 C 20 46, 30 58, 42 50', '#fff', 1.4, 'opacity=".5"'),
  };
})());

/* ---------- la boule molle ---------- */
const SQCOL = { feu:'#ff7a4a', eau:'#4ab0e8', terre:'#c4945a', vent:'#9fe6da', glace:'#a8dcff', foudre:'#ffd23a' };
function sqEyes(o, y = 54) {
  const e = o.eyes || 'big';
  if (e === 'closed') return Ln(`M36 ${y} Q41 ${y + 4} 46 ${y}`, OUT, 2.4) + Ln(`M54 ${y} Q59 ${y + 4} 64 ${y}`, OUT, 2.4);
  if (e === 'happy') return Ln(`M36 ${y + 2} Q41 ${y - 4} 46 ${y + 2}`, OUT, 2.4) + Ln(`M54 ${y + 2} Q59 ${y - 4} 64 ${y + 2}`, OUT, 2.4);
  if (e === 'derp') return E(40, y, 6.4, 7, '#fff', so(1.6)) + E(61, y + 1, 4.4, 5, '#fff', so(1.6)) + Ci(42, y + 2, 3, OUT) + Ci(60, y - 1, 2.2, OUT) + Ci(43, y + 0.6, 1, '#fff');
  if (e === 'angry') return E(41, y, 5.4, 6, OUT) + E(59, y, 5.4, 6, OUT) + Ci(43, y - 2, 1.8, '#fff') + Ci(61, y - 2, 1.8, '#fff') + Ln(`M33 ${y - 9} L47 ${y - 5}`, OUT, 2.6) + Ln(`M67 ${y - 9} L53 ${y - 5}`, OUT, 2.6);
  if (e === 'stars') return P(starD(41, y, 6.6, 2.8, 5), '#ffe14a', so(1.2)) + P(starD(59, y, 6.6, 2.8, 5), '#ffe14a', so(1.2));
  return E(41, y, 6, 7, OUT) + E(59, y, 6, 7, OUT) + Ci(43, y - 2.6, 2.4, '#fff') + Ci(61, y - 2.6, 2.4, '#fff') + Ci(39.4, y + 2.6, 1, '#fff') + Ci(57.4, y + 2.6, 1, '#fff');
}
function sqMouth(o, y = 66) {
  switch (o.mouth || 'smile') {
    case 'cat': return Ln(`M44 ${y} Q47 ${y + 3} 50 ${y} Q53 ${y + 3} 56 ${y}`, OUT, 2);
    case 'tongue': return P(`M44 ${y} Q50 ${y + 6} 56 ${y} Z`, '#5a1d14', so(1.4)) + P(`M48 ${y + 2} Q50 ${y + 8} 53 ${y + 2} Z`, '#ff7a8a', so(1));
    case 'o': return E(50, y + 1, 3, 3.6, '#5a1d14', so(1.2));
    case 'pout': return Ln(`M45 ${y + 2} Q50 ${y - 2} 55 ${y + 2}`, OUT, 2);
    case 'grin': return P(`M42 ${y - 1} Q50 ${y + 9} 58 ${y - 1} Z`, '#5a1d14', so(1.4)) + P(`M44 ${y - 0.4} L56 ${y - 0.4} L55 ${y + 1.8} L45 ${y + 1.8} Z`, '#fff');
    case 'wavy': return Ln(`M43 ${y} Q45.5 ${y - 2} 48 ${y} T53 ${y} T58 ${y}`, OUT, 2);
    default: return Ln(`M44 ${y} Q50 ${y + 5} 56 ${y}`, OUT, 2.2);
  }
}
function sqAcc(acc) {
  switch (acc) {
    case 'shades': return P('M30 50 L70 50 L68 58 Q60 62 54 56 L46 56 Q40 62 32 58 Z', '#1a1a22', so(1.4)) + Ln('M34 52 L40 52', '#fff', 1, 'opacity=".6"') + Ln('M56 52 L62 52', '#fff', 1, 'opacity=".6"');
    case 'party': return P('M42 24 L50 2 L58 24 Z', '#ff6ab0', so(1.6)) + Ln('M44 18 L56 14 M45 12 L54 9', '#fff1b8', 1.6) + Ci(50, 2, 3, '#ffe14a', so(1));
    case 'crown': return `<g transform="translate(0 -12)">${HAT.crown('#ffd34d')}</g>`;
    case 'bow': return P('M50 26 L38 18 L38 34 Z', '#ff6ab0', so(1.4)) + P('M50 26 L62 18 L62 34 Z', '#ff6ab0', so(1.4)) + Ci(50, 26, 3.4, '#ff8ac8', so(1.2));
    case 'mustache': return P('M50 61 C 46 58, 40 59, 37 63.6 C 41 62, 46 63, 50 62.6 C 54 63, 59 62, 63 63.6 C 60 59, 54 58, 50 61 Z', '#3a2418', so(1.2));
    case 'beret': return P('M30 32 C 26 20, 52 12, 68 18 C 78 22, 76 30, 70 32 C 56 28, 42 28, 30 32 Z', '#5a3d7a', so(1.6)) + Ci(54, 14, 2.4, '#5a3d7a', so(1.2));
    case 'scarf': return P('M24 74 Q50 84 76 74 L76 82 Q50 92 24 82 Z', '#ff6a8a', so(1.6)) + P('M64 82 L72 98 L80 92 L70 80 Z', '#ff6a8a', so(1.4)) + Ln('M30 77 L30 83 M40 80 L40 86 M50 81 L50 88', '#fff', 1.4, 'opacity=".7"');
    case 'goggles': return Ln('M24 44 Q50 38 76 44', '#5a3b22', 3) + Ci(40, 42, 6, '#bfe3ff', so(1.6)) + Ci(60, 42, 6, '#bfe3ff', so(1.6));
    case 'flower': return leaves([[60, 20, -40]], '#8fd05a') + [0, 1, 2, 3, 4].map(k => { const a = k / 5 * Math.PI * 2; return Ci(f1(66 + Math.cos(a) * 4), f1(16 + Math.sin(a) * 4), 3.2, '#ffd0e8', so(1)); }).join('') + Ci(66, 16, 2.6, '#ffe14a', so(1));
    case 'monocle': return Ci(59, 54, 9, 'none', 'stroke="#e2b452" stroke-width="2"') + Ln('M67 58 C 70 66, 68 74, 72 80', '#e2b452', 1);
    default: return '';
  }
}
function squishy(o) {
  const el = o.el, col = o.col || SQCOL[el], d = shade(col, -0.3), l = shade(col, 0.45);
  const sy = o.squash || 1;
  let s = E(50, 96, 26, 4.4, '#000', 'opacity=".18"');
  s += E(38, 92, 7, 4, d, so(1.6)) + E(62, 92, 7, 4, d, so(1.6));
  let body;
  if (el === 'feu') {
    body = 'M50 18 C 56 26, 60 22, 62 16 C 70 26, 78 40, 78 60 C 78 80, 66 92, 50 92 C 34 92, 22 80, 22 60 C 22 44, 30 32, 36 22 C 40 28, 44 30, 46 26 C 46 22, 48 20, 50 18 Z';
  } else if (el === 'eau') {
    body = 'M50 14 C 58 30, 80 46, 80 64 C 80 82, 66 92, 50 92 C 34 92, 20 82, 20 64 C 20 46, 42 30, 50 14 Z';
  } else if (el === 'terre') {
    body = 'M30 36 C 34 26, 48 24, 56 28 C 66 24, 80 32, 80 48 C 84 60, 80 82, 64 90 C 54 94, 40 94, 32 88 C 18 80, 16 58, 22 48 C 22 42, 26 38, 30 36 Z';
  } else if (el === 'glace') {
    body = 'M30 26 C 40 20, 60 20, 70 26 C 78 30, 80 40, 79 52 C 80 66, 80 80, 72 88 C 62 94, 38 94, 28 88 C 20 80, 20 66, 21 52 C 20 40, 22 30, 30 26 Z';
  } else if (el === 'foudre') {
    body = 'M50 22 C 62 20, 76 30, 78 46 C 84 50, 82 58, 78 60 C 80 76, 68 92, 50 92 C 32 92, 20 76, 22 60 C 18 58, 16 50, 22 46 C 24 30, 38 20, 50 22 Z';
  } else {
    body = 'M28 44 C 24 34, 34 26, 42 30 C 46 20, 62 20, 64 30 C 74 26, 82 36, 78 46 C 86 52, 84 66, 76 70 C 80 82, 68 92, 56 88 C 50 94, 36 94, 32 86 C 20 86, 16 72, 22 66 C 14 58, 18 46, 28 44 Z';
  }
  s += `<g transform="translate(0 ${f1(92 * (1 - sy))}) scale(1 ${sy})">`;
  if (o.glow) s += softGlow(50, 56, 40, col, 0.5);
  s += P(body, col, so(2.6));
  s += P(body, 'url(#sq-shine)', 'opacity=".9"');
  s += E(36, 36, 7, 4.4, '#fff', 'opacity=".55" transform="rotate(-30 36 36)"') + Ci(30, 46, 2, '#fff', 'opacity=".6"');
  if (el === 'feu') s += P('M42 24 C 40 14, 46 6, 50 2 C 52 10, 58 12, 56 22 Z', '#ffd34d', so(1.6)) + P('M47 20 C 46 14, 49 10, 50 8 C 51 13, 53 15, 52 20 Z', '#fff6c8');
  if (el === 'eau') s += Ln('M30 78 Q36 74 42 78 T54 78 T66 78', l, 2.2, 'opacity=".8"') + Ci(70, 34, 3, '#fff', so(1) + ' opacity=".8"') + Ci(76, 26, 2, '#fff', so(0.8) + ' opacity=".7"');
  if (el === 'terre') s += [[30, 70, 2.4], [70, 74, 2], [64, 40, 1.8], [36, 80, 1.6]].map(([x, y, r]) => Ci(x, y, r, d, 'opacity=".7"')).join('') + Ln('M50 26 C 50 18, 48 14, 50 8', '#4a7a2a', 2.4) + leaves([[50, 12, -150], [50, 12, -30]], '#8fd05a');
  if (el === 'glace') s += P('M28 28 C 36 20, 64 20, 72 28 C 74 34, 70 34, 66 31 C 62 36, 58 32, 54 34 C 50 30, 44 36, 40 32 C 36 36, 30 34, 28 28 Z', '#fff', so(1.6)) + P('M66 90 L68 99 L71 90 Z', '#e8f6ff', so(1)) + P('M34 91 L36 97 L38 91 Z', '#e8f6ff', so(1)) + Ln('M68 44 L72 52 M70 60 L73 64', '#fff', 1.6, 'opacity=".8"');
  if (el === 'foudre') s += P('M46 24 L40 6 L50 12 L52 0 L60 16 L54 14 L56 24 Z', '#fff36a', so(1.6)) + [[16, 40, 1], [84, 44, -1]].map(([x, y, sx]) => `<g transform="translate(${x} ${y}) scale(${sx} 1)">${Ln('M0 0 L4 4 L0 7 L5 11', '#fff36a', 1.8)}</g>`).join('');
  if (el === 'vent') s += Ln('M30 60 C 36 54, 44 60, 40 66 C 36 70, 32 64, 36 62', '#fff', 1.8, 'opacity=".8"') + Ln('M64 70 C 70 64, 78 70, 74 76', '#fff', 1.8, 'opacity=".8"');
  s += E(34, 64, 5, 3, '#ff8a9a', 'opacity=".55"') + E(66, 64, 5, 3, '#ff8a9a', 'opacity=".55"');
  s += sqEyes(o, o.ey || 54) + sqMouth(o, o.my || 66);
  if (o.acc) [].concat(o.acc).forEach(a => { s += sqAcc(a); });
  s += '</g>';
  if (o.lines) s += Ln('M10 40 L18 42 M8 52 L16 52 M10 64 L18 62 M90 40 L82 42 M92 52 L84 52 M90 64 L82 62', '#fff', 1.6, 'opacity=".7"');
  if (o.sweat) s += P('M76 30 C 80 36, 80 40, 76 41 C 72 40, 72 36, 76 30 Z', '#bfe8ff', so(1));
  if (o.hearts) s += [[18, 24], [82, 30]].map(([x, y]) => P(`M${x} ${y + 3} C ${x - 6} ${y - 2} ${x - 2} ${y - 6} ${x} ${y - 2} C ${x + 2} ${y - 6} ${x + 6} ${y - 2} ${x} ${y + 3} Z`, '#ff6a8a', so(1))).join('');
  if (o.zz) s += `<text x="74" y="26" font-family="Arial Black,sans-serif" font-size="11" fill="#fff" stroke="${OUT}" stroke-width="1" paint-order="stroke">z</text><text x="82" y="16" font-family="Arial Black,sans-serif" font-size="8" fill="#fff" stroke="${OUT}" stroke-width="1" paint-order="stroke">z</text>`;
  if (o.extra) s += o.extra;
  return s;
}
// petit dégradé brillant partagé par toutes les boules molles
(function () { const g = '<radialGradient id="sq-shine" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#fff" stop-opacity=".45"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".18"/></radialGradient>'; SOFT.sqshine = g; })();

Object.assign(ART, {
  sf_braise: () => squishy({ el:'feu', eyes:'big', mouth:'cat', lines:true }),
  sf_guimauve: () => squishy({ el:'feu', col:'#f6c8a0', eyes:'derp', mouth:'tongue', sweat:true, extra:Ln('M74 70 L92 48', '#a8744a', 3) }),
  sf_piment: () => squishy({ el:'feu', col:'#e8402a', eyes:'angry', mouth:'grin', squash:0.9, acc:'mustache' }),
  sf_volcan: () => squishy({ el:'feu', col:'#b0503a', eyes:'stars', mouth:'o', squash:1.05, acc:'goggles', lines:true }),
  sf_phenix: () => squishy({ el:'feu', col:'#ff9a3a', eyes:'happy', mouth:'smile', glow:true, extra:[[14, 50, 1], [86, 50, -1]].map(([x, y, sx]) => `<g transform="translate(${x} ${y}) scale(${sx} 1)">${P('M0 0 C -6 -10, 2 -20, 12 -16 C 6 -12, 8 -6, 14 -4 C 8 2, 2 4, 0 0 Z', '#ffd34d', so(1.4))}</g>`).join('') }),
  sf_soleil: () => squishy({ el:'feu', col:'#ffb43a', eyes:'happy', mouth:'grin', glow:true, acc:'shades', extra:Array.from({ length:10 }, (_, k) => { const a = k / 10 * Math.PI * 2; return Ln(`M${f1(50 + Math.cos(a) * 40)} ${f1(56 + Math.sin(a) * 40)} L${f1(50 + Math.cos(a) * 46)} ${f1(56 + Math.sin(a) * 46)}`, '#ffe14a', 3, 'opacity=".9"'); }).join('') }),
  se_goutte: () => squishy({ el:'eau', eyes:'big', mouth:'pout', sweat:true }),
  se_meduse: () => squishy({ el:'eau', col:'#c8a0f0', eyes:'derp', mouth:'wavy', extra:[30, 40, 50, 60, 70].map(x => Ln(`M${x} 88 Q${x - 3} 94 ${x} 98 Q${x + 3} 100 ${x} 104`, '#c8a0f0', 2.6)).join('') }),
  se_bulle: () => squishy({ el:'eau', col:'#bfe8ff', eyes:'happy', mouth:'o', acc:'bow', extra:Ci(50, 56, 44, 'none', 'stroke="#fff" stroke-width="2" opacity=".7"') + E(30, 30, 6, 3, '#fff', 'opacity=".7" transform="rotate(-40 30 30)"') }),
  se_vapeur: () => squishy({ el:'eau', col:'#d8e8f0', eyes:'closed', mouth:'cat', zz:true, extra:Ln('M30 20 C 26 12, 34 8, 30 0 M50 16 C 46 8, 54 4, 50 -4 M70 20 C 66 12, 74 8, 70 0', '#fff', 2.4, 'opacity=".8"') }),
  se_baleine: () => squishy({ el:'eau', col:'#3a7ac8', eyes:'happy', mouth:'smile', squash:0.85, acc:'crown', extra:Ln('M50 22 C 46 12, 40 10, 38 4 M50 22 C 54 12, 60 10, 62 4', '#bfe8ff', 2.4) }),
  se_tsunami: () => squishy({ el:'eau', col:'#2a90d0', eyes:'stars', mouth:'grin', glow:true, lines:true, acc:'goggles' }),
  st_spore: () => squishy({ el:'terre', col:'#e8d8b0', eyes:'derp', mouth:'o', squash:0.85 }),
  st_patate: () => squishy({ el:'terre', eyes:'closed', mouth:'smile', zz:true, squash:0.9 }),
  st_galet: () => squishy({ el:'terre', col:'#9a968c', eyes:'angry', mouth:'pout', acc:'mustache' }),
  st_champi: () => squishy({ el:'terre', col:'#f0e0c8', eyes:'big', mouth:'cat', extra:P('M22 34 C 20 14, 80 14, 78 34 C 64 30, 36 30, 22 34 Z', '#e84a3a', so(2)) + [[34, 24, 4], [52, 20, 3.4], [66, 26, 3]].map(([x, y, r]) => Ci(x, y, r, '#fff', so(1))).join('') }),
  st_boue: () => squishy({ el:'terre', col:'#7a5a3a', eyes:'derp', mouth:'tongue', squash:0.95, extra:[[24, 88], [76, 90], [50, 96]].map(([x, y]) => Ci(x, y, 4, '#7a5a3a', so(1.2))).join('') }),
  st_colline: () => squishy({ el:'terre', col:'#7fae5a', eyes:'closed', mouth:'smile', squash:0.8, zz:true, acc:'flower' }),
  st_montagne: () => squishy({ el:'terre', col:'#a8a2c0', eyes:'happy', mouth:'grin', acc:'crown', extra:P('M34 30 L44 22 L50 28 L58 20 L66 30 Q50 26 34 30 Z', '#fff', 'opacity=".9"') }),
  sv_plume: () => squishy({ el:'vent', eyes:'big', mouth:'cat', squash:0.95, extra:`<g transform="translate(70 18) rotate(30)">${P('M0 0 C 6 10, 6 26, 0 36 C -6 26, -6 10, 0 0 Z', '#fff', so(1.4))}${Ln('M0 4 L0 34', '#c8d8e0', 1)}</g>` }),
  sv_bise: () => squishy({ el:'vent', col:'#c8f0f8', eyes:'happy', mouth:'o', hearts:true, lines:true }),
  sv_tornade: () => squishy({ el:'vent', col:'#8fd8c8', eyes:'derp', mouth:'wavy', lines:true, extra:Ln('M20 30 C 40 20, 60 40, 80 28 M24 82 C 40 74, 60 92, 78 80', '#fff', 2.4, 'opacity=".8"') }),
  sv_cerf: () => squishy({ el:'vent', col:'#ffc8e0', eyes:'big', mouth:'grin', acc:'beret', extra:Ln('M78 86 C 84 92, 88 96, 96 100', '#5a3d7a', 1.4) + P('M84 70 L92 64 L98 72 L90 78 Z', '#ffe14a', so(1.2)) }),
  sv_nuage: () => squishy({ el:'vent', col:'#f4f4ff', eyes:'closed', mouth:'smile', zz:true, squash:0.85, acc:'scarf' }),
  sv_ouragan: () => squishy({ el:'vent', col:'#6fc0d8', eyes:'angry', mouth:'grin', glow:true, lines:true, acc:'shades' }),
  c_pouf: () => compHalo('#ffb07a') + squishy({ el:'feu', col:'#ffb07a', eyes:'big', mouth:'cat', hearts:true, acc:'bow' }),
  sg_boule: () => squishy({ el:'glace', col:'#f4fbff', eyes:'big', mouth:'o', squash:0.9 }),
  sg_glacon: () => squishy({ el:'glace', eyes:'big', mouth:'wavy', sweat:true, extra:Ln('M14 50 L20 54 M14 60 L20 58 M86 50 L80 54 M86 60 L80 58', '#fff', 1.6, 'opacity=".8"') }),
  sg_flocon: () => squishy({ el:'glace', col:'#d8f0ff', eyes:'closed', mouth:'cat', hearts:true, acc:'bow' }),
  sg_pingouin: () => squishy({ el:'glace', col:'#3a4a6a', eyes:'derp', mouth:'o', squash:0.92, extra:P('M36 50 C 36 40, 64 40, 64 50 C 66 70, 60 86, 50 88 C 40 86, 34 70, 36 50 Z', '#fff', 'opacity=".9"') + P('M46 64 L50 70 L54 64 Z', '#ffb43a', so(1.2)) + P('M30 92 L40 92 L36 86 Z M60 92 L70 92 L64 86 Z', '#ffb43a', so(1)) }),
  sg_bonhomme: () => squishy({ el:'glace', col:'#f4fbff', eyes:'happy', mouth:'smile', acc:'scarf', extra:P('M50 58 L64 62 L50 64 Z', '#ff8a3a', so(1.2)) + Ln('M24 52 L10 40 M76 52 L90 40', '#7a4a2a', 2.4) }),
  sg_yeti: () => squishy({ el:'glace', col:'#eef6ff', eyes:'angry', mouth:'grin', squash:0.95, extra:[[24, 40], [76, 40], [30, 80], [70, 82], [50, 30]].map(([x, y]) => P(`M${x - 5} ${y} Q${x} ${y - 7} ${x + 5} ${y} Q${x} ${y + 3} ${x - 5} ${y} Z`, '#fff', so(1))).join('') }),
  sg_banquise: () => squishy({ el:'glace', col:'#7ac4f0', eyes:'happy', mouth:'grin', glow:true, acc:'crown', squash:0.88 }),
  sz_pile: () => squishy({ el:'foudre', eyes:'big', mouth:'grin', lines:true, extra:P('M44 74 L56 74 L56 86 L44 86 Z', '#3a3a4a', so(1.2)) + Ln('M47 78 L53 78 M50 75 L50 81', '#fff', 1.4) }),
  sz_zap: () => squishy({ el:'foudre', col:'#ffe86a', eyes:'derp', mouth:'tongue', sweat:true }),
  sz_ampoule: () => squishy({ el:'foudre', col:'#fff6b0', eyes:'stars', mouth:'o', glow:true, extra:P('M40 90 L60 90 L58 98 L42 98 Z', '#9a9aa8', so(1.4)) + Ln('M42 94 L58 94', OUT, 1) }),
  sz_orage: () => squishy({ el:'foudre', col:'#8a8ab0', eyes:'angry', mouth:'pout', zz:false, extra:[[30, 96], [50, 100], [70, 96]].map(([x, y]) => Ln(`M${x} ${y - 6} L${x - 2} ${y}`, '#7ac4f0', 2)).join('') }),
  sz_eclair: () => squishy({ el:'foudre', col:'#ffc83a', eyes:'happy', mouth:'grin', acc:'shades', lines:true }),
  sz_tonnerre: () => squishy({ el:'foudre', col:'#ffb020', eyes:'angry', mouth:'grin', glow:true, acc:'crown', lines:true }),
  c_caillou: () => compHalo('#c4945a') + squishy({ el:'terre', col:'#b0aaa0', eyes:'closed', mouth:'smile', zz:true, squash:0.85, acc:'mustache' }),
  c_gloup: () => compHalo('#8fe36a') + squishy({ el:'eau', col:'#8fe36a', eyes:'derp', mouth:'tongue', sweat:true }),
  c_frisouille: () => compHalo('#9fe6da') + squishy({ el:'vent', col:'#e8f8ff', eyes:'stars', mouth:'o', lines:true, acc:'party' }),
});

/* ---------- héros squishys : une tête toute ronde et molle ---------- */
function sqHero(o) {
  const skin = o.skin || '#ffd8b8', hair = o.hair || '#5a3a22';
  let s = '';
  if (o.back) s += o.back;
  s += P('M14 104 C 16 84, 30 76, 50 76 C 70 76, 84 84, 86 104 Z', o.shirt || '#ff7a4a', so());
  if (o.shirtx) s += o.shirtx;
  s += Ci(50, 52, 30, skin, so(2.6)) + Ci(50, 52, 30, 'url(#sq-shine)', 'opacity=".7"');
  s += o.hairFront || '';
  s += E(36, 62, 5, 3, '#ff8a9a', 'opacity=".55"') + E(64, 62, 5, 3, '#ff8a9a', 'opacity=".55"');
  s += sqEyes(o, 54) + sqMouth(o, 66);
  if (o.acc) [].concat(o.acc).forEach(a => { s += sqAcc(a); });
  if (o.extra) s += o.extra;
  return s;
}
Object.assign(HART, {
  paul: () => sqHero({ skin:'#ffd8b8', shirt:'#e8402a', eyes:'big', mouth:'grin',
    hairFront:P('M22 44 C 22 22, 78 22, 78 44 C 70 36, 30 36, 22 44 Z', '#c8402a', so(2)) + Ln('M30 40 L74 40', '#fff', 3, 'opacity=".6"'),
    extra:P('M44 24 C 42 12, 48 6, 50 2 C 54 10, 60 10, 58 22 Z', '#ffd34d', so(1.4)) + P(starD(50, 90, 6, 2.4, 5), '#ffd34d', so(1)) + softGlow(80, 80, 10, '#ff7a4a', 0.6) }),
  leon: () => sqHero({ skin:'#f0c8a0', shirt:'#6a8a3a', eyes:'happy', mouth:'smile', acc:'mustache',
    hairFront:P('M22 46 C 18 26, 34 18, 50 20 C 66 18, 82 26, 78 46 C 72 34, 62 30, 50 32 C 38 30, 28 34, 22 46 Z', '#6a4a2a', so(2)),
    shirtx:Ln('M36 80 L36 104 M64 80 L64 104', '#4a3a22', 3) + Ci(36, 88, 2, '#e2b452') + Ci(64, 88, 2, '#e2b452'),
    extra:Ln('M50 22 C 50 14, 48 10, 50 4', '#4a7a2a', 2.4) + leaves([[50, 8, -150], [50, 8, -30]], '#8fd05a') }),
  zoe: () => sqHero({ skin:'#ffe0c8', shirt:'#3a8ad8', eyes:'big', mouth:'cat',
    back:[[20, 54], [80, 54]].map(([x, y]) => E(x, y, 9, 16, '#3a6ad0', so(2))).join('') + Ci(20, 70, 3, '#ff6ab0', so(1)) + Ci(80, 70, 3, '#ff6ab0', so(1)),
    hairFront:P('M22 46 C 20 24, 80 24, 78 46 C 66 34, 56 40, 50 32 C 44 40, 34 34, 22 46 Z', '#3a6ad0', so(2)),
    acc:'goggles', extra:Ln('M24 92 Q32 88 40 92 T56 92 T72 92', '#bfe8ff', 2.4) }),
  jeanne: () => sqHero({ skin:'#fbe0d0', shirt:'#8fd0c8', eyes:'happy', mouth:'o', acc:'scarf',
    back:Ci(50, 20, 12, '#f0e0b8', so(2)) + Ln('M44 18 C 48 14, 54 18, 50 22 C 46 24, 46 18, 50 18', '#c8b088', 1.4),
    hairFront:P('M22 48 C 18 26, 34 20, 50 22 C 66 20, 82 26, 78 48 C 74 36, 62 32, 50 34 C 38 32, 26 36, 22 48 Z', '#f0e0b8', so(2)),
    extra:Ln('M6 30 C 14 26, 20 32, 16 36 M84 22 C 92 18, 98 24, 94 28', '#fff', 2, 'opacity=".8"') }),
});

/* ---------- plus le niveau est haut, plus le Squishy est gros (et plus il est large : un vrai ravioli) ---------- */
(function () {
  const tiers = {}; DEFAULT_CARD_LIST.forEach(r => { if (String(r[3]).startsWith('sq_')) tiers[r[0]] = r[2]; });
  for (const id in tiers) {
    const f = ART[id]; if (!f) continue;
    ART[id] = () => {
      const live = typeof C !== 'undefined' && C[id] ? C[id].t : tiers[id];
      const t = Math.max(0, Math.min(6, live || 0));
      const sx = (0.6 + t * 0.09).toFixed(3), sy = (0.62 + t * 0.06).toFixed(3);
      return `<g transform="translate(50 97) scale(${sx} ${sy}) translate(-50 -97)">${f()}</g>`;
    };
  }
})();

/* ---------- Les Cinq Nations : ninjas originaux (bandeau à plaque gravée + masque) ---------- */
const NJ_SYM = {
  feu:'M50 34.6 C 53 37, 52.6 39.6, 50 41.6 C 47.4 39.6, 47 37, 50 34.6 Z',
  vent:'M45.5 38 C 47 35, 53 35, 54 38 C 54.6 40.4, 50.6 41.2, 50 39',
  eau:'M50 34.4 C 52.4 37.4, 53.4 39, 50 41.8 C 46.6 39, 47.6 37.4, 50 34.4 Z',
  foudre:'M51.5 34.4 L47.4 38.6 L50.4 38.6 L48.4 41.8 L52.8 37.4 L49.8 37.4 Z',
  terre:'M45 41.6 L48.6 35.8 L50.6 38.6 L52.4 36.6 L55.2 41.6 Z'
};
function ninja(o) {
  const band = o.band || '#2a3a5a', mask = o.mask === false ? '' : P('M30.5 55.5 Q50 51.5 69.5 55.5 L67.6 66.5 Q50 80 32.4 66.5 Z', o.maskc || '#2a2a34', so(1.8)) + Ln('M36 60 Q50 57.6 64 60', 'rgba(255,255,255,.12)', 1.4);
  const base = human(Object.assign({ hat:o.hood ? 'hood' : null, hatc:o.hoodc, mouth:'flat', shirt:'#2c2e3a', collar:null, beard:null, prop:null }, o));
  const plate = P('M27 35.4 L73 35.4 L72.4 42.4 L27.6 42.4 Z', band, so(1.6))
    + `<rect x="42" y="33.6" width="16" height="10.4" rx="2" fill="#b8c0c8" ${so(1.6)}/>`
    + `<path d="${NJ_SYM[o.el]}" fill="none" stroke="#3a4048" stroke-width="1.5" stroke-linejoin="round"/>`
    + (o.tails ? P('M72 37 C 80 40, 84 48, 86 54 L82 52 C 80 47, 76 43, 71.6 41 Z', band, so(1.4)) : '');
  const aura = o.aura ? `<circle cx="50" cy="55" r="44" fill="none" stroke="${o.aura}" stroke-width="3" opacity=".55"/>` : '';
  return aura + base + plate + mask;
}
const NJ = (el, band, x) => () => ninja(Object.assign({ el, band }, x));
Object.assign(ART, {
  n_f1: NJ('feu', '#c8402a', { skin:'#f3d0b0', hair:'#b8452c', hs:'short', mask:false, eyes:'dot', mouth:'smile', shirt:'#5a2a22' }),
  n_f2: NJ('feu', '#c8402a', { skin:'#e8b894', hair:'#2a1d14', hs:'mohawk', eyes:'dot', shirt:'#6a2a1a', maskc:'#5a1a12' }),
  n_f3: NJ('feu', '#c8402a', { skin:'#d9a27a', hair:'#2a1d14', hs:'long', mask:false, eyes:'happy', mouth:'smile', shirt:'#7a3a2a' }),
  n_f4: NJ('feu', '#c8402a', { skin:'#f0c4a0', hair:'#e8e2da', hs:'side', eyes:'glow', glow:'#ffb04a', shirt:'#3a1a14', tails:1 }),
  n_f5: NJ('feu', '#c8402a', { skin:'#c98e66', hair:'#4a2f1d', hs:'bald', eyes:'dot', hood:1, hoodc:'#8a2a1a', shirt:'#5a1a12', aura:'#ff8a3a' }),
  n_f6: NJ('feu', '#e8b84a', { skin:'#e8b894', hair:'#e8e2da', hs:'long', eyes:'glow', glow:'#ffd27a', mask:false, mouth:'smirk', beard:'long', beardc:'#e8e2da', shirt:'#8a2a1a', aura:'#ffb04a' }),
  n_v1: NJ('vent', '#3aa86a', { skin:'#d9a27a', hair:'#7a4a2a', hs:'short', eyes:'dot', shirt:'#8a6a3a', maskc:'#a8844a' }),
  n_v2: NJ('vent', '#3aa86a', { skin:'#f3d0b0', hair:'#b8452c', hs:'side', eyes:'dot', shirt:'#6a5232', tails:1 }),
  n_v3: NJ('vent', '#3aa86a', { skin:'#c98e66', hair:'#2a1d14', hs:'bun', mask:false, eyes:'happy', mouth:'grin', shirt:'#7a5a2a' }),
  n_v4: NJ('vent', '#3aa86a', { skin:'#e8b894', hair:'#5a3d7a', hs:'long', eyes:'glow', glow:'#e8ffd0', shirt:'#4a3a22', maskc:'#6a5232' }),
  n_v5: NJ('vent', '#3aa86a', { skin:'#a8714f', hair:'#2a1d14', hs:'bald', eyes:'dot', hood:1, hoodc:'#c8a860', shirt:'#6a5232' }),
  n_v6: NJ('vent', '#8fe0a8', { skin:'#f0c4a0', hair:'#c8392f', hs:'curly', eyes:'glow', glow:'#9be36a', shirt:'#5a4228', aura:'#e8c870', tails:1 }),
  n_e1: NJ('eau', '#2f7ab8', { skin:'#f3d0b0', hair:'#2e8a8a', hs:'short', eyes:'dot', shirt:'#2a3a5a', maskc:'#3a4a6a' }),
  n_e2: NJ('eau', '#2f7ab8', { skin:'#e8b894', hair:'#e8e2da', hs:'long', mask:false, eyes:'happy', mouth:'smile', shirt:'#2e3f6e' }),
  n_e3: NJ('eau', '#2f7ab8', { skin:'#d9a27a', hair:'#2a1d14', hs:'braids', mask:false, eyes:'dot', mouth:'smile', shirt:'#2a5a7a' }),
  n_e4: NJ('eau', '#2f7ab8', { skin:'#c98e66', hair:'#2a1d14', hs:'side', eyes:'dot', shirt:'#1e2a44', maskc:'#e8e2da' }),
  n_e5: NJ('eau', '#2f7ab8', { skin:'#bfe3df', hair:'#2e8a8a', hs:'mohawk', eyes:'glow', glow:'#8fd0ff', shirt:'#1e3a5a', aura:'#6fc8ff' }),
  n_e6: NJ('eau', '#8fd0ff', { skin:'#f0c4a0', hair:'#5a3d7a', hs:'long', eyes:'glow', glow:'#bfe8ff', hood:1, hoodc:'#1e3a5a', shirt:'#14243a', aura:'#8fd0ff' }),
  n_o1: NJ('foudre', '#c8a020', { skin:'#8a5a3c', hair:'#e0b25a', hs:'mohawk', mask:false, eyes:'dot', mouth:'grin', shirt:'#3a3a4a' }),
  n_o2: NJ('foudre', '#c8a020', { skin:'#f3d0b0', hair:'#e8e2da', hs:'short', eyes:'dot', shirt:'#4a4a5a', maskc:'#4a4a5a' }),
  n_o3: NJ('foudre', '#c8a020', { skin:'#a8714f', hair:'#2a1d14', hs:'side', eyes:'glow', glow:'#ffe14a', shirt:'#2a2a3a', tails:1 }),
  n_o4: NJ('foudre', '#c8a020', { skin:'#d9a27a', hair:'#2a1d14', hs:'curly', mask:false, eyes:'dot', mouth:'o', beard:'full', shirt:'#3a3a4a' }),
  n_o5: NJ('foudre', '#c8a020', { skin:'#7a5232', hair:'#e8e2da', hs:'bald', eyes:'glow', glow:'#ffe14a', shirt:'#2a2a3a', aura:'#ffe14a' }),
  n_o6: NJ('foudre', '#ffe14a', { skin:'#8a5a3c', hair:'#e0b25a', hs:'long', eyes:'glow', glow:'#ffffff', mask:false, mouth:'smirk', beard:'goatee', beardc:'#e0b25a', shirt:'#2a2a3a', aura:'#ffe14a' }),
  n_f9: NJ('feu', '#a8402a', { skin:'#e8b894', hair:'#c8402a', hs:'part', eyes:'dot', shirt:'#3a1e14', maskc:'#5a1e14', aura:'#ff9a4a' }),
  n_v9: NJ('vent', '#3a8a5a', { skin:'#c98e66', hair:'#2a1d14', hs:'short', mask:false, eyes:'dot', mouth:'smile', shirt:'#1e3a2a' }),
  n_e9: NJ('eau', '#2f7ab8', { skin:'#bfe3df', hair:'#1e3a5a', hs:'long', eyes:'glow', glow:'#6fc8ff', shirt:'#14243a', hood:1, hoodc:'#1e3a5a' }),
  n_o9: NJ('foudre', '#c8a020', { skin:'#f3d0b0', hair:'#ffe14a', hs:'mohawk', eyes:'glow', glow:'#ffe14a', shirt:'#2a2a3a', maskc:'#3a3a4a' }),
  n_t9: NJ('terre', '#7a5a3a', { skin:'#b8865a', hair:'#4a3a28', hs:'bald', mask:false, eyes:'dot', mouth:'flat', beard:'full', beardc:'#4a3a28', shirt:'#5a4a32', aura:'#c8a878' }),
  nb_feu: () => dragonHead({ col:'#ff6a2a', fire:true }),
  nb_vent: () => beast({ sp:'wolf', col:'#7ac8a0', belly:'#dff4e8', eye:'#e8fff0' }),
  nb_eau: () => beast({ sp:'snake', col:'#3a8ad0', belly:'#bfe8ff', eye:'#bfe8ff' }),
  nb_foudre: () => beast({ sp:'cat', col:'#e0b22a', belly:'#fff0b0', eye:'#6fd0ff' }),
  nb_terre: () => beast({ sp:'boar', col:'#8a6a44', belly:'#d8c0a0', horns:true }),
  n_t1: NJ('terre', '#7a5a3a', { skin:'#a8a098', hair:'#5a5450', hs:'bald', mask:false, eyes:'dot', mouth:'flat', shirt:'#6a6058' }),
  n_t2: NJ('terre', '#7a5a3a', { skin:'#e8b894', hair:'#4a2f1d', hs:'short', mask:false, eyes:'dot', mouth:'smile', beard:'stubble', shirt:'#5a4a32' }),
  n_t3: NJ('terre', '#7a5a3a', { skin:'#c98e66', hair:'#2a1d14', hs:'part', eyes:'dot', shirt:'#4a3a28', maskc:'#7a5a3a' }),
  n_t4: NJ('terre', '#7a5a3a', { skin:'#d9a27a', hair:'#7a4a2a', hs:'mohawk', mask:false, eyes:'dot', mouth:'grin', shirt:'#5a4a32', angry:1 }),
  n_t5: NJ('terre', '#7a5a3a', { skin:'#9a9088', hair:'#5a5450', hs:'bald', eyes:'glow', glow:'#ffb050', shirt:'#4a443e', aura:'#c8a878' }),
  n_t6: NJ('terre', '#c8a878', { skin:'#e8b894', hair:'#e8e2da', hs:'long', mask:false, eyes:'dot', mouth:'flat', beard:'long', beardc:'#e8e2da', hood:1, hoodc:'#5a4a32', shirt:'#3a2e22', aura:'#c8a878' })
});

Object.assign(ART, {
  n_f7: NJ('feu', '#c8402a', { skin:'#e8b894', hair:'#2a1d14', hs:'side', eyes:'dot', shirt:'#3a1a14', maskc:'#7a2a1a' }),
  n_f8: NJ('feu', '#c8402a', { skin:'#d9a27a', hair:'#b8452c', hs:'curly', eyes:'glow', glow:'#6fd0ff', mask:false, mouth:'grin', shirt:'#5a1a12', aura:'#6fd0ff' }),
  n_v7: NJ('vent', '#3aa86a', { skin:'#f0c4a0', hair:'#7a4a2a', hs:'short', eyes:'dot', shirt:'#4a3a22', maskc:'#c8a860' }),
  n_v8: NJ('vent', '#3aa86a', { skin:'#e8b894', hair:'#2a1d14', hs:'bun', mask:false, eyes:'happy', mouth:'smile', shirt:'#7a5a2a', aura:'#6fd0ff' }),
  n_e7: NJ('eau', '#2f7ab8', { skin:'#bfe3df', hair:'#5a3d7a', hs:'long', eyes:'glow', glow:'#6fd0ff', shirt:'#1e2a44', maskc:'#14243a' }),
  n_e8: NJ('eau', '#2f7ab8', { skin:'#c98e66', hair:'#e8e2da', hs:'bald', mask:false, eyes:'happy', mouth:'flat', beard:'long', beardc:'#e8e2da', shirt:'#2a5a7a', aura:'#6fd0ff' }),
  n_o7: NJ('foudre', '#c8a020', { skin:'#a8714f', hair:'#e0b25a', hs:'mohawk', eyes:'glow', glow:'#6fd0ff', shirt:'#2a2a3a', maskc:'#3a3a4a' }),
  n_o8: NJ('foudre', '#c8a020', { skin:'#8a5a3c', hair:'#2a1d14', hs:'curly', eyes:'glow', glow:'#ffe14a', mask:false, mouth:'grin', shirt:'#3a3a4a', aura:'#6fd0ff' }),
  n_t7: NJ('terre', '#7a5a3a', { skin:'#9a9088', hair:'#2a1d14', hs:'part', eyes:'dot', shirt:'#3a2e22', maskc:'#5a4a32', tails:1 }),
  n_t8: NJ('terre', '#c8a878', { skin:'#e8b894', hair:'#e8e2da', hs:'bald', mask:false, eyes:'happy', mouth:'smile', beard:'full', beardc:'#e8e2da', hood:1, hoodc:'#6a5a44', shirt:'#4a3a28', aura:'#6fd0ff' }),
  c_nj_kurama: NJ('feu', '#c8402a', { skin:'#f3d0b0', hair:'#2a1d14', hs:'short', mask:false, eyes:'happy', mouth:'smile', shirt:'#6a2a1a' }),
  c_nj_shukaku: NJ('vent', '#3aa86a', { skin:'#d9a27a', hair:'#b8452c', hs:'braids', mask:false, eyes:'dot', mouth:'grin', shirt:'#7a5a2a' }),
  c_nj_glaces: NJ('eau', '#2f7ab8', { skin:'#f0c4a0', hair:'#2e8a8a', hs:'bun', mask:false, eyes:'happy', mouth:'smile', shirt:'#2a5a7a' }),
  c_nj_lapin: NJ('foudre', '#c8a020', { skin:'#8a5a3c', hair:'#e8e2da', hs:'short', mask:false, eyes:'dot', mouth:'o', shirt:'#3a3a4a' }),
  c_nj_songoku: NJ('terre', '#7a5a3a', { skin:'#c98e66', hair:'#4a2f1d', hs:'curly', mask:false, eyes:'dot', mouth:'smile', shirt:'#5a4a32' }),
  // crapaud des montagnes : dessin original (corps trapu, gros yeux, verrues)
  c_nj_gamabunta: () => `<ellipse cx="50" cy="96" rx="44" ry="20" fill="#4f6b2a" ${so()}/>`
    + `<path d="M12 70 C 10 44, 28 30, 50 30 C 72 30, 90 44, 88 70 C 86 86, 70 94, 50 94 C 30 94, 14 86, 12 70 Z" fill="#7a9a3a" ${so()}/>`
    + `<path d="M24 74 C 34 86, 66 86, 76 74 C 70 90, 30 90, 24 74 Z" fill="#d8d49a" ${so(1.6)}/>`
    + [[28, 34], [72, 34]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="13" fill="#7a9a3a" ${so()}/><circle cx="${x}" cy="${y}" r="8.5" fill="#f4e27a" ${so(1.6)}/><ellipse cx="${x}" cy="${y + 1}" rx="7" ry="2.6" fill="#1a1208"/>`).join('')
    + `<path d="M26 66 Q50 80 74 66" fill="none" ${so(2.6)}/><path d="M24 64 L28 68 M76 64 L72 68" ${so(2)}/>`
    + `<circle cx="44" cy="54" r="1.6" fill="#1a1208"/><circle cx="56" cy="54" r="1.6" fill="#1a1208"/>`
    + [[20, 56, 3], [80, 58, 3.4], [34, 46, 2.2], [66, 46, 2.4], [86, 72, 2.6], [15, 76, 2.4], [62, 88, 2], [40, 89, 2]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#5f7d2c" stroke="#3a4a1a" stroke-width="1"/>`).join(''),
  c_nj_aigle: () => elemental({ kind:'fire', sparks:'#ffd34d' }),
  c_nj_chatnoir: () => NJ('feu', '#c8402a', { skin:'#e8b894', hair:'#c8392f', hs:'bun', mask:false, eyes:'dot', mouth:'flat', shirt:'#8a2a1a', earring:1 })(),
  c_nj_corbeau: () => dragonHead({ col:'#e8602a', fire:true, frill:1 }),
  c_nj_renard1: () => elemental({ kind:'magma', sparks:'#ffb04a' }),
  c_nj_katoncrow: () => NJ('feu', '#8a2a1a', { skin:'#c98e66', hair:'#2a1d14', hs:'short', mask:false, eyes:'dot', mouth:'grin', shirt:'#3a1a14', freckles:1 })(),
  c_nj_zetsu: () => dragonHead({ col:'#b8282a', fire:true, horn:1, wings:1 }),
  c_nj_grenouille: () => beast({ sp:'cat', col:'#d9a860', belly:'#f4e4c0', eye:'#6fd8a0', stripes:1 }),
  c_nj_sasori: () => beast({ sp:'stag', col:'#a8744a', belly:'#e8d0b0', eye:'#e8fff0' }),
  c_nj_cerfvolant: () => elemental({ kind:'air' }),
  c_nj_tanuki: () => NJ('vent', '#3aa86a', { skin:'#f0c4a0', hair:'#e0b25a', hs:'braids', mask:false, eyes:'happy', mouth:'smile', shirt:'#4a6a3a' })(),
  c_nj_singe: () => beast({ sp:'dog', col:'#e0a94a', belly:'#fff0d0', eye:'#3a2a22', pup:1 }),
  c_nj_espritvent: () => dragonHead({ col:'#5ab07a', wings:1, eye:'#e8fff0' }),
  c_nj_faucon: () => NJ('vent', '#8fe0a8', { skin:'#a8714f', hair:'#2a1d14', hs:'side', eyes:'dot', hood:1, hoodc:'#c8a860', shirt:'#6a5232', maskc:'#a8844a' })(),
  c_nj_requin: () => beast({ sp:'snake', col:'#2a3a5a', belly:'#6f9ac8', eye:'#8fd0ff', glow:'#8fd0ff' }),
  c_nj_bulle: () => elemental({ kind:'water' }),
  c_nj_hiramekarei: () => NJ('eau', '#2f7ab8', { skin:'#f3d0b0', hair:'#14243a', hs:'side', mask:false, eyes:'dot', mouth:'smirk', shirt:'#1e2a44', scar:1 })(),
  c_nj_meduse: () => beast({ sp:'snake', col:'#3a2a5a', belly:'#8a6ac8', eye:'#ffe14a', fangs:1 }),
  c_nj_poissonscie: () => beast({ sp:'snake', col:'#6fc8e8', belly:'#e8fbff', eye:'#2f7ab8' }),
  c_nj_tortue: () => beast({ sp:'cat', col:'#cfcac3', belly:'#ffffff', eye:'#4ab0e8', kitten:1 }),
  c_nj_samehada: () => beast({ sp:'dog', col:'#7a5232', belly:'#d8c0a0', eye:'#2a1d14', tongue:1 }),
  c_nj_nuage: () => beast({ sp:'lion', col:'#e0b22a', belly:'#fff0b0', eye:'#6fd0ff', mane:'#5a3d7a', angry:1 }),
  c_nj_renardblanc: () => elemental({ kind:'storm' }),
  c_nj_gyuki: () => beast({ sp:'wolf', col:'#5a5f69', belly:'#d8dce4', eye:'#ffe14a', glow:'#ffe14a', fangs:1 }),
  c_nj_ninken: () => NJ('foudre', '#ffe14a', { skin:'#e8b894', hair:'#ffe14a', hs:'braids', mask:false, eyes:'dot', mouth:'grin', shirt:'#2a2a3a' })(),
  c_nj_matatabi: () => beast({ sp:'cat', col:'#e0c84a', belly:'#fff8d0', eye:'#6fd0ff', stripes:1, angry:1 }),
  c_nj_puma: () => NJ('foudre', '#c8a020', { skin:'#7a5232', hair:'#2a1d14', hs:'mohawk', mask:false, eyes:'happy', mouth:'grin', shirt:'#3a3a4a', beard:'goatee' })(),
  c_nj_hibou: () => dragonHead({ col:'#d8b02a', horn:1, eye:'#6fd0ff' }),
  c_nj_geant: () => NJ('terre', '#7a5a3a', { skin:'#f0c4a0', hair:'#7a4a2a', hs:'curly', mask:false, eyes:'happy', mouth:'smile', shirt:'#5a4a32', freckles:1 })(),
  c_nj_dragonbois: () => elemental({ kind:'stone' }),
  c_nj_argile: () => beast({ sp:'boar', col:'#8d938f', belly:'#d8dcd8', eye:'#ffb050', horns:1, angry:1 }),
  c_nj_dragonpierre: () => golem(),
  c_nj_rocher: () => beast({ sp:'stag', col:'#b8b2ac', belly:'#ece8e2', eye:'#3a2a22', horns:1 }),
  c_nj_golem: () => beast({ sp:'lion', col:'#a8a098', belly:'#e0dcd4', eye:'#ffb050', mane:'#6a6058' }),
  c_nj_arbre: () => beast({ sp:'dog', col:'#3d3a44', belly:'#e6dcc8', eye:'#ffe14a', stripes:1 }),
});
// les 40 héros des Cinq Nations : portraits ninja originaux
const NH = (el, band, x) => () => ninja(Object.assign({ el, band, aura:band }, x));
Object.assign(HART, {
  nh_kushina: NH('feu', '#c8402a', { skin:'#f3d0b0', hair:'#c8392f', hs:'long', mask:false, eyes:'dot', mouth:'smirk', shirt:'#5a1a12' }),
  nh_jiraiya: NH('feu', '#e8b84a', { skin:'#e8b894', hair:'#e8e2da', hs:'bald', mask:false, eyes:'happy', mouth:'smile', beard:'long', beardc:'#e8e2da', hood:1, hoodc:'#8a2a1a', shirt:'#6a2a1a' }),
  nh_sasuke: NH('feu', '#c8402a', { skin:'#d9a27a', hair:'#2a1d14', hs:'mohawk', eyes:'glow', glow:'#ffb04a', shirt:'#3a1a14', tails:1 }),
  nh_mikoto: NH('feu', '#c8402a', { skin:'#f0c4a0', hair:'#2a1d14', hs:'bun', mask:false, eyes:'dot', mouth:'smile', shirt:'#8a2a1a', earring:1 }),
  nh_itachi: NH('feu', '#c8402a', { skin:'#c98e66', hair:'#4a2f1d', hs:'short', eyes:'dot', shirt:'#5a2a22', maskc:'#5a1a12', scar:1 }),
  nh_temari: NH('vent', '#3aa86a', { skin:'#d9a27a', hair:'#e0b25a', hs:'long', mask:false, eyes:'dot', mouth:'smirk', shirt:'#7a5a2a' }),
  nh_naruto: NH('vent', '#3aa86a', { skin:'#f3d0b0', hair:'#7a4a2a', hs:'curly', mask:false, eyes:'happy', mouth:'grin', shirt:'#6a5232', freckles:1 }),
  nh_kankuro: NH('vent', '#3aa86a', { skin:'#a8714f', hair:'#2a1d14', hs:'side', eyes:'dot', hood:1, hoodc:'#c8a860', shirt:'#4a3a22', maskc:'#a8844a' }),
  nh_shikamaru: NH('vent', '#8fe0a8', { skin:'#e8b894', hair:'#5a3d7a', hs:'part', mask:false, eyes:'dot', mouth:'flat', beard:'goatee', shirt:'#5a4228' }),
  nh_gaara: NH('vent', '#3aa86a', { skin:'#f0c4a0', hair:'#c8392f', hs:'braids', eyes:'glow', glow:'#e8ffd0', shirt:'#6a5232', tails:1 }),
  nh_haku: NH('eau', '#2f7ab8', { skin:'#f3d0b0', hair:'#e8e2da', hs:'long', eyes:'dot', shirt:'#1e3a5a', maskc:'#e8e2da' }),
  nh_zabuza: NH('eau', '#2f7ab8', { skin:'#c98e66', hair:'#2a1d14', hs:'short', eyes:'dot', shirt:'#14243a', maskc:'#2a2a34' }),
  nh_suigetsu: NH('eau', '#2f7ab8', { skin:'#bfe3df', hair:'#2e8a8a', hs:'braids', mask:false, eyes:'happy', mouth:'smile', shirt:'#2a5a7a' }),
  nh_mangetsu: NH('eau', '#8fd0ff', { skin:'#e8b894', hair:'#2a1d14', hs:'side', mask:false, eyes:'dot', mouth:'flat', scar:1, shirt:'#1e2a44' }),
  nh_mei: NH('eau', '#2f7ab8', { skin:'#f0c4a0', hair:'#5a3d7a', hs:'long', eyes:'glow', glow:'#8fd0ff', hood:1, hoodc:'#14243a', shirt:'#14243a' }),
  nh_omoi: NH('foudre', '#c8a020', { skin:'#8a5a3c', hair:'#e8e2da', hs:'mohawk', mask:false, eyes:'dot', mouth:'grin', shirt:'#2a2a3a' }),
  nh_darui: NH('foudre', '#c8a020', { skin:'#a8714f', hair:'#2a1d14', hs:'curly', mask:false, eyes:'dot', mouth:'o', beard:'full', shirt:'#3a3a4a' }),
  nh_samui: NH('foudre', '#ffe14a', { skin:'#f3d0b0', hair:'#e0b25a', hs:'bun', eyes:'glow', glow:'#ffe14a', shirt:'#2a2a3a', maskc:'#3a3a4a' }),
  nh_bee: NH('foudre', '#c8a020', { skin:'#7a5232', hair:'#2a1d14', hs:'bald', mask:false, eyes:'dot', mouth:'smirk', beard:'goatee', shirt:'#3a3a4a', earring:1 }),
  nh_kakashi: NH('foudre', '#c8a020', { skin:'#e8b894', hair:'#5a3d7a', hs:'side', eyes:'dot', shirt:'#2a2a3a', maskc:'#c8a020', tails:1 }),
  nh_roshi: NH('terre', '#7a5a3a', { skin:'#9a9088', hair:'#5a5450', hs:'bald', mask:false, eyes:'dot', mouth:'flat', beard:'stubble', shirt:'#4a443e' }),
  nh_akatsuchi: NH('terre', '#7a5a3a', { skin:'#e8b894', hair:'#7a4a2a', hs:'short', mask:false, eyes:'happy', mouth:'smile', shirt:'#5a4a32' }),
  nh_hashirama: NH('terre', '#c8a878', { skin:'#c98e66', hair:'#2a1d14', hs:'long', mask:false, eyes:'dot', mouth:'smile', hood:1, hoodc:'#6a5a44', shirt:'#3a2e22' }),
  nh_deidara: NH('terre', '#7a5a3a', { skin:'#d9a27a', hair:'#2a1d14', hs:'mohawk', eyes:'glow', glow:'#ffb050', shirt:'#4a3a28', maskc:'#5a4a32' }),
  nh_kurotsuchi: NH('terre', '#7a5a3a', { skin:'#f0c4a0', hair:'#b8452c', hs:'curly', mask:false, eyes:'dot', mouth:'grin', shirt:'#5a4a32', freckles:1 }),
  nh_karin: NH('feu', '#ff7a2a', { skin:'#f3d0b0', hair:'#ff7a2a', hs:'braids', mask:false, eyes:'happy', mouth:'grin', shirt:'#7a2a12', freckles:1 }),
  nh_asuma: NH('feu', '#8a2a1a', { skin:'#a8714f', hair:'#2a1d14', hs:'bald', mask:false, eyes:'dot', mouth:'flat', beard:'full', shirt:'#3a1a14', scar:1 }),
  nh_madara: NH('feu', '#c8402a', { skin:'#e8b894', hair:'#c8392f', hs:'mohawk', eyes:'glow', glow:'#ff7a2a', shirt:'#5a1a12', maskc:'#2a1410', tails:1 }),
  nh_konohamaru: NH('vent', '#8fe0a8', { skin:'#f0c4a0', hair:'#e8e2da', hs:'side', mask:false, eyes:'happy', mouth:'smile', shirt:'#4a6a3a' }),
  nh_pakura: NH('vent', '#3aa86a', { skin:'#d9a27a', hair:'#2e8a8a', hs:'bun', mask:false, eyes:'dot', mouth:'smirk', shirt:'#6a5232', earring:1 }),
  nh_baki: NH('vent', '#3aa86a', { skin:'#c98e66', hair:'#4a2f1d', hs:'long', eyes:'dot', hood:1, hoodc:'#7a6a4a', shirt:'#4a3a22', maskc:'#6a5a3a' }),
  nh_chojuro: NH('eau', '#4ab0e8', { skin:'#f3d0b0', hair:'#2f7ab8', hs:'long', mask:false, eyes:'happy', mouth:'smile', shirt:'#1e3a5a' }),
  nh_ao: NH('eau', '#8fd0ff', { skin:'#e8b894', hair:'#e8e2da', hs:'bun', mask:false, eyes:'dot', mouth:'flat', shirt:'#2a4a6a', earring:1 }),
  nh_kisame: NH('eau', '#2f7ab8', { skin:'#7a5232', hair:'#2a1d14', hs:'curly', mask:false, eyes:'dot', mouth:'grin', beard:'stubble', shirt:'#14243a' }),
  nh_yugito: NH('foudre', '#ffe14a', { skin:'#f0c4a0', hair:'#2a1d14', hs:'mohawk', eyes:'glow', glow:'#ffe14a', shirt:'#2a2a3a', maskc:'#c8a020' }),
  nh_raikage: NH('foudre', '#c8a020', { skin:'#8a5a3c', hair:'#5a3d7a', hs:'short', mask:false, eyes:'dot', mouth:'o', beard:'full', shirt:'#3a3a4a' }),
  nh_c: NH('foudre', '#c8a020', { skin:'#e8b894', hair:'#e0b25a', hs:'part', mask:false, eyes:'dot', mouth:'smirk', shirt:'#2a2a3a', scar:1 }),
  nh_kitsuchi: NH('terre', '#7a5a3a', { skin:'#c98e66', hair:'#5a5450', hs:'short', mask:false, eyes:'dot', mouth:'flat', beard:'long', beardc:'#8a847e', shirt:'#4a443e' }),
  nh_onoki: NH('terre', '#c8a878', { skin:'#e8b894', hair:'#e8e2da', hs:'bald', mask:false, eyes:'happy', mouth:'smile', beard:'goatee', beardc:'#e8e2da', hood:1, hoodc:'#6a5a44', shirt:'#3a2e22' }),
  nh_yamato: NH('terre', '#7a5a3a', { skin:'#a8714f', hair:'#2a1d14', hs:'braids', eyes:'dot', shirt:'#3a2e22', maskc:'#4a3a28', tails:1 }),
});

// serviteurs kekkei genkai et jetons ninja
Object.assign(ART, {
  n_k1: NJ('terre', '#4ab0e8', { skin:'#c98e66', hair:'#3a6a2a', hs:'long', mask:false, eyes:'dot', mouth:'smile', shirt:'#3a4a22', aura:'#6fd08a' }),
  n_k2: NJ('terre', '#4ab0e8', { skin:'#a8714f', hair:'#2a4a1a', hs:'bun', eyes:'glow', glow:'#8fe0a8', shirt:'#2a3a1a', hood:1, hoodc:'#3a5a2a', aura:'#6fd08a' }),
  n_k3: NJ('eau', '#8fe0a8', { skin:'#f3d0b0', hair:'#e8f4ff', hs:'side', mask:false, eyes:'dot', mouth:'flat', shirt:'#2a4a6a', aura:'#bfe8ff' }),
  n_k4: NJ('eau', '#8fe0a8', { skin:'#f0c4a0', hair:'#2a1d14', hs:'long', eyes:'glow', glow:'#e8f8ff', shirt:'#1e3a5a', maskc:'#e8f4ff', aura:'#bfe8ff' }),
  n_k5: NJ('feu', '#c8a878', { skin:'#c98e66', hair:'#c8392f', hs:'mohawk', mask:false, eyes:'dot', mouth:'grin', shirt:'#4a2a1a', aura:'#ff7a2a' }),
  n_k6: NJ('feu', '#c8a878', { skin:'#8a5a3c', hair:'#ff7a2a', hs:'bald', eyes:'glow', glow:'#ffb050', shirt:'#3a1a14', beard:'full', beardc:'#c8392f', aura:'#ff5a1a' }),
  n_k7: NJ('foudre', '#4ab0e8', { skin:'#e8b894', hair:'#e0b25a', hs:'side', mask:false, eyes:'dot', mouth:'smirk', shirt:'#2a3a4a', aura:'#8fd0ff' }),
  n_k8: NJ('foudre', '#4ab0e8', { skin:'#a8714f', hair:'#ffe14a', hs:'long', eyes:'glow', glow:'#8fd0ff', shirt:'#1e2a44', maskc:'#2a3a4a', aura:'#ffe14a' }),
  n_k9: NJ('terre', '#ffe14a', { skin:'#f3d0b0', hair:'#e0b25a', hs:'long', mask:false, eyes:'dot', mouth:'grin', shirt:'#4a3a28', aura:'#ffb050' }),
  n_k10: NJ('terre', '#ffe14a', { skin:'#d9a27a', hair:'#e0b25a', hs:'bun', eyes:'glow', glow:'#ffe14a', shirt:'#3a2e22', maskc:'#5a4a32', aura:'#ffb050' }),
  tk_clone: NJ('vent', '#8fe0a8', { skin:'#e8e8f0', hair:'#9aa8b8', hs:'short', mask:false, eyes:'dot', mouth:'smile', shirt:'#6a7a8a', aura:'#e8fff0' }),
  tk_golem: () => golem(),
  tk_mur: () => elemental({ kind:'stone' }),
});

// univers Ninja : portraits des nouveaux serviteurs, jetons et héros (générés à partir d'un modèle original)
(function () {
  const VIL = { n_feu:['feu', '#d8502a'], n_vent:['vent', '#c8a050'], n_eau:['eau', '#2f7ab8'], n_foudre:['foudre', '#8a7ad8'], n_terre:['terre', '#7a5a3a'] };
  const SK = ['#f3d0b0', '#e8b894', '#d9a27a', '#c98e66', '#a8714f', '#8a5a3c'], HR = ['#2a1d14', '#4a2f1d', '#7a4a2a', '#c8392f', '#e0b25a', '#e8e2da', '#5a3d7a', '#2e8a8a'];
  const HS = ['short', 'long', 'bun', 'braids', 'mohawk', 'curly', 'side', 'part', 'bald'], EY = ['dot', 'happy', 'glow'], MO = ['smile', 'grin', 'smirk', 'flat', 'o'];
  const hsh = s => { let h = 7; for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0; return h; };
  const gen = (id, tr, hero) => { const v = VIL[tr]; if (!v) return null; const r = hsh(id), pk = (a, k) => a[(r >>> k) % a.length], masked = (r >> 3) % 3 === 0;
    const o = { skin:pk(SK, 1), hair:pk(HR, 5), hs:pk(HS, 9), eyes:pk(EY, 13), shirt:'#2a2a34', mask:masked ? undefined : false, mouth:pk(MO, 17), glow:v[1] };
    if (masked) o.maskc = v[1]; if ((r >> 21) % 4 === 0) o.hood = 1, o.hoodc = v[1]; if (hero && (r >> 23) % 3 === 0) o.beard = 'goatee';
    return (hero ? NH : NJ)(v[0], v[1], o); };
  const tribeOf = id => (typeof DEFAULT_CARDS !== 'undefined' && DEFAULT_CARDS[id] && DEFAULT_CARDS[id].tr) || null;
  for (let k = 1; k <= 10; k++) for (const p of ['f', 'v', 'e', 'o', 't']) { const id = `n_${p}${k}`, tr = tribeOf(id); if (tr) { const f = gen(id, tr, false); if (f) ART[id] = f; } }
  for (let k = 1; k <= 5; k++) { const id = 'n_k' + k, tr = tribeOf(id); if (tr) { const f = gen(id, tr, false); if (f) ART[id] = f; } }
  for (const id of ['n_p1', 'n_p2', 'n_p3', 'n_s1', 'n_s2', 'n_s3', 'n_x1', 'n_x2', 'n_x3', 'n_g1', 'n_g2', 'n_g3', 'n_c1', 'n_c2']) { const tr = tribeOf(id); if (tr) { const f = gen(id, tr, false); if (f) ART[id] = f; } }
  if (ART.c_nj_gamabunta) ART.tk_toad = ART.c_nj_gamabunta;
  ART.tk_slug = () => squishy({ col:'#9ad8c8', eye:'happy' });
  ART.tk_snake = () => beast({ sp:'snake', col:'#7a5ab8', belly:'#d8c8ff', eye:'#ffe14a' });
  ART.tk_shark = () => beast({ sp:'wolf', col:'#3a6a9a', belly:'#cfe4f4', eye:'#e8f4ff', angry:1, fangs:1 });
  ART.tk_puppet = () => robot({ col:'#a8744a', head:'round', eye:'duo', mouth:'line' });
  ART.tk_bijuu = () => beast({ sp:'wolf', col:'#6a4ab8', belly:'#c8b8ff', eye:'#ffe14a', glow:'#ffe14a', angry:1, fangs:1 });
  for (const h of ['chiyo', 'sasori', 'rasa', 'karui', 'han', 'mu']) { const id = 'nh_' + h, H0 = typeof HEROES !== 'undefined' && HEROES[id]; if (H0 && !HART[id]) { const f = gen(id, H0.pv || H0.fam[0], true); if (f) HART[id] = f; } }
})();
