() => {
  window.CS_NOANIM = 1;
  const COV = {}, ERR = [], OUT = { spec:{} };
  const rec = (m, e, ch) => { if (!m || !m.c || !e || !e.k) return; const id = m.c + '|' + e.k; const o = COV[id] = COV[id] || { calls:0, changed:0 }; o.calls++; if (ch) o.changed++; };
  const digP = (G, p) => { try { return JSON.stringify(p, (k, v) => k === '_hin' ? undefined : v) + '|' + JSON.stringify(G.ps.map(q => [q.hp, q.g, q.bd.map(m => m.a + '/' + m.h + (m.f || ''))])); } catch (e) { return String(Math.random()); } };
  const digS = S => { try { return JSON.stringify([S.sides.map(a => a.map(m => [m.u, m.c, m.a, m.h, m.f, m.gag, m.x && m.x.length, m.hx, m.spc])), S.pf, S.inc, S.gag, S.perm, S.gl, S.don, S.hb, S.hx, S.dead.map(d => d.length), S.uid]); } catch (e) { return String(Math.random()); } };
  const r0 = runRecruit0, c0 = runCombat;
  runRecruit0 = function (G, p, m, e, ctx) { const a = digP(G, p); let out; try { out = r0.apply(this, arguments); } catch (x) { ERR.push('recruit ' + (m && m.c) + ' ' + (e && e.k) + ' : ' + String(x && x.stack || x).slice(0, 200)); return; } rec(m, e, digP(G, p) !== a); return out; };
  runCombat = function (S, s, m, e, pos, ctx) { const a = digS(S); let out; try { out = c0.apply(this, arguments); } catch (x) { ERR.push('combat ' + (m && m.c) + ' ' + (e && e.k) + ' : ' + String(x && x.stack || x).slice(0, 200)); return; } rec(m, e, digS(S) !== a); return out; };
  const trU = {}; (SET.univ || []).forEach(u => (u.tribes || []).forEach(t => trU[t] = u.n));
  const PLAY = ['South Park', 'Rick et Morty', 'Les Simpson', 'Dragon Ball', 'Naruto'];
  const rnd = mulberry(4242), pick = a => a[Math.floor(rnd() * a.length)];
  const big = (m, a, h) => { m.a = a; m.h = h; return m; };
  const COMBAT = ['soc', 'atk', 'aatk', 'surv', 'dr', 'die', 'shield', 'reborn'];
  for (const U of PLAY) {
    V.mp = null; V.univSel = [U]; startSolo(); clearInterval(H.tick); H.G.ps.forEach(p => { p.hero = p.hero || p.ho[0]; }); finishHero(); clearInterval(H.tick);
    const G = H.G, me = G.ps[0], mx = G.mx || {};
    const all = Object.keys(C).filter(id => trU[CD(id).tr] === U), inPool = all.filter(id => id in G.pool || CD(id).tok);
    for (const id of inPool) {
      const cd = CD(id), same = all.filter(x => x !== id && CD(x).tr === cd.tr), oth = all.filter(x => CD(x).tr !== cd.tr);
      const fx = cd.fxAll || [];
      // --- combat : 14 configurations (seul, entouré de sa famille, mélangé ; fragile ou solide ; ennemis faibles ou forts)
      if (fx.some(e => ET[e.k] && COMBAT.includes(ET[e.k].tr))) for (let c = 0; c < 14; c++) {
        try {
          const strong = c % 2, alone = c === 12 || c === 13;
          const allies = alone ? [] : (c < 6 ? same.slice(c, c + 5) : Array.from({ length:5 }, () => pick(c % 3 ? all : same.length ? same : all))).filter(x => x && x !== id).map(x => big(mk(x, 0), 3, strong ? 30 : 4));
          const X = mk(id, 0); if (strong) { X.a = Math.max(X.a, 6); X.h = 60; } else if (c % 4 === 0) X.h = 1;
          const A = allies.slice(0, 2).concat([X], allies.slice(2)).slice(0, 7);
          const B = Array.from({ length:c % 3 + 3 }, (_, i) => big(mk(pick(oth.length ? oth : all), 0), strong ? 4 : 9, strong ? 12 : 25));
          simulate(A, B, 100 + c, 3, 3, null, mx);
        } catch (x) { ERR.push('simulate ' + id + ' : ' + String(x && x.stack || x).slice(0, 220)); }
      }
      // --- fin de tour, début de tour, victoire, combo : déclenchés directement sur 6 plateaux différents
      for (let c = 0; c < 6; c++) {
        try {
          me.bd = [mk(id, 0)].concat((c < 3 ? same.slice(c * 2, c * 2 + 5) : Array.from({ length:5 }, () => pick(all))).filter(Boolean).map(x => mk(x, 0))).slice(0, 7);
          me.hd = [mk(pick(all), 0)]; me.g = 5; me.ck = 2; me.ki = 2; me.pf = 1; me.hp = 30; me.disc = null; me.bt = 2; me.btN = 2; me.lastCombo = ['feu', 'vent', 'eau', 'terre', 'foudre'].slice(c % 4, c % 4 + 2);
          const X = me.bd[0];
          for (const tr of ['eot', 'sot', 'combo', 'cast', 'roll', 'up', 'pow', 'sell', 'buy', 'don', 'donc', 'spend', 'hand']) fxOf(X, tr).forEach(e => runRecruit(G, me, X, e, me.bd[1]));
          const d0 = digP(G, me); winUp(me); const ch = digP(G, me) !== d0; fx.forEach(e => { if (ET[e.k] && ET[e.k].tr === 'win') rec(X, e, ch); });
        } catch (x) { ERR.push('direct ' + id + ' : ' + String(x && x.stack || x).slice(0, 220)); }
      }
      // --- cri de guerre joué sur 4 plateaux
      if (fx.some(e => ET[e.k] && ['bc', 'play', 'hplay'].includes(ET[e.k].tr))) for (let c = 0; c < 4; c++) {
        try { me.bd = (c < 2 ? same.slice(c, c + 4) : Array.from({ length:4 }, () => pick(all))).filter(Boolean).map(x => mk(x, 0)); me.hd = [mk(id, 0), mk(id, 0)]; me.g = 10; me.disc = null; me.bt = 3; me.btN = 3; me.bought = 3;
          OPS.play(G, me, { t:'play', i:0, to:1 }); me.disc = null;
          // « quand tu joues » / « dans ta main » : on joue ensuite chaque carte de la même famille
          same.slice(0, 6).forEach(x => { if (me.bd.length >= 7) me.bd.pop(); me.hd.push(mk(x, 0)); OPS.play(G, me, { t:'play', i:me.hd.length - 1, to:0 }); me.disc = null; });
        } catch (x) { ERR.push('play ' + id + ' : ' + String(x && x.stack || x).slice(0, 220)); }
      }
    }
    // ---------- cas particuliers ----------
    const S = OUT.spec, t = (k, v) => { S[k] = v; };
    const fresh = (ids, opt = {}) => { me.bd = ids.map(x => mk(x, 0)); me.hd = []; me.ki = 30; me.ck = 30; me.g = 30; me.disc = null; Object.assign(me, opt); return me.bd; };
    if (U === 'Dragon Ball') {
      // transformations : chaque carte, chaque palier
      all.filter(id => tfOf(mk(id, 0))).forEach(id => { try { const [m] = fresh([id, 'd_vegeta', 'd_raditz'].filter((x, i, a) => a.indexOf(x) === i)); const T = tfOf(m); const st = []; const v0 = me.bd.filter(o => o !== m).map(o => o.a + o.h).join();
        for (let k = 0; k < T.st.length; k++) { const a0 = m.a, h0 = m.h, ki0 = me.ki; const ok = OPS.tf(G, me, { i:me.bd.indexOf(m) }); st.push(ok && m.a - a0 === T.st[k].a && m.h - h0 === T.st[k].h && ki0 - me.ki === tfCost(Object.assign({}, me, { bd:me.bd }), Object.assign({}, m, { tf:k })) && (!T.st[k].kw || [...T.st[k].kw].every(f => (m.f || '').includes(f))) ? 'ok' : 'KO(' + ok + ' ' + (m.a - a0) + '/' + (m.h - h0) + ' ki' + (ki0 - me.ki) + ')'); }
        const extra = OPS.tf(G, me, { i:me.bd.indexOf(m) }); t('tf ' + id, st.join(',') + (extra ? ' KO palier en trop' : '') + (id !== 'd_vegeta' && id !== 'd_raditz' && me.bd.filter(o => o !== m).map(o => o.a + o.h).join() === v0 ? ' KO rivalité' : '')); } catch (x) { t('tf ' + id, 'ERR ' + x); } });
      // fusions
      DB_FUS.forEach(F => { try { fresh([F.a, F.b]); const sa = me.bd[0].a + me.bd[1].a, sh = me.bd[0].h + me.bd[1].h, ki0 = me.ki; const ok = OPS.fuse(G, me, { i:0, f:F.id }); const r = me.bd[0];
        t('fus ' + F.id, ok && me.bd.length === 1 && r.c === F.r && r.a === sa + F.bo && r.h === sh + F.bo && ki0 - me.ki === F.c ? 'ok' : 'KO ' + JSON.stringify([ok, me.bd.map(m => m.c + ' ' + m.a + '/' + m.h), sa, sh, F.bo, ki0 - me.ki])); } catch (x) { t('fus ' + F.id, 'ERR ' + x); } });
      // cartes annonçant une fusion : la fusion existe-t-elle ?
      all.forEach(id => (CD(id).fxAll || []).filter(e => e.k === 'fus').forEach(e => { const F = DB_FUS.find(f => (f.a === id && f.b === e.p) || (f.b === id && f.a === e.p)); t('fusdef ' + id + '+' + e.p, F && (F.r === e.r || F.r === e.r2) ? 'ok' : (DB_FUS.some(f => (f.a === id && f.b === e.p) || (f.b === id && f.a === e.p)) ? 'ok' : 'KO pas de fusion pour ' + id + '+' + e.p + ' → ' + e.r)); }));
      // passifs
      { fresh(['d_kame']); const sp = Object.values(SPELLS).find(s => s.kc > 1); const c1 = kiCost(me, sp); me.bd = []; const c0 = kiCost(me, sp); t('pas_tkc d_kame', c0 - c1 === 1 ? 'ok' : 'KO ' + c0 + '→' + c1); }
      { const [k, v] = fresh(['d_roivegeta', 'd_vegeta']); const c1 = tfCost(me, v); me.bd = [v]; const c0 = tfCost(me, v); t('pas_tfc d_roivegeta', c0 - c1 === 1 ? 'ok' : 'KO ' + c0 + '→' + c1); }
    }
    if (U === 'Naruto') {
      all.filter(id => id in G.pool && (CD(id).fxAll || []).some(e => e.k === 'ckm')).forEach(id => { try { const [m] = fresh([id, all.find(x => x !== id && x in G.pool)]); const d0 = digP(G, me), ck0 = me.ck; const ok = OPS.ckm(G, me, { i:0 }); const again = OPS.ckm(G, me, { i:me.bd.indexOf(m) });
        t('ckm ' + id, ok && m.awk && me.ck < ck0 && digP(G, me) !== d0 && !again ? 'ok' : 'KO ' + JSON.stringify([ok, m.awk, ck0 - me.ck, again])); } catch (x) { t('ckm ' + id, 'ERR ' + x); } });
    }
    if (U === 'Rick et Morty' || U === 'South Park' || U === 'Les Simpson') {
      const N = (a, h, x) => { const m = mk(all.find(z => !(CD(z).fxAll || []).length) || all[0], 0); m.a = a; m.h = h; m.f = ''; m.x = x; return m; };
      all.forEach(id => (CD(id).fxAll || []).forEach(e => { try {
        if (e.k === 'aura_soc') { const run = w => { const A = [N(1, 50, [{ k:'soc_self', a:1, h:0 }])].concat(w ? [big(mk(id, 0), 0, 50)] : [N(0, 50)]); const r = simulate(A, [N(0, 500)], 1, 1, 1, null, mx); const f = r.frames.find((q, i) => i > 0 && q.s[0].length); return f ? f.s[0][0].a : 'vide:' + JSON.stringify(r.frames.map(q => q.s.map(z => z.length))); }; const a = run(0), b = run(1); t('aura_soc ' + id, a === 2 && b === 3 ? 'ok' : 'KO sans ' + a + ' avec ' + b); }
        if (e.k === 'aura_dr') { const run = w => { const A = [N(1, 1, [{ k:'dr_buff_all', a:1, h:0, tb:'' }]), N(0, 500)].concat(w ? [big(mk(id, 0), 0, 500)] : []); const r = simulate(A, [N(5, 500)], 1, 1, 1, null, mx); const f = r.frames[r.frames.length - 1].s[0]; return f[0].a; }; const a = run(0), b = run(1); t('aura_dr ' + id, a === 1 && b === 2 ? 'ok' : 'KO sans ' + a + ' avec ' + b); }
        if (e.k === 'aura_bc') { const bcid = all.find(z => (CD(z).fxAll || []).some(q => q.k === 'bc_buff_tribe' || q.k === 'bc_self' || q.k === 'bc_buff_rand') && z in G.pool); const run = w => { fresh(w ? [id, all.find(z => CD(z).tr === CD(bcid).tr && z !== bcid)] : [all.find(z => CD(z).tr === CD(bcid).tr && z !== bcid)]); me.hd = [mk(bcid, 0)]; const s0 = me.bd.reduce((q, m) => q + m.a + m.h, 0); OPS.play(G, me, { i:0, to:me.bd.length }); me.disc = null; return me.bd.reduce((q, m) => q + m.a + m.h, 0) - s0 - CD(bcid).a - CD(bcid).h; }; const a = run(0), b = run(1); t('aura_bc ' + id + ' (' + bcid + ')', a > 0 && b === 2 * a ? 'ok' : 'KO sans ' + a + ' avec ' + b); }
        if (e.k === 'cleave') { const A = [big(mk(id, 0), 3, 500)], B = [N(0, 100), N(0, 100, null), N(0, 100)]; B[1].f = 't'; const r = simulate(A, B, 1, 1, 1, null, mx); const f = r.frames.find(q => q.at && q.at === r.frames[0].s[0][0].u), k = r.frames.indexOf(f), nx = r.frames[k + 1].s[1].map(m => m.h); t('cleave ' + id, nx.join() === '97,97,97' ? 'ok' : 'KO ' + nx.join()); }
        if (e.k === 'magnet') { const host = all.find(z => CD(z).tr === CD(id).tr && z !== id && z in G.pool && !(CD(z).fxAll || []).some(q => q.k === 'magnet')); fresh([host]); const h0 = me.bd[0], sa = h0.a + CD(id).a, sh = h0.h + CD(id).h; me.hd = [mk(id, 0)]; OPS.play(G, me, { i:0, to:0 }); t('magnet ' + id, me.bd.length === 1 && me.bd[0].a === sa && me.bd[0].h === sh ? 'ok' : 'KO ' + JSON.stringify(me.bd.map(m => m.c + ' ' + m.a + '/' + m.h)) + ' attendu ' + sa + '/' + sh);
          fresh([all.find(z => CD(z).tr !== CD(id).tr && z in G.pool)]); me.hd = [mk(id, 0)]; OPS.play(G, me, { i:0, to:0 }); t('magnet-autre-famille ' + id, me.bd.length === 2 ? 'ok' : 'KO fusionne hors famille'); }
        if (e.k === 'pas_kk') { fresh([id]); const m = me.bd[0], a0 = m.a; lawsAfterFight(G, me, { w:0, dmg:0, dead:[['si_kang', 'si_kodos'], []], alive:[[id], []], frames:[] }, 0); t('pas_kk ' + id, m.a - a0 === 2 && me.kk === 2 ? 'ok' : 'KO +' + (m.a - a0) + ' kk=' + me.kk); me.kk = 0; }
      } catch (x) { t('special ' + id + ' ' + e.k, 'ERR ' + String(x && x.stack || x).slice(0, 300)); } }));
    }
  }
  clearInterval(H.tick);
  const rows = [];
  PLAY.forEach(U => Object.keys(C).filter(id => trU[CD(id).tr] === U && !C[id].comp).forEach(id => (CD(id).fxAll || []).forEach(e => { const T = ET[e.k]; const o = COV[id + '|' + e.k] || { calls:0, changed:0 }; rows.push({ id, n:CD(id).n, u:U, k:e.k, tr:T ? T.tr : '?', tx:T ? T.txt(e, 1) : '', calls:o.calls, changed:o.changed }); })));
  OUT.rows = rows; OUT.err = [...new Set(ERR)].slice(0, 40); OUT.nerr = ERR.length; return OUT;
}
