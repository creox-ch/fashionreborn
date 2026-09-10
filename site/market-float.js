(() => {
  const wrap = document.querySelector('.mc-float');
  if (!wrap || matchMedia('(prefers-reduced-motion:reduce)').matches) return;
  const els = [...wrap.querySelectorAll('.mc-float__in')];
  if (!els.length) return;
  els.forEach(el => el.style.transition = 'none');

  // each card has its own mass/drag/sail → nothing moves in lockstep
  const cfg = [
    { depth: 1.00, ease: .022, sail: 0.34, drag: .984, k: .0030, rot: .10 },
    { depth: 0.58, ease: .034, sail: 0.52, drag: .978, k: .0044, rot: .15 },
    { depth: 0.80, ease: .017, sail: 0.26, drag: .988, k: .0024, rot: .07 },
    { depth: 0.44, ease: .040, sail: 0.62, drag: .974, k: .0052, rot: .18 }
  ];
  const cards = els.map((el, i) => ({ el, ...cfg[i % cfg.length], cx: 0, cy: 0, wx: 0, wy: 0, vx: 0, vy: 0 }));

  let tx = 0, ty = 0, raf = 0, lastX = null, lastY = null, lastT = 0;
  const clamp = (v, m) => Math.max(-m, Math.min(m, v));

  const tick = () => {
    let busy = false;
    for (const c of cards) {
      c.cx += (tx - c.cx) * c.ease; c.cy += (ty - c.cy) * c.ease;
      c.vx += -c.wx * c.k; c.vy += -c.wy * c.k;
      c.vx *= c.drag; c.vy *= c.drag;
      c.wx += c.vx; c.wy += c.vy;
      const dx = c.cx * 26 * c.depth + c.wx;
      const dy = c.cy * 18 * c.depth + c.wy;
      c.el.style.setProperty('--dx', dx.toFixed(2) + 'px');
      c.el.style.setProperty('--dy', dy.toFixed(2) + 'px');
      c.el.style.setProperty('--dr', (c.cx * 2.4 * c.depth + c.wx * c.rot).toFixed(2) + 'deg');
      if (Math.abs(tx - c.cx) > .002 || Math.abs(ty - c.cy) > .002
        || Math.abs(c.wx) > .04 || Math.abs(c.wy) > .04
        || Math.abs(c.vx) > .04 || Math.abs(c.vy) > .04) busy = true;
    }
    raf = busy ? requestAnimationFrame(tick) : 0;
  };
  const wake = () => { if (!raf) raf = requestAnimationFrame(tick); };
  const set = (x, y) => { tx = clamp(x, 1); ty = clamp(y, 1); wake(); };
  // influence 0..1: full over the card, fades to 0 within ~90px around it
  const influence = (c, x, y) => {
    const r = c.el.getBoundingClientRect();
    const dx = Math.max(r.left - x, 0, x - r.right);
    const dy = Math.max(r.top - y, 0, y - r.bottom);
    return Math.max(0, 1 - Math.hypot(dx, dy) / 90);
  };
  const hero = wrap.closest('.hero') || wrap;
  hero.addEventListener('pointermove', e => {
    const now = performance.now(), dt = Math.max(8, now - lastT);
    if (lastX !== null && dt < 220) {
      const gx = clamp((e.clientX - lastX) / dt, 2.2) * .30;
      const gy = clamp((e.clientY - lastY) / dt, 2.2) * .22;
      for (const c of cards) {
        const f = influence(c, e.clientX, e.clientY);
        if (!f) continue;
        c.vx = clamp(c.vx + gx * c.sail * f, .85);
        c.vy = clamp(c.vy + gy * c.sail * f, .85);
      }
      wake();
    }
    lastX = e.clientX; lastY = e.clientY; lastT = now;
  });
  hero.addEventListener('pointerleave', () => { lastX = null; });

  const onTilt = e => {
    if (e.gamma == null && e.beta == null) return;
    set((e.gamma || 0) / 32, ((e.beta || 0) - 40) / 32);
  };
  const startTilt = () => window.addEventListener('deviceorientation', onTilt);
  if (window.DeviceOrientationEvent) {
    if (typeof DeviceOrientationEvent.requestPermission === 'function')
      document.addEventListener('touchend', () => DeviceOrientationEvent.requestPermission()
        .then(s => { if (s === 'granted') startTilt(); }).catch(() => {}), { once: true });
    else startTilt();
  }
})();
