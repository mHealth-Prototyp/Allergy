<template>
  <q-card>
    <q-card-section class="card-title">{{ $t('documents.title') }}</q-card-section>
    <q-card-section>
      <DocumentSearch
        :patient="$store.getPatient()"
        ref="documentSearch"
        :locale="$store.getSettings().language"
        :demoMode="false"
        :addedDocuments="uploadedDocuments"
        @found-document="openDocument"
        :fhirUtils="$fhirUtils"
        :languageString="lang"
        :epdPlaygroundUtils="$epdUtils" />
    </q-card-section>
  </q-card>

  <q-dialog
    v-model="showAllergyPopup"
    class="dialog">
    <q-card class="allergy-dialog-card">
      <q-card-section class="card-title with-close-icon">
        {{ allergyToDisplay ? getAllergyName(allergyToDisplay) : '' }}
        <q-icon
          @click="
            () => {
              showAllergyPopup = false;
              allergyToDisplay = undefined;
            }
          "
          name="fas fa-times"
          class="close-icon"
          flat
          round
          dense
          v-close-popup />
      </q-card-section>
      <q-card-section>
        <AllergyView
          :allergyIntolerance="allergyToDisplay"
          :languageString="lang"
          :fhirUtils="$fhirUtils"
          :epdPlaygroundUtils="$epdUtils"
          :showTitle="false" />
      </q-card-section>
    </q-card>
  </q-dialog>

  <q-dialog
    v-model="showDocumentBundlePopup"
    class="dialog">
    <q-card class="document-dialog-card">
      <q-card-section class="card-title with-close-icon">
        {{ $t('documents.documentViewTitle') }}
        <q-icon
          @click="
            () => {
              showDocumentBundlePopup = false;
              documentBundleToDisplay = undefined;
            }
          "
          name="fas fa-times"
          class="close-icon"
          flat
          round
          dense
          v-close-popup />
      </q-card-section>
      <q-card-section>
        <DocumentView
          :document="documentBundleToDisplay"
          :languageString="lang"
          :ratio="$q.screen.gt.xs ? 16 / 9 : 9 / 16" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import {Bundle, BundleType, DocumentReference, Resource} from '@i4mi/fhir_r4';
import {defineComponent} from 'vue';
import {
  DocumentSearch,
  CHAllergyIntolerance,
  AllergyView,
  ALLERGY_IDENTIFICATION_CODES,
  FhirUtilLanguageType,
  DocumentView
} from '@i4mi/mhealth-proto-components';

export default defineComponent({
  name: 'Documents-Page',
  components: {DocumentSearch, AllergyView, DocumentView},
  data() {
    return {
      uploadedDocuments: new Array<DocumentReference>(),
      lang: this.$i18n.locale.substring(0, 2) as FhirUtilLanguageType,
      showAllergyPopup: false,
      allergyToDisplay: undefined as CHAllergyIntolerance | undefined,
      showDocumentBundlePopup: false,
      documentBundleToDisplay: undefined as Bundle | undefined
    };
  },
  methods: {
    openDocument(e: {document: string; metadata: DocumentReference}) {
      const document = e.document;
      const documentReference = e.metadata;
      const resource = JSON.parse(document) as Resource;

      if (this.checkIfIsAllergy(documentReference)) {
        this.showAllergyPopup = true;
        this.allergyToDisplay = resource as CHAllergyIntolerance;
      } else if (this.checkIfIsDocumentBundle(resource)) {
        this.showDocumentBundlePopup = true;
        this.documentBundleToDisplay = JSON.parse(document) as Bundle;
      } else {
        if (
          confirm(
            this.$t('documents.openPrompt1') +
              (documentReference.description || this.$t('documents.unknownTitle')) +
              this.$t('documents.openPrompt2')
          )
        ) {
          window.open(
            documentReference.content[0].attachment.url,
            documentReference.description || this.$t('documents.unknownTitle'),
            'height=' + (window.innerHeight * 0.7).toString() + ',width=' + (window.innerWidth * 0.7).toString()
          );
        }
      }
    },
    checkIfIsAllergy(document: DocumentReference): boolean {
      return (
        document.content[0].attachment.contentType === 'application/fhir+json' &&
        document.type !== undefined &&
        document.type.coding !== undefined &&
        document.type.coding.findIndex((coding) => {
          return coding.code === '722446000';
        }) > -1
      );
    },
    getAllergyName(allergy: CHAllergyIntolerance): string {
      const allergyCoding = allergy.code.coding?.find(
        (coding) => coding.system && coding.system === 'http://snomed.info/sct'
      );
      if (allergyCoding && allergyCoding.code) {
        const code = ALLERGY_IDENTIFICATION_CODES.find((code) => code.defaultCoding.code === allergyCoding.code);
        return code?.languageDisplays[this.lang] || this.$t('common.unknown');
      }
      return this.$t('common.unknown');
    },
    checkIfIsDocumentBundle(res: Resource): boolean {
      if (res.resourceType === 'Bundle' && (res as Bundle).type === BundleType.DOCUMENT) {
        return true;
      }
      return false;
    }
  }
});
</script>

<style scoped lang="scss">
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
.allergy-dialog-card {
  width: 60%;
  min-width: 300px;
}
.document-dialog-card {
  width: 100%;
  max-width: 1200px;
}
</style>
