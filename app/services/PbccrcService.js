/**
 * Created by zhouzhengkai on 2015/11/24.
 */

'use strict';

var app=angular.module("TemplateApp");

app.factory("PbccrcService",function(Constant,CommonService) {
    return {
        /**
         * ��ȡͼƬ��֤��
         */
        getVerifyCode: function () {
            var path = Constant.APIRoot + "/credit/pbccrc/init/Json";
            return CommonService.get(path);
        },
        /**
         * ��ȡͼƬ��֤��(������֤)
         * type - ���÷�ʽ��=init����ʼ��ʱ����ʾ�����㣻= hand,���ӵ�����
         */
        getVerifyCode_Union : function(param) {
            var path = Constant.APIRoot + "/credit/pbccrc/query/apply/bankcard/init/Json";
            return CommonService.post(path, param);
        },
        /**
         *����ע�� - У���û�
         */
        Reg_Step1: function(param){
            var path = Constant.APIRoot + "/credit/pbccrc/register/1/Json";
            return CommonService.post(path, param);
        },
        /**
         *����ע�� - ���Ͷ�����֤��
         */
        Reg_Step2 : function(param){
            var path = Constant.APIRoot + "/credit/pbccrc/register/2/Json";
            return CommonService.post(path, param);
        },
        /**
         *����ע�� - �ύע����Ϣ
         */
        Reg_Step3 : function(param){
            var path = Constant.APIRoot + "/credit/pbccrc/register/3/Json";
            return CommonService.post(path, param);
        },
        /**
         *���ŵ�¼
         */
        Login : function(param){
            var path = Constant.APIRoot + "/credit/pbccrc/login/Json";
            return CommonService.post(path, param);
        },
        /**
         * �ύ������֤
         */
        Submit_Union : function(param){
            var path = Constant.APIRoot + "/credit/pbccrc/query/apply/bankcard/submit/Json";
            return CommonService.post(path, param);
        },
        /**
         * ��ȡ������֤��
         */
        getUnionPayCode:function(param){
            var path = Constant.APIRoot + "/credit/pbccrc/query/apply/unionpay/init/Json";
            return CommonService.post(path, param);
        },
        /**
         * ��ȡ���⣨������֤��
         */
        GetQuestion:function(param){
            var path = Constant.APIRoot + "/credit/pbccrc/query/apply/1/Json";
            return CommonService.post(path, param);
        },
        /**
         * �ύ������֤�𰸣�������֤��
         */
        SubmitAnswer:function(param){
            var path = Constant.APIRoot + "/credit/pbccrc/query/apply/2/Json";
            return CommonService.post(path, param);
        },
        /**
         * ��ȡ��ѯ����
         */
        Query:function(param){
            var path = Constant.APIRoot + "/credit/pbccrc/query/report/Json";
            return CommonService.post(path, param);
        }
    }
});