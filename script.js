    // Auf 'true' setzen, wenn News da sind, auf 'false', wenn keine News da sind.
const showNews = true;

document.addEventListener("DOMContentLoaded", () => {
    const eventBox = document.getElementById("event-box");
    const bientotTag = document.getElementById("bientot-tag");

    if (!showNews) {
        if (eventBox) eventBox.style.display = "none";
        if (bientotTag) bientotTag.style.display = "none";
    }
});

let currentArtistImages = []; // Eigene Liste für Artist-Bilder
let currentArtistImgIndex = 0;

let currentGalleryImages = [];
let currentImgIndex = 0;
let currentArchiveId = null; // Track current archive/performance ID



// ---------------------------
// 1. Artist-Datenbank
// ---------------------------
const artistData = {
    "Hugo Ferretto": {
        text: "En avançant dans ma recherche certaines questions reviennent constamment. La construction de la peinture place le regardeur. La construction perspective de la Renaissance le fait advenir comme unique sujet. Qu’en est-il si il n’y a plus de représentation ? Si la peinture est abstraite ? Où se place le sujet de la peinture abstraite autant dans l’espace réel que sur la toile ? Voici le postulat de départ.<br>Devant chaque tableau s’opère un jeu à trois variantes. Ce qui est peint, sa position dans l’espace, la place que cela donne au regardeur. La question de la projection dans l’espace du tableau m’est chère. Pour faciliter cette sensation j’ai d’abord peint des débuts d’espaces, des lieux architecturés, des sols, des murs, des plans. Ceux-ci sont ensuite devenus des pans colorés, des lignes, des formes géométriques simples. J’ai poussé cette recherche jusqu’au lieu coloré absolu, le monochrome.<br>La condition de regard qu’entraîne le tableau m’interresse plus que ce qui est peint. C’est ce que je rejoue en faisant dialoguer un monochrome, qui agit comme un point focal au mur, et un schéma dessiné via ordinateur qui paraphrase la situation de la peinture. Mais en même temps au vue de sa taille implique une autre échelle de regard.<br>Qu’est ce que cela tente de dire sur la relation physique et mentale que cela génère ? Qu’y a t il entre ces deux propositions ? Quel type d’espace ? Je peints des monochromes en penssant autant à Dechirico et à Bacon qu’à Malevitch. Il y a une importance pour moi dans la manière dont l’objet tableau et l’image communique. C’est pourquoi j’ai décidé de quitter le châssis et de peindre sur bois. Cela me permet d’avoir une forme aux bords et aux arrêtes plus nets. Généralement je laisse les tranches nues. J’aime la sensation de jaillissement de la surface peinte que cela produit. Dernierement je m’attache à l’idée de reflet, ou de lumière. Une fois peintes ces lumières viennent troubler la nature du tableau, quelque part entre surface et profondeur.",

        instagram: "https://www.instagram.com/hugo_ferretto/",
        images: [
            { src: "img/Hugo_Ferretto_1.jpg", caption: "" },
            { src: "img/Hugo_Ferretto_2.jpg", caption: "" },
            { src: "img/Hugo_Ferretto_3.jpg", caption: "" }
        ]
    },
    "Marta Budkiewicz": {
        text: "Diplômée des Beaux-Arts de Paris, dans l'atelier de Giuseppe Penone, mon travail de plasticienne s'ancre souvent dans des souvenirs personnels. J'y explore les traces infimes, les bruits à la lisière du silence, afin d'interroger le rapport au temps et à la mémoire. Issue d'une formation musicale approfondie en piano, j'intègre dans ma pratique des médiums variés tels que le dessin, la vidéo, le son et l'installation. J'y tisse des liens entre ces différentes approches et les façons d'appréhender ce qui est observé. Mon travail cherche également à suspendre et à revenir vers ce qui a été, ce qui ne peut être saisi que par fragments dispersés : les perceptions sensibles, les souvenirs, ces instants fragiles et fugaces qui laissent des empreintes, faisant dialoguer réalité, mémoire et expérience vécue.",
        website: "https://www.martabudkiewicz.com/",
        instagram: "https://www.instagram.com/marta.budkiewicz/",
        images: [
            { src: "img/Marta-Budkiewicz_dessin_serieminiscences.jpg", caption: "Dessin série Reminiscences, 100x73cm" },
            { src: "img/Marta-Budkiewicz_Oracles-predictions.JPG", caption: "Oracles et prédictions n°8, 2025, vue de l'exposition Nymphs just wannahave fun, Le Houloc 2025" },
            { src: "img/Marta-Budkiewicz_Pattern_dessinausol.avif", caption: "Pattern, dessin au sol, craie blanche, vue exposition Intervalles, Angle Art Contemporain, Saint-Paul Trois Châteaux" }
        ]
    },

    "Pauline Toyer": {
        text: "Née en 1987, Pauline Toyer vit et travaille à Blois (Cormeray) et Paris. Elle est diplômée de l'ENSA Bourges (2010) et a été résidente du post-diplôme de l'ENSBA Lyon (2014). Elle a participé à plusieurs expositions personnelles et collectives, notamment aux Vestibule(s) de la Maison rouge, Fondation Antoine de Galbert, Paris (2014), à la +359 Gallery, Sofia (2019), au Creux de l'Enfer, Thiers (2020) et au Centre de création contemporaine Olivier Debré à Tours (2023). Elle a été lauréate du programme de résidence de l'ADAGP à la Cité internationale des arts (2022). Investie dans des projets collaboratifs, elle organise notamment avec Celsian Langlois l'évènement Réunion Confort à Cormeray (41). Ce projet est mené par l'association ateliers Canard qu'iels ont co-fondée en 2019 afin de soutenir la création artistique en milieu rural.",
        website: "https://paulinetoyer.com/",
        instagram: "https://www.instagram.com/paulinetoyer/",
        images: [
            { src: "img/Pauline-Toyer_Fourrure.jpg", caption: "Fourrure #2" },
            { src: "img/Pauline-Toyer_GrandNez.jpg", caption: "Grand Nez" },
            { src: "img/Pauline-Toyer_CCCOD.jpg", caption: "CCCOD" },
            { src: "img/Pauline-Toyer_Bread-Dance.jpg", caption: "Bread Dance" },
            { src: "img/Pauline-Toyer_CCCOD-2.jpg", caption: "CCCOD 2" }
        ]
    },
    "Jules Dumoulin": {
        text: "Diplômé de la Villa Arson en 2018, ma pratique se déploie dans le champ de la sculpture et de l'installation, particulièrement dans l'usage des techniques de moulage.<br><br>À la suite d'un grave accident de la route en 2015, j'ai ressenti le besoin, pour me ré-éduquer et pour me vider la tête, de marcher. J'ai arpenté de long en large la ville de Nice et toutes celles que je visitais. Lors de ces dérivées, mon attention s'arrêtait exclusivement sur des parties de véhicules cassés, des bribes déformées d'objets mécaniques. Ces objets me trouvaient, en quelque sorte. Ces fragments, je les ai accumulés, et, dans l'idée de les « rendre œuvre », je les ai soclés : je leur ai construit pour eux des supports de métal.<br><br>La Villa Arson terminée, j'ai rapporté à Paris uniquement la partie « objet trouvé » qui composait mes sculptures. J'ai commencé à les mouler puis à les reproduire en cire que je teignait de pigments et de pastels fondus.<br><br>La cire m'a laissée, d'une part, une forme de « droit à l'erreur » — je pouvais refondre ce qui ne me convenait pas, travailler ma technique de moulage, et l'affiner vers un geste plus simple centré sur la couleur, dans une démarche picturale. La sérialisation s'est établie comme un élément central de ma pratique. Je produis un minimum de formes nouvelles, je re-moule ainsi plutôt mes sculptures et j'en scanne certaines pour les imprimer en 3D et jouer avec leur échelle, leurs matériaux.<br><br>Ainsi, mon travail s'est progressivement constitué autour des notions de sobriété et de réemploi empruntées à la pensée écologique, visant à tendre vers une remise en circulation perpétuelle des objets que je crée. Je trouve intéressant par ce protocole de fragiliser la valeur d'unicité de l'œuvre d'art ainsi que celle du geste artistique à l'heure où la notion de productivité est sérieusement remise en question.",
        instagram: "https://www.instagram.com/julesdumoulin/",
        images: [
            { src: "img/Jules-Dumoulin_1.avif", caption: "" },
            { src: "img/Jules-Dumoulin_2.avif", caption: "" },
            { src: "img/Jules-Dumoulin_3.avif", caption: "" },
            { src: "img/Jules-Dumoulin_4.avif", caption: "" },
            { src: "img/Jules-Dumoulin_5.avif", caption: "" }
        ]
    },
    "Noemie Vincent Maudry": {
        text: "Noémie Vincent Maudry, artiste designeuse, née en 2001 en Bourgogne, est diplômé des Beaux-Arts du Mans en Design et Territoire en 2024 autour d'un travail sur des relations sensibles entre les êtres humains et leur environnement, notamment à travers l'attention portée aux plantes adventices, souvent réduites au statut de «mauvaises herbes». Ces végétaux, présents dans les interstices des villes et les marges des paysages, deviennent des figures de résistance et des indicateurs d'écosystèmes discrets. Les notions d'espaces rudéraux, de friches et de tiers paysage que décrit dans son travail Gilles Clément permettent de penser ces lieux délaissés comme des réservoirs de biodiversité, et ces réflexions prennent espace dans son travail à travers des sculptures, objets, photographies et installations, ainsi que des procédés expérimentaux comme l'anthotype. Elle interroge notre regard sur le vivant et cherche à cultiver une attention renouvelée au monde qui nous entoure, en développant un dialogue poétique entre humains, matières et territoires. Elle a exposé au Musée d'Art Moderne de Paris, Les Flammes en 2021, au Centre Céramique Contemporaine de La Borne Digital Soba, à la Biennale Internationale de Design de Saint Étienne « Le monde Sinon rien » en 2022, et récemment à Paris, au Wonder, Summer Body et au Micro Centre d'Art de l'Eprouvette, Terra Strata.",
        instagram: "https://www.instagram.com/noemie.eon.vm/",
        images: [
            { src: "img/Noemie-Vincent-Maudry_1.avif", caption: "" },
            { src: "img/Noemie-Vincent-Maudry_2.avif", caption: "" },
            { src: "img/Noemie-Vincent-Maudry_3.avif", caption: "" }
        ]
    },
    "Anaïs Benguigui": {
        text: "Anaïs Benguigui est une artiste peintre basée à Paris. Diplômée des Beaux-Arts de Paris et formée en philosophie à la Sorbonne, elle développe une pratique picturale qui explore l'identité comme un processus de transformation continue, façonné par les relations, la mémoire et les héritages. À partir de photographies issues de son environnement proche, elle réalise des peintures figuratives de grand format qui interrogent les moments de transition psychique et relationnelle.",
        website: "https://www.anaisbenguigui.com",
        instagram: "https://www.instagram.com/anaisbenguigui/",
        images: [
            { src: "img/Anais-Benguigui_1.avif", caption: "" }
        ]
    },
    "Joerg Hurschler": {
        text: "Joerg Hurschler est un artiste visuel travaillant dans les nouveaux médias, mêlant cinéma, animation et esthétique du jeu vidéo pour explorer comment les systèmes de pouvoir façonnent l'espace, la perception, l'identité et la vie quotidienne. Il est titulaire d'un Master of Arts en cinéma de la Haute École d'art et de design de Lucerne (Suisse) et de l'Université Hongik à Séoul, en Corée du Sud.",
        website: "https://www.joerghurschler.com",
        instagram: "https://www.instagram.com/joergoninsta",
        images: [
            { src: "img/Joerg-Hurschler-1.jpg", caption: "" },
            { src: "img/Joerg-Hurschler-2.jpg", caption: "Schwarm, 2023" },
            { src: "img/Joerg-Hurschler-3.jpg", caption: "Deadworld Protocol, 2025" },
            { src: "img/Joerg-Hurschler-4.jpg", caption: "The aesthetics of state zero - Body 0.1, 2025" },
            { src: "img/Joerg-Hurschler-5.jpg", caption: "Entités numérique - Variante x0.01z, 2022" }
        ]
    },

    "Audrey Matt Aubert": {
        text: "La pratique artistique d’Audrey Matt Aubert s’articule essentiellement autour d’une réflexion sur l’architecture et les formes qu’elle produit. Si sa peinture s’attache plus particulièrement à l’exploration des motifs qui caractérisent certains grands ensembles (suivant un traitement souvent proche de l’abstraction), le dessin lui permet d’introduire une dimension plus fantasmagorique, marquée aussi bien par le surréalisme que par la lecture des théories sur la ville générique et le développement des grandes métropoles modernes.<br><br>Pour ses récents dessins, l’artiste a puisé dans les civilisations les plus anciennes un corpus de formes archaïques et d’habitats thériomorphes3, auquel elle n’hésite pas à adjoindre, par collage et contagion, le systématisme et la rigueur des constructions les plus contemporaines. En soumettant ces architectures aux principes d’un développement rhizomique et modulaire, qu’elle emprunte aux mondes animal et végétal, Audrey Matt-Aubert parvient à substituer sans heurt l’alvéole aux éléments standardisés de construction, pour dévoiler la parenté inattendue qui lie la forme d’une ruche à celle de nos habitations contemporaines. Ailleurs, un exotisme composite, peuplé de palmacées indistinctes, vient s’immiscer dans les interstices d’une structure précaire, qui tient tout autant du monument que de l’attraction. Par ces manipulations, Audrey Matt Aubert parvient à réconcilier les régimes du métaphorique et du littéral, au prix d’une hybridation saisissante et d’un déplacement simultané de l’arti ciel vers l’organique et du vivant vers le synthétique.<br><br>Se dressent alors d’étranges chimères architecturales, qui, déposées sous la clarté limpide d’un lointain désertique ou plongées dans l’obscurité sourde d’une nuit opaque, s’imposent à nous comme les décors et les protagonistes d’une histoire universelle : celle du phantasme de la ville sans histoire, synthèse irrésistible de toutes les autres et vouée pour l’éternité à une croissance sans borne ni contrainte.<br><br>Thibault Bissirier, septembre 2017",
        website: "https://audreymattaubert.com/homepage/",
        instagram: "https://www.instagram.com/audrey.matt.aubert/   ",
        images: [{ src: "img/Audrey-matt-aubert-1.jpg", caption: "" }]
    },

    "Mélissa Boucher": {
        text: "Mélissa Boucher, est une artiste Franco-Bolivienne diplômée des Beaux-Arts de Paris qui développe ses projets en photographie, vidéo et dans des éditions d’artiste.<br>Le fil conducteur qui relie ses différents projets est un questionnement en miroir portant sur la part du réel et le statut de l’image. À travers ses photographies, elle cherche à capturer les potentialités narratives de scènes, d’espaces, ou d’arrangements intérieurs. Elle s’intéresse en particulier aux à coté, à la présence d’objets ou de formes en apparence secondaires ouvrant un espace de jeu entre le récit documentaire et la fiction.",
        website: "https://melissaboucher.fr/",
        instagram: "https://www.instagram.com/meliszaboucher/",
        images: [
            { src: "img/Melissa-Boucher_1.jpg", caption: "" },
            { src: "img/Melissa-Boucher_2.jpg", caption: "" },
            { src: "img/Melissa-Boucher_3.jpg", caption: "" }
        ]
    },

    "Agathe Dos Santos": {
        text: "Diplômée des Beaux-Arts de Paris en 2019, j'axe ma recherche plastique autour de la survivance des images. Dernièrement j'ai réalisé une série de gravures sur bois décorées au feutre posca, où chaque tirage est l'occasion de repenser l'oeuvre, de changer la narration et les couleurs. Les scènes que je représente sont issues de collages, où j'associe des figures de la peinture préraphaélite à celles de mannequins du défilé Horn of Plenty d'Alexander Mcqueen. Ces visages fardés aux couleurs pop et saturées, sont ceux de personnages ambigus et fluides. La production de ces « femmes en série » me permet d'imaginer une multitude de personnages au travers desquels je projette certains de mes fantasmes. Reines, magiciennes, chimères, celles-ci deviennent des figures protectrices, comme des icônes ou des ex-votos.",
        website: "https://agathedossantos.com",
        instagram: "https://www.instagram.com/dossantosagathe/",
        images: [
            { src: "img/Agate-Dos-Santos_Vase alchimique_2025.jpeg", caption: "Vase alchimique, 2025" },
            { src: "img/Agate-Dos-Santos_La-reine_2023.jpg", caption: "La reine, 2023" },
            { src: "img/Agate-Dos-Santos_Le Fluide_2023.jpeg", caption: "Le Fluide, 2023" },
            { src: "img/Agate-Dos-Santos_2025.jpeg", caption: "2025" }
        ]
    },

    "Mathilde Geldhof": {
        text: "«Plutôt que d’explorer l’exotique, la photographe plasticienne investit l’endotique à la recherche d’une situation, d’une lumière ou d’une sensation produisant un décalage dans l’apparente familiarité des choses. Que ce soit par l’image seule, l’assemblage ou l’accrochage, elle confère au commun un pouvoir expressif proche du principe d’étrangéisation. À travers des gestes simples, mais précis, Mathilde Geldhof met en abyme notre regard et nous conduit à envisager la manière dont la réalité s’est aujourd’hui transformée en une vaste narration visuelle. Ses œuvres témoignent d’instants fugaces figés par l’acte photographique, relatant en creux son aspect mémoriel. Il ne s’agit pourtant pas de leur vouer une adoration, mais de les imaginer comme vecteurs d’un partage d’expériences et de mémoires.» - Extrait du texte Mathilde Geldhof, Investir l’infra-exordinaire de Thomas Fort<br><br>Mathilde Geldhof, née en 1988 à Reims, diplômée des Beaux-Arts de Paris en 2014 vit et travaille en région parisienne. Son travail a reçu plusieurs prix (Bourse du Talent, Prix Impressions Photographiques des ateliers Vortex...) et le soutien de l’ADAGP et de la DRAC Île de France. Ses oeuvres ont rejoint les collections du FMAC et du Fonds Estampe et Photographie de la BNF et ont été exposées dans différentes structures et institutions (BNF, Musée Guimet, Chartreuse de Villeneuve-Lès-Avignon, Maison des arts de Malakoff, Collection Lambert en Avignon...). Elle a développé plusieurs projets dans le cadre de résidences en France et à l’étranger (Yishu 8 à Pékin, Friche La Belle de Mai à Marseille...) ainsi que dans plusieurs structures médicales dédiées au soin et à l’accompagnement de personnes en situation de handicap (Centre Médical pour Adolescents de Neufmoutiers, Institut Médico-Éducatif La Gabrielle en Seine et Marne...). Mathilde Geldhof a cofondé l’atelier collectif Le Houloc à Aubervilliers avec une vingtaine d’autres artistes. Elle y a présenté l’exposition collective S’habiter en tant que commissaire en 2024.",
        website: "https://www.mathilde-geldhof.com/",
        instagram: "https://www.instagram.com/geldhofmathilde/",
        images: [
            { src: "img/Mathilde-Geldhof-4.jpg", caption: "La cheminée, 2022" },
            { src: "img/Mathilde-Geldhof-3.jpg", caption: "La maison de vacances, 2021" },
            { src: "img/Mathilde-Geldhof-2.jpg", caption: "Le mouchoir, 2024" },
            { src: "img/Mathilde-Geldhof-1.jpg", caption: "Gigogne, 2024" }
        ]
    },

    "Lise Stoufflet": {
        text: "La peinture de Lise Stoufflet prend pour sujets des situations à cheval entre le réel et le fantastique. Cet entre-deux, qui est, précisément, l’apanage du conte, justifie une figuration narrative d’autant plus dérangeante et décalée que le traitement est simple et ancré dans un réel spatio-temporel par le biais d’une forme d’illustration. Les traits sont nets, presque aseptisés, et les corps des personnages sont lisses comme ceux de pantins. Si bien que chaque élément est placé sous un signe générique – une femme, un homme, une main, un château, une maison, un lac – dans une douce schématisation qui laisse la scène ouverte à un possible réagencement. Aucun détail superflu ne vient brouiller la lisibilité de l’œuvre et l’absence de caractérisation engendre une standardisation des figures, comme des emblèmes ou des poupées. Dans cette affirmation des formes, s’alimente l’étrangeté des compositions. C’est au sein même de la narration, offerte à la vue, que le bât blesse.<br><br>-Elora Weill-Engerer-",
        website: "https://www.lisestoufflet.com/",
        instagram: "https://www.instagram.com/lisestoufflet/",
        images: [
            { src: "img/Lise-Stoufflet-2.jpg", caption: "" },
            { src: "img/Lise-Stoufflet-1.jpg", caption: "" },
            { src: "img/Lise-Stoufflet-3.jpg", caption: "" },
            { src: "img/Lise-Stoufflet-4.jpg", caption: "" }
        ]
    },

    "Mehdi Besnainou": {
        text: "Mehdi Besnainou Dounkas est un artiste français vivant à Paris.<br><br>Il fait ses études à Olivier de Serres et aux Beaux Arts de Paris.<br><br>Le travail de Mehdi Besnainou est pluridisciplinaire et questionne avec humour et sarcasme les rites, codes et tendances actuelles de sa génération et de ses contemporains.<br><br>Que ce soit dans ses pensées les plus introspectives ou dérisoires sur la condition humaine, ses troubles psychologiques, ses identités et dilemmes face à sa place dans une société en perpétuelle changement, son travail se caractérise par un jeu permanent entre language oral, écrit et dessiné, repertoire journalier compulsif d'analogie sur les mouvements du monde, à la manière d'un polymathe à l'ère du numérique.<br><br>Partant du dessin et de l'écriture, sa pratique artistique s'étend à la peinture, la vidéo, la performance et la musique.<br><br>Le travail de Mehdi Besnainou a fait l'objet d'exposition de peinture, de performance, de concerts, de projection vidéo ou de carte blanche mêlant différents mediums dans des centres d'arts internationaux tels que le Palais de Tokyo, le palais de Chaillot ou encore la Villette. Récemment son travail a été visible au centre d'art le 19M, à la galerie Fille du Calvaire ou au musée de la chasse et de la nature.",
        instagram: "https://www.instagram.com/mehdi_besnainou/",
        images: [
            { src: "img/Mehdi-Besnainou_1.avif", caption: "2024" },
            { src: "img/Mehdi-Besnainou_2.avif", caption: "Fièvre jaune, 2024" },
            { src: "img/Mehdi-Besnainou_3.avif", caption: "Four monkeys, 2023" },
            { src: "img/Mehdi-Besnainou_4.avif", caption: "19M, 2024" },
            { src: "img/Mehdi-Besnainou_5.avif", caption: "2024" },
            { src: "img/Mehdi-Besnainou_6.avif", caption: "Palais de Tokyo, 2024" }
        ]
    },

    "Laure Tiberghien": {
        text: "Le travail de Laure Tiberghien s’inscrit dans un courant d’expérimentation que l’on peut faire remonter au début de l’histoire de la photographie mais il ne procède en rien d’une quelconque fascination technologique. L’image obtenue sans appareil, par la conjugaison de la chimie, de la lumière et du temps, est un révélateur du monde matériel, mettant ici en lumière l’épiderme des choses, non leur peau visible mais leur surface sensible. Avec ses images, Laure Tiberghien capte les transformations du visible dont elle nous donne à comprendre le mouvement et les altérations. Chacune de ses pièces est l’objet d’une savante composition où les couleurs sont agencées après avoir été auparavant testées et disposées comme sur une palette pour obtenir les rapports de tons souhaités. Toutes ces opérations qui mènent à des pièces forcément uniques, supposent un long travail en chambre noire, l’usage de filtres et la mise en place de dispositifs qui n’ont rien de mécanique et permettent d’obtenir une image maîtrisée tout en laissant la place à l’accident et au hasard.<br><br>Gilles A. Tiberghien",
        website: "https://lauretiberghien.com/",
        instagram: "https://www.instagram.com/lauretiberghien/",
        images: [
            { src: "img/Laure-Tiberghien_1.avif", caption: "" },
            { src: "img/Laure-Tiberghien_2.avif", caption: "" },
        ]
    },

    "Laura Rouzet": {
        text: "Sous forme d'anticipation spéculative, Laura Rouzet tisse des univers aux frontières poreuses où les environnements humain, végétal, animal, minéral ou artificiel se confondent et se prolongent. Explorant les vestiges du vivant et ses potentialités d'évolution, son travail plonge dans les zones troubles de la nature et de ses psychés. À l'intersection de la sculpture, de l'installation, et de la danse, sa pratique est marquée par l'expérience du corps, qu'elle perçoit comme un tissu connectif qui nous lie à l'autre. De la prise d'empreinte au mouvement, le corps et la matière – argile, sève naturelle, grès – s'émancipent dans des espaces liminaires pour devenir autre. En cette ère d'anxiété environnementale, Laura Rouzet interroge la perméabilité des statuts humains et non-humains en imaginant de nouvelles formes d'équilibre dans un futur alternatif, possible ou rêvé.",
        website: "https://www.laurarouzet.com/",
        instagram: "https://www.instagram.com/laurarouzet/",
        images: [
            { src: "img/Laura_Rouzet_1.jpg", caption: "" },
            { src: "img/Laura_Rouzet_2.jpg", caption: "" },
            { src: "img/Laura_Rouzet_3.jpg", caption: "" },
            { src: "img/Laura_Rouzet_4.jpg", caption: "" },
            { src: "img/Laura_Rouzet_5.jpg", caption: "" },
            { src: "img/Laura_Rouzet_6.jpg", caption: "" }
        ]
    },

    "Mathieu Roquigny": {
        text: "Mathieu Roquigny entreprend une démarche où hasard, quotidien et humour entrent en interaction. Le jeu, le détournement d’objets mais surtout l’instinct de collectionneur sont des constantes de son travail qui se construit à travers l’ordinaire. L’usage d’un vocabulaire formel minimal et de matériaux modestes confère à ses oeuvres une apparente simplicité qui ne fait que renforcer leur redoutable efficacité. Mathieu pénètre en effet un champ performatif où tout ce qui l’entoure peut être soumis à une seconde lecture, à une tout autre interprétation, intensément plus pro- fonde et essentielle. Cette impression de créer tout en passant le temps, en s’arrêtant sur des fragments de l’éphémère et du banal, tout en révélant leur pouvoir vital, dégage une insatiable sensation de fragilité et, étrangement, d’attirante et de joyeuse beauté. C’est cette polysémie qui donne toute sa richesse et son originalité à l’oeuvre de Mathieu Roquigny.<br><br>-Pauline Guelaud-",
        website: "http://www.mathieuroquigny.com/",
        instagram: "https://www.instagram.com/mathieuroquigny/",
        images: [
            { src: "img/Mathieu-Roquigny_1.jpg", caption: "" },
            { src: "img/Mathieu-Roquigny_2.jpg", caption: "" },
            { src: "img/Mathieu-Roquigny_3.jpg", caption: "" },
            { src: "img/Mathieu-Roquigny_4.jpg", caption: "" },
            { src: "img/Mathieu-Roquigny_5.jpg", caption: "" }
        ]
    },

    "Lenny Rébéré": {
        text: "«C’est un rituel auquel Lenny Rébéré s’astreint quotidiennement en rentrant de son atelier : il cherche, sélectionne et archive les images qui lui arrivent au gré de ses requêtes, parmi les quelques deux cent millions de clichés publiés chaque jour sur Internet. Ces images décontextualisées, désirées par l’artiste pour les formes qui les composent, viennent ponctuer ses œuvres, s’emmêlant les unes aux autres pour former des paysages brumeux. Comme lorsqu’on avance au bord d’un chemin sur lequel une lourde fumée s’est s’évanouie, c’est donc en tâtonnant que l’on découvre le travail de Lenny Rébéré. Même son évolution chromatique qui semblerait a priori réchauffer ses peintures (l’artiste passant du noir et blanc, au rouge) les maintient plongées dans une atmosphère toujours plus énigmatique, propre aux déambulations nocturnes. C’est la couleur que les lampadaires de nos villes étalent chaque nuit sur nos chaussées, elle est la chaude lumière qui voile les balades baudelairiennes. Un rouge qui agit aussi en contraste entre une photographie que l’on viendrait révéler, embaumée de l’éclairage sanguin des chambres noires, et une image sans doute jamais couchée sur papier, aujourd’hui égarée dans les abîmes du numérique.» - Extrait du texte Au-delà du visible par Camille Bardin pour l'exposition Infras, 2019, Galerie Isabelle Gounod, Paris.",
        website: "https://www.lennyrebere.com/",
        instagram: "https://www.instagram.com/lennyrebere/",
        images: [
            { src: "img/Lenny-Rebere_1.jpg", caption: "" },
            { src: "img/Lenny-Rebere_2.jpg", caption: "" },
            { src: "img/Lenny-Rebere_3.jpg", caption: "" },
            { src: "img/Lenny-Rebere_4.jpg", caption: "" },
            { src: "img/Lenny-Rebere_5.jpg", caption: "" }
        ]
    },

    "Charlotte Heninger": {
        text: "Charlotte Heninger met en scène de nouvelles potentialités d’interaction entre les espèces passées, présentes et futures dans des paysages fictifs comme des cartes postales d’un monde qui n’existe pas encore. Son travail propose une vision sur nos intériorités, les espèces, les genres : un animisme futuriste.<br><br>   Les dispositifs d’installation de l’artiste font écho aux strates de mémoire qui se sédimentent - dans le cerveau et dans les sols. Cette démarche lui permet d’explorer la manière dont les symboles se transmettent sans forcément se perpétuer par la parole ou l’écrit. Nos salives, leurs sèves, incarnent l’apparition et l’épuisement des organismes. Quelles sont les limites de nos règnes ? Sommes-nous immortel·le·s, en perpétuelle réactivation ? Des fluides nous maintiennent en vie – car c’est justement bien de vivant dont il s’agit ici. Des cycles qui nous dépassent entrent en résonance, les jaillissements et les disparitions sont fluctuant·e·s.",
        website: "",
        instagram: "https://www.instagram.com/charlotteheninger/",
        images: [
            { src: "img/Charlotte-Heninger-1.jpg", caption: "" },
            { src: "img/Charlotte-Heninger-2.jpg", caption: "" },
            { src: "img/Charlotte-Heninger-3.jpg", caption: "" },
            { src: "img/Charlotte-Heninger-4.jpg", caption: "" },
            { src: "img/Charlotte-Heninger-5.jpg", caption: "" },
            { src: "img/Charlotte-Heninger-6.jpg", caption: "" }
        ]
    },

    "Clémence Mauger": {
        text: "L’indétermination plane à tous les niveaux dans le travail pictural de Clémence Mauger, et dans le choix des motifs d’abord qui peuvent autant évoquer l’infiniment grand que l’infiniment petit.<br><br>Il est notamment nourri d’une imagerie de pointe qui reproduit des éléments imperceptibles à l’oeil nu - comme celles du télescope Hubble ou des microscopes à ondes électriques. Ces images, créées dans le cadre de la recherche scientifique, sont le résultat de la traduction d’informations, souvent non photographiques. En jouant d’ambiguité avec des évocations de cette imagerie scientifique «implacable », le doute plane sur l’origine de ces formes et leur processus de fabrication.<br><br>A l’origine, il y a l’intérêt pour les végétaux croisés au quotidien. La contemplation des plantes la nuit, placées sous les lumières artificielles de la ville, a amené Clémence Mauger à photographier et s’inspirer d’une végétation hallucinée, semblant jaillir du béton comme des sortes d’apparitions. La fascination pour la rareté de ces êtres vivants en milieu urbain l’a orientée dans une réflexion à l’opposé d’une nature brute ou sauvage. <br><br>Ainsi, elle mixe des motifs de végétaux en plan resserré avec des couleurs acidulées, ou en noir et blanc, et avec un traitement pictural vaporeux. La fine couche de pigments déposée est mise en lumière par le fond du tableau, lisse et lumineux grâce à la préparation à la poudre de marbre. La liquidité et la légèreté de la peinture ainsi que l’absorption minérale du support parlent intrinsèquement de porosité et d’interconnexions environnementales. <br><br>Dans les grands écarts d’échelle des références convoquées, la tentation est d’établir des points de comparaison avec des choses connues, mais Clémence Mauger entends pourtant maintenir le doute. Les images fluos des nébuleuses stellaires ou celles acidulées des lames de verre de laboratoire ouvrent un champ de rencontres infinies, aussi mystérieux dans leur confection que dans leur représentation.<br><br>__________________________________<br><br>Clémence Mauger est née en 1991 à Roubaix. Après un master d’arts plastiques à Paris 1 et un DNSEP à la Villa Arson à Nice, elle a été sélectionnée pour le prix Emerige en 2020.<br>Elle a eu présenté deux expositions personnelles au centre d’art Les églises à Chelles et à La Serre à Saint-Etienne. Trois de ses peintures ont été acquises par le Frac Auvergne et deux d’entre elles ont été exposées lors de l’exposition Beautés au FRAC en 2023. Son travail a été aussi présenté au musée de l’Orangerie en 2025 lors de l’exposition « Dans le flou, une autre vision de l’art de 1945 à nos jours », qui a ensuite migré au CaixaForum à Madrid (« Desen focado, otra visión del arte ») et finalement au CaixaForum de Barcelone (printemps 2026).<br><br>Clémence Mauger aime adapter sa pratique aux espaces offerts, en créant de grands formats sur mesure ou in situ, comme à Saint-Etienne pour Le Mur (2025) et dans le Morbihan pour L’art dans les chapelles (été 2026).",
        website: "",
        instagram: "https://www.instagram.com/clemencemau/",
        images: [
            { src: "img/Clemence-Mauger-2.jpg", caption: "Moon pods (1) & (2), 2022" },
            { src: "img/Clemence-Mauger-3.jpg", caption: "Hubble bubble, 2021" },
            { src: "img/Clemence-Mauger-1.jpg", caption: "Space Flower, 2023" },
            { src: "img/Clemence-Mauger-4.jpg", caption: "Rainy Milky Way (détail), 2020" }
        ]
    },

    "Mikaël Monchicourt": {
        text: "Le travail de l'artiste Mikaël Monchicourt est fait de détours, de tâtonnements, de questionnements dont l'issue est à rechercher dans un recoin labyrinthique de l'esprit. La pratique ondoie, tout comme les idées chez l'artiste qui procède par assemblage, accumulation, distorsion et effacement combinant des éléments hétérogènes (peinture, encre, impression, colle blanche, aluminium, rhodoïd, tissu, couverture de survie) donnant corps à une image concentrée, où le chaos devient équilibre formel. Mikaël Monchicourt décortique, brise, tisse à l'infini des liens entre les images, les mots, leurs sons, leur forme pour les faire basculer d'un état de symbole à celui de matière, physique et palpable, soumise à la loi de la gravité et aux flux.<br><br>Les images et les médiums s'entremêlent, se recouvrent pour finalement être piégés dans la résine. L'épaisseur devient plane, compressée, ne laissant que le souvenir de son histoire et de ses aspérités. On voit sans voir, on imagine plutôt, tel un archéologue qui recrée ce qui a pu se jouer sur son lieu de fouille.<br><br>Les œuvres de l'artiste sont autant le résultat d'une pratique minutieuse, maîtrisée et consciente que d'une recherche empirique faite de rencontres hasardeuses sur Google Image, de concours de circonstances et d'expérimentations. Il s'interroge sur les circonstances d'existence d'une image, sa mise à distance tout en la précipitant sous une résine qui se voudrait inaltérable.<br><br>L'artiste suit ainsi la route sinueuse de ses obsessions se transformant en collectionneur de statistiques (Le bureau du stat- isticien, 2014 ; série Stats, 2021) de lettres (Collection de lettres, 2018), de formes, n'hésitant pas à réemployer les images de ses œuvres qu'il dissèque pour leur donner une autonomie et les faire entrer dans un nouvel inventaire (série Sans titre, 2021). (...)<br><br>Myriam BOUTRY, juin 2021",
        website: "https://www.mikael-monchicourt.com",
        instagram: "https://www.instagram.com/mikaelmonchicourt/",
        images: [
            { src: "img/Mikaël Monchicourt.avif", caption: "" },
            { src: "img/Mikaël Monchicourt_2.avif", caption: "" },
            { src: "img/Mikaël Monchicourt_3.avif", caption: "" },
            { src: "img/Mikaël Monchicourt_4.avif", caption: "" },
            { src: "img/Mikaël Monchicourt_5.avif", caption: "" }
        ]
    },

    "Eloïse Le Gallo": {
        text: "Diplômée des Beaux-Arts de Paris en 2013 Eloïse Le Gallo travaille en duo avec Julia Borderie depuis 2016. Artistes-réalisatrices françaises nées en 1989, elles font de l'expérience de l'altérité une condition de la création artistique. Sur un mode exploratoire, elles s'intéressent ensemble à l'interaction profonde que l'eau entretient avec les territoires qu'elle baigne, de la source à l'océan, en remontant à l'origine génésique des êtres qui y vivent et à l'origine géologique des matériaux dans le paysage. Dans une approche documentaire poétique, l'œil de la caméra opère en catalyseur de rencontre, tout en questionnant les gestes humains qui façonnent matières et territoires. Au cœur d'un maillage de points de vue et de disciplines (techniques artisanales, géologie, chimie, biologie marine etc.) leur travail se développe à la croisée de la sculpture et du cinéma. Récemment, leur recherche les a amenées à s'interroger plus spécifiquement sur les complémentarités entre forme savante et forme sensible, dans des collaborations avec des scientifiques autour de formes générées par leurs outils technologiques de pointe. Elles sont diplômées du Fresnoy - Studio des arts contemporains en duo en 2023.<br><br>En parallèle, Eloïse Le Gallo a développé un travail de recherche depuis 2012 autour du travail de l'artiste américain HC Westermann, publiant un premier article Horace Clifford Westermann, une mécanique de l'idée, dans ArtPress en Février 2019 puis un deuxième article Horace Clifford Westermann : si l'homme était une idée! dans les Cahiers du Musée National d'Art Moderne, Hiver 2019/2020.",
        website: "http://www.eloiselegallo.com/index.html",
        instagram: "https://www.instagram.com/borderielegallo/",
        images: [
            { src: "img/Eloise-Le-Gallo_Julia Borderie_Remontage_Lithostase et Tachychronie_2024_©FredMargueron.jpeg", caption: "Remontage : Lithostase et Tachychronie, Eloïse Le Gallo & Julia Borderie, 2024, films 16 mm numérisés, 11'55 et 9'" },
            { src: "img/Eloise-Le-Gallo_Julia Borderie_Æquo_2023.jpeg", caption: "ÆQUO, Eloïse Le Gallo & Julia Borderie, 2023, film 16 mm et 3D, 20'" },
            { src: "img/Eloise-Le-Gallo_Julia Borderie_Bleu_silico_2022.jpeg", caption: "Bleu Silico, Eloïse Le Gallo & Julia Borderie, 2022, film 16 mm et HD 16'" },
            { src: "img/Eloise-Le-Gallo_Julia Borderie_Troisieme_main_2021_©Nicolas Brasseur.jpeg", caption: "La troisième main, Eloïse Le Gallo & Julia Borderie, 2021, Verre, métal, plâtre, 120 x 30 x 40 cm" },
            { src: "img/Eloise-Le-Gallo_Julia Borderie_yec_silex_2021_©RachaelWoodson.jpeg", caption: "Yec silex, 2021, Silex, 22,5 x 28 x 7 cm" }
        ]
    },

    "Lucie Douriaud": {
        text: "« Ne rien extraire ni prélever, faire avec l'existant : telle serait la devise de Lucie Douriaud, dont l'économie de production observe une éthique de la sobriété reposant sur la récupération des chutes et déchets, leur pulvérisation et réemploi. » « L'extractivisme sans borne qui ravage les écosystèmes, la production accélérée et massive des déchets débordent donc les préoccupations des années 1970. Habituée dès la primaire à faire des nettoyages de printemps en forêt, l'artiste appartient à cette génération saisie par l'éco-anxiété et la solastalgie, ce sentiment d'impuissante tristesse face à la disparition d'un paysage ou d'une saison. Témoin de la fuite de carburants dans les océans et de plastiques dans les organismes, Douriaud pense certaines sculptures comme de véritables pièges, capables d'incorporer des particules de matière dans la course effrénée qui les propulse de la mine à la décharge, de leur site d'extraction à celui de leur enfouissement. »<br><br>Hélène Meisel, Collecter, trier, pulvériser, piéger. La méthode Douriaud, bourse Ekphrasis ADAGP, novembre 2024",
        website: "https://luciedouriaud.fr/",
        instagram: "https://www.instagram.com/lucie.douriaud/",
        images: [
            { src: "img/Lucie-Douriaud_Quand un océan meurt_2021.jpg", caption: "Quand un océan meurt, une montagne naît, 2021, moulage, plâtre, plastiques et coquillages broyés, bois brûlé, acier, 150 x 240 x 300 cm, © Salim Santa Lucia" },
            { src: "img/Lucie-Douriaud-The next oil_2_2023.jpg", caption: "The next oil #2, 2023, moulage, pâte de verre, acier, laiton, cuivre, installation aux dimensions variables, © Salim Santa Lucia" },
            { src: "img/Lucie-Douriaud-The next oil_2b_2023.jpg", caption: "The next oil #2, 2023, © Salim Santa Lucia" },
            { src: "img/Lucie-Douriaud_Abies Nordmanniana_2024.jpg", caption: "Abies Nordmanniana #2, 2024, aiguilles d'un sapin de Noël broyées, tubes PVC cristal, fils métalliques, tourillons brûlés, © Salim Santa Lucia" },
            { src: "img/Lucie-Douriaud_Nouer le Dur_2024.jpg", caption: "Nouer le Dur, 2024, feutre et encre sur papier Bristol, tressage aux fils métalliques, bois brûlé, © Mathieu Roquigny" }
        ]
    },

    "Célia Coëtte": {
        text: "Née en 1988 en région parisienne, Célia Coëtte est artiste plasticienne, diplômée des Beaux-Arts de Paris en 2016 avec les félicitations du jury. Dans une pratique pluridisciplinaire, tournée principalement vers la sculpture-installation et la performance, sa pratique évoque des rituels vernaculaires tels que la danse, la fête et le carnaval, dans une économie de matières, tout en abordant en creux la surconsommation et l'épuisement des corps. Les paysages qu'elle crée sont bien souvent figés et squelettiques et les suggestions des corps sont autant de coquilles vides qu'elle vient porter pour redonner un souffle par la présence du corps vivant.<br><br>Célia Coëtte a participé à Felicita 17 aux Beaux arts de Paris puis au 63ème salon de Montrouge en 2018. Elle a depuis exposé à la Maison des arts de Malakoff et a été soutenue par le Parc Saint Léger. Elle a exposé dans plusieurs galeries telles que Laure Roynette, Isabelle Gounod, PCP ou Michel Journiac. Elle a également effectué plusieurs résidences, à la Maison Artagon en 2023, à la Fondation Fiminco en 2025 et au centre Tignous d'art contemporain de Montreuil en 2026.<br><br>Elle expose aussi au sein d'artists-run-spaces tels que DOC!, Zone Sensible ou le Houloc, ou aux côtés d'artists-no-space comme avec le collectif Ygrève ou Thundercage.<br><br>En 2018 elle s'initie à la danse, commence le conservatoire en danse contemporaine d'Aubervilliers pour finalement préférer se former de façon indépendante. Célia Coëtte commence à écrire et interpréter des performances en 2023 où elle explore les sujets de l'altérité, de l'empathie et du dépassement de soi.",
        website: "https://celiacoette.com/",
        instagram: "https://www.instagram.com/celiacolette/",
        images: [
            { src: "img/Celia-Coette_Les Parques-2022.JPG", caption: "Les Parques, 2022, installation murale, Thundercage - © Romain Vicari" },
            { src: "img/Celia-Coette_Dévoration-2022.jpg", caption: "Dévoration, 2022, Performance avec biscuits de céramique - performance, 47 Résidence" },
            { src: "img/Celia-Coette_Our-Remaining-body-rate-2025.jpg", caption: "Our Remaining body rate, 2025, Installation, Fondation Fiminco, © Manuel Abella" },
            { src: "img/Celia-Coette_Ce-que-nos-corps-ont-en-commun.jpg", caption: "Ce que nos corps ont en commun (Une nuit sur ton épaule), Céramique, © Célia Coëtte" },
            { src: "img/Celia-Coette_Le-Vestiaire_2025.jpg", caption: "Le Vestiaire, 2025, Fondation Fiminco © Célia Coëtte" }
        ]
    },

    "Adalbert Khan": {
        text: "",
        website: "https://www.adalbertkhan.fr/",
        instagram: "https://www.instagram.com/adalbertkhan_vojta/",
        images: [
            { src: "img/Adalbert-Khan_1.jpg", caption: "Nous sommes tous innocents, Kirghizistan 2016 - 2020" },
            { src: "img/Adalbert-Khan_2.jpg", caption: "Le Grand Ouzbek, Ouzbékistan 2016 - 2020" },
            { src: "img/Adalbert-Khan_3.jpg", caption: "Les lendemains, Kazakhstan 2016 - 2020" },
            { src: "img/Adalbert-Khan_4.jpg", caption: "Le jour viendra du Louvre Issyk Kul, Kirghizistan 2016 - 2020" }
        ]
    },

    "Raphaël Tiberghien": {
        text: "Je m'intéresse aux rapports qu'entretiennent les formes plastiques avec le langage. Au moment où le sens quitte nos représentations mentales pour s'inscrire dans la matière. À celui où un élément de la réalité physique devient significatif à nos yeux. Les mots, comme les objets, sont les supports d'échanges de sens et de valeurs.<br><br>Partant d'une pratique de l'écriture, j'utilise l'espace de l'exposition pour déployer cette dernière, la prolonger, l'amplifier, et tenter ainsi de dégager d'autres manières de dire ou de percevoir. À chaque fois, il s'agit de chercher le seuil, le point de bascule entre le fond et la forme. De saisir les dialogues entre le conceptuel et le sensible, la pensée et le corps, l'individuel et le collectif... dans l'atelier, ces notions trouvent leur pendant dans des jeux de transparence et d'opacité, de mollesse, de densité, etc.<br><br>J'aime à envisager l'art comme une pratique expérimentale au sein de laquelle des formes hétérogènes participent ensemble de la cohérence d'une recherche. Le son est l'un des éléments du vocabulaire que je développe. Je m'intéresse à sa capacité à occuper un volume, à restituer la temporalité de la parole par l'intermédiaire de la voix. La céramique en est un autre, dont la sensualité peut faire penser à la chair. J'utilise le métal, le plâtre, le bois, médiums traditionnels de la sculpture, mais aussi des techniques hybrides, mêlant éditions papier ou installations numériques par exemple.<br><br>Ces techniques sont pour moi autant d'outils, avec lesquels je compose comme on assemblerait des signes sur une feuille de papier. L'exploration des porosités entre les catégories de l'expérience artistique vise à faire émerger d'entre les formes et les significations un espace d'observation ouvert sur des réalités humaines ; j'ai le sentiment d'avoir atteint mon objectif quand une pièce fonctionne comme un révélateur.",
        website: "https://raphaeltiberghien.com/",
        instagram: "https://www.instagram.com/raphaeltiberghien/",
        images: [
            { src: "img/Raphael-Tiberghien_pensee_qui_reste_1.jpg", caption: "Une Pensée qui reste, 2022" },
            { src: "img/Raphael-Tiberghien_soulevement_des_objets.jpg", caption: "Le soulèvement des objets, 2013" },
            { src: "img/Raphael-Tiberghien_secretions_1.jpg", caption: "Sécrétions, 2018" },
            { src: "img/Raphael-Tiberghien_secretions_scenes_1.jpg", caption: "Sécrétions – série des scènes, 2019" },
            { src: "img/Raphael-Tiberghien_Velato.jpg", caption: "Velato, 2016" }
        ]
    },

    "Mercedes Semino": {
        text: "Architecte de l'illusion, Mercedes Semino troque les motifs naturels pour des ruines contemporaines aux couleurs prémodernes. Dans ce décor surréaliste, inutile de chercher une perspective logique. L'artiste s'amuse à nous perdre dans un labyrinthe d'escaliers sans arrivée pour mieux nous interroger sur l'appropriation humaine de l'espace, à l'épreuve du temps. La texture granuleuse de ses toiles architecturales convoquerait une ancienne fresque de Giotto sortie de l'oubli. Diplômée des Beaux-Arts de Paris en 2018, Mercedes prolonge l'aspect granuleux dans ses céramiques design, contrastant avec la rigidité des lignes qui les ornent. Voilà de quoi contrarier les angles droits qui n'existent aussi parfaitement que dans les sociétés industrialisées.",
        website: "",
        instagram: "https://www.instagram.com/mercedes_semino/",
        images: [
            { src: "img/Mercedes-Semino_Catastrophe_2024.PNG", caption: "Catastrophe, 2024" },
            { src: "img/Mercedes-Semino_2022.PNG", caption: "" },
            { src: "img/Mercedes-Semino_2_2022.PNG", caption: "" },
            { src: "img/Mercedes-Semino_3_2022.PNG", caption: "" },
            { src: "img/Mercedes-Semino_Huile sur bâche de protection noire_2022.PNG", caption: "Huile sur bâche de protection noire, 2022" }
        ]
    },

    "Vanina Langer": {
        text: "Mon travail questionne notre relation à l'infini, du vivant et de l'espace. Son inconcevabilité pour notre esprit qui pense en termes de contenu/contenant, me fascine. Dans l'histoire de l'art, j'ai toujours été interpellée par la relation des figures au fond, arrière-plan mais aussi sens de l'oeuvre, qui lorsqu'il s'agit d'un chef d'oeuvre, fuit toujours ailleurs, laissant le spectateur dans un cheminement éternel.<br><br>Les sujets qui travaillent mes oeuvres sont la femme, la nature et la culture du sens et d'une spiritualité dans la création d'images et de mythologies. Le motif du lien – ligne de fuite tout comme liane lancée dans sa course à la lumière, est un fil conducteur plastique et théorique.<br><br>Qu'il s'agisse de dessins ou d'installations, d'œuvres monumentales ou de microcosmes miniatures, je pars toujours d'une chute, d'un fragment; tout se meut ensuite comme une plante. Je dessine, recouvre, coupe et pare jusqu'à une forme de cuisson. Les motifs se reproduisent pour être recouverts, retaillés, recousus, ré-parés… jusqu'à ce que le fond et la forme semblent rester en suspens.<br><br>J'accumule références et motifs par analogies jusqu'à une forme d'éclatement polysémique. Son mystère s'exprime souvent dans des œuvres totales proposant au spectateur une expérience polysensorielle. Les mythologies que je compose sur quelques années tendent de plus en plus vers une forme de fête.",
        website: "https://www.vaninalanger.com",
        instagram: "https://www.instagram.com/vanina.langer/",
        images: [
            { src: "img/Vanina-Langer_Le-Paysage-de-la-Loba.jpg", caption: "Le Paysage de la Loba" },
            { src: "img/Vanina-Langer_Faire-lautruche-Cleopatre.jpg", caption: "Faire l'autruche - Cléopâtre" },
            { src: "img/Vanina-Langer_Faire-lautruche-Menines.jpg", caption: "Faire l'autruche - Ménines" },
            { src: "img/Vanina-Langer_Gloria-Performance.jpg", caption: "Gloria - Performance" },
            { src: "img/Vanina-Langer_Portrait-Cleo-Marguerite.jpg", caption: "Portrait Cléo Marguerite" }
        ]
    },

    "Elisa Chaveneau": {
        text: "Elisa Chaveneau est née en 2000 à Châtellerault. Elle vit et travaille à Paris. Artiste plasticienne, elle est diplômée du DNSEP MAGMA (Art & Géomatériaux) aux Beaux-Arts du Mans et d'un master en Recherche et Création - Écologie des arts et des médias à l'Université Paris-Vincennes. Elle développe dans sa pratique artistique une cohabitation sensible autour des relations inter-espèces, entre les humains et les non-humains. Elle interroge nos relations et notre capacité à coexister avec les vivants autres qu'humains à travers des sculptures et des installations, mais aussi par le dessin ou le son. Ses recherches se fondent sur l'idée d'une crise de la sensibilité, c'est-à-dire une perte de lien avec les formes de vies autres qu'humaines, invisibles, rendues muettes par nos systèmes productivistes. Elle a exposé au Musée d'Art Moderne de Paris, Les Flammes en 2021, au Centre Céramique Contemporaine de La Borne Digital Soba, à la Biennale Internationale Design de Saint Étienne Le monde Sinon rien en 2022, au Jardinier de Montrouge en2025. Et récemment à Paris au Wonder, avec l'exposition Summer Body et au Micro Centre d'Art de L'éprouvette avec Terra Strata, aux côtés de Noémie Vincent-Maudry avec qui elle a co-fondé le studio Nom'É en 2025.",
        instagram: "https://www.instagram.com/elisachaveneau/",
        images: [
            { src: "img/Elisa-Chaveneau_1.avif", caption: "" },
            { src: "img/Elisa-Chaveneau_2.avif", caption: "" },
            { src: "img/Elisa-Chaveneau_3.avif", caption: "" },
            { src: "img/Elisa-Chaveneau_4.avif", caption: "" }
        ]
    }
};

