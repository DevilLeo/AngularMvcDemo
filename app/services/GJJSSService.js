/**
 * Created by zhouzhengkai on 2015/12/1.
 */

var app=angular.module("TemplateApp");

app.factory("Gjj_SS_Service",function(Constant,CommonService) {
    return {
        /**
         * 校验银联卡号码
         */
        getProvince:function(type){
            var path = Constant.APIRoot + "/" + type + "/formsetting/province/Json";
            return CommonService.get(path);
        },

        getCityFormat:function(type, city){
            var path = Constant.APIRoot + "/" + type + "/formsetting/query/" + city + "/Json";
            return CommonService.get(path);
        },

        Init:function(type, city){
            var path = Constant.APIRoot + "/" + type + "/init/" + city + "/Json";
            return CommonService.get(path);
        },

        Query:function(type, city, param){
            var path = Constant.APIRoot + "/" + type + "/login/" + city + "/Json";
            return CommonService.post(path, param, true);
        }


    }
});