// Aurora Viewer website: language, latest release, news, the window tour, the drop-down panels
// and the download page's system picker.
// Everything here is optional: without JavaScript the pages show the values written in their HTML.
(() => {
  'use strict';

  const REPO = 'Aurora-Viewer/Aurora-Viewer';
  const RELEASES_API = `https://api.github.com/repos/${REPO}/releases?per_page=20`;
  // Same feed as the viewer's login screen (crates/aurora-viewer/src/links.rs, NEWS_FEED).
  const NEWS_FEED = `https://raw.githubusercontent.com/${REPO}/main/news/`;
  const RELEASE_TTL = 60 * 60 * 1000;
  // A new key drops the answers browsers kept before the files' names and checksums were kept too.
  const RELEASE_KEY = 'aurora-release-4';
  const NEWS_TTL = 30 * 60 * 1000;
  const NEWS_SHOWN = 3;

  // Strings written by this script, in both languages.
  const STR = {
    en: {
      title: 'Aurora Viewer | A modern Second Life viewer',
      mb: 'MB',
      copied: 'Copied to the clipboard',
    },
    fr: {
      title: 'Aurora Viewer | Un viewer Second Life moderne',
      mb: 'Mo',
      copied: 'Copié dans le presse-papiers',
    },
  };

  // French text of every [data-i18n] element; English is the page itself.
  const FR = {
    skip: 'Aller au contenu',
    'nav.features': 'Fonctionnalités',
    'nav.news': 'Actualités',
    'nav.download': 'Télécharger',
    'nav.label': 'Navigation principale',
    'lang.label': 'Langue',
    'gh.label': 'Aurora Viewer sur GitHub',
    'discord.label': 'Aurora Viewer sur Discord',
    'menu.label': 'Communauté et aide',
    'menu.discord': 'Discutez avec l’équipe et les testeurs',
    'menu.feedback': 'Boîte à idées',
    'menu.feedback.sub': 'Proposez des fonctionnalités et votez pour elles',
    'menu.bug': 'Ouvrez un signalement sur GitHub',
    'menu.gh': 'Le code source, les versions et le travail en cours',
    'menu.faq': 'Aide et FAQ →',
    'fab.label': 'Aide et suggestions',
    'fab.title': 'Comment pouvons-nous vous aider ?',
    'act.idea': 'Proposer une fonctionnalité',
    'fab.discord': 'Demander sur Discord',
    'fab.gh': 'Le code source sur GitHub',
    'crumb.home': 'Accueil',
    'pill.before': 'La version',
    'pill.after': 'est sortie',
    'pill.notes': 'Nouveautés',
    'hero.title': 'Second Life,<br>enfin fluide.',
    'hero.lead': 'Un viewer Second Life moderne, écrit en Rust. Un rendu Vulkan, une interface apaisée, et le monde que vous connaissez déjà.',
    'dl.windows': 'Télécharger pour Windows',
    'dl.others': 'Linux et macOS',
    'hero.systems': 'Windows 10 / 11 · Linux x86-64 · macOS Apple Silicon',
    'meta.license': 'Libre et gratuit, GPLv3',
    'dl.experimental': 'Expérimental',
    'dl.title': 'Télécharger Aurora Viewer',
    'dl.lead': 'Choisissez votre système : le téléchargement et les étapes d’installation suivent.',
    'dl.os': 'Système d’exploitation',
    'dl.detected': 'Détecté',
    'dl.win.sub': 'Windows 10 / 11 · 64 bits',
    'dl.lin.sub': 'x86-64 · archive .tar.gz',
    'dl.mac.sub': 'Apple Silicon · macOS 13+',
    'dl.sha': 'Somme de contrôle SHA-256',
    'dl.files': 'Tous les fichiers de cette version',
    'dl.steps': 'L’installation en trois étapes',
    'dl.start': 'Lancez le viewer',
    'dl.req': 'Configuration requise',
    'dl.req.system': 'Système',
    'dl.req.graphics': 'Graphismes',
    'dl.req.cpu': 'Processeur',
    'dl.req.desktop': 'Bureau',
    'dl.req.mac': 'Mac',
    'dl.updates': 'Mises à jour',
    'dl.trouble': 'Un souci à l’installation ?',
    'dl.trouble.text': 'Consultez les réponses aux questions fréquentes, ou dites-nous ce qui n’a pas marché.',
    'dl.copy': 'Copier',
    'dl.copied': 'Copié',
    'dl.distro': 'Distribution',
    'dl.win.title': 'Aurora Viewer pour Windows',
    'dl.win.btn': 'Télécharger le .zip',
    'dl.win.1.title': 'Téléchargez l’archive',
    'dl.win.1.text': 'Cliquez sur <b>Télécharger le .zip</b> ci-dessus. Rien à installer en administrateur.',
    'dl.win.2.title': 'Extrayez-la',
    'dl.win.2.text': 'Clic droit sur le fichier › <b>Extraire tout…</b>, dans le dossier de votre choix.',
    'dl.win.3.text': 'Double-cliquez sur <code>aurora-viewer.exe</code>.',
    'dl.win.smart.title': 'Si Windows affiche « Windows a protégé votre ordinateur »',
    'dl.win.smart.text': 'Cliquez sur <b>Informations complémentaires</b>, puis sur <b>Exécuter quand même</b>. Les versions ne sont pas encore signées : <a href="/code-signing/">lisez notre politique de signature du code</a>.',
    'dl.win.req.system': 'Windows 10 ou 11, 64 bits',
    'dl.win.req.graphics': 'Une carte avec un pilote Vulkan',
    'dl.win.updates': 'Au lancement, Aurora propose la nouvelle version, la télécharge en arrière-plan, l’installe et relance votre session. Il vous dit d’abord si votre cache et vos réglages sont conservés.',
    'dl.lin.title': 'Aurora Viewer pour Linux',
    'dl.lin.btn': 'Télécharger le .tar.gz',
    'dl.lin.guide': 'Le guide Linux complet',
    'dl.lin.1.title': 'Installez les paquets du système',
    'dl.lin.1.text': 'Vulkan, le son et le fenêtrage, plus GStreamer et les bibliothèques du navigateur pour les pages web et la vidéo.',
    'dl.lin.1.driver': 'Plus le pilote Vulkan de votre carte s’il manque : <code>vulkan-radeon</code>, <code>vulkan-intel</code>, <code>mesa-vulkan-drivers</code> ou le pilote NVIDIA.',
    'dl.lin.2.title': 'Vérifiez et extrayez',
    'dl.lin.2.text': 'Placez l’archive et son fichier <code>.sha256</code> dans le même dossier, puis :',
    'dl.lin.3.text': 'Pour l’ajouter au menu de votre bureau avec son icône, suivez <a href="https://github.com/Aurora-Viewer/Aurora-Viewer/blob/main/docs/LINUX.md">les étapes de l’entrée de bureau</a>.',
    'dl.lin.req.cpu': 'PC 64 bits (x86-64)',
    'dl.lin.req.graphics': 'Un pilote Vulkan',
    'dl.lin.req.system': 'glibc 2.39 ou plus récente : Arch, CachyOS, Fedora 40+, Ubuntu 24.04+, Debian 13',
    'dl.lin.req.desktop': 'X11 ou Wayland',
    'dl.lin.updates': 'Le viewer vous prévient quand une nouvelle version sort. Extrayez la nouvelle archive comme à l’étape 2 : vos réglages, votre cache et vos journaux sont conservés.',
    'dl.mac.title': 'Aurora Viewer pour macOS',
    'dl.mac.btn': 'Télécharger le .dmg',
    'dl.mac.guide': 'Le guide macOS complet',
    'dl.mac.1.title': 'Ouvrez l’image disque',
    'dl.mac.1.text': 'Double-cliquez sur le <code>.dmg</code> dans le Finder : une fenêtre montre Aurora Viewer à côté de votre dossier Applications.',
    'dl.mac.2.title': 'Glissez-le dans Applications',
    'dl.mac.2.text': 'Glissez <b>Aurora Viewer</b> sur <b>Applications</b>, puis éjectez l’image disque.',
    'dl.mac.3.text': 'Ouvrez Aurora Viewer depuis Applications ou le Launchpad.',
    'dl.mac.gk.title': 'Si macOS ne peut pas vérifier l’application',
    'dl.mac.gk.text': 'Cliquez sur <b>Terminé</b>, ouvrez <b>Réglages Système › Confidentialité et sécurité</b>, faites défiler vers le bas et cliquez sur <b>Ouvrir quand même</b>. macOS retient ce choix. Ou, dans le Terminal :',
    'dl.mac.req.mac': 'Apple Silicon (M1 ou plus récent). Les Mac Intel ne sont pas pris en charge.',
    'dl.mac.req.system': 'macOS 13 Ventura ou plus récent',
    'dl.mac.updates': 'Le viewer vous prévient quand une nouvelle version sort. Installez la nouvelle image disque comme à l’étape 2 : vos réglages, votre cache et vos journaux sont conservés.',
    'dl.mac.new': 'macOS est pris en charge depuis peu',
    'dl.mac.new.text': 'Dites-nous ce qui ne marche pas : chaque signalement aide.',
    'dl.more': 'Autres options',
    'dl.more.build': 'Compiler depuis les sources',
    'dl.more.build.text': 'En Rust, sous Windows, Linux ou macOS.',
    'dl.more.all': 'Toutes les versions',
    'dl.more.all.text': 'Chaque version et ses notes, sur GitHub.',
    'dl.more.uninstall.text': 'Retirer le viewer et ses fichiers.',
    'dl.more.signing.text': 'Comment les versions sont construites et vérifiées.',
    'alt.world': 'Aurora Viewer dans un jardin sous les cerisiers, entre les tours d’une ville, avec les fenêtres Personnes, Contrôles, Lieux, Inventaire et Conversations ouvertes',
    'float.load': 'Chargement en parallèle',
    'float.load-sub': 'Textures et meshes décodés en arrière-plan',
    'float.photo': 'Photos jusqu’en 8K',
    'float.photo-sub': 'Filtres, effets, détourage',
    'stats.label': 'En bref',
    'stats.cores': 'Multicœur',
    'stats.threads': 'le travail réparti sur votre processeur pendant que la carte graphique dessine',
    'stats.vram': 'de la mémoire vidéo pour les mêmes textures',
    'stats.instant': 'Éclair',
    'stats.tp': 'des téléportations dans une même région, sans écran de chargement',
    'stats.vulkan': 'un rendu pensé pour les cartes graphiques d’aujourd’hui',
    'perf.eyebrow': 'Performance',
    'perf.title': 'Pensé pour chaque cœur de votre machine.',
    'perf.lead': 'Aurora répartit le travail sur votre processeur et confie le plus lourd à votre carte graphique. Pendant qu’une image est dessinée, la suivante est déjà en préparation.',
    'perf.lanes': 'Qui fait quoi, en même temps',
    'perf.l1.title': 'Le monde et l’interface',
    'perf.l1.text': 'Prépare l’image suivante',
    'perf.l2.title': 'Le dessin',
    'perf.l2.text': 'Dessine l’image en cours, avec deux aides',
    'perf.l3.title': 'Les aides de l’image',
    'perf.l3.text': 'Se partagent les grosses boucles : poses, listes de dessin',
    'perf.l4.title': 'Le décodage',
    'perf.l4.text': 'Textures et meshes, en basse priorité',
    'perf.l5.title': 'Les téléchargements',
    'perf.l5.text': 'Plusieurs à la fois, davantage tant que la connexion suit',
    'perf.l6.title': 'Visibilité et dessin',
    'perf.l6.text': 'Des milliers d’objets en quelques appels',
    'perf.m1.title': 'Arriver sans figer',
    'perf.m1.text': 'Textures et meshes sont décodés en arrière-plan, directement dans la mémoire du GPU. Ce que vous regardez se télécharge en premier.',
    'perf.m2.title': 'Les lieux connus, tout de suite',
    'perf.m2.text': 'Les textures restent sur le disque, prêtes pour la carte graphique, dans environ moitié moins de mémoire vidéo.',
    'perf.m3.title': 'Il tient bon',
    'perf.m3.text': 'Une coupure réseau ne vous déconnecte plus : Aurora vous reconnecte là où vous étiez.',
    'perf.m4.title': 'Fait pour le matériel d’aujourd’hui',
    'perf.m4.text': 'Vulkan, Metal sur macOS, la carte graphique dédiée sur un portable, et l’upscaling AMD FSR 3.1 sur toutes les marques de cartes.',
    'feat.eyebrow': 'Fonctionnalités',
    'feat.title': 'Tout ce que vous connaissez, repensé pour aujourd’hui.',
    'feat.fast.title': 'Rapide, et fluide',
    'feat.fast.sub': 'Un viewer qui suit votre rythme.',
    'feat.fast.1': 'Téléportations instantanées dans une région ; les autres montrent une vraie progression',
    'feat.fast.2': 'Moins d’à-coups dans la foule, des avatars plus fluides autour de vous',
    'feat.fast.3': 'Une mémoire vidéo pleine ne fige plus le viewer, qui reste dans le budget de votre carte',
    'feat.fast.4': 'Tout votre inventaire se charge en arrière-plan dès la connexion',
    'feat.fast.5': 'Des avatars sortis du nuage environ trois fois plus vite, et toute votre tenue portée dès la connexion',
    'feat.picture.title': 'Une image plus nette, plus riche',
    'feat.picture.sub': 'Une lumière moderne, sans changer le rendu que vous connaissez.',
    'feat.picture.1': 'Occlusion ambiante (GTAO) et ombres de contact du soleil',
    'feat.picture.2': 'Des ombres propres et des reflets qui ne scintillent plus',
    'feat.picture.3': 'Des niveaux graphiques adaptés à votre machine dès le premier lancement',
    'feat.picture.4': 'Le terrain PBR, et l’interrupteur HDR du Legacy Viewer pour qui préfère l’ancien rendu',
    'feat.sl.title': 'Le Second Life que vous connaissez',
    'feat.sl.sub': 'Le même monde, les mêmes règles, rien à réapprendre.',
    'feat.sl.1': 'Matériaux PBR et classiques, ciels EEP, miroirs, eau et glow',
    'feat.sl.2': 'Voix avec réduction de bruit, IM, groupes et un historique consultable',
    'feat.sl.3': 'Éditeurs de silhouette et de vêtements, gestes, un AO intégré, votre propre ciel et votre eau',
    'feat.sl.4': 'RLVa, à activer si vous le souhaitez, pour les expériences et les tenues qui s’en servent',
    'feat.sl.5': 'Des portails que vous ouvrez et traversez, partagés avec vos amis',
    'feat.sl.6': 'Une vue subjective avec un curseur libéré par Alt, et le réticule de votre choix',
    'feat.sl.7': 'Les grilles OpenSim et l’Hypergrid, avec un gestionnaire de grilles et un avatar cuit là où la grille ne le fait pas',
    'feat.ui.title': 'Une interface de son temps',
    'feat.ui.sub': 'Sobre, calme et lisible, organisée à votre façon.',
    'feat.ui.1': 'Barres en îlots de verre et un centre de notifications avec historique',
    'feat.ui.2': 'Une seule recherche pour les résidents, lieux, événements, groupes et petites annonces',
    'feat.ui.3': 'Un inventaire qui s’élargit en explorateur, et un second à côté',
    'feat.ui.4': 'Le mode immersif : toute l’interface masquée, sauf le chat',
    'feat.ui.5': 'Vos tenues rangées dans des dossiers, directement depuis l’Apparence',
    'feat.ui.6': 'En anglais, en français et maintenant en japonais (日本語), selon la langue de votre système',
    'feat.ui.7': 'Les plaques de vos amis à leur couleur, et un solde L$ à masquer pendant vos streams',
    'feat.ui.8': 'Les boutons de la barre d’outils du Legacy Viewer, tous là : Préférences rapides, un navigateur web, les contrôles de la voix',
    'feat.chat.title': 'Des conversations à votre façon',
    'feat.chat.sub': 'Un chat qui montre l’essentiel, sans vous encombrer.',
    'feat.chat.1': 'Détachez une conversation, ou faites-la glisser dans sa propre fenêtre',
    'feat.chat.2': 'Des aperçus pour les images, les posts Bluesky et X, et des vidéos qui se lisent dans la conversation',
    'feat.chat.3': 'Un sélecteur de GIF avec votre propre clé GIPHY ou KLIPY gratuite',
    'feat.chat.4': 'Un correcteur orthographique, les @mentions, et les gestes complétés pendant la frappe',
    'feat.chat.5': 'Une vignette par conversation à côté de la barre de chat, des bulles au-dessus des têtes si vous le voulez',
    'feat.chat.6': 'L’arabe et l’hébreu se lisent de droite à gauche, et les paiements en L$ s’affichent en carte',
    'feat.chat.7': 'Des messages sur plusieurs lignes, vos erreurs de script dans le chat local, et des points qui sautillent sur les photos',
    'feat.a11y.title': 'Pour tous les yeux',
    'feat.a11y.sub': 'Les réglages qui aident, réunis sur une page.',
    'feat.a11y.1': 'Une page Accessibilité, à un clic de l’écran de connexion',
    'feat.a11y.2': 'Une palette à contraste élevé et la police OpenDyslexic',
    'feat.a11y.3': 'Vos propres couleurs d’accent, de fond et de texte, toujours lisibles',
    'feat.a11y.4': 'Des curseurs de volume qui suivent votre oreille',
    'feat.a11y.5': 'Un texte jusqu’à deux fois plus grand',
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
    'alt.looks': 'Le panneau des filtres du mode photo : trois effets empilés (noir et blanc argentique, vieil objectif, glitch), les réglages du glitch et l’onglet Aurora avec ses sections',
    'photo.looks.cap': 'Trois effets empilés, en direct dans le viseur, chacun avec ses propres réglages.',
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
    'photo.isolate.title': 'Isolez votre sujet',
    'photo.isolate.text': 'Votre avatar seul, ou les avatars et objets que vous cliquez, sur fond transparent : un PNG prêt à l’emploi, cheveux doux compris.',
    'photo.looks.title': '66 filtres et effets',
    'photo.looks.text': 'Les 30 filtres du Legacy Viewer et 36 effets Aurora, du grain argentique à la VHS. Empilez-en jusqu’à six, chacun avec son intensité et ses propres réglages, et comparez avant et après.',
    'photo.depth.title': 'Des effets qui voient la profondeur',
    'photo.depth.text': 'Une brume qui grandit avec la distance, une vraie miniature 3D, un arrière-plan flou, le sujet mis en valeur. Et vos propres LUT .cube de Lightroom ou Resolve.',
    'photo.freeze.title': 'Figez le monde',
    'photo.freeze.text': 'Chaque avatar, animation et objet en mouvement s’immobilise pendant que votre caméra reste libre, pour trouver l’angle parfait sur une pose.',
    'photo.presets.title': 'Préréglages de caméra',
    'photo.presets.text': 'Enregistrez toute une prise de vue sous un nom et retrouvez-la en un clic : la position de la caméra, l’objectif, les filtres et la lumière.',
    'photo.quiet.title': 'Photos discrètes',
    'photo.quiet.text': 'Le déclencheur s’entend autour de vous et votre avatar prend la pose de la photo, comme dans le Legacy Viewer. Un seul réglage rend les deux discrets.',
    'photo.cam.title': 'Caméra libre, retardateur',
    'photo.cam.text': 'Orbite, libre ou à la première personne, et un retardateur de 2 ou 10 secondes pour prendre la pose.',
    'nav.create': 'Créateurs',
    'create.eyebrow': 'Outils de création',
    'create.title': 'Créez, voyez, avant même d’envoyer.',
    'create.lead': 'Votre mesh Blender s’affiche dans le viewer pendant que vous le modifiez, un poser prépare vos photos articulation par articulation, et les outils de construction ne vous gênent plus.',
    'create.live.title': 'LiveMesh',
    'create.live.text': 'Modifiez dans Blender et voyez le résultat tout de suite, sans rien envoyer. Les mesh riggés suivent votre propre avatar. Le plug-in est livré avec le viewer et s’installe tout seul, avec un squelette SL / Bento de départ et un import avec ses LOD préparés.',
    'create.objects.title': 'Objets et linksets',
    'create.objects.text': 'Les mesh statiques deviennent des objets locaux : posez-les au sol, déplacez, tournez, redimensionnez, portez-les sur le corps ou en HUD, puis détachez-les.',
    'create.poser.title': 'Un poser pour vos photos',
    'create.poser.text': 'Posez votre avatar, vos animesh ou les avatars proches qui l’acceptent, articulation par articulation. Rangez vos poses dans une bibliothèque, exportez-les en BVH ou importez-les comme animation.',
    'create.ik.title': 'L’atelier IK',
    'create.ik.text': 'Des projets de pose réutilisables qui gardent les os choisis sur leurs cibles, avec des contacts que les viewers compatibles appliquent aux avatars proches.',
    'create.build.title': 'Outils de construction',
    'create.build.text': 'Un éditeur compact que vous organisez vous-même, des aperçus de matériaux plus grands, l’aperçu de la prim que vous créez, et des contours qui restent pendant que vous déplacez. Accrochez aux objets, ou posez sur une surface avec un hologramme de l’endroit où la sélection arrive.',
    'create.area.title': 'Recherche de zone',
    'create.area.text': 'Retrouvez les objets posés autour de vous pendant que vous tapez : nom, propriétaire, créateur, groupe ou UUID, dans la parcelle ou les régions voisines. Filtrez, triez, puis inspectez, zoomez ou copiez.',
    'create.particles.title': 'Éditeur de particules',
    'create.particles.text': 'Façonnez un effet de particules sur votre prim et voyez-le en direct, puis placez-y le script correspondant. Sans écrire llParticleSystem à la main.',
    'create.anims.title': 'Explorateur d’animations',
    'create.anims.text': 'Voyez quel objet ou quel résident joue une animation sur vous, prévisualisez-la sur un avatar témoin, puis arrêtez-la, retirez les permissions de l’objet ou bloquez-la.',
    'create.menus.title': 'Des menus à votre façon',
    'create.menus.text': 'Organisez les menus du clic droit des objets, du terrain, des avatars, des attachements et des HUD, et modifiez les propriétés d’un objet depuis son profil.',
    'sky.eyebrow': 'Ciel nocturne',
    'sky.title': 'Les vraies étoiles, juste au-dessus de vous.',
    'sky.lead': 'Les 8 920 étoiles visibles à l’œil nu, à leur vraie place et dans leurs vraies couleurs, et la Voie lactée. Le ciel tourne avec la journée de la région et suit la saison du jour. Choisissez d’où, sur Terre, vous levez les yeux, de Paris à Sydney, et l’éclat des étoiles.',
    'sky.cap': 'Préférences › Graphismes › Ciel et environnement, et aussi dans Éclairage personnel. Les étoiles au hasard du Legacy Viewer restent à un clic.',
    'yours.eyebrow': 'À votre façon',
    'yours.title': 'La nouvelle interface, ou celle que vous connaissez. Fenêtre par fenêtre.',
    'yours.lead': 'Vous préférez la mise en page que vous connaissez ? Chaque fenêtre repensée garde sa version Legacy à un clic.',
    'yours.cap': 'Préférences › Aurora : un choix par fenêtre, ou tout d’un coup.',
    'alt.prefs': 'La page Aurora des Préférences, avec un choix Aurora ou Legacy pour chaque fenêtre repensée',
    'alt.sky': 'L’onglet Ciel et environnement des Préférences : d’où le ciel nocturne est vu, sa latitude et l’éclat des étoiles',
    'road.eyebrow': 'Feuille de route',
    'road.title': 'En chemin.',
    soon: 'Bientôt',
    'new.chip': 'Nouveau dans la 0.9.6',
    'new.title': 'Une vitrine pour vos tenues, 65 looks photo, de vraies étoiles.',
    'new.badge': 'Nouveau',
    'new.outfits.title': 'Une vitrine pour vos tenues',
    'new.outfits.text': 'La Galerie des tenues d’Apparence montre chaque tenue en grande photo, avec les favoris, les dossiers et le port en un clic. Portrait auto vous cadre en studio, et Faire les portraits s’occupe de toutes vos tenues d’un coup.',
    'new.luts.title': '65 looks photo intégrés',
    'new.luts.text': 'L’onglet LUT du mode photo propose 20 looks de Czar Fenris et 45 de Nanner Pudding, partagés avec tous les utilisateurs d’Aurora. Importez plusieurs fichiers .cube à la fois.',
    'new.sky.title': 'La Voie lactée des vraies étoiles',
    'new.sky.text': 'La bande du ciel nocturne est faite des 2,5 millions d’étoiles du catalogue Tycho-2, et l’Heure des étoiles peut suivre la vraie horloge. Avancé › Types de rendu masque des parties du monde, comme dans le Legacy Viewer.',
    'new.poser.title': 'Poser, construction et inventaire',
    'new.poser.text': 'Espace freine votre avatar comme dans le Legacy Viewer, le poser gagne Enregistrer sous…, les poignées de déplacement se saisissent mieux, les sélections de terrain s’alignent sur la grille des parcelles, et Favoris liste les éléments étoilés sans leurs dossiers.',
    'road.water.title': 'Une eau plus vivante, finalisée',
    'road.water.text': 'Vagues, écume, caustiques et sillages sortis de leur stade expérimental.',
    'road.updates.title': 'Mises à jour en un clic sur Mac et Linux',
    'road.updates.text': 'Aujourd’hui, le viewer indique la nouvelle version ; il l’installera pour vous, comme sous Windows.',
    'news.eyebrow': 'Actualités',
    'news.title': 'Les dernières nouvelles d’Aurora.',
    'news.all': 'Toutes les notes de version',
    'open.eyebrow': 'Open source',
    'open.title': 'Construit au grand jour, avec ses résidents.',
    'open.gpl.title': 'Libre, sous GPLv3',
    'open.gpl.text': 'Lisez le code, compilez-le vous-même, et gardez-le libre pour tous.',
    'open.rust.title': 'Écrit en Rust',
    'open.rust.text': 'Un nouveau code sur wgpu et Vulkan, pas un fork, dont les parties portées du viewer Second Life sont créditées fichier par fichier. Il parle aux serveurs exactement comme ils l’attendent.',
    'open.testers.title': 'Façonné par ses testeurs',
    'open.testers.text': 'Signalez un bug en un clic depuis le viewer, proposez une idée, ou aidez à le traduire.',
    'open.chip': 'Accès anticipé · 0.x',
    'open.status': 'Utilisable pour explorer, discuter et tester. Certaines fonctions attendent encore leur validation sur la grille principale.',
    'open.discord': 'Rejoindre le Discord',
    'help.title': 'Un bug ? Une idée ?',
    'help.bug.text': 'Ouvrez un signalement sur GitHub. Dans le viewer : <b>Signaler un bug</b>, dans la barre du haut, le menu Aide ou l’écran de connexion.',
    'help.idea.text': 'Postez une idée dans la boîte à idées, et votez pour celles que vous voulez ensuite.',
    'help.idea.btn': 'Ouvrir la boîte à idées',
    'help.ask.title': 'Demandez à la communauté',
    'help.ask.text': 'Questions, photos, tests en cours : retrouvez l’équipe et les testeurs sur Discord.',
    'help.code.title': 'Suivez le code',
    'help.code.text': 'Lisez le code, suivez le travail en cours et contribuez. Chaque version et ses notes s’y trouvent aussi.',
    'help.code.btn': 'Ouvrir GitHub',
    'final.title': 'Entrez dans un Second&nbsp;Life plus fluide.',
    'final.lead': 'Libre, gratuit, et prêt pour votre prochaine connexion.',
    'final.dl': 'Télécharger Aurora Viewer',
    'final.gh': 'Voir sur GitHub',
    'foot.about': 'Un viewer Second Life moderne, écrit en Rust.',
    'foot.product': 'Produit',
    'foot.download': 'Télécharger',
    'foot.uninstall': 'Désinstaller',
    'foot.notes': 'Notes de version',
    'foot.roadmap': 'Feuille de route',
    'foot.project': 'Projet',
    'foot.source': 'Code source',
    'foot.bug': 'Signaler un bug',
    'foot.translate': 'Traduire',
    'foot.contribute': 'Contribuer',
    'foot.privacy': 'Confidentialité',
    'foot.signing': 'Politique de signature du code',
    'foot.ai': 'Usage de l’IA',
    'foot.faq': 'Aide et FAQ',
    'foot.copy': '© 2026 Contributeurs d’Aurora Viewer · GPLv3',
    'foot.trademark': 'Ce logiciel n’est ni fourni ni pris en charge par Linden Lab, l’éditeur de Second Life. Second Life est une marque de Linden Research, Inc.',
    'sup.lead': 'Trouvez de l’aide, signalez un bug ou proposez la suite. Aurora est façonné par ses testeurs.',
    'sup.bug.text': 'Quelque chose est cassé ou ne marche pas comme prévu ? Ouvrez un signalement sur GitHub avec le formulaire de bug. Il vous faut un compte GitHub gratuit.',
    'sup.idea.text': 'Postez une idée dans la boîte à idées, et votez pour celles que vous voulez ensuite. Les idées que l’équipe retient passent sur GitHub.',
    'sup.ask.text': 'Une question sur un réglage, une photo à partager, un test en cours : l’équipe et les testeurs sont sur Discord.',
    'sup.before': 'Avant de signaler',
    'sup.before.1.title': 'Vérifiez votre version',
    'sup.before.1.a': 'La dernière est la',
    'sup.before.1.b': 'Votre problème est peut-être déjà corrigé : <a href="/download/">téléchargez-la</a>.',
    'sup.before.2.title': 'Cherchez dans les signalements existants',
    'sup.before.2.text': 'Si quelqu’un l’a déjà signalé, ajoutez ce que vous avez vu à ce signalement.',
    'sup.search.label': 'Chercher dans les signalements',
    'sup.search.ph': 'par ex. voix, téléportation, écran noir',
    'sup.search.btn': 'Chercher sur GitHub',
    'sup.before.3.title': 'Dites ce que vous avez fait, et ce qui s’est passé',
    'sup.before.3.text': 'Les étapes qui mènent au problème, ce que vous attendiez, et votre système : le formulaire demande chacun.',
    'sup.inside': 'Depuis le viewer',
    'sup.inside.1': '<b>Signaler un bug</b> se trouve dans la barre du haut, le menu Aide et sur l’écran de connexion. Il ouvre le formulaire dans votre navigateur.',
    'sup.inside.2': '<b>Après un plantage</b>, la fenêtre de plantage propose d’envoyer un rapport en ticket GitHub à votre nom, une fois que vous avez dit ce que vous faisiez. Rien n’est envoyé tout seul.',
    'sup.inside.3': 'Préférences › Confidentialité › Rapports de plantage : Demander, Toujours ou Jamais.',
    'sup.faq': 'Questions fréquentes',
    'sup.guides': 'Tous les guides sur GitHub →',
    'faq.smart.q': 'Windows affiche « Windows a protégé votre ordinateur ».',
    'faq.smart.a': 'Cliquez sur Informations complémentaires, puis sur Exécuter quand même. Les versions ne sont pas encore signées, donc Windows ne connaît pas l’éditeur.',
    'faq.smart.link': 'Politique de signature du code →',
    'faq.gk.q': 'macOS dit qu’il ne peut pas vérifier l’application.',
    'faq.gk.a': 'Cliquez sur Terminé, ouvrez Réglages Système › Confidentialité et sécurité, faites défiler jusqu’au message sur Aurora Viewer et cliquez sur Ouvrir quand même. macOS retient ce choix.',
    'faq.gk.link': 'Guide macOS →',
    'faq.keep.q': 'Mes réglages sont-ils conservés lors d’une mise à jour ?',
    'faq.keep.a': 'Sous Windows, la proposition de mise à jour vous dit, avant que vous acceptiez, si votre cache et vos réglages sont conservés. Sous Linux et macOS, ils ne sont pas dans le dossier du viewer : une nouvelle version les garde.',
    'faq.media.q': 'Les pages web ou les vidéos restent vides.',
    'faq.media.a': 'La première fois qu’ils sont nécessaires, le viewer demande avant de télécharger les plugins média, une seule fois. « Plus tard » laisse un bouton Télécharger dans Préférences › Son et voix › Média. Sous Linux, vérifiez aussi les paquets GStreamer.',
    'faq.media.link': 'Guide Linux →',
    'faq.os.q': 'Aurora fonctionne-t-il sur les grilles OpenSim ?',
    'faq.os.a': 'Oui : les grilles OpenSim et l’Hypergrid, avec un gestionnaire de grilles, et un avatar cuit par le viewer là où la grille ne le fait pas.',
    'faq.legacy.q': 'Puis-je garder l’interface que je connais ?',
    'faq.legacy.a': 'Oui. Chaque fenêtre repensée garde sa version Legacy : Préférences › Aurora, un choix par fenêtre, ou tout d’un coup.',
    'faq.remove.q': 'Comment désinstaller Aurora ?',
    'faq.remove.a': 'Supprimez le dossier ou l’application du viewer, puis les dossiers de réglages et de cache si vous voulez aussi les effacer.',
    'faq.remove.link': 'Guide de désinstallation →',
    'sup.contrib': 'D’autres façons d’aider',
    'sup.contrib.translate': 'Aidez à traduire Aurora dans votre langue.',
    'sup.contrib.code': 'Contribuer au code',
    'sup.contrib.code.text': 'Rust, wgpu et Vulkan, au grand jour.',
    'sup.contrib.source': 'Libre, sous GPLv3.',
    'sup.contrib.privacy': 'Ce que le viewer garde, et ce qu’il envoie.',
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
  const ATTRS = [['data-i18n-aria', 'aria-label'], ['data-i18n-alt', 'alt'], ['data-i18n-placeholder', 'placeholder']];
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
    // A page other than the home page names itself (privacy/index.html).
    const own = document.documentElement.dataset[lang === 'fr' ? 'titleFr' : 'titleEn'];
    document.title = own || STR[lang].title;
    // Long texts written in both languages: only the chosen one shows.
    $$('[data-lang-block]').forEach((el) => { el.hidden = el.dataset.langBlock !== lang; });
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
      // Each release also carries crash symbols (…-windows-x64-symbols.zip) and checksums: never offer those.
      const a = viewer.assets.find((x) => re.test(x.name)
        && !/symbols|debug|\.(sha256|json|sig|asc)$/i.test(x.name));
      if (!a) return null;
      const sum = viewer.assets.find((x) => x.name === `${a.name}.sha256`);
      return { url: a.browser_download_url, size: a.size, name: a.name, sum: sum ? sum.browser_download_url : '' };
    };
    return {
      version: viewer.tag_name.replace(/^v/, ''),
      date: viewer.published_at,
      url: viewer.html_url,
      windows: asset(/windows.*\.(zip|msi|exe)$/i),
      linux: asset(/linux.*\.(tar\.(gz|xz|zst)|appimage|zip|deb|rpm)$/i),
      macos: asset(/macos.*\.dmg$/i),
    };
  }

  async function fetchJson(url) {
    const response = await fetch(url, { headers: { Accept: 'application/vnd.github+json' } });
    if (!response.ok) throw new Error(String(response.status));
    return response.json();
  }

  async function loadRelease() {
    release = cached(RELEASE_KEY, RELEASE_TTL);
    if (!release) {
      try {
        const list = await fetchJson(RELEASES_API);
        release = summarise(Array.isArray(list) ? list : []);
        // The list endpoint is cached at GitHub's edge and has been seen answering []:
        // fall back to the release marked latest.
        if (!release) release = summarise([await fetchJson(`https://api.github.com/repos/${REPO}/releases/latest`)]);
        if (release) store.set(RELEASE_KEY, { at: Date.now(), value: release });
      } catch (_) {
        return; // Offline or rate limited: keep the values written in the page.
      }
    }
    renderRelease();
  }

  const formatSize = (bytes) => `${new Intl.NumberFormat(lang, { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(bytes / 1e6)} ${STR[lang].mb}`;

  function renderRelease() {
    $$('[data-release-date]').forEach((el) => {
      const iso = release ? release.date : el.dataset.date;
      el.textContent = new Intl.DateTimeFormat(lang, { dateStyle: 'long' }).format(new Date(iso));
      el.dataset.date = iso;
    });
    // The sizes written in the page carry their byte count, so they follow the language offline too.
    $$('[data-dl-size]').forEach((el) => {
      const file = release && release[el.dataset.dlSize];
      const bytes = file ? file.size : Number(el.dataset.bytes);
      if (bytes) el.textContent = formatSize(bytes);
    });
    if (!release) return;
    $$('[data-version]').forEach((el) => { el.textContent = release.version; });
    $$('[data-release-link]').forEach((el) => { el.href = release.url; });
    ['windows', 'linux', 'macos'].forEach((os) => {
      const file = release[os];
      if (!file) return;
      $$(`[data-dl="${os}"]`).forEach((el) => { el.href = file.url; });
      $$(`[data-dl-sum="${os}"]`).forEach((el) => {
        el.hidden = !file.sum;
        if (file.sum) el.href = file.sum;
      });
      $$(`[data-dl-name="${os}"]`).forEach((el) => { el.textContent = file.name; });
      // The Linux archive unpacks into a folder of its own name.
      $$(`[data-dl-stem="${os}"]`).forEach((el) => { el.textContent = file.name.replace(/\.(tar\.(gz|xz|zst)|zip|dmg)$/i, ''); });
    });
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
    const row = document.createElement(item.url ? 'a' : 'article');
    row.className = 'nrow';
    if (item.url) row.href = item.url;
    const time = document.createElement('time');
    if (item.date) {
      time.dateTime = item.date;
      time.textContent = new Intl.DateTimeFormat(lang, { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(`${item.date}T00:00:00Z`));
    }
    const body = document.createElement('div');
    body.className = 'nbody';
    const title = document.createElement('h3');
    title.textContent = item.title;
    body.append(title);
    item.paragraphs.forEach((text) => {
      const p = document.createElement('p');
      p.textContent = text;
      body.append(p);
    });
    row.append(time, body);
    if (item.url) {
      const more = document.createElement('span');
      more.className = 'more';
      more.setAttribute('aria-hidden', 'true');
      more.textContent = '→';
      row.append(more);
    }
    return row;
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

  // ---- Animations start when they come into view -------------------------------

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

  // ---- Drop-down panels: Community and support in the header, and the floating help ----
  // Escape, a click outside or tabbing away closes them.

  const pops = $$('[data-pop]').map((button) => ({
    button,
    root: button.closest('.pop'),
    panel: document.getElementById(button.getAttribute('aria-controls')),
  })).filter((pop) => pop.root && pop.panel);

  const setOpen = (pop, open) => {
    pop.button.setAttribute('aria-expanded', String(open));
    pop.panel.hidden = !open;
  };

  pops.forEach((pop) => {
    pop.button.addEventListener('click', () => {
      const open = pop.panel.hidden;
      pops.forEach((other) => setOpen(other, false));
      setOpen(pop, open);
    });
    pop.root.addEventListener('focusout', (event) => {
      if (event.relatedTarget && !pop.root.contains(event.relatedTarget)) setOpen(pop, false);
    });
  });
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    pops.filter((pop) => !pop.panel.hidden).forEach((pop) => {
      setOpen(pop, false);
      pop.button.focus();
    });
  });
  document.addEventListener('click', (event) => {
    pops.forEach((pop) => {
      if (!pop.panel.hidden && !pop.root.contains(event.target)) setOpen(pop, false);
    });
  });

  // ---- Download page: one system at a time, the visitor's own first (or ?os=) ----

  const osButtons = $$('[data-os]');
  if (osButtons.length) {
    const detect = () => {
      const ua = `${(navigator.userAgentData && navigator.userAgentData.platform) || ''} ${navigator.platform || ''} ${navigator.userAgent}`;
      // Phones, tablets (an iPad says Macintosh but has touch) and Chromebooks get no guess.
      if (/android|iphone|ipad|ipod|cros/i.test(ua) || (/mac/i.test(ua) && navigator.maxTouchPoints > 1)) return '';
      if (/win/i.test(ua)) return 'windows';
      if (/mac/i.test(ua)) return 'macos';
      if (/linux|x11/i.test(ua)) return 'linux';
      return '';
    };
    const pick = (os) => {
      osButtons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.os === os)));
      $$('[data-os-panel]').forEach((panel) => panel.classList.toggle('is-on', panel.dataset.osPanel === os));
    };
    const detected = detect();
    $$('[data-detected]').forEach((el) => { el.hidden = el.dataset.detected !== detected; });
    const asked = new URLSearchParams(location.search).get('os');
    pick(osButtons.some((b) => b.dataset.os === asked) ? asked : detected || 'windows');
    osButtons.forEach((button) => button.addEventListener('click', () => {
      pick(button.dataset.os);
      const params = new URLSearchParams(location.search);
      params.set('os', button.dataset.os);
      history.replaceState(null, '', `?${params}${location.hash}`);
    }));
  }

  $$('[data-distro]').forEach((button) => button.addEventListener('click', () => {
    const box = button.closest('.code');
    $$('[data-distro]', box).forEach((b) => b.setAttribute('aria-pressed', String(b === button)));
    $$('[data-distro-panel]', box).forEach((panel) => panel.classList.toggle('is-on', panel.dataset.distroPanel === button.dataset.distro));
  }));

  const copyStatus = document.querySelector('[data-copy-status]');
  $$('[data-copy]').forEach((button) => button.addEventListener('click', async () => {
    const box = button.closest('.code');
    const pre = $$('pre', box).find((p) => p.offsetParent !== null) || box.querySelector('pre');
    try {
      await navigator.clipboard.writeText(pre.textContent.trim());
    } catch (_) {
      // No clipboard access: select the command so it can be copied by hand.
      const range = document.createRange();
      range.selectNodeContents(pre);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      return;
    }
    button.classList.add('is-done');
    if (copyStatus) copyStatus.textContent = STR[lang].copied;
    clearTimeout(button.copyTimer);
    button.copyTimer = setTimeout(() => {
      button.classList.remove('is-done');
      if (copyStatus) copyStatus.textContent = '';
    }, 1600);
  }));

  applyLanguage(pickLanguage());
  loadRelease();
})();
