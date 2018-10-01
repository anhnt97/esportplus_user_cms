/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var pass_regex = /^(?=.*[^a-zA-Z])(?=.*[a-z])(?=.*[A-Z])\S{8,}$/;
$(document).ready(function () {
    var valid = new validatorObj();
    var fields = {
        oldpass: {
            validators: {
                notEmpty: {
                    message: "Please enter current password"
                },
                stringLength: {
                    min: 6,
                    message: "Password length greater than 6 character"
                }
            }
        },
        newpass: {
            validators: {
                notEmpty: {
                    message: "Please enter new password"
                },
                stringLength: {
                    min: 6,
                    message: "Password length greater than 6 character"
                },
                regexp: {
                    regexp: pass_regex,
                    message: 'Password format incorrect'
                }
            }
        },
        reenterpass: {
            validators: {
                notEmpty: {
                    message: "Please re-enter new password"
                },
                identical: {
                    field: 'newpass',
                    message: 'Re-enter password incorrect'
                }
            }
        }
    };
    //TEST
    valid.setFields(fields);
    $('#form1').bootstrapValidator(valid)
            .on('success.form.bv', function (e) {
                e.preventDefault();
                $("#btnChange").attr("disabled", false);
                var data = $(e.target).serializeArray();
                confirmChangePassword(data);
            });

});

function confirmChangePassword(data) {
    confirmDialog("Do you want change password", "Change", function () {
        changepass(data);
    });
}

function changepass(data) {

    var oldpass = getValueInSerializeArray(data, "oldpass");
    var newpass = getValueInSerializeArray(data, "newpass");
    var req = new Request();
    var params = {oldpass: oldpass, newpass: newpass};

    req.postRequest(
            "changepass",
            params,
            function (data) {
                hideAllModal();
                if (parseInt(data.rc) === 0) {
                    showDialog("Notice", "Change password success", null, function (e) {
                        reset();
                    });
                } else {
                    showDialog("Warning", "Change password failed <br/> <b>" + data.rd + "</b>");
                }
            },
            function (jXHR) {
                console.log("Err");
            });
}

function reset() {
    $("#oldpass").val("");
    $("#newpass").val("");
    $("#reenterpass").val("");
    $('#form1').bootstrapValidator('resetForm', true);
}