/* =====================================================================
   RÉSEAU — salon (lobby) + salle nommée par partie
   L'hôte envoie l'état (pub/priv/fight) ; les joueurs envoient leurs
   actions via leur « présence » (autorisée pour tous les spectateurs).
   ===================================================================== */
const Net = { room:null, nr:null, myPeer:null, hostPeer:null, role:null, seq:0, acts:[], games:[], connected:false };

async function netBoot() {
  try { Net.room = window.claude && window.claude.use ? await window.claude.use('room') : null; } catch (e) { Net.room = null; }
  if (!Net.room) { render(); return; }
  Net.room.onConnection(c => { Net.connected = c; if (V.screen === 'menu') render(); }, () => { Net.room = null; render(); });
  Net.room.onPeers(ch => {
    const me = ch.peers.find(p => p.isMe && p.sameTab); if (me) Net.myPeer = me.peer;
    Net.games = ch.peers.filter(p => !p.sameTab && p.presence && p.presence.host).map(p => ({ peer:p.peer, ...p.presence.host }));
    if (V.screen === 'menu') render();
  });
  render();
}
function setLobbyPresence() {
  if (!Net.room) return;
  if (Net.role !== 'host') { Net.room.presence({ host:null }).catch(() => {}); return; }
  const n = H.G ? H.G.ps.filter(p => p.human && !p.bot).length : H.roster.length;
  Net.room.presence({ host:{ code:H.code, nm:V.name, n, st:!!H.G, end:!!(H.G && H.G.ph === 'end') } }).catch(() => {});
}
function randCode() { const a = 'abcdefghjkmnpqrstuvwxyz23456789'; let s = ''; for (let i = 0; i < 5; i++) s += a[rint(a.length)]; return 'tav-' + s; }

async function createOnline() {
  if (!Net.room) return;
  H.code = randCode(); H.G = null; H.lastSeq = {};
  try { Net.nr = H.nr = await Net.room.join(H.code); } catch (e) { toast('Impossible de créer la salle. Réessaie dans un instant.'); return; }
  Net.role = 'host';
  if (!Net.myPeer) { const me = Net.nr.peers().find(p => p.isMe && p.sameTab); if (me) Net.myPeer = me.peer; }
  H.roster = [{ n:V.name, peer:LOCAL }];
  Net.nr.presence({ host:1, nm:V.name }).catch(() => {});
  Net.nr.onPeers(hostPeers);
  V.screen = 'lobby'; setLobbyPresence(); sendPub();
}
function hostPeers(ch) {
  const G = H.G;
  for (const p of ch.joined.concat(ch.updated)) {
    if (p.sameTab || !p.presence) continue;
    const nm = typeof p.presence.nm === 'string' ? p.presence.nm.slice(0, 20) : null;
    if (!nm) continue;
    if (!G) {
      if (!H.roster.some(r => r.peer === p.peer) && H.roster.length < 8) { H.roster.push({ n:nm, peer:p.peer }); sendPub(); setLobbyPresence(); }
    } else {
      let pl = G.ps.find(x => x.peer === p.peer);
      if (!pl) { pl = G.ps.find(x => x.human && x.bot && x.n === nm && G.ph !== 'end'); if (pl) { pl.peer = p.peer; pl.bot = false; broadcast(); } }
      if (pl && Array.isArray(p.presence.acts)) {
        const last = H.lastSeq[p.peer] || 0;
        for (const a of p.presence.acts) if (a && typeof a.s === 'number' && a.s > last && typeof a.t === 'string') { H.lastSeq[p.peer] = Math.max(H.lastSeq[p.peer] || 0, a.s); hostApply(pl.pid, a); }
      }
    }
  }
  for (const p of ch.left) {
    if (!G) { const k = H.roster.findIndex(r => r.peer === p.peer); if (k > 0) { H.roster.splice(k, 1); sendPub(); setLobbyPresence(); } }
    else { const pl = G.ps.find(x => x.peer === p.peer); if (pl) { pl.peer = null; pl.bot = true; if (G.ph === 'recruit' && pl.al) aiTurn(G, pl); toast(pl.n + ' a quitté — une IA prend le relais.'); broadcast(); } }
  }
}
async function joinOnline(code) {
  if (!Net.room) return;
  try { Net.nr = await Net.room.join(code); } catch (e) { toast('Impossible de rejoindre cette partie.'); return; }
  Net.role = 'client'; Net.seq = 0; Net.acts = []; Net.hostPeer = null; V.pub = null; V.me = null; V.fight = null; V.pubKey = V.privKey = null;
  const myNr = Net.nr; setTimeout(() => { if (Net.nr === myNr && Net.role === 'client' && !V.pub) { toast('Aucune partie trouvée avec ce code. Vérifie-le auprès de l\'hôte.'); leaveGame(); } }, 9000);
  const hostP = Net.nr.peers().find(p => p.presence && p.presence.host === 1); if (hostP) Net.hostPeer = hostP.peer;
  Net.nr.on('pub', m => { if (Net.hostPeer && m.peer !== Net.hostPeer) return; if (!Net.hostPeer) Net.hostPeer = m.peer; onPub(m.data); });
  Net.nr.on('priv', m => { if (m.peer !== Net.hostPeer || !m.data) return; if (myPeer() && m.data.to === myPeer()) onPriv(m.data); });
  Net.nr.on('fight', m => { if (m.peer !== Net.hostPeer || !m.data) return; if (myPeer() && m.data.to === myPeer()) onFight(m.data); });
  Net.nr.onPeers(ch => {
    const me = ch.peers.find(p => p.isMe && p.sameTab); if (me) Net.myPeer = me.peer;
    const h = ch.peers.find(p => p.presence && p.presence.host === 1); if (h) Net.hostPeer = h.peer;
    if (Net.hostPeer && ch.left.some(p => p.peer === Net.hostPeer)) { V.hostGone = true; render(); }
  });
  Net.nr.presence({ nm:V.name, acts:[] }).catch(() => {});
  V.screen = 'lobby'; V.hostGone = false; render();
}
function myPeer() { if (!Net.myPeer && Net.nr) { const me = Net.nr.peers().find(p => p.isMe && p.sameTab); if (me) Net.myPeer = me.peer; } return Net.myPeer; }

