from playwright.sync_api import sync_playwright
import json,re,sys
BAD={'Naruto':r"village|Kumo|Iwa\b|réservoir|combo|[ÉEé]veil|\bsorts?\b|technique|Hiden|kekkei|sceau|pacte|compagnon|\bclan|Raiton|Doton|F[ūu]ton|Suiton|Katon|Feuille|Nuage|Roche|Brume\b(?! :)|marqueur|duel|coffre|inventaire|donut|portail|\bki\b|bande",
     'South Park':r"chakra|jutsu|\bki\b|portail|donut|ninja|village|transformation",
     'Les Simpson':r"chakra|jutsu|\bki\b|portail|ninja|village|bande activée|cohésion|transformation"}
def texts(pg):
    return pg.evaluate("""()=>{const s=new Set(); const add=x=>{ if(x&&x.trim()) s.add(x.trim().replace(/\\s+/g,' ')); }; document.querySelectorAll('#app *, body > *').forEach(e=>{ if(e.closest('script,style')) return; ['data-tip','data-xt','aria-label','title','placeholder'].forEach(a=>add(e.getAttribute(a))); if(e.children.length===0) add(e.textContent); }); const r=document.querySelector('#tony-host, [id^=tony]'); return [...s]}""")
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={'width':1600,'height':900}); errs=[]; pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
    pg.goto('file:///home/claude/taverne.html'); pg.wait_for_timeout(1200)
    for U in ['Naruto','South Park','Les Simpson']:
        seen={}
        def grab(tag):
            for x in texts(pg):
                if x not in seen: seen[x]=tag
        pg.evaluate("(U)=>{window.CS_NOANIM=1; V.mp=null; V.univSel=[U]; startSolo();}",U); pg.wait_for_timeout(1500); grab('choix du héros')
        n=pg.evaluate("()=>document.querySelectorAll('.hp-col').length")
        for i in range(1,n+1):
            pg.click(f'.hp-col:nth-child({i}) .hp-card',force=True); pg.wait_for_timeout(250); grab('fiche du héros')
        # tous les héros de l'univers, un par un, dans la fiche
        hs=pg.evaluate("()=>{const trs=H.G.laws[0].trs; return Object.keys(HEROES).filter(h=>/^(nh|sh|smh)_/.test(h)&&(heroFam(h)||[]).some(f=>trs.includes(f)))}")
        for h in hs:
            pg.evaluate("(h)=>{const p=H.G.ps[0]; p.ho=[h,p.ho[1],p.ho[2]]; V.heroSel=null; broadcast();}",h); pg.wait_for_timeout(120)
            try: pg.click('.hp-col:nth-child(1) .hp-card',force=True,timeout=1500)
            except Exception: pass
            pg.wait_for_timeout(120); grab('fiche du héros '+h)
        for sel in ['[data-act="hprules"]','.hp-how','[data-act="how"]']:
            if pg.query_selector(sel):
                pg.click(sel,force=True); pg.wait_for_timeout(400); grab('règles (choix du héros)'); pg.keyboard.press('Escape'); pg.wait_for_timeout(200)
        pg.evaluate("()=>{try{finishHero()}catch(e){} clearInterval(H.tick); const G=H.G,p=G.ps[0]; p.t=6; p.g=10; p.ck=10; const P=Object.keys(G.pool); p.bd=P.slice(0,7).map(c=>mk(c,0)); p.hd=P.slice(7,12).map(c=>mk(c,0)); p.sh=P.slice(12,18).map(c=>mk(c,0)); broadcast();}"); pg.wait_for_timeout(4200); grab('partie')
        acts=pg.evaluate("()=>[...new Set([...document.querySelectorAll('#app [data-act]')].map(e=>e.dataset.act))]")
        for a in [x for x in acts if x in ('laws','rules','journal','log','menu','bag','help','settings','set','hist','codex','book','info','lawbig','aide')]:
            try:
                pg.click(f'#app [data-act="{a}"]',force=True,timeout=1500); pg.wait_for_timeout(500); grab('panneau '+a); pg.keyboard.press('Escape'); pg.wait_for_timeout(250)
                if pg.query_selector('.ov [data-act="close"]'): pg.click('.ov [data-act="close"]',force=True); pg.wait_for_timeout(200)
            except Exception as e: pass
        # fiches de toutes les cartes et de tous les jetons (texte normal et doré), bulles des groupes
        allc=pg.evaluate("""()=>{const G=H.G; const ids=Object.keys(G.pool); const tok=new Set(); const walk=e=>{ if(e&&typeof e==='object'){ if(e.card&&C[e.card]) tok.add(e.card); Object.values(e).forEach(v=>Array.isArray(v)?v.forEach(walk):walk(v)); } }; ids.forEach(c=>(CD(c).fxAll||[]).forEach(walk)); return ids.concat([...tok]).map(c=>CD(c).n+' :: '+(cardTextH(c,0)+' // '+cardTextH(c,1)).replace(/<[^>]+>/g,''))}""")
        for x in allc: seen.setdefault(x,'texte de carte')
        if U=='Naruto':
            for x in pg.evaluate("()=>NK_GROUPS.map(g=>g.n+' :: '+g.tx.join(' '))"): seen.setdefault(x,'groupe')
        sp=pg.evaluate("()=>{const G=H.G; const out=[]; for(const id in SPELLS){ const S=SPELLS[id]; const mine=(G.laws[0].k==='bande'&&S.spk)||(G.laws[0].k==='gag'&&S.sim)||(S.craft)||(S.gem); if(mine) out.push((S.n||id)+' :: '+(S.tx||'')); } return out}")
        for x in sp: seen.setdefault(x,'objet / sort')
        rx=re.compile(BAD[U],re.I)
        hits=[(t,x) for x,t in seen.items() if rx.search(x)]
        print('=====',U,':',len(seen),'textes,',len(hits),'suspects ; actions',acts)
        for t,x in hits[:60]: print('  [%s] %s'%(t,x[:230]))
    print(errs[:3]); b.close()
