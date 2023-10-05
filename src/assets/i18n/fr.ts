export default {
  common: {
    male: 'masculin',
    femaler: 'féminin',
    other: 'autre',
    unknown: 'inconnu',
    cancel: 'annuler',
    close: 'fermer',
    copy: 'copier',
    save: 'enregistrer',
    error: "Oups ! Quelque chose s'est mal passé",
    gender: 'sexe',
    address: 'adresse',
    birthdate: 'date de naissance',
    allergy: 'allergie',
    intolerance: 'intolérance',
    date: 'date',
    remove: 'supprimer',
    type: 'type',
    language: 'Langue',
    typeForSearch: 'taper pour chercher',
    month0: 'janvier',
    month1: 'février',
    month2: 'mars',
    month3: 'avril',
    month4: 'mai',
    month5: 'juin',
    mois6: 'juillet',
    mois7: 'août',
    mois8: 'septembre',
    mois9: 'octobre',
    mois10: 'novembre',
    mois11: 'décembre'
  },
  index: {
    diaryTitle: 'Journal',
    diaryText: "Vous trouverez ici toutes les entrées que vous avez saisies jusqu'à présent.",
    loginError: "Aucune donnée correspondante n'a pu être trouvée pour ce login / mot de passe sur l'EPD Playground.",
    title: 'Tableau de bord'
  },
  about: {
    title: 'À propos du prototype mHealth (scénario allergies)',
    aboutText:
      "Le prototype mHealth (scénario allergies) a été créé dans le cadre d'un projet d'eHealth Suisse et de l'Institut d'informatique médicale I4MI de la Haute école spécialisée bernoise. Il doit servir de démonstrateur pour un cas d'utilisation d'allergies centré sur le patient avec le EPD Playground. Le logiciel est publié sous la licence du MIT.",
    readMore:
      "Les liens suivants vous permettront d'en savoir plus sur les partenaires du projet, sur le dossier électronique du patient et sur l'EPD Playground :",
    version: 'version:'
  },
  calendar: {
    title: 'Calendrier des allergies',
    entriesLabel: 'Entrées',
    entryLabel: 'Entrée',
    entriesFrom: 'Entrées du',
    entryTimeLabel1: 'Entrée à ',
    entryTimeLabel2: ' heures'
  },
  documents: {
    title: 'Vos documents de santé',
    openPrompt1: 'Souhaitez-vous télécharger le document "',
    openPrompt2: '" vraiment charger ?',
    unknownTitle: 'document sans nom',
    documentViewTitle: 'Visionneur de documents FHIR'
  },
  layout: {
    title: 'Mon DEP',
    subtitle: '(prototype mHealth)',
    logoutPrompt: 'Voulez-vous vraiment vous déconnecter ?',
    menu: {
      title: 'Menu',
      home: 'Tableau de bord',
      documents: 'Vos documents du DEP',
      upload: 'Enregistrer un document dans le DEP',
      allergies: 'vos allergies',
      settings: 'Paramètres',
      about: 'A propos du prototype mHealth'
    }
  },
  allergy: {
    title: 'Mes allergies',
    tabKnown: 'Allergies confirmées',
    tabKnownShort: 'Confirmées',
    tabSuspected: 'Allergies présumées',
    tabSuspectedShort: 'Présumées',
    suspectedSubtitle: 'Allergie ou intolérance présumée',
    noEntries: "Aucune allergie ou intolérance n'est présente"
  },
  diary: {
    title: 'Entrée du',
    createTitle: 'Nouvelle entrée',
    dateLabel: 'Date',
    noteLabel: 'Notes',
    noteHint: 'Vous pouvez saisir ici des remarques supplémentaires.',
    symptomsLabel: 'Symptômes',
    symptomsHint: 'Saisissez vos symptômes.',
    allergyLabel: 'Allergie',
    allergyHint:
      "Si vous pensez que les symptômes sont liés à l'une de vos allergies ou intolérances, vous pouvez le saisir ici.",
    noSymptoms: 'Aucun symptôme enregistré',
    intensity: 'Intensité:',
    newSymptom: 'Nouveau symptôme:',
    editDate: 'Date et heure:',
    locationAlert: "Veuillez indiquer l'endroit concerné par le symptôme.",
    noData:
      "Il n'y a pas encore d'entrées disponibles qui pourraient être affichées. Créez une nouvelle entrée pour la voir ici.",
    medicationsLabel: 'Médicaments',
    medicationsHint: 'Saisissez les médicaments qui agissaient à ce moment-là.'
  },
  suspectedAllergies: {
    title: 'Allergies présumée',
    explanation:
      "Si vous pensez souffrir d'une allergie ou d'une intolérance, vous pouvez l'ajouter ici pour la surveiller.",
    button: 'Ajouter des allergies présumées'
  },
  preferredMedication: {
    title: 'Médicaments usuels',
    explanation: 'Ajouter vos médicaments usuels afin de les retrouver plus facilement.',
    button: 'Ajouter des médicaments usuels'
  },
  symptom: {
    unknown: '',
    eye: 'yeux',
    nose: 'nez',
    mouth: 'bouche',
    lung: 'voies respiratoires',
    skin: 'irritation de la peau',
    gastro: 'appareil digestif',
    '260413007': 'pas de symptôme',
    '255604002': 'faible',
    '6736007': 'moyenne',
    '24484000': 'haute',
    location: 'partie concernée'
  },
  login: {
    welcome1: 'Bienvenue sur votre dossier de patient !',
    welcome2: 'Connectez-vous avec votre adresse e-mail pour consulter vos données de santé',
    eid_label: 'e-mail',
    password_label: 'mot de passe',
    login_label: 'Connexion',
    invalid_password: "L'eID ou le mot de passe saisi n'est pas valide",
    enter_code1: 'Veuillez saisir le code envoyé à ',
    enter_code2: ' a été envoyé',
    resend: 'Renvoyer le code',
    code_label: 'code',
    check_label: 'vérifier',
    invalid_code: "le code saisi n'est pas correct",
    message_title: "SMS d'EPD Playground à ",
    message_text: 'Votre code pour le use case EPD Playground est : '
  },
  settings: {
    'de-CH': 'Allemand (Suisse)',
    en: 'Anglais',
    'fr-CH': 'Français (Suisse)',
    it: 'Italien',
    languageText:
      "Choisissez la langue de l'application EPD Playground Demo (actuellement, seuls le français et l'allemand sont disponibles).",
    logoutText: "Déconnectez-vous ou changez d'utilisateur(trice)",
    oidsTitle: 'OID / identifiants systèmes',
    oidsText:
      'Ici, vous pouvez consulter les OID des différents codes-systèmes. Les OID sont attribués de manière fixe et ne peuvent donc pas être modifiés.',
    oidsMpi: 'OID pour le système du Master Patient Index ID',
    oidsSpid: "OID pour le système de l'EPR SPID",
    oidsAhv: 'OID pour le système des numéros AVS',
    oidsApp: 'OID pour cette app (prototype mHealth)',
    dashboardText: 'Configurez les composants qui doivent être affichés sur le tableau de bord.',
    timeline: 'Chronologie des symptômes',
    diaryList: 'Liste des entrées du journal',
    newDiaryEntry: 'Masque de saisie pour les entrées du journal',
    calendar: 'Calendrier des entrées du journal',
    allergies: 'Aperçu des allergies et intolérances confirmées et suspectées',
    exportImportTitle: 'Données locales',
    exportImportText:
      'Ici, vous pouvez sauvegarder vos données locales (entrées du journal, allergies présumées, médicaments usuels et réglages) et en charger. Vous pouvez également charger des données selon des scénarios prédéfinis à des fins de démonstration.',
    export: {
      title: 'Sauvegarder',
      backupName: 'Nom de la sauvegarde',
      backup: 'Copier la sauvegarde',
      copied: 'La sauvegarde a été copiée !'
    },
    import: {
      title: 'Charger',
      backup: 'Coller une sauvegarde',
      patient: 'Vous êtes connecté·e en tant que: ',
      keepData: 'Conserver les données',
      randomEntries: 'entrées aléatoires sur',
      days: 'jours',
      generateRandom: 'générer!',
      chooseDate: 'Choisir la date de la dernière entrée',
      chooseScenario: 'Choisir un scénario',
      or: 'ou',
      imported: 'La sauvegarde a été chargée !'
    },
    pollenMap: 'Visualisation de la charge en pollen sur une carte',
    airQuality: 'Chronologie de la polution atmosphérique'
  },
  e404: {
    title: '404',
    text: "Ooops. Ici il n'y a rien à voir.",
    goHome: "Retour à l'écran d'accueil"
  },
  timeline: {
    title: 'Votre timeline',
    chartTitle: 'Timeline des symptômes et médicaments',
    xAxis: 'Date',
    yAxis: 'Intensité des symptômes',
    filter: 'Filtrer selon les allergies',
    noShowText:
      "Votre écran n'est pas assez large pour afficher votre timeline. Veuillez essayer en mode paysage ou changez d'écran.",
    date: 'Date',
    noGraph: "Aucune entrée du journal n'a été trouvée.",
    taken: 'pris',
    notTaken: 'pas pris'
  },
  dashboardFAB: {
    title: 'Paramètres du tableau de bord',
    entriesText: 'Entrées à afficher:',
    allEntries: 'toutes les entrées',
    last30days: '30 derniers jours',
    last7days: '7 derniers jours',
    componentsText: 'Composants à afficher:',
    stationText: 'Station de mesure pour le pollen et les polluants:',
    pollenText: 'Pollen à afficher:'
  },
  pollen: {
    title: 'Carte du pollen',
    current_forecast: 'Prévisions actuelles à ',
    no_measurement: 'Pas de mesure, station temporairement hors service',
    measurement_0: 'Pas de charge',
    measurement_1: 'Faible charge',
    measurement_2: 'Charge modérée',
    measurement_3: 'Forte charge',
    measurement_4: 'Très forte charge',
    more_information: "Plus d'informations sur pollenundallergie.ch",
    unit: 'particule(s) / m³',
    noStation: 'Aucune station de mesure sélectionnée.',
    noPollen: 'Aucun type de pollen sélectionné.',
    noBoth: 'Aucune station de mesure et aucun type de pollen séléectionnés.'
  },
  airQuality: {
    title: 'Pollution atmosphérique',
    in: 'à',
    rainfall: 'précipitations',
    pollen: 'pollen',
    pm10: 'PM10',
    ozone: 'ozone',
    o3: 'O₃',
    mm: 'mm',
    ppm: 'ppm',
    ugm3: 'μg/m³',
    dailyLimitValue: "valeur limite d'exposition journalière",
    noStation: 'Aucune station de mesure sélectionnée.',
    noShowText:
      "Votre écran n'est pas assez large pour afficher la timeline de la pollution atmosphérique. Veuillez essayer en mode paysage ou changez d'écran."
  },
  fhirPatient: {
    resourceType: 'Patient·e',
    name: 'Nom'
  },
  fhirComposition: {
    status: 'Statut',
    compositionStatus: {
      preliminary: 'préliminaire',
      final: 'final',
      amended: 'rectifié',
      'entered-in-error': 'en erreur'
    },
    subject: 'Sujet'
  },
  fhirAllergyIntolerance: {
    clinicalStatus: 'Statut clinique',
    allergyIntoleranceClinicalStatus: {
      active: 'actif',
      inactive: 'inactif',
      resolved: 'résolu'
    },
    verificationStatus: 'Statut de vérification',
    allergyIntoleranceVerificationStatus: {
      unconfirmed: 'non confirmé',
      confirmed: 'confirmé',
      refuted: 'réfuté',
      'entered-in-error': 'en erreur'
    },
    type: 'Type',
    allergyIntoleranceType: {
      allergy: 'allrgie',
      intolerance: 'intolérance'
    },
    criticality: 'Criticalité',
    allergyIntoleranceCriticality: {
      low: 'bas',
      high: 'haut',
      'unable-to-assess': 'non mesurable'
    },
    category: 'Catégorie',
    allergyIntoleranceCategory: {
      food: 'alimentation',
      medication: 'médicament',
      environment: 'environement',
      biologic: 'biologique'
    },
    code: 'Code',
    reactions: 'Réactions',
    substance: 'Substance',
    manifestation: 'Manifestation',
    severity: 'Sévérité',
    exposureRoute: "Déroulement de l'exposition"
  },
  export: {
    title: 'Exporter le journal dans le DEP',
    text: 'Sélectionner la période à exporter',
    export: 'exporter',
    compositionTitle: 'Journal des allergies et intolérance du',
    to: 'au',
    knownAllergies: 'Allergies et intolérances connues',
    suspectedAllergies: 'Allergies et intolérances suspectées',
    diaryEntries: 'Entrées du journal',
    airQualityData: "Données sur la qualité de l'air",
    dataAbsentReasonLabel: "Origine de l'annotation manquante",
    'asked-declined': 'demandé mais décliné',
    concernedAllergy: 'Allergie ou intolérance concernée',
    filename: 'Titre du fichier',
    description: 'Description du fichier',
    medicationTaken: 'Médicaments pris',
    station: 'Station de mesure',
    short: 'Abréviation',
    lngLat: 'Longitude / Latitude'
  }
};
