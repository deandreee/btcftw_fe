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
  radioButton: {
    // marginRight: 5,
    // width: 'auto',
    width: '150px',
    // width: 'auto'
    display: 'inline-block',
  },
  labelStyle: {
    fontFamily: styles.fontFamily,
    // color: styles.colors.primary,
    color: 'white',
    fontSize: '12px'
  },
  inputStyle: {
    color: styles.colors.primary,
    fill: styles.colors.primary
  }
};

class FilterTop extends React.Component {

  onChange = (evt, value) => {
    this.props.dispatch(socActions.filterByTop(value));
  }

  render() {
    return (
      <div style={{ }}>
        <RadioButtonGroup defaultSelected="top10" onChange={this.onChange} style={{ display: 'flex' }} >

          <RadioButton
            value="top10"
            label="Top10"
            style={radioStyles.radioButton}
            labelStyle={radioStyles.labelStyle}
            inputStyle={radioStyles.inputStyle}
          />

          <RadioButton
            value="top10-20"
            label="Top10-20"
            style={radioStyles.radioButton}
            labelStyle={radioStyles.labelStyle}
            inputStyle={radioStyles.inputStyle}
          />

          <RadioButton
            value="top20-30"
            label="Top20-30"
            style={radioStyles.radioButton}
            labelStyle={radioStyles.labelStyle}
            inputStyle={radioStyles.inputStyle}
          />

        </RadioButtonGroup>

      </div>
    )
  }
}

export default connect(state => state.soc)(FilterTop);
