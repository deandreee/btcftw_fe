import { CALL_API } from 'app/apiMiddleware';
import createReducer from 'app/createReducer';
import options from './optionsSoc';
import * as chartUtils from 'chart/chartUtils';

let initialState = {
  stats: [],
  series: [],
  subList: [],
  options,
  filterByTop: 'top10',
  chartProp: 'comments_count', // ''
}


let getFilterValues = ({ subList, value }) => {
  if (value === 'top10') {
    return subList.slice(0, 9);
  }
  else if (value === 'top10-20') {
    return subList.slice(10, 19);
  }
  else if (value === 'top20-30') {
    return subList.slice(20, 29);
  }
  else {
    return subList;
  }
}

let calcOptionsWithFilter = ({ state, series, stats, subList, filterByTop, chartProp }) => {

  filterByTop = filterByTop || state.filterByTop;
  chartProp = chartProp || state.chartProp;

  let filterValues = getFilterValues({ subList, value: filterByTop }).map(x => x.sub); // ['helloicon', 'zec'];
  series = series.filter(x => filterValues.includes(x.subName)); // subName
  stats = stats.filter(x => filterValues.includes(x.subName)); // subName
  subList = subList.filter(x => filterValues.includes(x.sub)); // sub

  let options = calcOptions({ state, stats, series, subList, chartProp });
  return options;
}

// stats, series = already filtered
let calcOptions = ({ state, stats, series, subList, chartProp }) => {

  let min = Math.min(...stats.map(x => x && x[chartProp]));
  let max = Math.max(...stats.map(x => x && x[chartProp]));

  let dates = stats.map(x => x && x.ts).sort((a, b) => a - b); // asc
  let firstDate =  dates[0];
  let axisPointerValue = dates.find(x => x > firstDate); // choose second for better ui understanding

  // let legend = { ...state.options.legend, data: subList.map(x => ({ name: x.sub})) };
  let legend = { ...state.options.legend, data: subList.map(x => x.sub) };
  // let selected = legend.data.slice(0, 5);

  let options = { ...state.options,
    yAxis: { ...state.options.yAxis, min, max },
    // legend, don't really need this since we have tooltip. also, bad position on mobile, so let's skip for now
    xAxis: { ...state.options.xAxis, axisPointer: { ...state.options.xAxis.axisPointer, value: axisPointerValue }},
    series: series.map(x => ({
        type: 'line',
        name: x.subName,
        symbolSize: 10,
        snap: true,
        data: x.data.map(y => ([ new Date(y.ts), y[chartProp] ]))
    }))
  }

  return options;
}

let sortSubsByLastValue = ({ state, stats, series, subList, chartProp }) => {

  let rev = stats.reverse();
  for (let sub of subList) {
    let last = rev.find(x => x.subName === sub.sub)
    if (last) {
      sub.lastValue = last[chartProp];
    }
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

export function setChartProp(value) {
  return { type: 'SOC/setChartProp', value };
}

export default createReducer(initialState, {

  'SOC/loadSocStats/SUCCESS'(state, action) {
    let { stats, series, subList } = action;
    let { filterByTop, chartProp } = state;

    let options = calcOptionsWithFilter({ state, stats, series, subList, filterByTop });
    subList = sortSubsByLastValue({ state, stats, series, subList, chartProp });

    return { ...state, stats, series, options, subList };
  },

  'SOC/loadSocStats/ERROR'(state, action) {
    return state;
  },

  'SOC/filterByTop'(state, action) {
    let { stats, series, subList, chartProp } = state;
    let filterByTop = action.value;
    let options = calcOptionsWithFilter({ state, stats, series, subList, filterByTop });
    subList = sortSubsByLastValue({ state, stats, series, subList, chartProp });

    return { ...state, options, filterByTop }; // only change options !!!
  },

  'SOC/setChartProp'(state, action) {
    let { stats, series, subList } = state;
    let chartProp = action.value;
    let options = calcOptionsWithFilter({ state, stats, series, subList, chartProp });
    subList = sortSubsByLastValue({ state, stats, series, subList, chartProp });

    return { ...state, options, chartProp, subList }; // only change options !!!
  },

});
