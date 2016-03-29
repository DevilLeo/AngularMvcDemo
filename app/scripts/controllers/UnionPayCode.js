/**
 * Created by zhouzhengkai on 2015/11/26.
 */

'use strict';
var app = angular.module('TemplateApp');

/**
 * 获取银联认证码页面 controller
 */
app.controller('UnionPayCodeCtrl', function ($scope,$location,UnionPayInfo,UnionPayRule,UnionPayService,ngUtils,CommonService,CommonEncrypt) {
    /**
     * 初始化 $scope
     */
    $scope.UnionPayInfo = UnionPayInfo;
    $scope.UnionPayRule = UnionPayRule;
    $scope.disablesmscode = true;
    $scope.creditcarddisplay = "";
    /**
     * 校验银联卡
     */
    $scope.CheckCard = function(){
        UnionPayInfo.token = $location.search().t;
        UnionPayService.CheckCard(UnionPayInfo).then(function(data){
            if (data && data.StatusCode == '0') {
                var Result = eval("(" + data.Result + ")");
                UnionPayRule.creditcarddisplay = Result.p.displayCardInfo.bankName + Result.p.displayCardInfo.cardTypeDisplay;
                var rules = Result.p.displayCardInfo.rules;
                UnionPayRule.mobile = rules.mobile;
                UnionPayRule.smsCode = rules.smsCode;
                UnionPayRule.expire = rules.expire;
                UnionPayRule.cvn2 = rules.cvn2;
                UnionPayRule.credential = rules.credential;
                UnionPayRule.credentialType = rules.credential;
                UnionPayRule.name = rules.name;
                UnionPayRule.password = rules.password;
                $location.url("/Union/Detail");
            }
            else {
                console.log(data);
                CommonService.NotifyWarning(data.StatusDescription);
            }
        },function(){
            CommonService.NotifyWarning();
        });
    }
    /**
     * 发送短信验证码
     */
    $scope.SendSmsCode = function(){
        $scope.disablesmscode = true;
        ngUtils.MobileCheck(UnionPayInfo.mobile).then(function (data) {
            $scope.SendSMS();
        }, function (data) {
            CommonService.NotifyWarning(data.msg);
        });
    }
    $scope.SendSMS = function(){
        UnionPayService.SendSMS(UnionPayInfo).then(function(data2){
            if (data2 && data2.StatusCode == '0') {
                $scope.disablesmscode = false;
                UnionPayRule.submit = false;
            }
            else {
                console.log(data);
                CommonService.NotifyWarning(data2.StatusDescription);
            }
        },function(){
            CommonService.NotifyWarning();
        });
    }
    /**
     * 提交用户验证信息
     */
    $scope.Submit = function(){
        var flag = $scope.validInfo();
        if(!flag){
            CommonService.NotifyWarning("必填项不能为空");
            return;
        }
        ngUtils.MobileCheck(UnionPayInfo.mobile).then(function (data) {
            UnionPayInfo.password = CommonEncrypt.encrypt(UnionPayInfo.password);//密码需先经过TrippleDes加密
            UnionPayInfo.password = CommonService.base64(UnionPayInfo.password);//再经过Base64加密
            UnionPayService.Submit(UnionPayInfo).then(function(data){
                if (data && data.StatusCode == '0') {
                    CommonService.NotifySuccess(data.StatusDescription);
                }
                else {
                    UnionPayInfo.smscode = "";
                    $scope.disablesmscode = true;
                    UnionPayRule.submit = true;
                    console.log(data);
                    CommonService.NotifyWarning(data.StatusDescription);
                }
            },function(){
                UnionPayInfo.smscode = "";
                $scope.disablesmscode = true;
                UnionPayRule.submit = true;
                CommonService.NotifyWarning();
            });
        }, function (e) {
            CommonService.NotifyWarning(e.msg);
        });
    }
    /**
     * 校验银联认证信息(页面显示项)
     */
    $scope.validInfo = function(){
        var flag = false;
        //验证短信验证码是否为空
        if(UnionPayRule.smsCode) {
            flag = ngUtils.checkIdCardImpl(UnionPayInfo.smscode, "必填项不能为空", "");
            if (!flag) {
                return false;
            }
        }
        //验证密码是否为空
        if(UnionPayRule.password) {
            flag = ngUtils.checkIdCardImpl(UnionPayInfo.password, "必填项不能为空", "");
            if (!flag) {
                return false;
            }
        }
        //验证cvn2是否为空
        if(UnionPayRule.cvn2) {
            flag = ngUtils.checkIdCardImpl(UnionPayInfo.cvn2, "必填项不能为空", "");
            if (!flag) {
                return false;
            }
        }
        //验证有效期是否为空
        if(UnionPayRule.expire) {
            flag = ngUtils.checkIdCardImpl(UnionPayInfo.expire, "必填项不能为空", "");
            if (!flag) {
                return false;
            }
        }
        //验证证件号码是否为空
        if(UnionPayRule.credential) {
            flag = ngUtils.checkIdCardImpl(UnionPayInfo.credential, "必填项不能为空", "");
            if (!flag) {
                return false;
            }
        }
        //验证姓名是否为空
        if(UnionPayRule.name) {
            flag = ngUtils.checkIdCardImpl(UnionPayInfo.name, "必填项不能为空", "");
            if (!flag) {
                return false;
            }
        }
        //验证手机号是否为空
        if(UnionPayRule.mobile) {
            flag = ngUtils.checkIdCardImpl(UnionPayInfo.mobile, "必填项不能为空", "");
            if (!flag) {
                return false;
            }
        }
        return true;
    };
});