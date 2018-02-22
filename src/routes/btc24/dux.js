import { CALL_API } from 'app/apiMiddleware';
import createReducer from 'app/createReducer';
import options from './optionsBTC';
import * as chartUtils from './chartUtils';

let initialState = {
  posts: [],
  comments: [],
  options,
  btc: [],
  tickers: [],
  isBtc24Loaded: false
}

export function loadReddit() {
  return {
    [CALL_API]: {
      types: ['BTC24/loadReddit'],
      endpoint: '/r/posts24',
      method: 'GET'
    }
  };
}

export function loadComments() {
  return {
    [CALL_API]: {
      types: ['BTC24/loadComments'],
      endpoint: '/r/comments',
      method: 'GET'
    }
  };
}

export function loadBtc() {
  return {
    [CALL_API]: {
      types: ['BTC24/loadBtc'],
      endpoint: '/r/csv',
      method: 'GET'
    }
  };
}

export function loadBtc24h() {
  return {
    [CALL_API]: {
      types: ['BTC24/loadBtc24h'],
      endpoint: '/r/btc24h',
      method: 'GET'
    }
  };
}

export function massMerge(data) {
  return { type: 'BTC24/massMerge', data };
}

export default createReducer(initialState, {

  'BTC24/loadReddit/SUCCESS'(state, action) {
    return { ...state, posts: action.posts };
  },

  'BTC24/loadComments/SUCCESS'(state, action) {
    return { ...state, comments: action.comments };
  },

  'BTC24/loadBtc/SUCCESS'(state, action) {
    let { btc } = action;

    return { ...state, btc, options: { ...state.options, series: [{
      ...state.options.series[0], data: btc.values.map(x => [x.x, x.y]) }, {
        ...state.options.series[1]
    }]}};
  },

  'BTC24/loadBtc24h/SUCCESS'(state, action) {
    let { btc } = action;

    let { min, max } = chartUtils.getMinMax(btc.Data.map(x => x && x.close));

    return { ...state, btc,
      // isBtc24Loaded: true,
      options: { ...state.options,
        yAxis: { ...state.options.yAxis, min, max },
        series: [{
        ...state.options.series[0], data: btc.Data.map(x => x && [ x.time * 1000, x.close ]) }, {
          ...state.options.series[1]
    }]}};
  },

  'BTC24/massMerge'(state, action) {
    return { ...state, options: { ...state.options, series: [{ ...state.options.series[0] }, { ...state.options.series[1],
      data: action.data }] }
    };
  }

});
