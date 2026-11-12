/* Roni · Gel de taverne. Chargement classique, sans dépendance. */
(function(global){
'use strict';
const script=document.currentScript,assetBase=new URL('assets/',script&&script.src||document.baseURI).href;
const instances=new WeakMap(),TAU=2*Math.PI,clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x)),ease=x=>(x=clamp(x),x*x*(3-2*x));
function rng(seed){return ()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296}}
function perimeter(w,h,type,rad){
 const p=[];if(type==='ovale'){for(let i=0;i<120;i++){const a=i*TAU/120-Math.PI/2;p.push([w*.5+w*.49*Math.cos(a),h*.5+h*.49*Math.sin(a)])}}
 else{const x=1,y=1,r=clamp(rad,2,Math.min(w,h)/2-1),right=w-1,bottom=h-1;
 const corners=[[right-r,y+r,-Math.PI/2],[right-r,bottom-r,0],[x+r,bottom-r,Math.PI/2],[x+r,y+r,Math.PI]];
 for(const [cx,cy,a] of corners)for(let j=0;j<=8;j++)p.push([cx+r*Math.cos(a+j*Math.PI/16),cy+r*Math.sin(a+j*Math.PI/16)])}
 const segments=[];let len=0;for(let i=0;i<p.length;i++){const a=p[i],b=p[(i+1)%p.length],dx=b[0]-a[0],dy=b[1]-a[1],l=Math.hypot(dx,dy);if(l>.001){segments.push({a,b,len,l,nx:-dy/l,ny:dx/l});len+=l}}
 return {path:new Path2D('M'+p.map(v=>v.join(' ')).join('L')+'Z'),at(t){const s=((t%1+1)%1)*len;const seg=segments.find(i=>s<=i.len+i.l)||segments[segments.length-1],q=(s-seg.len)/seg.l;return {x:seg.a[0]+(seg.b[0]-seg.a[0])*q,y:seg.a[1]+(seg.b[1]-seg.a[1])*q,nx:seg.nx,ny:seg.ny}}}
}
function creer(racine,options={}){
 const root=typeof racine==='string'?document.querySelector(racine):racine;if(!root||root.nodeType!==1)throw new TypeError('Élément de taverne introuvable.');if(instances.has(root))return instances.get(root);
 const choix=options.cartes||'[data-gel-carte]',forme=options.forme||'auto',marge=24,media=matchMedia('(prefers-reduced-motion: reduce)');
 const c=document.createElement('canvas');c.setAttribute('aria-hidden','true');c.className='roni-effet-gel';
 const savedPosition=root.style.position,positioned=getComputedStyle(root).position==='static';if(positioned)root.style.position='relative';
 Object.assign(c.style,{position:'absolute',left:-marge+'px',top:-marge+'px',width:'calc(100% + 48px)',height:'calc(100% + 48px)',display:'block',pointerEvents:'none',zIndex:String(options.zIndex??20)});
 root.appendChild(c);const g=c.getContext('2d');if(!g){c.remove();if(positioned)root.style.position=savedPosition;throw Error('Canvas 2D indisponible.')}
 const base=new URL(options.assets||assetBase,document.baseURI);if(!base.pathname.endsWith('/'))base.pathname+='/';
 let model=[],items=[],goal=!!options.gelee,progress=goal?1:0,transition=null,shatter=null,dirty=true,resize=true,frame=0,disposed=false,seen=true,w=0,h=0,ratio=1,timer=0,glint=null,watchUntil=0,sound=!!options.son;const geoms=new WeakMap();
 function isReduced(){return typeof options.mouvementReduit==='boolean'?options.mouvementReduit:media.matches}
 function schedule(){if(!disposed&&!frame&&!document.hidden&&seen)frame=requestAnimationFrame(tick)}
 function invalidate(){dirty=true;resize=true;schedule()}
 function imageFile(name){const im=new Image();im.onload=schedule;im.src=new URL(name,base).href;return im}
 const ridge=imageFile('crete-de-glace.webp'),splinter=imageFile('eclat.webp');
 const audio={};
 let lastSound=null,shardVariant=0;
 function play(on){
  if(!sound)return;
  const file=on?'gel.wav':'degel-'+(1+shardVariant)+'.wav';
  if(!on)shardVariant=(shardVariant+1)%3;
  lastSound?.pause();
  try{
   const clip=audio[file]||(audio[file]=new Audio(new URL(file,base).href));
   lastSound=clip;clip.volume=.55;clip.currentTime=0;void clip.play().catch(()=>{});
  }catch{}
 }
 const ro=new ResizeObserver(invalidate);ro.observe(root);
 function geometry(el,i,ww,hh){const css=getComputedStyle(el),rad=parseFloat(css.borderTopLeftRadius)||8,kind=el.dataset.gelForme||((forme==='auto')?(css.borderTopLeftRadius.includes('%')&&rad>=45?'ovale':'rectangle'):forme);
 const key=[Math.round(ww),Math.round(hh),kind,Math.round(rad),i].join('/'),old=geoms.get(el);if(old&&old.key===key)return old;
 const edge=perimeter(ww,hh,kind,rad),random=rng((i+19)*9109),scale=Math.min(ww,hh),sample=[];
 for(let j=0;j<64;j++){const a=edge.at(j/64);sample.push({...a,depth:scale*(.025+random()*.047),s:j/64,tone:random()})}
 const needles=[];for(let j=0;j<28;j++){const f=(j+random()*.75)/28,p=edge.at(f);needles.push({...p,s:f,length:scale*(.035+random()*.10),tilt:(random()-.5)*.85,n:random()})}
 const result={key,edge,sample,needles,ww,hh,scale,kind,seed:i};geoms.set(el,result);return result}
 function measure(){const nodes=Array.from(root.querySelectorAll(choix)).filter(el=>el!==c);for(const el of items)if(!nodes.includes(el))ro.unobserve(el);for(const el of nodes)if(!items.includes(el))ro.observe(el);items=nodes;const bounds=c.getBoundingClientRect();w=c.clientWidth;h=c.clientHeight;ratio=Math.min(global.devicePixelRatio||1,2);const W=Math.max(1,Math.round(w*ratio)),H=Math.max(1,Math.round(h*ratio));if(W!==c.width||H!==c.height){c.width=W;c.height=H}
 if(!bounds.width||!bounds.height){model=[];dirty=false;return}const sx=w/bounds.width,sy=h/bounds.height;model=nodes.map((el,i)=>{const r=el.getBoundingClientRect(),ww=r.width*sx,hh=r.height*sy;if(ww<4||hh<4)return null;return {x:(r.left-bounds.left)*sx,y:(r.top-bounds.top)*sy,geo:geometry(el,i,ww,hh)}}).filter(Boolean);dirty=false;resize=false}
 function polygon(points,fill){g.fillStyle=fill;g.beginPath();points.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]));g.closePath();g.fill()}
 function stroke(edges,color,width){g.strokeStyle=color;g.lineWidth=width;g.beginPath();edges.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]));g.stroke()}
 function edgeIce(o,k,sweep){
  const {ww,hh,scale,edge,sample,needles,seed,kind}=o;const rim=Math.max(1.8,Math.min(scale*.034,6.5));
  g.save();g.clip(edge.path);const veil=g.createLinearGradient(0,0,ww*.8,hh);veil.addColorStop(0,'rgba(156,231,249,.22)');veil.addColorStop(.38,'rgba(125,216,239,.038)');veil.addColorStop(.73,'rgba(105,204,235,.025)');veil.addColorStop(1,'rgba(111,213,241,.21)');g.globalAlpha=k;g.fillStyle=veil;g.fillRect(0,0,ww,hh);
  g.globalAlpha=1;for(let j=0;j<sample.length;j++){const a=sample[j],b=sample[(j+1)%sample.length],growth=ease((k*1.4-a.x/ww*.34)/.8);if(growth<=0)continue;const m=[a.x+a.nx*a.depth*growth,a.y+a.ny*a.depth*growth],n=[b.x+b.nx*b.depth*growth,b.y+b.ny*b.depth*growth];
    polygon([[a.x,a.y],[b.x,b.y],m],'rgba(88,193,230,'+growth*(.45+.20*a.tone)+')');polygon([[b.x,b.y],n,m],'rgba(204,242,249,'+growth*(.41+.18*b.tone)+')');if(j%4===seed%4)stroke([m,[a.x,a.y]],'rgba(240,255,255,'+growth*.72+')',Math.max(.65,scale*.007))}
  for(const p of needles){const growth=ease((k*1.24-.23*p.x/ww)/.91);if(!growth)continue;const tx=-p.ny,ty=p.nx,n=p.length*growth,vx=p.nx+tx*p.tilt,vy=p.ny+ty*p.tilt;const pt=(at,side)=>[p.x+n*(at*vx+side*tx),p.y+n*(at*vy+side*ty)];
    stroke([pt(0,0),pt(.47,.025),pt(1,0)],'rgba(211,247,255,'+(.28+.46*p.n)*growth+')',Math.max(.7,scale*.0075));for(const pos of [.32,.57]){stroke([pt(pos+.19,-.12),pt(pos,0),pt(pos+.21,.13)],'rgba(197,237,252,'+.50*growth+')',Math.max(.55,scale*.005))}}
  if(sweep>=0&&sweep<=1){const x=ww*(sweep*1.7-.32),shine=g.createLinearGradient(x-ww*.12,0,x+ww*.12,0);shine.addColorStop(0,'#d5f7ff00');shine.addColorStop(.52,'#e8ffff27');shine.addColorStop(1,'#edffff00');g.fillStyle=shine;g.fillRect(0,0,ww,hh)}g.restore();
  g.save();g.globalAlpha=k;g.strokeStyle='#287090';g.lineWidth=rim*1.22;g.stroke(edge.path);g.strokeStyle='#8bd8ed';g.lineWidth=rim*.65;g.stroke(edge.path);g.strokeStyle='#d3fbff';g.lineWidth=Math.max(.8,rim*.19);g.stroke(edge.path);
  if(ridge.complete&&ridge.naturalWidth&&k>.15){const t=ease((k-.15)/.85),rw=scale*(kind==='ovale'?.38:.42),rh=rw*ridge.naturalHeight/ridge.naturalWidth,xx=kind==='ovale'?ww*.57:ww*.79;g.save();g.translate(xx,kind==='ovale'?hh*.025:0);g.scale(t,t);g.rotate(kind==='ovale'?.20:.035);g.drawImage(ridge,-rw*.5,-rh*.84,rw,rh);g.restore()}
  g.restore();
 }
 function emitDebris(now){const r=rng(72823),parts=[];for(const m of model){const o=m.geo;for(let i=0;i<14;i++){const p=o.edge.at(r()),size=o.scale*(.028+r()*.049);parts.push({x:m.x+p.x,y:m.y+p.y,size,vx:-p.nx*(32+r()*80)+(r()-.5)*36,vy:-p.ny*34-22-r()*65,rot:r()*TAU,spin:(r()-.5)*9,life:.38+r()*.4,img:r()>.36})}}return {start:now,parts}}
 function debris(now){if(!shatter)return;const t=(now-shatter.start)/1000;if(t>.81){shatter=null;return}for(const p of shatter.parts){if(t>=p.life)continue;const a=1-t/p.life;g.save();g.globalAlpha=a;g.translate(p.x+p.vx*t,p.y+p.vy*t+148*t*t);g.rotate(p.rot+p.spin*t);if(p.img&&splinter.complete&&splinter.naturalWidth)g.drawImage(splinter,-p.size*.34,-p.size,p.size*.68,p.size*2);else polygon([[0,-p.size],[p.size*.4,0],[0,p.size*.7],[-p.size*.32,0]],'#b8effb');g.restore()}}
 function draw(now){g.setTransform(ratio,0,0,ratio,0,0);g.clearRect(0,0,w,h);g.lineJoin='round';g.lineCap='round';
  for(let i=0;i<model.length;i++){const m=model[i],offset=model.length>1?i/(model.length-1)*.15:0,k=ease((progress-offset)/(1-.15));if(k<=.0001)continue;g.save();g.translate(m.x,m.y);const sweep=transition&&goal?clamp((k-.55)*2.4):glint===null?-1:(now-glint)/720-i*.08;edgeIce(m.geo,k,sweep);g.restore()}debris(now)}
 function cancelGlint(){clearTimeout(timer);timer=0;glint=null}
 function rest(){if(goal&&progress===1&&!timer&&!isReduced()&&options.scintillement!==false&&seen&&!document.hidden){timer=setTimeout(()=>{timer=0;glint=performance.now();schedule()},3200)}}
 function tick(now){frame=0;if(disposed||document.hidden||!seen)return;if(dirty||resize||now<watchUntil)measure();
 if(transition){const t=clamp((now-transition.start)/transition.duration);progress=transition.from+(transition.to-transition.from)*ease(t);if(t===1){transition=null;progress=goal?1:0}}
 if(glint!==null&&now-glint>1450)glint=null;draw(now);if(transition||shatter||glint!==null||now<watchUntil)schedule();else rest()}
 function set(on,opts={}){if(disposed)return;const instant=!!opts.immediat||isReduced();if(on===goal&&!instant)return;const changed=on!==goal;const now=performance.now();if(transition){const v=clamp((now-transition.start)/transition.duration);progress=transition.from+(transition.to-transition.from)*ease(v)}goal=on;root.dataset.roniGelee=String(goal);cancelGlint();if(dirty)measure();
 if(instant){progress=on?1:0;transition=null;shatter=null}else{if(!on&&progress>.12)shatter=emitDebris(now);else shatter=null;transition={from:progress,to:on?1:0,start:now,duration:Math.max(100,(on?820:470)*Math.abs((on?1:0)-progress))}}
 if(opts.silencieux!==true&&changed)play(on);if(changed)root.dispatchEvent(new CustomEvent('roni:gel-change',{detail:{gelee:on}}));schedule()}
 const mo=new MutationObserver(invalidate);mo.observe(root,{childList:true,subtree:true,attributes:true,attributeFilter:['class','data-gel-forme','hidden']});
 const io=typeof IntersectionObserver==='function'?new IntersectionObserver(es=>{seen=es[0].isIntersecting;if(seen)invalidate();else{cancelGlint();cancelAnimationFrame(frame);frame=0}}):null;io?.observe(root);
 function follow(){watchUntil=performance.now()+380;invalidate()}function visibility(){if(document.hidden){cancelGlint();cancelAnimationFrame(frame);frame=0}else invalidate()}function motion(){if(isReduced())set(goal,{immediat:true,silencieux:true});else schedule()}
 document.addEventListener('visibilitychange',visibility);global.addEventListener('resize',invalidate);media.addEventListener('change',motion);root.addEventListener('scroll',follow,true);root.addEventListener('transitionrun',follow);root.addEventListener('transitionend',invalidate);
 const api={geler:o=>set(true,o),degeler:o=>set(false,o),synchroniser:(flag,o={})=>set(!!flag,{immediat:true,silencieux:true,...o}),actualiser:invalidate,activerSon:v=>{sound=!!v},get gelee(){return goal},detruire(){if(disposed)return;disposed=true;cancelGlint();cancelAnimationFrame(frame);ro.disconnect();mo.disconnect();io?.disconnect();document.removeEventListener('visibilitychange',visibility);global.removeEventListener('resize',invalidate);media.removeEventListener('change',motion);root.removeEventListener('scroll',follow,true);root.removeEventListener('transitionrun',follow);root.removeEventListener('transitionend',invalidate);for(const a of Object.values(audio)){a.pause();a.removeAttribute('src')}c.remove();if(positioned&&root.style.position==='relative')root.style.position=savedPosition;delete root.dataset.roniGelee;instances.delete(root)}};
 instances.set(root,api);root.dataset.roniGelee=String(goal);invalidate();return api;
}
global.RoniGel={creer};
})(window);


