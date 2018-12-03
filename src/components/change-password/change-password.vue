<template>
  <div class="change-password">
    <div class="htlist_ulC">
      <h3 class="create_title">修改密码</h3>
      <form action method="post">
        <dl class="htlist_dla">
          <dd>
            <span class="htlist_dld">
              <em>*</em>
              <label>原密码：</label>
            </span>
            <input
              class="htlist_dlb"
              name="text"
              type="text"
              placeholder="请输入原密码"
              v-model="oldPassword"
            >
          </dd>
          <dd>
            <span class="htlist_dld">
              <em>*</em>
              <label>新密码：</label>
            </span>
            <input
              class="htlist_dlb"
              name="password"
              type="password"
              placeholder="请输入新密码"
              v-model="userNewPassword"
            >
            <img :src="checkCode" alt srcset>
          </dd>
          <dd>
            <span class="htlist_dld">
              <em>*</em>
              <label>确认密码：</label>
            </span>
            <input
              class="htlist_dlb"
              name="password"
              type="password"
              placeholder="请确认新密码"
              v-model="confirmNewPassword"
            >
            <!--<button class="htlist_dld" type="buttom">获取验证码</button>-->
          </dd>
          <dd>
            <button class="htlist_dle" type="button" @click="confirmSubmitNewPassword">确定</button>
          </dd>
        </dl>
      </form>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      props:['testparam'],
      userCellphoneNumber: "",
      checkCode: "", //图形验证码
      oldPassword: "",
      userNewPassword: "",
      confirmNewPassword: ""
    };
  },
  methods: {
    //提交
    confirmSubmitNewPassword: function() {
      var oldPassword = this.oldPassword;
      var userNewPassword = this.userNewPassword;
      var confirmNewPassword = this.confirmNewPassword;
      var Token = this.getCookie('token')
      console.log(Token);
      if(oldPassword == '' || userNewPassword == ''){
          alert('密码不能为空!')
          return false
      }
      if (oldPassword == userNewPassword) {
        alert("新密码与旧密码一致,请您输入新的密码");
        return false;
      }
      if (userNewPassword != confirmNewPassword) {
        alert("两次输入密码不一致,请您重新输入");
        return false;
      } else {
        axios
          .post(
            "http://dou.fudayiliao.com/account/Update",
            {
              Token: Token,
              Password: oldPassword,
              NewPassword: userNewPassword
            },
            {
              headers: {
                "content-type": "application/x-www-form-urlencoded"
              }
            }
          )
          .then((res) =>{
            console.log(res);
            if (res.data.Code == 14) {
              alert("您的原密码输入有误,请您重新输入");
              return false
            }
            if(res.data.Code == 11){
              alert('登录状态失效,请您重新登录')
              return false
            }
            alert('修改密码成功,请您重新登录')
            this.globalLoginOut();//清除cookie
            this.$store.dispatch('loginAction',false)
            this.$store.dispatch('showLoginFormAction',true)
            console.log(this.$store.getters.getshowLoginForm)
          });
      }
    },
    inputFocus: function() {
      if (this.douyinNameVal == "请输入您要投放的抖音昵称") {
        this.douyinNameVal = "";
      }
      if (this.douyinNumberVal == "请输入您要投放的抖音号") {
        this.douyinNumberVal = "";
      }
    },
    inputBlur: function() {
      if (this.douyinNameVal == "") {
        this.douyinNameVal = "请输入您要投放的抖音昵称";
      }
      if (this.douyinNumberVal == "") {
        this.douyinNumberVal = "请输入您要投放的抖音号";
      }
    }
  },
  mounted(){
    console.log(this.testparam)
  }
};
</script>
<style lang="scss">
.change-password{padding: 50px;}
dl.htlist_dla {
  width: 445px;
  margin: 84px auto auto auto;
}

dl.htlist_dla em {
  color: #eb5169;
  margin-right: 5px;
}

dl.htlist_dla dd:first-child label {
  letter-spacing: 4px;
}

dl.htlist_dla input {
  border: 1px solid #bbbbbb;
  border-radius: 4px;
  line-height: 38px;
  padding-left: 15px;
  color: #999;
  font-size: 18px;
}

dl.htlist_dla input.htlist_dlb {
  width: 295px;
}
dl.htlist_dla input.htlist_dlb.disabled {
  cursor: not-allowed;
}

dl.htlist_dla input.htlist_dlc {
  width: 166px;
}

dl.htlist_dla dd:first-child {
  margin-top: 0px;
}

dl.htlist_dla dd:last-child {
  margin-top: 44px;
}

dl.htlist_dla dd {
  margin-top: 28px;
}

dl.htlist_dla dd span.htlist_dld {
  width: 126px;
  display: inline-block;
  font-size: 16px;
}

dl.htlist_dla dd img {
  vertical-align: top;
  margin-left: 7px;
  cursor: pointer;
}

dl.htlist_dla dd input[type="button"] {
  cursor: pointer;
  float: right;
  color: #fff;
  font-size: 13px;
  border: 1px solid #bbbbbb;
  width: 123px;
  text-align: center;
  background: transparent;
  height: 38px;
  line-height: 38px;
  border-radius: 4px;
  background: #19be6b;
  padding-left: 0;
}
dl.htlist_dla dd input[type="button"].disabled {
  background: #ebebeb;
  color: #fff;
  cursor: not-allowed;
}

dl.htlist_dla dd button.htlist_dle {
  cursor: pointer;
  margin-left: 127px;
  border: none;
  width: 124px;
  height: 40px;
  line-height: 40px;
  background: #eb5169;
  color: #fff;
  font-size: 20px;
  text-align: center;
  display: inline-block;
  border-radius: 5px;
}
</style>
