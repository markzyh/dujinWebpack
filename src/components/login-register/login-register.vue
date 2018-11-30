<template>
  <div class="login-register">
    <!-- 登录注册模块 -->
    <transition name="show">
      <div class="flied_tc" :class="{show:isShowLoginForm == true}" v-if="isShowLoginForm">
        <div class="close_login_form" @click="hideLoginForm">x</div>
        <div class="flied_td">
          <h4 class="login_title">
            <span
              :class="{choosed:nowIndex === index}"
              v-for="(item,index) in loginStatusName"
              :key="index"
              @click="switchLoginRegister(index)"
            >{{item}}</span>
          </h4>
          <!-- <transition name="show"> -->
          <form class="login_form" @keyup.enter="userLogin" v-if="wantToLogin">
            <div class="flied_te">
              <input type="tel" id="userphone" placeholder="输入手机号" v-model="userLoginPhone">
            </div>
            <div class="flied_te">
              <input
                type="password"
                id="userpassword"
                placeholder="输入密码"
                v-model="userLoginPassword"
              >
            </div>
            <input class="flied_tj" type="button" value="立即登录" @click="userLogin">
          </form>
          <!-- </transition> -->
          <!-- <transition name="show"> -->
          <!-- 注册模块 -->
          <form class="login_form register_form" v-if="!wantToLogin">
            <div class="flied_te">
              <input type="tel" id="registerPhone" placeholder="输入手机号" v-model="registerPhone">
            </div>
            <div class="flied_te">
              <input
                type="password"
                id="registerPassword"
                placeholder="请输入密码"
                v-model="registerPassword"
              >
            </div>
            <div class="flied_te">
              <input
                type="password"
                id="confirmRegisterPassword"
                placeholder="请再次输入密码"
                v-model="confirmRegisterPassword"
              >
            </div>
            <div class="flied_te">
              <input
                type="text"
                id="imgCheckCode"
                placeholder="请输入图形验证码"
                class="partinput"
                v-model="imgCheckCode"
              >
              <img :src="imgCodeUrl" id="imgCheckCodeUrl" alt srcset @click="getImgCode()">
            </div>
            <div class="flied_te">
              <input
                type="text"
                id="getphone_code"
                placeholder="请输入手机验证码"
                class="partinput"
                v-model="phoneCheckCode"
              >
              <input
                class="getphone_code"
                name="mobile"
                type="text"
                v-model="getPhoneCheckCodeBtn"
                @click="getPhoneCheckNumber"
                :disabled="!letGetPhoneCode"
                :class="{disabled:!letGetPhoneCode}"
              >
            </div>
            <input class="flied_tj" type="button" value="立即注册" @click="userRegister">
          </form>
          <!-- </transition> -->
        </div>
      </div>
    </transition>
    <!-- 登录注册模块 end-->
  </div>
</template>

