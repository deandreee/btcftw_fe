import splitter from './splitter';
import styles from 'app/styles';
import md from 'utils/md';
import xAxis from 'chart/xAxis';
import tooltip from 'chart/tooltip';
import * as chartUtils from 'chart/chartUtils'
import echarts from 'echarts'

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
    color: 'gold',
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
    color: 'gold',
    // color: 'orange',
    type: 'scatter',
    tooltip: { ...tooltip, formatter: function (params,ticket,callback) {
      if (!params || !params.data) {
        return;
      }

      setTimeout(function (){

        let txt = params.data[2] || params.data[1];
        if (!txt) {
          callback(ticket, txt);
        }
        else {
          // https://stackoverflow.com/questions/7624713/js-splitting-a-long-string-into-strings-with-char-limit-while-avoiding-splittin
          // split without breaking words
          // let parts = txt.toString().match(/.{1,100}/g);
          let length = md.phone() ? 30 : 70;
          let parts = splitter(txt, length); // .match(/(.{1,200}(\s|$))\s*/g);
          let res = parts.map(x => `<p>${x}</p>`).join('');

          let permalink = params.data[3];
          if (permalink) {
            res += `<a target="_blank" style="color: green" href="https://reddit.com/${permalink}">View in Reddit</a>`;
          }

          callback(ticket, res);
        }

      }, 100)

      return 'loading';
    }},
  }
]
};
