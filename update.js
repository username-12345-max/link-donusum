const axios = require('axios');
const fs = require('fs');

// İçeriği dönüştür: https → http, EPG başlığı isteğe bağlı
function donusturIcerik(icerik, epgGerekli = false) {
  if (typeof icerik !== 'string') throw new Error("İçerik string değil");

  let sonuc = icerik.replace(/https:\/\/ottcdn\.kablowebtv\.net/g, 'http://ottcdn.kablowebtv.net');

  if (epgGerekli) {
    sonuc = sonuc.replace(/^#EXTM3U.*$/m, '#EXTM3U x-tvg-url="https://kablo-m3u.atakan-19833.workers.dev/?file=kabloepg.xml"');
  }

  return sonuc;
}

// Dosya indir ve kaydet
async function indirVeKaydet(url, hedefDosya, epgGerekli = false) {
  try {
    console.log(`📥 Veri alınıyor: ${url}`);
    const response = await axios.get(url);
    if (!response.data || typeof response.data !== 'string') {
      throw new Error("Boş veya geçersiz içerik alındı");
    }
    const donusturulmus = donusturIcerik(response.data, epgGerekli);
    fs.writeFileSync(hedefDosya, donusturulmus, 'utf8');
    console.log(`✅ Dosya oluşturuldu: ${hedefDosya}`);
  } catch (error) {
    console.error(`❌ Hata: ${error.message}`);
    process.exit(1);
  }
}

// Mehmet Güncel (EPG gerekli)
indirVeKaydet(
  'https://kablo-m3u.atakan-19833.workers.dev/?file=mehmet_guncel.m3u',
  'mehmet_guncel_modified.m3u',
  true
);

// Vodden (EPG gereksiz)
indirVeKaydet(
  'https://kablo-vod.atakan-19833.workers.dev/?file=vodden.m3u',
  'vodden_modified.m3u',
  false
);
