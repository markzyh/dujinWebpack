<template>
  <div id="app">
    <!--  <slider-verification :isShowLoginForm="isShowLoginForm" @hideLoginForm="hideLoginForm"></slider-verification> -->
    <login-register
      :isShowLoginForm="isShowLoginForm"
      @hideLoginForm="hideLoginForm"
      @getUsername="getUsername"
    />
    <div class="htHeader">
      <div class="htHeader_con">
        <div class="ht_logo fl">
          <img src="/static/images/ht_logo.png" alt>
        </div>
        <div class="ht_nav fl">
          <li>
            <router-link to="/create-order">首页</router-link>
<!--             <router-link to="/create-order" tag="a"></router-link> -->
          </li>
          <li>
            <a href="http://www.dujin021.com/douyin">抖音运营</a>
          </li>
          <li>
            <a href="/">DOU+加速</a>
          </li>
          <li>
            <a href="http://www.dujin021.com/about">关于我们</a>
          </li>
          <li>
            <a href="http://www.dujin021.com/contact/1.html">常见问题</a>
          </li>
        </div>
        <div class="ht_person fr">
          <div class="user_is_login" v-if="watchLoginStatus">
            <router-link to="/personal-center">
              <img src="./assets/ht_yh_icon.png" alt>
              <span class="user_login_name">{{watchUserName}}</span> &nbsp;&nbsp;
            </router-link>|
            &nbsp;&nbsp;
            <span @click="loginOut">退出</span>
          </div>
          <div class="user_isnot_login show" @click="openUserLogin" v-if="!watchLoginStatus">注册/登录</div>
        </div>
      </div>
    </div>
    <div class="dybox" id="dybox">
      <nav-bar v-if="$route.path != '/order-details'"></nav-bar>
      <div class="create_box" :class="{dy_content:$route.path != '/order-details'}">
        <!-- <div class="dy_content create_box"> -->
        <!--  <keep-alive> -->
        <router-view></router-view>
        <!--  </keep-alive> -->
      </div>
    </div>
  </div>
</template>

<script>
import SliderVerification from "@/base/slider-verification/slider-verification";
import LoginRegister from "@/components/login-register/login-register";
import NavBar from "@/components/navbar/navbar";
//import Index from "@/components/index/index.html";
export default {
  components: {
    SliderVerification,
    LoginRegister,
    NavBar
  },
  name: "App",
  data() {
    return {
      isShowLoginForm: false,
      userName: "", //用户名
      isLogin: false //是否登录
    };
  },
  methods: {
    //用户手动退出登录
    loginOut() {
      this.globalLoginOut();
      this.isLogin = false;
      alert("您已经退出登录");
      this.$store.dispatch("loginAction", false);
      this.$store.dispatch("showLoginFormAction", true);
      //this.deleteCookie();
    },
    //获取用户名
    getUsername() {
      if (this.checkCookie("userName") == true) {
        this.userName = this.getCookie("userName");
        this.isLogin = true;
      } else {
        this.isLogin = false;
        alert("登录信息已过期,请您重新登录");
        //window.location.href = '/'
      }
    },
    //打开登录窗口,控制子组件显示隐藏
    openUserLogin() {
      this.isShowLoginForm = true;
      this.$store.dispatch("showLoginFormAction", true);
    },

    hideLoginForm() {
      this.isShowLoginForm = false;
    },
    
  },
  computed: {
    watchUserName() {
      return this.userName;
    },
    //监听store,控制用户名显示隐藏
    watchLoginStatus() {
      return this.$store.getters.getLoginStatus; //监听vuex中的登录状态,为了让表单页面提交完,更新登录状态
    }
  },
  mounted() {
    //this.getUsername();
    //this.$store.dispatch('decre',this.num)
    this.chekIsLogin(); //检测cookie是否存在,改变store,通过监听store的变化,来改变页面显示
  }
};
</script>

<style lang="scss">

