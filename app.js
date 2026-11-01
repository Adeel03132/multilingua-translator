(function(){'use strict';
const KEY='multilingo.v1',$=s=>document.querySelector(s),app=$('#app');
const today=()=>new Date().toISOString().slice(0,10);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const AVATARS=['🦁','🐼','🐰','🦊','🐯','🐨','🐸','🦄','🐧','🐢'];
let S=load();
function load(){try{const s=JSON.parse(localStorage.getItem(KEY));if(s&&s.profiles)return s}catch(e){}return{profiles:[],current:null,settings:{online:true,voiceSrc:'auto',voiceOnly:true,voice:true,sfx:false,rate:0.8,limit:0}}}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){toast('Could not save progress on this device.')}}
const kid=()=>S.profiles.find(p=>p.id===S.current);
function toast(msg,ms){const t=$('#toast');t.textContent=msg;t.hidden=false;clearTimeout(toast.t);toast.t=setTimeout(()=>t.hidden=true,ms||3500)}

/* ---------- Mascot ---------- */
const MASCOT=(cls)=>`<svg class="mascot ${cls||''}" viewBox="0 0 200 200" role="img" aria-label="Lingo the owl"><ellipse cx="100" cy="118" rx="70" ry="74" fill="#ffb84d"/><ellipse cx="100" cy="132" rx="44" ry="50" fill="#ffe2a8"/><circle cx="72" cy="88" r="27" fill="#fff"/><circle cx="128" cy="88" r="27" fill="#fff"/><circle cx="76" cy="91" r="12" fill="#2b2250"/><circle cx="124" cy="91" r="12" fill="#2b2250"/><circle cx="80" cy="86" r="4" fill="#fff"/><circle cx="128" cy="86" r="4" fill="#fff"/><path d="M90 112h20l-10 14z" fill="#ff7a59"/><path d="M40 60l18-30 16 36zM160 60l-18-30-16 36z" fill="#ffb84d"/><ellipse cx="34" cy="128" rx="10" ry="26" fill="#f59f2a"/><ellipse cx="166" cy="128" rx="10" ry="26" fill="#f59f2a"/></svg>`;

