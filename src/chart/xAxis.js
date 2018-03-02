import styles from 'app/styles';
import * as chartUtils from 'chart/chartUtils';

export default {
  type: 'time',
  // splitLine: { lineStyle: { color: 'white' }},
  axisLabel: {
    color: styles.colors.primary,
    fontFamily: styles.fontFamily,
    formatter: function (value, index) {
      return chartUtils.formatDateShort(value);
    },
  },
  axisPointer: {
    // value: '2016-10-7',
    snap: true,
    type: 'line', // line / shadow
    // status: true,
    lineStyle: {
      type: 'dotted', // solid / dashed / dotted
      color: styles.colors.primary,
      opacity: 0.5,
      width: 5
    },
    label: {
      show: false,
      formatter: function (params) {
        return params.value;
      },
      backgroundColor: '#004E52'
    },
    handle: {
      show: true,
      size: 0,
      // color: '#004E52'
    }
  },
};
