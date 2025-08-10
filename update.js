const axios = require('axios');
const fs = require('fs');

const sourceUrl = 'https://raw.githubusercontent.com/atakan1983/tvepic/main/mehmet_guncel.m3u';

axios.get(sourceUrl, { timeout: 10000 }).then(response => {
  let content = response.data;
  content = content.replace(/https:\/\/ottcdn\.kablowebtv\.net/g, 'http://ottcdn.kablowebtv.net');
  fs.writeFileSync('mehmet_guncel_modified.m3u', content);
  console.log('✅ Dosya başarıyla dönüştürüldü!');
}).catch(error => {
  console.error('❌ İndirme hatası:', error);
});
