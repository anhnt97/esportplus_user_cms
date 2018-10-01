/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global BootstrapDialog */

$(document).ready(function () {

    var options = {
        message: 'This value is not valid',
        live: 'enabled',
        framework: 'bootstrap',
        excluded: [':disabled'],
        icon: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            username: {
                validators: {
                    notEmpty: {
                        message: "Please enter username"
                    },
                    stringLength: {
                        min: 4,
                        max: 30,
                        message: 'Length from 4 - 30 character'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9_\.]+$/,
                        message: 'User name format incorrect'
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: "Please enter password"
                    },
                    stringLength: {
                        min: 6,
                        message: "Password length greater than 6 character"
                    }
                }
            }
        }
    };
    $('#loginform').bootstrapValidator(options)
        .on('success.form.bv', function (e) {
            e.preventDefault();
            $("#send_btn").attr("disabled", false);
            var data = $(e.target).serializeArray();
            login(data);
        });
});

function getValue(array, key) {
    for (var i = 0; i < array.length; ++i) {
        if (array[i].name === key) {
            return array[i].value;
        }
    }
    return "";
}

function login(data) {

    console.log("data: " + JSON.stringify(data));
    var username = getValue(data, "username");
    var password = getValue(data, "password");

    var req = new Request();
    $("#btnLogin").attr("disabled", false);
    var params = {
        username: username,
        password: password
    };

    req.postRequest(
        "login",
        params,
        function (data) {
            if (data !== undefined && data !== null) {
                loginSucces(data);
            } else {
                hideAllModal();
            }
        },
        function (err) {
        }
    );
}

function loginSocial(data) {
    console.log(JSON.stringify(data));
    var req = new Request();
    req.post("login-social", data, (d) => {
        loginSucces(d);
    });
}

function loginSucces(data) {
    var rc = data.rc;
    var rd = data.rd;
    if (rc === 0) {
        localStorage['username'] = username;
        localStorage['role'] = data.role;
        window.location.replace("dashboard");
    } else {
        showDialog("Warning", "Login failed <br/>" + rd, null, function (res) {
            $("#username").focus();
        });
    }
}
