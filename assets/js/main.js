(function() {
  "use strict";

  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    const header = document.querySelector('#header');
    if (header) header.classList.toggle('header-show');
    if (headerToggleBtn) {
      headerToggleBtn.classList.toggle('bi-list');
      headerToggleBtn.classList.toggle('bi-x');
    }
  }

  if (headerToggleBtn) {
    headerToggleBtn.addEventListener('click', headerToggle);
  }

  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) headerToggle();
    });
  });

  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  const preloader = document.querySelector('#preloader');
  if (preloader) preloader.remove();

  const scrollTop = document.querySelector('.scroll-top');
  function toggleScrollTop() {
    if (!scrollTop) return;
    window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
  }
  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  function aosInit() {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 600,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    }
  }
  window.addEventListener('load', aosInit);

  const selectTyped = document.querySelector('.typed');
  if (selectTyped && typeof Typed !== 'undefined') {
    let typed_strings = selectTyped.getAttribute('data-typed-items').split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  if (typeof PureCounter !== 'undefined') {
    new PureCounter();
  }

  document.querySelectorAll('.skills-animation').forEach((item) => {
    const fillBars = () => {
      item.querySelectorAll('.progress .progress-bar').forEach(el => {
        el.style.width = el.getAttribute('aria-valuenow') + '%';
      });
    };
    if (typeof Waypoint !== 'undefined') {
      new Waypoint({
        element: item,
        offset: '80%',
        handler: function() { fillBars(); }
      });
    } else {
      fillBars();
    }
  });

  if (typeof GLightbox !== 'undefined') {
    GLightbox({ selector: '.glightbox' });
  }

  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';
    let initIsotope;

    const container = isotopeItem.querySelector('.isotope-container');
    if (!container) return;

    if (typeof imagesLoaded !== 'undefined' && typeof Isotope !== 'undefined') {
      imagesLoaded(container, function() {
        initIsotope = new Isotope(container, {
          itemSelector: '.isotope-item',
          layoutMode: layout,
          filter: filter,
          sortBy: sort
        });
      });
    }

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        const active = isotopeItem.querySelector('.isotope-filters .filter-active');
        if (active) active.classList.remove('filter-active');
        this.classList.add('filter-active');
        if (initIsotope) {
          initIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
        }
      });
    });
  });

  function initSwiper() {
    if (typeof Swiper === 'undefined') return;
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      const configEl = swiperElement.querySelector(".swiper-config");
      if (!configEl) return;
      const config = JSON.parse(configEl.innerHTML.trim());
      new Swiper(swiperElement, config);
    });
  }
  window.addEventListener("load", initSwiper);

})();