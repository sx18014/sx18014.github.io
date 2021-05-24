<template>
<el-container>
  <el-main>
  <el-row :gutter="18">
    <el-col :span="18">
      <div class="card" ref="line_ref"></div>
    </el-col>
    <el-col :span="6">
      <el-card class="control" shadow="hover">
      <el-row>
        <el-row>切换数据来源脑区：</el-row>
        <el-row>
          <el-select v-model="value5" placeholder="请选择脑区" @change="setRegion(value5)">
            <el-option
              v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-row>
      </el-row>
      <el-divider></el-divider>
      <el-row>
        <el-row>切换坐标轴对应特征值：</el-row>
        <el-row>xAxis : 
          <el-select v-model="value1" placeholder="请选择x轴" @change="setAxis_X(value1)">
            <el-option
              v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-row>
        <el-row>yAxis : 
          <el-select v-model="value2" placeholder="请选择y轴" @change="setAxis_Y(value2)">
            <el-option
              v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-row>
        <el-row>color : 
          <el-select v-model="value3" placeholder="请选择颜色" @change="set_COLOR(value3)">
            <el-option
              v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-row>
        <el-row>sym_size : 
          <el-select v-model="value4" placeholder="请选择散点大小" @change="set_SIZE(value4)">
            <el-option
              v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-row>
        <el-row>
          <el-button @click="reset" style="float: left" type="danger" plain round>RESET</el-button>
        </el-row>
    </el-row>
    <el-divider></el-divider>
    <el-row>特征值信息：</el-row>
    <el-row :gutter="25">
      <el-col :span="6">
      <el-popover
        placement="bottom" width="100" trigger="click"
        content="节点和父节点的距离和">
        <el-button slot="reference">length</el-button>
      </el-popover>
      </el-col>
      <el-col :span="6">
      <el-popover
        placement="bottom" width="100" trigger="click"
        content="分叉的数量">
        <el-button slot="reference">bifur_num</el-button>
      </el-popover>
      </el-col>
    </el-row>
    <el-row :gutter="25">
      <el-col :span="8">
      <el-popover
        placement="bottom" width="100" trigger="click"
        content="分支上所有点的曲率求和作为分支曲率，各分支曲率结果求均值">
        <el-button slot="reference">mean_sum</el-button>
      </el-popover>
      </el-col>
      <el-col :span="7">
      <el-popover
        placement="bottom" width="100" trigger="click"
        content="分支上所有点的曲率求和作为分支曲率，各分支曲率结果求标准差">
        <el-button slot="reference">std_sum</el-button>
      </el-popover>
      </el-col>
      <el-col :span="8">
      <el-popover
        placement="bottom" width="100" trigger="click"
        content="分支上所有点的曲率标准差作为分支曲率，各分支曲率结果求标准差">
        <el-button slot="reference">std_std</el-button>
      </el-popover>
      </el-col>
    </el-row>
    </el-card>
    </el-col>
  </el-row>
  </el-main>
</el-container>
</template>

<script>
import $ from 'jquery'
import 'echarts-gl'
import axios from 'axios'
export default {
  data () {
    return {
      xAxis: 'bifur_num',
      yAxis: 'mean_sum',
      color: 'mean_sum',
      symbolSize: 'std_sum',
      region: 'CP',
      options: [{
          value: 'length',
          label: 'length'
        }, {
          value: 'bifur_num',
          label: 'bifur_num'
        }, {
          value: 'mean_sum',
          label: 'mean_sum'
        }, {
          value: 'std_sum',
          label: 'std_sum'
        }, {
          value: 'mean_std',
          label: 'mean_std'
        }, {
          value: 'std_std',
          label: 'std_std'
        }],
        options2: [{
          value: 'CP',
          label: 'CP'
        }, {
          value: 'MOp',
          label: 'MOp'
        }, {
          value: 'MOs',
          label: 'MOs'
        }, {
          value: 'SSP-all',
          label: 'SSP-all'
        }, {
          value: 'VPM',
          label: 'VPM'
        }],
        value1: 'bifur_num',
        value2: 'mean_sum',
        value3: 'mean_sum',
        value4: 'std_sum',
        value5: 'CP',
        axis: '',
        x: '',
        y: '',
        z: ''
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
    setAxis_X (value) {
      this.xAxis = value,
      this.axis = "x",
      this.updateChart (this.xAxis)
    },
    setAxis_Y (value) {
      this.yAxis = value,
      this.axis = "y",
      this.updateChart (null, this.yAxis)
    },
    set_COLOR (value) {
      this.color = value,
      this.axis = "color",
      this.updateChart (null, null, this.color)
    },
    set_SIZE (value) {
      this.symbolSize = value,
      this.axis = "symblesize",
      this.updateChart (null, null, null, this.symbolSize)
    },
    setRegion (value) {
      this.region = value,
      this.axis = "region",
      this.updateChart (null, null, null, null, this.region)
    },

    reset () {
      this.value1 = 'bifur_num'
      this.value2 = 'mean_sum'
      this.value3 = 'mean_sum'
      this.value4 = 'std_sum'
      this.value5 = 'CP'
      this.updateChart ('bifur_num', 'mean_sum', 'mean_sum', 'std_sum', 'CP')
    },

    async updateChart (x, y, clr, size, reg) {
      $('#pic2').width($('#pic2').width());
      $('#pic2').height($('#pic2').height());

      // 默认脑区
      var region = this.region
      // 默认坐标轴对应数值
      var xAxis = this.xAxis
      var yAxis = this.yAxis
      var color = this.color
      var symbleSize = this.symbolSize
      //根路径
      var ROOT_PATH = 'https://sx18014.github.io/dist/data/'

      // 选项数据发生改变
      if (x != null) { xAxis = x }
      if (y != null) { yAxis = y }
      if (clr != null) { color = clr }
      if (size != null) { symbleSize = size }
      if (reg != null) { region = reg }

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
        xAxis: xAxis,
        yAxis: yAxis,
        color: color,
        symbolSize: symbleSize,
        region: region,
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
        await axios.get (ROOT_PATH + region + '.json').then(function (_data) {
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
              symbolSize: [5, 30]
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
            // 高亮
            emphasis: {
              itemStyle: {
                color: '#7FFFD4'
              }
            }
          }]
        })
      })
      option && this.myChart.setOption(option)
      // 自适应页面
	    window.onresize = function () {
	    	setTimeout (function () {
          myChart.resize();
        },1)
	    }
      console.log(2)
    }
  }
}
</script>

<style>
.el-col {
  position: absolute!
}
.el-row {
  margin-bottom: 20px;
}
</style>