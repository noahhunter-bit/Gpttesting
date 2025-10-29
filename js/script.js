// js/script.js
// Shared site JS: hamburger nav + theme toggle + small helpers

document.addEventListener('DOMContentLoaded', () => {
  // menu toggle (mobile)
  const menuToggle = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  if(menuToggle && mobileNav){
    menuToggle.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    // hide mobile nav on resize to desktop
    window.addEventListener('resize', () => {
      if(window.innerWidth >= 768){
        mobileNav.classList.remove('open');
        if(menuToggle) menuToggle.setAttribute('aria-expanded','false');
      }
    });
  }

  // theme toggle
  const themeToggle = document.getElementById('theme-toggle');
  const saved = localStorage.getItem('theme');
  if(saved) document.documentElement.setAttribute('data-theme', saved);

  if(themeToggle){
    themeToggle.addEventListener('click', () => {
      const cur = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const nxt = cur === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', nxt);
      localStorage.setItem('theme', nxt);
    });
  }

  // small: auto-init slideshows (if present)
  document.querySelectorAll('.slideshow').forEach((slideshow) => {
    const slides = slideshow.querySelectorAll('.slide');
    const dots = slideshow.parentElement.querySelectorAll('.dot');
    let i = 0;
    function show(n){
      slides.forEach(s => s.classList.remove('active'));
      dots.forEach(d => d.classList.remove('active'));
      slides[n].classList.add('active');
      if(dots[n]) dots[n].classList.add('active');
    }
    if(slides.length){
      show(0);
      setInterval(() => {
        i = (i + 1) % slides.length;
        show(i);
      }, 4500);
      dots.forEach(d => {
        d.addEventListener('click', () => {
          i = Number(d.dataset.index || 0);
          show(i);
        });
      });
    }
  });
});
