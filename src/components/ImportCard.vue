<template>
  <q-card class="import-card">
    <q-card-section class="card-title with-close-icon">
      {{ $t('settings.import.title') }}
      <q-icon
        @click="$emit('close')"
        name="fas fa-times"
        class="close-icon"
        flat
        round
        dense
        v-close-popup />
    </q-card-section>
    <q-card-section>
      <span class="text-subtitle1">{{ $t('settings.import.patient') }} {{ getName() }}</span>
      <div>
        <q-input
          class="q-my-md"
          :disable="localScenario !== null"
          v-model="importedScenarioAsText"
          outlined
          type="text"
          :label="$t('settings.import.backup')"
          clearable />
        <span class="text-subtitle1">{{ $t('settings.import.or') }}</span>
        <q-select
          class="q-my-md"
          :disable="importedScenario !== null"
          v-model="localScenario"
          :options="scenarios"
          :option-label="(s: Scenario) => `[${s.settings.language.slice(0, 2).toUpperCase()}] ` + s.name"
          outlined
          :label="$t('settings.import.chooseScenario')"
          clearable />
        <span class="text-subtitle1">{{ $t('settings.import.or') }}</span>
        <div class="random-div">
          <div style="width: 3em">
            <q-input
              type="number"
              v-model.number="numberOfEntries" />
          </div>
          <span class="between-text"> {{ $t('settings.import.randomEntries') }} </span>
          <div style="width: 3em">
            <q-input
              type="number"
              v-model.number="numberOfDays" />
          </div>

          <span class="between-text"> {{ $t('settings.import.days') }} </span>
          <q-btn
            @click="generateRandom"
            flat
            >{{ $t('settings.import.generateRandom') }}
          </q-btn>
        </div>
        <q-separator />
        <q-checkbox
          class="q-mb-md"
          v-model="keepData"
          :label="$t('settings.import.keepData')" />
        <q-input
          v-model="to"
          outlined
          type="date"
          stack-label
          :label="$t('settings.import.chooseDate')" />
      </div>
    </q-card-section>
    <q-card-actions align="right">
      <q-btn
        @click="generate"
        :disable="(localScenario === null && importedScenario === null) || to === ''"
        color="primary"
        :label="$t('settings.import.title')" />
    </q-card-actions>
  </q-card>
</template>
<script lang="ts">
import _ from 'lodash';
import {date, Notify} from 'quasar';
import SCENARIOS from 'src/assets/scenarios.json';
import {DiaryEntry, Scenario, Symptom, SymptomIntensity, SymptomLocation} from 'src/model/interfaces';
import {defineComponent} from 'vue';
import utils from 'src/services/utils';
import {SYMPTOM_LOCATIONS} from 'src/assets/symptoms';
import {getEntryTemplate} from 'src/assets/entryTemplates';

// customizer function for the _.isEqualWith function to handle null and undefined as equal.
function customizer(objValue: unknown, othValue: unknown) {
  if (_.isNil(objValue) && _.isNil(othValue)) {
    return true;
  }
}

function randomSymptom(locations?: SymptomLocation[]): Symptom {
  let intensity = SymptomIntensity.HIGH;
  let rand = Math.random();
  if (rand <= 0.1) intensity = SymptomIntensity.NONE;
  if (rand > 0.1 && rand <= 0.4) intensity = SymptomIntensity.LOW;
  if (rand > 0.4 && rand <= 0.7) intensity = SymptomIntensity.MEDIUM;

  let location = locations
    ? locations[Math.floor(Math.random() * locations.length)]
    : SYMPTOM_LOCATIONS[Math.floor(Math.random() * SYMPTOM_LOCATIONS.length)];
  return {
    intensity: intensity,
    location: location
  };
}

