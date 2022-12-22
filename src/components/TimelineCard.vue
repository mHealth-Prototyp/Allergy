<template>
  <!-- Timeline card. Only displayed when width >= 600px. -->
  <q-card class="dashboard-card-wide gt-xs">
    <q-card-section class="card-title">
      <q-icon
        name="fas fa-chart-line"
        class="big-icon" />
      {{ $t('timeline.title') }}
    </q-card-section>
    <q-card-section>
      <q-select
        v-model="filter"
        outlined
        multiple
        use-chips
        :label="$t('timeline.filter')"
        :options="availableAllergies"
        :option-label="(o) => (o ? o.languageDisplays[lang] : $t('allergy.noAllergy'))"
        dense
        options-dense />
    </q-card-section>
    <q-card-section v-if="diaryEntries.length > 0">
      <SymptomsTimeline
        :height="400"
        :range="range"
        :diary-entries="diaryEntries" />
    </q-card-section>
    <q-card-section v-if="diaryEntries.length === 0">
      <InformationBanner :text="$t('diary.noData')" />
    </q-card-section>
  </q-card>
  <!-- Card to display when width is < 600px. -->
  <q-card class="dashboard-card lt-sm">
    <q-card-section class="card-title">
      <q-icon
        name="fas fa-chart-line"
        class="big-icon" />
      {{ $t('timeline.title') }}
    </q-card-section>
    <q-card-section>
      <InformationBanner :text="$t('timeline.noShowText')" />
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import {AllergySystemCodeExtension} from '@i4mi/mhealth-proto-components';

import {getLangStringFromLocale} from 'src/boot/i18n';
import Utils from 'src/services/utils';

import {DiaryEntry, TimestampRange} from 'src/model/interfaces';
import SymptomsTimeline from './charts/SymptomsTimeline.vue';

export default defineComponent({
  name: 'TimelineCard',
  components: {SymptomsTimeline},
  props: {
    diary: {
      type: Array as PropType<Array<DiaryEntry>>,
      required: true
    },
    range: {
      type: Object as PropType<TimestampRange>,
      required: true
    }

  },
  data() {
    return {
      lang: getLangStringFromLocale(this.$i18n.locale),
      diaryEntries: [] as DiaryEntry[],
      filter: new Array<AllergySystemCodeExtension>(),

      knownAllergyCodes: new Array<AllergySystemCodeExtension>(),
      suspectedAllergies: new Array<AllergySystemCodeExtension>(),
      availableAllergies: new Array<AllergySystemCodeExtension>()
    };
  },
  created() {
    this.availableAllergies = Utils.MergeAllergySystemCodeExtension(
      Utils.CHAllergyIntoleranceToAllergySystemCodeExtension(this.$store.getKnownAllergies()),
      this.$store.getSuspectedAllergies(),
      this.lang
    );

    this.filterEntries();
  },
  watch: {
    diary() {
      this.filterEntries();
    },
    range() {
      this.filterEntries();
    },
    filter() {
      this.filterEntries();
    }
  },
  methods: {
    filterEntries() {
      let diaryEntries = Utils.filterByDate(this.diary, this.range);

      if (this.filter.length > 0) {
        diaryEntries = diaryEntries.filter((x) =>
          this.filter.some((y) => y.defaultCoding.code === x.allergy?.defaultCoding.code)
        );
      }

      this.diaryEntries = diaryEntries;
    }
  }
});
</script>

<style scoped lang="scss"></style>
