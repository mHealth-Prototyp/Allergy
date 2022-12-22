<template>
  <VueApexCharts
    :options="chartOptions"
    type="line"
    :series="series"
    :height="height" />
</template>
<script lang="ts">
import {ApexOptions} from 'apexcharts';
import {getLangStringFromLocale} from 'src/boot/i18n';
import {defineComponent, PropType} from 'vue';
import VueApexCharts from 'vue3-apexcharts';

import {DiaryEntry, Series} from 'src/model/interfaces';
import {Medication, readI18N} from '@i4mi/fhir_r4';
import {date} from 'quasar';
import {SYMPTOM_LOCATIONS} from 'src/assets/symptoms';

export default defineComponent({
  name: 'SymptomsTimeline',
  components: {VueApexCharts},
  props: {
    height: {
      type: Number,
      required: true
    },
    diaryEntries: {
      type: Array as PropType<DiaryEntry[]>,
      required: true
    },
    range: {
      type: Object as PropType<{from: number; to: number}>,
      required: true
    }
  },
  data() {
    return {
      lang: getLangStringFromLocale(this.$i18n.locale),
      chartOptions: {
        markers: {
          size: [],
          strokeColors: '#000',
          strokeWidth: 1,
          shape: 'square'
        },
        chart: {
          id: 'symptoms-timeline',
          type: 'line',
          defaultLocale: getLangStringFromLocale(this.$i18n.locale),
          locales: this.$chartLocales
        },
        colors: [
          '#e6194B',
          '#3cb44b',
          '#ffe119',
          '#4363d8',
          '#f58231',
          '#911eb4',
          '#42d4f4',
          '#f032e6',
          '#bfef45',
          '#fabed4',
          '#469990',
          '#dcbeff',
          '#9A6324',
          '#fffac8',
          '#800000',
          '#aaffc3',
          '#808000',
          '#ffd8b1',
          '#000075',
          '#a9a9a9'
        ],
        grid: {
          padding: {
            left: 200
          }
        },
        stroke: {
          curve: 'smooth'
        },
        legend: {showForSingleSeries: true},
        xaxis: {
          type: 'datetime',
          labels: {
            datetimeUTC: true
          }
        },
        yaxis: {
          labels: {
            formatter: (val) => {
              switch (val) {
                case 3:
                  return this.$t('symptom.24484000');
                case 2:
                  return this.$t('symptom.6736007');
                case 1:
                  return this.$t('symptom.255604002');
                case 1.5:
                  return this.$t('timeline.taken');
                case -1:
                  return this.$t('timeline.notTaken');
                default:
                  return this.$t('symptom.260413007');
              }
            },
            offsetX: 190
          },
          min: 0,
          max: 3,
          tickAmount: 3,
          title: {
            text: this.$t('timeline.yAxis')
          }
        }
      } as ApexOptions,
      series: [] as Series[]
    };
  },
  created() {
    this.getChartData();
  },
  watch: {
    diaryEntries() {
      this.getChartData();
    }
  },
  methods: {
    /**
     * Processes the diary entries into a two dimmensional array with header that can be used by the Google Charts.
     */
    getChartData() {
      if (this.diaryEntries.length > 0) {
        const dayOffset = date.getDateDiff(this.range.to, this.range.from, 'days') + 1;
        let seriesIndexes: {[key: string]: number} = {};

        // Codes of intesities are converted to 0-3.
        let intensities = {
          260413007: 0,
          255604002: 1,
          6736007: 2,
          24484000: 3
        };

        // Builds the rest of the header with symptoms and also store their index for a later use.
        const series: Series[] = [];
        for (let i = 0; i < SYMPTOM_LOCATIONS.length; i++) {
          seriesIndexes[SYMPTOM_LOCATIONS[i].sct] = i;
          series[i] = {
            name: this.$t('symptom.' + SYMPTOM_LOCATIONS[i].name),
            type: 'line',
            data: []
          };
          for (let j = dayOffset - 1; j >= 0; j--) {
            series[i].data.push([date.subtractFromDate(this.range.to, {day: j}).getTime(), 0]);
          }
        }

        const medications: Medication[] = [];
        for (const e of this.diaryEntries) {
          if (e.medications) medications.push(...e.medications);
          const index = dayOffset - 1 - date.getDateDiff(this.range.to, e.date, 'days');
          for (const s of e.symptoms) {
            const intensity = intensities[s.intensity];
            if (series[seriesIndexes[s.location.sct]].data[index][1] < intensity) {
              series[seriesIndexes[s.location.sct]].data[index][1] = intensity;
            }
          }
        }
        const uniqueMedications = Array.from(new Set(medications.map((x) => x.code?.coding?.[0].code))).map((code) => {
          return medications.find((x) => x.code?.coding?.[0].code === code);
        });

        const seriesLength = Object.keys(seriesIndexes).length;
        for (let i = seriesLength; i < seriesLength + uniqueMedications.length; i++) {
          const i2 = i - seriesLength;
          const _text = uniqueMedications[i2]?.code?._text;
          const code = uniqueMedications[i2]?.code?.coding?.[0].code;
          if (_text && code) {
            seriesIndexes[code] = i;
            series[i] = {
              name: readI18N(_text, this.lang) ?? i.toString(),
              type: 'scatter',
              data: []
            };

            for (let j = dayOffset - 1; j >= 0; j--) {
              series[i].data.push([date.subtractFromDate(this.range.to, {day: j}).getTime(), -1]);
            }
          }
        }

        for (const e of this.diaryEntries) {
          if (e.medications) {
            const index = dayOffset - 1 - date.getDateDiff(this.range.to, e.date, 'days');
            for (const m of e.medications) {
              const code = m.code?.coding?.[0].code;
              if (code) {
                series[seriesIndexes[code]].data[index][1] = 1.5;
              }
            }
          }
        }

        const seriesWithData: Series[] = [];
        const markersSize: number[] = [];
        for (const s of series) {
          if (Math.max(...s.data.map((x) => x[1])) > 0) {
            seriesWithData.push(s);
            if (s.type === 'line') {
              markersSize.push(0);
            } else {
              markersSize.push(5);
            }
          }
        }
        if (this.chartOptions.markers) {
          this.chartOptions = {...this.chartOptions, markers: {...this.chartOptions.markers, size: markersSize}};
        }
        this.series = seriesWithData;
      }
    }
  }
});
</script>
<style lang="scss"></style>
