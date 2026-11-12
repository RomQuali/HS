import re, json, shutil, os
from PIL import Image
import numpy as np, colorsys
S='/tmp/claude-0/t/accueil/accueil-tony/'; O='/home/claude/parts/assets/tony/'
for f in ['bureau-vitrine.webp','citadelle.webp','kenny-lumiere.webp','vitrine.webp','kenny-voix.wav','boiserie.webp']: shutil.copy(S+'assets/bureau/'+f,O+f)
for f in os.listdir(S+'effets-hs/textures'): shutil.copy(S+'effets-hs/textures/'+f,O+'hs/'+f)
os.makedirs(O+'hs/sons/interface',exist_ok=True)
for f in os.listdir(S+'effets-hs/sons/interface'): shutil.copy(S+'effets-hs/sons/interface/'+f,O+'hs/sons/interface/'+f)
# enseigne à 4 boutons : on insère une copie de la rangée bleue (teinte bordeaux)
im=Image.open(S+'assets/bureau/enseigne.webp').convert('RGBA'); W,H=im.size; Y0,Y1=620,785; D=Y1-Y0
strip=np.array(im.crop((0,Y0,W,Y1))).astype(float)/255
hsv=np.zeros_like(strip[...,:3])
r,g,b=strip[...,0],strip[...,1],strip[...,2]
mx=strip[...,:3].max(-1); mn=strip[...,:3].min(-1)
blue=(b>r*1.25)&(b>g*1.05)
out=strip.copy()
# bleu -> bordeaux : on permute les canaux sur les pixels bleus
out[...,0]=np.where(blue,b*.95,r); out[...,1]=np.where(blue,r*.75,g); out[...,2]=np.where(blue,g*.55+r*.2,b)
strip2=Image.fromarray((out*255).astype('uint8'),'RGBA')
new=Image.new('RGBA',(W,H+D)); new.paste(im.crop((0,0,W,Y1)),(0,0)); new.paste(strip2,(0,Y1)); new.paste(im.crop((0,Y1,W,H)),(0,Y1+D))
new.save(O+'enseigne.webp',quality=90,method=6); NH=H+D
def vars_(x,y,w,h): return f"--x:{x/W*100:.3f}%;--y:{y/NH*100:.3f}%;--w:{w/W*100:.3f}%;--h:{h/NH*100:.3f}%;--atlas-w:{W/w*100:.4f}%;--atlas-h:{NH/h*100:.4f}%;--atlas-x:50%;--atlas-y:{y/(NH-h)*100:.4f}%"
B={'primary':(102.7,455,609.6,148.2),'secondary':(104.3,625.5,606.4,143.4),'join':(104.3,625.5+D,606.4,143.4),'settings':(107.6,791.7+D,600.7,139.6)}
css=open(S+'accueil.css').read()+'\n'+open(S+'salon.css').read()+'\n'+open(S+'effets-hs/interface.css').read()
css=re.sub(r'(?<![\w.#-])body(?![\w-])','.tbody',css).replace(':root','.tbody')
css=css.replace("url('assets/bureau/","url('assets/tony/").replace('url("assets/bureau/','url("assets/tony/').replace("url('textures/","url('assets/tony/hs/").replace('url("textures/','url("assets/tony/hs/')
css=css.replace('aspect-ratio:1086/1448',f'aspect-ratio:{W}/{NH}').replace('- 54px)*.75)',f'- 54px)*{W/NH:.3f})')
css+=f"""
:host{{position:fixed;inset:0;z-index:20;display:block;overflow:hidden;background:#161413}}:host([hidden]){{display:none}}
.tbody{{position:absolute;inset:0;margin:0;overflow:hidden auto}}
.tbody.bureau-actif .cabinet button.primary{{{vars_(*B['primary'])}}}
.tbody.bureau-actif .cabinet button.secondary{{{vars_(*B['secondary'])}}}
.tbody.bureau-actif .cabinet button.join{{{vars_(*B['join'])};font-size:clamp(14px,5.45cqw,32px)}}
.tbody.bureau-actif .cabinet button.settings{{{vars_(*B['settings'])}}}
.bureau-actif #pal input[type=text]{{width:100%}}
.bureau-actif #pal .lien-atelier{{margin-top:12px}}
"""
html=open(S+'index.html').read()
body=html.split('<body class="bureau-actif">')[1].split('<script')[0]
body=body.replace('assets/bureau/','assets/tony/')
body=body.replace('<button id="regler"','<button id="rejoindre" class="gbutton join" type="button"><span>Rejoindre</span></button>\n      <button id="regler"')
assert 'id="rejoindre"' in body
ifx=open(S+'effets-hs/interface.js').read().replace("new URL('.', document.currentScript.src)","new URL('assets/tony/hs/', window.location.href)").replace("'textures/'+images[effet]","images[effet]")
assert 'assets/tony/hs/' in ifx and "url(\"'+new URL(images[effet]" in ifx
bur=open(S+'bureau.js').read().replace("assets/bureau/","assets/tony/")
a="const piste=location.protocol==='file:'?window.RoniVoixLocale:'assets/tony/kenny-voix.wav';"; assert a in bur
bur=bur.replace(a,"const piste='assets/tony/kenny-voix.wav';")
a="donnees=await chargerVoix();if(!donnees)return;"; assert a in bur
bur=bur.replace(a,"donnees=await chargerVoix();if(!donnees){const secours=new Audio(piste);secours.volume=.8;setTimeout(()=>{if(generation===version&&playing&&prefs.dialogue)secours.play().catch(()=>{})},Math.max(0,depart+retard-performance.now()));return;}")
acc=open(S+'accueil.js').read().replace("assets/bureau/","assets/tony/")
i=acc.index('function eventRoni'); j=acc.index('function solo()')
acc=acc[:i]+"function eventRoni(action,detail={}){const f=opts[action];if(typeof f==='function'){try{f(detail)}catch(e){}}}\n"+acc[j:]
a="get('multi').onclick=multi;get('regler').onclick=reg;"; assert a in acc
acc=acc.replace(a,"get('multi').onclick=()=>{if(locked)return;sonInterface('clic');eventRoni('multijoueur')};get('rejoindre').onclick=()=>{if(locked)return;sonInterface('clic');eventRoni('rejoindre')};get('regler').onclick=reg;")
a="HearthstoneFX.attacher(get('regler'),'defi',mouvement);"; assert a in acc
acc=acc.replace(a,a+"HearthstoneFX.attacher(get('rejoindre'),'defi',mouvement);")
# paramètres : nom du joueur + accès à l'atelier
a="""    <label class="hs-setting"><input id="reduit" type="checkbox"> Réduire les animations</label>
`);"""; assert a in acc
acc=acc.replace(a,"""    <label class="hs-setting"><input id="reduit" type="checkbox"> Réduire les animations</label>
    <label class="champ" for="pseudo">Ton nom</label>
    <input id="pseudo" type="text" maxlength="20" placeholder="Aventurier" autocomplete="nickname" spellcheck="false">
    <button type="button" id="atelier" class="lien-atelier"></button>
`);
  const pseudo=get('pseudo');pseudo.value=opts.nom?opts.nom():'';pseudo.oninput=()=>eventRoni('pseudo',{nom:pseudo.value});
  const atl=get('atelier');atl.textContent=opts.atelierNom?opts.atelierNom():'Toutes les cartes';atl.onclick=()=>{dialog.close();eventRoni('atelier')};""")
