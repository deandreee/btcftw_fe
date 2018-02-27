// import btc from './btc';
import splitter from '../btc24/splitter';
import styles from 'app/styles';
import MobileDetect from 'mobile-detect';
let md = new MobileDetect(window.navigator.userAgent);

export default {
  backgroundColor: 'rgb(34,47,53)',

  grid: {
    left: '50px',
    right: '10px',
    top: '30px'
  },

  legend: {
    type: 'scroll',
    orient: 'vertical',
    right: 10,
    top: 20,
    bottom: 20,
    width: 300,
    data: [ ]
  },

  toolbox: {
    show : true,
  },

    xAxis: {
      type: 'time',

      axisLabel: { color: 'gold', fontFamily: `'Saira', sans-serif` },
    },
    yAxis: {
      min: 9500,
      max: 11000,
      // nameTextStyle: { fontSize: 24, color: 'red' },
      axisLabel: {
        color: 'gold',
        fontFamily: `'Saira', sans-serif`,
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
    tooltip : {
      // trigger: 'item',
      trigger: 'item',
      // triggerOn: 'click',
      triggerOn: 'mousemove',
      // formatter: "{c1}"
      formatter: function (params,ticket,callback) {
        console.log('formatted', params);
        // let txt = params.data[2] || params.data[1];
        // if (!txt) {
          // callback(ticket, txt);
        // }
      }
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
    //   // color: 'gold',
    //   // color: 'orange',
    //   type: 'scatter'
    // }
  ]
};
