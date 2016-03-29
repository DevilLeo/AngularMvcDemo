/**
 * Created by zhouzhengkai on 2015/12/4.
 */

'use strict';
var app = angular.module('TemplateApp');

/**
 *ѧ������ѯҳ�� controller
 */
app.controller('ChsiRegisterCtrl', function ($scope,ChsiRegInfo,ChsiService, CommonService,ngUtils) {
    ChsiRegInfo.vercode = "";
    ChsiRegInfo.vercodebase64 = "";
    $scope.ChsiRegInfo = ChsiRegInfo;
    $scope.questions =
        [
            {id:"1", question:"��ĸ�׵������ǣ�"},
            {id:"2", question:"����ż�������ǣ�"},
            {id:"3", question:"����ѧ�ţ��򹤺ţ��ǣ�"},
            {id:"4", question:"��ĸ�׵������ǣ�"},
            {id:"5", question:"�����а����ε������ǣ�"},
            {id:"6", question:"�����׵������ǣ�"},
            {id:"7", question:"��Сѧ�����ε������ǣ�"},
            {id:"8", question:"�����׵������ǣ�"},
            {id:"9", question:"����ż�������ǣ�"},
            {id:"10", question:"�����а����ε������ǣ�"},
            {id:"11", question:"������Ϥ��ͯ��������֣�"},
            {id:"12", question:"������Ϥ��ѧУ������������"},
            {id:"13", question:"����Ӱ�������������ǣ�"},
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
            CommonService.NotifyWarning("�ܱ����ⲻ����ͬ");
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