// ---------------------------
// 2. Initialisierung & Parallax
// ---------------------------
const artists = document.querySelectorAll(".artist-box");
const boxTopArt = document.getElementById("box-top-artistes");
const boxMidArt = document.getElementById("box-mid-artistes");
const boxBottomArt = document.getElementById("box-bottom-artistes");
const greenDotsArt = document.getElementById("green-dots-artistes");

window.addEventListener("scroll", () => {
    const scroll = window.scrollY;

    // Parallax für allgemeine Elemente
    const elements = {
        "bientot-tag": [0.05, -0.12, -5],
        "event-box": [0, -0.08, 0, true], // scale
        "box-top": [-0.1, -0.05, 0],
        "box-mid": [0.12, 0, 0],
        "box-bottom": [0.05, -0.12, -1],
        "green-dots": [0.12, 0, 0],
        "box-top-archives": [0.08, -0.03, 0],
            "archive-menu": [-0.08, 0.05, 1],
          "archive-socials": [0.02, -0.05, 0],
           "archive-main": [-0.12, 0.02, 0],
        "info-menu": [-0.12, 0.1, -1],
           "box-top-info": [0.08, 0.05, 0],
         "info-nav-box": [-0.12, 0.12, -1],
          "info-socials": [-0.12, 0, 2],
            "box-bottom-info": [0.05, -0.08, -2],
          "box-bottom-info-archive": [0.05, -0.08, 0],
          "info-socials-info": [-0.12, 0.12, -1],
         "box-bottom-info-info": [0.05, -0.08, -1]
       
        
        
    
      
     
        
      
        
    };

 Object.keys(elements).forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
        const [x, y, r, isScale] = elements[id];
        const isMobile = window.innerWidth <= 1024;

        if (isMobile) {
            // --- MOBILE LOGIK ---

            // 1. Liste der IDs, die auf Mobile absolut STABIL bleiben müssen (kein X, kein R)
            // Das löst das Problem mit der Social-Box und der Archiv-Main Box
            const stayCentered = [
                "info-socials", 
                "archive-socials", 
                "green-dots", 
                "green-dots-artistes",
                "archive-main",
                "artist-container",
               "box-bottom-artistes",
                "box-bottom-artistes"   
            ];
            
            const isFixed = stayCentered.includes(id);

            // 2. Werte berechnen
            // Wenn in Liste: x=0 und r=0. Wenn nicht: abgeschwächt.
            const mobileX = isFixed ? 0 : x * 0.1; 
            const mobileY = y * 0.05; 
            const mobileR = isFixed ? 0 : r * 0.3;

            // 3. Transformation anwenden
            el.style.transform = isScale
                ? `translateY(${scroll * mobileY}px) scale(${1 + scroll * 0.00005})`
                : `translate(${scroll * mobileX}px, ${scroll * mobileY}px) rotate(${mobileR}deg)`;

        } else {
            // --- DESKTOP LOGIK (Unverändert) ---
            el.style.transform = isScale
                ? `translateY(${scroll * y}px) scale(${1 + scroll * 0.0001})`
                : `translate(${scroll * x}px, ${scroll * y}px) rotate(${r}deg)`;
        }
    }
});

    // Parallax für Artistes-Seite
    if (boxTopArt) boxTopArt.style.transform = `translate(${scroll * -0.07}px, ${scroll * -0.04}px) rotate(-1deg)`;
    if (boxMidArt) boxMidArt.style.transform = `translate(${scroll * 0.1}px, ${scroll * 0.02}px) rotate(0deg)`;
    if (boxBottomArt)
        boxBottomArt.style.transform = `translate(${scroll * -0.03}px, ${scroll * 0.08}px) rotate(-1.5deg)`;
    if (greenDotsArt) greenDotsArt.style.transform = `translateX(${scroll * -0.12}px) rotate(2.2deg)`;

    artists.forEach((box, index) => {
        box.dataset.pX = scroll * 0.02 * Math.sin(index);
        box.dataset.pY = scroll * 0.015 * Math.cos(index);
    });
});

