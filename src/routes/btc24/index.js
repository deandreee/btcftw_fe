import React from 'react';
import { connect } from 'react-redux';
import ReactEcharts from 'echarts-for-react';  // or var ReactEcharts = require('echarts-for-react');
import * as btc24Actions from './dux';
import * as appActions from 'app/dux';
import bluebird from 'bluebird';
import * as ws from 'routes/live/ws';
import ReactGA from 'react-ga';
import CommentsHor from './CommentsHor';
import shallowCompare from 'app/shallowCompare';
import styles from 'app/styles';
import access from 'safe-access';
import showInitTooltip from 'chart/showInitTooltip';
import * as utilsObj from 'utils/obj';

class Btc24 extends React.Component {

  state = {
    isLoading: true
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    // TODO: need to think here about which props to compare
    let propsToCompare = [ 'posts', 'options' ];
    let component = { props: utilsObj.pick(this.props, propsToCompare), state: this.state }
    let res = shallowCompare(component, utilsObj.pick(nextProps, propsToCompare), nextState);
    console.log('Btc24: shouldComponentUpdate', res);
    return res;
  }

  loadBtc24h = () => {
    if (this.props.btc24.isBtc24Loaded) {
      return bluebird.resolve(); // let's just take from cache
    }
    else {
      return this.props.dispatch(btc24Actions.loadBtc24h());
    }
  }

  componentWillMount = async () => {

    ReactGA.event({
      category: 'btc24',
      action: 'componentWillMount'
    });

    // this.props.dispatch(appActions.log('ui/btc: componentWillMount'));
    // ws.connect(this.props.dispatch);

    await bluebird.all([
      this.loadBtc24h(),
      this.props.dispatch(btc24Actions.loadReddit())
    ]);

    await this.massMerge();
    this.setState({ isLoading: false });

    showInitTooltip(this.echarts_react, 1);

  }

  getDateBeforeIndex = (data, post) => {
    return data.findIndex(x => {
      // sheet this is no longer MS ...
      // WHEN WE CHANGE INTERVAL, THIS ALSO NEEDS TO BE CHANGED!!!
      // now we have a day, in /btc we have month, but what do we need now?
      // let dayMs = 1000 * 60 * 60 * 24;

      // here we don't need dayMs, we just need first index which is bigger than ts
      // return post.date - x[0] <= 0;
      return post.date <= x[0];
    });
  }

  // we don't need slope
  // points are already so close together
  // just take closest and be done with it
  getY = (data, post) => {
    let idx = this.getDateBeforeIndex(data, post);
    return data[idx] && data[idx][1];
  }

  // getY = (data, post) => {
  //
  //   let idx = this.getDateBeforeIndex(data, post);
  //
  //   let dataBefore = data[idx];
  //   let dataAfter = data[idx + 1];
  //
  //   // y
  //   let price1 = dataBefore[1];
  //   let price2 = dataAfter[1];
  //
  //   // x
  //   let date1 = dataBefore[0];
  //   let date2 = dataAfter[0] - date1;
  //
  //   date1 = 0;
  //
  //   let m =  (price2 - price1) / (date2 - date1); // slope
  //   let b = price1; // y intersect
  //
  //   let x = post.date - dataBefore[0];
  //   let y = m*x + b;
  //
  //   // console.log(post);
  //   // console.log(y);
  //
  //   return y;
  // }

  massMerge = () => {

    let { options, posts } = this.props.btc24;
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

        // if (post.date > dataBtc[0][0] && post.date < dataBtc[dataBtc.length - 1][0]) {
        if (post.date > access(dataBtc, '[0][0]') && post.date < access(dataBtc, `[${dataBtc.length - 1}][0]`)) {

          let dateBeforeIndex = this.getDateBeforeIndex(data, post);
          let y = this.getY(dataBtc, post);
          let x = post.date;

          let newData = [ x, y, post.title, post.permalink, post.score ];

          // console.log('inserting', dateBeforeIndex, newData);

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

    this.props.dispatch(btc24Actions.massMerge(data));
  }

  getOption = () => {

    let { options, posts } = this.props.btc24;
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
      category: 'btc24',
      action: 'graphClick'
    });

  }

  render() {
    return (
      <div style={{ }}>

          {/* <h1 style={{ fontFamily: styles.fontFamily, textAlign: 'center', color: 'gold', marginTop: '0px', marginBottom: '0px', paddingTop: '20px' }}>
            Bitcoin vs Reddit Events
          </h1> */}



          <ReactEcharts
            ref={(e) => { this.echarts_react = e; }}
            option={this.getOption()}
            style={{ height: '500px', width: '100%' }}
            notMerge={true}
            lazyUpdate={true}
            theme={"dark"}
            onEvents={{ click: this.click }}
            showLoading={this.state.isLoading}
            loadingOption={{ color: styles.colors.primary, maskColor: styles.colors.background }}
          />

        {/* <CommentsHor /> */}

      </div>
    )
  }
}

export default connect(state => state)(Btc24);
