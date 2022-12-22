<template>
  <!-- Timeline card. Only displayed when width >= 600px AND station !== undefined. -->
  <q-card
    class="dashboard-card-wide gt-xs"
    v-if="station">
    <q-card-section class="card-title">
      <q-icon
        name="fas fa-smog"
        class="big-icon" />
      {{ $t('airQuality.title') }} {{ $t('airQuality.in') }}
      {{ station.languageDisplays[lang] }}
    </q-card-section>
    <q-card-section>
      <AirQualityTimeline
        :height="400"
        :range="range"
        :station="station"
        :pollen="pollen" />
    </q-card-section>
  </q-card>
  <!-- Missing station card. Only displayed when width >= 600px AND station === undefined. -->
  <q-card
    class="dashboard-card"
    v-if="!station">
    <q-card-section class="card-title">
      <q-icon
        name="fas fa-smog"
        class="big-icon"></q-icon>
      {{ $t('airQuality.title') }}
    </q-card-section>
    <q-card-section>
      <WarningBanner :text="$t('airQuality.noStation')" />
    </q-card-section>
  </q-card>
  <!-- Card to display when width is < 600px. -->
  <q-card class="dashboard-card lt-sm">
    <q-card-section class="card-title">
      <q-icon
        name="fas fa-smog"
        class="big-icon" />
      {{ $t('airQuality.title') }}
    </q-card-section>
    <q-card-section>
      <InformationBanner :text="$t('airQuality.noShowText')" />
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';

import {AllergySystemCodeExtension} from '@i4mi/mhealth-proto-components';

import {getLangStringFromLocale} from 'src/boot/i18n';

import {Station, TimestampRange} from 'src/model/interfaces';
import AirQualityTimeline from './charts/AirQualityTimeline.vue';

export default defineComponent({
  name: 'AirQualityTimelineCard',
  components: {AirQualityTimeline},
  props: {
    station: {
      type: Object as PropType<Station>,
      required: false
    },
    pollen: {
      type: Object as PropType<AllergySystemCodeExtension>,
      required: false
    },
    range: {
      type: Object as PropType<TimestampRange>,
      required: true
    }
  },
  data() {
    return {
      lang: getLangStringFromLocale(this.$i18n.locale)
    };
  }
});
</script>

<style lang="scss">
.no-data {
  padding-top: 1em;
}
</style>
