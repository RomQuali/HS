import re
art=open('/home/claude/taverne.html',encoding='utf8').read()
title=re.search(r'<title>.*?</title>',art).group(0)
links=''.join(re.findall(r'<link[^>]+>\n?',art))
style=art[art.index('<style>'):art.index('</style>')+8]
body_html=art[art.index('</style>')+8:art.index('<script>')]
game=art[art.index('<script>'):art.rindex('</script>')+9]
peer=open('/tmp/claude-0/pj/node_modules/peerjs/dist/peerjs.min.js',encoding='utf8').read()
adapter=open('/home/claude/parts/peer-room.js',encoding='utf8').read()
reset='<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0;font-family:system-ui,sans-serif;font-size:14px}img{max-width:100%}[hidden]{display:none!important}</style>'
out=f'''<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
{title}
{links}{reset}
{style}
</head><body>
{body_html}
<script>/* PeerJS 1.5.4 — MIT License — https://peerjs.com */
{peer}</script>
<script>{adapter}</script>
{game}
</body></html>'''
import os
os.makedirs('/home/claude/autonome', exist_ok=True)
open('/home/claude/autonome/index.html','w',encoding='utf8').write(out)
print('standalone', len(out))
