import { CALL_API } from 'app/apiMiddleware';
import createReducer from 'app/createReducer';
import options from './optionsSoc';
import * as chartUtils from '../btc24/chartUtils';

let initialState = {
  stats: [],
  series: [],
  subList: [],
  options
}


let getFilterValues = ({ state, value }) => {
  if (value === 'top10') {
    return state.subList.slice(0, 9);
  }
  else if (value === 'top10-20') {
    return state.subList.slice(10, 19);
  }
  else if (value === 'top20-30') {
    return state.subList.slice(20, 29);
  }
  else {
    return state.subList;
  }
}

// stats, series = already filtered
let calcOptions = ({ state, stats, series, subList }) => {

  let min = Math.min(...stats.map(x => x && x.comments_count));
  let max = Math.max(...stats.map(x => x && x.comments_count));

  let dates = stats.map(x => x && x.ts).sort((a, b) => a - b); // asc
  let firstDate =  dates[0];
  let axisPointerValue = dates.find(x => x > firstDate); // choose second for better ui understanding

  // let { min, max } = chartUtils.getMinMax(stats.map(x => x && x.posts_count));

  // let options = { ...state.options,
  //   yAxis: { ...state.options.yAxis, min, max },
  //   series: [{
  //   ...state.options.series[0], data: stats.map(x => x && [ new Date(x.ts).getTime(), x.posts_count ]) }, {
  //     ...state.options.series[1]
  // }]}

  // let legend = { ...state.options.legend, data: subList.map(x => ({ name: x.sub})) };
  let legend = { ...state.options.legend, data: subList.map(x => x.sub) };
  // let selected = legend.data.slice(0, 5);

  let options = { ...state.options,
    yAxis: { ...state.options.yAxis, min, max },
    legend,
    xAxis: { ...state.options.xAxis, axisPointer: { ...state.options.xAxis.axisPointer, value: axisPointerValue }},
    series: series.map(x => ({ type: 'line', name: x.subName, symbolSize: 10,
      data: x.data.map(y => ([ new Date(y.ts).getTime(), y.comments_count ]))
    }))
  }

  return options;
}

let sortSubsByLastValue = ({ state, stats, series, subList }) => {

  let rev = stats.reverse();
  for (let sub of subList) {
    let last = rev.find(x => x.subName === sub.sub)
    if (last) {
      sub.lastValue = last.comments_count;
    }
    // let idx = rev.find(x => x.subName === sub.sub);
    // if (idx >= 0) {
    //   sub.lastValue = stats[idx].comments_count;
    // }
  }

  return subList.sort((a, b) => b.lastValue - a.lastValue);
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

export function filterByTop(value) {
  return { type: 'SOC/filterByTop', value };
}



export default createReducer(initialState, {

  'SOC/loadSocStats/SUCCESS'(state, action) {
    let { stats, series, subList } = action;

    let options = calcOptions({ state, stats, series, subList });
    subList = sortSubsByLastValue({ state, stats, series, subList });

    return { ...state, stats, series, options, subList };
  },

  'SOC/loadSocStats/ERROR'(state, action) {
    return state;
  },

  'SOC/filterByTop'(state, action) {

    let filterValues = getFilterValues({ state, value: action.value }).map(x => x.sub); // ['helloicon', 'zec'];
    let series = state.series.filter(x => filterValues.includes(x.subName)); // subName
    let stats = state.stats.filter(x => filterValues.includes(x.subName)); // subName
    let subList = state.subList.filter(x => filterValues.includes(x.sub)); // subName

    let options = calcOptions({ state, stats, series, subList });
    return { ...state, options }; // only change options !!!
  }

});
