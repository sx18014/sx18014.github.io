<template>
    <div class="com-container">
        <div class="com-chart" ref="line_ref">
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts';
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
      let myChart = this.$echarts.init(this.$refs.line_ref)
      const app = {}
      var option = null
      var indices = {
        name: 1,
        bifur_num: 3,
        id: 0
      };
      // 特征
      const schema = [
        { name: 'id', index: 0 },
        { name: 'name', index: 1 },
        { name: 'length', index: 2 },
        { name: 'bifur_num', index: 3 },
        { name: 'mean_sum', index: 4 },
        { name: 'std_sum', index: 5 },
        { name: 'mean_std', index: 6 },
        { name: 'std_std', index: 7 }
      ]
      var axisColors = {
        'xAxisLeft': '#2A8339',
        'xAxisRight': '#367DA6',
        'yAxisTop': '#A68B36',
        'yAxisBottom': '#BD5692'
      };
      var colorBySchema = {};

      const fieldIndices = schema.reduce(function (obj, item) {
        obj[item.name] = item.index
        return obj
      }, {})

      var groupCategories = [];
      var groupColors = [];
      let data;

      // zlevel 为 1 的层开启尾迹特效
      myChart.getZr().configLayer(1, {
        motionBlur: 0.5
      });
      // 规范化数据
      function normalizeData(originData) {
        var groupMap = {};
        if(originData!=null){
        originData.forEach(function (row) {
          var groupName = row[indices.bifur_num];
          if (!groupMap.hasOwnProperty(groupName)) {
            groupMap[groupName] = 1;
          }
        });

        originData.forEach(function (row) {
          row.forEach(function (item, index) {
            if (index !== indices.name
                && index !== indices.bifur_num
                && index !== indices.id
            ) {
              // Convert null to zero, as all of them under unit "g".
              row[index] = parseFloat(item) || 0;
            }
          });
        });
        }
        var hStep = Math.round(300 / (groupCategories.length - 1));
        for (var i = 0; i < groupCategories.length; i++) {
          groupColors.push(echarts.color.modifyHSL('#5A94DF', hStep * i));
        }
      return originData;
      }

      function makeAxis(dimIndex, id, name, nameLocation) {
        var axisColor = axisColors[id.split('-')[dimIndex]];
        colorBySchema[name] = axisColor;
        return {
          id: id,
          name: name,
          nameLocation: nameLocation,
          nameGap: nameLocation === 'middle' ? 30 : 10,
          gridId: id,
          splitLine: {show: false},
          axisLine: {
            lineStyle: {
              color: axisColor
            }
          },
          axisLabel: {
            textStyle: {
              color: axisColor
            }
          },
          axisTick: {
            lineStyle: {
              color: axisColor
            }
          }
        };
      }

    function makeSeriesData(xLeftOrRight, yTopOrBottom) {
      return data.map(function (item, idx) {
        var schemaX = app.config[xLeftOrRight];
        var schemaY = app.config[yTopOrBottom];
        return [
          item[fieldIndices[schemaX]], // 0: xValue
          item[fieldIndices[schemaY]], // 1: yValue
          item[1],                     // 2: group
          item[0],                     // 3: name
          schemaX,                     // 4: schemaX
          schemaY,                     // 5: schemaY
          idx                          // 6
        ];
      });
    }

    function makeSeries(xLeftOrRight, yTopOrBottom) {
      var id = xLeftOrRight + '-' + yTopOrBottom;
      return {
        zlevel: 1,
        type: 'scatter',
        name: 'CP',
        xAxisId: id,
        yAxisId: id,
        symbolSize: 8,
        itemStyle: {
          emphasis: {
            color: '#fff'
          }
        },
        animationThreshold: 5000,
        progressiveThreshold: 5000,
        data: makeSeriesData(xLeftOrRight, yTopOrBottom)
      };
    }

    function makeDataZoom(opt) {
      return Object.assign({
        type: 'slider',
        filterMode: 'empty',
        realtime: false
      }, opt);
    }

    function tooltipFormatter(params) {
      // Remove duplicate by data name.
      var mapByDataName = {};
      var mapOnDim = {x: {}, y: {}, xy: {}};
      params.forEach(function (item) {
        var data = item.data;
        var dataName = data[3];
        var mapItem = mapByDataName[dataName] || (mapByDataName[dataName] = {});
        mapItem[data[4]] = data[0];
        mapItem[data[5]] = data[1];
        mapOnDim[item.axisDim][dataName] = mapItem;
      });
      Object.keys(mapByDataName).forEach(function (dataName) {
        if (mapOnDim.x[dataName] && mapOnDim.y[dataName]) {
          mapOnDim.xy[dataName] = mapByDataName[dataName];
          delete mapOnDim.x[dataName];
          delete mapOnDim.y[dataName];
        }
      });
      var resultHTML = [];
      [['xy', 'CROSS'], ['x', 'V LINE'], ['y', 'H LINE']].forEach(function (dimDefine) {
        var html = [];
        Object.keys(mapOnDim[dimDefine[0]]).forEach(function (dataName) {
          var mapItem = mapOnDim[dimDefine[0]][dataName];
          var valuesHTML = [];
          Object.keys(mapItem).forEach(function (dataName) {
            valuesHTML.push(
              '<span style="color:' + colorBySchema[dataName] + '">'
              + dataName
              + '</span>: ' + mapItem[dataName]
            );
          });
          html.push('<div style="margin: 10px 0">' + dataName + '<br/>' + valuesHTML.join('<br/>') + '</div>');
        });
        html.length && resultHTML.push(
          '<div style="margin: 10px 0">'
          + '<div style="font-size: 16px; color: #aaa">POINTS ON ' + dimDefine[1] + '</div>'
          + html.join('')
          + '</div>'
        );
      });
      return resultHTML.join('');
    }

    function getOption(data) {
      var gridWidth = '35%';
      var gridHeight = '35%';
      var gridLeft = 80;
      var gridRight = 50;
      var gridTop = 50;
      var gridBottom = 80;
      return {
        tooltip: {
          trigger: 'none',
          padding: [10, 20, 10, 20],
          backgroundColor: 'rgba(0,0,0,0.7)',
          transitionDuration: 0,
          extraCssText: 'width: 300px; white-space: normal',
          textStyle: {
            color: '#fff',
            fontSize: 12
          },
          position: function (pos, params, el, elRect, size) {
            var obj = {};
            obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 60;
            obj[['top', 'bottom'][+(pos[1] < size.viewSize[1] / 2)]] = 20;
            return obj;
          },
          formatter: tooltipFormatter
        },
        axisPointer: {
          show: true,
          snap: true,
          lineStyle: {
            type: 'dashed'
          },
          label: {
            show: true,
            margin: 6,
            backgroundColor: '#556',
            textStyle: {
              color: '#fff'
            }
          },
          link: [{
            xAxisId: ['xAxisLeft-yAxisTop', 'xAxisLeft-yAxisBottom']
          }, {
            xAxisId: ['xAxisRight-yAxisTop', 'xAxisRight-yAxisBottom']
          }, {
            yAxisId: ['xAxisLeft-yAxisTop', 'xAxisRight-yAxisTop']
          }, {
            yAxisId: ['xAxisLeft-yAxisBottom', 'xAxisRight-yAxisBottom']
          }]
        },
        xAxis: [
            makeAxis(0, 'xAxisLeft-yAxisTop', 'length', 'middle'),
            makeAxis(0, 'xAxisLeft-yAxisBottom', 'length', 'middle'),
            makeAxis(0, 'xAxisRight-yAxisTop', 'std_std', 'middle'),
            makeAxis(0, 'xAxisRight-yAxisBottom', 'std_std', 'middle')
        ],
        yAxis: [
            makeAxis(1, 'xAxisLeft-yAxisTop', 'mean_std', 'end'),
            makeAxis(1, 'xAxisLeft-yAxisBottom', 'mean_sum', 'end'),
            makeAxis(1, 'xAxisRight-yAxisTop', 'mean_std', 'end'),
            makeAxis(1, 'xAxisRight-yAxisBottom', 'mean_sum', 'end')
        ],
        grid: [{
            id: 'xAxisLeft-yAxisTop',
            left: gridLeft,
            top: gridTop,
            width: gridWidth,
            height: gridHeight
        }, {
            id: 'xAxisLeft-yAxisBottom',
            left: gridLeft,
            bottom: gridBottom,
            width: gridWidth,
            height: gridHeight
        }, {
            id: 'xAxisRight-yAxisTop',
            right: gridRight,
            top: gridTop,
            width: gridWidth,
            height: gridHeight
        }, {
            id: 'xAxisRight-yAxisBottom',
            right: gridRight,
            bottom: gridBottom,
            width: gridWidth,
            height: gridHeight
        }],
        dataZoom: [
            makeDataZoom({
                width: gridWidth,
                height: 20,
                left: gridLeft,
                bottom: 10,
                xAxisIndex: [0, 1]
            }),
            makeDataZoom({
                width: gridWidth,
                height: 20,
                right: gridRight,
                bottom: 10,
                xAxisIndex: [2, 3]
            }),
            makeDataZoom({
                orient: 'vertical',
                width: 20,
                height: gridHeight,
                left: 10,
                top: gridTop,
                yAxisIndex: [0, 2]
            }),
            makeDataZoom({
                orient: 'vertical',
                width: 20,
                height: gridHeight,
                left: 10,
                bottom: gridBottom,
                yAxisIndex: [1, 3]
            })
        ],
        visualMap: [{
            show: false,
            type: 'piecewise',
            categories: ["CP"],
            dimension: 2,
            inRange: {
                color: ['#d94e5d','#eac736','#50a3ba']
            },
            outOfRange: {
                color: ['#ccc'] //['#d94e5d','#eac736','#50a3ba']
            },
            top: 20,
            textStyle: {
                color: '#fff'
            },
            realtime: false
        }],
        series: [
            makeSeries('xAxisLeft', 'yAxisTop'),
            makeSeries('xAxisLeft', 'yAxisBottom'),
            makeSeries('xAxisRight', 'yAxisTop'),
            makeSeries('xAxisRight', 'yAxisBottom')
        ],
        animationEasingUpdate: 'cubicInOut',
        animationDurationUpdate: 2000
      };
    }

    var fieldNames = schema.map(function (item) {
      return item.name;
    }).slice(2);

    app.config = {
      xAxisLeft: 'length',
      yAxisTop: 'mean_std',
      xAxisRight: 'std_std',
      yAxisBottom: 'mean_sum',
      onChange: function () {
        if (data) {
            colorBySchema[app.config.xAxisLeft] = axisColors.xAxisLeft;
            colorBySchema[app.config.xAxisRight] = axisColors.xAxisRight;
            colorBySchema[app.config.yAxisTop] = axisColors.yAxisTop;
            colorBySchema[app.config.yAxisBottom] = axisColors.yAxisBottom;

            myChart.setOption({
                xAxis: [{
                    name: app.config.xAxisLeft
                }, {
                    name: app.config.xAxisLeft
                }, {
                    name: app.config.xAxisRight
                }, {
                    name: app.config.xAxisRight
                }],
                yAxis: [{
                    name: app.config.yAxisTop
                }, {
                    name: app.config.yAxisBottom
                }, {
                    name: app.config.yAxisTop
                }, {
                    name: app.config.yAxisBottom
                }],
                series: [{
                    data: makeSeriesData('xAxisLeft', 'yAxisTop')
                }, {
                    data: makeSeriesData('xAxisLeft', 'yAxisBottom')
                }, {
                    data: makeSeriesData('xAxisRight', 'yAxisTop')
                }, {
                    data: makeSeriesData('xAxisRight', 'yAxisBottom')
                }]
            });
          }
        }
    };

    app.configParameters = {
      xAxisLeft: {
        options: fieldNames
      },
      xAxisRight: {
        options: fieldNames
      },
      yAxisTop: {
        options: fieldNames
      },
      yAxisBottom: {
        options: fieldNames
      }
    };
    await axios.get ('https://sx18014.github.io/dist/data/CP.json').then(function (originData) {
//$.get(ROOT_PATH + '/data/asset/data/nutrients.json', function (originData) {
      let origindata = originData.data
      data = normalizeData(origindata).slice(0, 1000);
      myChart.setOption(option = getOption(data));
    });
      option && myChart.setOption(option)
      console.log(2)
    }
  }
}
</script>

<style lang="less" scoped>
</style>