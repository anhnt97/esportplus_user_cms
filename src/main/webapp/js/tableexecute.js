/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


const TableExecute = function () {
    this.array = [];
    this.total = 0;
    this.positionPage = 0;
    this.paggin = true;
};

TableExecute.prototype.setTotal = function (total, start, limit) {
    this.total = total;
};

TableExecute.prototype.pagging = function (_page) {
    this.paggin = _page;
};

TableExecute.prototype.reset = function () {
    this.array.splice(0, this.array.length);
    this.total = 0;
    this.positionPage = 0;
};

TableExecute.prototype.getPositionPage = function () {
    return this.positionPage;
};

TableExecute.prototype.addItem = function (item) {
    this.array.push(item);
    this.positionPage++;
};

TableExecute.prototype.setDataSet = function (ds) {
    this.array = [];
    this.array = ds;
};

/**
 *
 * @param {String} url
 * @param {Object} params
 * @param {function} fnCallBack
 * @returns {undefined}
 */
TableExecute.prototype.loadData = function (url, params, fnCallBack) {

    if (this.total > 0 && this.positionPage > 0 && this.positionPage >= this.total) {
        console.log("pos = " + this.positionPage + " total = " + this.total + " can't load more");

        return;
    }

    var s = "";
    for (var i in params) {
        s += i;
        s += "=";
        s += params[i];
        s += "&";
    }
    s.trim();
    if (s.length > 0)
        s = s.substring(0, s.length - 1);
    console.log("link: " + url + "?" + s);

    showLoading(true);
    $.ajax({
        type: 'GET',
        url: url,
        data: params,
        dataType: 'json',
        crossDomain: true,
        success: function (data, textStatus, jqXHR) {
            var jsonData = JSON.stringify(data);
            console.log("success: " + jsonData + " textStatus: " + textStatus + " jqXHR: " + jqXHR.status);
            checkResponseResult(data);
            fnCallBack(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            var status = jqXHR.status;
            var s;

            if (status === 0) {
                s = "Không có kết nối mạng !";
            } else {
                if (status === 200 && jqXHR.responseText === "") {
                    s = "Không có dữ liệu";
                } else {
                    s = jqXHR.responseText;
                }
            }
            console.log("error: jqXHR: " + JSON.stringify(jqXHR) + " textStatus: " + textStatus + " errorThrown: " + errorThrown);
            showDialog("Lỗi", s);
        }
    });
};

/**
 *
 * @param {type} index
 * @param {type} keys
 * @param {type} vals
 * @returns {undefined}
 */
TableExecute.prototype.edit = function (index, keys, vals) {
    var obj = this.array[index];
    for (var i = 0; i < keys.length; ++i) {
        obj[keys[i]] = vals[i];
    }
};

/**
 *
 * @param {Integer} index
 * @returns {undefined}
 */
TableExecute.prototype.remove = function (index) {
    this.array.splice(index, 1);
};

TableExecute.prototype.dataSet = function () {
    return this.array;
};

/**
 *
 * @param {<table></table>} tbl : Bảng được lấy từ jquery $("$id_table");
 * @param {Array} colums : Các cột được hiển thị (phải lấy trong this.array)
 * @param {<div></div>} divParent : Thẻ div chứa table.
 * @param {Array} columnDefs columsDefs
 * @param {fnRowCreated} fnRowCreated Hàm call back sau mỗi dòng created
 * @param {bAutoWidth} bAutoWidth auto width hay không
 * @returns {undefined}
 */

TableExecute.prototype.veBang = function (tbl, colums, divParent, columnDefs, fnRowCreated, bAutoWidth, alwayShowMore) {
    console.log("start draw table");
    if (columnDefs === undefined || columnDefs === null) {
        columnDefs = [];
    }
    if (bAutoWidth === undefined || bAutoWidth === null) {
        bAutoWidth = true;
    }
    if (alwayShowMore === undefined || alwayShowMore === null) {
        alwayShowMore = false;
    }
    var t = tbl.DataTable({
        "data": this.array,
        "columns": colums,
        "autoWidth": bAutoWidth,
        "destroy": true,
        "columnDefs": columnDefs,
        "stateSave": true,
        "order": [],
        "paging": this.paggin,
        "fnDrawCallback": function (settings) {
            if (divParent !== undefined && divParent !== null) {
                divParent.toggle(true);
            }
        },
        "createdRow": function (row, data, index) {
            if (fnRowCreated !== undefined) {
                fnRowCreated(row, data, index);
            }
        }
    });
    if (!alwayShowMore) {
        var btnMore = $("#btnMore");
        if (btnMore !== undefined && btnMore !== null) {
            if (this.total === 0 && this.positionPage === 0) {
                btnMore.toggle(false);
            } else if (this.total === 0 && this.positionPage > 0) {
                btnMore.toggle(false);
            } else if (this.total > 0 && this.positionPage >= this.total) {
                btnMore.toggle(false);
            } else {
                btnMore.toggle(true);
            }
        }
    }
    return t;
};
