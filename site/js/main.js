/* ============================================================================
   Lemovals — site JS
   - Sticky header scroll state
   - Mobile nav
   - Reveal on scroll (IntersectionObserver)
   - Stat count-up
   - Quote form (client-side validation, opens mailto for now)
   - Scroll-stop annotation-card activation (placeholder)
   Respects prefers-reduced-motion.
   ========================================================================= */

(() => {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- Header scrolled state --- */
  const header = document.querySelector('.header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 12);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* --- Mobile nav toggle --- */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
    // Close mobile menu on link click
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        if (navLinks.classList.contains('open')) {
          navLinks.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  /* --- Reveal on scroll --- */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && !reducedMotion && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* --- Stat count-up --- */
  const stats = document.querySelectorAll('.stat .num[data-target]');
  if (stats.length && !reducedMotion && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseFloat(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        const prefix = el.dataset.prefix || '';
        const decimals = parseInt(el.dataset.decimals || '0', 10);
        const duration = 1600;
        const start = performance.now();
        const animate = (now) => {
          const t = Math.min(1, (now - start) / duration);
          // easeOutExpo
          const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
          const current = target * eased;
          el.textContent = prefix + current.toFixed(decimals) + suffix;
          if (t < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
        io.unobserve(el);
      });
    }, { threshold: 0.3 });
    stats.forEach(el => io.observe(el));
  } else {
    stats.forEach(el => {
      const prefix = el.dataset.prefix || '';
      const suffix = el.dataset.suffix || '';
      const decimals = parseInt(el.dataset.decimals || '0', 10);
      el.textContent = prefix + parseFloat(el.dataset.target).toFixed(decimals) + suffix;
    });
  }

  /* --- Quote form (mailto handler) --- */
  const quoteForm = document.getElementById('quote-form');
  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(quoteForm);
      const fields = {
        name: data.get('name') || '',
        phone: data.get('phone') || '',
        from: data.get('from') || '',
        to: data.get('to') || '',
        date: data.get('date') || '',
        notes: data.get('notes') || ''
      };
      const subject = encodeURIComponent(`Quote request from ${fields.name}`);
      const body = encodeURIComponent(
        `Name: ${fields.name}\n` +
        `Phone: ${fields.phone}\n` +
        `Moving from: ${fields.from}\n` +
        `Moving to: ${fields.to}\n` +
        `Preferred date: ${fields.date}\n` +
        `Notes:\n${fields.notes}\n`
      );
      // Opens user's mail app. Replace with real endpoint when available.
      window.location.href = `mailto:hello@lemovals.co.uk?subject=${subject}&body=${body}`;
      const status = quoteForm.querySelector('.form-status');
      if (status) {
        status.className = 'form-status success';
        status.textContent = 'Thanks — opening your email app. Alternatively call Leigh on 07479 222 460.';
      }
    });
  }

  /* --- Scroll-stop: canvas frame scrubber (SKILL3D pattern) -------------
     Preloads /assets/frames/frame_XXXX.jpg (count from data-frames) and
     renders the current frame to <canvas id="scroll-canvas"> based on the
     user's scroll progress through the .scroll-stop-track container.
     Annotation cards activate at data-at thresholds (0..1 progress). */
  const scrollStop = document.querySelector('.scroll-stop');
  const canvas = document.getElementById('scroll-canvas');
  const annotations = document.querySelectorAll('.annotation-card');

  if (scrollStop && canvas && !reducedMotion) {
    const frameCount = parseInt(scrollStop.dataset.frames || '0', 10);
    const framePath = scrollStop.dataset.framePath || '/assets/frames/frame_';
    const frameExt = scrollStop.dataset.frameExt || '.jpg';
    const ctx = canvas.getContext('2d');
    const frames = [];
    let loaded = 0;
    let currentFrame = -1;
    let pending = false;

    const sizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      currentFrame = -1; // force redraw
    };

    const drawFrame = (idx) => {
      const img = frames[idx];
      if (!img || !img.complete || img.naturalWidth === 0) return;
      const cw = canvas.clientWidth;
      const ch = canvas.clientHeight;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      // Cover-fit on desktop, contain-fit (slightly zoomed) on mobile so the van stays centred
      const isMobile = window.matchMedia('(max-width: 640px)').matches;
      let scale, dw, dh, dx, dy;
      if (isMobile) {
        scale = Math.min(cw / iw, ch / ih) * 1.08;
      } else {
        scale = Math.max(cw / iw, ch / ih);
      }
      dw = iw * scale;
      dh = ih * scale;
      dx = (cw - dw) / 2;
      dy = (ch - dh) / 2;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, cw, ch);
      ctx.drawImage(img, dx, dy, dw, dh);
    };

    const updateProgress = () => {
      pending = false;
      const rect = scrollStop.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / total));
      const idx = Math.min(frameCount - 1, Math.floor(progress * frameCount));
      if (idx !== currentFrame) {
        currentFrame = idx;
        drawFrame(idx);
      }
      // Annotation cards: light up the last card whose data-at <= progress
      let active = 0;
      annotations.forEach((c, i) => {
        const at = parseFloat(c.dataset.at || '0');
        if (progress >= at) active = i;
      });
      annotations.forEach((c, i) => c.classList.toggle('active', i === active));
    };

    const onScroll = () => {
      if (!pending) {
        pending = true;
        requestAnimationFrame(updateProgress);
      }
    };

    // Preload frames (sequential-parallel — all start, first is drawn when ready)
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.decoding = 'async';
      const n = String(i).padStart(4, '0');
      img.src = `${framePath}${n}${frameExt}`;
      img.onload = () => {
        loaded++;
        if (i === 1) { // draw first frame ASAP so the section isn't blank
          sizeCanvas();
          drawFrame(0);
        }
        if (loaded === frameCount) updateProgress();
      };
      frames.push(img);
    }

    sizeCanvas();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => { sizeCanvas(); updateProgress(); }, { passive: true });
  } else if (scrollStop) {
    // Reduced-motion fallback: show static last-frame image instead of canvas
    scrollStop.classList.add('reduced-motion');
    annotations.forEach(c => c.classList.add('active'));
  }

  /* --- Smooth-scroll to hash with offset (for #quote-form etc.) ---- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href.length <= 1) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: reducedMotion ? 'auto' : 'smooth' });
    });
  });
})();