/* ---------- Audio ---------- */
let voices=[];const loadVoices=()=>{if('speechSynthesis' in window)voices=speechSynthesis.getVoices()};
if('speechSynthesis' in window){loadVoices();speechSynthesis.onvoiceschanged=loadVoices}
const findVoice=l=>voices.find(v=>v.lang.toLowerCase().replace('_','-').startsWith(l));
let warned={};
let curA=null,sayId=0;const AUDIO_CACHE='multilingua-audio-1';
const nrm=t=>String(t).toLowerCase().normalize('NFKC').replace(/[\u064B-\u0652\u0670\u0640]/g,'').replace(/[.,!?؟،"'“”:;]/g,' ').replace(/\s+/g,' ').trim();
function recKey(text,lang){const n=nrm(text);for(const p of PACKS)for(const it of p.items)if(it[lang]&&nrm(it[lang])===n)return p.id+'-'+it.id;return null}
function stopAll(){if(curA){curA.onended=curA.onerror=null;try{curA.pause()}catch(e){}curA=null}if('speechSynthesis' in window)speechSynthesis.cancel();vload(false)}
function vload(on){let el=document.getElementById('vload');if(!el){el=document.createElement('div');el.id='vload';el.setAttribute('role','status');el.innerHTML='🔊 Loading voice…';document.body.appendChild(el)}el.hidden=!on}
function playUrl(url,{loading}={}){return new Promise((ok,no)=>{const a=new Audio();curA=a;a.preload='auto';let started=false;
  if(loading)vload(true);
  const t=setTimeout(()=>{if(!started){a.onerror=null;a.pause();vload(false);no(new Error('timeout'))}},loading?9000:5000);
  a.onplaying=()=>{started=true;clearTimeout(t);vload(false)};a.onended=()=>{clearTimeout(t);ok()};a.onerror=()=>{clearTimeout(t);vload(false);no(a.error||new Error('audio'))};
  a.playbackRate=Math.max(.7,Math.min(1,(S.settings.rate||.8)+.15));a.src=url;a.play().catch(e=>{clearTimeout(t);vload(false);no(e)})})}
function chunks(text,max){const out=[];let rest=text.replace(/\s+/g,' ').trim();
  while(rest.length>max){let cut=-1;for(const re of[/[.!?؟।。]\s/g,/[,،;:]\s/g,/\s/g]){let m;re.lastIndex=0;while((m=re.exec(rest))&&m.index<max)cut=m.index+1;if(cut>0)break}
   if(cut<=0)cut=max;out.push(rest.slice(0,cut).trim());rest=rest.slice(cut).trim()}if(rest)out.push(rest);return out}
async function sayOnline(text,lang,id){const P=window.ONLINE_TTS;for(const c of chunks(text,P.max)){if(id!==sayId)return;await playUrl(P.url(c,lang),{loading:true})}}
function sayDevice(text,lang){if(!('speechSynthesis' in window))return false;const v=findVoice(vcode(lang));if(!v)return false;
  const u=new SpeechSynthesisUtterance(text);u.lang=v.lang;u.voice=v;u.rate=S.settings.rate||0.8;speechSynthesis.speak(u);return true}
/* Order: recorded file > device voice > online voice > owl message. voiceSrc: auto | device | online (online preferred over device) */
async function say(text,lang,key){
  if(!S.settings.voice||!text)return;stopAll();const id=++sayId;
  const mode=S.settings.voiceSrc||'auto';
  key=key||recKey(text,lang);
  if(key&&window.RECORDED.includes(lang+'/'+key)){try{await playUrl('audio/'+lang+'/'+key+'.mp3');return}catch(e){}}
  const canOnline=mode!=='device'&&navigator.onLine&&window.ONLINE_TTS;
  if(mode==='online'&&canOnline){try{await sayOnline(text,lang,id);return}catch(e){}}
  if(sayDevice(text,lang))return;
  if(mode==='auto'&&canOnline){try{await sayOnline(text,lang,id);return}catch(e){}}
  fallback(lang)}
function precacheLang(lang){try{if(!('caches' in window)||!navigator.onLine||(navigator.connection&&navigator.connection.saveData))return;
  const flag='multilingua.audio.'+lang;if(localStorage.getItem(flag))return;
  const urls=window.RECORDED.filter(k=>k.startsWith(lang+'/')).map(k=>'audio/'+k+'.mp3');
  (window.requestIdleCallback||setTimeout)(()=>caches.open(AUDIO_CACHE).then(c=>c.addAll(urls)).then(()=>localStorage.setItem(flag,'1')).catch(()=>{}),3000)}catch(e){}}
const vcode=l=>((LANGS[l]&&LANGS[l].voice)||l).toLowerCase().split('-')[0];
const lname=l=>(LANGS[l]&&LANGS[l].name)||((window.TLANGS||[]).find(x=>x[0]===l)||[0,l])[1];
function fallback(lang){if(warned[lang]&&Date.now()-warned[lang]<20000)return;warned[lang]=Date.now();
  toast('🦉 This device has no '+lname(lang)+' voice yet. Read the word together with a grown-up! 💛',5000)}
let actx;function sfx(ok){if(!S.settings.sfx||S.settings.voiceOnly)return;try{actx=actx||new (window.AudioContext||window.webkitAudioContext)();const o=actx.createOscillator(),g=actx.createGain();o.frequency.value=ok?880:220;g.gain.value=.08;o.connect(g);g.connect(actx.destination);o.start();o.stop(actx.currentTime+.15)}catch(e){}}
function confetti(){if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;const c=document.createElement('div');c.className='confetti';c.setAttribute('aria-hidden','true');c.innerHTML=Array.from({length:24},()=>`<i style="left:${Math.random()*100}%;animation-delay:${Math.random()*.6}s">${['⭐','🌟','✨','💜','🎈'][Math.floor(Math.random()*5)]}</i>`).join('');document.body.appendChild(c);setTimeout(()=>c.remove(),2400)}

/* ---------- Helpers ---------- */
const word=(it,l)=>it[l]||it.en;
const wordHTML=(it,l,cls)=>`<div class="${cls||'word'}" lang="${l}" dir="${LANGS[l].dir}">${esc(word(it,l))}</div>`;
function lessonsOf(pack){const L=[];for(let i=0;i<pack.items.length;i+=4)L.push(pack.items.slice(i,i+4));L.push(null);return L} // null = review
function starsFor(p,pk,i){return ((p.stars||{})[pk]||{})[i]||0}
function totalStars(p){let t=Object.keys(p.words||{}).length;for(const k in p.stars||{})for(const i in p.stars[k])t+=p.stars[k][i];return t}
function lessonsDone(p){let t=0;for(const k in p.stars||{})t+=Object.keys(p.stars[k]).length;return t}
const BADGES=[
 {id:'first',ic:'🌱',t:'First lesson',test:p=>lessonsDone(p)>=1},
 {id:'stars10',ic:'⭐',t:'10 stars',test:p=>totalStars(p)>=10},
 {id:'stars50',ic:'🌟',t:'50 stars',test:p=>totalStars(p)>=50},
 {id:'streak3',ic:'🔥',t:'3-day streak',test:p=>(p.best||0)>=3},
 {id:'streak7',ic:'🏆',t:'7-day streak',test:p=>(p.best||0)>=7},
 {id:'tracer',ic:'✏️',t:'Traced 5 letters',test:p=>Object.keys(p.traced||{}).length>=5},
 {id:'duas',ic:'🤲',t:'Dua star',test:p=>packDone(p,'duas')},
 {id:'animals',ic:'🦁',t:'Animal friend',test:p=>packDone(p,'animals')},
 {id:'numbers',ic:'🔢',t:'Number pro',test:p=>packDone(p,'numbers')}];
function packDone(p,id){const pk=PACKS.find(x=>x.id===id);return lessonsOf(pk).every((_,i)=>starsFor(p,id,i)>0)}
function checkBadges(p){const got=[];BADGES.forEach(b=>{if(!(p.badges||[]).includes(b.id)&&b.test(p)){(p.badges=p.badges||[]).push(b.id);got.push(b)}});return got}
function bumpStreak(p){const d=today();if(p.lastDay===d)return;const y=new Date(Date.now()-864e5).toISOString().slice(0,10);p.streak=p.lastDay===y?(p.streak||0)+1:1;p.best=Math.max(p.best||0,p.streak);p.lastDay=d}
function liveStreak(p){const y=new Date(Date.now()-864e5).toISOString().slice(0,10);return(p.lastDay===today()||p.lastDay===y)?(p.streak||0):0}

/* ---------- Screen time ---------- */
setInterval(()=>{const p=kid();if(!p||document.hidden)return;const d=today();if(!p.time||p.time.d!==d)p.time={d,s:0};p.time.s+=15;save();
 if(overLimit(p)&&!['parent','gate','break','profiles'].includes(cur))go('break')},15000);
const overLimit=p=>S.settings.limit>0&&p.time&&p.time.d===today()&&p.time.s>=S.settings.limit*60&&!(p.unlock===today());

/* ---------- Router ---------- */
let cur='';
function go(screen,arg){cur=screen;stopAll();const p=kid();
 if(!p&&!['profiles','newkid','gate','parent'].includes(screen)){screen='profiles';cur=screen}
 if(p&&overLimit(p)&&!['parent','gate','profiles','break','unlock','newkid'].includes(screen)){screen='break';cur=screen}
 const chrome=!!p&&!['lesson','profiles','newkid','gate','break'].includes(screen);
 $('#topbar').hidden=!chrome;$('#tabs').hidden=!chrome;if(chrome){bar();tabs(screen)}
 (SCREENS[screen]||SCREENS.home)(arg);app.focus({preventScroll:true});window.scrollTo(0,0)}
function bar(){const p=kid();$('#topbar').innerHTML=`<button class="who" id="switchKid" aria-label="Switch child"><span class="av">${p.avatar}</span><span>${esc(p.name)}</span></button><span class="pill fire" title="Day streak">🔥 ${liveStreak(p)}</span><span class="pill" title="Stars">⭐ ${totalStars(p)}</span>`;$('#switchKid').onclick=()=>go('profiles')}
function tabs(active){const T=[['translate','🌍','Translate'],['home','🗺️','Learn'],['trace','✏️','Trace'],['badges','🏅','Badges'],['gate','👪','Parents']];
 $('#tabs').innerHTML=T.map(([id,ic,l])=>`<button data-go="${id}" ${active===id||(id==='home'&&active==='pack')?'aria-current="page"':''}><span aria-hidden="true">${ic}</span>${l}</button>`).join('');
 $('#tabs').querySelectorAll('button').forEach(b=>b.onclick=()=>go(b.dataset.go))}

const SCREENS={
profiles(){app.innerHTML=`<div class="center">${MASCOT('bounce')}<h1>Multilingua</h1><p class="muted">Translator for Kids · English · اردو · العربية</p><h2>Who is learning today?</h2></div>
 <div class="grid">${S.profiles.map((p,i)=>`<button class="tile c${i%7}" data-id="${p.id}"><span class="ic">${p.avatar}</span>${esc(p.name)}<small>${LANGS[p.lang].flag} ${LANGS[p.lang].name}</small></button>`).join('')}
 <button class="tile" id="add"><span class="ic">➕</span>Add child</button></div>
 <button class="big soft" id="par">👪 Parents</button>`;
 app.querySelectorAll('[data-id]').forEach(b=>b.onclick=()=>{S.current=b.dataset.id;save();go('translate')});
 $('#add').onclick=()=>go('gate','newkid');$('#par').onclick=()=>go('gate','parent');
 const s=app.querySelector('svg');s.style.width='130px'},
newkid(){let av=AVATARS[0],lang='en';app.innerHTML=`<button class="back" id="bk">← Back</button><h1>New learner</h1>
 <div class="card"><label for="nm"><b>Child's name</b></label><input type="text" id="nm" maxlength="20" autocomplete="off" placeholder="e.g. Ayesha">
 <p><b>Pick a buddy</b></p><div class="avatars" role="group" aria-label="Avatar">${AVATARS.map(a=>`<button aria-pressed="${a===av}" data-a="${a}">${a}</button>`).join('')}</div>
 <p><b>Learn which language?</b></p><div class="seg" role="group" aria-label="Language">${Object.keys(LANGS).map(l=>`<button aria-pressed="${l===lang}" data-l="${l}">${LANGS[l].flag} ${LANGS[l].name}</button>`).join('')}</div></div>
 <button class="big green" id="ok">Let's go! 🚀</button>`;
 $('#bk').onclick=()=>go('profiles');
 app.querySelectorAll('[data-a]').forEach(b=>b.onclick=()=>{av=b.dataset.a;app.querySelectorAll('[data-a]').forEach(x=>x.setAttribute('aria-pressed',x===b))});
 app.querySelectorAll('[data-l]').forEach(b=>b.onclick=()=>{lang=b.dataset.l;app.querySelectorAll('[data-l]').forEach(x=>x.setAttribute('aria-pressed',x===b))});
 $('#ok').onclick=()=>{const n=$('#nm').value.trim();if(!n){toast('Please type a name 😊');$('#nm').focus();return}
  const p={id:'k'+Date.now(),name:n,avatar:av,lang,stars:{},badges:[],traced:{},streak:0,best:0};S.profiles.push(p);S.current=p.id;save();go('translate')}},
home(){const p=kid(),ui=UI[p.lang]||UI.en;app.innerHTML=`<div class="hero">${MASCOT('bounce')}<p><span lang="${p.lang}" dir="${LANGS[p.lang].dir}">${esc(ui.hello)}</span>, ${esc(p.name)}!<br>Let's learn ${LANGS[p.lang].name} today!</p></div>
 <div class="grid">${PACKS.map((pk,i)=>{const L=lessonsOf(pk),d=L.filter((_,j)=>starsFor(p,pk.id,j)>0).length;return `<button class="tile c${i%7}" data-p="${pk.id}"><span class="ic" aria-hidden="true">${pk.icon}</span>${pk.title}<small>${d}/${L.length} lessons</small></button>`}).join('')}</div>`;
 app.querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>go('pack',b.dataset.p))},
pack(id){const p=kid(),pk=PACKS.find(x=>x.id===id),L=lessonsOf(pk);
 app.innerHTML=`<button class="back" id="bk">← Packs</button><h1>${pk.icon} ${pk.title}</h1>${pk.dua?'<p class="muted">Duas are said in Arabic, with the meaning in your language.</p>':''}<div class="map">${L.map((l,i)=>{const s=starsFor(p,id,i),lock=i>0&&!starsFor(p,id,i-1)&&!s;
 return `<div class="node ${s?'done':''} ${lock?'locked':''}"><button class="dot" data-i="${i}" aria-label="Lesson ${i+1}${lock?' (locked)':''}">${lock?'🔒':l?i+1:'🏁'}</button><div class="info"><b>${l?'Lesson '+(i+1):'Big review'}</b><div class="muted">${l?l.map(x=>x.e).join(' '):'All words'}</div><div class="stars" aria-label="${s} stars">${'★'.repeat(s)}${'☆'.repeat(3-s)}</div></div></div>`}).join('')}</div>`;
 $('#bk').onclick=()=>go('home');
 app.querySelectorAll('[data-i]').forEach(b=>b.onclick=()=>{const i=+b.dataset.i;if(i>0&&!starsFor(p,id,i-1)&&!starsFor(p,id,i)){toast('Finish the lesson before first! 🔓');return}lesson(pk,i)})},
trace(arg){traceScreen(arg)},
badges(){const p=kid();app.innerHTML=`<h1>🏅 ${esc(p.name)}'s badges</h1><div class="badges">${BADGES.map(b=>{const on=(p.badges||[]).includes(b.id);return `<div class="badge ${on?'':'off'}"><span class="ic" aria-hidden="true">${b.ic}</span>${b.t}<span class="muted" style="font-size:12px">${on?'Earned!':'Keep going'}</span></div>`}).join('')}</div>
 <div class="card"><b>Best streak:</b> 🔥 ${p.best||0} days · <b>Stars:</b> ⭐ ${totalStars(p)} · <b>Lessons:</b> ${lessonsDone(p)}</div>`},
gate(next){const a=3+Math.floor(Math.random()*7),b=3+Math.floor(Math.random()*7);let ans='';
 app.innerHTML=`<button class="back" id="bk">← Back</button><h1 class="center">👪 Grown-ups only</h1><p class="center">What is <b>${a} × ${b}</b>?</p><div class="answer" id="ans" aria-live="polite">&nbsp;</div>
 <div class="pad">${[1,2,3,4,5,6,7,8,9,'⌫',0,'✓'].map(k=>`<button data-k="${k}" aria-label="${k==='⌫'?'Delete':k==='✓'?'Check':k}">${k}</button>`).join('')}</div>`;
 $('#bk').onclick=()=>go(kid()?'translate':'profiles');$
 app.querySelectorAll('[data-k]').forEach(btn=>btn.onclick=()=>{const k=btn.dataset.k;if(k==='⌫')ans=ans.slice(0,-1);else if(k==='✓'){if(+ans===a*b){go(next||'parent');return}else{toast('Not quite. Ask a grown-up!');ans=''}}else if(ans.length<3)ans+=k;$('#ans').textContent=ans||'\u00a0'})},
parent(){const st=S.settings;
 app.innerHTML=`<button class="back" id="bk">← Back</button><h1>👪 Parent area</h1>
 <div class="card"><h2>Progress</h2>${S.profiles.length?`<table><thead><tr><th>Child</th><th class="n">⭐</th><th class="n">Lessons</th><th class="n">🔥 Best</th><th class="n">Today</th></tr></thead><tbody>${S.profiles.map(p=>`<tr><td>${p.avatar} ${esc(p.name)}<br><small class="muted">${LANGS[p.lang].name} · ${(p.badges||[]).length} badges</small></td><td class="n">${totalStars(p)}</td><td class="n">${lessonsDone(p)}</td><td class="n">${p.best||0}</td><td class="n">${p.time&&p.time.d===today()?Math.round(p.time.s/60):0} min</td></tr>`).join('')}</tbody></table>`:'<p>Add a child to start.</p>'}
 <button class="big green" id="addk">➕ Add a child</button></div>
 <div class="card"><h2>Sound</h2>
 <label class="row">Voice-only mode (no music, no sound effects)<input type="checkbox" class="switch" id="vo" ${st.voiceOnly?'checked':''}></label>
 <label class="row">Spoken words<input type="checkbox" class="switch" id="vc" ${st.voice?'checked':''}></label>
 <label class="row">Gentle tap sounds<input type="checkbox" class="switch" id="fx" ${st.sfx?'checked':''} ${st.voiceOnly?'disabled':''}></label>
 <label class="row">Speaking speed<select id="rt">${[[.6,'Slow'],[.8,'Normal'],[1,'Fast']].map(([v,l])=>`<option value="${v}" ${st.rate==v?'selected':''}>${l}</option>`).join('')}</select></label>
 <button class="big soft" id="test">🔊 Test voices</button><p class="muted" id="vinfo"></p></div>
 <div class="card"><h2>Voice</h2><label class="row">Voice source<select id="vsrc"><option value="auto" ${(st.voiceSrc||'auto')==='auto'?'selected':''}>Auto</option><option value="device" ${st.voiceSrc==='device'?'selected':''}>Device only</option><option value="online" ${st.voiceSrc==='online'?'selected':''}>Online allowed</option></select></label><p class="muted">Lesson words, duas and letters always use the built-in recordings. For other text — Auto: phone voice, then online voice if the phone has none. Device only: never sends text to a voice service. Online allowed: online voice first (sends the text to ${esc(window.ONLINE_TTS.name)}).</p></div>
 <div class="card"><h2>Translator</h2><label class="row">Online translation (off = built-in kid dictionary only)<input type="checkbox" class="switch" id="onl" ${st.online!==false?'checked':''}></label><p class="muted">Rude words are always blocked in both directions. Typed text is sent to MyMemory (or Lingva as backup) only when online translation is on.</p></div>
 <div class="card"><h2>Screen time</h2><label class="row">Daily limit per child<select id="lim">${[0,10,15,20,30,45,60].map(v=>`<option value="${v}" ${st.limit==v?'selected':''}>${v?v+' minutes':'No limit'}</option>`).join('')}</select></label></div>
 <div class="card"><h2>Children</h2>${S.profiles.map(p=>`<div class="row"><span>${p.avatar} ${esc(p.name)}</span><span><select data-lang="${p.id}" aria-label="Language for ${esc(p.name)}">${Object.keys(LANGS).map(l=>`<option value="${l}" ${p.lang===l?'selected':''}>${LANGS[l].name}</option>`).join('')}</select> <button class="back" data-del="${p.id}" aria-label="Remove ${esc(p.name)}">🗑️</button></span></div>`).join('')}</div>
 <div class="card"><h2>About</h2><p>No ads. No tracking. No accounts. Progress stays on this device only. Works offline after the first visit.</p><p class="muted">Duas follow common Sunnah wording; please review them with your child. Recorded native audio can be added in <code>audio/</code>.</p></div>`;
 $('#bk').onclick=()=>go(kid()?'translate':'profiles');$('#addk').onclick=()=>go('newkid');
 const set=(k,v)=>{st[k]=v;save()};
 $('#vo').onchange=e=>{set('voiceOnly',e.target.checked);$('#fx').disabled=e.target.checked};$('#vc').onchange=e=>set('voice',e.target.checked);$('#fx').onchange=e=>set('sfx',e.target.checked);
 $('#vsrc').onchange=e=>set('voiceSrc',e.target.value);$('#onl').onchange=e=>set('online',e.target.checked);$('#rt').onchange=e=>set('rate',+e.target.value);$('#lim').onchange=e=>set('limit',+e.target.value);
 $('#test').onclick=()=>{loadVoices();$('#vinfo').textContent=Object.keys(LANGS).map(l=>LANGS[l].name+': '+(findVoice(LANGS[l].voice)?'✅':'❌ not installed')).join(' · ');say('Hello','en')};
 app.querySelectorAll('[data-lang]').forEach(s=>s.onchange=()=>{S.profiles.find(p=>p.id===s.dataset.lang).lang=s.value;save()});
 app.querySelectorAll('[data-del]').forEach(b=>b.onclick=()=>{if(confirm('Remove this child and their progress?')){S.profiles=S.profiles.filter(p=>p.id!==b.dataset.del);if(S.current===b.dataset.del)S.current=null;save();go('parent')}})},
break(){app.innerHTML=`<div class="center">${MASCOT('bounce')}<h1>Time for a break! 🌳</h1><p>Great learning today. Let's play outside, read a book, or help at home. See you tomorrow!</p><button class="big soft" id="pg">👪 Grown-up: extend time</button><button class="big soft" id="sw">Switch child</button></div>`;
 app.querySelector('svg').style.width='150px';$('#pg').onclick=()=>go('gate','unlock');$('#sw').onclick=()=>go('profiles')},
unlock(){const p=kid();if(p){p.unlock=today();save()}toast('Extra time unlocked for today.');go('translate')}
};

/* ---------- Lesson ---------- */
function lesson(pk,idx){const p=kid(),l=p.lang,dua=!!pk.dua,sl=dua?'ar':l;
 const L=lessonsOf(pk);const items=L[idx]||shuffle(pk.items).slice(0,4);
 const steps=[];if(L[idx])items.forEach(it=>steps.push({t:'learn',it}));shuffle(items).forEach(it=>steps.push({t:'quiz',it}));steps.push({t:'match'});
 let k=0,miss=0;cur='lesson';
 const key=it=>pk.id+'-'+it.id,speak=it=>say(word(it,sl),sl,key(it));
 function head(){return `<div class="lessonbar"><button class="back" id="x" aria-label="Close lesson">✖</button><div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="${steps.length}" aria-valuenow="${k}"><i style="width:${k/steps.length*100}%"></i></div></div>`}
 function bind(){$('#x').onclick=()=>go('pack',pk.id)}
 function meaning(it){return dua&&l!=='ar'?`<div class="sub" lang="${l}" dir="${LANGS[l].dir}">${esc(word(it,l==='ur'?'ur':l==='en'?'en':'en'))}</div>`:''}
 function step(){if(k>=steps.length)return done();const s=steps[k];
  if(s.t==='learn'){app.innerHTML=head()+`<div class="card learn">${dua?`<span class="dua-when">${esc(s.it.when)}</span>`:''}<div class="pic" aria-hidden="true">${s.it.e}</div>${wordHTML(s.it,sl)}${meaning(s.it)}<button class="speak" id="sp" aria-label="Listen">🔊</button></div><button class="big" id="nx">Next ➜</button>`;
   bind();$('#sp').onclick=()=>speak(s.it);$('#nx').onclick=()=>{k++;step()};speak(s.it)}
  else if(s.t==='quiz'){const others=shuffle(pk.items.filter(x=>x.id!==s.it.id)).slice(0,3),opts=shuffle([s.it,...others]);let wrong=false;
   app.innerHTML=head()+`<div class="card learn"><p class="sub">Tap the right picture!</p><button class="speak" id="sp" aria-label="Listen again">🔊</button>${wordHTML(s.it,sl)}</div><div class="choices">${opts.map(o=>`<button class="choice" data-id="${o.id}" aria-label="${esc(o.en)}">${o.e}</button>`).join('')}</div>`;
   bind();$('#sp').onclick=()=>speak(s.it);speak(s.it);
   app.querySelectorAll('.choice').forEach(b=>b.onclick=()=>{if(b.dataset.id===s.it.id){b.classList.add('right');sfx(true);app.querySelectorAll('.choice').forEach(x=>x.disabled=true);setTimeout(()=>{k++;step()},700)}else{b.classList.add('wrong');sfx(false);if(!wrong){miss++;wrong=true}setTimeout(()=>b.classList.remove('wrong'),400)}})}
  else{const set=items.slice(0,4),ws=shuffle(set),ps=shuffle(set);let sel=null,left=set.length,wrong={};
   app.innerHTML=head()+`<h2 class="center">Match the pairs!</h2><div class="match"><div class="col">${ws.map(o=>`<button class="mbtn" data-w="${o.id}" lang="${sl}" dir="${LANGS[sl].dir}">${esc(word(o,sl))}</button>`).join('')}</div><div class="col">${ps.map(o=>`<button class="mbtn pic" data-p="${o.id}" aria-label="${esc(o.en)}">${o.e}</button>`).join('')}</div></div>`;
   bind();
   app.querySelectorAll('[data-w]').forEach(b=>b.onclick=()=>{if(b.classList.contains('ok'))return;app.querySelectorAll('[data-w]').forEach(x=>x.classList.remove('sel'));b.classList.add('sel');sel=b;speak(set.find(x=>x.id===b.dataset.w))});
   app.querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>{if(!sel||b.classList.contains('ok')){if(!sel)toast('First tap a word 👈');return}
    if(sel.dataset.w===b.dataset.p){sel.classList.replace('sel','ok');b.classList.add('ok');sel.disabled=b.disabled=true;sel=null;sfx(true);if(--left===0)setTimeout(()=>{k++;step()},500)}
    else{b.classList.add('wrong');sfx(false);if(!wrong[sel.dataset.w]){miss++;wrong[sel.dataset.w]=1}setTimeout(()=>b.classList.remove('wrong'),400)}})}
 }
 function done(){const stars=miss<=1?3:miss<=3?2:1;p.stars=p.stars||{};p.stars[pk.id]=p.stars[pk.id]||{};p.stars[pk.id][idx]=Math.max(stars,p.stars[pk.id][idx]||0);bumpStreak(p);const nb=checkBadges(p);save();confetti();
  app.innerHTML=`<div class="result card">${MASCOT('bounce')}<h1>Great job, ${esc(p.name)}!</h1><div class="stars" aria-label="${stars} stars">${'★'.repeat(stars)}${'☆'.repeat(3-stars)}</div><p>🔥 ${p.streak} day streak</p>${nb.map(b=>`<p><b>New badge: ${b.ic} ${b.t}</b></p>`).join('')}</div>
  ${idx+1<L.length?'<button class="big green" id="nx">Next lesson ➜</button>':''}<button class="big soft" id="mp">Back to map</button>`;
  app.querySelector('svg').style.width='120px';const n=$('#nx');if(n)n.onclick=()=>lesson(pk,idx+1);$('#mp').onclick=()=>go('pack',pk.id);
  say(UI[l]?({en:'Great job!',ur:'شاباش!',ar:'أَحْسَنْت!'})[l]:'Great job!',UI[l]?l:'en')}
 $('#topbar').hidden=true;$('#tabs').hidden=true;step()}

