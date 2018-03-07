import optionsBTC from 'routes/chart/optionsBTC';
import styles from 'app/styles';
import xAxis from 'chart/xAxis';
import tooltip from 'chart/tooltip';
import commentFormatter from 'chart/commentFormatter'

export default { ...optionsBTC,

  xAxis: { ...xAxis, axisLabel: { ...xAxis.axisLabel, formatter: null }},
  yAxis: {
    min: 500,
    max: 1500,
    axisLabel: {
      color: styles.colors.primary,
      fontFamily: styles.fontFamily,
      formatter: function (value, index) {
        return Math.round(value / 100) / 10 + 'k';
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
    // symbol: 'diamond',
    data: [],
    color: styles.colors.primary,
    type: 'scatter',
    snap: true
  }
]}
