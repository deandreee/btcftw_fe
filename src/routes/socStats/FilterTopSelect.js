import React from 'react';
import { connect } from 'react-redux';
import * as socActions from './dux';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import ReactGA from 'react-ga';

class FilterTopSelect extends React.Component {

  onChange = (evt, key, value) => {

    ReactGA.event({
      category: 'socStats',
      action: 'filterByTop',
      label: value
    });

    this.props.dispatch(socActions.filterByTop(value));
  }

  render() {
    return (
      <div style={{ }}>

        <SelectField
          floatingLabelText="Filter: "
          value={this.props.filterByTop}
          onChange={this.onChange}
          style={{ width: '200px' }}
          fullWidth={true}
        >
          <MenuItem value={"top10"} primaryText="Top10" />
          <MenuItem value={"top10-20"} primaryText="Top10-20" />
          <MenuItem value={"top20-30"} primaryText="Top20-30" />
        </SelectField>

      </div>
    )
  }
}

export default connect(state => state.soc)(FilterTopSelect);