// ---------------------------
// 3. Setup Artist-Boxen (Physics & Shadow)
// ---------------------------
// Farbige Ränder für Artist-Boxen
const borderColors = ["#ff3333", "#207b4f", "#ffcc00"]; // Rot, Grün, Gelb

artists.forEach((box) => {
    box.style.position = "absolute";
    box.style.top = `${Math.random() * (window.innerHeight - 200) + 50}px`;
    box.style.left = `${Math.random() * (window.innerWidth - 250) + 50}px`;

    // Zufällige Border-Farbe auswählen
    const randomBorderColor = borderColors[Math.floor(Math.random() * borderColors.length)];
    box.style.background = "#ffffff"; 
    
    // FARBIGER RAND (ohne Verlauf)
    box.style.boxShadow = `
        0 8px 20px rgba(0, 0, 0, 0.12),
        inset 0 0 0 3px ${randomBorderColor}
    `;

    // PHYSIK
    box.baseVX = (Math.random() - 0.5) * 0.3;
    box.baseVY = (Math.random() - 0.5) * 0.3;
    box.pushVX = 0;
    box.pushVY = 0;

    // VIER ECKEN
    const br = () => Math.floor(Math.random() * 50) + 20;
    box.style.borderRadius = `${br()}px ${br()}px ${br()}px ${br()}px`;
    
    box.style.overflow = "hidden";
    box.style.display = "flex";
    box.style.alignItems = "center";
    box.style.justifyContent = "center";
    box.style.padding = "15px";
    box.style.color = "black"; 
    box.style.fontWeight = "bold";
    box.style.textAlign = "center";
    box.style.cursor = "pointer";
    
box.style.fontFamily = "'Helvetica Now', Helvetica, sans-serif";
box.style.fontWeight = "900"; 
box.style.fontSize = "0.9rem";    // Größer
box.style.letterSpacing = "-0.05em"; // Buchstaben rücken extrem zusammen
box.style.lineHeight = "0.8";
// box.style.textTransform = "uppercase";

    
    box.style.display = "flex";
    box.style.alignItems = "center";
    box.style.justifyContent = "center";
    box.style.textAlign = "center";
    box.style.padding = "15px";
});

// ---------------------------
// 4. Maus-Schub & Animation Loop
// ---------------------------
artists.forEach((box) => {
    box.addEventListener("mousemove", (e) => {
        const pushStrength = 0.15;
        box.pushVX += e.movementX * pushStrength;
        box.pushVY += e.movementY * pushStrength;

        const maxPush = 5;
        box.pushVX = Math.max(-maxPush, Math.min(maxPush, box.pushVX));
        box.pushVY = Math.max(-maxPush, Math.min(maxPush, box.pushVY));
    });
});

function animate() {
    artists.forEach((box) => {
        let t = parseFloat(box.style.top);
        let l = parseFloat(box.style.left);

        t += box.baseVY + box.pushVY;
        l += box.baseVX + box.pushVX;

        const maxT = window.innerHeight - box.offsetHeight;
        const maxL = window.innerWidth - box.offsetWidth;

        if (t < 0 || t > maxT) {
            box.baseVY *= -1;
            box.pushVY *= -0.5;
            t = t < 0 ? 0 : maxT;
        }
        if (l < 0 || l > maxL) {
            box.baseVX *= -1;
            box.pushVX *= -0.5;
            l = l < 0 ? 0 : maxL;
        }

        box.pushVX *= 0.92;
        box.pushVY *= 0.92;

        box.style.top = `${t}px`;
        box.style.left = `${l}px`;

        const pX = parseFloat(box.dataset.pX) || 0;
        const pY = parseFloat(box.dataset.pY) || 0;
        box.style.transform = `translate(${pX}px, ${pY}px)`;
    });
    requestAnimationFrame(animate);
}
animate();

// ---------------------------
// 5. Overlay Logik (Öffnen/Schließen)
// ---------------------------
function openArtist(name) {
    const overlay = document.getElementById("artist-overlay");
    const container = document.getElementById("overlay-data");
    const contentBox = document.querySelector(".overlay-content");
    

    const data = artistData[name] || { text: "Plus d'infos à venir...", images: [] };

    // Trennung: Erstes Bild und der Rest
    const firstImageData = data.images[0] || null;
    const otherImagesData = data.images.slice(1);

    // Künstlerliste für Navigation (alphabetisch sortiert)
    const artistNames = Object.keys(artistData).sort((a, b) => a.localeCompare(b, 'fr'));
    const currentIndex = artistNames.indexOf(name);
    const prevArtist = currentIndex > 0 ? artistNames[currentIndex - 1] : artistNames[artistNames.length - 1];
    const nextArtist = currentIndex < artistNames.length - 1 ? artistNames[currentIndex + 1] : artistNames[0];

    // Update navigation button click handlers
    const prevBtn = document.querySelector('.artist-prev');
    const nextBtn = document.querySelector('.artist-next');
    if (prevBtn) prevBtn.onclick = () => openArtist(prevArtist);
    if (nextBtn) nextBtn.onclick = () => openArtist(nextArtist);
    
    // Set up currentArtistImages for the lightbox
    currentArtistImages = data.images || [];

    container.innerHTML = `
        <h1 style="text-transform: uppercase; font-size: clamp(2.5rem, 6vw, 4rem); margin: 0 0 25px 0; line-height: 1;">
            ${name}
        </h1>

        <div style="display: flex; gap: 30px; margin-bottom: 40px; align-items: center;">
            ${
                data.website
                    ? `
                <a href="${data.website}" target="_blank" class="artist-link" style="display: flex; align-items: center; gap: 6px; text-decoration: none; color: black; font-weight: bold; font-size: 0.9rem;">
                    <img src="img/website-icon.svg" style="width: 40px; height: 40px;"> <span>WEBSITE</span>
                </a>
            `
                    : ""
            }
            ${
                data.instagram
                    ? `
                <a href="${data.instagram}" target="_blank" class="artist-link" style="display: flex; align-items: center; gap: 8px; text-decoration: none; color: black; font-weight: bold; font-size: 0.9rem;">
                    <img src="img/instagram-icon.svg" style="width: 30px; height: 30px;"> <span>INSTAGRAM</span>
                </a>
            `
                    : ""
            }
        </div>

${
    firstImageData
        ? `
    <div style="margin-bottom: 40px; width: 100%;">
        <img src="${firstImageData.src}" 
             onclick="showFullImage('${firstImageData.src}')" 
             style="width: 100%; display: block; cursor: zoom-in; border: none;">
        
        ${
            firstImageData.caption && firstImageData.caption.trim() !== ""
                ? `
            <p style="color: #888; 
            font-size: 0.8rem; 
            line-height: 1.4; 
            margin-top: 10px; 
            font-style: italic; 
            text-align: right; 
            hyphens: auto; 
            letter-spacing: 1px;">
                ${firstImageData.caption}
            </p>
        `
                : ""
        }
    </div>
`
        : ""
}
     
  
${
    data.text
        ? `
    <div style="
        font-size: 1.2rem; 
        line-height: 1.7; 
        margin-bottom: 60px; 
        width: 100%;               
        text-align: justify;       
        hyphens: auto;             
        word-break: break-word;    
    ">
        ${data.text}
    </div>
`
        : ""
}

<div class="artist-gallery" style="display: flex; flex-direction: column; gap: 60px;">
    ${otherImagesData
        .map(
            (img) => `
        <div style="width: 100%;">
            <img src="${img.src}" 
                 onclick="showFullImage('${img.src}')" 
                 style="width: 100%; 
                 display: block; 
                 cursor: zoom-in; 
                 border: none;">
            
            ${
                img.caption && img.caption.trim() !== ""
                    ? `
                <p style="color: #888; 
                font-size: 0.8rem; 
                line-height: 1.4; 
                margin-top: 10px; 
                font-style: italic; 
                text-align: right; 
                hyphens: auto; 
                letter-spacing: 1px;">
                    ${img.caption}
                </p>
            `
                    : ""
            }
        </div>
    `
        )
        .join("")}
</div>

        <div style="margin-top: 80px; padding-bottom: 80px; display: flex; flex-direction: column; align-items: center; gap: 20px;">
            <div style="width: 60px; height: 3px; background: black;"></div>
          
        </div>
    `;

    overlay.classList.add("active"); document.body.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    setTimeout(() => {
        overlay.scrollTop = 0;
        if (container) container.scrollTop = 0;
        if (contentBox) contentBox.scrollTop = 0;
    }, 10); // 10 Millisekunden Verzögerung reichen oft aus
}

function closeOverlay() {
    document.getElementById("artist-overlay").classList.remove("active"); document.body.style.overflow = "auto"; // Fixed to use class;
}

// Keyboard navigation for Artist popup
let currentArtistName = "";

document.addEventListener("keydown", (e) => {
    const artistOverlay = document.getElementById("artist-overlay");
    const lightboxActive = document.getElementById("lightbox-overlay")?.style.display === "flex";
    
    // Check if artist overlay is visible
    if (!artistOverlay.classList.contains("active")) return;
    
    if (e.key === "Escape") {
        if (lightboxActive) {
            closeLightbox();
        } else {
            closeOverlay();
        }
        return;
    }
    
    // Only allow artist popup navigation if lightbox is NOT active
    if (!lightboxActive) {
        if (e.key === "ArrowRight") {
            document.querySelector('.artist-next')?.click();
        }
        if (e.key === "ArrowLeft") {
            document.querySelector('.artist-prev')?.click();
        }
    }
});

// Äußere Navigationspfeile für Artist-Pop-up erstellen
function createArtistNavArrows(prevArtist, nextArtist) {
    // Zuerst alle existierenden Pfeile entfernen
    removeArtistNavArrows();
    
    // Linker Pfeil (vorheriger Künstler)
    const prevArrow = document.createElement('div');
    prevArrow.className = 'artist-nav-arrow prev';
    prevArrow.innerHTML = '←';
    prevArrow.onclick = () => openArtist(prevArtist);
    prevArrow.title = `Vorheriger: ${prevArtist}`;
    
    // Rechter Pfeil (nächster Künstler)
    const nextArrow = document.createElement('div');
    nextArrow.className = 'artist-nav-arrow next';
    nextArrow.innerHTML = '→';
    nextArrow.onclick = () => openArtist(nextArtist);
    nextArrow.title = `Nächster: ${nextArtist}`;
    
    // Pfeile zum Body hinzufügen
    document.body.appendChild(prevArrow);
    document.body.appendChild(nextArrow);
}

// Äußere Navigationspfeile entfernen
function removeArtistNavArrows() {
    const existingArrows = document.querySelectorAll('.artist-nav-arrow');
    existingArrows.forEach(arrow => arrow.remove());
}

// Äußere Navigationspfeile für Archive-Pop-up erstellen
function createArchiveNavArrows(prevId, nextId) {
    // Zuerst alle existierenden Pfeile entfernen
    removeArchiveNavArrows();
    
    // Linker Pfeil (vorheriges Event)
    const prevArrow = document.createElement('div');
    prevArrow.className = 'archive-nav-arrow prev';
    prevArrow.innerHTML = '←';
    prevArrow.onclick = () => openArchivePopup(prevId);
    prevArrow.title = `Vorheriges Event`;
    
    // Rechter Pfeil (nächstes Event)
    const nextArrow = document.createElement('div');
    nextArrow.className = 'archive-nav-arrow next';
    nextArrow.innerHTML = '→';
    nextArrow.onclick = () => openArchivePopup(nextId);
    nextArrow.title = `Nächstes Event`;
    
    // Pfeile zum Body hinzufügen
    document.body.appendChild(prevArrow);
    document.body.appendChild(nextArrow);
}

// Äußere Navigationspfeile für Archive entfernen
function removeArchiveNavArrows() {
    const existingArrows = document.querySelectorAll('.archive-nav-arrow');
    existingArrows.forEach(arrow => arrow.remove());
}

document.addEventListener("click", (e) => {
    const overlay = document.getElementById("artist-overlay");
    const closeBox = document.querySelector(".artist-close-button");

    if (e.target === overlay || e.target === closeBox) {
        closeOverlay();
    }
    
    // Artist navigation buttons
    const artistCloseBtn = e.target.closest('.artist-close-button');
    if (artistCloseBtn) {
        closeOverlay();
    }
    
    // Get current artist from the overlay to determine prev/next
    const artistOverlay = document.getElementById("artist-overlay");
    if (artistOverlay.classList.contains("active")) {
        const artistName = document.querySelector("#overlay-data h1")?.textContent?.trim();
        if (artistName) {
            const artistNames = Object.keys(artistData);
            const currentIndex = artistNames.indexOf(artistName);
            
            // Check if prev button was clicked
            if (e.target.closest('.artist-prev')) {
                const prevArtist = currentIndex > 0 ? artistNames[currentIndex - 1] : artistNames[artistNames.length - 1];
                openArtist(prevArtist);
            }
            
            // Check if next button was clicked
            if (e.target.closest('.artist-next')) {
                const nextArtist = currentIndex < artistNames.length - 1 ? artistNames[currentIndex + 1] : artistNames[0];
                openArtist(nextArtist);
            }
        }
    }

    const infoOverlay = document.getElementById("info-overlay");
    const infoCloseBox = document.querySelector(".info-close-box");

    if (e.target === infoOverlay || e.target === infoCloseBox) {
        closeInfoOverlay();
    }

    const artistBox = e.target.closest(".artist-box");
    if (artistBox) {
        e.preventDefault();
        openArtist(artistBox.innerText.trim());
    }

    const sidebarLink = e.target.closest(".sidebar-list a");
    if (sidebarLink) {
        e.preventDefault();
        openArtist(sidebarLink.innerText.trim());
    }
});

// ---------------------------
// 6. Sidebar & Mobile Setup
// ---------------------------
function setupSidebar() {
    const sidebarList = document.querySelector(".sidebar-list");
    const artistBoxes = document.querySelectorAll(".artist-box");
    if (!sidebarList || artistBoxes.length === 0) return;

    let names = Array.from(artistBoxes)
        .map((box) => box.innerText.trim())
        .filter((n) => n);
    names.sort((a, b) => a.localeCompare(b));

    sidebarList.innerHTML = names.map((name) => `<li><a href="#">${name}</a></li>`).join("");
}

function setupMobileMenu() {
    const handle = document.querySelector(".sidebar-handle");
    const sidebar = document.querySelector(".artist-sidebar");
    if (handle && sidebar) {
        handle.addEventListener("click", (e) => {
            e.stopPropagation();
            sidebar.classList.toggle("active");
        });
        document.addEventListener("click", (e) => {
            if (!sidebar.contains(e.target) && !handle.contains(e.target)) {
                sidebar.classList.remove("active");
            }
        });
    }
}

window.addEventListener("DOMContentLoaded", () => {
    setupSidebar();
    setupMobileMenu();
});

function showFullImage(src) {
    const lb = document.getElementById("lightbox-overlay");
    const lbImg = document.getElementById("lightbox-img");

    // Speichert den Index des aktuell angeklickten Bildes
    currentArtistImgIndex = currentArtistImages.findIndex(img => img.src === src);

    lbImg.src = src;
    lb.style.display = "flex";
}

// Artist Lightbox Functions
function closeLightbox() {
    document.getElementById("lightbox-overlay").style.display = "none";
}

function prevLightboxImage() {
    if (currentArtistImages.length === 0) return;
    currentArtistImgIndex = (currentArtistImgIndex - 1 + currentArtistImages.length) % currentArtistImages.length;
    const imgData = currentArtistImages[currentArtistImgIndex];
    document.getElementById("lightbox-img").src = imgData.src;
}

function nextLightboxImage() {
    if (currentArtistImages.length === 0) return;
    currentArtistImgIndex = (currentArtistImgIndex + 1) % currentArtistImages.length;
    const imgData = currentArtistImages[currentArtistImgIndex];
    document.getElementById("lightbox-img").src = imgData.src;
}

// Keyboard navigation for Artist Lightbox
document.addEventListener("keydown", (e) => {
    const lb = document.getElementById("lightbox-overlay");
    if (lb.style.display !== "flex") return;
    
    if (e.key === "Escape") {
        closeLightbox();
    }
    if (e.key === "ArrowRight") {
        nextLightboxImage();
    }
    if (e.key === "ArrowLeft") {
        prevLightboxImage();
    }
});

// 1. Event-Datenbank
const eventData = {
    title: "NUIT BLANCHE",
    lieu: "Le Houloc, La Courneuve",
    date: "27 mai 2026",
    vernissage: "19:00 Uhr",
    image: "img/flyer-nuit-blanche.jpg", // Pfad zu deinem Flyer
    text: "Venez découvrir les ateliers et les installations spéciales pour cette nuit magique. Plusieurs artistes présenteront des performances uniques..."
};

// 2. Funktion zum Öffnen des Events
function openEvent() {
    const overlay = document.getElementById("event-overlay");
    const innerContainer = document.getElementById("event-inner-content");

    if (!overlay || !innerContainer) return;

    innerContainer.innerHTML = `
    <div id="event-top-anchor" style="height: 1px;"></div>
    <hr style="border:0; border-top:3px solid black; margin-bottom:40px;">
        <hr id="event-top" style="border:0; margin: 0 0 40px 0; width: 100%;">
        
        <h1 style="text-transform: uppercase; font-size: clamp(2.5rem, 6vw, 4rem); margin: 0 0 25px 0; line-height: 1;">
            ${eventData.title}
        </h1>

        <div style="font-weight: bold; margin-bottom: 40px; line-height: 1.6; text-transform: uppercase; font-size: 0.9rem;">
            ${eventData.lieu ? `<p>LIEU: ${eventData.lieu}</p>` : ""}
            ${eventData.date ? `<p>DATE: ${eventData.date}</p>` : ""}
            ${eventData.vernissage ? `<p>VERNISSAGE: ${eventData.vernissage}</p>` : ""}
        </div>

        ${
            eventData.image
                ? `
            <div style="margin-bottom: 40px; width: 100%;">
                <img src="${eventData.image}" style="width:100%; border:none; display: block;">
            </div>
        `
                : ""
        }

        <div style="text-align: justify; hyphens: auto; font-size: 1.2rem; line-height: 1.7; word-break: break-word;">
            ${eventData.text}
        </div>

        <div style="margin-top: 100px; padding-bottom: 20px; display: flex; flex-direction: column; align-items: center;">
            <div style="width: 60px; height: 3px; background: black;"></div>
        </div>
    `;
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";

    // Scroll-Fix analog zu Artist
    setTimeout(() => {
        overlay.scrollTop = 0;
    }, 10);
}

// Schließ-Logik (X-Box oder Klick auf verschwommenen Hintergrund)
document.addEventListener("click", (e) => {
    const overlay = document.getElementById("event-overlay");
    const closeBox = e.target.closest(".close-event-box");
    const artistCloseBtn = e.target.closest('.artist-close-button');

    if (e.target === overlay || closeBox || artistCloseBtn) {
        overlay.classList.remove("active");
        document.body.style.overflow = "auto";
    }
});

// ESC-Taste schließt das Event-Pop-up
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        const overlay = document.getElementById("event-overlay");
        if (overlay && overlay.classList.contains("active")) {
            overlay.classList.remove("active");
            document.body.style.overflow = "auto";
        }
    }
});

