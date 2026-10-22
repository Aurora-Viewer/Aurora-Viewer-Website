// Aurora Viewer website: language, latest release, news and the Aurora / Legacy demo.
// Everything here is optional: without JavaScript the page shows the values written in index.html.
(() => {
  'use strict';

  const REPO = 'Aurora-Viewer/Aurora-Viewer';
  const RELEASES_API = `https://api.github.com/repos/${REPO}/releases?per_page=20`;
  // Same feed as the viewer's login screen (crates/aurora-viewer/src/links.rs, NEWS_FEED).
  const NEWS_FEED = `https://raw.githubusercontent.com/${REPO}/main/news/`;
  const RELEASE_TTL = 60 * 60 * 1000;
  const NEWS_TTL = 30 * 60 * 1000;
  const NEWS_SHOWN = 3;

  // Strings written by this script, in both languages.
  const STR = {
    en: {
      title: 'Aurora Viewer — a modern Second Life viewer',
      'dl.linux': 'Download for Linux',
      'dl.linux-guide': 'Get it on Linux',
      mb: 'MB',
      more: 'Read more',
      allAurora: 'All windows in the Aurora layout',
      oneLegacy: '1 window in the Legacy layout',
      manyLegacy: (n) => `${n} windows in the Legacy layout`,
    },
    fr: {
      title: 'Aurora Viewer — un viewer Second Life moderne',
      'dl.linux': 'Télécharger pour Linux',
      'dl.linux-guide': 'Installer sur Linux',
      mb: 'Mo',
      more: 'En savoir plus',
      allAurora: 'Toutes les fenêtres en version Aurora',
      oneLegacy: '1 fenêtre en version Legacy',
      manyLegacy: (n) => `${n} fenêtres en version Legacy`,
    },
  };

  // French text of every [data-i18n] element; English is the page itself.
  const FR = {
    skip: 'Aller au contenu',
    'nav.features': 'Fonctionnalités',
    'nav.performance': 'Performance',
    'nav.yours': 'À votre façon',
    'nav.news': 'Actualités',
    'nav.community': 'Communauté',
    'nav.download': 'Télécharger',
    'nav.label': 'Navigation principale',
    'lang.label': 'Langue',
    'gh.label': 'Aurora Viewer sur GitHub',
    'discord.label': 'Aurora Viewer sur Discord',
    'pill.before': 'La version',
    'pill.after': 'est sortie',
    'pill.notes': 'Nouveautés',
    'hero.title': 'Second Life,<br><span class="glow-text">enfin fluide.</span>',
    'hero.lead': 'Un viewer Second Life moderne, écrit de zéro en Rust. Un rendu Vulkan, une interface apaisée, et le monde que vous connaissez déjà.',
    'dl.windows': 'Télécharger pour Windows',
    'dl.linux-guide': 'Installer sur Linux',
    'dl.linux': 'Télécharger pour Linux',
    'meta.license': 'Libre et gratuit, GPLv3',
    'alt.world': 'Aurora Viewer dans un jardin japonais, avec les fenêtres Personnes, Contrôles, Lieux, Inventaire, Performances et Conversations ouvertes',
    'float.fps': '5,2 ms par image, six fenêtres ouvertes',
    'float.photo': 'Photos jusqu’en 8K',
    'float.photo-sub': 'Profondeur de champ, caméra libre',
    'stats.label': 'En bref',
    'stats.fps': 'les images par seconde d’un viewer classique dans un magasin bondé',
    'stats.vram': 'de la mémoire vidéo pour les mêmes textures',
    'stats.instant': 'Éclair',
    'stats.tp': 'des téléportations dans une même région, sans écran de chargement',
    'stats.vulkan': 'un rendu pensé pour les cartes graphiques d’aujourd’hui',
    'perf.eyebrow': 'Performance',
    'perf.title': 'Des centaines d’images par seconde, là où il y a du monde.',
    'perf.lead': 'Votre carte graphique fait enfin le travail. Elle décide de ce qui est visible et dessine des milliers d’objets en quelques appels, pendant qu’un fil de rendu dédié enchaîne les images.',
    'perf.classic': 'Un viewer classique',
    'perf.note': 'Magasin bondé · environ 16 000 objets · même PC, même endroit',
    'perf.m1.title': 'Arriver sans figer',
    'perf.m1.text': 'Textures et meshes sont décodés en arrière-plan, directement dans la mémoire du GPU. Ce que vous regardez se télécharge en premier.',
    'perf.m2.title': 'Les lieux connus, tout de suite',
    'perf.m2.text': 'Les textures restent sur le disque, prêtes pour la carte graphique, dans environ moitié moins de mémoire vidéo.',
    'perf.m3.title': 'Il tient bon',
    'perf.m3.text': 'Une coupure réseau ne vous déconnecte plus : Aurora vous reconnecte là où vous étiez.',
    'feat.eyebrow': 'Fonctionnalités',
    'feat.title': 'Tout ce que vous connaissez, repensé pour aujourd’hui.',
    'feat.fast.title': 'Rapide, et fluide',
    'feat.fast.sub': 'Un viewer qui suit votre rythme.',
    'feat.fast.1': 'Téléportations instantanées dans une région ; les autres montrent une vraie progression',
    'feat.fast.2': 'Moins d’à-coups dans la foule, des avatars plus fluides autour de vous',
    'feat.fast.3': 'Une mémoire vidéo pleine ne fige plus le viewer',
    'feat.picture.title': 'Une image plus nette, plus riche',
    'feat.picture.sub': 'Une lumière moderne, sans changer le rendu que vous connaissez.',
    'feat.picture.1': 'Occlusion ambiante (GTAO) et ombres de contact du soleil',
    'feat.picture.2': 'Des ombres propres et des reflets qui ne scintillent plus',
    'feat.picture.3': 'Des niveaux graphiques adaptés à votre machine dès le premier lancement',
    'feat.sl.title': 'Le Second Life que vous connaissez',
    'feat.sl.sub': 'Le même monde, les mêmes règles, rien à réapprendre.',
    'feat.sl.1': 'Matériaux PBR et classiques, ciels EEP, miroirs, eau et glow',
    'feat.sl.2': 'Voix avec réduction de bruit, IM, groupes et un historique consultable',
    'feat.sl.3': 'Édition de la silhouette, gestes, un AO intégré, votre propre ciel et votre eau',
    'feat.sl.4': 'RLVa, à activer si vous le souhaitez, pour les expériences et les tenues qui s’en servent',
    'feat.ui.title': 'Une interface de son temps',
    'feat.ui.sub': 'Sobre, calme et lisible, organisée à votre façon.',
    'feat.ui.1': 'Barres en îlots de verre et un centre de notifications avec historique',
    'feat.ui.2': 'Une seule recherche pour les résidents, lieux, événements, groupes et petites annonces',
    'feat.ui.3': 'Un inventaire qui s’élargit en explorateur, des notes en Markdown',
    'upd.title': 'Mises à jour en un clic',
    'upd.text': 'Sous Windows, au lancement, Aurora propose la nouvelle version, la télécharge en arrière-plan, l’installe et relance votre session. Avant que vous acceptiez, il vous dit si votre cache et vos réglages sont conservés.',
    'upd.1': 'Téléchargée en arrière-plan',
    'upd.2': 'Vérifiée avec son empreinte publiée',
    'upd.3': 'Annulée si quoi que ce soit échoue',
    'alt.build': 'Construire dans Aurora : le panneau Transformer à côté d’un cube sélectionné, avec les fenêtres À propos du terrain, Région / Domaine, profil et voix',
    'gal.build': '<b>Construire et gérer son terrain.</b> Transformations précises, À propos du terrain, une fenêtre Région / Domaine complète et des profils riches.',
    'alt.login': 'L’écran de connexion d’Aurora sous une aurore, avec deux comptes d’avatar côte à côte et les actualités',
    'gal.login': '<b>Une nouvelle connexion.</b> Plusieurs avatars côte à côte, avec votre dernier lieu et les dernières actualités.',
    'nav.photo': 'Photo',
    'photo.eyebrow': 'Mode photo',
    'photo.title': 'Un appareil photo entre vos mains.',
    'photo.lead': 'Le mode photo s’ouvre en plein écran sous un vrai viseur : un autofocus qui trouve les visages, des bagues pour la focale, l’ouverture et l’exposition, et un histogramme en direct. Cadrez, faites la mise au point, déclenchez.',
    'alt.photo': 'Le viseur d’Aurora : règle des tiers, collimateur verrouillé sur le visage d’un avatar, manette de caméra, bague de focale et mesures d’exposition',
    'tour.eyebrow': 'De plus près',
    'tour.title': 'Des fenêtres où l’on se sent chez soi.',
    'tour.label': 'Fenêtres',
    'tour.conv': 'Conversations',
    'tour.notif': 'Notifications',
    'tour.inv': 'Inventaire',
    'tour.places': 'Lieux',
    'tour.search': 'Recherche',
    'tour.monitor': 'Moniteur de ressources',
    'tour.conv.text': 'Des conversations comme une messagerie : bulles, images, et invitations de téléportation ou cadeaux directement dans le fil.',
    'tour.notif.text': 'Un centre de notifications qui se déroule depuis la cloche, avec l’historique de tout ce que vous avez manqué.',
    'tour.inv.text': 'Un inventaire qui s’élargit en explorateur : dossiers, détails, filtres et les droits de chaque objet d’un coup d’œil.',
    'tour.places.text': 'Favoris, repères et historique dans une seule liste, avec un aperçu de chaque lieu.',
    'tour.search.text': 'Une seule recherche pour les résidents, lieux, événements, groupes et petites annonces, avec les détails à côté des résultats.',
    'tour.monitor.text': 'Un moniteur de ressources qui montre où part chaque milliseconde, chaque mégaoctet et chaque kilobit.',
    'alt.conv': 'La fenêtre Conversations : une discussion privée en bulles et une invitation de téléportation en carte',
    'alt.notif': 'Le centre de notifications déroulé depuis la cloche, avec une invitation de téléportation et un avis du simulateur',
    'alt.inv': 'L’inventaire élargi en explorateur, avec les dossiers, les droits des objets et un panneau de détails',
    'alt.places': 'La fenêtre Lieux : repères et lieux visités dans une seule liste, avec l’aperçu du lieu choisi',
    'alt.search': 'La fenêtre Rechercher : un seul champ, les types, les filtres de maturité et les détails à côté des résultats',
    'alt.monitor': 'Le moniteur de ressources : processeur, carte graphique, mémoire, réseau et disque, avec le temps d’image par tâche',
    'photo.af.title': 'Un autofocus qui trouve les visages',
    'photo.af.text': 'AF-S, AF-C ou manuel. Sur un avatar, la mise au point se verrouille entre les yeux et les suit.',
    'photo.rings.title': 'Des bagues d’objectif',
    'photo.rings.text': 'Focale, ouverture et exposition sur des bagues à faire glisser, ou à la molette.',
    'photo.dof.title': 'Une vraie profondeur de champ',
    'photo.dof.text': 'Active par défaut, avec le focus peaking en mise au point manuelle pour voir exactement ce qui est net.',
    'photo.light.title': 'La lumière sous contrôle',
    'photo.light.text': 'Un histogramme en direct, la mémorisation de l’exposition, et un niveau pour garder l’horizon droit, ou l’incliner.',
    'photo.res.title': 'Jusqu’en 8K',
    'photo.res.text': '4K par défaut, en PNG, JPEG ou BMP, sur le disque, dans l’inventaire ou sur votre profil.',
    'photo.cam.title': 'Caméra libre, retardateur',
    'photo.cam.text': 'Orbite, libre ou à la première personne, et un retardateur de 2 ou 10 secondes pour prendre la pose.',
    'yours.eyebrow': 'À votre façon',
    'yours.title': 'La nouvelle interface, ou celle que vous connaissez. Fenêtre par fenêtre.',
    'yours.lead': 'Chaque fenêtre repensée garde sa version Legacy à un clic, dans Préférences › Aurora. Essayez ici.',
    'yours.where': 'Préférences › Aurora',
    'yours.cap': 'Préférences › Aurora : un choix par fenêtre, ou tout d’un coup.',
    'alt.prefs': 'La page Aurora des Préférences, avec un choix Aurora ou Legacy pour chaque fenêtre repensée',
    'win.bars': 'Barres d’outils',
    'win.people': 'Personnes',
    'win.chat': 'Lignes du chat',
    'win.inventory': 'Inventaire',
    'win.places': 'Lieux',
    'win.search': 'Recherche',
    'win.land': 'À propos du terrain',
    'win.estate': 'Région / Domaine',
    'road.eyebrow': 'Feuille de route',
    'road.title': 'En chemin.',
    soon: 'Bientôt',
    'road.fsr.title': 'Upscaling AMD FSR',
    'road.fsr.text': 'Et son anticrénelage natif, sur toutes les marques de cartes graphiques.',
    'road.clothing.title': 'Éditeurs de vêtements',
    'road.clothing.text': 'Modifiez les textures et les couleurs de vos vêtements, et créez les vôtres.',
    'road.terrain.title': 'Terrain PBR',
    'road.terrain.text': 'Un sol à la hauteur des matériaux posés dessus.',
    'news.eyebrow': 'Actualités',
    'news.title': 'Les dernières nouvelles d’Aurora.',
    'open.eyebrow': 'Open source',
    'open.title': 'Construit au grand jour, avec ses résidents.',
    'open.gpl.title': 'Libre, sous GPLv3',
    'open.gpl.text': 'Lisez le code, compilez-le vous-même, et gardez-le libre pour tous.',
    'open.rust.title': 'Écrit en Rust',
    'open.rust.text': 'De zéro, sur wgpu et Vulkan, en parlant aux serveurs exactement comme ils l’attendent.',
    'open.testers.title': 'Façonné par ses testeurs',
    'open.testers.text': 'Signalez un bug en un clic depuis le viewer, proposez une idée, ou aidez à le traduire.',
    'open.chip': 'Accès anticipé · 0.x',
    'open.status': 'Utilisable pour explorer, discuter et tester. Certaines fonctions attendent encore leur validation sur la grille principale.',
    'open.discord': 'Rejoindre le Discord',
    'final.title': 'Entrez dans un <span class="glow-text">Second&nbsp;Life plus fluide.</span>',
    'final.lead': 'Libre, gratuit, et prêt pour votre prochaine connexion.',
    'final.dl': 'Télécharger Aurora Viewer',
    'foot.about': 'Un viewer Second Life moderne, écrit de zéro en Rust.',
    'foot.product': 'Produit',
    'foot.download': 'Télécharger',
    'foot.notes': 'Notes de version',
    'foot.roadmap': 'Feuille de route',
    'foot.project': 'Projet',
    'foot.source': 'Code source',
    'foot.bug': 'Signaler un bug',
    'foot.translate': 'Traduire',
    'foot.contribute': 'Contribuer',
    'foot.community': 'Communauté',
    'foot.copy': '© 2026 Contributeurs d’Aurora Viewer · GPLv3',
    'foot.trademark': 'Second Life est une marque de Linden Research, Inc. Aurora Viewer n’est ni affilié à Linden Lab, ni approuvé par Linden Lab.',
  };

  const store = {
    get(key) {
      try {
        const raw = localStorage.getItem(key);
        return raw === null ? null : JSON.parse(raw);
      } catch (_) {
        return null;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (_) {
        // Private mode or blocked storage: the page works without it.
      }
    },
  };

  const cached = (key, ttl) => {
    const entry = store.get(key);
    return entry && Date.now() - entry.at < ttl ? entry.value : null;
  };

  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // ---- Language -------------------------------------------------------------

  const english = new Map();
  $$('[data-i18n]').forEach((el) => english.set(el, el.innerHTML));
  const ATTRS = [['data-i18n-aria', 'aria-label'], ['data-i18n-alt', 'alt']];
  ATTRS.forEach(([marker, attr]) => $$(`[${marker}]`).forEach((el) => {
    el.setAttribute(`data-en-${attr}`, el.getAttribute(attr) || '');
  }));

  let lang = 'en';
  let release = null;

  function pickLanguage() {
    const asked = new URLSearchParams(location.search).get('lang');
    if (asked === 'fr' || asked === 'en') return asked;
    const saved = store.get('aurora-lang');
    if (saved === 'fr' || saved === 'en') return saved;
    const preferred = navigator.languages || [navigator.language || 'en'];
    return preferred.some((l) => String(l).toLowerCase().startsWith('fr')) ? 'fr' : 'en';
  }

  function applyLanguage(next) {
    lang = next;
    document.documentElement.lang = lang;
    document.title = STR[lang].title;
    $$('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      el.innerHTML = lang === 'fr' && FR[key] ? FR[key] : english.get(el);
    });
    ATTRS.forEach(([marker, attr]) => $$(`[${marker}]`).forEach((el) => {
      const key = el.getAttribute(marker);
      el.setAttribute(attr, lang === 'fr' && FR[key] ? FR[key] : el.getAttribute(`data-en-${attr}`));
    }));
    $$('[data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    renderRelease();
    renderToggleSummary();
    loadNews();
  }

  $$('[data-lang]').forEach((button) => button.addEventListener('click', () => {
    if (button.dataset.lang === lang) return;
    store.set('aurora-lang', button.dataset.lang);
    applyLanguage(button.dataset.lang);
  }));

  // ---- Latest release ---------------------------------------------------------

  function summarise(list) {
    // Releases that are not the viewer (media plugins…) do not start with "v<digit>".
    const viewer = list
      .filter((r) => !r.draft && !r.prerelease && /^v\d/.test(r.tag_name))
      .sort((a, b) => new Date(b.published_at) - new Date(a.published_at))[0];
    if (!viewer) return null;
    const asset = (re) => {
      const a = viewer.assets.find((x) => re.test(x.name) && !/\.(sha256|json|sig|asc)$/i.test(x.name));
      return a ? { url: a.browser_download_url, size: a.size } : null;
    };
    return {
      version: viewer.tag_name.replace(/^v/, ''),
      date: viewer.published_at,
      url: viewer.html_url,
      windows: asset(/windows.*\.(zip|msi|exe)$/i),
      linux: asset(/linux.*\.(tar\.(gz|xz|zst)|appimage|zip|deb|rpm)$/i),
    };
  }

  async function fetchJson(url) {
    const response = await fetch(url, { headers: { Accept: 'application/vnd.github+json' } });
    if (!response.ok) throw new Error(String(response.status));
    return response.json();
  }

  async function loadRelease() {
    release = cached('aurora-release', RELEASE_TTL);
    if (!release) {
      try {
        const list = await fetchJson(RELEASES_API);
        release = summarise(Array.isArray(list) ? list : []);
        // The list endpoint is cached at GitHub's edge and has been seen answering []:
        // fall back to the release marked latest.
        if (!release) release = summarise([await fetchJson(`https://api.github.com/repos/${REPO}/releases/latest`)]);
        if (release) store.set('aurora-release', { at: Date.now(), value: release });
      } catch (_) {
        return; // Offline or rate limited: keep the values written in the page.
      }
    }
    renderRelease();
  }

  function renderRelease() {
    $$('[data-release-date]').forEach((el) => {
      const iso = release ? release.date : el.dataset.date;
      el.textContent = new Intl.DateTimeFormat(lang, { dateStyle: 'long' }).format(new Date(iso));
      el.dataset.date = iso;
    });
    if (!release) return;
    $$('[data-version]').forEach((el) => { el.textContent = release.version; });
    $$('[data-release-link]').forEach((el) => { el.href = release.url; });
    ['windows', 'linux'].forEach((os) => {
      const file = release[os];
      if (!file) return;
      $$(`[data-dl="${os}"]`).forEach((el) => { el.href = file.url; });
      $$(`[data-dl-size="${os}"]`).forEach((el) => {
        el.textContent = `· ${Math.round(file.size / 1e6)} ${STR[lang].mb}`;
      });
    });
    if (release.linux) {
      $$('[data-dl-label="linux"]').forEach((el) => {
        el.setAttribute('data-i18n', 'dl.linux');
        english.set(el, STR.en['dl.linux']);
        el.innerHTML = STR[lang]['dl.linux'];
      });
    }
  }

  // ---- News (same Markdown files as the viewer's login screen) ---------------

  function parseNews(markdown) {
    const items = [];
    let item = null;
    markdown.replace(/<!--[\s\S]*?-->/g, '').split(/\r?\n/).forEach((raw) => {
      const line = raw.trim();
      if (line.startsWith('## ')) {
        const heading = line.slice(3).trim();
        const dated = heading.match(/^(\d{4}-\d{2}-\d{2})\s*(?:—|-|:)\s*(.*)$/);
        item = { date: dated ? dated[1] : '', title: (dated ? dated[2] : heading).slice(0, 120), paragraphs: [[]], url: '' };
        items.push(item);
        return;
      }
      if (!item) return;
      const link = line.match(/^\[[^\]]*\]\((https:\/\/[^)\s]+)\)$/);
      if (link) {
        item.url = link[1];
      } else if (!line) {
        if (item.paragraphs[item.paragraphs.length - 1].length) item.paragraphs.push([]);
      } else {
        item.paragraphs[item.paragraphs.length - 1].push(line);
      }
    });
    return items.map((it) => {
      let budget = 600;
      const paragraphs = it.paragraphs.filter((p) => p.length).map((p) => p.join(' ')).map((text) => {
        const cut = text.slice(0, Math.max(0, budget));
        budget -= cut.length;
        return cut;
      }).filter(Boolean);
      return { ...it, paragraphs };
    });
  }

  async function fetchNews(language) {
    const key = `aurora-news-${language}`;
    const hit = cached(key, NEWS_TTL);
    if (hit) return hit;
    const response = await fetch(`${NEWS_FEED}${language}.md`);
    if (!response.ok) throw new Error(String(response.status));
    const items = parseNews(await response.text());
    store.set(key, { at: Date.now(), value: items });
    return items;
  }

  let newsRequest = 0;
  async function loadNews() {
    const box = document.querySelector('[data-news]');
    if (!box) return;
    const request = ++newsRequest;
    let items;
    try {
      items = await fetchNews(lang);
    } catch (_) {
      try {
        items = await fetchNews('en'); // A language without a file shows en.md, as in the viewer.
      } catch (__) {
        return; // Keep the news written in the page.
      }
    }
    if (request !== newsRequest || !items.length) return;
    box.replaceChildren(...items.slice(0, NEWS_SHOWN).map(newsCard));
  }

  function newsCard(item) {
    const card = document.createElement(item.url ? 'a' : 'article');
    card.className = 'card ncard';
    if (item.url) card.href = item.url;
    if (item.date) {
      const time = document.createElement('time');
      time.dateTime = item.date;
      time.textContent = new Intl.DateTimeFormat(lang, { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(`${item.date}T00:00:00Z`));
      card.append(time);
    }
    const title = document.createElement('h3');
    title.textContent = item.title;
    card.append(title);
    item.paragraphs.forEach((text) => {
      const p = document.createElement('p');
      p.textContent = text;
      card.append(p);
    });
    if (item.url) {
      const more = document.createElement('span');
      more.className = 'more';
      more.textContent = `${STR[lang].more} →`;
      card.append(more);
    }
    return card;
  }

  // ---- Aurora / Legacy demo ---------------------------------------------------

  const toggles = document.querySelector('[data-toggles]');

  function renderToggleSummary() {
    const summary = document.querySelector('[data-toggle-summary]');
    if (!toggles || !summary) return;
    const n = $$('button[data-v="legacy"][aria-pressed="true"]', toggles).length;
    summary.textContent = n === 0 ? STR[lang].allAurora : n === 1 ? STR[lang].oneLegacy : STR[lang].manyLegacy(n);
  }

  if (toggles) {
    $$('.trow', toggles).forEach((row) => {
      const seg = row.querySelector('.seg');
      const name = row.querySelector('.tname');
      if (seg && name) {
        name.id = `win-${row.dataset.win}`;
        seg.setAttribute('aria-labelledby', name.id);
      }
    });
    toggles.addEventListener('click', (event) => {
      const button = event.target.closest('button[data-v]');
      if (!button) return;
      $$('button[data-v]', button.parentElement).forEach((b) => b.setAttribute('aria-pressed', String(b === button)));
      renderToggleSummary();
    });
  }

  // ---- A closer look: the tabs advance on their own until the visitor picks one ----

  const tour = document.querySelector('[data-tour]');
  if (tour) {
    const tabs = $$('[role="tab"]', tour);
    const progress = tour.querySelector('.tour-progress');
    const TOUR_MS = 6500;
    let current = 0;
    let timer = 0;
    let auto = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let visible = false;
    let paused = false;

    const schedule = () => {
      clearTimeout(timer);
      if (progress) {
        progress.classList.remove('run');
        void progress.offsetWidth; // restart the bar's animation
      }
      if (!auto || !visible || paused) return;
      if (progress) {
        progress.style.setProperty('--tour-ms', `${TOUR_MS}ms`);
        progress.classList.add('run');
      }
      timer = setTimeout(() => show(current + 1), TOUR_MS);
    };

    const show = (index, focus) => {
      current = (index + tabs.length) % tabs.length;
      tabs.forEach((tab, n) => {
        const on = n === current;
        tab.setAttribute('aria-selected', String(on));
        tab.tabIndex = on ? 0 : -1;
        const panel = document.getElementById(tab.getAttribute('aria-controls'));
        if (panel) panel.hidden = !on;
      });
      if (focus) tabs[current].focus();
      schedule();
    };

    tabs.forEach((tab, i) => tab.addEventListener('click', () => {
      auto = false;
      show(i);
    }));
    tour.querySelector('[role="tablist"]').addEventListener('keydown', (event) => {
      const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
      const jump = { Home: 0, End: tabs.length - 1 }[event.key];
      if (step === undefined && jump === undefined) return;
      event.preventDefault();
      auto = false;
      show(jump !== undefined ? jump : current + step, true);
    });
    tour.addEventListener('mouseenter', () => { paused = true; schedule(); });
    tour.addEventListener('mouseleave', () => { paused = false; schedule(); });
    tour.addEventListener('focusin', () => { paused = true; schedule(); });
    tour.addEventListener('focusout', () => { paused = false; schedule(); });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        schedule();
      }, { threshold: 0.4 }).observe(tour);
    }
  }

  // ---- Bars grow when they come into view ---------------------------------------

  const observed = $$('[data-observe]');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    }), { threshold: 0.35 });
    observed.forEach((el) => io.observe(el));
  } else {
    observed.forEach((el) => el.classList.add('in-view'));
  }

  applyLanguage(pickLanguage());
  loadRelease();
})();
