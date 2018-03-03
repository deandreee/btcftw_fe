import { connect } from 'react-redux';
import ReactEcharts from 'echarts-for-react';  // or var ReactEcharts = require('echarts-for-react');
import * as socActions from './dux';
import * as appActions from 'app/dux';
import bluebird from 'bluebird';
import * as ws from 'routes/live/ws';
import ReactGA from 'react-ga';
// import CommentsHor from './CommentsHor';
import shallowCompare from 'app/shallowCompare';
import styles from 'app/styles';
import access from 'safe-access';
import 'echarts/lib/component/legendScroll';
import * as utilsObj from 'utils/obj';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';import React from 'react';

const radioStyles = {
  group: {
    display: 'flex',
    flexDirection: 'row'
  },
  radioButton: {
    // marginRight: 5,
    // width: 'auto',
    // display: 'inline-block',
    width: '150px',
    display: 'inline-block'
  },
  labelStyle: {
    fontFamily: styles.fontFamily,
    // color: styles.colors.primary,
    color: 'white',
    fontSize: '12px'
  }
};

class ChartProp extends React.Component {

  onChange = (evt, value) => {
    this.props.dispatch(socActions.setChartProp(value));
  }

  render() {
    return (
      <div style={{ }}>
        <RadioButtonGroup name="soc-chart-prop" defaultSelected="comments_count" onChange={this.onChange} style={radioStyles.group} >

          <RadioButton
            value="comments_count"
            label="Comments (Daily)"
            style={radioStyles.radioButton}
            labelStyle={radioStyles.labelStyle}
          />

          <RadioButton
            value="posts_count"
            label="Posts (Daily)"
            style={radioStyles.radioButton}
            labelStyle={radioStyles.labelStyle}
          />

          <RadioButton
            value="subscribers"
            label="Subscribers (Total)"
            style={radioStyles.radioButton}
            labelStyle={radioStyles.labelStyle}
          />

          <RadioButton
            value="subscribers_diff"
            label="Subscribers (New)"
            style={radioStyles.radioButton}
            labelStyle={radioStyles.labelStyle}
          />

        </RadioButtonGroup>

      </div>
    )
  }
}

export default connect(state => state.soc)(ChartProp);
