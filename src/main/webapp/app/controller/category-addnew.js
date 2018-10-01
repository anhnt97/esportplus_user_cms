/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global ReactDOM */

$(document).ready(function () {

    $("#btnAdd").click(function () {

        const name = $("#name").val();
        const position = $("#position").val();
        const note = $("#note").val();
        const chk_home = $('#chk_home').is(":checked");
        const chk_video = $('#chk_video').is(":checked");
        const chk_gif = $('#chk_gif').is(":checked");
        const chk_all = $('#chk_all').is(":checked");

        const arrPage = [];
        if (chk_all) {
            arrPage.push(TYPE_PAGE_HOME);
            arrPage.push(TYPE_PAGE_VIDEO);
            arrPage.push(TYPE_PAGE_LIVE);
        } else {
            if (chk_home) {
                arrPage.push(TYPE_PAGE_HOME);
            }
            if (chk_video) {
                arrPage.push(TYPE_PAGE_VIDEO);
            }
            if (chk_gif) {
                arrPage.push(TYPE_PAGE_LIVE);
            }
        }
        if (arrPage.length === 0) {
            arrPage.push(TYPE_PAGE_HOME);
            arrPage.push(TYPE_PAGE_VIDEO);
            arrPage.push(TYPE_PAGE_LIVE);
        }
        const uniquePages = [];
        $.each(arrPage, function (i, el) {
            if ($.inArray(el, uniquePages) === -1) uniquePages.push(el);
        });

        if (!checkInputString(name)) {
            showDialog("Notice", "Please enter category name");
            return false;
        }

        if (!checkInputNumber(position)) {
            showDialog("Notice", "Please enter display position");
            return false;
        }

        if (parseInt(position) < 0) {
            showDialog("Notice", "Please enter position greater than zero");
            return false;
        }

        if (!checkInputString(note)) {
            showDialog("Notice", "Please enter description for this category");
            return false;
        }

        const str = "Do you want add new category with name <b>" + name + "</b>, display position <b>" + position + "</b> ?";

        confirmDialog(str, "Add", () => {
            createCategory(name, position, note, uniquePages);
        });

        return false;
    });
});

function createCategory(name, position, note, arrPage) {
    const params = {
        "name": name,
        "position": position,
        "description": note,
        "pages": arrPage
    };
    const req = new Request();
    req.post("create-category", params, (data) => {
        hideAllModal();
        if (parseInt(data.rc) === 0) {
            showDialog("Notice", "Create category success !!", null, (e) => {
                resetUI();
            });
        } else {
            showDialog("Warning", "Create category failed <br/> <b>" + data.rd + "</b>");
        }
    });
}

function resetUI() {
    $("#name").val("");
    $("#position").val("");
    $("#note").val("");
}