/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global parseInt, axios, ReactDOM, BootstrapDialog */

//var arrayImage = [];
//
//var i = 0;
//// var video = document.createElement("video");
//var video = document.getElementById("video1");
//var thumbs = document.getElementById("thumbs");
//
//video.addEventListener('loadeddata', function () {
//    thumbs.innerHTML = "";
//    video.currentTime = i;
//}, false);
//
//arrayImage = [];
//var count = 0;
//video.addEventListener('seeked', function () {
//    console.log("seeked: " + i + " duration: " + video.duration);
//    if (count < 20) {
//        generateThumbnail(i);
//        count++;
//    }
//    i = i + 20;
//    if (i <= video.duration) {
//        video.currentTime = i;
//    } else {
//        console.log("done!");
//        if (arrayImage.length > 0) {
//            var kkk = Math.floor((Math.random() * arrayImage.length - 1) + 1);
//            console.log("arrayImage[kkk]=" + arrayImage[kkk]);
//            uploadThumb(arrayImage[kkk]);
//            console.log("upload .... yet + " + kkk);
//        }
//    }
//}, false);
//
//video.preload = "auto";
//video.src = "video/SampleVideo_1280x720_30mb.mp4";
//
//function generateThumbnail() {
//    var c = document.createElement("canvas");
//    var ctx = c.getContext("2d");
//    c.width = 160;
//    c.height = 90;
//    ctx.drawImage(video, 0, 0, 160, 90);
//    thumbs.appendChild(c);
//    var pngUrl = c.toDataURL();
//    pngUrl = pngUrl.replace(/^data:image\/(png|jpg);base64,/, "");
//    arrayImage.push(pngUrl);
//}
//
///**
// * for image
// * @param id
// * @returns {HTMLElement | null}
// */
//function el(id) {
//    return document.getElementById(id);
//}
//
//var canvas = el("canvas");
//var context = canvas.getContext("2d");
//
//function readImage() {
//    if (this.files && this.files[0]) {
//        var FR = new FileReader();
//        FR.onload = function (e) {
//            var img = new Image();
//            img.addEventListener("load", function () {
//                context.drawImage(img, 0, 0);
//            });
//            img.src = e.target.result;
//        };
//        FR.readAsDataURL(this.files[0]);
//    }
//}
//
//el("fileUpload").addEventListener("change", readImage, false);
//


