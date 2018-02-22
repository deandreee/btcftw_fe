import React from 'react';
import { connect } from 'react-redux';
import * as liveActions from './dux';
import * as appActions from 'app/dux';
import bluebird from 'bluebird';
import * as ws from './ws';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

import Paper from 'material-ui/Paper';
import Item from './Item';
import styles from 'app/styles';

import Loader from './Loader';
import shallowCompare from 'app/shallowCompare';

// https://github.com/mui-org/material-ui/pull/9043/files
// https://github.com/mui-org/material-ui/pull/9043
// https://github.com/chenglou/react-motion#transitionmotion-
// https://github.com/chenglou/react-motion/blob/master/demos/demo3-todomvc-list-transition/Demo.jsx => best actual list example I could find
import { TransitionMotion, spring, presets, Motion } from 'react-motion';

class Price extends React.Component {

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

  getStyles = () => {
    const { priceNow } = this.props;
    return priceNow.map((c, i) => {
      return {
        key: c.ts,
        data: c,
        style: {
          height: spring(20, presets.wobbly),
          // height: 80,
          opacity: spring(1, presets.wobbly),
          // opacity: 1,
        }
      };
    });
  };


  // renderCount = 0;
  render() {

    const horizontal = {
      display: 'flex',
      flexDirection: 'row',
      padding: 0,
    };

    // console.log('live render ', this.renderCount++);

    // let defaultStyles = this.getDefaultStyles();
    let styles = this.getStyles();
    let listStyle = { padding: '0px' };
    let paperStyle = { maxHeight: window.height, overflow: 'auto' };

    return (
      <div>

          <div>

            <Paper style={paperStyle}>

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
                        <div key={key} style={style}>{data.value}</div>
                      )
                  })}
                  </List>
                }
              </TransitionMotion>

          </Paper>

          </div>


      </div>
    )
  }
}

export default connect(state => state.live)(Price);
