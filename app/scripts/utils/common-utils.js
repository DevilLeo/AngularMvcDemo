/**
 * 通用工具
 */
/*(function(window, angular, undefined) {
 'use strict';
 angular.module('ngUtils', [ 'ng' ]).factory('$ngUtils', [ function($ngUtils) {
 return {
 focus:function(){

 }
 };
 } ]);
 })(window, window.angular);*/

'use strict';

var app = angular.module('TemplateApp');

app.factory("ngUtils",["$q",function($q){
    return {
        /**
         * 获取指定选择器的元素对象
         */
        get: function(selector){
            return $(selector);
        },
        /**
         * 设置当前选择器的焦点
         */
        setFocus: function(selector){
            $(selector).focus();
        },
        /**
         * 显示当前选择器的元素
         */
        show: function(selector){
            $(selector).show();
        },
        /**
         * 显示当前选择器的元素并居中
         */
        showMediate: function(selector){
            $(selector).css("display","-webkit-box");
        },
        /**
         * 隐藏当前选择器的元素
         */
        hide: function(selector){
            $(selector).hide();
        },
        /**
         * 获取或设置指定选择器元素的文本内容
         */
        text: function(selector,value){
            if(value==undefined){
                return $(selector).text();
            }else{
                return $(selector).text(value);
            }
        },
        /**
         * 判定是否是电话号码
         */
        isPhoneNo: function(value){
            return /^1\d{10}$/.test(value);
        },
        /**
         * 判定是否是电话号码
         */
        MobileCheck : function (inpVal) {
            var Errors = [true, "请输入手机号码", "请正确填写手机号码"];
            var phoneNum = inpVal;
            var defer = $q.defer();
            if (phoneNum == null || phoneNum == "") {
                defer.reject({msg: Errors[1]});
                return defer.promise;
            } else if (phoneNum.length != 11) {
                defer.reject({msg: Errors[2]});
                return defer.promise;
            } else if (!phoneNum.match(/^0?1[3|4|5|7|8][0-9]\d{8}$/)) {
                defer.reject({msg: Errors[2]});
                return defer.promise;
            }
            defer.resolve(inpVal);
            return defer.promise;
        },
        /**
         * 判定是否是手机服务密码
         */
        isPhonePassword: function(value){
            return /^\d{6}$/.test(value);
        },
        /**
         * 判定是否是邮箱
         */
        isEmail: function(value){
            return /^[\w\-\.]+@[\w\-\.]+(\.\w+)+$/.test(value);
        },
        /**
         * 判定是否是身份证号码
         */
        isIdentityNo: function(value){
            return /^(\d{15})$|^(\d{17}(?:\d|x|X))$/.test(value);
        },
        /**
         * 判定是否是身份证号码
         */
        IdCardCheck : function (idCard) {
            var defer = $q.defer();
            var Errors = [
                true,
                "请输入身份证号码", "身份证号码校验错误"];
            var reg = /^(?:\d{8}(?:0[1-9]|1[0-2])[0123]\d{4}|\d{6}(?:18|19|20)\d{2}(?:0[1-9]|1[0-2])[0123]\d{4}[0-9Xx])?$/;
            if (idCard == null || idCard == "") {
                defer.reject({msg: Errors[1]});
            } else if (idCard && !reg.test(idCard)) {
                defer.reject({msg: Errors[2]});
            } else {
                defer.resolve('ok');
            }
            defer.resolve(idCard);
            return defer.promise;
        },
        /**
         * 判断值是否为空
         */
        isBlank: function(value) {
            return value == undefined || value == null || this.trim(value) == '';
        },
        /**
         * 去空格
         */
        trim: function(value) {
            return value.replace(/(^\s*)|(\s*$)/g, '');
        },
        isBankCardNo: function(value){
            return /^[0-9]{16,19}$/.test(value);
        },
        /**
         * 根据ID查询DOM
         */
        getDom : function(id) {
            return window.document.getElementById(id);
        },

        /**
         * 校验字段规则
         * fieldName:字段值
         * msg：弹出的提示信息
         * regexp：正则匹配规则
         */
        checkIdCardImpl: function(fieldName, msg, regexp){
            if (fieldName == undefined || fieldName == '' || (regexp != '' && regexp.test(fieldName) == false)) {
                return false;
            }
            return true;
        },
        /**
         * 格式化日期
         */
        getFormatDate:function(date){
            var year = date.getFullYear();
            var month = date.getMonth()+1;
            var day= date.getDate();
            var hour= date.getHours();
            var minute= date.getMinutes();
            var second= date.getSeconds();
            return year+"/"+month+"/"+day+" "+hour+":"+minute+":"+second;
        },
        /**
         * 进行Url编码
         */
        urlencode:function(str) {
            str = (str + '').toString();

            return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').
                replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
        },
        htmlDecode : function( str ) {
            var _str = '';
            if (str.length == 0) return '';
            _str = str.replace(/&/g, '&');
            _str = _str.replace(/</g, '<');
            _str = _str.replace(/>/g, '>');
            _str = _str.replace(/"/g, '"');
            return _str;
        },


    };
}]);