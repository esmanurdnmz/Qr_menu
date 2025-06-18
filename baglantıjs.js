const sheetCsvUrl = 'https://docs.google.com/spreadsheets/d/10HDpqjKDTLIaliEUEoxpOEb56L-39_8QaDjCHUfpe58/edit?usp=sharing'; 


async function fetchMenuData() {
  try {
    const response = await fetch(sheetCsvUrl);
    const data = await response.text();
    const rows = data.split('\n').slice(1); // Başlık satırını atla

    const menuContainer = document.querySelector('.menu');
    menuContainer.innerHTML = ''; // Önce temizle

    rows.forEach(row => {
      const cols = row.split(',');

      if(cols.length < 3) return; // Eksik veri varsa atla

      const [kategori, isim, fiyat] = cols;

      // Kart oluştur
      const card = document.createElement('div');
      card.className = 'card';

      card.innerHTML = `
        <h2>${isim.trim()} <span class="price">${fiyat.trim()}₺</span></h2>
      `;

      menuContainer.appendChild(card);
    });
  } catch (error) {
    console.error('Menü verisi çekilirken hata:', error);
  }
}

fetchMenuData();
