import styles from 'app/styles';
import xAxis from 'chart/xAxis';
import tooltip from 'chart/tooltip';
import commentFormatter from 'chart/commentFormatter'

export default {
  backgroundColor: styles.colors.background,

  grid: {
    left: '50px',
    right: '10px',
    top: '30px'
  },

  xAxis: { ...xAxis, axisLabel: { ...xAxis.axisLabel, formatter: null }},

  yAxis: {
    min: 9500,
    max: 11000,
    // nameTextStyle: { fontSize: 24, color: 'red' },
    axisLabel: {
      color: 'gold',
      fontFamily: styles.fontFamily,
      formatter: function (value, index) {
        value = value / 1000; // go to k
        return Math.round(value * 10) / 10 + 'k';

        // return value / 1000 + 'k';
        // only show full numbers
        // let round = Math.round(value / 1000, 1);
        // let round = value / 1000;
        // if (round % 1 === 0) {
        // return round + 'k';
        // }
      }
    }
  },
  series: [{
    color: styles.colors.primary,
    symbolSize: 1,
    data: [],
    type: 'line',

    // areaStyle: {
    //   normal: {
    //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
    //       offset: 0,
    //       color: 'gold'
    //     }, {
    //       offset: 1,
    //       color: 'orange'
    //     }])
    //   }
    // },
  }
  ,{
    symbolSize: 15,
    data: [],
    // color: 'rgb(37, 140, 249)',
    // color: styles.colors.primary,
    color: styles.colors.primary,
    // color: 'orange',
    type: 'scatter',

  }],

  tooltip: { ...tooltip, formatter: commentFormatter },

};
