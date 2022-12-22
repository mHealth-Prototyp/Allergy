<template>
  <q-card class="settings-card">
    <q-card-section class="card-title">{{ $t('layout.menu.settings') }}</q-card-section>
    <q-card-section>
      <form>
        <h3>{{ $t('common.language') }}</h3>
        <p>{{ $t('settings.languageText') }}</p>
        <q-select
          class="lang-select"
          v-model="language"
          outlined
          :options="availableLanguages"
          :option-label="(value) => (value == null ? '-' : $t('settings.' + value))"
          :disable="availableLanguages.length < 2"
          :label="$t('common.language')" />

        <q-separator size="0pt" />
        <h3>{{ $t('index.title') }}</h3>
        <p>{{ $t('settings.dashboardText') }}</p>
        <DashboardSettings :trigger-update="updateChildComponentTrigger" />
        <q-separator size="0pt" />
        <h3>{{ $t('settings.exportImportTitle') }}</h3>
        <p>{{ $t('settings.exportImportText') }}</p>

        <q-btn
          class="btn"
          outline
          color="primary"
          :label="$t('settings.export.title')"
          @click="exportData" />

        <q-btn
          class="btn"
          outline
          color="primary"
          :label="$t('settings.import.title')"
          @click="importData" />

        <q-separator size="0pt" />
        <h3>{{ $t('settings.oidsTitle') }}</h3>
        <p>{{ $t('settings.oidsText') }}</p>
        <ul class="oid-list">
          <li>
            <b>{{ $t('settings.oidsMpi') }}:</b> <br />
            {{ oids.mpiId }}
          </li>
          <li>
            <b>{{ $t('settings.oidsSpid') }}:</b> <br />
            {{ oids.eprSpid }}
          </li>
          <li>
            <b>{{ $t('settings.oidsAhv') }}:</b> <br />
            {{ oids.ahv }}
          </li>
          <li>
            <b>{{ $t('settings.oidsApp') }}:</b> <br />
            {{ oids.app }}
          </li>
        </ul>
      </form>
    </q-card-section>
  </q-card>

  <q-dialog
    v-model="showExportDialog"
    class="dialog">
    <export-card @close="showExportDialog = false"> </export-card>
  </q-dialog>

  <q-dialog
    v-model="showImportDialog"
    class="dialog">
    <import-card @close="applyImport"> </import-card>
  </q-dialog>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {APP_LANGUAGES, AVAILABLE_LANGUAGES, getLangStringFromLocale} from '../boot/i18n';
import ExportCard from 'src/components/ExportCard.vue';
import ImportCard from 'src/components/ImportCard.vue';
import DashboardSettings from 'src/components/DashboardSettings.vue';

export default defineComponent({
  name: 'SettingsPage',
  data() {
    return {
      language: this.$store.getLanguage(), // set language
      availableLanguages: new Array<string>(),
      // available languages (for picker
      oids: this.$store.getOids(),
      showExportDialog: false,
      showImportDialog: false,
      updateChildComponentTrigger: false
    };
  },
  watch: {
    language(newLanguage: APP_LANGUAGES) {
      this.$store.setLanguageSetting(newLanguage);
      this.$i18n.locale = this.$store.getLanguage();
      import(
        /* webpackInclude: /(de|fr)\.js$/ */
        'quasar/lang/' + getLangStringFromLocale(this.$store.getLanguage())
      )
        .then((lang) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
          this.$q.lang.set(lang.default);
        })
        .catch((error) => console.error(error));
      this.updateChildren();
    }
  },
  beforeMount() {
    AVAILABLE_LANGUAGES.forEach((lang) => this.availableLanguages.push(lang));
    this.reset(undefined, false);
  },
  methods: {
    applyImport() {
      if (this.language !== this.$store.getLanguage()) {
        this.language = this.$store.getLanguage();
      } else {
        this.updateChildren();
      }
      this.showImportDialog = false;
    },
    save(e: Event) {
      e.preventDefault();
    },
    reset(e: Event | undefined, getDefault: boolean): void {
      e && e.preventDefault();
      const settings = getDefault ? this.$store.getDefaultSettings() : this.$store.getSettings();
      this.language = settings.language;
    },
    exportData() {
      this.showExportDialog = true;
    },
    importData() {
      this.showImportDialog = true;
    },
    updateChildren() {
      this.updateChildComponentTrigger = !this.updateChildComponentTrigger;
    }
  },
  components: {ExportCard, DashboardSettings, ImportCard}
});
</script>

<style scoped lang="scss">
h3 {
  font-size: 1.2em;
  margin: 0;
  font-weight: bold;
}
hr {
  border-top: 1px double #8c8b8b;
  margin: 1em -1em;
}
.q-input {
  margin: 0 1em;
}
.lang-select {
  max-width: 200pt;
}

.col {
  margin-bottom: 1em;
}
.select-col {
  margin-left: 10vw;
  margin-right: 10vw;
}
.button-container {
  margin: 0 auto;
  padding: 1em;
  display: block;
  max-width: 300pt;
}
.button-container .q-btn,
#logout-button {
  margin: 0.5em;
}

.btn {
  margin-top: 1em;
  margin-right: 1em;
}
</style>
