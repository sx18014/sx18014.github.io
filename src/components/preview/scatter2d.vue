<template>
  <div class="com-container">
    <div class="com-chart" ref="line_ref"></div>
  </div>
</template>

<script>
import 'echarts-gl'
import axios from 'axios'
export default {
  data () {
    return {
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
    async updateChart (x, y, clr, size) {
      // 默认坐标轴对应数值
      var xAxis = this.xAxis
      var yAxis = this.yAxis
      var color = this.color
      var symbleSize = this.symbolSize

      // 坐标轴数据发生改变
      if (x != null) { xAxis = x }
      if (y != null) { yAxis = y }
      if (clr != null) { color = clr }
      if (size != null) { symbleSize = size }

      const myChart = this.$echarts.init(this.$refs.line_ref)
      const app = {}
      const option = null
      // 特征
      const schema = [
        { name: 'number', index: 0, text: 'number' },
        { name: 'name', index: 1, text: 'name' },
        { name: 'length', index: 2, text: 'length' },
        { name: 'bifur_num', index: 3, text: 'bifur_num' },
        { name: 'mean_sum', index: 4, text: 'mean_sum' },
        { name: 'std_sum', index: 5, text: 'std_sum' },
        { name: 'mean_std', index: 6, text: 'mean_std' },
        { name: 'std_std', index: 7, text: 'std_std' }
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
        xAxis: 'bifur_num',
        yAxis: 'mean_sum',
        color: 'mean_sum',
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
              xAxis: {
                name: config.xAxis
              },
              yAxis: {
                name: config.yAxis
              },
              dataZoom: [{
                type: 'inside'
              }, {
                type: 'slider'
              }],
              series: {
                animation: false,
                dimensions: [
                  config.xAxis,
                  config.yAxis,
                  config.color,
                  config.symbolSiz
                ],
                data: data.map(function (item, idx) {
                  return [
                    item[fieldIndices[config.xAxis]],
                    item[fieldIndices[config.yAxis]],
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
      if (!['xAxis', 'yAxis', 'symbolSize']) {
        return
      }
      ['xAxis', 'yAxis','symbolSize'].forEach(function (fieldName) {
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
          // 坐标轴值域调整
          dataZoom: [{
            type: 'inside',
          }, {
            type: 'slider'
          }, {
            type: 'inside',
            orient: 'vertical'
          }, {
            type: 'slider',
            orient: 'vertical'
          }],
          tooltip: {},
          visualMap: [{
            // 颜色区间
            top: 10,
            calculable: true,
            dimension: 3,
             max: max.color/2,
            inRange: {
              color: ['#eaecc6', '#2bc0e4', '#085078']
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
              symbolSize: [10, 30]
            },
            textStyle: {
              color: '#8B8989'
            }
          }],
          xAxis: {
            name: config.xAxis,
            type: 'value'
          },
          yAxis: {
            name: config.yAxis,
            type: 'value'
          },
          grid: {
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
            type: 'scatter',
            dimensions: [
              config.xAxis,
              config.yAxis,
              config.color,
              config.symbolSiz
            ],
            data: data.map(function (item, idx) {
              return [
                item[fieldIndices[config.xAxis]],
                item[fieldIndices[config.yAxis]],
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

<style>
 .el-row {
    margin-bottom: 20px;
  }
</style>