/* ---------- Tracing ---------- */
let traceLang=null;
function traceScreen(letter){const p=kid();traceLang=traceLang||(LETTERS[p.lang]?p.lang:'en');const tl=traceLang;
 if(letter==null){app.innerHTML=`<h1>✏️ Trace letters</h1><div class="seg" role="group" aria-label="Alphabet">${['en','ar','ur'].map(l=>`<button aria-pressed="${l===tl}" data-l="${l}">${LANGS[l].flag} ${LANGS[l].name}</button>`).join('')}</div>
  <div class="letters" dir="${LANGS[tl].dir}">${LETTERS[tl].map(c=>`<button data-c="${esc(c)}" lang="${tl}" class="${(p.traced||{})[tl+c]?'done':''}">${esc(c)}</button>`).join('')}</div>`;
  app.querySelectorAll('[data-l]').forEach(b=>b.onclick=()=>{traceLang=b.dataset.l;traceScreen()});
  app.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>traceScreen(b.dataset.c));return}
 const font=tl==='ar'?"'Noto Naskh Arabic', serif":tl==='ur'?"'Noto Nastaliq Urdu','Noto Naskh Arabic', serif":"'Baloo 2', sans-serif";
 app.innerHTML=`<button class="back" id="bk">← Letters</button><div class="center"><span class="word" lang="${tl}">${esc(letter)}</span> <button class="speak" id="sp" aria-label="Hear letter">🔊</button></div>
 <div class="trace-wrap"><canvas id="g" aria-hidden="true"></canvas><canvas id="d" role="img" aria-label="Trace the letter ${esc(letter)} with your finger"></canvas></div>
 <div class="grid" style="grid-template-columns:1fr 1fr"><button class="big soft" id="cl">🧽 Clear</button><button class="big green" id="ck">✅ Done</button></div>`;
 $('#bk').onclick=()=>traceScreen();const lk='letter-'+LETTERS[tl].indexOf(letter);$('#sp').onclick=()=>say(letter,tl,lk);say(letter,tl,lk);
 const g=$('#g'),d=$('#d'),wrap=app.querySelector('.trace-wrap'),dpr=Math.min(2,window.devicePixelRatio||1);let W;
 function setup(){W=wrap.clientWidth;[g,d].forEach(c=>{c.width=c.height=W*dpr;c.getContext('2d').setTransform(dpr,0,0,dpr,0,0)});drawGuide(g.getContext('2d'),'#e8e1ff');
  const x=d.getContext('2d');x.lineCap=x.lineJoin='round';x.lineWidth=W*0.07;x.strokeStyle='#7b5cff'}
 function drawGuide(c,col){c.clearRect(0,0,W,W);c.fillStyle=col;c.textAlign='center';c.textBaseline='middle';c.font=`700 ${W*(tl==='ur'?0.5:0.7)}px ${font}`;c.fillText(letter,W/2,W*(tl==='ur'?0.42:0.52))}
 const ready=document.fonts&&document.fonts.load?document.fonts.load(`700 40px ${font}`,letter).catch(()=>{}):Promise.resolve();ready.then(setup);setup();
 let drawing=false,last=null;const pos=e=>{const r=d.getBoundingClientRect();return[e.clientX-r.left,e.clientY-r.top]};
 d.onpointerdown=e=>{drawing=true;last=pos(e);d.setPointerCapture(e.pointerId)};
 d.onpointermove=e=>{if(!drawing)return;const pt=pos(e),x=d.getContext('2d');x.beginPath();x.moveTo(last[0],last[1]);x.lineTo(pt[0],pt[1]);x.stroke();last=pt};
 d.onpointerup=d.onpointercancel=()=>drawing=false;
 $('#cl').onclick=()=>d.getContext('2d').clearRect(0,0,W,W);
 $('#ck').onclick=()=>{const gd=g.getContext('2d').getImageData(0,0,g.width,g.height).data,dd=d.getContext('2d').getImageData(0,0,d.width,d.height).data;let tot=0,hit=0,ink=0;
  for(let i=3;i<gd.length;i+=16){const gi=gd[i]>100;if(gi){tot++;if(dd[i]>100)hit++}if(dd[i]>100)ink++}
  const cov=tot?hit/tot:0;if(cov>0.45){p.traced=p.traced||{};p.traced[tl+letter]=1;bumpStreak(p);const nb=checkBadges(p);save();confetti();toast('⭐ Beautiful writing!'+(nb.length?' New badge: '+nb[0].ic+' '+nb[0].t:''));say(({en:'Great job!',ur:'شاباش!',ar:'أَحْسَنْت!'})[tl],tl)}
  else toast(ink?'Almost! Follow the light letter shape 💜':'Use your finger to trace the letter ✏️')}}

/* ---------- Boot ---------- */
if('serviceWorker' in navigator&&location.protocol!=='file:')window.addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
window.ML={precacheLang,S,save,kid,esc,say,toast,go,bumpStreak,checkBadges,confetti,SCREENS,bar:()=>bar()};
})();
