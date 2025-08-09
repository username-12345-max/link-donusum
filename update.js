const axios = require('axios');
const fs = require('fs');

const sourceUrl = 'https://raw.githubusercontent.com/atakan1983/tvepic/main/mehmet_guncel.m3u';

axios.get(sourceUrl).then(response => {
  let content = response.data;

  // HTTPS → HTTP dönüşümü
  content = content.replace(/https:\/\/ottcdn\.kablowebtv\.net/g, 'http://ottcdn.kablowebtv.net');

  // Dosyayı kaydet
  fs.writeFileSync('mehmet_guncel_modified.m3u', content);
  console.log('Dosya başarıyla dönüştürüldü!');
}).catch(error => {
  console.error('İndirme hatası:', error);
});const axios = require('axios');
const fs = require('fs');

const sourceUrl = 'https://raw.githubusercontent.com/atakan1983/tvepic/main/mehmet_guncel.m3u';

axios.get(sourceUrl).then(response => {
  let content = response.data;

  // Test: İçeriğin ilk 500 karakterini yazdır
  console.log('İçerik örneği:', content.slice(0, 500));

  // HTTPS → HTTP dönüşümü
  content = content.replace(/https:\/\/ottcdn\.kablowebtv\.net/g, 'http://ottcdn.kablowebtv.net');

  // Dosyayı kaydet
  fs.writeFileSync('mehmet_guncel_modified.m3u', content);
  console.log('Dosya başarıyla dönüştürüldü!');
}).catch(error => {
  console.error('İndirme hatası:', error);
});

