'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('TemplateApp', [
    'ngRoute',
    'ngResource',
    'ngAnimate',
]) .config(function ($routeProvider, $httpProvider) {
    //http�����޸�
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
    //ҳ����ת
    $routeProvider
        //����ҳ�� - ע��
        .when('/Pbccrc/Reg', {
            templateUrl: 'views/Pbccrc/Register.html',
            controller: 'PbccrcRegisterCtrl'
        })
        //����ҳ�� - ע�ᣨ��ϸ��Ϣ��
        .when('/Pbccrc/Reg_Detail', {
            templateUrl: 'views/Pbccrc/Register_Detail.html',
            controller: 'PbccrcRegisterCtrl'
        })
        //����ҳ�� - ��¼
        .when('/Pbccrc/Login', {
            templateUrl: 'views/Pbccrc/Login.html',
            controller: 'PbccrcLoginVerifyCtrl'
        })
        //����ҳ�� - ѡ����֤����
        .when('/Pbccrc/Type', {
            templateUrl: 'views/Pbccrc/QueryType.html',
            controller: 'PbccrcLoginVerifyCtrl'
        })
        //����ҳ�� - ������֤
        .when('/Pbccrc/VerifyUnion', {
            templateUrl: 'views/Pbccrc/Verify_Union.html',
            controller: 'PbccrcLoginVerifyCtrl'
        })
        //����ҳ�� - ������֤
        .when('/Pbccrc/VerifyQuestion', {
            templateUrl: 'views/Pbccrc/Verify_Question.html',
            controller: 'PbccrcLoginVerifyCtrl'
        })
        //����ҳ�� - ��ȡ��ѯ����
        .when('/Pbccrc/Query', {
            templateUrl: 'views/Pbccrc/Query.html',
            controller: 'PbccrcLoginVerifyCtrl'
        })
        //����ҳ�� - У��������
        .when('/Union/Init', {
            templateUrl: 'views/UnionPay/Init.html',
            controller: 'UnionPayCodeCtrl'
        })
        //����ҳ�� - �ύ��������Ϣ
        .when('/Union/Detail', {
            templateUrl: 'views/UnionPay/FillDetail.html',
            controller: 'UnionPayCodeCtrl'
        })
        //�籣��ѯҳ��
        .when('/GJJSS', {
            templateUrl: 'views/GJJSS/GJJ_SS.html',
            controller: 'GJJSSCtrl'
        })
        //ѧ����ҳ�� - ��ѯ
        .when('/Chsi/Query', {
            templateUrl: 'views/Chsi/Query.html',
            controller: 'ChsiQueryCtrl'
        })
        //ѧ����ҳ�� - ע��
        .when('/Chsi/Reg', {
            templateUrl: 'views/Chsi/Register.html',
            controller: 'ChsiRegisterCtrl'
        })
        //�ֻ��˵�ҳ��
        .when('/Mobile/Init', {
            templateUrl: 'views/Mobile/Init.html',
            controller: 'MobileCtrl'
        })
})
