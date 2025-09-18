// Utility: select helpers
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

// Init current year in footer
document.addEventListener('DOMContentLoaded', () => {
  const y = new Date().getFullYear();
  const el = document.getElementById('year');
  if (el) el.textContent = y;
});

// Mobile nav toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggle = $('.nav-toggle');
  const nav = $('#site-nav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
});

// Slider logic
document.addEventListener('DOMContentLoaded', () => {
  const viewport = $('.slider__viewport');
  if (!viewport) return;
  const slides = $$('.slide', viewport);
  const prevBtn = $('.slider__control--prev', viewport);
  const nextBtn = $('.slider__control--next', viewport);
  const dotsWrap = $('.slider__dots', viewport);
  let index = slides.findIndex(s => s.classList.contains('is-active'));
  if (index < 0) index = 0;

  // Create dots
  slides.forEach((_, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('role', 'tab');
    b.setAttribute('aria-label', `Go to slide ${i + 1}`);
    b.addEventListener('click', () => go(i));
    dotsWrap.appendChild(b);
  });

  const dots = $$('.slider__dots button', viewport);

  function go(i) {
    slides[index].classList.remove('is-active');
    slides[i].classList.add('is-active');
    dots[index]?.setAttribute('aria-selected', 'false');
    dots[i]?.setAttribute('aria-selected', 'true');
    index = i;
  }

  function next() { go((index + 1) % slides.length); }
  function prev() { go((index - 1 + slides.length) % slides.length); }

  prevBtn?.addEventListener('click', prev);
  nextBtn?.addEventListener('click', next);

  // Keyboard support
  viewport.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  });
  viewport.setAttribute('tabindex', '0');

  // Auto-advance with pause on hover
  let timer = setInterval(next, 4000);
  viewport.addEventListener('mouseenter', () => clearInterval(timer));
  viewport.addEventListener('mouseleave', () => (timer = setInterval(next, 4000)));

  // Initialize dots state
  dots[index]?.setAttribute('aria-selected', 'true');
});

// Contact form validation
document.addEventListener('DOMContentLoaded', () => {
  const form = $('#contact-form');
  if (!form) return;
  const name = $('#name');
  const email = $('#email');
  const message = $('#message');
  const nameErr = $('#name-error');
  const emailErr = $('#email-error');
  const msgErr = $('#message-error');
  const success = $('#form-success');

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  function validate() {
    let ok = true;
    // Name
    if (!name.value.trim() || name.value.trim().length < 2) {
      nameErr.textContent = 'Please enter your name (min 2 chars).';
      ok = false;
    } else {
      nameErr.textContent = '';
    }
    // Email
    if (!emailRe.test(email.value.trim())) {
      emailErr.textContent = 'Please enter a valid email address.';
      ok = false;
    } else {
      emailErr.textContent = '';
    }
    // Message
    if (!message.value.trim() || message.value.trim().length < 10) {
      msgErr.textContent = 'Message should be at least 10 characters.';
      ok = false;
    } else {
      msgErr.textContent = '';
    }
    return ok;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    success.hidden = true;
    if (!validate()) return;

    // Simulate submission by saving to localStorage
    const payload = {
      name: name.value.trim(),
      email: email.value.trim(),
      subject: $('#subject')?.value.trim() || '',
      message: message.value.trim(),
      ts: new Date().toISOString(),
    };
    try {
      const key = 'contact_messages';
      const prev = JSON.parse(localStorage.getItem(key) || '[]');
      prev.push(payload);
      localStorage.setItem(key, JSON.stringify(prev));
    } catch {}

    success.hidden = false;
    form.reset();
  });

  // Inline validation on blur
  [name, email, message].forEach((el) => el.addEventListener('blur', validate));
});

