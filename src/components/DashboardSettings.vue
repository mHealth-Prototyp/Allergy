<template>
  <q-option-group
    v-model="values"
    :options="options"
    type="toggle"
    name="dashboard_options_group" />
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {QOptionGroupProps} from 'quasar';
import {DashboardComponent} from 'src/model/interfaces';

export default defineComponent({
  name: 'DashboardSettings',
  data() {
    return {
      values: [] as DashboardComponent[],
      options: [] as QOptionGroupProps['options']
    };
  },
  props: {
    triggerUpdate: {
      type: Boolean,
      default: false
    }
  },
  created() {
    this.init();
  },
  beforeUpdate() {
    this.init();
  },
  methods: {
    init() {
      this.values = [];
      this.options = [];
      for (const o of this.$store.getDashboardSettings()) {
        o.active && this.values.push(o.component);
        this.options?.push({
          label: this.$t('settings.' + o.component),
          value: o.component
        });
      }
    }
  },
  watch: {
    values(newValues: DashboardComponent[]) {
      this.$store.setDashboardSettings(newValues);
      this.$emit('dashboardSettingsChanged');
    },
    triggerUpdate() {
      this.init();
    }
  }
});
</script>

<style scoped lang="scss"></style>
