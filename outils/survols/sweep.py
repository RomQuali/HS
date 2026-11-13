from playwright.sync_api import sync_playwright
import sys, json
exec(open('/tmp/claude-0/t/bh1.py').read().split('with sync_playwright')[0])
SEL=".mn,.cd,.spt,.eqm,[data-hov],[data-tip],[title],button,.purse,.kc,.timer,.hpg"
LIST="""(SEL)=>{const out=[]; let k=0; window.__HK=[]; document.querySelectorAll('#app '+SEL.split(',').join(', #app ')+', #sfxb').forEach(e=>{ const r=e.getBoundingClientRect(); if(r.width<4||r.height<4||r.bottom<0||r.top>innerHeight||r.right<0||r.left>innerWidth) return; const cs=getComputedStyle(e); if(cs.visibility==='hidden'||cs.display==='none'||cs.pointerEvents==='none') return;
  const cx=Math.min(innerWidth-2,Math.max(2,r.left+r.width/2)), cy=Math.min(innerHeight-2,Math.max(2,r.top+r.height/2)); const top=document.elementFromPoint(cx,cy); if(!top||!(e===top||e.contains(top))) { if(!e.matches('.mn,.cd,[data-hov]')) return; }
  window.__HK.push(e); out.push({k:k++, tag:e.tagName.toLowerCase(), cls:(e.className&&e.className.baseVal!==undefined?e.className.baseVal:e.className||'').toString().slice(0,40), z:e.dataset.z||'', hov:e.dataset.hov||'', act:e.dataset.act||'', tip:(e.dataset.tip||'').slice(0,50), title:(e.getAttribute('title')||'').slice(0,50), aria:(e.getAttribute('aria-label')||'').slice(0,50), x:Math.round(cx), y:Math.round(cy), w:Math.round(r.width), h:Math.round(r.height), covered:!(e===top||e.contains(top)), topc:top?(top.className||'').toString().slice(0,30):''}); }); return out;}"""
CHECK="""(k)=>{const p=document.getElementById('peek'); const e=window.__HK[k]; if(!e||!document.contains(e)) return {gone:1}; const er=e.getBoundingClientRect();
  if(p.hidden) return {peek:0}; const r=p.getBoundingClientRect(); let L=1e9,T=1e9,R=-1e9,B=-1e9; [...p.children,...p.querySelectorAll('.btip,.peq,.tip')].forEach(c=>{const q=c.getBoundingClientRect(); if(q.width&&q.height&&getComputedStyle(c).visibility!=='hidden'){L=Math.min(L,q.left);T=Math.min(T,q.top);R=Math.max(R,q.right);B=Math.max(B,q.bottom);}});
  const txt=p.innerText.replace(/\\s+/g,' ').trim(); const cx=er.left+er.width/2, cy=er.top+er.height/2;
  return {peek:1, box:[L,T,R,B].map(Math.round), out:(L<-1||T<-1||R>innerWidth+1||B>innerHeight+1), covers:(cx>L&&cx<R&&cy>T&&cy<B), txt:txt.slice(0,70), len:txt.length, bad:/undefined|NaN|\\[object|null/.test(txt), kind:p.firstElementChild?p.firstElementChild.className.toString().slice(0,20):'', btip:!!p.querySelector('.btip'), z:+getComputedStyle(p).zIndex||0};}"""
def sweep(pg, label, res, slow=False):
    pg.mouse.move(3,3); pg.wait_for_timeout(200)
    items=pg.evaluate(LIST,SEL)
    for it in items:
        pg.mouse.move(3,3); pg.mouse.move(it['x']-3,it['y']-3); pg.mouse.move(it['x'],it['y']); pg.wait_for_timeout(1150 if (slow and it['cls'].startswith('mn')) else 130)
        c=pg.evaluate(CHECK,it['k']); it.update(c); it['ctx']=label; res.append(it)
    pg.mouse.move(3,3)
if __name__=='__main__':
    W,Hh=(int(sys.argv[1]),int(sys.argv[2])) if len(sys.argv)>2 else (1600,900)
    res=[]; errs=[]
    with sync_playwright() as p:
        for U in ['Naruto','Dragon Ball','Rick et Morty','South Park','Les Simpson']:
            b=p.chromium.launch(); pg=b.new_page(viewport={'width':W,'height':Hh}); pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
            pg.goto('file:///home/claude/taverne.html'); pg.wait_for_timeout(500); pg.evaluate(SET,U)
            pg.evaluate("()=>{const me=H.G.ps[0]; while(me.sh.length<7) me.sh.push(mk(me.sh[0].c,0)); me.bd[0].g=1; me.bd[1].f=(me.bd[1].f||'')+'t'; while(me.bd.length<7) me.bd.push(mk(me.sh[1].c,0)); broadcast();}")
            pg.wait_for_timeout(2700); sweep(pg,U+'/taverne',res,slow=(U in('Naruto','South Park')))
            pg.evaluate("()=>endRecruit()"); pg.wait_for_timeout(1500); sweep(pg,U+'/combat',res)
            b.close()
    json.dump(res,open('/tmp/claude-0/t/hov/res_%d.json'%W,'w'),ensure_ascii=False); print('éléments',len(res),'erreurs',errs[:3])
    from collections import Counter
    def key(i): return (i['ctx'].split('/')[1], i['tag'], i['cls'].split(' ')[0]+('.'+i['cls'].split(' ')[1] if i['cls'].count(' ') and i['cls'].startswith(('medal','hud','mn','cd','op')) else ''), i['hov'], i['act'], i['z'])
    g={}
    for i in res: g.setdefault(key(i),[]).append(i)
    for k,v in sorted(g.items(),key=lambda kv:str(kv[0])):
        n=len(v); pk=sum(1 for i in v if i.get('peek')); gone=sum(1 for i in v if i.get('gone')); n-=gone; out=sum(1 for i in v if i.get('out')); cov=sum(1 for i in v if i.get('covers')); bad=sum(1 for i in v if i.get('bad')); emp=sum(1 for i in v if i.get('peek') and i.get('len',0)<3); nat=sum(1 for i in v if i['title']); cvd=sum(1 for i in v if i['covered'])
        ex=next((i for i in v if i.get('peek')),v[0])
        flag='  <<<' if (pk<n or out or bad or emp) else ''
        print(k,'n',n,'bulle',pk,'hors',out,'recouvre',cov,'KO',bad,'vide',emp,'|',(ex.get('txt') or ex['tip'] or ex['title'] or ex['aria'])[:70],flag)
