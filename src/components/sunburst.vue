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
        name: 'SSp-m',
        value: 4,
        itemStyle: {
            color: '#8520f0'
        }
    }, {
        name: 'SSs',
        value: 3,
        itemStyle: {
            color: '#8c50f2'
        }
    }, {
        name: 'SSp-bfd',
        value: 3,
        itemStyle: {
            color: '#a27bf4'
        },
    }, {
        name: 'MOp',
        value: 2,
        itemStyle: {
            color: '#9a7bf4'
        }
    }, {
        name: 'MOs',
        value: 2,
        itemStyle: {
            color: '#9a7bf4'
        }
    }, {
        name: 'SSp-ul',
        value: 2,
        itemStyle: {
            color: '#ac82f8'
        }
    }, {
        name: 'VISp',
        value: 2,
        itemStyle: {
            color: '#9382f8'
        }
    }, {
        name: 'CLA',
        value: 1,
        itemStyle: {
            color: '#8287f8'
        }
    }, {
        name: 'RSPv',
        value: 1,
        itemStyle: {
            color: '#829cf8'
        }
    }, {
        name: 'Ald',
        value: 1,
        itemStyle: {
            color: '#7eb1fb'
        }
    }, {
        name: 'SSp-n',
        value: 1,
        itemStyle: {
            color: '#7ec3fb'
        }
    }, {
        name: 'SSp-ll',
        value: 1,
        itemStyle: {
            color: '#21d4fd'
        }
    }, {
        name: 'others',
        value: 3,
        itemStyle: {
            color: '#21d4fd'
        }
    }]
}, {
    name: 'TH',
    itemStyle: {
        color: '#21ecfd'
    },
    children: [{
        name: 'VPM',
        value: 10,
        itemStyle: {
            color: '#21ecfd'
        }
    }, {
        name: 'VPL',
        value: 6,
        itemStyle: {
            color: '#58ecf9'
        }
    }, {
        name: 'LGd',
        value: 5,
        itemStyle: {
            color: '#58f9f2'
        }
    }, {
        name: 'MG',
        value: 3,
        itemStyle: {
            color: '#58f9ee'
        }
    }, {
        name: 'LP',
        value: 1,
        itemStyle: {
            color: '#58f9eb'
        }
    }, {
        name: 'RT',
        value: 1,
        itemStyle: {
            color: '#58f9de'
        }
    }, {
        name: 'RE',
        value: 1,
        itemStyle: {
            color: '#58f9d7'
        }
    }, {
        name: 'VM',
        value: 1,
        itemStyle: {
            color: '#58f9cf'
        }
    }, {
        name: 'AM',
        value: 1,
        itemStyle: {
            color: '#58f9c5'
        }
    }, {
        name: 'others',
        value: 3,
        itemStyle: {
            color: '#58f9bc'
        }
    }]
}, {
    name: 'CNU',
    itemStyle: {
        color: '#b9f292'
    },
    children: [{
        name: 'CP',
        value: 7,
        itemStyle: {
            color: '#b9f292'
        }
    }, {
        name: 'OT',
        value: 2,
        itemStyle: {
            color: '#d6efb8'
        }
    }, {
        name: 'ACB',
        value: 1,
        itemStyle: {
            color: '#ece7cb'
        }
    }, {
        name: 'other',
        value: 1,
        itemStyle: {
            color: '#f1a97e'
        }
    }]
}, {
    name: 'CLA',
    itemStyle: {
        color: '#f2511c'
    },
    children: [
        {
        name: 'CLA',
        value: 2,
        itemStyle: {
            color: '#f2511c'
            }
        }]
}, ];

option = {
    title: {
        top: 10,
        left: 10,
        text: 'SEU+Allen Institute',
        textStyle: {
            fontSize: 18,
            align: 'center'
        }
    }, 
    series: {
        type: 'sunburst',

        data: data,
        radius: [0, '95%'],
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
