/*!
 * main.js — Petar Paponjak Portfolio
 * Pure vanilla JS — no dependencies needed
 */

(function () {
  'use strict';

  /* ── CURSOR ───────────────────────────────── */
  var cursor = document.getElementById('cursor');
  var ring   = document.getElementById('cursor-ring');

  if (cursor && ring && window.innerWidth > 991) {
    var mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', function (e) {
      mx = e.clientX;
      my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top  = my + 'px';
    });

    (function animRing() {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(animRing);
    })();

    document.querySelectorAll('a, button').forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        ring.style.width  = '52px';
        ring.style.height = '52px';
        ring.style.borderColor = 'rgba(200,240,96,0.65)';
      });
      el.addEventListener('mouseleave', function () {
        ring.style.width  = '36px';
        ring.style.height = '36px';
        ring.style.borderColor = 'rgba(200,240,96,0.35)';
      });
    });
  }

  /* ── STICKY NAV ───────────────────────────── */
  var nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 60) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });
  }

  /* ── SCROLL REVEAL ────────────────────────── */
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    if ('IntersectionObserver' in window) {
      var revealObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08 });
      revealEls.forEach(function (el) { revealObs.observe(el); });
    } else {
      // Fallback for old browsers
      revealEls.forEach(function (el) { el.classList.add('visible'); });
    }
  }

  /* ── BACK TO TOP ──────────────────────────── */
  var btt = document.getElementById('back-to-top');
  if (btt) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 300) {
        btt.classList.add('btt-visible');
      } else {
        btt.classList.remove('btt-visible');
      }
    });
    btt.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── PORTFOLIO FILTER + LOAD MORE / HIDE ──── */
  var VISIBLE_COUNT = 6;
  var currentCat    = 'app'; // default active tab

  function getAllItems() {
    return Array.prototype.slice.call(document.querySelectorAll('.portfolio-item'));
  }

  function getItemsByCat(cat) {
    return getAllItems().filter(function (el) {
      return el.dataset.cat === cat;
    });
  }

  function applyFilter(cat) {
    currentCat = cat;

    // Hide everything first
    getAllItems().forEach(function (el) {
      el.style.display = 'none';
    });

    // Show first VISIBLE_COUNT items for this cat
    var items = getItemsByCat(cat);
    items.forEach(function (el, i) {
      el.style.display = (i < VISIBLE_COUNT) ? 'block' : 'none';
    });

    // Update toggle button
    var btn = document.getElementById('portfolio-toggle-btn');
    if (btn) {
      btn.dataset.state = 'collapsed';
      btn.textContent   = 'Load More';
      btn.style.display = items.length > VISIBLE_COUNT ? 'inline-block' : 'none';
    }
  }

  // Global so onclick="" in HTML can call it
  window.filterPortfolio = function (cat, btnEl) {
    document.querySelectorAll('.filter-tab').forEach(function (t) {
      t.classList.remove('active');
    });
    btnEl.classList.add('active');
    applyFilter(cat);
  };

  /* ── INIT on DOM ready ───────────────────── */
  function init() {
    // Activate default "App & Product" tab
    var defaultBtn = document.querySelector('.filter-tab[data-cat="app"]');
    if (defaultBtn) {
      defaultBtn.classList.add('active');
    }
    applyFilter('app');

    // Load More / Hide button
    var toggleBtn = document.getElementById('portfolio-toggle-btn');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', function () {
        var state = toggleBtn.dataset.state;
        var items = getItemsByCat(currentCat);

        if (state === 'collapsed') {
          // Show all
          items.forEach(function (el) { el.style.display = 'block'; });
          toggleBtn.textContent  = 'Hide';
          toggleBtn.dataset.state = 'expanded';
        } else {
          // Collapse back to 6
          applyFilter(currentCat);
        }
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();


// ===================== PORTFOLIO CAROUSEL =====================

document.addEventListener("DOMContentLoaded", function(){

  const carousel = document.getElementById("pfCarousel");

  if(!carousel) return;

  const slides = carousel.querySelectorAll(".pf-slide");
  const dots = carousel.querySelectorAll(".pf-dot");
  const prevBtn = carousel.querySelector(".pf-prev");
  const nextBtn = carousel.querySelector(".pf-next");

  let current = 0;

  function showSlide(index){

    if(index >= slides.length){
      current = 0;
    } else if(index < 0){
      current = slides.length - 1;
    } else {
      current = index;
    }

    slides.forEach(slide => slide.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));

    slides[current].classList.add("active");

    if(dots[current]){
      dots[current].classList.add("active");
    }
  }

  nextBtn.addEventListener("click", () => {
    showSlide(current + 1);
  });

  prevBtn.addEventListener("click", () => {
    showSlide(current - 1);
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index);
    });
  });

  showSlide(0);

});
