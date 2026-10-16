(function () {
  /* Jemné objavovanie sekcií pri posúvaní */
  var els = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    els.forEach(function (el) { io.observe(el); });
  } else { els.forEach(function (el) { el.classList.add('is-in'); }); }

  /* Hlavička dostane jemný tieň po odscrollovaní */
  var header = document.querySelector('.pd-header');
  /* Na mobile sa hlavička pri posúvaní nadol schová a pri posúvaní nahor sa vráti */
  var mobile = window.matchMedia('(max-width: 860px)'), lastY = window.scrollY, ticking = false;
  var update = function () {
    var y = Math.max(0, window.scrollY), dy = y - lastY;
    header.classList.toggle('is-scrolled', y > 8);
    if (!mobile.matches || y < 80 || header.contains(document.activeElement)) header.classList.remove('is-hidden');
    else if (dy > 6) header.classList.add('is-hidden');
    else if (dy < -6) header.classList.remove('is-hidden');
    if (Math.abs(dy) > 6 || y < 80) lastY = y;
    ticking = false;
  };
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  header.addEventListener('focusin', function () { header.classList.remove('is-hidden'); });
  update();

  /* Mobilná lišta: skrytá, kým je vidieť hlavné tlačidlo v úvode alebo sekcia Kontakt / pätička */
  var bar = document.querySelector('.pd-bar'), cta = document.querySelector('.pd-hero .pd-btn--primary');
  var zones = [cta, document.getElementById('kontakt'), document.querySelector('.pd-footer')].filter(Boolean);
  if (bar && zones.length && 'IntersectionObserver' in window) {
    var seen = new Map();
    var apply = function () {
      var hide = false; seen.forEach(function (v) { if (v) hide = true; });
      bar.classList.toggle('pd-bar--hidden', hide); bar.inert = hide; bar.setAttribute('aria-hidden', hide ? 'true' : 'false');
    };
    bar.classList.add('pd-bar--hidden');
    var bo = new IntersectionObserver(function (entries) { entries.forEach(function (e) { seen.set(e.target, e.isIntersecting); }); apply(); });
    zones.forEach(function (z) { bo.observe(z); });
  }

  /* Otázky: otvorená môže byť len jedna */
  var faqs = document.querySelectorAll('.pd-faq details');
  faqs.forEach(function (d) {
    d.addEventListener('toggle', function () { if (d.open) faqs.forEach(function (o) { if (o !== d) o.open = false; }); });
  });
})();

/* SMS do poradovníka (mobil) – text podľa voľby návštevníka */
(function () {
  var f = document.querySelector('[data-sms]'); if (!f) return;
  var num = '+421903270662', link = f.querySelector('[data-sms-link]'), prev = f.querySelector('[data-sms-preview]'), done = f.querySelector('[data-sms-done]');
  var opt = { call: 'Keď sa uvoľní termín, pokojne mi zavolajte.', sms: 'Keď sa uvoľní termín, napíšte mi prosím SMS.', jan: 'Pokojne počkám, kým sa vám uvoľní miesto.' };
  function text() {
    var c = f.querySelector('input[name=kontakt]:checked'), m = (f.meno.value || '').trim().slice(0, 60);
    return 'Dobrý deň, mám záujem o pedikúru. Prosím, zapíšte si ma do poradovníka. ' + opt[c ? c.value : 'call'] + ' Meno: ' + m;
  }
  function upd() { var t = text(); prev.textContent = t; link.href = 'sms:' + num + '?&body=' + encodeURIComponent(t); }
  f.addEventListener('input', upd); f.addEventListener('change', upd); f.addEventListener('submit', function (e) { e.preventDefault(); });
  link.addEventListener('click', function () { if (done) done.hidden = false; });
  upd();
})();
