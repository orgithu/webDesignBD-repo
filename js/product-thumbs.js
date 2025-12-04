document.addEventListener('DOMContentLoaded', function () {
  const productSections = document.querySelectorAll('.product-images');
  productSections.forEach(section => {
    const mainImg = section.querySelector('.main-image img');
    const thumbs = section.querySelectorAll('.thumbnail-images img');
    if (!mainImg || thumbs.length === 0) return;

    thumbs.forEach((t, idx) => {
      t.addEventListener('click', function () {
        thumbs.forEach(x => x.classList.remove('active'));
        thumbs.forEach(x => x.setAttribute('aria-pressed', 'false'));
        this.classList.add('active');
        this.setAttribute('aria-pressed', 'true');
        const newSrc = this.dataset.large || this.src;
        const newAlt = this.alt || mainImg.alt;
        mainImg.style.opacity = 0;
        setTimeout(() => {
          mainImg.src = newSrc;
          mainImg.alt = newAlt;
          mainImg.style.opacity = 1;
        }, 120);
      });

      t.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.click();
        }
      });

      if (!t.hasAttribute('tabindex')) t.setAttribute('tabindex', '0');
      t.setAttribute('role', 'button');
      t.setAttribute('aria-pressed', 'false');
    });

    const first = thumbs[0];
    if (first) {
      first.classList.add('active');
      first.setAttribute('aria-pressed', 'true');
    }
  });
});
