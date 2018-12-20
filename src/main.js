// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import {
  Popover,
  Dialog,
  Message,
  Notification,
  DatePicker,
  Loading,
  Select,
  Option,
  Upload,
  Button,
  MessageBox,
} from 'element-ui';
import App from './App'
import router from './router'
import originaxios from '@/api/http'
import store from './store'


Vue.use(Dialog);
Vue.use(Popover);
Vue.use(Select);
Vue.use(Option);
Vue.use(Upload);
Vue.use(Button);
Vue.use(Popover);
Vue.use(DatePicker);
Vue.prototype.$MessageBox = MessageBox;
Vue.prototype.$Message = Message;
Vue.prototype.$Notification = Notification;
Vue.prototype.$axios = originaxios
Vue.use(Loading.directive);
Vue.prototype.$loading = Loading.service;

import {
  setCookie,
  globalLoginOut,
  deleteCookie,
  getCookie,
  checkCookie,
  checkPhone,
  transformDateStamp,
  createToken,
  getImgCheckCode,
  uploadImg
} from '@/api/fn'


//全局的api------------------------------------------------------

//设置cookie
Vue.prototype.setCookie = setCookie

//获取cookie
Vue.prototype.getCookie = getCookie

//检测cookie
Vue.prototype.checkCookie = checkCookie

//删除cookie
Vue.prototype.deleteCookie = deleteCookie

//全局退出登录,,删除用户信息,更改store
Vue.prototype.globalLoginOut = globalLoginOut

//验证手机号
Vue.prototype.checkPhone = checkPhone

//自定义token,用来获取图形验证码
Vue.prototype.createToken = createToken

//获取图像验证码和自定义token
Vue.prototype.getImgCheckCode = getImgCheckCode

//把时间戳转换为中文时间
Vue.prototype.transformDateStamp = transformDateStamp

//上传图片
Vue.prototype.uploadImg = uploadImg

//全局的api------------------------------------------------------------------

Vue.prototype.checkTen = function (num) {
  if (num < 10) {
    num = "0" + num
  }
  return num
}
//检测cookie中的值,用于app.vue,mounted后检测
Vue.prototype.chekIsLogin = function () {
  if (this.checkCookie("userName") != false) {
    //cookie中存在
    this.userName = this.getCookie("userName");
    this.$store.dispatch("loginAction", true);
    //this.$store.dispatch("showLoginFormAction", true);
    this.$store.dispatch("showAction", false);
  } else {
    this.$store.dispatch("loginAction", false);
    this.$store.dispatch("showAction", true);
  }
}
//router-link改title
router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title + "-上海度进信息科技有限公司";
  if (getCookie('token') == '' && to.path !== '/create-order') {
    MessageBox.alert("您还没有登录,请您先登录", "登陆错误", {
      confirmButtonText: "确定",
      type:'error',
      callback: () => {
        store.dispatch("loginAction", false);
        store.dispatch("showAction", true);
      }
    });
    next('/create-order')
    return false
  }
  if(getCookie('douyinId') == 'null' && getCookie('token') !== '' && to.path !== '/personal-data'){
    MessageBox.alert("您还没有完善您的资料,请您先完善您的个人资料", "资料编辑", {
      confirmButtonText: "确定",
      type:'error',
      callback: () => {
        next('/personal-data')
        return false
      }
    });
  }
  else {
    next()
  }
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
