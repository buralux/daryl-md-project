/* ============================================================================
   scroll-world — portable scroll-scrubbed camera-flight engine
   ----------------------------------------------------------------------------
   ADAPTED COPY — upstream provenance (MIT):
     Source:  https://github.com/oso95/scroll-world
     File:    skills/scroll-world/references/scrub-engine.js
     Commit:  f941ef93eec785f08634d5f42fb2cbd652dd06c6
     License: MIT License — Copyright (c) 2026 cyw

     Permission is hereby granted, free of charge, to any person obtaining a copy
     of this software and associated documentation files (the "Software"), to deal
     in the Software without restriction, including without limitation the rights
     to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     copies of the Software, and to permit persons to whom the Software is
     furnished to do so, subject to the following conditions:
     The above copyright notice and this permission notice shall be included in all
     copies or substantial portions of the Software.
     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND.

   Every deviation from upstream is marked `[DARYL adaptation]` and documented in
   docs/website/SCROLL_WORLD_ENGINE_ADAPTATIONS.md. Functional behaviour (segment
   chain, scrubbing math, linger, crossfade seams, Blob loading, seek coalescing,
   iOS priming, mobile detection/encodes, reduced-motion stills-only path) is
   upstream's, unchanged.
   ========================================================================== */

/* eslint-disable @typescript-eslint/no-explicit-any */

export interface ScrollWorldHandle {
  destroy: () => void;
}

