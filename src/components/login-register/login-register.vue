<template>
  <div class="login-register">
    <div class="login-register-cover" v-if="watchShowLoginForm"></div>
    <div class="flied_tc" :class="{show:watchShowLoginForm}" v-if="watchShowLoginForm" v-loading='loading'>
      <div class="close_login_form" @click="hideLoginForm">x</div>
      <div class="flied_td" v-if="!isforgetPassword">
        <h4 class="login_title">
          <span
            :class="{choosed:nowIndex === index}"
            v-for="(item,index) in loginStatusName"
            :key="index"
            @click="switchLoginRegister(index)"
          >{{item}}</span>
        </h4>
        <!-- 登录注册模块 -->
        <form class="login_form" @keyup.enter="userLogin" v-if="wantToLogin">
          <div class="flied_te">
            <input type="tel" id="userphone" placeholder="输入手机号" v-model="userLoginPhone">
          </div>
          <div class="flied_te">
            <input type="password" id="userpassword" placeholder="输入密码" v-model="userLoginPassword">
          </div>
          <input class="flied_tj" type="button" value="立即登录" @click="userLogin" >
          <p class="forget_password_btn" @click="showForgetPassword">忘记密码</p>
        </form>
        <!-- 登录注册模块end -->
        <register  v-if="!wantToLogin" @emitGetUsername='emitGetUsername'></register>
      </div>
      <forget-password v-if="isforgetPassword"/>
    </div>
    <!-- 登录注册模块 end-->
  </div>
</template>

<script>
import ForgetPassword from "@/components/login-register/forget-password";
import Register from "@/components/login-register/register";
export default {
  components: {
    ForgetPassword,
    Register
  },
  props: ["isShowLoginForm"],
  name: "login-register",
  data() {
    return {
      loading:false,
      isforgetPassword: false, //是否忘记密码
      userLoginPhone: "", //登录手机号
      userLoginPassword: "", //登录密码
      wantToLogin: true, //用户是否想登录,用来切换登录注册
      userName: "",
      nowIndex: 0, //点击登录按钮的索引
      loginStatusName: ["快速登录", "新用户注册"]
    };
  },
  methods: {
    showForgetPassword() {
      this.isforgetPassword = true; //显示忘记密码版块
    },
    switchLoginRegister(index) {
      this.nowIndex = index;
      if (index == 0) {
        //登录时
        this.wantToLogin = true;
      } else {
        //注册时
        this.wantToLogin = false;
      }
    },
    //传递用户名和登录状态给父组件,emit,触发父组件事件
    emitGetUsername() {
      this.$emit("getUsername");
    },
    //用户登录
    userLogin() {
      if (this.checkUserLogin() == true) {
        this.loading = true
        let Phone = this.userLoginPhone;
        let Password = this.userLoginPassword;
        this.$axios
          .post("/account/login", {
            Phone: Phone,
            Password: Password
          })
          .then(res => {
            if (res) {
              this.loading = false
              this.$store.dispatch("loginAction", true); //vuex存储登录的状态
              //console.log(res.data.Data)
              let userName = res.data.Data.Name;
              let userPhone = res.data.Data.Phone;
              let token = res.data.Token;
              let douyinId = res.data.Data.DouyinId;
              let authType = res.data.Data.AuthType;
              if(authType !== 'null'){
                this.setCookie("authType", authType, 1);
              }
              this.setCookie("userName", userName, 1);
              this.setCookie("userPhone", userPhone, 1);
              this.setCookie("token", token, 1);
              this.setCookie("douyinId", douyinId, 1);
              this.hideLoginForm(); //父组件事件,隐藏窗口
              this.emitGetUsername(); //触发父组件获取用户名
              window.location.reload();
            }
          });
      }
    },
    //检测用户登录事件
    checkUserLogin() {
      if (this.userLoginPhone == "" || this.userLoginPassword == "") {
        this.$Notification({
          title: "温馨提示",
          message: "用户名和密码不能为空!",
          type: "warning"
        });
        return false;
      }
      if (this.checkPhone(this.userLoginPhone) == false) {
        this.$Notification({
          title: "温馨提示",
          message: "请您填写正确的手机号!",
          type: "warning"
        });
        return false;
      } else {
        return true;
      }
    },
    //隐藏登录窗口,给父组件传值
    hideLoginForm() {
      //this.$emit("hideLoginForm");
      this.$store.dispatch("showAction", false);
      this.isforgetPassword = false;
    }
  },
  computed: {
    watchUserName() {
      return this.userName;
    },
    watchShowLoginForm() {
      return this.$store.getters.getShowForm; //监听vuex中的登录状态,为了让表单页面提交完,更新登录状态
    }
  },
  mounted() {
    //this.getImgCode();
    //this.chekIsLogin();
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
  display: none;
  background: #fff;
  width: 526px;
  padding-top: 1px;
  position: fixed;
  top: 50%;
  left: 50%;
  padding-bottom: 60px;
  margin-left: -180px;
  transform: translateY(-50%);
  z-index: 9999;
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
  vertical-align: middle;
  /*margin-left: 18px;margin-right: 18px;*/
  margin-top: 6px;
  cursor: pointer;
  width: 124px;
  height: 38px;
  float: right;
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
  height: 99.5%;
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
  float: right;
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

.register_privacy {
  margin: 16px 0 0;
  color: #999;
}
</style>
