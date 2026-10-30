/* =====================================================================
   HÉROS EN 3D — figurines façon film d'animation, construites à partir
   de volumes simples et rendues une fois en images (Three.js).
   ===================================================================== */
const H3 = {
  nono:    { skin:'#c88a5a', cloth:'#b8302a', trim:'#f2c14e', hair:'#2a1a12', hairS:'none', beard:'goatee', beardC:'#2a1a12', hat:'wizard', hatC:'#c8382a', item:'fireball', brows:'#2a1a12' },
  selene:  { skin:'#f2ece8', cloth:'#3a0a14', trim:'#b0202a', hair:'#1a1018', hairS:'long', hat:'crown', hatC:'#d8dce8', eyes:'red', collar:'#7a0a18', lips:'#a01828' },
  brok:    { skin:'#e0a880', cloth:'#7a5030', trim:'#c8963e', hair:'#6a3a1a', hairS:'none', beard:'big', beardC:'#7a4a22', hat:'horned', hatC:'#9aa0a8', item:'hammer', brows:'#5a3018', wide:1.15 },
  sylvara: { skin:'#f6e2d8', cloth:'#4a2c8a', trim:'#c8b0ff', hair:'#eef0f8', hairS:'long', ears:'elf', item:'orb', eyes:'cyan', circlet:'#9fe0ff' },
  vaskor:  { skin:'#b8c8a8', cloth:'#1a1a1e', trim:'#3a6a3a', hair:'#101012', hairS:'none', hat:'hood', hatC:'#1c1c22', eyes:'glow', item:'staff' },
  egide:   { skin:'#f2cfae', cloth:'#c8dcf0', trim:'#f2c14e', hair:'#f2d070', hairS:'long', circlet:'#f2c14e', item:'pauldrons' },
  pyra:    { skin:'#d89a6a', cloth:'#7a3a1a', trim:'#c8963e', hair:'#c83a1a', hairS:'braids', hat:'brim', hatC:'#6a4020', item:'dragon' },
  grumbo:  { skin:'#8aa85a', cloth:'#6a5030', trim:'#e8e0d0', hair:'#2a2010', hairS:'none', hat:'chef', hatC:'#f6f4ee', tusks:1, item:'drumstick', wide:1.2, brows:'#3a3a1a' },
  zoe:     { skin:'#ffe0c8', cloth:'#3a8ad8', trim:'#bfe8ff', hair:'#3a6ad0', hairS:'pigtails', squishy:1, goggles:1 },
  paul:    { skin:'#ffd8b8', cloth:'#e8402a', trim:'#ffd34d', hair:'#c8402a', hairS:'cap', squishy:1, band:'#e8402a', flame:1 },
  oren:    { skin:'#f0c8a0', cloth:'#3a4a7a', trim:'#c8963e', hair:'#f0f0f0', hairS:'bald', beard:'long', beardC:'#f4f4f4', glasses:1, item:'book', brows:'#e8e8e8' },
  maelle:  { skin:'#d8a07a', cloth:'#8a6a3a', trim:'#5a3a1e', hair:'#6a3a1a', hairS:'braids', hat:'brim', hatC:'#7a5030', feather:'#d8402a' },
};
const H3_FRAME = { y0:-3.3, y1:3.5 };   // zone verticale rendue (unités de tête)

