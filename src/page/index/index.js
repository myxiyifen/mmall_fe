/*
* @Author: xiyifen22222
* @Date:   2017-08-17 14:43:04
* @Last Modified by:   User
* @Last Modified time: 2017-08-18 10:28:07
*/
'use strict';
// require('./index.css');
// require('../module.js');
var _mm=require('util/mm.js');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSize=require('page/common/nav-side/index.js');
navSize.init({
    // name:'order-list'
    name:'user-center'
});
// _mm.request({
//     url: '/product/list.do?keyword=1',
//     success: function (res) {
//         console.log(res);
//     },
//     error: function (errMsg) {
//         console.log(errMsg);
//     }
// });
//
// console.log(_mm.getUrlParam('test'));
//
// var html='<div>{{data}}</div>';
// var data={
//     data:'sb'
// }
// console.log(_mm.renderHtml(html,data));



























