import {DiaryEntry, SymptomIntensity} from 'src/model/interfaces';
import {MEDICATIONS} from './medications';

export function getEntryTemplate(lang: 'de' | 'fr'): Partial<DiaryEntry> {
  if (Math.random() > 0.3) return EMPTY_ENTRY;
  const i = Math.floor(Math.random() * ENTRY_TEMPLATES[lang].length);
  return ENTRY_TEMPLATES[lang][i];
}
export const EMPTY_ENTRY: Partial<DiaryEntry> = {
  date: undefined,
  symptoms: undefined,
  note: '',
  allergy: undefined,
  medications: []
};
export const ENTRY_TEMPLATES: {de: Partial<DiaryEntry>[]; fr: Partial<DiaryEntry>[]} = {
  de: [
    {
      date: undefined,
      symptoms: undefined,
      note: 'Ein Antihistaminikum genommen.',
      allergy: undefined,
      medications: [MEDICATIONS[0]]
    },
    {
      date: undefined,
      symptoms: [],
      note: 'Das Allergie-Medikament scheint heute gut zu wirken.',
      allergy: undefined,
      medications: [MEDICATIONS[0]]
    },
    {
      date: undefined,
      symptoms: undefined,
      note: 'Heute war ich den ganzen Tag zuhause.',
      allergy: undefined,
      medications: []
    },
    {
      date: undefined,
      symptoms: undefined,
      note: 'Homeoffice',
      allergy: undefined,
      medications: []
    },
    {
      date: undefined,
      symptoms: undefined,
      note: 'Mit meiner Schwester am See spazieren gegangen.',
      allergy: undefined,
      medications: []
    },
    {
      date: undefined,
      symptoms: undefined,
      note: 'Gestern Geschäftsessen',
      allergy: undefined,
      medications: []
    },
    {
      date: undefined,
      symptoms: undefined,
      note: 'Gestern Geschäftsessen',
      allergy: undefined,
      medications: []
    },
    {
      date: undefined,
      symptoms: [],
      note: 'Heute hatte ich gar keine Symptome. 🙂',
      allergy: undefined,
      medications: []
    },
    {
      date: undefined,
      symptoms: [],
      note: 'Komplett symptomfrei!',
      allergy: undefined,
      medications: []
    },
    {
      date: undefined,
      symptoms: [
        {
          intensity: SymptomIntensity.HIGH,
          location: {
            name: 'nose',
            sct: '45206002',
            image: 'nose.json',
            defaultCoding: {
              system: 'http://snomed.info/sct',
              code: '45206002',
              display: 'Nose'
            }
          }
        }
      ],
      note: 'Heute sehr stark laufende Nase.',
      allergy: undefined,
      medications: []
    }
  ],
  fr: [
    {
      date: undefined,
      symptoms: undefined,
      note: 'Jai pris un antihistaminique.',
      allergy: undefined,
      medications: [MEDICATIONS[0]]
    },
    {
      date: undefined,
      symptoms: [],
      note: "Le médicament contre les allergies semble aujourd'hui bien fonctionner.",
      allergy: undefined,
      medications: [MEDICATIONS[0]]
    },
    {
      date: undefined,
      symptoms: undefined,
      note: "Aujourd'hui, j'étais à la maison toute la journée.",
      allergy: undefined,
      medications: []
    },
    {
      date: undefined,
      symptoms: undefined,
      note: 'Homeoffice',
      allergy: undefined,
      medications: []
    },
    {
      date: undefined,
      symptoms: undefined,
      note: 'Je suis allé me promener au bord du lac avec ma sœur.',
      allergy: undefined,
      medications: []
    },
    {
      date: undefined,
      symptoms: undefined,
      note: "Gestern GeschäftsessenHier, déjeuner d'affaires",
      allergy: undefined,
      medications: []
    },
    {
      date: undefined,
      symptoms: [],
      note: "Aujourd'hui, je n'ai eu aucun symptôme. 🙂",
      allergy: undefined,
      medications: []
    },
    {
      date: undefined,
      symptoms: [],
      note: 'Complètement asymptomatique !',
      allergy: undefined,
      medications: []
    },
    {
      date: undefined,
      symptoms: [
        {
          intensity: SymptomIntensity.HIGH,
          location: {
            name: 'nose',
            sct: '45206002',
            image: 'nose.json',
            defaultCoding: {
              system: 'http://snomed.info/sct',
              code: '45206002',
              display: 'Nose'
            }
          }
        }
      ],
      note: "Aujourd'hui, très fort écoulement nasal.",
      allergy: undefined,
      medications: []
    }
  ]
};
