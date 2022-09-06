<template>
  <div>
    <div v-for="allergy in allergyData" :key="allergy.id" class="allergy-container">
      <q-card class="allergy-card">
        <q-card-section>
          <AllergyView :allergyIntolerance="allergy" :translations="allergyStrings"
            :languageString="$store.getSettings().language.substring(0, 2) || 'de'" :fhirUtils="$fhirUtils"
            :epdPlaygroundUtils="$epdUtils"
            :showTitle="true" />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { AllergyView } from '@i4mi/mhealth-proto-components';
import { CHAllergyIntolerance } from '@i4mi/mhealth-proto-components/lib/utils/fhirUtils';

export default defineComponent({
  name: 'Allergies-Page',
  components: { AllergyView },
  data() {
    return {
      allergyData: undefined as Array<CHAllergyIntolerance> | undefined,
      allergyStrings: {
        allergy: this.$t('allergy.allergy'),
        intolerance: this.$t('allergy.intolerance'),
        typeLabel: this.$t('allergy.typeLabel'),
        codeDisplayLabel: this.$t('allergy.codeDisplayLabel'),
        dateLabel: this.$t('common.date'),
        clinicalStateLabel: this.$t('allergy.clinicalStateLabel'),
        verificationStateLabel: this.$t('allergy.verificationStateLabel'),
        reactionLabel: this.$t('allergy.reactionLabel'),
        reactionsLabel: this.$t('allergy.reactionsLabel'),
        reactionDateLabel: this.$t('allergy.reactionDateLabel'),
        reactionSubstanceLabel: this.$t('allergy.reactionSubstanceLabel'),
        reactionSeverityLabel: this.$t('allergy.reactionSeverityLabel'),
        reactionDescriptionLabel: this.$t('allergy.reactionDescriptionLabel'),
        additionalInformation: this.$t('allergy.additionalInformation'),
        categoryLabel: this.$t('allergy.categoryLabel'),
        criticalityLabel: this.$t('allergy.criticalityLabel'),
        noteLabel: this.$t('allergy.noteLabel'),
        exposureDateLabel: this.$t('allergy.exposureDateLabel'),
        exposureRouteLabel: this.$t('allergy.exposureRouteLabel'),
        reactionNoteLabel: this.$t('allergy.reactionNoteLabel'),
        reactionLocationLabel: this.$t('allergy.reactionLocationLabel'),
        noOtherDataAvailable: this.$t('allergy.noOtherDataAvailable')
      }
    }
  },
  beforeMount() {
    this.allergyData = this.$store.getKnownAllergies();
  },
  methods: {
  }
});
</script>

<style scoped lang="scss">
@media (min-width: 750px) {
  .allergy-card {
    width: 50%;
    margin-left: auto;
    margin-right: auto;
  }
}

.allergy-card {
  margin-bottom: 30px;
}
</style>
