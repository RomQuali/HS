from playwright.sync_api import sync_playwright
JS=r"""()=>{ const T=[]; const t=(n,ok,v)=>T.push((ok?'ok':'KO')+' · '+n+(ok?'':' '+JSON.stringify(v===undefined?'':v)));
window.CS_NOANIM=1;
const start=(U,hero)=>{V.mp=null; V.univSel=[U]; startSolo(); H.G.ps.forEach(q=>{q.hero=q.hero||q.ho[0];}); H.G.ps[0].hero=hero; try{finishHero()}catch(e){} clearInterval(H.tick); const p=H.G.ps[0]; p.hero=hero; p.qp=0; p.haw=0; p.pu=false; return [H.G,p];};
const next=(mine)=>{ H.G.ps.forEach(q=>{ q.hp=40; }); if(mine) mine(); endRecruit(); clearInterval(H.tick); const f=V.fight; endCombat(); clearInterval(H.tick); return f; };
const pool=(G,tb)=>Object.keys(G.pool).filter(c=>!tb||CD(c).tr===tb);
const calm=(G)=>Object.keys(C).filter(c=>/^tk_/.test(c)&&!(CD(c).fxAll||[]).length&&!CD(c).f&&!C[c].comp);
const neutral=(G,i,fam)=>{const c=calm(G); if(c.length<3) throw new Error('pas assez de cartes neutres'); const m=mk(c[i%c.length],0); if(fam) m.fam=fam; m.f=''; return m;};
// une étape = une action réelle qui doit faire avancer la quête d'un cran ; on vérifie le compteur à chaque étape et l'éveil pile à la dernière
const quest=(U,h,step,opt)=>{ let [G,p]=start(U,h); const Q=HEROES[h].q, log=[]; let bad=null;
  try{ for(let i=1;i<=Q.n+ (opt&&opt.extra||0) && i<60;i++){ p=H.G.ps[0]; p.g=30; step(H.G,p,i); p=H.G.ps[0]; log.push(p.qp||0); if(p.haw) { if((p.qp||0)<Q.n) bad='éveil trop tôt'; break; } } }catch(e){bad=String(e).slice(0,140);}
  p=H.G.ps[0]; const mono=log.every((v,i)=>i===0||v>=log[i-1]); const aw=!!p.haw&&HX(p)===HEROES[h].awd;
  t(HEROES[h].n+' · quête « '+Q.tx+' » : progresse à chaque fois, éveil à '+Q.n, !bad&&aw&&mono&&(opt&&opt.loose?true:log.length===Q.n&&log.every((v,i)=>v===i+1)), [bad,log,p.haw]); };
const buy=(G,p)=>{ p.hd=[]; p.sh=[mk(calm(G)[0],0)]; OPS.buy(G,p,{i:0}); };
const sell=(G,p)=>{ p.bd=[neutral(G,0),neutral(G,1)]; OPS.sell(G,p,{i:1}); };
const play=(G,p,i)=>{ p.bd=[]; p.hd=[neutral(G,i%2)]; OPS.play(G,p,{i:0,pos:0}); };
const win=(G,p)=>{ next(()=>{ const q=H.G.ps[0]; q.bd=[neutral(H.G,0)]; q.bd[0].a=60; q.bd[0].h=300; H.G.ps.forEach((o,j)=>{ if(j) o.bd=[neutral(H.G,1)]; }); }); };
const lose=(G,p)=>{ next(()=>{ const q=H.G.ps[0]; q.bd=[]; H.G.ps.forEach((o,j)=>{ if(j){ o.bd=[neutral(H.G,1)]; } }); }); };
// South Park
quest('South Park','sh_cartman',(G,p)=>{ next(()=>{ const q=H.G.ps[0]; q.bd=[neutral(H.G,0,'s_adu'),neutral(H.G,1,'s_adu'),neutral(H.G,2,'s_adu')]; }); });
quest('South Park','sh_stan',(G,p)=>{ p.bd=[]; p.pu=false; OPS.pow(G,p); next(); });
quest('South Park','sh_kyle',play);
quest('South Park','sh_kenny',(G,p)=>{ next(()=>{ const q=H.G.ps[0]; q.bd=[neutral(H.G,0),neutral(H.G,1)]; q.bd.forEach(m=>{m.a=1;m.h=1;}); H.G.ps.forEach((o,j)=>{ if(j){ o.bd=[neutral(H.G,2)]; o.bd[0].a=9; o.bd[0].h=90; } }); }); },{loose:1});
quest('South Park','sh_butters',lose);
quest('South Park','sh_randy',buy);
quest('South Park','sh_garrison',(G,p)=>{ p.bd=[neutral(G,0,'s_adu'),neutral(G,1,'s_cel'),neutral(G,2,'s_adu')]; p.pu=false; OPS.pow(G,p); next(); });
quest('South Park','sh_chef',(G,p)=>{ p.bd=[neutral(G,0)]; p.bd[0].h=40; p.hd=[]; p.pu=false; OPS.pow(G,p); if(p.hd[0]&&p.hd[0].sp) OPS.cast(G,p,{i:0,tg:0}); next(); },{loose:1});
quest('South Park','sh_mackey',(G,p,i)=>{ if(i===1){ p.bd=[neutral(G,0,'s_adu'),neutral(G,1,'s_adu'),neutral(G,2,'s_adu')]; OPS.pow(G,p); } next(); },{loose:1});
quest('South Park','sh_wendy',(G,p)=>{ next(()=>{ const q=H.G.ps[0]; const c=pool(H.G,'s_cel'); q.bd=[0,1,2,3,4].map(i=>mk(c[i],0)); }); });
// Les Simpson
quest('Les Simpson','smh_homer',(G,p)=>{ p.bd=[neutral(G,0)]; p.hd=[]; giveDonut(p,1); OPS.cast(G,p,{i:0,tg:0}); });
quest('Les Simpson','smh_marge',win); quest('Les Simpson','smh_bart',win); quest('Les Simpson','smh_maggie',win);
quest('Les Simpson','smh_lisa',buy); quest('Les Simpson','smh_abe',(G,p,i)=>{ if(i===1){ next(); next(); next(); const q=H.G.ps[0]; let n=0; while(q.disc&&n++<5) OPS.pick(H.G,q,{i:0}); } buy(H.G,H.G.ps[0]); }); quest('Les Simpson','smh_ned',buy); quest('Les Simpson','smh_moe',buy);
quest('Les Simpson','smh_burns',sell); quest('Les Simpson','smh_krusty',sell);
return T}"""
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(); errs=[]; pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('file:///home/claude/taverne.html'); pg.wait_for_timeout(1200); pg.set_default_timeout(600000)
    r=pg.evaluate(JS); ko=[x for x in r if x.startswith('KO')]
    print(len(r),'quêtes,',len(ko),'KO'); [print(x[:500]) for x in ko]; print('errs',errs[:3]); b.close()