// 1. Archiv Datenbank
const archiveData = {
    nymphs: {
        title: "NYMPHS JUST WANNA HAVE FUN",
        flyer: "img/Nymphs-just-wanna-have-fun_18.jpg", // Hier der Pfad zu deinem Flyer 
     description: "<div style='margin-bottom: 12px;'><b>ARTISTES :</b> César Bardoux, Ulysse Bordarias, Mélissa Boucher Morales, Marta Budkiewicz, Léa de Cacqueray, Célia Coëtte, Agathe Dos Santos, Lucie Douriaud, Valentine Esteve, Hugo Ferretto, Charlotte Heninger, Amalia Jaulin, Joerg Hurschler, Adalbert Khan, Éloise Le Gallo & Julia Borderie, Rodolphe Macabéo, Audrey Matt Aubert, Mikaël Monchicourt, Lenny Rébéré, Sidonie Ronfard, Mathieu Roquigny, Laura Rouzet, Chloé Sassi, Lise Stoufflet, Laure Tiberghien, Lucas Tortolano, Romain Vicari</div><div><b>COMMISSAIRE :</b> Salomé Fau</div>",

info: "Exposition du 2 au 16 octobre 2025",
        text: "Nymphs just wanna have fun viendra marquer la dernière programmation du Houloc à Aubervilliers avant le déménagement du lieu. Imaginée par la commissaire d'exposition Salomé Fau, en résidence au Houloc, l’exposition collective déploie les œuvres de vingt artistes résident.e.s du Houloc et six artistes invité.e.s.",
        images: [
             { src: "img/Nymphs-just-wanna-have-fun_17.jpg", caption: "" },
          
            { src: "img/Nymphs-just-wanna-have-fun_3.jpg", caption: "" },
            { src: "img/Nymphs-just-wanna-have-fun_4.jpg", caption: "" },
            { src: "img/Nymphs-just-wanna-have-fun_5.jpg", caption: "" },
            { src: "img/Nymphs-just-wanna-have-fun_6.jpg", caption: ""},
             { src: "img/Nymphs-just-wanna-have-fun_10.jpg", caption: "" },
             { src: "img/Nymphs-just-wanna-have-fun_12.jpg", caption: "" },
             { src: "img/Nymphs-just-wanna-have-fun_13.jpg", caption: ""},
             { src: "img/Nymphs-just-wanna-have-fun_14.jpg", caption: ""},
            { src: "img/Nymphs-just-wanna-have-fun_7.jpg", caption: "" },
             { src: "img/Nymphs-just-wanna-have-fun_8.jpg", caption: "" },
              { src: "img/Nymphs-just-wanna-have-fun_11.jpg", caption: "" },
             { src: "img/Nymphs-just-wanna-have-fun_15.jpg", caption: "" },
               { src: "img/Nymphs-just-wanna-have-fun_2.jpg",caption: ""},
      
        
        ]
    },


fortdaubervilliers: {
        title: "RÉSIDENCE DES ARTISTES DU HOULOC AU FORT D'AUBERVILLIERS",
        flyer: "img/Fort-daubervilliers_2.jpg", 
      description: "<div style='margin-bottom: 12px;'><b>ARTISTES :</b> Melissa Boucher Morales, Laura Rouzet, Marta Budkiewicz, Lise Stoufflet, Lucie Douriaud, Valentine Esteve, Daniela Stubbs-Levi, Adalbert Khan, Joerg Hurschler, Lenny Rebere, Mathieu Roquigny</div>",
       info: "La restitution « Points de vue » a été présentée du 9 au 16 juillet 2025",
        text: "Dans le cadre de la commande de Grand Paris Aménagement pour le Fort D’Aubervilliers amenagement.",
        images: [
        
            { src: "img/Fort-daubervilliers_1.jpg", caption: "" },
            { src: "img/Fort-daubervilliers_5.jpg", caption: "" },
            { src: "img/Fort-daubervilliers_9.jpg", caption: "" },
             { src: "img/Fort-daubervilliers_10.jpg", caption: "" },
             { src: "img/Fort-daubervilliers_12.jpg", caption: "" },
             { src: "img/Fort-daubervilliers_14.jpg", caption: "" },
            { src: "img/Fort-daubervilliers_13.jpg", caption: "" },
             { src: "img/Fort-daubervilliers_4.jpg", caption: "" },
            { src: "img/Fort-daubervilliers_3.jpg", caption: "" },
              { src: "img/Fort-daubervilliers_h_6.jpg", caption: "" },
                { src: "img/Fort-daubervilliers_h_7.jpg", caption: "" },
                { src: "img/Fort-daubervilliers_h_8.jpg", caption: "" },
           
        
        ]
    },
    
    quandmettre: {
        title: "QUAND METTRE UN S À QUATRE?",
        description: "<div style='margin-bottom: 12px;'><b>ARTISTES :</b> Simon Bérard, Pauline Brun, Tom Giampieri, Justin Sanchez</div><div><b>TEXTE :</b> Charlotte Imbault</div>",
         flyer: "img/Quand-mettre-un-s-a-quatre_2.jpg",
        
        info: "Exposition collective du 7 au 11 juin 2025",
        text: "Quatre artistes pour une exposition collective dans l’espace du Houloc, à Aubervilliers. Simon Bérard, Pauline Brun, Tom Giampieri et Justin Sanchez se sont rencontré·es en 2018 à la Station, à Nice. S’ielles se connaissent individuellement, ielles n’ont jamais travaillé ensemble pour une exposition à quatre. À travers Quand mettre un S à quatre, les artistes souhaitent endosser la curation collectivement et produire un ensemble de pièces originales où il s'agira de jeux d’adresses mutuelles et acrobatiques. Chacun·e y sera l’archer, la flèche et la cible. Qu’est-ce que prendre quelqu’un·e à témoin ? Avoir une complicité avec quelqu’un·e ou s’adresser à quelqu’un·e ? L’exposition singulière et collective, traversée par la poétique du geste rendra sensible ce que faire ensemble veut dire.<div style='font-style: italic; font-size: 0.9em; margin-top: 12px;'>Avec le soutien de la Métropole du Grand Paris.</div>",
         images: [
             { src: "img/Quand-mettre-un-s-a-quatre_1.jpg", caption: "" },
            { src: "img/Quand-mettre-un-s-a-quatre_3.jpg", caption: "" },
            { src: "img/Quand-mettre-un-s-a-quatre_4.jpg", caption: "" },
            { src: "img/Quand-mettre-un-s-a-quatre_5.jpg", caption: "" },
              { src: "img/Quand-mettre-un-s-a-quatre_1.jpg", caption: "" },
   
        ]
    },
    
        equinox: {
        title: "EQUINOX SUNRISE",
     description: "<div style='margin-bottom: 12px;'><b>ARTISTES :</b> Marta Budkiewicz, Célia Coëtte, Joerg Hurschler, Adalbert Khan, Eloise Le Gallo et Julia Borderie, Camille Pogu, Mathieu Roquigny, Laura Rouzet, Mercedes Semino</div>",
      flyer: "img/Equinox-sunrise_h_2.jpg",
        
        info: "Exposition collective du 22 mars au 2 mai 2025",
        text: "Cette exposition collective investissait temporairement un ancien magasin dans le centre commercial Quai d’Ivry en plein transition.",
        images: [
             { src: "img/Equinox-sunrise_3.jpg", caption: "" },
            { src: "img/Equinox-sunrise_5.jpg", caption: "" },
            { src: "img/Equinox-sunrise_4.jpg", caption: "" },
              { src: "img/Equinox-sunrise_6.jpg", caption: "" },
             { src: "img/Equinox-sunrise_8.jpg", caption: "" },
             { src: "img/Equinox-sunrise_h_7.jpg", caption: "" },
               { src: "img/Equinox-sunrise_1.jpg", caption: "" },
   
        ]
    },
    
       humannature: {
      title: "HUMAN NATURE",
description: "<div style='margin-bottom: 12px;'><b>COMMISSAIRE :</b> Cédric Esturillo Cacciarella</div><div style='margin-bottom: 12px;'><b>ARTISTES :</b> Romain Coppin, Cédric Esturillo Cacciarella, Frédéric Houvert, Raphaëlle Sabattié, Marijke Vasey</div><div><b>SCÉNOGRAPHIE :</b> Léa Michel</div>",
 flyer: "img/Human-nature_1.jpg",
        
        info: "Exposition collective du 2 au 6 avril 2025",
        text: "Human Nature interroge la relation complexe entre le règne végétal et l’humanité avec une approche écopolitique teintée de fantastique. La flore se propage dans l’exposition sous la forme d’une invasion molle et altruiste ; inspirées par une observation attentive de l’histoire de l’art humaine, les plantes occupent la place qu’elles estiment être la leur, en s’assujettissant aux besoins humains, moins comme une coexistence pacifique qu’un acte de domination consenti. Transformées parfois en objets fonctionnels, en peintures fantastiques, les plantes invitent les publics à voir cette invasion végétale au-delà d’une simple cohabitation, comme un état des lieux de notre relation à la flore.",
        images: [
             { src: "img/Human-nature_5.jpg", caption: "" },
          
             { src: "img/Human-nature_2.jpg", caption: "" },
            { src: "img/Human-nature_h_4.jpg", caption: "" },
              { src: "img/Human-nature_3.jpg", caption: "" }
             
        ]
    },
    
    jaimeraisemporterlefeu: {
        title: "J'AIMERAIS EMPORTER LE FEU",
        description:
            "<div style='margin-bottom: 12px;'><b>ARTISTES :</b> Debby Barthoux, Kristofer Hart et Guilhem Roubichou</div><div><b>COMMISSARIAT :</b> Debby Barthoux et Guilhem Roubichou</div>",
        flyer: "img/expo-j-aimerais-emporter-le-feu-flyer.jpg",
        info: "Exposition du 11 au 16 octobre 2024",
        text: "Ce projet d'exposition nomade aborde les thèmes de l'errance, de la latence, mais aussi du feu dans sa symbolique de destruction et de renaissance. Comme un vestige rescapé des flammes, ce travail prend la forme d'une scénographie de l'après, où la peinture devient objet, et où l'objet semble figé dans son état de destruction. Le spectateur est invité à se déplacer dans cette scénographie de ruine, où un événement vient d'avoir lieu, presque discrètement, sans aucun regard. Cette pièce tend à évoluer, et à accumuler divers objets trouvés dans les lieux où elle sera installée. En travaillant les notions de disparition, d'absence et de présence du corps, souvent suggérées dans les œuvres de Guilhem, et Kristofer, les peintures de Debby représentent physiquement l'humain, presque devenu spectre, tout en le suggérant à travers un regard, ou une bouche, fondu dans des représentations de flammes et dans les émanations de fumée et de cendre.",
        images: [
            { src: "img/expo-jaimerais-01.jpg", caption: "" },
            { src: "img/expo-jaimerais-02.jpg", caption: "" },
            { src: "img/expo-jaimerais-03.jpg", caption: "" },
            { src: "img/expo-jaimerais-06.jpg", caption: "" },
            { src: "img/expo-jaimerais-04.jpg", caption: "" },
            { src: "img/expo-jaimerais-05.jpg", caption: "" }
         
        ]
    },
    
    journeespatrimoine: {
        title: "JOURNÉES DU PATRIMOINE AU HOULOC",
        description:
            "<div style='margin-bottom: 12px;'><b>ARTISTES :</b> César Bardoux, Mélissa Boucher Morales, Ulysse Bordarias, Marta Budkiewicz, Célia Coëtte, Lucie Douriaud, Agathe Dos Santos, Valentine Esteve, Hugo Ferretto, Nikolay Georgiev, Charlotte Heninger, Joerg Hurschler, Adalbert Khan, Eloïse Le Gallo, Audrey Matt Aubert, Mikaël Monchicourt, Lenny Rébéré, Laura Rouzet, Mathieu Roquigny, Lise Stoufflet, Laure Tiberghien</div>",
        flyer: "img/expo-journees-patrimoine-2024-flyer.jpeg",
        info: "21 septembre 2024",
        text: "À l'occasion des Journées du Patrimoine, Le Houloc ouvrira les portes de ses ateliers. De 14h à 19h, les artistes vous proposent des visites de leurs ateliers et la découverte de leurs pratiques artistiques. À 19h, nous aurons le plaisir d'accueillir Colin Johnco et Emmanuelle Parrenin pour un concert mêlant folk, musiques traditionnelles, psychédélisme et musique électronique.",
        images: [
            
            { src: "img/expo-journees-02.jpg", caption: "" },
            { src: "img/expo-journees-03.jpg", caption: "" },
            { src: "img/expo-journees-04.jpg", caption: "" },
            { src: "img/expo-journees-05.jpg", caption: "" },
            { src: "img/expo-journees-06.jpg", caption: "" },
            { src: "img/expo-journees-07.jpg", caption: "" }
            
        ]
    },
    
    shabiter: {
        title: "S'HABITER",
        description:
            "<div style='margin-bottom: 12px;'><b>ARTISTES :</b> Sirine Ammar, Guillaume Constantin, Fanny Didelon, Mathilde Geldhof, Agnès Geoffray, Lise Stoufflet, Raphaël Tiberghien, Pauline Toyer & Adalbertkhan Vojta</div><div><b>COMMISSARIAT :</b> Mathilde Geldhof</div>",
        flyer: "img/expo-s-habiter-flyer.jpg",
        info: "Exposition du 13 au 18 septembre 2024",
        text: "Un fantôme dans l'imaginaire il est transparent, c'est dans la vraie vie qu'il est invisible. -Martial Pilaud- On dirait qu'on allait la trouver, la faire apparaître. On chercherait dans le décor le plus banal. On découvrirait ses contours et on comprendrait ce qu'elle a à dire. On dirait qu'on pourrait enregistrer son souffle et ses traces. On regarderait sur la surface des murs, sur le bord des meubles et on écouterait les mots ordinaires. On dirait qu'on la fixerait et qu'on en ferait une image. On dirait qu'on la saisirait, qu'on la mettrait sous verre ou en boîte. On imaginerait alors que la forme se montre, qu'elle s'expose, qu'elle vient nous Habiter.",
        images: [
            { src: "img/expo-s-habiter-01.jpg", caption: "" },
            { src: "img/expo-s-habiter-02.jpg", caption: "" },
            { src: "img/expo-s-habiter-03.jpg", caption: "" },
            { src: "img/expo-s-habiter-04.jpg", caption: "" },
            { src: "img/expo-s-habiter-05.jpg", caption: "" },
            { src: "img/expo-s-habiter-06.jpg", caption: "" },
            { src: "img/expo-s-habiter-07.jpg", caption: "" },
        
        ]
    },
    
    flatorama: {
        title: "FLAT-O-RAMA",
        description:
            "<div style='margin-bottom: 12px;'><b>COMMISSARIAT :</b> Sirine Ammar et Eléonore Geissler</div><div><b>ARTISTES :</b> Sarah Anaïs Desbenoit, Jot Fau, Ismail Alaoui Fdili, Albin Poupart, Zoé Thonet</div>",
        flyer: "img/expo-flat-o-rama-flyer.jpg",
        info: "Exposition du 12 au 16 avril 2024",
        text: "Flat-o-rama met à plat le principe d'un appartement et propose un espace d'exposition dans lequel les œuvres cohabitent comme des voisines, ronflent, se fâchent, composent ensemble ce qu'on pourrait percevoir comme la mélodie du lieu. Cet habitat fictif dont on visite les pièces n'a pas de murs, il n'y a pas d'usage à proprement parler. L'architecture et le design sont rayés de la carte au profit de l'imaginaire des artistes et de leur manière d'envisager les lieux. Flat-o-rama sera le troisième chapitre de cette série d'exposition imaginée par Sirine Ammar et Eléonore Geissler.",
        images: [
            { src: "img/expo-flat-o-rama-01.jpg", caption: "" }, 
            { src: "img/expo-flat-o-rama-03.jpg", caption: "" },
            { src: "img/expo-flat-o-rama-06.jpg", caption: "" },
            { src: "img/expo-flat-o-rama-07.jpg", caption: "" },
            { src: "img/expo-flat-o-rama-08.jpg", caption: "" },
              { src: "img/expo-flat-o-rama-05.jpg", caption: "" }
        ]
    },
    
    lesaspirateurs: {
        title: "LES ASPIRATEURS SONT DES ÉLÉPHANTS SANS DÉFENSES",
        description:
            "<div style='margin-bottom: 12px;'><b>COMMISSARIAT :</b> Mathieu Buard et Tom Chatenet</div><div><b>ARTISTES :</b> Jeanne Briand, Tom Chatenet, Carina Emery, Jacent, Agathe Jourdan, Marlon Kroll, Mathis Pettenati, Arto Van Hasselt, Xolo Cuintle</div>",
        flyer: "img/expo-les-aspirateurs-flyer.jpg",
        info: "Exposition du 12 au 16 avril 2024",
        text: "Jeu d'associations, récit non linéaire ou grand livre d'une histoire des connaissances sur l'objet tel un cloud iconographique, herbier et projet d'encyclopédie, mais encore catalogue d'antiquaire, composé de visions sur l'objet, voilà ce qu'ambitionne l'exposition. Les pattes des chevaux se sont transformées en roues - L'objet est le sujet. Les écouteurs ont perdu progressivement leurs fils - L'objet est (la clé de) la métamorphose. L'objet est une défiguration passagère. Les aspirateurs sont des éléphants sans défenses. Et les plantes se sont mises à marcher. Chausse-trappes.",
        images: [
         
             { src: "img/expo-lesaspirateurs-04.jpg", caption: "" },
              { src: "img/expo-lesaspirateurs-06.jpg", caption: "" },
            { src: "img/expo-lesaspirateurs-07.jpg", caption: "" },
            { src: "img/expo-lesaspirateurs-02.jpg", caption: "" },
            { src: "img/expo-lesaspirateurs-03.jpg", caption: "" },
            { src: "img/expo-lesaspirateurs-05.jpg", caption: "" }
           
        ]
    },
    
    eteculturel2023: {
        title: "ÉTÉ CULTUREL 2023",
        description:
            "<div style='margin-bottom: 12px;'><b>ARTISTES :</b> Les Froufrous de Lilith (Camille Zéhenne & Bulle Meignan)</div><div><b>COMMISSARIAT :</b> Mathilda Portoghese</div>",
        flyer: "img/expo-ete-culturel-2023-flyer.jpg",
        info: "Exposition du 1er au 6 septembre 2023",
       text: "Première exposition du collectif Les Froufrous de Lilith dans le prolongement du Food&Film, cette exposition autour des rapports croisés entre la pensée libérale et le sandwich, prendra la forme d'une installation vidéo immersive, activée par une performance culinaire imaginée en réponse. Par le biais du foundfootage, du collage et de la mise en récit de l'épopée du Sandwich, cette exposition mets en évidence les liens qui existent entre l'iconic gueuletons et le capitalisme. Immersif et jouissif, «Feeling down. Eating a sandwich. You know the deal. Thanks for watching.» expose l'absurdité autodestructrice d'un sytème qui ne nous veut pas forcément du bien. Patchwork d'images toutes plus révulsantes, grotesques et dégoutantes les unes que les autres, elles sont produits et causalités de notre société autophage.<a href='https://drive.google.com/drive/folders/1umXFs3pkkF4rAk9taGD5f5izn_CLL_qk' target='_blank' style='display: block; margin-top: 15px;'>Dossier de presse</a>", images: [
           
            { src: "img/expo-eteculturel2023-02.jpg", caption: "" }
        ]
    },
    
    poursuitofpleasure: {
        title: "POURSUIT OF PLEASURE",
        description:
            "<div style='margin-bottom: 12px;'><b>ARTISTES :</b> Anna Àdam, Àgoston Bényi, Mélissa Boucher, Quentin Fromont, Valentine Gentilleau, Andrea Éva Györi, Marilou Poncin, Peter Puklus</div><div><b>COMMISSAIRE :</b> Timea Urbantsok</div>",
        flyer: "img/expo-poursuit-of-pleasure-flyer.png",
        info: "Exposition du 30 juin au 6 juillet 2023",
      text: "Pursuit of Pleasures est une exposition collective internationale proposant des représentations alternatives aux imaginaires produits par le circuit mainstream de la pornographie. L'exposition interrogera la porosité qu'il peut y avoir entre une image érotique et une image pornographique. S'appuyant sur le mouvement de la post-pornographie, l'ensemble des oeuvres présentées montreront des représentations diversifiées du corps et de la sexualité, ouvrant un champs d'expérimentation artistique possible.<br><br><div style='text-decoration: underline; margin-bottom: 12px;'>ATELIER MOUVEMENTS par Valentine Gentilleau</div>Au bord du canal, avec un groupe d'une quizaine de personnes, l'artiste proposera dans un premier temps un moment d'éveil collectif. Ce moment sera l'occasion de réveiller le corps et de s'initier à la pratique de l'auto-massage, permettant de stimuler l'énergie du corps tout en se relaxant. Ensuite, Valentine proposera d’utiliser ses sculptures et d’autres objets (masseurs de tête, rouleau de massage) pour ressentir les bienfaits de leurs prises de contact, et penser à l'importance du sens du toucher mit soi-même et mit les autres. Des moments en duo et/ou à plusieurs pourront être envisagés selon les envies de chacun.e. Ce moment de groupe est pensé comme un espace de soin, à l'intérieur duquel chacun.e prend soin de soi et des autres.<a href='https://www.lehouloc.com/_files/ugd/ff6566_3aaeb215b8f34893874af8adf638aac1.pdf' target='_blank' style='display: block; margin-top: 15px;'><b>En savoir plus</b></a>",
      images: [
            { src: "img/expo-poursuitofpleasure-01.jpg", caption: "" },
            { src: "img/expo-poursuitofpleasure-02.jpg", caption: "" },
            { src: "img/expo-poursuitofpleasure-03.jpg", caption: "" },
            { src: "img/expo-poursuitofpleasure-04.jpg", caption: "" },
   
        ]
    },
    
    cloud: {
        title: "CLOUD",
        description:
            "<div style='margin-bottom: 12px;'><b>ARTISTES :</b> Capsule collectif</div>",
        flyer: "img/expo-cloud-01.jpg",
        info: "Exposition du 2 au 6 juin 2023",
        text: "Pour cette exposition, Capsule Collectif propose Cloud, une installation pensée en environnement. Composée de plusieurs modules et de vidéoprojections, elle sera un écosystème dont chaque partie sera interdépendante. Une structure centrale abritera les différentes pièces sculpturales, écrans et autres dispositifs, comme les éléments vivants de ce paysage. Dans l'espace de l'installation, les murs deviendront un panorama. Des images projetées sur l'entièreté des murs transformeront l'espace clos en un monde ouvert. Cloud suggère l'état à venir de notre planète, en adoptant un point de vue décentré qui veut aller au-delà du monde humain. Le vivant se mélange aux matériaux industriels et techniques. Les œuvres du collectif sont les formes de ce monde post-humain. Des objets qui se sont développés sans fonctions, et qui malgré tout s'évertuent à diffuser de faibles signaux lumineux et sonores, comme des échos lointains. Cloud cherche l'arborescence d'une évolution future et les chemins inconnus que prendra le vivant.",
        images: [
       
            { src: "img/expo-cloud-03.jpg", caption: "" },
            { src: "img/expo-cloud-02.jpg", caption: "" },
            { src: "img/expo-cloud-04.jpg", caption: "" },
            { src: "img/expo-cloud-05.jpg", caption: "" }
     
          
        ]
    },
    
    mues: {
        title: "MUES",
        description:
            "<div style='margin-bottom: 12px;'><b>ARTISTES :</b> Mélissa Boucher, Marta Budkiewicz, Célia Coëtte, Valentine Esteve, Hugo Ferretto, Mathilde Geldhof, Joerg Hurschler, Adalbert Khan, Lenny Rébéré, Mathieu Roquigny, Lise Stoufflet, Raphaël Tiberghien</div>",
        flyer: "img/expo-mues-flyer.jpg",
        info: "Exposition du 12 mai au 18 juin 2023",
       text: "<div style='margin-bottom: 12px;'>Investir un espace, puis le quitter, et ne laisser que des enveloppes suspendues pour toute trace du passage de cette douzaine d’artistes, comme autant de peaux abandonnées après une mue. La forme est imposée, comme la règle d’un jeu : chaque artiste produira une pièce en rapport avec l’objet formel qu’est la housse de vêtement, que ce soit en la remplissant, la déformant, en la fabriquant. C’est un vestiaire mémoriel qui se dessine : chacun s’approprie, à sa manière, un objet qui ne sert qu’à protéger son contenu, qu’on oublie de regarder parce que seule sa fonction importe. Les artistes du Houloc sont eux aussi préservés dans un écrin de bâches en plastiques, de cimaises récupérées ici et là, d’ateliers reliés les uns aux autres par un réseau complexe de couloirs et d’escaliers, en passant par un jardin qui les abrite du monde extérieur.</div><div style='margin-bottom: 12px;'>En étant tour à tour remplie, détournée, utilisée comme support ou encore comme contenant, la housse devient un témoin des mutations d’artistes-lézards, toujours en mouvement, dont le travail évolue et change au moins autant qu’eux.</div><div>Travailler en collectif, c’est devoir composer au quotidien avec des pratiques et des personnalités multiples et complexes. Chacun trouve pourtant sa place dans ce désordre mouvant, et l’identité du Houloc en tant que groupe a au moins autant évolué que les vies de ses membres. De ces bouleversements subsistent des mues, qui révèlent autant qu’elles dissimulent, préservent ce dont elles se font la trace. Elles incarnent un portrait collectif de nos questions et de nos recherches personnelles.</div>", images: [
            { src: "img/expo-mues-02.jpg", caption: "" },
            { src: "img/expo-mues-03.jpg", caption: "" },
            { src: "img/expo-mues-04.jpg", caption: "" },
            { src: "img/expo-mues-05.jpg", caption: "" },
            { src: "img/expo-mues-06.jpg", caption: "" },
            { src: "img/expo-mues-07.jpg", caption: "" },
            { src: "img/expo-mues-08.jpg", caption: "" },
            { src: "img/expo-mues-09.jpg", caption: "" },
            { src: "img/expo-mues-10.jpg", caption: "" },
            { src: "img/expo-mues-11.jpg", caption: "" },
            { src: "img/expo-mues-12.jpg", caption: "" },
            { src: "img/expo-mues-13.jpg", caption: "" },
            { src: "img/expo-mues-14.jpg", caption: "" },
            { src: "img/expo-mues-15.jpg", caption: "" }
    
        ]
    },
    
    alalisiere: {
        title: "À LA LISIÈRE DES PERCEPTIONS DISTORDUES",
        description:
            "<div style='margin-bottom: 12px;'><b>ARTISTES :</b> Vir Andres Hera, Studio Flair, Joanna OJ</div><div><b>COMMISSARIAT :</b> Sandra Barré</div>",
        flyer: "img/expo-a-la-lisiere-01.png",
        info: "Événement du 1er octobre 2022",
      text: "<div style='margin-bottom: 12px;'>Carte blanche à Sandra Barré, commissaire d'exposition qui, grâce aux vidéos de Vir Andres Hera et aux odeurs du Studio Flair, propose une réflexion sur la multiplicité des perceptions.</div><div style='margin-bottom: 12px;'>Comment cohabiter avec les certitudes de toustes et accepter ce que dictent nos convictions intimes ? De la cacophonie surgissent parfois des significations mystérieuses avec lesquelles la vie s’étoffe. Elles trainent des impressions, des odeurs, des goûts et des traces fantomatiques.</div><div style='margin-bottom: 12px;'>Pour la Nuit Blanche 2022, le Houloc présente une expérience polysensorielle où s’entremêlent les vérités. Que percevons-nous ? Qu’assimilons-nous de l’impalpable et que considérons-nous comme évidence ? L’installation propose l’absorption d’odeurs multiples crées par le studio Flair qui se lient aux relectures queer des amitiés bibliques filmées par Vir Andres Hera, laissant les visiteur.euse.s dans un plaisant trouble.</div><div>Cet état en mouvement se prolongera en une conversation avec la parfumeuse Amélie Bourgeois et en un DJ-set de Joanna OJ.</div>",
       images: [
          
        ]
    },
    
    derivesdefindete: {
        title: "DÉRIVES DE FIN D'ÉTÉ",
        description:
            "<div style='margin-bottom: 12px;'><b>ARTISTES :</b> Melt (Pali Meursault & Thomas Tilly), Sébastien Roux, Matthieu Saladin, Tachycardie, Lauren Tortil, Clara De Asis, Batmoon, Arnaud Dezoteux, Celsian Langlois</div><div><b>GRAPHISME :</b> Guillaume Ettlinger</div>",
        flyer: "img/expo-derives-de-fin-d-ete-flyer.jpg",
        info: "Exposition du 3 au 30 septembre 2022",
        text: "Dérives de fin d'été est une programmation de Celsian Langlois à l'initiative des ateliers du HOULOC, consacrée aux pratiques de l'écoute. Entre musique et art contemporain, elle présente une dizaine d'artistes se saisissant du son dans des formes de représentation distinctes. A travers des concerts, performances, projections et conférences, les Dérives de fin d'été explorent de multiples modalités d'écoute dans un moment de flottaison sonore de septembre.",
        images: [
           
        ]
    },
    
    unelunedecarbone: {
        title: "UNE LUNE DE CARBONE DANS UN CIEL DE CALCIUM",
        description:
            "<div style='margin-bottom: 12px;'><b>ARTISTES :</b> Pamela Artist-Run Space (Juliette Bentahar, Marine Chrétien, Margaux Fontaine, Colin G., Won Jy, Steven Le Priol, Audrey Martin, Lydia Rump, Margaux Szymkowicz)</div>",
        flyer: "img/expo-une-lune-de-carbone-flyer.jpg",
        info: "Exposition du 17 au 24 juin 2022",
        text: "<div style='margin-bottom: 12px;'>À la suite du partage d'une résidence-ressource entre les artistes du Houloc et de Pamela artist-run space chez Échangeur 22, à Saint Laurent des Arbres dans le Gard, les membres de l'association francilienne invitent celles et ceux du lieu nîmois à mettre en regard leurs différentes pratiques dans leur espace à Aubervilliers. Cet exercice permettra aux paméliennes et paméliens d'exposer tou.te.s ensemble pour la première fois, dans une perspective de tissage entre leurs identités et leurs productions.</div><div>Tirer les liens, appréhender les réseaux, rebondir d'un langage à l'autre, pour continuer à co-habiter sous un ciel nouveau.</div>", 
        images: [
           
        ]
    },
    
    lehoulocmalakoff: {
        title: "LE HOULOC - MAISON DES ARTS DE MALAKOFF",
        description:
            "<div style='margin-bottom: 12px;'><b>ARTISTES :</b> César Bardoux, Ulysse Bordarias, Mélissa Boucher, Marta Budkiewicz, Camille Le Chatelier, Hugo Ferretto, Flavie L.T, Jean Claracq, Célia Coëtte, Mathilde Geldhof, Audrey Matt Aubert, Mikaël Monchicourt, Lenny Rébéré, Mathieu Roquigny, Lise Stoufflet, Raphaël Tiberghien et Romain Vicari</div><div><b>PHOTOGRAPHIES :</b> Séverine Fernandes - Ville de Malakoff</div>",
        flyer: "img/expo-le-houloc-malakoff-14.jpg", 
        info: "Exposition du 22 janvier au 29 mai 2022",
      text: "<div style='margin-bottom: 12px;'>À partir de janvier 2022, le Houloc est invité à investir le site de la maison des arts. Le centre d’art poursuit ainsi son travail d’observation en lien avec la pratique des collectifs, porté depuis 2010. Le Houloc regroupe des artistes qui a priori n’ont pas pour usage de penser une œuvre commune mais qui tentent ici l’expérience. Le titre de leur projet Partir du lieu dévoile une complicité qu’iels nous proposent, entre leur lieu de travail partagé situé à Aubervilliers et les espaces d’exposition qu’iels s’apprêtent à investir à Malakoff. Subtilement d’ailleurs, ce message nous invite à comprendre la nécessité, dans la vie d’un·e artiste, d’un endroit pour penser et produire. L’exposition co-écrite à plusieurs mains propose un rythme de contenus évolutif. Tous les 15 jours, quatre ou cinq d’entre eux·elles utiliseront le lieu comme un temps d’atelier. Les publics auront la possibilité de voir les œuvres se « faire » et pourront suivre la construction collective de l’exposition à travers la présence des artistes auf place. L’aventure proposée par le Houloc accompagne ce qui traverse la saison, elle y dévoile les savoir-faire multiples, les compétences des artistes et ouvre la fabrication aux publics.<br><i>La maison des arts, centre d'art contemporain de Malakoff</i></div><div style='margin-bottom: 12px;'>« […] Le point de départ de notre proposition réside dans les murs et dans l’histoire de la maison des arts de Malakoff. Chacun des artistes qui composent Le Houloc va s’emparer de ce lieu d’accueil et lui répondre à travers son langage plastique propre. […]. Toujours en mouvement, l’exposition ne verra sa forme se fixer qu’aux termes de l’occupation de l’espace du centre d’art, à l’issue de ce temps où chacun aura exprimé et mis en forme la sensation provoquée par ce que les précédents auront laissé dans l’enceinte de ses murs. […] Accessible aux visiteurs à chaque instant, cette exposition, constamment en train de se faire, propose de suivre un processus et de faire du lieu d’exposition un espace de dialogue entre les artistes, leurs œuvres et le public. »</div><a href='https://maisondesarts.malakoff.fr/' target='_blank' style='display: block; margin-top: 12px;'>maisondesarts.malakoff.fr</a>", images: [
            { src: "img/expo-le-houloc-malakoff-01.jpg", caption: "" },
            { src: "img/expo-le-houloc-malakoff-02.jpg", caption: "" },
            { src: "img/expo-le-houloc-malakoff-04.jpg", caption: "" },
            { src: "img/expo-le-houloc-malakoff-05.jpg", caption: "" },
            { src: "img/expo-le-houloc-malakoff-06.jpg", caption: "" },
            { src: "img/expo-le-houloc-malakoff-07.jpg", caption: "" },
            { src: "img/expo-le-houloc-malakoff-08.jpg", caption: "" },
            { src: "img/expo-le-houloc-malakoff-10.jpg", caption: "" },
            { src: "img/expo-le-houloc-malakoff-12.jpg", caption: "" },
            { src: "img/expo-le-houloc-malakoff-13.jpg", caption: "" },  
            { src: "img/expo-le-houloc-malakoff-03.jpg", caption: "" },
            { src: "img/expo-le-houloc-malakoff-09.jpg", caption: "" },
            { src: "img/expo-le-houloc-malakoff-11.jpg", caption: "" },
            { src: "img/expo-le-houloc-malakoff-15.jpg", caption: "" }
        ]
    },
    
    laportemeflaire: {
        title: "LA PORTE ME FLAIRE, ELLE HÉSITE",
        description:
            "<div style='margin-bottom: 12px;'><b>ARTISTES :</b> Collectif Diamètre</div><div><b>DESIGN GRAPHIQUE :</b> Mahaut Rey</div>",
        flyer: "img/expo-laportemeflaireellehsite-01.jpg",
        info: "Exposition du 17 au 23 septembre 2021",
      text: "<div style='margin-bottom: 12px;'>À l'invitation qui a été faite par Le Houloc d'investir son espace d'exposition, le collectif Diamètre a imaginé une proposition curatoriale réunissant le travail de ses dix-neuf artistes autour d'une poétique du seuil. Le seuil serait cet état de passage, un lieu de transformation, la part que l'on quitte et celle, invisible, que l'on accepte. Penser le seuil invite à accueillir les notions de transgression et de révélation comme méthode exploratoire, relationnelle et poétique. Point de bascule entre un avant et une pluralité de devenirs, le seuil convoque aussi la mémoire. Les souvenirs, l'appréhension des expériences à venir, le réel et la fiction coexistent pour créer de nouveaux repères et recomposer des récits polyphoniques.</div><div style='margin-bottom: 12px;'>Portes, jardin, grand hangar dans lequel sont suspendues des bâches comme des voiles, Le Houloc se déploie tout en longueur. C'est une traversée ponctuée d'espaces de travail dont chaque seuil nous plonge au sein d'une pratique artistique. Les portes ouvertes du Houloc constituent un moment propice pour relier la salle d'exposition commune à l'atelier des résidents du lieu. L'accrochage de l'exposition a été pensé en résonances avec chaque espace de travail, pour que de ces réverbérations naissent des rencontres et des dialogues entre oeuvres, artistes et visiteur-euses.</div><div>Fondé en 2014 à Paris sous la forme d'une association loi 1901, le collectif Diamètre réunit des commissaires d'exposition indépendants dans une démarche curatoriale fondée sur l'expérimentation, la transversalité et le partage. Diamètre tente de jouer avec le format classique de l'exposition, en privilégiant la notion de cycles, et en ménageant au sein, de ses projets des moments de réflexion sur le lieu où ils s'inscrivent, et des restitutions vivantes. À géométrie variable, le collectif compte à l'heure actuelle 6 membres actifs.</div>",
       images: [
            { src: "img/expo-laportemeflaireellehsite-16.jpg", caption: "" },
            { src: "img/expo-laportemeflaireellehsite-02.jpg", caption: "" },
            { src: "img/expo-laportemeflaireellehsite-03.jpg", caption: "" },
            { src: "img/expo-laportemeflaireellehsite-04.jpg", caption: "" },
            { src: "img/expo-laportemeflaireellehsite-05.jpg", caption: "" },
            { src: "img/expo-laportemeflaireellehsite-06.jpg", caption: "" },
            { src: "img/expo-laportemeflaireellehsite-07.jpg", caption: "" },
            { src: "img/expo-laportemeflaireellehsite-08.jpg", caption: "" },
            { src: "img/expo-laportemeflaireellehsite-09.jpg", caption: "" },
            { src: "img/expo-laportemeflaireellehsite-10.jpg", caption: "" },
            { src: "img/expo-laportemeflaireellehsite-11.jpg", caption: "" },
            { src: "img/expo-laportemeflaireellehsite-12.jpg", caption: "" },
            { src: "img/expo-laportemeflaireellehsite-13.jpg", caption: "" },
            { src: "img/expo-laportemeflaireellehsite-14.jpg", caption: "" },
            { src: "img/expo-laportemeflaireellehsite-15.jpg", caption: "" }
        ]
    },
    
    grandesurface: {
        title: "GRANDE SURFACE",
        description:
            "",
        flyer: "img/expo-grandesurface-08.jpg",
        info: "Exposition du 10 au 15 juin 2021",
        text: "<div style='margin-bottom: 12px;'>Grande Surface est un lieu créé par dix artistes, basé à Bruxelles au 188 rue Théodore Verhaegen. Grande Surface est un projet autogéré et auto-financé par ses dix artistes fondateurs. Grande Surface se veut pluridisciplinaire et multiforme, dans un espace de 40m2 dédié à la collaboration, l’expérimentation et l’exposition. Grande Surface c’est une année pour développer et affirmer un programme artistique transversal, pour et par des artistes et collectifs invités singuliers, afin d’atteindre régulièrement un public irrégulier, pluriel, initié ou non. Cette première année de Grande Surface s’est construite entre mars 2018 et mars 2019 au 188 rue Théodore Verhaegen à Bruxelles. Aujourd’hui Grande Surface a rendu les clés de cette première vitrine. En latence, Grande Surface s’active à répondre à des invitations d’expositions, de curateurs ou encore de conférences dans d’autres lieux, tout en s’appliquant à obtenir un nouvel espace.</div><div style='margin-bottom: 12px;'>Tout part d’un son enfermé dans une cage ou d’un amas d’objets colorés en peinture.</div><div style='margin-bottom: 12px;'>Il y a des morceaux de verre incrustés dans du béton, des fils tendus faisant office de caisse de résonance. La récolte des bouts de bâtiments bruts touche à sa fin et le ciel lui est infesté de palmiers en images. Le silence s’enregistre tandis que les carcasses des objets obsolètes se figent en statues. Le soleil réinitialise son mouvement cyclique. Le courant d’air continue son infiltration dans le tissu. Par la fenêtre aux signatures inconnues, le désert rouge est toujours aussi impactant.</div><div>Finalement rien n’a bougé ou presque, à la différence près que les algues bleues sont des paraboles maintenant.</div>",
         images: [
            { src: "img/expo-grandesurface-01.jpg", caption: "" },
            { src: "img/expo-grandesurface-02.jpg", caption: "" },
            { src: "img/expo-grandesurface-04.jpg", caption: "" },
            { src: "img/expo-grandesurface-05.jpg", caption: "" },
            { src: "img/expo-grandesurface-06.jpg", caption: "" },
            { src: "img/expo-grandesurface-07.jpg", caption: "" },
            { src: "img/expo-grandesurface-03.jpg", caption: "" }
        ]
    },
    
    ohnetitel: {
        title: "OHNE TITEL",
        description:
            "<div style='margin-bottom: 12px;'><b>ARTISTES :</b> Steeve Bauras</div><div><b>FREE FRAGS :</b> François Bianco</div>",
        flyer: "img/expo-ohnetitel-01.jpg",
        info: "Exposition du 19 au 22 juin 2021",
     text: "<div style='margin-bottom: 12px;'>Le Houloc se réjouit de présenter le premier opus de Free Frags OHNE TITEL sous la forme d’une exposition autour du travail de Steeve Bauras et de l’imagerie du label.</div><div style='margin-bottom: 12px;'>Des dispositifs seront mis en place pour parcourir ce projet à travers l’objet vinyle, la photographie, la sculpture, la vidéo et le son. OHNE TITEL sera disponible sur place au format vinyle (avec téléchargement inclus des fichiers numériques) ainsi que des sérigraphies en tirage limité du label.</div><div style='margin-bottom: 12px;'>Free Frags est une plate-forme d’expression pour plasticiens qui exercent aussi une pratique sonore. Ce projet prend la forme d’une association loi 1901 qui servira d’appui pour la production et diffusion des projets des artistes : musique, pièce sonore, poésie, recherches musicales parallèles sont accueillies et imprimées sur l’un des supports les plus aptes à résister au passage du temps : le vinyle. Ce label d’édition artistique a pour objectif de collecter cette matière sonore et lui donner une existence physique concrète. Outre la réalisation d’un enregistrement, Free Frags permet aussi de mettre en oeuvre un travail graphique lié à la pratique de l’artiste : inserts, livrets, tirages photographiques, sérigraphies... qui feront corps avec l’objet musical. L’artiste peut par conséquent associer cette forme particulière à ses recherches plastiques.</div><div style='margin-bottom: 12px;'>Free Frags a pour objectif de rassembler ces artistes aux multiples facettes, témoins d’une génération charnière entre le développement des technologies et l’élargissement des pratiques artistiques vers des formes plus hybrides.</div><div style='margin-top: 40px; margin-bottom: 12px; text-decoration: underline; font-weight: bold;'>Steeve Bauras premier artiste invité par Free Frags</div><div style='margin-bottom: 12px;'>Steeve Bauras est né en 1982. Vit et travaille à Paris. En 2004, après l’obtention de son diplôme aux Beaux-Arts de Paris, Steeve Bauras entreprend de multiples voyages au cours desquels il rencontre les scènes artistiques underground en Europe, Amérique latine et en Afrique. Cette investigation permanente du monde lui permet de nouvelles expériences humaines propices à l’enrichissement de son œuvre. De là, il élabore un langage artistique où la matière et le geste sont mis au service d’une médiation entre reality et imaginaire afin d’interpeller notre propre regard et notre propre posture du monde.</div><div style='margin-bottom: 12px;'>Steeve Bauras explore les notions de sculpturalités à travers la mise en espace de l’image photographique ou filmique comme véritable matière de construction ou de déconstruction. Cette pratique est influencée par son passage dans l’atelier d’Emmanuel Saulnier où il s’est formé à la sculpture.</div><div style='margin-bottom: 12px;'>À travers son travail l’artiste interroge les mémoires et les liens de territorialités pour rendre visible la force de la création artistique sur notre conception du réel. Son travail a été présenté à la Galerie des Filles du Calvaire, Paris (2018), Galerie Felix Frachon, Bruxelles (2018), la Biennale de la Havane (2016), Rencontres de la photographie de Bamako (2015), Volta New York (2014), SAVVY Contemporary, Berlin (2013), Galerie Le Manège, Dakar (2013), Galerie Baudoin Lebon, Paris (2011).<br><i>Yves Chatap</i></div><div style='margin-top: 40px; margin-bottom: 12px; text-decoration: underline; font-weight: bold;'>François Bianco créateur de Free Frags</div><div style='margin-bottom: 12px;'>François Bianco est né en 1985 à Coulommiers. Après des études de graphisme, François Bianco intègre les Beaux-arts de Paris en 2009. Il poursuit ses recherches sculpturales et sonores lors d’un voyage en Finlande en 2012. Diplômé des Beaux-arts de Paris en 2013, son travail sonore se développe à travers plusieurs collaborations avec le collectif The Panels of Silence ainsi que divers projets cinématographiques : Aequador de Laura Huertas Millàn (2012), Bêche/ Pioche de Fanny Didelon (2015)... Il expose à la 66e édition de Jeune Création, le 63e Salon de Montrouge ainsi qu’à l’exposition collective Human Being / Black Sound à la Galerie les Filles du calvaire (2018).</div><div style='margin-bottom: 12px;'>Son travail brasse les apports des lieux, des mythes et du folklore qui bordent la méditerranée, plus particulièrement le sud de l’Italie. Ces matrices biographiques (le minéral, les figures mythologiques, les sonorités traditionnelles...) catalysent un ensemble constitué de sculptures, de sons et d’images. Chaque oeuvre participe à une immersion vers un ailleurs oscillant entre formes, matières et archives personnelles remaniées. La mémoire (des paysages, des charbonniers, des tarentelle ainsi que leurs survivances actuelles) se transforme et se reconstruit en des états altérés, transformés en une vision autre, lacunaire et allégorique.</div><div style='margin-bottom: 12px;'>Ses premières éditions musicales l’amènent en 2020 à créer le label FREE FRAGS, plate-forme dédiée aux créations sonores de plasticiens. Il vit à Paris et travaille à Arcueil.</div><div style='margin-top: 20px;'><a href='https://soundcloud.com/user-179657080-570712477' target='_blank' style='display: block; margin-bottom: 5px;'>Soundcloud</a><a href='https://www.discogs.com/label/1931426-Free-Frags' target='_blank' style='display: block; margin-bottom: 5px;'>Discogs</a><a href='https://freefrags.bandcamp.com/' target='_blank' style='display: block; margin-bottom: 5px;'>Bandcamp</a><a href='https://cargocollective.com/steevebauras/' target='_blank' style='display: block; margin-bottom: 5px;'>Steeve Bauras</a><a href='https://www.francois-bianco.com/' target='_blank' style='display: block; margin-bottom: 5px;'>François Bianco</a></div>",
      images: []
    },
    
    festivalvhs: {
        title: "FESTIVAL VHS",
        description:
            "<div style='margin-bottom: 12px;'><b>ARTISTES :</b> Elsa Brès, Tohé Commaret, Sarah-Anaïs Desbenoit, Cédric Dupire, Laura Huertas Millán, Jorge Jacome, Quentin L'Helgoualc'h, Valentin Noujaïm</div>",
        info: "30+31 Mai 2025",
        flyer: "img/expo-festivalvhs-01.jpg",
      text: "<div style='margin-bottom: 12px;'>Dans la continuité de son programme VHS, programme dédié aux artistes vidéastes, le Houloc et le 6B s’associent pour un festival en plein air, tourné vers le cinéma indépendant sur la plage du 6B.</div><div style='margin-bottom: 12px;'>Le Houloc est heureux d’inviter à cette occasion Elsa Brès, Tohé Commaret, Sarah-Anaïs Desbenoit, Cédric Dupire, Laura Huertas Millán, Jorge Jacome, Quentin L'Helgoualc'h, et Valentin Noujaïm, réunis lors de deux soirées de projections et de discussions autour de leurs films. Chaque soirée sera l’occasion de découvrir le travail de 4 réalisateur·ice·s dont la projection des films sera précédée de tables-rondes. Un moment de partage et d’échanges autour de ces nouvelles formes de création audiovisuelle viendront clôturer la soirée.</div><div style='margin-bottom: 12px;'>Ce projet reçoit le soutien du Conseil départemental de la Seine-Saint-Denis (Agir in Seine Saint Denis) et de la Direction régionale des affaires culturelles d’Île-de-France – ministère de la Culture, dans le cadre du contrat de filière arts visuels issu du SODAVI-F.</div><div style='margin-bottom: 4px; text-decoration: underline; font-weight: bold;'>Programme :</div><div style='margin-bottom: 12px;'><strong>Vendredi 30 - 19h30 - 6B :</strong><br>Table ronde animée par Marilou Thiebault<br><strong>Vendredi 30 - 21h - 6B :</strong><br>Projections : Sarah-Anaïs Desbenoit, <i>Phalène</i>, 2022, 19’30 / Jorge Jacome, <i>Shrooms</i>, 2023, 18’ / Quentin L’Helgoualc’h, <i>Molecular Delusions</i>, 2022, 27’ / Cédric Dupire, <i>The Real Superstar</i>, 2024, 67’</div><div style='margin-bottom: 12px;'><strong>Samedi 31 - 19h30 - 6B :</strong><br>Table ronde animée par Marie-Laure Lapeyrere<br><strong>Samedi 31 - 21h - 6B :</strong><br>Projections : Valentin Noujaïm, <i>Pacific Club</i>, 2023, 16’35 / Tohé Commaret, <i>Disparaître 2</i>, 2021, 9’ , <i>Because of (U)</i>, 2024, 13’ / Laura Huertas Milan, <i>Sol Negro</i>, 2016, 43’ / Elsa Brès, <i>Les Sanglières</i>, 2025, 67’</div><div style='margin-top: 24px; border-top: 1px solid #eee; padding-top: 12px;'><a href='https://drive.google.com/file/d/1OxK2NLAcyqlh24rvRTM2ua0tGm9Ln1HR/view' target='_blank' style='display: block; margin-bottom: 8px;'>Écouter l'enregistrement des tables rondes - 1</a><a href='https://drive.google.com/file/d/1eT3Gb8POjx6hOwZTRqGEODT8P1pFtnBu/view' target='_blank' style='display: block;'>Écouter l'enregistrement des tables rondes - 2</a></div>",
       images: []
    },
   
    
    alexisguillier: {
        title: "ALEXIS GUILLIER",
        description: "",
           
        info: "4 octobre 2024",
        flyer: "img/vhs-alexisguillier-08.jpg",
      text: "<div style='margin-bottom: 12px;'>Le film porte sur l'incendie de la discothèque le Purgatoire à Beyrouth en 1968 lors du tournage du film <i>Nous sommes tous des fedayin</i>.</div><div style='margin-bottom: 12px;'><strong>Purgatoire (Le cinéma qui tue)</strong>, 61:45.<br>Alexis Guillier, 2023.<br>Production : Forecast.<br>Avec Samir Abou Saïd, Hussein Al Sayyed, Samir Chamas, Sami Ghosn, Mirvat Kousa, Christiane Mallouk, Salah Tizani.<br>Caméra et son : Fady El Nachme<br>Montage : Théo Carrere<br>Bande originale et mixage son : Voiski.</div><div style='margin-bottom: 12px;'>Alexis Guillier se consacre à des films, installations, performances et textes qui sont des montages narratifs, nés d’investigations dans l’histoire collective et les histoires individuelles. L’entraînant de la falsification à la déformation et la disparition des œuvres, d’un accident de tournage aux vaisseaux fantômes, ou à gravir les contours de la géante Notre-Dame de France, ses formes mêlent des documents et objets très divers, qui coexistent dans l’histoire culturelle mais ne s’y associent que rarement.</div><div style='margin-bottom: 12px;'>Ses sujets d’investigation lui font observer la circulation des images et des productions culturelles, la formation des imaginaires et les conditions d’existence de la fiction, les interactions entre les actions personnelles et les Histoires souvent nationales, sous un angle tant esthétique qu’anthropologique. Attachée à l’indétermination des objets investis, la transmission de ces récits s’interroge elle-même, restant toujours sur une ligne incertaine, entre subjectivité détachée et lyrisme documentaire. Les formes et projets se construisent à travers des analogies et des associations d’idées, et les processus d'enquête et de montage, en collant ensemble des morceaux découpés dans plusieurs histoires ou sources, semblent aussi témoigner d’un rapport existentiel au corps.</div><div style='margin-bottom: 12px;'>Il achève actuellement une thèse qui vise à l’écriture d’une histoire des accidents de tournages ayant causé des morts et des blessures graves, accidents révélateurs des tensions entre production et représentation, entre la réalité matérielle et les puissances des imaginaires.</div><div style='margin-bottom: 4px; text-decoration: underline; font-weight: bold;'>Biographie des invités :</div><div style='margin-bottom: 12px;'><strong>Alexis Guillier</strong> a exposé, présenté des films ou des performances dans des lieux tels que radialsystem, Berlin, la Villa Médicis, image/imatge, le Creux de l'enfer ou le Palais de Tokyo. Lauréat du programme Forecast (2022-2023), il a bénéficié de résidences au Pavillon, à la Box et à l’ESACM. Actuellement professeur à l'École Media Art du Grand Chalon et doctorant du programme de recherche-création RADIAN. Ses projets <i>M for Mondrian</i>, <i>Artless</i>, <i>Twilight Zone</i>, et <i>Neverland</i> ont été publiés.<br><a href='https://alexisguillier.com' target='_blank'>alexisguillier.com</a></div><div style='margin-bottom: 12px;'><strong>Théo Carrere</strong> a suivi un parcours dans l’audiovisuel, avec un BTS en montage, puis une licence à l’Université Paris 8. Il travaille depuis plusieurs années en tant que monteur, participant à divers projets de cinéma et de télévision. En 2015, il co-fonde le DOC, un squat artistique situé dans le XIXe arrondissement de Paris. Au sein de cette structure, il met en place une résidence de post-production qui soutient chaque année une dizaine de projets audiovisuels.<br><a href='https://theocarrere.com/' target='_blank'>theocarrere.com</a></div>",
        images: [
   
            { src: "img/vhs-alexisguillier-02.jpg", caption: "" },
            { src: "img/vhs-alexisguillier-03.jpg", caption: "" },
            { src: "img/vhs-alexisguillier-04.jpg", caption: "" },
            { src: "img/vhs-alexisguillier-05.jpg", caption: "" },  
            { src: "img/vhs-alexisguillier-06.jpg", caption: "" },
            { src: "img/vhs-alexisguillier-07.jpg", caption: "" }
        ]
    },

    sacharey: {
        title: "SACHA REY",
        description:
            "",
        info: "26 mai 2023",
        flyer: "img/vhs-sacharey-01.jpg",
       text: "<div style='margin-bottom: 12px;'>À l'occasion de la reprise des soirées VHS au Houloc, nous recevrons l'artiste Sacha Rey qui a répondu à notre proposition en invitant à son tour l'artiste Anthedemos.</div><div style='margin-bottom: 12px;'>Cette soirée permettra la projection de deux oeuvres vidéo : <i>But I'm a Cheerleader</i> réalisée par Sacha Rey en 2023, ainsi que de <i>Erebo Rose</i>, réalisée par Anthedemos en 2023 également. Il s'en suivra une discussion ouverte entre les artistes et le public.</div><div style='margin-top: 40px; margin-bottom: 12px; font-weight: bold; text-decoration: underline;'>BUT I'M A CHEERLEADER</div><div style='margin-bottom: 12px;'>Cette installation vidéo documentaire a pour ambition de comparer les différents statuts et modes de rémunération dans le secteur culturel, qui pourraient accroître les violences systémiques. Je propose à des travailleur·euse·x·s de l’art d’incarner un·e·x cheerleader et de témoigner au sujet de ses conditions de travail tout en faisant une pratique sportive de son choix. Les pratiques sportives et/ou l’utilisation des arts performatifs sont ainsi employés comme moyen « d’empowerment » d’expériences minoritaires afin de résister à l’objectification des corps.</div><div style='margin-bottom: 12px;'>J’utilise la méthode de travail que je nomme « danse documentaire » pour représenter des corps marginalisés à partir de leurs savoirs corporels. Aussi, ce dispositif filmique me permet de faire un parallèle entre le secteur culturel et le milieu sportif professionnel où les questions de compétition, de performance, d’épuisement des corps-sujets sont présentes. Les participant·e·x·s du film se donnent ainsi pour mission de s’auto encourager et de créer un espace de résistance face secteur culturel hautement compétitif.</div><div>Au travers de la figure de la cheerleader, je souhaite également m’éloigner des représentations cis-hétéro-patriarcales qui lui sont bien souvent assignées. Le titre est en référence à la comédie lesbienne « But I’m a Cheerleader » de Jamie Babbit sortie en 1999.</div>",
       images: [

        ]
    },

    arnauddezoteux: {
        title: "ARNAUD DEZOTEUX",
        description:
            "",
        info: "20 mai 2022",
        flyer: "img/vhs-arnauddezoteux-01.jpg",
        text: "<div style='margin-bottom: 12px;'><strong>FRONTAL</strong></div><div style='margin-bottom: 12px;'>Une légende et un artiste émergent, des special guests à la croisée de l'art contemporain, du cinéma et de la télévision. Des pionnier.ères, des recalé.es, des promoteur.ices.</div><div style='margin-bottom: 4px; text-decoration: underline; font-weight: bold;'>Invité.es :</div><div style='margin-bottom: 12px;'>Bill Viola + special guests</div><div style='margin-top: 40px; margin-bottom: 12px;'><strong>Arnaud Dezoteux</strong> est né en septembre 1987 à Bayonne.</div><div style='margin-bottom: 12px;'>Diplômé en 2011 des Beaux-Arts de Paris, ses films et installations s'intéressent à la télé-réalité, au coaching de séduction ou au bodybuilding et utilisent souvent le studio d’incrustation sur fond vert comme le lieu d’une confrontation atypique avec les acteurs, faisant coïncider les coulisses, l’improvisation et l’effet spectaculaire. Après une exposition personnelle à la galerie Edouard Manet à Gennevilliers (2016), il a présenté son film <i>« Miroir de Haute-Valnia »</i> au Centre Pompidou (2017) et un projet autour de Billy the Kid à la Fondation Pernod-Ricard (2021). Ses films ont été montrés au Confort Moderne à Poitiers, à Lafayette Anticipations, au Palais de Tokyo, à la galerie 221A à Vancouver ou à la Galerie Forde à Genève.</div><div style='margin-bottom: 12px;'>En collaboration avec Glassbox, il prépare actuellement un projet de film sur les communautés de joueur.euses de Jeu de Rôle Grandeur Nature. Arnaud Dezoteux intervient régulièrement en section Cinéma à la HEAD à Genève.</div><div style='margin-top: 40px; margin-bottom: 12px;'><strong>Bill Viola</strong> est né en janvier 1951 à New-York.</div><div style='margin-bottom: 12px;'>A l’âge de six ans, Bill tombe d’une barque et manque de se noyer. Pendant sa perte de connaissance, son sentiment de plénitude totale et les images d’une beauté extraordinaire qu’il a vu sous l’eau n’ont cessées d’être déclinées dans son oeuvre. Pour lui, l’eau est le lieu du commencement et de la fin. En 1973, Viola obtient une licence en beaux-arts option Experimental Studios de l’université de Syracuse, où il étudie les arts visuels et la musique électronique.</div><div style='margin-bottom: 12px;'>Tout au long de sa carrière, qui s’étend sur quatre décennies, Viola utilise les technologies les plus récentes pour créer des installations vidéos, de la musique électronique, des paysages sonores et des émissions de télévision. Le travail de Viola explore souvent les thèmes de la spiritualité et de l’introspection, invitant le public à se connaître davantage grâce à leur perception de l’expérience sensorielle. Des expériences humaines transcendantales comme la mort, la naissance et la compréhension de la conscience sont des thèmes clés dans l’art de Viola.</div><div style='margin-bottom: 12px;'>Certaines de ses œuvres les plus connues comprennent <i>The Crossing</i> (installation son et vidéo, 1996), <i>The Reflecting Pool</i> (1977 - 1979) et <i>The Passing</i> (1991). Lors de la Biennale de Venise en 1995, Viola réalise <i>The Greeting</i>, une vidéo sur une peinture du XVIe siècle de l’artiste italien Pontormo. Viola vit et travaille actuellement à Long Beach en Californie.</div>",
        images: [

        ]
    },

    magalidougoud: {
        title: "MAGALI DOUGOUD",
        description:
            "",
        info: "10 avril 2022",
        flyer: "img/vhs-magalidougoud-01.jpg",
       text: "<div style='margin-bottom: 12px;'>La vidéo <i>Le Continuum Bleu</i>, tourné à Berlin en 2020, explore l’histoire de femmes assassinées ou poussées au suicide dans les rivières, canaux, étangs et lacs de la ville. Rosa Luxembourg, Joana, Franziska Schanzkowska, Lena Sand, Esma Yalabik, Lucie Berlin sont quelques-unes de ces femmes, figures historiques ou anonymes, dont les corps marginalisés et les subjectivités dissidentes, se sont trouvés précipités dans les flux asservissants du monde liquide.</div><div style='margin-bottom: 12px;'>Syndrome ultime du désengagement que porte l’injonction à la flexibilité capitaliste, la dissolution en avalanche de ces corps minorés dans les eaux de la capitale allemande glace la métaphore. La Spree, le Landwehrkanal, le Karpfenteich, la Havel, le Teltowkanal ou la Sachsendorfer Badesee, où Magali Dougoud immerge ainsi anarchiquement sa caméra sur les traces de ces femmes disparues, offrent, par effets de surexpositions et de brouillages visuels induits par les agitations d’une eau menaçante, le spectacle désordonné et aveugle d’un bain opaque.</div><div style='margin-bottom: 12px; font-style: italic; font-size: 0.9em; padding-left: 10px; border-left: 1px solid #ccc;'>Extrait de « Femmxs vagues, eaux troubles » de Julie Sas</div><div style='margin-top: 40px; margin-bottom: 12px;'>À l’occasion de cet événement, Magali Dougoud présentera sa vidéo <i>Le Continuum Bleu</i> (45mn, vofr/steng, 2021) ainsi que d'autres œuvres vidéos disséminées dans les espaces du Houloc.</div><div style='margin-bottom: 12px; font-weight: bold;'>Elle invite CLAIRE LUNA, curatrice et critique d’art, pour animer cette séance.</div><div style='margin-top: 40px; margin-bottom: 12px;'><strong>Magali Dougoud</strong><br>Originaire de Suisse, elle développe un imaginaire féministe émancipateur à travers des notions telles que la liquidité, la violence und l'intelligence plurielle. Son travail est inspiré par l'hydroféminisme, soit l'idée que nous sommes tousxtes des « Bodies of Water ». L'eau, en tant que motif omniprésent dans son travail, permet à des figures ambiguës et hybrides, souvent en révolte, de créer de nouveaux récits.</div><div style='margin-bottom: 12px;'><a href='http://www.magalidougoud.org' target='_blank'>www.magalidougoud.org</a></div><div style='margin-top: 40px; margin-bottom: 12px;'><strong>Claire Luna</strong><br>Diplômée en histoire de l’art moderne et contemporain de la Sorbonne Paris IV et de la PUCP (Lima - Pérou), Claire Luna est critique d’art et commissaire d’exposition indépendante. Membre du CEA, de l’AICA, de Jeunes Critiques d’art, elle a été commissaire associée de l’exposition itinérante Sens-fiction.</div><div style='margin-bottom: 12px;'>Outre son intérêt pour les scènes artistiques non occidentales et les oublié.e.s de l’histoire, Claire Luna cherche à repérer ce qu’elle pourrait identifier comme une tendance ou un sujet du contemporain, souvent à la croisée de différents champs d’étude.</div><div style='margin-bottom: 12px;'><a href='https://www.instagram.com/claire__luna_/' target='_blank'>Instagram : @claire__luna_</a></div>",
        images: [

        ]
    },

    patrickandredepuis1966christinejouve: {
        title: "PATRICKANDRÉDEPUIS1966 & CHRISTINE JOUVE",
        description:
            "",
        info: "5 novembre 2021",
        flyer: "img/vhs-patrickandredepuis1966christinejouve-16.jpg",
       text: "<div style='margin-bottom: 12px;'><strong>patrickandrédepuis1966 & CHRISTINE JOUVE</strong></div><div style='margin-bottom: 12px;'>Ces derniers réaliseront une performance, <i>LES BEAUX SOUCIS # 03 - Les parfums</i>, qui propose « d'offrir une troisième dimension à l'image par la présence d'un corps en mouvement. (...) Une forme qui ne résout pas mais une présence qui cherche à s'ajuster. »</div><div style='margin-bottom: 12px; padding-left: 15px; border-left: 1px solid #eee;'>Sur un mur est projeté une succession de séquences vidéo autonomes accompagnées d’une phrase écrite et d’une musique.<br>A côté de cette projection, se déroule une phrase dansée, dans la continuité et la lenteur.</div><div style='margin-top: 40px; margin-bottom: 12px;'><strong>patrickandrédepuis1966</strong> est plasticien, performer et vidéaste. Formé aux écoles d'art de Dijon et de Nantes puis au Fresnoy (studio national des arts contemporains) de Tourcoing. Son travail se développe autour de différents medias.</div><div style='margin-bottom: 12px;'><strong>Christine Jouve</strong> se forme à la danse contemporaine au conservatoire de Montpellier. Imprégné de correspondances musicales et littéraires, son travail chorégraphique se caractérise par la précision de l'intention et du sens accordé à chaque geste. Depuis 2006, elle collabore avec patrickandré1966.</div>",
        images: [
            { src: "img/vhs-patrickandredepuis1966christinejouve-02.jpg", caption: "" },
            { src: "img/vhs-patrickandredepuis1966christinejouve-03.jpg", caption: "" },
            { src: "img/vhs-patrickandredepuis1966christinejouve-05.jpg", caption: "" },
            { src: "img/vhs-patrickandredepuis1966christinejouve-06.jpg", caption: "" },
            { src: "img/vhs-patrickandredepuis1966christinejouve-12.jpg", caption: "" },
             { src: "img/vhs-patrickandredepuis1966christinejouve-04.jpg", caption: "" },
                { src: "img/vhs-patrickandredepuis1966christinejouve-07.jpg", caption: "" }

         
        ]
    },

    annecharlottefinel: {
        title: "ANNE-CHARLOTTE FINEL",
        description:
            "",
        info: "25 juin 2021",
        flyer: "img/vhs-annecharlottefinel-04.jpg",
        text: "<div style='margin-bottom: 12px;'>À l'occasion d'une soirée VHS, <strong>Anne-Charlotte Finel</strong> a choisi d'inviter <strong>Guillaume Constantin</strong>, artiste et programmateur arts visuels aux Instants Chavirés.</div><div style='margin-bottom: 12px;'>Ils échangeront autour du travail d'Anne-Charlotte et à propos de l'exposition <i>« Parades »</i> qu'elle présentera aux Instants Chavirés à Montreuil du 18 septembre au dimanche 7 novembre 2021.</div><div>Elle dévoilera une nouvelle pièce en exclusivité et quatre vidéos plus anciennes.</div>",
        images: [
            { src: "img/vhs-annecharlottefinel-02.jpg", caption: "" },
            { src: "img/vhs-annecharlottefinel-01.jpg", caption: "" },
            { src: "img/vhs-annecharlottefinel-03.jpg", caption: "" }
        ]
    },

    carteblanaceyasminebenabderrahmane: {
        title: "CARTE BLANCHE - YASMINA BENABDERRAHMANE",
        description:
            "Elsa Brès, Kate Krolle, Thibaud Le Maguer et Faye Mullen ainsi qu'Ana Bordenave, chercheuse spécialisée en art contemporain, qui animera cette soirée.",
        info: "9 octobre 2020",
        flyer: "img/vhs-carteblanaceyasminebenabderrahmane-10.jpg",
        text: "<div style='margin-bottom: 12px;'>Nous recevrons <strong>Yasmina Benabderrahmane</strong> qui a répondu à notre proposition de soirée carte blanche en invitant à son tour plusieurs artistes : Elsa Brès, Kate Krolle, Thibaud Le Maguer et Faye Mullen ainsi qu'<strong>Ana Bordenave</strong>, chercheuse spécialisée en art contemporain, qui animera cette soirée.</div><div style='margin-bottom: 4px; text-decoration: underline; font-weight: bold;'>Programme :</div><div style='margin-bottom: 12px; padding-left: 10px; border-left: 1px solid #eee;'>• <i>To be veiled</i> de Faye Mullen (2008)<br>• <i>Mascarade</i> de Yasmina Benabderrahmane (2008)<br>• <i>Love Canal</i> de Elsa Brès (2018)<br>• <i>Demascara</i> de Yasmina Benabderrahmane (2008)<br>• <i>I was lying in the darkness</i> de Kate Krolle (2017)<br>• <i>La Renardière</i> de Yasmina Benabderrahmane (2016)<br>• <i>2 #2</i> de Thibaud Le Maguer (Performance)<br><strong>Discussion menée par Ana Bordenave</strong></div><div style='margin-bottom: 12px;'>L’ensemble des œuvres de cette séance de projection se rejoignent dans leurs manières de composer les corps en lien avec le reste des éléments à l’image (paysages et éléments, temps et récit). Dans les films, si le corps semble toujours central dans l’image, il est souvent lointain, décomposé ou dispersé, il se soustrait à toute pulsion scopique et identification du public.</div><div style='margin-bottom: 12px;'>S’il est le point de départ de l’action et le lieu d’une individualité, il se fait chambre d’écho d’une histoire partagée, si ce n’est sociale. Dans la boucle filmique de Faye Mullen, nous percevons une nouvelle correspondance entre le voile, le corps, le vent et le paysage. Avec Elsa Brès, la roche nous apparaît partager l’individualité de la voix narratrice, au même titre que les mains et les pieds du marcheur.</div><div style='margin-bottom: 12px;'>L’expérience des corps à l’écran, aussi proches qu’ils puissent nous sembler, reste bien différente de celle d’un corps performant, même lorsque celui-ci joue des éléments et des matières qu’il utilise comme ce sera le cas avec Thibaud Le Maguer (2#2). À l’écran, il se compose avec chaque élément qui l’entoure, le vent et la roche, les récits et la gestuelle.</div><div style='margin-bottom: 12px; font-style: italic; text-align: center;'>« Est-ce que le corps est là avant l’image, ou est-ce c’est l’image qui ne va pas cesser de l’ouvrir ? » — Nicole Brenez</div><div style='margin-bottom: 12px; font-size: 0.9em;'>La programmation résulte des affinités artistiques et personnelles entre les artistes, tou.te.s ancien.ne.s étudiant.e.s du Fresnoy.</div><div style='font-weight: bold;'>Ana Bordenave</div>",
        images: [
            { src: "img/vhs-carteblanaceyasminebenabderrahmane-02.jpg", caption: "" },
            { src: "img/vhs-carteblanaceyasminebenabderrahmane-04.jpg", caption: "" },
            { src: "img/vhs-carteblanaceyasminebenabderrahmane-05.jpg", caption: "" },
            { src: "img/vhs-carteblanaceyasminebenabderrahmane-06.jpg", caption: "" },
            { src: "img/vhs-carteblanaceyasminebenabderrahmane-07.jpg", caption: "" },
            { src: "img/vhs-carteblanaceyasminebenabderrahmane-08.jpg", caption: "" },
            { src: "img/vhs-carteblanaceyasminebenabderrahmane-09.jpg", caption: "" },
            { src: "img/vhs-carteblanaceyasminebenabderrahmane-01.jpg", caption: "" }
        ]
    },

    eloiselegalloetjuliaborderie: {
        title: "ELOÏSE LE GALLO ET JULIA BORDERIE",
        description:
            "",
        info: "25 septembre 2020",
        flyer: "img/vhs-eloiselegalloetjuliaborderie-07.jpg",
      text: "<div style='margin-bottom: 12px;'>Depuis 2016, <strong>Julia Borderie & Eloïse Le Gallo</strong>, artistes françaises nées en 1989, mettent au centre de leur démarche la rencontre, en ancrant leur processus créatif dans une approche documentaire poétique. Les formes surgissent de l'interaction avec les personnes rencontrées dans des contextes spécifiques.</div><div style='margin-bottom: 12px;'>Le sens se construit dans la plasticité des créations comme une mémoire sensible des rencontres humaines. Ce projet de recherche prend diverses formes (expositions, films, performances, antenne radio), incluant de multiples collaborations.</div><div style='margin-bottom: 12px;'>Dans leurs films, différentes échelles, strates du paysages et nature d'images se mêlent. La géologie observée et transformée communique avec ceux qui l'habitent. Comme une épopée cyclique sans début ni fin, <i>Sources</i> suit les pérégrinations de gourdes en céramiques dans les paysages ardéchois, signes du trajet de l’eau des sommets jusqu'aux vallées. Les bassins versants sont ainsi auscultés suivant les lignes de l’eau et des routes, au fil des saisons et des rencontres.</div><div>Ces façons de faire qui soulèvent des questions de collaboration, d'altérité, d'interaction et de symbiose entreront en dialogue avec le travail photographique et les questionnements de <strong>Pascale Gadon Gonzalez</strong> s'articulant autour des modes d'organisation du vivant.</div>",
       images: [
            { src: "img/vhs-eloiselegalloetjuliaborderie-02.jpg", caption: "" },
            { src: "img/vhs-eloiselegalloetjuliaborderie-03.jpg", caption: "" },
            { src: "img/vhs-eloiselegalloetjuliaborderie-04.jpg", caption: "" },
            { src: "img/vhs-eloiselegalloetjuliaborderie-05.jpg", caption: "" },
            { src: "img/vhs-eloiselegalloetjuliaborderie-06.jpg", caption: "" },
            { src: "img/vhs-eloiselegalloetjuliaborderie-01.jpg", caption: "" }
        ]
    },

    fannydidelonetemmaboccanfuso: {
        title: "FANNY DIDELON ET EMMA BOCCANFUSO",
        description:
            "",
        info: "28 août 2020",
        flyer: "img/vhs-fannydidelonetemmaboccanfuso-01.jpg",
       text: "<div style='margin-bottom: 12px;'><i>« Deux serveuses s'emparent de leur téléphone et se mettent à filmer leur lieu de travail. À travers leur écran, nous rencontrons plusieurs voix, souvent particulières. Ces apparentes « brèves de comptoir », sont en fait les paroles d'un autre monde, parfois cruel, parfois tendre, parfois drôle. Ce voyage de part et d'autre du comptoir, nous vous y emmenons parce que les serveuses c'est nous. »</i></div><div style='margin-bottom: 12px;'>Ce qui advient naturellement dans le café, presque chaque jour, c'est finalement, une certaine lisibilité des différents rapports qu'il peut exister entre des hommes et des femmes, entre les clients et nous. Chaque jour, le café devient la scène d'un spectacle dont on ne saisit pas précisément le genre ; parfois vaudeville, ou romance, souvent comédie et même tragicomédie...</div><div style='margin-bottom: 12px;'>Le café est un cadre, et ce cadre a une temporalité qui fait que les personnes évoluent, s'apprivoisent, se livrent, se regardent, et s'attachent. La soirée sera pour nous l'occasion de vous parler de l'histoire du film et de ses personnages, à travers une discussion menée par <strong>Laure Giroir</strong>.</div><div style='margin-top: 24px; border-top: 1px solid #eee; padding-top: 12px;'><strong>Café, verre d'eau</strong><br>Documentaire de <strong>Emma Boccanfuso & Fanny Didelon</strong>, 53'<br><a href='https://vimeo.com/374964216' target='_blank' style='display: block; margin-top: 8px;'>Voir l'extrait sur Vimeo</a></div>",
       images: [
            { src: "img/vhs-fannydidelonetemmaboccanfuso-02.jpg", caption: "" },
            { src: "img/vhs-fannydidelonetemmaboccanfuso-03.jpg", caption: "" },
            { src: "img/vhs-fannydidelonetemmaboccanfuso-04.jpg", caption: "" },
            { src: "img/vhs-fannydidelonetemmaboccanfuso-05.jpg", caption: "" }
        ]
    },

    sarahsrage: {
        title: "SARAH SRAGE",
        description:
            "",
        info: "8 novembre 2019",
        flyer: "img/vhs-sarahsrage-01.jpg",
     text: "<div style='margin-bottom: 12px;'><strong>Sarah Srage :</strong> « En réalisant <i>Enfants de Beyrouth</i>, je me suis confrontée violemment à un sentiment de perdition. Dans le film, j’interroge mon père Nader, un ancien fonctionnaire d’état, sur son travail pendant la reconstruction de Beyrouth après-guerre, et je filme Dalieh, un petit port de la ville où les dernières familles de pêcheurs sont chassées pour la privatisation du quartier. Le film raconte cette dépossession. »</div><div style='margin-bottom: 12px;'><strong>Urbain Gonzalez :</strong> « Un rivage. Il y a des gens, rassemblés, là. Des adultes et des enfants. Les adultes dissertent, rient, fument. Les enfants jouent. Ils ont construit un abri qui est le lieu de quelque histoire. Les adultes « refont le monde ». Les enfants aussi. Il n’y a pas de femmes. Il y a la mer, tout autour. [...] J’ai pris cette photographie en 2013, au cours d’un voyage à Beyrouth. Je rendais visite à une amie, Sarah Srage, qui réalisait un film sur un lieu appelé Dalieh, situé un peu plus loin sur la côte. »</div><div style='margin-bottom: 12px;'>Au-delà du moment raconté par ce film, et de ce qui distingue ces deux œuvres (la deuxième formant un commentaire de la première), au-delà des différences entre le film et l’image seule, l’enquête au long cours et l’instantané, la critique et l’idéalisation, quelque chose persiste de Dalieh, échappe, nous échappe : une réappropriation populaire qui continue d’avoir cours à Beyrouth. Elle appelle à penser, à débattre, à de nouvelles formes de création.</div><div style='margin-top: 24px; padding-top: 12px; border-top: 1px dotted #ccc;'><strong>Sarah Srage, <i>Enfants de Beyrouth</i>, 2017</strong><br>Film couleur, HD, 59 Min.<br>Produit par l’Atelier Documentaire<br><a href='https://vimeo.com/220638279' target='_blank' style='display: block; margin-top: 8px;'>Regarder la bande-annonce sur Vimeo</a></div>",
      images: [
            { src: "img/vhs-sarahsrage-02.jpg", caption: "" },
            { src: "img/vhs-sarahsrage-03.jpg", caption: "" },
            { src: "img/vhs-sarahsrage-04.jpg", caption: "" },
            { src: "img/vhs-sarahsrage-05.jpg", caption: "" },
            { src: "img/vhs-sarahsrage-06.jpg", caption: "" },
            { src: "img/vhs-sarahsrage-07.jpg", caption: "" }
        ]
    },

    chloemossessian: {
        title: "CHLOÉ MOSSESSIAN",
        description:
            "",
        info: "23 août 2019",
        flyer: "img/vhs-chloemossessian-03.jpg",
        text: "<div style='margin-bottom: 12px;'>Deux films seront projetés l’un à la suite de l’autre. Ils sont réalisés avec trente ans d’écart, mais peuvent se regarder en miroir tant ils se reflètent et se font écho. Se reflètent car tous deux sont des odes à la lumière, à ses éclats et à ses variations. Se font écho comme des respirations parfois lentes ou saccadées, les plans se succèdent, accompagnés d’un rythme qui traduit la musicalité de cette danse du soleil, que l’on peut contempler dans la nature, l’architecture ou au quotidien.</div><div style='margin-bottom: 12px;'>Pour commencer, un court-métrage d’architecture sur le Couvent de la Tourette, <i>Ce Corps Imaginaire</i>, réalisé en 1988 par <strong>Claude Mossessian</strong>. « L’architecture, c’est le jeu savant, correct et magnifique, des formes sous la lumière, n’est ce pas ? » disait Le Corbusier. Une formule que l’architecte décline à merveille pour un usage spirituel et contemplatif dans cette oeuvre qu’il réalise pour une communauté religieuse.</div><div style='margin-bottom: 12px;'>Un bâtiment composé uniquement de béton brut, et de lumière. Claude Mossessian y passe une semaine au printemps 1988, et filme les mouvements, parfois imperceptibles, de la traversée du soleil au fil de la journée sur les surfaces planes ou en relief, de béton ou de verre.</div><div style='margin-top: 40px; margin-bottom: 12px;'>Puis, le film/installation <i>Concert for the Sun</i>, travail à quatre mains de <strong>Chloé Mossessian et Henry Mittnacht</strong>, où l’écriture des images a été créée en simultané avec la composition musicale. La narration du film contient des images d’archives filmées par Claude et Laurence Mossessian dans les années 1980, ainsi que des « photographies en mouvement » filmées par Chloé Mossessian dans l’alternance de la lumière solaire et lunaire.</div><div style='margin-bottom: 12px;'>Évitant l’usage des mots, le film tente de composer une impression visuelle et musicale sur le passé et le présent, et explore le langage du Soleil comme un instrument de linéarité, comme un rappel lumineux de ce qui est éphémère, chaotique et informe : la nature de notre être.</div><div style='margin-top: 40px; margin-bottom: 12px;'><strong>Chloé Mossessian</strong> est artiste vidéaste diplômée des Beaux-Arts de Paris. <strong>Henry Mittnacht</strong> est compositeur et scénariste. En parallèle de leurs pratiques individuelles, ils forment un duo d’auteurs-réalisateurs.</div><div style='margin-bottom: 12px;'><strong>Claude Mossessian</strong> est réalisateur de portraits d’artistes et de films d’expositions.</div><div style='margin-bottom: 12px;'><strong>Mathilde Ayoub</strong>, chercheuse en art contemporain et commissaire d’exposition, est actuellement en résidence au Couvent de la Tourette.</div>",
        images: [
            { src: "img/vhs-chloemossessian-06.jpg", caption: "" },
            { src: "img/vhs-chloemossessian-02.jpg", caption: "" },
            { src: "img/vhs-chloemossessian-04.jpg", caption: "" },
            { src: "img/vhs-chloemossessian-05.jpg", caption: "" },
            { src: "img/vhs-chloemossessian-01.jpg", caption: "" }
        ]
    },

    mehdibesnainou: {
        title: "MEHDI BESNAINOU",
        description:
            "",
        info: "14 juin 2019",
        flyer: "img/vhs-mehdibesnainou-01.jpg",
       text: "<div style='margin-bottom: 12px; font-style: italic; padding-left: 15px; border-left: 2px solid #eee;'>« À l’occasion de VHS, je présenterai plusieurs vidéos réalisées au cours de ces dernières années. Je parlerai de mon fonctionnement de travail en lien avec mes obsessions, dérisoires et universelles, psychologico-métaphysiques et désuètes. Je profiterai de cette entrevue pour inviter <strong>Lies Dousnais</strong>, mathématicien et astrophysicien Bulgare, avec lequel je travaille actuellement à l’élaboration d’une encyclopédie de formes qui fera office d’exposition à la rentrée prochaine. »</div><div style='margin-bottom: 12px;'>Une discussion ouverte sera possible après chaque film projeté et/ou à la fin de l’entrevue.</div><div style='margin-bottom: 12px;'><strong>Au programme :</strong> analogie, forme parfaite, jeux d’enfants...</div><div style='margin-top: 40px; margin-bottom: 12px;'>Le travail de <strong>Mehdi Besnainou</strong> questionne avec humour et sarcasme les rites, codes et tendances actuelles de sa génération dans son aspect socio-culturel, métaphysique, religieux ou encore philosophique.</div><div style='margin-bottom: 12px;'>Que ce soit dans ses pensées les plus introspectives ou dérisoires sur la condition humaine, ses troubles et dilemmes face à l’hygienisme, au transhumanisme ou à sa société de consommation standardisée, il se caractérise par un jeu permanent entre langage oral, écrit et dessiné, répertoire journalier compulsif d’analogie formelles sur les mouvements du monde globalisé, à la manière d’un polymathe à l’ère du numérique.</div><div style='margin-bottom: 12px;'>Partant du dessin et de l’écriture, sa pratique artistique s’étend à tous les champs possibles de la création : la peinture, la vidéo, l’installation, la performance et la musique.</div><div style='margin-bottom: 12px;'>Comme matrice à ces proliférations, il développe depuis peu une forme spécifique : la <i>tv show</i>. Il présentait ainsi récemment au public du Palais de Tokyo le second épisode pilote de son projet vidéo : <i>Télé Palmtree</i>, dans lequel il joue la plupart des rôles dont celui du présentateur télé, lançant autant de jingles que de rubriques en tous genres, pubs, documentaire ou interview d’invités improbables.</div>",
        images: [

        ]
    },

    samitrabelsi: {
        title: "SAMI TRABELSI",
        description:
            "",
        info: "31 mai 2019",
        flyer: "img/vhs-samitrabelsi-01.jpg",
       text: "<div style='margin-bottom: 12px;'><strong>Sami Trabelsi</strong>, artiste photographe et vidéaste, présente deux courts métrages réalisés en collaboration avec <strong>Stéphane Laporte (Domotic)</strong> au cours d'une résidence à la Gare Numérique de Jeumont, ville frontalière avec la Belgique.</div><div style='margin-bottom: 12px;'>Les films n'ont été montrés qu'une seule fois début 2016 pour la soirée de clôture de la résidence et seront donc présentés en exclusivité pendant la soirée du Houloc.</div><div style='margin-bottom: 12px;'>Sami Trabelsi invite <strong>Christine Blanchet</strong>, commissaire d'exposition avec qui il travaille depuis plusieurs années, à discuter autour du travail et des films en compagnie de <strong>Philippe Fauvel</strong>, acteur des deux films, et Stéphane Laporte, musicien compositeur.</div><div style='margin-top: 40px; margin-bottom: 12px;'><strong>Christine Blanchet</strong>, <i>critique et historienne d'art</i></div><div style='margin-bottom: 12px;'>Diplômée d’un doctorat en Histoire de l’Art, Christine Blanchet est commissaire d’exposition indépendante depuis 2010. Elle assure de nombreux commissariats comme notamment : <i>Appel à peinture</i>, Claude Rutault (2008), <i>En mémoire</i> (2015) aux Archives nationales, <i>Sous l’ombre des vagues</i> (2018) à la maison natale de Debussy, ou encore <i>Le Vitrail contemporain</i> (2018) au Couvent de la Tourette.</div><div style='margin-top: 40px; margin-bottom: 12px;'><strong>Stéphane Laporte</strong></div><div style='margin-bottom: 12px;'>Que cela soit sous le nom de <strong>Domotic</strong> ou avec l’un de ses projets parallèles (Centenaire, Egyptology, Karaocake), Stéphane Laporte éclaire discrètement la musique pop-expérimentale depuis 2001. En plus de sa pratique de mixeur / producteur, il compose également de la musique pour des films d'art (Louidgi Beltrame, Louise Hervé et Chloé Maillet, Sami Trabelsi) ou de cinéma (James P. Gannon, Costa-Gavras).</div><div style='margin-top: 40px; margin-bottom: 12px;'><strong>Philippe Fauvel</strong>, <i>critique de cinéma</i></div><div style='margin-bottom: 12px;'>Il enseigne le cinéma à l’université Jules Verne Picardie. Il a écrit dans la revue <i>Vertigo</i> et collabore à <i>Positif</i>, <i>Critique</i> ou <i>Trafic</i>. Il est co-auteur avec Noël Herpe du livre sur Eric Rohmer, <i>Le Celluloïd et le Marbre</i> (Léo Scheer, 2010), et a conçu le livret du coffret DVD <i>Le laboratoire d’Éric Rohmer</i>.</div>",
        images: [

        ]
    },

    charlotteelmoussaed: {
        title: "CHARLOTTE EL MOUSSAED",
        description:
            "",
        info: "19 avril 2019",
        flyer: "img/vhs-charlotteelmoussaed-02.jpg",
      text: "<div style='margin-bottom: 12px;'>J'emprunte l'appellation <strong>Les Malassis</strong> à un quartier de Bagnolet. Il y a de la littérature dans ce mot, ce pourrait être le titre d'un roman de Victor Hugo.</div><div style='margin-bottom: 12px;'>Je fais des œuvres pour trouver des titres. <i>Un homme qui dort</i>, ça dit le masculin. Le texte décrit l’oisiveté, le désenchantement, la paresse, l’indifférence, mais découpé, recollé, décontextualisé, ça parle aussi de plaisir, d’activité, de répétition, d’ennui, ou encore d’attente forcée.</div><div style='margin-bottom: 12px;'>Je me demande si ce personnage aurait pu être une femme.<sup>1</sup></div><div style='margin-top: 40px; margin-bottom: 12px; font-family: serif; padding-left: 20px; border-left: 1px solid #ddd;'>p.75 : Tu es étendu, tout habillé, sur la banquette, les mains croisées derrière la nuque, genoux haut. Tu fermes les yeux, tu les ouvres. […]<br><br>p.76 : Au fil des heures, des jours, des semaines, des saisons, tu te déprends de tout, tu te détaches de tout. Tu découvres, avec presque, parfois, une sorte d’ivresse, que tu es libre, que rien ne te pèse, ne te plait ni ne te déplaît.<sup>2</sup></div><div style='margin-top: 40px; font-size: 0.85em; color: #666; border-top: 1px solid #eee; padding-top: 12px;'><sup>1</sup> Extrait de l'entretien avec Marie Gautier. <i>Les Malassis</i>, vidéo 2017.<br><sup>2</sup> <i>Un homme qui dort</i>. Georges Perec, ed. Denoël, 1967.</div>",
       images: [
            { src: "img/vhs-charlotteelmoussaed-01.jpg", caption: "" },
            { src: "img/vhs-charlotteelmoussaed-03.jpg", caption: "" },
            { src: "img/vhs-charlotteelmoussaed-04.jpg", caption: "" }
        ]
    },

};

