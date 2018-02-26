import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';
import { withRouter } from "react-router-dom";
import styles from 'app/styles';
// import Loader from "app/live/Loader";
import Badge from 'material-ui/Badge';
import { connect } from 'react-redux';

const text = {
  color: styles.colors.primary,
  fontFamily: styles.fontFamily,
  backgroundColor: styles.colors.background
};

class TabsExampleSimple extends React.Component {

  state = {
    selected: window.location.pathname !== '/' ? window.location.pathname : '/btc'
  }

  handleActive = (tab) =>  {
    this.props.history.push(tab.props.value);
    this.setState({ selected: tab.props.value });
  }

  render() {

    {/* style={{position: "fixed", top: "0px", width:"100%", height: '50px' }} */}

    let badge = <Badge badgeContent={this.props.comments.length} secondary={true} badgeStyle={{ top: 12, right: 0 }}>LIVE</Badge>

    return (
      <div>
      <Tabs value={this.state.selected}>
        <Tab label="BTC 1mo" style={text} value="/btc" onActive={this.handleActive} />
        <Tab label="BTC 24h" style={text} value="/btc24" onActive={this.handleActive} />
        <Tab label="ETH 1mo" style={text} value="/eth" onActive={this.handleActive} />
        <Tab label={badge} style={text} value="/live" onActive={this.handleActive} />
        <Tab label="Soc" style={text} value="/soc" onActive={this.handleActive} />
        
      </Tabs>
      </div>
    );
  }
}

export default connect(state => state.live)(withRouter(TabsExampleSimple));
