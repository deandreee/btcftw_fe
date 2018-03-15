import React from 'react';
import { connect } from 'react-redux';
import * as socActions from './dux';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import ReactGA from 'react-ga';
import md from 'utils/md';

class FilterTopSelect extends React.Component {

  onChange = (evt, key, value) => {

    ReactGA.event({
      category: 'socStats',
      action: 'filterByTop',
      label: value
    });

    this.props.dispatch(socActions.filterByTop(value));
  }

  style = {
    width: window.screen.availWidth < 400 ? '150px' : '200px'
  }

  render() {
    return (
      <div style={{ }}>

        <SelectField
          floatingLabelText="Filter: "
          value={this.props.filterByTop}
          onChange={this.onChange}
          style={this.style}
          fullWidth={true}
        >
          <MenuItem value={"10"} primaryText="Top10" />
          <MenuItem value={"20"} primaryText="Top10-20" />
          <MenuItem value={"30"} primaryText="Top20-30" />
          <MenuItem value={"40"} primaryText="Top30-40" />
          <MenuItem value={"50"} primaryText="Top40-50" />
          <MenuItem value={"60"} primaryText="Top50-60" />
          <MenuItem value={"70"} primaryText="Top60-70" />
          <MenuItem value={"80"} primaryText="Top70-80" />
          <MenuItem value={"90"} primaryText="Top80-90" />
          <MenuItem value={"100"} primaryText="Top90-100" />
          <MenuItem value={"110"} primaryText="Top100-110" />
          <MenuItem value={"120"} primaryText="Top110-120" />
          <MenuItem value={"130"} primaryText="Top120-130" />
          <MenuItem value={"140"} primaryText="Top130-140" />
          <MenuItem value={"150"} primaryText="Top140-150" />
          <MenuItem value={"160"} primaryText="Top150-160" />
          <MenuItem value={"170"} primaryText="Top160-170" />
          <MenuItem value={"180"} primaryText="Top170-180" />
          <MenuItem value={"190"} primaryText="Top180-190" />
          <MenuItem value={"200"} primaryText="Top190-200" />
          <MenuItem value={"210"} primaryText="Top200+" />
        </SelectField>

      </div>
    )
  }
}

export default connect(state => state.soc)(FilterTopSelect);
