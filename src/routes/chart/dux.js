import { CALL_API } from 'app/apiMiddleware';
import createReducer from 'app/createReducer';
import options from './optionsBTC';
import * as chartUtils from 'chart/chartUtils';

let initialState = {
  posts: [],
  options,
  btc: [],
  tickers: []
}

export function loadReddit() {
  return {
    [CALL_API]: {
      types: ['CHART/loadReddit'],
      endpoint: '/r/posts',
      method: 'GET'
    }
  };
}

export function loadBtc() {
  return {
    [CALL_API]: {
      types: ['CHART/loadBtc'],
      endpoint: '/r/btc',
      method: 'GET'
    }
  };
}

export function loadTicker() {
  return {
    [CALL_API]: {
      types: ['CHART/loadTicker'],
      endpoint: '/r/ticker-xbtusd',
      method: 'GET'
    }
  };
}

export function addPost(x, y, post, dateBeforeIndex) {
  return { type: 'CHART/addPost', x, y, post, dateBeforeIndex };
}

export function massMerge(data) {
  return { type: 'CHART/massMerge', data };
}

export function setBtcData(btc) {
  return { type: 'CHART/setBtcData', btc };
}

export function onTicker(ticker) {
  return { type: 'CHART/onTicker', ticker };
}

export default createReducer(initialState, {

  'CHART/loadReddit/SUCCESS'(state, action) {
    return { ...state, posts: action.posts };
  },

  'CHART/loadTicker/SUCCESS'(state, action) {
    let tickers = action.tickers.map(x => [x.ts, parseFloat(x.c[0])]);
    return { ...state, tickers: action.tickers,
      options: { ...state.options,
          series: [
            { ...state.options.series[0], data: [ ...state.options.series[0].data, ...tickers ] },
            { ...state.options.series[1] }
          ]
        }
      };
  },

  'CHART/loadBtc/SUCCESS'(state, action) {
    let { btc } = action;
    let { min, max } = chartUtils.getMinMax(btc.values.map(x => x.y));
    return { ...state, btc, options: { ...state.options,
      yAxis: { ...state.options.yAxis, min, max },
      series: [{
      ...state.options.series[0], data: btc.values.map(x => [x.x * 1000, x.y]) }, {
        ...state.options.series[1]
    }]}};
  },

  'CHART/addPost'(state, action) {
    let { x, y, post, dateBeforeIndex } = action;
    let newData = [ x, y, post.title ];

    let data = state.options.series[0].data;
    let dataBefore = data.slice(0, dateBeforeIndex + 1);
    let dataAfter = data.slice(dateBeforeIndex + 1, data.length);

    return { ...state, options: { ...state.options, series: [{ ...state.options.series[0],
      data: [ ...dataBefore, newData, ...dataAfter ] }] }
    };
  },

  'CHART/massMerge'(state, action) {
    return { ...state, options: { ...state.options, series: [{ ...state.options.series[0] }, { ...state.options.series[1],
      data: action.data }] }
    };
  },

  'CHART/onTicker'(state, action) {
    let x = action.ticker;
    let ticker = [x.ts, parseFloat(x.c[0])];

    return { ...state, tickers: [ ...action.tickers, x ],
      options: { ...state.options,
          series: [
            { ...state.options.series[0], data: [ ...state.options.series[0].data, ticker ] },
            { ...state.options.series[1] }
          ]
        }
      };
  }

  // 'CHART/massMergeTickers'(state, action) {
  //   let tickers = action.tickers.map(x => [x.ts, x.c[0]]);
  //   console.log('tickers', tickers);
  //   return { ...state, options: { ...state.options,
  //       series: [
  //         { ...state.options.series[0], data: [ ...state.options.series[0].data, ...tickers ] },
  //         { ...state.options.series[1] }
  //       ]
  //     }
  //   };
  // },

});
