/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function validateEmail(email) {
    if (email === undefined || email === null || email.trim().length === 0) {
        return false;
    }
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!filter.test(email)) {
        return false;
    }
    return true;
}

function validateAccId(accId) {
    if (accId === undefined || accId === null || accId.trim().length === 0 || accId.trim().length > 50) {
        return false;
    }
    var filter = /^[a-zA-Z0-9_\.]+$/;
    if (!filter.test(accId)) {
        return false;
    }
    return true;
}

function validateDeviceId(device) {
    if (device === undefined || device === null || device.trim().length === 0) {
        return false;
    }
    var filter = /^[a-zA-Z0-9-_\.]+$/;
    if (!filter.test(device)) {
        return false;
    }
    return true;
}

function validatePhone(phone) {
    if (phone === undefined || phone === null || phone.trim().length === 0) {
        return false;
    }
    var filter = /^[0-9]+$/;
    if (filter.test(phone)) {
        return true;
    } else {
        return false;
    }
}

function isNullOrEmpty(str) {
    if (str === undefined || str === null || str.trim().length === 0) {
        return true;
    }
    return false;
}


