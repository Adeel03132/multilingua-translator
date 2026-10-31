/* Multilingo content. Each item: id, e (emoji picture), en, ur, ar. Optional: es, fr, tr.
   Recorded audio: put files at audio/<lang>/<pack>-<id>.mp3 and list the keys in RECORDED below
   (e.g. "ar/duas-bismillah"). Listed files play instead of device speech. */
window.RECORDED = [];
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