//var _CANVAS = document.querySelector("#video-canvas"),
//        _CTX = _CANVAS.getContext("2d"),
//        _VIDEO = document.querySelector("#main-video");
//
//// Upon click this should should trigger click on the #file-to-upload file input element
//// This is better than showing the not-good-looking file input element
//document.querySelector("#upload-button").addEventListener('click', function () {
//    document.querySelector("#file-to-upload").click();
//});
//
//// When user chooses a MP4 file
//document.querySelector("#file-to-upload").addEventListener('change', function () {
//    // Validate whether MP4
//    if (['video/mp4'].indexOf(document.querySelector("#file-to-upload").files[0].type) == -1) {
//        alert('Error : Only MP4 format allowed');
//        return;
//    }
//
//    // Hide upload button
//    document.querySelector("#upload-button").style.display = 'none';
//
//    // Object Url as the video source
//    document.querySelector("#main-video source").setAttribute('src', URL.createObjectURL(document.querySelector("#file-to-upload").files[0]));
//
//    // Load the video and show it
//    _VIDEO.load();
//    _VIDEO.style.display = 'inline';
//
//    // Load metadata of the video to get video duration and dimensions
//    _VIDEO.addEventListener('loadedmetadata', function () {
//        console.log(_VIDEO.duration);
//        var video_duration = _VIDEO.duration,
//                duration_options_html = '';
//
//        // Set options in dropdown at 4 second interval
//        for (var i = 0; i < Math.floor(video_duration); i = i + 4) {
//            duration_options_html += '<option value="' + i + '">' + i + '</option>';
//        }
//        document.querySelector("#set-video-seconds").innerHTML = duration_options_html;
//
//        // Show the dropdown container
//        document.querySelector("#thumbnail-container").style.display = 'block';
//
//        // Set canvas dimensions same as video dimensions
//        _CANVAS.width = _VIDEO.videoWidth;
//        _CANVAS.height = _VIDEO.videoHeight;
//    });
//});
//
//// On changing the duration dropdown, seek the video to that duration
//document.querySelector("#set-video-seconds").addEventListener('change', function () {
//    _VIDEO.currentTime = document.querySelector("#set-video-seconds").value;
//
//    // Seeking might take a few milliseconds, so disable the dropdown and hide download link 
//    document.querySelector("#set-video-seconds").disabled = true;
//    document.querySelector("#get-thumbnail").style.display = 'none';
//});
//
//// Seeking video to the specified duration is complete 
//document.querySelector("#main-video").addEventListener('timeupdate', function () {
//    // Re-enable the dropdown and show the Download link
//    document.querySelector("#set-video-seconds").disabled = false;
//    document.querySelector("#get-thumbnail").style.display = 'inline';
//});
//
//// On clicking the Download button set the video in the canvas and download the base-64 encoded image data
//document.querySelector("#get-thumbnail").addEventListener('click', function () {
//    _CTX.drawImage(_VIDEO, 0, 0, _VIDEO.videoWidth, _VIDEO.videoHeight);
//
////    document.querySelector("#get-thumbnail").setAttribute('href', _CANVAS.toDataURL());
//    //document.querySelector("#get-thumbnail").setAttribute('download', 'thumbnail.png');
//
//    var pngUrl = _CANVAS.toDataURL('image/png');
//    console.log(pngUrl);
////    pngUrl = pngUrl.replace(/^data:image\/(png|jpg);base64,/, "");
//    uploadThumb(pngUrl);
//
//});
//
//function uploadThumb(thumb) {
//
//    var formData = new FormData();
//    formData.append("thumb", thumb);
//
//    var req = new Request();
//    req.uploadFile("uploadvideo-service", formData, function (data) {
//        var rc = data.rc;
//        var rd = data.rd;
//        if (parseInt(rc) === 0) {
//            showDialog("Thông báo", "Upload video thành công");
//        } else {
//            showDialog("Thông báo", "Upload video thất bại <br/><b>" + rd + "</b>");
//        }
//    });
//
//}

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
    tblExe.loadData("get-category", params, function (data) {
        hideAllModal();
        parseData(data);
    });
}

function parseData(data) {
    hideAllModal();
    var total = data.total;
    $("#txt_thongke").text("Categories (" + total + " records)");
    var rows = data.rows;
    if (rows !== undefined && rows !== null && rows.length > 0) {
        tblExe.setTotal(parseInt(total));
        for (var i = 0; i < rows.length; ++i) {
            tblExe.addItem(rows[i]);
        }
    }
    drawTable();
}

function drawTable() {
    var cols = [
        {"data": "title"},
        {"data": "position"},
        {"data": "description"},
        {
            "data": null,
            "targets": 3,
            "className": "dt-center",
            "render": function (data) {
                return '<button id="btnEdit" class="btn btn-default btn-sm">Edit</button>';
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
                return parseInt(data).formatMoneyEx(0);
            }
        }
    ];

    tblExe.veBang($('#tbl_info'), cols, $("#tbl_container"), defs, rowCreatedCallBack);
}

function rowCreatedCallBack(row, data, index) {
    $('td', row).eq(3).on('click', '#btnEdit', function () {
        console.log("data = " + JSON.stringify(data));
        showFormEdit(data._id, data.title, data.position, data.description, data.pages, index);
    });
    $('td', row).eq(4).on('click', '#btnRemove', function () {
        console.log("data = " + JSON.stringify(data));
        remove(data._id, data.title, index);
    });
}

function remove(id, name, index) {
    confirmDialog("Do you want delete category: <b>" + name + "</b> ?", "Delete", function () {
        exeremove(id, index);
    });
}

function exeremove(id, index) {
    var req = new Request();
    var params = {"id": id};
    console.log("params = " + JSON.stringify(params));
    req.delete("delete-category", params, function (data) {
        hideAllModal();
        var rc = parseInt(data.rc);
        if (rc === 0) {
            showDialog("Alert", "Delete success !", null, function () {
                tblExe.remove(index);
                drawTable();
            });
        } else {
            showDialog("Warning", "Delete failed !");
        }
    });
}

