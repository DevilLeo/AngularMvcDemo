/**
 * Created by zhouzhengkai on 2015/11/26.
 */

var app=angular.module("TemplateApp");

app.factory("UnionPayService",function(Constant,CommonService) {
    return {
        /**
         * У������������
         */
        CheckCard:function(param){
            var path = Constant.APIRoot + "/credit/pbccrc/query/apply/unionpay/check/Json";
            return CommonService.post(path, param);
        },
        /**
         * ���Ͷ�����֤��
         */
        SendSMS:function(param){
            var path = Constant.APIRoot + "/credit/pbccrc/query/apply/unionpay/sendsms/Json";
            return CommonService.post(path, param);
        },
        /**
         * �ύ��������ϸ��Ϣ
         */
        Submit:function(param){
            var path = Constant.APIRoot + "/credit/pbccrc/query/apply/unionpay/submit/Json";
            //var param_post = CommonService.UTF162UTF8(JSON.stringify(param));
            return CommonService.post(path, param);
        }


    }
});