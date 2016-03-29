/**
 * Created by zhouzhengkai on 2015/12/4.
 */

var app=angular.module("TemplateApp");

app.factory("ChsiService",function(Constant,CommonService) {
    return {
        /**
         * ��ȡͼƬ��֤��
         */
        getVerifyCode: function () {
            var path = Constant.APIRoot + "/edu/chsi/query/init/json";
            return CommonService.get(path);
        },
        /**
         * ��ѯ��Ϣ
         */
        query: function (param) {
            var path = Constant.APIRoot + "/edu/chsi/query/json";
            return CommonService.post(path, param);
        },
        /**
         * ��֤�ֻ�������ȡͼƬ��֤��
         */
        getMobileVerifyCode: function(param){
            var path = Constant.APIRoot + "/edu/chsi/register/1/json";
            return CommonService.post(path, param);
        },
        /**
         * ��ȡ������֤��
         */
        getMobileSMSCode: function(param){
            var path = Constant.APIRoot + "/edu/chsi/register/2/json";
            return CommonService.post(path, param);
        },
        /**
         * �ύע����Ϣ
         */
        register: function(param){
            var path = Constant.APIRoot + "/edu/chsi/register/3/json";
            return CommonService.post(path, param);
        },

    }
});