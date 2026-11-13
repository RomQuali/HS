() => {
  window.CS_NOANIM = 1;
  const COV = {};   // id|k -> {tr, calls, changed}
  const rec = (m, e, ch) => { if (!m || !m.c || !e || !e.k) return; const id = m.c + '|' + e.k; const o = COV[id] = COV[id] || { calls:0, changed:0 }; o.calls++; if (ch) o.changed++; };
  const ERR = [];
  const digP = (G, p) => { try { return JSON.stringify(p, (k, v) => k === '_hin' ? undefined : v) + '|' + JSON.stringify(G.ps.map(q => [q.hp, q.g, q.bd.length, q.bd.map(m => m.a + '/' + m.h + (m.f || ''))])) + '|' + JSON.stringify(G.pool || 0).length; } catch (e) { return String(Math.random()); } };
  const digS = S => { try { return JSON.stringify([S.sides.map(a => a.map(m => [m.u, m.c, m.a, m.h, m.f, m.gag, m.tf, m.x && m.x.length, m.hx, m.spc, m.sl, m.dn])), S.pf, S.inc, S.gag, S.perm, S.gl, S.don, S.hb, S.hx, S.dead.map(d => d.length), S.uid, S.fz, S.kk, S.chill, S.ck, S.ki]); } catch (e) { return String(Math.random()); } };
  const r0 = runRecruit0, c0 = runCombat;
  runRecruit0 = function (G, p, m, e, ctx) { const a = digP(G, p); let out; try { out = r0.apply(this, arguments); } catch (x) { ERR.push('recruit ' + (m && m.c) + ' ' + (e && e.k) + ' : ' + String(x && x.stack || x).slice(0, 200)); return; } rec(m, e, digP(G, p) !== a); return out; };
  runCombat = function (S, s, m, e, pos, ctx) { const a = digS(S); let out; try { out = c0.apply(this, arguments); } catch (x) { ERR.push('combat ' + (m && m.c) + ' ' + (e && e.k) + ' : ' + String(x && x.stack || x).slice(0, 200)); return; } rec(m, e, digS(S) !== a); return out; };
  const trU = {}; (SET.univ || []).forEach(u => (u.tribes || []).forEach(t => trU[t] = u.n));
  const PLAY = ['South Park', 'Rick et Morty', 'Les Simpson', 'Dragon Ball', 'Naruto'];
  const ids = Object.keys(C).filter(id => PLAY.includes(trU[CD(id).tr]));
  const byU = {}; ids.forEach(id => (byU[trU[CD(id).tr]] = byU[trU[CD(id).tr]] || []).push(id));
  const big = (m, a, h) => { m.a = a; m.h = h; return m; };
  const log = [];
  const act = (a) => { try { return OPS[a.t](H.G, H.G.ps[0], a); } catch (x) { ERR.push('OPS.' + a.t + ' [' + CUR + '] : ' + String(x && x.stack || x).slice(0, 220)); return false; } };
  let CUR = '';
  const step = (name, fn) => { try { fn(); } catch (x) { ERR.push(name + ' [' + CUR + '] : ' + String(x && x.stack || x).slice(0, 220)); } };
  for (const U of PLAY) {
    const list = byU[U] || [];
    for (const id of list) {
      CUR = id;
      for (const mode of [0, 1]) {   // 0 : la carte est fragile (elle meurt) ; 1 : la carte est forte (elle survit et gagne)
        step('start', () => { V.mp = null; V.univSel = [U]; startSolo(); clearInterval(H.tick); H.G.ps.forEach(p => { p.hero = p.hero || p.ho[0]; }); finishHero(); clearInterval(H.tick); });
        const G = H.G, me = G.ps[0], cd = CD(id);
        const same = list.filter(x => x !== id && CD(x).tr === cd.tr && !CD(x).tok), other = list.filter(x => CD(x).tr !== cd.tr && !CD(x).tok);
        step('setup', () => {
          me.t = 6; me.g = 30; me.mg = 10; me.ck = 20; me.ki = 20; me.pf = 5; me.hp = 40;
          me.bd = [same[0], same[1], other[0], same[2]].filter(Boolean).map(x => big(mk(x, 0), 3, mode ? 40 : 6));
          me.hd = [mk(id, 0)];
          G.ps.forEach((q, k) => { if (k) { q.bd = other.concat(same).slice(k, k + 5).map(x => big(mk(x, 0), mode ? 2 : 9, mode ? 3 : 14)); q.hp = 40; } });
        });
        step('play', () => { act({ t:'play', i:0, to:2 }); if (me.disc) act({ t:'pick', i:0 }); });
        const X = () => me.bd.find(m => m.c === id);
        step('boost', () => { const x = X(); if (x && mode) { x.a = Math.max(x.a, 12); x.h = Math.max(x.h, 60); } });
        step('play2', () => { const o = same[3] || other[1]; if (o && me.bd.length < 7) { me.hd.push(mk(o, 0)); act({ t:'play', i:me.hd.length - 1, to:me.bd.length }); if (me.disc) act({ t:'pick', i:0 }); } });
        step('buy', () => { if (me.sh.length && me.hd.length < 10) act({ t:'buy', i:0 }); });
        step('spell', () => { if (me.sp) { act({ t:'buysp', i:0 }); const k = me.hd.findIndex(c => c.sp); if (k >= 0) { const x = X(); act({ t:'cast', i:k, tg:x ? me.bd.indexOf(x) : 0 }); } if (me.disc) act({ t:'pick', i:0 }); } });
        step('roll', () => act({ t:'roll' }));
        step('mech', () => { const x = X(); if (!x) return; const i = me.bd.indexOf(x); act({ t:'ckm', i }); act({ t:'med', i }); act({ t:'tf', i }); act({ t:'portal', i: me.bd.indexOf(X() || x) }); (typeof DB_FUS !== 'undefined' ? DB_FUS : []).forEach(F => { const y = X(); if (y) act({ t:'fuse', i:me.bd.indexOf(y), f:F.id }); }); });
        step('pow', () => { act({ t:'pow' }); if (me.disc) act({ t:'pick', i:0 }); });
        step('sell', () => { if (mode && me.bd.length > 2) { const k = me.bd.findIndex(m => m.c !== id); if (k >= 0) act({ t:'sell', z:'bd', i:k }); } });
        for (let rd = 0; rd < 2; rd++) {
          step('endRecruit', () => { if (H.G.ph === 'recruit') endRecruit(); });
          step('endCombat', () => { if (H.G.ph === 'combat') endCombat(); clearInterval(H.tick); });
          if (H.G.ph !== 'recruit' || !me.al) break;
          step('again', () => { me.hp = 40; me.g = 20; me.ck = 20; me.ki = 20; if (!X() && me.bd.length < 7) { me.hd.push(mk(id, 0)); act({ t:'play', i:me.hd.length - 1, to:1 }); } if (me.disc) act({ t:'pick', i:0 }); const x = X(); if (x) { const i = me.bd.indexOf(x); act({ t:'tf', i }); act({ t:'med', i }); } });
        }
        if (!mode) step('sellX', () => { if (H.G.ph === 'recruit') { const x = X(); if (x) act({ t:'sell', z:'bd', i:me.bd.indexOf(x) }); else { me.hd.push(mk(id, 0)); if (me.bd.length >= 7) me.bd.pop(); act({ t:'play', i:me.hd.length - 1, to:0 }); const y = X(); if (y) act({ t:'sell', z:'bd', i:me.bd.indexOf(y) }); } } });
      }
    }
  }
  clearInterval(H.tick);
  // bilan
  const rows = [];
  ids.forEach(id => (CD(id).fxAll || []).forEach(e => { const T = ET[e.k]; const o = COV[id + '|' + e.k] || { calls:0, changed:0 }; rows.push({ id, n:CD(id).n, u:trU[CD(id).tr], k:e.k, tr:T ? T.tr : '?', tx:T ? T.txt(e, 1) : '', calls:o.calls, changed:o.changed }); }));
  return { rows, err:[...new Set(ERR)].slice(0, 40), nerr:ERR.length, n:ids.length };
}
