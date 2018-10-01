/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var validatorObj = function () {
    this.message = 'This value is not valid';
    this.live = 'enabled';
    this.framework = 'bootstrap';
    this.excluded = ':disabled';
    this.icon = {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
    };
    this.feedbackIcons = {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
    };
    this.fields = {};
};

validatorObj.prototype.setFields = function (fields) {
    this.fields = fields;
};
