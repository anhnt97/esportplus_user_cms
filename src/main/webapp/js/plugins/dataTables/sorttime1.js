/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$.extend($.fn.dataTableExt.oSort, {
    "my_date_time-pre": function (a) {
        if (a === null || a === "") {
            return 0;
        }
        var ukDatea = a.split('/');
        return (ukDatea[2] + ukDatea[1] + ukDatea[0]) * 1;
    },
    "my_date_time-asc": function (a, b) {
        return ((a < b) ? -1 : ((a > b) ? 1 : 0));
    },
    "my_date_time-desc": function (a, b) {
        return ((a < b) ? 1 : ((a > b) ? -1 : 0));
    },
    "yyyyMMdd-pre": function (a) {
        if (a === null || a === "") {
            return 0;
        }
        var ukDatea = a.split('-');
        return (ukDatea[2] + ukDatea[1] + ukDatea[0]) * 1;
    },
    "yyyyMMdd-asc": function (a, b) {
        return ((a < b) ? -1 : ((a > b) ? 1 : 0));
    },
    "yyyyMMdd-desc": function (a, b) {
        return ((a < b) ? 1 : ((a > b) ? -1 : 0));
    },
    "hour_sort-pre": function (a) {
        if (a === null || a === "") {
            return 0;
        }
        var ukDatea = a.split('h');
        return ukDatea[0] * 1;
    },
    "hour_sort-asc": function (a, b) {
        return ((a < b) ? -1 : ((a > b) ? 1 : 0));
    },
    "hour_sort-desc": function (a, b) {
        return ((a < b) ? 1 : ((a > b) ? -1 : 0));
    },
    "date3-pre": function (a) {
        if (a === null || a === "") {
            return 0;
        }
        var ukDatea = a.split('/');
        return (ukDatea[0] + ukDatea[1] + ukDatea[2]) * 1;
    },
    "date3-asc": function (a, b) {
        return ((a < b) ? -1 : ((a > b) ? 1 : 0));
    },
    "date3-desc": function (a, b) {
        return ((a < b) ? 1 : ((a > b) ? -1 : 0));
    },
    "num_sort_reserve-pre": function (a) {
        if (a === null || a === "") {
            return 0;
        }
        return parseInt(a) | 0;
    },
    "num_sort_reserve-asc": function (a, b) {
        return ((a < b) ? 1 : ((a > b) ? -1 : 0));
    },
    "num_sort_reserve-desc": function (a, b) {
        return ((a < b) ? -1 : ((a > b) ? 1 : 0));
    },
    "sort_full_time-pre": function (a) {
        if (a === null || a === "") {
            return 0;
        }
//        04/08/2016 22:04:35
        var d = a.split(" ");
        var date = d[0].split('/');
        var time = d[1].split(':');
        return parseInt(date[2] + date[1] + date[0] + time[0] + time[1] + time[2]) | 0;
    },
    "sort_full_time-asc": function (a, b) {
        return ((a < b) ? 1 : ((a > b) ? -1 : 0));
    },
    "sort_full_time-desc": function (a, b) {
        return ((a < b) ? -1 : ((a > b) ? 1 : 0));
    },
    "sort_full_time2-pre": function (a) {
        if (a === null || a === "") {
            return 0;
        }
//        2016/04/08/ 22:04:35
        var d = a.split(" ");
        var date = d[0].split('/');
        var time = d[1].split(':');
        return parseInt(date[0] + date[1] + date[2] + time[0] + time[1] + time[2]) | 0;
    },
    "sort_full_time2-asc": function (a, b) {
        return ((a < b) ? 1 : ((a > b) ? -1 : 0));
    },
    "sort_full_time2-desc": function (a, b) {
        return ((a < b) ? -1 : ((a > b) ? 1 : 0));
    },
    "sort_not_sec-pre": function (a) {
        if (a === null || a === "") {
            return 0;
        }
        //04/08/2016 22:04
        var d = a.split(" ");
        var date = d[0].split('/');
        var time = d[1].split(':');
        return parseInt(date[2] + date[1] + date[0] + time[0] + time[1]) | 0;
    },
    "sort_not_sec-asc": function (a, b) {
        return ((a < b) ? 1 : ((a > b) ? -1 : 0));
    },
    "sort_not_sec-desc": function (a, b) {
        return ((a < b) ? -1 : ((a > b) ? 1 : 0));
    }, "sort_not_sec2-pre": function (a) {
        if (a === null || a === "") {
            return 0;
        }
        //2016/04/08 22:04
        var d = a.split(" ");
        var date = d[0].split('/');
        var time = d[1].split(':');
        return parseInt(date[0] + date[1] + date[2] + time[0] + time[1]) | 0;
    },
    "sort_not_sec2-asc": function (a, b) {
        return ((a < b) ? 1 : ((a > b) ? -1 : 0));
    },
    "sort_not_sec2-desc": function (a, b) {
        return ((a < b) ? -1 : ((a > b) ? 1 : 0));
    },
    "yyyy_MM_dd-pre": function (a) {
        if (a === null || a === "") {
            return 0;
        }
        var ukDatea = a.split('-');
        return (ukDatea[0] + ukDatea[1] + ukDatea[2]) * 1;
    },
    "yyyy_MM_dd-asc": function (a, b) {
        return ((a < b) ? -1 : ((a > b) ? 1 : 0));
    },
    "yyyy_MM_dd-desc": function (a, b) {
        return ((a < b) ? 1 : ((a > b) ? -1 : 0));
    }

});