/* 清除内外边距*/
* {
  margin: 0px;
  padding: 0px;
}
body {
  font-size: 14px;
  color: #333;
  font-family: "Microsoft YaHei";
}
/* 设置默认字体*/
body,
button,
input,
select,
textarea {
  /* for ie*/ /*font: 12px/1 Tahoma, Helvetica, Arial, "宋体", sans-serif;*/ /* font: 12px/1 "微软雅黑";*/ /*Tahoma, Helvetica, Arial, "\5b8b\4f53", sans-serif;*/ /* 用 ascii 字符表示，使得在任何编码下都无问题*/
}
h1 {
  font-size: 18px; /* 18px / 12px = 1.5*/
}
h2 {
  font-size: 16px;
}
h3 {
  font-size: 14px;
}
h4,
h5,
h6 {
  font-size: 100%;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.cl {
  zoom: 1;
}
.cl:after {
  height: 0;
  display: block;
  content: "\20";
  clear: both;
}
address,
cite,
dfn,
em,
var {
  font-style: normal;
}
/* 将斜体扶正*/
code,
kbd,
pre,
samp,
tt {
  font-family: "Courier New", Courier, monospace;
}
/* 统一等宽字体*/
small {
  font-size: 12px;
}
/* 小于 12px 的中文很难阅读，让 small 正常化*/ /* 重置列表元素*/
ul,
ol {
  list-style: none;
}
/* 重置文本格式元素*/
a {
  color: #333333;
  text-decoration: none;
}
a:hover {
  color: #333333;
  text-decoration: none;
}
abbr[title],
acronym[title] {
  /* 注：1.ie6 不支持 abbr;2.这里用了属性选择符，ie6 下无效果*/
  border-bottom: 1px dotted;
  cursor: help;
}

/* for ie6*/
fieldset,
img {
  border: none;
}
/* img 搭车：让链接里的 img 无边框*/ /* 注：optgroup 无法扶正*/
button,
input,
select,
textarea {
  font-size: 100%; /* 使得表单元素在 ie 下能继承字体大小*/
}
/* 重置表格元素*/
table {
  border-collapse: collapse;
  border-spacing: 0;
}
li {
  list-style: none;
}
/* 重置 hr*/
hr {
  border: none;
  height: 1px;
}
/* 让非ie浏览器默认也显示垂直滚动条，防止因滚动条引起的闪烁*/
html {
  overflow-y: scroll;
}
input::-webkit-input-placeholder {
  color: #999;
  font-size: 14px;
}
input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #999;
  font-size: 14px;
}
input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #999;
  font-size: 14px;
}
input:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #999;
  font-size: 14px;
}
.mara {
  margin: auto;
}
.close_login_form {
  position: absolute;
  right: 14px;
  top: 0;
  font-size: 26px;
  cursor: pointer;
}
.flied_tc {
  background: #efefef;
  width: 526px;
  padding-top: 1px;
  position: fixed;
  top: 150px;
  left: 50%;
  padding-bottom: 126px;
  margin-left: -180px;
  z-index: 9999;
  display: none;
}

.flied_tc.show {
  display: block;
}

.flied_td {
  width: 385px;
  margin: 18px auto auto auto;
}

.flied_td h4 {
  border-bottom: 2px solid #eb5169;
  height: 55px;
  line-height: 60px;
  text-align: center;
  margin-bottom: 30px;
}

.flied_td .flied_te {
  border: 1px solid #bbbbbb;
  height: 49px;
  line-height: 49px;
  overflow: hidden;
}

/* .flied_td .flied_te img {
  vertical-align: middle;
  margin-left: 18px;
  margin-right: 18px;
} */

.flied_td .flied_te input {
  border: none;
  background-color: transparent;
  background-image: url(assets/ion_yzma.png);
  background-repeat: no-repeat;
  text-indent: 2em;
  color: #999;
  background-size: 16px 27px;
  background-origin: content-box;
  background-position: center left;
  padding-left: 20px;
  width: 100%;
  height: 100%;
}

.flied_tf {
  border: 1px solid #bbbbbb;
  height: 40px;
  margin-top: 18px;
  margin-bottom: 42px;
  color: #666666;
  font-size: 14px;
  background: #cdcdcd;
}

.flied_tg {
  height: 49px;
}

input.flied_th {
  border: 1px solid #bbbbbb;
  width: 171px;
  line-height: 49px;
  padding-left: 15px;
  background: #ffff;
}

