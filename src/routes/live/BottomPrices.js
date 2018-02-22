import React, {Component} from 'react';
import { connect } from 'react-redux';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import styles from 'app/styles';
import PriceCompare from './PriceCompare';

class BottomPrices extends Component {

  state = {
    selectedIndex: 0,
    style: { backgroundColor: styles.colors.background }
  };

  select = (index) => this.setState({selectedIndex: index});

  render() {

    let { pricePrev, priceNow, price24h, price1h } = this.props;

    console.log(`DiffLabel comp: ${pricePrev && pricePrev.close} | now: ${priceNow && priceNow.close}`);

    return (
      <Paper zDepth={0} style={this.state.style}>
        <BottomNavigation selectedIndex={this.state.selectedIndex} style={this.state.style}>

          { priceNow && price24h && <PriceCompare text={'24h'} priceNow={priceNow} priceComp={price24h} /> }
          { priceNow && price1h && <PriceCompare text={'1h'} priceNow={priceNow} priceComp={price1h} /> }
          { priceNow && pricePrev && <PriceCompare text={'now'} priceNow={priceNow} priceComp={pricePrev} showNow={true} /> }

        </BottomNavigation>
      </Paper>
    );
  }
}

export default connect(state => state.live)(BottomPrices);
