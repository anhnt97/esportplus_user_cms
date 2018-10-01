/* global parseInt, SOURCE_YOUTUBE, SOURCE_FACEBOOK, SOURCE_TOPSHARE, TYPE_POST_VIDEO, TYPE_POST_LIVE, NORMAL, DELETED, PENDING, moment */
//
// var tblExe = new TableExecute();
//
// $(document).ready(function () {
//     loadData(0, 100);
//
//     $("#btnMore").click(function () {
//         loadData(tblExe.getPositionPage(), 100);
//         return false;
//     });
//
// });
//
// function loadData(start, limit) {
//
//     if (start === 0) {
//         tblExe.reset();
//     }
//     const params = {
//         start: start,
//         limit: limit
//     };
//     tblExe.loadData("content-get", params, (data) => {
//         hideAllModal();
//         parseData(data);
//     });
//
// }
//
// function parseData(data) {
//     var total = data.total;
//     $("#txt_thongke").text("Posts");
//     var rows = data.rows;
//     if (rows !== undefined && rows !== null && rows.length > 0) {
//         tblExe.setTotal(parseInt(total));
//         for (var i = 0; i < rows.length; ++i) {
//             tblExe.addItem(rows[i]);
//         }
//     }
//     drawTable();
// }
//
// function drawTable() {
//     var cols = [
//         {"data": "thumb"},
//         {
//             "data": null,
//             "render": function (data, type, full) {
//                 return '<a target="_blank" href="http://content.topshare.live/' + data._id + '">' + data.name + "</a>";
//             }
//         },
//         {"data": "comment"},
//         {"data": "like"},
//         {"data": "source"},
//         {"data": "typepost"},
//         {"data": "status"},
//         {"data": "created_at"},
//         {"data": "start_time_effect"}
//     ];
//
//     var defs = [
//         {
//             "targets": 0,
//             "width": "270px",
//             "render": function (data) {
//                 if (isArray(data) && data.length > 0) {
//                     const url = data[0].url;
//                     return '<img src="' + url + '"></img>';
//                 } else {
//                     return "";
//                 }
//
//             }
//         },
//         {
//             "targets": [2, 3],
//             "render": function (data) {
//                 return parseInt(data).formatMoneyEx(0);
//             }
//         },
//         {
//             "targets": 4,
//             "render": function (data) {
//                 var p = parseInt(data);
//                 if (p === SOURCE_YOUTUBE) {
//                     return "Youtube";
//                 } else if (p === SOURCE_FACEBOOK) {
//                     return "Facebook";
//                 } else if (p === SOURCE_TOPSHARE) {
//                     return "Topshare";
//                 }
//                 return "Unknown";
//             }
//         },
//         {
//             "targets": 5,
//             "render": function (data) {
//                 var p = parseInt(data);
//                 if (p === TYPE_POST_VIDEO) {
//                     return "Video";
//                 } else if (p === TYPE_POST_LIVE) {
//                     return "Gif";
//                 }
//                 return "Unknown";
//             }
//         },
//         {
//             "targets": 6,
//             "render": function (data) {
//                 var p = parseInt(data);
//                 if (p === NORMAL) {
//                     return "Normal";
//                 } else if (p === DELETED) {
//                     return "Deleted";
//                 } else if (p === PENDING) {
//                     return "Pending";
//                 }
//                 return "Unknown";
//             }
//         },
//         {
//             "targets": [7, 8],
//             "render": function (data) {
//                 var dateString = moment.unix(data / 1000).format("DD/MM/YYYY");
//                 return dateString;
//             }
//         },
//
//         {
//             "data": null,
//             "targets": 9,
//             "className": "dt-center",
//             "render": function (data) {
//                 return '<button id="btnEdit" class="btn btn-default btn-sm">Edit</button>';
//             }
//         },
//         {
//             "data": null,
//             "targets": 10,
//             "className": "dt-center",
//             "render": function (data) {
//                 return '<button id="btnRemove" class="btn btn-default btn-sm">Delete</button>';
//             }
//         }
//     ];
//     tblExe.veBang($('#tbl_info'), cols, $("#tbl_container"), defs, rowCreatedCallBack);
// }
//
// function rowCreatedCallBack(row, data, index) {
//     $('td', row).eq(9).on('click', '#btnEdit', function () {
//         console.log("data = " + JSON.stringify(data));
//         const source = parseInt(data.source);
//         if (source === SOURCE_YOUTUBE || source === SOURCE_FACEBOOK || source === SOURCE_TOPSHARE) {
//             window.location.href = "youtube-edit?id=" + data._id + "&type_post=" + data.typepost;
//         }
//     });
//     $('td', row).eq(10).on('click', '#btnRemove', function () {
//         deletePost(data, index);
//     });
// }
//
// function deletePost(data, index) {
//     confirmDialog("Do you want delete this post ?", "Delete", () => {
//         const req = new Request();
//         const params = {id: data._id};
//         req.delete("post-delete", params, (result) => {
//             const rc = parseInt(result.rc);
//             if (rc === 0) {
//                 showDialog("Notice", "Delete success", null, () => {
//                     tblExe.remove(index);
//                     drawTable();
//                 });
//             } else {
//                 const rd = result.rd;
//                 showDialog("Warning", "Delele failed !!! <br/><b>" + rd + "</b>");
//             }
//         });
//     });
// }

const app = new Vue({
    el: '#root',
    mounted() {
        this.getListPost(this.data_fetch);
    },

    data() {
        return {
            items: [],
            total: 0,
            totalPages: 0,
            limitRecord: 50,
            data_fetch: {
                start: 0,
                limit: 50,
                key: "",
                oldKey: "",
                typepost:TYPE_POST_VIDEO
            },
            paging: {
                selected_page: 0
            }
        }
    },

    methods: {

        getListPost(params) {
            const req = new Request();
            req.get("content-get", params, (data) => {
                this.items = data.rows;
                this.total = data.total;
                this.totalPages = Math.floor(data.total / this.limitRecord);
                const a1 = data.total % this.limitRecord;
                if (a1 !== 0) {
                    this.totalPages++;
                }
                console.log("this.totalPages = " + this.totalPages);
            });
        },
        deleteItem(id) {
            console.log("delete item: " + id);
            confirmDialog("Do you want delete this post ?", "Delete", () => {
                const req = new Request();
                const params = {id: id};
                req.delete("post-delete", params, (result) => {
                    const rc = parseInt(result.rc);
                    if (rc === 0) {
                        showDialog("Notice", "Delete success", null, () => {
                            this.removeItem(id);
                        });
                    } else {
                        const rd = result.rd;
                        showDialog("Warning", "Delele failed !!! <br/><b>" + rd + "</b>");
                    }
                });
            });
        },

        removeItem(id) {
            let index = -1;
            for (let i = 0; i < this.items.length; ++i) {
                if (this.items[i]._id === id) {
                    index = i;
                    break;
                }
            }
            if (index !== -1) {
                this.items.splice(index, 1);
            }
        },

        approveItem(item) {

        },

        onPagingClick(pageNum) {
            this.data_fetch.start = (pageNum - 1) * this.limitRecord;
            this.getListPost(this.data_fetch);
        },

        onSearchClick() {
            if (this.data_fetch.key !== this.data_fetch.oldKey) {
                this.data_fetch.oldKey = this.data_fetch.key;
                this.data_fetch.start = 0;
                this.paging.selected_page = 0;
                this.getListPost(this.data_fetch);
            }
        }
    }
});