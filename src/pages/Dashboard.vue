<template>
  <div class="full-width row justify-around">
    <TimelineCard
      v-if="showTimelineCard"
      :diary="diary"
      :range="range" />

    <AirQualityTimelineCard
      v-if="showAirQualityCard"
      :station="station"
      :pollen="pollen"
      :range="range" />

    <PollenMapCard
      v-if="showPollenMap"
      :station="station"
      :pollen="pollen" />

    <AllergyCard
      v-if="showAllergyCard"
      :confirmedAllergies="$store.getKnownAllergies(true)"
      :suspectedAllergies="$store.getSuspectedAllergiesAsFhir((str) => $t('symptom.' + str))"
      :entriesPerPage="5" />

    <DiaryEntryCard
      v-if="showNewEntryCard"
      :entry="undefined"
      dashBoardMode
      @create-entry="createEntry" />

    <DiaryListCard
      v-if="showDiaryListCard"
      :diary="diary"
      :entriesPerPage="5"
      @selected-entry="showEntry"
      @request-new-entry="
        displayEntry = undefined;
        diaryDialog = true;
      " />

    <CalendarCard
      v-if="showCalendarCard"
      :diary="diary" />

    <q-dialog
      v-model="diaryDialog"
      no-backdrop-dismiss
      class="dialog"
      v-if="showDiaryListCard">
      <DiaryEntryCard
        :entry="displayEntry"
        @close="diaryDialog = false"
        @create-entry="createEntry" />
    </q-dialog>
  </div>
  <DashboardFAB
    @offsetChanged="offsetChanged"
    @dashboardSettingsChanged="dashboardSettingsChanged"
    @stationChanged="stationChanged"
    @pollenChanged="pollenChanged" />
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import DiaryEntryCard from '../components/DiaryEntryCard.vue';
import {DashboardComponent, DiaryEntry, TimestampRange} from '../model/interfaces';
import DiaryListCard from 'src/components/DiaryListCard.vue';
import AllergyCard from 'src/components/AllergyCard.vue';
import CalendarCard from 'src/components/CalendarCard.vue';
import TimelineCard from 'src/components/TimelineCard.vue';
import AirQualityTimelineCard from 'src/components/AirQualityTimelineCard.vue';
import PollenMapCard from 'src/components/PollenMapCard.vue';
import DashboardFAB from 'src/components/DashboardFAB.vue';
import {date} from 'quasar';

export default defineComponent({
  name: 'DashboardPage',
  components: {
    DiaryEntryCard,
    DiaryListCard,
    CalendarCard,
    TimelineCard,
    AllergyCard,
    PollenMapCard,
    DashboardFAB,
    AirQualityTimelineCard
  },
  data() {
    return {
      diary: [...this.$store.getDiary()],
      displayEntry: undefined as DiaryEntry | undefined,
      diaryDialog: false,
      showDiaryListCard: false,
      showCalendarCard: false,
      showNewEntryCard: false,
      showTimelineCard: false,
      showAllergyCard: false,
      showPollenMap: false,
      showAirQualityCard: false,
      pollen: this.$store.getPollen(),
      station: this.$store.getStation(),
      offset: this.$store.getDaysDisplayedOnDashboard(),
      range: {
        from: date.subtractFromDate(this.$today, {days: this.$store.getDaysDisplayedOnDashboard() - 1}).getTime(),
        to: this.$today.getTime()
      } as TimestampRange
    };
  },
  created() {
    this.dashboardSettingsChanged();
  },
  mounted() {
    //this.diary = Utils.filterByDate(this.$store.getDiary(), this.offset, this.$today);
  },
  methods: {
    showEntry(entry: DiaryEntry): void {
      this.displayEntry = entry;
      this.diaryDialog = true;
    },
    createEntry(entry: DiaryEntry): void {
      this.diary = [...this.$store.addDiaryEntry(entry)]; //Utils.filterByDate(this.$store.addDiaryEntry(entry), this.offset, this.$today);
    },
    offsetChanged() {
      this.range = {
        from: date.subtractFromDate(this.$today, {days: this.$store.getDaysDisplayedOnDashboard() - 1}).getTime(),
        to: this.$today.getTime()
      } as TimestampRange;
    },
    stationChanged() {
      this.station = this.$store.getStation();
    },
    pollenChanged() {
      this.pollen = this.$store.getPollen();
    },
    dashboardSettingsChanged() {
      this.showDiaryListCard = this.$store.getSettings().dashboard.includes(DashboardComponent.DIARY_LIST);
      this.showCalendarCard = this.$store.getSettings().dashboard.includes(DashboardComponent.CALENDAR);
      this.showNewEntryCard = this.$store.getSettings().dashboard.includes(DashboardComponent.NEW_DIARY_ENTRY);
      this.showTimelineCard = this.$store.getSettings().dashboard.includes(DashboardComponent.TIMELINE);
      this.showAllergyCard = this.$store.getSettings().dashboard.includes(DashboardComponent.ALLERGIES);
      this.showPollenMap = this.$store.getSettings().dashboard.includes(DashboardComponent.POLLEN_MAP);
      this.showAirQualityCard = this.$store.getSettings().dashboard.includes(DashboardComponent.AIR_QUALITY);
    }
  }
});
</script>
<style lang="scss">
.dashboard-card {
  min-width: 310px;
  max-width: 500px;
  width: 100%;
}
.dashboard-card-wide {
  min-width: 600px;
  // max-width: 1200px;
  width: 100%;
}

.big-icon {
  position: absolute;
  left: 0.5em;
  top: 0.35em;
  font-size: 1.8em;
  color: $background;
}
.dialog.dashboard-card {
  min-width: 60%;
}
.no-data-text {
  margin: 1em;
}
.clickable {
  cursor: pointer;
}
.clickable:hover {
  color: $primary;
}
</style>
