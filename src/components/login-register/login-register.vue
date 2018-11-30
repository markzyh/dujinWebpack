<template>
  <div class="login-register">
    <!-- 登录注册模块 -->
    <div class="flied_tc" :class="{show:isShowLoginForm == true}" v-if="isShowLoginForm">
      <div class="close_login_form" @click="hideLoginForm">x</div>
      <div class="flied_td">
        <h4 class="login_title">
          <span class="choosed">快速登录</span>
          <span>新用户注册</span>
        </h4>
        <form class="login_form show">
          <div class="flied_te">
            <input type="tel" id="userphone" placeholder="输入手机号">
          </div>
          <div class="flied_te">
            <input type="password" id="userpassword" placeholder="输入密码">
          </div>
          <input class="flied_tj" type="button" value="立即登录" onclick="userLogin()">
        </form>
        <form class="login_form register_form">
          <div class="flied_te">
            <input type="tel" id="registerPhone" placeholder="输入手机号">
          </div>
          <div class="flied_te">
            <input type="password" id="registerPassword" placeholder="请输入密码">
          </div>
          <div class="flied_te">
            <input type="password" id="confirmRegisterPassword" placeholder="请再次输入密码">
          </div>
          <div class="flied_te">
            <input
              type="text"
              id="imgCheckCode"
              placeholder="请输入图形验证码"
              class="partinput"
              onchange="letGetPhoneCode()"
            >
            <img src id="imgCheckCodeUrl" alt srcset onclick="getCheckCode()">
          </div>
          <div class="flied_te">
            <input type="text" id="getphone_code" placeholder="请输入手机验证码" class="partinput">
            <input
              class="getphone_code"
              name="mobile"
              type="text"
              value="获取手机验证码"
              onclick="getCheckNumber()"
            >
          </div>
          <input class="flied_tj" type="button" value="立即注册" onclick="userRegister()">
        </form>
      </div>
    </div>
    <!-- 登录注册模块 end-->
  </div>
</template>

<script>
export default {
  components: {},
  props: ["isShowLoginForm"],
  name: "slider-verification",
  data() {
    return {};
  },
  methods: {
    //隐藏登录窗口,给父组件传值
    hideLoginForm() {
      this.$emit("hideLoginForm");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.flied_tc {
  background: #efefef;
  width: 526px;
  padding-top: 1px;
  position: fixed;
  top: 150px;
  left: 50%;
  padding-bottom: 60px;
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
/*.flied_td h4{border-bottom: 2px solid #eb5169;height: 55px;line-height: 60px;text-align: center;margin-bottom: 30px;font-size: 20px;font-weight: normal;}*/
.flied_td h4 {
  border-bottom: 1px solid #bbb;
  height: 55px;
  line-height: 60px;
  text-align: center;
  margin-bottom: 30px;
  font-size: 20px;
  font-weight: normal;
}
.flied_td h4 span {
  display: inline-block;
  width: 49%;
  height: 100%;
  cursor: pointer;
}
.flied_td h4 span.choosed {
  border-bottom: 2px solid #eb5169;
  vertical-align: top;
  margin-top: -1px;
}
.flied_td .flied_te {
  border: none !important;
  height: 49px;
  line-height: 49px;
  overflow: hidden;
  margin: 20px 0;
}
.flied_td .flied_te img {
  vertical-align: middle; /*margin-left: 18px;margin-right: 18px;*/
  margin-top: -4px;
  cursor: pointer;
}
.flied_td .flied_te input {
  border: none;
  background-color: transparent;
  background-image: url(/images/ion_yzma.png);
  background-repeat: no-repeat;
  text-indent: 2em;
  color: #999;
  background-size: 16px 27px;
  background-origin: content-box;
  background-position: center left;
  padding-left: 20px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  vertical-align: top;
  border: 1px solid #bbbbbb;
}
.flied_td .flied_te input[type="password"] {
  background-image: url(/images/login_form_password.png);
}
.flied_td .flied_te .partinput {
  width: 56%;
  background: transparent;
  padding-left: 0;
  margin-right: 44px;
}
.flied_td .flied_te .getphone_code {
  width: 124px;
  padding-left: 0;
  cursor: pointer;
  color: #fff;
  text-indent: 0;
  text-align: center;
  background: #19be6b;
}
.flied_td .flied_te .getphone_code.disabled {
  background: #b2b2b2;
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
  color: #fff;
}
input.flied_ti:-moz-placeholder {
  color: #fff;
  opacity: 1;
}
input.flied_ti::-moz-placeholder {
  color: #fff;
  opacity: 1;
}
input.flied_ti:-ms-input-placeholder {
  color: #fff;
}
input.flied_ti::-ms-input-placeholder {
  color: #fff;
}
input.flied_tj {
  width: 385px;
  height: 49px;
  border: none;
  background: #eb5169;
  color: #fff;
  cursor: pointer;
  margin-top: 10px;
}
.login_form {
  display: none;
}
.login_form.show {
  display: block;
}
</style>

