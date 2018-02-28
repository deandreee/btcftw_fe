// import btc from './btc';
import splitter from './splitter';
import styles from 'app/styles';
import MobileDetect from 'mobile-detect';
let md = new MobileDetect(window.navigator.userAgent);

export default {
  backgroundColor: styles.colors.background,

  grid: {
    left: '50px',
    right: '10px',
    top: '30px'
  },

  // toolbox: {
  //       left: 'center',
  //       itemSize: 25,
  //       top: 55,
  //       feature: {
  //           dataZoom: {
  //             yAxisIndex: 'none',
  //             title: {
  //               zoom: 'Zoom',
  //               back: 'Back'
  //             }
  //           },
  //           restore: { title: 'Reset' }
  //       }
  //   },

    // legend: {
    //   textStyle: { fontFamily: styles.fontFamily, fontSize: 24 }
    // },
    xAxis: {
      type: 'time',
      // min: Date.now() - 1000 * 60 * 60 * 24, // 24h
      // nameTextStyle: { fontFamily: styles.fontFamily, fontSize: 24 }
      // labels: {
      //   textStyle: { fontSize: '25px' },
      //   nameTextStyle: { color: 'red' },
      //   fontFamily: styles.fontFamily
      // },
      // labelTextColor: 'red'
      axisLabel: { color: 'gold', fontFamily: styles.fontFamily },
      // axisPointer: {
      //   value: Date.now() - 1000 * 60 * 60 * 23, // 23h before
      //   snap: true,
      //   lineStyle: {
      //     color: '#004E52',
      //     opacity: 0.5,
      //     width: 2
      //   },
      //   // label: {
      //   //   show: true,
      //   //   // formatter: function (params) {
      //   //   //   return echarts.format.formatTime('yyyy-MM-dd', params.value);
      //   //   // },
      //   //   backgroundColor: '#004E52'
      //   // },
      //   handle: {
      //     show: true,
      //     color: '#004E52'
      //   }
      // },
    },
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
    tooltip: {
      show: true,
      trigger: 'item',
      triggerOn: 'click',
      borderColor: 'gold',
      borderWidth: 3,
      textStyle: { fontFamily: styles.fontFamily },
      backgroundColor: 'rgba(55,55,55,0.9)', // default opacity 0.7, let's make a bit more dark
      // http://echarts.baidu.com/echarts2/doc/example/tooltip.html
      formatter: function (params,ticket,callback) {
          console.log(params, ticket);

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
      },
      position: md.phone() ? function (pt) { return [10, 10]; } : null
    },
    series: [{
        color: 'gold',
        symbolSize: 1,
        data: [], // btc.values.map(x => [x.x * 1000, x.y]),
        type: 'line',
        // markPoint: {
        //         data: [
        //             {type: 'max', name: '最大值'},
        //             {type: 'min', name: '最小值'}
        //         ]
        //     },
    }
    ,{
      symbolSize: 15,

      // maybe later, too big difference
      // symbolSize: function (data) {
      //   // return Math.sqrt(data[2]) / 5e2;
      //   return Math.round(data[4] / 1000); // so 10-40
      //   // return 15; //data[2] / 1000; // so 10-40
      // },

      data: [],
      // color: 'rgb(37, 140, 249)',
      // color: styles.colors.primary,
      color: 'gold',
      // color: 'orange',
      type: 'scatter'
    }
  ]
};
