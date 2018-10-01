/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global Function */
// edit
//console.log = function () {};

function checkResponseResult(data) {
    if (data !== undefined && data !== null) {
        const rc = parseInt(data.rc);
        if (rc === -1001) {
            window.location.replace("login.jsp");
        }
    }
}