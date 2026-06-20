/* ═══════════════════════════════════════════════
   VirtuTour Dashboard – app.js
   UE5 Pixel Streaming · Hotel Interior Explorer
   ═══════════════════════════════════════════════ */

'use strict';

// ─── DATA ───────────────────────────────────────
const HOTELS = {
  'pan-pacific': {
    id: 'pan-pacific',
    name: 'Pan Pacific Sonargaon',
    subtitle: 'Grand Suite Interior – Virtual Tourism Preview',
    img: 'assets/pan_pacific_suite.png',
  },
  intercontinental: {
    id: 'intercontinental',
    name: 'InterContinental Lobby',
    subtitle: 'Grand Lobby & Atrium – 8K Fidelity Stream',
    img: 'assets/intercontinental_lobby.png',
  },
  radisson: {
    id: 'radisson',
    name: 'Radisson Blu Poolside',
    subtitle: 'Rooftop Infinity Pool – Virtual Relaxation Preview',
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
    meta: 'GUEST: ALEX_999  |  DUR: 45M  |  PIXEL_STREAM',
    status: 'confirmed', vrTag: true,
    suite: 'Grand Suite · Dhaka',
  },
  {
    id: 'BK-002', day: '14', mon: 'OCT',
    name: 'Sea View Executive – Cox\'s Bazar',
    hotel: 'Radisson Blu',
    meta: 'GUEST: SARAH_K  |  DUR: 1H 30M  |  VR_NATIVE',
    status: 'pending', vrTag: true,
    suite: 'Sea View Executive',
  },
  {
    id: 'BK-003', day: '18', mon: 'OCT',
    name: 'Presidential Suite – Gulshan',
    hotel: 'InterContinental',
    meta: 'GUEST: MR_RAHMAN  |  DUR: 2H  |  PIXEL_STREAM',
    status: 'confirmed', vrTag: true,
    suite: 'Presidential Suite',
  },
  {
    id: 'BK-004', day: '21', mon: 'OCT',
    name: 'Deluxe King Room – Banani',
    hotel: 'Sheraton Grand',
    meta: 'GUEST: NADIA_F  |  DUR: 30M  |  VR_NATIVE',
    status: 'pending', vrTag: false,
    suite: 'Deluxe King Room',
  },
  {
    id: 'BK-005', day: '25', mon: 'OCT',
    name: 'Honeymoon Suite – Sylhet',
    hotel: 'Pan Pacific',
    meta: 'GUEST: COUPLE_01  |  DUR: 1H  |  PIXEL_STREAM',
    status: 'confirmed', vrTag: true,
    suite: 'Honeymoon Suite',
  },
];

