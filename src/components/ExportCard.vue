<template>
  <q-card class="export-import-card">
    <q-card-section class="card-title with-close-icon">
      {{ $t('settings.export.title') }}
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
      <q-input
        class="q-mb-md"
        v-model="scenarioName"
        outlined
        type="text"
        :label="$t('settings.export.backupName')" />
      <q-input
        v-model="scenarioData"
        readonly
        outlined
        type="text"
        :label="$t('settings.export.backup')">
        <template v-slot:append>
          <q-icon
            color="primary"
            name="fas fa-copy"
            class="cursor-pointer"
            @click="copyScenario" />
        </template>
      </q-input>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {copyToClipboard, Notify} from 'quasar';
import utils from 'src/services/utils';

export default defineComponent({
  name: 'ExportCard',
  components: {},
  data() {
    return {
      scenarioName: new Date(Date.now()).toLocaleString(),
      scenarioData: ''
    };
  },
  emits: {
    /**
     * Notify parent about cosing of component.
     */
    close: () => true
  },
  beforeMount() {
    this.scenarioData = JSON.stringify(
      {
        name: this.scenarioName,
        diaryEntries: this.$store.getDiary(),
        suspectedAllergies: this.$store.getSuspectedAllergies(),
        preferredMedication: this.$store.getPreferredMedication(),
        settings: this.$store.getSettings()
      },
      utils.jsonStringifyReplacer
    );
  },
  watch: {
    scenarioName() {
      this.scenarioData = JSON.stringify(
        {
          name: this.scenarioName,
          diaryEntries: this.$store.getDiary(),
          suspectedAllergies: this.$store.getSuspectedAllergies(),
          preferredMedication: this.$store.getPreferredMedication(),
          settings: this.$store.getSettings()
        },
        utils.jsonStringifyReplacer
      );
    }
  },
  methods: {
    copyScenario() {
      copyToClipboard(this.scenarioData)
        .then(() => {
          Notify.create({
            message: this.$t('settings.export.copied'),
            color: 'primary'
          });
          this.$emit('close');
        })
        .catch(() => {
          console.error('error during the copy!');
        });
    }
  }
});
</script>

<style scoped lang="scss">
.export-import-card {
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
</style>
