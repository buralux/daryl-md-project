/* ============================================================================
   section-scrub — Scroll World adapté en COUCHE D'ARRIÈRE-PLAN INTÉGRÉE
   ----------------------------------------------------------------------------
   Dérivé du moteur amont (MIT © 2026 cyw) :
     https://github.com/oso95/scroll-world @ f941ef93eec785f08634d5f42fb2cbd652dd06c6
     (notice complète : voir client/src/world-lab/scrub-engine.ts sur la branche
      experiment/scroll-world, et docs/website/SCROLL_WORLD_PROVENANCE.md)

   REPRIS de l'amont (inchangé) : chargement Blob toujours-seekable, scrub
   currentTime avec lissage 0.18, coalescing des seeks (jamais de seek pendant
   `seeking`), eps grossier sur mobile, variantes -m.mp4 sur pointeur grossier /
   ≤860px, posters sous la vidéo, chemin reduced-motion = AUCUN clip chargé.

   CHANGÉ (l'intention produit) : le moteur ne possède PLUS le défilement.
   - pas de .sw-track (aucune hauteur de page synthétique) ;
   - la progression de chaque scène est calculée depuis la POSITION RÉELLE des
     sections sémantiques de la page (start/end sélecteurs) ;
   - pas de dots, pas de hint, pas de skip, pas de topbar : la page reste la page ;
   - couche fixe DERRIÈRE le contenu (z bas, pointer-events:none, aria-hidden),
     opacité en fondu aux bords de chaque fenêtre de scène ;
   - teardown complet (rAF, listeners, Blob URLs) comme notre adaptation world-lab.
   ========================================================================== */

/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IntegratedScene {
  /** data-testid du premier et du dernier élément de la fenêtre de scène. */
  start: string;
  end: string;
  clip: string;
  clipMobile?: string;
  poster: string;
}

export interface SectionScrubHandle { destroy: () => void; }

