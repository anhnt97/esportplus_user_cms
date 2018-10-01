/* global BootstrapDialog */

const DATE_FORMAT = 'DD/MM/YYYY HH:mm';

const SOURCE_YOUTUBE = 0;
const SOURCE_FACEBOOK = 1;
const SOURCE_TOPSHARE = 2;

const TYPE_POST_VIDEO = 1;
const TYPE_POST_NEWS = 3;
const TYPE_POST_LIVE = 2;

const NORMAL = 0;
const DELETED = 1;
const PENDING = 2;
const OFFLINE  =3;

const TYPE_UPLOAD_VIDEO = 0;
const TYPE_UPLOAD_LIVE = 1;

const TYPE_PAGE_HOME = 1;
const TYPE_PAGE_VIDEO = 2;
const TYPE_PAGE_LIVE = 3;
const TYPE_PAGE_NEWS = 4;

const BET_STATUS_ON = 0;
const BET_STATUS_OFF = 2;

const getMimetype = (signature) => {
    switch (signature) {
        case '89504E47':
            return 'image/png';
        case '47494638':
            return 'image/gif';
        case 'FFD8FFDB':
        case 'FFD8FFE0':
        case 'FFD8FFE1':
            return 'image/jpeg';
        case '00020':
            return 'video/mp4';
        default:
            return 'Unknown filetype';
    }
};

Number.prototype.formatMoneyEx = function (c) {
    var n = this,
        c = isNaN(c = Math.abs(c)) ? 0 : c,
        d = ".",
        t = ",",
        s = n < 0 ? "-" : "",
        i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

function getNow() {
    var today = new Date();
    return getDate(today);
}

function getDate(date) {
    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!
    var yyyy = date.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    var s = dd + '/' + mm + '/' + yyyy;
    return s;
}

function getFullDateTime(date) {
    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!
    var yyyy = date.getFullYear();
    var HH = date.getHours();
    var min = date.getMinutes();

    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    if (HH < 10) {
        HH = '0' + HH;
    }
    if (min < 10) {
        min = '0' + min;
    }
    var s = dd + '/' + mm + '/' + yyyy + " " + HH + ":" + min;
    return s;
}

function getDayBefore(numOfdayBefore) {
    var d = new Date();
    d.setDate(d.getDate() - numOfdayBefore);
    return getDate(d);
}

function yyyyMMddToddMMyyyy(dateString) {
    //2016/03/30
    var s = dateString.toString();
    var year = s.substring(0, 4);
    var month = s.substring(5, 7);
    var day = s.substring(8, 10);
    return day + "/" + month + "/" + year;
}

function yyyyMMToMMyyyy(dateString) {
    var s = dateString.toString();
    var year = s.substring(0, 4);
    var month = s.substring(4, 6);
    return month + "/" + year;
}

///2016/07/18 -> yyyy-mm-dd
function convertDate1(dateString) {
    var s = dateString.toString();
    var year = s.substring(0, 4);
    var month = s.substring(5, 7);
    var day = s.substring(8, s.length);
    return year + "-" + month + "-" + day;
}

function convertDate2(dateString) {
    var s = dateString.toString();
    var year = s.substring(0, 4);
    var month = s.substring(5, 7);
    var day = s.substring(8, s.length);
    return day + "/" + month + "/" + year;
}

function convertDate3(date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    return (day < 10 ? ("0" + day) : day) + "/" + (month < 10 ? ("0" + month) : month) + "/" + year;
}


/**
 *
 * @param {String} date : vi du '20160727' - yyyymmdd
 * @returns {String}
 */
function convertDate4(date) {
    //20160727
//    console.log("date=" + date);
    var s = date.toString();
    var year = s.substring(0, 4);
    var month = s.substring(4, 6);
    var day = s.substring(6, 8);
    return day + "/" + month + "/" + year;
}


// dd/MM/yyyy HH:mm:ss -> yyyy/MM/dd HH:mm:ss
function convertDate5(a) {
    var d = a.split(" ");
    var date = d[0].split('/');
    return date[2] + "/" + date[1] + "/" + date[0] + " " + d[1];
}

// dd/MM/yyyy HH:mm -> yyyy/MM/dd HH:mm
function convertDate6(a) {
    var d = a.split(" ");
    var date = d[0].split('/');
    return date[2] + "/" + date[1] + "/" + date[0] + " " + d[1];
}

function validateDate(str) {
    var t = str.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    if (t === null)
        return false;
    var d = parseInt(t[1]), m = parseInt(t[2], 10), y = parseInt(t[3], 10);
    //below should be more acurate algorithm
    if (m >= 1 && m <= 12 && d >= 1 && d <= 31) {
        return true;
    }
    return false;
}

function validateUserName(id) {
    if (id === undefined || id === null || id.trim().length < 3) {
        return false;
    }
    return true;
}

/**
 *
 * @param {String} msg
 * @returns {stdout}
 */
function log(msg) {
    console.log(msg);
}

function ddlog(msg) {
    console.log(msg);
}

/**
 *
 * @param {String} title
 * @param {String} content
 * @param {Json} data
 * @param {function} fnOnHide
 * @param {type} size
 * @returns {undefined}
 */
function showDialog(title, content, data, fnOnHide, size) {
    hideAllModal();
    if (size === undefined || size === null) {
        size = BootstrapDialog.SIZE_SMALL;
    }

    BootstrapDialog.show({
        title: title,
        type: BootstrapDialog.TYPE_DEFAULT,
        size: size,
        data: data, //data 0 : 1
        message: content,
        buttons: [
            {
                hotkey: 13, // Enter.
                label: 'Close',
                action: function (dialog) {
                    dialog.close();
                }
            }
        ],
        onhide: function (dialogRef) {
            if (typeof fnOnHide === "function") {
                var rc = 0;
                if (data !== null && data !== undefined) {
                    rc = dialogRef.getData("rc");
                }
                fnOnHide(rc);
            }
        }
    });
}

/**
 *
 * @param {String} content
 * @param {String} btnOkTitle
 * @param {function} fn
 * @returns {undefined}
 */
function confirmDialog(content, btnOkTitle, fn) {
    hideAllModal();
    BootstrapDialog.show({
        title: "Warning",
        type: BootstrapDialog.TYPE_DEFAULT,
        size: BootstrapDialog.SIZE_SMALL,
        message: content,
        buttons: [
            {
                label: 'Cancel',
                action: function (dialog) {
                    dialog.close();
                }
            },
            {
                label: btnOkTitle,
                cssClass: 'btn-primary',
                action: function (dialog) {
                    dialog.close();
                    if (typeof fn === "function") {
                        fn();
                    }
                }
            }
        ]
    });
}


function showLoading(state) {
    hideAllModal();

    if (state === undefined || state === null) {
        state = false;
    }

    if (state) {
        $("#mdLoading").modal("show");
    } else {
        $("#mdLoading").modal("hide");
    }
}

function hideAllModal() {
    $("#mdLoading").modal("hide");
    $("#modalCrop").modal("hide");
}

function GetParameterValues(param) {
    var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < url.length; i++) {
        var urlparam = url[i].split('=');
        if (urlparam[0] === param) {
            return decodeURIComponent(urlparam[1].replace(/\+/g, ' '));
        }
    }
    return null;
}

