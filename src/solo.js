
// ----- écran « Partie solo » (pack Roni-Tavernes-Cinq-Univers) : choix de l'univers par vignettes ; généré par outils/solo_gen.py -----
const SOLO_CSS = ":host{all:initial;color-scheme:dark;font:16px/1.43 \"Segoe UI\",system-ui,sans-serif;--ivoire:#f7e8c9;--or:#dab67a;--ligne:#846541}\n*,*::before,*::after{box-sizing:border-box}dialog{position:fixed;inset:0;margin:auto;width:min(1510px,97vw);max-width:97vw;max-height:96vh;max-height:96dvh;padding:clamp(7px,1vw,14px);border:1px solid #bd914e;border-radius:15px;color:var(--ivoire);background:linear-gradient(0deg,#1d100bcf,#4529198c 48%,#1e100c9c),url(assets/solo/visuels/bois.webp) center/430px auto,#51301e;box-shadow:0 0 0 2px #241812,inset 0 0 0 2px #533b22,inset 0 0 0 4px #3a2418,0 18px 85px #000d;overflow:auto;overscroll-behavior:contain;scrollbar-width:thin;scrollbar-color:#78624b #18232a}\ndialog::backdrop{background:#140f16b8;backdrop-filter:blur(4px)}.plaque{position:relative;padding:clamp(13px,1.8vw,28px);border:1px solid #655039;border-radius:8px;background:radial-gradient(ellipse at 45% 3%,#213542 0,transparent 53%),linear-gradient(114deg,#13232b,#101a21 62%,#14222a)}.tete{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:clamp(15px,2vw,27px);gap:15px}h1,h2,h3,p{margin:0}h1,h2,h3,.carte strong,.loi,.action,.chantier>summary{font-family:Georgia,\"Times New Roman\",serif}h1{font-weight:700;font-size:clamp(33px,4.4vw,67px);line-height:.98;letter-spacing:-.043em;text-shadow:0 2px 4px #0009}.tete p{font-size:clamp(14px,1.4vw,21px);margin-top:7px;color:#e7d6b7}button,summary{cursor:pointer;-webkit-tap-highlight-color:transparent}button{font:inherit;color:inherit}button:focus-visible,summary:focus-visible{outline:3px solid #ffe4a2;outline-offset:3px}.fermer{flex:none;border:2px solid #c69b60;border-radius:50%;width:39px;height:39px;background:linear-gradient(#473523,#211a15);color:#f2c477;font:27px/1 Georgia,serif;box-shadow:inset 0 0 0 2px #231b14}.galerie{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:clamp(7px,.9vw,14px);padding:5px 2px 3px}.carte{position:relative;min-width:0;padding:0;display:flex;flex-direction:column;align-items:stretch;overflow:visible;border:2px solid #aa8752;border-radius:10px;background:#172126;box-shadow:0 4px 9px #0009;transition:box-shadow .15s,border-color .15s}.carte::before,.carte::after{position:absolute;content:\"\";top:2px;width:14px;height:14px;z-index:1;pointer-events:none;background:linear-gradient(135deg,#f0cf88,#986330 56%,transparent 58%)}.carte::before{left:2px;border-radius:6px 0 0}.carte::after{right:2px;transform:scaleX(-1);border-radius:6px 0 0}.carte:hover{border-color:#e5c380}.carte[aria-checked=true]{border-color:#ffd06f;box-shadow:0 0 0 2px #91581f,0 0 0 4px #f5b74a,0 0 16px #ed9d3766}.carte img{display:block;width:100%;height:clamp(145px,min(23vw,32vh),360px);object-fit:cover;border-radius:7px 7px 0 0;border-bottom:1px solid #ad884b}.nom{display:grid;justify-items:center;align-content:center;gap:1px;min-height:clamp(51px,5.7vw,79px);padding:4px 2px;background:linear-gradient(#202e33,#151f25);border-radius:0 0 7px 7px}.carte strong{font-weight:700;letter-spacing:-.025em;font-size:clamp(15px,1.9vw,29px);line-height:1.16}.nombre{font:clamp(12px,1.24vw,18px) Georgia,serif;color:#e7d9bb}.coche{position:absolute;z-index:2;left:50%;top:0;transform:translate(-50%,-54%);width:clamp(24px,2.5vw,36px);height:clamp(24px,2.5vw,36px);display:none;place-content:center;border:2px solid #efc36c;border-radius:50%;background:linear-gradient(#ffe49a,#f1b33c 64%,#bc7a22);box-shadow:0 0 0 2px #673e19,0 2px 8px #100c0ab3;color:#553414;font-size:clamp(17px,1.7vw,24px);line-height:1;font-weight:900}.carte[aria-checked=true] .coche{display:grid}\n.fiche{display:grid;grid-template-columns:minmax(170px,.78fr) minmax(270px,1.55fr) auto;gap:clamp(10px,1.7vw,25px);align-items:center;margin-top:clamp(15px,2vw,28px);padding:clamp(12px,1.3vw,20px);border:1px solid var(--ligne);border-radius:6px;background:linear-gradient(110deg,#18282e,#17242a 58%,#132027)}.mecanique{display:flex;align-items:center;gap:clamp(10px,1.2vw,18px);padding-right:10px;border-right:1px solid #776447;min-width:0}.embleme{width:clamp(60px,8vw,120px);height:clamp(55px,7vw,97px);object-fit:contain}.embleme.paysage{border-radius:50%;width:65px;height:65px;object-fit:cover;border:1px solid #b48e51}.mecanique h2,.familles h2{font-size:clamp(18px,2vw,30px);line-height:1.12}.loi{font-size:clamp(15px,1.5vw,22px);color:#ebd5ae;margin-top:4px}.familles ul{display:flex;flex-wrap:wrap;gap:6px;margin:9px 0 0;padding:0;list-style:none}.familles li{border-radius:30px;padding:3px 10px;color:#fff2dc;font:600 clamp(11px,1vw,15px)/1.3 \"Segoe UI\",system-ui,sans-serif;border:1px solid var(--filet);background:linear-gradient(#ffffff16,transparent),var(--teinte);box-shadow:inset 0 1px 1px #ffffff22}.regles{margin-top:13px;padding:13px 17px;background:#142126;border-left:2px solid #a3814e;color:#e5d8bf}.regles[hidden]{display:none}.regles h3{font-size:19px}.regles p{margin-top:6px;max-width:88ch}.pied{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:clamp(12px,1.4vw,22px);border-top:1px solid #735c3e;padding-top:13px}.actions{display:flex;flex-wrap:wrap;justify-content:flex-end;gap:11px}.action{border:1px solid #b08c53;border-radius:6px;background:linear-gradient(#29333a,#192126);padding:8px 14px;font-weight:700;font-size:clamp(13px,1.2vw,18px);box-shadow:inset 0 0 0 2px #181d20}.action:hover{border-color:#ffe1a0}.jouer{padding:9px clamp(17px,2.7vw,40px);background:linear-gradient(#fff1ae,#ffcc65 38%,#e7a63a 78%,#c48a2c);color:#32200f;border:1px solid #ffdb83;box-shadow:inset 0 0 0 2px #be8432,0 3px 7px #08080870}.chantier{max-width:49%;font-size:13px;color:#d6c8ac}.chantier>summary{font-size:clamp(14px,1.45vw,22px);color:#e6ca91}.chantier p{margin-top:5px}.sr{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)}@media(max-width:760px){.fiche{grid-template-columns:.8fr 1.2fr}.voir{grid-column:2;justify-self:start}.mecanique{grid-row:span 2}.action{min-height:40px}.carte img{height:clamp(105px,22vw,150px)}.carte strong{font-size:15px}}@media(max-width:570px){dialog{max-width:98vw;width:98vw;padding:5px}.plaque{padding:12px 10px}.tete{margin-bottom:11px}.galerie{display:flex;gap:8px;overflow-x:auto;scroll-snap-type:x proximity;scroll-padding-inline:6px;padding:14px 6px 9px;scrollbar-width:thin}.carte{flex:0 0 36%;scroll-snap-align:center}.carte img{height:clamp(101px,36vw,150px)}.nom{min-height:43px}.fiche{margin-top:9px;padding:10px;gap:8px;grid-template-columns:auto 1fr}.embleme,.embleme.paysage{width:40px;height:40px}.mecanique{border:0;padding:0;grid-row:auto;grid-column:1/-1}.mecanique h2,.mecanique p{display:inline;font-size:17px}.mecanique p{margin-left:8px}.familles{grid-column:1/-1}.familles h2{font-size:18px}.voir{grid-column:1/-1}.pied{flex-wrap:wrap}.chantier{max-width:100%}.actions{margin-left:auto}.fermer{width:33px;height:33px}.carte strong{font-size:15px}}@media(prefers-reduced-motion:reduce){*{scroll-behavior:auto!important;transition:none!important}}\n\n";
window.RoniUnivers = [
  {id:"south-park",nom:"South Park",heros:10,theme:"Cohésion de groupe",symbole:"montagnes",couleur:"#94b9de",familles:["Gingers et sectes","Adultes","Goths","Célébrités","Animaux"],
   regles:["Au début de chaque combat, chaque serviteur gagne +1/+1 par voisin direct de la même famille pour ce combat.","Trois voisins ou plus de la même famille forment une bande. Son bonus dépend de la famille.","Les objets cultes, comme les Cheesy Poofs et le Bâton de la vérité, s’achètent à l’étagère de la taverne."]},
  {id:"rick-et-morty",nom:"Rick et Morty",heros:10,theme:"Portails",symbole:"portail",couleur:"#89c87e",familles:["Famille Smith","Citadelle des Ricks","Aliens amis","Monstres et cauchemars","Méchants"],
   regles:["Ouvre un portail pour faire revenir un serviteur d’une autre dimension."]},
  {id:"les-simpson",nom:"Les Simpson",heros:10,theme:"Donuts",loi:"Donuts",symbole:"donut",couleur:"#efba59",familles:["Simpson et voisins","Taverne de Moe","Crapules et escrocs","Autorités de la ville","Aliens et Horror Show"],
   regles:["La loi active de Springfield est « Donuts ». Les cinq familles participent à la partie."]},
  {id:"dragon-ball",nom:"Dragon Ball",heros:10,theme:"Ki",symbole:"etoile",couleur:"#eda658",familles:["Saiyans","Terriens","Namekiens","Armée de Freezer","Androïdes"],
   regles:["Médite, charge ton ki et transforme tes guerriers."]},
  {id:"naruto",nom:"Naruto",heros:20,theme:"Chakra",symbole:"kunai",couleur:"#dba26d",familles:["Konoha","Akatsuki","Suna","Oto","Kiri"],
   regles:["Charge ton chakra : lance le jutsu de chaque ninja, puis transforme-le."]}
];