export function mountSectionScrub(container: HTMLElement, scenes: IntegratedScene[]): SectionScrubHandle {
  if ((container as any)._ssMounted) return (container as any)._ssHandle;
  (container as any)._ssMounted = true;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarse = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  const smallMQ = window.matchMedia('(max-width: 860px)');
  const isMobile = () => coarse || smallMQ.matches;

  let destroyed = false;
  let rafId = 0;
  const blobUrls: string[] = [];
  const winListeners: Array<[string, any, any?]> = [];

  const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
  const smooth = (x: number) => { x = clamp(x); return x * x * (3 - 2 * x); };

  // ---- couches de scène (poster + vidéo), dans le conteneur fixe hôte ----
  const S: any[] = scenes.map(sc => {
    const layer = document.createElement('div');
    layer.className = 'wi-scene';
    const img = document.createElement('img');
    img.className = 'wi-media'; img.alt = ''; img.decoding = 'async'; (img as any).loading = 'lazy';
    img.src = sc.poster;
    layer.appendChild(img);
    container.appendChild(layer);
    return { ...sc, el: layer, img, video: null as HTMLVideoElement | null,
             hasClip: false, loading: false, ready: false, cur: 0, target: 0, visible: false,
             ws: 0, we: 1 };
  });

  // ---- fenêtres depuis le DOM RÉEL (recalculées au resize / après rendu) ----
  function layout() {
    if (destroyed) return;
    const vh = window.innerHeight;
    S.forEach(s => {
      const a = document.querySelector(`[data-testid="${s.start}"]`) as HTMLElement | null;
      const b = document.querySelector(`[data-testid="${s.end}"]`) as HTMLElement | null;
      if (!a || !b) { s.ws = -1; s.we = -1; return; } // section absente : scène inerte
      const top = a.getBoundingClientRect().top + window.scrollY;
      const bottom = b.getBoundingClientRect().bottom + window.scrollY;
      s.ws = Math.max(0, top - vh);               // la scène s'éveille quand la section entre
      s.we = Math.max(s.ws + 1, bottom - vh * 0.5); // et s'achève quand sa fin est bien passée
    });
    read();
  }

  function loadClip(s: any) {
    if (reduce || s.loading || !s.clip || destroyed) return;
    s.loading = true;
    const url = (isMobile() && s.clipMobile) ? s.clipMobile : s.clip;
    fetch(url).then(r => (r.ok ? r.blob() : Promise.reject(new Error('404'))))
      .then(blob => {
        if (destroyed) return;
        const v = document.createElement('video');
        v.className = 'wi-media';
        v.muted = true; v.playsInline = true; v.preload = 'auto';
        v.setAttribute('muted', ''); v.setAttribute('playsinline', '');
        const burl = URL.createObjectURL(blob);
        blobUrls.push(burl);
        v.src = burl;
        v.addEventListener('loadedmetadata', () => { s.ready = true; read(); });
        v.addEventListener('seeked', () => { s.el.classList.add('has-clip'); }, { once: true });
        v.addEventListener('loadeddata', () => { try { v.pause(); } catch (e) { /* noop */ } });
        s.el.appendChild(v); s.video = v; s.hasClip = true;
      })
      .catch(() => { s.loading = false; /* poster reste — dégradation silencieuse et honnête */ });
  }

  function read() {
    if (destroyed) return;
    const y = window.scrollY || window.pageYOffset;
    const vh = window.innerHeight;
    S.forEach(s => {
      if (s.ws < 0) { s.el.style.opacity = '0'; s.visible = false; return; }
      if (y > s.ws - 1.2 * vh && y < s.we + 1.2 * vh) loadClip(s);
      const p = clamp((y - s.ws) / (s.we - s.ws));
      s.target = p;
      // fondu doux aux bords de la fenêtre — le monde apparaît et se retire,
      // il ne "saute" jamais ; entre les fenêtres, la page respire (Phase 1).
      // Une fenêtre ancrée en haut de page (le héros) est présente dès le
      // chargement : pas de fondu d'entrée — DARYL existe déjà sous l'interface.
      const inEdge = s.ws <= 2 ? 1 : smooth(p / 0.18);
      const outEdge = smooth((1 - p) / 0.22);
      const edge = Math.min(inEdge, outEdge, 1);
      s.el.style.opacity = String(edge);
      s.visible = edge > 0.001;
    });
  }

  function raf() {
    if (destroyed) return;
    if (document.hidden) { rafId = requestAnimationFrame(raf); return; }
    const eps = isMobile() ? 0.02 : 0.008;
    S.forEach(s => {
      if (!s.hasClip || !s.ready || !s.video) return;
      if (s.video.seeking) return;
      if (!s.visible && Math.abs(s.cur - s.target) < 0.002) return;
      s.cur += (s.target - s.cur) * 0.18;
      const dur = s.video.duration || 1;
      const t = clamp(s.cur, 0, 0.999) * dur;
      if (Math.abs(s.video.currentTime - t) > eps) { try { s.video.currentTime = t; } catch (e) { /* noop */ } }
    });
    rafId = requestAnimationFrame(raf);
  }

  const onWin = (ev: string, fn: any, opts?: any) => { window.addEventListener(ev, fn, opts); winListeners.push([ev, fn, opts]); };
  let ticking = false;
  onWin('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(() => { ticking = false; read(); }); } }, { passive: true });
  onWin('resize', layout);
  onWin('load', layout);
  // Le contenu au-dessus est rendu par React : les hauteurs bougent après le mount.
  const relayouts = [250, 900, 2000].map(ms => setTimeout(layout, ms));
  layout();
  rafId = requestAnimationFrame(raf);

  const handle: SectionScrubHandle = {
    destroy() {
      if (destroyed) return;
      destroyed = true;
      cancelAnimationFrame(rafId);
      relayouts.forEach(clearTimeout);
      winListeners.forEach(([ev, fn, opts]) => window.removeEventListener(ev, fn as any, opts));
      S.forEach(s => { if (s.video) { try { s.video.pause(); s.video.removeAttribute('src'); s.video.load(); } catch (e) { /* noop */ } } });
      blobUrls.forEach(u => { try { URL.revokeObjectURL(u); } catch (e) { /* noop */ } });
      blobUrls.length = 0;
      S.forEach(s => { try { container.removeChild(s.el); } catch (e) { /* noop */ } });
      delete (container as any)._ssMounted;
      delete (container as any)._ssHandle;
    },
  };
  (container as any)._ssHandle = handle;
  return handle;
}
