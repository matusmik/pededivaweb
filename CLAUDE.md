# PedeDiva — web pedikérskeho salónu (Banská Bystrica)

Jednoduchý statický informačný web. Jediný cieľ stránky: **dostať návštevníka k rezervácii termínu**.

## Štruktúra
- `index.html` – celá stránka (jedna stránka, navigácia cez kotvy)
- `css/tokens.css` – farby, medzery, rádiusy, písma ako CSS premenné. Hodnoty meniť len tu.
- `css/style.css` – komponenty s triedami `pd-*`. Žiadne natvrdo zadané farby, len `var(--…)`.
- `img/` – skutočné fotky salónu (WebP; hero do 200 kB, ostatné do 120 kB)
- `docs/dizajn-system.md` – pravidlá dizajnu, textov, UX a predaja (Hormozi). **Prečítaj pred každou zmenou.**
- `docs/tokens.json` – zdrojové tokeny z dizajn systému
- `DOPLNIT.md` – zoznam údajov od majiteľky

## Pravidlá
- Čisté HTML + CSS, bez frameworkov a build nástrojov. JavaScript len ak je nevyhnutný.
- Texty po slovensky, vykanie, slovenská typografia (nezlomiteľná medzera po v, k, s, z, a, o, u, i a medzi číslom a jednotkou).
- Prvky `<span class="pd-ph">…</span>` sú zástupné údaje. Nahrádzať len skutočnými údajmi z `DOPLNIT.md`, nikdy nevymýšľať čísla, recenzie ani certifikáty.
- Text na `--lak` vždy `--on-lak`; značkový text (eyebrow, číslice, hviezdičky) vždy `--lak-text`, nikdy `--lak`.
- Kontrast textu min. 4.5:1, klikateľné prvky min. 48 px, mobil na prvom mieste.
- Bez pop-upov, sliderov, gradientov, emoji a fotiek z fotobánk.
- Pred odovzdaním: doplniť schema.org `LocalBusiness`, Open Graph, favicon, stránku Ochrana osobných údajov.
