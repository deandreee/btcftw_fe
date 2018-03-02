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
import FilterTop from './FilterTop';
import ChartProp from './ChartProp';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import md from 'utils/md';

class SocStats extends React.Component {

  state = {
    isLoading: true
  }

  componentWillMount = async () => {

    ReactGA.event({
      category: 'socStats',
      action: 'componentWillMount'
    });

    // this.props.dispatch(appActions.log('ui/btc: componentWillMount'));
    // ws.connect(this.props.dispatch);

    await this.props.dispatch(socActions.loadSocStats());


    this.setState({ isLoading: false });

    // hacky, but works
    // https://github.com/ecomfe/echarts/blob/master/test/showTip.html
    let echarts_instance = this.echarts_react.getEchartsInstance();
    setTimeout(() => {
      echarts_instance.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex: 1,
        // position: function () {
        //   return [10, 10];
        // }
      })
    }, 500)


  }

  shouldComponentUpdate = (nextProps, nextState) => {
    // TODO: need to think here about which props to compare
    let propsToCompare = [ 'stats', 'options' ];
    let component = { props: utilsObj.pick(this.props, propsToCompare), state: this.state }
    let res = shallowCompare(component, utilsObj.pick(nextProps, propsToCompare), nextState);
    console.log('socStats: shouldComponentUpdate', res);
    return res;
  }

  // onEvents (optional, array(string=>function) )
  click = (evt, ch) => {

    // console.log('click', evt, ch);
    // let permalink = evt.data[3];
    // if (permalink) {
    //   this.props.dispatch(appActions.log('ui/btc: click'));
    //   // window.open(`https://reddit.com/${permalink}`);A
    // }

    ReactGA.event({
      category: 'socStats',
      action: 'graphClick'
    });

  }

  onChartReady = () => {
    console.log('onChartReady')
  }

  titleStyle = {
    fontFamily: styles.fontFamily,
    // color: styles.colors.primary,
    color: 'white',
    fontSize: '12px'
  }

  toolbarStyle = {
    backgroundColor: styles.colors.backgroundColor,
    // color: styles.colors.primary
  }

  render() {
    return (
      <div style={{ }}>

        {/* double line */}
        { md.phone() &&
          <div>
            <Toolbar style={this.toolbarStyle}>
              <ToolbarGroup>
                <ToolbarTitle style={this.titleStyle} text="Filter: " />
                <FilterTop />
              </ToolbarGroup>
            </Toolbar>

            <Toolbar style={this.toolbarStyle}>
              <ToolbarGroup>
                <ToolbarTitle style={this.titleStyle} text="Chart: " />
                <ChartProp />
              </ToolbarGroup>
            </Toolbar>
          </div>
        }

        {/* single line */}
        { !md.phone() &&

          <Toolbar style={this.toolbarStyle}>
            <ToolbarGroup>
              <ToolbarTitle style={this.titleStyle} text="Filter: " />
              <FilterTop />
            </ToolbarGroup>

            <ToolbarGroup>
              <ToolbarTitle style={this.titleStyle} text="Chart: " />
              <ChartProp />
            </ToolbarGroup>

          </Toolbar>
        }

          <ReactEcharts
            ref={(e) => { this.echarts_react = e; }}
            option={this.props.options}
            style={{ height: '500px', width: '100%' }}
            notMerge={true}
            lazyUpdate={true}
            theme={"dark"}
            onEvents={{ click: this.click }}
            showLoading={this.state.isLoading}
            loadingOption={{ color: styles.colors.primary, maskColor: styles.colors.background }}
            onChartReady={this.onChartReady}
          />

      </div>
    )
  }
}

export default connect(state => state.soc)(SocStats);