<script>
import axios from "axios";
export default {
  components: {},
  props: ["isShowLoginForm"],
  name: "login-register",
  data() {
    return {
      registerPhone: "", //注册手机号
      registerPassword: "", //注册密码
      confirmRegisterPassword: "", //确认注册密码
      imgCheckCode: "", //输入的图形验证码
      phoneCheckCode: "", //手机验证码
      imgCodeUrl: "", //图像验证码链接
      createdToken: "", //自定义的token
      userLoginPhone: "", //登录手机号
      userLoginPassword: "", //登录密码
      wantToLogin: true, //用户是否想登录,用来切换登录注册
      letGetPhoneCode: true, //允许获取手机验证码,用来控制按钮disabled
      getPhoneCheckCodeBtn: "获取手机验证码", //获取手机验证码按钮的value
      userName: "",
      nowIndex: 0, //点击登录按钮的索引
      loginStatusName: ["快速登录", "新用户注册"]
    };
  },
  methods: {
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
    //确认注册
    userRegister() {
      if (this.checkUserRegister() == true) {
        //注册验证
        let Phone = this.registerPhone;
        let Password = this.registerPassword;
        let Code = this.phoneCheckCode;
        axios
          .post("account/register", {
            Phone: Phone,
            Password: Password,
            Code: Code
          })
          .then(res => {
            console.res;
            if (res.data.Code == 13) {
              alert("该手机号已经注册");
              return false;
            }else{
              alert('注册成功')
            }
          });
      }
    },
    //获取手机验证码的按钮读秒效果
    disabledBtn() {
      this.letGetPhoneCode = false;
      let tInterval;
      let seconds = 60;
      tInterval = setInterval(() => {
        this.getPhoneCheckCodeBtn = seconds - 1 + "s";
        seconds--;
        if (seconds < 0) {
          this.getPhoneCheckCodeBtn = "获取手机验证码";
          clearInterval(tInterval);
          this.letGetPhoneCode = true;
          return false;
        }
      }, 1000);
      //this.btnSeconds('getPhoneCheckCodeBtn',60,this.getPhoneCheckCodeBtn)
    },
    //获取手机验证码
    getPhoneCheckNumber() {
      if (this.checkUserRegister() == true) {
        this.disabledBtn(); //按钮不可点击
        let Key = this.createdToken; //自定义token
        let Data = this.imgCheckCode; //输入的图形验证码
        let registerPhone = this.registerPhone; //注册的手机号
        let url = "/account/GetSmsCode/" + registerPhone;
        axios
          .post(url, {
            Key: Key,
            Data: Data
          })
          .then(res => {
            console.log(res);
            if(res.data.Code == 1){
              alert('验证码错误,请重新输入')
              return false
            }
          });
      }
    },
    //检测注册
    checkUserRegister() {
      //验证手机号规则
      if (this.checkPhone(this.registerPhone) == false) {
        alert("请您填写正确的手机号");
        return false;
      }
      //再验证两次密码是否相同
      if (this.registerPassword != this.confirmRegisterPassword) {
        alert("您两次输入的密码不一致,请您重新输入");
        return false;
      }
      if (
        this.registerPhone == "" ||
        this.registerPassword == "" ||
        this.confirmRegisterPassword == "" ||
        this.imgCheckCode == ""
      ) {
        alert("您的信息没有填写完整,请您重新填写");
        return false;
      } else {
        return true;
      }
    },
    //获取图像验证码
    getImgCode() {
      var obj = this.getImgCheckCode();
      this.createdToken = obj.createdToken;
      this.imgCodeUrl = obj.imgCheckCodeUrl;
    },
    //用户登录信息写入
    setUserMessage() {
      var d = new Date();
      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000); //设置过期时间,现在的时间加上期望的过期时间
      var expires = "expires=" + d.toUTCString(); //
      document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/"; // 这个很重要代表在那个层级下可以访问cookie
      console.log(d);
    },
    //从cookie中获取用户姓名
    //传递用户名和登录状态给父组件,emit,触发父组件事件
    emitGetUsername() {
      this.$emit("getUsername");
    },
    //用户登录
    userLogin() {
      //alert(0)
      if (this.checkUserLogin() == true) {
        let Phone = this.userLoginPhone;
        let Password = this.userLoginPassword;
        axios
          .post("/account/login", {
            Phone: Phone,
            Password: Password
          })
          .then(res => {
            if (res.data.Code == 1) {
              alert("账号或者密码错误,请您重新输入");
              return false;
            }
            console.log(res.data);
            //this.userName = res.data.Data.Name;
            let userName = res.data.Data.Name;
            let userPhone = res.data.Data.Phone;
            let token = res.data.Token;
            let douyinId = res.data.Data.DouyinId;
            this.setCookie("userName", userName, 1);
            this.setCookie("userPhone", userPhone, 1);
            this.setCookie("token", token, 1);
            this.setCookie("douyinId", douyinId, 1);
            //this.getUserName()
            this.hideLoginForm(); //父组件事件,隐藏窗口
            this.emitGetUsername(); //触发父组件获取用户名
          });
      }
    },
    //检测用户登录
    checkUserLogin() {
      if (this.userLoginPhone == "" || this.userLoginPassword == "") {
        alert("用户名和密码不能为空!");
        return false;
      }
      if (this.checkPhone(this.userLoginPhone) == false) {
        alert("请您填写正确的手机号");
        return false;
      } else {
        return true;
      }
    },
    //隐藏登录窗口,给父组件传值
    hideLoginForm() {
      this.$emit("hideLoginForm");
    }
  },
  computed: {
    watchUserName() {
      return this.userName;
    }
  },
  mounted() {
    this.getImgCode();
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

