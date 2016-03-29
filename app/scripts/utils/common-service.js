/**
 * Created by zhouzhengkai on 2015/11/26.
 */

'use strict';

var app = angular.module('TemplateApp');

app.service("CommonService",function($resource,$q) {
    /**
     * post请求
     * @param isnotjson 是否为json格式，设为false或不设，则进行json2string
     * @param notneedbase64 是否需要进行base64编码，设为false或不设，则进行base64编码
     */
    this.post = function (url, param, isnotjson, notneedbase64) {
        var api = $resource(url);
        var defer = $q.defer();
        var params = "";
        if (!arguments[2] || isnotjson == false) {
            try {
                params = JSON.stringify(param);//默认需要json转string
            }
            catch(e){
                console.log("JSON.stringify fail. url : " + url + "; param : " + param + "; Exception : " + e);
                defer.reject("JSON.stringify fail. url : " + url + "; param : " + param + "; Exception : " + e);
                return defer.promise;
            }
        }
        else{
            params = param;//isnotjson = true时,不需要转换
        }
        if (!arguments[3] || notneedbase64 == false) {
            try {
                params = this.base64(params);//默认进行base64编码
            }
            catch(e){
                console.log("JSON.stringify fail. url : " + url + "; params : " + params + "; Exception : " + e);
                defer.reject("JSON.stringify fail. url : " + url + "; params : " + params + "; Exception : " + e);
                return defer.promise;
            }
        }
        api.save(params, function (data) {
            defer.resolve(data);
        }, function (data) {
            console.log(data);
            defer.reject(data);
        });
        return defer.promise;
    };
    /**
     * get请求
     */
    this.get = function (url) {
        var api = $resource(url);
        var defer = $q.defer();
        api.get(function (data) {
            defer.resolve(data);
        }, function (data) {
            console.log(data);
            defer.reject(data);
        });
        return defer.promise;
    };
    /**
     * base64编码（可带中文）
     */
    this.base64=function (input) {
        var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = _utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
        }
        return output;
    };
    /**
     * Utf8编码
     */
    var _utf8_encode=function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }
        return utftext;
    };
    /**
     * UTF16转UTF8
     */
    this.UTF162UTF8 = function(s) {
        var i, code, ret = [], len = s.length;
        for (i = 0; i < len; i++) {
            code = s.charCodeAt(i);
            if (code > 0x0 && code <= 0x7f) {
                ret.push(s.charAt(i));
            } else if (code >= 0x80 && code <= 0x7ff) {
                ret.push(
                    String.fromCharCode(0xc0 | ((code >> 6) & 0x1f)),
                    String.fromCharCode(0x80 | (code & 0x3f))
                );
            } else if (code >= 0x800 && code <= 0xffff) {
                ret.push(
                    String.fromCharCode(0xe0 | ((code >> 12) & 0xf)),
                    String.fromCharCode(0x80 | ((code >> 6) & 0x3f)),
                    String.fromCharCode(0x80 | (code & 0x3f))
                );
            }
        }
        return ret.join('');
    };

    this.Notify = function (content) {
        var msg = '';
        if (content) {
            if (content.message && content.message.length > 0)
                msg = content.message;
            else
                msg = content;
        }
        else {
            msg = "系统异常";
        }

        var notify_alert = document.querySelector('#alert');
        if(notify_alert){
            document.body.removeChild(notify_alert);
        }
        notify_alert = document.createElement("div");
        notify_alert.id='alert';
        notify_alert.className='maja';
        notify_alert.innerHTML='<span></span>';
        document.body.appendChild(notify_alert);
        document.querySelector('#alert>span').innerHTML = msg;
    }
    this.NotifyWarning = function(content) {
        this.Notify(content);
        angular.element(document.querySelector('#alert>span')).css('background-color','red');
    }

    this.NotifySuccess = function(content) {
        this.Notify(content);
        angular.element(document.querySelector('#alert>span')).css('background-color','green');
    }

    /**
     * base64编码（无中文）
     */
    this.encode = function(s) {
        var _PADCHAR = "=";
        var _ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        s = String(s);

        var i,
            b10,
            x = [],
            imax = s.length - s.length % 3;

        if (s.length === 0) {
            return s;
        }
        for (i = 0; i < imax; i += 3) {
            b10 = (this.getbyte(s, i) << 16) | (this.getbyte(s, i + 1) << 8) | this.getbyte(s, i + 2);
            x.push(_ALPHA.charAt(b10 >> 18));
            x.push(_ALPHA.charAt((b10 >> 12) & 0x3F));
            x.push(_ALPHA.charAt((b10 >> 6) & 0x3f));
            x.push(_ALPHA.charAt(b10 & 0x3f));
        }
        switch (s.length - imax) {
            case 1:
                b10 = this.getbyte(s, i) << 16;
                x.push(_ALPHA.charAt(b10 >> 18) + _ALPHA.charAt((b10 >> 12) & 0x3F) + _PADCHAR + _PADCHAR);
                break;

            case 2:
                b10 = (this.getbyte(s, i) << 16) | (this.getbyte(s, i + 1) << 8);
                x.push(_ALPHA.charAt(b10 >> 18) + _ALPHA.charAt((b10 >> 12) & 0x3F) + _ALPHA.charAt((b10 >> 6) & 0x3f) + _PADCHAR);
                break;
        }

        return x.join("");
    };
    /**
     * encode()所需获取byte
     */
    this.getbyte = function(s, i) {
        var x = s.charCodeAt(i);
        if (x > 255) {
            throw "INVALID_CHARACTER_ERR: DOM Exception 5";
        }
        return x;
    };
    /**
     * base64解码（无中文）
     */
    this.decode = function(s) {
        var _PADCHAR = "=";
        var _ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var pads = 0,
            i,
            b10,
            imax = s.length,
            x = [];

        s = String(s);

        if (imax === 0) {
            return s;
        }

        if (imax % 4 !== 0) {
            throw "Cannot decode base64";
        }

        if (s.charAt(imax - 1) === _PADCHAR) {
            pads = 1;

            if (s.charAt(imax - 2) === _PADCHAR) {
                pads = 2;
            }
            imax -= 4;
        }

        for (i = 0; i < imax; i += 4) {
            b10 = (this.getbyte64(s, i) << 18) | (this.getbyte64(s, i + 1) << 12) | (this.getbyte64(s, i + 2) << 6) | this.getbyte64(s, i + 3);
            x.push(String.fromCharCode(b10 >> 16, (b10 >> 8) & 0xff, b10 & 0xff));
        }

        switch (pads) {
            case 1:
                b10 = (this.getbyte64(s, i) << 18) | (this.getbyte64(s, i + 1) << 12) | (this.getbyte64(s, i + 2) << 6);
                x.push(String.fromCharCode(b10 >> 16, (b10 >> 8) & 0xff));
                break;

            case 2:
                b10 = (this.getbyte64(s, i) << 18) | (this.getbyte64(s, i + 1) << 12);
                x.push(String.fromCharCode(b10 >> 16));
                break;
        }

        return x.join("");
    };
    /**
     * decode()所需获取byte
     */
    this.getbyte64 = function(s, i) {
        var idx = _ALPHA.indexOf(s.charAt(i));
        if (idx === -1) {
            throw "Cannot decode base64";
        }
        return idx;
    }



});