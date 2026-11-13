(UNIVS) => {
  window.CS_NOANIM = 1;
  const ERR = []; let LOG = null;   // LOG : { 'c|k' : { calls, changed } } pour la fenêtre en cours
  const digP = (G, p) => { try { return JSON.stringify(p, (k, v) => k === '_hin' ? undefined : v) + '|' + JSON.stringify(G.ps.map(q => [q.hp, q.g, q.bd.length, q.bd.map(m => m.a + '/' + m.h + (m.f || ''))])); } catch (e) { return String(Math.random()); } };
  const digS = S => { try { return JSON.stringify([S.sides.map(a => a.map(m => [m.u, m.c, m.a, m.h, m.f, m.gag, m.tf, m.x && m.x.length, m.hx, m.spc, m.sl, m.dn])), S.pf, S.inc, S.gag, S.perm, S.gl, S.don, S.hb, S.hx, S.dead.map(d => d.length), S.uid, S.fz, S.kk, S.chill, S.ck, S.ki, S.heal]); } catch (e) { return String(Math.random()); } };
  const rec = (m, e, ch) => { if (!LOG || !m || !m.c || !e || !e.k) return; const id = m.c + '|' + e.k, o = LOG[id] = LOG[id] || { calls:0, changed:0 }; o.calls++; if (ch) o.changed++; };
  const r0 = runRecruit0, c0 = runCombat;
  runRecruit0 = function (G, p, m, e) { const a = digP(G, p); let out; try { out = r0.apply(this, arguments); } catch (x) { ERR.push('recrutement ' + (m && m.c) + ' ' + (e && e.k) + ' : ' + String(x).slice(0, 160)); return; } if (p === H.G.ps[0]) rec(m, e, digP(G, p) !== a); return out; };
  runCombat = function (S, s, m, e) { const a = digS(S); let out; try { out = c0.apply(this, arguments); } catch (x) { ERR.push('combat ' + (m && m.c) + ' ' + (e && e.k) + ' : ' + String(x).slice(0, 160)); return; } rec(m, e, digS(S) !== a); return out; };
  const rows = [];
  for (const U of UNIVS) {
    V.mp = null; V.univSel = [U]; startSolo(); clearInterval(H.tick); const list = Object.keys(H.G.pool);
    for (const id of list) {
      const cd = CD(id), fx = (cd.fxAll || []).filter(e => ET[e.k] && !['pas', 'aura', undefined].includes(ET[e.k].tr)); if (!fx.length) continue;
      const res = {}; fx.forEach(e => { res[e.k] = { tr:ET[e.k].tr, strong:[0, 0, 0], fragile:[0, 0, 0], mixed:[0, 0, 0], changed:0 }; });
      for (const mode of ['strong', 'fragile', 'mixed']) {
        try {
          V.mp = null; V.univSel = [U]; startSolo(); clearInterval(H.tick); H.G.ps.forEach(p => { p.hero = p.hero || p.ho[0]; }); finishHero(); clearInterval(H.tick);
          let G = H.G, me = G.ps[0]; const same = list.filter(x => x !== id && CD(x).tr === cd.tr), other = list.filter(x => CD(x).tr !== cd.tr);
          const extra = [...new Set(fx.map(e => e.card).filter(c => c && C[c]))].slice(0, 2).map(c => mk(c, 0));
          me.t = 6; me.bd = [mk(id, 0)].concat(mode === 'mixed' ? [mk(other[0], 0)] : []).concat([mk(same[0], 0), mk(same[1], 0)]).concat(extra); me.hd = []; const X = me.bd[0], AL = me.bd.slice(1);
          const trs = fx.map(e => ET[e.k].tr);
          for (let turn = 0; turn < 3; turn++) {
            G = H.G; me = G.ps[0]; me.hp = 40; me.g = 60; me.hd = me.hd.filter(x => false); LOG = {};
            me.bd = [X].concat(AL);   // plateau de base
            const S = mode === 'strong', MX = mode === 'mixed';
            const stats = () => [X].concat(AL).forEach(m => { const big = S || (MX && m === X); m.a = big ? 3 : 1; m.h = big ? 60 : 1; }); stats();
            if (!S) { const a1 = AL[MX ? 1 : 0]; if (!has(a1, 's')) addF(a1, 's'); if (trs.includes('shield') && !has(X, 's')) addF(X, 's'); if (trs.includes('reborn') && !has(X, 'r')) addF(X, 'r'); }
            // achats (acheter, dépenser, arrivée en main), poses (jouer un autre), ventes
            for (let b = 0; b < 3; b++) { me.sh = [mk(same[2] || same[0], 0)]; if (OPS.buy(G, me, { i:0 })) { const hi = me.hd.findIndex(x => !x.sp); if (hi >= 0 && OPS.play(G, me, { i:hi, pos:me.bd.length })) { if (me.disc) OPS.pick(G, me, { i:0 }); if (me.cho) OPS.choose(G, me, { i:0 }); const bi = me.bd.findIndex(m => m !== X && !AL.includes(m)); if (bi >= 0) OPS.sell(G, me, { i:bi }); } } }
            me.hd = me.hd.filter(x => x.sp);
            // une copie en main : un autre serviteur est posé (effets « en main »), puis la copie est posée (Cri de guerre) et vendue
            const cp = mk(id, 0); me.hd.push(cp); me.sh = [mk(same[2] || same[0], 0)]; me.g = 60;
            if (OPS.buy(G, me, { i:0 })) { const hi = me.hd.findIndex(x => !x.sp && x !== cp); if (hi >= 0 && OPS.play(G, me, { i:hi, pos:me.bd.length })) { const bi = me.bd.findIndex(m => m !== X && !AL.includes(m)); if (bi >= 0) OPS.sell(G, me, { i:bi }); } }
            me.sh = [mk(same[2] || same[0], 0), mk(other[1], 0)]; const ci = me.hd.indexOf(cp); if (ci >= 0 && OPS.play(G, me, { i:ci, pos:me.bd.length })) { if (me.disc) OPS.pick(G, me, { i:0 }); if (me.cho) OPS.choose(G, me, { i:0 }); const bi = me.bd.indexOf(cp); if (bi >= 0) OPS.sell(G, me, { i:bi }); }
            // un Donut posé sur la carte (Les Simpson)
            if (U === 'Les Simpson') { me.hd = me.hd.filter(x => false); giveDonut(me, 1); const di = me.hd.findIndex(x => x.sp === DON); if (di >= 0) OPS.cast(G, me, { i:di, tg:me.bd.indexOf(X) }); }
            me.hd = []; me.bd = [X].concat(AL).concat(me.bd.filter(m => m !== X && !AL.includes(m)).slice(0, 0));
            stats();
            G.ps.forEach((q, k) => { if (k) { q.bd = [0, 1, 2].map(j => { const m = mk(other[j], 0); m.a = S ? 1 : MX ? 2 : 9; m.h = S ? 3 : MX ? 6 : 30; m.f = ''; return m; }); q.hp = 40; } });
            endRecruit(); clearInterval(H.tick); endCombat(); clearInterval(H.tick);
            fx.forEach(e => { const o = LOG[id + '|' + e.k]; if (o) { res[e.k][mode][turn] = o.calls; res[e.k].changed += o.changed; } });
            if (H.G.ph !== 'recruit') break;
          }
        } catch (x) { ERR.push(id + ' ' + mode + ' : ' + String(x && x.stack || x).slice(0, 200)); }
      }
      LOG = null;
      for (const k in res) rows.push(Object.assign({ u:U, c:id, n:cd.n, k, txt:fxText(fx.find(e => e.k === k)) }, res[k]));
    }
  }
  return { rows, err:ERR };
}
