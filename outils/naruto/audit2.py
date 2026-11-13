from playwright.sync_api import sync_playwright
JS=r"""()=>{ const T=[]; const t=(n,ok,v)=>T.push((ok?'ok':'KO')+' · '+n+(ok?'':' '+JSON.stringify(v===undefined?'':v)));
let POST=null; const _eot=nkGroupsEot; nkGroupsEot=function(G,p){ const r=_eot(G,p); if(p.pid===H.G.ps[0].pid) POST={ck:p.ck||0,inc:(p.inc||[])[0]||0,aoe:(p.foe&&p.foe.aoe)||0,bd:p.bd.map(m=>({u:m.u,c:m.c,a:m.a,h:m.h,f:m.f||'',tmp:m.tmp?{a:m.tmp.a||0,h:m.tmp.h||0,f:m.tmp.f||''}:null}))}; return r; };
const E=(a,h)=>[a,h];
// attendu par scénario, écrit à la main d'après les règles annoncées : eot = bonus définitif par fin de tour, tmp = bonus du combat, ck = chakra gagné en fin de tour, inc = or du tour suivant, aoe = dégâts aux ennemis
const S=[
 {n:'Témoin (aucun groupe)', bd:['nk_ao','nk_zaku']},
 {n:'Duo immortel', bd:['nk_hidan','nk_kakuzu'], tmp:{nk_hidan:[8,8,'r'],nk_kakuzu:[8,8,'r']}},
 {n:'Les artistes', bd:['nk_deidara','nk_sasori'], tmp:{nk_deidara:[6,6,''],nk_sasori:[6,6,'']}, aoe:4},
 {n:'Itachi et Kisame', bd:['nk_itachi','nk_kisame'], eot:{nk_itachi:E(2,2)}, tmp:{nk_itachi:[10,10,'l'],nk_kisame:[10,10,'l']}},
 {n:'Les anges d\'Ame', bd:['nk_pain','nk_konan'], tmp:{nk_pain:[6,6,'s'],nk_konan:[6,6,'s']}},
 {n:'Les espions', bd:['nk_zetsu','nk_tobi'], eot:{nk_zetsu:E(5,5),nk_tobi:E(4,4)}, tmp:{nk_zetsu:[0,0,'c'],nk_tobi:[0,0,'c']}},
 {n:'Le démon et son arme', bd:['nk_zabuza','nk_haku'], tmp:{nk_zabuza:[6,6,'sw'],nk_haku:[0,6,'t']}},
 {n:'Frères Uchiha', bd:['nk_itachi','nk_sasuke'], eot:{nk_itachi:E(7,7),nk_sasuke:E(5,5)}},
 {n:'Maître et disciple (Jiraiya, Naruto)', bd:['nk_jiraiya','nk_naruto'], free:['nk_naruto'], tffree:['nk_naruto']},
 {n:'Maître et disciple (Orochimaru, Kabuto)', bd:['nk_orochimaru','nk_kabuto'], free:['nk_kabuto'], tffree:['nk_kabuto']},
 {n:'Maître et disciple (Tsunade, Sakura)', bd:['nk_tsunade','nk_sakura'], free:['nk_sakura'], tffree:['nk_sakura']},
 {n:'Maître et disciple (Gaï, Lee) + Équipe Gaï à 2', bd:['nk_gai','nk_lee'], free:['nk_lee'], tffree:['nk_lee'], eot:{nk_gai:E(3,1),nk_lee:E(3,1)}},
 {n:'Maître et disciple (Naruto, Konohamaru)', bd:['nk_naruto','nk_konohamaru'], free:['nk_konohamaru'], eot:{nk_konohamaru:E(3,3)}},
 {n:'Maître et disciple (Gaara, Matsuri)', bd:['nk_gaara','nk_matsuri'], free:['nk_matsuri'], eot:{nk_matsuri:E(3,3)}},
 {n:'Ombre et vent', bd:['nk_shikamaru','nk_temari'], tmp:{nk_shikamaru:[6,6,''],nk_temari:[6,6,'']}, inc:2},
 {n:'Genins du Son', bd:['nk_dosu','nk_zaku'], eot:{nk_dosu:E(3,3),nk_zaku:E(3,3)}},
 {n:'Grand-mère et petit-fils', bd:['nk_chiyo','nk_sasori'], tmp:{nk_chiyo:[6,6,'r'],nk_sasori:[6,6,'r']}},
 {n:'Équipe Gaï à 2', bd:['nk_lee','nk_neji'], eot:{nk_lee:E(3,1),nk_neji:E(3,1)}},
 {n:'Équipe Gaï à 3', bd:['nk_gai','nk_lee','nk_neji'], eot:{nk_gai:E(5,3),nk_lee:E(5,3),nk_neji:E(5,3)}, tmp:{nk_gai:[0,0,'w'],nk_lee:[0,0,'w'],nk_neji:[0,0,'w']}, free:['nk_lee']},
 {n:'Jinchūriki à 2', bd:['nk_naruto','nk_yagura'], tfcut:{nk_naruto:5,nk_yagura:5}, loose:1},
 {n:'Jinchūriki à 3 (+ Kage à 2)', bd:['nk_naruto','nk_yagura','nk_gaara'], tffree:['nk_naruto','nk_yagura','nk_gaara'], eot:{nk_naruto:E(4,4),nk_yagura:E(4,4),nk_gaara:E(4,4)}, ck:2, loose:1},
 {n:'Garde du Kazekage à 2', bd:['nk_rasa','nk_baki'], inc:1},
 {n:'Garde du Kazekage à 3', bd:['nk_rasa','nk_baki','nk_yashamaru'], inc:2, eot:{nk_rasa:E(3,3),nk_baki:E(3,3),nk_yashamaru:E(3,3)}},
 {n:'Garde du Mizukage à 2', bd:['nk_ao','nk_chojuro'], tmp:{nk_ao:[5,5,''],nk_chojuro:[5,5,'']}},
 {n:'Garde du Mizukage à 3', bd:['nk_ao','nk_chojuro','nk_mei'], tmp:{nk_ao:[10,10,'s'],nk_chojuro:[10,10,'s'],nk_mei:[10,10,'s']}},
 {n:'Équipe 7 à 2', bd:['nk_sasuke','nk_kakashi'], eot:{nk_sasuke:E(2,2),nk_kakashi:E(2,2)}},
 {n:'Équipe 7 à 3', bd:['nk_sasuke','nk_kakashi','nk_sakura'], eot:{nk_sasuke:E(4,4),nk_kakashi:E(4,4),nk_sakura:E(4,4)}},
 {n:'Équipe 7 à 4', bd:['nk_sasuke','nk_kakashi','nk_sakura','nk_naruto'], eot:{nk_sasuke:E(8,8),nk_kakashi:E(8,8),nk_sakura:E(8,8),nk_naruto:E(8,8)}, free:['nk_sasuke','nk_kakashi','nk_sakura','nk_naruto']},
 {n:'Les Kage à 2', bd:['nk_tsunade','nk_mei'], ck:2},
 {n:'Les Kage à 3', bd:['nk_tsunade','nk_mei','nk_rasa'], ck:4},
 {n:'Les Kage à 5 (+ Jinchūriki à 2)', bd:['nk_tsunade','nk_mei','nk_rasa','nk_gaara','nk_yagura'], ck:99, eot:{nk_tsunade:E(6,6),nk_mei:E(6,6),nk_rasa:E(6,6),nk_gaara:E(6,6),nk_yagura:E(6,6)}, loose:1},
 {n:'Épéistes à 3', bd:['nk_chojuro','nk_mangetsu','nk_ameyuri'], tmp:{nk_chojuro:[4,4,''],nk_mangetsu:[4,4,''],nk_ameyuri:[4,4,'']}},
 {n:'Épéistes à 5', bd:['nk_chojuro','nk_mangetsu','nk_ameyuri','nk_jinpachi','nk_suigetsu'], tmp:{nk_chojuro:[10,10,''],nk_mangetsu:[10,10,''],nk_ameyuri:[10,10,''],nk_jinpachi:[10,10,''],nk_suigetsu:[10,10,'']}},
 {n:'Épéistes à 7', bd:['nk_chojuro','nk_mangetsu','nk_ameyuri','nk_jinpachi','nk_suigetsu','nk_zabuza','nk_kisame'], tmp:{nk_chojuro:[20,20,'w'],nk_mangetsu:[20,20,'w'],nk_ameyuri:[20,20,'w'],nk_jinpachi:[20,20,'w'],nk_suigetsu:[20,20,'w'],nk_zabuza:[20,20,'w'],nk_kisame:[20,20,'w']}},
];
let ctrl=null;
for(const sc of S){ V.mp=null; V.univSel=['Naruto']; startSolo(); try{finishHero()}catch(e){} clearInterval(H.tick); let G=H.G, p=G.ps[0]; p.hero='nh_bee'; p.bd=sc.bd.map(x=>mk(x,0)); p.hd=[]; p.ck=0;
  const info={g:[],ck:[]}; let okAll=true; const why=[];
  // coûts gratuits / réduits
  (sc.free||[]).forEach(c=>{const m=p.bd.find(x=>x.c===c); if(jutCost(p,m)!==0){okAll=false;why.push('jutsu pas gratuit '+c);} });
  p.bd.forEach(m=>{ if(!(sc.free||[]).includes(m.c)&&jutCost(p,m)!==CD(m.c).t){okAll=false;why.push('coût jutsu inattendu '+m.c+' '+jutCost(p,m));} const J=jutOf(m); if(J.tf){ const exp=(sc.tffree||[]).includes(m.c)?0:J.tf.c-((sc.tfcut||{})[m.c]||0); if(nkTfCost(p,m)!==exp){okAll=false;why.push('coût transformation '+m.c+' '+nkTfCost(p,m)+'≠'+exp);} } });
  for(let turn=1;turn<=3;turn++){ G=H.G; p=G.ps[0]; p.hp=40; const pre=p.bd.map(m=>({u:m.u,c:m.c,a:m.a,h:m.h})), ck0=p.ck||0; POST=null; clearInterval(H.tick);
    endRecruit(); clearInterval(H.tick); if(!POST){okAll=false;why.push('pas de fin de tour T'+turn);break;}
    POST.bd.forEach(m=>{ const b=pre.find(x=>x.u===m.u); if(!b) return; const e=(sc.eot||{})[m.c]||[0,0]; const d=[m.a-b.a,m.h-b.h]; if(d[0]!==e[0]||d[1]!==e[1]){okAll=false;why.push('T'+turn+' fin de tour '+m.c+' '+d+'≠'+e);}
      const x=(sc.tmp||{})[m.c]||[0,0,'']; const tm=m.tmp||{a:0,h:0,f:''}; const needF=[...x[2]].filter(c=>!m.f.includes(c)).sort().join(''); if(tm.a!==x[0]||tm.h!==x[1]||[...tm.f].sort().join('')!==needF){okAll=false;why.push('T'+turn+' bonus de combat '+m.c+' '+JSON.stringify(tm)+'≠'+x);} });
    const expCk=Math.min(10,ck0+(sc.ck||0)); if(POST.ck!==expCk){okAll=false;why.push('T'+turn+' chakra fin de tour '+POST.ck+'≠'+expCk);}
    if(POST.inc!==(sc.inc||0)){okAll=false;why.push('T'+turn+' or prochain tour '+POST.inc);} if(POST.aoe!==(sc.aoe||0)){okAll=false;why.push('T'+turn+' dégâts de zone '+POST.aoe);}
    // le plateau de combat porte bien les bonus
    const f=V.fight, mine=f?(f.me===1?f.b:f.a):[]; POST.bd.forEach(m=>{ const c=mine.find(x=>x.u===m.u); if(!c){okAll=false;why.push('T'+turn+' absent du combat '+m.c);return;} const tm=m.tmp||{a:0,h:0,f:''}; if(c.a!==m.a+tm.a||c.h!==m.h+tm.h||![...(m.f+tm.f)].every(k=>(c.f||'').includes(k))){okAll=false;why.push('T'+turn+' plateau de combat '+m.c+' '+[c.a,c.h,c.f]+' attendu '+[m.a+tm.a,m.h+tm.h,m.f+tm.f]);} });
    endCombat(); clearInterval(H.tick); G=H.G; p=G.ps[0]; if(G.ph!=='recruit'){okAll=false;why.push('pas de recrutement après T'+turn);break;}
    // début du tour suivant : bonus de combat retirés, stats définitives conservées, chakra + or
    p.bd.forEach(m=>{ const b=POST.bd.find(x=>x.u===m.u); if(!b) return; if(m.tmp){okAll=false;why.push('T'+turn+' bonus de combat resté '+m.c);} if(sc.loose? (m.a<b.a||m.h<b.h) : (m.a!==b.a||m.h!==b.h)){okAll=false;why.push('T'+turn+' stats après combat '+m.c+' '+[m.a,m.h]+'≠'+[b.a,b.h]);} if(m.f!==b.f){okAll=false;why.push('T'+turn+' mots-clés après combat '+m.c+' '+m.f+'≠'+b.f);} });
    const ckExp=Math.min(10,POST.ck+p.bd.length); if(p.ck!==ckExp){okAll=false;why.push('T'+turn+' chakra début de tour '+p.ck+'≠'+ckExp);}
    info.g.push(p.g); if(ctrl&&p.g!==ctrl[turn-1]+(sc.inc||0)){okAll=false;why.push('T'+turn+' or début de tour '+p.g+'≠'+(ctrl[turn-1]+(sc.inc||0)));}
    p.bd.forEach(m=>{ if(m.ju===G.rd){okAll=false;why.push('jutsu non réarmé '+m.c);} });
  }
  if(!ctrl) ctrl=info.g;
  t(sc.n+' — 3 tours de suite', okAll, why.slice(0,6));
}
return T}"""
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(); errs=[]; pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('file:///home/claude/taverne.html'); pg.wait_for_timeout(1200)
    r=pg.evaluate(JS); ko=[x for x in r if x.startswith('KO')]
    print(len(r),'scénarios,',len(ko),'KO'); [print(x[:700]) for x in ko]; print('errs',errs[:3]); b.close()