function getValueInQueryString(str, param) {
    var url = str.split("&");
    for (var i = 0; i < url.length; i++) {
        var urlparam = url[i].split('=');
        if (urlparam[0] === param) {
            return urlparam[1];
        }
    }
    return "";
}

function createQueryString(obj) {
    var queryString = "";
    if (obj !== undefined && obj !== null) {
        for (var x in obj) {
            queryString += x;
            queryString += "=";
            queryString += obj[x];
            queryString += "&";
        }
        queryString.trim();
        if (queryString.length > 0) {
            queryString = queryString.substring(0, queryString.length - 1);
        }
    }
    return queryString;
}

function convertQueryStringToJson(s) {
    var obj = {};
    if (s !== undefined && s !== null && s.length > 0) {
        var queryarray = s.split("&");
        for (var i = 0; i < queryarray.length; i++) {
            var urlparam = queryarray[i].split('=');
            if (urlparam.length === 2) {
                obj[urlparam[0]] = decodeURIComponent(urlparam[1].replace(/\+/g, ' '));
            }
        }
    }
    return obj;
}

function parseToString(obj) {
    var s = "";
    for (var key in obj) {
        s += key + "=" + obj[key] + ";";
    }
    s.trim();
    if (s.length > 0)
        s = s.substring(0, s.length - 1);
    return s;
}

/**
 *
 * @param {String} action
 * @param {String} description
 * @param {String} result
 * @param {String} admindesc
 * @returns {undefined}
 */
