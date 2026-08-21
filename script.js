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

  // Carrega content.json e aplica no site antes de inicializar os carrosseis
  applyCMS().then(() => {
    initCarousel('carousel-1', 'dots-1');
    initCarousel('carousel-2', 'dots-2');
  });


  /* ─────────────────────────────────────────────
     CMS: lê content.json e aplica textos + fotos
  ───────────────────────────────────────────── */
  async function applyCMS() {
    let data;
    try {
      const r = await fetch('content.json');
      if (!r.ok) return;
      data = await r.json();
    } catch (e) {
      return; // sem content.json — usa conteúdo padrão do HTML
    }

    applyTextos(data);
    applyCarousel(data.carousel1, 'carousel-1');
    applyCarousel(data.carousel2, 'carousel-2');
  }

  function applyTextos(d) {
    const set = (sel, val) => { const el = document.querySelector(sel); if (el && val) el.textContent = val; };

    set('.google-badge-text',  d.hero?.badge);
    set('.hero-eyebrow',       d.hero?.eyebrow);
    set('.hero-subtitle-l1',   d.hero?.subtitle_l1);
    set('.hero-subtitle-l2',   d.hero?.subtitle_l2);

    const descs = document.querySelectorAll('.sobre-desc');
    if (descs[0] && d.sobre?.desc1) descs[0].textContent = d.sobre.desc1;
    if (descs[1] && d.sobre?.desc2) descs[1].textContent = d.sobre.desc2;

    const e1Info = document.querySelector('#e1-title')?.closest('.espaco-info');
    if (e1Info) {
      const e1Tag  = e1Info.querySelector('.espaco-tag-text');
      const e1Desc = e1Info.querySelector('.espaco-desc');
      const e1Cap  = e1Info.querySelector('.espaco-capacity-text');
      if (e1Tag  && d.espaco1?.tag)      e1Tag.textContent  = d.espaco1.tag;
      if (e1Desc && d.espaco1?.desc)     e1Desc.textContent = d.espaco1.desc;
      if (e1Cap  && d.espaco1?.capacity) e1Cap.textContent  = d.espaco1.capacity;
    }

    const e2Info = document.querySelector('#e2-title')?.closest('.espaco-info');
    if (e2Info) {
      const e2Tag  = e2Info.querySelector('.espaco-tag-text');
      const e2Desc = e2Info.querySelector('.espaco-desc');
      const e2Cap  = e2Info.querySelector('.espaco-capacity-text');
      if (e2Tag  && d.espaco2?.tag)      e2Tag.textContent  = d.espaco2.tag;
      if (e2Desc && d.espaco2?.desc)     e2Desc.textContent = d.espaco2.desc;
      if (e2Cap  && d.espaco2?.capacity) e2Cap.textContent  = d.espaco2.capacity;
    }
  }

  function applyCarousel(slides, trackId) {
    if (!slides || slides.length === 0) return;
    const track = document.getElementById(trackId);
    if (!track) return;
    track.innerHTML = '';
    slides.forEach(slide => {
      const el = document.createElement('div');
      el.className = 'carousel-slide';
      el.setAttribute('role', 'img');
      el.setAttribute('aria-label', slide.legenda || 'Foto do espaço');

      const isJpg = /\.(jpe?g)$/i.test(slide.foto);
      if (isJpg) {
        const picture = document.createElement('picture');
        const source = document.createElement('source');
        source.type = 'image/webp';
        source.srcset = slide.foto.replace(/\.(jpe?g)$/i, '.webp');
        const img = document.createElement('img');
        img.src = slide.foto;
        img.alt = '';
        img.loading = 'lazy';
        img.className = 'carousel-slide-img';
        picture.appendChild(source);
        picture.appendChild(img);
        el.appendChild(picture);
      } else {
        const img = document.createElement('img');
        img.src = slide.foto;
        img.alt = '';
        img.loading = 'lazy';
        img.className = 'carousel-slide-img';
        el.appendChild(img);
      }

      const overlay = document.createElement('div');
      overlay.className = 'slide-overlay';
      const caption = document.createElement('span');
      caption.className   = 'slide-caption';
      caption.textContent = slide.legenda || '';
      overlay.appendChild(caption);
      el.appendChild(overlay);
      track.appendChild(el);
    });
  }


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
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
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
      link.classList.toggle('nav-active', link.getAttribute('href') === current);
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

  /* ─────────────────────────────────────────────
     10. ANALYTICS SOB CONSENTIMENTO (LGPD)
        A tag do GA4 já carrega no <head> (Consent Mode v2),
        mas começa com consentimento negado. Aqui só liberamos
        o consentimento e injetamos o Clarity — nunca antes
        de o visitante aceitar o banner de cookies.
  ───────────────────────────────────────────── */
  function loadAnalytics() {
    if (window.__analyticsLoaded) return;
    window.__analyticsLoaded = true;

    // Google Analytics 4: libera o consentimento (tag já carregada no <head>)
    if (window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'granted',
        'ad_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted'
      });
    }

    // Microsoft Clarity
    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i;
      y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
    })(window, document, 'clarity', 'script', 'wyapsc15k7');
  }

  /* ─────────────────────────────────────────────
     11. LGPD COOKIE BANNER
  ───────────────────────────────────────────── */
  const cookieBanner = document.getElementById('cookie-banner');
  const cookieAccept = document.getElementById('cookie-accept');

  if (cookieBanner && cookieAccept) {
    const CONSENT_KEY = 'lgpd-consent';

    function hideBanner() {
      cookieBanner.classList.remove('visible');
      document.body.classList.remove('cookie-visible');
      if (waFloat) waFloat.style.bottom = '';
    }

    function showBanner() {
      cookieBanner.classList.add('visible');
      document.body.classList.add('cookie-visible');
      // Empurra o botão WhatsApp acima do banner
      if (waFloat) {
        const bannerH = cookieBanner.offsetHeight;
        waFloat.style.bottom = (bannerH + 16) + 'px';
      }
    }

    if (localStorage.getItem(CONSENT_KEY) === 'true') {
      loadAnalytics();
    } else {
      setTimeout(showBanner, 1500);
    }

    cookieAccept.addEventListener('click', () => {
      localStorage.setItem(CONSENT_KEY, 'true');
      hideBanner();
      loadAnalytics();
    });
  }


})(); // IIFE: encapsula todo o código
