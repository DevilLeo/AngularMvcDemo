/**
 * Created by zhouzhengkai on 2015/12/4.
 */

'use strict';
var app = angular.module('TemplateApp');

/**
 *学信网查询页面 controller
 */
app.controller('ChsiQueryCtrl', function ($scope,ChsiUserInfo,ChsiService, CommonService) {
    ChsiUserInfo.vercode = "";
    ChsiUserInfo.vercodebase64 = "";
    $scope.ChsiUserInfo = ChsiUserInfo;

    $scope.getVerifyCode = function(type){
        ChsiUserInfo.vercode = "";
        ChsiUserInfo.vercodebase64 = "";
        ChsiService.getVerifyCode().then(function (data){
            if (data && data.StatusCode == '0') {
                ChsiUserInfo.token = data.Token;
                ChsiUserInfo.vercodebase64 = "data:image/png;base64," + data.VerCodeBase64;
                //ChsiUserInfo.vercodebase64 = data.VerCodeUrl;
            } else {
                console.log(data);
                CommonService.NotifyWarning(data.StatusDescription);
            }
        },function(){
            if (type == "hand")
                CommonService.NotifyWarning();
        });
    };

    $scope.query = function(){
        ChsiService.query(ChsiUserInfo).then(function (data){
            if (data && data.StatusCode == '0') {
                CommonService.NotifySuccess(data.StatusDescription);
            } else {
                console.log(data);
                $scope.getVerifyCode('hand');
                CommonService.NotifyWarning(data.StatusDescription);
            }
        },function(){
            $scope.getVerifyCode('hand');
            CommonService.NotifyWarning();
        });
    }
})