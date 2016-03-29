/**
 * Created by songbingzhi on 2015/11/30.
 */
'use strict';
var app = angular.module('TemplateApp');
app.controller("MobileCtrl",function($scope,MobileService,MobileReq, CommonService){
    $scope.MobileReq=MobileReq;
    var NextProCode = {
        Init: ["1", "初始化"],
        Login: ["2", "登录"],
        SendSMS: ["3", "发送短信验证"],
        ServicePassword: ["4", "登录，服务密码验证"],
        SendSMSAndVercode: ["5", "发送短信和图片验证码验证"],
        Vercode: ["6", "获取图片验证码"],
        CheckSMS: ["7", "验证短信动态码或图片验证码"],
        Query: ["8", "查询"],
    }

    $scope.mobileinit=function(){

        $scope.MobileReq.CurrentCode=$scope.MobileReq.nextProCode;
        var nextCode = NextProCode[$scope.MobileReq.nextProCode][0];
        var result={
            Token:$scope.MobileReq.Token,
            BusType:$scope.MobileReq.BusType,
            busId:$scope.MobileReq.busId,
            Name:$scope.MobileReq.Name,
            IdentityCard:$scope.MobileReq.IdentityCard,
            Vercode:$scope.MobileReq.Vercode,
            Smscode:$scope.MobileReq.Smscode,
            Mobile:$scope.MobileReq.Mobile,
            Password:$scope.MobileReq.Password,
            Website:$scope.MobileReq.Website,
            Servecode:$scope.MobileReq.Servecode
        }
        switch (nextCode)
        {
            case "1":
                MobileService.init(result).then(function (data) {
                   console.log(data)
                    DynamicLoad(data)
                },function(erro){
                    $scope.MobileReq.StatusCode=1;
                    $scope.MobileReq.StatusDescription="服务异常";
                })
                break;
            case "2":
            case "4":
                MobileService.login(result).then(function (data) {
                    console.log(data)
                    DynamicLoad(data)
                },function(erro){
                    $scope.MobileReq.StatusCode=1;
                    $scope.MobileReq.StatusDescription="服务异常";
                })
                break;
            case "3":
            case "5":
            case "6":
                MobileService.sendsms(result).then(function (data) {
                    console.log(data)
                    DynamicLoad(data)
                },function(erro){
                    $scope.MobileReq.StatusCode=1;
                    $scope.MobileReq.StatusDescription="服务异常";
                })
                break;
            case "7":
                MobileService.checksms(result).then(function (data) {
                    console.log(data)
                    DynamicLoad(data)
                },function(erro){
                    $scope.MobileReq.StatusCode=1;
                    $scope.MobileReq.StatusDescription="服务异常";
                })
                break;
            case "8":
                MobileService.query(result).then(function (data) {
                    console.log(data)
                    DynamicLoad(data)
                },function(erro){
                    $scope.MobileReq.StatusCode=1;
                    $scope.MobileReq.StatusDescription="服务异常";
                })
                break;
        }
    }

    var DynamicLoad= function (data) {

        if(data&& typeof data=="object" )
        {
            $scope.MobileReq.StatusCode=data.StatusCode;
            $scope.MobileReq.StatusDescription=data.StatusDescription;
            if(data.StatusCode>0)
            {
                CommonService.NotifyWarning(data.StatusDescription);
                return;
            }
            else
            {
                if(data.StatusDescription)
                    CommonService.NotifySuccess(data.StatusDescription);
            }
            if(data.nextProCode!=null)
            {
            $scope.MobileReq.Token=data.Token;
            $scope.MobileReq.Website=data.Website;
            $scope.MobileReq.nextProCode=data.nextProCode;
            $scope.MobileReq.nextProText= NextProCode[data.nextProCode][1];
            var code= NextProCode[$scope.MobileReq.CurrentCode][0];
            var nextCode= NextProCode[data.nextProCode][0];
            switch (code)
            {
                case "2":
                    if (nextCode == "7") {
                        $scope.SmsList=[$scope.MobileReq];
                    }
                    break;
                case "3":
                    $scope.SmsList=[$scope.MobileReq];
                    break;
                case "6":
                    if(data.VerCodeBase64!="none")
                    {
                        $scope.MobileReq.VerCodeBase64="data:image/png;base64,"+data.VerCodeBase64;
                        $scope.VerCodeList=[$scope.MobileReq];
                    }
                    break;
                case "5":
                    $scope.SmsList=[$scope.MobileReq];
                    if(data.VerCodeBase64!="none")
                    {
                        $scope.MobileReq.VerCodeBase64="data:image/png;base64,"+data.VerCodeBase64;
                        $scope.VerCodeList=[$scope.MobileReq];
                    }
                    break;
                case "4":
                    $scope.ServecodeList=[$scope.MobileReq];
                    break;
                case "1":
                    $scope.LoginList=[$scope.MobileReq];
                    if(data.VerCodeBase64!="none")
                    {
                        $scope.MobileReq.VerCodeBase64="data:image/png;base64,"+data.VerCodeBase64;
                        $scope.VerCodeList=[$scope.MobileReq];
                    }
                break;
            }
            }
        }
    }

})
