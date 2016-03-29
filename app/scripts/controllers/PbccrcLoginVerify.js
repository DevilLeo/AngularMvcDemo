/**
 * Created by zhouzhengkai on 2015/11/25.
 */

'use strict';
var app = angular.module('TemplateApp');

/**
 * ��������ע�ἰ��֤ҳ�� controller
*/
app.controller('PbccrcLoginVerifyCtrl', function ($scope,$location,$q,PbccrcUserInfo,PbccrcUnion,PbccrcService,ngUtils, CommonService) {
    /**
     * ��ʼ�� $scope
     */
    PbccrcUserInfo.vercode = "";
    PbccrcUserInfo.vercodebase64 = "";
    PbccrcUnion.vercode = "";
    PbccrcUnion.vercodebase64 = "";
    $scope.PbccrcUserInfo = PbccrcUserInfo;
    $scope.PbccrcUnion = PbccrcUnion;
    $scope.results = {};
    /**
     * ��ȡ��֤��
     * type - ���÷�ʽ��=init����ʼ��ʱ����ʾ�����㣻= hand,���ӵ�����
     */
    $scope.getVerifyCode = function (type) {
        PbccrcUserInfo.vercodebase64 = "";
        PbccrcService.getVerifyCode().then(function (data) {
            if (data && data.StatusCode == '0') {
                PbccrcUserInfo.token = data.Token;
                PbccrcUnion.token = data.Token;
                PbccrcUserInfo.vercodebase64 = "data:image/png;base64," + data.VerCodeBase64;
            } else {
                consloe.log(data);
                CommonService.NotifyWarning(data.StatusDescription);
            }
        }, function (data) {
            if (type == "hand")
                CommonService.NotifyWarning(data);
        });
    }
    /**
     * ���ŵ�¼
     */
    $scope.Login = function(){
        PbccrcService.Login(PbccrcUserInfo).then(function(data){
            if (data && data.StatusCode == '0') {
                $location.url("/Pbccrc/Type");
                $location.replace();
            }
            else {
                consloe.log(data);
                $scope.getVerifyCode("hand");
                CommonService.NotifyWarning(data.StatusDescription);
            }
        },function(data){
            CommonService.NotifyWarning();
        });
    };
    /**
     * ����ѡ����֤����
     */
    $scope.SelectType = function(){
        var type = PbccrcUserInfo.type;
        if(type == 1)
        {
            $location.url("/Pbccrc/VerifyQuestion");
            $location.replace();
        }
        else if(type == 2)
        {
            $location.url("/Pbccrc/VerifyUnion");
            $location.replace();
        }
        else if(type == 3)
        {
            $location.url("/Pbccrc/Query");
            $location.replace();
        }
        else
        {
            CommonService.NotifyWarning("����ѡ�����. ��������Ϊ��" + type);
        }
    };
    /**
     * ������֤ҳ���ʼ����������֤��
     */
    $scope.QuestionInit = function() {
        PbccrcService.GetQuestion(PbccrcUserInfo).then(function (data) {
            if (data && data.StatusCode == '0') {
                $scope.results = JSON.parse(data.Result);
            }
            else{
                consloe.log(data);
                CommonService.NotifyWarning(data.StatusDescription);
            }
        }, function (data) {
            CommonService.NotifyWarning();
        });
    };
    /**
     * ���ô𰸣�������֤��
     */
    $scope.selectOption = function(index, value) {
        $scope.results[index].answerresult = value;
    };
    /**
     * �ύ�𰸣�������֤��
     */
    $scope.SubmitAnswer = function() {
        if ($scope.results) {
            for (var i = 0; i < $scope.results.length; i++) {
                if ($scope.results[i].answerresult && $scope.results[i].answerresult > 0) {
                    //$scope.results[i] = JSON.parse(CommonService.UTF162UTF8(JSON.stringify($scope.results[i])));
                }
                else {
                    CommonService.NotifyWarning("�뽫����ش�������");
                    return;
                }
            }
        }
        var param =
        {
            'token': PbccrcUserInfo.token,
            'kbaQuestions': $scope.results
        };
        PbccrcService.SubmitAnswer(param).then(function (data) {
            if (data && data.StatusCode == 0) {
                CommonService.NotifySuccess(data.StatusDescription);
            } else {
                console.log(data);
                CommonService.NotifyWarning(data.StatusDescription);
            }
        }, function (data) {
            CommonService.NotifyWarning();
        })
    };
    /**
     * ��ȡ������֤�루������֤��
     */
    $scope.getUnionPayCode = function() {
        var param =
        {
            "UnionHtml": CommonService.encode(ngUtils.urlencode(PbccrcUnion.result))
        };
        PbccrcService.getUnionPayCode(param).then(function(data){
            if (data && data.StatusCode == '0') {
                var url = $location.absUrl();
                url = url.substring(0,url.indexOf("#"));
                window.open( url + "#/Union/Init?t=" + data.Token);
            }
            else {
                console.log(data);
                CommonService.NotifyWarning(data.StatusDescription);
            }
        },function(data){
            CommonService.NotifyWarning();
        });
    }
    /**
     * ��ȡ��֤�루������֤��
     */
    $scope.getVerifyCode_Union = function(type) {
        PbccrcUnion.vercodebase64 = "";
        PbccrcUnion.Result = "";
        PbccrcService.getVerifyCode_Union(PbccrcUnion).then(function(data){
            if (data && data.StatusCode == '0') {
                PbccrcUnion.vercodebase64 = "data:image/png;base64," + data.VerCodeBase64;
                PbccrcUnion.result = data.Result;
            }
            else {
                console.log(data);
                CommonService.NotifyWarning(data.StatusDescription);
            }
        },function(data){
            if(type="hand")
                CommonService.NotifyWarning();
        });
    };
    /**
     * ������֤�ύ
     */
    $scope.Submit_Union = function() {
        PbccrcService.Submit_Union(PbccrcUnion).then(function(data){
            if (data && data.StatusCode == '0') {
                CommonService.NotifySuccess(data.StatusDescription);
            }
            else {
                $scope.getVerifyCode_Union("hand");
                console.log(data);
                CommonService.NotifyWarning(data.StatusDescription);
            }
        },function(data){
            CommonService.NotifyWarning();
        });
    };
    /**
     * ��ȡ��ѯ����
     */
    $scope.Query = function(){
        var param = {
            "token": PbccrcUserInfo.token,
            "querycode": $scope.querycode
        };
        PbccrcService.Query(param).then(function(data){
            if(data && data.StatusCode == '0'){
                CommonService.NotifySuccess(data.StatusDescription);
            }
            else {
                $scope.querycode = "";
                console.log(data);
                CommonService.NotifyWarning(data.StatusDescription);
            }
        },function(data){
            CommonService.NotifyWarning();
        });

    }
})