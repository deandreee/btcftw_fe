import React from 'react';
import { connect } from 'react-redux';
import ReactEcharts from 'echarts-for-react';  // or var ReactEcharts = require('echarts-for-react');
import * as liveActions from './dux';
import * as appActions from 'app/dux';
import bluebird from 'bluebird';
import { ChatFeed, Message } from 'react-chat-ui';
import * as ws from './ws';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

import Paper from 'material-ui/Paper';
import Item from './Item';
import styles from 'app/styles';

import Loader from './Loader';
import Price from './Price';
import shallowCompare from 'app/shallowCompare';

import BottomPrices from './BottomPrices';
import MotionSequence from './MotionSequence';
import ReactGA from 'react-ga';

// https://github.com/mui-org/material-ui/pull/9043/files
// https://github.com/mui-org/material-ui/pull/9043
// https://github.com/chenglou/react-motion#transitionmotion-
// https://github.com/chenglou/react-motion/blob/master/demos/demo3-todomvc-list-transition/Demo.jsx => best actual list example I could find
import { TransitionMotion, spring, presets, Motion } from 'react-motion';

class Live extends React.Component {

  componentWillMount = () => {

    ReactGA.event({
      category: 'live',
      action: 'componentWillMount'
    });

    // this.props.dispatch(appActions.log('ui/live: componentWillMount'));
    // ws.connect(this.props.dispatch);

    this.props.dispatch(liveActions.loadComments());
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    // jus testin
    let res = shallowCompare(this, nextProps, nextState);
    console.log('Live: shouldComponentUpdate', res);
    return res;
  }

  willEnter() {
    return {
      // height: spring(80, presets.gentle),
      // height: spring(0, presets.wobbly),
      height: 0,
      opacity: 1,
    };
  };

  willLeave() {
    return {
      // height: spring(0),
      opacity: spring(0),
    };
  };


  getDefaultStyles = () => {
    return this.props.comments.map(c => ({ key: c.permalink, data: c, style: { height: 80, opacity: 1 }}));
  };

  getStyles = () => {
    const { comments } = this.props;
    return comments.map((c, i) => {
      return {
        key: c.permalink,
        data: c,
        style: {
          height: spring(88, presets.wobbly),
          // height: 80,
          opacity: spring(1, presets.wobbly),
          // opacity: 1,
        }
      };
    });
  };

  onClick = () => {
    this.props.dispatch(liveActions.onComment({ body: 'hello', permalink: Date.now() + '', author: 'whatever' }));

    let price = { ts: Date.now(), value: Math.round(Math.random() * 1000 * 100) / 100 };
    this.props.dispatch(liveActions.onCurrentPriceChange(price));
    // setTimeout(() => {
    //   this.props.dispatch(liveActions.onCurrentPriceChangeEnd(price));
    // }, 1000);
  }

  // renderCount = 0;
  render() {

    const horizontal = {
      display: 'flex',
      flexDirection: 'row',
      padding: 0,
    };

    // console.log('live render ', this.renderCount++);

    let defaultStyles = this.getDefaultStyles();
    let styles = this.getStyles();
    let listStyle = { padding: '0px' };
    let paperStyle = { maxHeight: window.height, overflow: 'auto' };
    {/* style={{ position: 'fixed', top: '100px', maxHeight: '100%' }} */}

    return (
      <div>

          {/* <h1 style={{ fontFamily: `'Saira', sans-serif`, textAlign: 'center', color: 'gold', marginTop: '0px', marginBottom: '0px', paddingTop: '20px' }}>
            LIVE
          </h1> */}

          {/* <div style={{ width: '30%' }}> */}
          <div>

            <Paper style={paperStyle}>

              {/* <MotionSequence styles={[
                { height: 0 },
                { height: spring(30) },
                { height: spring(100) },
                { height: spring(50) }
              ]}>
              {interpolatingStyle => <div style={{...interpolatingStyle, border: '1px solid' }} />}
            </MotionSequence> */}

              {/* <Price /> */}

              {/* <TransitionMotion
                styles={this.getDefaultStyles()}
                willLeave={this.willLeave}
                willEnter={this.willEnter}>

                <List style={{ padding: '0px' }}>
                  {this.props.comments.map((x, i) => {

                    return (
                      <div key={`${x.author}_${i}`}>
                        <Item comment={x} />
                        <Divider inset={true} />
                      </div>
                    )
                  }

                  )}
                </List>
            </TransitionMotion> */}

            {/* <List style={listStyle}>
              {this.props.comments.map(c => {
                return <Item key={c.permalink} comment={c} onClick={this.onClick} />
              })}
            </List> */}

            {/* <List style={listStyle}>
              {this.props.comments.map(data => {
                return (
                  <div key={data.permalink}>
                    <Item comment={data} onClick={this.onClick} />
                    <Divider inset={true} />
                  </div>
                )
            })}
            </List>*/}

            {/**/}
            <TransitionMotion
              willLeave={this.willLeave}
              willEnter={this.willEnter}
              styles={styles}
            >
              {interpolatedStyles =>
                // first render: a, b, c. Second: still a, b, c! Only last one's a, b.
                <List style={listStyle}>
                  {interpolatedStyles.map(config => {
                    let { key, style, data } = config;
                    return (
                      <div key={key} style={style}>
                        <Item comment={data} onClick={this.onClick} />
                        <Divider inset={true} />
                      </div>
                    )
                })}
                </List>
              }
            </TransitionMotion>


          </Paper>

            {/* <ChatFeed
              messages={this.props.comments}
              isTyping={true}
              hasInputField={false}
              showSenderName
              bubblesCentered={true}
              bubbleStyles={
                {
                  text: {
                    fontSize: 12,
                    fontFamily: `'Saira', sans-serif`
                  },
                  chatbubble: {
                    borderRadius: 50,
                    padding: 20
                  }
                }
              }
              /> */}
          </div>
      </div>
    )
  }
}

export default connect(state => state.live)(Live);