export function mountScrollWorld(container: HTMLElement, config: any): ScrollWorldHandle {
  // [DARYL adaptation] duplicate-mount guard: mounting twice on the same container
  // (React StrictMode, HMR) would double DOM/listeners/rAF upstream.
  if ((container as any)._swMounted) return (container as any)._swHandle;
  (container as any)._swMounted = true;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarse = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  const smallMQ = window.matchMedia('(max-width: 860px)');
  const isMobile = () => coarse || smallMQ.matches;
  const SECTIONS = config.sections || [];
  const CONNECTORS = config.connectors || [];
  const CONNECTORS_M = config.connectorsMobile || [];
  const DIVE_W = config.diveScroll || 1.3;
  const CONN_W = config.connScroll || 0.9;
  const CROSSFADE = config.crossfade != null ? config.crossfade : 0.12;
  const N = SECTIONS.length;
  // [DARYL adaptation] destroyed flag + resource registries for full teardown.
  let destroyed = false;
  let rafId = 0;
  const blobUrls: string[] = [];
  const winListeners: Array<[string, any, any?]> = [];
  const docListeners: Array<[string, any, any?]> = [];
  const noop: ScrollWorldHandle = { destroy: () => {} };
  if (!N) return noop;

  injectCSS();
  container.classList.add('sw-root');

  const SEGMENTS: any[] = [];
  SECTIONS.forEach((s: any, i: number) => {
    const dive = { kind: 'dive', si: i, clip: s.clip, clipM: s.clipMobile, still: s.still, accent: s.accent,
                   w: s.scroll || DIVE_W, linger: s.linger || 0 };
    SEGMENTS.push(dive);
    s._seg = dive;
    if (i < N - 1 && CONNECTORS[i]) {
      SEGMENTS.push({ kind: 'conn', si: i, clip: CONNECTORS[i], clipM: CONNECTORS_M[i],
                      still: SECTIONS[i + 1].still, accent: SECTIONS[i + 1].accent, w: CONN_W });
    }
  });
  const NSEG = SEGMENTS.length;

  // ---- DOM (upstream, minus topbar/brand/nav/CTA/particles — see adaptations doc:
  // [DARYL adaptation] the experiment is chrome-less by design; nav/particles/topbar
  // are landing-page furniture that would explain instead of reveal) ----
  const sky = el('div', 'sw-sky');
  if (config.atmosphere !== false) {
    sky.appendChild(el('div', 'sw-sky__grad'));
    sky.appendChild(el('div', 'sw-sky__glow'));
  }
  const scrollbar = el('div', 'sw-scrollbar');
  const scrollbarFill = el('span'); scrollbar.appendChild(scrollbarFill);
  const stage = el('div', 'sw-stage');
  const route = el('div', 'sw-route');
  const hint = el('div', 'sw-hint');
  const hintText = el('span'); hintText.textContent = config.hint || 'scroll'; hint.appendChild(hintText);
  hint.appendChild(el('i'));
  const track = el('div', 'sw-track');
  const created = [sky, scrollbar, stage, route, hint, track];
  created.forEach(n => container.appendChild(n));

  SEGMENTS.forEach(s => {
    const scene = el('div', 'sw-scene'); scene.style.setProperty('--sw-accent', s.accent || '');
    const img = el('img', 'sw-scene__still') as HTMLImageElement;
    img.alt = ''; img.decoding = 'async'; img.loading = 'lazy';
    if (s.still) img.src = s.still;
    scene.appendChild(img); stage.appendChild(scene);
    s.el = scene; s.img = img; s.video = null; s.hasClip = false;
    s.loading = false; s.ready = false; s.cur = 0; s.target = 0; s.visible = false;
  });

  const dots: HTMLElement[] = [];
  SECTIONS.forEach((s: any, i: number) => {
    const dot = el('button', 'sw-route__dot');
    dot.style.setProperty('--sw-accent', s.accent || '');
    dot.setAttribute('aria-label', s.label || `scene ${i + 1}`); // [DARYL adaptation] a11y name
    dot.innerHTML = `<span class="sw-route__label">${esc(s.label || '')}</span><i></i>`;
    dot.addEventListener('click', () => jumpTo(i));
    route.appendChild(dot); dots.push(dot);
  });

  // ---- math (upstream verbatim) ----
  const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
  const smooth = (x: number) => { x = clamp(x); return x * x * (3 - 2 * x); };
  const lingerEase = (x: number, L: number) => { L = clamp(L); const c = x - 0.5; return (1 - L) * x + L * (4 * c * c * c + 0.5); };
  let vh = window.innerHeight, stageX = 0, totalW = 0, activeIndex = -1, ticking = false;
  let laidOutW = window.innerWidth;

  function layout() {
    if (destroyed) return;
    vh = window.innerHeight;
    laidOutW = window.innerWidth;
    stageX = window.innerWidth > 860 ? 4 : 0;
    let off = 0;
    SEGMENTS.forEach(s => { s.start = off * vh; off += s.w; s.end = off * vh; });
    totalW = off;
    track.style.height = (totalW * vh + vh) + 'px';
    read();
  }

  function jumpTo(i: number) {
    const seg = SECTIONS[i]._seg;
    window.scrollTo({ top: seg.start + (seg.end - seg.start) * 0.5, behavior: reduce ? 'auto' : 'smooth' });
  }

  function loadClip(s: any) {
    if (reduce || s.loading || !s.clip || destroyed) return;
    s.loading = true;
    const url = (isMobile() && s.clipM) ? s.clipM : s.clip;
    fetch(url).then(r => (r.ok ? r.blob() : Promise.reject(new Error('404'))))
      .then(blob => {
        if (destroyed) return;
        const v = document.createElement('video');
        v.className = 'sw-scene__video';
        v.muted = true; v.playsInline = true; v.preload = 'auto';
        v.setAttribute('muted', ''); v.setAttribute('playsinline', '');
        const burl = URL.createObjectURL(blob);
        blobUrls.push(burl); // [DARYL adaptation] tracked for revocation on destroy
        v.src = burl;
        v.addEventListener('loadedmetadata', () => { s.ready = true; read(); });
        v.addEventListener('seeked', () => { s.el.classList.add('has-clip'); }, { once: true });
        v.addEventListener('loadeddata', () => { try { v.pause(); } catch (e) { /* noop */ } if (userReady) primeVideo(v); });
        s.el.appendChild(v); s.video = v; s.hasClip = true;
      })
      .catch(() => {
        s.loading = false;
        // [DARYL adaptation] explicit media-failure signal: poster stays (upstream
        // behaviour) AND the host is told so it can surface a truthful note.
        container.dispatchEvent(new CustomEvent('sw-clip-error', { detail: { clip: s.clip } }));
      });
  }

  function read() {
    if (destroyed) return;
    const y = window.scrollY || window.pageYOffset;
    const fade = CROSSFADE * vh;
    let ci = 0;
    for (let i = 0; i < NSEG; i++) if (y >= SEGMENTS[i].start) ci = i;

    for (let i = 0; i < NSEG; i++) {
      const s = SEGMENTS[i];
      if (y > s.start - 1.6 * vh && y < s.end + 1.6 * vh) loadClip(s);
      const local = clamp((y - s.start) / (s.end - s.start), 0, 1);
      s.target = s.linger ? lingerEase(local, s.linger) : local;
      let outside = 0;
      if (y < s.start) outside = s.start - y; else if (y > s.end) outside = y - s.end;
      const op = smooth(1 - outside / fade);
      s.el.style.opacity = String(op); s.visible = op > 0.001;
      s.el.style.zIndex = i === ci ? '120' : String(100 + Math.round(op * 10));
      if (!s.hasClip || !s.ready) {
        const sc = reduce ? 1 : 1.03 + local * 0.14;
        s.img.style.transform = `translateX(${stageX - 2}vw) scale(${sc.toFixed(3)})`;
      }
    }

    const cur = SEGMENTS[ci];
    const near = clamp(cur.kind === 'dive' ? cur.si
      : (((y - cur.start) / (cur.end - cur.start)) > 0.5 ? cur.si + 1 : cur.si), 0, N - 1);
    if (near !== activeIndex) {
      activeIndex = near;
      dots.forEach((d, k) => d.classList.toggle('is-active', k === near));
      container.style.setProperty('--sw-accent', SECTIONS[near].accent || '');
    }
    scrollbarFill.style.transform = `scaleX(${clamp(y / (totalW * vh))})`;
    hint.style.opacity = String(clamp(1 - y / (0.5 * vh)));
    ticking = false;
  }

  function raf() {
    if (destroyed) return; // [DARYL adaptation] loop terminates on destroy
    // [DARYL adaptation] hidden-tab pause: no seek work while the page is hidden.
    if (document.hidden) { rafId = requestAnimationFrame(raf); return; }
    const eps = isMobile() ? 0.02 : 0.008;
    for (let i = 0; i < NSEG; i++) {
      const s = SEGMENTS[i];
      if (!s.hasClip || !s.ready || !s.video) continue;
      if (s.video.seeking) continue;
      if (!s.visible && Math.abs(s.cur - s.target) < 0.002) continue;
      s.cur += (s.target - s.cur) * (reduce ? 1 : 0.18);
      const dur = s.video.duration || 1;
      const t = clamp(s.cur, 0, 0.999) * dur;
      if (Math.abs(s.video.currentTime - t) > eps) { try { s.video.currentTime = t; } catch (e) { /* noop */ } }
    }
    rafId = requestAnimationFrame(raf);
  }

  let userReady = false;
  function primeVideo(v: HTMLVideoElement | null) {
    if (!isMobile() || !v) return;
    try { const p = v.play(); if (p && p.then) p.then(() => { try { v.pause(); } catch (e) { /* noop */ } }).catch(() => {}); }
    catch (e) { /* noop */ }
  }
  function onFirstGesture() {
    if (userReady) return;
    userReady = true;
    SEGMENTS.forEach(s => primeVideo(s.video));
  }

  // [DARYL adaptation] every listener registered through a registry so destroy()
  // can remove them (upstream adds anonymous listeners it can never remove).
  const onWin = (ev: string, fn: any, opts?: any) => { window.addEventListener(ev, fn, opts); winListeners.push([ev, fn, opts]); };
  onWin('pointerdown', onFirstGesture, { once: true, passive: true });
  onWin('touchstart', onFirstGesture, { once: true, passive: true });
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(read); } };
  onWin('scroll', onScroll, { passive: true });
  function onResize() {
    if (coarse && window.innerWidth === laidOutW) return;
    layout();
  }
  onWin('resize', onResize);
  onWin('orientationchange', layout);
  onWin('load', layout);
  layout();
  rafId = requestAnimationFrame(raf);

  // ---- [DARYL adaptation] full teardown (upstream returns nothing) ----
  const handle: ScrollWorldHandle = {
    destroy() {
      if (destroyed) return;
      destroyed = true;
      cancelAnimationFrame(rafId);
      winListeners.forEach(([ev, fn, opts]) => window.removeEventListener(ev, fn as any, opts));
      docListeners.forEach(([ev, fn, opts]) => document.removeEventListener(ev, fn as any, opts));
      SEGMENTS.forEach(s => { if (s.video) { try { s.video.pause(); s.video.removeAttribute('src'); s.video.load(); } catch (e) { /* noop */ } } });
      blobUrls.forEach(u => { try { URL.revokeObjectURL(u); } catch (e) { /* noop */ } });
      blobUrls.length = 0;
      created.forEach(n => { try { container.removeChild(n); } catch (e) { /* noop */ } });
      container.classList.remove('sw-root');
      delete (container as any)._swMounted;
      delete (container as any)._swHandle;
      const style = document.getElementById('sw-css');
      if (style) style.remove();
    },
  };
  (container as any)._swHandle = handle;
  return handle;
}

