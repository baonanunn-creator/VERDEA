// VERDÉA HOTEL — Dining Gallery ("Thư viện ẩm thực")
// Xử lý việc mở lightbox từ các chồng ảnh và điều hướng giữa các ảnh.
document.addEventListener('DOMContentLoaded', function () {
  var stacks = document.querySelectorAll('.gallery-stack');
  var lightbox = document.getElementById('gallery-lightbox');
  if (!stacks.length || !lightbox) return;

  var imageEl = document.getElementById('lightbox-image');
  var categoryEl = document.getElementById('lightbox-category');
  var countEl = document.getElementById('lightbox-count');
  var closeBtn = lightbox.querySelector('.lightbox-close');
  var prevBtn = lightbox.querySelector('.lightbox-prev');
  var nextBtn = lightbox.querySelector('.lightbox-next');
  var lastFocusedStack = null;

  var currentImages = [];
  var currentIndex = 0;
  var currentLabel = '';

  function openGallery(stack) {
    var raw = stack.getAttribute('data-images');
    try {
      currentImages = JSON.parse(raw) || [];
    } catch (e) {
      currentImages = [];
    }
    if (!currentImages.length) return;

    lastFocusedStack = stack;
    currentLabel = stack.getAttribute('data-label') || '';
    currentIndex = 0;
    render();

    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeGallery() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocusedStack) lastFocusedStack.focus();
  }

  function render() {
    var item = currentImages[currentIndex] || {};
    imageEl.src = item.src || '';
    imageEl.alt = item.alt || currentLabel;
    categoryEl.textContent = currentLabel;
    countEl.textContent = (currentIndex + 1) + ' / ' + currentImages.length;
    prevBtn.disabled = currentIndex === 0;
  }

  // Đi tới ảnh kế tiếp. Khi đã ở ảnh cuối cùng của chuyên mục,
  // tự động thoát lightbox (theo đúng yêu cầu: lướt hết ảnh thì thoát ra).
  function next() {
    if (currentIndex + 1 >= currentImages.length) {
      closeGallery();
      return;
    }
    currentIndex += 1;
    render();
  }

  function prev() {
    if (currentIndex === 0) return;
    currentIndex -= 1;
    render();
  }

  stacks.forEach(function (stack) {
    stack.addEventListener('click', function () {
      openGallery(stack);
    });
  });

  imageEl.addEventListener('click', next);
  nextBtn.addEventListener('click', next);
  prevBtn.addEventListener('click', prev);
  closeBtn.addEventListener('click', closeGallery);

  // Bấm ra ngoài vùng ảnh (nền tối) để đóng
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeGallery();
  });

  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeGallery();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  });
});
