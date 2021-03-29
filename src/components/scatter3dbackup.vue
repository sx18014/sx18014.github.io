<template>
    <div class="com-container">
        <div class="com-chart" ref="line_ref">
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts'
import 'echarts-gl'
import $ from 'jquery'
export default {
  data () {
    return {
      // myChart: null
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
      // this.myChart = this.$echarts.init(this.$refs.line_ref, 'dark')
    },
    getData () {
      console.log(1)
    },
    updateChart () {
      const myChart = this.$echarts.init(this.$refs.line_ref)
      const ROOT_PATH = 'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples'
      const app = {}
      const option = null
      const indices = {
        name: 0,
        group: 1,
        id: 16
      }
      const schema = [
        { name: 'name', index: 0 },
        { name: 'group', index: 1 },
        { name: 'protein', index: 2 },
        { name: 'calcium', index: 3 },
        { name: 'sodium', index: 4 },
        { name: 'fiber', index: 5 },
        { name: 'vitaminc', index: 6 },
        { name: 'potassium', index: 7 },
        { name: 'carbohydrate', index: 8 },
        { name: 'sugars', index: 9 },
        { name: 'fat', index: 10 },
        { name: 'water', index: 11 },
        { name: 'calories', index: 12 },
        { name: 'saturated', index: 13 },
        { name: 'monounsat', index: 14 },
        { name: 'polyunsat', index: 15 },
        { name: 'id', index: 16 }
      ]
      let data

      const fieldIndices = schema.reduce(function (obj, item) {
        obj[item.name] = item.index
        return obj
      }, {})

      const groupCategories = []
      const groupColors = []
      let fieldNames = schema.map(function (item) {
        return item.name
      })
      fieldNames = fieldNames.slice(2, fieldNames.length - 2)
      function getMaxOnExtent (data) {
        let colorMax = -Infinity
        let symbolSizeMax = -Infinity
        for (let i = 0; i < data.length; i++) {
          const item = data[i]
          const colorVal = item[fieldIndices[config.color]]
          const symbolSizeVal = item[fieldIndices[config.symbolSize]]
          colorMax = Math.max(colorVal, colorMax)
          symbolSizeMax = Math.max(symbolSizeVal, symbolSizeMax)
        }
        return {
          color: colorMax,
          symbolSize: symbolSizeMax
        }
      }
      const config = app.config = {
        xAxis3D: 'protein',
        yAxis3D: 'fiber',
        zAxis3D: 'sodium',
        color: 'fiber',
        symbolSize: 'vitaminc',

        onChange: function () {
          const max = getMaxOnExtent(data)
          if (data) {
            this.myChart.setOption({
              visualMap: [{
                max: max.color / 2
              }, {
                max: max.symbolSize / 2
              }],
              xAxis3D: {
                name: config.xAxis3D
              },
              yAxis3D: {
                name: config.yAxis3D
              },
              zAxis3D: {
                name: config.zAxis3D
              },
              series: {
                dimensions: [
                  config.xAxis3D,
                  config.yAxis3D,
                  config.yAxis3D,
                  config.color,
                  config.symbolSiz
                ],
                data: data.map(function (item, idx) {
                  return [
                    item[fieldIndices[config.xAxis3D]],
                    item[fieldIndices[config.yAxis3D]],
                    item[fieldIndices[config.zAxis3D]],
                    item[fieldIndices[config.color]],
                    item[fieldIndices[config.symbolSize]],
                    idx
                  ]
                })
              }
            })
          }
        }
      }
      app.configParameters = {}
      if (!['xAxis3D', 'yAxis3D', 'zAxis3D', 'color', 'symbolSize']) {
        return
      }
      ['xAxis3D', 'yAxis3D', 'zAxis3D', 'color', 'symbolSize'].forEach(function (fieldName) {
        app.configParameters[fieldName] = {
          options: fieldNames
        }
      })
      $.getJSON(ROOT_PATH + '/data/asset/data/nutrients.json', function (_data) {
        data = _data
        console.log(data)
        const max = getMaxOnExtent(data)
        myChart.setOption({
          tooltip: {},
          visualMap: [{
            // 颜色区间
            top: 10,
            calculable: true,
            dimension: 3,
            max: max.color / 2,
            inRange: {
              color: ['#464aee', '#00ffff', '#ffff00', '#cc0000']
            },
            textStyle: {
              color: '#8B8989'
            }
          }, {
            // 大小区间
            bottom: 10,
            calculable: true,
            dimension: 4,
            max: max.symbolSize / 2,
            inRange: {
              symbolSize: [10, 40]
            },
            textStyle: {
              color: '#8B8989'
            }
          }],
          xAxis3D: {
            name: config.xAxis3D,
            type: 'value'
          },
          yAxis3D: {
            name: config.yAxis3D,
            type: 'value'
          },
          zAxis3D: {
            name: config.zAxis3D,
            type: 'value'
          },
          grid3D: {
            axisLine: {
              lineStyle: {
                color: 'black'
              }
            },
            axisPointer: {
              lineStyle: {
                color: 'black'
              }
            },
            viewControl: {
              // autoRotate: true
              // projection: 'orthographic'
            }
          },
          series: [{
            type: 'scatter3D',
            dimensions: [
              config.xAxis3D,
              config.yAxis3D,
              config.yAxis3D,
              config.color,
              config.symbolSiz
            ],
            data: data.map(function (item, idx) {
              return [
                item[fieldIndices[config.xAxis3D]],
                item[fieldIndices[config.yAxis3D]],
                item[fieldIndices[config.zAxis3D]],
                item[fieldIndices[config.color]],
                item[fieldIndices[config.symbolSize]],
                idx
              ]
            }),
            symbolSize: 12,
            symbol: 'circle',
            itemStyle: {
              borderWidth: 1,
              borderColor: 'rgba(255, 255, 255, 0.6)'
            },
            emphasis: {
              itemStyle: {
                color: '#7FFFD4'
              }
            }
          }]
        })
      })
      option && this.myChart.setOption(option)
      console.log(2)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
