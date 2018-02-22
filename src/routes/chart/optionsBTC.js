// import btc from './btc';
import splitter from './splitter';
import MobileDetect from 'mobile-detect';
let md = new MobileDetect(window.navigator.userAgent);

let graphColor = 'gold';
// let graphColor = 'rgb(0,253,255)';

export default {

  grid: {
    left: '50px',
    right: '10px',
    top: '30px'
  },

  backgroundColor: 'rgb(34,47,53)',

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
  //
  //   // not sure anymore if this is needed for zoom
  //   dataZoom: [{
  //     type: 'inside',
  //     throttle: 50
  //   }],

    // legend: {
    //   textStyle: { fontFamily: `'Saira', sans-serif`, fontSize: 24 }
    // },
    xAxis: {
      type: 'time',
      // min: Date.now() - 1000 * 60 * 60 * 24, // 24h
      // nameTextStyle: { fontFamily: `'Saira', sans-serif`, fontSize: 24 }
      // labels: {
      //   textStyle: { fontSize: '25px' },
      //   nameTextStyle: { color: 'red' },
      //   fontFamily: `'Saira', sans-serif`
      // },
      // labelTextColor: 'red'
      axisLabel: { color: graphColor, fontFamily: `'Saira', sans-serif` }
    },
    yAxis: {
      min: 6000,
      max: 18000,
      // nameTextStyle: { fontSize: 24, color: 'red' },
      axisLabel: {
        color: graphColor,
        fontFamily: `'Saira', sans-serif`,
        formatter: function (value, index) {
          return Math.round(value / 1000) + 'k';
        }
      }
    },
    tooltip: {
      show: true,
      trigger: 'item',
      triggerOn: 'click',
      borderColor: graphColor,
      borderWidth: 3,
      textStyle: { fontFamily: `'Saira', sans-serif` },
      backgroundColor: 'rgba(55,55,55,0.9)', // default opacity 0.7, let's make a bit more dark
      // http://echarts.baidu.com/echarts2/doc/example/tooltip.html
      formatter: function (params,ticket,callback) {
          // console.log(params, ticket);

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
        color: graphColor,
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
      color: graphColor,
      type: 'scatter'
    }
  ]
};
