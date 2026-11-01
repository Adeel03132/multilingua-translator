# Built-in audio credits
Generated with these text-to-speech voices (mono MP3, 32 kbps):
- English (en): Piper `en_GB-alba-medium`. Trained on the Edinburgh "alba" dataset, licensed CC BY 4.0.
- Spanish (es): Piper `es_ES-davefx-medium`. Dataset licensed CC0.
- French (fr): Piper `fr_FR-siwis-medium`. SIWIS dataset licensed CC BY 4.0.
- Urdu (ur): Piper `ur_PK-aegis_female-medium`. Model card says MIT.
- Arabic (ar) words and letter names, and Turkish (tr): Microsoft Edge neural voices via edge-tts (`ar-SA-ZariyahNeural`, `tr-TR-EmelNeural`). Redistribution terms are unclear. Replace these with openly licensed recordings before any commercial release.
Piper engine: https://github.com/rhasspy/piper (MIT). Voices: https://huggingface.co/rhasspy/piper-voices

## Qur'anic dua recitation (NOT computer generated)
Files: `audio/ar/duas-bismillah.mp3` (1:1, words 1–2), `duas-alhamdulillah.mp3` (1:2, words 1–2), `duas-ilm.mp3` (20:114, last 3 words),
`duas-sharh.mp3` (20:25 from "رَبِّ" + 20:26), `duas-rabbana.mp3` (2:201 from "رَبَّنَا" to the end).
- Reciter: Sheikh Mishary Rashid Alafasy, Murattal, riwayah Hafs ʿan ʿAsim.
- Source: QuranicAudio.com / Quran.com CDN, `https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/<surah>.mp3`.
- Trimmed with ffmpeg at Quran.com word-level timing segments (`api.qurancdn.com/api/qdc/audio/reciters/7/audio_files?segments=true`). Only a 30 ms fade-in, a 120 ms fade-out and 0.2 s of silence were added. Nothing was re-ordered or altered. Boundaries were checked by speech recognition.
- Terms: QuranicAudio.com says its MP3s are free for personal use and must NOT be used commercially, because publishers may restrict them. Quran.com's terms allow only non-commercial, personal use without written consent. Copyright stays with the reciter or publisher.
  => The app must stay free (no ads, no paid tiers) while it ships these clips. Before any commercial release, get written permission from the reciter or publisher (or QuranicAudio/Quran Foundation), or replace the clips with your own qari recording.
- Qur'an text shown in the app: Tanzil quran-simple (tanzil.net, CC BY 3.0, text unchanged). Quran.com word timings are used only offline, to choose the cut points.

## Sunnah duas
These have NO audio and no computer voice. See `RECORDINGS-NEEDED.md`.

## Arabic letter names
These are still computer TTS (edge-tts), because no openly licensed qari letter recordings were available as files.
Option: Qamar Apps' "Al Qaida Al Nooraniya" (recited by Mufti Mohammed Ghiyas Mohiuddin) is published under CC BY-SA 4.0. Its audio is only inside their app, so you would have to ask Qamar Apps (support@qamarapps.com) for the files. CC BY-SA requires attribution and sharing under the same licence.
