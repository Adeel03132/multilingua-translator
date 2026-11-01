# Recordings needed (Sunnah duas)
The app will NOT read these with a computer voice. Until a file exists, the lesson shows
"🎙️ Recording coming soon – please read with a grown-up/teacher".

How to add one:
1. Ask a qari or teacher to record the exact Arabic text below, clearly, with correct tajweed. Record one take per dua, without the Urdu/English meaning.
2. Export as MP3, mono, 44.1 kHz, 64 kbps. Trim leading and trailing silence to about 0.2 s.
3. Save it with the exact filename below, inside the `audio/ar/` folder.
4. Add the key (e.g. `"ar/duas-sleep"`) to `window.RECORDED` in `data.js`, then bump the `V` and `A` cache names in `sw.js` (e.g. `multilingua-v7` and `multilingua-audio-3`).
5. Add the qari's name and written permission to `audio/LICENSES.md`.

| File | When | Arabic text to record | Source |
|---|---|---|---|
| `audio/ar/duas-sleep.mp3` | Before sleeping | بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا | Sahih al-Bukhari 6324 |
| `audio/ar/duas-wake.mp3` | On waking up | الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ | Sahih al-Bukhari 6312 |
| `audio/ar/duas-home.mp3` | Leaving home | بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ | Abu Dawud 5095, Tirmidhi 3426 |
| `audio/ar/duas-jazak.mp3` | Saying thank you | جَزَاكَ اللَّهُ خَيْرًا | Tirmidhi 2035 |
| `audio/ar/duas-salam.mp3` | Meeting someone | السَّلَامُ عَلَيْكُمْ | Sunnah greeting |

Optional: qari recordings of the 28 Arabic letter names, saved as `audio/ar/letter-0.mp3` … `letter-27.mp3` (alif … yaa, in the order of `LETTERS.ar`), would replace the current computer voice.