(() => {
  'use strict';
  const dossier = new URL('assets/solo/', window.location.href);
  const url = p => new URL(p,dossier).href;
  const el = (type, classe, texte) => {
    const n=document.createElement(type);
    if(classe)n.className=classe;
    if(texte!=null)n.textContent=texte;
    return n;
  };
  const chantier=['Royaumes anciens','Ateliers et bas-fonds','Terres sauvages','Mers et cieux','Arcanes','Montagnes','Squishys'];
  const teintes=[['#845022','#d99643'],['#874825','#d49451'],['#446235','#a1bf70'],['#344e83','#8faedb'],['#62416d','#c19acb']];
  let active=null;
  function ouvrir(options={}){
    if(active)active.fermer();
    const catalogue=options.univers??window.RoniUnivers;
    if(!Array.isArray(catalogue)||!catalogue.length||new Set(catalogue.map(u=>u.id)).size!==catalogue.length)
      throw new TypeError('La sélection requiert une liste non vide avec un identifiant unique par univers.');
    const precedent=document.activeElement;
    let index=catalogue.findIndex(u=>u.id===(options.selection??'les-simpson'));
    if(index<0)index=0;
    const host=el('div');host.dataset.roniSolo='';const root=host.attachShadow({mode:'open'});
    const css=el('style');css.textContent=SOLO_CSS;
    const dlg=el('dialog');dlg.setAttribute('aria-labelledby','titre');dlg.setAttribute('aria-describedby','description');
    dlg.innerHTML='<div class="plaque"><header class="tete"><div><h1 id="titre">Partie solo</h1><p id="description">Toi contre sept IA.</p></div><button class="fermer" type="button" aria-label="Fermer">×</button></header><div class="galerie" role="radiogroup" aria-label="Univers de la taverne"></div><section class="fiche"><div class="mecanique"><img class="embleme" alt=""><div><h2 class="type"></h2><p class="loi"></p></div></div><div class="familles"><h2></h2><ul></ul></div><button class="action voir" type="button" aria-controls="regles" aria-expanded="false">Voir les règles</button></section><section class="regles" id="regles" hidden></section><footer class="pied"><details class="chantier"><summary>Univers en chantier</summary><p></p></details><div class="actions"><button class="action hasard" type="button"><span aria-hidden="true">⚄</span> Au hasard</button><button class="action jouer" type="button">Lancer la partie</button></div></footer><span class="sr" role="status"></span></div>';
    const $=s=>dlg.querySelector(s),gal=$('.galerie'),aide=$('.regles'),voir=$('.voir');
    $('.chantier p').textContent=chantier.join(' · ');if(options.titre)$('#titre').textContent=options.titre;if(options.description)$('#description').textContent=options.description;if(options.libelle)$('.jouer').textContent=options.libelle;
    const boutons=catalogue.map((u,i)=>{
      const b=el('button','carte');b.type='button';b.dataset.univers=u.id;b.setAttribute('role','radio');
      const img=el('img');img.alt='';img.src=u.image??url('visuels/'+encodeURIComponent(u.id)+'.webp');
      const tick=el('span','coche','✓');tick.setAttribute('aria-hidden','true');
      const nom=el('span','nom');nom.append(el('strong','',u.nom),el('span','nombre',u.heros+' héros'));b.append(img,nom,tick);
      b.addEventListener('click',()=>choisir(i));
      b.addEventListener('keydown',e=>{
        let next;
        if(e.key==='ArrowRight'||e.key==='ArrowDown')next=(i+1)%catalogue.length;
        if(e.key==='ArrowLeft'||e.key==='ArrowUp')next=(i-1+catalogue.length)%catalogue.length;
        if(e.key==='Home')next=0;if(e.key==='End')next=catalogue.length-1;
        if(next!=null){e.preventDefault();choisir(next);boutons[next].focus({preventScroll:true});}
      });
      gal.append(b);return b;
    });
    function centrer(){
      if(gal.scrollWidth<=gal.clientWidth)return;
      const b=boutons[index],left=b.getBoundingClientRect().left-gal.getBoundingClientRect().left+gal.scrollLeft;
      gal.scrollLeft=left-(gal.clientWidth-b.offsetWidth)/2;
    }
    function replier(){aide.hidden=true;voir.setAttribute('aria-expanded','false');voir.textContent='Voir les règles';}
    function choisir(i,annoncer=true){
      const changement=i!==index;index=i;const u=catalogue[i];
      boutons.forEach((b,j)=>{b.setAttribute('aria-checked',String(j===i));b.tabIndex=j===i?0:-1});
      $('.type').textContent=u.loi?'Loi active':'Mécanique';$('.loi').textContent=u.loi||u.theme||u.nom;
      const emblem=$('.embleme');const donut=u.id==='les-simpson';emblem.classList.toggle('paysage',!donut&&!u.embleme);
      emblem.src=u.embleme??(donut?url('visuels/donut.webp'):boutons[i].querySelector('img').src);
      $('.familles h2').textContent=u.id==='les-simpson'?'Familles de Springfield':u.id==='naruto'?'Familles de Naruto':'Familles · '+u.nom;
      const tags=$('.familles ul');tags.replaceChildren();
      (u.familles||[]).forEach((nom,j)=>{const tag=el('li','',nom);const [fond,bord]=teintes[j%teintes.length];tag.style.setProperty('--teinte',fond);tag.style.setProperty('--filet',bord);tags.append(tag)});
      aide.replaceChildren(el('h3','','Règles · '+u.nom));
      for(const r of u.regles||[])aide.append(el('p','',r));voir.hidden=!u.regles?.length;
      if(changement||!annoncer)replier();
      if(annoncer){$('.sr').textContent=u.nom+' sélectionné';centrer()}
    }
    let termine=false;
    function terminer(jouer=false){
      if(termine)return;termine=true;const u=catalogue[index];if(dlg.open)dlg.close();host.remove();if(active===api)active=null;
      if(jouer){
        const detail={universId:u.id,mode:'solo',nombreIA:7};
        if(options.onJouer)options.onJouer(detail);
        else window.dispatchEvent(new CustomEvent('roni:solo:lancer',{detail}));
      }else{if(precedent?.isConnected)precedent.focus({preventScroll:true});options.onFermer?.()}
    }
    const api={fermer:()=>terminer(),get selection(){return catalogue[index].id}};
    $('.fermer').addEventListener('click',api.fermer);
    dlg.addEventListener('cancel',e=>{e.preventDefault();api.fermer()});
    dlg.addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();api.fermer()}});
    $('.jouer').addEventListener('click',()=>terminer(true));
    $('.hasard').addEventListener('click',()=>choisir(catalogue.length>1?(index+1+Math.floor(Math.random()*(catalogue.length-1)))%catalogue.length:index));
    voir.addEventListener('click',()=>{if(!aide.hidden)replier();else{aide.hidden=false;voir.textContent='Masquer les règles';voir.setAttribute('aria-expanded','true')}});
    function montrer(){if(termine||dlg.open)return;dlg.showModal();boutons[index].focus({preventScroll:true});requestAnimationFrame(centrer)}
    
    root.append(css,dlg);(options.parent??document.body).append(host);choisir(index,false);active=api;montrer();return api;
  }
  window.RoniSolo={ouvrir};
})();


