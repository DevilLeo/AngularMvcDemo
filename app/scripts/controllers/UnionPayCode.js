/**
 * Created by zhouzhengkai on 2015/11/26.
 */

'use strict';
var app = angular.module('TemplateApp');

/**
 * ��ȡ������֤��ҳ�� controller
 */
app.controller('UnionPayCodeCtrl', function ($scope,$location,UnionPayInfo,UnionPayRule,UnionPayService,ngUtils,CommonService,CommonEncrypt) {
    /**
     * ��ʼ�� $scope
     */
    $scope.UnionPayInfo = UnionPayInfo;
    $scope.UnionPayRule = UnionPayRule;
    $scope.disablesmscode = true;
    $scope.creditcarddisplay = "";
    /**
     * У��������
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
     * ���Ͷ�����֤��
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
     * �ύ�û���֤��Ϣ
     */
    $scope.Submit = function(){
        var flag = $scope.validInfo();
        if(!flag){
            CommonService.NotifyWarning("�������Ϊ��");
            return;
        }
        ngUtils.MobileCheck(UnionPayInfo.mobile).then(function (data) {
            UnionPayInfo.password = CommonEncrypt.encrypt(UnionPayInfo.password);//�������Ⱦ���TrippleDes����
            UnionPayInfo.password = CommonService.base64(UnionPayInfo.password);//�پ���Base64����
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
     * У��������֤��Ϣ(ҳ����ʾ��)
     */
    $scope.validInfo = function(){
        var flag = false;
        //��֤������֤���Ƿ�Ϊ��
        if(UnionPayRule.smsCode) {
            flag = ngUtils.checkIdCardImpl(UnionPayInfo.smscode, "�������Ϊ��", "");
            if (!flag) {
                return false;
            }
        }
        //��֤�����Ƿ�Ϊ��
        if(UnionPayRule.password) {
            flag = ngUtils.checkIdCardImpl(UnionPayInfo.password, "�������Ϊ��", "");
            if (!flag) {
                return false;
            }
        }
        //��֤cvn2�Ƿ�Ϊ��
        if(UnionPayRule.cvn2) {
            flag = ngUtils.checkIdCardImpl(UnionPayInfo.cvn2, "�������Ϊ��", "");
            if (!flag) {
                return false;
            }
        }
        //��֤��Ч���Ƿ�Ϊ��
        if(UnionPayRule.expire) {
            flag = ngUtils.checkIdCardImpl(UnionPayInfo.expire, "�������Ϊ��", "");
            if (!flag) {
                return false;
            }
        }
        //��֤֤�������Ƿ�Ϊ��
        if(UnionPayRule.credential) {
            flag = ngUtils.checkIdCardImpl(UnionPayInfo.credential, "�������Ϊ��", "");
            if (!flag) {
                return false;
            }
        }
        //��֤�����Ƿ�Ϊ��
        if(UnionPayRule.name) {
            flag = ngUtils.checkIdCardImpl(UnionPayInfo.name, "�������Ϊ��", "");
            if (!flag) {
                return false;
            }
        }
        //��֤�ֻ����Ƿ�Ϊ��
        if(UnionPayRule.mobile) {
            flag = ngUtils.checkIdCardImpl(UnionPayInfo.mobile, "�������Ϊ��", "");
            if (!flag) {
                return false;
            }
        }
        return true;
    };
});