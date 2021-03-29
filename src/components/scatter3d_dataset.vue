<template>
    <div class="com-container">
        <div class="com-chart" ref="line_ref">
        </div>
    </div>
</template>

<script>
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
      const option = null
      $.getJSON(ROOT_PATH + '/data/asset/data/life-expectancy-table.json', function (data) {
        myChart.setOption({
          grid3D: {},
          xAxis3D: {
            type: 'category'
          },
          yAxis3D: {},
          zAxis3D: {},
          dataset: {
            dimensions: [
              'Income',
              'Life Expectancy',
              'Population',
              'Country',
              {name: 'Year', type: 'ordinal'}
            ],
            source: data
          },
          series: [{
            type: 'scatter3D',
            symbolSize: 8,
            encode: {
               x: 'Country',
              y: 'Life Expectancy',
              z: 'Income',
              tooltip: [0, 1, 2, 3, 4]
            }
          }]
        })
        // myChart.setOption(option)
      })
      console.log(2)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
