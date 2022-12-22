<template>
  <q-card class="hidden-charts">
    <q-card-section>
      <SymptomsTimeline
        :height="400"
        :range="timestampRange"
        :diary-entries="diary" />
    </q-card-section>
    <q-card-section>
      <AirQualityTimeline
        :height="400"
        :range="timestampRange"
        :station="$store.getStation()"
        :pollen="$store.getPollen()" />
    </q-card-section>
  </q-card>
  <q-card class="dashboard-card">
    <q-card-section class="card-title">{{ $t('export.title') }}</q-card-section>
    <q-card-section>
      <q-input
        class="q-mb-md"
        v-model="rangeDisplay"
        outlined
        :label="$t('export.text')"
        readonly>
        <template v-slot:append>
          <q-icon
            name="fas fa-calendar-week"
            color="primary"
            class="cursor-pointer">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale">
              <q-date
                v-model="range"
                range
                mask="x"
                :options="dateSelectorOptions">
                <div class="row items-center justify-end">
                  <q-btn
                    v-close-popup
                    :label="$t('common.close')"
                    color="primary"
                    flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <q-input
        class="q-mb-md"
        v-model="fileName"
        outlined
        type="text"
        :label="$t('export.filename')" />
      <q-input
        v-model="fileDescription"
        outlined
        type="textarea"
        :label="$t('export.description')" />
    </q-card-section>
    <q-card-actions align="right">
      <q-btn
        @click="submit"
        color="primary"
        :label="$t('export.export')"
        :disable="range === null || fileDescription === ''" />
    </q-card-actions>
  </q-card>
</template>
<script lang="ts">
import {defineComponent, PropType} from 'vue';
import {date, uid} from 'quasar';

import {DiaryEntry, TimestampRange} from 'src/model/interfaces';
import {
  Coding,
  CompositionStatus,
  NarrativeStatus,
  ObservationStatus,
  Period,
  Quantity,
  Reference,
  SampledData,
  readI18N,
  Bundle,
  Location,
  DocumentReference
} from '@i4mi/fhir_r4';
import {CHCoreDocumentEPR} from 'src/model/CHCoreDocumentEPR';
import {CHCoreCompositionEPR} from 'src/model/CHCoreCompositionEPR';
import {CHAllergyIntolerance, Iti65Metadata, ITI_65_AUTHOR_ROLE} from '@i4mi/mhealth-proto-components';

import {CustomObservation, CustomObservationComponent} from 'src/model/CustomObservation';
import {
  getDiv,
  getDtDd,
  getNarrative,
  getDenseAllergyIntoleranceNarrative,
  getDenseCompositionNarrative,
  getDensePatientNarrative
} from 'src/services/fhirNarrativeGenerator';
import {getLangStringFromLocale} from 'src/boot/i18n';
import SymptomsTimeline from './charts/SymptomsTimeline.vue';
import {Base64} from 'js-base64';
import AirQualityTimeline from './charts/AirQualityTimeline.vue';

const category = {
  system: 'http://snomed.info/sct',
  code: '184216000',
  display: 'Patient record type'
};

const DASHBOARD_EXPORT_TITLE = 'mHealth Proto Allergy Export';

const type = {system: 'http://snomed.info/sct', code: '419891008', display: 'Record artifact (record artifact)'};

