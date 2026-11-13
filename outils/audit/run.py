from playwright.sync_api import sync_playwright
import json,sys
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(); errs=[]; pg.on('pageerror',lambda e:errs.append(str(e)[:300]))
    pg.goto('file:///home/claude/taverne.html'); pg.wait_for_timeout(1000)
    pg.set_default_timeout(900000)
    r=pg.evaluate(open('/tmp/claude-0/t/aud/harness.js').read())
    json.dump(r,open('/tmp/claude-0/t/aud/res.json','w'),ensure_ascii=False)
    print('cards',r['n'],'effects',len(r['rows']),'errors',r['nerr'],errs[:3]); b.close()
for e in r['err'][:25]: print('ERR',e)
never=[x for x in r['rows'] if x['calls']==0]; noop=[x for x in r['rows'] if x['calls']>0 and x['changed']==0]
from collections import Counter
print('never called',len(never),Counter(x['tr'] for x in never)); print('called but no change',len(noop),Counter(x['tr'] for x in noop))
