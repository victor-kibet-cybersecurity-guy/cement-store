// Homepage interaction helpers
(function() {
  function initSlider() {
    const slider = document.getElementById('slider');
    const wrapper = document.getElementById('sliderWrapper');
    const dots = document.querySelectorAll('.slider-dot');
    const prev = document.getElementById('prevSlide');
    const next = document.getElementById('nextSlide');
    const lazySlides = document.querySelectorAll('.slide[data-bg]');

    if (!slider || !wrapper || !dots.length) {
      return;
    }

    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    if (isMobile) {
      slider.classList.add('mobile-static');
      return;
    }

    function loadDeferredSlideImages() {
      lazySlides.forEach((slide) => {
        if (slide.dataset.bgLoaded === 'true') {
          return;
        }

        slide.style.backgroundImage = 'linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.28)), url("' + slide.dataset.bg + '")';
        slide.dataset.bgLoaded = 'true';
      });
    }

    window.setTimeout(loadDeferredSlideImages, 700);

    let currentIndex = 0;
    const totalSlides = document.querySelectorAll('.slide').length;
    let autoSlideId = null;

    function updateSlider(index) {
      if (index < 0) index = totalSlides - 1;
      if (index >= totalSlides) index = 0;
      wrapper.style.transform = 'translateX(-' + (index * 100) + '%)';
      dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
      currentIndex = index;
    }

    function startAutoSlide() {
      if (autoSlideId) {
        return;
      }

      autoSlideId = window.setInterval(() => updateSlider(currentIndex + 1), 5000);
    }

    function stopAutoSlide() {
      if (!autoSlideId) {
        return;
      }

      window.clearInterval(autoSlideId);
      autoSlideId = null;
    }

    dots.forEach((dot, i) => dot.addEventListener('click', () => updateSlider(i)));
    if (prev) prev.addEventListener('click', () => updateSlider(currentIndex - 1));
    if (next) next.addEventListener('click', () => updateSlider(currentIndex + 1));

    wrapper.addEventListener('mouseenter', stopAutoSlide);
    wrapper.addEventListener('mouseleave', startAutoSlide);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stopAutoSlide();
      } else {
        startAutoSlide();
      }
    });

    startAutoSlide();
  }

  function initMenu() {
    const toggle = document.getElementById('menuToggle');
    const nav = document.getElementById('navLinks');
    if (!toggle || !nav) {
      return;
    }

    toggle.addEventListener('click', () => {
      nav.classList.toggle('show');
      const icon = toggle.querySelector('.menu-toggle-icon');
      if (icon) {
        icon.textContent = nav.classList.contains('show') ? 'Close' : 'Menu';
      }
    });
  }

  function initYear() {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
    }
  }

  function initPage() {
    initMenu();
    initYear();
    initSlider();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPage, { once: true });
  } else {
    initPage();
  }
})();
