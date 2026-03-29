/* ====================================================
   RECANTO SHALON EVENTOS — JavaScript
   Carrossel · Scroll Animations · Menu · Header
   ==================================================== */

(function () {
  'use strict';

  /* ─────────────────────────────────────────────
     1. HEADER: scroll effect + mobile menu
  ───────────────────────────────────────────── */
  const header     = document.getElementById('site-header');
  const hamburger  = document.getElementById('hamburger');
  const navMobile  = document.getElementById('nav-mobile');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  // Header encolhe ao fazer scroll
  function handleHeaderScroll() {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll(); // chamada inicial

  // Toggle do menu mobile
  function toggleMenu(open) {
    hamburger.classList.toggle('active', open);
    navMobile.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
    navMobile.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';
  }

  hamburger.addEventListener('click', () => {
    const isOpen = navMobile.classList.contains('open');
    toggleMenu(!isOpen);
  });

  // Fecha o menu ao clicar em um link
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  // Fecha o menu ao clicar fora
  document.addEventListener('click', e => {
    if (
      navMobile.classList.contains('open') &&
      !header.contains(e.target)
    ) {
      toggleMenu(false);
    }
  });

  // Fecha menu com ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && navMobile.classList.contains('open')) {
      toggleMenu(false);
      hamburger.focus();
    }
  });


  /* ─────────────────────────────────────────────
     2. SCROLL REVEAL ANIMATION
  ───────────────────────────────────────────── */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target); // anima só uma vez
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  revealElements.forEach(el => revealObserver.observe(el));


  /* ─────────────────────────────────────────────
     3. CARROSSEL DE IMAGENS
  ───────────────────────────────────────────── */

  /**
   * Inicializa um carrossel.
   * @param {string} trackId   - ID do elemento .carousel-track
   * @param {string} dotsId    - ID do container de dots
   */
  function initCarousel(trackId, dotsId) {
    const track   = document.getElementById(trackId);
    const dotsContainer = document.getElementById(dotsId);

    if (!track || !dotsContainer) return;

    const slides  = Array.from(track.querySelectorAll('.carousel-slide'));
    const total   = slides.length;
    let current   = 0;
    let autoTimer = null;

    // Cria os dots
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', `Ir para imagem ${i + 1}`);
      dot.setAttribute('aria-selected', String(i === 0));
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.carousel-dot');

    // Navega para o slide index
    function goTo(index) {
      current = (index + total) % total;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, i) => {
        d.classList.toggle('active', i === current);
        d.setAttribute('aria-selected', String(i === current));
      });
    }

    // Avança/volta via botões de seta
    function handleArrowClick(e) {
      const btn = e.currentTarget;
      const direction = btn.classList.contains('carousel-prev') ? -1 : 1;
      stopAuto();
      goTo(current + direction);
      startAuto();
    }

    // Associa botões ao carrossel correto
    const carouselEl = track.closest('[data-carousel], .espaco-carousel');
    if (carouselEl) {
      const prevBtn = carouselEl.querySelector('.carousel-prev');
      const nextBtn = carouselEl.querySelector('.carousel-next');
      if (prevBtn) prevBtn.addEventListener('click', handleArrowClick);
      if (nextBtn) nextBtn.addEventListener('click', handleArrowClick);
    }

    // Autoplay
    function startAuto() {
      stopAuto();
      autoTimer = setInterval(() => goTo(current + 1), 4500);
    }

    function stopAuto() {
      if (autoTimer) clearInterval(autoTimer);
    }

    // Swipe touch
    let touchStartX = 0;
    let touchEndX   = 0;

    track.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });

    track.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        stopAuto();
        goTo(current + (diff > 0 ? 1 : -1));
        startAuto();
      }
    }, { passive: true });

    // Pause no hover
    const parentEl = track.closest('.espaco-carousel');
    if (parentEl) {
      parentEl.addEventListener('mouseenter', stopAuto);
      parentEl.addEventListener('mouseleave', startAuto);
    }

    // Suporte a teclado nos dots
    dotsContainer.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') { stopAuto(); goTo(current + 1); startAuto(); }
      if (e.key === 'ArrowLeft')  { stopAuto(); goTo(current - 1); startAuto(); }
    });

    // Inicia
    goTo(0);
    startAuto();
  }

  // Inicializa os dois carrosseis da página
  initCarousel('carousel-1', 'dots-1');
  initCarousel('carousel-2', 'dots-2');


  /* ─────────────────────────────────────────────
     4. SMOOTH SCROLL para links âncora
  ───────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      e.preventDefault();

      const headerH = header.offsetHeight;
      const targetTop = targetEl.getBoundingClientRect().top + window.scrollY - headerH - 8;

      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
  });


  /* ─────────────────────────────────────────────
     5. ANIMAÇÃO DE ENTRADA DOS ELEMENTOS DO HERO
        (fade-in manual via classe CSS ao carregar)
  ───────────────────────────────────────────── */
  window.addEventListener('load', () => {
    document.querySelectorAll('.hero .reveal').forEach(el => {
      // força visibilidade imediata para elementos hero (acima da dobra)
      setTimeout(() => el.classList.add('visible'), 100);
    });
  });


  /* ─────────────────────────────────────────────
     6. PARALLAX SUTIL NO HERO (desktop only)
  ───────────────────────────────────────────── */
  const heroBg = document.querySelector('.hero-bg');

  function handleHeroParallax() {
    if (window.innerWidth < 900 || !heroBg) return;
    const scrollY = window.scrollY;
    heroBg.style.transform = `translateY(${scrollY * 0.3}px)`;
  }

  window.addEventListener('scroll', handleHeroParallax, { passive: true });


  /* ─────────────────────────────────────────────
     7. WHATSAPP FLOAT: anima entrada após 2.5s
  ───────────────────────────────────────────── */
  const waFloat = document.querySelector('.whatsapp-float');
  if (waFloat) {
    waFloat.style.opacity = '0';
    waFloat.style.transform = 'translateY(20px)';
    waFloat.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

    setTimeout(() => {
      waFloat.style.opacity = '1';
      waFloat.style.transform = 'translateY(0)';
    }, 2500);
  }


  /* ─────────────────────────────────────────────
     8. ACTIVE NAV LINK ao scrollar
  ───────────────────────────────────────────── */
  const sections   = document.querySelectorAll('section[id]');
  const navLinks   = document.querySelectorAll('.nav-desktop a[href^="#"]');

  function updateActiveNav() {
    let current = '';
    const scrollY = window.scrollY + header.offsetHeight + 80;

    sections.forEach(section => {
      if (section.offsetTop <= scrollY) {
        current = '#' + section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.style.color = link.getAttribute('href') === current
        ? 'var(--gold-light)'
        : '';
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();


  /* ─────────────────────────────────────────────
     9. LAZY PRELOAD: adiciona indicador de
        "deslize" no carrossel mobile
  ───────────────────────────────────────────── */
  if (window.innerWidth < 640) {
    document.querySelectorAll('.espaco-carousel').forEach(c => {
      const hint = document.createElement('div');
      hint.style.cssText = `
        position:absolute; bottom:3.5rem; right:0.75rem; z-index:12;
        font-size:0.65rem; letter-spacing:0.1em; color:rgba(253,250,245,0.6);
        text-transform:uppercase; pointer-events:none;
        animation: fadeHint 3s ease 1s forwards;
      `;
      hint.textContent = 'deslize ›';
      c.appendChild(hint);

      // Remove a dica após 5s
      setTimeout(() => hint.remove(), 5500);
    });

    // Injeta a keyframe via <style>
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeHint {
        0%   { opacity: 1; }
        70%  { opacity: 0.5; }
        100% { opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

})(); // IIFE: encapsula todo o código
