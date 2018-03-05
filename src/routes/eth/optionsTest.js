import echarts from 'echarts'

export default {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    }
  },
  xAxis: [{
    nameLocation: 'middle',
    nameGap: 30,
    name: 'snap: show display both value'
  }, {
    gridIndex: 1,
    nameLocation: 'middle',
    nameGap: 30,
    name: 'not snap: put axis on the middle of the two points, should display only one value.'
  }, {
    gridIndex: 2,
    nameLocation: 'middle',
    nameGap: 30,
    name: 'step line not snap: should tooltip correct.',
    axisPointer: {
      snap: false
    }
  }],
  yAxis: [{}, {gridIndex: 1}, {gridIndex: 2}],
  grid: [{
    top: 10,
    height: 100
  }, {
    top: 200,
    height: 100
  }, {
    top: 400,
    height: 200
  }],
  series: [{
    type: 'line',
    data: [[10, 10], [10, 20], [20, 20]]
  }, {
    type: 'line',
    xAxisIndex: 1,
    yAxisIndex: 1,
    data: [[10, 10], [30, 10]]
  }, {
    xAxisIndex: 2,
    yAxisIndex: 2,
    name:'Step Start',
    type:'line',
    step: 'start',
    data: echarts.util.map([120, 132, 101, 134, 90, 230, 210], function (value, index) {
      return [index * 100, value];
    })
  }, {
    xAxisIndex: 2,
    yAxisIndex: 2,
    name:'Step Middle',
    type:'line',
    step: 'middle',
    data: echarts.util.map([220, 282, 201, 234, 290, 430, 410], function (value, index) {
      return [index * 100, value];
    })
  }, {
    xAxisIndex: 2,
    yAxisIndex: 2,
    name:'Step End',
    type:'line',
    step: 'end',
    data: echarts.util.map([450, 432, 401, 454, 590, 530, 510], function (value, index) {
      return [index * 100, value];
    })
  }]
};