function saveActionUser(action, description, result, admindesc) {
    if (admindesc === undefined) {
        admindesc = "unknow";
    }

    var params = {
        action: action,
        description: description,
        result: result,
        admindesc: admindesc
    };

    $.ajax({
        type: 'POST',
        url: "userActions",
        data: params,
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            var jsonData = JSON.stringify(data);
            ddlog("Save action admin ok !" + jsonData);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("error: jqXHR: " + JSON.stringify(jqXHR) + " textStatus: " + textStatus + " errorThrown: " + errorThrown);
        }
    });
}

function get_browser_info() {
    var ua = navigator.userAgent, tem,
        M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return {name: 'IE ', version: (tem[1] || '')};
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\bOPR\/(\d+)/);
        if (tem !== null) {
            return {name: 'Opera', version: tem[1]};
        }
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) !== null) {
        M.splice(1, 1, tem[1]);
    }
    return {
        name: M[0],
        version: M[1]
    };
}

function getColor(index) {
    switch (index) {
        case 0:
            return "#800000";
        case 1:
            return "#FF6384";
        case 2:
            return "#36A2EB";
        case 3:
            return "#FFCE56";
        case 4:
            return "#8B008B";
        case 5:
            return "#00008B";
        case 6:
            return "#00008B";
        case 7:
            return "#D2691E";
        case 8:
            return "#008000";
        case 9:
            return "#4B0082";
        case 10:
            return "#20B2AA";
    }
    return "#fff";
}

function getValueKey(array, key) {
    for (var i = 0; i < array.length; ++i) {
        if (array[i].name === key) {
            return array[i].value;
        }
    }
    return "";
}

function checkInputString(string) {
    if (string === undefined || string === null || string.length === 0) {
        return false;
    }
    return true;
}

function checkInputNumber(number) {
    if (!checkInputString(number) || isNaN(number) || parseInt(number) === 0) {
        return false;
    }
    return true;
}

function getValueInSerializeArray(array, key) {
    for (var i = 0; i < array.length; ++i) {
        if (array[i].name === key) {
            return array[i].value;
        }
    }
    return "";
}

function isArray(what) {
    if (what === null || what === undefined) {
        return false;
    }
    return Object.prototype.toString.call(what) === '[object Array]';
}

function isURL(str) {
    var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    if (!regex.test(str)) {
        return false;
    } else {
        return true;
    }
}

function checkJSONObject(obj) {
    let count = 0;
    for (let prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            ++count;
        }
    }
    return count;
}

function removeA(arr) {
    let what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax = arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}

const FB_ACC_NAME = "facebook_name";
const FB_ACC_ID = "facebook_id";
const FB_ACC_IMG = "facebook_img";
const FB_PAGE_NAME = "facebook_page_name";
const FB_PAGE_TOKEN = "facebook_page_token";

function parseDataFbLogin(response) {
    var id = response.id;
    var name = response.name;
    var img = "";
    var picture = response.picture;
    if (picture !== null && picture !== undefined) {
        var data = picture.data;
        if (data !== null && data !== undefined) {
            img = data.url;
        }
    }
    const tk = localStorage.getItem(FB_PAGE_TOKEN);
    if (!checkInputString(tk)) {
        const accounts = response.accounts;
        if (accounts !== null && accounts !== undefined) {
            const d = accounts.data;
            if (isArray(d) && d.length > 0) {
                localStorage.setItem(FB_PAGE_NAME, d[0].name);
                localStorage.setItem(FB_PAGE_TOKEN, d[0].access_token);
            }
        }
    }
    localStorage.setItem(FB_ACC_ID, id);
    localStorage.setItem(FB_ACC_NAME, name);
    localStorage.setItem(FB_ACC_IMG, img);
    return {id: id, name: name, img: img};
}
function  getLinkImage(imageBase64){
    const req = new Request();
    const params = {
        rows: imageBase64
    };
    req.postHide("img-service", params, (data) => {
        console.log("Data link image" + data);
        const rc = parseInt(data.rc);
        if (rc === 0) {
            const rows = data.rows;
            console.log("Image link :" + rows);
            return rows;
        }
    });
}

function emptyArray(arr) {
    if (arr == undefined || arr == null) return;
    while (arr.length > 0) {
        arr.pop();
    }
    //arr.length = 0;
}

Number.prototype.formatMoney = function(c, d, t){
    var n = this,
        c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
        j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

