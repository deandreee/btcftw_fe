import optionsBTC from 'routes/chart/optionsBTC';
import styles from 'app/styles';

export default { ...optionsBTC,

  xAxis: {
    type: 'time',
    axisLabel: { color: 'rgb(78,142,233)', fontFamily: styles.fontFamily }
  },
  yAxis: {
    min: 500,
    max: 1500,
    axisLabel: {
      color: 'rgb(78,142,233)',
      fontFamily: styles.fontFamily,
      formatter: function (value, index) {
        return Math.round(value / 100) / 10 + 'k';
      }
    }
  },
  tooltip: { ...optionsBTC.tooltip, borderColor: 'rgb(78,142,233)' },
  series: [{
    color: 'rgb(78,142,233)',
    symbolSize: 1,
    data: [],
    type: 'line',
  }
  ,{
    symbolSize: 15,
    data: [],
    color: 'rgb(78,142,233)',
    type: 'scatter'
  }
]}
