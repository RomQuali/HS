from playwright.sync_api import sync_playwright
JS=r"""()=>{ window.CS_NOANIM=1; const R=[]; const T=(n,ok,d)=>R.push([ok?'ok':'KO',n,d===undefined?'':JSON.stringify(d)]);
 V.mp=null; V.univSel=['Les Simpson']; startSolo(); clearInterval(H.tick); H.G.ps.forEach(p=>{p.hero=p.hero||p.ho[0]}); finishHero(); clearInterval(H.tick); const G=H.G, me=G.ps[0];
 const van=Object.keys(C).find(id=>!(CD(id).fxAll||[]).length&&!CD(id).f&&/^tk_/.test(id)&&CD(id).tr&&String(CD(id).tr).startsWith('si_'))||Object.keys(C).find(id=>!(CD(id).fxAll||[]).length&&!CD(id).f&&CD(id).tok); const pc=Object.keys(G.pool).find(id=>CD(id).t===2&&!(CD(id).fxAll||[]).some(e=>['bc','play','buy','hand','hplay','don'].includes((ET[e.k]||{}).tr))&&!(CD(id).fxAll||[]).some(e=>e.k==='magnet')); R.push(['info','carte neutre '+van+' ('+CD(van).a+'/'+CD(van).h+' niv '+CD(van).t+'), carte de réserve '+pc,'']);
 const N=(a,h,f,x)=>{const m=mk(van,0); m.a=a; m.h=h; m.f=f||''; if(x) m.x=x; return m;};
 const sim=(A,B,seed)=>simulate(A,B,seed||1,1,1,null,{});
 const last=r=>r.frames[r.frames.length-1].s;
 // 1. Provocation : toutes les attaques visent le serviteur avec Provocation tant qu'il vit
 try{ let ok=true; for(let s=1;s<=30;s++){ const B=[N(0,50),N(0,3,'t'),N(0,50)]; const r=sim([N(1,500)],B,s); const tu=r.frames[0].s[1][1].u; const fa=r.frames.filter(f=>f.at&&f.at===r.frames[0].s[0][0].u).slice(0,3); if(!fa.every(f=>f.tg===tu)) ok=false; } T('Provocation : cible obligatoire',ok); } catch(x){ T('ERREUR de test',false,String(x&&x.stack||x).slice(0,160)); }
 // 2. Bouclier divin : annule une source de dégâts, puis disparaît ; protège de la Toxicité
 { const r=sim([N(5,100)],[N(0,10,'s')],1); const hs=r.frames.map(f=>f.s[1][0]?f.s[1][0].h+':'+(f.s[1][0].f.includes('s')?'s':''):'x'); const a1=r.frames.findIndex(f=>f.at); T('Bouclier divin : 1re attaque annulée', r.frames[a1+1].s[1][0].h===10&&!r.frames[a1+1].s[1][0].f.includes('s'), hs.slice(0,5));
   const r2=sim([N(1,100,'v')],[N(0,10,'s')],1); const k=r2.frames.findIndex(f=>f.at); T('Bouclier divin : bloque la Toxicité', r2.frames[k+1].s[1].length===1&&r2.frames[k+1].s[1][0].h===10); }
 // 3. Réincarnation : nouvelle copie à 1 PV, stats de base, une seule fois, pas si plateau plein
 { const m=mk(van,0); const base=CD(van); m.a=base.a+10; m.h=3; m.f='r'; const r=sim([m],[N(5,500)],1); const fr=r.frames.find((f,i)=>i>0&&f.s[0][0]&&f.s[0][0].u!==r.frames[0].s[0][0].u); T('Réincarnation : revient à 1 PV, attaque de base, sans Réincarnation', !!fr&&fr.s[0][0].h===1&&fr.s[0][0].a===base.a&&!fr.s[0][0].f.includes('r'), fr&&[fr.s[0][0].a,fr.s[0][0].h,fr.s[0][0].f]);
   T('Réincarnation : une seule fois', last(r)[0].length===0&&r.w===1, r.w);
   const g=mk(van,1); g.h=1; g.f='r'; const rg=sim([g],[N(5,500)],1); const fg=rg.frames.find((f,i)=>i>0&&f.s[0][0]&&f.s[0][0].u!==rg.frames[0].s[0][0].u); T('Réincarnation : une carte dorée revient dorée', !!fg&&!!fg.s[0][0].g&&fg.s[0][0].a===base.a*2, fg&&[fg.s[0][0].g,fg.s[0][0].a]); }
 // 4. Toxicité (toujours) et Venimosité (une fois)
 { const r=sim([N(1,500,'v')],[N(0,100),N(0,100),N(0,100)],1); T('Toxicité : détruit chaque serviteur blessé', r.w===0&&last(r)[1].length===0);
   const r2=sim([N(1,500,'n')],[N(0,100),N(0,100)],1); const k=r2.frames.findIndex(f=>f.at); const af=r2.frames[k+1]; T('Venimosité : détruit le premier, puis disparaît', af.s[1].length===1&&!af.s[0][0].f.includes('n'), [af.s[1].length,af.s[0][0].f]);
   const r3=sim([N(0,500)],[N(1,500,'v')],1); T('Toxicité : agit aussi en défense', r3.w===1, r3.w); }
 // 5. Furie des vents : deux attaques de suite
 try{ const r=sim([N(1,500,'w')],[N(0,500)],1); const u=r.frames[0].s[0][0].u; const seq=r.frames.filter(f=>f.at).slice(0,4).map(f=>f.at===u?'A':'B'); T('Furie des vents : attaque deux fois de suite', seq.join('').replace(/B/g,'').length>=2&&(seq.join('').startsWith('AA')||seq.join('').startsWith('BAA')), seq); } catch(x){ T('ERREUR de test',false,String(x&&x.stack||x).slice(0,160)); }
 // 6. Ordre d'attaque : le camp le plus nombreux commence ; de gauche à droite
 { let ok=true; for(let s=1;s<=20;s++){ const r=sim([N(1,50),N(1,50),N(1,50)],[N(1,50),N(1,50)],s); const f=r.frames.find(f=>f.at); if(f.at!==r.frames[0].s[0][0].u) ok=false; } T('Ordre : le camp le plus nombreux attaque en premier, par la gauche', ok);
   let a=0; for(let s=1;s<=200;s++){ const r=sim([N(1,50)],[N(1,50)],s); const f=r.frames.find(f=>f.at); if(f.at===r.frames[0].s[0][0].u) a++; } T('Ordre : à égalité, tirage au sort', a>70&&a<130, a+'/200');
   const r=sim([N(1,500),N(1,500),N(1,500)],[N(0,5000)],1); const us=r.frames[0].s[0].map(m=>m.u); const seq=r.frames.filter(f=>f.at&&us.includes(f.at)).slice(0,6).map(f=>us.indexOf(f.at)); T('Ordre : chacun son tour, de gauche à droite', seq.join('')==='012012', seq); }
 // 7. Les bonus de combat ne durent pas ; les dégâts non plus
 try{ me.bd=[Object.assign(mk(van,0),{a:3,h:9})]; me.hd=[]; me.hp=40; const s0=me.bd.map(m=>m.a+'/'+m.h).join(); G.ps.forEach((q,k)=>{ if(k) q.bd=[Object.assign(mk(van,0),{a:2,h:500})]; }); endRecruit(); if(G.ph==='combat') endCombat(); clearInterval(H.tick); T('Après le combat : le plateau retrouve ses valeurs', me.bd.map(m=>m.a+'/'+m.h).join()===s0, [s0, me.bd.map(m=>m.a+'/'+m.h).join()]); } catch(x){ T('ERREUR de test',false,String(x&&x.stack||x).slice(0,160)); }
 // 8. Dégâts au héros : niveau de taverne + niveaux des survivants
 try{ const A=[N(5,500),N(5,500)], B=[N(1,1)]; const r=simulate(A,B,1,3,1,null,{}); T('Dégâts au héros : niveau de taverne + niveaux des survivants', r.w===0&&r.dmg===3+2*Math.max(1,CD(van).t), [r.dmg,'attendu',3+2*Math.max(1,CD(van).t)]); const r2=sim([N(1,1)],[N(1,1)],1); T('Égalité : aucun dégât', r2.w===-1||r2.dmg===0, [r2.w,r2.dmg]); } catch(x){ T('ERREUR de test',false,String(x&&x.stack||x).slice(0,160)); }
 // 9. Cri de guerre : joué depuis la main seulement, pas à l'invocation
 { const bc=Object.keys(C).find(id=>id in G.pool&&(CD(id).fxAll||[]).length===1&&CD(id).fxAll[0].k==='bc_self'); const bc2=Object.keys(C).find(id=>id in G.pool&&(CD(id).fxAll||[]).some(e=>ET[e.k]&&ET[e.k].tr==='bc'));
   if(G.ph!=='recruit') { } me.bd=[mk(van,0),mk(van,0)]; me.hd=[mk(bc2,0)]; me.g=10; me.disc=null; const d0=JSON.stringify([me.bd.map(m=>m.a+m.h),me.g,me.hd.length,me.ck,me.don]); OPS.play(G,me,{i:0,pos:2}); me.disc=null; const moved=me.bd.some(m=>m.c===bc2);
   T('Cri de guerre : se déclenche quand la carte est jouée ('+CD(bc2).n+')', moved);
   const S={sides:[[],[]],rng:mulberry(1),uid:5,frames:[],mx:{},dead:[[],[]]}; const before=JSON.stringify(S.sides); const nm=simSummon(S,0,0,bc2,0); T('Invocation : ne déclenche pas le Cri de guerre', S.sides[0].length===1&&S.sides[1].length===0); }
 // 10. Triple → doré, récompense de découverte du niveau supérieur
 { me.bd=[mk(pc,0),mk(pc,0)]; me.hd=[]; me.sh=[mk(pc,0)]; me.g=10; me.t=2; me.disc=null; OPS.buy(G,me,{i:0}); const gold=me.hd.find(m=>m.g)||me.bd.find(m=>m.g); T('Triple : trois exemplaires donnent une carte dorée', !!gold&&me.bd.filter(m=>m.c===pc&&!m.g).length===0, [me.bd.length,me.hd.map(m=>m.c+(m.g?'*':''))]);
   if(gold){ T('Doré : caractéristiques doublées', gold.a===CD(pc).a*2&&gold.h===CD(pc).h*2,[gold.a,gold.h]); const i=me.hd.indexOf(gold); if(i>=0){ OPS.play(G,me,{i,pos:0}); T('Doré joué : découverte d\'un serviteur du niveau supérieur', !!me.disc&&me.disc.length===3&&me.disc.every(m=>CD(m.c).t===3), me.disc&&me.disc.map(m=>CD(m.c).t)); me.disc=null; } } }
 // 11. Achat 3 or, vente 1 or, actualiser 1 or, gel gratuit
 try{ me.bd=[]; me.hd=[]; me.sh=[mk(pc,0),mk(pc,0)]; me.g=10; OPS.buy(G,me,{i:0}); const g1=me.g; OPS.play(G,me,{i:0,pos:0}); OPS.sell(G,me,{i:0}); const g2=me.g; OPS.roll(G,me,{}); const g3=me.g; const fz0=me.fz; OPS.frz(G,me,{}); T('Prix : achat 3, vente +1, actualiser 1, gel gratuit', g1===7&&g2===8&&g3===7&&me.g===7&&me.fz!==fz0,[g1,g2,g3,me.g]); if(me.fz) OPS.frz(G,me,{}); } catch(x){ T('ERREUR de test',false,String(x&&x.stack||x).slice(0,160)); }
 // 12. Plateau : 7 serviteurs, main : 10 cartes
 try{ me.bd=Array.from({length:7},()=>mk(van,0)); me.hd=[mk(van,0)]; const ok=OPS.play(G,me,{i:0,pos:0}); T('Plateau : 7 serviteurs au maximum', !ok&&me.bd.length===7); me.bd=[]; const ten=Object.keys(G.pool).filter(id=>!CD(id).tok).slice(0,11); me.hd=ten.slice(0,10).map(id=>mk(id,0)); me.sh=[mk(ten[10],0)]; me.g=10; const b=OPS.buy(G,me,{i:0}); T('Main : 10 cartes au maximum', !b&&me.hd.length===10); } catch(x){ T('ERREUR de test',false,String(x&&x.stack||x).slice(0,160)); }
 // 13. Magnétisme sur plateau plein
 try{ const mg=Object.keys(C).find(id=>(CD(id).fxAll||[]).some(e=>e.k==='magnet')); const host=Object.keys(C).find(id=>CD(id).tr===CD(mg).tr&&id!==mg&&id in G.pool&&!(CD(id).fxAll||[]).some(e=>e.k==='magnet')); me.bd=Array.from({length:7},()=>mk(host,0)); me.hd=[mk(mg,0)]; const a0=me.bd[3].a; const ok=OPS.play(G,me,{i:0,pos:3}); T('Magnétisme : fonctionne même sur un plateau plein', !!ok&&me.bd.length===7&&me.hd.length===0&&me.bd[3].a===a0+CD(mg).a,[ok,me.bd.length,me.hd.length]); } catch(x){ T('ERREUR de test',false,String(x&&x.stack||x).slice(0,160)); }
 // 14. Râle d'agonie + Réincarnation : le râle se déclenche aux deux morts
 try{ const dr=Object.keys(C).find(id=>(CD(id).fxAll||[]).length===1&&CD(id).fxAll[0].k==='dr_buff_all'&&!CD(id).fxAll[0].tb)||Object.keys(C).find(id=>(CD(id).fxAll||[]).length===1&&CD(id).fxAll[0].k==='dr_buff_all'); const e=CD(dr).fxAll[0]; const m=mk(dr,0); m.h=1; m.a=0; m.f='rt'; const ally=N(0,5000); if(e.tb){ const same=Object.keys(C).find(id=>CD(id).tr===e.tb&&id!==dr); ally.c=same; ally.x=[]; }
   const r=simulate([m,ally],[N(3,5000)],1,1,1,null,{}); const fin=r.frames[r.frames.length-1].s[0].find(x=>x.h>1000); const gain=fin?fin.a-0:-1; T('Râle d\'agonie : se déclenche aussi après la Réincarnation ('+CD(dr).n+')', gain>=2*e.a&&gain<=2*e.a+(CD(ally.c).a||0)+2, [gain,'attendu',2*e.a]); }catch(x){ T('test râle+réincarnation',false,String(x).slice(0,120)); }
 // 15. Venimosité : gagnée par un bonus, vs Toxicité de base
 try{ const m=N(1,10); addF(m,'v'); T('Un bonus « Toxicité » donne la Venimosité (une fois)', has(m,'n')&&!has(m,'v'), m.f); } catch(x){ T('ERREUR de test',false,String(x&&x.stack||x).slice(0,160)); }
 return R; }"""
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(); errs=[]; pg.on('pageerror',lambda e:errs.append(str(e)[:300])); pg.goto('file:///home/claude/taverne.html'); pg.wait_for_timeout(1000)
    for r in pg.evaluate(JS): print(r[0],'·',r[1],r[2][:120])
    print(errs[:3]); b.close()
