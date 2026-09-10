// VERDÉA HOTEL — shared interactions
document.addEventListener('DOMContentLoaded', function () {
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');

  function onScroll() {
    if (window.scrollY > 40) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }
  window.addEventListener('scroll', onScroll);
  onScroll();

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
      });
    });
  }

  // Simple booking form demo handler
  var bookingForm = document.getElementById('booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = document.getElementById('form-success');
      if (msg) {
        msg.style.display = 'block';
        bookingForm.reset();
      }
    });
  }

  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = document.getElementById('contact-success');
      if (msg) {
        msg.style.display = 'block';
        contactForm.reset();
      }
    });
  }

    // Fix footer social media icons
  var socialGroups = document.querySelectorAll('.footer-social');

  socialGroups.forEach(function (group) {
    var icons = [
      '<svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18" fill="currentColor"><path d="M14 8h3V4h-3c-3.3 0-5 2-5 5v3H6v4h3v8h4v-8h3.5l.5-4H13V9c0-.7.3-1 1-1z"></path></svg>',

      '<svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none"></circle></svg>',

      '<svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18" fill="currentColor"><path d="M15 3h3c.3 2 1.5 3.5 3.5 4v3.1c-1.3-.1-2.5-.5-3.5-1.1V16c0 3.3-2.7 6-6 6s-6-2.4-6-5.7c0-3.4 2.7-6.1 6.2-6.1.3 0 .6 0 .8.1v3.3c-.3-.1-.6-.2-.9-.2-1.4 0-2.5 1-2.5 2.4s1.1 2.4 2.5 2.4 2.4-1 2.4-2.5V3z"></path></svg>'
    ];

    group.querySelectorAll('a').forEach(function (link, index) {
      if (icons[index]) {
        link.textContent = '';
        link.insertAdjacentHTML('beforeend', icons[index]);
      }
    });
  });
});
