/* PedeDiva – súhlas s cookies (Google Analytics 4 + Microsoft Clarity)
   ---------------------------------------------------------------
   1) Doplňte svoje ID nižšie. Kým sú tam „XXXX“, nič sa nenačíta.
   2) Analytické nástroje sa spustia AŽ po súhlase návštevníka.
   3) Voľbu si pamätáme 6 mesiacov (localStorage, kľúč „pd_consent“).
*/
(function () {
  var GA_ID = 'G-3EKP7FF8SV';        // Google Analytics 4 – Measurement ID
  var CLARITY_ID = 'yxmdclzer4';     // Microsoft Clarity – Project ID
  var KEY = 'pd_consent';
  var MAX_AGE = 1000 * 60 * 60 * 24 * 182; // ~6 mesiacov

  var gaReady = GA_ID.indexOf('XXXX') === -1;
  var clarityReady = CLARITY_ID.indexOf('XXXX') === -1;

  /* ---------- úložisko voľby ---------- */
  function read() {
    try {
      var v = JSON.parse(localStorage.getItem(KEY));
      if (v && Date.now() - v.at < MAX_AGE) return v;
    } catch (e) {}
    return null;
  }
  function write(analytics) {
    var v = { analytics: !!analytics, at: Date.now(), v: 1 };
    try { localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) {}
    return v;
  }

  /* ---------- Google Consent Mode v2: všetko zamietnuté, kým nepovieš áno ---------- */
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  gtag('consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied', wait_for_update: 500 });

  var loaded = false;
  function loadAnalytics() {
    if (loaded) return; loaded = true;
    gtag('consent', 'update', { analytics_storage: 'granted' });
    if (gaReady) {
      var s = document.createElement('script');
      s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
      document.head.appendChild(s);
      gtag('js', new Date());
      gtag('config', GA_ID);
    }
    if (clarityReady) {
      (function (c, l, a, r, i, t, y) {
        c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
        t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i;
        y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
      })(window, document, 'clarity', 'script', CLARITY_ID);
      window.clarity('consentv2', { ad_Storage: 'denied', analytics_Storage: 'granted' });
    }
  }
  function clearAnalyticsCookies() {
    var names = document.cookie.split(';').map(function (c) { return c.split('=')[0].trim(); });
    var host = location.hostname, parts = host.split('.');
    var domains = ['', host, '.' + host];
    if (parts.length > 2) domains.push('.' + parts.slice(-2).join('.'));
    names.forEach(function (n) {
      if (/^_ga|^_gid|^_gat|^_clck|^_clsk/.test(n)) {
        domains.forEach(function (d) {
          document.cookie = n + '=; Max-Age=0; path=/' + (d ? '; domain=' + d : '');
        });
      }
    });
  }

  /* ---------- rozhranie ---------- */
  var banner, dialog, toggle;
  function el(html) { var d = document.createElement('div'); d.innerHTML = html.trim(); return d.firstChild; }

  function build() {
    banner = el(
      '<section class="pd-cookie" role="region" aria-label="Súhlas s cookies" hidden>' +
        '<p class="pd-cookie__title">Malá otázka, kým začnete</p>' +
        '<p class="pd-cookie__text">Web používa nevyhnutné cookies, aby fungoval. Ak dovolíte, zapnem aj analytické nástroje Google Analytics a Microsoft Clarity – vďaka nim vidím, či sa vám na stránke dobre hľadá. Nič z toho nepoužívam na reklamu. <a href="ochrana-osobnych-udajov.html#cookies">Viac o cookies</a></p>' +
        '<div class="pd-cookie__actions">' +
          '<button type="button" class="pd-btn pd-btn--primary" data-c="all">Povoliť všetky</button>' +
          '<button type="button" class="pd-btn pd-btn--secondary" data-c="none">Odmietnuť všetky</button>' +
          '<button type="button" class="pd-btn pd-btn--text" data-c="edit">Upraviť nastavenia</button>' +
        '</div>' +
      '</section>');

    dialog = el(
      '<dialog class="pd-consent" aria-labelledby="pd-consent-h">' +
        '<form method="dialog" class="pd-consent__in">' +
          '<h2 id="pd-consent-h" class="pd-h3">Nastavenia cookies</h2>' +
          '<p class="pd-consent__lead">Vyberte si, čo môže web ukladať. Svoju voľbu môžete kedykoľvek zmeniť v pätičke stránky cez „Nastavenia cookies“.</p>' +
          '<div class="pd-consent__cat">' +
            '<div class="pd-consent__row"><h3>Nevyhnutné</h3><span class="pd-consent__always">Vždy zapnuté</span></div>' +
            '<p>Potrebné na to, aby web fungoval a zapamätal si vašu voľbu o cookies. Nedajú sa vypnúť.</p>' +
            '<details><summary>Čo presne ukladáme</summary><table><tr><th>Názov</th><th>Účel</th><th>Doba</th></tr>' +
              '<tr><td>pd_consent</td><td>Vaša voľba o cookies (lokálne úložisko prehliadača)</td><td>6 mesiacov</td></tr></table></details>' +
          '</div>' +
          '<div class="pd-consent__cat">' +
            '<div class="pd-consent__row"><h3>Analytické</h3>' +
              '<label class="pd-switch"><input type="checkbox" id="pd-consent-analytics"><span class="pd-switch__ui" aria-hidden="true"></span><span class="pd-sr">Povoliť analytické cookies</span></label></div>' +
            '<p>Pomáhajú mi pochopiť, ako sa web používa – ktoré časti čítate, odkiaľ prichádzate a kde sa stránka zle ovláda. Údaje sú súhrnné a nepoužívam ich na reklamu.</p>' +
            '<details><summary>Čo presne ukladáme</summary><table><tr><th>Názov</th><th>Nástroj</th><th>Doba</th></tr>' +
              '<tr><td>_ga</td><td>Google Analytics – rozlíšenie návštevníkov</td><td>2 roky</td></tr>' +
              '<tr><td>_ga_*</td><td>Google Analytics – udržanie relácie</td><td>2 roky</td></tr>' +
              '<tr><td>_clck</td><td>Microsoft Clarity – ID návštevníka a nastavenia</td><td>1 rok</td></tr>' +
              '<tr><td>_clsk</td><td>Microsoft Clarity – spojenie zobrazení do jednej návštevy</td><td>1 deň</td></tr>' +
              '<tr><td>CLID, MUID, MR, SM, ANONCHK</td><td>Microsoft Clarity – cookies tretej strany (doména clarity.ms / bing.com)</td><td>do 1 roka</td></tr>' +
            '</table></details>' +
          '</div>' +
          '<div class="pd-consent__actions">' +
            '<button type="submit" class="pd-btn pd-btn--secondary" value="save">Uložiť výber</button>' +
            '<button type="submit" class="pd-btn pd-btn--primary" value="all">Povoliť všetky</button>' +
          '</div>' +
          '<button type="submit" class="pd-consent__close" value="close" aria-label="Zavrieť">×</button>' +
        '</form>' +
      '</dialog>');

    document.body.appendChild(banner);
    document.body.appendChild(dialog);
    toggle = dialog.querySelector('#pd-consent-analytics');

    banner.addEventListener('click', function (e) {
      var b = e.target.closest('[data-c]'); if (!b) return;
      var c = b.getAttribute('data-c');
      if (c === 'all') decide(true);
      else if (c === 'none') decide(false);
      else openSettings();
    });
    dialog.addEventListener('close', function () {
      var r = dialog.returnValue;
      if (r === 'all') decide(true);
      else if (r === 'save') decide(toggle.checked);
    });
  }

  function showBanner(show) {
    banner.hidden = !show;
    document.documentElement.classList.toggle('pd-cookie-open', show);
  }
  function openSettings() {
    var cur = read();
    toggle.checked = cur ? cur.analytics : false;
    dialog.returnValue = '';
    if (typeof dialog.showModal === 'function') dialog.showModal(); else dialog.setAttribute('open', '');
  }
  function decide(analytics) {
    var prev = read();
    write(analytics);
    showBanner(false);
    if (analytics) loadAnalytics();
    else if (prev && prev.analytics) {
      if (window.clarity) window.clarity('consentv2', { ad_Storage: 'denied', analytics_Storage: 'denied' });
      gtag('consent', 'update', { analytics_storage: 'denied' });
      clearAnalyticsCookies();
      location.reload();
    }
  }

  function init() {
    build();
    var cur = read();
    if (cur) { if (cur.analytics) loadAnalytics(); }
    else showBanner(true);
    document.addEventListener('click', function (e) {
      var a = e.target.closest('[data-cookie-settings]');
      if (a) { e.preventDefault(); openSettings(); }
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
