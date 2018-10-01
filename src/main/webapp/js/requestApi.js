/* global axios */

var Request = function () {
};

/*
 * 
 * @param {String} url
 * @param {JsonObject} params
 * @param {function} fnCallBack
 * @param {"Poset" "Get"} method
 * @returns {void}
 */
Request.prototype.request = (url, params, fnCallBack, method) => {
    let s = "";
    let c = 0;
    for (let i in params) {
        if (c > 0) {
            s += "&";
        }
        s += i;
        s += "=";
        s += params[i];
        c++;
    }
    s.trim();
    if (s.length > 0)
        s = s.substring(0, s.length - 1);
    console.log("link: " + url + "?" + s);

    if (method === undefined) {
        method = 'GET';
    }

    showLoading(true);
    $.ajax({
        type: method,
        url: url,
        data: params,
        dataType: 'json',
        success: (data, textStatus, jqXHR) => {
            hideAllModal();
            const jsonData = JSON.stringify(data);
            console.log("success: " + jsonData + " textStatus: " + textStatus + " jqXHR: " + jqXHR.status);
            checkResponseResult(data);
            fnCallBack(data);
        },
        error: (jqXHR, textStatus, errorThrown) => {
            showErr(jqXHR, textStatus, errorThrown);
        }
    });
};

/**
 *
 * @param {type} url
 * @param {type} params
 * @param {type} fnCallBack
 * @param {type} method
 * @param {type} onFailed
 * @returns {undefined}
 */
Request.prototype.requestNoModal = (url, params, fnCallBack, method, onFailed) => {
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
    if (method === undefined) {
        method = 'GET';
    }
    $.ajax({
        type: method,
        url: url,
        data: params,
        dataType: 'json',
        success: (data, textStatus, jqXHR) => {
            var jsonData = JSON.stringify(data);
            console.log("success: " + jsonData + " textStatus: " + textStatus + " jqXHR: " + jqXHR.status);
            checkResponseResult(data);
            fnCallBack(data);
        },
        error: (jqXHR, textStatus, errorThrown) => {
            var status = jqXHR.status;
            var s;
            if (status === 0) {
                s = "Network error !";
            } else {
                s = jqXHR.responseText;
            }
            console.log("error: jqXHR: " + JSON.stringify(jqXHR) + " textStatus: " + textStatus + " errorThrown: " + errorThrown);
            if (onFailed !== undefined) {
                onFailed();
            }
        }
    });
};

/**
 *
 * @param {type} url : url request
 * @param {type} params : params request
 * @param {type} fnSuccess : function callback if Success
 * @param {type} fnError : function callback if error.
 * @returns {undefined}
 */
Request.prototype.postRequest = (url, params, fnSuccess, fnError) => {
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
        type: "POST",
        url: url,
        data: params,
        dataType: 'json',
        success: (data, textStatus, jqXHR) => {
            var jsonData = JSON.stringify(data);
            console.log("success: " + jsonData + " textStatus: " + textStatus + " jqXHR: " + jqXHR.status);
            checkResponseResult(data);
            fnSuccess(data);
        },
        error: (jqXHR, textStatus, errorThrown) => {
            showErr(jqXHR, textStatus, errorThrown);
            fnError(jqXHR);
        }
    });
};

/**
 *
 * @param {type} url
 * @param {type} json
 * @param {type} fnSuccess
 * @returns {undefined}
 */
Request.prototype.delete = (url, json, fnSuccess) => {
    if (json === null || json === undefined) {
        json = {};
    }
    showLoading(true);
    axios.delete(url, {
        data: json
    }).then((response) => {
        hideAllModal();
        var data = response.data;
        console.log(response);
        checkResponseResult(data);
        fnSuccess(data);
    }).catch((error) => {
        hideAllModal();
        console.log(error);
        showDialog("Error", error);
    });
};

/**
 *
 * @param {type} url
 * @param {type} json
 * @param {type} fnSuccess
 * @returns {undefined}
 */
Request.prototype.update = (url, json, fnSuccess) => {
    if (json === null || json === undefined) {
        json = {};
    }
    showLoading(true);
    axios.put(url, json).then((response) => {
        hideAllModal();
        const data = response.data;
        console.log(response);
        checkResponseResult(data);
        fnSuccess(data);
    }).catch((error) => {
        hideAllModal();
        console.log(error);
        showDialog("Error", error);
    });
};

/**
 *
 * @param {type} url
 * @param {type} json
 * @param {type} fnSuccess
 * @returns {undefined}
 */
Request.prototype.post = (url, json, fnSuccess) => {
    if (json === null || json === undefined) {
        json = {};
    }
    showLoading(true);
    axios.post(url, json).then((response) => {
        hideAllModal();
        const data = response.data;
        console.log(response);
        checkResponseResult(data);
        fnSuccess(data);
    }).catch((error) => {
        hideAllModal();
        console.log(error);
        showDialog("Error", error);
    });
};

Request.prototype.postHide = (url, json, fnSuccess) => {
    if (json === null || json === undefined) {
        json = {};
    }
    axios.post(url, json).then((response) => {
        const data = response.data;
        console.log(response);
        fnSuccess(data);
    }).catch((error) => {
        console.log(error);
    });
};

/**
 *
 * @param {type} url
 * @param {type} params
 * @param {type} fnSuccess
 * @returns {undefined}
 */
Request.prototype.get = (url, params, fnSuccess) => {
    if (params === null || params === undefined) {
        params = {};
    }
    showLoading(true);
    axios.get(url, {
        params: params
    }).then((response) => {
        hideAllModal();
        const data = response.data;
        console.log(response);
        checkResponseResult(data);
        fnSuccess(data);
    }).catch((error) => {
        hideAllModal();
        console.log(error);
        showDialog("Error", error);
    });
};
Request.prototype.getNoModal = (url, params, fnSuccess) => {
    if (params === null || params === undefined) {
        params = {};
    }
    axios.get(url, {
        params: params
    }).then((response) => {
    const data = response.data;
    console.log(response);
    checkResponseResult(data);
    fnSuccess(data);
}).catch((error) => {
    console.log(error);
    showDialog("Error", error);
});
};

/**
 *
 * @param {type} url
 * @param {type} formData
 * @param {type} fnSuccess
 * @returns {undefined}
 */
Request.prototype.uploadFile = (url, formData, fnSuccess) => {
    showLoading(true);
    $.ajax({
        url: url,
        type: 'POST',
        data: formData,
        cache: false,
        dataType: 'json',
        processData: false,
        contentType: false,
        success: (data, textStatus, jqXHR) => {
            const jsonData = JSON.stringify(data);
            console.log("success: " + jsonData + " textStatus: " + textStatus + " jqXHR: " + jqXHR.status);
            checkResponseResult(data);
            fnSuccess(data);
        },
        error: (jqXHR, textStatus, errorThrown) => {
            showErr(jqXHR, textStatus, errorThrown);
        }
    });
};

showErr = (jqXHR, textStatus, errorThrown) => {
    hideAllModal();
    const status = jqXHR.status;
    let s;
    if (status === 0) {
        s = "Network error";
    } else {
        s = jqXHR.responseText;
    }
    console.log("error: jqXHR: " + JSON.stringify(jqXHR) + " textStatus: " + textStatus + " errorThrown: " + errorThrown);
    if (s.indexOf("<html>") >= 0) {
        s = "System error, contact to administrator !! <br/>";
        s += "Error: " + status;
    }
    showDialog("Error", s);
};

