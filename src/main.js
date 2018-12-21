// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import originaxios from '@/api/http'
import store from './store'


//element-ui样式------------------------------------------------------
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
//element-ui样式end------------------------------------------------------



//全局的api,来自fn,js------------------------------------------------------
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
  uploadImg,
  chekIsLogin,
  checkTen
} from '@/api/fn'

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

//检测cookie中的值,用于app.vue,mounted后检测
Vue.prototype.chekIsLogin = chekIsLogin

//时间,检测是否大于10
Vue.prototype.checkTen = checkTen

//全局的api------end------------------------------------------------------------








//全局路由守卫------------------------------------------------------------------
router.beforeEach((to, from, next) => {
  //改变页面的title
  window.document.title = to.meta.title + "-上海度进信息科技有限公司";
  //检测登录
  if (getCookie('token') == '' && to.path !== '/create-order') {
    MessageBox.alert("您还没有登录,请您先登录", "温馨提示", {
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
  //检测是否完善资料
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
//全局路由守卫--------------end----------------------------------------------------





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
