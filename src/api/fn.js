import {Notification} from 'element-ui';
import store from '../store'
import router from '../router'
import originaxios from '@/api/http'

//全局退出登录
export function globalLoginOut() {
  deleteCookie("userName");
  deleteCookie("userPhone");
  deleteCookie("token");
  deleteCookie("douyinId");
  store.dispatch("loginAction", false);
  store.dispatch("showAction", true);
  router.push({path:'/create-order'})
}


//检测cookie中的值,用于app.vue,mounted后检测
export function chekIsLogin() {
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
//删除cookie
export function deleteCookie(cname) {
  setCookie(cname, '', -1)
}

//设置cookie
export function setCookie(cname, cvalue, exdays) {
  var d = new Date()
  //console.log(cname)
  d.setTime(d.getTime() + exdays * 60 * 60 * 1000) //设置过期时间,现在的时间加上期望的过期时间,现在是小时
  var expires = "expires=" + d.toUTCString() //
  var path = "path=/"
  document.cookie = cname + "=" + cvalue + "; " + expires + ";" + path // 这个很重要代表在那个层级下可以访问cookie
  //console.log(document.cookie)
}

//获取cookie
export function getCookie(cname) {
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
export function checkCookie(cname) {
  var user = getCookie(cname);
  if (user != "") {
    return true
  } else {
    return false
  }
}

//验证手机号
export function checkPhone(phone) {
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

//把时间戳转换为中文时间
export function transformDateStamp(param) {
  //var date = new Date(parseInt(param.substr(6, 19)))
  var timeYear = new Date(param).getFullYear();
  var timeMouth = new Date(param).getMonth() + 1;
  var timeDate = new Date(param).getDate();
  var timeHours = new Date(param).getHours();
  var timeMinutes = new Date(param).getMinutes();
  var timeSeconds = new Date(param).getSeconds();
  var time = checkTen(timeYear) + "-" + checkTen(timeMouth) + "-" + checkTen(timeDate) + "   " + checkTen(timeHours) + ":" + checkTen(timeMinutes) + ":" + checkTen(timeSeconds)
  return time
}

export function checkTen(num) {
  if (num < 10) {
    num = "0" + num
  }
  return num
}
//自定义token,用来获取图形验证码
export function createToken() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
      v = c == 'x' ? r : (r & 0x3 | 0x8);
    //console.log(v.toString(16))
    return v.toString(16);
  });
}

//获取图像验证码
export function getImgCheckCode() {
  let createdToken = createToken() //自定义token
  var imgCheckCodeUrl = 'http://dou.fudayiliao.com/account/getcode/' + createdToken //返回图片链接
  return {
    createdToken,
    imgCheckCodeUrl
  }
}

//上传图片
export function uploadImg(event, ref) {
  let file = this.$refs[ref].files[0];
  if (beforeUpload(file) == true) {
    let formData = new FormData();
    formData.append("path", file);
    return originaxios({
      url: "/account/ImageUpload",
      method: "post",
      data: formData
    }).then((res) =>{
      let imgUrl = "http://dou.fudayiliao.com" + res.data.Data;
      return imgUrl
    })
  }
  else{
      return false
  }
}

//图片上传前检测图片
function beforeUpload(file) {
  let fileSize = 500 * 1024; //500k
  let fileType1 = "JPG";
  let fileType2 = "JPEG";
  let fileType3 = "PNG";
  let uploadFileType = file.type.split("/")[1];
  let uploadFileSize = file.size;
  if (
    uploadFileType != fileType1 &&
    uploadFileType != fileType2 &&
    uploadFileType != fileType1.toLowerCase() &&
    uploadFileType != fileType2.toLowerCase() &&
    uploadFileType != fileType3 &&
    uploadFileType != fileType3.toLowerCase()
  ) {
    Notification({
      title: '警告',
      message: '图片只支持JPG,JPEG或者PNG格式!',
      type: 'warning'
    })
    return false;
  }
  if (uploadFileSize > fileSize) {
    Notification({
      title: '警告',
      message: '图片大小不能超过500k!',
      type: 'warning'
    })
    return false;
  } else {
    return true;
  }
}
