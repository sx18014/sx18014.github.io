<template>
    <div class="com-container">
        <div class="com-chart" ref="line_ref">
        </div>
    </div>
</template>

<script>
import 'echarts-gl'
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
      let option = null
      let app ={}
      console.log(2)
      let data = [{
    name: ' CTX',
    itemStyle: {
        color: '#8520f0'
    },
    children: [{
        name: 'MOs',
        value: 18,
        itemStyle: {
            color: '#8520f0'
        }
    }, {
        name: 'MOp',
        value: 4,
        itemStyle: {
            color: '#8c50f2'
        }
    }, {
        name: 'ACAd',
        value: 3,
        itemStyle: {
            color: '#a27bf4'
        },
    }, {
        name: 'ORBI',
        value: 1,
        itemStyle: {
            color: '#9a7bf4'
        }
    }, {
        name: 'VISp',
        value: 1,
        itemStyle: {
            color: '#9a7bf4'
        }
    }, {
        name: 'others',
        value: 5,
        itemStyle: {
            color: '#7eb1fb'
        }
    }]
}, {
    name: 'TH',
    itemStyle: {
        color: '#21ecfd'
    },
    children: [{
        name: 'VAL',
        value: 4,
        itemStyle: {
            color: '#21ecfd'
        }
    }, {
        name: 'PO',
        value: 2,
        itemStyle: {
            color: '#58ecf9'
        }
    }, {
        name: 'CL',
        value: 2,
        itemStyle: {
            color: '#58f9f2'
        }
    }, {
        name: 'VM',
        value: 1,
        itemStyle: {
            color: '#58f9ee'
        }
    }, {
        name: 'VPM',
        value: 1,
        itemStyle: {
            color: '#58f9eb'
        }
    }, {
        name: 'others',
        value: 4,
        itemStyle: {
            color: '#58f9bc'
        }
    }]
}, {
    name: 'HPF',
    itemStyle: {
        color: '#b9f292'
    },
    children: [{
        name: 'SUB',
        value: 6,
        itemStyle: {
            color: '#b9f292'
        }
    }, {
        name: 'PRE',
        value: 6,
        itemStyle: {
            color: '#c1f292'
        }
    }, {
        name: 'DG',
        value: 6,
        itemStyle: {
            color: '#c8f292'
        }
    }, {
        name: 'POST',
        value: 3,
        itemStyle: {
            color: '#d6efb8'
        }
    }, {
        name: 'CAl',
        value: 3,
        itemStyle: {
            color: '#ece7cb'
        }
    }, {
        name: 'Pros',
        value: 2,
        itemStyle: {
            color: '#ecebcb'
        }
    }, {
        name: 'others',
        value: 1,
        itemStyle: {
            color: '#ece8cb'
        }
    }]
}, {
    name: 'HY',
    itemStyle: {
        color: '#f2511c'
    },
    children: [
        {
        name: 'ZI',
        value: 2,
        itemStyle: {
            color: '#f3cf90'
            }
        },
        {
        name: 'LHA',
        value: 2,
        itemStyle: {
            color: '#f78e59'
            }
        },
        {
        name: 'others',
        value: 4,
        itemStyle: {
            color: '#f2511c'
            }
        }]
}, ];

option = {
    title: {
        top: 10,
        left: 10,
        text: 'Janelia Research Campus',
        textStyle: {
            fontSize: 18,
            align: 'center'
        }
    }, 
    series: {
        type: 'sunburst',

        data: data,
        radius: [60, '95%'],
        sort: null,

        emphasis: {
            focus: 'ancestor'
        },

        levels: [{}, {
            r0: '10%',
            r: '40%',
            itemStyle: {
                borderRadius: 5,
                borderWidth: 2
            },
            label: {
                rotate: 'tangential'
            }
        }, {
            r0: '40%',
            r: '80%',
            itemStyle: {
                borderRadius: 5,
                borderWidth: 2
            },
            label: {
                align: 'right',
                position: 'outside',
                padding: 5
            }
        }]
    }
};
option && myChart.setOption(option);
      
    }

  }
}
</script>

<style lang="less" scoped>
</style>
