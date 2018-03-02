// import btc from './btc';
import splitter from '../btc24/splitter';
import styles from 'app/styles';
import MobileDetect from 'mobile-detect';
import * as chartUtils from 'routes/btc24/chartUtils';
let md = new MobileDetect(window.navigator.userAgent);

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

  xAxis: {
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

  },

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


  tooltip: {
    show: true,
    trigger: 'axis',
    triggerOn: 'click',
    borderColor: styles.colors.primary,
    borderWidth: 3,
    textStyle: { fontFamily: styles.fontFamily },
    backgroundColor: 'rgba(55,55,55,0.9)', // default opacity 0.7, let's make a bit more dark
    // http://echarts.baidu.com/echarts2/doc/example/tooltip.html
    // formatter: function (params,ticket,callback) {
    //     console.log(params, ticket);
    //
    //     if (!params || !params.data) {
    //       return;
    //     }
    //
    //     setTimeout(function (){
    //
    //       let txt = params.data[2] || params.data[1];
    //       if (!txt) {
    //         callback(ticket, txt);
    //       }
    //       else {
    //         // https://stackoverflow.com/questions/7624713/js-splitting-a-long-string-into-strings-with-char-limit-while-avoiding-splittin
    //         // split without breaking words
    //         // let parts = txt.toString().match(/.{1,100}/g);
    //         let length = md.phone() ? 30 : 70;
    //         let parts = splitter(txt, length); // .match(/(.{1,200}(\s|$))\s*/g);
    //         let res = parts.map(x => `<p>${x}</p>`).join('');
    //
    //         let permalink = params.data[3];
    //         if (permalink) {
    //           res += `<a target="_blank" style="color: green" href="https://reddit.com/${permalink}">View in Reddit</a>`;
    //         }
    //
    //         callback(ticket, res);
    //       }
    //
    //     }, 100)
    //
    //     return 'loading';
    // },
    position: md.phone() ? function (pt) { return [10, 10]; } : null,
    // axisPointer: {
    //     // value: '2016-10-7',
    //     axis: 'x',
    //     snap: true,
    //     type: 'line', // line / shadow
    //     // status: true,
    //     lineStyle: {
    //         type: 'dotted', // solid / dashed / dotted
    //         color: styles.colors.primary,
    //         opacity: 0.5,
    //         width: 5
    //     },
    //     label: {
    //         show: false,
    //         formatter: function (params) {
    //             return params.value;
    //         },
    //         backgroundColor: '#004E52'
    //     },
    //     handle: {
    //         show: true,
    //         // size: 0,
    //         // color: '#004E52'
    //     }
    // },
  },

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
    type: 'line',
  }]
};
