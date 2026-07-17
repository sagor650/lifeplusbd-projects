/* ═══════════════════════════════════════════════
   VirtuTour Dashboard – app.js
   360° 3D Virtual Tours · Map Automation
   ═══════════════════════════════════════════════ */

'use strict';

// ─── DATA ───────────────────────────────────────
const HOTELS = {
  'pan-pacific': {
    id: 'pan-pacific',
    name: 'Pan Pacific Sonargaon',
    subtitle: 'Grand Suite · 360° panoramic walk-through',
    img: 'assets/pan_pacific_suite.png',
  },
  intercontinental: {
    id: 'intercontinental',
    name: 'InterContinental Lobby',
    subtitle: 'Grand Lobby & Atrium – 360° Panoramic Tour',
    img: 'assets/intercontinental_lobby.png',
  },
  radisson: {
    id: 'radisson',
    name: 'Radisson Blu Poolside',
    subtitle: 'Rooftop Infinity Pool – 360° Walk-Through',
    img: 'assets/radisson_poolside.png',
  },
  sheraton: {
    id: 'sheraton',
    name: 'Sheraton Grand Ballroom',
    subtitle: 'Event Ballroom – Immersive Space Preview',
    img: 'assets/sheraton_ballroom.png',
  },
};

const BOOKINGS = [
  {
    id: 'BK-001', day: '12', mon: 'OCT',
    name: 'Grand Suite – Dhaka',
    hotel: 'Pan Pacific Sonargaon',
    meta: 'GUEST: ALEX_999  |  DUR: 45M  |  360_TOUR',
    status: 'confirmed', vrTag: true,
    suite: 'Grand Suite · Dhaka',
  },
  {
    id: 'BK-002', day: '14', mon: 'OCT',
    name: 'Sea View Executive – Cox\'s Bazar',
    hotel: 'Radisson Blu',
    meta: 'GUEST: SARAH_K  |  DUR: 1H 30M  |  360_TOUR',
    status: 'pending', vrTag: true,
    suite: 'Sea View Executive',
  },
  {
    id: 'BK-003', day: '18', mon: 'OCT',
    name: 'Presidential Suite – Gulshan',
    hotel: 'InterContinental',
    meta: 'GUEST: MR_RAHMAN  |  DUR: 2H  |  360_TOUR',
    status: 'confirmed', vrTag: true,
    suite: 'Presidential Suite',
  },
  {
    id: 'BK-004', day: '21', mon: 'OCT',
    name: 'Deluxe King Room – Banani',
    hotel: 'Sheraton Grand',
    meta: 'GUEST: NADIA_F  |  DUR: 30M  |  360_TOUR',
    status: 'pending', vrTag: false,
    suite: 'Deluxe King Room',
  },
  {
    id: 'BK-005', day: '25', mon: 'OCT',
    name: 'Honeymoon Suite – Sylhet',
    hotel: 'Pan Pacific',
    meta: 'GUEST: COUPLE_01  |  DUR: 1H  |  360_TOUR',
    status: 'confirmed', vrTag: true,
    suite: 'Honeymoon Suite',
  },
];

// Tour projects — each 360° tour, its auto-generated scenes/hotspots + map link status
const STREAMS = [
  { id: 'S1', hotel: 'Pan Pacific Sonargaon', status: 'live', scenes: 24, hotspots: 146, visitors: 1284, img: 'assets/pan_pacific_suite.png' },
  { id: 'S2', hotel: 'InterContinental Dhaka', status: 'live', scenes: 18, hotspots: 92, visitors: 437, img: 'assets/intercontinental_lobby.png' },
  { id: 'S3', hotel: 'Radisson Blu Chattogram', status: 'buffering', scenes: 12, hotspots: 54, visitors: 88, img: 'assets/radisson_poolside.png' },
  { id: 'S4', hotel: 'Sheraton Grand Ballroom', status: 'idle', scenes: 0, hotspots: 0, visitors: 0, img: 'assets/sheraton_ballroom.png' },
  { id: 'S5', hotel: "Cox's Bazar Beach Resort", status: 'idle', scenes: 0, hotspots: 0, visitors: 0, img: '' },
  { id: 'S6', hotel: 'Sylhet Tea Estate Villa', status: 'live', scenes: 31, hotspots: 210, visitors: 652, img: '' },
];


