<template>
  <q-card
    class="dashboard-card"
    v-if="station && pollen">
    <q-card-section class="card-title">
      <q-icon
        :name="'img:pollens/app/' + selectedPollen?.pollen?.icon + '@3x.png'"
        class="big-icon"></q-icon>
      {{ pollen.languageDisplays[lang] }}
    </q-card-section>
    <q-card-section class="title-container">
      <p class="title">
        {{ $t('pollen.current_forecast') + station.languageDisplays[lang] }}
      </p>
      <p class="subtitle">
        {{ getForecast(station, false) + ' (' + getPollenLevel(station) + ' ' + $t('pollen.unit') + ')' }}
      </p>
    </q-card-section>
    <q-card-section class="panel">
      <mapbox-map
        :accessToken="token"
        :center="[8.2266666666667, 46.801111111111]"
        mapStyle="light-v10"
        :minZoom="6"
        :maxZoom="10"
        :autoResize="true"
        :interactive="true"
        class="map">
        <mapbox-navigation-control position="bottom-left" />
        <mapbox-geogeometry-circle
          v-for="(item, index) in $weatherAPIConsumer.getStations()"
          v-bind:key="index"
          :center="item.lngLat"
          :radius="Math.log2(getPollenLevel(item) + 2) + 5"
          :fillColor="getForecast(item, true)"
          :outlineColor="'#000000'"
          :opacity="item.id === station.id ? 1 : 0.6">
          <template v-slot:popup>
            <mapbox-popup>
              <p class="popup-city">
                {{ item.languageDisplays[lang] }}
              </p>
              <p>
                {{ getForecast(item, false) + ' (' + getPollenLevel(item) + ' ' + $t('pollen.unit') + ')' }}
              </p>
            </mapbox-popup>
          </template>
        </mapbox-geogeometry-circle>
      </mapbox-map>
    </q-card-section>
  </q-card>
  <q-card
    class="dashboard-card"
    v-if="!station || !pollen">
    <q-card-section class="card-title">
      <q-icon
        name="fas fa-map"
        class="big-icon"></q-icon>
      {{ $t('pollen.title') }}
    </q-card-section>
    <q-card-section>
      <WarningBanner
        v-if="!station && pollen"
        :text="$t('pollen.noStation')" />
      <WarningBanner
        v-if="station && !pollen"
        :text="$t('pollen.noPollen')" />
      <WarningBanner
        v-if="!station && !pollen"
        :text="$t('pollen.noBoth')" />
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import {AllergySystemCodeExtension} from '@i4mi/mhealth-proto-components/lib/utils/allergyCodes';

import {Parameter, Station} from 'src/model/interfaces';
import {defineComponent, PropType} from 'vue';
import WarningBanner from './banners/WarningBanner.vue';
import {MapboxGeogeometryCircle, MapboxMap, MapboxPopup, MapboxNavigationControl} from 'vue-mapbox-ts';
import {getLangStringFromLocale} from 'src/boot/i18n';

export default defineComponent({
  name: 'PollenForecast',
  components: {
    MapboxMap,
    MapboxGeogeometryCircle,
    MapboxPopup,
    MapboxNavigationControl,
    WarningBanner
  },

  data() {
    return {
      lang: getLangStringFromLocale(this.$i18n.locale),
      token: 'pk.eyJ1IjoibWlkYXRhIiwiYSI6ImNqZm4ybzJxajB3d2czNG8wOG5sdjZscjIifQ.tOVOqFTyBm0dqSTuGPw92A',
      selectedPollen: undefined as Parameter | undefined
    };
  },
  props: {
    station: {
      type: Object as PropType<Station>,
      required: false
    },
    pollen: {
      type: Object as PropType<AllergySystemCodeExtension>,
      required: false
    }
  },
  created() {
    this.getSelectedPollen();
  },
  updated() {
    this.getSelectedPollen();
  },
  methods: {
    /**
     * Gets the api parameter corresponding to the given allergy.
     */
    getSelectedPollen() {
      if (this.pollen?.defaultCoding.code) {
        this.selectedPollen = this.$weatherAPIConsumer.getParameter(this.pollen.defaultCoding.code);
      }
    },
    /**
     * Fetches the value of the given parameter from the given station.
     * @param station the station whose value was messed.
     */
    getPollenLevel(station: Station) {
      if (this.selectedPollen) {
        return this.$weatherAPIConsumer.getValue(station.id, this.selectedPollen.defaultCoding.code, this.$today);
      }

      return -1;
    },
    /**
     * Returns the forecast text or color of the given parameter from the given station.
     * @param station the station whose value was messed.
     * @param asColor if true return a hex color code instead of forecast.
     */
    getForecast(station: Station, asColor: boolean) {
      let value = this.getPollenLevel(station);
      let scale = this.selectedPollen?.pollen?.scale;

      if (value === -1 || scale === undefined) {
        return asColor === false ? this.$t('pollen.no_measurement') : '#fff';
      } else if (value < scale.level_1[0]) {
        return asColor === false ? this.$t('pollen.measurement_0') : '#dbdbdb';
      } else if (value >= scale.level_1[0] && value <= scale.level_1[1]) {
        return asColor === false ? this.$t('pollen.measurement_1') : '#ff0';
      } else if (value >= scale.level_2[0] && value <= scale.level_2[1]) {
        return asColor === false ? this.$t('pollen.measurement_2') : '#ffa500';
      } else if (value >= scale.level_3[0] && value <= scale.level_3[1]) {
        return asColor === false ? this.$t('pollen.measurement_3') : '#f00';
      } else {
        return asColor === false ? this.$t('pollen.measurement_4') : '#760000';
      }
    }
  }
});
</script>

<style scoped type="text/css">
.title-container {
  margin-left: 16px;
  padding: 0.5em 1em;
  margin-right: 16px;
}

.title {
  font-size: 1.2em;
  font-weight: bold;
  width: 100%;
  text-align: center;
}

.subtitle {
  text-align: center;
}
.panel {
  height: 500px;
  padding-top: 0;
}

.popup-city {
  font-weight: bold;
}

.forecast {
  text-align: center;
  border: 1px solid #000000;
  border-radius: 4pt;
  padding: 0.5em 1em;
}
</style>
