<template>
    <div class="com-container">
        <div class="com-chart" ref="line_ref">
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      myChart: null
    }
  },
  // 开始生命周期
  mounted () {
    this.initChart()
    this.getData()
    this.updateChart()
  },
  // 放所有所需函数
  methods: {
    initChart () {
      // this.myChart = this.$echarts.init(this.$refs.line_ref)
    },
    getData () {
      console.log(1)
    },
    async updateChart () {
      const myChart = this.$echarts.init(this.$refs.line_ref)
      // Schema:
      // date,AQIindex,PM2.5,PM10,CO,NO2,SO2
      var schema = [
        { name: 'number', index: 0, text: 'number' },
        { name: 'name', index: 1, text: 'name' },
        { name: 'length', index: 2, text: 'length' },
        { name: 'bifur_num', index: 3, text: 'bifur_num' },
        { name: 'mean_sum', index: 4, text: 'mean_sum'},
        { name: 'std_sum', index: 5, text: 'std_sum' },
        { name: 'mean_std', index: 6, text: 'mean_std' },
        { name: 'std_std', index: 7, text: 'std_std' },
      ];

      var data = await axios.get('https://sx18014.github.io/dist/data/CP.json')
      var rawData = data.data
      var CATEGORY_DIM_COUNT = 7;
      var GAP = 2;
      var BASE_LEFT = 5;
      var BASE_TOP = 9;
      // var GRID_WIDTH = 220;
      // var GRID_HEIGHT = 220;
      var GRID_WIDTH = (100 - BASE_LEFT - GAP) / CATEGORY_DIM_COUNT - GAP;
      var GRID_HEIGHT = (100 - BASE_TOP - GAP) / CATEGORY_DIM_COUNT - GAP;
      var CATEGORY_DIM = 8;
      var SYMBOL_SIZE = 4;

      function retrieveScatterData(data, dimX, dimY) {
        var result = [];
        for (var i = 0; i < data.length; i++) {
          var item = [data[i][dimX], data[i][dimY]];
          item[CATEGORY_DIM] = data[i][CATEGORY_DIM];
          result.push(item);
        }
        return result;
      }

      function generateGrids(option) {
        var index = 0;
        for (var i = 0; i < CATEGORY_DIM_COUNT; i++) {
          for (var j = 0; j < CATEGORY_DIM_COUNT; j++) {
            if (CATEGORY_DIM_COUNT - i + j >= CATEGORY_DIM_COUNT) {
              continue;
            }
            option.grid.push({
              left: BASE_LEFT + i * (GRID_WIDTH + GAP) + '%',
              top: BASE_TOP + j * (GRID_HEIGHT + GAP) + '%',
              width: GRID_WIDTH + '%',
              height: GRID_HEIGHT + '%'
            });
            option.brush.xAxisIndex && option.brush.xAxisIndex.push(index);
            option.brush.yAxisIndex && option.brush.yAxisIndex.push(index);

            option.xAxis.push({
              splitNumber: 3,
              position: 'top',
              axisLine: {
                show: j === 0,
                onZero: false
              },
              axisTick: {
                show: j === 0,
                inside: true
              },
              axisLabel: {
                show: j === 0
              },
              type: 'value',
              gridIndex: index,
              scale: true
            });

            option.yAxis.push({
              splitNumber: 3,
              position: 'right',
              axisLine: {
                show: i === CATEGORY_DIM_COUNT - 1,
                onZero: false
              },
              axisTick: {
                show: i === CATEGORY_DIM_COUNT - 1,
                inside: true
              },
              axisLabel: {
                show: i === CATEGORY_DIM_COUNT - 1
              },
              type: 'value',
              gridIndex: index,
              scale: true
            });
            option.series.push({
              type: 'scatter',
              symbolSize: SYMBOL_SIZE,
              xAxisIndex: index,
              yAxisIndex: index,
              data: retrieveScatterData(rawData, i, j)
            });
            option.visualMap.seriesIndex.push(option.series.length - 1);
            index++;
          }
        }
      }
      var option = {
        animation: false,
        brush: {
          brushLink: 'all',
          xAxisIndex: [],
          yAxisIndex: [],
          inBrush: {
            opacity: 1
          }
        },
        visualMap: {
          type: 'piecewise',
          categories: ["CP"],
          dimension: CATEGORY_DIM,
          orient: 'horizontal',
          top: 0,
          left: 'center',
          inRange: {
            color: ['#51689b']
          },
          outOfRange: {
            color: 'rgba(248,248,248,0.5)'
          },
          seriesIndex: [0]
        },
        tooltip: {
          trigger: 'item'
        },
        parallelAxis: [
          {dim: 0, name: schema[0].text},
          // {dim: 1, name: schema[1].text},
          {dim: 2, name: schema[2].text},
          {dim: 3, name: schema[3].text},
          {dim: 4, name: schema[4].text},
          {dim: 5, name: schema[5].text},
          {dim: 6, name: schema[6].text},
          {dim: 7, name: schema[7].text}
        ],
        parallel: {
          bottom: '5%',
          left: '2%',
          height: '30%',
          width: '55%',
          parallelAxisDefault: {
            type: 'value',
            nameGap: 20,
            splitNumber: 3,
            nameTextStyle: {
              fontSize: 14
            },
            axisLine: {
              lineStyle: {
                color: '#555'
              }
            },
            axisTick: {
              lineStyle: {
                color: '#555'
              }
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              color: '#555'
            }
            }
          },
          grid: [],
          xAxis: [],
          yAxis: [],
          series: [
          {
            name: 'parallel',
            type: 'parallel',
            smooth: true,
            lineStyle: {
              width: 1,
              opacity: 0.3
            },
            data: rawData
          }
        ]
      };

      generateGrids(option);
      option && myChart.setOption(option);
      
    }
  }
}
</script>

<style lang="less" scoped>
</style>
