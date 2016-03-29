/**
 * Created by zhouzhengkai on 2015/11/26.
 */

var app=angular.module("TemplateApp");

app.factory("UnionPayService",function(Constant,CommonService) {
    return {
        /**
         * 校验银联卡号码
         */
        CheckCard:function(param){
            var path = Constant.APIRoot + "/credit/pbccrc/query/apply/unionpay/check/Json";
            return CommonService.post(path, param);
        },
        /**
         * 发送短信验证码
         */
        SendSMS:function(param){
            var path = Constant.APIRoot + "/credit/pbccrc/query/apply/unionpay/sendsms/Json";
            return CommonService.post(path, param);
        },
        /**
         * 提交银联卡详细信息
         */
        Submit:function(param){
            var path = Constant.APIRoot + "/credit/pbccrc/query/apply/unionpay/submit/Json";
            //var param_post = CommonService.UTF162UTF8(JSON.stringify(param));
            return CommonService.post(path, param);
        }


    }
});