const axios = require('axios');
const fs = require('fs');
const cron = require('node-cron');

const sourceUrl = 'https://raw.githubusercontent.com/atakan1983/tvepic/main/mehmet_guncel.m3u';

function guncelle() {
  axios.get(sourceUrl).then(response => {
    let content = response.data;
    content = content.replace(/https:\/\/ottcdn\.kablowebtv\.net/g, 'http://ottcdn.kablowebtv.net');
    fs.writeFileSync('mehmet_guncel_modified.m3u', content);
    console.log('✅ Dosya başarıyla dönüştürüldü!');
  }).catch(error => {
    console.error('❌ İndirme hatası:', error);
  });
}

cron.schedule('30 3 * * *', () => {
  console.log('⏰ Otomatik güncelleme başlatıldı...');
  guncelle();
});

guncelle();
