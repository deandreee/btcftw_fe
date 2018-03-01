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
  block: {
    maxWidth: 250,
  },
  radioButton: {
    marginBottom: 16,
  },
};

class Filters extends React.Component {

  onChange = (evt, value) => {
    this.props.dispatch(socActions.filterByTop(value));
  }

  render() {
    return (
      <div style={{ }}>
        <RadioButtonGroup name="shipSpeed" defaultSelected="not_light" onChange={this.onChange} /* style={{ display: 'flex', width: 'auto' }}*/ >

          <RadioButton
            value="top10"
            label="Top10"
            style={radioStyles.radioButton}
          />

          <RadioButton
            value="top10-20"
            label="Top10-20"
            style={radioStyles.radioButton}
          />

          <RadioButton
            value="top20-30"
            label="Top20-30"
            style={radioStyles.radioButton}
          />

        </RadioButtonGroup>
      </div>
    )
  }
}

export default connect(state => state.soc)(Filters);
