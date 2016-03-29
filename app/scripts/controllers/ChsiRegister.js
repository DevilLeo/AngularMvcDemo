/**
 * Created by zhouzhengkai on 2015/12/4.
 */

'use strict';
var app = angular.module('TemplateApp');

/**
 *学信网查询页面 controller
 */
app.controller('ChsiRegisterCtrl', function ($scope,ChsiRegInfo,ChsiService, CommonService,ngUtils) {
    ChsiRegInfo.vercode = "";
    ChsiRegInfo.vercodebase64 = "";
    $scope.ChsiRegInfo = ChsiRegInfo;
    $scope.questions =
        [
            {id:"1", question:"您母亲的姓名是？"},
            {id:"2", question:"您配偶的生日是？"},
            {id:"3", question:"您的学号（或工号）是？"},
            {id:"4", question:"您母亲的生日是？"},
            {id:"5", question:"您高中班主任的名字是？"},
            {id:"6", question:"您父亲的姓名是？"},
            {id:"7", question:"您小学班主任的名字是？"},
            {id:"8", question:"您父亲的生日是？"},
            {id:"9", question:"您配偶的姓名是？"},
            {id:"10", question:"您初中班主任的名字是？"},
            {id:"11", question:"您最熟悉的童年好友名字？"},
            {id:"12", question:"您最熟悉的学校宿舍室友名？"},
            {id:"13", question:"对您影响最大的人名字是？"},
        ];

    $scope.getMobileVerifyCode = function(){
        ChsiRegInfo.vercode = "";
        ChsiRegInfo.vercodebase64 = "";
        ngUtils.MobileCheck(ChsiRegInfo.mobile).then(function(){
            ChsiService.getMobileVerifyCode(ChsiRegInfo).then(function (data){
                if (data && data.StatusCode == '0') {
                    ChsiRegInfo.token = data.Token;
                    console.log(ChsiRegInfo.token);
                    ChsiRegInfo.vercodebase64 = "data:image/png;base64," + data.VerCodeBase64;
                    //ChsiRegInfo.vercodebase64 = data.VerCodeUrl;
                } else {
                    console.log(data);
                    CommonService.NotifyWarning(data.StatusDescription);
                }
            },function(){
                CommonService.NotifyWarning();
            });
        },function(e){
            CommonService.NotifyWarning(e.msg);
        })
    };

    $scope.getMobileSMSCode = function(){
        ChsiService.getMobileSMSCode(ChsiRegInfo).then(function (data){
            if (data && data.StatusCode == '0') {
                CommonService.NotifySuccess(data.StatusDescription);
            } else {
                console.log(data);
                CommonService.NotifyWarning(data.StatusDescription.replace("<div>[","").replace("]</div>", ""));
            }
        },function(){
            CommonService.NotifyWarning();
        });
    };

    $scope.register = function(){
        if(ChsiRegInfo.pwdreq1 == ChsiRegInfo.pwdreq2 || ChsiRegInfo.pwdreq1 == ChsiRegInfo.pwdreq3 || ChsiRegInfo.pwdreq3 == ChsiRegInfo.pwdreq2){
            CommonService.NotifyWarning("密保问题不能相同");
            return;
        }
        ChsiService.register(ChsiRegInfo).then(function (data){
            if (data && data.StatusCode == '0') {
                CommonService.NotifySuccess(data.StatusDescription);
            } else {
                console.log(data);
                CommonService.NotifyWarning(data.StatusDescription);
            }
        },function(){
            CommonService.NotifyWarning();
        });
    }
})