// Performance Datenbank
const performanceData = {
    "diner-noel-2024": {
        title: "DÎNER DE NOËL 2024",
        description: "PENSÉ PAR L'ARTISTE ARIA SENE (DOUCE STUDIO)",
        info: "",
        flyer: "img/perf-diner-noel-2024-01.jpg",
        text: "Aria Sene a préparé un menu en s'inspirant du lieu ainsi que de certains artistes du Houloc, et toute une scénographie a été créée pour l'occasion. Les convives ont pu déguster les mets surprises d'Aria dans une vaisselle unique, réalisée par les artistes du Houloc conjointement avec Douce Studio. Chaque invité est reparti avec une assiette et un bol en cadeau.",
        images: [
          
            { src: "img/perf-diner-noel-2024-05.jpg", caption: "" },
            { src: "img/perf-diner-noel-2024-02.jpg", caption: "" },
            { src: "img/perf-diner-noel-2024-03.jpg", caption: "" },
            { src: "img/perf-diner-noel-2024-04.jpg", caption: "" },
            { src: "img/perf-diner-noel-2024-06.jpg", caption: "" }
        ]
    },
    "tout-commencera-par-un-verre": {
        title: "TOUT COMENCERA PAR UN VERRE...",
        description: "ÉVÈNEMENT CULINAIRE PENSÉ ET RÉALISÉ PAR LUC AVARGUES",
        info: "4 mai 2023",
        flyer: "img/perf-tout-commencera-par-un-verre-02.jpg",
       text: "<div style='margin-bottom: 12px;'>Pour le lancement de sa programmation 2023, le Houloc invite Luc Avargues, artiste-chef qui réalisera une grande cérémonie participative pour laquelle il réalisera autant d'œuvres que d'invité.e.s, en plus de l'ensemble des mets de la soirée : doubles magnums de céramique, rigole de pommes flambées, bouchées-hommages au terroir bordelais, langues-hosties au thym à partager…</div><div style='margin-bottom: 12px;'>Détournant les codes du vernissage, il soufflera un léger vent de spiritualité dans l’atelier du Houloc, devenu temple de vos saveurs les plus enfouies. Cette cérémonie sera guidée par la générosité pour vous faire déambuler entre souvenirs culinaires, dégustations cocasses et discussions à bâtons rompus.</div><div style='margin-bottom: 12px;'>Comme un parfum de thym qui se diffuserait dans toute la ville, Luc Avargues a le don de rendre magiques les situations artistiques, en créant des instants de convivialité précieux et gourmands, comme il en a vécu auprès de la reine des cuisinières : sa grand-mère. Il nous propose ici une cérémonie participative, un repas sous forme d’hommage qu’il fera et que nous ferons ensemble aux personnes qui nous apportent ou nous ont apporté le goût de la cuisine.</div><div style='margin-bottom: 12px;'>Et vous, qui vous a réveillé les papilles ? Quel est votre plus lointain souvenir culinaire ? Quel breuvage vous a ému le premier ?</div><div style='margin-bottom: 12px;'>Ce sont tous les sens seront solicités : parfums d’ail noir embaumant l’atelier, tableaux de saveurs herbacées et épicées, oeuvres à goûter ou à lécher pour nous conduire à une balade “digéfestive” parsemée d’encens et de vapeurs d’alambics.</div><div>Luc Avargues réalisera pour l’occasion, au côté des artistes du Houloc, des œuvres inédites que l’on pourra aussi bien toucher que manger. Le tout couronné par une farandole de vins venus tout droit des contrées familiales.</div>",
         images: [
            { src: "img/perf-tout-commencera-par-un-verre-01.jpg", caption: "" },
            { src: "img/perf-tout-commencera-par-un-verre-03.jpg", caption: "" },
            { src: "img/perf-tout-commencera-par-un-verre-04.jpg", caption: "" },
            { src: "img/perf-tout-commencera-par-un-verre-05.jpg", caption: "" },
            { src: "img/perf-tout-commencera-par-un-verre-06.jpg", caption: "" },
            { src: "img/perf-tout-commencera-par-un-verre-07.jpg", caption: "" },
            { src: "img/perf-tout-commencera-par-un-verre-08.jpg", caption: "" }, 
            { src: "img/perf-tout-commencera-par-un-verre-10.jpg", caption: "" },
            { src: "img/perf-tout-commencera-par-un-verre-11.jpg", caption: "" },
            { src: "img/perf-tout-commencera-par-un-verre-12.jpg", caption: "" },
            { src: "img/perf-tout-commencera-par-un-verre-13.jpg", caption: "" }
        
        ]
    },
    "diner-noel-culinaire-2021": {
        title: "DÎNER DE NOËL 2021",
        description: "CARTE BLANCHE à LUZ MORENO PINART",
        info: "10 décembre 2021",
        flyer: "img/perf-diner-noel-culinaire-2021-01.jpg",
        text: "<div style='margin-bottom: 12px;'>Pour cet événement Luz s'empare de l'univers de l'atelier pour vous proposer une déambulation sensorielle dans l'espace. Au cours de la soirée chaque invité.e découvrira 20 types d'actions : chaque action, inspirée par un.e des artistes de l'atelier, prend la forme d'une bouchée, d'un cocktail ou d'une odeur. L'idée étant de « sentir avec les yeux, voir avec la main et goûter avec l'âme » nous précise Luz Moreno Pinart.</div><div style='margin-bottom: 12px; font-style: italic; padding-left: 10px;'>« Ainsi l'art n'est pas un objet, c'est une expérience. » — Joseph Albers</div><div style='margin-bottom: 12px;'>À la suite de ses études de scénographie à l’École Nationale Supérieure des Arts Décoratifs de Paris, Luz Moreno Pinart se passionne pour la fibre auprès de l’artiste Sheila Hicks puis obtient un certificat de Boulangerie et Pâtisserie à l’École du Cordon bleu de Paris. Au sein du duo Toolsoffood, aux côtés d'Anaïs Silvestro, dont la vocation a été de faire découvrir l'univers du vivant par des créations sensorielles. Elle a notamment été résidente de la Villa Kujoyama en 2019, participé au programme Création en cours des Ateliers Médicis en 2018 ainsi qu'à des expositions collectives en France et à l'étranger.</div><a href='https://www.toolsoffood.com/news-food-design-culinaire' target='_blank' style='display: block; margin-top: 12px;'>toolsoffood.com</a>",
        images: [
          
        ]
    },
    "premiere-fete-soleil-nord-est": {
        title: "PREMIÈRE FÊTE (2) - SOLEIL NORD-EST",
        description: "CARTE BLANCHE à COLLECTIF 16AM",
        info: "15 octobre 2021",
        flyer: "img/perf-premiere-fete-soleil-nord-est-01.jpg",
        text: "<div style='margin-bottom: 12px;'><strong>Première Fête²</strong><br><i>Toutes les raisons pour lesquelles je fais la fête sont toutes les raisons de ne pas faire la fête.</i></div><div style='margin-bottom: 12px;'>Dans le cadre du festival Soleil Nord Est, le collectif 16AM répond à l’invitation du Houloc en imaginant à l’échelle d’une soirée une narration articulant performances, créations radiophoniques et Dj sets, au travers des figures, motifs et mythologies des nuits de fête. Plaçant au coeur la mise en crise des pratiques de ses membres (critiques, curateur·ices, plasticiens, auteur·ices, performeur·ses) chacun·e se met au service des formes suscitées à partir des univers composites de Camille Trapier, Aurélie Faure, Samuel Belfond, Clément Douala, Ava Hervier et Arnaud Idelon et, peut-être le public sera-t-il aussi mobilisé pour faire advenir cette fête comme fiction partagée.</div><div style='margin-bottom: 12px; padding-left: 10px; border-left: 1px solid #ccc;'>• Atlas — Performance samplée<br>• Alcantara mon amour — Création radiophonique live<br>• Garçon caverne — Poésie pulsée<br>• Ava's Verden — Live<br>• Seumaine — Capsule de lecture</div><div>16AM, collectif à géométrie variable, est composé d’auteur·ices qui partagent la fête comme médium mettant en crise leur pratique artistique. Plaçant en son cœur l’écriture collaborative et la transdisciplinarité, le collectif interroge l’état de fête comme réconciliation des narrations et solitudes personnelles, en un espace temps donné, au profit d’une fiction commune.</div>",
         images: [
           
        ]
    },
    "dune-rive-a-lautre": {
        title: "D'UNE RIVE À L'AUTRE",
        description: "TABLE RONDE",
        info: "23 septembre 2021",
        flyer: "img/perf-dune-rive-a-lautre-01.jpg",
        text: "D'une rive l'autre propose un temps d'échange autour de trois projets artistiques qui abordent le fleuve comme lieu de rencontre, de recherche et de création : À bord ! de Flavie L.T et Sami Trabelsi / The floating Gap de Lou-poko Savadogo et Anna Ellermets / Le silence des coquilles de Julia Borderie & Eloïse Le Gallo. Les trois duo présenteront leurs productions artistiques (films, photos, son, photos de maquettes) pour engager ensuite une discussion, avec le public et les structures partenaires des projets, autour des enjeux actuels du fleuve comme entité esthétique, poétique, sociale et politique.",
        images: [
            
        ]
    },
    "raccords-soleil-nord-est": {
        title: "RACCORDS - SOLEIL NORD-EST",
        description: "CARTE BLANCHE à HBT",
        info: "novembre 2020",
        flyer: "img/perf-raccords-soleil-nord-est-02.avif",
       text: "<div style='margin-bottom: 12px;'>Dix-huit artistes pour un musicien, et la volonté pour HBT (Dement3d) de remettre en jeu ses improvisations électroniques en piochant dans les projets plastiques qui n’ont jamais vu le jour au Houloc.</div><div style='margin-bottom: 12px;'>De ces collaborations multiples, naît un concert où s’arrangent performances sonores et physiques, images défilantes et danses inavouées, avec la volonté de s’activer ensemble.</div><div style='margin-bottom: 12px;'><a href='https://soundcloud.com/hbtdement3d' target='_blank' style='display: block; margin-bottom: 4px;'>Soundcloud : hbtdement3d</a><a href='https://open.spotify.com/artist/0...' target='_blank' style='display: block;'>Spotify : HBT</a></div><div style='margin-bottom: 12px;'>Cultivant des équilibres instables, HBT est en perpétuelle fuite en avant pour échapper aux codes de la musique électronique, techno, et autres musiques expérimentales. Le désir de s’en défaire côtoie un esprit fédérateur et très ouvert, y compris à des influences plus classiques/contemporaines, jazz, ou même punk/ coldwave. HBT développe une esthétique étrange où viennent se heurter des drones bruyants et des compositions au piano, des séquences mécaniques avec des improvisations spontanées, des rythmiques hybrides et décalées viennent rencontrer d’autres éléments rigides et résolument techno. Une approche urgente et impulsive qui ose les collisions, les dissonances et les prises de risques inconsidérées.</div><div style='margin-bottom: 12px;'>Depuis 2016, Soleil Nord-Est réunit de manière non exhaustive des lieux contribuant au renouveau créatif du Nord Est Parisien, formant une galaxie d’initiatives coopérantes ayant en commun un territoire, l’indépendance de leur programmation et le désir de donner la parole.</div><div style='margin-bottom: 12px;'>Investissant des lieux souvent hors normes, qu’ils soient squats, artist-run space, tiers-lieux culturels ou friches urbaines, ils cherchent à réinventer la façon dont la création se vit au jour le jour, avec liberté, dans des pratiques inclusives et bienveillantes.</div><div style='font-style: italic; font-size: 0.85em;'>Photos : Adrien Thibault</div>",
        images: [
           
            { src: "img/perf-raccords-soleil-nord-est-03.avif", caption: "" },
            { src: "img/perf-raccords-soleil-nord-est-04.avif", caption: "" },
            { src: "img/perf-raccords-soleil-nord-est-06.avif", caption: "" },
            { src: "img/perf-raccords-soleil-nord-est-08.avif", caption: "" },
            { src: "img/perf-raccords-soleil-nord-est-10.avif", caption: "" },
            { src: "img/perf-raccords-soleil-nord-est-11.avif", caption: "" },
   
            { src: "img/perf-raccords-soleil-nord-est-05.avif", caption: "" },
            { src: "img/perf-raccords-soleil-nord-est-07.avif", caption: "" },
            { src: "img/perf-raccords-soleil-nord-est-09.avif", caption: "" }
        ]
    },
    "diner-noel-2019": {
        title: "DÎNER DE NOËL 2019",
        description: "INTERVENTION CULINAIRE DE BYE BYE PEANUTS",
        info: "20 décembre 2019",
        flyer: "img/perf-diner-noel-2019-01.avif",
       text: "<div style='margin-bottom: 12px;'>Le 20 décembre dernier nous organisions au sein du Houloc un repas très spécial confectionné avec amour par le duo de plasticiens Bye Bye Peanuts !</div><div style='margin-bottom: 12px;'>Le dîner fut servi dans les assiettes en céramique conçues pour l'occasion par les artistes de l'atelier.</div><div style='margin-bottom: 12px;'>Les bénéfices de ce dîner permettent à l'association Le Houloc de démarrer 2020 avec un budget dédié aux événements qui se dérouleront au cours de cette nouvelle année, aux cartes blanches offertes à de nouveaux artistes et commissaires.</div><div style='margin-top: 20px; font-style: italic; font-size: 0.85em;'>> En savoir plus sur BYE BYE PEANUTS : <a href='http://www.byebyepeanuts.com/' target='_blank' style='display: block; margin-top: 5px; font-style: normal; font-weight: bold;'>www.byebyepeanuts.com</a></div>",
        images: [
            { src: "img/perf-diner-noel-2019-03.avif", caption: "" },
            { src: "img/perf-diner-noel-2019-04.avif", caption: "" },
            { src: "img/perf-diner-noel-2019-05.avif", caption: "" },
            { src: "img/perf-diner-noel-2019-06.avif", caption: "" },
            { src: "img/perf-diner-noel-2019-07.avif", caption: "" },
            { src: "img/perf-diner-noel-2019-08.avif", caption: "" },
            { src: "img/perf-diner-noel-2019-01.avif", caption: "" },
            { src: "img/perf-diner-noel-2019-02.avif", caption: "" }
        ]
    },
    "lectures-et-accrochage": {
        title: "LECTURES ET ACCROCHAGE",
        description: "AVEC ET AUTOUR DE STÉPHANE CRÉMER",
        info: "23 novembre 2019",
        flyer: "img/perf-lectures-et-accrochage-01.avif",
        text: "<div style='margin-bottom: 12px;'>L’atelier Le Houloc sera heureux de vous accueillir autour de textes inédits de Stéphane Crémer en compagnie d’œuvres de Mathilde Geldhof, d’Ulysse Bordarias, de Lise Stoufflet et de Flavie L.T.</div><div style='margin-bottom: 12px; padding-left: 15px; font-style: italic;'>La Table d’orientation, dit par Raphaël Tiberghien<br>Complainte, Le dernier jour, dits par Jeanne Crémer<br>Programme, par Roland Pilloni<br>et un récit d’aventures, par Stéphane Crémer</div><div style='margin-bottom: 12px;'>Stéphane Crémer est l’auteur d’une dizaine de livres : des recueils de poèmes, dont Compagnies, préfacé par Yves Bonnefoy (éditions isabelle sauvage, 2003), ou Tombeaux & taxidermies, un ensemble de sonnets et de gouaches (Art3/Plessis, 2015) ; ainsi que des récits : Comme un charme, paru chez Denoël en 2006, ou L’amertume du pamplemousse (recueilli avec La lanterne rouge de Gilles A. Tiberghien dans leur livre à quatre mains Des apparences bien suivies, chez Art3/Plessis en 2014).</div><div>Au printemps 2014, il a été accueilli en résidence à la Maison de la poésie de Rennes.</div>",
        images: [
           
        ]
    },
    "capharnaum": {
        title: "CAPHARNAÜM",
        description: "Sur une proposition du Cercle Chromatique, dans le cadre de \"Le Cercle s'ouvre\"",
        info: "12 octobre 2018",
        flyer: "img/perf-capharnaum-01.avif",
       text: "<div style='margin-bottom: 12px;'>AVEC LES ARTISTES DE L'ATELIER :</div><div>Mélissa Boucher, Ulysse Bordarias, Marta Budkiewicz, Célia Coëtte, Mathilde Geldhof, Timothée Dufresne, Camille le Chatelier, Flavie L.T, Mathieu Roquigny, Lise Stouffler, Raphaël Tiberghien.</div>",
        images: [
       
            { src: "img/perf-capharnaum-02.avif", caption: "" },
            { src: "img/perf-capharnaum-03.avif", caption: "" },
            { src: "img/perf-capharnaum-04.avif", caption: "" },
            { src: "img/perf-capharnaum-05.avif", caption: "" }
        ]
    },
    "soleil-nord-est-performances-sonores": {
        title: "SOLEIL NORD-EST - PERFORMANCES SONORES",
        description: "MÉRYLL AMPE - RIOUX/ROUSSEL",
        info: "21 au 27 mai 2018",
        flyer: "img/perf-soleil-nord-est-performances-sonores-01.avif",
       text: "<div style='margin-bottom: 12px;'><strong>Méryll Ampe</strong><br><a href='http://meryllampe.com' target='_blank'>meryllampe.com</a><br><a href='https://meryllampe.bandcamp.com/' target='_blank'>bandcamp</a><br><a href='https://soundcloud.com/meryllampe' target='_blank'>soundcloud</a></div><div style='margin-bottom: 12px;'>Dans son travail sonore, Méryll Ampe établit des liens entre sa pratique musicale et plastique. Elle conçoit le son comme un médium à sculpter en temps réel, révélateur d’expérimentation, où elle utilise des éléments acoustiques captés dans son quotidien et des sources sonores enregistrées pour les combiner avec des synthétiseurs, lecteur cassette, cymbales, etc. Elle créé différentes strates, jouant avec l'imbrication de volumes, de plans et de perspectives pour interroger la matière qui évolue successivement en souterrain et en relief. En live elle s'engage de manière instinctive et radicale, faisant appel à l'écoute du lieu et du corps qui lui sert de baromètre. L'improvisation se tisse d'après les états sonores qui se déploient, des entités qui se croisent, se mélangent ou se décomposent.</div><div style='margin-bottom: 12px;'><a href='https://www.youtube.com/watch?v=ownr685hFbM' target='_blank'>Regarder la performance sur YouTube</a></div><div style='margin-top: 40px; margin-bottom: 12px;'><strong>RIOUX-ROUSSEL</strong><br><i>paleocatch quadraphonic livecoding session</i></div><div style='margin-bottom: 12px;'>Tanguy Roussel (TR) et Vincent Rioux (VR) proposent une session de livecoding* en quadriphonie. Dans la suite de leur précédente performance paleo-livecoding née durant le workshop radiotélescopie initié au cour du festival 100% à la Villette, ils s'affronteront lors d'une grande première sur un ring composé de 4 haut-parleurs.</div><div style='margin-bottom: 12px; font-size: 0.9em; font-style: italic; border-left: 2px solid #eee; padding-left: 10px;'>* Le livecoding est une forme de performance durant laquelle les langages informatiques définissent les principaux moyens d'expression artistique. Les codeurs utilisent des langages de programmation pour rédiger des algorithmes qui génèrent du son (ou autres). Ces bouts de code sont écrits en direct devant un public sous la forme d’une performance improvisée. Ce style d’expression musicale estompe la distinction entre composition écrite et interprétation improvisée.</div><div style='margin-bottom: 12px;'>TR utilisera Supercollider + Scide sur Mac<br>VR utilisera Supercollider + JackAudio + Lisp + TidalCycles sous Linux</div><div style='margin-top: 40px; margin-bottom: 12px;'><strong>Soleil Nord-Est</strong><br>Festival des friches du Nord Est de Paris (et au-delà)<br>Édition 1 — du 21 au 27 mai 2018<br>6 jours – 6 lieux</div><div>Soleil Nord-Est invite à une découverte non exhaustive des lieux contribuant au renouveau créatif du Nord Est Parisien. Une déambulation tour à tour festive, artistique ou réflexive au sein d’une galaxie d’initiatives coopérantes, qu’elles soient squats, artist-run-space, tiers-lieux culturels ou autres.</div>",
        images: [
         
        ]
    },
    "diner-noel-culinaire-sonore": {
        title: "DÎNER DE NOËL 2017",
        description: "CARTE BLANCHE À CELSIAN LANGLOIS",
        info: "2017",
        flyer: "img/perf-diner-noel-culinaire-sonore-01.avif",
        text: "Carte blanche à Celsian Langlois pour une performance culinaire et sonore au Houloc.",
        images: [
           
            { src: "img/perf-diner-noel-culinaire-sonore-02.avif", caption: "" },
            { src: "img/perf-diner-noel-culinaire-sonore-03.avif", caption: "" },
            { src: "img/perf-diner-noel-culinaire-sonore-04.avif", caption: "" },
            { src: "img/perf-diner-noel-culinaire-sonore-05.avif", caption: "" },
            { src: "img/perf-diner-noel-culinaire-sonore-06.avif", caption: "" },
            { src: "img/perf-diner-noel-culinaire-sonore-07.avif", caption: "" },
            { src: "img/perf-diner-noel-culinaire-sonore-08.avif", caption: "" }
        ]
    }
};

 

