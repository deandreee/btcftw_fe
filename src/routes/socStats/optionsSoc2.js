function makeSeries(seriesCount, categoryCount) {
    var series = [];
    var legendData = [];
    var xAxisData = [];
    for (var j = 0; j < categoryCount; j++) {
        xAxisData.push('category' + j);
    }
    for (var i = 0; i < seriesCount; i++) {
        var data = [];
        for (var j = 0; j < categoryCount; j++) {
            data.push(+(Math.random() + 0.5).toFixed(3));
        }
        var seriesName = 'line' + i;
        series.push({
            name: seriesName,
            type: 'line',
            stack: 'all',
            symbol: 'circle',
            symbolSize: 10,
            data: data,
            step: 'end'
        });
        legendData.push(seriesName);
    }
    return {
        series: series,
        legendData: legendData,
        xAxisData: xAxisData
    }
}
var xAxisData = [];
var data1 = [];
var data2 = [];
var data3 = [];
for (var i = 0; i < 100; i++) {
    xAxisData.push('类目' + i);
    if (i < 5 && i > 1) {
        data1.push(0);
    }
    else {
        data1.push(+(Math.random() + 0.5).toFixed(3));
    }
    data2.push(+(Math.random() + 0.5).toFixed(3));
    data3.push(+(Math.random() + 0.5).toFixed(3));
}
var seriesInfo = makeSeries(10, 3);
var option = {
    legend: {
        right: 10,
        width: 300,
        data: seriesInfo.legendData,
        backgroundColor: 'rgba(0,100,50,0.2)'
    },
    tooltip: {
    },
    grid: {
        top: 100,
    },
    xAxis: {
        data: seriesInfo.xAxisData
    },
    yAxis: {
        splitArea: {
            show: true
        }
    },
    series: seriesInfo.series
};

export default option;
