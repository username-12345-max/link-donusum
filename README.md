# 📡 link-donusum

Bu proje, [atakan1983/tvepic](https://github.com/atakan1983/tvepic) deposundaki `mehmet_guncel.m3u` dosyasını alır, içeriğindeki bağlantıları dönüştürür ve güncellenmiş halini otomatik olarak bu depoya ekler.

## 🔄 Dönüşüm Kuralları

- Tüm `https://ottcdn.kablowebtv.net` bağlantıları → `http://ottcdn.kablowebtv.net` olarak değiştirilir.
- `wmsAuthSign=` parametresi olduğu gibi korunur.
- Güncellenmiş dosya: `mehmet_guncel_modified.m3u`

## ⏱️ Otomatik Güncelleme

GitHub Actions ile her gün saat **03:30 UTC**'de (Türkiye saatiyle 06:30) otomatik olarak:

1. Güncel dosya indirilir.
2. Bağlantılar dönüştürülür.
3. Yeni dosya depoya eklenir.

## 📁 Dosyalar

- `mehmet_guncel_modified.m3u`: Dönüştürülmüş M3U dosyası
- `update.js`: Dönüştürme scripti
- `.github/workflows/update.yml`: Otomatik güncelleme zamanlayıcısı

## 📌 Kaynak

- Orijinal dosya: [mehmet_guncel.m3u](https://raw.githubusercontent.com/atakan1983/tvepic/main/mehmet_guncel.m3u)
