import { CALL_API } from 'app/apiMiddleware';
import createReducer from 'app/createReducer';
import optionsETH from './optionsETH';
import splitter from 'chart/splitter';
import * as chartUtils from 'chart/chartUtils';
import md from 'utils/md';

let initialState = {
  posts: [],
  options: optionsETH,
  eth: []
}

export function loadReddit() {
  return {
    [CALL_API]: {
      types: ['CHART/loadReddit'],
      endpoint: `/r/posts-eth${md.phone() ? '/phone' : ''}`,
      method: 'GET'
    }
  };
}

export function loadEth() {
  return {
    [CALL_API]: {
      types: ['CHART/loadEth'],
      endpoint: '/r/eth',
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

export default createReducer(initialState, {

  'CHART/loadReddit/SUCCESS'(state, action) {
    return { ...state, posts: action.posts };
  },

  'CHART/loadEth/SUCCESS'(state, action) {
    let { eth } = action;
    let { min, max } = chartUtils.getMinMax(eth.values.map(x => x.y));
    return { ...state, eth, options: { ...state.options,
      yAxis: { ...state.options.yAxis, min, max },
      series: [{
      ...state.options.series[0], data: eth.values.map(x => [x.x * 1000, x.y]) }, {
        ...state.options.series[1]
    }]}};
  },

  'CHART/massMerge'(state, action) {
    return { ...state, options: { ...state.options, series: [{ ...state.options.series[0] }, { ...state.options.series[1],
      data: action.data }] }
    };
  },



});
