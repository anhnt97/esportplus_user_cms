/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global parseInt */

var tblExe = new TableExecute();
$(document).ready(function () {
    loadData(0, 100);
});

function loadData(start, limit) {
    if (start === 0) {
        tblExe.reset();
    }
    var params = {
        start: start,
        limit: limit
    };
    tblExe.loadData("get-pending-upload", params, function (data) {
        parseData(data, start, limit);
    });
}

function parseData(data, start, limit) {
    hideAllModal();
    var total = data.total;
    var rows = data.rows;
    if (rows !== undefined && rows !== null && rows.length > 0) {
        tblExe.setTotal(parseInt(total), start, limit);
        for (var i = 0; i < rows.length; ++i) {
            tblExe.addItem(rows[i]);
        }
    }
    drawTable();
}

function drawTable() {
    var cols = [
        {"data": "id"},
        {"data": "typeUpload"},
        {"data": "createdBy"},
        {"data": "linkVideos"},
        {
            "data": null,
            "targets": 3,
            "className": "dt-center",
            "render": function (data) {
                return '<button id="btnContinue" class="btn btn-default btn-sm">Continues</button>';
            }
        },
        {
            "data": null,
            "targets": 4,
            "className": "dt-center",
            "render": function (data) {
                return '<button id="btnRemove" class="btn btn-default btn-sm">Delete</button>';
            }
        }
    ];

    var defs = [
        {
            "targets": [1],
            "render": function (data) {
                const type = parseInt(data);
                if (type === TYPE_UPLOAD_LIVE) {
                    return "Live";
                } else if (type === TYPE_UPLOAD_VIDEO) {
                    return "Video";
                }
                return "Unknow";
            }
        },
        {
            "targets": [3],
            "render": function (data) {
                let url = data[0];
                return '<a href="' + url + '">Play video</a>';
            }
        }
    ];
    tblExe.veBang($('#tbl_info'), cols, $("#tbl_container"), defs, rowCreatedCallBack);
}

function rowCreatedCallBack(row, data, index) {
    $('td', row).eq(4).on('click', '#btnContinue', function () {
        continueUpload(data, index);
    });
    $('td', row).eq(5).on('click', '#btnRemove', function () {
        deleteRow(data, index);
    });
}

function continueUpload(data) {
    console.log("data = " + JSON.stringify(data));
    window.location.href = "upload?id=" + data.id + "&type_upload=" + data.typeUpload + "&from=list-pending";
}

function deleteRow(data, index) {
    confirmDialog("Do you want delete this upload", "Delete", function () {
        var req = new Request();
        req.delete("delete-pending-upload", {id: data.id}, function (d) {
            hideAllModal();
            deleteSuccess(d, index);
        });
    });
}

function deleteSuccess(data, index) {
    var rc = parseInt(data.rc);
    if (rc === 0) {
        showDialog("Notice", "Delete success", null, function () {
            tblExe.remove(index);
            drawTable();
        });
    } else {
        showDialog("Warning", "Delete failure");
    }
}   