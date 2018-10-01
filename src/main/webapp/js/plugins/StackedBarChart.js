/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global parseInt */

/**
 * 
 * @param {type} label
 * @returns {StackedBarObject}
 */
var StackedBarObject = function (label) {
    this.label = label;
    this.backgroundColor = [];
    this.borderColor = [];
    this.borderWidth = 1;
    this.data = [];
};

StackedBarObject.prototype.addData = function (data) {
    this.data.push(data);
};

var StackedBarChart = function (ctx) {
    this.ctx = ctx;
    this.config = {
        type: 'bar',
        legend: {
        },
        data: {
            labels: [],
            datasets: []
        },
        options: {
            scales: {
                xAxes: [{
                        stacked: true,
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Tháng'
                        }
                    }],
                yAxes: [{
                        stacked: true,
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
    this.stackedBar = new Chart(this.ctx, this.config);
};

StackedBarChart.prototype.setLabels = function (labels) {
    this.config.data.labels = [];
    this.config.data.labels = labels;
};

StackedBarChart.prototype.setDataSet = function (ds) {
    this.config.data.datasets = [];
    for (var i = 0; i < ds.length; ++i) {
        var color = [];
        for (var j = 0; j < ds[i].data.length; ++j) {
            color.push(ds[i].borderColor);
        }
        this.config.data.datasets.push({
            label: ds[i].label,
            data: ds[i].data,
            backgroundColor: color,
            borderColor: color,
            borderWidth: 1
        });
    }
};

/**
 * 
 * @param {String} label
 * @returns {void}
 */
StackedBarChart.prototype.setYaxesLabel = function (label) {
    this.config.options.scales.yAxes[0].scaleLabel.labelString = label;
};

/**
 * 
 * @param {String} label
 * @returns {void}
 */
StackedBarChart.prototype.setXaxesLabel = function (label) {
    this.config.options.scales.xAxes[0].scaleLabel.labelString = label;
};

StackedBarChart.prototype.update = function () {
    this.stackedBar.update();
};

