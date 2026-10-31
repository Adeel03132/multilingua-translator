(function(){'use strict';
const {S,save,kid,esc,say,toast,go,bumpStreak,checkBadges,confetti,SCREENS}=window.ML;const $=s=>document.querySelector(s);
const MAX=200,TL=Object.fromEntries(TLANGS.map(([c,n,f,d])=>[c,{name:n,flag:f,dir:d||'ltr'}]));
const norm=s=>String(s).toLowerCase().normalize('NFKC').replace(/[\u064B-\u0652\u0670\u0640]/g,'').replace(/[إأآ]/g,'ا').replace(/[.,!?؟،。！？¿¡"'“”‘’:;()]/g,' ').replace(/\s+/g,' ').trim();
/* Offline dictionary from the word packs */
const DICT={};PACKS.forEach(pk=>pk.items.forEach(it=>['en','ur','ar','es','fr','tr'].forEach(l=>{if(it[l]){(DICT[l]=DICT[l]||{})[norm(it[l])]=it;if(l==='en')DICT.en[norm(it.en).replace(/^(the|a|an) /,'')]=it}})));
const lookup=(l,t)=>{const d=DICT[l];if(!d)return null;const k=norm(t);return d[k]||(l==='en'?d[k.replace(/^(the|a|an) /,'').replace(/s$/,'')]:null)||null};
/* Kid-safety filter */
const LAT=new Set(BLOCKED.latin.filter(w=>!w.includes(' '))),PHR=BLOCKED.latin.filter(w=>w.includes(' ')),SCR=BLOCKED.script.map(norm);
function isBad(text){const t=norm(text),tokens=t.split(/[^\p{L}\p{N}]+/u).filter(Boolean),pad=' '+tokens.join(' ')+' ';
 if(tokens.some(w=>LAT.has(w)))return true;if(PHR.some(p=>pad.includes(' '+p+' ')))return true;if(SCR.some(w=>(' '+t+' ').includes(' '+w)||t.includes(w)&&w.length>3))return true;return false}
const BLOCK_MSG='🦉 Oops! That word isn\'t kind, so Lingo won\'t translate it. Let\'s try a happy word like "friend" 💜';
/* Online translation */
const lingvaCode=c=>c==='zh-CN'?'zh':c==='fil'?'tl':c;
async function withTimeout(url,ms){const ctl=new AbortController(),t=setTimeout(()=>ctl.abort(),ms);try{const r=await fetch(url,{signal:ctl.signal,referrerPolicy:'no-referrer',credentials:'omit'});if(!r.ok)throw new Error('http '+r.status);return await r.json()}finally{clearTimeout(t)}}
async function online(q,from,to){
 try{const d=await withTimeout('https://api.mymemory.translated.net/get?q='+encodeURIComponent(q)+'&langpair='+encodeURIComponent(from+'|'+to),8000);
  const t=d&&d.responseData&&d.responseData.translatedText;if(t&&Number(d.responseStatus)===200&&!/MYMEMORY WARNING|INVALID LANGUAGE|QUERY LENGTH/i.test(t))return{text:decode(t),src:'MyMemory'}}catch(e){}
 try{const d=await withTimeout('https://lingva.ml/api/v1/'+lingvaCode(from)+'/'+lingvaCode(to)+'/'+encodeURIComponent(q),8000);if(d&&d.translation)return{text:d.translation,src:'Lingva'}}catch(e){}
 return null}
function decode(t){const a=document.createElement('textarea');a.innerHTML=t;return a.value}
/* Voice input */
const SR=window.SpeechRecognition||window.webkitSpeechRecognition;const REGION={en:'en-US',ur:'ur-PK',ar:'ar-SA',hi:'hi-IN',bn:'bn-BD',pa:'pa-IN',fa:'fa-IR',es:'es-ES',fr:'fr-FR',de:'de-DE',tr:'tr-TR',zh:'zh-CN'};
let rec=null;
const opts=sel=>TLANGS.map(([c,n,f])=>`<option value="${c}" ${c===sel?'selected':''}>${f} ${n}</option>`).join('');
const dirOf=c=>TL[c]?TL[c].dir:'ltr';
let last=null;
SCREENS.translate=function(){const p=kid();p.saved=p.saved||[];p.history=p.history||[];p.words=p.words||{};
 if(!p.tfrom){p.tfrom='en';p.tto=p.lang!=='en'&&TL[p.lang]?p.lang:'ur'}
 const app=$('#app');last=null;
 app.innerHTML=`<div class="tr-hero"><svg class="mascot" viewBox="0 0 200 200" aria-hidden="true"><ellipse cx="100" cy="118" rx="70" ry="74" fill="#ffb84d"/><ellipse cx="100" cy="132" rx="44" ry="50" fill="#ffe2a8"/><circle cx="72" cy="88" r="27" fill="#fff"/><circle cx="128" cy="88" r="27" fill="#fff"/><circle cx="76" cy="91" r="12" fill="#2b2250"/><circle cx="124" cy="91" r="12" fill="#2b2250"/><path d="M90 112h20l-10 14z" fill="#ff7a59"/><path d="M40 60l18-30 16 36zM160 60l-18-30-16 36z" fill="#ffb84d"/></svg><h1>Kids Translator</h1></div>
 <div class="card tr">
  <div class="langrow"><label><span>From</span><select id="from" class="lsel">${opts(p.tfrom)}</select></label><button id="swap" class="swapbtn" aria-label="Swap languages">⇄</button><label><span>To</span><select id="to" class="lsel">${opts(p.tto)}</select></label></div>
  <label for="src" class="sr">Type a word or sentence</label><textarea id="src" class="tbox" maxlength="${MAX}" placeholder="Type a word… e.g. cat 🐱" autocomplete="off" spellcheck="false"></textarea>
  <div class="trow"><button class="rbtn" id="mic" aria-label="Speak a word">🎤<small>Speak</small></button><button class="rbtn" id="lsrc" aria-label="Listen to my words">🔊<small>Listen</small></button><button class="rbtn" id="clr" aria-label="Clear">🧽<small>Clear</small></button><span class="count" id="cnt">0/${MAX}</span></div>
  <button class="big" id="go">🌍 Translate</button>
  <div id="out" class="tout" aria-live="polite"><p class="muted center">Your translation will pop up here ✨</p></div>
 </div>
 <div class="card"><h2>⭐ My practice words <small class="muted" id="nsaved"></small></h2><div id="saved" class="tlist"></div></div>
 <div class="card"><h2>🕘 Recent <button class="back" id="clh" style="float:right;font-size:15px">Clear</button></h2><div id="hist" class="tlist"></div></div>`;
 const src=$('#src'),from=$('#from'),to=$('#to');
 const setDir=()=>{src.dir=dirOf(from.value);src.lang=from.value};setDir();
 const persist=()=>{p.tfrom=from.value;p.tto=to.value;save()};
 from.onchange=()=>{setDir();persist()};to.onchange=persist;
 $('#swap').onclick=()=>{const f=from.value;from.value=to.value;to.value=f;if(last){src.value=last.t}setDir();persist();upd();if(last)run()};
 const upd=()=>{$('#cnt').textContent=src.value.length+'/'+MAX};src.oninput=upd;
 src.onkeydown=e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();run()}};
 $('#clr').onclick=()=>{src.value='';upd();last=null;$('#out').innerHTML='<p class="muted center">Your translation will pop up here ✨</p>';src.focus()};
 $('#lsrc').onclick=()=>{const t=src.value.trim();if(!t)return toast('Type or say a word first 😊');if(isBad(t))return toast(BLOCK_MSG,5000);say(t,from.value)};
 $('#mic').onclick=()=>{if(!SR)return toast('🎤 Voice typing isn\'t available in this browser. Try Chrome on Android, or type instead!',5000);
  if(!navigator.onLine)return toast('🎤 Voice typing needs internet. You can still type!');
  if(rec){rec.abort();rec=null;$('#mic').classList.remove('on');return}
  rec=new SR();rec.lang=REGION[from.value]||REGION[from.value.split('-')[0]]||from.value;rec.interimResults=false;rec.maxAlternatives=1;$('#mic').classList.add('on');toast('🎤 Listening… say a word!');
  rec.onresult=e=>{src.value=e.results[0][0].transcript.slice(0,MAX);upd();run()};
  rec.onerror=e=>toast(e.error==='not-allowed'?'🎤 Please let a grown-up allow the microphone.':'🎤 I didn\'t catch that. Try again!');
  rec.onend=()=>{rec=null;const m=$('#mic');if(m)m.classList.remove('on')};try{rec.start()}catch(e){rec=null}};
 $('#go').onclick=run;
 $('#clh').onclick=()=>{p.history=[];save();lists()};
 async function run(){const q=src.value.trim().slice(0,MAX),f=from.value,t=to.value;
  if(!q){toast('Type or say a word first 😊');src.focus();return}
  if(f===t){toast('Pick two different languages 🌈');return}
  if(isBad(q)){show({blocked:true});return}
  const btn=$('#go');btn.disabled=true;btn.textContent='⏳ Translating…';
  let res=null,item=lookup(f,q);
  if(item&&item[t])res={text:item[t],src:'dict'};
  else if(S.settings.online===false)res={err:'📗 Online translation is turned off by a grown-up. Try a simple word like "cat", "red" or "mother"!'};
  else if(!navigator.onLine)res={err:'📶 No internet right now. Lingo can still translate simple words like "apple", "five" or "blue" from the kid dictionary!'};
  else{res=await online(q,f,t);if(!res)res={err:'😕 The translator is resting right now. Please try again in a moment, or try a simple word from the kid dictionary.'}}
  btn.disabled=false;btn.textContent='🌍 Translate';
  if(res.err){show({err:res.err});return}
  if(isBad(res.text)){show({blocked:true});return}
  item=item||lookup(t,res.text);
  last={o:q,t:res.text,from:f,to:t,e:item?item.e:'',src:res.src,when:Date.now()};
  p.history=[last,...p.history.filter(h=>!(h.o===q&&h.from===f&&h.to===t))].slice(0,12);
  const key=f+'|'+t+'|'+norm(q);let star=false;if(!p.words[key]){p.words[key]=1;star=true;bumpStreak(p)}const nb=checkBadges(p);save();window.ML.bar();
  show(last,star);if(star)toast('⭐ +1 star — new word!'+(nb.length?' New badge: '+nb[0].ic+' '+nb[0].t:''));say(res.text,t);lists()}
 function show(r,star){const o=$('#out');
  if(r.blocked){o.innerHTML=`<p class="tmsg">${esc(BLOCK_MSG)}</p>`;return}
  if(r.err){o.innerHTML=`<p class="tmsg">${esc(r.err)}</p>`;return}
  o.innerHTML=`${r.e?`<div class="tpic" aria-hidden="true">${r.e}</div>`:''}<div class="tword" lang="${r.to}" dir="${dirOf(r.to)}">${esc(r.t)}</div>
  <p class="muted center tsrc">${TL[r.from].flag} ${esc(r.o)} → ${TL[r.to].flag} · ${r.src==='dict'?'📗 Kid dictionary (works offline)':'🌐 Online ('+esc(r.src)+')'}</p>
  <div class="trow center"><button class="rbtn big2" id="lout" aria-label="Listen to translation">🔊<small>Listen</small></button><button class="rbtn" id="cpy" aria-label="Copy translation">📋<small>Copy</small></button><button class="rbtn star" id="learn" aria-label="Learn this word">⭐<small>Learn this word</small></button></div>`;
  $('#lout').onclick=()=>say(r.t,r.to);
  $('#cpy').onclick=async()=>{try{await navigator.clipboard.writeText(r.t);toast('Copied! 📋')}catch(e){toast('Copy is not available here.')}};
  $('#learn').onclick=()=>{if(p.saved.some(s=>s.o===r.o&&s.t===r.t&&s.from===r.from&&s.to===r.to))return toast('Already in your practice words ⭐');
   p.saved.unshift({o:r.o,t:r.t,from:r.from,to:r.to,e:r.e,when:Date.now()});save();lists();confetti();toast('Added to My practice words! ⭐')}}
 function card(h,i,isSaved){return `<div class="titem">${h.e?`<span class="ti-pic" aria-hidden="true">${h.e}</span>`:''}<div class="ti-txt"><b dir="${dirOf(h.from)}" lang="${h.from}">${esc(h.o)}</b><span dir="${dirOf(h.to)}" lang="${h.to}">${esc(h.t)}</span><small class="muted">${TL[h.from].flag} ${TL[h.from].name} → ${TL[h.to].flag} ${TL[h.to].name}</small></div>
  <div class="ti-btns"><button class="ib" data-say="${i}" data-s="${isSaved?1:0}" aria-label="Listen">🔊</button><button class="ib" data-use="${i}" data-s="${isSaved?1:0}" aria-label="Use again">↩</button>${isSaved?`<button class="ib" data-del="${i}" aria-label="Remove">🗑️</button>`:''}</div></div>`}
 function lists(){$('#nsaved').textContent=p.saved.length?'('+p.saved.length+')':'';
  $('#saved').innerHTML=p.saved.length?p.saved.map((h,i)=>card(h,i,true)).join(''):'<p class="muted">Tap ⭐ Learn this word to save words here.</p>';
  $('#hist').innerHTML=p.history.length?p.history.map((h,i)=>card(h,i,false)).join(''):'<p class="muted">Your translations will show here.</p>';
  const L=b=>b.dataset.s==='1'?p.saved:p.history;
  app.querySelectorAll('[data-say]').forEach(b=>b.onclick=()=>{const h=L(b)[b.dataset.say];say(h.t,h.to)});
  app.querySelectorAll('[data-use]').forEach(b=>b.onclick=()=>{const h=L(b)[b.dataset.use];from.value=h.from;to.value=h.to;src.value=h.o;setDir();upd();persist();window.scrollTo({top:0,behavior:'smooth'});run()});
  app.querySelectorAll('[data-del]').forEach(b=>b.onclick=()=>{p.saved.splice(+b.dataset.del,1);save();lists()})}
 lists()};
window.ML.translatorTest={isBad,lookup};
go(kid()?'translate':'profiles');
})();