// ─── DOM HELPERS ────────────────────────────────
const $ = id => document.getElementById(id);
const qs = sel => document.querySelector(sel);
const qsa = sel => document.querySelectorAll(sel);

// ─── NAVIGATION ─────────────────────────────────
let currentSection = 'hotel-previews';

function switchSection(sectionId) {
  qsa('.section').forEach(s => s.classList.remove('active'));
  qsa('.nav-item').forEach(n => n.classList.remove('active'));
  qsa('.tab-btn').forEach(t => t.classList.remove('active'));

  const section = document.getElementById(`section-${sectionId}`);
  if (section) section.classList.add('active');

  const navItem = document.querySelector(`.nav-item[data-section="${sectionId}"]`);
  if (navItem) navItem.classList.add('active');

  const tab = document.querySelector(`.tab-btn[data-tab="${sectionId}"]`);
  if (tab) tab.classList.add('active');

  currentSection = sectionId;
}

qsa('.nav-item').forEach(item => {
  item.addEventListener('click', e => {
    e.preventDefault();
    switchSection(item.dataset.section);
  });
});

qsa('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => switchSection(btn.dataset.tab));
});

$('viewAllBookings')?.addEventListener('click', e => {
  e.preventDefault();
  switchSection('bookings');
});

// ─── RENDER: BOOKING ROWS (HERO PANEL) ──────────
function renderMiniBookings() {
  const list = $('bookingsList');
  if (!list) return;
  list.innerHTML = '';
  BOOKINGS.slice(0, 3).forEach(b => {
    const row = document.createElement('div');
    row.className = 'booking-row';
    row.innerHTML = `
      <div class="booking-date">
        <span class="bdate-day">${b.day}</span>
        <span class="bdate-mon">${b.mon}</span>
      </div>
      <div class="booking-info">
        <div class="booking-name">${b.name}</div>
        <div class="booking-meta">${b.meta}</div>
      </div>
      <button class="booking-status-btn ${b.status}">${b.status === 'confirmed' ? 'CONFIRMED' : 'PENDING'}</button>
    `;
    list.appendChild(row);
  });
}

// ─── RENDER: FULL BOOKINGS TABLE ────────────────
function renderFullBookings() {
  const container = $('bookingsFullList');
  if (!container) return;

  const headerRow = document.createElement('div');
  headerRow.className = 'full-booking-header-row';
  headerRow.innerHTML = `<span>DATE</span><span>SPACE</span><span>TOUR</span><span>CATEGORY</span><span>STATUS</span>`;
  container.innerHTML = '';
  container.appendChild(headerRow);

  BOOKINGS.forEach(b => {
    const row = document.createElement('div');
    row.className = 'full-booking-row';
    row.innerHTML = `
      <div class="full-date-badge">
        <span class="fd-day">${b.day}</span>
        <span class="fd-mon">${b.mon}</span>
      </div>
      <div>
        <div class="full-booking-name">${b.name}</div>
        <div class="full-booking-detail">${b.meta}</div>
      </div>
      ${b.vrTag ? '<span class="vr-tag">360° TOUR</span>' : '<span></span>'}
      <span class="suite-pill">${b.suite}</span>
      <button class="booking-status-btn ${b.status}">${b.status === 'confirmed' ? 'CONFIRMED' : 'PENDING'}</button>
    `;
    container.appendChild(row);
  });
}

