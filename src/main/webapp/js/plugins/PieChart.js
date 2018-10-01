/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global parseInt, this */

var PieChart = function (ctx) {
    this.ctx = ctx;
    this.config = {
        type: 'pie',
        legend: {
        },
        data: {
            datasets: [
                {
                    data: [],
                    backgroundColor: [],
                    hoverBackgroundColor: []
                }
            ],
            labels: []
        },
        options: {
            responsive: true,
            tooltips: {
                mode: 'label',
                callbacks: {
                    label: function (tooltipItem, data) {
                        var ds = data.datasets[tooltipItem.datasetIndex];
                        return data.labels[tooltipItem.index] + ': ' + parseInt(ds.data[tooltipItem.index]).formatMoneyEx(0);
                    }
                }
            }
        }
    };
    this.pieChart = new Chart(this.ctx, this.config);
};

PieChart.prototype.setData = function (labels, datas, color) {
    var ds = {
        data: datas,
        backgroundColor: color,
        hoverBackgroundColor: color
    };
    this.config.data.datasets = [];
    this.config.data.datasets.push(ds);
    this.config.data.labels = labels;
};

PieChart.prototype.hideExplain = function () {
    this.config.options.legend.display = false;
};

PieChart.prototype.setTitle = function (title) {
    this.config.options.title = {
        display: true,
        position: 'bottom',
        text: title
    };
};

PieChart.prototype.update = function () {
    this.pieChart.update();
};
