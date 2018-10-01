/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global parseInt */

/**
 * 
 * @param {ColorCode (RGB, ..)} color
 * @param {String} label
 * @param {Array} data
 * @param {Boolean} fill
 * @returns {LineChartDataSet}
 */
var LineChartDataSet = function (color, label, data, fill) {
    if (label === undefined) {
        label = "";
    }
    if (data === undefined) {
        data = [];
    }
    if(fill === undefined){
        fill = false;
    }
    this.fill = fill;
    this.label = label;
    this.backgroundColor = "#fff";
    this.lineTension = 0.1;
    this.borderColor = color;
    this.pointBackgroundColor = "#fff";
    this.pointHoverRadius = 5;
    this.pointHoverBackgroundColor = color;
    this.pointRadius = 4;
    this.data = data;
};

LineChartDataSet.prototype.setLabel = function (label) {
    this.label = label;
};

/**
 * 
 * @param {Array} data
 * @returns {undefined}
 */
LineChartDataSet.prototype.setData = function (data) {
    this.data = [];
    this.data = data;
};

LineChartDataSet.prototype.clear = function () {
    this.data = [];
};

LineChartDataSet.prototype.add = function (item) {
    this.data.push(item);
};

var SingleLineChart = function (ctx) {
    this.ctx = ctx;
    this.config = {
        type: 'line',
        data: {
            labels: [],
            datasets: []
        },
        options: {
            responsive: true,
            elements: {
                point: {
                    pointStyle: 'circle'
                }
            },
            tooltips: {
                mode: 'label',
                callbacks: {
                    label: function (tooltipItem, data) {
                        return data.datasets[tooltipItem.datasetIndex].label + ': ' + parseInt(tooltipItem.yLabel).formatMoneyEx(0);
                    }
                }
            },
            hover: {
                mode: 'dataset'
            },
            scales: {
                xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Tháng'
                        }
                    }],
                yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Giá trị'
                        },
                        ticks: {
                            beginAtZero: true,
                            callback: function (value, index, values) {
                                return parseInt(value).formatMoneyEx(0);
                            }
                        }
                    }]
            }
        }
    };
    this.lineChart = new Chart(this.ctx, this.config);
};

/**
 * 
 * @param {String} label
 * @returns {void}
 */
SingleLineChart.prototype.setYaxesLabel = function (label) {
    this.config.options.scales.yAxes[0].scaleLabel.labelString = label;
};

/**
 * 
 * @param {String} label
 * @returns {void}
 */
SingleLineChart.prototype.setXaxesLabel = function (label) {
    this.config.options.scales.xAxes[0].scaleLabel.labelString = label;
};

/**
 * 
 * @param {Array)} data
 * @returns {this}
 */
SingleLineChart.prototype.setData = function (data) {
    var ds = new LineChartDataSet("rgba(75,192,192,1)");
    ds.setData(data);
    this.config.data.datasets = [];
    this.config.data.datasets.push(ds);
};

/**
 * 
 * @param {Array} data
 * @param {Array} key
 * @param {Array} val
 * @param {String} label
 * @returns {undefined}
 */
SingleLineChart.prototype.setDatas = function (data, key, val, label) {

    var ds = new LineChartDataSet("rgba(75,192,192,1)");
    this.config.data.labels = [];

    ds.label = label;
    for (var i = 0; i < data.length; ++i) {
        var d = data[i];
        this.config.data.labels.push(d[key]);
        ds.add(d[val]);
    }

    this.config.data.datasets = [];
    this.config.data.datasets.push(ds);
};

/**
 * 
 * @param {Array:String} labels
 * @returns {undefined}
 */
SingleLineChart.prototype.setLabels = function (labels) {
    this.config.data.labels = [];
    this.config.data.labels = labels;
};

/**
 * For multi charts
 */
/**
 * 
 * @param {Array} data : multi datasets
 * @returns {undefined}
 */
SingleLineChart.prototype.setMultiDataSets = function (data) {
    this.config.data.datasets = [];
    for (var i = 0; i < data.length; ++i) {
        this.config.data.datasets.push(data[i]);
    }
};

SingleLineChart.prototype.update = function () {
    console.log("update chart");
    this.lineChart.update();
};