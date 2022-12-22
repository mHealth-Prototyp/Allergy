<template>
  <q-page-sticky
    position="bottom-right"
    :offset="[18, 18]"
    class="fab-container">
    <q-btn
      fab
      icon="fas fa-cog"
      color="accent">
      <q-popup-proxy :offset="[0, 10]">
        <q-banner class="q-mx-sm">
          <div class="text-h6">{{ $t('dashboardFAB.title') }}</div>
          <div class="text-subtitle1">{{ $t('dashboardFAB.entriesText') }}</div>
          <q-option-group
            v-model="offset"
            :options="[
              {label: $t('dashboardFAB.allEntries'), value: 365},
              {label: $t('dashboardFAB.last30days'), value: 30},
              {label: $t('dashboardFAB.last7days'), value: 7}
            ]"
            @update:model-value="offsetChanged">
          </q-option-group>
          <div class="text-subtitle1 q-mt-sm">
            {{ $t('dashboardFAB.stationText') }}
          </div>
          <q-select
            v-model="station"
            :options="$weatherAPIConsumer.getStations()"
            :option-label="(item) => item.languageDisplays[lang]"
            @update:model-value="stationChanged" />
          <div class="text-subtitle1 q-mt-sm">
            {{ $t('dashboardFAB.pollenText') }}
          </div>
          <q-select
            v-model="pollen"
            :options="availablePollens"
            :option-label="(item) => item.languageDisplays[lang]"
            @update:model-value="pollenChanged"
            :disable="availablePollens.length === 0" />
          <div class="text-subtitle1 q-mt-sm">
            {{ $t('dashboardFAB.componentsText') }}
          </div>
          <DashboardSettings @dashboardSettingsChanged="$emit('dashboardSettingsChanged')" />
        </q-banner>
      </q-popup-proxy>
    </q-btn>
  </q-page-sticky>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {Station} from 'src/model/interfaces';

import DashboardSettings from './DashboardSettings.vue';

import {getLangStringFromLocale} from 'src/boot/i18n';

import Utils from 'src/services/utils';
import {AllergySystemCodeExtension} from '@i4mi/mhealth-proto-components';

export default defineComponent({
  name: 'DashboardFAB',
  components: {DashboardSettings},
  data() {
    return {
      lang: getLangStringFromLocale(this.$i18n.locale),
      offset: this.$store.getDaysDisplayedOnDashboard(),
      station: this.$store.getStation(),
      pollen: this.$store.getPollen(),
      availablePollens: [] as AllergySystemCodeExtension[]
    };
  },
  created() {
    this.availablePollens = Utils.MergeAllergySystemCodeExtension(
      Utils.CHAllergyIntoleranceToAllergySystemCodeExtension(this.$store.getKnownAllergies()),
      this.$store.getSuspectedAllergies(),
      this.lang
    ).filter((x) =>
      this.$weatherAPIConsumer.getParamaters().some((y) => y.defaultCoding.code === x.defaultCoding.code)
    );
  },
  methods: {
    offsetChanged(value: number) {
      this.$store.setDaysDisplayedOnDashboard(value);
      this.$emit('offsetChanged');
    },
    stationChanged(value: Station) {
      this.$store.setStation(value);
      this.$emit('stationChanged');
    },
    pollenChanged(value: AllergySystemCodeExtension) {
      this.$store.setPollen(value);
      this.$emit('pollenChanged');
    }
  }
});
</script>

<style scoped lang="scss">
.fab-container {
  z-index: 2;
}
</style>
