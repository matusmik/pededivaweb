# PedeDiva — dizajn systém

PedeDiva je pedikérsky salón v Banskej Bystrici. Web je jednoduchá statická stránka s jedinou úlohou: **dostať návštevníka k rezervácii termínu**. Všetko na stránke buď zvyšuje chuť rezervovať, alebo znižuje dôvod nerezervovať. Čo nerobí ani jedno, nepatrí tam.

Vzhľad: teplý papier, ružový lak na nechty ako jediná výrazná plocha (s tmavou vínovou pre text), klasický serif v nadpisoch, žiadne gradienty, žiadne fotobanky, žiadne emoji. Pôsobí ako dobrý lokálny salón, nie ako šablóna.

Údaje vyznačené štýlom `.pd-ph` (ružový podklad) v ukážkach sú **zástupné** – cena, adresa, počet recenzií, hodnotenie, roky praxe. Pred spustením ich nahraďte skutočnými. Nevymýšľajte čísla, recenzie ani certifikáty.

## Predajná štruktúra (Hormozi)

### Hodnotová rovnica
Hodnota = (vysnívaný výsledok × vnímaná pravdepodobnosť úspechu) ÷ (čas čakania × námaha a obeta). Každá sekcia ťahá jeden z týchto štyroch pákov:

| Páka | Čo na webe robí | Kde |
| --- | --- | --- |
| Vysnívaný výsledok ↑ | Hovoríme o výsledku, nie o procese: „ľahké nohy bez bolesti“, nie „ponúkame pedikúru“. | `Hero` H1, `ProblemList` |
| Pravdepodobnosť ↑ | Dôkazy: hodnotenie a počet recenzií z Google, roky praxe, sterilizácia, fotka skutočnej majiteľky, záruka. | `Hero` dôkazový riadok, `Review`, `Guarantee` |
| Čas ↓ | Najbližší voľný termín priamo na stránke, rezervácia online za minútu, výsledok hneď po prvej návšteve. | `Hero` štítok `.pd-slot`, `MobileBar` |
| Námaha ↓ | Bez telefonovania, jasná cena vopred, parkovanie, čo čakať krok po kroku, odpovede na obavy. | `PriceList`, `Steps`, `FAQ`, `Contact` |

### Ponuka „Prvá návšteva“ (Grand Slam Offer)
Nová klientka nekupuje pedikúru, kupuje balík, ktorý je ťažké porovnať s konkurenciou podľa ceny.
- **Pomenovanie (MAGIC):** dôvod + pre koho + cieľ + forma, napr. „Prvá návšteva: štart pre zdravé nohy“.
- **Jadro + bonusy:** pedikúra + konzultácia, potom 2–3 bonusy s nízkymi nákladmi a vysokou vnímanou hodnotou (masáž, plán domácej starostlivosti, SMS pripomienka). Pri každej položke uveďte hodnotu v €.
- **Ukotvenie ceny:** „Hodnota spolu“ preškrtnutá, pod ňou skutočná cena vo veľkom serife.
- **Záruka:** konkrétna a bez podmienok („do 7 dní opravíme zadarmo“). Odstraňuje riziko.
- **Obmedzenie (scarcity):** len **skutočný** limit, ktorý salón dodrží (počet termínov pre nové klientky mesačne). Žiadne odpočítavacie hodiny, žiadne „posledné 2 miesta“, ak to nie je pravda.
- **Naliehavosť (urgency):** pravdivá – najbližší voľný termín, sezóna sandálov, dovolenka.

### Poradie sekcií na domovskej stránke
`Header` → `Hero` (výsledok + dôkaz + akcia) → `ProblemList` (spoznám sa) → `Offer` (neodmietnuteľná ponuka) → `PriceList` (žiadne prekvapenia) → `Steps` (je to jednoduché) → `Review` (iným to funguje) → `Guarantee` (neriskujem) → `FAQ` (posledné obavy) → `Contact` (kde a kedy) → pätička. `MobileBar` je na mobile stále viditeľná. Ukážka celku: komponent `Homepage`.

