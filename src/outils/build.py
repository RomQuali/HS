src=open('/tmp/claude-0/t/taverne_v2.html',encoding='utf8').read()
head=src[:src.index('<style>')+len('<style>')]
mid=src[src.index('</style>'):src.index('<script>')+len('<script>')]
tail=src[src.index('</script>'):]
P=lambda f: open('/home/claude/parts/'+f,encoding='utf8').read()
mid=mid[:mid.rindex('<script>')]+'<script>'+P('vendor-three.min.js')+'</script>\n<script>'
out=head+'\n'+P('style.css')+mid+'\n'+P('engine.js')+'\n'+P('data.js')+'\n'+P('net.js')+'\n'+P('art.js')+'\n'+P('art2.js')+'\n'+P('art3.js')+'\n'+P('hero3d.js')+'\n'+P('ogre-img.js')+'\n'+P('zombie-img.js')+'\n'+P('castle.js')+'\n'+P('board-img.js')+'\n'+P('spells.js')+'\n'+P('atelier.js')+'\n'+P('ui.js')+tail
open('/home/claude/taverne.html','w',encoding='utf8').write(out); print('built', len(out))
