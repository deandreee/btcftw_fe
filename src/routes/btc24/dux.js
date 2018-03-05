import { CALL_API } from 'app/apiMiddleware';
import createReducer from 'app/createReducer';
import options from './optionsBTC';
import * as chartUtils from 'chart/chartUtils';
import ms from 'ms';
import md from 'utils/md';

let initialState = {
  posts: [],
  options,
  isBtc24Loaded: false
}

export function loadReddit() {
  return {
    [CALL_API]: {
      types: ['BTC24/loadReddit'],
      endpoint: `/r/posts24${md.phone() ? '/phone' : ''}`,
      method: 'GET'
    }
  };
}

export function loadBtc24h() {
  return {
    [CALL_API]: {
      types: ['BTC24/loadBtc24h'],
      endpoint: `/r/btc24h`,
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

  'BTC24/loadBtc24h/SUCCESS'(state, action) {
    let { btc } = action;

    let indexToday = btc.Data.findIndex(x => x.time * 1000 >= Date.now() - ms('24h'));
    let dataToday = btc.Data.slice(indexToday);
    let { min, max } = chartUtils.getMinMax(dataToday.map(x => x && x.close));

    return { ...state, btc,
      // isBtc24Loaded: true,
      options: { ...state.options,
        yAxis: { ...state.options.yAxis, min, max },
        series: [{
        ...state.options.series[0], data: dataToday.map(x => x && [ x.time * 1000, x.close ]) }, {
          ...state.options.series[1]
    }]}};
  },

  'BTC24/massMerge'(state, action) {
    return { ...state, options: { ...state.options, series: [{ ...state.options.series[0] }, { ...state.options.series[1],
      data: action.data }] }
    };
  }

});