input.flied_ti {
  border: 1px solid #bbbbbb;
  width: 178px;
  line-height: 49px;
  text-align: center;
  background: #b2b2b2;
  color: #fff;
  cursor: pointer;
}

input.flied_ti.disable {
  background: #19be6b;
}

input.flied_ti::-webkit-input-placeholder {
  /* WebKit, Blink, Edge*/
  color: #fff;
}

input.flied_ti:-moz-placeholder {
  /* Mozilla Firefox 4 to 18*/
  color: #fff;
  opacity: 1;
}

input.flied_ti::-moz-placeholder {
  /* Mozilla Firefox 19+*/
  color: #fff;
  opacity: 1;
}

input.flied_ti:-ms-input-placeholder {
  /* Internet Explorer 10-11*/
  color: #fff;
}

input.flied_ti::-ms-input-placeholder {
  /* Microsoft Edge*/
  color: #fff;
}

input.flied_tj {
  width: 385px;
  height: 49px;
  border: none;
  background: #eb5169;
  color: #fff;
  cursor: pointer;
  margin-top: 38px;
}
.htHeader {
  /* width:1600px; */
  height: 90px;
  background: #fefefe;
  margin: 0 auto;
}

.htHeader_con {
  width: 1300px;
  margin: 0 auto;
}

.ht_logo img {
  margin-top: 30px;
  margin-left: 40px;
}

.ht_nav {
  margin-top: 28px;
  font-size: 20px;
  line-height: 31px;
}

.ht_nav li {
  float: left;
  margin: 0 30px;
}

.ht_person {
  margin-right: 45px;
  color: #b7b7b7;
  line-height: 31px;
  margin-top: 25px;
  a{
    color:#999;
  }
}

.ht_person div {
  cursor: pointer;
  font-size: 16px;
}
/* 
.ht_person div.show {
  display: block;
} */

.ht_person img {
  margin-bottom: -12px;
  margin-right: 13px;
}
body {
  background: #d3d3d3;
}

.dybox {
  width: 1300px;
  margin: 40px auto;
  display: flex;
  justify-content: flex-start;
}

.dis-inline {
  display: inline-block;
}

input,
select {
  border: none;
  -webkit-appearance: none;
  appearance: none;
  -moz-appearance: none;
}

input[type="radio"] {
  width: 18px;
  height: 18px;
  border: 1px solid #999;
  border-radius: 50%;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  cursor: pointer;
}

.dy-nav {
  width: 218px;
}

.dy_content {
  width: 1034px;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  margin: 0 auto;
  background: #fff; /*border-top: 1px solid transparent; */
  /*   padding: 50px; */
  margin-left: 50px;
}

.dymain_cover {
  position: fixed;
  background: #d3d3d3;
  z-index: 998;
  width: 100%;
  height: 100%;
  opacity: 0.5;
}
.create_title {
  font-size: 20px;
  font-weight: normal;
  text-align: left;
  margin: 0 auto;
  border-bottom: 1px solid #868686;
  padding-bottom: 20px;
}
.create_order_tips {
  position: relative;
  display: inline-block;
  width: 19px;
  text-indent: 0;
}

.order_tips_description {
  position: absolute;
  width: 270px;
  height: auto;
  border: 1px solid #ccc;
  padding: 20px;
  background: #fff;
  left: 50%;
  margin-left: -135px;
  top: 36px;
  line-height: 1.65em;
  color: #999;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  display: none;
  z-index: 2222;
  text-align: left;
}
.order_tips_description b {
  text-indent: 0;
  display: block;
  text-align: center;
  width: 100%;
  font-weight: normal;
  color: #666;
  margin-bottom: 10px;
  font-size: 16px;
}
.order_tips_description strong {
  font-size: 16px;
  color: #333;
  font-weight: normal;
}
.order_tips_description_tri {
  width: 21px;
  height: 11px;
  position: absolute;
  top: -11px;
  left: 50%;
  margin-left: -10px;
  z-index: 3;
}

.order_tips_icon {
  cursor: pointer;
  margin-bottom: -3px;
}

.create_order_tips:hover .order_tips_description {
  display: block;
}
</style>
