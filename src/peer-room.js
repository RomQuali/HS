/* =====================================================================
   VERSION AUTONOME — réseau direct entre appareils (WebRTC via PeerJS).
   Imite le petit sous-ensemble du canal « room » de claude.ai que le
   jeu utilise : l'hôte réserve l'identifiant de la partie, les joueurs
   s'y connectent. Aucun compte n'est nécessaire.
   ===================================================================== */
window.STANDALONE = true;
(function () {
  const PREFIX = 'meleetaverne-';
  const lobby = {
    connected:() => true,
    onConnection:f => { setTimeout(() => f(true), 0); return () => {}; },
    onPeers:() => () => {},
    presence:async () => {},
    peers:() => [],
    join:name => openRoom(name),
  };
  function openRoom(name) {
    return new Promise((resolve, reject) => {
      if (typeof Peer === 'undefined') { reject({ code:'upstream_error' }); return; }
      const hostId = PREFIX + name;
      let settled = false;
      const done = (fn, v) => { if (!settled) { settled = true; fn(v); } };
      const p = new Peer(hostId, { debug:0 });
      p.on('open', () => done(resolve, hostRoom(p, name)));
      p.on('error', err => {
        if (err && err.type === 'unavailable-id') { try { p.destroy(); } catch (e) {} clientRoom(name, hostId).then(r => done(resolve, r), e => done(reject, e)); }
        else if (!settled) { try { p.destroy(); } catch (e) {} done(reject, { code:'upstream_error' }); }
      });
      setTimeout(() => done(reject, { code:'upstream_error' }), 15000);
    });
  }
  const mkPeer = (peer, presence, isMe) => ({ peer, by:null, isMe, sameTab:isMe, kind:'viewer', guest:false, presence:presence || {}, updatedAt:Date.now() });

  /* ---------- hôte ---------- */
  function hostRoom(peer, name) {
    const me = peer.id, conns = {}, pres = {}, on = {}, onPeers = [];
    let myPres = {};
    const list = () => [mkPeer(me, myPres, true)].concat(Object.keys(conns).map(id => mkPeer(id, pres[id], false)));
    const fire = (joined, left, updated) => { const peers = list(); const pick = ids => peers.filter(x => ids.includes(x.peer)); const ch = { peers, joined:pick(joined), left:left.map(id => mkPeer(id, {}, false)), updated:pick(updated) }; onPeers.forEach(f => setTimeout(() => f(ch), 0)); };
    const sendAll = msg => Object.values(conns).forEach(c => { try { c.send(msg); } catch (e) {} });
    const hostInfo = () => sendAll({ t:'host', p:myPres });
    peer.on('connection', c => {
      c.on('open', () => { conns[c.peer] = c; pres[c.peer] = {}; try { c.send({ t:'host', p:myPres }); } catch (e) {} fire([c.peer], [], []); });
      c.on('data', m => {
        if (!m || typeof m !== 'object') return;
        if (m.t === 'pres' && m.p && typeof m.p === 'object') { pres[c.peer] = m.p; fire([], [], [c.peer]); }
      });
      const gone = () => { if (conns[c.peer]) { delete conns[c.peer]; delete pres[c.peer]; fire([], [c.peer], []); } };
      c.on('close', gone); c.on('error', gone);
    });
    peer.on('disconnected', () => { try { peer.reconnect(); } catch (e) {} });
    return {
      name, connected:() => true, onConnection:f => { setTimeout(() => f(true), 0); return () => {}; },
      peers:list,
      onPeers:f => { onPeers.push(f); const peers = list(); setTimeout(() => f({ peers, joined:peers, left:[], updated:[] }), 0); return () => {}; },
      presence:async patch => { for (const k in patch) { if (patch[k] === null) delete myPres[k]; else myPres[k] = patch[k]; } hostInfo(); },
      emit:async (topic, data) => {
        sendAll({ t:'ev', topic, data });
        (on[topic] || []).forEach(f => setTimeout(() => f({ topic, data, peer:me, by:null, isMe:true, sameTab:true, kind:'viewer', guest:false }), 0));
      },
      on:(topic, f) => { (on[topic] = on[topic] || []).push(f); return () => {}; },
      leave:async () => { Object.values(conns).forEach(c => { try { c.close(); } catch (e) {} }); try { peer.destroy(); } catch (e) {} },
    };
  }

  /* ---------- joueur ---------- */
  function clientRoom(name, hostId) {
    return new Promise((resolve, reject) => {
      const peer = new Peer({ debug:0 });
      const on = {}, onPeers = [];
      let myPres = {}, hostPres = null, conn = null, alive = true;
      const list = () => [mkPeer(peer.id, myPres, true)].concat(hostPres ? [mkPeer(hostId, hostPres, false)] : []);
      const fire = (joined, left, updated) => { const peers = list(); const pick = ids => peers.filter(x => ids.includes(x.peer)); const ch = { peers, joined:pick(joined), left:left.map(id => mkPeer(id, {}, false)), updated:pick(updated) }; onPeers.forEach(f => setTimeout(() => f(ch), 0)); };
      const room = {
        name, connected:() => !!conn && conn.open, onConnection:f => { setTimeout(() => f(true), 0); return () => {}; },
        peers:list,
        onPeers:f => { onPeers.push(f); const peers = list(); setTimeout(() => f({ peers, joined:peers, left:[], updated:[] }), 0); return () => {}; },
        presence:async patch => { for (const k in patch) { if (patch[k] === null) delete myPres[k]; else myPres[k] = patch[k]; } if (conn && conn.open) { try { conn.send({ t:'pres', p:myPres }); } catch (e) {} } },
        emit:async () => {},
        on:(topic, f) => { (on[topic] = on[topic] || []).push(f); return () => {}; },
        leave:async () => { alive = false; try { conn && conn.close(); } catch (e) {} try { peer.destroy(); } catch (e) {} },
      };
      peer.on('open', () => {
        conn = peer.connect(hostId, { reliable:true, serialization:'json' });
        conn.on('open', () => { conn.send({ t:'pres', p:myPres }); resolve(room); });
        conn.on('data', m => {
          if (!m || typeof m !== 'object') return;
          if (m.t === 'host') { const first = !hostPres; hostPres = m.p || {}; fire(first ? [hostId] : [], [], first ? [] : [hostId]); }
          else if (m.t === 'ev' && typeof m.topic === 'string') (on[m.topic] || []).forEach(f => f({ topic:m.topic, data:m.data, peer:hostId, by:null, isMe:false, sameTab:false, kind:'viewer', guest:false }));
        });
        conn.on('close', () => { if (alive) { hostPres = null; fire([], [hostId], []); } });
        conn.on('error', () => {});
      });
      peer.on('error', err => { if (err && err.type === 'peer-unavailable') reject({ code:'not_found' }); else reject({ code:'upstream_error' }); });
      setTimeout(() => reject({ code:'upstream_error' }), 15000);
    });
  }
  window.claude = { use:async n => n === 'room' ? lobby : null };
})();