// ----- gel de la taverne (effet Roni) : la couche de glace suit la rangée de la boutique, re-créée à chaque rendu -----
// Les sons du gel restent ceux de la planche sonore du jeu (son:false ici).
function gelSync() {
  try {
    if (typeof RoniGel === 'undefined') return;
    const root = V.screen === 'game' && V.me ? document.querySelector('.keeper-zone:not(.enemy) .counter-line') : null;
    if (!root) { if (V.gelI) { try { V.gelI.detruire(); } catch (e) {} V.gelI = null; } V.gelRoot = null; if (!V.me || V.screen !== 'game') V.gelFz = null; return; }
    const fz = !!V.me.fz, fresh = root !== V.gelRoot || !root.querySelector('.roni-effet-gel');   // le rendu du jeu peut retirer la couche : on la recrée
    if (fresh && V.gelI) { try { V.gelI.detruire(); } catch (e) {} V.gelI = null; }
    const g = V.gelI || (V.gelI = RoniGel.creer(root, { cartes:'.mn .mn-svg', forme:'ovale', assets:'assets/gel/', son:false, zIndex:8 }));
    V.gelRoot = root;
    if (fresh) { if (V.gelFz === false && fz) { g.synchroniser(false); g.geler(); } else if (V.gelFz === true && !fz) { g.synchroniser(true); g.degeler(); } else g.synchroniser(fz); }
    else if (fz !== g.gelee) { if (fz) g.geler(); else g.degeler(); }
    V.gelFz = fz;
  } catch (e) {}
}
(function () { const r0 = render; render = function () { const out = r0.apply(this, arguments); gelSync(); return out; }; })();
// la couche de glace ne doit jamais intercepter les clics (le plateau redonne les clics aux enfants de la taverne)
(function () { try { const st = document.createElement('style'); st.textContent = ':root:root:root:root:root body canvas.roni-effet-gel.roni-effet-gel{pointer-events:none!important}'; document.head.appendChild(st); } catch (e) {} })();
