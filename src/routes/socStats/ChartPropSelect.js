import React from 'react';
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
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class ChartPropSelect extends React.Component {

  onChange = (evt, key, value) => {
    this.props.dispatch(socActions.setChartProp(value));
  }

  render() {
    return (
      <div style={{ }}>

        <SelectField
          floatingLabelText="Chart: "
          value={this.props.chartProp}
          onChange={this.onChange}
          fullWidth={true}
        >
          <MenuItem value={"comments_count"} primaryText="Comments (Daily)" />
          <MenuItem value={"posts_count-20"} primaryText="Posts (Daily)" />
          <MenuItem value={"subscribers"} primaryText="Subscribers (Total)" />
          <MenuItem value={"subscribers_diff"} primaryText="Subscribers (New)" />
        </SelectField>

      </div>
    )
  }
}

export default connect(state => state.soc)(ChartPropSelect);
