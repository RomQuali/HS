
// ----- page d'accueil : le bureau de Gros Tony (pack Roni-Accueil-Tony), monté dans un shadow DOM pour isoler ses styles -----
// Fichier généré par gen/tony_gen.py à partir du pack ; les images et sons sont dans assets/tony/.
window.HearthstonePlayCurve = [[0.0, 0.0, 4.0, 4.0], [0.25, 1.0, 1.145098090171814, 1.145098090171814], [0.5, 0.572549045085907, -1.709803819656372, -1.709803819656372]];

function tonyMount(host, opts) {
  const root = host.attachShadow({ mode:'open' });
  root.innerHTML = '<style>' + TONY_CSS + '</style><div class="tbody bureau-actif">' + TONY_HTML + '</div>';
  const doc0 = window.document;
  const document = { getElementById:id => root.getElementById(id), querySelectorAll:s => root.querySelectorAll(s), querySelector:s => root.querySelector(s), createElement:t => doc0.createElement(t),
    addEventListener:(...a) => doc0.addEventListener(...a), get hidden() { return doc0.hidden; }, body:root.querySelector('.tbody'), currentScript:null };
/* Adaptateur web des ressources du client Hearthstone. Charger courbe.js avant ce fichier. */
(() => {
  'use strict';
  const base = new URL('assets/tony/hs/', window.location.href);
  const images = {
    jouer: 'challengeMenu_button_highlight', defi: 'challengeMenu_button_highlight',
    collection: 'CardGlowHover', coche: 'Checkmark_Glow'
  };
  const sons = {
    clic: 'UI_MouseClick_01', ouverture: 'UI_SquarePanel_slide_on',
    fermeture: 'UI_SquarePanel_slide_off', refus: 'UI_no_can_do'
  };
  const attaches = new WeakMap();
  let enCours;

  function silence() {
    if (!enCours) return;
    enCours.pause();
    enCours = null;
  }

  function lire(fichier, termine) {
    silence();
    const piste = new Audio(new URL(fichier, base).href);
    enCours = piste;
    piste.addEventListener('ended', () => {
      if (enCours === piste) {enCours = null;termine?.();}
    }, {once:true});
    return piste.play().then(() => true).catch(() => false);
  }

  // Les trois canaux RVB du matériau partagent la même courbe Hermite.
  function echantillon(cle, suivante, temps) {
    const dt = suivante[0] - cle[0], t = (temps - cle[0]) / dt;
    const t2 = t*t, t3 = t2*t;
    return (2*t3-3*t2+1)*cle[1] + (t3-2*t2+t)*dt*cle[3]
      + (-2*t3+3*t2)*suivante[1] + (t3-t2)*dt*suivante[2];
  }

  function animerContour(calque) {
    const cles = window.HearthstonePlayCurve;
    const fin = cles[cles.length-1][0], frames = [];
    for (let i=0; i<cles.length-1; i++) {
      const debut=cles[i][0], delta=cles[i+1][0]-debut;
      const pas=Math.ceil(delta*60);
      for (let j=0; j<pas; j++) {
        const t=debut + delta*j/pas;
        const niveau=echantillon(cles[i],cles[i+1],t);
        frames.push({offset:t/fin, opacity:Math.min(1,niveau), filter:'brightness('+Math.max(1,niveau)+')'});
      }
    }
    frames.push({offset:1,opacity:cles[cles.length-1][1],filter:'brightness(1)'});
    return calque.animate(frames,{duration:fin*1000,fill:'forwards'});
  }

  function attacher(bouton, effet, options={}) {
    if (!bouton || !images[effet] || attaches.has(bouton)) return;
    const calque = document.createElement('i');
    calque.setAttribute('aria-hidden','true');
    calque.className = 'hs-fx hs-fx-'+effet;
    calque.style.backgroundImage = 'url("'+new URL(images[effet]+'_web.webp',base).href+'")';
    bouton.append(calque);
    let animation, finEssai, survole=false, visible=false;
    const reduit = options.reduit || (()=>matchMedia('(prefers-reduced-motion: reduce)').matches);
    function actualiser(){
      const actif = !bouton.disabled && (survole || bouton.matches(':focus-visible'));
      if (actif === visible) return;
      visible=actif;
      animation?.cancel();
      calque.style.opacity = actif ? (effet==='jouer' ? '0.573' : '1') : '0';
      if (actif && effet==='jouer' && !reduit() && window.HearthstonePlayCurve)
        animation = animerContour(calque);
    }
    bouton.addEventListener('pointerenter', e => {survole=e.pointerType!=='touch';actualiser()});
    bouton.addEventListener('pointerleave', () => {survole=false;actualiser()});
    bouton.addEventListener('pointercancel', () => {survole=false;actualiser()});
    bouton.addEventListener('focus',actualiser);
    bouton.addEventListener('blur',actualiser);
    attaches.set(bouton,() => {
      if(effet!=='jouer')return;
      animation?.cancel();
      if(reduit()) {calque.style.opacity='0.573';}
      else if(window.HearthstonePlayCurve) animation=animerContour(calque);
      clearTimeout(finEssai);
      finEssai=setTimeout(()=>{
        animation?.cancel();
        visible=!bouton.disabled && (survole || bouton.matches(':focus-visible'));
        calque.style.opacity=visible?'0.573':'0';
      },650);
    });
    actualiser();
  }
  const HearthstoneFX = window.HearthstoneFX = Object.freeze({
    attacher, silence, lire, rejouer(bouton){attaches.get(bouton)?.();},
    son(id) { return sons[id] ? lire('sons/interface/'+sons[id]+'.wav') : Promise.resolve(false); }
  });
})();

'use strict';
function installerBureau() {
  const camera=document.getElementById('camera'),stage=document.getElementById('cadre');
  const layer=document.getElementById('trappe'),g=layer.getContext('2d');
  const ambient=document.getElementById('air-bureau').getContext('2d');
  const W=1672,H=941,room=new Image();room.src='assets/tony/bureau-vitrine.webp';
  const kenny=new Image(),ombre=document.createElement('canvas'),nuit=document.createElement('canvas');
  // La capuche dépasse le plateau du bureau, les chaussures restent sur les battants.
  const pieds={x:840,y:830};
  // Horizon du parquet à 369 px. À hauteur de la trappe, Kenny mesure environ 1,06 m.
  const taille=(pieds.y-369)*1.06/1.34;
  ombre.width=W;ombre.height=H;
  let active=false,flight=0,air=0,lastAir=0,generation=0,playing=false;
  let ctxAudio=null,voix=null,lecture=null,chargement=null;
  const piste='assets/tony/kenny-voix.wav';
  function chargerVoix(){
    if(!chargement)chargement=fetch(piste).then(r=>{if(!r.ok)throw Error('Extrait indisponible');return r.arrayBuffer()}).catch(()=>{chargement=null;return null});
    return chargement;
  }
  function arreterVoix(){if(lecture){try{lecture.stop()}catch{}lecture.disconnect();lecture=null}arreterBruits()}
  // Bruitages de la trappe (16/11/2026) : bouton, verrou, battants, cri de Kenny, chute, impact, rire de Tony, plongée, fermeture
  const BRUITS=['tony-bouton','trappe-verrou','trappe-ouverture','kenny-cri-chute','chute-souffle','chute-impact','transition-plongee','trappe-fermeture'],tampons={},enCours=new Set();let bruitsCharges=null;
  const bruitsOk=()=>typeof SFX==='undefined'||SFX.on!==false;
  const volBruits=()=>typeof SFX!=='undefined'&&SFX.vol!=null?SFX.vol:1;
  function chargerBruits(){
    if(bruitsCharges)return bruitsCharges;
    try{ctxAudio??=new AudioContext()}catch{return Promise.resolve()}
    bruitsCharges=Promise.all(BRUITS.map(n=>fetch('assets/tony/sons/'+n+'.mp3').then(r=>r.ok?r.arrayBuffer():null).then(b=>b&&new Promise(ok=>ctxAudio.decodeAudioData(b,d=>{tampons[n]=d;ok()},()=>ok()))).catch(()=>{})));
    return bruitsCharges;
  }
  // joue un bruitage « at » ms après « depart » (horloge performance.now)
  function bruit(n,depart,at,vol=1,version=generation){
    if(!bruitsOk())return;
    try{ctxAudio??=new AudioContext()}catch{return}
    const go=()=>{if(version!==generation||!tampons[n])return;const src=ctxAudio.createBufferSource(),g=ctxAudio.createGain();src.buffer=tampons[n];g.gain.value=vol*volBruits();src.connect(g);g.connect(ctxAudio.destination);enCours.add(src);src.onended=()=>{enCours.delete(src);src.disconnect();g.disconnect()};src.start(ctxAudio.currentTime+Math.max(0,(depart+at-performance.now())/1000))};
    ctxAudio.resume().catch(()=>{});
    if(tampons[n])go();else chargerBruits().then(go);
  }
  function arreterBruits(){for(const s of enCours){try{s.stop()}catch{}}enCours.clear()}
  async function programmerVoix(depart,retard,version){
    if(!prefs.dialogue)return;
    try{
      ctxAudio??=new AudioContext();
      const reveil=ctxAudio.resume(),donnees=await chargerVoix();if(!donnees){const secours=new Audio(piste);secours.volume=.8;setTimeout(()=>{if(generation===version&&playing&&prefs.dialogue)secours.play().catch(()=>{})},Math.max(0,depart+retard-performance.now()));return;}
      voix??=await ctxAudio.decodeAudioData(donnees.slice(0));await reveil;
      if(generation!==version||!playing||!prefs.dialogue)return;
      const source=ctxAudio.createBufferSource();source.buffer=voix;
      const niveau=ctxAudio.createGain();niveau.gain.value=1;source.connect(niveau);niveau.connect(ctxAudio.destination);
      source.onended=()=>{source.disconnect();niveau.disconnect();if(lecture===source)lecture=null};
      lecture=source;source.start(ctxAudio.currentTime+Math.max(0,(depart+retard-performance.now())/1000));
    }catch{/* Une sortie audio indisponible ne doit pas interrompre le départ. */}
  }
  const clamp=x=>Math.max(0,Math.min(1,x));
  const ease=x=>{x=clamp(x);return x*x*(3-2*x)};
  const reduced=()=>prefs.reduit;
  function contour(ctx,pts){ctx.beginPath();ctx.moveTo(...pts[0]);for(let i=1;i<pts.length;i++)ctx.lineTo(...pts[i]);ctx.closePath()}
  function preparerPersonnage(){
    const w=taille*kenny.naturalWidth/kenny.naturalHeight;
    nuit.width=kenny.naturalWidth;nuit.height=kenny.naturalHeight;
    const shade=nuit.getContext('2d');shade.drawImage(kenny,0,0);shade.globalCompositeOperation='source-in';shade.fillStyle='#17151d';shade.fillRect(0,0,nuit.width,nuit.height);
    const sol=ombre.getContext('2d');sol.clearRect(0,0,W,H);
    sol.save();sol.translate(pieds.x,pieds.y);sol.transform(.93,0,.46,-.108,0,0);sol.filter='blur(6px)';sol.globalAlpha=.39;sol.drawImage(nuit,-w/2,-taille,w,taille);sol.restore();
    // Une ombre courte sous chaque semelle ancre les deux pieds indépendamment.
    for(const offset of [-.215,.185]){
      sol.save();sol.translate(pieds.x+w*offset,pieds.y-2);sol.scale(1,.16);
      const rayon=w*.215,contact=sol.createRadialGradient(0,0,1,0,0,rayon);
      contact.addColorStop(0,'#1b1216d0');contact.addColorStop(.53,'#25191974');contact.addColorStop(1,'#25191900');
      sol.fillStyle=contact;sol.fillRect(-rayon,-rayon,rayon*2,rayon*2);sol.restore();
    }
    if(active&&!playing)repos();
  }
  kenny.onload=preparerPersonnage;kenny.src='assets/tony/kenny-lumiere.webp';
  function personnage(profondeur,sursaut=0,souffle=0){
    if(!kenny.naturalWidth||profondeur>=1)return;
    const largeur=taille*kenny.naturalWidth/kenny.naturalHeight,scale=1-.58*profondeur;
    g.save();
    // Le rebord avant masque d'abord les chaussures, puis le bas du manteau et la capuche.
    g.beginPath();g.rect(0,0,W,886);g.clip();
    const bas=pieds.y+profondeur*(taille*.88+48)-sursaut*5;
    g.translate(pieds.x+20*profondeur-2.1*sursaut,bas);
    g.rotate(sursaut*-.031+profondeur*.22);
    g.scale(scale*(1-.0016*souffle),scale*(1+.0032*souffle));
    g.drawImage(kenny,-largeur/2,-taille,largeur,taille);
    g.globalAlpha=clamp(profondeur*1.1);g.drawImage(nuit,-largeur/2,-taille,largeur,taille);g.restore();
  }
  function repos(){g.clearRect(0,0,W,H);if(active&&kenny.naturalWidth){g.drawImage(ombre,0,0);personnage(0)}}
  function respiration(t){
    if(!kenny.naturalWidth)return;
    const w=taille*kenny.naturalWidth/kenny.naturalHeight;
    const x=Math.floor(pieds.x-w*.5)-3,y=Math.floor(pieds.y-taille)-4;
    const largeur=Math.ceil(w)+7,hauteur=Math.ceil(taille)+9;
    g.clearRect(x,y,largeur,hauteur);
    g.drawImage(ombre,x,y,largeur,hauteur,x,y,largeur,hauteur);
    personnage(0,0,Math.sin(t*1.69));
  }
  function paupiere(x,y,largeur,hauteur,fermeture){
    for(let i=1;i<largeur;i++){
      const u=i/largeur;
      const haut=y+(.5-u)*.6+.8*(2*u-1)**2;
      const h=hauteur*Math.sin(Math.PI*u)**.58,descente=h*.91*fermeture;
      ambient.drawImage(room,x+i,haut-5,1,5,x+i,haut-5,1,5+descente);
      ambient.drawImage(room,x+i,haut,1,h,x+i,haut+descente,1,h-descente);
    }
  }
  function peindreAir(now){
      ambient.clearRect(1100,178,500,350);
      const t=reduced()?1.9:now/1000;
      const phase=(t+4.8)%7.6,fermeture=phase<.24?Math.sin(Math.PI*phase/.24):0;
      if(fermeture>.01&&room.naturalWidth){
        paupiere(1128,300.9,38,11.8,fermeture);
        paupiere(1179,302.3,28,8.5,fermeture);
      }
      // Les filaments partent du foyer du cigare de Tony, dans le même repère que le portrait.
      for(let j=0;j<2;j++) {
        const x=1260+j*.7,y=325-j*.5,swirl=Math.sin(t*.69+j*.7);
        const fade=ambient.createLinearGradient(0,y,0,y-70);
        fade.addColorStop(0,'rgba(239,217,191,.02)');fade.addColorStop(.23,'rgba(223,224,214,.21)');fade.addColorStop(.61,'rgba(196,209,209,.12)');fade.addColorStop(1,'rgba(180,197,208,0)');
        ambient.strokeStyle=fade;ambient.lineWidth=1.15+j*1.05;ambient.lineCap='round';ambient.beginPath();ambient.moveTo(x,y);
        for(let k=1;k<=34;k++){const f=k/34;ambient.lineTo(x-9*f+Math.sin(f*8.5-t*.72+j*.6)*5.5*f+swirl*5*f,y-71*f)}
        ambient.stroke();
      }
      const glow=ambient.createRadialGradient(1260,325,.2,1260,325,4.6);
      glow.addColorStop(0,'rgba(255,235,161,'+(.33+.19*Math.sin(t*2.3))+')');glow.addColorStop(1,'rgba(255,97,31,0)');ambient.fillStyle=glow;ambient.fillRect(1255,320,10,10);
      for(let i=0;i<8;i++){
        const course=(t*(.015+i*.001)+i*.137)%1;
        const x=1402+i*21+course*27+Math.sin(t*.55+i)*3;
        const y=470-217*course+16*Math.sin(i*1.85);
        ambient.fillStyle='rgba(255,223,167,'+.32*Math.sin(course*Math.PI)**2+')';
        ambient.beginPath();ambient.arc(x,y,.58+(i%3)*.22,0,Math.PI*2);ambient.fill();
      }
  }
  let dernierSouffle=0;
  function ambientFrame(now) {
    air=0;if(!active||document.hidden)return;
    if(now-lastAir>=48||reduced()){
      lastAir=now;peindreAir(now);
      if(!reduced()&&now-dernierSouffle>95){respiration(now/1000);dernierSouffle=now}
    }
    if(!reduced()&&!playing)air=requestAnimationFrame(ambientFrame);
  }
  function actualiser(){cancelAnimationFrame(air);air=0;if(active&&!document.hidden&&!playing){if(reduced())repos();air=requestAnimationFrame(ambientFrame)}}
  // Déformation locale affine. Les coins immobiles raccordent le mouvement au tableau de fond.
  function triangle(src,dst,image=room) {
    const [[x1,y1],[x2,y2],[x3,y3]]=src,[[u1,v1],[u2,v2],[u3,v3]]=dst;
    const det=(x2-x1)*(y3-y1)-(x3-x1)*(y2-y1);if(!det)return;
    const a=((u2-u1)*(y3-y1)-(u3-u1)*(y2-y1))/det,c=((x2-x1)*(u3-u1)-(x3-x1)*(u2-u1))/det;
    const b=((v2-v1)*(y3-y1)-(v3-v1)*(y2-y1))/det,d=((x2-x1)*(v3-v1)-(x3-x1)*(v2-v1))/det;
    g.save();contour(g,dst);g.clip();g.transform(a,b,c,d,u1-a*x1-c*y1,v1-b*x1-d*y1);g.drawImage(image,0,0,W,H);g.restore();
  }
  function pressing(p) {
    if(!room.naturalWidth||p<=0)return;
    const xs=[1075,1085,1095,1103,1110,1116,1121,1126,1133,1138,1145],ys=[435,443,450,457,461,465,470,474,478,483,488];
    function tip(x,y){const ax=(x-1119.5)/23,ay=(y-463)/18,force=Math.pow(Math.max(0,1-ax*ax-ay*ay),1.25);return [x-.65*p*force,y+6.9*p*force]}
    for(let j=1;j<ys.length;j++)for(let i=1;i<xs.length;i++){
      const a=[xs[i-1],ys[j-1]],b=[xs[i],ys[j-1]],c=[xs[i],ys[j]],d=[xs[i-1],ys[j]];
      const A=tip(...a),B=tip(...b),C=tip(...c),D=tip(...d);
      if([A[1]-a[1],B[1]-b[1],C[1]-c[1],D[1]-d[1]].every(v=>v===0))continue;
      triangle([a,b,c],[A,B,C]);triangle([a,c,d],[A,C,D]);
    }
    const fall=1.5*Math.max(0,(p-.7)/.3);g.drawImage(room,1102,475,33,15,1102,475+fall,33,15-fall);
    if(p>.82){const light=g.createRadialGradient(1119,477,.5,1119,477,6.5);light.addColorStop(0,'rgba(255,216,117,.35)');light.addColorStop(1,'rgba(255,173,55,0)');g.fillStyle=light;g.fillRect(1112,470,14,14)}
  }
  const topL=[655,759],topM=[863,759],topR=[1056,759],lowL=[602,886],lowM=[871,886],lowR=[1128,886];
  function panel(outerTop,outerLow,f,shadow){
    const angle=f*1.55,cos=Math.cos(angle),sin=Math.sin(angle);
    function hinge(a,b,depth){return[a[0]+(b[0]-a[0])*cos,a[1]+(b[1]-a[1])*cos+sin*depth]}
    const m=hinge(outerTop,topM,100),n=hinge(outerLow,lowM,133);
    triangle([outerTop,topM,lowM],[outerTop,m,n]);triangle([outerTop,lowM,outerLow],[outerTop,n,outerLow]);
    if(shadow>.01){g.save();g.globalAlpha=shadow;triangle([outerTop,topM,lowM],[outerTop,m,n],ombre);triangle([outerTop,lowM,outerLow],[outerTop,n,outerLow],ombre);g.restore()}
    contour(g,[outerTop,m,n,outerLow]);g.fillStyle='rgba(14,15,22,'+(.58*f)+')';g.fill();
    const epaisseur=(outerTop[0]<topM[0]?1:-1)*4.6*sin;
    const chant=g.createLinearGradient(m[0],m[1],n[0],n[1]);
    chant.addColorStop(0,'#463024');chant.addColorStop(.62,'#815233');chant.addColorStop(1,'#462c20');
    contour(g,[m,n,[n[0]+epaisseur,n[1]+2.7*f],[m[0]+epaisseur,m[1]+1.9*f]]);
    g.fillStyle=chant;g.fill();
    g.beginPath();g.moveTo(...m);g.lineTo(...n);g.strokeStyle='rgba(218,153,83,'+(.54-.29*f)+')';g.lineWidth=1.45;g.stroke();
  }
  function trap(f,shadow){
    if(!room.naturalWidth||f<=0)return;
    g.save();contour(g,[topL,topR,lowR,lowL]);g.clip();
    const shaft=g.createLinearGradient(0,759,0,886);
    shaft.addColorStop(0,'#392a23');shaft.addColorStop(.22,'#231c1d');shaft.addColorStop(.67,'#11141a');shaft.addColorStop(1,'#0b1015');
    g.fillStyle=shaft;g.fillRect(600,757,532,133);
    // La paroi en retrait garde un mince reflet sur son retour côté fenêtre.
    const fondG=[675,812],fondD=[1036,812],piedD=[1090,933];
    contour(g,[topR,lowR,piedD,fondD]);g.fillStyle='#473426';g.fill();
    contour(g,[topL,topR,fondD,fondG]);g.fillStyle='#372921';g.fill();
    const bois=[[139,814],[507,814],[507,878],[139,878]];
    g.save();g.globalAlpha=.39;
    triangle([bois[0],bois[1],bois[2]],[topL,topR,fondD]);
    triangle([bois[0],bois[2],bois[3]],[topL,fondD,fondG]);
    g.globalAlpha=.31;
    triangle([bois[0],bois[1],bois[2]],[topR,lowR,piedD]);
    triangle([bois[0],bois[2],bois[3]],[topR,piedD,fondD]);g.restore();
    const penombre=g.createLinearGradient(0,759,0,819);
    penombre.addColorStop(0,'#170f1096');penombre.addColorStop(.11,'#5a382320');penombre.addColorStop(.7,'#1e181a95');penombre.addColorStop(1,'#11141aec');
    contour(g,[topL,topR,fondD,fondG]);g.fillStyle=penombre;g.fill();
    g.save();contour(g,[topR,lowR,piedD,fondD]);g.clip();
    const biseau=g.createLinearGradient(1078,798,1057,812);biseau.addColorStop(0,'#e1a76415');biseau.addColorStop(1,'#11141ab0');
    g.fillStyle=biseau;g.fillRect(1030,758,104,134);g.restore();
    for(let i=1;i<=3;i++){
      const y=759+i*12;g.beginPath();g.moveTo(655+i*5,y);g.lineTo(1056-i*5,y);
      g.strokeStyle='rgba(163,118,80,'+(.21-i*.04)+')';g.lineWidth=1;g.stroke();
    }
    panel(topL,lowL,Math.min(1,f*1.045),shadow);
    panel(topR,lowR,Math.max(0,(f-.032)/.968),shadow);g.restore();
  }
  function reset(){generation++;cancelAnimationFrame(flight);flight=0;playing=false;arreterVoix();camera.style.transform='';stage.classList.remove('chute');stage.style.removeProperty('--disparition');stage.style.removeProperty('--voile-chute');repos();actualiser()}
  let aJoue=false;
  function activer(on){active=on;repos();actualiser();if(on){void chargerBruits();if(aJoue){aJoue=false;bruit('trappe-fermeture',performance.now(),350,.8)}}if(on&&prefs.dialogue)void chargerVoix()}
  function run(done){reset();playing=true;actualiser();const gen=generation,start=performance.now(),mini=reduced(),entree=mini?300:2350;   /* la réplique part juste après l'impact (à la place du rire de Tony) */
    const duree=mini?540:3300;   /* la réplique continue pendant le choix de l'univers : la scène n'attend plus sa fin */
    stage.classList.add('chute');void programmerVoix(start,entree,gen);aJoue=true;
    if(!mini){   // bruitages calés sur l'animation (ms depuis l'appui)
      bruit('tony-bouton',start,0,1,gen);bruit('trappe-verrou',start,330,.9,gen);bruit('trappe-ouverture',start,500,1,gen);
      bruit('kenny-cri-chute',start,780,.95,gen);bruit('chute-souffle',start,800,.7,gen);
      bruit('chute-impact',start,2250,.8,gen);bruit('transition-plongee',start,duree-830,.8,gen);
    }else{bruit('tony-bouton',start,0,1,gen);bruit('trappe-ouverture',start,150,.8,gen)}
    function tick(now){
      if(gen!==generation)return;const ms=now-start;
      if(!mini&&now-lastAir>=48){lastAir=now;peindreAir(now)}
      const press=ease(ms/(mini?180:500))*(1-.25*ease((ms-1320)/520)),open=ease((ms-(mini?200:520))/(mini?120:680));
      const drop=clamp((ms-(mini?260:795))/(mini?95:820)),depth=mini?ease(drop):drop*drop;
      const fall=ease((ms-duree+815)/740),fade=ease((ms-duree+(mini?140:360))/(mini?140:315));
      g.clearRect(0,0,W,H);pressing(press);
      if(open>.001){
        g.save();g.beginPath();g.rect(0,0,W,H);g.moveTo(...topL);g.lineTo(...topR);g.lineTo(...lowR);g.lineTo(...lowL);g.closePath();g.clip('evenodd');
        g.globalAlpha=1-ease(depth*1.8);g.drawImage(ombre,0,0);g.restore();
        trap(open,1-ease(open*1.25));
      }else g.drawImage(ombre,0,0);
      if(!mini||drop===0)personnage(depth,Math.sin(Math.PI*clamp((ms-540)/380)));
      stage.style.setProperty('--disparition',String(1-ease((ms-(mini?170:480))/(mini?200:500))));
      if(!mini)camera.style.transform='scale('+(1+.075*ease((ms-675)/1200)+fall*3.9)+')';
      stage.style.setProperty('--voile-chute',String(fade));
      if(ms>=duree){const garde=[...enCours],voixEnCours=lecture;enCours.clear();lecture=null;reset();garde.forEach(x=>enCours.add(x));lecture=voixEnCours;done()}   /* fin naturelle : on laisse finir le rire et la plongée */else flight=requestAnimationFrame(tick);
    }
    flight=requestAnimationFrame(tick);
  }
  document.addEventListener('visibilitychange',actualiser);
  return {reset,run,activer,actualiser};
}

'use strict';
const get=id=>document.getElementById(id);
const dialog=get('pal'),btn=get('solo');
const prefs={son:false,dialogue:true,reduit:matchMedia('(prefers-reduced-motion: reduce)').matches,direct:false};
try {
  const valeurs=JSON.parse(localStorage.getItem('roni.menu.prefs')||'{}');
  for(const k of Object.keys(prefs)) if(typeof valeurs?.[k]==='boolean') prefs[k]=valeurs[k];
  if(localStorage.getItem('roni.menu.v')!=='2'){prefs.dialogue=true;localStorage.setItem('roni.menu.v','2');localStorage.setItem('roni.menu.prefs',JSON.stringify(prefs));}   // la réplique est remise en marche une fois (16/11)
} catch {}
function savePrefs(){
  try{localStorage.setItem('roni.menu.prefs',JSON.stringify(prefs));}catch{}
}
function sonInterface(id){if(prefs.son) HearthstoneFX.son(id);}
const bureau=installerBureau();
let locked=false;
function eventRoni(action,detail={}){const f=opts[action];if(typeof f==='function'){try{f(detail)}catch(e){}}}
function solo(){
  if(locked)return;
  if(prefs.direct){sonInterface('clic');eventRoni('solo');return;}   // départ direct : ni chute dans la trappe ni réplique
  locked=true;
  for(const b of document.querySelectorAll('#cadre button')) b.disabled=true;
  if(prefs.dialogue)HearthstoneFX.silence();else sonInterface('clic');
  bureau.run(()=>{
    locked=false;
    for(const b of document.querySelectorAll('#cadre button')) b.disabled=false;
    get('annonce').textContent='Kenny est tombé dans la trappe. Départ solo.';
    eventRoni('solo');
  });
}
function openPanel(html){
  if(locked||dialog.open)return;
  get('contenu').innerHTML=html;
  const titre=get('contenu').querySelector('h2');
  if(titre){if(!titre.id)titre.id='titre-panneau';dialog.setAttribute('aria-labelledby',titre.id);}
  dialog.showModal();sonInterface('ouverture');
}
get('tableau-mur').onclick=()=>openPanel('<section class="peinture-detail"><img src="assets/tony/citadelle.webp" alt="Sous la lune, Rick et Morty observent la Citadelle par un portail vert."><h2>La Citadelle des Ricks</h2></section>');
const vuesVitrine = {
  ensemble: ['Vue d’ensemble', 'Les deux portes vitrées du meuble de Tony et ses trois étagères.'],
  boule: ['Boule à quatre étoiles', 'Quatre étoiles rouges dans le cristal ambré, sur un coussin de velours.'],
  bandeau: ['Bandeau de Konoha', 'La feuille de Konoha gravée dans la plaque en métal rivetée sur un bandeau indigo.'],
  shuriken: ['Shuriken', 'Deux shuriken à quatre pointes sur un support de bois sombre.']
};
get('vitrine-mur').onclick = () => {
  const choix = Object.entries(vuesVitrine).map(([id, [nom]]) =>
    '<button type="button" data-objet="'+id+'" aria-pressed="'+(id==='ensemble')+'">'+nom+'</button>'
  ).join('');
  openPanel('<section class="vitrine-detail" data-vue="ensemble" aria-labelledby="titre-collection">'+
    '<h2 id="titre-collection">La vitrine de Tony</h2>'+
    '<div class="vitrine-image"><img src="assets/tony/vitrine.webp" alt="'+vuesVitrine.ensemble[1]+'"></div>'+
    '<div class="vitrine-choix" role="group" aria-label="Objet à examiner">'+choix+'</div></section>');
  const vitrine = get('contenu').querySelector('.vitrine-detail');
  vitrine.querySelector('.vitrine-choix').onclick = event => {
    const bouton = event.target.closest('[data-objet]');
    if (!bouton || vitrine.dataset.vue===bouton.dataset.objet) return;
    sonInterface('clic');
    vitrine.dataset.vue = bouton.dataset.objet;
    vitrine.querySelector('img').alt = vuesVitrine[bouton.dataset.objet][1];
    for(const b of vitrine.querySelectorAll('[data-objet]')) b.setAttribute('aria-pressed', String(b===bouton));
  };
};

function reg() {
  openPanel(`<h2>Paramètres</h2>
    <label class="hs-setting"><input id="son" type="checkbox"> Sons d’interface</label>
    <label class="hs-setting"><input id="dialogue" type="checkbox"> Réplique de la trappe</label>
    <label class="hs-setting"><input id="reduit" type="checkbox"> Réduire les animations</label>
    <label class="champ" for="pseudo">Ton nom</label>
    <input id="pseudo" type="text" maxlength="20" placeholder="Aventurier" autocomplete="nickname" spellcheck="false">
    <button type="button" id="atelier" class="lien-atelier"></button>
`);
  const pseudo=get('pseudo');pseudo.value=opts.nom?opts.nom():'';pseudo.oninput=()=>eventRoni('pseudo',{nom:pseudo.value});
  const atl=get('atelier');atl.textContent=opts.atelierNom?opts.atelierNom():'Toutes les cartes';atl.onclick=()=>{dialog.close();eventRoni('atelier')};
  for (const k of ['son','dialogue','reduit']) {
    const e=get(k);
    e.checked=prefs[k];
    e.onchange=()=>{
      prefs[k]=e.checked;
      document.body.classList.toggle('repos-visuel',prefs.reduit);
      savePrefs();bureau.actualiser();
      if(prefs.son) sonInterface('clic');
      else HearthstoneFX.silence();
      eventRoni('parametres',{...prefs});
    };
  }
}
function multi() {
  openPanel(`<h2>Créer une partie multijoueur</h2>
    <label class="champ" for="salon">Nom du salon</label>
    <input id="salon" type="text" maxlength="36" required value="La table de Tony" aria-describedby="erreur-salon">
    <p id="erreur-salon" class="hs-error" role="status"></p>
    <p>Choisis le nom à transmettre au jeu.</p>
    <button type="button" id="creer">Créer le salon</button>`);
  const field=get('salon'),error=get('erreur-salon');
  field.oninput=()=>{error.textContent='';field.removeAttribute('aria-invalid')};
  get('creer').onclick=()=>{
    const nom=field.value.trim();
    if(!nom){
      field.setAttribute('aria-invalid','true');error.textContent='Donne un nom au salon.';
      field.focus();sonInterface('refus');return;
    }
    sonInterface('clic');eventRoni('multijoueur',{salon:nom});
    get('contenu').innerHTML='<h2 tabindex="-1"></h2><p>Nom du salon transmis.</p><button value="close">Retour à l’accueil</button>';
    const titre=get('contenu').querySelector('h2');titre.id='titre-panneau';dialog.setAttribute('aria-labelledby',titre.id);titre.textContent=nom;titre.focus();
  };
  field.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();get('creer').click()}};
}
btn.onclick=solo;
{const d=get('direct');d.checked=!!prefs.direct;d.onchange=()=>{prefs.direct=d.checked;savePrefs();sonInterface('clic');eventRoni('parametres',{...prefs})};}
get('multi').onclick=()=>{if(locked)return;sonInterface('clic');eventRoni('multijoueur')};get('rejoindre').onclick=()=>{if(locked)return;sonInterface('clic');eventRoni('rejoindre')};get('regler').onclick=reg;
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
dialog.addEventListener('close',()=>{if(!locked&&!dialog.open)sonInterface('fermeture')});
document.body.classList.toggle('repos-visuel',prefs.reduit);
const mouvement={reduit:()=>prefs.reduit};
HearthstoneFX.attacher(btn,'jouer',mouvement);
HearthstoneFX.attacher(get('multi'),'defi',mouvement);
HearthstoneFX.attacher(get('regler'),'defi',mouvement);HearthstoneFX.attacher(get('rejoindre'),'defi',mouvement);
HearthstoneFX.attacher(get('vitrine-mur'),'collection',mouvement);
HearthstoneFX.attacher(get('tableau-mur'),'collection',mouvement);
bureau.activer(true);
window.addEventListener('pagehide',()=>{HearthstoneFX.silence();bureau.activer(false);bureau.reset()});
window.addEventListener('pageshow',e=>{if(e.persisted){locked=false;for(const b of document.querySelectorAll('#cadre button'))b.disabled=false;bureau.activer(true)}});

  return { activer(on) { bureau.activer(on); if (!on) { HearthstoneFX.silence(); if (dialog.open) dialog.close(); } }, reset() { locked = false; for (const b of root.querySelectorAll('#cadre button')) b.disabled = false; bureau.reset(); } };
}
const TONY_CSS = ".passer-intro{position:absolute;z-index:6;top:1.2cqw;right:calc(1.4cqw + 76px);display:flex;align-items:center;gap:8px;padding:6px 12px;border-radius:6px;background:#10161bcc;border:1px solid #c8a06288;color:#f3e3c2;font:600 clamp(12px,1vw,16px)/1.2 Georgia,serif;cursor:pointer;user-select:none}.passer-intro input{width:16px;height:16px;margin:0;accent-color:#6fcf5a;cursor:pointer}*{box-sizing:border-box} .tbody{color-scheme:dark;--shell:#0f1416;--text:#f5eee0;--sub:#b1b4ac;--rule:#374146;color:var(--text);background:var(--shell);font:16px/1.4 \"Archivo\",Arial,sans-serif}.tbody{margin:0}button,select,input{font:inherit}button,select{cursor:pointer}button:focus-visible,select:focus-visible,input:focus-visible{outline:3px solid #91d6e9;outline-offset:3px}.sr{position:absolute;width:1px;height:1px;padding:0;overflow:hidden;clip-path:inset(50%);white-space:nowrap}.atelier,main{max-width:1560px;margin:auto}.atelier{min-height:72px;padding:12px 3.5%;display:flex;align-items:center;justify-content:space-between;gap:14px}.ident,.atelier nav{display:flex;gap:18px;align-items:center}.ident>b{font:700 25px/.9 Georgia,serif;letter-spacing:.02em;color:#e5c293}.ident span{border-left:1px solid #5c615c;padding-left:18px;color:#c4c5bc;font-size:.9rem}.atelier nav{gap:5px}.navbtn,.choice select{height:38px;border:1px solid #394448;border-radius:4px;color:#f3f2e8;background:#1d2528}.navbtn{width:38px;font:26px Georgia}.choice select{padding:0 8px;max-width:52vw}.navbtn:hover,.choice select:hover{border-color:#b29568}main{padding:0 2.3% 26px}#cadre{position:relative;isolation:isolate;overflow:hidden;width:100%;aspect-ratio:16/9;container-type:inline-size;--a:#d6ab65;--d:#19251e;--ink:#fff4dc;--mx:7%;--mwidth:37%;--mt:22%;--head:9.4cqw;--heroX:72%;--heroH:85%;--heroY:-4%;--actorDir:1;--veil:linear-gradient(90deg,rgba(8,13,14,.83),rgba(9,12,13,.37) 39%,transparent 69%);background:var(--d);box-shadow:0 0 0 1px #303839}#decor,.ombre,.liseres{position:absolute;inset:0;pointer-events:none}#indices{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}#decor{background-size:cover;background-position:center}.ombre{background:var(--veil)}.liseres{z-index:3;inset:1.6%;border:1px solid #fff0;pointer-events:none}#cadre.droite{--mx:55%;--heroX:26%;--actorDir:-1;--veil:linear-gradient(270deg,rgba(16,14,16,.79),rgba(13,14,15,.37) 42%,transparent 73%)}#hote{position:absolute;z-index:2;bottom:var(--heroY);left:var(--heroX);height:var(--heroH);aspect-ratio:500/620;translate:-50% 0;pointer-events:none}.acteur{position:absolute;inset:0;transform-origin:50% 96%;scale:var(--actorDir) 1;filter:drop-shadow(.3cqw .7cqw .7cqw #09090a58)}.acteur img{display:block;position:absolute;inset:0;width:100%;height:100%;opacity:0}.acteur img#p0{opacity:1}.acteur[data-pose=\"1\"] img#p0,.acteur[data-pose=\"2\"] img#p0{opacity:0}.acteur[data-pose=\"1\"] img#p1,.acteur[data-pose=\"2\"] img#p2{opacity:1}.menu{position:absolute;z-index:4;left:var(--mx);width:var(--mwidth);top:var(--mt);color:var(--ink)}.titre{display:flex;align-items:center;justify-content:center;gap:1cqw;margin-bottom:2.15cqw}.titre h1{margin:0;font:700 var(--head)/.91 Georgia,\"Times New Roman\",serif;letter-spacing:-.065em;text-transform:uppercase;color:var(--a);text-shadow:0 .16cqw 0 #130e15,0 .35cqw .6cqw #090a0c65}.filet{display:block;flex:1;height:1px;background:var(--a);opacity:.83;position:relative}.filet:after{content:\"\";position:absolute;top:-.14cqw;right:0;border:.17cqw solid var(--a);transform:rotate(45deg)}.filet:last-child:after{right:auto;left:0}.actions{display:grid;gap:.63cqw}.gbutton{display:flex;align-items:center;justify-content:center;gap:.8cqw;position:relative;width:100%;min-height:3.7cqw;padding:.78cqw .7cqw;line-height:1.17;font-size:1.45cqw;font-weight:650;color:#fff1d7;background:color-mix(in srgb,var(--d) 91%,transparent);border:1px solid color-mix(in srgb,var(--a) 63%,transparent);letter-spacing:.018em;transition:filter .15s,translate .15s}.gbutton.primary{background:var(--a);color:#261909;border-color:var(--a);font-size:1.94cqw}.gbutton.settings{background:#10161bcc;border-color:color-mix(in srgb,var(--a) 42%,transparent);font-size:1.25cqw;min-height:3.1cqw}.gbutton:hover{filter:brightness(1.15);translate:0 -.08cqw}.gbutton:active{translate:0 .1cqw}.gbutton:disabled{cursor:wait}.icon{width:1.02em;height:1.02em;display:inline-block;position:relative;flex:none}.icon:before,.icon.two:after{content:\"\";position:absolute;left:22%;top:6%;width:49%;height:75%;border:.09em solid currentColor;border-radius:.1em;transform:rotate(-13deg)}.icon.one:after{content:\"\";position:absolute;width:.19em;height:.19em;background:currentColor;left:43%;top:41%;transform:rotate(35deg)}.icon.two:after{left:45%;top:16%;transform:rotate(12deg);background:var(--d)}.gear{font:normal 1.2em/1 \"Segoe UI Symbol\",sans-serif}.accessoire{display:none;position:absolute;z-index:3;pointer-events:none}.carte-volee{width:11%;aspect-ratio:5/7;left:42%;top:46%;border:2px solid #f4d89b;border-radius:8%;background:repeating-linear-gradient(45deg,#154b5c 0 3px,#236779 3px 5px);box-shadow:inset 0 0 0 2px #14313e,0 2px 9px #12151877;color:#ffe29a;place-items:center;font:1.5cqw Georgia}.piece-volee{width:8%;aspect-ratio:1;left:44%;top:37%;background:radial-gradient(circle,#58796b 0 37%,#e4af54 40% 65%,#96632d 68%);border:1px solid #ffefac;border-radius:50%}.reflet{left:45%;top:43%;font:4cqw/1 Georgia;color:#fff0a5;text-shadow:0 0 12px #efb75d}.eff-carte .carte-volee,.eff-jeton .piece-volee,.eff-bague .reflet{display:grid}.eff-carte .carte-volee{animation:lancer .55s ease-out both}.eff-jeton .piece-volee{animation:flip .64s ease-in-out both}.eff-bague .reflet{animation:glint .37s ease-out both}@keyframes lancer{0%{opacity:0;transform:translate(0,0) rotate(-20deg) scale(.45)}15%{opacity:1}100%{opacity:0;transform:translate(var(--vol,-210%),35%) rotate(48deg) scale(1.5)}}@keyframes flip{0%{opacity:0;transform:translateY(0) rotateY(0)}16%,73%{opacity:1}50%{transform:translateY(-240%) rotateY(450deg)}100%{opacity:0;transform:translateY(10%) rotateY(900deg)}}@keyframes glint{0%,100%{opacity:0;transform:scale(.28)}45%{opacity:.95;transform:scale(1.1)}}.droite{--vol:210%}.legende{padding:22px 1.25% 8px;display:flex;align-items:center;justify-content:space-between;gap:28px}.legende>div{display:flex;align-items:baseline;gap:12px}.mini{font:12px/1.3 monospace;color:#dab586;white-space:nowrap}.legende h2{font:normal clamp(21px,2.2vw,34px)/1.15 Georgia,serif;margin:0}.legende p{margin:0;color:var(--sub);font-size:.94rem;max-width:53%}dialog{width:min(410px,92vw);padding:28px;background:#20292b;color:var(--text);border:1px solid #927d59;border-radius:7px;box-shadow:0 18px 80px #0009}dialog::backdrop{background:#0a1014bb}dialog form{margin:0}dialog h2{margin:0 20px 18px 0;font:normal 29px/1.12 Georgia}dialog p{font-size:.91rem;color:#c8c9bc}dialog label{display:flex;gap:10px;align-items:center;margin:14px 0}.champ{display:grid}dialog input[type=text]{min-width:0;width:100%;font:inherit;background:#121a1d;color:#fff;border:1px solid #74817b;padding:9px;border-radius:4px}dialog button{color:#252119;background:#e6c58c;border:0;border-radius:3px;padding:8px 15px}.dialog-close{position:absolute;right:10px;top:9px;background:none;color:#e7c88d;font-size:23px;line-height:1}.capture .atelier,.capture .legende{display:none}.capture main{max-width:none;margin:0;padding:0}.capture #cadre{width:100%;height:100vh;aspect-ratio:auto}.capture{overflow:hidden}\n\n\n/* Un motif typographique et une construction de menu propres \u00e0 chaque lieu. */\n#cadre.club{--mx:6.8%;--mwidth:33%;--mt:20%;--heroH:86%}.club .menu{padding:1.2cqw 1.3cqw 1.3cqw;background:linear-gradient(90deg,#17291bdc,#17291b91);outline:1px solid #cfa76288;box-shadow:0 0 0 .4cqw #14211992,0 0 0 calc(.4cqw + 1px) #a7834b6b}.club .gbutton{font-family:Georgia,serif}.club .gbutton.primary{box-shadow:inset 0 0 0 .23cqw #ad8243,inset 0 0 0 calc(.23cqw + 1px) #eacf96}.club .menu{--head:7.7cqw}\n#cadre.rail{--mt:14%;--mx:57%;--mwidth:34%;--heroH:89%}.rail .menu{padding:1.35cqw 1.7cqw 1.7cqw;background:#50272ae8;border-top:.38cqw double #e4bd82;border-bottom:.38cqw double #e4bd82}.rail .titre h1{font-family:\"Rockwell\",\"Georgia\",serif;font-weight:bold;letter-spacing:.07em;font-size:7.3cqw}.rail .gbutton{border-radius:.24cqw;text-transform:uppercase;font-size:1.12cqw;letter-spacing:.07em}.rail .gbutton.primary{background:linear-gradient(105deg,#c99959,#ffe1a6 48%,#ce9c60);font-size:1.65cqw}.rail .gbutton.settings{min-height:2.8cqw}\n#cadre.sky{--mx:6%;--mt:13%;--mwidth:40%;--heroH:89%;--heroX:72%;--veil:linear-gradient(90deg,#161c3dc7,transparent 70%)}.sky .titre{justify-content:flex-start}.sky .filet{display:none}.sky h1{font:900 12cqw/.91 \"Arial Black\",\"Arial\",sans-serif;letter-spacing:-.105em;color:#ffd5bd;text-shadow:0 .35cqw #924961}.sky .actions{width:83%}.sky .gbutton{justify-content:flex-start;text-align:left;padding-left:1.55cqw;border:0;border-left:.32cqw solid #f6bd9d;background:#1d2447e8}.sky .gbutton.primary{background:#f6b899;color:#302544}.sky .settings{background:#1a2234d0}\n#cadre.diner{--mx:59%;--mwidth:31%;--mt:15%;--heroH:88%}.diner .menu{padding:1.4cqw 1.45cqw;border-radius:2.7cqw .45cqw 2.7cqw .45cqw;background:#154948f4;border:.23cqw solid #c1e1d4;box-shadow:0 0 0 .36cqw #2b6766,0 0 0 .45cqw #e1caa7}.diner .titre{margin-bottom:1.4cqw}.diner h1{text-transform:none;letter-spacing:-.09em;font:italic bold 8.6cqw/.86 Georgia;color:#ffd9b1;text-shadow:.14cqw .17cqw #ad635c}.diner .filet{height:.32cqw;border-block:1px solid #edc2a0;background:none}.diner .filet:after{display:none}.diner .gbutton{border-radius:2cqw}.diner .primary{background:#ffdab0}.diner .secondary,.diner .settings{color:#f9ecce}\n#cadre.jazz{--mx:8%;--mwidth:36%;--mt:14%;--heroH:89%}.jazz .titre{border-block:.25cqw double #e6b67e;padding:.5cqw 0 1cqw}.jazz .filet{display:none}.jazz h1{font:normal 9.5cqw/.9 \"Baskerville Old Face\",Georgia,serif;letter-spacing:.115em;margin-right:-.12em;color:#ffe3b3}.jazz .gbutton{font-family:Georgia,serif;letter-spacing:.04em;background:#301328e5;border:1px solid #b28b66}.jazz .primary{color:#ffe6a8;background:#742f4a;border:.24cqw double #f4cc88}.jazz .settings{justify-self:center;width:65%;background:#261725d7}\n#cadre.office{--mx:54%;--mwidth:38%;--mt:13%;--heroH:88%}.office .menu{background:#f2dfb7f2;color:#332b27;--ink:#322920;padding:1.4cqw 2cqw 1.75cqw;box-shadow:.6cqw .6cqw 0 #2e272b83;transform:rotate(-1deg);border:.12cqw solid #443b29}.office .titre{justify-content:flex-start;gap:0;border-bottom:.35cqw double #574530;margin:0 0 1.1cqw}.office .filet{display:none}.office h1{font:bold 8.4cqw/.98 Georgia,serif;color:#392e27;text-shadow:none;letter-spacing:-.075em}.office .gbutton{justify-content:flex-start;gap:1cqw;background:transparent;color:#332b24;border:0;border-bottom:1px solid #827358;padding-left:1.2cqw}.office .gbutton.primary{color:#f9e3b1;background:#3b493b}.office .gbutton.settings{color:#443725}.office .two:after{background:#f2dfb7}\n#cadre.tavern{--mx:8%;--mwidth:34%;--mt:14%;--heroH:88%}.tavern .titre{padding:.7cqw 0 1cqw;border-bottom:1px solid #dfbc7b}.tavern .titre .filet{height:.32cqw;opacity:1;background:linear-gradient(90deg,transparent,#c29a61)}.tavern .titre .filet:last-child{transform:rotate(180deg)}.tavern h1{color:#ffdfa2;letter-spacing:-.045em}.tavern .gbutton{font-family:Georgia,serif;clip-path:polygon(1.2cqw 0,calc(100% - 1.2cqw) 0,100% 50%,calc(100% - 1.2cqw) 100%,1.2cqw 100%,0 50%);border:0;border-block:.17cqw solid #bc9c63;background:linear-gradient(#3e4a3c,#1f332b)}.tavern .gbutton.primary{color:#fff0c7;background:linear-gradient(#a17039,#5d4027);border-block:.22cqw double #efc77c}.tavern .gbutton.settings{width:75%;justify-self:center}\n#cadre.cinema{--mx:54%;--mwidth:37%;--mt:20%;--heroH:89%;--veil:linear-gradient(270deg,#0e22296b,transparent 66%)}.cinema .menu{padding:1.55cqw 1.65cqw;background:#e8dfc4ee;box-shadow:0 .5cqw 2cqw #0e20285c;border-block:.35cqw double #314342}.cinema h1{font:900 8.4cqw/.86 \"Arial Black\",Arial,sans-serif;letter-spacing:-.055em;color:#213b42;text-shadow:none}.cinema .titre{margin-bottom:1.25cqw}.cinema .filet{background:#243d43}.cinema .filet:after{border-color:#243d43}.cinema .gbutton{background:#e4dbc1;color:#223a3c;border:1px solid #566963}.cinema .gbutton.primary{background:#a74638;color:white;border-color:#a74638}.cinema .gbutton.settings{min-height:2.4cqw;border:0}\n#cadre.dock{--mx:6%;--mt:11%;--mwidth:47%;--heroX:75%;--heroH:94%;--heroY:-8%;--veil:linear-gradient(90deg,#102030c7,transparent 65%)}.dock .titre{justify-content:flex-start;margin-bottom:3.6cqw}.dock .filet{display:none}.dock h1{font:900 11.8cqw/.92 \"Arial Narrow\",\"Arial Black\",Arial,sans-serif;letter-spacing:-.055em;color:#fbd08b;text-shadow:.18cqw .22cqw #192c3a}.dock .actions{grid-template-columns:1fr 1fr;gap:.7cqw;width:95%}.dock .gbutton{border-radius:0;min-height:4.7cqw;background:#142a38e6}.dock .gbutton.primary{grid-column:1/-1;justify-content:flex-start;padding-left:1.5cqw;background:#f2c17e;color:#28251e}.dock .gbutton.secondary,.dock .gbutton.settings{min-height:4.4cqw;font-size:1.15cqw}.dock .settings{color:#e6dcc9}.dock .menu{border-left:.32cqw solid #d9a65e;padding-left:1.4cqw}\n#cadre.lodge{--mx:55%;--mwidth:35%;--mt:18%;--heroH:87%}.lodge .menu{background:linear-gradient(90deg,#342524de,#352525f0);border-radius:1.4cqw;padding:1.1cqw 1.65cqw 1.45cqw;outline:1px solid #b99b6b8c}.lodge .titre{margin-bottom:1.2cqw}.lodge h1{font:bold 8.9cqw/1 Georgia;color:#f9e6c4;text-transform:none;letter-spacing:-.075em}.lodge .gbutton{border-radius:.5cqw;color:#fff1d7;background:#59362f}.lodge .primary{background:#d6a06e;color:#332119}.lodge .settings{background:#352b2d}\n@media(max-width:700px){.atelier{padding:10px 12px;min-height:54px}.ident span{display:none}.atelier nav{gap:4px}main{padding:0 0 18px}.legende{padding:15px 14px;display:block}.legende p{max-width:none;margin:8px 0}}\n@media(max-width:640px) and (orientation:portrait){.tbody:not(.capture) #cadre{aspect-ratio:auto;height:min(118vw,76vh);min-height:390px;--heroH:71%;--heroY:15%;--heroX:72%;--mx:5%;--mwidth:54%;--mt:13%;--head:12.5cqw}.tbody:not(.capture) #cadre.droite{--heroX:28%;--mx:42%}.tbody:not(.capture) .menu{padding:2cqw;z-index:4}.tbody:not(.capture) .titre{margin:1cqw 0 3cqw}.tbody:not(.capture) .titre h1{font-size:13cqw}.tbody:not(.capture) .actions{width:100%;grid-template-columns:1fr;gap:1.3cqw}.tbody:not(.capture) .gbutton{min-height:44px!important;width:100%;font-size:clamp(12px,3.15cqw,16px);gap:1cqw;padding:1.8cqw 1.5cqw}.tbody:not(.capture) .gbutton.primary{font-size:4.45cqw}.tbody:not(.capture) .gbutton.settings{font-size:3cqw}.tbody:not(.capture) .menu{background-color:color-mix(in srgb,var(--d) 30%,transparent)}.tbody:not(.capture) #cadre.office .menu,.tbody:not(.capture) #cadre.cinema .menu{background:#eee0bff2}.tbody:not(.capture) .tavern .gbutton.settings{width:100%}.tbody:not(.capture) #decor{background-position:50% center}.tbody:not(.capture) #cadre{--heroY:-3%;--heroH:86%}}\n@media(prefers-reduced-motion:reduce){.gbutton{transition:none}}\n\n\n#camera{position:absolute;inset:0;isolation:isolate;transform-origin:51.5% 96%;pointer-events:none}#tony-vivant{position:absolute;left:-25%;top:-15.0538%;width:150%;height:115.0538%;pointer-events:none}.acteur.portrait-fumeur img{visibility:hidden}#meuble-avant,#trappe{position:absolute;inset:0;width:100%;height:100%;display:none;pointer-events:none}.cabinet #meuble-avant,.cabinet #trappe{display:block}#meuble-avant{z-index:3;object-fit:fill}#trappe{z-index:4}.chute .menu{opacity:var(--disparition,1);pointer-events:none}\n#cadre.cabinet{--heroX:82%;--heroH:73.5%;--heroY:14.8%;--mx:2.1%;--mt:15%;--mwidth:21%;--veil:linear-gradient(90deg,#0d171655,transparent 30%);--head:5.8cqw}\n.cabinet #decor{background-size:100% 100%}.cabinet .titre{margin:0 0 1.9cqw;border-block:1px solid #caac747a;padding:.7cqw 0 1.1cqw}.cabinet .titre h1{font:700 5.8cqw/.9 Georgia,serif;letter-spacing:-.06em;color:#f4dba6}.cabinet .filet{display:none}.cabinet .actions{gap:.48cqw}.cabinet .gbutton{font-family:Georgia,serif;min-height:2.85cqw;font-size:1.12cqw;background:#18221eee;border-color:#a78b56aa}.cabinet .gbutton.primary{background:linear-gradient(#ecd39a,#c7a566);color:#2b2419;font-size:1.52cqw}.cabinet .gbutton.settings{font-size:1.02cqw;min-height:2.2cqw}\n@media(max-width:640px) and (orientation:portrait){.tbody:not(.capture) #cadre.cabinet{aspect-ratio:1/1.12;height:auto;min-height:0;background:#17231f;--mx:5%;--mwidth:90%;--mt:54%}.tbody:not(.capture) .cabinet #camera{height:auto;aspect-ratio:16/9;bottom:auto;--heroH:73.5%;--heroY:14.8%;--heroX:82%}.tbody:not(.capture) .cabinet .menu{padding:0;background:transparent}.tbody:not(.capture) .cabinet .titre{margin:0 0 2.4cqw;padding:.5cqw 0 1.2cqw;border:0}.tbody:not(.capture) .cabinet .titre h1{font-size:9.3cqw}.tbody:not(.capture) .cabinet .actions{width:100%;gap:1.2cqw}.tbody:not(.capture) .cabinet .gbutton{min-height:44px!important}.cabinet.chute{background:#080c11!important}}\n\n.cabinet #hote{clip-path:inset(-18% -28% 30% -28%)}\n\n#plateau-bureau,#air-bureau,#vitrine-mur,#tableau-mur{display:none}\n/* Le d\u00e9cor, les battants, les ombres et les zones actives partagent le m\u00eame rep\u00e8re. */\n.cabinet #plateau-bureau{display:block;position:absolute;inset:0;pointer-events:none;z-index:2}\n.cabinet.chute #camera::after{content:'';position:absolute;inset:0;z-index:6;pointer-events:none;background:#070a10;opacity:var(--voile-chute,0)}\n.tbody.bureau-actif{background:#161413;color:#fae8bc}\n.bureau-actif main{max-width:none;padding:0;margin:0}\n.bureau-actif .legende,.bureau-actif .atelier .ident{display:none}\n.bureau-actif .atelier{position:fixed;z-index:8;right:max(18px,env(safe-area-inset-right));bottom:max(16px,env(safe-area-inset-bottom));min-height:0;width:auto;padding:0;margin:0}\n.bureau-actif .atelier nav{border:1px solid #ac8657;border-radius:6px;padding:3px;background:linear-gradient(#3c3027f2,#211919f5);box-shadow:0 2px 0 #130d0d,0 3px 13px #0606067a;gap:0}\n.bureau-actif .atelier .navbtn,.bureau-actif .choice select{height:32px;border:0;background:transparent;color:#eed4a1;text-shadow:0 1px 2px #0d0809}\n.bureau-actif .atelier .navbtn{width:32px;font:22px/1 Georgia,serif}.bureau-actif .choice select{font:600 13px/1.2 Georgia,serif;max-width:48vw;color-scheme:dark;padding-inline:7px}.bureau-actif .choice option{background:#272322}\n.bureau-actif .atelier .navbtn:hover,.bureau-actif .choice select:hover{background:#e9b56e1f}\n.tbody.bureau-actif #cadre.cabinet{\n --scene-w:min(100vw,177.68svh);\n --plate-w:min(calc(var(--scene-w)*.222),44svh);\n width:100%;height:100svh;min-height:260px;aspect-ratio:auto;box-shadow:none;\n background:radial-gradient(ellipse at 87% 38%,#59402a 0%,#372a27 39%,#262025 71%,#19191c 100%);\n}\n.bureau-actif #cadre.cabinet #camera{\n width:var(--scene-w);height:auto;aspect-ratio:1672/941;bottom:auto;right:auto;\n top:50%;left:50%;translate:-50% -50%;transform-origin:51.7% 87%;\n}\n.bureau-actif .cabinet #decor{background-size:100% 100%;background-position:center}\n.bureau-actif .cabinet #hote,.bureau-actif .cabinet #indices,.bureau-actif .cabinet .liseres,.bureau-actif .cabinet .ombre,.bureau-actif .cabinet #meuble-avant{display:none}\n.bureau-actif .cabinet #air-bureau,.bureau-actif .cabinet #trappe{display:block;position:absolute;inset:0;width:100%;height:100%;pointer-events:none}\n.bureau-actif .cabinet #air-bureau{z-index:2}\n.bureau-actif .cabinet #tableau-mur{display:block;position:absolute;z-index:3;left:73.45%;top:15.85%;width:13.4%;height:17.2%;pointer-events:auto;background:transparent;border:0;border-radius:10%;cursor:zoom-in}\n.cabinet #tableau-mur:focus-visible{outline:2px solid #edd196;outline-offset:2px}.cabinet #tableau-mur:hover{box-shadow:inset 0 0 11px #eab45360}\n.cabinet.chute #tableau-mur{visibility:hidden}\n.tbody.bureau-actif .cabinet .menu{position:absolute;width:var(--plate-w);height:auto;aspect-ratio:815/1251;left:calc((100% - var(--scene-w))*.5 + var(--scene-w)*.051);top:47%;translate:0 -50%;padding:0;margin:0;container-type:inline-size;background:url('assets/tony/enseigne.webp') center/100% 100% no-repeat;border:0;border-radius:0;box-shadow:none;filter:brightness(.98) saturate(.95) drop-shadow(-2px 3px 2px #211416ae) drop-shadow(-9px 9px 8px #100d1080)}\n.cabinet .menu .titre{position:absolute!important;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);margin:0!important;padding:0!important;border:0!important}\n.tbody.bureau-actif .cabinet .actions{display:contents;width:auto}\n.tbody.bureau-actif .cabinet button.gbutton{\n display:grid;place-items:center;position:absolute;left:var(--x);top:var(--y);width:var(--w);height:var(--h);min-height:0!important;padding:0 5%;margin:0;border:0;border-radius:0;\n appearance:none;isolation:isolate;overflow:visible;background:none;box-shadow:none;\n color:#fff2ce;font:700 clamp(.875rem,1.44vw,1.9rem)/1 Georgia,'Times New Roman',serif;letter-spacing:.005em;text-align:center;translate:none;transform:none;filter:none;transition:transform .13s ease;\n}\n.cabinet .gbutton::before{content:'';z-index:-1;position:absolute;inset:0;background-image:url('assets/tony/enseigne.webp');background-repeat:no-repeat;background-size:var(--atlas-w) var(--atlas-h);background-position:var(--atlas-x) var(--atlas-y);clip-path:polygon(8% 0,92% 0,100% 30%,100% 72%,92% 100%,8% 100%,0 72%,0 30%);transition:filter .17s ease}\n.cabinet button.gbutton:hover::before{filter:brightness(1.17) saturate(1.07) drop-shadow(0 2px 2px #fff4a880)}\n.cabinet button.gbutton:active{transform:translateY(1.3%)}.cabinet button.gbutton:active::before{filter:brightness(.93)}\n.cabinet button.gbutton:focus-visible{outline:3px solid #ffeaca;outline-offset:2px;border-radius:11%}\n.cabinet button.gbutton .icon,.cabinet button.gbutton .gear{display:none}\n.cabinet button.gbutton span{display:block;position:relative;z-index:1;text-shadow:0 2px 1px #141421,0 3px 5px #11152d;max-width:100%}\n.tbody.bureau-actif .cabinet button.primary{--x:12.6%;--y:41.9%;--w:74.8%;--h:13.65%;--atlas-w:133.6898%;--atlas-h:732.6007%;--atlas-x:50%;--atlas-y:48.5235%;font-size:clamp(20px,8.4cqw,50px);color:#3c1e11}\n.cabinet button.primary span{text-shadow:0 1px 0 #fff0a3,0 -1px 0 #cd7e23}\n.tbody.bureau-actif .cabinet button.secondary{--x:12.8%;--y:57.6%;--w:74.4%;--h:13.2%;--atlas-w:134.4086%;--atlas-h:757.5758%;--atlas-x:50%;--atlas-y:66.3594%;font-size:clamp(14px,5.45cqw,32px)}\n.cabinet button.secondary span{max-width:95%;line-height:1.04;text-wrap:balance}\n.tbody.bureau-actif .cabinet button.settings{--x:13.2%;--y:72.9%;--w:73.7%;--h:12.85%;--atlas-w:135.6852%;--atlas-h:778.2101%;--atlas-x:50.1901%;--atlas-y:83.6489%;font-size:clamp(14px,5.35cqw,31px)}\n.cabinet.chute .menu{opacity:var(--disparition,1)}\n.bureau-actif #pal{width:min(92vw,420px);max-height:88svh;overflow:auto;color:#f2dbad;border:2px solid #ab8144;border-radius:15px;background:linear-gradient(145deg,#352b2b,#1c1b20 65%,#202726);box-shadow:0 0 0 3px #241918,0 0 0 5px #785c3c,0 20px 70px #000b}\n.bureau-actif #pal h2{color:#ffdaa1;font-family:Georgia,serif}\n.bureau-actif #pal::backdrop{background:#100d12b8;backdrop-filter:blur(4px)}\n.bureau-actif #pal:has(.peinture-detail){width:min(700px,88vw);padding:10px}\n.peinture-detail img{display:block;width:100%;max-height:68svh;object-fit:contain;background:#181517;border:2px solid #8a663c;border-radius:4px}\n.peinture-detail h2{text-align:center;font:500 clamp(17px,3vw,25px) Georgia,serif;margin:11px 0 5px}\n@media(max-width:900px) and (orientation:portrait){\n .tbody.bureau-actif #cadre.cabinet{--scene-w:min(178vw,99svh);--plate-w:min(71vw,40svh,calc((100svh - var(--scene-w)*.53 - 54px)*0.651));min-height:510px;height:100svh;background:radial-gradient(ellipse at 50% 57%,#483422 0,#242123 49%,#151b1d 86%)}\n .tbody.bureau-actif #cadre.cabinet::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 94% 58%,#d795462b,transparent 57%),linear-gradient(235deg,#32212114 23%,#16151b61 74%),linear-gradient(0deg,#17131bbb,transparent 65%),url('assets/tony/boiserie.webp') center bottom/100% 69% no-repeat;pointer-events:none}\n .tbody.bureau-actif #cadre.cabinet #camera{top:0;left:calc((100% - var(--scene-w))*.76);translate:0 0;aspect-ratio:1672/941;height:auto;transform-origin:51.7% 87%}\n .tbody.bureau-actif #cadre.cabinet::after{content:'';position:absolute;z-index:3;pointer-events:none;inset:0 0 auto;height:calc(var(--scene-w)*.563);background:linear-gradient(0deg,#251e20 0%,#26202212 10%,transparent 18%)}\n .tbody.bureau-actif #cadre.cabinet .menu{left:50%;top:auto;bottom:max(50px,7svh);translate:-50% 0;width:var(--plate-w)}\n .bureau-actif .atelier{bottom:max(8px,env(safe-area-inset-bottom));left:50%;right:auto;translate:-50% 0}\n .bureau-actif .atelier nav{white-space:nowrap}.bureau-actif .choice select{max-width:56vw}\n .bureau-actif #pal:has(.peinture-detail){width:94vw}\n}\n@media(max-height:480px) and (orientation:landscape){.bureau-actif .atelier{right:5px;bottom:3px}.bureau-actif .atelier nav{padding:0}.bureau-actif .atelier .navbtn,.bureau-actif .choice select{height:24px}.bureau-actif .choice select{font-size:11px}}\n@media(prefers-reduced-motion:reduce){.cabinet button.gbutton,.cabinet .gbutton::before{transition:none}}\n\n/* La lampe de bureau \u00e9claire les surfaces tourn\u00e9es vers la droite. */\n.bureau-actif {--laiton-clair:#e5bd80;--laiton-ombre:#674929;--encre:#211a20}\n.bureau-actif .atelier nav {\n background:linear-gradient(235deg,#58412ef7,#32292af7 48%,#211d23fa);\n border-color:#a28052 var(--laiton-clair) var(--laiton-ombre) #795a3e;\n box-shadow:inset -1px 1px 0 #ffe6ac32,-3px 5px 12px #110d11a6;\n}\n.bureau-actif .atelier :is(button,select):focus-visible,.bureau-actif #pal :is(input,button):focus-visible {\n outline:2px solid #f3cd91;outline-offset:2px;\n}\n.bureau-actif #pal {\n background:radial-gradient(ellipse at 100% 0%,#58412e 0%,#3b2d2a 32%,#282227 69%,var(--encre) 100%);\n border-color:#a68154 var(--laiton-clair) var(--laiton-ombre) #826142;\n box-shadow:inset -1px 1px 1px #fae0ad32,0 0 0 3px #261b1b,0 0 0 5px #795d43,-12px 19px 55px #100d12b0;\n}\n.bureau-actif #pal::backdrop {background:linear-gradient(75deg,#140f19bf,#1c171b96 60%,#3428246b);backdrop-filter:blur(4px)}\n.bureau-actif #pal input {accent-color:#dfb478}\n.bureau-actif #pal input[type=text] {color:#f5e0bb;background:#281e20;border-color:#876c4d}\n.bureau-actif #pal button:not(.dialog-close) {\n background:linear-gradient(235deg,#f0d19b,#d7ae72 70%,#b48852);color:#302017;\n border-color:var(--laiton-clair);box-shadow:-2px 3px 5px #160f1170;\n}\n.bureau-actif #pal .dialog-close {color:#f4dbb0}\n.bureau-actif .peinture-detail img {border-color:#a0835a #c5a16b #5e4633 #785f42}\n@media(max-width:900px) and (orientation:portrait){\n .tbody.bureau-actif #cadre.cabinet #camera {mask-image:linear-gradient(to bottom,#000 93%,transparent 100%)}\n .tbody.bureau-actif #cadre.cabinet::after {display:none}\n}\n\n@media (min-width:901px), (orientation:landscape){\n .tbody.bureau-actif .cabinet .menu{transform:perspective(1300px) rotateY(14deg);transform-origin:50% 54%}\n}\n\n/* Le verre reste discret au repos et accroche la lumi\u00e8re \u00e0 l'approche. */\n.bureau-actif .cabinet #vitrine-mur{\n display:block;position:absolute;z-index:3;left:36.1%;top:16.36%;width:16.02%;height:33.58%;\n padding:0;border:0;border-radius:2px;background:transparent;pointer-events:auto;cursor:zoom-in;\n}\n.cabinet #vitrine-mur::before{\n content:'';position:absolute;inset:2% 1.7%;opacity:0;pointer-events:none;\n background:linear-gradient(118deg,transparent 48%,#ffe4b60c 54%,#ffe4b624 57%,#ffe4b60a 60%,transparent 65%);transition:opacity .24s ease;\n}\n.cabinet #vitrine-mur:is(:hover,:focus-visible)::before{opacity:1}\n.cabinet #vitrine-mur:focus-visible{outline:2px solid #e9c68b;outline-offset:2px}\n.bureau-actif .cabinet.chute #vitrine-mur{visibility:hidden}\n.cabinet button.gbutton::after{\n content:'';position:absolute;inset:8% 2%;pointer-events:none;opacity:0;\n clip-path:polygon(6% 0,94% 0,100% 24%,100% 76%,94% 100%,6% 100%,0 76%,0 24%);\n background:linear-gradient(112deg,transparent 44%,#ffebc61e 60%,#ffe7bd38 70%,transparent 85%);\n transition:opacity .16s ease;\n}\n.cabinet button.gbutton:is(:hover,:focus-visible)::after{opacity:.85}\n.cabinet button.gbutton:active::after{opacity:.22}\n.bureau-actif #pal:has(.vitrine-detail){width:min(730px,93vw);max-height:93svh;padding:clamp(15px,2.4vw,26px)}\n.vitrine-detail{display:grid;grid-template-columns:minmax(0,1.62fr) minmax(142px,1fr);align-items:start;column-gap:clamp(14px,2.4vw,28px)}\n.bureau-actif .vitrine-detail h2{grid-column:2;grid-row:1;align-self:end;margin:0 12px 17px 0;font:500 clamp(21px,2.6vw,30px)/1.07 Georgia,serif;text-wrap:balance}\n.vitrine-image{grid-column:1;grid-row:1/3;position:relative;overflow:hidden;aspect-ratio:4/5;max-height:73svh;justify-self:center;height:auto;width:100%;max-width:58.4svh;\n border:1px solid #b8935e;box-shadow:0 0 0 3px #1a1719,inset 0 1px 6px #201613;background:#241c19}\n.vitrine-image img{position:absolute;inset:0;width:100%;height:100%;object-fit:fill;transform-origin:0 0;transform:translate(var(--pan-x,0),var(--pan-y,0)) scale(var(--zoom,1));transition:transform .32s ease-out}\n.vitrine-detail[data-vue=\"boule\"]{--pan-x:-26%;--pan-y:-94%;--zoom:2.95}\n.vitrine-detail[data-vue=\"bandeau\"]{--pan-x:-13%;--pan-y:-14%;--zoom:2.56}\n.vitrine-detail[data-vue=\"shuriken\"]{--pan-x:-141%;--pan-y:-6%;--zoom:2.56}\n.vitrine-choix{grid-column:2;grid-row:2;display:grid;align-self:start;gap:6px}\n.bureau-actif #pal .vitrine-choix button{min-height:40px;padding:8px 12px;text-align:left;font:500 15px/1.15 Georgia,serif;color:#f2dfc1;border:1px solid #74593e;border-radius:3px;background:linear-gradient(115deg,#292324,#40322b);box-shadow:inset 0 1px 0 #e8b97616}\n.bureau-actif #pal .vitrine-choix button[aria-pressed=true]{color:#2b211a;border-color:#e4c491;background:linear-gradient(110deg,#c2975e,#ecd1a1);box-shadow:inset 0 1px 0 #fce7cdb0}\n.bureau-actif #pal .vitrine-choix button:hover{border-color:#dbb981}\n.bureau-actif #pal:has(.peinture-detail,.vitrine-detail) .dialog-close{display:grid;place-items:center;top:6px;right:6px;width:32px;height:32px;padding:0;color:#f9eacc;border:1px solid #af8a5e;border-radius:50%;background:#27201f;box-shadow:-1px 2px 4px #120e1560}\n@media(max-width:570px){\n .vitrine-detail{display:flex;flex-direction:column;align-items:center;gap:12px}\n .bureau-actif .vitrine-detail h2{align-self:start;margin:0 36px 0 0;font-size:23px}\n .vitrine-image{width:min(100%,48svh);max-height:60svh}\n .vitrine-choix{align-self:stretch;grid-template-columns:1fr 1fr;gap:5px}\n .bureau-actif #pal .vitrine-choix button{text-align:center;min-height:38px;font-size:14px}\n}\n@media(max-height:460px) and (orientation:landscape){\n .bureau-actif #pal:has(.vitrine-detail){width:min(555px,92vw);padding:10px 20px}\n .bureau-actif .vitrine-detail h2{font-size:20px;margin-bottom:9px}.bureau-actif #pal .vitrine-choix button{min-height:28px;padding:5px 9px}\n}\n.repos-visuel .vitrine-image img,.repos-visuel #vitrine-mur::before,.repos-visuel .cabinet .gbutton::after{transition:none}\n@media(prefers-reduced-motion:reduce){.vitrine-image img,.cabinet #vitrine-mur::before,.cabinet .gbutton::after{transition:none}}\n\n.hs-fx{display:block;position:absolute;pointer-events:none;opacity:0;background-position:center;background-repeat:no-repeat;background-size:100% 100%;z-index:1;mix-blend-mode:screen}\n.hs-fx-jouer,.hs-fx-defi{inset:-3% -1.5%}\n.hs-fx-collection{inset:-5%;background-size:190% 185%}\nbutton:disabled>.hs-fx{visibility:hidden}\n#pal .hs-setting{position:relative;padding-right:32px}\n#pal .hs-setting:has(input:checked)::after{content:\"\";position:absolute;top:50%;right:3px;width:26px;height:26px;transform:translateY(-50%);background:url('assets/tony/hs/Checkmark_Glow_web.webp') center/contain no-repeat;pointer-events:none}\n#pal .hs-doc{display:inline-block;margin-top:14px;color:#f4d297;text-underline-offset:4px}\n#pal .hs-doc:focus-visible{outline:2px solid currentColor;outline-offset:3px}\n#pal .hs-error{color:#f2b1a1}\n\n:host{position:fixed;inset:0;z-index:20;display:block;overflow:hidden;background:#161413}:host([hidden]){display:none}\n.tbody{position:absolute;inset:0;margin:0;overflow:hidden auto}\n.tbody.bureau-actif .cabinet button.primary{--x:12.601%;--y:36.371%;--w:74.798%;--h:11.847%;--atlas-w:133.6942%;--atlas-h:844.1296%;--atlas-x:50%;--atlas-y:41.2586%}\n.tbody.bureau-actif .cabinet button.secondary{--x:12.798%;--y:50.000%;--w:74.405%;--h:11.463%;--atlas-w:134.3997%;--atlas-h:872.3849%;--atlas-x:50%;--atlas-y:56.4735%}\n.tbody.bureau-actif .cabinet button.join{--x:12.798%;--y:63.189%;--w:74.405%;--h:11.463%;--atlas-w:134.3997%;--atlas-h:872.3849%;--atlas-x:50%;--atlas-y:71.3705%;font-size:clamp(14px,5.45cqw,32px)}\n.tbody.bureau-actif .cabinet button.settings{--x:13.202%;--y:76.475%;--w:73.706%;--h:11.159%;--atlas-w:135.6750%;--atlas-h:896.1318%;--atlas-x:50%;--atlas-y:86.0806%}\n.bureau-actif #pal input[type=text]{width:100%}\n.bureau-actif #pal .lien-atelier{margin-top:12px}\n";
const TONY_HTML = "\n<main><section class=\"cabinet\" id=\"cadre\" aria-label=\"Le bureau de Gros Tony. Kenny attend sur la trappe devant le bureau.\">\n  <div id=\"camera\"><div id=\"decor\" style=\"background-image:url(assets/tony/bureau-vitrine.webp)\"></div>\n    <div id=\"plateau-bureau\">\n      <canvas id=\"air-bureau\" width=\"1672\" height=\"941\" aria-hidden=\"true\"></canvas>\n      <canvas id=\"trappe\" width=\"1672\" height=\"941\" aria-hidden=\"true\"></canvas>\n      <button id=\"vitrine-mur\" type=\"button\" title=\"Examiner la vitrine\" aria-label=\"Examiner la collection de Tony\"></button>\n      <button id=\"tableau-mur\" type=\"button\" title=\"Regarder le tableau\" aria-label=\"Regarder le tableau de la Citadelle des Ricks\"></button>\n    </div>\n  </div>\n  <div class=\"menu\"><div class=\"titre\"><h1>Roni</h1></div>\n    <div class=\"actions\">\n      <button id=\"solo\" class=\"gbutton primary\" type=\"button\"><span>Jouer solo</span></button>\n      <button id=\"multi\" class=\"gbutton secondary\" type=\"button\"><span>Cr\u00e9er une partie multijoueur</span></button>\n      <button id=\"rejoindre\" class=\"gbutton join\" type=\"button\"><span>Rejoindre</span></button>\n      <button id=\"regler\" class=\"gbutton settings\" type=\"button\"><span>Param\u00e8tres</span></button>\n    </div>\n  </div>\n<label class=\"passer-intro\" title=\"Lancer la partie tout de suite, sans la chute dans la trappe ni la r\u00e9plique\"><input id=\"direct\" type=\"checkbox\"> Passer l\u2019animation et la r\u00e9plique</label></section><div id=\"annonce\" class=\"sr\" aria-live=\"polite\"></div></main>\n<dialog id=\"pal\" aria-labelledby=\"titre-panneau\"><form method=\"dialog\"><div id=\"contenu\"></div><button id=\"ferme\" formnovalidate value=\"close\" class=\"dialog-close\" aria-label=\"Fermer\">\u00d7</button></form></dialog>\n";

