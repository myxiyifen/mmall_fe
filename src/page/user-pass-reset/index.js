/*
* @Author: xiyifen22222
* @Date:   2017-08-17 15:28:00
* @Last Modified by:   xiyifen22222
* @Last Modified time: 2017-08-17 16:27:27
*/

'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _user=require('service/user-service.js');
var _mm=require('util/mm.js');

// 表单里的错误提示
var formError = {
    show : function(errMsg){
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide : function(){
        $('.error-item').hide().find('.err-msg').text('');
    }
};

// page 逻辑部分
var page = {
    //建一个对象
    data:{
        username    :'',
        question    :'',
        answer      :'',
        token       :''
    },
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad:function () {
      this.loadStepUsername();
    },
    bindEvent : function(){
        var _this = this;
        // 如果按下回车，也进行提交
        // $('.user-content').keyup(function(e){
        //     // keyCode == 13 表示回车键
        //     if(e.keyCode === 13){
        //         _this.submit();
        //     }
        // });
        $('#submit-username').click(function () {
            var username=$.trim($('#username').val());
            if(username) {
                _user.getQuestion(username,function (res) {
                    _this.data.username=username;
                    _this.data.question=res;
                    _this.loadStepQuestion();
                },function (errMsg) {
                    formError.show(errMsg);
                });
            }
            else {
                formError.show("请输入用户名");
            }
        });
        $('#submit-question').click(function () {
            var answer=$.trim($('#answer').val());
            if(answer) {
                _user.checkAnswer({
                    username    :_this.data.username,
                    question    :_this.data.question,
                    answer      :answer
                },function (res) {
                    _this.data.answer=answer;
                    _this.data.token=res;
                    _this.loadStepPassword();
                },function (errMsg) {
                    formError.show(errMsg);
                });
            }else {
                formError.show("请输入密码提示问题答案");
            }

        });
        // 输入新密码后的按钮点击
        $('#submit-password').click(function(){
            var password = $.trim($('#password').val());
            // 密码不为空
            if(password && password.length >= 6){
                // 检查密码提示问题答案
                _user.resetPassword({
                    username        : _this.data.username,
                    passwordNew     : password,
                    forgetToken     : _this.data.token
                }, function(res){
                    window.location.href = './result.html?type=pass-reset';
                }, function(errMsg){
                    formError.show(errMsg);
                });
            }
            // 密码为空
            else{
                formError.show('请输入不少于6位的新密码');
            }
        });
    },
    //加载输入用户名的一步
    loadStepUsername:function () {
        $('.step-username').show();
    },
    loadStepQuestion:function () {
        //清除错误提示
      formError.hide();
      $('.step-username').hide()
          .siblings('.step-question').show().
          find('.question').text(this.data.question);
    },
    //加载输入password的一步
    loadStepPassword:function () {
        formError.hide();
        $('.step-question').hide()
            .siblings('.step-password').show();
    }
};
$(function(){
    page.init();
});