// raccord : « Jouer solo » de l'accueil ouvre cet écran ; « Lancer la partie » démarre la partie solo dans l'univers choisi
const SOLO_IDS = { 'south-park':'South Park', 'rick-et-morty':'Rick et Morty', 'les-simpson':'Les Simpson', 'dragon-ball':'Dragon Ball', 'naruto':'Naruto' };
function soloOpen() {
  try {
    const cur = Object.keys(SOLO_IDS).find(k => SOLO_IDS[k] === (V.univSel || [])[0]) || 'les-simpson';
    const ok = id => { const u = (SET.univ || []).find(x => x.n === SOLO_IDS[id]); return !!u && (typeof univOpen !== 'function' || univOpen(u)); };
    const cat = window.RoniUnivers.filter(u => ok(u.id));
    if (!cat.length) throw 0;
    RoniSolo.ouvrir({ univers:cat, selection:cat.some(u => u.id === cur) ? cur : cat[0].id, onJouer({ universId }) {
      V.univSel = [SOLO_IDS[universId]]; try { localStorage.setItem('tav-univ', JSON.stringify(V.univSel)); } catch (e) {}
      V.mp = null; startSolo(); } });
    return true;
  } catch (e) { return false; }
}
// en ligne : l'hôte choisit l'univers de la table avec le même écran
function soloOpenMp() {
  try {
    const cur = Object.keys(SOLO_IDS).find(k => SOLO_IDS[k] === (V.univSel || [])[0]) || 'les-simpson';
    const cat = window.RoniUnivers.filter(u => { const x = (SET.univ || []).find(z => z.n === SOLO_IDS[u.id]); return !!x && (typeof univOpen !== 'function' || univOpen(x)); });
    if (!cat.length) return false;
    RoniSolo.ouvrir({ univers:cat, selection:cat.some(u => u.id === cur) ? cur : cat[0].id, titre:'Partie multijoueur', description:'Choisis l’univers de la table.', libelle:'Choisir cet univers', onJouer({ universId }) {
      V.univSel = [SOLO_IDS[universId]]; try { localStorage.setItem('tav-univ', JSON.stringify(V.univSel)); } catch (e) {}
      if (Net.role === 'host' && !H.G) sendPub(); else render(); } });
    return true;
  } catch (e) { return false; }
}

