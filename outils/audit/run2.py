from playwright.sync_api import sync_playwright
import json,sys
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(); errs=[]; pg.on('pageerror',lambda e:errs.append(str(e)[:300]))
    pg.goto('file:///home/claude/taverne.html'); pg.wait_for_timeout(1000)
    pg.set_default_timeout(900000)
    r=pg.evaluate(open('/tmp/claude-0/t/aud/h2.js').read())
    json.dump(r,open('/tmp/claude-0/t/aud/res2.json','w'),ensure_ascii=False)
    print('effects',len(r['rows']),'errors',r['nerr'],errs[:3]); b.close()
for e in r['err'][:25]: print('ERR',e)
never=[x for x in r['rows'] if x['calls']==0]; noop=[x for x in r['rows'] if x['calls']>0 and x['changed']==0]
from collections import Counter
print('never called',len(never),Counter(x['tr'] for x in never)); print('called but no change',len(noop),Counter(x['tr'] for x in noop))
r1=json.load(open('/tmp/claude-0/t/aud/res.json')); c1={(x['id'],x['k']):x for x in r1['rows']}
print('--- spéciaux'); 
for k,v in r['spec'].items():
    if v!='ok' and not all(s=='ok' for s in v.split(',')): print('SPEC',k,'=>',v)
print('spec total',len(r['spec']),'ok',sum(1 for v in r['spec'].values() if all(s=='ok' for s in v.split(','))))
print('--- restant (jamais modifié dans les 2 passes)')
for x in r['rows']:
    o=c1.get((x['id'],x['k']),{'calls':0,'changed':0})
    if x['changed']+o['changed']==0 and x['tr'] not in ('tf','fus','ckm','pas','aura','fusres','rank'): print(x['u'][:6],x['id'],x['tr'],x['k'],'calls',x['calls']+o['calls'],'|',x['tx'][:120])
