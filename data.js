/* Multilingua content. Each item: id, e (emoji picture), en, ur, ar. Optional: es, fr, tr.
   Recorded audio: put files at audio/<lang>/<pack>-<id>.mp3 and list the keys in RECORDED below
   (e.g. "ar/duas-bismillah"). Listed files play instead of device speech. */
window.RECORDED = ["ar/animals-bird","ar/animals-camel","ar/animals-cat","ar/animals-cow","ar/animals-dog","ar/animals-fish","ar/animals-horse","ar/animals-lion","ar/colors-black","ar/colors-blue","ar/colors-green","ar/colors-orange","ar/colors-purple","ar/colors-red","ar/colors-white","ar/colors-yellow","ar/duas-alhamdulillah","ar/duas-bismillah","ar/duas-home","ar/duas-ilm","ar/duas-jazak","ar/duas-salam","ar/duas-sleep","ar/duas-wake","ar/family-baby","ar/family-brother","ar/family-family","ar/family-father","ar/family-grandfather","ar/family-grandmother","ar/family-mother","ar/family-sister","ar/fruits-apple","ar/fruits-banana","ar/fruits-dates","ar/fruits-grapes","ar/fruits-mango","ar/fruits-orange","ar/fruits-strawberry","ar/fruits-watermelon","ar/greetings-bye","ar/greetings-morning","ar/greetings-night","ar/greetings-no","ar/greetings-please","ar/greetings-salam","ar/greetings-thanks","ar/greetings-yes","ar/letter-0","ar/letter-1","ar/letter-10","ar/letter-11","ar/letter-12","ar/letter-13","ar/letter-14","ar/letter-15","ar/letter-16","ar/letter-17","ar/letter-18","ar/letter-19","ar/letter-2","ar/letter-20","ar/letter-21","ar/letter-22","ar/letter-23","ar/letter-24","ar/letter-25","ar/letter-26","ar/letter-27","ar/letter-3","ar/letter-4","ar/letter-5","ar/letter-6","ar/letter-7","ar/letter-8","ar/letter-9","ar/numbers-1","ar/numbers-10","ar/numbers-2","ar/numbers-3","ar/numbers-4","ar/numbers-5","ar/numbers-6","ar/numbers-7","ar/numbers-8","ar/numbers-9","en/animals-bird","en/animals-camel","en/animals-cat","en/animals-cow","en/animals-dog","en/animals-fish","en/animals-horse","en/animals-lion","en/colors-black","en/colors-blue","en/colors-green","en/colors-orange","en/colors-purple","en/colors-red","en/colors-white","en/colors-yellow","en/duas-alhamdulillah","en/duas-bismillah","en/duas-home","en/duas-ilm","en/duas-jazak","en/duas-salam","en/duas-sleep","en/duas-wake","en/family-baby","en/family-brother","en/family-family","en/family-father","en/family-grandfather","en/family-grandmother","en/family-mother","en/family-sister","en/fruits-apple","en/fruits-banana","en/fruits-dates","en/fruits-grapes","en/fruits-mango","en/fruits-orange","en/fruits-strawberry","en/fruits-watermelon","en/greetings-bye","en/greetings-morning","en/greetings-night","en/greetings-no","en/greetings-please","en/greetings-salam","en/greetings-thanks","en/greetings-yes","en/letter-0","en/letter-1","en/letter-10","en/letter-11","en/letter-12","en/letter-13","en/letter-14","en/letter-15","en/letter-16","en/letter-17","en/letter-18","en/letter-19","en/letter-2","en/letter-20","en/letter-21","en/letter-22","en/letter-23","en/letter-24","en/letter-25","en/letter-3","en/letter-4","en/letter-5","en/letter-6","en/letter-7","en/letter-8","en/letter-9","en/numbers-1","en/numbers-10","en/numbers-2","en/numbers-3","en/numbers-4","en/numbers-5","en/numbers-6","en/numbers-7","en/numbers-8","en/numbers-9","es/animals-bird","es/animals-camel","es/animals-cat","es/animals-cow","es/animals-dog","es/animals-fish","es/animals-horse","es/animals-lion","es/colors-black","es/colors-blue","es/colors-green","es/colors-orange","es/colors-purple","es/colors-red","es/colors-white","es/colors-yellow","es/family-baby","es/family-brother","es/family-family","es/family-father","es/family-grandfather","es/family-grandmother","es/family-mother","es/family-sister","es/fruits-apple","es/fruits-banana","es/fruits-dates","es/fruits-grapes","es/fruits-mango","es/fruits-orange","es/fruits-strawberry","es/fruits-watermelon","es/greetings-bye","es/greetings-morning","es/greetings-night","es/greetings-no","es/greetings-please","es/greetings-salam","es/greetings-thanks","es/greetings-yes","es/numbers-1","es/numbers-10","es/numbers-2","es/numbers-3","es/numbers-4","es/numbers-5","es/numbers-6","es/numbers-7","es/numbers-8","es/numbers-9","fr/animals-bird","fr/animals-camel","fr/animals-cat","fr/animals-cow","fr/animals-dog","fr/animals-fish","fr/animals-horse","fr/animals-lion","fr/colors-black","fr/colors-blue","fr/colors-green","fr/colors-orange","fr/colors-purple","fr/colors-red","fr/colors-white","fr/colors-yellow","fr/family-baby","fr/family-brother","fr/family-family","fr/family-father","fr/family-grandfather","fr/family-grandmother","fr/family-mother","fr/family-sister","fr/fruits-apple","fr/fruits-banana","fr/fruits-dates","fr/fruits-grapes","fr/fruits-mango","fr/fruits-orange","fr/fruits-strawberry","fr/fruits-watermelon","fr/greetings-bye","fr/greetings-morning","fr/greetings-night","fr/greetings-no","fr/greetings-please","fr/greetings-salam","fr/greetings-thanks","fr/greetings-yes","fr/numbers-1","fr/numbers-10","fr/numbers-2","fr/numbers-3","fr/numbers-4","fr/numbers-5","fr/numbers-6","fr/numbers-7","fr/numbers-8","fr/numbers-9","tr/animals-bird","tr/animals-camel","tr/animals-cat","tr/animals-cow","tr/animals-dog","tr/animals-fish","tr/animals-horse","tr/animals-lion","tr/colors-black","tr/colors-blue","tr/colors-green","tr/colors-orange","tr/colors-purple","tr/colors-red","tr/colors-white","tr/colors-yellow","tr/family-baby","tr/family-brother","tr/family-family","tr/family-father","tr/family-grandfather","tr/family-grandmother","tr/family-mother","tr/family-sister","tr/fruits-apple","tr/fruits-banana","tr/fruits-dates","tr/fruits-grapes","tr/fruits-mango","tr/fruits-orange","tr/fruits-strawberry","tr/fruits-watermelon","tr/greetings-bye","tr/greetings-morning","tr/greetings-night","tr/greetings-no","tr/greetings-please","tr/greetings-salam","tr/greetings-thanks","tr/greetings-yes","tr/numbers-1","tr/numbers-10","tr/numbers-2","tr/numbers-3","tr/numbers-4","tr/numbers-5","tr/numbers-6","tr/numbers-7","tr/numbers-8","tr/numbers-9","ur/animals-bird","ur/animals-camel","ur/animals-cat","ur/animals-cow","ur/animals-dog","ur/animals-fish","ur/animals-horse","ur/animals-lion","ur/colors-black","ur/colors-blue","ur/colors-green","ur/colors-orange","ur/colors-purple","ur/colors-red","ur/colors-white","ur/colors-yellow","ur/duas-alhamdulillah","ur/duas-bismillah","ur/duas-home","ur/duas-ilm","ur/duas-jazak","ur/duas-salam","ur/duas-sleep","ur/duas-wake","ur/family-baby","ur/family-brother","ur/family-family","ur/family-father","ur/family-grandfather","ur/family-grandmother","ur/family-mother","ur/family-sister","ur/fruits-apple","ur/fruits-banana","ur/fruits-dates","ur/fruits-grapes","ur/fruits-mango","ur/fruits-orange","ur/fruits-strawberry","ur/fruits-watermelon","ur/greetings-bye","ur/greetings-morning","ur/greetings-night","ur/greetings-no","ur/greetings-please","ur/greetings-salam","ur/greetings-thanks","ur/greetings-yes","ur/letter-0","ur/letter-1","ur/letter-10","ur/letter-11","ur/letter-12","ur/letter-13","ur/letter-14","ur/letter-15","ur/letter-16","ur/letter-17","ur/letter-18","ur/letter-19","ur/letter-2","ur/letter-20","ur/letter-21","ur/letter-22","ur/letter-23","ur/letter-24","ur/letter-25","ur/letter-26","ur/letter-27","ur/letter-28","ur/letter-29","ur/letter-3","ur/letter-30","ur/letter-31","ur/letter-32","ur/letter-33","ur/letter-34","ur/letter-35","ur/letter-36","ur/letter-37","ur/letter-4","ur/letter-5","ur/letter-6","ur/letter-7","ur/letter-8","ur/letter-9","ur/numbers-1","ur/numbers-10","ur/numbers-2","ur/numbers-3","ur/numbers-4","ur/numbers-5","ur/numbers-6","ur/numbers-7","ur/numbers-8","ur/numbers-9"];
window.LANGS = {
  en:{name:'English',native:'English',voice:'en',dir:'ltr',flag:'🇬🇧'},
  ur:{name:'Urdu',native:'اردو',voice:'ur',dir:'rtl',flag:'🇵🇰'},
  ar:{name:'Arabic',native:'العربية',voice:'ar',dir:'rtl',flag:'🕌'},
  es:{name:'Spanish',native:'Español',voice:'es',dir:'ltr',flag:'🇪🇸'},
  fr:{name:'French',native:'Français',voice:'fr',dir:'ltr',flag:'🇫🇷'},
  tr:{name:'Turkish',native:'Türkçe',voice:'tr',dir:'ltr',flag:'🇹🇷'}
};
window.PACKS = [
 {id:'numbers',title:'Numbers',icon:'🔢',items:[
  {id:'1',e:'1️⃣',en:'One',ur:'ایک',ar:'وَاحِد',es:'Uno',fr:'Un',tr:'Bir'},
  {id:'2',e:'2️⃣',en:'Two',ur:'دو',ar:'اِثْنَان',es:'Dos',fr:'Deux',tr:'İki'},
  {id:'3',e:'3️⃣',en:'Three',ur:'تین',ar:'ثَلَاثَة',es:'Tres',fr:'Trois',tr:'Üç'},
  {id:'4',e:'4️⃣',en:'Four',ur:'چار',ar:'أَرْبَعَة',es:'Cuatro',fr:'Quatre',tr:'Dört'},
  {id:'5',e:'5️⃣',en:'Five',ur:'پانچ',ar:'خَمْسَة',es:'Cinco',fr:'Cinq',tr:'Beş'},
  {id:'6',e:'6️⃣',en:'Six',ur:'چھ',ar:'سِتَّة',es:'Seis',fr:'Six',tr:'Altı'},
  {id:'7',e:'7️⃣',en:'Seven',ur:'سات',ar:'سَبْعَة',es:'Siete',fr:'Sept',tr:'Yedi'},
  {id:'8',e:'8️⃣',en:'Eight',ur:'آٹھ',ar:'ثَمَانِيَة',es:'Ocho',fr:'Huit',tr:'Sekiz'},
  {id:'9',e:'9️⃣',en:'Nine',ur:'نو',ar:'تِسْعَة',es:'Nueve',fr:'Neuf',tr:'Dokuz'},
  {id:'10',e:'🔟',en:'Ten',ur:'دس',ar:'عَشَرَة',es:'Diez',fr:'Dix',tr:'On'}]},
 {id:'colors',title:'Colors',icon:'🎨',items:[
  {id:'red',e:'🟥',en:'Red',ur:'لال',ar:'أَحْمَر',es:'Rojo',fr:'Rouge',tr:'Kırmızı'},
  {id:'blue',e:'🟦',en:'Blue',ur:'نیلا',ar:'أَزْرَق',es:'Azul',fr:'Bleu',tr:'Mavi'},
  {id:'green',e:'🟩',en:'Green',ur:'ہرا',ar:'أَخْضَر',es:'Verde',fr:'Vert',tr:'Yeşil'},
  {id:'yellow',e:'🟨',en:'Yellow',ur:'پیلا',ar:'أَصْفَر',es:'Amarillo',fr:'Jaune',tr:'Sarı'},
  {id:'orange',e:'🟧',en:'Orange',ur:'نارنجی',ar:'بُرْتُقَالِيّ',es:'Naranja',fr:'Orange',tr:'Turuncu'},
  {id:'purple',e:'🟪',en:'Purple',ur:'جامنی',ar:'بَنَفْسَجِيّ',es:'Morado',fr:'Violet',tr:'Mor'},
  {id:'black',e:'⬛',en:'Black',ur:'کالا',ar:'أَسْوَد',es:'Negro',fr:'Noir',tr:'Siyah'},
  {id:'white',e:'⬜',en:'White',ur:'سفید',ar:'أَبْيَض',es:'Blanco',fr:'Blanc',tr:'Beyaz'}]},
 {id:'animals',title:'Animals',icon:'🐾',items:[
  {id:'cat',e:'🐱',en:'Cat',ur:'بلی',ar:'قِطَّة',es:'Gato',fr:'Chat',tr:'Kedi'},
  {id:'dog',e:'🐶',en:'Dog',ur:'کتا',ar:'كَلْب',es:'Perro',fr:'Chien',tr:'Köpek'},
  {id:'lion',e:'🦁',en:'Lion',ur:'شیر',ar:'أَسَد',es:'León',fr:'Lion',tr:'Aslan'},
  {id:'camel',e:'🐫',en:'Camel',ur:'اونٹ',ar:'جَمَل',es:'Camello',fr:'Chameau',tr:'Deve'},
  {id:'cow',e:'🐮',en:'Cow',ur:'گائے',ar:'بَقَرَة',es:'Vaca',fr:'Vache',tr:'İnek'},
  {id:'horse',e:'🐴',en:'Horse',ur:'گھوڑا',ar:'حِصَان',es:'Caballo',fr:'Cheval',tr:'At'},
  {id:'bird',e:'🐦',en:'Bird',ur:'چڑیا',ar:'عُصْفُور',es:'Pájaro',fr:'Oiseau',tr:'Kuş'},
  {id:'fish',e:'🐟',en:'Fish',ur:'مچھلی',ar:'سَمَكَة',es:'Pez',fr:'Poisson',tr:'Balık'}]},
 {id:'fruits',title:'Fruits',icon:'🍎',items:[
  {id:'apple',e:'🍎',en:'Apple',ur:'سیب',ar:'تُفَّاحَة',es:'Manzana',fr:'Pomme',tr:'Elma'},
  {id:'banana',e:'🍌',en:'Banana',ur:'کیلا',ar:'مَوْزَة',es:'Plátano',fr:'Banane',tr:'Muz'},
  {id:'grapes',e:'🍇',en:'Grapes',ur:'انگور',ar:'عِنَب',es:'Uvas',fr:'Raisin',tr:'Üzüm'},
  {id:'mango',e:'🥭',en:'Mango',ur:'آم',ar:'مَانْجُو',es:'Mango',fr:'Mangue',tr:'Mango'},
  {id:'watermelon',e:'🍉',en:'Watermelon',ur:'تربوز',ar:'بَطِّيخ',es:'Sandía',fr:'Pastèque',tr:'Karpuz'},
  {id:'dates',e:'🌴',en:'Dates',ur:'کھجور',ar:'تَمْر',es:'Dátiles',fr:'Dattes',tr:'Hurma'},
  {id:'orange',e:'🍊',en:'Orange',ur:'مالٹا',ar:'بُرْتُقَال',es:'Naranja',fr:'Orange',tr:'Portakal'},
  {id:'strawberry',e:'🍓',en:'Strawberry',ur:'اسٹرابیری',ar:'فَرَاوْلَة',es:'Fresa',fr:'Fraise',tr:'Çilek'}]},
 {id:'family',title:'Family',icon:'👨‍👩‍👧',items:[
  {id:'mother',e:'👩',en:'Mother',ur:'امی',ar:'أُمّ',es:'Madre',fr:'Mère',tr:'Anne'},
  {id:'father',e:'👨',en:'Father',ur:'ابو',ar:'أَب',es:'Padre',fr:'Père',tr:'Baba'},
  {id:'brother',e:'👦',en:'Brother',ur:'بھائی',ar:'أَخ',es:'Hermano',fr:'Frère',tr:'Erkek kardeş'},
  {id:'sister',e:'👧',en:'Sister',ur:'بہن',ar:'أُخْت',es:'Hermana',fr:'Sœur',tr:'Kız kardeş'},
  {id:'grandfather',e:'👴',en:'Grandfather',ur:'دادا',ar:'جَدّ',es:'Abuelo',fr:'Grand-père',tr:'Dede'},
  {id:'grandmother',e:'👵',en:'Grandmother',ur:'دادی',ar:'جَدَّة',es:'Abuela',fr:'Grand-mère',tr:'Nine'},
  {id:'baby',e:'👶',en:'Baby',ur:'بچہ',ar:'رَضِيع',es:'Bebé',fr:'Bébé',tr:'Bebek'},
  {id:'family',e:'👨‍👩‍👧‍👦',en:'Family',ur:'خاندان',ar:'عَائِلَة',es:'Familia',fr:'Famille',tr:'Aile'}]},
 {id:'greetings',title:'Greetings',icon:'👋',items:[
  {id:'salam',e:'👋',en:'Peace be upon you',ur:'السلام علیکم',ar:'السَّلَامُ عَلَيْكُمْ',es:'Hola',fr:'Bonjour',tr:'Selam'},
  {id:'thanks',e:'🙏',en:'Thank you',ur:'شکریہ',ar:'شُكْرًا',es:'Gracias',fr:'Merci',tr:'Teşekkürler'},
  {id:'morning',e:'🌅',en:'Good morning',ur:'صبح بخیر',ar:'صَبَاحُ الْخَيْر',es:'Buenos días',fr:'Bonjour',tr:'Günaydın'},
  {id:'night',e:'🌙',en:'Good night',ur:'شب بخیر',ar:'تُصْبِحُ عَلَى خَيْر',es:'Buenas noches',fr:'Bonne nuit',tr:'İyi geceler'},
  {id:'yes',e:'👍',en:'Yes',ur:'جی ہاں',ar:'نَعَم',es:'Sí',fr:'Oui',tr:'Evet'},
  {id:'no',e:'✋',en:'No',ur:'نہیں',ar:'لَا',es:'No',fr:'Non',tr:'Hayır'},
  {id:'please',e:'😊',en:'Please',ur:'مہربانی',ar:'مِنْ فَضْلِك',es:'Por favor',fr:'S’il te plaît',tr:'Lütfen'},
  {id:'bye',e:'🤗',en:'Goodbye',ur:'خدا حافظ',ar:'مَعَ السَّلَامَة',es:'Adiós',fr:'Au revoir',tr:'Hoşça kal'}]},
 {id:'duas',title:'Daily Duas',icon:'🤲',dua:true,items:[
  {id:'bismillah',e:'🍽️',when:'Before eating',ar:'بِسْمِ اللَّهِ',en:'In the name of Allah',ur:'اللہ کے نام سے'},
  {id:'alhamdulillah',e:'😋',when:'After eating / sneezing',ar:'الْحَمْدُ لِلَّهِ',en:'All praise is for Allah',ur:'سب تعریفیں اللہ کے لیے ہیں'},
  {id:'sleep',e:'🛏️',when:'Before sleeping',ar:'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',en:'In Your name, O Allah, I die and I live',ur:'اے اللہ! تیرے نام کے ساتھ میں مرتا اور جیتا ہوں'},
  {id:'wake',e:'🌞',when:'On waking up',ar:'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',en:'Praise be to Allah who gave us life after death, and to Him is the return',ur:'تمام تعریفیں اللہ کے لیے جس نے ہمیں مارنے کے بعد زندہ کیا اور اسی کی طرف لوٹنا ہے'},
  {id:'home',e:'🚪',when:'Leaving home',ar:'بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ',en:'In the name of Allah, I trust in Allah',ur:'اللہ کے نام سے، میں نے اللہ پر بھروسہ کیا'},
  {id:'ilm',e:'📚',when:'Before studying',ar:'رَبِّ زِدْنِي عِلْمًا',en:'My Lord, increase me in knowledge',ur:'اے میرے رب! میرے علم میں اضافہ فرما'},
  {id:'jazak',e:'🎁',when:'Saying thank you',ar:'جَزَاكَ اللَّهُ خَيْرًا',en:'May Allah reward you with good',ur:'اللہ آپ کو بہترین بدلہ دے'},
  {id:'salam',e:'🤝',when:'Meeting someone',ar:'السَّلَامُ عَلَيْكُمْ',en:'Peace be upon you',ur:'آپ پر سلامتی ہو'}]}
];
window.LETTERS = {
  en:'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
  ar:'ا ب ت ث ج ح خ د ذ ر ز س ش ص ض ط ظ ع غ ف ق ك ل م ن ه و ي'.split(' '),
  ur:'ا ب پ ت ٹ ث ج چ ح خ د ڈ ذ ر ڑ ز ژ س ش ص ض ط ظ ع غ ف ق ک گ ل م ن و ہ ھ ء ی ے'.split(' ')
};
window.UI = {
  en:{hello:'Hello',learn:'Learn',trace:'Trace',badges:'Badges',parents:'Parents'},
  ur:{hello:'السلام علیکم',learn:'سیکھیں',trace:'لکھیں',badges:'انعام',parents:'والدین'},
  ar:{hello:'السلام عليكم',learn:'تَعَلَّم',trace:'اُكْتُب',badges:'أَوْسِمَة',parents:'الوالدان'}
};
/* Translator languages: code (MyMemory), name, flag, dir */
window.TLANGS=[['en','English','🇬🇧'],['ur','Urdu','🇵🇰','rtl'],['ar','Arabic','🇸🇦','rtl'],['es','Spanish','🇪🇸'],['fr','French','🇫🇷'],['de','German','🇩🇪'],['it','Italian','🇮🇹'],['pt','Portuguese','🇵🇹'],['ru','Russian','🇷🇺'],['zh-CN','Chinese','🇨🇳'],['ja','Japanese','🇯🇵'],['ko','Korean','🇰🇷'],['hi','Hindi','🇮🇳'],['bn','Bengali','🇧🇩'],['tr','Turkish','🇹🇷'],['id','Indonesian','🇮🇩'],['ms','Malay','🇲🇾'],['fa','Persian','🇮🇷','rtl'],['pa','Punjabi','🇵🇰'],['sw','Swahili','🇰🇪'],['nl','Dutch','🇳🇱'],['pl','Polish','🇵🇱'],['uk','Ukrainian','🇺🇦'],['el','Greek','🇬🇷'],['he','Hebrew','🇮🇱','rtl'],['ta','Tamil','🇮🇳'],['te','Telugu','🇮🇳'],['vi','Vietnamese','🇻🇳'],['th','Thai','🇹🇭'],['fil','Filipino','🇵🇭']];
/* Kid-safety block list (matched on whole words for Latin script, as substrings for Arabic script). Extend as needed. */
window.BLOCKED={
 latin:['fuck','fucking','fucker','motherfucker','shit','bullshit','bitch','bastard','asshole','arsehole','dick','dickhead','cock','pussy','cunt','slut','whore','hoe','porn','porno','sex','sexy','nude','naked','boobs','penis','vagina','nigger','nigga','faggot','fag','retard','wanker','twat','damn','crap','piss','bollocks','kill yourself','kys',
  'chutiya','chutia','bhenchod','behenchod','benchod','madarchod','maderchod','harami','haramzada','haramzadi','kamina','kameena','kamini','kameeni','gandu','gaandu','randi','lund','phudi','kanjar','kanjri','khotey','ullu ka patha','bakwas karo','teri maa','teri behen',
  'sharmouta','sharmuta','ibn el kalb','kos omak','kus ummak','ayre','zebi','manyak','gahba',
  'puta','mierda','joder','cabron','merde','putain','salope','scheisse','arschloch','orospu','siktir','amk','cazzo','vaffanculo','blyat','suka'],
 script:['حرامی','حرامزادہ','حرام زادہ','کمینہ','کمینی','چوتیا','بہن چود','بہنچود','ماں چود','مادرچود','گانڈو','رنڈی','پھدی','کنجر','کنجری','بےغیرت',
  'شرموطة','شرموط','عاهرة','منيوك','كس امك','كس أمك','ابن الكلب','ابن الحرام','قحبة','زبي','يلعن','خول','لعنة الله عليك']
};

/* Online voice provider for text with no recorded file and no device voice. Swap this one object to change provider.
   Default: Google Translate's public TTS endpoint (unofficial, no key, may change or rate-limit; not covered by an official API licence). */
window.ONLINE_TTS={name:'Google Translate TTS (unofficial)',max:180,
  lang:{'zh-CN':'zh-CN',fil:'fil',he:'iw'},
  url:(text,lang)=>'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl='+encodeURIComponent((window.ONLINE_TTS.lang[lang])||lang)+'&q='+encodeURIComponent(text)};