function startSolo() {
  Net.role = 'solo'; H.nr = null; H.code = null; H.roster = [];
  V.pub = null; V.me = null; V.fight = null; V.pubKey = V.privKey = null;
  hostStart([{ n:V.name, peer:LOCAL }], { univ:V.univSel });
}
function hostLaunch() {
  const humans = H.roster.map(r => ({ n:r.n, peer:r.peer }));
  hostStart(humans, { univ:V.univSel }); setLobbyPresence();
}
// fin de partie en ligne : la table se reforme avec les joueurs encore là, prête pour une revanche
function hostBackToTable() {
  const G = H.G; if (!G || G.ph !== 'end' || Net.role !== 'host' || !Net.nr) return;
  H.last = G.ps.slice().sort((a, b) => a.place - b.place).map(p => ({ n:p.n, pl:p.place, ai:!p.human, h:p.hero }));
  const roster = [{ n:V.name, peer:LOCAL }];
  for (const p of Net.nr.peers()) {
    if (p.sameTab || p.isMe || !p.presence || roster.length >= 8) continue;
    const nm = typeof p.presence.nm === 'string' ? p.presence.nm.slice(0, 20) : null;
    if (nm && !roster.some(r => r.peer === p.peer)) roster.push({ n:nm, peer:p.peer });
  }
  H.roster = roster; clearInterval(H.tick); H.G = null;
  V.me = null; V.fight = null; V.sel = null; V.privKey = null;
  setLobbyPresence(); sendPub();
}
async function leaveGame() {
  clearInterval(H.tick); H.G = null;
  if (Net.nr) { try { await Net.nr.leave(); } catch (e) {} }
  Net.nr = H.nr = null; Net.role = null; H.roster = []; H.code = null; H.last = null;
  setLobbyPresence();
  V.screen = 'menu'; V.pub = null; V.me = null; V.fight = null; V.sel = null; V.hostGone = false; V.pubKey = V.privKey = null; V.cvWarn = false;
  if (DATA.pending) applyLive(); else render();
}
function sendAct(a) {
  if (Net.role === 'host' || Net.role === 'solo') { const p = V.me; if (p) hostApply(p.pid, a); return; }
  if (!Net.nr) return;
  a.s = ++Net.seq; Net.acts.push(a); if (Net.acts.length > 12) Net.acts.shift();
  Net.nr.presence({ nm:V.name, acts:Net.acts }).catch(() => {});
}

