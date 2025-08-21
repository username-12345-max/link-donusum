const fs = require('fs');
const https = require('https');

const kaynaklar = [
  {
    url: 'https://kablo-m3u.atakan-19833.workers.dev/?file=mehmet_guncel.m3u'
    hedef: 'mehmet_guncel_modified.m3u'
  },
  {
    url: 'https://raw.githubusercontent.com/atakan1983/vodden/main/vodden.m3u',
    hedef: 'vodden_modified.m3u'
  }
];

function donusturIcerik(icerik) {
  return icerik
    .split('\n')
    .map(line => {
      if (line.includes('https://ottcdn.kablowebtv.net')) {
        try {
          const url = new URL(line.trim());
          const wmsAuth = url.searchParams.get('wmsAuthSign');
          url.protocol = 'http:';
          const yeniURL = wmsAuth
            ? `${url.origin}${url.pathname}?wmsAuthSign=${wmsAuth}`
            : `${url.origin}${url.pathname}`;
          return yeniURL;
        } catch {
          return line;
        }
      }
      return line;
    })
    .join('\n');
}

kaynaklar.forEach(({ url, hedef }) => {
  https.get(url, res => {
    let veri = '';
    res.on('data', chunk => veri += chunk);
    res.on('end', () => {
      const donusturulmus = donusturIcerik(veri);
      fs.writeFileSync(hedef, donusturulmus);
      console.log(`${hedef} başarıyla oluşturuldu.`);
    });
  }).on('error', err => {
    console.error(`Hata oluştu: ${err.message}`);
  });
});
