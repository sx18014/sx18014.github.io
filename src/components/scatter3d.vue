<template>
<el-container>
  <el-main>
  <el-row :gutter="18">
    <el-col :span="18"><div class="card" ref="line_ref"></div></el-col>
    <el-col :span="6">
    <el-card class="control" shadow="hover">
      <el-row>
        <el-row>切换数据来源脑区：</el-row>
        <el-row>
          <el-select v-model="value6" placeholder="请选择脑区" @change="setRegion(value6)">
            <el-option
              v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-row>
      </el-row>
      <el-divider></el-divider>
      <el-row>
        <el-row>切换坐标轴对应特征值：</el-row>
        <el-row>xAxis3D : 
          <el-select v-model="value1" placeholder="请选择x轴" @change="setAxis_X(value1)">
            <el-option
              v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-row>
        <el-row>yAxis3D : 
          <el-select v-model="value2" placeholder="请选择y轴" @change="setAxis_Y(value2)">
            <el-option
              v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-row>
        <el-row>zAxis3D : 
          <el-select v-model="value3" placeholder="请选择z轴" @change="setAxis_Z(value3)">
            <el-option
              v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-row>
        <el-row>color : 
          <el-select v-model="value4" placeholder="请选择颜色" @change="set_COLOR(value4)">
            <el-option
              v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-row>
        <el-row>sym_size : 
          <el-select v-model="value5" placeholder="请选择散点大小" @change="set_SIZE(value5)">
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
import 'element-ui/lib/theme-chalk/index.css';
import 'echarts-gl'
import axios from 'axios'
export default {
  data () {
    return {
      xAxis: 'bifur_num',
      yAxis: 'mean_std',
      zAxis: 'length',
      color: 'mean_std',
      symbolSize: 'std_sum',
      style: 'dark',
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
        value2: 'mean_std',
        value3: 'length',
        value4: 'mean_std',
        value5: 'std_sum',
        value6: 'CP',
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
    // 修改维度对应特征值
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
    setAxis_Z (value) {
      this.zAxis = value,
      this.axis = "z",
      this.updateChart (null, null, this.zAxis)
    },
    set_COLOR (value) {
      this.color = value,
      this.axis = "color",
      this.updateChart (null, null, null, this.color)
    },
    set_SIZE (value) {
      this.symbolSize = value,
      this.axis = "symblesize",
      this.updateChart (null, null, null, null, this.symbolSize)
    },
    set_STYLE (value) {
      this.style = "dark",
      this.axis = "style",
      this.updateChart (null, null, null, null, null, this.style)
    },
    setRegion (value) {
      this.region = value,
      this.axis = "region",
      this.updateChart (null, null, null, null, null, this.region)
    },

    // 重置初始状态
    reset () {
      this.value1 = 'bifur_num'
      this.value2 = 'mean_std'
      this.value3 = 'length'
      this.value4 = 'mean_std'
      this.value5 = 'std_sum'
      this.value6 = 'CP'
      this.updateChart ('bifur_num', 'mean_std', 'length', 'mean_std', 'std_sum', 'CP')
      // 直接刷新页面的方法过于粗暴，加载缓慢
      // window.location.reload();
    },
    // 重绘图表
    async updateChart (x, y, z, clr, size, reg) {

      // 默认脑区
      var region = this.region

      // 默认坐标轴对应数值
      var xAxis = this.xAxis
      var yAxis = this.yAxis
      var zAxis = this.zAxis
      var color = this.color
      var symbleSize = this.symbolSize

      //根路径
      var ROOT_PATH = 'https://sx18014.github.io/dist/data/'

      console.log(x,y,z,clr,size,reg)

      // 坐标轴数据发生改变
      if (x != null) { xAxis = x }
      if (y != null) { yAxis = y }
      if (z != null) { zAxis = z }
      if (clr != null) { color = clr }
      if (size != null) { symbleSize = size }
      if (reg != null) { region = reg }

      const myChart = this.$echarts.init(this.$refs.line_ref, "dark")
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
        xAxis3D: xAxis,
        yAxis3D: yAxis,
        zAxis3D: zAxis,
        color: color,
        symbolSize: symbleSize,
        region: region,

        onChange: function () {
          const max = getMaxOnExtent(data)
          if (data) {
            this.myChart.setOption({
              tooltip: {},
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
                encode: {
                  tooltip: [0, 1, 2, 3, 4, 5, 6, 7]
                },
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
        await axios.get (ROOT_PATH + region + '.json').then(function (_data) {
        let data = _data.data;
        // console.log (data)
        //console.log(value[2])
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
                color: '#fff'
              }
            },
            axisPointer: {
              lineStyle: {
                color: '#fff'
              }
            },
            viewControl: {
              // autoRotate: true
              // projection: 'orthographic'
            }
          },
          series: [{
            type: 'scatter3D',
            encode: {
              tooltip: [0, 1, 2, 3, 4, 5, 6, 7, 8]
            },
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
      window.onresize = function () {
	    	myChart.resize();
	    }
      console.log(2)
    }
  }
}
</script>

<style>
.box {
    width: 100%;
    height: 950px
}
.card {
    width: 100% !important;
    height: 750px !important
}
.el-row {
  margin-bottom: 20px;
}
</style>
