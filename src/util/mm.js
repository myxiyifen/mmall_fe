/*
* @Author: User
* @Date:   2017-08-18 14:49:26
* @Last Modified by:   User
* @Last Modified time: 2017-08-18 15:03:03
*/
'use strict';
var Hogan = require('hogan');
var conf = {
    serverHost : ''
};
var _mm = {
    // 网络请求
    request : function(param){
        var _this = this;
        $.ajax({
            type        : param.method  || 'get',
            url         : param.url     || '',
            dataType    : param.type    || 'json',
            data        : param.data    || '',
            success     : function(res){
                // 请求成功
                if(0 === res.status){
                    typeof param.success === 'function' && param.success(res.data, res.msg);
                }
                // 没有登录状态，需要强制登录
                else if(10 === res.status){
                    _this.doLogin();
                }
                // 请求数据错误
                else if(1 === res.status){
                    alert(param);
                    // alert(param.error);
                    // alert(res.msg+"55555555555");
                    // alert(res+"88888888");
                    /**
                     *  param.error=function(errMsg){
                     *  alert(errMsg+"3333");
                      *  formError.show(errMsg);
                      *  })
                     */
                    typeof param.error === 'function' && param.error(res.msg);
                }
            },
            //当请求的url路径不对的时候就执行此方法
            error       : function(err){
                // alert(err.statusText+"99999999999") err.status=not found
                typeof param.error === 'function' && param.error(err.statusText);
            }
        });
    },
    //获取服务器地址
    getServerUrl:function (path) {
        return conf.serverHost+path;
    },
    //获取url参数
    getUrlParam:function (name){
        //www.happymmall.com/user-login.do?username=1  取得username=1
        var reg= new RegExp('(^|&)'+name+'=([^&]*)(&|$)');
        var result =window.location.search.substr(1).match(reg);
        return result?decodeURIComponent(result[2]):null;
    },
    //渲染html模板
    renderHtml:function (htmlTemplate,data) {
        var template = Hogan.compile(htmlTemplate),
        result = template.render(data);
        return result;
    },
    successTips:function (msg) {
        alert(msg||'操作成功');

    },
    errorTips:function (msg) {
        alert(msg||'哪里不对了~');

    },
    //字段的验证，支持非空，手机、邮箱的判断
    validate:function (value,type) {
        var value=$.trim(value);
        if('require'===type) {
            //强制转换为布尔值
            return !!value;
        }
        //手机号验证
        if ('phone'==type) {
            //以1开头后面10个数字
            return /^1\d{10}$/.test(value);
        }
        //邮箱格式验证
        if ('email'==type) {
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
        }
    },
    // 统一登录处理
    doLogin : function(){
        window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
    },
    goHome:function () {
        window.location.href='./index.html';
    }

};

module.exports = _mm;