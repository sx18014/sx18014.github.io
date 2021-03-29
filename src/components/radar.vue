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
      data: []
    }
  },
  // 开始生命周期
  mounted () {
    this.getJson()
    this.updateChart()
  },
  // 放所有所需函数
  methods: {
    //获取json数据并赋值给this.data
    async getJson() {
      const ret = await axios.get('http://localhost:8080/data/CP.json')
      this.data = ret.data;
      console.log(this.data)
      const schema = [
        { name: 'name', index: 1 },
        { name: 'length', index: 2 },
        { name: 'bifur_num', index: 3 },
        { name: 'mean_sum', index: 4 },
        { name: 'std_sum', index: 5 },
        { name: 'mean_std', index: 6 },
        { name: 'std_std', index: 7 },
      ]
      const fieldIndices = schema.reduce(function (obj, item) {
        obj[item.name] = item.index
        return obj
      }, {})
      let fieldNames = schema.map(function (item) {
        return item.name
      })
      fieldNames = fieldNames.slice(2, fieldNames.length - 2)
      let mean_sum = -Infinity
      let std_sum = -Infinity
      let bifur_num = -Infinity
      let length = -Infinity
      let mean_std = -Infinity
      for (let i = 0; i < this.data.length; i++) {
        const item = this.data[i]
        mean_sum += item[fieldIndices[config.mean_sum]]
        console.log(mean_sum)
        std_sum += item[fieldIndices[config.std_sum]]
        bifur_num += item[fieldIndices[config.bifur_num]]
        length += item[fieldIndices[config.length]]
        mean_std += item[fieldIndices[config.mean_std]]
      }
      let mean_sumAVG = mean_sum / this.data.length
      let std_sumAVG = std_sum / this.data.length
      let bifur_numAVG = bifur_num / this.data.length
      let lengthAVG = length / this.data.length
      let mean_stdAVG = mean_std / this.data.length
      console.log(mean_sumAVG)
      return {
        mean_sumAVG,
        std_sumAVG,
        bifur_numAVG,
        lengthAVG,
        mean_stdAVG
      }
    },
    updateChart () {
      const myChart = this.$echarts.init(this.$refs.line_ref)
      const config = app.config = {
        onChange: function () {
          const AVG = getJson(data)
          if (data) {
            this.myChart.setOption({
              series: {
                type: 'radar',
                data: [{
                  value: [
                    mean_sumAVG,
                    std_sumAVG,
                    bifur_numAVG,
                    lengthAVG,
                    mean_stdAVG
                  ]
                }]
              }
            })
          }
        }
      }
      const option = {
        legend: {
          data: [
            'CP'
          ]
        },
        radar: {
          name: {
            textStyle: {
              color: '#fff',
              backgroundColor: '#999',
              borderRadius: 3,
              padding: [3, 5]
            }
          },
          indicator: [
            { name: 'mean_sum', max: 8},
            { name: 'std_sum', max: 12},
            { name: 'bifur_num', max: 800},
            { name: 'length', max: 11000},
            { name: 'mean_std', max: 0.5},
          ]
        },
        series: [{
          type: 'radar',
          data: [{
            value: [
              mean_sumAVG,
              std_sumAVG,
              bifur_numAVG,
              lengthAVG,
              mean_stdAVG
            ]
          }]
        }]
      }
      option && myChart.setOption(option)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
