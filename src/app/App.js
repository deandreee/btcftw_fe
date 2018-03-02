import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from 'routes/chart';
import BTC24 from 'routes/btc24';
import ChartEth from 'routes/eth';
import Live from 'routes/live';
import ReactGA from 'react-ga';
import config from 'app/config';
import createHistory from 'history/createBrowserHistory';
import Nav from './Nav';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import Nav2 from './Nav2';
import * as btc24Actions from 'routes/btc24/dux';
import * as liveActions from 'routes/live/dux';
import * as ws from 'routes/live/ws';

import {
  Router,
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom'

// import AppBar, { FlexibleSpace, TabBar, ToolBar } from 'material-ui-scrolling-techniques/src/AppBar';

import BottomPrices from 'routes/live/BottomPrices';
import SocStats from 'routes/socStats';

import './layout.css';
import styles from 'app/styles';

const history = createHistory()
history.listen((location, action) => {
  // console.log('history', location.pathname);
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
});

class App extends Component {

  constructor() {

    super();

    // Add your tracking ID created from https://analytics.google.com/analytics/web/#home/
    ReactGA.initialize(config.trackingId);

    // This just needs to be called once since we have no routes in this case.
    ReactGA.pageview(window.location.pathname);
  }

  componentWillMount = () => {
    this.props.dispatch(btc24Actions.loadBtc24h());
    this.props.dispatch(liveActions.loadComments());
    ws.connect(this.props.dispatch);
  }

  getColor = () => {
    let loc = window.location.pathname;
    // console.log('getColor', loc);
    if (loc === '/eth') {
      return 'rgb(78, 142, 233)';
    }
    else if (loc === '/btc') {
      return 'gold';
    }
    else {
      return 'gold';
    }
  }

  theme = getMuiTheme({ ...darkBaseTheme,
    palette: { ...darkBaseTheme.palette, accent1Color: styles.colors.primary, primary1Color: styles.colors.primary }
  });

  render() {

    return (
      <div className="App">
        <Router history={history}>
          <MuiThemeProvider muiTheme={this.theme}>
            <div>

              <div className="modal">

                <div className="modal__header">
                  <Nav2 />
                </div>

                <div className="modal__content">
                  <Switch>
                    {/* <Route exact path="/" component={Chart}/> */}
                    <Route path="/btc" component={Chart}/>
                    <Route path="/eth" component={ChartEth}/>
                    <Route path="/live" component={Live}/>
                    <Route path="/btc24" component={BTC24}/>
                    <Route path="/soc" component={SocStats}/>
                    <Redirect from="/" to="/btc" />
                  </Switch>
                </div>

                <div className="modal__footer">
                  <BottomPrices />
                </div>

            </div>













            {/* <Nav /> */}

            </div>
          </MuiThemeProvider>
        </Router>
      </div>
    );
  }
}

export default connect(state => state)(App);
