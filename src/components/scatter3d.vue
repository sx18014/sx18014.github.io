<template>
    <div class="com-container">
        <div class="com-chart" ref="line_ref">
        </div>
    </div>
</template>

<script>
import 'echarts-gl'
import axios from 'axios'
export default {
  data () {
    return {
      // myChart: null
      CPJSON : null
    }
  },
  // 开始生命周期
  mounted () {
    this.getJson()
    this.initChart()
    this.getData()
    this.updateChart()
  },
  // 放所有所需函数
  methods: {
    async getJson() {
      const ret = await axios.get('https://sx18014.github.io/dist/data/CP.json')
      console.log(ret)
    },
    initChart () {
      // this.myChart = this.$echarts.init(this.$refs.line_ref, 'dark')
    },
    getData () {
      console.log(1)
    },
    async updateChart () {
      const myChart = this.$echarts.init(this.$refs.line_ref)
      const app = {}
      const option = null
      // 特征
      const schema = [
        { name: 'name', index: 1 },
        { name: 'length', index: 2 },
        { name: 'bifur_num', index: 3 },
        { name: 'mean_sum', index: 4 },
        { name: 'std_sum', index: 5 },
        { name: 'mean_std', index: 6 },
        { name: 'std_std', index: 7 }
      ]
      
      const fieldIndices = schema.reduce(function (obj, item) {
        obj[item.name] = item.index
        return obj
      }, {})

      let fieldNames = schema.map(function (item) {
        return item.name
      })
      fieldNames = fieldNames.slice(2, fieldNames.length - 2)
      //获取数据中的最大值用于值域过滤
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
        xAxis3D: 'bifur_num',
        yAxis3D: 'mean_std',
        zAxis3D: 'length',
        color: 'mean_std',
        symbolSize: 'std_sum',

        onChange: function () {
          const max = getMaxOnExtent(data)
          if (data) {
            this.myChart.setOption({
              visualMap: [{
                max: max.color / 2
              },
              {
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
                animation: false,
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
      if (!['xAxis3D', 'yAxis3D', 'zAxis3D', 'symbolSize']) {
        return
      }
      ['xAxis3D', 'yAxis3D', 'zAxis3D', 'symbolSize'].forEach(function (fieldName) {
        app.configParameters[fieldName] = {
          options: fieldNames
        }
      })
        //使用axios获取本地数据
        await axios.get ('https://sx18014.github.io/dist/data/CP.json').then(function (_data) {
        let data = _data.data;
        console.log (data)
        const max = getMaxOnExtent (data)
        myChart.setOption({
          tooltip: {},
          visualMap: [{
            // 颜色区间
            top: 10,
            calculable: true,
            dimension: 3,
             max: max.color/2,
            inRange: {
              color: ['#c6ffdd', '#fbd786', '#f7797d']
            },
            textStyle: {
              color: '#8B8989'
            }
          },{
            // 大小区间
            bottom: 10,
            calculable: true,
            dimension: 4,
            max: max.symbolSize/2,
            inRange: {
              symbolSize: [15, 30]
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
              borderWidth: 0.1,
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
