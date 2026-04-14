// IMMEDIATE PRODUCT RENDERING
(function() {
  console.log('Loading products...');
  
  // Product data with Unsplash images
  const products = [
    { name: "Fundi Cement", brand: "Fundi", specs: "32.5R · 50kg", desc: "Designed for masonry, block making, and plastering.", price: "KES 650", image: "bamburi fundi.jpeg" },
    { name: "Tembo Cement", brand: "Tembo", specs: "42.5N · 50kg", desc: "Extra strength for heavy load structures.", price: "KES 690", image: "bamburi tembo.jpeg" },
    { name: "Nguvu Cement", brand: "Nguvu", specs: "42.5R · 50kg", desc: "High early strength – fast formwork removal.", price: "KES 740", image: "bamburi nguvu.jpeg" },
    { name: "Powermax", brand: "Powermax", specs: "52.5N · 50kg", desc: "Premium for high-rise & precast.", price: "KES 950", image: "bamburi powermax.jpeg" },
    { name: "Duracem", brand: "Duracem", specs: "42.5N · 50kg (sulphate resistant)", desc: "For marine & aggressive soil.", price: "KES 1,050", image: "bamburi duracem.jpeg" },
    { name: "Powerplus", brand: "Powerplus", specs: "52.5R · 50kg", desc: "Ultra-high strength, 1-day curing.", price: "KES 1,000", image: "bamburi power plus.jpeg" },
    { name: "Powercrete", brand: "Powercrete", specs: "42.5R (blended)", desc: "Low heat, ideal for mass concrete.", price: "KES 1,250", image: "bamburi powercrete.jpeg" },
    { name: "Seti 300", brand: "Seti 300", specs: "32.5N · 25kg (easy)", desc: "high-performance, 25kg cementitious adhesive designed for fixing ceramic, terracotta, and natural stone tiles on internal walls and floors.", price: "KES 400", image: "bamburi seti 300.jpeg" }
  ];

  function renderProducts() {
    const productGrid = document.getElementById('productGrid');
    if (!productGrid) {
      console.error('Product grid not found!');
      return;
    }
    
    let html = '';
    products.forEach(p => {
      html += `
        <div class="product-card">
          <div class="product-image">
            <img src="${p.image}" alt="${p.name}" loading="lazy" style="width:100%; height:100%; object-fit:cover;">
          </div>
          <div class="product-details">
            <h3 class="product-name">${p.name}</h3>
            <div class="product-spec"><span>${p.brand}</span> <span>⚡ ${p.specs}</span></div>
            <p class="product-desc">${p.desc}</p>
            <div class="product-price">${p.price} <small>per bag</small></div>
            <button class="contact-order" onclick="window.open('https://wa.me/254750210207?text=${encodeURIComponent('Hello, I am interested in ' + p.name)}', '_blank')">
              <i class="fab fa-whatsapp"></i> Order via WhatsApp
            </button>
          </div>
        </div>
      `;
    });
    
    productGrid.innerHTML = html;
    console.log('Products rendered successfully!');
  }

  // Try to render immediately
  renderProducts();
  
  // Also try after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderProducts);
  }
})();

// ===== SLIDER FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', function() {
  // Slider
  const wrapper = document.getElementById('sliderWrapper');
  const dots = document.querySelectorAll('.slider-dot');
  const prev = document.getElementById('prevSlide');
  const next = document.getElementById('nextSlide');
  
  if (wrapper && dots.length) {
    let currentIndex = 0;
    const totalSlides = document.querySelectorAll('.slide').length;
    
    function updateSlider(index) {
      if (index < 0) index = totalSlides - 1;
      if (index >= totalSlides) index = 0;
      wrapper.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
      currentIndex = index;
    }
    
    dots.forEach((dot, i) => dot.addEventListener('click', () => updateSlider(i)));
    if (prev) prev.addEventListener('click', () => updateSlider(currentIndex - 1));
    if (next) next.addEventListener('click', () => updateSlider(currentIndex + 1));
    
    // Auto slide
    setInterval(() => updateSlider(currentIndex + 1), 5000);
  }

  // Mobile menu
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('navLinks');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('show');
      const icon = toggle.querySelector('i');
      icon.className = nav.classList.contains('show') ? 'fas fa-times' : 'fas fa-bars';
    });
  }

  // Current year
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
});