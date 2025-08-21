const axios = require('axios');
const fs = require('fs');

// Dönüştürme fonksiyonu: https → http
function donusturIcerik(icerik) {
  if (typeof icerik !== 'string') throw new Error("İçerik string değil");
  return icerik.replace(/https:\/\/ottcdn\.kablowebtv\.net/g, 'http://ottcdn.kablowebtv.net');
}

// Dosya indirme ve kaydetme işlemi
async function indirVeKaydet(url, hedefDosya) {
  try {
    console.log(`📥 URL'den veri alınıyor: ${url}`);
    const response = await axios.get(url);

    if (!response.data || typeof response.data !== 'string') {
      throw new Error("Boş veya geçersiz içerik alındı");
    }

    const donusturulmus = donusturIcerik(response.data);
    fs.writeFileSync(hedefDosya, donusturulmus, 'utf8');
    console.log(`✅ Dosya oluşturuldu: ${hedefDosya}`);
  } catch (error) {
    console.error(`❌ Hata oluştu: ${error.message}`);
    process.exit(1); // GitHub Actions'da başarısız işaretlemek için
  }
}

// Kaynaklar
const kaynaklar = [
  {
    url: 'https://kablo-m3u.atakan-19833.workers.dev/?file=mehmet_guncel.m3u',
    hedef: 'mehmet_guncel_modified.m3u'
  },
  {
    url: 'https://kablo-m3u.atakan-19833.workers.dev/?file=vodden.m3u',
    hedef: 'vodden_modified.m3u'
  }
];

// Hepsini sırayla indir
(async () => {
  for (const kaynak of kaynaklar) {
    await indirVeKaydet(kaynak.url, kaynak.hedef);
  }
})();
