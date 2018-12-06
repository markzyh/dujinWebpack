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
        axios
          .post(
            "http://dou.fudayiliao.com//account/ChangePhone",
            {
              Token: Token,
              Phone: Phone,
              Code: Code,
              Data: Data,
              Key: Key
            },
            {
              headers: {
                "content-type": "application/x-www-form-urlencoded"
              }
            }
          )
          .then((res) =>{
            console.log(res)
            debugger
            if (res.data.Code == 12) {
              alert("您修改的手机号与原手机号一致,请您输入新的手机号");
              return false;
            }
            if(res.data.Code == 1){
              alert('验证码错误')
              return false
            }
            if (res.data.Code == 11) {
              alert("登录状态已过期,请重新登录");
              this.globalLoginOut();
              window.location.reload()
            }
            //console.log(res);
            alert('修改成功,请您重新登录')
            debugger    
            this.globalLoginOut();
            window.location.reload()
            this.$store.dispatch("loginAction", false);
            this.$store.dispatch("showLoginFormAction", true);
          });
      }
    },
    checkPersonalCellphone: function() {
      if (this.userNewPhone == "") {
        alert("手机号必填,请您重新输入");
        return false;
      }
      if (this.imgCheckCode == "") {
        alert("请您先填写图形验证码");
        return false;
      }
      if (this.checkPhone(this.userNewPhone) == false) {
        alert("请您填写正确的手机号");
        return false;
      } else {
        return true;
      }
    },
    checkPhone: function(phone) {
      //var phone = document.getElementById('userphone').value;
      if (
        !/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/.test(
          phone
        )
      ) {
        //alert("手机号码有误，请重填");
        //$("#slider2").slider("restore"); //初始化
        return false;
      } else {
        //getCheckNumberDisable()
        return true;
      }
    },
    //获取手机验证码
    getPhoneCode: function() {
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
            //alert('999')
          }
        }, 1000);
        var Key = this.createdToken;
        var Data = this.imgCheckCode;
        console.log(Key);
        console.log(Data);
        console.log(this.userNewPhone);
        var url =
          "http://dou.fudayiliao.com/account/GetSmsCode/" + this.userNewPhone;
        axios
          .post(
            url,
            {
              Key: Key,
              Data: Data
            },
            {
              headers: {
                "content-type": "application/x-www-form-urlencoded"
              }
            }
          )
          .then(function(res) {
            console.log(res);
          });
      }
    },
    //点击验证码换图
    changeImgCheck: function() {
      this.getCheckCode();
    },
    //获取图形验证码
    getCheckCode: function() {
      //var token = getUsermessage().token
      var phone = this.userNewPhone;
      this.createdToken = this.createToken();
      console.log(this.createdToken);
      var checkCode =
        "http://dou.fudayiliao.com/account/getcode/" + this.createdToken;
      this.checkCodeUrl = checkCode.toString();
      console.log(this.checkCodeUrl);
    },
    //自定义token
    createToken: function() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(
        c
      ) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    }
  },
  mounted: function() {
    //this.userCellphoneNumber = localStorage.cellphoneNumber
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
  width: 124px;height: 38px;
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
