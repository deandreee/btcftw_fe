import { CALL_API } from 'app/apiMiddleware';
import createReducer from 'app/createReducer';
import options from './optionsSoc';
import * as chartUtils from '../btc24/chartUtils';

let initialState = {
  stats: [],
  options
}

export function loadSocStats() {
  return {
    [CALL_API]: {
      types: ['SOC/loadSocStats'],
      endpoint: '/r/soc-stats',
      method: 'GET'
    }
  };
}

export default createReducer(initialState, {

  'SOC/loadSocStats/SUCCESS'(state, action) {
    let { stats, series, subList } = action;

    let min = Math.min(...stats.map(x => x && x.comments_count));
    let max = Math.max(...stats.map(x => x && x.comments_count));

    // let { min, max } = chartUtils.getMinMax(stats.map(x => x && x.posts_count));

    // let options = { ...state.options,
    //   yAxis: { ...state.options.yAxis, min, max },
    //   series: [{
    //   ...state.options.series[0], data: stats.map(x => x && [ new Date(x.ts).getTime(), x.posts_count ]) }, {
    //     ...state.options.series[1]
    // }]}

    // let legend = { ...state.options.legend, data: subList.map(x => ({ name: x.sub})) };
    let legend = { ...state.options.legend, data: subList.map(x => x.sub) };
    let selected = legend.data.slice(0, 5);

    let options = { ...state.options,
      yAxis: { ...state.options.yAxis, min, max },
      legend,
      series: series.map(x => ({ type: 'line', name: x[0].subName, symbolSize: 10,
        data: x.map(y => ([ new Date(y.ts).getTime(), y.comments_count ]))
      }))
    }

    return { ...state, stats, options };
  },

  'SOC/loadSocStats/ERROR'(state, action) {
    return state;
  }

});
