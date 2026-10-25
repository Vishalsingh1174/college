// =========================================================
//  PORTFOLIO SCRIPT
// =========================================================

const navHeight = 68; // navbar ki height (px), scroll ke liye

// ---------- 1. MOBILE MENU ----------
const menuBtn = document.querySelector('.menu-btn');
const menu = document.getElementById('menu');

function setMenu(open) {
  menu.classList.toggle('open', open);
  menuBtn.setAttribute('aria-expanded', String(open));
}
menuBtn.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

// ---------- 2. SMOOTH SCROLL (speed yahan se control hoti hai) ----------
// ★ SCROLL SPEED: ye number milliseconds mein hai. Jitna bada number, utna DHEERE scroll hoga.
//   1000 = normal | 1800 = dheema (abhi ka) | 3000 = bahut dheema | 600 = tez
const SCROLL_DURATION = 1200;

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let scrollFrame = null; // chal rahe animation ko rokne ke liye

// Start se target tak SCROLL_DURATION ms mein dheere-dheere scroll karta hai
function smoothScrollTo(targetY) {
  cancelAnimationFrame(scrollFrame);
  if (reduceMotion) { window.scrollTo(0, targetY); return; }

  const startY = window.scrollY;
  const distance = targetY - startY;
  const startTime = performance.now();
  // easing: shuru aur end mein halka dheema, beech mein thoda tez (natural lagta hai)
  const ease = t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  function step(now) {
    const t = Math.min((now - startTime) / SCROLL_DURATION, 1);
    window.scrollTo(0, startY + distance * ease(t));
    if (t < 1) scrollFrame = requestAnimationFrame(step);
  }
  scrollFrame = requestAnimationFrame(step);
}

// Agar user beech mein khud mouse/touch se scroll kare to animation ruk jaata hai
['wheel', 'touchstart'].forEach(evt =>
  window.addEventListener(evt, () => cancelAnimationFrame(scrollFrame), { passive: true })
);

// "#about" jaise links par click karne par us section tak scroll hoga
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const id = link.getAttribute('href');
    const target = id.length > 1 ? document.querySelector(id) : null;
    if (!target) return;
    e.preventDefault();
    setMenu(false);
    smoothScrollTo(target.getBoundingClientRect().top + window.scrollY - navHeight);
  });
});

// ---------- 3. ACTIVE NAV LINK ----------
// Scroll karte waqt jo section screen par hai, uska link highlight hota hai
const navLinks = menu.querySelectorAll('a');
const sections = document.querySelectorAll('header[id], section[id]');

const spy = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + entry.target.id));
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
sections.forEach(s => spy.observe(s));

// ---------- 4. SCROLL REVEAL (cards dheere se upar aate hain) ----------
const revealEls = document.querySelectorAll('.card, .panel, .stat, .head, .contact-list, form');
revealEls.forEach(el => el.classList.add('reveal'));

const reveal = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('show'); obs.unobserve(entry.target); }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => reveal.observe(el));

// ---------- 5. SKILL BARS ----------
// Har bar ka data-level (HTML mein) padhkar width set karta hai
const barObs = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.dataset.level + '%';
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });
document.querySelectorAll('.track i').forEach(bar => barObs.observe(bar));

// ---------- 6. PROJECT FILTER ----------
const chips = document.querySelectorAll('.chip');
const projectCards = document.querySelectorAll('#project-grid .card');

chips.forEach(chip => {
  chip.addEventListener('click', () => {
    chips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    projectCards.forEach(card => {
      const show = chip.dataset.filter === 'all' || card.dataset.cat === chip.dataset.filter;
      card.classList.toggle('hide', !show);
    });
  });
});

// ---------- 7. PHOTO FALLBACK ----------
// Agar images/photo.jpg nahi mili to photo hat jaati hai aur initials dikhte hain
document.querySelectorAll('.photo-box img').forEach(img => {
  const remove = () => img.remove();
  if (img.complete && img.naturalWidth === 0) remove();
  img.addEventListener('error', remove);
});

// ---------- 8. CONTACT FORM ----------
const MY_EMAIL = 'you@example.com'; // ★ APNA EMAIL YAHAN LIKHO

const form = document.getElementById('contact-form');
const formMsg = document.getElementById('form-msg');

form.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) { formMsg.textContent = 'Please fill in all fields.'; return; }
  if (!/^\S+@\S+\.\S+$/.test(email)) { formMsg.textContent = 'Please enter a valid email address.'; return; }

  formMsg.textContent = '';
  const subject = encodeURIComponent('Portfolio message from ' + name);
  const body = encodeURIComponent(message + '\n\nFrom: ' + name + ' (' + email + ')');
  window.location.href = 'mailto:' + MY_EMAIL + '?subject=' + subject + '&body=' + body;
  form.reset();
});

// ---------- 9. BACK TO TOP BUTTON ----------
const toTop = document.getElementById('to-top');
window.addEventListener('scroll', () => toTop.classList.toggle('show', window.scrollY > 500), { passive: true });
toTop.addEventListener('click', () => smoothScrollTo(0)); // upar jaane par bhi wahi speed

// ---------- 10. FOOTER YEAR ----------
document.getElementById('year').textContent = new Date().getFullYear();