'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('TemplateApp', [
    'ngRoute',
    'ngResource',
    'ngAnimate',
]) .config(function ($routeProvider, $httpProvider) {
    //http请求修改
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

    $httpProvider.defaults.transformRequest = function (data) {
    if (angular.isObject(data)) {
        if (data instanceof FileList || data instanceof File) {
            return paramFile(data);
        }
        else {
            return param(data);
        }
    }
    else
        return data;
    };
    //页面跳转
    $routeProvider
        //央行页面 - 注册
        .when('/Pbccrc/Reg', {
            templateUrl: 'views/Pbccrc/Register.html',
            controller: 'PbccrcRegisterCtrl'
        })
        //央行页面 - 注册（详细信息）
        .when('/Pbccrc/Reg_Detail', {
            templateUrl: 'views/Pbccrc/Register_Detail.html',
            controller: 'PbccrcRegisterCtrl'
        })
        //央行页面 - 登录
        .when('/Pbccrc/Login', {
            templateUrl: 'views/Pbccrc/Login.html',
            controller: 'PbccrcLoginVerifyCtrl'
        })
        //央行页面 - 选择验证类型
        .when('/Pbccrc/Type', {
            templateUrl: 'views/Pbccrc/QueryType.html',
            controller: 'PbccrcLoginVerifyCtrl'
        })
        //央行页面 - 银联认证
        .when('/Pbccrc/VerifyUnion', {
            templateUrl: 'views/Pbccrc/Verify_Union.html',
            controller: 'PbccrcLoginVerifyCtrl'
        })
        //央行页面 - 问题验证
        .when('/Pbccrc/VerifyQuestion', {
            templateUrl: 'views/Pbccrc/Verify_Question.html',
            controller: 'PbccrcLoginVerifyCtrl'
        })
        //央行页面 - 获取查询报告
        .when('/Pbccrc/Query', {
            templateUrl: 'views/Pbccrc/Query.html',
            controller: 'PbccrcLoginVerifyCtrl'
        })
        //银联页面 - 校验银联卡
        .when('/Union/Init', {
            templateUrl: 'views/UnionPay/Init.html',
            controller: 'UnionPayCodeCtrl'
        })
        //银联页面 - 提交银联卡信息
        .when('/Union/Detail', {
            templateUrl: 'views/UnionPay/FillDetail.html',
            controller: 'UnionPayCodeCtrl'
        })
        //社保查询页面
        .when('/GJJSS', {
            templateUrl: 'views/GJJSS/GJJ_SS.html',
            controller: 'GJJSSCtrl'
        })
        //学信网页面 - 查询
        .when('/Chsi/Query', {
            templateUrl: 'views/Chsi/Query.html',
            controller: 'ChsiQueryCtrl'
        })
        //学信网页面 - 注册
        .when('/Chsi/Reg', {
            templateUrl: 'views/Chsi/Register.html',
            controller: 'ChsiRegisterCtrl'
        })
        //手机账单页面
        .when('/Mobile/Init', {
            templateUrl: 'views/Mobile/Init.html',
            controller: 'MobileCtrl'
        })
})
