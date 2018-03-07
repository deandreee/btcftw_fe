import styles from 'app/styles';
import xAxis from 'chart/xAxis';
import tooltip from 'chart/tooltip';
import commentFormatter from 'chart/commentFormatter'

export default {

  grid: {
    left: '50px',
    right: '10px',
    top: '30px'
  },

  backgroundColor: styles.colors.background,

  xAxis: { ...xAxis, axisLabel: { ...xAxis.axisLabel, formatter: null }},
  yAxis: {
    min: 6000,
    max: 18000,
    axisLabel: {
      color: styles.colors.primary,
      fontFamily: styles.fontFamily,
      formatter: function (value, index) {
        return Math.round(value / 1000) + 'k';
      }
    }
  },
  tooltip: { ...tooltip, formatter: commentFormatter },
  series: [{
    color: styles.colors.primary,
    symbolSize: 1,
    data: [],
    type: 'line',
  }
  ,{
    symbolSize: 15,
    data: [],
    color: styles.colors.primary,
    type: 'scatter',
    snap: true
  }
]
};