const STREAMS = [
  { id: 'S1', hotel: 'Pan Pacific Sonargaon', status: 'live', fps: 72, bitrate: '125 Mbps', viewers: 1284, img: 'assets/pan_pacific_suite.png' },
  { id: 'S2', hotel: 'InterContinental Lobby', status: 'live', fps: 60, bitrate: '98 Mbps', viewers: 437, img: 'assets/intercontinental_lobby.png' },
  { id: 'S3', hotel: 'Radisson Blu Poolside', status: 'buffering', fps: 45, bitrate: '62 Mbps', viewers: 88, img: 'assets/radisson_poolside.png' },
  { id: 'S4', hotel: 'Sheraton Ballroom', status: 'idle', fps: 0, bitrate: '—', viewers: 0, img: 'assets/sheraton_ballroom.png' },
  { id: 'S5', hotel: 'Holiday Inn Executive', status: 'idle', fps: 0, bitrate: '—', viewers: 0, img: '' },
  { id: 'S6', hotel: 'Six Seasons Penthouse', status: 'live', fps: 90, bitrate: '210 Mbps', viewers: 652, img: '' },
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
  headerRow.innerHTML = `<span>DATE</span><span>SUITE</span><span>VR</span><span>TYPE</span><span>STATUS</span>`;
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
      ${b.vrTag ? '<span class="vr-tag">VR PREVIEW</span>' : '<span></span>'}
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
    const statusLabel = s.status === 'live' ? 'LIVE' : s.status === 'buffering' ? 'BUFFERING' : 'IDLE';
    const imgHtml = s.img
      ? `<img src="${s.img}" alt="${s.hotel} stream thumbnail" />`
      : `<div style="width:100%;height:100%;background:linear-gradient(135deg,#e0e7ef,#f0f4ff);display:grid;place-items:center;color:#8C95A6;font-size:0.7rem;font-weight:600;">NO FEED</div>`;
    card.innerHTML = `
      <div class="stream-card-header">
        <span class="stream-card-title">${s.hotel}</span>
        <span class="stream-status-pill ${s.status}">${statusLabel}</span>
      </div>
      <div class="stream-thumb">${imgHtml}</div>
      <div class="stream-stats">
        <div class="stream-stat"><span>FPS</span><strong>${s.fps || '—'}</strong></div>
        <div class="stream-stat"><span>BITRATE</span><strong>${s.bitrate}</strong></div>
        <div class="stream-stat"><span>VIEWERS</span><strong>${s.viewers.toLocaleString()}</strong></div>
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
    heroImg.alt = `${hotel.name} UE5 Pixel Stream preview`;
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
    showToast('🎬', `Switched to ${HOTELS[hotel]?.name || hotel} stream`);
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
  $('modalDesc').textContent = `Connecting to UE5 signaling server for ${hotel.subtitle}…`;
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
    showToast('✅', '8K Pixel Stream established');
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
  showToast('⏹', 'Stream session ended');
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
    showToast('📋', 'Signaling URL copied to clipboard');
  }
});

$('testConnectionBtn')?.addEventListener('click', () => {
  const bar = $('connectionStatusBar');
  if (bar) {
    bar.innerHTML = `<span class="conn-dot" style="background:var(--accent-amber)"></span><span class="conn-text">Testing connection…</span>`;
    setTimeout(() => {
      bar.innerHTML = `<span class="conn-dot green"></span><span class="conn-text">Signaling server active · Bangladesh Hub · RTT ${(2 + Math.random() * 5).toFixed(1)}ms</span>`;
      showToast('🔗', 'Connection test successful · Bangladesh Hub');
    }, 1800);
  }
});

$('applyConfigBtn')?.addEventListener('click', () => {
  showToast('⚙️', 'Stream configuration applied');
});

$('newStreamBtn')?.addEventListener('click', () => {
  showToast('📡', 'New stream session initializing…');
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
      SYNC HEADSET`;
    btn.style.opacity = '1';
    showToast('🥽', `${DEVICES.length} headsets synced · Bangladesh Hub`);
  }, 1500);
});

// ─── LIVE METRICS TICKER ─────────────────────────
function animateMetrics() {
  const latencyVal = $('latencyVal');
  const throughputVal = $('throughputVal');
  const vertexVal = $('vertexVal');
  const viewersVal = $('viewersVal');
  const viewersSub = $('viewersSub');

  setInterval(() => {
    const latency = (10 + Math.random() * 8).toFixed(1);
    const throughput = Math.floor(110 + Math.random() * 30);
    const viewers = Math.floor(1200 + Math.random() * 200);
    const loadPct = Math.floor((viewers / 1600) * 100);

    if (latencyVal) latencyVal.textContent = `${latency}ms`;
    if (throughputVal) throughputVal.textContent = `${throughput}Mbps`;
    if (viewersVal) viewersVal.textContent = viewers.toLocaleString();
    if (viewersSub) {
      viewersSub.textContent = `MAX LOAD: ${loadPct}%`;
      viewersSub.style.color = loadPct > 80 ? 'var(--accent-red)' : 'var(--text-muted)';
    }
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
  setTimeout(() => showToast('🌐', 'Bangladesh Hub · NEXUS_VH Online · UE5 Ready'), 600);
}

document.addEventListener('DOMContentLoaded', init);
