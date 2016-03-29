/**
 * Created by zhouzhengkai on 2015/12/4.
 */

var app=angular.module("TemplateApp");

app.factory("ChsiService",function(Constant,CommonService) {
    return {
        /**
         * 获取图片验证码
         */
        getVerifyCode: function () {
            var path = Constant.APIRoot + "/edu/chsi/query/init/json";
            return CommonService.get(path);
        },
        /**
         * 查询信息
         */
        query: function (param) {
            var path = Constant.APIRoot + "/edu/chsi/query/json";
            return CommonService.post(path, param);
        },
        /**
         * 验证手机，并获取图片验证码
         */
        getMobileVerifyCode: function(param){
            var path = Constant.APIRoot + "/edu/chsi/register/1/json";
            return CommonService.post(path, param);
        },
        /**
         * 获取短信验证码
         */
        getMobileSMSCode: function(param){
            var path = Constant.APIRoot + "/edu/chsi/register/2/json";
            return CommonService.post(path, param);
        },
        /**
         * 提交注册信息
         */
        register: function(param){
            var path = Constant.APIRoot + "/edu/chsi/register/3/json";
            return CommonService.post(path, param);
        },

    }
});