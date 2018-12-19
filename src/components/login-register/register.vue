<template>
  <div class="register">
    <form class="login_form register_form" @keyup.enter="userRegister">
      <div class="flied_te">
        <input type="tel" id="registerPhone" placeholder="输入手机号" v-model="registerPhone">
      </div>
      <div class="flied_te">
        <input type="password" id="registerPassword" placeholder="请输入密码" v-model="registerPassword">
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
      <p class="register_privacy">
        注册即表示同意
        <a href="/service.html" target="_blank">度进营销用户服务协议</a>及
        <a href="/privacy.html" target="_blank">隐私条款</a>
      </p>
      <input class="flied_tj" type="button" value="立即注册" @click="userRegister">
    </form>
  </div>
</template>
<script>

export default {
  name: "register",
  data() {
    return {
      registerPhone: "", //注册手机号
      registerPassword: "", //注册密码
      confirmRegisterPassword: "", //确认注册密码
      imgCheckCode: "", //输入的图形验证码
      phoneCheckCode: "", //手机验证码
      imgCodeUrl: "", //图像验证码链接
      createdToken: "", //自定义的token
      letGetPhoneCode: true, //允许获取手机验证码,用来控制按钮disabled
      getPhoneCheckCodeBtn: "获取手机验证码", //获取手机验证码按钮的value
    };
  },
  methods: {
    //确认注册
    userRegister() {
      if (this.checkUserRegister() == true) {
        //注册验证
        let Phone = this.registerPhone;
        let Password = this.registerPassword;
        let Code = this.phoneCheckCode;
        this.$axios
          .post("account/register", {
            Phone: Phone,
            Password: Password,
            Code: Code
          })
          .then(res => {
            if (res) {
              this.$store.dispatch("loginAction", true); //vuex存储登录的状态
              let userName = res.data.Data.Name;
              let userPhone = res.data.Data.Phone;
              let token = res.data.Token;
              let douyinId = res.data.Data.DouyinId;
              this.setCookie("userName", userName, 1);
              this.setCookie("userPhone", userPhone, 1);
              this.setCookie("token", token, 1);
              this.setCookie("douyinId", douyinId, 1);
              //this.hideLoginForm(); //父组件事件,隐藏窗口
              this.$emit('hideloginform')
              this.$emit('emitGetUsername')//触发父组件获取用户名
              this.$MessageBox.alert(
                "您已注册成功,为了方便更好的为您服务,请您先完善您的个人信息",
                "温馨提示",
                {
                  confirmButtonText: "确定",
                  type: "success",
                  callback: action => {
                    window.location.href = "/dist/#/personal-data";
                  }
                }
              );
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
        let Key = this.createdToken; //自定义token
        let Data = this.imgCheckCode; //输入的图形验证码
        let registerPhone = this.registerPhone; //注册的手机号
        let url = "/account/GetSmsCode/" + registerPhone;
        this.$axios
          .post(url, {
            Key: Key,
            Data: Data
          })
          .then(res => {
            console.log(res);
            if (res) {
              this.disabledBtn(); //按钮不可点击
            }
          });
      }
    },
    //检测注册
    checkUserRegister() {
      //验证手机号规则
      if (this.checkPhone(this.registerPhone) == false) {
        this.$Notification({
          title: "温馨提示",
          message: "请您填写正确的手机号!",
          type: "warning"
        });
        return false;
      }
      //再验证两次密码是否相同
      if (this.registerPassword != this.confirmRegisterPassword) {
        this.$Notification({
          title: "温馨提示",
          message: "您两次输入的密码不一致,请您重新输入!",
          type: "warning"
        });
        return false;
      }
      if (
        this.registerPhone == "" ||
        this.registerPassword == "" ||
        this.confirmRegisterPassword == "" ||
        this.imgCheckCode == ""
      ) {
        this.$Notification({
          title: "温馨提示",
          message: "您的信息没有填写完整,请您填写完整!",
          type: "warning"
        });
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
  },
  mounted() {
    this.getImgCode();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