// 2. Kern-Funktion: Popup öffnen (mit deinen neuen IDs)
function openArchivePopup(id) {
    // Check both archiveData and performanceData
    const data = archiveData[id] || performanceData[id];
    if (!data) return;
    
    // Track current archive ID for navigation
    currentArchiveId = id;
    
    currentGalleryImages = data.images || [];

    const overlay = document.getElementById("archive-overlay");
    const target = document.getElementById("archive-content-target");
    const wrapper = document.querySelector(".archive-popup-wrapper");

    if (!overlay || !target) return;

    // Combine all IDs for navigation (both archives and performances)
    const allIds = [...Object.keys(archiveData), ...Object.keys(performanceData)];
    const currentIndex = allIds.indexOf(id);
    const prevId = currentIndex > 0 ? allIds[currentIndex - 1] : allIds[allIds.length - 1];
    const nextId = currentIndex < allIds.length - 1 ? allIds[currentIndex + 1] : allIds[0];

    
    target.innerHTML = `
        <div class="archive-inner-layout">
            <h1 style="font-size: 4rem; text-transform: uppercase; margin-bottom: 30px; line-height:0.9;">${data.title}</h1>
            
            <p style="font-size: 1.2rem; font-weight: bold;  margin-bottom: 30px;text-align: justify;    hyphens: auto;             
            word-break: break-word; width: 100%;">${data.description}</p>
            
              <p style="color: #0047ff; font-size:1rem; font-weight: bold; margin-top: 20px; margin-bottom: 35px;">${data.info}</p>
            
            ${data.flyer ? `
                <div class="archive-flyer-container" style="margin-bottom: 30px; cursor: zoom-in;">
                    <img src="${data.flyer}" alt="Flyer ${data.title}" 
                         style="width: 100%; max-height: 600px; object-fit: contain;"
                         onclick="openLightboxArchive(0)">
                </div>
            ` : ''}
          
            
            <div style="
            width: 100%;   
            text-align: justify;   
            hyphens: auto;             
            word-break: break-word; 
            line-height: 1.7; 
            font-size: 1.2rem; 
            margin-bottom: 30px;">
                ${data.text}
            </div>
            
            
    
       
                   
         

            <div class="archive-gallery-grid">
                ${data.images
                    .map(
                        (img) => `
                    <div class="archive-img-box">
                        <img src="${img.src}" alt="${img.caption}" style="width:100%; ">
                        <p style="font-size: 0.8rem; margin-top: 10px; text-transform: uppercase;">${img.caption}</p>
                    </div>
                    
                    
                `
                    )
                    .join("")}
            </div>
        </div>
        
           <div style="margin-top: 80px; padding-bottom: 80px; display: flex; flex-direction: column; align-items: center; gap: 20px;">
            <div style="width: 60px; height: 3px; background: black;"></div>
          
        </div>
    `;

    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
    
    // --- DER RESET-FIX WIE IN OPENARTIST ---
    setTimeout(() => {
        if (overlay) overlay.scrollTop = 0;
        if (wrapper) wrapper.scrollTop = 0;
        if (target) target.scrollTop = 0;
    }, 10);
}

