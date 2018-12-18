<template>
  <div class="personal-cellphone">
    <div class="htlist_ulC">
      <h3 class="create_title">修改手机号码</h3>
      <form action method="post">
        <dl class="htlist_dla">
          <dd>
            <span class="htlist_dld">
              <em>*</em>
              <label>手机号码：</label>
            </span>
            <input
              class="htlist_dlb"
              name="mobile"
              type="tel"
              placeholder="请输入新手机号码"
              v-model="userNewPhone"
            >
          </dd>
          <dd>
            <span class="htlist_dld">
              <em>*</em>
              <label>图片验证码：</label>
            </span>
            <input
              class="htlist_dlc"
              name="mobile"
              type="text"
              placeholder="请输入验证码"
              v-model="imgCheckCode"
            >
            <img :src="checkCodeUrl" alt srcset @click="changeImgCheck">
          </dd>
          <dd>
            <span class="htlist_dld">
              <em>*</em>
              <label>短信验证码：</label>
            </span>
            <input
              class="htlist_dlc"
              name="mobile"
              type="text"
              placeholder="请输入验证码"
              v-model="cellphoneCheckCode"
            >
            <!-- <button class="htlist_dld disabled" type="button" @click="getPhoneCode" >获取验证码</button> -->
            <input
              class="htlist_dld"
              type="button"
              @click="getPhoneCode"
              v-model="cellphoneBtnVal"
              :disabled="isDisabled"
              :class="{disabled:isDisabled == true}"
            >
          </dd>
          <dd>
            <button class="htlist_dle" type="button" @click="confirmChangeNumber">确定</button>
          </dd>
        </dl>
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      isDisabled: false, //获取手机验证码是否是disabled
      cellphoneBtnVal: "获取验证码",
      userCellphoneNumber: "", //mpounted后获取的用户原有的手机
      cellphoneCheckCode: "", //手机验证码
      userNewPhone: "", //用户新手机号码
      checkCodeUrl: "", //图形验证码链接
      imgCheckCode: "", //图像验证码内容
      createdToken: "" //自动生成的token
    };
  },
  methods: {
    //确认修改手机号
    confirmChangeNumber: function() {
      if (this.checkPersonalCellphone() == true) {
        var Token = this.getCookie("token");
        var Phone = this.userNewPhone;
        var Code = this.cellphoneCheckCode;
        var Data = this.imgCheckCode;
        var Key = this.createdToken;
        this.$axios
          .post("/account/ChangePhone", {
            Token: Token,
            Phone: Phone,
            Code: Code,
            Data: Data,
            Key: Key
          })
          .then(res => {
            if (res) {
              this.$MessageBox.alert(
                "修改手机成功,请您重新登录",
                "修改手机号",
                {
                  confirmButtonText: "确定",
                  type: "success",
                  callback: action => {
                    this.globalLoginOut(); //清除cookie
                    this.$store.dispatch("loginAction", false);
                    this.$store.dispatch("showAction", true);
                  }
                }
              );
            }
          });
      }
    },
    checkPersonalCellphone: function() {
      if (this.userNewPhone == "") {
        this.$Notification({
          title: "警告",
          message: "手机号必填,请您重新输入!",
          type: "warning"
        });
        return false;
      }
      if (this.checkPhone(this.userNewPhone) == false) {
        this.$Notification({
          title: "警告",
          message: "请您填写正确的手机号!",
          type: "warning"
        });
        return false;
      }
      if (this.imgCheckCode == "") {
        this.$Notification({
          title: "警告",
          message: "请您先填写图形验证码!",
          type: "warning"
        });
        return false;
      } else {
        return true;
      }
    },
    //获取手机验证码
    getPhoneCode() {
      if (this.checkPersonalCellphone() == true) {
        this.isDisabled = true;
        var interval;
        var _this = this;
        var num = 60;
        interval = setInterval(function() {
          _this.cellphoneBtnVal = num + "s";
          num--;
          if (num == -1) {
            clearInterval(interval);
            _this.isDisabled = false;
            _this.cellphoneBtnVal = "获取验证码";
          }
        }, 1000);
        var Key = this.createdToken;
        var Data = this.imgCheckCode;
        var url =
          "http://dou.fudayiliao.com/account/GetSmsCode/" + this.userNewPhone;
        this.$axios
          .post(
            url,
            {
              Key: Key,
              Data: Data
            }
          )
          .then((res) =>{
            //console.log(res);
          });
      }
    },
    //点击验证码换图
    changeImgCheck: function() {
      this.getCheckCode();
    },
    //获取图形验证码
    getCheckCode: function() {
      var phone = this.userNewPhone;
      //getImgCheckCode()在全局main.js里面
      this.createdToken = this.getImgCheckCode().createdToken;
      this.checkCodeUrl = this.getImgCheckCode().imgCheckCodeUrl.toString();
      //console.log(this.checkCodeUrl);
    }
  },
  mounted: function() {
    this.getCheckCode();
  }
};
</script>
<style lang="scss">
.personal-cellphone {
  padding: 50px;
}
dl.htlist_dla {
  width: 445px;
  margin: 84px auto auto auto;
}

dl.htlist_dla em {
  color: #eb5169;
  margin-right: 5px;
}

/* dl.htlist_dla dd:first-child label { letter-spacing: 4px; } */

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

.personal-cellphone dl.htlist_dla input.htlist_dlc {
  width: 160px;
}

dl.htlist_dla dd:first-child {
  margin-top: 0px;
}

/* dl.htlist_dla dd:last-child { margin-top: 44px; } */

dl.htlist_dla dd {
  margin-top: 28px;
}

dl.htlist_dla dd span.htlist_dld {
  width: 126px;
  display: inline-block;
  font-size: 16px;
  text-align: right;
}

dl.htlist_dla dd img {
  vertical-align: top;
  margin-left: 7px;
  cursor: pointer;
  width: 124px;
  height: 38px;
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