acc=acc.replace("window.addEventListener('pagehide'","window.addEventListener('pagehide'")
js="""
// ----- page d'accueil : le bureau de Gros Tony (pack Roni-Accueil-Tony), monté dans un shadow DOM pour isoler ses styles -----
// Fichier généré par gen/tony_gen.py à partir du pack ; les images et sons sont dans assets/tony/.
"""+open(S+'effets-hs/courbe.js').read()+"""
function tonyMount(host, opts) {
  const root = host.attachShadow({ mode:'open' });
  root.innerHTML = '<style>' + TONY_CSS + '</style><div class="tbody bureau-actif">' + TONY_HTML + '</div>';
  const doc0 = window.document;
  const document = { getElementById:id => root.getElementById(id), querySelectorAll:s => root.querySelectorAll(s), querySelector:s => root.querySelector(s), createElement:t => doc0.createElement(t),
    addEventListener:(...a) => doc0.addEventListener(...a), get hidden() { return doc0.hidden; }, body:root.querySelector('.tbody'), currentScript:null };
"""+ifx.replace('window.HearthstoneFX = Object.freeze','const HearthstoneFX = window.HearthstoneFX = Object.freeze')+"\n"+bur+"\n"+acc+"""
  return { activer(on) { bureau.activer(on); if (!on) { HearthstoneFX.silence(); if (dialog.open) dialog.close(); } }, reset() { locked = false; for (const b of root.querySelectorAll('#cadre button')) b.disabled = false; bureau.reset(); } };
}
const TONY_CSS = """+json.dumps(css)+""";
const TONY_HTML = """+json.dumps(body)+""";
"""
open('/home/claude/parts/tony.js','w').write(js); print(len(js), NH)
glue = r"""
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
        solo() { act('m-solo'); },
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
"""
open('/home/claude/parts/tony.js','a').write(glue)