### Výzvy na akciu
- Jediná hlavná akcia: **Rezervovať termín** (`pd-btn--primary`). Opakuje sa po každej druhej sekcii, vždy s rovnakým textom alebo konkrétnejším („Chcem prvú návštevu“).
- Telefón je vedľajšia akcia (`pd-btn--text`, ikona v `MobileBar`). Nikdy nie dve lak tlačidlá vedľa seba.
- Tlačidlo vedie priamo do rezervačného systému (napr. Bookio alebo Reservio) – nie na kontaktný formulár.
- Pod tlačidlom alebo vedľa neho odstráňte poslednú obavu: „za minútu“, „bez platby vopred“, „zrušenie zadarmo 24 h vopred“.

## Obsah a tón
- Vykáme. Píšeme ako majiteľka, ktorá hovorí s klientkou pri kresle: krátke vety, konkrétne slová, prvá osoba je v poriadku („mám mesačne len 12 termínov“).
- Výsledok pred procesom: „Päty zostanú hladké týždne“, nie „Používame profesionálnu kozmetiku“.
- Konkrétne čísla namiesto prívlastkov: „60 min“, „sterilizácia v autokláve“, „4,9 ★ zo 120 recenzií“ – nie „najlepšia“, „profesionálna“, „luxusná“.
- Veľké písmená len na začiatku vety a v názvoch (sentence case). Verzálky len v štýle `eyebrow`.
- Žiadne emoji. Hviezdičky ★ iba pri hodnotení.
- Slovenská typografia: nezlomiteľná medzera po jednopísmenových predložkách a spojkách (v, k, s, z, a, o, u, i) a medzi číslom a jednotkou (`30 €`, `60 min`); pomlčka s medzerami (`9.00 – 18.00`); čas `14.00`; telefón `0900 000 000`.
- Recenzie len skutočné, doslovne skopírované z Google, s menom v tvare „Meno P.“ a súhlasom. Fotky „pred a po“ iba so súhlasom, orezané decentne.
- Zdravotné tvrdenia (diabetická noha, plesne) len v rozsahu kvalifikácie salónu.

## UX zásady
- **Mobil na prvom mieste.** Väčšina návštev príde z Google Máp na telefóne. Navrhujte najprv pre šírku 360–390px.
- **Prvá obrazovka** musí bez posúvania povedať: čo, kde, pre koho, cena/dôkaz a tlačidlo Rezervovať.
- **Klikateľné plochy** min. `tap` (48px) na výšku. Telefón je odkaz `tel:`, adresa vedie do navigácie.
- **Žiadne prekážky:** žiadne pop-upy, slidery, autoplay videá, cookie lišta cez celú obrazovku (stačí malá dole, ak vôbec treba – statická stránka bez analytiky ju nepotrebuje).
- **Rýchlosť:** statické HTML + jeden CSS, fotky WebP (hero do 200 kB, ostatné do 120 kB), `loading="lazy"` pod prvou obrazovkou, písma len s `display=swap`.
- **Konzistentné NAP** (názov, adresa, telefón) zhodne s Google profilom firmy; v kóde doplniť `LocalBusiness` schema.org.
- **Prístupnosť:** kontrast textu min. 4.5:1 (všetky páry v tokenoch ho spĺňajú), viditeľný focus `focus`, `alt` text pri každej fotke, nadpisy v poradí H1 → H2 → H3, FAQ cez natívne `<details>`.
- **Navigácia** iba kotvy na jednu stránku: Služby a ceny, Prvá návšteva, Otázky, Kontakt.

## Vizuálne základy

### Farby
- Pozadie stránky `paper`, plochy nad ním `paper-raised`. Striedanie sekcií: `paper` ↔ `blush`; záver (kontakt) na `ink`.
- Text `ink`, vedľajší text `ink-muted`. Na `ink` páse text `paper`, vedľajší `line`.
- `lak` (ružový lak) je jediná výrazná plocha: hlavné tlačidlo a bloky. Text na lak vždy `on-lak`. Max. jedno lak tlačidlo na obrazovku.
- Značkový text (`eyebrow`, číslice krokov, hviezdičky, štítky Bonus) je vždy `lak-text`, nikdy `lak` – ružová na papieri je nečitateľná.
- `moss` + `moss-tint` znamenajú dôveru a hygienu: fajky v ponuke, pečať záruky, štítok voľného termínu. Nepoužívať na dekoráciu.
- Oddeľovače `line` (dekoratívne), okraje ovládacích prvkov `line-strong`.

