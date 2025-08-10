const axios = require('axios');
const fs = require('fs');
const cron = require('node-cron');

const sourceUrl = 'https://raw.githubusercontent.com/atakan1983/tvepic/main/mehmet_guncel.m3u';

function updatePlaylist() {
  axios.get(sourceUrl).then(response => {
    let content = response.data;

    // HTTPS → HTTP dönüşümü
    content = content.replace(/https:\/\/ottcdn\.kablowebtv\.net/g, 'http://ottcdn.kablowebtv.net');

    // Dosyayı kaydet
    fs.writeFileSync('mehmet_guncel_modified.m3u', content);
    console.log(`[${new Date().toLocaleString()}] Dosya başarıyla dönüştürüldü!`);
  }).catch(error => {
    console.error(`[${new Date().toLocaleString()}] İndirme hatası:`, error.message);
  });
}

// Her gün saat 06:00'da çalıştır
cron.schedule('0 6 * * *', () => {
  console.log('Otomatik güncelleme başlatılıyor...');
  updatePlaylist();
});

// Manuel çalıştırma için
updatePlaylist();
