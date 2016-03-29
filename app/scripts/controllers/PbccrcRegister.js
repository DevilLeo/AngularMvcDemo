/**
 * Created by zhouzhengkai on 2015/11/24.
 */

'use strict';
var app = angular.module('TemplateApp');

/**
 * 央行征信注册页面 controller
 */
app.controller('PbccrcRegisterCtrl', function ($scope,$location,PbccrcUserInfo,PbccrcService,ngUtils,CommonService) {
    /**
     * 初始化 $scope
     */
    PbccrcUserInfo.vercode = "";
    PbccrcUserInfo.vercodebase64 = "";
    $scope.PbccrcUserInfo = PbccrcUserInfo;
    $scope.disablesmscode = true;
    /**
     * 获取验证码
     */
    $scope.getVerifyCode = function (type) {
        PbccrcUserInfo.vercodebase64 = "";
        PbccrcService.getVerifyCode().then(function (data) {
            if (data && data.StatusCode == '0') {
                PbccrcUserInfo.token = data.Token;
                PbccrcUserInfo.vercodebase64 = "data:image/png;base64," + data.VerCodeBase64;
            } else {
                console.log(data);
                CommonService.NotifyWarning(data.StatusDescription);
            }
        }, function (data) {
            if (type == "hand")
                alert(data);
        });
    }
    /**
     * 征信注册第一步 -- 验证证件信息是否正确
     */
    $scope.checkCertInfo = function(){
        PbccrcService.Reg_Step1(PbccrcUserInfo).then(function(data){
            if (data && data.StatusCode == '0') {
                $location.path("/Pbccrc/Reg_Detail");
                $location.replace();
            }
            else {
                $scope.getVerifyCode("hand");
                console.log(data);
                CommonService.NotifyWarning(data.StatusDescription);
            }
        },function(){
            CommonService.NotifyWarning();
        });
    };
    /**
     * 征信注册第二步 -- 发送短信验证码
     */
    $scope.SendSmsCode = function(){
        $scope.disablesmscode = true;
        PbccrcUserInfo.smscode = "";
        ngUtils.MobileCheck(PbccrcUserInfo.mobiletel).then(function () {
            PbccrcService.Reg_Step2(PbccrcUserInfo).then(function(data){
                if (data && data.StatusCode == '0') {
                    $scope.disablesmscode = false;
                }
                else {
                    console.log(data);
                    CommonService.NotifyWarning(data.StatusDescription);
                }
            },function(){
                CommonService.NotifyWarning();
            });
        }, function (e) {
            CommonService.NotifyWarning(e.msg);
        });
    };
    /**
     * 征信注册第三步 -- 提交用户信息
     */
    $scope.SubmitRegInfo = function(){
        ngUtils.MobileCheck(PbccrcUserInfo.mobiletel).then(function (data) {
            PbccrcService.Reg_Step3(PbccrcUserInfo).then(function(data){
                if (data && data.StatusCode == '0') {
                    $location.path("/Pbccrc/Login");
                    $location.replace();
                }
                else {
                    console.log(data);
                    CommonService.NotifyWarning(data.StatusDescription);
                }
            },function(){
                CommonService.NotifyWarning();
            });
        }, function (e) {
            CommonService.NotifyWarning(e.msg);
        });
    };
});