export default defineComponent({
  name: 'ImportCard',
  data() {
    return {
      patient: this.$store.getPatient(),
      keepData: false,
      to: date.formatDate(this.$today, 'YYYY-MM-DD'),
      toAsDate: this.$today,
      numberOfEntries: 10,
      numberOfDays: 30,
      importedScenarioAsText: null as string | null,
      importedScenario: null as Scenario | null,
      localScenario: null as Scenario | null,
      scenarios: [] as Scenario[]
    };
  },
  emits: {
    /**
     * Notify parent about cosing of component.
     */
    close: () => true
  },
  created() {
    this.scenarios = JSON.parse(JSON.stringify(SCENARIOS), utils.jsonParseReviver) as Scenario[];
  },
  watch: {
    to(newTo: string) {
      this.toAsDate = new Date(newTo);
    },
    importedScenarioAsText(newImportedScenarioAsText: string) {
      if (newImportedScenarioAsText !== null) {
        try {
          this.importedScenario = JSON.parse(newImportedScenarioAsText, utils.jsonParseReviver) as Scenario;
          if (this.importedScenario.diaryEntries.length > 0) {
            this.to = date.formatDate(this.importedScenario.diaryEntries[0].date, 'YYYY-MM-DD');
          }
        } catch (e) {
          this.importedScenarioAsText = null;
          this.importedScenario = null;

          console.error('error during the paste!');
        }
      } else {
        this.importedScenario = null;
        this.to = date.formatDate(this.$today, 'YYYY-MM-DD');
      }
    }
  },
  methods: {
    getName() {
      return utils.getFullName(utils.selectName(this.patient.name ?? []));
    },
    generateRandom() {
      const startDate = new Date(this.to);
      const diary = this.randomDiaryEntries(
        Number(this.numberOfEntries), // this is important, because a q-input of type number has string as output 😬
        new Date(startDate.getTime() - this.numberOfDays * 24 * 60 * 60 * 1000),
        startDate,
        this.$i18n.locale.includes('de') ? 'de' : 'fr'
      );
      // sets the date to the store.
      this.$store.setDiary(
        this.keepData
          ? _.uniqWith(_.concat(diary, this.$store.getDiary()), (value, other) => {
              return _.isEqualWith(value, other, customizer);
            })
          : diary
      );
      this.keepData || this.$store.setSuspectedAllergies([]);
      this.keepData || this.$store.setPreferredMedication([]);
      const settings = this.$store.getSettings();
      settings.daysDisplayedOnDashboard = this.numberOfDays;
      this.$store.setSettings(settings);

      Notify.create({
        message: this.$t('settings.import.imported'),
        color: 'primary'
      });
      this.$emit('close');
    },
    randomDiaryEntries(numberOfEntries: number, startDate: Date, endDate: Date, lang: 'de' | 'fr'): DiaryEntry[] {
      if (numberOfEntries < 1) return [];

      // choose the symptom locations we are going to use
      const NUMBER_OF_LOCATIONS_USED = 3;
      const locations = new Array<SymptomLocation>();
      while (locations.length < NUMBER_OF_LOCATIONS_USED) {
        const location = SYMPTOM_LOCATIONS[Math.floor(Math.random() * SYMPTOM_LOCATIONS.length)];
        const i = locations.findIndex((l) => l.sct === location.sct);
        if (i === -1) {
          locations.push(location);
        }
      }

      const entries = new Array<DiaryEntry>();
      const start = startDate.getTime();
      const stepSize = Math.floor((endDate.getTime() - start) / (numberOfEntries + 1));

      for (let i = 1; i <= numberOfEntries; i++) {
        const entry = _.clone(getEntryTemplate(lang));
        const variability = Math.floor((Math.random() - 0.5) * 1000 * 60 * 60 * 6);
        entry.date = new Date(start + i * stepSize + variability);

        if (entry.symptoms == undefined) {
          // we don't want to override empty array in template
          entry.symptoms = new Array<Symptom>();
          const numberOfSymptoms = Math.round(Math.random() * 3);
          for (let j = 0; j < numberOfSymptoms; j++) {
            const symptom = randomSymptom(locations);
            const index = entry.symptoms?.findIndex((s) => s.location.name === symptom.location.name);
            if (entry.symptoms !== undefined && index === -1) {
              entry.symptoms.push(symptom);
            }
          }
        }
        entries.push(entry as DiaryEntry);
      }
      return entries;
    },
    generate() {
      let scenario: Scenario;

      if (this.localScenario) {
        scenario = this.localScenario;
      } else if (this.importedScenario) {
        scenario = this.importedScenario;
      } else {
        return;
      }
      // gets diaryEntries order by date descending.
      const diaryEntries = scenario.diaryEntries.sort((a, b) => b.date.getTime() - a.date.getTime());
      const dateDiff = [];
      // builds an array with the difference in day between the entries.
      for (let i = 0; i < diaryEntries.length - 1; i++) {
        dateDiff.push(date.getDateDiff(diaryEntries[i].date, diaryEntries[i + 1].date, 'days'));
      }
      if (diaryEntries[0]) {
        let dateCounter = diaryEntries[0].date;
        // sets the date of the newest entry with the given date.
        dateCounter.setFullYear(this.toAsDate.getFullYear());
        dateCounter.setMonth(this.toAsDate.getMonth());
        dateCounter.setDate(this.toAsDate.getDate());
        diaryEntries[0].date = dateCounter;
        // updates the entries' date with according to the given date and the difference array.
        for (let i = 1; i < diaryEntries.length; i++) {
          dateCounter = date.subtractFromDate(dateCounter, {days: dateDiff[i - 1]});
          diaryEntries[i].date = dateCounter;
        }
      }

      let scenarioDiaryEntries = scenario.diaryEntries;
      let scenarioSuspectedAllergies = scenario.suspectedAllergies;
      let scenarioPreferredMedication = scenario.preferredMedication;
      // avoid doublons if keepData is true
      if (this.keepData) {
        scenarioDiaryEntries = _.uniqWith(_.concat(scenario.diaryEntries, this.$store.getDiary()), (value, other) => {
          return _.isEqualWith(value, other, customizer);
        });
        scenarioSuspectedAllergies = _.uniqWith(
          _.concat(scenario.suspectedAllergies, this.$store.getSuspectedAllergies()),
          (value, other) => {
            return _.isEqualWith(value, other, customizer);
          }
        );
        scenarioPreferredMedication = _.uniqWith(
          _.concat(scenario.preferredMedication, this.$store.getPreferredMedication()),
          (value, other) => {
            return _.isEqualWith(value, other, customizer);
          }
        );
      }
      // sets the date to the store.
      this.$store.setDiary(scenarioDiaryEntries);
      this.$store.setSuspectedAllergies(scenarioSuspectedAllergies);
      this.$store.setPreferredMedication(scenarioPreferredMedication);
      this.$store.setSettings(scenario.settings);
      Notify.create({
        message: this.$t('settings.import.imported'),
        color: 'primary'
      });
      this.$emit('close');
    }
  }
});
</script>
<style scoped lang="scss">
.import-card {
  min-width: 310px;
  max-width: 500px;
  width: 100%;
}

.card-title.with-close-icon {
  padding-right: 2em;
}
.close-icon {
  cursor: pointer;
  color: #000000;
  right: 0.5em;
  top: 0.5em;
  position: absolute;
}
.close-icon:hover {
  opacity: 0.5;
}
.random-div {
  flex-direction: row;
  display: flex;
  margin-bottom: 0.5em;
}
.q-separator {
  margin-top: 2em;
  margin-bottom: 1em;
}
.between-text {
  margin-left: 1em;
  margin-right: 1em;
  padding-top: 1.2em;
}
</style>