// 3. Initialisierung
document.addEventListener("DOMContentLoaded", () => {
    const scrollContainer = document.getElementById("col-dates");
    const yearMarkers = document.querySelectorAll(".year-marker");
    const archiveOverlay = document.getElementById("archive-overlay");
   
    const closeBtn = document.querySelector(".archive-close-button");

    // --- AUTOMATISCHE LINIEN ---
    document.querySelectorAll(".line-container").forEach((container) => {
        if (container.children.length === 0) {
            for (let i = 0; i < 12; i++) {
                const line = document.createElement("div");
                line.className = "line";
                container.appendChild(line);
            }
        }
    });

    // --- HIGHLIGHT BEIM SCROLLEN ---
    const highlightYear = () => {
        if (!scrollContainer) return;
        const triggerPoint = scrollContainer.getBoundingClientRect().top + 150;

        yearMarkers.forEach((marker) => {
            const markerPos = marker.getBoundingClientRect().top;
            if (Math.abs(markerPos - triggerPoint) < 50) {
                yearMarkers.forEach((m) => m.classList.remove("active"));
                marker.classList.add("active");
            }
        });
    };
    if (scrollContainer) scrollContainer.addEventListener("scroll", highlightYear);

    // --- 4-SPALTEN-SYNC (Einseitig: Nur Zeitstrahl synchronisiert andere) ---
    const colDates = document.getElementById("col-dates");
    const colExpo = document.getElementById("col-expo");
    const colPerf = document.getElementById("col-perf");
    const colVhs = document.getElementById("col-vhs");
    
    let isScrolling = false;
    
    // Nur der Zeitstrahl synchronisiert die anderen Spalten
    if (colDates) {
        colDates.addEventListener("scroll", () => {
            if (isScrolling) return;
            isScrolling = true;
            const scrollTop = colDates.scrollTop;
            if (colExpo) colExpo.scrollTop = scrollTop;
            if (colPerf) colPerf.scrollTop = scrollTop;
            if (colVhs) colVhs.scrollTop = scrollTop;
            setTimeout(() => {
                isScrolling = false;
            }, 10);
        });
    }

    // --- CLICK EVENTS (Items & Navigation) ---
    document.querySelectorAll(".archive-item").forEach((item) => {
        item.addEventListener("click", () => {
            const id = item.getAttribute("data-id");
            if (id) openArchivePopup(id);
        });
    });

    document.querySelectorAll(".year-marker, .line").forEach((el) => {
        el.addEventListener("click", () => {
            const parentCol = el.closest(".scroll-column");
            if (parentCol) {
                const targetPos = el.offsetTop - parentCol.offsetTop - 50;
                parentCol.scrollTo({ top: targetPos, behavior: "smooth" });
            }
        });
    });

    // --- SCHLIESSEN LOGIK ---
    if (closeBtn && archiveOverlay) {
        closeBtn.addEventListener("click", () => {
            archiveOverlay.classList.remove("active");
            document.body.style.overflow = "auto";
        });
        archiveOverlay.addEventListener("click", (e) => {
            if (e.target === archiveOverlay) {
                archiveOverlay.classList.remove("active");
                document.body.style.overflow = "auto";
            }
        });
    }

    // --- NEUE NAVIGATIONSPFEILE IM POPUP (IN HTML) ---
    document.querySelector('.archive-prev')?.addEventListener('click', () => {
        const allIds = [...Object.keys(archiveData), ...Object.keys(performanceData)];
        const currentIndex = allIds.indexOf(currentArchiveId);
        const prevId = currentIndex > 0 ? allIds[currentIndex - 1] : allIds[allIds.length - 1];
        openArchivePopup(prevId);
    });

    document.querySelector('.archive-next')?.addEventListener('click', () => {
        const allIds = [...Object.keys(archiveData), ...Object.keys(performanceData)];
        const currentIndex = allIds.indexOf(currentArchiveId);
        const nextId = currentIndex < allIds.length - 1 ? allIds[currentIndex + 1] : allIds[0];
        openArchivePopup(nextId);
    });

    // --- KEYBOARD NAVIGATION FÜR ARCHIV POPUP ---
    document.addEventListener('keydown', (e) => {
        // Only process archive popup navigation if lightbox is NOT active
        const lightboxActive = document.getElementById('lightbox-archive-overlay')?.classList.contains('active');
        
        if (!archiveOverlay.classList.contains('active')) return;

        if (e.key === "Escape") {
            if (lightboxActive) {
                // Close lightbox first
                document.getElementById('lightbox-archive-overlay').classList.remove('active');
            } else {
                // Close archive popup
                archiveOverlay.classList.remove("active");
                document.body.style.overflow = "auto";
                removeArchiveNavArrows();
            }
            return;
        }
        
        // Only allow archive navigation if lightbox is not active
        if (!lightboxActive) {
            if (e.key === "ArrowRight") {
                document.querySelector('.archive-next')?.click();
            }
            if (e.key === "ArrowLeft") {
                document.querySelector('.archive-prev')?.click();
            }
        }
    });
});

