// hacky, but works
// https://github.com/ecomfe/echarts/blob/master/test/showTip.html
export default (echarts_react, seriesIndex) => {

  seriesIndex = seriesIndex || 0;

  if (!echarts_react) {
    return;
  }

  let echarts_instance = echarts_react.getEchartsInstance();

  if (!echarts_instance) {
    return;
  }

  setTimeout(() => {
    echarts_instance.dispatchAction({
      type: 'showTip',
      seriesIndex,
      dataIndex: 1,
      // position: function () {
      //   return [10, 10];
      // }
    })
  }, 200)
}
