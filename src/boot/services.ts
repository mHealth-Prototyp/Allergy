import {boot} from 'quasar/wrappers';
import Store from 'src/services/storeService';
import {ENV} from '../assets/env.js';
import {FhirUtils, EpdPlaygroundUtils} from '@i4mi/mhealth-proto-components';
import VueApexCharts from 'vue3-apexcharts';

import DE from 'apexcharts/dist/locales/de.json';
import FR from 'apexcharts/dist/locales/fr.json';

import WarningBanner from 'src/components/banners/WarningBanner.vue';
import InformationBanner from 'src/components/banners/InformationBanner.vue';
import WeatherAPIConsumer from 'src/services/weatherAPIConsumer';

const fhirUtils = new FhirUtils(ENV.BASE_URL, {
  eprSpid: ENV.EPR_SPID,
  mpiId: ENV.MPI_ID,
  local: ENV.LOCAL,
  ahv: ENV.AHV,
  app: ENV.APP
});
const store = new Store(fhirUtils);
const epdUtils = new EpdPlaygroundUtils(ENV, store.getOids());
const chartLocales: ApexLocale[] = [DE, FR];
const yet = new Date();
const weatherAPIConsumer: WeatherAPIConsumer = new WeatherAPIConsumer();
// Type declaration
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $store: Store;
    $fhirUtils: FhirUtils;
    $epdUtils: EpdPlaygroundUtils;
    $chartLocales: ApexLocale[];
    $today: Date;
    $weatherAPIConsumer: WeatherAPIConsumer;
  }
}

export default boot(({app}) => {
  // Set global components
  app.use(VueApexCharts);
  app.component('WarningBanner', WarningBanner).component('InformationBanner', InformationBanner);
  // Set global variables
  app.config.globalProperties.$store = store;
  app.config.globalProperties.$fhirUtils = fhirUtils;
  app.config.globalProperties.$epdUtils = epdUtils;
  app.config.globalProperties.$chartLocales = chartLocales;
  app.config.globalProperties.$today = new Date(Date.UTC(yet.getFullYear(), yet.getMonth(), yet.getDate()));
  app.config.globalProperties.$weatherAPIConsumer = weatherAPIConsumer;
});

export {store, fhirUtils, epdUtils};
