/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * 
 * @param {String} s dd/MM/yyyy
 * @returns {Date}
 */
function parseStringTodate1(s) {
    var a = s.split("/");
    var date = new Date(parseInt(a[2]), (parseInt(a[1]) - 1), parseInt(a[0]));
    return date;
}

function daydiff(first, second) {
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
}

/**
 * 
 * @param {Date} date
 * @returns {String} yyyy/MM/dd
 */
function parseDateToString1(date) {
    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!
    var yyyy = date.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    var s = yyyy + '/' + mm + '/' + dd;
    return s;
}
