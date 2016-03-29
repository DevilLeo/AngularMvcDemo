/**
 * Created by songbingzhi on 2015/12/1.
 */

'use strict';

var app=angular.module("TemplateApp");
app.service("MobileService",function(Constant,CommonService){
    return {
        init:function(param){
            var path= Constant.APIRoot+"/mobile/init/Json";
            return CommonService.post(path, param);
        },
        login:function(param)
        {
            var path= Constant.APIRoot+"/mobile/login/Json";
            return CommonService.post(path, param);
        },
        sendsms:function(param)
        {
            var path= Constant.APIRoot+"/mobile/sendsms/Json";
            return CommonService.post(path, param);
        },
        checksms:function(param)
        {
            var path= Constant.APIRoot+"/mobile/checksms/Json";
            return CommonService.post(path, param);
        },
        query:function(param)
        {
            var path= Constant.APIRoot+"/mobile/query/summary/fromtoken/Json";
            return CommonService.post(path, param);
        },
        queryCall:function(param)
        {
            var path= Constant.APIRoot+" /mobile/query/calls/Json";
            return CommonService.post(path, param);
        }
    }

});