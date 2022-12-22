<template>
  <q-card class="preferred-card-medication-card">
    <q-card-section class="card-title">
      {{ $t('preferredMedication.title') }}
      <q-icon
        @click="close(false)"
        name="fas fa-times"
        class="close-icon"
        flat
        round
        dense
        v-close-popup />
    </q-card-section>
    <q-card-section>
      <p>{{ $t('preferredMedication.explanation') }}</p>
      <q-select
        v-model="medications"
        :label="$t('common.typeForSearch')"
        :options="searchMedications"
        multiple
        options-dense
        hide-selected
        use-input
        :option-label="medicationsOptionLabel"
        @filter="
          (val, update) => {
            if (val === '') {
              return;
            } else {
              update(() => {
                searchMedications = availableMedication.filter((x) =>
                  medicationsOptionLabel(x).toLowerCase().includes(val.toLowerCase())
                );
              });
            }
          }
        " />
      <ul>
        <li
          v-for="(medication, i) in medications"
          :key="i">
          {{ medicationsOptionLabel(medication) }}
          <span
            @click="() => medications.splice(i, 1)"
            class="delete-x"
            style="cursor: pointer">
            [ {{ $t('common.remove') }} ]
          </span>
        </li>
      </ul>
    </q-card-section>
    <q-card-actions align="center">
      <q-btn
        :label="$t('common.save')"
        @click="close(true)" />
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {getLangStringFromLocale} from 'src/boot/i18n';
import {Medication, readI18N} from '@i4mi/fhir_r4';

import {MEDICATIONS} from 'src/assets/medications';

export default defineComponent({
  name: 'PreferredMedicationCard',
  data() {
    return {
      lang: getLangStringFromLocale(this.$i18n.locale),
      medications: [...this.$store.getPreferredMedication()],
      searchMedications: [] as Medication[],
      availableMedication: MEDICATIONS
    };
  },
  methods: {
    medicationsOptionLabel(option: Medication): string {
      let label = this.$t('common.error');

      if (option.code?._text) {
        label = readI18N(option.code._text, this.lang) ?? label;
      } else if (option.code?.text) {
        label = option.code.text ?? label;
      }

      return label;
    },
    close(save: boolean) {
      if (save) {
        this.$store.setPreferredMedication(this.medications);
      }
      this.$emit('close', {save: save});
    }
  }
});
</script>

<style scoped lang="scss"></style>
