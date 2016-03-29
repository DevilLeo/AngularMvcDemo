/**
 * Created by zhouzhengkai on 2015/11/24.
 */

'use strict';

var app = angular.module("TemplateApp");

app.factory("Constant",function(){
    return {
        "APIRoot":"http://localhost:10172" // 本地测试地址
        //"APIRoot":"http://10.138.60.43:7000" // 征信测试地址
        //"APIRoot":"http://10.138.60.43:7000" // GJJSS地址
    }
});

/**
 * 央行征信用户信息（注册、登录）
 */
app.factory("PbccrcUserInfo",function() {
    return {
        name: "",
        certno: "",
        certtype: "0",
        username:"",
        password: "",
        confirmpassword: "",
        email: "",
        mobiletel: "",
        smscode:"",
        token: "",
        vercodebase64: "",
        vercode:"",
        identitycard:"",
        type:"1",
    }
});

/**
 * 央行征信银联认证信息（央行页面）
 */
app.factory("PbccrcUnion",function() {
    return {
        unionpaycode: "",
        token: "",
        type:"unverify",
        vercodebase64: "",
        vercode:"",
        result:""
    }
});

/**
 * 银联认证信息（银联页面）
 */
app.factory("UnionPayInfo",function() {
    return {
        creditcardno: "",
        mobile:"",
        smsCode:"",
        password:"",
        cvn2:"",
        expire:"",
        credentialtype:"01",
        credential:"",
        name:"",
        token: "",
    }
});
/**
 * 银联认证显示规则（银联页面）
 */
app.factory("UnionPayRule",function() {
    return {
        creditcarddisplay:"",
        mobile:"true",
        smsCode:"true",
        password:"true",
        cvn2:"true",
        expire:"true",
        credentialtype:"true",
        credential:"true",
        name:"true",
        submit:"true"
    }
});
/**
 * 学信网查询
 */
app.factory("ChsiUserInfo", function() {
    return {
        username:"",
        password: "",
        identitycard:"",
        mobile:"",
        vercode:"",
        token: "",
        vercodebase64: ""
    }
});
/**
 * 学信网注册
 */
app.factory("ChsiRegInfo", function() {
    return {
        mobile:"",
        vercode:"",
        smscode:"",
        password:"",
        password1:"",
        name:"",
        credentialtype:"SFZ",
        identitycard:"",
        email:"",
        pwdreq1:"",
        pwdanswer1:"",
        pwdreq2:"",
        pwdanswer2:"",
        pwdreq3:"",
        pwdanswer3:"",
        token:"",
        vercodebase64: ""
    }
});
/**
 * 手机账单
 */
app.factory("MobileReq",function() {
    return {
        Token:"",
        BusType:"",
        busId:"",
        Name:"",
        IdentityCard:"",
        Vercode:"",
        Smscode:"",
        Mobile:"",
        Password:"",
        IPAddr:"",
        Website:"",
        Servecode:"",
        nextProCode:"Init",
        nextProText:"初始化",
        VerCodeBase64:"none",
        StatusCode:0,
        StatusDescription:"",
        CurrentCode:"Init"
    }
});

