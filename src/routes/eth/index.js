import React from 'react';
import { connect } from 'react-redux';
import ReactEcharts from 'echarts-for-react';
import * as chartActions from './dux';
import * as actions from './dux';
import * as appActions from 'app/dux';
import bluebird from 'bluebird';
import ReactGA from 'react-ga';
import styles from 'app/styles';
import showInitTooltip from 'chart/showInitTooltip';
import shallowCompare from 'app/shallowCompare';
import * as utilsObj from 'utils/obj';
// import * as test from './test';

class ChartEth extends React.Component {

  state = {
    isLoading: true
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    // TODO: need to think here about which props to compare
    let propsToCompare = [ 'posts', 'options' ];
    let component = { props: utilsObj.pick(this.props, propsToCompare), state: this.state }
    let res = shallowCompare(component, utilsObj.pick(nextProps, propsToCompare), nextState);
    // console.log('eth: shouldComponentUpdate', res);
    return res;
  }

  componentWillMount = async() => {

    ReactGA.event({
      category: 'eth',
      action: 'componentWillMount'
    });

    // this.props.dispatch(appActions.log('ui/eth: componentWillMount'));

    await bluebird.all([
      this.props.dispatch(actions.loadEth()),
      this.props.dispatch(actions.loadReddit())
    ]);

    await this.massMerge();

    this.setState({ isLoading: false });

    showInitTooltip(this.echarts_react, 1);

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

    let { options, posts } = this.props.eth;
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

        if (post.date > dataBtc[0][0] && post.date < dataBtc[dataBtc.length - 1][0]) {

          let dateBeforeIndex = this.getDateBeforeIndex(data, post);
          let y = this.getY(dataBtc, post);
          let x = post.date;

          let newData = [ x, y, post.title, post.permalink ];

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

    this.props.dispatch(actions.massMerge(data));
  }

  getOption = () => {

    let { options, posts } = this.props.eth;
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
    //   this.props.dispatch(appActions.log('ui/eth: click'));
    //   // window.open(`https://reddit.com/${permalink}`);
    // }

    ReactGA.event({
      category: 'eth',
      action: 'graphClick'
    });

  }

  render() {
    return (
      <div style={{ }}>

          {/* <h1 style={{ fontFamily: styles.fontFamily, textAlign: 'center', color: 'rgb(78,142,233)', marginTop: '0px', marginBottom: '0px', paddingTop: '20px' }}>
            Ethereum vs Reddit Events
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

      </div>
    )
  }
}

export default connect(state => state)(ChartEth);
