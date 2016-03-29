/**
 * Created by zhouzhengkai on 2015/12/1.
 */

'use strict';
var app = angular.module('TemplateApp');

/**
 * 央行征信注册及验证页面 controller
 */
app.controller('GJJSSCtrl', function ($scope,Gjj_SS_Service,CommonService) {
    /**
     * 初始化 $scope
     */
    $scope.provinces = {};
    $scope.province_name = [];
    $scope.citys = {};
    $scope.select_province = {};
    $scope.select_city = {};
    $scope.city_form = {};
    $scope.city_formsetting = {};
    $scope.select_form = {};
    $scope.vercodebase64 = "";
    $scope.main_type = "gjj";
    $scope.selected_type = {};
    /**
     * 获取所有省份
     */
    $scope.getProvince = function(){
        Gjj_SS_Service.getProvince($scope.main_type).then(function (data){
            if (data && data.StatusCode == '0') {
                $scope.provinces = JSON.parse(data.Result);
            }
            else{
                console.log(data);
                CommonService.NotifyWarning(data.StatusDescription);
            }
        },function(data){
            CommonService.NotifyWarning();
        })
    };
    /**
     * 改变查询模式
     */
    $scope.change_maintype = function(){
        $scope.InitScope();
        $scope.getProvince();
    };
    /**
     * 初始化 $scope（方法）
     */
    $scope.InitScope = function(){
        $scope.provinces = {};
        $scope.province_name = [];
        $scope.citys = {};
        $scope.select_province = {};
        $scope.select_city = {};
        $scope.city_form = {};
        $scope.city_formsetting = {};
        $scope.select_form = {};
        $scope.vercodebase64 = "";
        $scope.selected_type = {};
    };
    /**
     * 改变省份时改变城市集合
     */
    $scope.change_province = function(){
        $scope.select_city = {};
        $scope.city_formsetting = {};
        $scope.vercodebase64 = "";
        $scope.selected_type = {};
        $scope.citys = $scope.select_province.CityLevel;
    };
    /**
     * 改变城市时改变表单显示
     */
    $scope.change_city = function(){
        $scope.city_formsetting = {};
        $scope.vercodebase64 = "";
        $scope.selected_type = {};
        var citycode = $scope.select_city.CityCode;
        Gjj_SS_Service.getCityFormat($scope.main_type, citycode).then(function (data){
            if (data && data.StatusCode == '0') {
                if (citycode == $scope.select_city.CityCode) {
                    var result = JSON.parse(data.Result);
                    $scope.city_formsetting = result.FormSettings;
                    $scope.selected_type = $scope.city_formsetting[0];
                    $scope.Init();
                }
            }
            else{
                console.log(data);
                CommonService.NotifyWarning(data.StatusDescription);
            }
        },function(data){
            CommonService.NotifyWarning();
        })
    };
    /**
     * 初始化社保
     */
    $scope.Init = function(){
        var citycode = $scope.select_city.CityCode;
        Gjj_SS_Service.Init($scope.main_type, citycode).then(function(data){
            if(citycode == $scope.select_city.CityCode) {
                if (data && data.StatusCode == '0') {
                    $scope.token = data.Token;
                    if(data.VerCodeBase64 && data.VerCodeBase64!="none")
                        $scope.vercodebase64 = "data:image/png;base64," + data.VerCodeBase64;
                }
                else {
                    console.log(data);
                    CommonService.NotifyWarning(data.StatusDescription);
                }
            }
        },function(data){
            CommonService.NotifyWarning();
        })
    };
    /**
     * 社保登录与查询
     */
    $scope.Query = function(){
        var citycode = $scope.select_city.CityCode;
        var param = JSON.stringify($("#select_form").serializeJSON())
        Gjj_SS_Service.Query($scope.main_type, citycode, param).then(function (data){
            if(citycode == $scope.select_city.CityCode) {
                if (data && data.StatusCode == '0') {
                    CommonService.NotifySuccess(data.StatusDescription);
                }
                else {
                    $scope.Init();
                    console.log(data);
                    CommonService.NotifyWarning(data.StatusDescription);
                }
            }
        },function(data){
            $scope.Init();
            CommonService.NotifyWarning();
        })
    };
    $scope.changetype = function(type){
        $scope.selected_type = type;
    }
})