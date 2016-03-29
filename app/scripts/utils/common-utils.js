/**
 * ͨ�ù���
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
         * ��ȡָ��ѡ������Ԫ�ض���
         */
        get: function(selector){
            return $(selector);
        },
        /**
         * ���õ�ǰѡ�����Ľ���
         */
        setFocus: function(selector){
            $(selector).focus();
        },
        /**
         * ��ʾ��ǰѡ������Ԫ��
         */
        show: function(selector){
            $(selector).show();
        },
        /**
         * ��ʾ��ǰѡ������Ԫ�ز�����
         */
        showMediate: function(selector){
            $(selector).css("display","-webkit-box");
        },
        /**
         * ���ص�ǰѡ������Ԫ��
         */
        hide: function(selector){
            $(selector).hide();
        },
        /**
         * ��ȡ������ָ��ѡ����Ԫ�ص��ı�����
         */
        text: function(selector,value){
            if(value==undefined){
                return $(selector).text();
            }else{
                return $(selector).text(value);
            }
        },
        /**
         * �ж��Ƿ��ǵ绰����
         */
        isPhoneNo: function(value){
            return /^1\d{10}$/.test(value);
        },
        /**
         * �ж��Ƿ��ǵ绰����
         */
        MobileCheck : function (inpVal) {
            var Errors = [true, "�������ֻ�����", "����ȷ��д�ֻ�����"];
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
         * �ж��Ƿ����ֻ���������
         */
        isPhonePassword: function(value){
            return /^\d{6}$/.test(value);
        },
        /**
         * �ж��Ƿ�������
         */
        isEmail: function(value){
            return /^[\w\-\.]+@[\w\-\.]+(\.\w+)+$/.test(value);
        },
        /**
         * �ж��Ƿ������֤����
         */
        isIdentityNo: function(value){
            return /^(\d{15})$|^(\d{17}(?:\d|x|X))$/.test(value);
        },
        /**
         * �ж��Ƿ������֤����
         */
        IdCardCheck : function (idCard) {
            var defer = $q.defer();
            var Errors = [
                true,
                "���������֤����", "���֤����У�����"];
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
         * �ж�ֵ�Ƿ�Ϊ��
         */
        isBlank: function(value) {
            return value == undefined || value == null || this.trim(value) == '';
        },
        /**
         * ȥ�ո�
         */
        trim: function(value) {
            return value.replace(/(^\s*)|(\s*$)/g, '');
        },
        isBankCardNo: function(value){
            return /^[0-9]{16,19}$/.test(value);
        },
        /**
         * ����ID��ѯDOM
         */
        getDom : function(id) {
            return window.document.getElementById(id);
        },

        /**
         * У���ֶι���
         * fieldName:�ֶ�ֵ
         * msg����������ʾ��Ϣ
         * regexp������ƥ�����
         */
        checkIdCardImpl: function(fieldName, msg, regexp){
            if (fieldName == undefined || fieldName == '' || (regexp != '' && regexp.test(fieldName) == false)) {
                return false;
            }
            return true;
        },
        /**
         * ��ʽ������
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
         * ����Url����
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