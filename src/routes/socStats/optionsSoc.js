// import btc from './btc';
import splitter from '../btc24/splitter';
import styles from 'app/styles';
import MobileDetect from 'mobile-detect';
let md = new MobileDetect(window.navigator.userAgent);

export default {
  backgroundColor: styles.colors.background,

  grid: {
    left: '50px',
    right: '140px',
    top: '30px'
  },

  legend: {
    type: 'scroll',
    orient: 'vertical',
    textStyle: { color: styles.colors.primary, fontFamily: styles.fontFamily },
    right: 10,
    top: 20,
    bottom: 20,
    width: 100,
    data: [ ]
  },

  toolbox: {
    show : true,
  },

    xAxis: {
      type: 'time',

      axisLabel: { color: styles.colors.primary, fontFamily: styles.fontFamily },
      axisPointer: {
            value: '2016-10-7',
            snap: true,
            type: 'line',
            lineStyle: {
                type: 'solid', // solid / dashed / dotted
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
    // tooltip: {
    //   show: true,
    //   trigger: 'axis',
    //   triggerOn: 'click',
    //   borderColor: styles.colors.primary,
    //   borderWidth: 3,
    //   textStyle: { fontFamily: styles.fontFamily },
    //   backgroundColor: 'rgba(55,55,55,0.9)', // default opacity 0.7, let's make a bit more dark
    //   // http://echarts.baidu.com/echarts2/doc/example/tooltip.html
    //   formatter: function (params,ticket,callback) {
    //       console.log(params, ticket);
    //
    //       if (!params || !params.data) {
    //         return;
    //       }
    //
    //       setTimeout(function (){
    //
    //         let txt = params.data[2] || params.data[1];
    //         if (!txt) {
    //           callback(ticket, txt);
    //         }
    //         else {
    //           // https://stackoverflow.com/questions/7624713/js-splitting-a-long-string-into-strings-with-char-limit-while-avoiding-splittin
    //           // split without breaking words
    //           // let parts = txt.toString().match(/.{1,100}/g);
    //           let length = md.phone() ? 30 : 70;
    //           let parts = splitter(txt, length); // .match(/(.{1,200}(\s|$))\s*/g);
    //           let res = parts.map(x => `<p>${x}</p>`).join('');
    //
    //           let permalink = params.data[3];
    //           if (permalink) {
    //             res += `<a target="_blank" style="color: green" href="https://reddit.com/${permalink}">View in Reddit</a>`;
    //           }
    //
    //           callback(ticket, res);
    //         }
    //
    //       }, 100)
    //
    //       return 'loading';
    //   },
    //   position: md.phone() ? function (pt) { return [10, 10]; } : null
    // },
    series: [{
        color: styles.colors.primary,
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
    // ,{
    //   symbolSize: 12,
    //
    //   // maybe later, too big difference
    //   // symbolSize: function (data) {
    //   //   // return Math.sqrt(data[2]) / 5e2;
    //   //   return Math.round(data[4] / 1000); // so 10-40
    //   //   // return 15; //data[2] / 1000; // so 10-40
    //   // },
    //
    //   data: [],
    //   // color: 'rgb(37, 140, 249)',
    //   color: styles.colors.primary,
    //   // color: styles.colors.primary,
    //   // color: 'orange',
    //   type: 'scatter'
    // }
  ]
};
