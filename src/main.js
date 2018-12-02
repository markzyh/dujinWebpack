// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
Vue.prototype.axios = axios

axios.defaults.baseURL = 'http://dou.fudayiliao.com'
/* axios.defaults.headers = {
  'content-type': 'application/x-www-form-urlencoded'
} */
//设置cookie
Vue.prototype.setCookie = function (cname, cvalue, exdays) {
  var d = new Date()
  //console.log(cname)
  /*   d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000) //设置过期时间,现在的时间加上期望的过期时间 */
  d.setTime(d.getTime() + exdays * 60 * 60 * 1000) //设置过期时间,现在的时间加上期望的过期时间,现在是小时
  var expires = "expires=" + d.toUTCString() //
  document.cookie = cname + "=" + cvalue + "; " + expires // 这个很重要代表在那个层级下可以访问cookie

  //console.log(document.cookie)
}
//获取cookie
Vue.prototype.getCookie = function (cname) {
  var name = cname + "=";
  var array = document.cookie.split(';');
  for (var i = 0; i < array.length; i++) {
    var brr = array[i].trim(); //去除空格
    if (brr.indexOf(name) == 0) { //从头开始
      //console.log(brr.substring(name.length, brr.length))
      return brr.substring(name.length, brr.length)
    }
  }
  return "";
}
//检测cookie
Vue.prototype.checkCookie = function (cname) {
  var user = this.getCookie('userName');
  if (user != "") {
    return true
  } else {
    return false
  }
}
//删除cookie
Vue.prototype.deleteCookie = function (cname) {
    this.setCookie(cname, '', -1)
    ///document.cookie = 
  },
  //验证手机号
  Vue.prototype.checkPhone = function (phone) {
    if (
      !/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/.test(
        phone
      )
    ) {
      return false;
    } else {
      //getCheckNumberDisable()
      return true;
    }
  }
//自定义token,用来获取图形验证码
Vue.prototype.createToken = function () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
      v = c == 'x' ? r : (r & 0x3 | 0x8);
    //console.log(v.toString(16))
    return v.toString(16);
  });
}
//获取图像验证码
Vue.prototype.getImgCheckCode = function () {
  let createdToken = this.createToken() //自定义token
  var imgCheckCodeUrl = 'http://dou.fudayiliao.com/account/getcode/' + createdToken //返回图片链接
  return {
    createdToken,
    imgCheckCodeUrl
  }
}
Vue.prototype.btnSeconds = function () {
  var num = 60,
    tInterval;
  tInterval = setInterval(function () {
    attr.val(num + 's')
    num--
    if (num == -1) {
      clearInterval(tInterval);
      attr.val(val);
    }
  }, 1000)
}
//限制浏览
Vue.prototype.limit = function () {
  if (this.checkCookie() == false) {
    alert("登录状态已过期,请您重新登录");
    this.$router.push({
      path: "/"
    });
  }
}
//退出登录,,删除用户信息 
Vue.prototype.globalLoginOut = function () {
  this.deleteCookie("userName", "", -1);
  this.deleteCookie("userPhone", "", -1);
  this.deleteCookie("token", "", -1);
  this.deleteCookie("douyinId", "", -1);
}
//把时间戳转换为中文时间
Vue.prototype.transformDateStamp = function (param) {
  var date = new Date(parseInt(param.substr(6, 19)))
  var timeYear = new Date(date).getFullYear();
  var timeMouth = new Date(date).getMonth() + 1;
  var timeDate = new Date(date).getDate();
  var timeHours = new Date(date).getHours();
  var timeMinutes = new Date(date).getMinutes();
  var timeSeconds = new Date(date).getSeconds();
  var time = this.checkTen(timeYear) + "-" + this.checkTen(timeMouth) + "-" + this.checkTen(timeDate) + "   " + this.checkTen(timeHours) + ":" + this.checkTen(timeMinutes) + ":" + this.checkTen(timeSeconds)
  return time
}
Vue.prototype.checkTen = function (num) {
  if (num < 10) {
    num = "0" + num
  }
  return num
}

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title;
  next()
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
