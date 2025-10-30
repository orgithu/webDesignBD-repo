function getQueryParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name) || '';
}

const query = getQueryParam('all').trim().toLowerCase();
const resultsEl = document.getElementById('results');

const products = [
    { id: 'product1', title: 'Intel - Core i5 14400F, Asus - Dual RTX 5060 8GB OC Edition', url: '/product/product1-detail.html', price: '2,920,000 ₮', image: 'media/product1.png' },
    { id: 'product2', title: 'AMD Ryzen 7 7800X3D, MSI B650M PROJECT ZERO, Zotac RTX 4070 SUPER', url: '/product/product2-detail.html', price: '6,750,000 ₮', image: 'media/product2.png' },
    { id: 'product3', title: 'Intel - Core i5 12400F, Asus - Dual RTX 5060 8GB OC Edition', url: '/product/product3-detail.html', price: '3,210,000 ₮', image: 'media/product3.png' },
    { id: 'product4', title: 'Охидод зориулсан шинэ загварийн laptop-Barbie edition', url: '/product/product4-detail.html', price: '2,830,000 ₮', image: 'media/hello-kitty laptop.jpg' },
    { id: 'product5', title: 'Retro-computer', url: '/product/product5-detail.html', price: '2\'800\'000 ₮', image: 'media/Pink-retro-computer.jpg' },
    { id: 'product6', title: 'Tablet keyboard', url: '/product/product6-detail.html', price: '380\'000 ₮', image: 'media/Tablet-keyboard.jpg' },
    { id: 'product7', title: 'Frutiger Aero хэв маягийн утасгүй mouse.', url: '/product/product7-detail.html', price: '150\'000 ₮', image: 'media/mouse.jpg' },
    { id: 'product8', title: 'Type-c цэнэглэгч', url: '/product/product8-detail.html', price: '38\'000 ₮', image: 'media/charger.jpg' },
    { id: 'product9', title: 'Razer Kraken X чихэвч', url: '/product/product9-detail.html', price: '680\'000 ₮', image: 'media/razer-kraken-x.jpg' }
];

if (!query) {
    resultsEl.innerHTML = '<p>Хайх үг оруулна уу (жишээ: intel, ryzen, laptop).</p>';
} else {
    const matches = products.filter(p => p.title.toLowerCase().includes(query));
    if (matches.length === 0) {
        resultsEl.innerHTML = `<p>"${query}"-д тохирох бүтээгдэхүүн олдсонгүй.</p>`;
    } else {
        resultsEl.innerHTML = `<p>${matches.length} бүтээгдэхүүн олдлоо:</p><div class="search-results-grid">` +
            matches.map(m => `
                <div class="search-result product-card">
                    <a href="${m.url}">
                        <img src="${m.image}" alt="${m.title}" width="50">
                        <div>
                            <h3>${m.title}</h3>
                            <p>Үнэ: ${m.price}</p>
                        </div>
                    </a>
                </div>
            `).join('') + '</div>';
    }
}