function heroFigure(T, id) {
  const S = H3[id] || H3.egide;
  const g = new T.Group();
  const col = c => new T.Color(c).convertSRGBToLinear();
  const mat = (c, o = {}) => { if (o.emissive) o.emissive = col('#' + o.emissive.getHexString()); return new T.MeshStandardMaterial(Object.assign({ color:col(c), roughness:.55, metalness:0 }, o)); };
  const metal = c => mat(c, { roughness:.3, metalness:.75 });
  const glow = (c, i = 1.4) => mat(c, { emissive:new T.Color(c), emissiveIntensity:i, roughness:.4 });
  const add = (geo, m, x = 0, y = 0, z = 0, sx = 1, sy = 1, sz = 1, parent = g) => { const o = new T.Mesh(geo, m); o.position.set(x, y, z); o.scale.set(sx, sy, sz); parent.add(o); return o; };
  const sph = (r, ws = 32, hs = 24) => new T.SphereGeometry(r, ws, hs);
  const seg = (a, b, r, m, parent = g) => { const A = new T.Vector3(...a), B = new T.Vector3(...b); const len = A.distanceTo(B); const o = new T.Mesh(new T.CylinderGeometry(r, r, len, 20), m); o.position.copy(A).add(B).multiplyScalar(.5); o.quaternion.setFromUnitVectors(new T.Vector3(0, 1, 0), B.clone().sub(A).normalize()); parent.add(o); add(sph(r, 20, 14), m, ...b, 1, 1, 1, parent); return o; };
  const skin = mat(S.skin, { roughness:.6 }), cloth = mat(S.cloth, { roughness:.75 }), trim = mat(S.trim, { roughness:.5 }), hairM = mat(S.hair, { roughness:.8 });
  const W = S.wide || 1, sq = !!S.squishy;
  const headR = sq ? 1.3 : 1, headY = sq ? -.15 : 0;

  // buste et épaules
  add(sph(1), cloth, 0, -2.35, 0, 1.55 * W, 1.25, 1.0);
  add(sph(.62), cloth, -1.25 * W, -1.75, 0, 1, .9, 1); add(sph(.62), cloth, 1.25 * W, -1.75, 0, 1, .9, 1);
  add(new T.TorusGeometry(.62, .1, 12, 32), trim, 0, -1.25, .05, 1, .45, 1).rotation.x = Math.PI / 2;
  if (!sq) seg([0, -1.4, 0], [0, -.7, 0], .36, skin);
  // bras posés vers la table (devant, vers la droite)
  seg([-1.3 * W, -1.9, .1], [-.9 * W, -2.9, .9], .34, cloth); seg([-.9 * W, -2.9, .9], [.1, -2.9, 1.6], .31, cloth); add(sph(.32), skin, .25, -2.9, 1.7);
  seg([1.3 * W, -1.9, .1], [1.25 * W, -2.85, .95], .34, cloth); seg([1.25 * W, -2.85, .95], [1.55 * W, -2.6, 1.35], .31, cloth); add(sph(.32), skin, 1.6 * W, -2.5, 1.4);
  add(new T.TorusGeometry(.33, .07, 10, 24), trim, .05, -2.9, 1.55).rotation.y = Math.PI / 2;

  // tête
  const head = new T.Group(); head.position.set(0, headY, 0); g.add(head);
  add(sph(headR, 40, 32), skin, 0, 0, 0, 1, sq ? .95 : 1.06, 1, head);
  // oreilles
  if (S.ears === 'elf') { for (const s of [-1, 1]) { const e = add(new T.ConeGeometry(.2, .9, 16), skin, s * .98, .25, -.1, 1, 1, .5, head); e.rotation.z = -s * 1.05; } }
  else if (!sq) { add(sph(.22), skin, -.98, 0, 0, .55, 1, .8, head); add(sph(.22), skin, .98, 0, 0, .55, 1, .8, head); }
  // yeux
  const ez = headR * .86, ey = sq ? .05 : .12, ex = sq ? .42 : .36;
  for (const s of [-1, 1]) {
    if (S.eyes === 'glow') { add(sph(.14), glow('#7dffb0', 2.2), s * ex, ey, ez, 1.2, .8, .6, head); continue; }
    add(sph(sq ? .25 : .2), mat('#ffffff', { roughness:.2 }), s * ex, ey, ez - .02, 1, 1.1, .6, head);
    const pc = S.eyes === 'red' ? glow('#e0203a', .9) : S.eyes === 'cyan' ? glow('#6fd8ff', .7) : mat('#1a120c', { roughness:.15 });
    add(sph(sq ? .15 : .11), pc, s * ex + .03, ey - .01, ez + .12, 1, 1.1, .5, head);
    add(sph(.04), glow('#ffffff', 1.5), s * ex + .07, ey + .06, ez + .18, 1, 1, 1, head);
    if (!sq) { const b = add(new T.BoxGeometry(.34, .07, .08), mat(S.brows || S.hair), s * ex, ey + .3, ez - .02, 1, 1, 1, head); b.rotation.z = s * -.12; }
  }
  // nez, bouche, joues
  add(sph(sq ? .1 : .15), mat(S.skin, { roughness:.5 }), .02, sq ? -.15 : -.12, headR * .98, 1, .9, 1, head);
  const mouth = add(new T.TorusGeometry(sq ? .26 : .2, .045, 10, 24, Math.PI), mat(S.lips || '#6a2a1a'), .02, sq ? -.42 : -.42, headR * .9, 1, 1, 1, head); mouth.rotation.z = Math.PI;
  for (const s of [-1, 1]) add(sph(.16), mat('#ff8a9a', { transparent:true, opacity:.45 }), s * (ex + .16), ey - .3, ez - .05, 1, .6, .4, head);

  // cheveux
  const hs = S.hairS;
  if (hs && hs !== 'none' && hs !== 'bald') {
    const capG = new T.SphereGeometry(headR * 1.05, 40, 24, 0, Math.PI * 2, 0, Math.PI * .5);
    add(capG, hairM, 0, .05, -.05, 1, 1.02, 1, head);
    if (hs === 'long') { add(sph(1), hairM, 0, -.9, -.45, 1.15, 1.45, .75, head); add(sph(.4), hairM, -.85, -.55, .25, .6, 1.4, .6, head); add(sph(.4), hairM, .85, -.55, .25, .6, 1.4, .6, head); }
    if (hs === 'braids') for (const s of [-1, 1]) for (let k = 0; k < 4; k++) add(sph(.24 - k * .02), hairM, s * .95, -.25 - k * .38, .1, 1, 1, 1, head);
    if (hs === 'pigtails') for (const s of [-1, 1]) add(sph(.5), hairM, s * 1.35, .05, -.1, .6, 1.1, .8, head);
    if (hs === 'cap') add(sph(.5), hairM, 0, .8, .4, 1.6, .5, 1, head);
  }
  // barbes
  const bm = mat(S.beardC || '#3a2010', { roughness:.85 });
  if (S.beard === 'goatee') { const c = add(new T.ConeGeometry(.22, .6, 16), bm, .02, -.8, .72, 1, 1, 1, head); c.rotation.x = Math.PI; add(new T.TorusGeometry(.22, .06, 8, 20, Math.PI), bm, .02, -.28, .9, 1, .7, 1, head); }
  if (S.beard === 'big') { add(sph(1), bm, 0, -.75, .35, .95, .95, .7, head); add(sph(.3), bm, -.25, -.3, .85, 1, .55, .6, head); add(sph(.3), bm, .25, -.3, .85, 1, .55, .6, head); }
  if (S.beard === 'long') { const c = add(new T.ConeGeometry(.75, 2.4, 24), bm, 0, -1.4, .45, 1, 1, .7, head); c.rotation.x = Math.PI; add(sph(.3), bm, -.22, -.32, .86, 1, .5, .6, head); add(sph(.3), bm, .22, -.32, .86, 1, .5, .6, head); }
  if (S.tusks) for (const s of [-1, 1]) add(new T.ConeGeometry(.08, .32, 12), mat('#f6f0e0'), s * .28, -.42, .88, 1, 1, 1, head);
  if (S.glasses) { for (const s of [-1, 1]) add(new T.TorusGeometry(.2, .03, 8, 24), metal('#c8963e'), s * .36, .12, .98, 1, 1, 1, head); add(new T.BoxGeometry(.25, .03, .03), metal('#c8963e'), 0, .14, 1.0, 1, 1, 1, head); }
  if (S.circlet) { const c = add(new T.TorusGeometry(headR * 1.02, .05, 10, 48), metal(S.circlet), 0, .45, 0, 1, 1, 1, head); c.rotation.x = Math.PI / 2 - .12; add(sph(.1), glow('#9fe0ff', 1), 0, .52, 1.0, 1, 1, .6, head); }
  if (S.goggles) { const b = add(new T.TorusGeometry(headR * 1.02, .07, 10, 48), mat('#5a3b22'), 0, .55, 0, 1, 1, 1, head); b.rotation.x = Math.PI / 2 - .3; for (const s of [-1, 1]) add(new T.TorusGeometry(.26, .08, 12, 24), metal('#c8963e'), s * .42, .78, .95, 1, 1, 1, head); for (const s of [-1, 1]) add(sph(.22), mat('#bfe3ff', { transparent:true, opacity:.7, roughness:.1 }), s * .42, .78, .98, 1, 1, .4, head); }
  if (S.band) { const b = add(new T.TorusGeometry(headR * 1.01, .12, 12, 48), mat(S.band), 0, .55, 0, 1, 1, 1, head); b.rotation.x = Math.PI / 2 - .15; }
  if (S.flame) { add(new T.ConeGeometry(.3, .9, 20), glow('#ffb03a', 1.2), 0, 1.55, .1, 1, 1, 1, head); add(new T.ConeGeometry(.15, .5, 16), glow('#fff2b0', 1.6), 0, 1.4, .25, 1, 1, 1, head); }

  // couvre-chefs
  const hm = mat(S.hatC || '#5a3a1e', { roughness:.7 });
  if (S.hat === 'wizard') { add(new T.CylinderGeometry(1.55, 1.55, .1, 40), hm, 0, .62, 0, 1, 1, 1, head); const c = add(new T.ConeGeometry(.95, 2.6, 32), hm, .15, 1.9, -.1, 1, 1, 1, head); c.rotation.z = -.22; add(new T.TorusGeometry(.93, .08, 10, 32), mat('#f2c14e'), 0, .75, 0, 1, 1, 1, head).rotation.x = Math.PI / 2; add(sph(.13), glow('#ffe14a', 1.2), -.1, 1.6, .7, 1, 1, .5, head); }
  if (S.hat === 'crown') { const ring = add(new T.CylinderGeometry(.82, .86, .32, 32, 1, true), metal(S.hatC), 0, .95, 0, 1, 1, 1, head); ring.material.side = T.DoubleSide; for (let k = 0; k < 7; k++) { const a = k / 7 * Math.PI * 2; add(new T.ConeGeometry(.12, .42, 8), metal(S.hatC), Math.sin(a) * .82, 1.3, Math.cos(a) * .82, 1, 1, 1, head); } add(sph(.11), glow('#e0203a', .8), 0, 1.0, .86, 1, 1, .6, head); }
  if (S.hat === 'horned') { add(new T.SphereGeometry(1.08, 40, 20, 0, Math.PI * 2, 0, Math.PI * .5), metal(S.hatC), 0, .15, 0, 1, 1, 1, head); add(new T.TorusGeometry(1.08, .1, 10, 48), metal('#c8963e'), 0, .2, 0, 1, 1, 1, head).rotation.x = Math.PI / 2; for (const s of [-1, 1]) { const h = add(new T.ConeGeometry(.24, 1.25, 20), mat('#f2ead8', { roughness:.4 }), s * 1.35, .85, 0, 1, 1, 1, head); h.rotation.z = -s * .85; const t = add(new T.ConeGeometry(.12, .5, 16), mat('#f2ead8'), s * 1.82, 1.5, 0, 1, 1, 1, head); t.rotation.z = -s * .25; } }
  if (S.hat === 'hood') { const hood = add(new T.SphereGeometry(1.38, 40, 30, Math.PI * .92, Math.PI * 1.16), hm, 0, .12, -.08, 1, 1.12, 1.05, head); hood.material.side = T.DoubleSide; add(new T.ConeGeometry(.55, 1.1, 24), hm, 0, 1.45, -.6, 1, 1, 1, head).rotation.x = -.7; add(sph(1.3), hm, 0, -1.5, -.3, 1.25, .7, .9, head); }
  if (S.hat === 'brim') { const br = add(new T.CylinderGeometry(1.75, 1.75, .09, 40), hm, 0, .62, 0, 1, 1, 1, head); br.rotation.x = .12; add(new T.CylinderGeometry(.85, 1.0, .75, 32), hm, 0, 1.0, -.03, 1, 1, 1, head); add(new T.CylinderGeometry(1.0, 1.01, .14, 32), mat('#2a1608'), 0, .72, -.03, 1, 1, 1, head); if (S.feather) { const f = add(sph(.25), mat(S.feather), .85, 1.2, -.35, .5, 2.4, .25, head); f.rotation.z = -.6; } }
  if (S.hat === 'chef') { add(new T.CylinderGeometry(.95, .95, .7, 32), hm, 0, .95, 0, 1, 1, 1, head); for (let k = 0; k < 5; k++) { const a = k / 5 * Math.PI * 2; add(sph(.55), hm, Math.sin(a) * .5, 1.55, Math.cos(a) * .5, 1, .8, 1, head); } add(sph(.65), hm, 0, 1.7, 0, 1, .8, 1, head); }

  // objets et compagnons
  if (S.item === 'fireball') { add(sph(.42), glow('#ff8a1a', .9), 1.55 * W, -2.0, 1.4); add(sph(.62), mat('#ff5a1a', { transparent:true, opacity:.45, emissive:new T.Color('#ff3a0a'), emissiveIntensity:.6 }), 1.55 * W, -2.0, 1.4); add(new T.ConeGeometry(.3, .7, 16), glow('#ffb03a', .8), 1.55 * W, -1.5, 1.4); }
  if (S.item === 'orb') { add(sph(.42), glow('#8a5ad8', .8), 1.55, -2.0, 1.35); add(sph(.58), mat('#b48cff', { transparent:true, opacity:.35, emissive:new T.Color('#6a3ab8'), emissiveIntensity:.5 }), 1.55, -2.0, 1.35); }
  if (S.item === 'hammer') { seg([1.6 * W, -3.4, 1.3], [1.6 * W, -1.4, 1.3], .1, mat('#7a4a28')); add(new T.BoxGeometry(.9, .55, .55), metal('#8a8e96'), 1.6 * W, -1.25, 1.3); }
  if (S.item === 'staff') { seg([1.6, -3.6, 1.2], [1.6, 1.2, 1.2], .09, mat('#3a2a1a')); add(sph(.38), mat('#ecead8'), 1.6, 1.5, 1.2, 1, 1.1, 1); for (const s of [-1, 1]) add(sph(.08), glow('#7dffb0', 2), 1.6 + s * .14, 1.55, 1.55); }
  if (S.item === 'book') { add(new T.BoxGeometry(.9, 1.2, .25), mat('#a02a2a'), 1.6, -2.45, 1.4).rotation.y = -.5; add(new T.BoxGeometry(.85, 1.1, .2), mat('#f2ead8'), 1.65, -2.45, 1.35).rotation.y = -.5; }
  if (S.item === 'drumstick') { seg([1.6 * W, -2.8, 1.3], [1.6 * W, -1.9, 1.3], .08, mat('#f2ead8')); add(sph(.42), mat('#a8622a', { roughness:.5 }), 1.6 * W, -1.6, 1.3, 1, 1.3, 1); }
  if (S.item === 'pauldrons') for (const s of [-1, 1]) add(new T.SphereGeometry(.72, 32, 16, 0, Math.PI * 2, 0, Math.PI * .5), metal('#f2c14e'), s * 1.3, -1.6, 0, 1, .8, 1);
  if (S.item === 'dragon') { const d = new T.Group(); d.position.set(-1.35, -1.0, .2); g.add(d); const red = mat('#c8302a'); add(sph(.45), red, 0, 0, 0, 1, .85, 1.2, d); add(sph(.32), red, .35, .45, .3, 1, .9, 1.1, d); add(sph(.06), glow('#ffe14a', 1.5), .45, .55, .58, 1, 1, 1, d); for (const s of [-1, 1]) { const w = add(new T.ConeGeometry(.5, .9, 3), mat('#e85a3a'), s * .45, .3, -.2, 1, 1, .2, d); w.rotation.z = -s * 1.2; } add(new T.ConeGeometry(.08, .3, 8), mat('#f2ead8'), .3, .8, .2, 1, 1, 1, d); }
  // collerette de vampire
  if (S.collar) { add(new T.CylinderGeometry(1.55, .8, 1.5, 32, 1, true, Math.PI * .32, Math.PI * 1.36), mat(S.collar, { side:T.DoubleSide, roughness:.6 }), 0, -.6, -.15); }
  return g;
}