// 1. Die Funktion zum Befüllen der Lightbox
function openLightboxArchive(index) {
    currentImgIndex = index;
    const imgData = currentGalleryImages[currentImgIndex];
    
    const lbImg = document.getElementById('lightbox-archive-img');
    const lbCaption = document.getElementById('lightbox-archive-caption');
    
    if (lbImg && imgData) {
        lbImg.src = imgData.src;
        lbCaption.innerText = imgData.caption || "";
        document.getElementById('lightbox-archive-overlay').classList.add('active');
    }
}

// 2. Integration in DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    
    // Schließen bei Klick in den leeren Bereich
const lbArchiveOverlay = document.getElementById('lightbox-archive-overlay');

if (lbArchiveOverlay) {
    lbArchiveOverlay.addEventListener('click', (e) => {
        // e.target ist das Element, auf das geklickt wurde.
        // Wenn es das Overlay selbst ist (und nicht das Bild oder ein Pfeil), schließen wir.
        if (e.target === lbArchiveOverlay) {
            lbArchiveOverlay.classList.remove('active');
            // Optional: Wenn das Archiv-Popup auch noch offen ist, 
            // lassen wir den Body-Overflow auf 'hidden'.
        }
    });
}
    
    // Klick auf ein Bild im Archiv-Inhalt abfangen
    const archiveTarget = document.getElementById('archive-content-target');
    if (archiveTarget) {
        archiveTarget.addEventListener('click', (e) => {
            if (e.target.tagName === 'IMG') {
                const clickedSrc = e.target.getAttribute('src');
                currentImgIndex = currentGalleryImages.findIndex(img => img.src === clickedSrc);
                if (currentImgIndex !== -1) {
                    openLightboxArchive(currentImgIndex);
                }
            }
        });
    }

    // Navigation: Weiter
    document.querySelector('.lightbox-archive-next')?.addEventListener('click', () => {
        currentImgIndex = (currentImgIndex + 1) % currentGalleryImages.length;
        openLightboxArchive(currentImgIndex);
    });

    // Navigation: Zurück
    document.querySelector('.lightbox-archive-prev')?.addEventListener('click', () => {
        currentImgIndex = (currentImgIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
        openLightboxArchive(currentImgIndex);
    });

    // Schließen
    document.querySelector('.lightbox-archive-close')?.addEventListener('click', () => {
        document.getElementById('lightbox-archive-overlay').classList.remove('active');
    });

    // Tastatur-Steuerung (Optional aber empfohlen)
    document.addEventListener('keydown', (e) => {
        const lb = document.getElementById('lightbox-archive-overlay');
        if (!lb.classList.contains('active')) return;

        if (e.key === "ArrowRight") document.querySelector('.lightbox-archive-next').click();
        if (e.key === "ArrowLeft") document.querySelector('.lightbox-archive-prev').click();
        if (e.key === "Escape") lb.classList.remove('active');
    });
});




// Timeline Events auf dem Zeitstrahl anzeigen
async function loadTimelineEvents() {
    try {
        const response = await fetch('events-data.json');
        const data = await response.json();
        
        // Alle Events zusammenfassen
        const allEvents = [
            ...data.performances.map(e => ({...e, type: 'performance'})),
            ...data.vhs.map(e => ({...e, type: 'vhs'})),
            ...data.expositions.map(e => ({...e, type: 'exposition'}))
        ];
        
        // Events nach Jahr gruppieren
        const eventsByYear = {};
        allEvents.forEach(event => {
            if (!eventsByYear[event.year]) {
                eventsByYear[event.year] = [];
            }
            eventsByYear[event.year].push(event);
        });
        
        // Für jede Jahresgruppe die Events auf den Linien positionieren
        document.querySelectorAll('.year-group').forEach(yearGroup => {
            const yearMarker = yearGroup.querySelector('.year-marker');
            const lineContainer = yearGroup.querySelector('.line-container');
            
            if (!yearMarker || !lineContainer) return;
            
            const year = parseInt(yearMarker.textContent);
            const yearEvents = eventsByYear[year] || [];
            
            // Linien holen und sicherstellen, dass genau 12 vorhanden sind
            let lines = lineContainer.querySelectorAll('.line');
            
            // Falls weniger als 12 Linien vorhanden sind, erstelle sie
            if (lines.length < 12) {
                lineContainer.innerHTML = '';
                for (let i = 0; i < 12; i++) {
                    const line = document.createElement('div');
                    line.className = 'line';
                    line.setAttribute('data-month', i + 1); // Monat 1-12
                    lineContainer.appendChild(line);
                }
                lines = lineContainer.querySelectorAll('.line');
            }
            
            // Events auf die entsprechenden Monats-Linien positionieren
            yearEvents.forEach(event => {
                // Monate sind umgekehrt: Dezember ist oben, Januar ist unten
                const monthIndex = 12 - event.month; // Dezember=0, Januar=11
                if (monthIndex >= 0 && monthIndex < lines.length) {
                    const line = lines[monthIndex];
                    
                    // Event-Marker erstellen
                    const eventMarker = document.createElement('div');
                    eventMarker.className = 'timeline-event-marker';
                    eventMarker.setAttribute('data-event-id', event.id);
                    eventMarker.setAttribute('data-event-type', event.type);
                    eventMarker.title = `${event.name} (${event.month}/${event.year})`;
                    
                    // Farbe basierend auf Kategorie
                    let markerColor = '#0047ff'; // Standard: blau
                    if (event.type === 'performance') markerColor = '#207b4f'; // grün
                    if (event.type === 'vhs') markerColor = '#ff3333'; // rot
                    if (event.type === 'exposition') markerColor = '#ffcc00'; // gelb
                    
                    eventMarker.style.cssText = `
                        width: 12px;
                        height: 12px;
                        background: ${markerColor};
                        border-radius: 50%;
                        position: absolute;
                        right: -20px;
                        top: 50%;
                        transform: translateY(-50%);
                        cursor: pointer;
                        transition: transform 0.2s, box-shadow 0.2s;
                        z-index: 10;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                    `;
                    
                    // Hover-Effekt
                    eventMarker.addEventListener('mouseenter', () => {
                        eventMarker.style.transform = 'translateY(-50%) scale(1.5)';
                        eventMarker.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
                    });
                    
                    eventMarker.addEventListener('mouseleave', () => {
                        eventMarker.style.transform = 'translateY(-50%) scale(1)';
                        eventMarker.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
                    });
                    
                    // Klick öffnet das Event
                    eventMarker.addEventListener('click', (e) => {
                        e.stopPropagation();
                        openArchivePopup(event.id);
                    });
                    
                    // Position relativ zur Linie
                    line.style.position = 'relative';
                    line.appendChild(eventMarker);
                }
            });
        });
        
        console.log('Timeline Events geladen:', allEvents.length, 'Events');
    } catch (error) {
        console.error('Fehler beim Laden der Timeline Events:', error);
    }
}

// Timeline Events laden wenn DOM bereit ist
document.addEventListener('DOMContentLoaded', () => {
    loadTimelineEvents();
});

const infoData = {
    apropos: {
        title: "À PROPOS",
        content: `
            <img src="img/Le-Houloc_La_Courneuve_1.jpg" style="width:100%; border-radius: 20px; margin-top: 20px; margin-bottom:20px;">
            <p style="font-size: 1.2rem; line-height: 1.7; text-align: justify; hyphens: auto;">Le Houloc est une association loi 1901 ayant pour objet le soutien de la création et de la recherche artistique, ainsi que sa diffusion.</p>
            <p style="font-size: 1.2rem; line-height: 1.7; text-align: justify; hyphens: auto;">Le Houloc a été créé en 2016 par un ensemble d'artistes émergents, désireux de travailler ensemble, de partager recherches et savoirs. Installée dans une ancienne menuiserie d'Aubervilliers, l'association a rassemblé au fil des années 22 artistes poursuivant chacun des pratiques singulières, allant de la sculpture à la photographie en passant par la peinture, l'écriture, ou encore l'installation et la vidéo. Cet éventail pluridisciplinaire est le socle sur lequel repose une volonté d'échange et de mise en commun des points de vue et des compétences dans le but de tirer profit de leur complémentarité.</p>
            <p style="font-size: 1.2rem; line-height: 1.7; text-align: justify; hyphens: auto;">Le Houloc a déménagé début 2026 à La Courneuve, dans un nouveau lieu plus vaste. L'association compte aujourd'hui 33 artistes et continue de s'organiser selon la même dynamique fondatrice : un espace géré par les artistes eux-mêmes, composé d'ateliers personnels et partagés dont les spécificités permettent à chacun d'expérimenter, d'approfondir différentes techniques et de mener à terme ses projets. Un espace dédié aux expositions offre la possibilité d'une ouverture au-delà de l'association, permettant à ses membres de partager leurs recherches et d'accueillir des propositions émanant de l'extérieur.</p>
            <p style="font-size: 1rem; line-height: 1.7; text-align: justify; hyphens: auto; font-style: italic; padding-bottom: 3rem;">* Le houloc est un singe homininoïde de la famille des hylobatidés.</p>
        `
    },
    presse: {
        title: "PRESSE",
        content: `
            <div class="presse-container" style="display: flex; flex-direction: column; gap: 40px;">
                
<div class="presse-item" style="display: flex; align-items: flex-start; gap: 25px; margin-top: 20px; padding-bottom: 30px; border-bottom: 1px solid #eee;">
<img src="img/presse-atelier-collectif-2024.jpg" style="width: 270px; height: 175px; object-fit: cover; flex-shrink: 0;">
                    <div style="flex: 1;">
                        <h3 style="font-size: 1.1rem; margin-top: 0; margin-bottom: 8px; text-transform: uppercase;">LE HOULOC, UN ATELIER COLLECTIF FACE À L'INCERTITUDE DE SON AVENIR</h3>
                        <small style="color: #666;">Par Thibault Bissirier - 11/12/2024</small>
<p style="margin-top: 12px; font-size: .95rem; line-height: 1.7; text-align: justify; hyphens: auto;">"Après huit ans passés à Aubervilliers, les artistes du Houloc sont contraints de quitter leurs locaux en 2025. Un tournant pour ce collectif qui doit, comme beaucoup d'ateliers basés en banlieue parisienne, se plier à la pression immobilière des promoteurs."</p>
                        <a href="https://laperle-paris.com/article_actualites/le-houloc-un-atelier-collectif-face-a-lincertitude-de-son-avenir/" target="_blank" style="color: #0047ff; font-size: 0.9rem; display: inline-block; margin-top: 10px;">Lire l'article →</a>
                    </div>
                </div>

<div class="presse-item" style="display: flex; align-items: flex-start; gap: 25px; padding-bottom: 30px; border-bottom: 1px solid #eee;">
<img src="img/presse-artais-art-contemporain-2022.jpg" style="width: 270px; height: 175px; object-fit: cover; flex-shrink: 0;">
                    <div style="flex: 1;">
                        <h3 style="font-size: 1.1rem; margin-top: 0; margin-bottom: 8px; text-transform: uppercase;">LE HOULOC - ARTAIS ART CONTEMPORAIN</h3>
                        <small style="color: #666;">Par Alexia Pierre - 29/09/2022</small>
                        <p style="margin-top: 12px; font-size: 0.95rem; line-height: 1.6; text-align: justify; hyphens: auto;">"Un tabouret s'octroie le rôle de piédestal. Un fauteuil celui de chevalet. Sur chacun des meubles ainsi réinventés, une œuvre repose en équilibre. Le Houloc s'est infiltré loin des murs de son refuge, ancienne menuiserie d'Aubervilliers."</p>
                        <a href="Presse/Le Houloc - Artais Artcontemporain - 29 septembre 2022.pdf" target="_blank" style="color: #0047ff; font-size: 0.9rem; display: inline-block; margin-top: 10px;">📄 Télécharger le PDF</a>
                    </div>
                </div>

<div class="presse-item" style="display: flex; align-items: flex-start; gap: 25px; padding-bottom: 30px; border-bottom: 1px solid #eee;">
<img src="img/presse-partir-du-lieu-malakoff-2022.jpg" style="width: 270px; height: 175px; object-fit: cover; flex-shrink: 0;">
                    <div style="flex: 1;">
                        <h3 style="font-size: 1.1rem; margin-top: 0; margin-bottom: 8px; text-transform: uppercase;">PARTIR DU LIEU</h3>
                        <small style="color: #666;">Par Aude Cartier - 22/01/2022</small>
                        <p style="margin-top: 12px; font-size: 0.95rem; line-height: 1.6; text-align: justify; hyphens: auto;">"De fait, l'invitation du centre d'art au Houloc pour investir le site de la maison des arts vient naturellement poursuivre ce travail d'observation en lien avec la pratique des collectifs. Le titre de leur projet « Partir du lieu » dévoile une complicité qu'iels nous proposent."</p>
                        <a href="Presse/DP_Houloc_29_11_2021.pdf" target="_blank" style="color: #0047ff; font-size: 0.9rem; display: inline-block; margin-top: 10px;">📄 Télécharger le PDF</a>
                    </div>
                </div>

<div class="presse-item" style="display: flex; align-items: flex-start; gap: 25px; padding-bottom: 30px; border-bottom: 1px solid #eee;">
<img src="img/presse-rebelote-quatre-manches-2020.jpg" style="width: 270px; height: 175px; object-fit: cover; flex-shrink: 0;">
                    <div style="flex: 1;">
                        <h3 style="font-size: 1.1rem; margin-top: 0; margin-bottom: 8px; text-transform: uppercase;">REBELOTE EN QUATRE MANCHES</h3>
                        <small style="color: #666;">Par Sandra Barré - 11/07/2020</small>
                        <p style="margin-top: 12px; font-size: 0.95rem; line-height: 1.6; text-align: justify; hyphens: auto;">"Comment bien se sortir du confinement ? Les quatre manches de l'exposition Rebelote au Houloc mélangent chaque semaine les cartes (quatre commissaires, dix-neuf artistes), rappelant le plaisir du jeu et la richesse des rencontres."</p>
                        <a href="https://www.artpress.com/2020/07/11/rebelote-en-quatre-manches/" target="_blank" style="color: #0047ff; font-size: 0.9rem; display: inline-block; margin-top: 10px;">Lire l'article →</a>
                    </div>
                </div>

<div class="presse-item" style="display: flex; align-items: flex-start; gap: 25px; padding-bottom: 30px; border-bottom: 1px solid #eee;">
<img src="img/presse-banlieue-espace-liberte-2021.jpg" style="width: 270px; height: 175px; object-fit: cover; flex-shrink: 0;">
                    <div style="flex: 1;">
                        <h3 style="font-size: 1.1rem; margin-top: 0; margin-bottom: 8px; text-transform: uppercase;">LA BANLIEUE, ESPACE DE LIBERTÉ POUR L'ART</h3>
                        <small style="color: #666;">Par Roxana Azimi, Magali Lesauvage et Marine Vazzoler - 22/01/2021</small>
                        <p style="margin-top: 12px; font-size: 0.95rem; line-height: 1.6; text-align: justify; hyphens: auto;">"Si depuis plusieurs décennies déjà, les lieux d'art autour de Paris sont d'indispensables sémaphores de la création, ils ont longtemps été isolés de leur contexte. Aujourd'hui, la périphérie n'est plus à considérer comme un « territoire vierge à conquérir », mais un espace d'expérimentation et d'imaginaires privilégié."</p>
                        <a href="Presse/QDA_2021-01-22.pdf" target="_blank" style="color: #0047ff; font-size: 0.9rem; display: inline-block; margin-top: 10px;">📄 Télécharger le PDF</a>
                    </div>
                </div>

<div class="presse-item" style="display: flex; align-items: flex-start; gap: 25px; padding-bottom: 30px; border-bottom: 1px solid #eee;">
<img src="img/presse-sutures-pour-raccords-2020.jpg" style="width: 270px; height: 175px; object-fit: cover; flex-shrink: 0;">
                    <div style="flex: 1;">
                        <h3 style="font-size: 1.1rem; margin-top: 0; margin-bottom: 8px; text-transform: uppercase;">SUTURES POUR RACCORDS</h3>
                        <small style="color: #666;">Par Arnaud Idelon - 12/11/2020</small>
                        <p style="margin-top: 12px; font-size: 0.95rem; line-height: 1.6; text-align: justify; hyphens: auto;">"Et puis elle vient, enfin elle vient, furieuse et invoquée, elle vient, dans nos corps rendus tacites et les gestes que l'on lance dans le cube, dans les rondes et demies-lunes, elle vient la danse, comme trop retenue."</p>
                        <a href="https://yaci-international.com/sutures-pour-raccords/" target="_blank" style="color: #0047ff; font-size: 0.9rem; display: inline-block; margin-top: 10px;">Lire l'article →</a>
                    </div>
                </div>

<div class="presse-item" style="display: flex; align-items: flex-start; gap: 25px; padding-bottom: 30px; border-bottom: 1px solid #eee;">
<img src="img/presse-succes-houloc-2020.jpg" style="width: 270px; height: 175px; object-fit: cover; flex-shrink: 0;">
                    <div style="flex: 1;">
                        <h3 style="font-size: 1.1rem; margin-top: 0; margin-bottom: 8px; text-transform: uppercase;">AUBERVILLIERS, LE SUCCÈS DU "HOULOC"</h3>
                        <small style="color: #666;">Par Marianne Dollo - 31/08/2020</small>
                        <p style="margin-top: 12px; font-size: 0.95rem; line-height: 1.6; text-align: justify; hyphens: auto;">"Cet éventail pluridisciplinaire est le fondement de l'état d'esprit des protagonistes animés par une volonté farouche de mutualisation, eux diraient plutôt mise en commun, de leurs compétences, mettant ainsi leurs complémentarités au service de la création et de la créativité."</p>
                        <a href="https://www.yellowoverpurple.com/blog/aubervilliers-le-succes-du-houloc-atelier-collectif-de-17-artistes-qui-reinventent-en-continu-les-cooperations-au-service-de-la-creation/" target="_blank" style="color: #0047ff; font-size: 0.9rem; display: inline-block; margin-top: 10px;">Lire l'article →</a>
                    </div>
                </div>

<div class="presse-item" style="display: flex; align-items: flex-start; gap: 25px; padding-bottom: 30px; border-bottom: 1px solid #eee;">
<img src="img/presse-boys-dont-cry-2020.jpg" style="width: 270px; height: 175px; object-fit: cover; flex-shrink: 0;">
                    <div style="flex: 1;">
                        <h3 style="font-size: 1.1rem; margin-top: 0; margin-bottom: 8px; text-transform: uppercase;">PRÉSENT.E #13 - BOYS DON'T CRY</h3>
                        <small style="color: #666;">Par Camille Bardin - 03/07/2020</small>
                        <p style="margin-top: 12px; font-size: 0.95rem; line-height: 1.6; text-align: justify; hyphens: auto;">Podcast avec Jean Claracq, Lenny Rébéré, Mathieu Roquigny et Romain Vicari. "Il ne faudrait pas pleurer, ne pas jouer à la poupée, ne jamais se montrer vulnérable, ne pas être trop féminin, ne pas avoir peur."</p>
                        <a href="https://soundcloud.com/camillebardin/jean-clarcq-lenny-rebere-mathieu-roquigny-et-romain-vicari-13" target="_blank" style="color: #0047ff; font-size: 0.9rem; display: inline-block; margin-top: 10px;">Écouter le podcast →</a>
                    </div>
                </div>

<div class="presse-item" style="display: flex; align-items: flex-start; gap: 25px; padding-bottom: 30px;">
<img src="img/presse-soleil-nord-est-2020.jpg" style="width: 270px; height: 175px; object-fit: cover; flex-shrink: 0;">
                    <div style="flex: 1;">
                        <h3 style="font-size: 1.1rem; margin-top: 0; margin-bottom: 8px; text-transform: uppercase;">SOLEIL NORD-EST : CE QUI NOUS FAIT COMMUNS</h3>
                        <small style="color: #666;">Par Arnaud Idelon - 18/06/2020</small>
                        <p style="margin-top: 12px; font-size: 0.95rem; line-height: 1.6; text-align: justify; hyphens: auto;">Interview croisé des équipes à l'occasion du festival inter-lieux Soleil Nord Est. "La Station - Gare des Mines, DOC, le Shakirail, Zone Sensible - Ferme Urbaine de Saint-Denis, le Houloc et le Cirque Électrique ont décidé de coopérer pour produire un événement qui soit le reflet de leurs visions d'une ville réinventée."</p>
                    </div>
                </div>

            </div>
        `
    },
    newsletter: {
    title: "NEWSLETTER",
    content: `
        <form action="https://weebly.us17.list-manage.com/subscribe/post?u=e83fb1aca63e44cad455f534b&id=acb9de1311&f_id=008fc8e3f0" 
              method="post" 
              id="mc-embedded-subscribe-form" 
              name="mc-embedded-subscribe-form" 
              target="_blank"
              style="display:flex; flex-direction:column; gap:15px;">
            
            <input type="text" name="FNAME" id="mce-FNAME" placeholder="NAME" style="padding:10px; border:2px solid black; font-family: inherit;">
            
            <input type="email" name="EMAIL" id="mce-EMAIL" placeholder="EMAIL" required style="padding:10px; border:2px solid black; font-family: inherit;">
            
            <div style="position: absolute; left: -5000px;" aria-hidden="true">
                <input type="text" name="b_e83fb1aca63e44cad455f534b_acb9de1311" tabindex="-1" value="">
            </div>

            <label style="font-size: 12px; display: flex; gap: 10px; align-items: center; cursor: pointer;">
                <input type="checkbox" name="AGREE" required style="cursor: pointer;">
                <span>J'accepte de recevoir votre newsletter</span>
            </label>

            <button type="submit" name="subscribe" id="mc-embedded-subscribe" style="background:black; color:white; padding:10px; cursor:pointer; border:none; font-weight:bold;">S'ABONNER</button>
            
            <div id="newsletter-message" style="margin-top: 10px; font-size: 14px; font-weight: bold; display: none; color: black;">
                Merci ! Vous êtes inscrit.
            </div>
        </form>
    `
},
    partenaires: {
    title: "PARTENAIRES",
    content: `
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; margin-top: 30px;">
            <div style="display: flex; align-items: center; justify-content: center; padding: 20px; background: white; border-radius: 10px;">
                <img src="img/logo-fondation-france.avif" alt="Fondation de France" style="max-width: 100%; max-height: 80px; object-fit: contain;">
            </div>
           
            <div style="display: flex; align-items: center; justify-content: center; padding: 20px; background: white; border-radius: 10px;">
                <img src="img/logo-drac.avif" alt="DRAC Île-de-France" style="max-width: 100%; max-height: 80px; object-fit: contain;">
            </div>
            <div style="display: flex; align-items: center; justify-content: center; padding: 20px; background: white; border-radius: 10px;">
                <img src="img/logo-tram.avif" alt="TRAM" style="max-width: 100%; max-height: 80px; object-fit: contain;">
            </div>
        </div>
    `
}
};

function openInfoPopup(id) {
    const data = infoData[id];
    const target = document.getElementById("info-content-target");
    const overlay = document.getElementById("info-overlay");

    // Info-Keys für Navigation
    const infoKeys = Object.keys(infoData);
    const currentIndex = infoKeys.indexOf(id);
    const prevId = currentIndex > 0 ? infoKeys[currentIndex - 1] : infoKeys[infoKeys.length - 1];
    const nextId = currentIndex < infoKeys.length - 1 ? infoKeys[currentIndex + 1] : infoKeys[0];

    // Äußere Navigationspfeile erstellen
    // createInfoNavArrows disabled - using HTML buttons instead

    target.innerHTML = `
        <h1 style="font-size: 3rem; margin-bottom: 20px;">${data.title}</h1>
        <hr style="border: 2px solid black; margin-bottom: 30px;">
        <div>${data.content}</div>
    `;
    overlay.classList.add("active"); document.body.style.overflow = "hidden";
}

function closeInfoOverlay() {
    document.getElementById("info-overlay").classList.remove("active"); document.body.style.overflow = "auto";
    // Äußere Pfeile entfernen
    // removeInfoNavArrows disabled - using HTML buttons instead
}

// Äußere Navigationspfeile für Info-Pop-up erstellen
function createInfoNavArrows(prevId, nextId) {
    // Zuerst alle existierenden Pfeile entfernen
    removeInfoNavArrows();
    
    // Linker Pfeil (vorherige Info)
    const prevArrow = document.createElement('div');
    prevArrow.className = 'info-nav-arrow prev';
    prevArrow.innerHTML = '←';
    prevArrow.onclick = () => openInfoPopup(prevId);
    prevArrow.title = `Vorherige Info`;
    
    // Rechter Pfeil (nächste Info)
    const nextArrow = document.createElement('div');
    nextArrow.className = 'info-nav-arrow next';
    nextArrow.innerHTML = '→';
    nextArrow.onclick = () => openInfoPopup(nextId);
    nextArrow.title = `Nächste Info`;
    
    // Pfeile zum Body hinzufügen
    document.body.appendChild(prevArrow);
    document.body.appendChild(nextArrow);
}

// Äußere Navigationspfeile für Info entfernen
function removeInfoNavArrows() {
    const existingArrows = document.querySelectorAll('.info-nav-arrow');
    existingArrows.forEach(arrow => arrow.remove());
}

// Info Popup - Click Handlers and Keyboard Navigation
document.addEventListener("DOMContentLoaded", () => {
    // Close button click handler
    const closeBtn = document.querySelector('.info-close-button');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeInfoOverlay);
    }
    
    // Prev/Next button click handlers
    const prevBtn = document.querySelector('.info-prev');
    const nextBtn = document.querySelector('.info-next');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            const infoKeys = Object.keys(infoData);
            const currentTarget = document.querySelector("#info-content-target h1");
            if (currentTarget) {
                const currentTitle = currentTarget.textContent;
                let currentIndex = -1;
                for (let i = 0; i < infoKeys.length; i++) {
                    if (infoData[infoKeys[i]].title === currentTitle) {
                        currentIndex = i;
                        break;
                    }
                }
                if (currentIndex > 0) {
                    openInfoPopup(infoKeys[currentIndex - 1]);
                } else {
                    openInfoPopup(infoKeys[infoKeys.length - 1]);
                }
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const infoKeys = Object.keys(infoData);
            const currentTarget = document.querySelector("#info-content-target h1");
            if (currentTarget) {
                const currentTitle = currentTarget.textContent;
                let currentIndex = -1;
                for (let i = 0; i < infoKeys.length; i++) {
                    if (infoData[infoKeys[i]].title === currentTitle) {
                        currentIndex = i;
                        break;
                    }
                }
                if (currentIndex < infoKeys.length - 1) {
                    openInfoPopup(infoKeys[currentIndex + 1]);
                } else {
                    openInfoPopup(infoKeys[0]);
                }
            }
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        const overlay = document.getElementById('info-overlay');
        if (!overlay.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeInfoOverlay();
        }
        if (e.key === 'ArrowLeft') {
            document.querySelector('.info-prev')?.click();
        }
        if (e.key === 'ArrowRight') {
            document.querySelector('.info-next')?.click();
        }
    });
    
    // Click on overlay background to close
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeInfoOverlay();
        }
    });
});
