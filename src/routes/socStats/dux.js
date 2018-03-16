import { CALL_API } from 'app/apiMiddleware';
import createReducer from 'app/createReducer';
import options from './optionsSoc';
import * as chartUtils from 'chart/chartUtils';

let initialState = {
  stats: [],
  series: [],
  subList: [],
  options,
  filterByTop: "10",
  chartProp: 'comments_count', // ''
}

let start = new Date('2018-02-25T00:00:00.000Z').getTime();
let startTop200 = new Date('2018-03-10T12:54:45.080Z').getTime();

let getFilterValues = ({ subList, value }) => {
  return subList.slice(value - 10, value);
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

  let min, max;

  if (chartProp === 'subscribers_diff') {
    let statsTop200 = stats.filter(x => x.ts >= startTop200);
    min = Math.min(...statsTop200.map(x => x && x[chartProp]));
    max = Math.max(...statsTop200.map(x => x && x[chartProp]));
  }
  else {
    min = Math.min(...stats.map(x => x && x[chartProp]));
    max = Math.max(...stats.map(x => x && x[chartProp]));
  }


  let dates = stats.map(x => x && x.ts).sort((a, b) => a - b); // asc
  let firstDate =  dates[0];
  let axisPointerValue = dates.find(x => x > firstDate); // choose second for better ui understanding

  // let legend = { ...state.options.legend, data: subList.map(x => ({ name: x.sub})) };
  let legend = { ...state.options.legend, data: subList.map(x => x.sub) };
  // let selected = legend.data.slice(0, 5);

  let options = { ...state.options,
    yAxis: { ...state.options.yAxis, min, max },
    // legend, don't really need this since we have tooltip. also, bad position on mobile, so let's skip for now
    xAxis: {
      ...state.options.xAxis,
      axisPointer: { ...state.options.xAxis.axisPointer, value: axisPointerValue },
      min: chartProp === 'subscribers_diff' ? startTop200  : start,
    },
    series: series.map(x => ({
        type: 'line',
        name: x.subName,
        symbolSize: 10,
        color: x.color || null,
        snap: true,
        data: x.data.map(y => ([ new Date(y.ts), y[chartProp] ]))
    }))
  }

  // let's simplify this graph otherwise very diff for users to understand
  if (chartProp === 'subscribers_diff') {
    options = { ...options, xAxis: { ...options.xAxis, min: startTop200  } }
  }
  else {
    let { min, ...xAxis } = options.xAxis;
    options = { ...options, xAxis: { ...xAxis }} // remove min from props (let echarts calculate what is what), null or undef doesnt work
  }

  return options;
}

let sortSubsByLastValue = ({ state, stats, series, subList, chartProp }) => {

  let rev = stats.slice().reverse(); // reverse changes original!!!
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

    subList = sortSubsByLastValue({ state, stats, series, subList, chartProp }); // sort before filter !!!
    let options = calcOptionsWithFilter({ state, stats, series, subList, filterByTop });

    return { ...state, stats, series, options, subList };
  },

  'SOC/loadSocStats/ERROR'(state, action) {
    return state;
  },

  'SOC/filterByTop'(state, action) {
    let { stats, series, subList, chartProp } = state;
    let filterByTop = action.value;

    subList = sortSubsByLastValue({ state, stats, series, subList, chartProp }); // sort before filter !!!
    let options = calcOptionsWithFilter({ state, stats, series, subList, filterByTop });

    return { ...state, options, filterByTop, subList }; // only change options !!!
  },

  'SOC/setChartProp'(state, action) {
    let { stats, series, subList } = state;
    let chartProp = action.value;

    subList = sortSubsByLastValue({ state, stats, series, subList, chartProp }); // sort before filter !!!
    let options = calcOptionsWithFilter({ state, stats, series, subList, chartProp });

    return { ...state, options, chartProp, subList }; // only change options !!!
  },

});
