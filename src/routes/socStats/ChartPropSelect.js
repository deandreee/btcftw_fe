import React from 'react';
import { connect } from 'react-redux';
import * as socActions from './dux';
import ReactGA from 'react-ga';
import 'echarts/lib/component/legendScroll';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class ChartPropSelect extends React.Component {

  onChange = (evt, key, value) => {

    ReactGA.event({
      category: 'socStats',
      action: 'setChartProp',
      label: value
    });

    this.props.dispatch(socActions.setChartProp(value));
  }

  render() {
    return (
      <div style={{ }}>

        <SelectField
          floatingLabelText="Chart: "
          value={this.props.chartProp}
          onChange={this.onChange}
          style={{ width: '200px' }}
          fullWidth={true}
        >
          <MenuItem value={"comments_count"} primaryText="Comments (Daily)" />
          <MenuItem value={"posts_count"} primaryText="Posts (Daily)" />
          <MenuItem value={"subscribers"} primaryText="Subscribers (Total)" />
          <MenuItem value={"subscribers_diff"} primaryText="Subscribers (New)" />
        </SelectField>

      </div>
    )
  }
}

export default connect(state => state.soc)(ChartPropSelect);
