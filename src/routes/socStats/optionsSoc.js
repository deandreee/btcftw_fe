import styles from 'app/styles';
import xAxis from 'chart/xAxis';
import tooltip from 'chart/tooltip';

export default {
  backgroundColor: styles.colors.background,

  grid: {
    left: '50px',
    // right: '140px', // with vert legend right
    right: '10px',
    top: '10px',
    // bottom: '100px'
    // height: 'auto'
  },

  legend: {
    type: 'plain', // 'scroll',
    orient: 'horizontal',
    textStyle: { color: styles.colors.primary, fontFamily: styles.fontFamily },
    left: 30,
    // top: 20,
    bottom: 0,
    // width: 1000,
    height: 200,
    data: [ ]
  },

  toolbox: {
    show : true,
  },

  xAxis: { ...xAxis },

  yAxis: {
    min: 9500,
    max: 11000,
    // nameTextStyle: { fontSize: 24, color: 'red' },
    axisLabel: {
      color: styles.colors.primary,
      fontFamily: styles.fontFamily,
      // formatter: function (value, index) {
      //   value = value / 1000; // go to k
      //   return Math.round(value * 10) / 10 + 'k';
      // }
    }
  },


  tooltip: { ...tooltip },

  color: [
    '#b58900', '#cb4b16', '#dc322f', '#d33682', '#6c71c4', '#268bd2', '#2aa198', '#859900', // solarized original

    // my added, not really working ... :/
    '#002080',
    // '#00ffff', // cyan
    '#0097a7' // color description : Dark cyan.'
  ],
  series: [{
    color: styles.colors.primary,
    symbolSize: 1,
    data: [],
    type: 'line'
  }]
};
