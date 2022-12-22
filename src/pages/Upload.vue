<template>
  <q-card class="about-card">
    <q-card-section class="card-title">{{ $t('documents.title') }}</q-card-section>
    <q-card-section>
      <DocumentUpload
        :patient="$store.getPatient()"
        :onDone="onUploaded"
        :fhirUtils="$fhirUtils"
        :languageString="lang"
        :epdPlaygroundUtils="$epdUtils"
        :settings="$store.getSettings()" />
    </q-card-section>
  </q-card>
  <FhirExportCard :onDone="onUploaded" />
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {DocumentUpload, FhirUtilLanguageType} from '@i4mi/mhealth-proto-components';
import FhirExportCard from 'src/components/FhirExportCard.vue';
import {Bundle} from '@i4mi/fhir_r4';
import {Notify} from 'quasar';

export default defineComponent({
  name: 'Upload-Page',
  components: {DocumentUpload, FhirExportCard},
  data() {
    return {
      lang: this.$store.getSettings().language.substring(0, 2) as FhirUtilLanguageType
    };
  },
  methods: {
    onUploaded(bundle?: Bundle) {
      if (bundle) {
        this.$router
          .push('documents')
          .then(() => null)
          .catch((e) => console.log(e));
      } else {
        Notify.create({
          message: this.$t('common.error'),
          color: 'primary'
        });
      }
    }
  }
});
</script>

<style scoped lang="scss">
.add-button {
  margin-top: 1em;
  align-self: end;
  display: block;
  margin-left: auto;
  margin-right: 0;
}
</style>
