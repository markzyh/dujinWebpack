<template>
  <div class="forget-password-com flied_td">
    <h4 class="login_title">{{forgetName}}</h4>
    <!--忘记密码-->
    <form class="login_form show login_form_forget" v-if="!nextStep" @keyup.enter="forgetNext">
      <div class="flied_te">
        <input type="tel" id="forget_userphone" placeholder="输入手机号" v-model="forgetPhone">
      </div>
      <div class="flied_te">
        <input
          type="text"
          id="forget_imgCheckCode"
          placeholder="请输入图形验证码"
          class="partinput"
          v-model="forgetImgCode"
        >
        <img
          :src="forgetImgCodeUrl"
          id="forget_imgCheckCodeUrl"
          alt
          srcset
          @click="getImgCode()"
          class="imgCheckCodeUrl"
        >
      </div>
      <div class="flied_te">
        <input
          type="text"
          id="forget_getphone_code"
          placeholder="请输入手机验证码"
          class="partinput"
          v-model="forgetPhoneCode"
        >
        <input
          class="getphone_code"
          name="mobile"
          type="text"
          v-model="forgetPhoneCheckCodeBtn"
          @click="getForgetPhoneCheckNumber"
          :disabled="!letGetPhoneCode"
          :class="{disabled:!letGetPhoneCode}"
        >
      </div>
      <input class="flied_tj" type="button" value="下一步" @click="forgetNext">
    </form>
    <!--重置密码-->
    <form class="login_form reset_password" v-if="nextStep" @keyup.enter="resetPassword">
      <div class="flied_te">
        <input
          type="password"
          id="inputForgetPassword"
          placeholder="请输入密码"
          v-model="forgetPassword"
        >
      </div>
      <div class="flied_te">
        <input
          type="password"
          id="confirminputForgetPassword"
          placeholder="请再次输入密码"
          v-model="confirmForgetPassword"
        >
      </div>
      <input class="flied_tj" type="button" value="确定" @click="resetPassword">
    </form>
  </div>
</template>

<script>
export default {
  props: ["isShowLoginForm"],
  name: "login-register",
  data() {
    return {
      forgetName: "忘记密码",
      nextStep: false, //下一步
      forgetPhone: "", //手机号
      forgetImgCode: "", //图形验证码
      forgetImgCodeUrl: "", //图形验证图像
      createdToken: "", //自定义token
      forgetPhoneCode: "", //手机验证码
      forgetPhoneCheckCodeBtn: "获取手机验证码",
      letGetPhoneCode: true,
      forgetPassword: "",
      confirmForgetPassword: ""
    };
  },
  methods: {
    //关闭忘记密码版块
    hideForgetForm() {},
    //确认注册
    resetPassword() {
      if (this.forgetPassword == "" || this.confirmForgetPassword == "") {
        alert("请您输入密码");
        return false;
      }
      if (this.forgetPassword != this.confirmForgetPassword) {
        alert("您两次输入的密码不一致,请您重新输入");
        return false;
      }

      let Phone = this.forgetPhone;
      let Password = this.confirmForgetPassword;
      let Code = this.forgetPhoneCode;
      let ForgetPassword = true;
      this.$axios
        .post(
          "account/register",
          {
            Phone: Phone,
            Password: Password,
            Code: Code,
            ForgetPassword: ForgetPassword
          }
        )
        .then(res => {
          console.res;
          alert("成功找回密码,请您重新登录");
          this.globalLoginOut();
          window.location.reload();
          //this.$router.push({ path: "/personal-data" });
        });
    },
    //点击下一步
    forgetNext() {
      if (this.checkForgetForm() == true) {
        if (this.forgetPhoneCode == "") {
          alert("请输入手机验证码");
          return false;
        } else {
          this.nextStep = true;
        }
      }
    },
    //获取手机验证码的按钮读秒效果
    disabledBtn() {
      this.letGetPhoneCode = false;
      let tInterval;
      let seconds = 60;
      tInterval = setInterval(() => {
        this.forgetPhoneCheckCodeBtn = seconds - 1 + "s";
        seconds--;
        if (seconds < 0) {
          this.forgetPhoneCheckCodeBtn = "获取手机验证码";
          clearInterval(tInterval);
          this.letGetPhoneCode = true;
          return false;
        }
      }, 1000);
      //this.btnSeconds('getPhoneCheckCodeBtn',60,this.getPhoneCheckCodeBtn)
    },
    //
    checkForgetForm() {
      if (
        this.forgetPhone == "" ||
        this.checkPhone(this.forgetPhone) == false
      ) {
        alert("请您填写正确的手机号");
        return false;
      }
      if (this.forgetImgCode == "") {
        alert("请您填写图形验证码");
        return false;
      } else {
        return true;
      }
    },
    //获取手机验证码
    getForgetPhoneCheckNumber() {
      if (this.checkForgetForm() == true) {
        this.disabledBtn(); //按钮不可点击
        let Key = this.createdToken; //自定义token
        let Data = this.forgetImgCode; //输入的图形验证码
        let forgetPhone = this.forgetPhone; //手机号
        let url = "/account/GetSmsCode/" + forgetPhone;
        axios
          .post(
            url,
            {
              Key: Key,
              Data: Data
            }
          )
          .then(res => {
            console.log(res);
            if (res.data.Code == 1) {
              alert("验证码错误,请重新输入");
              return false;
            }
          });
      }
    },
    //检测注册

    //获取图像验证码
    getImgCode() {
      var obj = this.getImgCheckCode();
      this.createdToken = obj.createdToken;
      this.forgetImgCodeUrl = obj.imgCheckCodeUrl;
    }
  },
  computed: {},
  mounted() {
    this.getImgCode();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.login_form .forget_password_btn {
  text-align: right;
  margin-top: 20px;
  display: block;
  cursor: pointer;
  color: #999;
}
.login-register-cover {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
}
.flied_tc {
  background: #fff;
  width: 526px;
  padding-top: 1px;
  position: fixed;
  top: 150px;
  left: 50%;
  padding-bottom: 60px;
  margin-left: -180px;
  z-index: 9999;
  display: none;
  border: 1px solid #efefef;
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
  background-image: url(../../assets/ion_yzma.png);
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
  background-image: url(../../assets/login_form_password.png);
  background-size: 21px 25px;
}
.flied_td .flied_te .partinput {
  width: 55%;
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
/* .login_form {
  display: none;
}
.login_form.show {
  display: block;
} */
.show-enter-active,
.show-leave-active {
  transition: opacity 0.5s;
}

.show-enter,
.show-leave-to {
  opacity: 0;
}
</style>

