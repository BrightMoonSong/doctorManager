<template>
<div class="line1">
  <div id="line1" class="" style="width: 90%;height:450px;"></div>
</div>
</template>

<script>
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/markPoint';
import 'echarts/lib/component/tooltip';
export default {
  mounted() {
    this.myChart = echarts.init(document.getElementById('line1'));
    this.initData();
  },
  props: ['sevenDate', 'sevenDay'],
  methods: {
    initData() {
      const colors = ['#d14a61', '#5793f3', '#675bba', '#13CE66'];
      const option = {
        color: colors,
        title: {
          text: '走势图',
          subtext: ''
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['下单数', '平均每单价格', '收入', '已完成订单']
        },
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            // dataView: { // 数据视图
            //   readOnly: false
            // },
            mark: {
              show: true
            },
            magicType: {
              type: ['bar', 'line']// , 'stack', 'tiled'
            },
            saveAsImage: {
              show: true
            },
            restore: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: true, // false从[0]开始向右延伸  true从0开始
          data: this.sevenDay
        },
        yAxis: [{
            type: 'value',
            name: '下单数',
            position: 'left',
            axisLine: {
              lineStyle: {
                color: '#999'
              }
            },
            axisLabel: {
              formatter: '{value}'
            }
          },
          {
            type: 'value',
            name: '收益',
            position: 'right',
            axisLine: {
              lineStyle: {
                color: '#999'
              }
            },
            axisLabel: {
              formatter: '{value}'
            }
          }
        ],
        series: [{
            name: '下单数',
            type: 'bar',
            data: this.sevenDate[0],
            markPoint: {
              data: [{
                  type: 'max',
                  name: '最大值'
                },
                {
                  type: 'min',
                  name: '最小值'
                }
              ]
            }
          },
          {
            name: '平均每单价格',
            type: 'bar',
            data: this.sevenDate[1],
            yAxisIndex: 1,
            markPoint: {
              data: [{
                  type: 'max',
                  name: '最大值'
                },
                {
                  type: 'min',
                  name: '最小值'
                }
              ]
            }
          },
          {
            name: '收入',
            type: 'bar',
            data: this.sevenDate[2],
            yAxisIndex: 1,
            markPoint: {
              data: [{
                  type: 'max',
                  name: '最大值'
                },
                {
                  type: 'min',
                  name: '最小值'
                }
              ]
            }
          },
          {
            name: '已完成订单',
            type: 'bar',
            data: this.sevenDate[3],
            yAxisIndex: 1,
            markPoint: {
              data: [{
                  type: 'max',
                  name: '最大值'
                },
                {
                  type: 'min',
                  name: '最小值'
                }
              ]
            }
          }
        ]
      };
      this.myChart.setOption(option);
    }
  },
  watch: {
    sevenDate: function() {
      this.initData();
    },
    sevenDay: function() {
      this.initData();
    }
  }
};
</script>

<style lang="less">
@import '../style/mixin';
.line1 {
    display: flex;
    justify-content: center;
}
</style>