// ----- raccord au menu du jeu -----
function tonySync() {
  try {
    const want = V.screen === 'menu' && !V.waitTable && !window.TONY_OFF;
    if (!want && !V.tony) return;
    if (!V.tony) {
      const host = document.createElement('div'); host.id = 'tony'; document.body.appendChild(host);
      const act = a => { const b = document.querySelector('#app [data-act="' + a + '"]'); if (b) b.click(); };
      V.tonyHost = host;
      V.tony = tonyMount(host, {
        solo() { if (typeof soloOpen !== 'function' || !soloOpen()) act('m-solo'); },
        multijoueur() { act('m-online'); }, rejoindre() { act('m-join'); }, atelier() { act('atl-open'); },
        nom: () => V.nameRaw != null ? V.nameRaw : V.name, atelierNom: () => DATA.admin ? 'Atelier des cartes' : 'Toutes les cartes',
        pseudo({ nom }) { V.nameRaw = nom; V.name = (nom || '').trim() || 'Aventurier'; try { localStorage.setItem('tav-name', V.name); } catch (e) {} }
      });
      V.tonyOn = false;
    }
    if (want !== V.tonyOn) { V.tonyOn = want; V.tonyHost.hidden = !want; V.tony.activer(want); if (want) V.tony.reset(); }
    document.body.classList.toggle('tony-on', want);
  } catch (e) { console.error(e); }
}
(function () { const r0 = render; render = function () { const out = r0.apply(this, arguments); tonySync(); return out; };
  const st = document.createElement('style'); st.textContent = '#scene.sc-bureau{background:#161413 url(assets/tony/bureau-vitrine.webp) center/cover no-repeat}body.sc-lobby #scene.sc-bureau{transform:none;filter:brightness(.45) blur(3px)}body.tony-on #sfxb{display:none}body.tony-on .title{z-index:25;background:none!important;pointer-events:none}body.tony-on .title::before,body.tony-on .title::after{content:none!important}body.tony-on .title > :not(.mp-back):not(.mp){visibility:hidden!important}body.tony-on .title > .mp-back,body.tony-on .title > .mp{pointer-events:auto}'; document.head.appendChild(st); })();