export default defineComponent({
  data() {
    return {
      lang: getLangStringFromLocale(this.$i18n.locale),
      patient: this.$store.getPatient(),
      patientReference: {
        reference: `Patient/${this.$store.getPatient().id ?? ''}`
      } as Reference,
      organization: this.$store.getSettings().organization,
      date: Date.now(),
      range: null as null | {
        from: string;
        to: string;
      },
      timestampRange: {
        from: 0,
        to: 0
      } as TimestampRange,
      rangeDisplay: '',
      knownAllergies: [] as CHAllergyIntolerance[],
      suspectedAllergies: [] as CHAllergyIntolerance[],
      diary: [] as DiaryEntry[],
      fileName: '',
      fileDescription: ''
    };
  },
  props: {
    onDone: {
      type: Function as PropType<(bundle?: Bundle) => void>,
      required: true
    }
  },
  watch: {
    range(
      newRange: null | {
        from: string;
        to: string;
      }
    ) {
      if (newRange) {
        let from: Date;
        let to: Date;
        if (typeof newRange === 'string') {
          from = new Date(Number.parseInt(newRange));
          to = new Date(Number.parseInt(newRange));
        } else {
          from = new Date(Number.parseInt(newRange.from));
          to = new Date(Number.parseInt(newRange.to));
        }

        this.timestampRange = {
          from: Date.UTC(from.getFullYear(), from.getMonth(), from.getDate()),
          to: Date.UTC(to.getFullYear(), to.getMonth(), to.getDate())
        };
        this.rangeDisplay =
          date.formatDate(this.timestampRange.from, 'DD.MM.YYYY') +
          ' - ' +
          date.formatDate(this.timestampRange.to, 'DD.MM.YYYY');
      } else {
        this.timestampRange = {from: 0, to: 0} as TimestampRange;
        this.rangeDisplay = '';
      }
    },
    timestampRange(newTimestampRange: TimestampRange) {
      if (newTimestampRange.from !== 0 && newTimestampRange.to !== 0) {
        this.knownAllergies = this.$store.getKnownAllergies();
        this.suspectedAllergies = this.$store.getSuspectedAllergiesAsFhir();
        this.diary = this.$store.getDiary().filter((x) =>
          date.isBetweenDates(x.date, newTimestampRange.from, newTimestampRange.to, {
            onlyDate: true,
            inclusiveFrom: true,
            inclusiveTo: true
          })
        );
      } else {
        this.diary = [];
      }
    }
  },
  methods: {
    submit() {
      const translation = (key: string) => {
        return this.$t(key);
      };
      this.patient.text = getDensePatientNarrative(this.patient, translation);
      const composition = new CHCoreCompositionEPR(
        this.lang,
        type,
        this.patient,
        [this.patient, this.$store.getSettings().organization],
        `${this.$t('export.compositionTitle')} ${date.formatDate(this.timestampRange?.from, 'DD.MM.YYYY')} ${this.$t(
          'export.to'
        )} ${date.formatDate(this.timestampRange?.to, 'DD.MM.YYYY')}`,
        'N',
        {system: 'http://snomed.info/sct', code: '263856008', display: 'Restricted (qualifier value)'}
      );
      composition.category = [{coding: [category]}];
      const doc = new CHCoreDocumentEPR(composition, this.patient, this.organization);
      // ====== known allergies section =========
      for (const ka of this.knownAllergies) {
        ka.text = getDenseAllergyIntoleranceNarrative(ka, translation);
      }
      composition.addSection(this.$t('export.knownAllergies'), ...this.knownAllergies);
      // ====== suspected allergies section =====
      for (const sa of this.suspectedAllergies) {
        sa.text = getDenseAllergyIntoleranceNarrative(sa, translation);
      }
      composition.addSection(this.$t('export.suspectedAllergies'), ...this.suspectedAllergies);
      // ====== diary entries section ===========
      const diaryEntries = this.diaryToFhir();
      composition.addSectionWithImage(
        this.$t('export.diaryEntries'),
        {title: this.$t('timeline.chartTitle'), src: this.symptomsTimelineSVG()},
        ...diaryEntries
      );
      // ====== air quality data section ========
      const airQualityData = this.measurementsToFhir();
      if (airQualityData) {
        composition.addSection(this.$t('export.airQualityData'), airQualityData);
        doc.addResource(...this.knownAllergies, ...this.suspectedAllergies, ...diaryEntries, airQualityData);
      } else {
        doc.addResource(...this.knownAllergies, ...this.suspectedAllergies, ...diaryEntries);
      }
      composition.status = CompositionStatus.FINAL;
      composition.text = getDenseCompositionNarrative(composition, translation);

      this.upload(doc);
    },
    diaryToFhir(): CustomObservation[] {
      const diaryEntries: CustomObservation[] = [];
      const display = {
        '260413007': 'None (Qualifier value)',
        '255604002': 'Mild (Qualifier value)',
        '6736007': 'Moderate (severity modifier) (qualifier value)',
        '24484000': 'Severe (severity modifier) (qualifier value)'
      };
      for (const e of this.diary) {
        const div = getDiv();
        const dl = div.ele('dl');
        const o = new CustomObservation({
          system: 'http://loinc.org',
          code: '51855-5',
          display: 'Patient Note'
        });
        o.subject = this.patientReference;
        o.effectiveDateTime = e.date.toISOString();
        dl.ele(getDtDd(this.$t('common.date'), date.formatDate(e.date, 'DD.MM.YYYY HH:mm')));
        o.performer?.push(this.patientReference);
        if (e.note) {
          o.valueString = e.note;
          dl.ele(getDtDd(this.$t('diary.noteLabel'), e.note));
        } else {
          o.dataAbsentReason = {
            coding: [
              {
                system: 'http://terminology.hl7.org/CodeSystem/data-absent-reason',
                code: 'asked-declined',
                display: 'Asked But Declined'
              }
            ]
          };
          dl.ele(getDtDd(this.$t('export.dataAbsentReasonLabel'), this.$t('export.asked-declined')));
        }
        const dls = dl.ele('dt').ele('strong').txt(this.$t('symptom.location')).up().ele('dd').ele('dl');
        for (const s of e.symptoms) {
          const oc = new CustomObservationComponent(s.location.defaultCoding);
          oc.valueCodeableConcept = {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: s.intensity,
                display: display[s.intensity]
              }
            ]
          };
          dls.ele(getDtDd(this.$t(`symptom.${s.location.name}`), this.$t(`symptom.${s.intensity}`)));
          o.addComponent(oc);
        }
        if (e.allergy) {
          const oc = new CustomObservationComponent({
            system: 'http://loinc.org',
            code: '52473-6',
            display: 'Allergy or cause of reaction'
          });
          oc.valueCodeableConcept = {
            coding: [e.allergy.defaultCoding]
          };
          dl.ele(getDtDd(this.$t('export.concernedAllergy'), e.allergy.languageDisplays[this.lang]));
          o.addComponent(oc);
        }
        if (e.medications && e.medications.length > 0) {
          dl.ele('dt').ele('strong').txt(this.$t('export.medicationTaken'));
          for (const m of e.medications) {
            let txt = '';
            if (m.code?._text) {
              txt = readI18N(m.code._text, this.lang) ?? txt;
            } else if (m.code?.text) {
              txt = m.code.text ?? txt;
            }
            dl.ele('dd').txt(txt);

            const oc = new CustomObservationComponent({
              system: 'http://loinc.org',
              code: '18816-9',
              display: 'Medication name + identifier'
            });
            oc.valueCodeableConcept = m.code;
            o.addComponent(oc);
          }
        }
        o.id = uid();
        o.status = ObservationStatus.FINAL;
        o.text = getNarrative(div);
        diaryEntries.push(o);
      }
      return diaryEntries;
    },
    measurementsToFhir() {
      const observationComponents: CustomObservationComponent[] = [];
      const station = this.$store.getStation();
      if (station) {
        const location: Location = {
          resourceType: 'Location',
          language: this.lang,
          id: station.id,
          identifier: [
            {
              system:
                'https://www.meteoswiss.admin.ch/services-and-publications/applications/measurement-values-and-measuring-networks.html',
              value: station.id
            }
          ],
          name: station.languageDisplays[this.lang],
          position: {
            longitude: station.lngLat[0],
            latitude: station.lngLat[1]
          }
        };
        this.$weatherAPIConsumer.getParamaters().forEach((x) => {
          const oc = new CustomObservationComponent(x.defaultCoding);
          oc.valueSampledData = {
            origin: {
              value: 0,
              unit: x.unit.unit,
              system: x.unit.system,
              code: x.unit.code
            } as Quantity,
            period: 86400000,
            dimensions: 1,
            data: ''
          } as unknown as SampledData;
          if (station && this.timestampRange) {
            oc.valueSampledData.data = '';
            this.$weatherAPIConsumer
              .getValues(
                station.id,
                x.defaultCoding.code,
                new Date(this.timestampRange.from),
                new Date(this.timestampRange.to)
              )
              .forEach((x) => {
                if (oc.valueSampledData) {
                  oc.valueSampledData.data += `${x[1] === -1 ? 'E' : x[1]} `;
                }
              });
          }
          observationComponents.push(oc);
        });
        for (const oc of observationComponents) {
          if (oc.valueSampledData) {
            oc.valueSampledData.data = oc.valueSampledData.data?.trimEnd();
          }
        }
        const coding = {
          system: 'http://airquality.placeholder.test.ch/items',
          code: 'airquality',
          display: 'Air Quality'
        } as Coding;
        const observation = new CustomObservation(coding, ...observationComponents);
        observation.contained = [location];
        observation.subject = {
          reference: `#${location.id ?? ''}`,
          type: 'Location',
          display: location.name
        };
        if (this.timestampRange) {
          observation.effectivePeriod = {
            start: new Date(this.timestampRange.from).toISOString(),
            end: new Date(this.timestampRange.to).toISOString()
          } as Period;
        }
        observation.id = uid();
        observation.status = ObservationStatus.FINAL;
        const div = getDiv();
        div.ele('div').ele('h4').txt(this.$t('airQuality.title')).up().ele('img', {src: this.AirQualityTimelineSVG()});
        const dl = div.ele('dl');
        dl.ele(getDtDd(this.$t('export.station'), location.name ?? ''));
        dl.ele(getDtDd(this.$t('export.short'), location.identifier?.[0].value ?? ''));
        dl.ele(
          getDtDd(
            this.$t('export.lngLat'),
            `${location.position?.longitude ?? ''} / ${location.position?.latitude ?? ''}`
          )
        );
        const table = div.ele('table');
        const head = table.ele('thead').ele('tr');
        head.ele('th').ele('b').txt(this.$t('common.date'));
        const data: string[][] = [];
        for (const oc of observationComponents) {
          const display = oc.code.coding?.at(0)?.display ?? '';
          const unit = oc.valueSampledData?.origin?.code ?? '';
          head.ele('th').ele('b').txt(`${display} [${unit}]`);
          data.push(oc.valueSampledData?.data?.split(' ') ?? []);
        }
        const tBody = table.ele('tbody');
        for (let i = 0; i <= date.getDateDiff(this.timestampRange?.to ?? 0, this.timestampRange?.from ?? 0); i++) {
          const tr = tBody.ele('tr');
          tr.ele('td').txt(date.formatDate(date.addToDate(this.timestampRange?.from ?? 0, {days: i}), 'DD.MM.YYYY'));
          for (const d of data) {
            tr.ele('td').txt(d[i]);
          }
        }
        observation.text = {
          status: NarrativeStatus.GENERATED,
          div: div.end({headless: true, prettyPrint: false})
        };
        return observation;
      }
      return null;
    },
    dateSelectorOptions(date: string) {
      return (
        date <=
        `${this.$today.getFullYear()}/${`0${this.$today.getMonth() + 1}`.slice(-2)}/${`0${this.$today.getDate()}`.slice(
          -2
        )}`
      );
    },
    symptomsTimelineSVG(): string {
      const svg = document.getElementById('apexchartssymptoms-timeline')?.firstElementChild?.outerHTML ?? '';
      return `data:image/svg+xml;base64,${Base64.encode(svg)}`;
    },
    AirQualityTimelineSVG(): string {
      const svg = document.getElementById('apexchartsair-quality-timeline')?.firstElementChild?.outerHTML ?? '';
      return `data:image/svg+xml;base64,${Base64.encode(svg)}`;
    },
    upload(document: CHCoreDocumentEPR) {
      const metadata = {
        title: this.fileName,
        isFhir: true,
        description: this.fileDescription,
        contentLanguage: this.lang,
        sourceIdentifier: this.$store.getOids().app,
        categoryCoding: category,
        typeCoding: type,
        facilityCoding: {
          system: 'http://snomed.info/sct',
          code: '394778007',
          display: "Client's or patient's home (environment)"
        },
        practiceSettingCoding: this.$store.getSettings().practiceSetting,
        authorRole: ITI_65_AUTHOR_ROLE.PAT
      } as Iti65Metadata;
      this.$fhirUtils
        .createIti65Bundle(
          this.patient,
          new File([JSON.stringify(document)], this.fileName + '.json', {type: 'application/fhir+json'}),
          metadata
        )
        .then((bundle) => {
          const documentReference = bundle.entry.find((e) => e.resource.resourceType === 'DocumentReference')
            ?.resource as DocumentReference;
          if (documentReference.content && documentReference.content[0] && documentReference.content[0].attachment) {
            documentReference.content[0].attachment.title = DASHBOARD_EXPORT_TITLE;
          }
          return this.$epdUtils.useITI65(bundle);
        })
        .then(this.onDone)
        .catch((error) => {
          console.error(error);
          this.onDone();
        });
    }
  },
  components: {SymptomsTimeline, AirQualityTimeline}
});
</script>
<style scoped lang="scss">
.dashboard-card {
  max-width: 600px;
  text-align: center;
}

.hidden-charts {
  width: 1200px;
  position: fixed;
  right: 10000px;
  bottom: 10000px;
}
</style>