// ---- helpers (upstream verbatim) ----
function el(tag: string, cls?: string) { const n = document.createElement(tag); if (cls) n.className = cls; return n; }
function esc(s: any) { return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' } as any)[c]); }

function injectCSS() {
  if (document.getElementById('sw-css')) return;
  // [DARYL adaptation] vs upstream CSS: (1) the `html,body{...}` global rule is
  // REMOVED (no global leakage — the host route owns page background/overflow);
  // (2) topbar/brand/nav/copy/CTA/particle rules dropped with their DOM;
  // (3) DARYL dark tokens as defaults. Everything else is upstream's, verbatim.
  const css = `
  .sw-root{--sw-bg:#0A0B0C;--sw-ink:#F1F2F4;--sw-ink-soft:#8A8F98;--sw-accent:#E8B87A;
    --sw-font-display:Inter,system-ui,sans-serif;
    --sw-font-body:Inter,system-ui,sans-serif;
    color:var(--sw-ink);font-family:var(--sw-font-body);}
  .sw-sky{position:fixed;inset:0;z-index:0;overflow:hidden;pointer-events:none;background:var(--sw-bg);}
  .sw-sky__grad{position:absolute;inset:-10%;background:linear-gradient(178deg,color-mix(in srgb,var(--sw-accent) 6%,var(--sw-bg)) 0%,var(--sw-bg) 55%,color-mix(in srgb,var(--sw-accent) 3%,var(--sw-bg)) 100%);}
  .sw-sky__glow{position:absolute;inset:0;background:radial-gradient(60% 42% at 50% 60%,color-mix(in srgb,var(--sw-accent) 10%,transparent),transparent 70%);}
  .sw-scrollbar{position:fixed;top:0;left:0;right:0;height:2px;z-index:60;background:color-mix(in srgb,var(--sw-accent) 12%,transparent);}
  .sw-scrollbar span{display:block;height:100%;width:100%;transform-origin:0 50%;transform:scaleX(0);background:var(--sw-accent);}
  .sw-stage{position:fixed;inset:0;z-index:10;pointer-events:none;}
  .sw-scene{position:absolute;inset:0;opacity:0;overflow:hidden;will-change:opacity;}
  .sw-scene__video,.sw-scene__still{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 42%;}
  .sw-scene__still{will-change:transform;} .sw-scene.has-clip .sw-scene__still{opacity:0;} .sw-scene__video{z-index:1;}
  .sw-route{position:fixed;right:clamp(14px,2.4vw,30px);top:50%;z-index:40;transform:translateY(-50%);display:flex;flex-direction:column;gap:22px;padding:18px 10px;}
  .sw-route::before{content:"";position:absolute;left:50%;top:22px;bottom:22px;width:2px;transform:translateX(-50%);background:var(--sw-accent);opacity:.28;}
  .sw-route__dot{position:relative;border:0;background:transparent;cursor:pointer;width:14px;height:14px;display:grid;place-items:center;}
  .sw-route__dot i{width:9px;height:9px;border-radius:50%;background:color-mix(in srgb,var(--sw-accent) 40%,transparent);transition:transform .3s,background .3s,box-shadow .3s;}
  .sw-route__dot:hover i{transform:scale(1.25);background:var(--sw-accent);}
  .sw-route__dot:focus-visible{outline:2px solid var(--sw-accent);outline-offset:3px;border-radius:50%;}
  .sw-route__dot.is-active i{background:var(--sw-accent);transform:scale(1.4);box-shadow:0 0 0 5px color-mix(in srgb,var(--sw-accent) 22%,transparent);}
  .sw-route__label{position:absolute;right:24px;top:50%;transform:translateY(-50%) translateX(6px);white-space:nowrap;font-size:.78rem;font-weight:600;color:var(--sw-ink);background:color-mix(in srgb,#000 65%,transparent);backdrop-filter:blur(6px);padding:5px 11px;border-radius:999px;opacity:0;pointer-events:none;transition:opacity .25s,transform .25s;border:1px solid color-mix(in srgb,var(--sw-accent) 14%,transparent);}
  .sw-route__dot:hover .sw-route__label,.sw-route__dot.is-active .sw-route__label{opacity:1;transform:translateY(-50%) translateX(0);}
  .sw-hint{position:fixed;left:50%;bottom:26px;z-index:30;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:10px;font-size:.76rem;letter-spacing:.14em;text-transform:uppercase;color:var(--sw-ink-soft);transition:opacity .3s;}
  .sw-hint i{width:22px;height:34px;border-radius:12px;border:2px solid color-mix(in srgb,var(--sw-ink) 28%,transparent);position:relative;}
  .sw-hint i::after{content:"";position:absolute;left:50%;top:7px;width:4px;height:7px;border-radius:2px;background:var(--sw-accent);transform:translateX(-50%);animation:sw-wheel 1.7s ease-in-out infinite;}
  @keyframes sw-wheel{0%{opacity:0;top:6px}40%{opacity:1}100%{opacity:0;top:17px}}
  .sw-track{position:relative;z-index:1;width:100%;pointer-events:none;}
  @media (max-width:860px){
    .sw-scene__video,.sw-scene__still{object-position:center 46%;}
    .sw-hint{bottom:calc(20px + env(safe-area-inset-bottom));}
    .sw-route{gap:16px;right:6px;} .sw-route__label{display:none;}
  }
  @media (max-width:860px) and (orientation:portrait){
    .sw-scene__video,.sw-scene__still{object-position:center 44%;}
  }
  @media (hover:none) and (pointer:coarse){
    .sw-route{padding:14px 6px;}
    .sw-route__dot{width:28px;height:28px;}
  }
  @media (prefers-reduced-motion:reduce){ .sw-hint i::after{animation:none;} }
  `;
  const style = document.createElement('style'); style.id = 'sw-css';
  style.textContent = '@layer sw {\n' + css + '\n}';
  document.head.appendChild(style);
}
