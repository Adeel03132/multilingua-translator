import json,subprocess,os,asyncio,wave,sys
import edge_tts
from piper import PiperVoice
D='/workspace/multilingo/audio'
data=json.loads(subprocess.check_output(['node','-e',"global.window={};require('/workspace/multilingo/data.js');console.log(JSON.stringify({P:window.PACKS,L:window.LETTERS}))"]))
AR_N=['أَلِف','بَاء','تَاء','ثَاء','جِيم','حَاء','خَاء','دَال','ذَال','رَاء','زَاي','سِين','شِين','صَاد','ضَاد','طَاء','ظَاء','عَيْن','غَيْن','فَاء','قَاف','كَاف','لَام','مِيم','نُون','هَاء','وَاو','يَاء']
UR_N=['الف','بے','پے','تے','ٹے','ثے','جیم','چے','بڑی حے','خے','دال','ڈال','ذال','رے','ڑے','زے','ژے','سین','شین','صواد','ضواد','طوئے','ظوئے','عین','غین','فے','قاف','کاف','گاف','لام','میم','نون','واؤ','چھوٹی ہے','دو چشمی ہے','ہمزہ','چھوٹی یے','بڑی یے']
jobs=[]
for p in data['P']:
  for it in p['items']:
    for l in ['en','ur','ar','es','fr','tr']:
      if it.get(l): jobs.append((l,f"{p['id']}-{it['id']}",it[l]))
for i,c in enumerate(data['L']['en']): jobs.append(('en',f'letter-{i}',c+'.'))
for i,n in enumerate(AR_N): jobs.append(('ar',f'letter-{i}',n))
for i,n in enumerate(UR_N): jobs.append(('ur',f'letter-{i}',n))
PIPER={'en':'en_GB-alba-medium','es':'es_ES-davefx-medium','fr':'fr_FR-siwis-medium','ur':'ur_PK-aegis_female-medium'}
EDGE={'ar':'ar-SA-ZariyahNeural','tr':'tr-TR-EmelNeural'}
vs={}
def enc(src,dst): subprocess.run(['ffmpeg','-y','-loglevel','error','-i',src,'-af','silenceremove=start_periods=1:start_threshold=-60dB,areverse,silenceremove=start_periods=1:start_threshold=-60dB,areverse,adelay=120,apad=pad_dur=0.15','-ac','1','-ar','22050','-b:a','32k',dst],check=True)
async def main():
  keys=[]
  for l,k,t in jobs:
    os.makedirs(f'{D}/{l}',exist_ok=True); out=f'{D}/{l}/{k}.mp3'; keys.append(f'{l}/{k}')
    if os.path.exists(out): continue
    if l in PIPER:
      if l not in vs: vs[l]=PiperVoice.load(f'/workspace/voices/{PIPER[l]}.onnx')
      with wave.open('/tmp/t.wav','wb') as w: vs[l].synthesize_wav(t,w)
      enc('/tmp/t.wav',out)
    else:
      await edge_tts.Communicate(t,EDGE[l],rate='-10%').save('/tmp/t.mp3'); enc('/tmp/t.mp3',out)
  json.dump(sorted(keys),open('/workspace/keys.json','w'))
  print(len(keys))
asyncio.run(main())
