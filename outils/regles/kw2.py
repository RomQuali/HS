from playwright.sync_api import sync_playwright
JS=r"""()=>{ window.CS_NOANIM=1; const R=[]; const T=(n,ok,d)=>R.push([ok?'ok':'KO',n,d===undefined?'':JSON.stringify(d)]);
 V.mp=null; V.univSel=['Les Simpson']; startSolo(); clearInterval(H.tick); H.G.ps.forEach(p=>{p.hero=p.hero||p.ho[0]}); finishHero(); clearInterval(H.tick); const G=H.G, me=G.ps[0];
 const van=Object.keys(C).find(id=>!(CD(id).fxAll||[]).length&&!CD(id).f&&CD(id).tok); const P=Object.keys(G.pool);
 const N=(a,h,f,x)=>{const m=mk(van,0); m.a=a; m.h=h; m.f=f||''; if(x) m.x=x; return m;};
 const sim=(A,B,seed)=>simulate(A,B,seed||1,1,1,null,{});
 const t=(n,fn)=>{ try{ fn(); }catch(x){ T(n,false,String(x&&x.stack||x).slice(0,200)); } };
 t('Camouflage',()=>{ let ok=true; for(let s=1;s<=30;s++){ const r=sim([N(1,500)],[N(0,50,'c'),N(0,50)],s); const cu=r.frames[0].s[1][0].u; const f=r.frames.find(f=>f.at&&f.at===r.frames[0].s[0][0].u); if(f.tg===cu) ok=false; } T('Camouflage : jamais visé tant qu\'il reste une autre cible',ok);
   const r=sim([N(1,500,'c')],[N(1,500)],1); const k=r.frames.findIndex(f=>f.at&&f.at===r.frames[0].s[0][0].u); T('Camouflage : perdu après sa première attaque', !r.frames[k+1].s[0][0].f.includes('c'));
   const r2=sim([N(1,500)],[N(0,5,'c')],1); T('Camouflage : visable s\'il ne reste que lui', r2.w===0, r2.w);
   const r3=sim([N(1,500)],[N(0,50,'ct'),N(0,50)],3); const f3=r3.frames.find(f=>f.at); T('Camouflage + Provocation : la Provocation camouflée ne force pas la cible', f3.tg===r3.frames[0].s[1][1].u); });
 t('Insensible',()=>{ const r=sim([N(1,10,'i')],[N(5,500)],1); const u=r.frames[0].s[0][0].u; const k=r.frames.findIndex(f=>f.at===u); T('Insensible : aucun dégât pendant son attaque', r.frames[k+1].s[0][0].h===r.frames[k].s[0][0].h, [r.frames[k].s[0][0].h,r.frames[k+1].s[0][0].h]);
   const k2=r.frames.findIndex(f=>f.at&&f.at!==u); T('Insensible : subit les dégâts quand il est attaqué', k2>=0&&r.frames[k2+1].s[0][0].h===r.frames[k2].s[0][0].h-5, k2); });
 t('Vol de vie',()=>{ const r=sim([N(3,500,'l')],[N(0,7)],1); T('Vol de vie : cumule les dégâts infligés', r.heal&&r.heal[0]===9&&r.w===0, r.heal);
   me.hp=20; lawsAfterFight(G,me,{w:0,dmg:0,dead:[[],[]],alive:[[],[]],frames:[],heal:[9,0]},0); T('Vol de vie : soigne le héros', me.hp===29, me.hp); me.hp=38; lawsAfterFight(G,me,{w:0,dmg:0,dead:[[],[]],alive:[[],[]],frames:[],heal:[9,0]},0); T('Vol de vie : ne dépasse pas le maximum', me.hp===(+RU().hp||40), me.hp);
   const r2=sim([N(3,500,'l')],[N(0,7,'s')],1); T('Vol de vie : rien sur un Bouclier divin', r2.heal[0]===9-3+0||r2.heal[0]===9, r2.heal); });
 t('Ralliement',()=>{ const r=sim([N(1,500,'',[{k:'atk_self',a:2,h:0}])],[N(0,500)],1); const u=r.frames[0].s[0][0].u; const k=r.frames.findIndex(f=>f.at===u); const dealt=500-r.frames[k+1].s[1][0].h; T('Ralliement : le bonus s\'applique avant les dégâts', dealt===3, dealt); T('Texte : « Ralliement »', ET.atk_self.txt({a:1,h:1},1).startsWith('Ralliement : '), ET.atk_self.txt({a:1,h:1},1)); });
 t('Gemme de sang',()=>{ me.bd=[N(1,1)]; me.hd=[]; me.gemA=0; me.gemH=0; const m=me.bd[0]; runRecruit(G,me,m,{k:'bc_gem',n:2}); T('Gemme de sang : arrive en main', me.hd.length===2&&me.hd.every(x=>x.sp==='hs_gem'), me.hd.map(x=>x.sp));
   const ok=castSpell(G,me,0,0); T('Gemme de sang : +1/+1 sur la cible', ok&&m.a===2&&m.h===2&&me.hd.length===1,[ok,m.a,m.h]);
   runRecruit(G,me,m,{k:'bc_gem_up',a:1,h:1}); castSpell(G,me,0,0); T('Gemme de sang améliorée : +2/+2', m.a===4&&m.h===4,[m.a,m.h]); me.gemA=0; me.gemH=0;
   T('Gemme de sang : jamais vendue par la taverne', (()=>{ for(let k=0;k<300;k++){ const s=drawSpell(6); if(s&&s.sp==='hs_gem') return false; } return true; })()); });
 t('Engloutir',()=>{ me.bd=[N(2,2)]; me.sh=[Object.assign(mk(P[0],0),{a:5,h:7})]; const pool0=G.pool[P[0]]; runRecruit(G,me,me.bd[0],{k:'bc_devour'}); T('Engloutir : prend les caractéristiques et vide la taverne', me.bd[0].a===7&&me.bd[0].h===9&&me.sh.length===0&&G.pool[P[0]]===pool0+1,[me.bd[0].a,me.bd[0].h,me.sh.length]);
   me.sh=[]; const a0=me.bd[0].a; runRecruit(G,me,me.bd[0],{k:'bc_devour'}); T('Engloutir : rien si la taverne est vide', me.bd[0].a===a0); });
 t('Sorcellerie',()=>{ const sp=Object.keys(SPELLS).find(id=>SPELLS[id].sim&&!SPELLS[id].don&&!SPELLS[id].tg)||'si_don'; me.bd=[N(1,1,'',[{k:'craft',sp}])]; me.hd=[]; runRecruit(G,me,me.bd[0],{k:'craft',sp}); T('Sorcellerie : sort temporaire en main à la pose', me.hd.length===1&&me.hd[0].tmpc===1&&me.hd[0].sp===sp, me.hd);
   const pd=privData(me); T('Sorcellerie : marqué temporaire pour l\'affichage', pd.hd[0].tmpc===1);
   G.ps.forEach((q,k)=>{ if(k) q.bd=[N(0,1)]; }); endRecruit(); T('Sorcellerie : le sort non lancé disparaît à la fin du tour', me.hd.filter(x=>x.tmpc).length===0, me.hd.length); if(G.ph==='combat') endCombat(); clearInterval(H.tick);
   T('Sorcellerie : un nouveau sort au tour suivant', me.hd.filter(x=>x.tmpc&&x.sp===sp).length===1, me.hd.map(x=>x.sp)); });
 t('Choix des armes',()=>{ me.bd=[N(1,1)]; const m=me.bd[0]; me.cho=null; me.hd=[]; const e={k:'choose',o:[{k:'bc_gem',n:1},{k:'bc_gem',n:3}]}; runRecruit(G,me,m,e); T('Choix des armes : propose deux effets, rien n\'est appliqué avant', !!me.cho&&me.cho.o.length===2&&me.hd.length===0);
   T('Choix des armes : texte', !ET.choose.txt(e,1).includes('?'), ET.choose.txt(e,1)); OPS.choose(G,me,{i:1}); T('Choix des armes : applique l\'effet choisi', !me.cho&&me.hd.length===3,[me.hd.length]);
   me.hd=[]; runRecruit(G,me,m,e); G.ps.forEach((q,k)=>{ if(k) q.bd=[N(0,1)]; }); endRecruit(); T('Choix des armes : premier effet à la fin du chrono', !me.cho&&me.hd.filter(x=>x.sp==='hs_gem').length===1,[me.hd.length]); if(G.ph==='combat') endCombat(); clearInterval(H.tick);
   const bot=G.ps[1]; bot.bd=[N(1,1)]; bot.hd=[]; runRecruit(G,bot,bot.bd[0],e); T('Choix des armes : l\'IA choisit seule', !bot.cho&&[1,3].includes(bot.hd.length),[bot.hd.length]); });
 t('Mots-clés',()=>{ T('Définitions', ['c','l','i'].every(k=>SET.kw[k]&&SET.kw[k].n), ['c','l','i'].map(k=>SET.kw[k]&&SET.kw[k].n)); });
 return R; }"""
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(); errs=[]; pg.on('pageerror',lambda e:errs.append(str(e)[:300])); pg.goto('file:///home/claude/taverne.html'); pg.wait_for_timeout(1000)
    for r in pg.evaluate(JS): print(r[0],'·',r[1],r[2][:170])
    print(errs[:3]); b.close()
