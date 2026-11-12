/**
 * app.js — CyberNova · Shell Logic
 * P1 scope: router, nav active state, home renderer, stub renderer, footer, toast
 *
 * Teammates: drop your page renderer into the matching render* function below.
 * Every function already receives the route string so you can do sub-routing inside.
 */

'use strict';

/* ═══════════════════════════════════════════════════════════
   ROUTER
═══════════════════════════════════════════════════════════ */

/** Parse hash → route string  e.g. "#modules" → "modules" */
function getRoute() {
  return (window.location.hash || '#').slice(1).replace(/^\//, '') || '';
}

/** Programmatic navigation — safe on both file:// and http:// */
function navigate(route) {
  window.location.hash = route ? '#' + route : '#';
  // scroll reset — use 'instant' to avoid file:// glitch
  window.scrollTo({ top: 0, behavior: 'instant' });
}

/** Called on every hashchange + DOMContentLoaded */
function render() {
  const route   = getRoute();
  const parts   = route.split('/');
  const page    = parts[0];

  updateNavActive(page);

  const app = document.getElementById('app');
  if (!app) return;

  let html = '';

  switch (page) {
    case '':
    case 'home':
      html = renderHome(); break;

    /* ── teammate slots ─────────────────────────────────── */
    case 'modules':  html = renderModules(parts);    break;
    case 'labs':     html = renderLabs(parts);       break;
    case 'sims':     html = renderSims(parts);       break;
    case 'cases':    html = renderCases(parts);      break;
    case 'videos':   html = renderVideos(parts);     break;
    case 'progress': html = renderProgress(parts);   break;

    default:
      html = renderStub('❓', 'Not Found', 'This page does not exist.', '', 'P1 — Shell');
  }

  app.innerHTML = html;
}

/* ═══════════════════════════════════════════════════════════
   NAV HELPERS
═══════════════════════════════════════════════════════════ */

function updateNavActive(page) {
  document.querySelectorAll('.nav-link[data-route]').forEach(el => {
    const isActive = el.dataset.route === page ||
                     (page === '' && el.dataset.route === '');
    el.toggleAttribute('aria-current', isActive);
  });
}

function updateNavPoints() {
  const pts = parseInt(localStorage.getItem('cn_points') || '0', 10);
  const el  = document.getElementById('nav-points-val');
  if (el) el.textContent = pts.toLocaleString() + ' pts';
}

/* ═══════════════════════════════════════════════════════════
   HOME PAGE  (P1 — your work)
═══════════════════════════════════════════════════════════ */

function renderHome() {
  return /* html */`
    <!-- ── HERO ───────────────────────────────────────── -->
    <section class="hero" id="hero" aria-label="Hero section">
      <div class="hero-bg" aria-hidden="true"></div>
      <div class="hero-grid" aria-hidden="true"></div>
      <div class="hero-scan" aria-hidden="true"></div>
      <div class="hero-orb hero-orb-1" aria-hidden="true"></div>
      <div class="hero-orb hero-orb-2" aria-hidden="true"></div>
      <div class="hero-orb hero-orb-3" aria-hidden="true"></div>

      <div class="hero-badge" role="status">
        <span class="dot" aria-hidden="true"></span>
        Free for Students
      </div>

      <h1 class="hero-title">
        <span class="word">Master</span><br>
        <span class="word grad">Cyber&nbsp;Forensics</span><br>
        <span class="word">&amp;&nbsp;Cyber&nbsp;Law</span>
      </h1>

      <p class="hero-sub">
        A gamified learning platform for law students — interactive simulations,
        forensic labs, and Indian cyber law grounded in the IT Act 2000 &amp; DPDP Act 2023.
      </p>

      <!-- Terminal block -->
      <div class="hero-terminal" role="img" aria-label="Forensic terminal demo">
        <div class="t-line"><span class="t-prompt">$</span><span class="t-cmd">cybernova --scan evidence.img</span></div>
        <div class="t-line"><span class="t-prompt">›</span><span class="t-out">SHA-256 hash computed &nbsp; ✓</span></div>
        <div class="t-line"><span class="t-prompt">›</span><span class="t-out">Order of volatility checked &nbsp; ✓</span></div>
        <div class="t-line"><span class="t-prompt">›</span><span class="t-out">File signatures verified &nbsp; ✓</span></div>
        <div class="t-line"><span class="t-prompt">›</span><span class="t-out">Chain of custody sealed &nbsp; ✓</span></div>
        <div class="t-line"><span class="t-prompt">›</span><span class="t-cmd">Evidence integrity: <strong>CLEAN</strong> &nbsp;<span class="t-cursor"></span></span></div>
      </div>

      <div class="hero-cta">
        <button id="cta-modules" class="btn-primary" onclick="navigate('modules')">
          📚 Start Learning
        </button>
        <button id="cta-labs" class="btn-secondary" onclick="navigate('labs')">
          🔬 Forensic Labs
        </button>
      </div>

      <div class="hero-stats" role="list" aria-label="Platform statistics">
        ${HERO_STATS.map(s => /* html */`
          <div class="hero-stat" role="listitem">
            <div class="num" aria-label="${s.num} ${s.label}">${s.num}</div>
            <div class="label">${s.label}</div>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- ── FEATURE CARDS ───────────────────────────────── -->
    <section class="page route-enter" aria-label="Platform features">
      <div class="section-header">
        <div class="eyebrow">What's Inside</div>
        <h2 class="section-title">Everything You Need</h2>
        <p class="section-desc">
          CyberNova combines legal doctrine with hands-on forensic simulations —
          learn Indian cyber law by doing, not just reading.
        </p>
      </div>

      <div class="cards-grid" role="list" id="cards-grid">
        ${FEATURE_CARDS.map((card, i) => /* html */`
          <article
            class="feature-card"
            role="listitem"
            id="card-${card.id}"
            onclick="navigate('${card.route}')"
            tabindex="0"
            onkeydown="if(event.key==='Enter'||event.key===' ')navigate('${card.route}')"
            aria-label="${card.title}"
          >
            <div class="card-inner-scan" aria-hidden="true"></div>
            <div class="corner-accent" aria-hidden="true"></div>
            <span class="card-num" aria-hidden="true">0${i + 1}</span>
            <span class="fc-icon" aria-hidden="true">${card.icon}</span>
            <span class="fc-tag" style="
              background:${card.color}18;
              color:${card.color};
              border:1px solid ${card.color}30;
            ">${card.tag}</span>
            <div class="fc-title">${card.title}</div>
            <p class="fc-desc">${card.desc}</p>
            <div class="fc-footer">
              <span>${card.meta}</span>
              <span class="fc-arrow" style="color:${card.color}" aria-hidden="true">→</span>
            </div>
          </article>
        `).join('')}
      </div>
    </section>
  `;
}

/* ═══════════════════════════════════════════════════════════
   TEAMMATE STUB RENDERER
   Drop your renderXxx() inside the matching function.
═══════════════════════════════════════════════════════════ */

/**
 * Renders a "coming soon" placeholder for a teammate's page.
 * @param {string} icon   emoji
 * @param {string} title  page title
 * @param {string} desc   description
 * @param {string} route  page route (for back button)
 * @param {string} owner  team member label
 */
function renderStub(icon, title, desc, route, owner) {
  return /* html */`
    <div class="page route-enter">
      <div class="stub-page">
        <div class="stub-icon" aria-hidden="true">${icon}</div>
        <div class="stub-owner">Built by: ${owner}</div>
        <h1 class="stub-title">${title}</h1>
        <p class="stub-desc">${desc}</p>
        <div style="margin-top:36px">
          <button class="btn-secondary" onclick="navigate('')">← Back to Home</button>
        </div>
      </div>
    </div>
  `;
}

/* ── Teammate hooks ─────────────────────────────────────── */

/** P2 + P3 — Law Modules (Group A & B) */
function renderModules(parts) {
  // TODO: teammate fills this in
  return renderStub(
    '📚', 'Law Modules',
    'IT Act doctrine + 36 interactive quiz drills — coming from the P2/P3 team.',
    'modules', 'P2/P3 — Modules A & B'
  );
}

/** P4 + P5 — Forensic Labs 1-6 */
function renderLabs(parts) {
  // TODO: teammate fills this in
  return renderStub(
    '🔬', 'Forensic Labs',
    'Six hands-on forensic simulations — coming from the P4/P5 team.',
    'labs', 'P4/P5 — Labs 1-6'
  );
}

/** P6 — Investigation Simulations */
function renderSims(parts) {
  // TODO: teammate fills this in
  return renderStub(
    '🕵️', 'Investigations',
    'Three scored cybercrime scenario simulations — coming from the P6 team.',
    'sims', 'P6 — Sims'
  );
}

/** P7 — Landmark Cases */
function renderCases(parts) {
  // TODO: teammate fills this in
  return renderStub(
    '⚖️', 'Landmark Cases',
    '12 landmark Indian cyber law cases — coming from the P7 team.',
    'cases', 'P7 — Cases & Videos'
  );
}

/** P7 — Video Library */
function renderVideos(parts) {
  // TODO: teammate fills this in
  return renderStub(
    '🎬', 'Video Library',
    'Expert-led lecture videos — coming from the P7 team.',
    'videos', 'P7 — Cases & Videos'
  );
}

/** P7 — Progress & Gamification */
function renderProgress(parts) {
  // TODO: teammate fills this in
  return renderStub(
    '📊', 'My Progress',
    'Points, badges and leaderboard — coming from the P7 team.',
    'progress', 'P7 — Progress & Gamification'
  );
}

/* ═══════════════════════════════════════════════════════════
   TOAST
═══════════════════════════════════════════════════════════ */

function showToast(msg, type = 'info', duration = 3000) {
  const root = document.getElementById('toast-root');
  if (!root) return;
  const el = document.createElement('div');
  el.className = `toast toast-${type}`;
  el.setAttribute('role', 'status');
  el.setAttribute('aria-live', 'polite');
  el.textContent = msg;
  root.appendChild(el);
  setTimeout(() => {
    el.style.transition = 'opacity 0.3s';
    el.style.opacity    = '0';
    setTimeout(() => el.remove(), 320);
  }, duration);
}

/* ═══════════════════════════════════════════════════════════
   MOBILE MENU
═══════════════════════════════════════════════════════════ */

function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const btn  = document.getElementById('hamburger-btn');
  if (!menu) return;
  const isOpen = menu.classList.toggle('open');
  if (btn) btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}

function closeMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const btn  = document.getElementById('hamburger-btn');
  if (menu) menu.classList.remove('open');
  if (btn)  btn.setAttribute('aria-expanded', 'false');
}

/* ═══════════════════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════
   3-D CARD TILT  (P1 — visual polish)
═══════════════════════════════════════════════════════════ */

function init3DTilt() {
  const cards = document.querySelectorAll('.feature-card');
  const MAX   = 12; // max tilt degrees

  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect   = card.getBoundingClientRect();
      const cx     = rect.left + rect.width  / 2;
      const cy     = rect.top  + rect.height / 2;
      const dx     = (e.clientX - cx) / (rect.width  / 2);
      const dy     = (e.clientY - cy) / (rect.height / 2);
      const rotX   = -dy * MAX;
      const rotY   =  dx * MAX;
      card.style.transform =
        `perspective(700px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.55s cubic-bezier(0.22,1,0.36,1)';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s linear';
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  updateNavPoints();
  render();
  init3DTilt();

  window.addEventListener('hashchange', () => {
    closeMobileMenu();
    window.scrollTo({ top: 0, behavior: 'instant' }); // fix for file:// context
    render();
    // Re-attach tilt after new page renders
    requestAnimationFrame(init3DTilt);
  });

  // Close mobile menu on outside click
  document.addEventListener('click', e => {
    const menu = document.getElementById('mobile-menu');
    const btn  = document.getElementById('hamburger-btn');
    if (menu && menu.classList.contains('open') &&
        !menu.contains(e.target) && e.target !== btn) {
      closeMobileMenu();
    }
  });
});
