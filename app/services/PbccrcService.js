/**
 * Created by zhouzhengkai on 2015/11/24.
 */

'use strict';

var app=angular.module("TemplateApp");

app.factory("PbccrcService",function(Constant,CommonService) {
    return {
        /**
         * 获取图片验证码
         */
        getVerifyCode: function () {
            var path = Constant.APIRoot + "/credit/pbccrc/init/Json";
            return CommonService.get(path);
        },
        /**
         * 获取图片验证码(银联认证)
         * type - 调用方式：=init，初始化时不显示弹出层；= hand,增加弹出层
         */
        getVerifyCode_Union : function(param) {
            var path = Constant.APIRoot + "/credit/pbccrc/query/apply/bankcard/init/Json";
            return CommonService.post(path, param);
        },
        /**
         *征信注册 - 校验用户
         */
        Reg_Step1: function(param){
            var path = Constant.APIRoot + "/credit/pbccrc/register/1/Json";
            return CommonService.post(path, param);
        },
        /**
         *征信注册 - 发送短信验证码
         */
        Reg_Step2 : function(param){
            var path = Constant.APIRoot + "/credit/pbccrc/register/2/Json";
            return CommonService.post(path, param);
        },
        /**
         *征信注册 - 提交注册信息
         */
        Reg_Step3 : function(param){
            var path = Constant.APIRoot + "/credit/pbccrc/register/3/Json";
            return CommonService.post(path, param);
        },
        /**
         *征信登录
         */
        Login : function(param){
            var path = Constant.APIRoot + "/credit/pbccrc/login/Json";
            return CommonService.post(path, param);
        },
        /**
         * 提交银联认证
         */
        Submit_Union : function(param){
            var path = Constant.APIRoot + "/credit/pbccrc/query/apply/bankcard/submit/Json";
            return CommonService.post(path, param);
        },
        /**
         * 获取银联认证码
         */
        getUnionPayCode:function(param){
            var path = Constant.APIRoot + "/credit/pbccrc/query/apply/unionpay/init/Json";
            return CommonService.post(path, param);
        },
        /**
         * 获取问题（问题验证）
         */
        GetQuestion:function(param){
            var path = Constant.APIRoot + "/credit/pbccrc/query/apply/1/Json";
            return CommonService.post(path, param);
        },
        /**
         * 提交问题验证答案（问题验证）
         */
        SubmitAnswer:function(param){
            var path = Constant.APIRoot + "/credit/pbccrc/query/apply/2/Json";
            return CommonService.post(path, param);
        },
        /**
         * 获取查询报告
         */
        Query:function(param){
            var path = Constant.APIRoot + "/credit/pbccrc/query/report/Json";
            return CommonService.post(path, param);
        }
    }
});