### Typografia
- Nadpisy `Gloock` (`--font-serif`) – elegantný serif s výrazným kontrastom ťahov, len rez 400; text `Figtree` (`--font-sans`) 400–700. Oba z Google Fonts s plnou slovenskou diakritikou.
- Gloock nikdy pod 22px (tenké ťahy sa strácajú) a nikdy nezužovať prestrkanie (písmená sa dotýkajú).
- H1 `display` (mobil 40/44), H2 `heading-1` (mobil 32/38), nadpisy kariet a cena `heading-2`. Úvod sekcie `lead`, bežný text `body`, poznámky `small`, nadtitulok `eyebrow` v `lak-text`.
- Šírka textu max. `measure` (640px). Serif nikdy pre bežný text, sans nikdy pre H1/H2.

### Priestor a rozloženie
- Obsah max. `container` (1120px), okraj `space-6` (mobil `space-4`).
- Sekcie od seba `space-28` (mobil `space-18`). Nadpis sekcie → obsah `space-12`.
- Dvojstĺpec len v hero, ponuke a kontakte; inde jeden stĺpec alebo tri rovnaké stĺpce (kroky, recenzie). Na mobile všetko pod sebou.

### Tvary, linky, tiene
- Tlačidlá a štítky `radius-pill`, karty `radius-md`, veľké fotky `radius-lg`.
- Plochy oddeľujú farby a 1px linky, nie tiene. Jediný tieň `shadow-bar` patrí mobilnej lište.
- Nepoužívať: gradienty, farebný ľavý okraj kariet, ikony v krúžkoch nad každou vetou, mriežky rovnakých kariet so štatistikami.

### Fotografie
- Skutočné fotky salónu a majiteľky pri práci, denné svetlo, teplé tóny. Žiadne fotobanky – „cudzie nohy z internetu“ znižujú dôveru.
- Hero: majiteľka pri práci, pomer 4:5 (mobil 4:3). O salóne: kreslo, sterilizátor, detail čistých nástrojov.
- Kým fotky nie sú, zobrazí sa `blush` plocha s popisom – nie náhradný obrázok.

### Pohyb
- Len prechody farieb 150 ms a otočenie „+“ v FAQ. Žiadne animácie pri posúvaní.

## Ikonografia
- Takmer bez ikon. Používa sa: telefón v `MobileBar` (obrys, ťah 1.75, 20px, farba `ink`), fajka ✓ v `moss`, hviezdičky ★ v `lak-text`, pomlčka „—“ v `lak-text` ako odrážka.
- Ak treba ďalšie (mapa, hodiny), použiť sadu Lucide v rovnakom štýle. Žiadne emoji, žiadne farebné ilustrácie.

## Logo
Logo tvorí **značka piatich prstov** a **slovné logo** „PedeDiva“ v Gloock (prevedené na krivky). Palec a „Diva“ sú ružové – na svetlom podklade `lak-logo`, na tmavom `lak`; ostatné prsty majú farbu textu. Súbory sú v skupine Logos.

- Na `paper`, `paper-raised`, `blush`: `pedediva-logo.svg` (vodorovné) alebo `pedediva-logo-stacked.svg` (na stred, napr. vizitka, plagát).
- Na `ink` a tmavých fotkách: `pedediva-inverse-*`.
- Samotná značka (`pedediva-mark.svg`) len tam, kde je názov blízko (pečiatka, vodoznak) alebo pre favicon (`pedediva-favicon.svg`) a profilovku sociálnych sietí (`pedediva-avatar.svg`).
- Výška v hlavičke webu 32px (mobil 28px), cez `.pd-logo img`. Minimálna výška vodorovného loga 20px; okolo loga voľný priestor aspoň výšky palca.
- Logo nemeniť: neotáčať, nedeformovať, nemeniť farby prstov, nepridávať tiene ani obrys, nedávať na rušnú fotku bez podkladu.

## Použitie
Každý komponent je čisté HTML s triedami `pd-*` z `components/bundle.css` nad premennými z `tokens.css`. Žiadny JavaScript nie je potrebný. Stránku zložíte skopírovaním markupu z ukážok v poradí podľa Homepage.