// ─── RENDER: STREAMS GRID ────────────────────────
function renderStreams() {
  const grid = $('streamsGrid');
  if (!grid) return;
  grid.innerHTML = '';
  STREAMS.forEach(s => {
    const card = document.createElement('div');
    card.className = 'stream-card glass-card';
    const statusLabel = s.status === 'live' ? 'PUBLISHED' : s.status === 'buffering' ? 'PROCESSING' : 'DRAFT';
    const imgHtml = s.img
      ? `<img src="${s.img}" alt="${s.hotel} 360° tour thumbnail" />`
      : `<div style="width:100%;height:100%;background:linear-gradient(135deg,#e0e7ef,#f0f4ff);display:grid;place-items:center;color:#8C95A6;font-size:0.7rem;font-weight:600;">NO TOUR YET</div>`;
    card.innerHTML = `
      <div class="stream-card-header">
        <span class="stream-card-title">${s.hotel}</span>
        <span class="stream-status-pill ${s.status}">${statusLabel}</span>
      </div>
      <div class="stream-thumb">${imgHtml}</div>
      <div class="stream-stats">
        <div class="stream-stat"><span>SCENES</span><strong>${s.scenes || '—'}</strong></div>
        <div class="stream-stat"><span>HOTSPOTS</span><strong>${s.hotspots || '—'}</strong></div>
        <div class="stream-stat"><span>VISITORS</span><strong>${(s.visitors || 0).toLocaleString()}</strong></div>
      </div>
    `;
    grid.appendChild(card);
  });
}


// ─── HOTEL CARD SWITCHING ───────────────────────
let activeHero = 'pan-pacific';

function switchHero(hotelKey) {
  const hotel = HOTELS[hotelKey];
  if (!hotel) return;
  activeHero = hotelKey;

  const heroImg = $('heroImg');
  const heroTitle = $('heroTitle');
  const heroSubtitle = $('heroSubtitle');

  heroImg.style.opacity = '0';
  setTimeout(() => {
    heroImg.src = hotel.img;
    heroImg.alt = `${hotel.name} 360° virtual tour`;
    heroTitle.textContent = hotel.name;
    heroSubtitle.textContent = hotel.subtitle;
    heroImg.style.opacity = '1';
    heroImg.style.transition = 'opacity 0.4s ease';
  }, 200);
}

qsa('.card-stream-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    const hotel = btn.dataset.hotel;
    switchHero(hotel);
    showToast('🎬', `Opened ${HOTELS[hotel]?.name || hotel} tour`);
  });
});

qsa('.hotel-preview-card').forEach(card => {
  card.addEventListener('click', () => {
    const hotel = card.dataset.hotel;
    switchHero(hotel);
  });
});

// ─── VR MODAL ────────────────────────────────────
const vrModal = $('vrModal');

function openVrModal() {
  const hotel = HOTELS[activeHero] || HOTELS['pan-pacific'];
  $('modalTitle').textContent = `VR Preview · ${hotel.name}`;
  $('modalDesc').textContent = `Loading 360° panorama scenes for ${hotel.subtitle}…`;
  $('streamPreviewImg').src = hotel.img;

  vrModal.classList.add('open');
  vrModal.setAttribute('aria-hidden', 'false');

  // Simulate stream loading
  $('streamLoading').style.display = 'flex';
  $('streamReady').classList.add('hidden');

  setTimeout(() => {
    $('streamLoading').style.display = 'none';
    $('streamReady').classList.remove('hidden');
    $('hudFps').textContent = `${Math.floor(60 + Math.random() * 30)} fps`;
    showToast('✅', '360° tour loaded');
  }, 2200);
}

function closeVrModal() {
  vrModal.classList.remove('open');
  vrModal.setAttribute('aria-hidden', 'true');
}

