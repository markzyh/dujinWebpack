<template>
  <div class="company-auth">
    <h3 class="create_title">资质提交</h3>
    <div class="zzSub">
      <form action ref="auth_form">
        <div class="zzSub_box">
          <div class="compony_auth_label">
            <b>*</b>抖音号：
          </div>
          <input type="text" class="zzSub_input" v-model="douyinName" placeholder="请输入要投放的抖音号">
        </div>
        <div class="zzSub_box">
          <div class="compony_auth_label">
            <b>*</b> 企业名称：
          </div>
          <input type="text" placeholder="请输入企业名称" v-model="companyName" class="zzSub_input">
        </div>
        <div class="zzSub_box">
          <div class="compony_auth_label">
            <b>*</b> 营业执照注册号：
          </div>
          <input type="text" placeholder="请输入18位统一社会信用代码" v-model="companyId" class="zzSub_input">
        </div>
      </form>
      <div class="zzSub_box">
        <div class="dis-inline compony_auth_group">
          <div class="compony_auth_label">
            <b>*</b> 企业营业执照
            <!-- <div class="create_order_tips"><img src="../../assets/create_order_tips.png"
                                        alt="" class="order_tips_icon">
                                    <div class="order_tips_description"><img src="../../assets/order_tips_description_tri.jpg"
                                            alt="" class="order_tips_description_tri"><b>企业营业执照</b>只支持中国大陆工商局或市场监督管理局登记的企业，请上传最新的营业执照，正面照，资质无残缺信息。</div>
            </div>-->
            ：
          </div>
        </div>
        <div class="sc_k">
          <form ref="auth_form">
            <label for="auth_upload_license" v-if="companyIdUrl == false">上传营业执照</label>
            <input
              type="file"
              v-if="companyIdUrl == false"
              id="auth_upload_license"
              ref="auth_upload_license"
              name="path"
              @change="uploadCardFace($event,'auth_upload_license','companyIdUrl')"
            >
            <img :src="companyIdUrl" alt v-if="companyIdUrl != false">
          </form>
        </div>
      </div>
      <div class="zzSub_box">
        <div class="dis-inline compony_auth_group">
          <div class="compony_auth_label">
            <b>*</b> 行业许可证
            <!-- <div class="create_order_tips"><img src="../../assets/create_order_tips.png"
                                        alt="" class="order_tips_icon">
                                    <div class="order_tips_description"><img src="../../assets/order_tips_description_tri.jpg"
                                            alt="" class="order_tips_description_tri"><b>企业营业执照</b>只支持中国大陆工商局或市场监督管理局登记的企业，请上传最新的营业执照，正面照，资质无残缺信息。</div>
            </div>-->
            ：
          </div>
        </div>
        <div class="sc_k">
          <form ref="auth_form">
            <label for="auth_upload_permit" v-if="permitUrl == false">上传行业许可证</label>
            <input
              type="file"
              v-if="permitUrl == false"
              id="auth_upload_permit"
              ref="auth_upload_permit"
              name="path"
              @change="uploadCardFace($event,'auth_upload_permit','permitUrl')"
            >
            <img :src="permitUrl" alt v-if="permitUrl != false">
          </form>
        </div>
      </div>

      <div class="zzSub_box">
        <div class="compony_auth_label">
          <b>*</b>认证公函
          <div class="create_order_tips">
            <img src="../../assets/create_order_tips.png" alt class="order_tips_icon">
            <div class="order_tips_description">
              <img
                src="../../assets/order_tips_description_tri.jpg"
                alt
                class="order_tips_description_tri"
              >
              <b>认证公函</b>下载填写
              <a href="/auth.docx">《企业认证申请公函》</a>，填写完成后加盖红色公章，上传清晰的公函扫描件。
            </div>
          </div>：
        </div>
        <div class="sc_k">
          <form ref="auth_form">
            <label for="auth_upload_letter" v-if="authUrl == false">上传认证公函</label>
            <input
              type="file"
              v-if="authUrl == false"
              id="auth_upload_letter"
              ref="auth_upload_letter"
              name="path"
              @change="uploadCardFace($event,'auth_upload_letter','authUrl')"
            >
            <img :src="authUrl" alt v-if="authUrl != false">
          </form>
        </div>
      </div>
      <form ref="auth_form">
        <div class="zzSub_box">
          <div class="compony_auth_label">
            <b>*</b> 运营人姓名
            <div class="create_order_tips">
              <img src="../../assets/create_order_tips.png" alt class="order_tips_icon">
              <div class="order_tips_description">
                <img
                  src="../../assets/order_tips_description_tri.jpg"
                  alt
                  class="order_tips_description_tri"
                >
                <b>运营人姓名</b>请填写与《企业认证申请公函》上的运营者一致，在认证审核过程中，将与该运营者联系核实。
              </div>
            </div>：
          </div>
          <input type="text" placeholder="请输入运营人姓名" v-model="operateName">
        </div>
        <div class="zzSub_box">
          <div class="compony_auth_label">
            <b>*</b> 运营人联系电话
            <div class="create_order_tips">
              <img src="../../assets/create_order_tips.png" alt class="order_tips_icon">
              <div class="order_tips_description">
                <img
                  src="../../assets/order_tips_description_tri.jpg"
                  alt
                  class="order_tips_description_tri"
                >
                <b>运营人联系电话</b>请填写运营者的手机号，在认证审核过程中，将与该运营者联系核实。
              </div>
            </div>：
          </div>
          <input type="text" placeholder="请输入运营人联系电话" v-model="operatePhone">
        </div>
        <div class="zzSub_box">
          <div class="compony_auth_label">
            <b>*</b>图形验证码：
          </div>
          <input type="text" class="dxyz_input" placeholder="请输入验证码" v-model="imgCheckCode">
          <img :src="imgCheckCodeUrl" alt class="imgCode" @click="getImgCode">
          <!-- <input type="button" class="dxyz_btn phone_code_btn" v-model="watchPhoneCodeBtn" @click="getPhoneCode" :class="{disabled:!isLetPhoneCode}" :disabled="!isLetPhoneCode"> -->
        </div>
        <div class="zzSub_box">
          <div class="compony_auth_label">
            <b>*</b>短信验证码：
          </div>
          <input type="text" class="dxyz_input" placeholder="请输入验证码" v-model="phoneCheckCode">
          <input
            type="button"
            class="dxyz_btn phone_code_btn"
            v-model="watchPhoneCodeBtn"
            @click="getPhoneCode"
            :class="{disabled:!isLetPhoneCode}"
            :disabled="!isLetPhoneCode"
          >
        </div>
      </form>
      <div class="zzSub_box auth_agree">
        <div class="zzSub_box syxy">
          <span></span>
          <label for>
            <input type="checkbox" class="syxy_input">
            <em>同意</em>
            <a href="/service.html" target="_blank">《度进公司服务使用协议》</a>
          </label>
        </div>
      </div>
      <div class="zzSub_box auth_submit">
        <span></span>
        <div class="sub_tj">
          <!--  <input type="button" value="取消" class="cancel_btn"> -->
          <input type="button" value="提交" class="submit_btn" @click="confirmCompanyAuth">
        </div>
      </div>
    </div>
    <div class="dymain_cover" v-if="isConfirm">
      <div class="pay_success confirm_success" v-if="isConfirm" :class="{show:isConfirm}">
        <h3 style="margin-top: 80px;">
          <img src="../../assets/pay_success_03.jpg" alt>企业认证
        </h3>
        <!-- <h4><span>秒</span>后将跳转到订单中心</h4> -->
        <div class="pay_success_tips confirm_success_tips">
          <h5>温馨提示</h5>
          <p>1、您的认证资料已成功提交，不支持修改。</p>
          <p>
            2、请尽快联系您的客户经理，支付审核服务费
            <strong>600元</strong> ，进入审核流程，完成支付。
          </p>
          <p>3、如需修改认证资料，可通过电话或QQ方式联系您的客户经理。</p>
          <p>
            4、如有疑问，请直接拨打
            <strong>400-040-2120</strong>。
          </p>
        </div>
        <div class="confirm_success_btn" @click="closeConfirm">确定</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      douyinName: "", //投放的抖音名称
      companyName: "", //公司名称
      companyId: "", //公司营业注册号
      companyIdUrl: false, //营业执照图片链接
      permitUrl: false, //行业许可证图片链接
      authUrl: false, //认证公函图片链接
      operateName: "", //运营人姓名
      operatePhone: "", //运营人电话
      imgCheckCode: "", //图形验证码
      imgCheckCodeUrl: "", //图形验证链接
      phoneCheckCode: "", //短信验证码
      createdToken: "", //自定义token
      phoneCodeBtn: "获取验证码",
      isLetPhoneCode: true, //是否允许获取验证
      isConfirm: false, //是否确认了
      isAgree: false, //是否同意协议
      userInfo: "" //用户信息
    };
  },
  methods: {
    closeConfirm: function() {
      this.isConfirm = false;
      window.location.reload();
    },
    //确认提交
    confirmCompanyAuth: function() {
      if (this.checkCompanyAuthPage() == true) {
        //this.isConfirm = true;
        var token = this.getCookie("token");
        var AuthType = "企业认证";
        var Name = this.douyinName; //抖音名
        var CorpName = this.companyName; //公司名
        var CorpId = this.companyId; //执照
        var CorpLicense = this.companyIdUrl; //执照图片
        var CorpPermit = this.permitUrl; //许可证图片
        var AuthPub = this.authUrl; //认证公函
        var CorpUser = this.operateName; //运营人姓名
        var CorpPhone = this.operatePhone; //运营人电话
        var Code = this.phoneCheckCode; //手机验证码
        var _this = this;
        this.$axios
          .post("/account/Update", {
            Token: token,
            CorpName: CorpName,
            Name: Name,
            CorpId: CorpId,
            CorpLicense: CorpLicense,
            CorpPermit: CorpPermit,
            AuthPub: AuthPub,
            CorpUser: CorpUser,
            CorpPhone: CorpPhone,
            Code: Code,
            AuthType: AuthType
          })
          .then(res => {
            this.isConfirm = true;
            return false;
          });
      }
    },
    //全局main.js
    getImgCode: function() {
      var obj = this.getImgCheckCode();
      this.createdToken = obj.createdToken;
      this.imgCheckCodeUrl = obj.imgCheckCodeUrl;
    },
    checkPhoneCode() {
      if (this.operatePhone == "") {
        this.$Notification({
          title: "温馨提示",
          message: "请您先输入电话号码!",
          type: "warning"
        });
        return false;
      }
      if (this.checkPhone(this.operatePhone) == false) {
        this.$Notification({
          title: "温馨提示",
          message: "请您输入正确的手机号!",
          type: "warning"
        });
        return false;
      }
      if (this.imgCheckCode == "") {
        this.$Notification({
          title: "温馨提示",
          message: "请您输入验证码!",
          type: "warning"
        });
        return false;
      } else {
        return true;
      }
    },
    //获取验证码
    getPhoneCode() {
      if (this.checkPhoneCode() == true) {
        var tInterval,
          num = 60;
        var _this = this;
        var Key = this.createdToken;
        var Data = this.imgCheckCode;
        var url = "/account/GetSmsCode/" + this.operatePhone;
        this.$axios
          .post(url, {
            Key: Key,
            Data: Data
          })
          .then(res => {
            if (res) {
              this.isLetPhoneCode = false;
              tInterval = setInterval(function() {
                _this.phoneCodeBtn = num + "s";
                console.log(_this.phoneCodeBtn);
                num--;
                if (num < 0) {
                  clearInterval(tInterval);
                  _this.phoneCodeBtn = "获取验证码";
                  _this.isLetPhoneCode = true;
                  return false;
                }
              }, 1000);
            }
          });
      }
    },
    //同意协议
    changeAgree: function() {
      this.isAgree = !this.isAgree;
    },
    choosedAuth: function(index) {
      this.choosedAuthIndex = index;
    },
    uploadCardFace: function(event, ref, attr) {
      //上传图片,封装到全局main.js中,返回的是一个promise对象
      let p = this.uploadImg(event, ref);
      if (p) {
        p.then(res => {
          this[attr] = res;
        });
      }
    },
    checkCompanyAuthPage: function() {
      var douyinName = this.douyinName; //抖音名
      var companyName = this.companyName; //公司名
      var companyId = this.companyId; //执照
      var companyIdUrl = this.companyIdUrl; //执照图片
      var permitUrl = this.permitUrl; //许可证图片
      var authUrl = this.authUrl; //认证公函
      var operateName = this.operateName; //运营人姓名
      var operatePhone = this.operatePhone; //运营人电话
      var phoneCheckCode = this.phoneCheckCode; //手机验证码
      if (douyinName == "" || companyName == "" || companyId == "") {
        this.$Notification({
          title: "温馨提示",
          message: "输入框均为必填选项,请您填写完整!",
          type: "warning"
        });
        return false;
      }
      if (!/^[a-zA-Z0-9_]{0,15}$/.test(douyinName)) {
        this.$Notification({
          title: "温馨提示",
          message: "抖音号最多16位,只允许字母、下划线、点和数字!",
          type: "warning"
        });
        return false;
      }
      if (
        !/(^(?:(?![IOZSV])[\dA-Z]){2}\d{6}(?:(?![IOZSV])[\dA-Z]){10}$)|(^\d{15}$)/.test(
          companyId
        )
      ) {
        this.$Notification({
          title: "温馨提示",
          message: "请您填写正确的营业执照注册号,注册号为15位或18位!",
          type: "warning"
        });
        return false;
      }
      if (companyIdUrl == false) {
        this.$Notification({
          title: "温馨提示",
          message: "营业执照还未上传!",
          type: "warning"
        });
        return false;
      }
      if (permitUrl == false) {
        this.$Notification({
          title: "温馨提示",
          message: "行业许可证还未上传!",
          type: "warning"
        });
        return false;
      }
      if (authUrl == false) {
        this.$Notification({
          title: "温馨提示",
          message: "认证公函还未上传!",
          type: "warning"
        });
        return false;
      }
      if (operateName == "" || operatePhone == "" || phoneCheckCode == "") {
        this.$Notification({
          title: "温馨提示",
          message: "输入框均为必填选项,请您填写完整!",
          type: "warning"
        });
        return false;
      }
      if (!/^[\u4E00-\u9FA5]{2,4}$/.test(operateName)) {
        this.$Notification({
          title: "温馨提示",
          message: "请您填写正确的姓名格式!",
          type: "warning"
        });
        return false;
      } else {
        return true;
      }
    },
    //提交企业认证
    submitAuth: function() {
      var token = this.getCookie("token");
      if (this.checkCompanyAuthPage() == true) {
        var AuthType = "企业认证"; //认证类型
        var douyinName = this.douyinName; //抖音名
        var companyName = this.companyName; //公司名
        var companyId = this.companyId; //执照
        var companyIdUrl = this.companyIdUrl; //执照图片
        var permitUrl = this.permitUrl; //许可证图片
        var authUrl = this.authUrl; //认证公函
        var operateName = this.operateName; //运营人姓名
        var operatePhone = this.operatePhone; //运营人电话
        var phoneCheckCode = this.phoneCheckCode; //手机验证码
        this.$axios
          .post("/account/Update", {
            Token: token,
            Name: douyinName,
            DouyinId: DouyinId,
            AuthType: AuthType,
            CorpId: CorpId,
            CorpName: CorpName,
            Face: Face,
            FaceBack: FaceBack,
            RealName: RealName
          })
          .then(res => {
            if (res) {
              this.$MessageBox.alert(
                "企业认证资料提交完成,请等待审核",
                "企业认证",
                {
                  confirmButtonText: "确定",
                  type: "success",
                  callback: action => {
                    this.$router.push({ path: "/" });
                  }
                }
              );
            }
          });
      }
    },
    /*     dyNameFocus: function() {
      if (this.douyinNameVal == this.getCookie("userName")) {
        this.douyinNameVal = "";
      }
    },
    dyNameBlur: function() {
      if (this.douyinNameVal == "") {
        this.douyinNameVal = this.getCookie("userName");
      }
    },
    dyIdFocus: function() {
      if (this.douyinNameVal == this.getCookie("douyinId")) {
        this.douyinNameVal = "";
      }
    },
    dyIdBlur: function() {
      if (this.douyinNameVal == "") {
        this.douyinNameVal = this.getCookie("douyinId");
      }
    }, */
    setUserInfo() {
      this.douyinName = this.userInfo.DouyinId;
      this.companyName = this.userInfo.CorpName;
      this.companyId = this.userInfo.CorpId;
      this.companyIdUrl = this.userInfo.CorpLicense;
      this.permitUrl = this.userInfo.CorpPermit;
    },
    getCompanyAuth() {
      let Token = this.getCookie("token");
      this.$axios
        .post("/account/GetUserInfo", {
          Token: Token
        })
        .then(res => {
          if (res) {
            if (res.data.Data.user.AuthType == "企业认证") {
              this.userInfo = res.data.Data.user;
              this.setUserInfo();
            }
          }
        });
    }
  },
  computed: {
    watchPhoneCodeBtn: function() {
      return this.phoneCodeBtn;
    }
  },
  mounted: function() {
    this.getImgCode();
    this.getCompanyAuth();
  }
};
</script>
<style lang="scss">
.company-auth {
  padding: 50px;
}
/* 企业认证页面 */
.zzSub {
  width: 550px;
  margin: auto auto 30px auto;
  padding-top: 11px;
}
.zzSub_box {
  display: flex;
  margin-top: 29px;
  font-size: 16px;
  color: #999999;
}
.compony_auth_label .create_order_tips {
  /* margin-right:35px; */
  margin: 0 0 0 8px;
}
.zzSub_box .compony_auth_label {
  width: 174px;
  text-align: right;
  line-height: 38px;
  font-size: 16px;
  margin-right: 35px;
  color: #666666;
  display: inline-block;
}
.zzSub_box .compony_auth_label b {
  color: #eb5169;
}
.zzSub_box .imgCode {
  margin-left: 8px;
  width: 124px;
  height: 28px;
}
.zzSub_box input[type="text"],
.zzSub_box input[type="number"],
.zzSub_box input[type="tel"] {
  width: 320px;
  height: 38px;
  border: 1px solid #bbbbbb;
  border-radius: 3px;
  padding-left: 14px;
  outline: none;
  font-size: 13px;
  box-sizing: border-box;
}
.zzSub_box ::-webkit-input-placeholder {
  color: #cccccc;
}
.zzSub_box :-moz-placeholder {
  color: #cccccc;
}
.zzSub_box ::-moz-placeholder {
  color: #cccccc;
}
.zzSub_box :-ms-input-placeholder {
  color: #cccccc;
}
.zzSub_box > span > i {
  background: url(../../assets/create_order_tips.png) no-repeat;
  display: inline-block;
  width: 19px;
  height: 19px;
  margin-bottom: -4px;
  margin-left: 5px;
}
.zzSub_box .sc_k {
  width: 320px;
  height: 127px;
  border: 1px solid #bbbbbb;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  form {
    width: 100%;
    height: 100%;
    overflow: hidden;
    align-items: center;
    justify-content: center;
    display: flex;
  }
  img {
    width: 90%;
    height: 90%;
    margin: 0 auto;
  }
}
.zzSub_box .sc_k input[type="file"] {
  display: none;
}
.zzSub_box .sc_k label {
  display: inline-block;
  width: 156px;
  height: 48px;
  line-height: 48px;
  background: #cccccc;
  border: none;
  font-size: 16px;
  color: #ffffff;
  border-radius: 3px;
  outline: none;
  text-align: center;
  cursor: pointer;
}
.zzSub_box input.dxyz_input {
  width: 188px;
}
.zzSub_box input.dxyz_btn {
  width: 122px;
  height: 40px;
  background: none;
  margin-left: 10px;
  color: #666666;
}
.zzSub_box input.phone_code_btn {
  cursor: pointer;
  color: #fff;
  border-radius: 4px;
  background: #19be6b;
  height: 36px;
  line-height: 36px;
}
.zzSub_box input.phone_code_btn.disabled {
  background: #ccc;
  cursor: not-allowed;
}
.zzSub_box input#fp_ra {
  width: 19px;
  height: 19px;
  border-radius: 50%;
  margin-right: 13px;
  margin-bottom: -3px;
}
#fp_ra2 {
  margin-left: 45px;
  width: 19px;
  height: 19px;
  border-radius: 50%;
  margin-right: 13px;
  margin-bottom: -3px;
}
/* input.radio_dx{background: url(../../assets/dxk.png)no-repeat;border:none;} */
.syxy {
  font-size: 13px;
}
.syxy em {
  color: #333333;
}
input.syxy_input {
  width: 19px;
  height: 19px;
  border-radius: 50%; /* border:1px solid #bbbbbb; */
  margin-bottom: -4px;
  margin-right: 13px;
  background: url(../../assets/radio_checked_bg.png) no-repeat;
  background-size: 19px 19px;
}
.sub_tj {
  margin-top: 20px;
}
.sub_tj > input {
  width: 124px;
  height: 38px;
  color: #ffffff;
  border-radius: 3px;
  font-size: 20px;
  line-height: 38px;
}
.sub_tj > input.cancel_btn {
  background: #cccccc;
}
.sub_tj > input.submit_btn {
  background: #eb5169;
  margin-left: 45px;
  cursor: pointer;
}
.zzSub_box .order_typename_group {
  width: 40%;
  margin-top: 0;
}
#auth_upload_license {
  display: none;
}
.auth_choose_invoice {
  padding-left: 178px;
}
.auth_choose_invoice .order_typename_group:last-child {
  width: 60%;
}
.auth_agree {
  justify-content: center;
  padding-left: 88px;
}
.auth_submit {
  justify-content: center;
}
.pay_success {
  width: 864px;
  height: 640px;
  background: #fff;
  position: fixed;
  z-index: 999;
  left: 50%;
  top: 50%;
  margin-left: -432px;
  margin-top: -320px;
  text-align: center;
  overflow: hidden;
  display: none;
}
.pay_success.show {
  display: block;
}
.pay_success h3 {
  margin-top: 140px;
  font-size: 34px;
  font-weight: normal;
}
.pay_success h3 img {
  margin: 0px 8px -6px 0;
}
.pay_success h4 {
  font-weight: normal;
  margin-top: 20px;
  font-size: 20px;
  color: #999;
}
.pay_success h4 span {
  color: #eb5169;
}
.pay_success .pay_success_tips {
  position: absolute;
  left: 156px;
  bottom: 90px;
  text-align: left;
  font-size: 16px;
}
.pay_success .pay_success_tips p {
  margin-top: 8px;
  color: #999;
}
.pay_success .pay_success_tips.confirm_success_tips {
  bottom: 200px;
}
.pay_success .pay_success_tips.confirm_success_tips p {
  margin-top: 30px;
}
.pay_success .pay_success_tips.confirm_success_tips p strong {
  color: #eb5169;
  font-weight: normal;
}
.dymain_cover {
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  z-index: 998;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  opacity: 1;
}
.confirm_success_btn {
  width: 180px;
  height: 52px;
  line-height: 52px;
  text-align: center;
  color: #fff;
  background: #eb5169;
  margin: 0 auto;
  bottom: 80px;
  position: absolute;
  left: 50%;
  margin-left: -90px;
  border-radius: 4px;
  font-size: 20px;
  cursor: pointer;
}
</style>


