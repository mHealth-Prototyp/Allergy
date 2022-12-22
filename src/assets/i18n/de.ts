export default {
  common: {
    male: 'männlich',
    female: 'weiblich',
    other: 'anderes',
    unknown: 'unbekannt',
    cancel: 'Abbrechen',
    close: 'Schliessen',
    copy: 'Kopieren',
    save: 'Speichern',
    error: 'Ups. Da ist leider etwas schiefgegangen.',
    gender: 'Geschlecht',
    address: 'Adresse',
    birthdate: 'Geburtsdatum',
    allergy: 'Allergie',
    intolerance: 'Intoleranz',
    date: 'Datum',
    remove: 'entfernen',
    type: 'Typ',
    language: 'Sprache',
    typeForSearch: 'Tippen um zu suchen',
    month0: 'Januar',
    month1: 'Februar',
    month2: 'März',
    month3: 'April',
    month4: 'Mai',
    month5: 'Juni',
    month6: 'Juli',
    month7: 'August',
    month8: 'September',
    month9: 'Oktober',
    month10: 'November',
    month11: 'Dezember'
  },
  index: {
    diaryTitle: 'Tagebuch',
    diaryText: 'Hier finden Sie alle Tagebucheinträge, die Sie bisher erfasst haben.',
    loginError: 'Es konnten keine passenden Daten für dieses Login / Passwort auf dem EPD Playground gefunden werden.',
    title: 'Dashboard'
  },
  about: {
    title: 'Über den mHealth Prototypen (Allergie-Szenario)',
    aboutText:
      'Der mHealth Prototyp (Allergie-Szenario) entstand im Rahmen eines Projektes von eHealth Suisse und dem Institut für Medizininformatik I4MI der Berner Fachhochschule. Er soll als Demonstrator für einen patientenzentrierte Allergie-Use Case mit dem EPD Playground dienen.',
    readMore:
      'Unter den folgenden Links erfahren Sie mehr zu den Projektpartnern, zum elektronischen Patientendossier und zum EPD Playground:',
    version: 'Version:'
  },
  calendar: {
    title: 'Allergie-Kalender',
    entriesLabel: 'Einträge',
    entryLabel: 'Eintrag',
    entriesFrom: 'Einträge vom',
    entryTimeLabel1: 'Eintrag um ',
    entryTimeLabel2: ' Uhr'
  },
  documents: {
    title: 'Ihre Gesundheits-Dokumente',
    openPrompt1: 'Möchten Sie das Dokument "',
    openPrompt2: '" wirklich laden?',
    unknownTitle: 'unbenanntes Dokument',
    documentViewTitle: 'FHIR-Dokumentenanzeiger'
  },
  layout: {
    title: 'Mein EPD',
    subtitle: '(mHealth Prototyp)',
    logoutPrompt: 'Möchten Sie sich wirklich ausloggen?',
    menu: {
      title: 'Menü',
      home: 'Dashboard',
      documents: 'Ihre Dokumente im EPD',
      upload: 'Dokument ins EPD speichern',
      allergies: 'Ihre Allergien',
      settings: 'Einstellungen',
      about: 'Über den mHealth Prototyp'
    }
  },
  allergy: {
    title: 'Meine Allergien',
    tabKnown: 'Bestätigte Allergien',
    tabKnownShort: 'Bestätigt',
    tabSuspected: 'Vermutete Allerien',
    tabSuspectedShort: 'Vermutet',
    suspectedSubtitle: 'Vermutete Allergie oder Intoleranz',
    noEntries: 'Es sind keine Allergien oder Intoleranzen vorhanden.'
  },
  diary: {
    title: 'Tagebucheintrag vom',
    createTitle: 'Neuer Tagebucheintrag',
    dateLabel: 'Datum',
    noteLabel: 'Anmerkungen',
    noteHint: 'Hier können Sie zusätzliche Bemerkungen zum Tagebuch-Eintrag erfassen.',
    symptomsLabel: 'Symptome',
    symptomsHint: 'Erfassen Sie Ihre Symptome zum Tagebuch-Eintrag.',
    allergyLabel: 'Allergie',
    allergyHint:
      'Wenn Sie vermuten, dass die Symptome mit einer Ihrer Allergien oder Intoleranzen zusammenhängen, können Sie das hier erfassen.',
    noSymptoms: 'Keine Symptome erfasst',
    intensity: 'Intensität:',
    newSymptom: 'Neues Symptom:',
    editDate: 'Datum und Zeit:',
    locationAlert: 'Bitte geben Sie an, welche Stelle vom Symptom betroffen ist.',
    noData:
      'Es sind noch keine Einträge verfügbar, die angezeigt werden könnten. Erstellen Sie einen neuen Tagebuch-Eintrag, um ihn hier zu sehen.',
    medicationsLabel: 'Arzneimittel',
    medicationsHint: 'Erfassen Sie die Medikamente, die zu diesem Zeitpunkt wirkten.'
  },
  suspectedAllergies: {
    title: 'Verdachts-Allergien',
    explanation:
      'Falls Sie den Verdacht haben, an einer Allergie oder Intoleranz zu leiden, können Sie diese hier hinzufügen um sie zu beobachten.',
    button: 'Verdachtsallergien hinzufügen'
  },
  preferredMedication: {
    title: 'Regelmässige Medikamente',
    explanation: 'Fügen Sie Ihre regelmässigen Medikamente hinzu, um sie leichter zu finden.',
    button: 'Regelmässige Medikamente hinzufügen'
  },
  symptom: {
    unknown: '',
    eye: 'Auge(n)',
    nose: 'Nase',
    mouth: 'Mund',
    lung: 'Atemwege',
    skin: 'Hautreizung',
    gastro: 'Verdauungsapparat',
    '260413007': 'keine Symptome',
    '255604002': 'gering',
    '6736007': 'mittel',
    '24484000': 'hoch',
    location: 'Betroffene Stelle'
  },
  login: {
    welcome1: 'Willkommen zu Ihrem Patientendossier!',
    welcome2: 'Loggen Sie sich mit Ihrer Mailadresse ein, um Ihre Gesundheitsdaten abzurufen.',
    eid_label: 'e-Mail',
    password_label: 'Passwort',
    login_label: 'Login',
    invalid_password: 'Die eingegebene eID oder das Passwort ist ungültig.',
    enter_code1: 'Bitte geben Sie den Code ein, der an ',
    enter_code2: ' gesendet wurde.',
    resend: 'Code erneut senden',
    code_label: 'Code',
    check_label: 'Prüfen',
    invalid_code: 'Der eingegebene Code ist nicht korrekt.',
    message_title: 'SMS von EPD Playground an ',
    message_text: 'Ihr Code für den EPD Playground Use Case ist: '
  },
  settings: {
    'de-CH': 'Deutsch (Schweiz)',
    en: 'Englisch',
    'fr-CH': 'Französisch (Schweiz)',
    it: 'Italienisch',
    languageText:
      'Wählen Sie die Sprache für die EPD Playground Demo App (zurzeit nur Deutsch und Französisch verfügbar).',
    logoutText: 'Loggen Sie sich aus oder wechseln Sie den/die Benutzer•in.',
    oidsTitle: 'OID / Systemidentifier',
    oidsText:
      'Hier können Sie die OIDs der verschiedenen Code-Systeme einsehen. Die OIDs sind fest vergeben und können deshalb nicht geändert werden.',
    oidsMpi: 'OID für das System der Master Patient Index ID',
    oidsSpid: 'OID für das System der EPR SPID',
    oidsAhv: 'OID für das System der AHV-Nummern',
    oidsApp: 'OID für diese App (mHealth Prototyp)',
    dashboardText: 'Konfigurieren Sie, welche Komponenten auf dem Dashboard angezeigt werden sollen.',
    timeline: 'Zeitstrahl der Symptome',
    diaryList: 'Liste der Tagebuch-Einträge',
    newDiaryEntry: 'Eingabemaske für Tagebuch-Einträge',
    calendar: 'Kalender-Ansicht der Tagebuch-Einträge',
    allergies: 'Übersicht der bestätigten und vermuteten Allergien und Intoleranzen.',
    exportImportTitle: 'Lokale Daten',
    exportImportText:
      'Hier können Sie Ihre lokalen Daten (Tagebucheinträge, vermutete Allergien, regelmässige Medikamente und Einstellungen) speichern und laden. Zu Demonstrationszwecken können Sie auch Daten nach vordefinierten Szenarien laden.',
    export: {
      title: 'Speichern',
      backupName: 'Name des Backups',
      backup: 'Das Backup kopieren',
      copied: 'Das Backup wurde kopiert!'
    },
    import: {
      title: 'Laden',
      backup: 'Ein Backup einfügen',
      patient: 'Sie sind eingeloggt als: ',
      keepData: 'Daten behalten',
      chooseDate: 'Datum des letzten Eintrags auswählen',
      randomEntries: 'zufällige Einträge über',
      days: 'Tage',
      generateRandom: 'generieren',
      chooseScenario: 'Ein Szenario auswählen',
      or: 'oder',
      imported: 'Das Backup wurde geladen!'
    },
    pollenMap: 'Visualisierung der Pollenbelastung auf einer Karte',
    airQuality: 'Zeitstrahl der Luftverschmutzung'
  },
  e404: {
    title: '404',
    text: 'Ooops. Hier gibt es nichts zu sehen.',
    goHome: 'Zurück zum Hauptbildschirm'
  },
  timeline: {
    title: 'Ihre Timeline',
    chartTitle: 'Timeline der Symptome und Medikamente',
    xAxis: 'Datum',
    yAxis: 'Intensität des Symptoms',
    filter: 'Nach Allergie filtern',
    noShowText:
      'Ihr Bildschirm ist nicht breit genug, um Ihre Timeline anzuzeigen. Versuchen Sie es im Querformat oder wechseln Sie den Bildschirm.',
    date: 'Datum',
    noGraph: 'Es wurde keine Tagebucheinträge gefunden.',
    taken: 'genommen',
    notTaken: 'nicht genommen'
  },
  dashboardFAB: {
    title: 'Dashboardeinstellungen',
    entriesText: 'Einträge zum Anzeigen:',
    allEntries: 'alle Einträge',
    last30days: 'letzte 30 Tage',
    last7days: 'letzte 7 Tage',
    componentsText: 'Komponenten zum Anzeigen:',
    stationText: 'Messstation für Pollen und Schadstoffe:',
    pollenText: 'Pollen zum Anzeigen:'
  },
  pollen: {
    title: 'Pollenkarte',
    current_forecast: 'Aktuelle Prognose in ',
    no_measurement: 'Keine Messung, Station temporär ausser Betrieb',
    measurement_0: 'Keine Belastung',
    measurement_1: 'Schwache Belastung',
    measurement_2: 'Mässige Belastung',
    measurement_3: 'Starke Belastung',
    measurement_4: 'Sehr Starke Belastung',
    more_information: 'Weitere Informationen auf pollenundallergie.ch',
    unit: 'Partikel / m³',
    noStation: 'Keine Messstation ausgewählt.',
    noPollen: 'Keine Pollenart ausgewählt.',
    noBoth: 'Keine Messstation und Pollenart ausgewählt.'
  },
  airQuality: {
    title: 'Luftverschmutzung',
    in: 'in',
    rainfall: 'Niederschläge',
    pollen: 'Pollen',
    pm10: 'PM10',
    ozone: 'Ozon',
    o3: 'O₃',
    mm: 'mm',
    ppm: 'ppm',
    ugm3: 'μg/m³',
    dailyLimitValue: 'täglicher Expositionsgrenzwert',
    noShowText:
      'Ihr Bildschirm ist nicht breit genug, um die Luftverschmutzung Timeline anzuzeigen. Versuchen Sie es im Querformat oder wechseln Sie den Bildschirm.',
    noStation: 'Keine Messstation ausgewählt.'
  },
  fhirPatient: {
    resourceType: 'PatientIn',
    name: 'Name'
  },
  fhirComposition: {
    status: 'Status',
    compositionStatus: {
      preliminary: 'vorläufig',
      final: 'final',
      amended: 'berichtigt',
      'entered-in-error': 'im Irrtum'
    },
    subject: 'Subjekt'
  },
  fhirAllergyIntolerance: {
    clinicalStatus: 'Klinischer Status',
    allergyIntoleranceClinicalStatus: {
      active: 'aktiv',
      inactive: 'inaktiv',
      resolved: 'aufgelöst'
    },
    verificationStatus: 'Verifizierung Status',
    allergyIntoleranceVerificationStatus: {
      unconfirmed: 'unbestätigt',
      confirmed: 'bestätigt',
      refuted: 'widerlegt',
      'entered-in-error': 'im Irrtum'
    },
    type: 'Typ',
    allergyIntoleranceType: {
      allergy: 'Allergie',
      intolerance: 'Intoleranz'
    },
    criticality: 'Kritikalität',
    allergyIntoleranceCriticality: {
      low: 'niedrig',
      high: 'hoch',
      'unable-to-assess': 'nicht bewertbar'
    },
    category: 'Kategorie',
    allergyIntoleranceCategory: {
      food: 'Nahrung',
      medication: 'Medikament',
      environment: 'Umwelt',
      biologic: 'biologisch'
    },
    code: 'Code',
    reactions: 'Reaktionen',
    substance: 'Substanz',
    manifestation: 'Manifestation',
    severity: 'Schweregrad',
    exposureRoute: 'Expositionsverlauf'
  },
  export: {
    title: 'Tagebuch ins EPD exportieren',
    text: 'Zeitraum für den Export auswählen',
    export: 'exportieren',
    compositionTitle: 'Allergie- und Intoleranztagebuch vom',
    to: 'bis',
    knownAllergies: 'Bekannte Allergien und Intoleranzen',
    suspectedAllergies: 'Vermutete Allergien und Intoleranzen',
    diaryEntries: 'Tagebucheinträge',
    airQualityData: 'Luftqualitätsdaten',
    dataAbsentReasonLabel: 'Grund der fehlenden Anmerkung',
    'asked-declined': 'gefragt, aber abgelehnt',
    concernedAllergy: 'Betroffene Allergie oder Intoleranz',
    filename: 'Titel der Datei',
    description: 'Beschreibung der Datei',
    medicationTaken: 'Eingenommene Medikamente',
    station: 'Messstation',
    short: 'Stationskürzel',
    lngLat: 'Längen- / Breitengrad'
  }
};