function showFormEdit(id, name, position, description, pages, index) {


    let html = '';
    html += '<div class="form-group">';
    html += '<label>Name</label>';
    html += '<input type="text" value="' + name + '" class="form-control" id="name" placeholder="Name"/>';
    html += '</div>';

    html += '<div class="form-group">';
    html += '<label>Position</label>';
    html += '<input type="text" value="' + position + '" class="form-control" id="position" placeholder="Position"/>';
    html += '</div>';

    let chk_home = false;
    let chk_video = false;
    let chk_gif = false;
    if (isArray(pages)) {
        for (let i = 0; i < pages.length; i++) {
            if (pages[i] === TYPE_PAGE_LIVE) {
                chk_gif = true;
            }
            if (pages[i] === TYPE_PAGE_VIDEO) {
                chk_video = true;
            }
            if (pages[i] === TYPE_PAGE_HOME) {
                chk_home = true;
            }
        }
    }

    html += '<div class="form-group">';
    html += '<label>Page: </label>';
    html += '<label class="checkbox-inline">';
    html += '<input id="chk_home" type="checkbox" ' + (chk_home ? "checked" : "") + '/>Home';
    html += '</label>';
    html += '<label class="checkbox-inline">';
    html += '<input id="chk_video" type="checkbox" ' + (chk_video ? "checked" : "") + ' />Video';
    html += '</label>';
    html += '<label class="checkbox-inline">';
    html += '<input id="chk_gif" type="checkbox" ' + (chk_gif ? "checked" : "") + '/>Gif';
    html += '</label>';
    html += '</div>';

    html += '<div class="form-group">';
    html += '<label>Description</label>';
    html += '<textarea class="form-control" rows="3" id="description" placeholder="Description">' + description + '</textarea>';
    html += '</div>';
    BootstrapDialog.show({
        title: 'Edit category',
        type: BootstrapDialog.TYPE_DEFAULT,
        message: $(html),
        buttons: [
            {
                label: 'Cancel',
                action: function (dialog) {
                    dialog.close();
                }
            },
            {
                label: 'Edit category',
                cssClass: 'btn-primary',
                action: function (dialog) {
                    let nameEdit = $("#name").val();
                    let posEdit = $("#position").val();
                    let descriptionEdit = $("#description").val();

                    const chk_video = $('#chk_video').is(":checked");
                    const chk_gif = $('#chk_gif').is(":checked");
                    const chk_home = $('#chk_home').is(":checked");

                    const arrPage = [];
                    if (chk_home) {
                        arrPage.push(TYPE_PAGE_HOME);
                    }
                    if (chk_video) {
                        arrPage.push(TYPE_PAGE_VIDEO);
                    }
                    if (chk_gif) {
                        arrPage.push(TYPE_PAGE_LIVE);
                    }
                    const uniquePages = [];
                    $.each(arrPage, function (i, el) {
                        if ($.inArray(el, uniquePages) === -1) uniquePages.push(el);
                    });

                    if (nameEdit === "") {
                        nameEdit = name;
                    }
                    if (descriptionEdit === "") {
                        descriptionEdit = description;
                    }
                    if (isNaN(posEdit) || parseInt(posEdit < 0)) {
                        posEdit = position;
                    }
                    dialog.close();
                    edit(id, nameEdit, posEdit, descriptionEdit, uniquePages, index);
                }
            }
        ]
    });
}

function edit(id, name, position, description, arrPage, index) {
    confirmDialog("Do you want edit <b>" + name + "</b> ?", "Edit", () => {
        exeedit(id, name, position, description, arrPage, index);
    });
}

function exeedit(id, name, position, description, arrPage, index) {
    var req = new Request();
    var params = {
        id: id,
        name: name,
        position: position,
        description: description,
        pages: arrPage
    };
    req.update("update-category", params, (data) => {
        hideAllModal();
        const rc = parseInt(data.rc);
        if (rc === 0) {
            showDialog("Alert", "Edit success", null, function () {
                tblExe.edit(
                    index,
                    ["title", "position", "description", "pages"],
                    [name, position, description, arrPage]
                );
                drawTable();
            });
        } else {
            showDialog("Warning", "Edit failed !");
        }
    });
}