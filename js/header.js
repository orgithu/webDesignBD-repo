document.addEventListener('DOMContentLoaded', function () {
  var header = document.querySelector('header');
  var hamburger = document.querySelector('.hamburger');
  var headerBottom = document.querySelector('.header-bottom');

  if (!header || !hamburger || !headerBottom) return;

  // create backdrop element (shared) and append to body
  var backdrop = document.createElement('div');
  backdrop.className = 'menu-backdrop';
  document.body.appendChild(backdrop);

  function openMenu() {
    header.classList.add('header--open');
    hamburger.setAttribute('aria-expanded', 'true');
    backdrop.classList.add('visible');
    // make sure focus stays sensible
    hamburger.focus();
  }

  function closeMenu() {
    header.classList.remove('header--open');
    hamburger.setAttribute('aria-expanded', 'false');
    backdrop.classList.remove('visible');
  }

  // toggle on click
  hamburger.addEventListener('click', function (ev) {
    var isOpen = header.classList.contains('header--open');
    if (isOpen) closeMenu(); else openMenu();
  });

  // clicking the backdrop closes menu
  backdrop.addEventListener('click', function () {
    closeMenu();
  });

  // close when a nav link is clicked (mobile)
  headerBottom.addEventListener('click', function (ev) {
    var target = ev.target;
    if (target && target.tagName === 'A') {
      closeMenu();
    }
  });

  // close on escape key
  document.addEventListener('keydown', function (ev) {
    if (ev.key === 'Escape') closeMenu();
  });

  // close if window is resized above mobile breakpoint
  var mq = window.matchMedia('(min-width: 769px)');
  mq.addEventListener && mq.addEventListener('change', function (e) {
    if (e.matches) closeMenu();
  });

  /* Build a compact mobile icon bar from header-nav links when on small screens.
     This avoids changing HTML across many pages. The bar is recreated on
     resize to keep DOM in sync. */
  var mobileBar = null;

  function createMobileBar() {
    // don't recreate if already exists (check DOM too)
    var existing = document.querySelector('.mobile-icon-bar');
    if (mobileBar || existing) {
      if (existing && !mobileBar) mobileBar = existing;
      return;
    }
    var nav = document.querySelector('.header-nav');
    if (!nav) return;

    var links = Array.from(nav.querySelectorAll('a')).slice(0, 5); // limit
    if (links.length === 0) return;

    mobileBar = document.createElement('nav');
    mobileBar.className = 'mobile-icon-bar';

    links.forEach(function (a) {
      var item = document.createElement('a');
      item.href = a.getAttribute('href') || '#';
      item.className = 'mobile-icon-item';
      item.setAttribute('role', 'link');

      var text = a.textContent.trim();

      var icon = document.createElement('span');
      icon.className = 'mobile-icon-svg';
      icon.setAttribute('aria-hidden', 'true');
      // simple SVGs for common labels (fallback is a dot)
      function svgForLabel(t) {
        t = t.toLowerCase();
        if (t.indexOf('бүт') !== -1 || t.indexOf('product') !== -1) {
          return '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>';
        }
        if (t.indexOf('ангил') !== -1 || t.indexOf('category') !== -1) {
          return '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h18"></path><path d="M3 6h18"></path><path d="M3 18h18"></path></svg>';
        }
        if (t.indexOf('урам') !== -1 || t.indexOf('offer') !== -1) {
          return '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10v7a2 2 0 0 1-2 2h-7"></path><path d="M3 14l7-7 4 4 7-7"></path></svg>';
        }
        if (t.indexOf('build') !== -1 || t.indexOf('pc') !== -1) {
          return '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3l3 3"></path><path d="M9 17l-3-3"></path><path d="M21 15a2 2 0 0 1-2 2h-7l-6 2 2-6v-7a2 2 0 0 1 2-2h7"></path></svg>';
        }
        if (t.indexOf('home') !== -1 || t.indexOf('нь') !== -1) {
          return '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l9-7 9 7"></path><path d="M5 11v8a2 2 0 0 0 2 2h3v-6h4v6h3a2 2 0 0 0 2-2v-8"></path></svg>';
        }
        // default simple circle
        return '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><circle cx="12" cy="12" r="3"></circle></svg>';
      }

      icon.innerHTML = svgForLabel(text);

      var label = document.createElement('span');
      label.className = 'mobile-icon-label';
      label.textContent = text;

      item.appendChild(icon);
      item.appendChild(label);
      mobileBar.appendChild(item);
    });

    // place mobile bar immediately after the header element for consistency
    if (header && header.parentNode) header.parentNode.insertBefore(mobileBar, header.nextSibling);

    // clicking a mobile bar item should close the dropdown/backdrop if open
    mobileBar.addEventListener('click', function (ev) {
      var target = ev.target.closest('a');
      if (!target) return;
      closeMenu();
    });
  }

  function removeMobileBar() {
    if (!mobileBar) return;
    mobileBar.parentNode && mobileBar.parentNode.removeChild(mobileBar);
    mobileBar = null;
  }

  function syncMobileBar() {
    if (window.innerWidth <= 768) createMobileBar(); else removeMobileBar();
  }

  // initial sync and on resize
  syncMobileBar();
  window.addEventListener('resize', function () { syncMobileBar(); });
});