$('launchVrBtn')?.addEventListener('click', openVrModal);
$('modalClose')?.addEventListener('click', closeVrModal);
$('modalEndStream')?.addEventListener('click', () => {
  closeVrModal();
  showToast('⏹', 'Tour closed');
});
$('modalConfirmBooking')?.addEventListener('click', () => {
  closeVrModal();
  showToast('🏨', 'Booking confirmed! Suite reserved.');
  switchSection('bookings');
});

vrModal.addEventListener('click', e => {
  if (e.target === vrModal) closeVrModal();
});

// ─── STREAM CONFIG ───────────────────────────────
$('copySignaling')?.addEventListener('click', () => {
  const val = $('signalingUrl')?.value;
  if (val) {
    navigator.clipboard?.writeText(val).catch(() => {});
    showToast('📋', 'Tour URL copied to clipboard');
  }
});

$('testConnectionBtn')?.addEventListener('click', () => {
  const bar = $('connectionStatusBar');
  if (bar) {
    bar.innerHTML = `<span class="conn-dot" style="background:var(--accent-amber)"></span><span class="conn-text">Building interactive map preview…</span>`;
    setTimeout(() => {
      bar.innerHTML = `<span class="conn-dot green"></span><span class="conn-text">Map preview ready · 24 scenes auto-linked · ${146} hotspots</span>`;
      showToast('🗺️', 'Interactive map generated from tour scenes');
    }, 1800);
  }
});

$('applyConfigBtn')?.addEventListener('click', () => {
  showToast('⚙️', 'Tour published · map linked');
});

$('newStreamBtn')?.addEventListener('click', () => {
  showToast('📡', 'Auto-linking scenes to map…');
});

$('newBookingBtn')?.addEventListener('click', () => {
  showToast('📅', 'New virtual booking form opening…');
});

// ─── SYNC HEADSET ────────────────────────────────
$('syncBtn')?.addEventListener('click', () => {
  const btn = $('syncBtn');
  btn.style.opacity = '0.7';
  btn.textContent = 'SYNCING…';
  setTimeout(() => {
    btn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M23 4v6h-6M1 20v-6h6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      SYNC MAP DATA`;
    btn.style.opacity = '1';
    showToast('🗺️', 'Map data synced · 24 scenes · 146 hotspots');
  }, 1500);
});

// ─── LIVE METRICS TICKER ─────────────────────────
function animateMetrics() {
  // TOUR_SCENES + MAP_HOTSPOTS + PANORAMA_RES stay stable (set in HTML);
  // VISITORS_TODAY + avg time-on-tour tick live.
  const viewersVal = $('viewersVal');
  const viewersSub = $('viewersSub');

  setInterval(() => {
    const visitors = Math.floor(1200 + Math.random() * 220);
    const avgMin = (2.8 + Math.random() * 1.4).toFixed(1);
    if (viewersVal) viewersVal.textContent = visitors.toLocaleString();
    if (viewersSub) viewersSub.textContent = `AVG ${avgMin} MIN/TOUR`;
  }, 3000);
}

// ─── TOAST ───────────────────────────────────────
function showToast(icon, message, duration = 3500) {
  const container = $('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span class="toast-icon">${icon}</span><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('fade-out');
    toast.addEventListener('animationend', () => toast.remove());
  }, duration);
}


// ─── SEARCH ──────────────────────────────────────
$('searchInput')?.addEventListener('input', e => {
  const val = e.target.value.toLowerCase();
  if (val.length > 1) showToast('🔍', `Searching for "${e.target.value}"…`);
});

// ─── NOTIFICATION ────────────────────────────────
$('notifBtn')?.addEventListener('click', () => {
  showToast('🔔', '3 new virtual booking requests · View Bookings');
});

// ─── INIT ────────────────────────────────────────
function init() {
  renderMiniBookings();
  renderFullBookings();
  renderStreams();
  animateMetrics();
  // Greet
  setTimeout(() => showToast('🌐', 'Bangladesh · VirtuTour Online · 360° tours ready'), 600);
}

document.addEventListener('DOMContentLoaded', init);