/* rendu des figurines en images ; retourne { id: dataURL } (vide si la 3D n'est pas disponible) */
function renderHeroImages(ids, w = 270, h = 326) {
  const out = {};
  if (typeof THREE === 'undefined') return out;
  const T = THREE;
  let r;
  try { const cv = document.createElement('canvas'); r = new T.WebGLRenderer({ canvas:cv, antialias:true, alpha:true, preserveDrawingBuffer:true }); } catch (e) { return out; }
  try {
    r.setSize(w, h, false); r.setPixelRatio(1);
    r.outputEncoding = T.sRGBEncoding; r.toneMapping = T.ACESFilmicToneMapping; r.toneMappingExposure = .95; r.setClearColor(0x000000, 0);
    const span = H3_FRAME.y1 - H3_FRAME.y0, dist = 16, fov = 2 * Math.atan(span / 2 / dist) * 180 / Math.PI;
    const cam = new T.PerspectiveCamera(fov, w / h, .1, 100); const cy = (H3_FRAME.y0 + H3_FRAME.y1) / 2;
    cam.position.set(0, cy + .6, dist); cam.lookAt(0, cy, 0);
    for (const id of ids) {
      const sc = new T.Scene();
      sc.add(new T.HemisphereLight(0xffe2b8, 0x2a1408, .55));
      const key = new T.DirectionalLight(0xffd29a, 2.2); key.position.set(-5, 6, 7); sc.add(key);
      const fill = new T.DirectionalLight(0xffb070, .35); fill.position.set(-6, -2, 3); sc.add(fill);
      const rim = new T.DirectionalLight(0x6fe8ff, 2.4); rim.position.set(7, 3, -2); sc.add(rim);
      const holo = new T.PointLight(0x5fd8ff, 1.2, 12); holo.position.set(4, -1.5, 3); sc.add(holo);
      const fig = heroFigure(T, id); fig.rotation.y = .55; fig.rotation.x = .06; sc.add(fig);
      r.render(sc, cam);
      out[id] = r.domElement.toDataURL('image/png');
      sc.traverse(o => { if (o.geometry) o.geometry.dispose(); if (o.material) o.material.dispose(); });
    }
  } catch (e) { /* pas de 3D : on garde les portraits dessinés */ }
  try { r.dispose(); r.forceContextLoss(); } catch (e) {}
  return out;
}

