import React from 'react';
import { connect } from 'react-redux';
import * as socActions from './dux';
import ReactGA from 'react-ga';
import 'echarts/lib/component/legendScroll';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import md from 'utils/md';

class ChartPropSelect extends React.Component {

  onChange = (evt, key, value) => {

    ReactGA.event({
      category: 'socStats',
      action: 'setChartProp',
      label: value
    });

    this.props.dispatch(socActions.setChartProp(value));
  }

  style = {
    width: window.screen.availWidth < 400 ? '150px' : '200px'
  }

  render() {
    return (
      <div style={{ }}>

        <SelectField
          floatingLabelText="Chart: "
          value={this.props.chartProp}
          onChange={this.onChange}
          style={this.style}
          fullWidth={true}
        >
          <MenuItem value={"comments_count"} primaryText="Comments (Daily)" />
          <MenuItem value={"posts_count"} primaryText="Posts (Daily)" />
          <MenuItem value={"subscribers"} primaryText="Subscribers (Total)" />
          <MenuItem value={"subscribers_diff"} primaryText="Subscribers (New)" />
          <MenuItem value={"active_user_count"} primaryText="Active Users" />
        </SelectField>

      </div>
    )
  }
}

export default connect(state => state.soc)(ChartPropSelect);
