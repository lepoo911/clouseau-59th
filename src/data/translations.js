export const TRANSLATIONS = {
  en: {
    header: {
      badge: "Special Birthday Case File • Sûreté Nationale",
      golfBadge: "VIP Golfers • 19th Hole",
      golfTooltip: "Claire & Erhard: Avid Golfers & VIP Detectives",
      title: "lepoo's 59",
      forClaireErhard: "EB & Claire",
      soundOn: "Sound: ON",
      soundOff: "Sound: OFF",
      langToggle: "English",
      langCode: "EN",
      restart: "Restart",
      authorSiteTitle: "Stefan Buchholz's Website"
    },
    cards: {
      dossier: "DOSSIER",
      selectBtn: "Select This Location",
      selectedBtn: "✓ Our Official Choice!",
      mapLink: "Map",
      viewMap: "View on Google Maps",
      locations: [
        {
          id: 'home',
          number: '01',
          title: 'Chez Jacques (38 Saratoga)',
          image: 'assets/dogs_disney_group.jpg',
          dogAvatars: [
            { name: 'Enzo', image: 'assets/dog_enzo_disney.jpg' },
            { name: 'Mariah', image: 'assets/dog_mariah_disney.jpg' },
            { name: 'Doodle', image: 'assets/dog_doodle_disney.jpg' }
          ],
          tagline: 'Secret HQ • 19th Hole Debrief & Canine Squad',
          address: '38 Saratoga, Gatineau, Quebec',
          googleMapsQuery: '38+Saratoga,+Gatineau,+QC',
          description: 'A warm reception at home. Patio recap of your best shots, freshly brewed specialty coffee, treats, and close canine surveillance by the pack.',
          clouseauQuote: '« Does your dog bite? No... but Lieutenant Doodle loves retrieving golf balls in the bushes! »',
          highlights: [
            'Fresh high-grade coffee & 19th hole debrief',
            'Guaranteed cuddles with Doodle, Enzo & Mariah',
            'Zero water hazards (except the dog bowl) & total comfort',
            'Relaxed family clubhouse ambiance'
          ],
          tags: [
            { emoji: '⛳', label: '19th Hole Debrief' },
            { emoji: '🐾', label: 'Canine Ball Retrievers' },
            { emoji: '☕', label: 'Home Roast Coffee' }
          ],
          badgeText: '19th Hole & Dogs'
        },
        {
          id: 'marina',
          number: '02',
          title: 'The Aylmer Marina',
          image: 'assets/venue_marina.jpg',
          tagline: 'Waterfront Rendezvous • The 19th Hole Terrace / L\'Éphémère',
          address: '1 Rue Principale, Aylmer Marina, Gatineau, QC',
          googleMapsQuery: 'Marina+d\'Aylmer,+1+Rue+Principale,+Gatineau,+QC',
          description: 'A splendid riverside setting on the Ottawa River. Perfect breezes to calculate wind drift on your drive, scenic patio drinks, and zero sand traps.',
          clouseauQuote: '« A discreet stakeout by the Ottawa River! Watch out for that water hazard, Cato! »',
          highlights: [
            'Splendid water views (the finest water hazard in town)',
            'Pleasant breezy terrace for coffee, lunch or drinks',
            'Relaxing stroll through Parc des Cèdres',
            'Summer vacation vibe 5 minutes from Aylmer courses'
          ],
          tags: [
            { emoji: '🌊', label: 'Scenic Water Hazard' },
            { emoji: '⛳', label: '19th Hole Terrace' },
            { emoji: '⛵', label: 'River Breeze Drive' }
          ],
          badgeText: 'Scenic 19th Hole'
        },
        {
          id: 'portages',
          number: '03',
          title: 'Café 3 Portages',
          image: 'assets/venue_cafe.jpg',
          tagline: 'Aylmer Golf Strip • Gourmet Coffee & Pastries',
          address: '375 Chem. d\'Aylmer, Gatineau, QC J9H 1A5',
          googleMapsQuery: 'Café+3+Portages,+375+Chem.+d\'Aylmer,+Gatineau,+QC+J9H+1A5',
          description: 'The beloved neighborhood coffee sanctuary directly on Chemin d\'Aylmer, along the historic Aylmer golf corridor (Champlain & Rivermead). Perfect pre-round fuel or birdie celebration.',
          clouseauQuote: '« An artisan espresso right on the golf strip to sharpen your swing and stimulate the gray cells! »',
          highlights: [
            'Strategic stop on Chemin d\'Aylmer (the golf corridor)',
            'Fresh morning croissants to celebrate that birdie',
            'Warm, intimate neighborhood atmosphere',
            '5-star coffee rating from discerning local golfers'
          ],
          tags: [
            { emoji: '⛳', label: 'Aylmer Golf Strip' },
            { emoji: '☕', label: 'Pre-Round Fuel' },
            { emoji: '🥐', label: 'Birdie Pastries' }
          ],
          badgeText: 'Golfer\'s Gourmet Fuel'
        }
      ]
    },
    timePicker: {
      title: "2. Choose your arrival time (between 4:00 PM and 6:00 PM):"
    },
    decision: {
      waiting: "Awaiting your official verdict... Please choose a location & arrival time!",
      caseSolved: "OFFICIAL DISPATCH • AFFAIRE CLASSÉE !",
      letter: {
        toLabel: "TO :",
        toName: "Chief Inspector Jacques Clouseau",
        fromLabel: "FROM :",
        fromName: "Claire & Erhard (EB) ⛳",
        subjectLabel: "RE :",
        subject: "Official 19th Hole Verdict • 59th Birthday Mission",
        postmark: "SÛRETÉ NATIONALE • GATINEAU QC",
        salutation: "Dear Jacques,",
        opening: "After calculating the wind drift and sinking a solid gold putt on the greens, our official scorecard is in! For your 59th birthday celebration, we hereby confirm our arrival at:",
        teeTimeLabel: "Tee-Off / Arrival :",
        punchlines: {
          home: "We are heading straight to clubhouse headquarters for the 19th-hole debrief, freshly brewed gold-standard coffee, and cuddles with Lieutenant Doodle, Enzo & Mariah. Zero water hazards guaranteed!",
          marina: "We are dropping anchor on the waterfront terrace for refreshing river breezes and a golden sunset toast — safely clear of all sand traps and fairway slices!",
          portages: "We are refueling right on the historic Aylmer golf strip with artisan gold-roast espresso and fresh croissants worthy of a championship birdie celebration!",
          default: "Ready our table at the 19th hole — no mulligans allowed!"
        },
        closingRule: "Save our table at the clubhouse — no mulligans allowed on your 59th!",
        signoff: "Yours on the greens & in mystery,",
        signature: "EB & Claire ⛳🏌️‍♂️",
        stampBadge: "VERDICT CONFIRMED • 19TH HOLE",
        smsBtn: "Send to lePoo",
        copyBtn: "Copy letter",
        copiedBtn: "Letter copied!",
        confettiBtn: "Fire Confetti! 🎉",
        changeBtn: "I change my mind!"
      },
      smsMessage: (title, _address, time) =>
        `Dear Jacques! Official 19th-hole verdict for your 59th birthday: We have locked in ${title} at ${time}! Ready our table at the clubhouse, no mulligans allowed! - EB & Claire ⛳`
    },
    footer: {
      createdBy: "Made with love for Erhard & Claire • Jacques' Birthday"
    }
  },
  fr: {
    header: {
      badge: "Affaire Spéciale Anniversaire • Sûreté Nationale",
      golfBadge: "Golfeurs VIP • 19e Trou",
      golfTooltip: "Claire & Erhard : Golfeurs d'élite & Enquêteurs VIP",
      title: "lepoo's 59",
      forClaireErhard: "EB & Claire",
      soundOn: "Son: ON",
      soundOff: "Son: OFF",
      langToggle: "Français",
      langCode: "FR",
      restart: "Restart",
      authorSiteTitle: "Site web de Stefan Buchholz"
    },
    cards: {
      dossier: "DOSSIER",
      selectBtn: "Choisir cet endroit",
      selectedBtn: "✓ C'est notre choix !",
      mapLink: "Carte",
      viewMap: "Voir sur Google Maps",
      locations: [
        {
          id: 'home',
          number: '01',
          title: 'Chez Jacques (38 Saratoga)',
          image: 'assets/dogs_disney_group.jpg',
          dogAvatars: [
            { name: 'Enzo', image: 'assets/dog_enzo_disney.jpg' },
            { name: 'Mariah', image: 'assets/dog_mariah_disney.jpg' },
            { name: 'Doodle', image: 'assets/dog_doodle_disney.jpg' }
          ],
          tagline: 'Le Quartier Général • Débriefing du 19e Trou & Chiens',
          address: '38 Saratoga, Gatineau, Québec',
          googleMapsQuery: '38+Saratoga,+Gatineau,+QC',
          description: 'Une réception chaleureuse et sans prétention à la maison. Analyse de vos plus beaux coups sur le patio, café fraîchement moulu, gâteries et surveillance rapprochée par l\'escouade canine.',
          clouseauQuote: '« Does your dog bite? Non... mais Lieutenant Doodle adore chercher les balles Titleist égarées dans les buissons ! »',
          highlights: [
            'Café de haute qualité et débriefing du 19e trou',
            'Câlins garantis avec Doodle, Enzo & Mariah',
            'Zéro obstacle d\'eau (sauf le bol des chiens) et confort total',
            'Ambiance club-house familiale et décontractée'
          ],
          tags: [
            { emoji: '⛳', label: 'Débriefing 19e Trou' },
            { emoji: '🐾', label: 'Escouade Ramasseuse de Balles' },
            { emoji: '☕', label: 'Café Maison' }
          ],
          badgeText: 'Option 19e Trou & Chiens'
        },
        {
          id: 'marina',
          number: '02',
          title: 'La Marina d\'Aylmer',
          image: 'assets/venue_marina.jpg',
          tagline: 'Le Rendez-vous Maritime • Terrasse 19e Trou / L\'Éphémère',
          address: '1 Rue Principale, Marina d\'Aylmer, Gatineau, QC',
          googleMapsQuery: 'Marina+d\'Aylmer,+1+Rue+Principale,+Gatineau,+QC',
          description: 'Un décor riverain magnifique au bord de la rivière des Outaouais. Brise idéale pour calculer l\'effet du vent sur votre drive, terrasse au soleil et aucun obstacle de sable.',
          clouseauQuote: '« Une filature discrète au bord de l\'eau! Attention à ne pas envoyer votre drive dans l\'Outaouais avec un slice suspect ! »',
          highlights: [
            'Vue splendide sur l\'eau (le plus bel obstacle d\'eau de la région)',
            'Terrasse extérieure agréable pour un café, lunch ou verre',
            'Promenade relaxante dans le parc des Cèdres',
            'Ambiance vacances à deux pas des parcours d\'Aylmer'
          ],
          tags: [
            { emoji: '🌊', label: 'Plus Bel Obstacle d\'Eau' },
            { emoji: '⛳', label: 'Terrasse 19e Trou' },
            { emoji: '⛵', label: 'Brise pour le Drive' }
          ],
          badgeText: 'Option 19e Trou Riverain'
        },
        {
          id: 'portages',
          number: '03',
          title: 'Café 3 Portages',
          image: 'assets/venue_cafe.jpg',
          tagline: 'Axe des Clubs de Golf d\'Aylmer • Café & Pâtisseries Gourmandes',
          address: '375 Chem. d\'Aylmer, Gatineau, QC J9H 1A5',
          googleMapsQuery: 'Café+3+Portages,+375+Chem.+d\'Aylmer,+Gatineau,+QC+J9H+1A5',
          description: 'Le joyau chaleureux du chemin d\'Aylmer, situé sur le corridor des grands clubs de golf (Champlain & Rivermead). Halte idéale avant votre ronde ou pour célébrer un birdie.',
          clouseauQuote: '« Un espresso artisanal sur le chemin d\'Aylmer pour affûter la trajectoire de votre swing et stimuler les cellules grises ! »',
          highlights: [
            'Halte stratégique sur le chemin d\'Aylmer (l\'axe des golfeurs)',
            'Viennoiseries fraîches du jour pour célébrer un birdie',
            'Atmosphère chaleureuse de café de quartier',
            'Évaluation 5 étoiles des connaisseurs locaux'
          ],
          tags: [
            { emoji: '⛳', label: 'Corridor des Golfs d\'Aylmer' },
            { emoji: '☕', label: 'Espresso d\'Avant-Ronde' },
            { emoji: '🥐', label: 'Pâtisseries Birdie' }
          ],
          badgeText: 'Option Ravitaillement du Golfeur'
        }
      ]
    },
    timePicker: {
      title: "2. Choisissez l'heure d'arrivée (entre 16h00 et 18h00) :"
    },
    decision: {
      waiting: "En attente de votre verdict... Veuillez choisir un endroit et une heure !",
      caseSolved: "DÉPÊCHE OFFICIELLE • AFFAIRE CLASSÉE !",
      letter: {
        toLabel: "À :",
        toName: "Inspecteur Principal Jacques Clouseau",
        fromLabel: "DE :",
        fromName: "Claire & Erhard (EB) ⛳",
        subjectLabel: "OBJET :",
        subject: "Verdict officiel du 19e trou • Mission Anniversaire 59 ans",
        postmark: "SÛRETÉ NATIONALE • GATINEAU QC",
        salutation: "Cher Jacques,",
        opening: "Après avoir calculé l'effet du vent et réussi un roulé d'or parfait sur le vert, notre carte de pointage officielle est validée ! Pour célébrer ton 59e anniversaire, nous confirmons notre arrivée à :",
        teeTimeLabel: "Départ / Heure d'arrivée :",
        punchlines: {
          home: "Nous mettons le cap direct sur le quartier général du club-house pour le débriefing du 19e trou, un café d'or fraîchement moulu et des câlins avec l'escouade canine Doodle, Enzo et Mariah. Zéro obstacle d'eau garanti !",
          marina: "Nous jetons l'ancre sur la terrasse au bord de la rivière pour la brise estivale et trinquer au coucher de soleil doré — loin des fosses de sable et des crochets sur l'allée !",
          portages: "Nous faisons le plein d'énergie sur l'axe historique des clubs de golf d'Aylmer avec un espresso d'or artisanal et des viennoiseries dignes d'un birdie de championnat !",
          default: "Prépare notre table au club-house — aucun mulligan accordé pour tes 59 ans !"
        },
        closingRule: "Prépare le club-house — aucun coup de reprise (mulligan) accordé !",
        signoff: "Affectueusement sur le vert et dans l'enquête,",
        signature: "EB & Claire ⛳🏌️‍♂️",
        stampBadge: "VERDICT OFFICIEL • 19e TROU",
        smsBtn: "Envoyer à lePoo",
        copyBtn: "Copier la lettre",
        copiedBtn: "Lettre copiée !",
        confettiBtn: "Tirer des confettis ! 🎉",
        changeBtn: "Je change d'avis !"
      },
      smsMessage: (title, address, time) =>
        `Cher Jacques! Verdict officiel du 19e trou pour ton 59e anniversaire: Nous avons choisi ${title} (${address}) à ${time}! Réserve notre table au club-house, aucun mulligan accordé! - EB & Claire ⛳`
    },
    footer: {
      createdBy: "Fait avec amour pour Erhard & Claire • Anniversaire de Jacques"
    }
  },
  de: {
    header: {
      badge: "Sonderakte Geburtstag • Sûreté Nationale",
      golfBadge: "VIP-Golfer • 19. Loch",
      golfTooltip: "Claire & Erhard: Elite-Golfer & VIP-Ermittler",
      title: "lepoo's 59",
      forClaireErhard: "EB & Claire",
      soundOn: "Ton: AN",
      soundOff: "Ton: AUS",
      langToggle: "Deutsch",
      langCode: "DE",
      restart: "Restart",
      authorSiteTitle: "Stefan Buchholz' Webseite"
    },
    cards: {
      dossier: "AKTE",
      selectBtn: "Diesen Ort wählen",
      selectedBtn: "✓ Unsere offizielle Wahl!",
      mapLink: "Karte",
      viewMap: "Auf Google Maps ansehen",
      locations: [
        {
          id: 'home',
          number: '01',
          title: 'Chez Jacques (38 Saratoga)',
          image: 'assets/dogs_disney_group.jpg',
          tagline: 'Das Geheimquartier • 19. Loch & Hunde-Eskorte',
          address: '38 Saratoga, Gatineau, Québec',
          googleMapsQuery: '38+Saratoga,+Gatineau,+QC',
          description: 'Ein herzlicher, gemütlicher Empfang zu Hause. Analyse Ihrer besten Golfschläge auf der Terrasse, frisch gemahlener Spitzenkaffee, Leckereien und lückenlose Überwachung durch das Hunde-Rudel.',
          clouseauQuote: '« Beißt Ihr Hund? Nein... aber Leutnant Doodle apportiert mit Begeisterung im Gebüsch verlorene Bälle! »',
          highlights: [
            'Frisch gemahlener Spitzenkaffee & Besprechung des 19. Lochs',
            'Garantiertes Kuscheln mit Doodle, Enzo & Mariah',
            'Keine Wasserhindernisse (außer dem Wassernapf) & absoluter Komfort',
            'Entspannte Clubhaus-Atmosphäre im Kreise der Familie'
          ],
          tags: [
            { emoji: '⛳', label: '19. Loch Besprechung' },
            { emoji: '🐾', label: 'Hunde-Balljäger' },
            { emoji: '☕', label: 'Hausröstung Kaffee' }
          ],
          badgeText: 'Option 19. Loch & Hunde'
        },
        {
          id: 'marina',
          number: '02',
          title: 'Die Aylmer Marina',
          image: 'assets/venue_marina.jpg',
          tagline: 'Rendezvous am Wasser • Terrasse am 19. Loch / L\'Éphémère',
          address: '1 Rue Principale, Marina d\'Aylmer, Gatineau, QC',
          googleMapsQuery: 'Marina+d\'Aylmer,+1+Rue+Principale,+Gatineau,+QC',
          description: 'Herrliche Kulisse direkt am Ufer des Ottawa-Flusses. Perfekte Brise, um den Windeinfluss auf den Abschlag zu berechnen, sonnige Terrasse und keine Sandbunker.',
          clouseauQuote: '« Eine unauffällige Observierung am Flussufer! Passen Sie auf, dass Ihr Abschlag nicht mit einem verdächtigen Slice im Fluss landet, Cato! »',
          highlights: [
            'Herrlicher Blick aufs Wasser (das schönste Wasserhindernis der Region)',
            'Angenehme Terrasse für Kaffee, Mittagessen oder einen Drink',
            'Entspannter Spaziergang im Parc des Cèdres',
            'Urlaubsstimmung nur 5 Minuten von den Aylmer-Golfplätzen entfernt'
          ],
          tags: [
            { emoji: '🌊', label: 'Schönstes Wasserhindernis' },
            { emoji: '⛳', label: 'Terrasse 19. Loch' },
            { emoji: '⛵', label: 'Flussbrise-Abschlag' }
          ],
          badgeText: 'Option Uferterrasse'
        },
        {
          id: 'portages',
          number: '03',
          title: 'Café 3 Portages',
          image: 'assets/venue_cafe.jpg',
          tagline: 'Aylmers Golf-Meile • Feinschmecker-Kaffee & Gebäck',
          address: '375 Chem. d\'Aylmer, Gatineau, QC J9H 1A5',
          googleMapsQuery: 'Café+3+Portages,+375+Chem.+d\'Aylmer,+Gatineau,+QC+J9H+1A5',
          description: 'Die beliebte Kaffeestube direkt am Chemin d\'Aylmer, entlang des traditionsreichen Golf-Korridors (Champlain & Rivermead). Perfekt vor der Runde oder um ein Birdie zu feiern.',
          clouseauQuote: '« Ein handwerklicher Espresso direkt an der Golfmeile, um den Schwung zu schärfen und die grauen Zellen anzuregen! »',
          highlights: [
            'Strategischer Zwischenstopp am Chemin d\'Aylmer (der Golfer-Achse)',
            'Frische Croissants des Tages, um ein Birdie zu feiern',
            'Warme, vertraute Nachbarschaftsatmosphäre',
            '5-Sterne-Bewertung von anspruchsvollen Kaffeekennern'
          ],
          tags: [
            { emoji: '⛳', label: 'Aylmer Golf-Meile' },
            { emoji: '☕', label: 'Kaffee vor der Runde' },
            { emoji: '🥐', label: 'Birdie-Gebäck' }
          ],
          badgeText: 'Option Feinschmecker-Kaffee'
        }
      ]
    },
    timePicker: {
      title: "2. Wählen Sie die Ankunftszeit (zwischen 16:00 und 18:00 Uhr) :"
    },
    decision: {
      waiting: "Warten auf Ihr offizielles Urteil... Bitte wählen Sie Ort & Zeit!",
      caseSolved: "OFFIZIELLE DEPESCHE • AFFAIRE CLASSÉE !",
      letter: {
        toLabel: "AN :",
        toName: "Chefinspektor Jacques Clouseau",
        fromLabel: "VON :",
        fromName: "Claire & Erhard (EB) ⛳",
        subjectLabel: "BETREFF :",
        subject: "Offizieller Bericht vom 19. Loch • Geburtstagsfall #59",
        postmark: "SÛRETÉ NATIONALE • GATINEAU QC",
        salutation: "Lieber Jacques,",
        opening: "Nach genauer Windberechnung und einem goldenen Putt auf dem Green steht unsere offizielle Scorecard fest! Zu deinem 59. Geburtstag treffen wir pünktlich ein bei:",
        teeTimeLabel: "Abschlag / Ankunft :",
        punchlines: {
          home: "Wir steuern geradewegs das Clubhaus-Hauptquartier an: für das Debriefing am 19. Loch, frisch gemahlenen Spitzenkaffee und die Hunde-Caddies Doodle, Enzo & Mariah. Absolute Hindernisfreiheit garantiert!",
          marina: "Wir werfen den Anker an der Uferterrasse für erfrischende Flussbrisen und einen goldenen Toast bei Sonnenuntergang — sicher vorbei an allen Sandbunkern und Wasserhindernissen!",
          portages: "Wir tanken direkt an der traditionsreichen Aylmer Golf-Meile auf: mit handwerklichem Espresso und ofenfrischen Croissants, wie sie einem meisterhaften Birdie gebühren!",
          default: "Halte unseren Tisch am 19. Loch bereit — keine Mulligans zu deinem 59. Geburtstag!"
        },
        closingRule: "Halte unseren Tisch am Clubhaus bereit — keine Mulligans erlaubt!",
        signoff: "Herzlichst auf dem Green und in alter Frische,",
        signature: "EB & Claire ⛳🏌️‍♂️",
        stampBadge: "OFFIZIELLES URTEIL • 19. LOCH",
        smsBtn: "An lePoo senden",
        copyBtn: "Brieftext kopieren",
        copiedBtn: "Brieftext kopiert!",
        confettiBtn: "Nochmal Konfetti! 🎉",
        changeBtn: "Ich ändere meine Meinung!"
      },
      smsMessage: (title, _address, time) =>
        `Lieber Jacques! Offizielles Urteil vom 19. Loch zu deinem 59. Geburtstag: Wir haben gewählt: ${title} um ${time}! Halte unseren Tisch am Clubhaus bereit, keine Mulligans! - EB & Claire ⛳`
    },
    footer: {
      createdBy: "Mit Liebe gemacht für Erhard & Claire • Jacques’ Geburtstag"
    }
  }
};
