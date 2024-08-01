let data = JSON.parse(localStorage.getItem('assetData')) || [];

function submitData() {
    const assetName = document.getElementById('assetName').value;
    const openPrice = parseFloat(document.getElementById('openPrice').value);
    const closePrice = parseFloat(document.getElementById('closePrice').value);
    const lowPrice = parseFloat(document.getElementById('lowPrice').value);
    const highPrice = parseFloat(document.getElementById('highPrice').value);

    const newData = {
        assetName,
        openPrice,
        closePrice,
        lowPrice,
        highPrice,
        date: new Date().toISOString().split('T')[0],
    };

    data.push(newData);
    if (data.length > 30) {
        data = data.slice(-30);
    }

    localStorage.setItem('assetData', JSON.stringify(data));
    updateChart();
}

function updateChart() {
    const dates = data.map(item => item.date);
    const values = data.map(item => [item.openPrice, item.closePrice, item.lowPrice, item.highPrice]);

    const chart = echarts.init(document.getElementById('chart'));
    const option = {
        title: {
            text: '数据资产行情',
            left: 'center'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        xAxis: {
            type: 'category',
            data: dates,
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                type: 'candlestick',
                data: values,
            },
        ],
    };
    chart.setOption(option);
}

// 初始化图表
updateChart();
