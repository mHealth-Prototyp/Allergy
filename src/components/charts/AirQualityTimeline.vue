<template>
  <VueApexCharts
    :options="chartOptions"
    type="bar"
    :series="series"
    :height="height" />
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import {ApexOptions} from 'apexcharts';

import VueApexCharts from 'vue3-apexcharts';

import {AllergySystemCodeExtension} from '@i4mi/mhealth-proto-components';

import {getLangStringFromLocale} from 'src/boot/i18n';

import {Parameter, Series, Station} from 'src/model/interfaces';

export default defineComponent({
  name: 'AirQualityTimeline',
  components: {VueApexCharts},
  props: {
    height: {
      type: Number,
      required: true
    },
    station: {
      type: Object as PropType<Station>,
      required: false
    },
    pollen: {
      type: Object as PropType<AllergySystemCodeExtension>,
      required: false
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
        annotations: {
          yaxis: [
            {
              y: 50,
              yAxisIndex: 2,
              borderColor: '#0C0',
              label: {
                borderColor: '#0C0',
                text: this.$t('airQuality.pm10') + ' ' + this.$t('airQuality.dailyLimitValue'),
                style: {
                  color: '#0C0'
                }
              }
            },
            {
              y: 120,
              yAxisIndex: 3,
              borderColor: '#F00',
              label: {
                borderColor: '#F00',
                text: this.$t('airQuality.o3') + ' ' + this.$t('airQuality.dailyLimitValue'),
                style: {
                  color: '#F00'
                }
              }
            }
          ]
        },
        chart: {
          id: 'air-quality-timeline',
          defaultLocale: getLangStringFromLocale(this.$i18n.locale),
          locales: this.$chartLocales
        },
        dataLabels: {
          enabled: false
        },
        plotOptions: {
          bar: {
            columnWidth: '50%'
          }
        },
        xaxis: {
          type: 'datetime'
        },
        yaxis: [
          {
            min: 0,
            max: 150,
            title: {
              text: this.$t('airQuality.rainfall') + ' (' + this.$t('airQuality.mm') + ')',
              style: {color: '#00F'}
            }
          },
          {
            min: 0,
            max: 0,
            title: {
              text: this.$t('pollen.noPollen'),
              style: {
                color: '#efc000'
              }
            }
          },
          {
            min: 0,
            max: 200,
            title: {
              text: this.$t('airQuality.pm10') + ' (' + this.$t('airQuality.ugm3') + ')',
              style: {color: '#0C0'}
            }
          },
          {
            min: 0,
            max: 250,
            title: {
              text: this.$t('airQuality.ozone') + ' (' + this.$t('airQuality.ugm3') + ')',
              style: {color: '#F00'}
            }
          }
        ]
      } as ApexOptions,
      series: [
        {
          name: this.$t('airQuality.rainfall'),
          data: [] as [number, number][],
          color: '#00F'
        },
        {
          name: this.$t('pollen.noPollen'),
          data: [] as [number, number][],
          color: '#efc000'
        },
        {
          name: this.$t('airQuality.pm10'),
          data: [] as [number, number][],
          color: '#0C0'
        },
        {
          name: `${this.$t('airQuality.ozone')} (${this.$t('airQuality.o3')})`,
          data: [] as [number, number][],
          color: '#F00'
        }
      ] as Series[]
    };
  },
  created() {
    this.getChartData();
  },
  watch: {
    station() {
      this.getChartData();
    },
    pollen() {
      this.getChartData();
    },
    range() {
      this.getChartData();
    }
  },
  methods: {
    getChartData() {
      if (this.station) {
        let pollenParameter: Parameter | undefined;

        if (this.pollen?.defaultCoding.code) {
          pollenParameter = this.$weatherAPIConsumer.getParameter(this.pollen.defaultCoding.code);

          if (pollenParameter?.pollen) {
            const pollenYAxis = {
              min: 0,
              max: pollenParameter.pollen.scale.level_3[1] + 1,
              title: {
                text: `${pollenParameter.languageDisplays[this.lang]} (${this.$t('airQuality.ppm')})`,
                style: {
                  color: '#efc000'
                }
              }
            } as ApexYAxis;

            if (Array.isArray(this.chartOptions.yaxis)) {
              const yaxis = this.chartOptions.yaxis;
              yaxis[1] = pollenYAxis;
              this.chartOptions = {
                ...this.chartOptions,
                ...{
                  yaxis: yaxis
                }
              };
              this.series[1].name = pollenParameter.languageDisplays[this.lang];
              this.series[1].data = this.$weatherAPIConsumer.getValues(
                this.station.id,
                pollenParameter.defaultCoding.code,
                new Date(this.range.from),
                new Date(this.range.to)
              );
            }
          }
        }
        this.series[0].data = this.$weatherAPIConsumer.getValues(
          this.station.id,
          'rainfall',
          new Date(this.range.from),
          new Date(this.range.to)
        );
        this.series[2].data = this.$weatherAPIConsumer.getValues(
          this.station.id,
          'pm10',
          new Date(this.range.from),
          new Date(this.range.to)
        );
        this.series[3].data = this.$weatherAPIConsumer.getValues(
          this.station.id,
          'ozone',
          new Date(this.range.from),
          new Date(this.range.to)
        );
      }
    }
  }
});
</script>

<style lang="scss">
.no-data {
  padding-top: 1em;
}
</style>
