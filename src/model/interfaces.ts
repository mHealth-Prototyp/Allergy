import {Organization, Coding, Medication} from '@i4mi/fhir_r4';
import {AllergySystemCodeExtension} from '@i4mi/mhealth-proto-components';
import {APP_LANGUAGES} from 'src/boot/i18n';

export interface LoginType {
  username: string;
  password: string;
  phone: string;
  prefix?: string;
  givenName: string;
  familyName: string;
}

export enum UIMessageType {
  SMS = 'sms',
  ERROR = 'error'
}

export interface UIMessage {
  type: UIMessageType;
  title: string;
  text: string;
}

export interface Settings {
  language: APP_LANGUAGES;
  organization: Organization;
  facilityType: Coding;
  practiceSetting: Coding;
  dashboard: DashboardComponent[];
  daysDisplayedOnDashboard: number;
  station: Station | undefined;
  pollen: AllergySystemCodeExtension | undefined;
}

export enum SymptomIntensity {
  NONE = '260413007', // None (Qualifier value)
  LOW = '255604002', // Mild (Qualifier value)
  MEDIUM = '6736007', // Moderate (severity modifier) (qualifier value)
  HIGH = '24484000' // Severe (severity modifier) (qualifier value)
}

export interface SymptomLocation {
  name: string;
  sct: string;
  image: string;
  defaultCoding: Coding;
}

export interface Symptom {
  intensity: SymptomIntensity;
  location: SymptomLocation;
}

// according to http://hl7.org/fhir/R4/codesystem-allergyintolerance-verification.html
export enum AllergyVerificationStatus {
  UNCONFIRMED = 'unconfirmed',
  CONFIRMED = 'confirmed',
  REFUTED = 'refuted',
  ENTERED_IN_ERROR = 'entered-in-error'
}

export interface DiaryEntry {
  date: Date;
  symptoms: Symptom[];
  note?: string;
  allergy?: AllergySystemCodeExtension;
  medications: Medication[];
}

export enum DashboardComponent {
  TIMELINE = 'timeline',
  POLLEN_MAP = 'pollenMap',
  DIARY_LIST = 'diaryList',
  NEW_DIARY_ENTRY = 'newDiaryEntry',
  CALENDAR = 'calendar',
  ALLERGIES = 'allergies',
  AIR_QUALITY = 'airQuality'
}

export interface Station {
  id: string;
  lngLat: number[];
  languageDisplays: LanguageDisplays;
}

export interface Measurement {
  station: string;
  date: number;
  values: {
    parameter: DefaultCoding;
    value: number;
  }[];
}

export interface Parameter {
  languageDisplays: LanguageDisplays;
  defaultCoding: DefaultCoding;
  unit: {
    unit: string;
    system: string;
    code: string;
  };
  pollen?: {
    icon: string;
    scale: {
      level_1: number[];
      level_2: number[];
      level_3: number[];
    };
  };
}

export interface WeatherData {
  stations: Station[];
  parameters: Parameter[];
  measurements: Measurement[];
}

export interface LanguageDisplays {
  en: string;
  de: string;
  fr: string;
  it: string;
  rm: string;
}

export interface DefaultCoding extends Coding {
  system: string;
  code: string;
  display: string;
}

export interface Series {
  name: string;
  type?: string;
  data: [number, number][];
  color?: string;
}

export interface Range {
  from: string | number | Date;
  to: string | number | Date;
}

export interface TimestampRange extends Range {
  from: number;
  to: number;
}

export interface LocalData {
  diaryEntries: DiaryEntry[];
  suspectedAllergies: AllergySystemCodeExtension[];
  preferredMedication: Medication[];
  settings: Settings;
}

export interface Scenario extends LocalData {
  name: string;
}

export interface UserData extends LocalData {
  user: string;
}
