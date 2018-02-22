import React from 'react';
import { connect } from 'react-redux';
import ReactEcharts from 'echarts-for-react';  // or var ReactEcharts = require('echarts-for-react');
import * as chartActions from './dux';
import * as appActions from 'app/dux';
import bluebird from 'bluebird';
import * as ws from 'routes/live/ws';
import ReactGA from 'react-ga';
import shallowCompare from 'app/shallowCompare';
import access from 'safe-access';

class Chart extends React.Component {

  componentWillMount = async () => {

    ReactGA.event({
      category: 'btc',
      action: 'componentWillMount'
    });

    // this.props.dispatch(appActions.log('ui/btc: componentWillMount'));
    // ws.connect(this.props.dispatch);

    await bluebird.all([
      this.props.dispatch(chartActions.loadBtc()),
      this.props.dispatch(chartActions.loadReddit())
    ]);

    await this.massMerge();

    // await this.props.dispatch(chartActions.loadTicker());
    // console.log('data after loadTicker', this.props.chart.options.series[0]);

  }

  shouldComponentUpdate = (nextProps, nextState) => {
    let res = shallowCompare(this, nextProps, nextState);
    // console.log('btc24: shouldComponentUpdate', res);
    return res;
  }

  getDateBeforeIndex = (data, post) => {
    return data.findIndex(x => {
      let dayMs = 1000 * 60 * 60 * 24;
      return post.date - x[0] < dayMs;
    });
  }

  getY = (data, post) => {

    let idx = this.getDateBeforeIndex(data, post);

    let dataBefore = data[idx];
    let dataAfter = data[idx + 1];

    // y
    let price1 = dataBefore[1];
    let price2 = dataAfter[1];

    // x
    let date1 = dataBefore[0];
    let date2 = dataAfter[0] - date1;

    date1 = 0;

    let m =  (price2 - price1) / (date2 - date1); // slope
    let b = price1; // y intersect

    let x = post.date - dataBefore[0];
    let y = m*x + b;

    // console.log(post);
    // console.log(y);

    return y;
  }

  massMerge = () => {

    let { options, posts } = this.props.chart;
    let data = options.series[1].data;
    let dataBtc = options.series[0].data;

    data = [ ...data ];

    for (let post of posts) {

      // if (data.length === 0) {
      //   data = [ post ];
      // }
      // else if (data.length === 1) {
      //   if (data[0].date > post.date) {
      //     data = [ post, data[0] ];
      //   }
      //   else {
      //     data = [ data[0], post ];
      //   }
      // }
      // else {

        if (post.date > access(dataBtc, '[0][0]') && post.date < access(dataBtc, `[${dataBtc.length - 1}][0]`)) {

          let dateBeforeIndex = this.getDateBeforeIndex(data, post);
          let y = this.getY(dataBtc, post);
          let x = post.date;

          let newData = [ x, y, post.title, post.permalink, post.score ];

          let dataBefore = data.slice(0, dateBeforeIndex + 1);
          let dataAfter = data.slice(dateBeforeIndex + 1, data.length);

          data = [ ...dataBefore, newData, ...dataAfter ];
        }
        else {
          // since live data, this should be like few dates before
          // console.log('no place for this ', post.title, new Date(post.date));
        }
      // }
    }

    this.props.dispatch(chartActions.massMerge(data));
  }

  merge = (data, post) => {
    let dateBeforeIndex = this.getDateBeforeIndex(data, post);

    if (dateBeforeIndex >= 0 && dateBeforeIndex !== data.length - 1) {
      let y = this.getY(data, post);
      let x = post.date;

      console.log('added', post.title, new Date(x), dateBeforeIndex);

      this.props.dispatch(chartActions.addPost(x, y, post, dateBeforeIndex));
    }


  }

  getOption = () => {

    let { options, posts } = this.props.chart;
    let data = options.series[0].data;

    // console.log('posts', posts.map(x => new Date(x.date)).join(', '));
    // console.log('data', data.map(x => new Date(x[0])).join(', '));

    // find closest data
    for (let post of posts) {
      let idx = data.findIndex(x => x[0] === post.date);
      if (idx >= 0) {
        // console.log('found', post);
        data[idx] = [ ...data[idx], post.title, post.permalink ];
      }
    }

    return options;
  }

  // onEvents (optional, array(string=>function) )
  click = (evt, ch) => {

    // console.log('click', evt, ch);
    // let permalink = evt.data[3];
    // if (permalink) {
    //   this.props.dispatch(appActions.log('ui/btc: click'));
    //   // window.open(`https://reddit.com/${permalink}`);A
    // }

    ReactGA.event({
      category: 'btc',
      action: 'graphClick'
    });

    //
    // let { options, posts } = this.props.chart;
    // let data = options.series[0].data;
    //
    // let post = posts.find(x => x.title.startsWith('CEO')); // ceo of google ...
    // console.log(post);
    // this.merge(data, post);
  }

  render() {
    return (
      <div style={{ }}>

          {/* <h1 style={{ fontFamily: `'Saira', sans-serif`, textAlign: 'center', color: 'gold', marginTop: '0px', marginBottom: '0px', paddingTop: '20px' }}>
            Bitcoin vs Reddit Events
          </h1> */}

          <ReactEcharts
            option={this.getOption()}
            style={{ height: '500px', width: '100%' }}
            notMerge={true}
            lazyUpdate={true}
            theme={"dark"}
            onEvents={{ click: this.click }}
          />

      </div>
    )
  }
}

export default connect(state => state)(Chart);