/* rendu progressif : un héros à la fois, pour ne pas figer la page */
function heroRenderer(w = 270, h = 326) {
  if (typeof LITE !== 'undefined' && LITE) { w = 180; h = 217; }
  if (typeof THREE === 'undefined') return null;
  const T = THREE; let r;
  try { r = new T.WebGLRenderer({ canvas:document.createElement('canvas'), antialias:true, alpha:true, preserveDrawingBuffer:true }); } catch (e) { return null; }
  r.setSize(w, h, false); r.setPixelRatio(1); r.outputEncoding = T.sRGBEncoding; r.toneMapping = T.ACESFilmicToneMapping; r.toneMappingExposure = .95; r.setClearColor(0x000000, 0);
  const span = H3_FRAME.y1 - H3_FRAME.y0, dist = 16, fov = 2 * Math.atan(span / 2 / dist) * 180 / Math.PI, cy = (H3_FRAME.y0 + H3_FRAME.y1) / 2;
  const cam = new T.PerspectiveCamera(fov, w / h, .1, 100); cam.position.set(0, cy + .6, dist); cam.lookAt(0, cy, 0);
  return {
    render(id) {
      const sc = new T.Scene();
      sc.add(new T.HemisphereLight(0xffe2b8, 0x2a1408, .55));
      const key = new T.DirectionalLight(0xffd29a, 2.2); key.position.set(-5, 6, 7); sc.add(key);
      const fill = new T.DirectionalLight(0xffb070, .35); fill.position.set(-6, -2, 3); sc.add(fill);
      const rim = new T.DirectionalLight(0x6fe8ff, 2.4); rim.position.set(7, 3, -2); sc.add(rim);
      const holo = new T.PointLight(0x5fd8ff, 1.2, 12); holo.position.set(4, -1.5, 3); sc.add(holo);
      const fig = heroFigure(T, id); fig.rotation.y = .55; fig.rotation.x = .06; sc.add(fig);
      r.render(sc, cam); const url = r.domElement.toDataURL('image/png');
      sc.traverse(o => { if (o.geometry) o.geometry.dispose(); if (o.material) o.material.dispose(); });
      return url;
    },
    done() { try { r.dispose(); r.forceContextLoss(); } catch (e) {} },
  };
}
