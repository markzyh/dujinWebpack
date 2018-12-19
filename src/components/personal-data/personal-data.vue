<template>
  <div class="personal-data" >
    <div class="htlist_ulC">
      <h3 class="create_title">编辑资料</h3>
      <dl class="htlist_dla">
        <dd>
          <span class="htlist_dld">
            <em>*</em>
            <label>抖音昵称：</label>
          </span>
          <input
            class="htlist_dlb"
            name="mobile"
            type="text"
            v-model="douyinNameVal"
            placeholder="请输入您要投放的抖音昵称"
          >
        </dd>
        <dd>
          <span class="htlist_dld">
            <em>*</em>
            <label>抖音号：</label>
          </span>
          <input
            class="htlist_dlb"
            name="mobile"
            type="text"
            v-model="douyinNumberVal"
            placeholder="请输入您要投放的抖音号"
          >
        </dd>
        <dd>
          <span class="htlist_dld">
            <em>*</em>
            <label>手机号：</label>
          </span>
          <input
            class="disabled"
            name="mobile"
            type="tel"
            v-model="userCellphoneNumber"
            readonly
            disabled
          >
          <!--  <button class="htlist_dld" type="buttom">获取验证码</button> -->
        </dd>
        <!-- <dd><button class="htlist_dle" type="button" @click="submitUserMessage">确定</button> </dd> -->
      </dl>
    </div>
    <div class="personal_center_rz">
      <label for="order_typename">资料认证
        <div class="create_order_tips">
          <img src="../../assets/create_order_tips.png" alt class="order_tips_icon">
          <div class="order_tips_description">
            <img
              src="../../assets/order_tips_description_tri.jpg"
              alt
              class="order_tips_description_tri"
            >
            <b>资料认证</b>个人
            身份证、企业营业执照和行业许可证只作为网站核实个人及公司真实性的材料，不在网站页面显示。
          </div>
        </div>
      </label>
      <div class="is-auth" v-if="choosedAuthIndex === 3">
        您已经提交过"{{isAuthType}}"
        <span @click="changeAuth">修改或重新认证</span><!-- <span @click="cancelAuth" v-if="choosedAuthIndex === 3">取消重新认证</span> -->
      </div>
      <div class="choose_authentication" v-if="choosedAuthIndex != 3">
        <div class="order_typename_group" v-for="(item,index) in authenticationLists" :key="index">
          <input
            type="radio"
            name="choose_authentication"
            :class="{radio_checked:choosedAuthIndex === index}"
            :value="item.name"
            @click="choosedAuth(index)"
          >
          <span>{{item}}</span>
        </div>
        <transition name="show1">
          <!-- 个人认证部分 -->
          <div class="personal_auth" v-if="choosedAuthIndex === 0">
            <p class="personal_auth_name">
              <span>
                <em>*</em>真实姓名
              </span>
              <input type="text" v-model="userRealName" placeholder="请输入您的真实姓名">
            </p>
            <div class="personal_auth_idcard">
              <span>
                <em>*</em>上传二代身份证：
              </span>
              <div class="dis-inline over-hidden">
                <div class="dis-inline auth_idcard">
                   <form id="auth_idcard_face">
                    <label for="upload_idcard_face" v-if="idcardFaceURL == false">上传人像面</label>
                    <input
                      type="file"
                      v-if="idcardFaceURL == false"
                      ref="upload_idcard_face"
                      id="upload_idcard_face"
                      name="path"
                      @change="uploadCardFace($event,'upload_idcard_face','idcardFaceURL')"
                    >
                    <span
                      v-if="idcardFaceURL != false"
                      class="cancle_upload"
                      @click="cancelUpload('idcardFaceURL')"
                    ></span>
                    <img :src="idcardFaceURL" alt v-if="idcardFaceURL != false">
                  </form>
                </div>
              </div>
              <div class="dis-inline over-hidden" style="margin-left: 30px;">
                <div class="dis-inline auth_idcard">
                  <form id="auth_idcard_back">
                    <label for="upload_idcard_back" v-if="idcardBackURL == false">上传国徽面</label>
                    <input
                      type="file"
                      v-if="idcardBackURL == false"
                      ref="upload_idcard_back"
                      name="path"
                      id="upload_idcard_back"
                      @change="uploadCardFace($event,'upload_idcard_back','idcardBackURL')"
                    >
                    <span
                      v-if="idcardBackURL != false"
                      class="cancle_upload"
                      @click="cancelUpload('idcardBackURL')"
                    ></span>
                    <img :src="idcardBackURL" alt v-if="idcardBackURL != false">
                  </form>
                </div>
              </div>
            </div>
            <p
              class="personal_auth_tips"
              v-if="choosedAuthIndex === 0"
            >请上传四角完整，亮度均匀，照片清晰的二代身份证，图片格式需为JPG,JPEG或者PNG格式，大小不能超过500k。</p>
          </div>
        </transition>
        <transition name="show1">
          <!-- 企业认证部分 -->
          <div class="personal_auth personal_compantlicense" v-if="choosedAuthIndex === 1">
            <p class="personal_auth_name">
              <span>
                <em>*</em>企业名称：
              </span>
              <input type="text" v-model="companyName" placeholder="请输入您的企业名称">
            </p>
            <p class="personal_auth_name personal_auth_license">
              <span>
                <em>*</em>营业执照注册号 ：
              </span>
              <input type="text" v-model="companyNumber" placeholder="请输入18位或者15位统一社会信用代码">
            </p>
            <div class="personal_auth_idcard dis-inline personal_auth_comlience">
              <span>
                <em>*</em>企业营业执照：
              </span>
              <div class="dis-inline over-hidden">
                <div class="dis-inline auth_idcard">
                  <form id="auth_idcard_face">
                    <label for="compamy_idcard" v-if="companyIdUrl == false">上传营业执照</label>
                    <input
                      type="file"
                      v-if="companyIdUrl == false"
                      id="compamy_idcard"
                      ref="compamy_idcard"
                      name="path"
                      @change="uploadCardFace($event,'compamy_idcard','companyIdUrl')"
                    >
                    <span
                      v-if="companyIdUrl != false"
                      class="cancle_upload"
                      @click="cancelUpload('companyIdUrl')"
                    ></span>
                    <img :src="companyIdUrl" alt v-if="companyIdUrl != false">
                  </form>
                </div>
                <p>请上传最新的营业执照彩色扫描件，各字段及印章完整清晰，资质无残缺信息，图片格式需为JPG,JPEG或者PNG格式，大小不能超过500k。</p>
              </div>
            </div>
            <div class="personal_auth_idcard dis-inline personal_auth_comlience">
              <span>
                <em>*</em>行业许可证：
              </span>
              <div class="dis-inline over-hidden">
                <div class="dis-inline auth_idcard">
                  <form id="auth_idcard_face">
                    <label for="industryCard" v-if="industryCardURL == false">上传行业许可证</label>
                    <input
                      type="file"
                      v-if="industryCardURL == false"
                      id="industryCard"
                      ref="industryCard"
                      name="path"
                      @change="uploadCardFace($event,'industryCard','industryCardURL')"
                    >
                    <span
                      v-if="industryCardURL != false"
                      class="cancle_upload"
                      @click="cancelUpload('industryCardURL')"
                    ></span>
                    <img :src="industryCardURL" alt v-if="industryCardURL != false">
                  </form>
                </div>
                <p>请上传最新的行业许可证彩色扫描件，各字段及印章完整清晰，资质无残缺信息，图片格式需为JPG,JPEG或者PNG格式大小不能超过500k。</p>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <div class="personal_agree">
        <p class>
          <input
            type="radio"
            name="choose_authentication"
            :class="{radio_checked:isAgree == true}"
            value
            @click="changeAgree"
          >同意
          <a href="/service.html" target="_blank">《上海度进信息科技有限公司服务使用协议》</a>
        </p>
        <input
          type="button"
          class="confirm_personal_data"
          :disabled="isAgree != true"
          :class="{disabled:isAgree != true}"
          value="确定"
          @click="submitUserMessage"
        >
      </div>
    </div>
  </div>
</template>
<script>
import upload from "@/base/upload";

export default {
  components:{
    upload
  },
  data() {
    return {
      //loading:true,
      isAuthType: "",
      isAuth: false, //用户是否是认证用户
      isAgree: false, //是否同意协议
      douyinNameVal: "",
      douyinNumberVal: "",
      userCellphoneNumber: "", //用户手机号
      choosedAuthIndex: 0, //已经选择的认证方式的索引值
      companyName: "", //企业名称
      companyNumber: "", //营业执照注册号
      file: "",
      src: "",
      idcardFaceURL: false, //身份证正面图片链接
      idcardBackURL: false, //身份证国徽面图片链接
      companyIdUrl: false, //企业营业执照图片链接
      industryCardURL: false, //行业许可证照片链接
      userRealName: "", //用户真实姓名
      authenticationLists: [
        //认证方式列表
        "个人认证",
        "企业认证"
      ]
    };
  },
  methods: {
    hoverCancel(){
      alert(0)
    },
    //修改认证
    changeAuth() {
      this.$MessageBox.confirm('您已经提交过资料认证,确定修改认证或重新认证吗？', '修改认证', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        })
          .then(() => {
            this.choosedAuthIndex = 0;
            this.isAuthType = "";
          })
          .catch(action => {
            
          });
    },
    //同意协议
    changeAgree() {
      this.isAgree = !this.isAgree;
    },
    choosedAuth(index) {
      this.choosedAuthIndex = index;
    },
    //取消上传图片
    cancelUpload(attr) {
      this.$MessageBox
        .confirm("您确定要移除已上传的文件吗？","移除文件",{
            distinguishCancelAndClose: true,
            confirmButtonText: "确定",
            cancelButtonText: "取消"
          }).then(() => {
          this[attr] = false;
        }).catch(action => {
      });
    },
    uploadCardFace(event, ref, attr) {
      //上传图片,封装到全局main.js中,返回的是一个promise对象
      let p = this.uploadImg(event, ref);
      if (p) {
        p.then(res => {
          this[attr] = res;
        });
      }
    },
    checkPersonalAuth: function() {
      var realName = this.userRealName;
      var isUploadFace = this.idcardFaceURL; //不为false
      var idUploadBack = this.idcardBackURL;
      if (realName == "") {
        this.$Notification({
          title: "温馨提示",
          message: "真实姓名为必填选项!",
          type: "warning"
        });
        return false;
      }
      if (!/^[\u4E00-\u9FA5]{2,4}$/.test(realName)) {
        this.$Notification({
          title: "温馨提示",
          message: "请您填写正确的姓名!",
          type: "warning"
        });
        return false;
      }
      if (isUploadFace == false) {
        this.$Notification({
          title: "温馨提示",
          message: "个人身份证正面还未上传哦!",
          type: "warning"
        });
        return false;
      }
      if (idUploadBack == false) {
        this.$Notification({
          title: "温馨提示",
          message: "个人身份证国徽面还未上传哦!",
          type: "warning"
        });
        return false;
      } else {
        return true;
      }
    },
    checkCompanyAuth: function() {
      var companyName = this.companyName;
      var companyNumber = this.companyNumber;
      var isUploadCompany = this.companyIdUrl;
      var isUploadIndustry = this.industryCardURL;
      if (companyName == "" || companyNumber == "") {
        this.$Notification({
          title: "温馨提示",
          message: "企业名称和营业执照注册号为必填选项!",
          type: "warning"
        });
        return false;
      }
      /* if(!/^[\u4E00-\u9FA5]{2,20}$/.test(companyName)){
        alert('请您填写正确的公司名称')
        return false
      }  */
      if (
        !/(^(?:(?![IOZSV])[\dA-Z]){2}\d{6}(?:(?![IOZSV])[\dA-Z]){10}$)|(^\d{15}$)/.test(
          companyNumber
        )
      ) {
        this.$Notification({
          title: "温馨提示",
          message: "请您填写正确的营业执照注册号,注册号为15位或18位!",
          type: "warning"
        });
        return false;
      }
      if (isUploadCompany == false) {
        this.$Notification({
          title: "温馨提示",
          message: "营业执照还未上传!",
          type: "warning"
        });
        return false;
      }
      if (isUploadIndustry == false) {
        this.$Notification({
          title: "温馨提示",
          message: "行业许可证还未上传!",
          type: "warning"
        });
        return false;
      } else {
        return true;
      }
    },
    //提交信息
    submitUserMessage: function() {
      var token = this.getCookie("token");
      var _this = this;
      var RealName = this.userRealName;
      var Name = this.douyinNameVal; //用户昵称
      var DouyinId = this.douyinNumberVal; //抖音id
      var AuthType = this.authenticationLists[this.choosedAuthIndex]; //认证类型
      var CorpId = this.companyNumber; //公司id
      var CorpName = this.companyName; //公司名称
      var Face, FaceBack, CorpLicense, CorpPermit; //身份或者营业执照,行业许可证

      if (!Name || !DouyinId) {
        this.$Notification({
          title: "温馨提示",
          message: "请填写您的抖音昵称和抖音号!",
          type: "warning"
        });
        return false;
      }
      if (!/^[a-zA-Z0-9_]{0,15}$/.test(DouyinId)) {
        this.$Notification({
          title: "温馨提示",
          message: "抖音号最多16位,只允许字母、下划线、点和数字!",
          type: "warning"
        });
        return false;
      }
      if (this.choosedAuthIndex == 0) {
        //个人认证的时候
        if (this.checkPersonalAuth() == false) {
          return false;
        }
        Face = this.idcardFaceURL; //身份证
        FaceBack = this.idcardBackURL; //背面
      }
      if (this.choosedAuthIndex == 1) {
        //企业认证的时
        if (this.checkCompanyAuth() == false) {
          return false;
        }
        CorpLicense = this.companyIdUrl; //营业执照
        CorpPermit = this.industryCardURL; //行业许可证
      }
      //alert('成功')
      this.$axios
        .post("/account/Update", {
          Token: token,
          Name: Name,
          DouyinId: DouyinId,
          AuthType: AuthType,
          CorpId: CorpId,
          CorpName: CorpName,
          Face: Face,
          FaceBack: FaceBack,
          CorpLicense: CorpLicense,
          CorpPermit: CorpPermit,
          RealName: RealName
        })
        .then(res => {
          if (res) {
            let userName = res.data.Data.Name;
            let userPhone = res.data.Data.Phone;
            let douyinId = res.data.Data.DouyinId;
            this.setCookie("userName", userName, 1);
            this.setCookie("userPhone", userPhone, 1);
            //this.setCookie("token", token, 1);
            this.setCookie("douyinId", douyinId, 1);
            this.$MessageBox.alert(
              "资料提交完成,后台人工审核中,审核通过后会有对应的客户经理联系您,请您耐心等待",
              "资料认证",
              {
                confirmButtonText: "确定",
                type: "success",
                callback: action => {
                  window.location.href = "/dist/#/create-order";
                }
              }
            );
          }
        });
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
    getUserInfo(params, value) {
      if (this.getCookie(params) != "" && this.getCookie(params) !== "null") {
        this[value] = this.getCookie(params);
      } else {
        this[value] = "";
      }
    },
    getUserAuth() {
      var token = this.getCookie("token");
      this.$axios({
        method: "post",
        url: "/account/GetUserInfo",
        data: {
          Token: token
        }
      })
        .then(res => {
          this.isAuthType = res.data.Data.user.AuthType;
          if(this.isAuthType == null || this.isAuthType == ''){
            this.choosedAuthIndex = 0;
            return false
          }else{
            this.choosedAuthIndex = 3
          }
          this.loading = false
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getUserInfo("userName", "douyinNameVal");
    this.getUserInfo("douyinId", "douyinNumberVal");
    this.getUserInfo("userPhone", "userCellphoneNumber");
    if(this.douyinNameVal == this.userCellphoneNumber){
      this.douyinNameVal = ''
    }
    this.getUserAuth();
    //this.getUserInfo("authType", "isAuthType");
    

    
    /* if(this.getCookie('douyinId') !== 'null'){
      this.isAuth = true
    } */
    
  }
};
</script>
<style lang="scss">

.is-auth {
  color: #999;
  margin-top: 30px;
  span {
    display: inline-block;
    color: #333;
    cursor: pointer;
    text-align: center;
    margin-left: 20px;
    &:hover{
      color: #ff0000;
    }
  }
}
.personal-data {
  padding: 50px;
}
.over-hidden {
  overflow: hidden;
}
dl.htlist_dla {
  width: 445px;
  margin: 84px auto auto auto;
}

dl.htlist_dla em {
  color: #eb5169;
  margin-right: 5px;
}

/* dl.htlist_dla dd:first-child label {
  letter-spacing: 4px;
} */
.personal-data {
  dl.htlist_dla input {
    width: 295px;
  }
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
/* 
dl.htlist_dla dd:last-child {
  margin-top: 44px;
} */

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
/*资料编辑*/
.order_typename_group {
  display: inline-block;
  font-size: 16px;
  width: 100%;
  width: 30%;
  position: relative;
  vertical-align: top;
  margin-top: 20px;
}
.order_typename_group span {
  display: inline-block;
}
.order_typename_group input[type="radio"] {
  margin: 0 8px -3px 30px;
}
input[type="radio"].radio_checked {
  width: 19px;
  height: 19px;
  border: none;
  background: url(../../assets/radio_checked_bg.png) no-repeat;
  background-size: 19px 19px;
}
/* .order_typename_group .order_tips_description_tri {
  left: 30px;
  margin-left: 0;
  top: 26px;
} */
.personal_center_rz {
  margin-top: 50px;
}
.personal_center_rz label {
  font-size: 16px;
  color: #333;
}
.choose_authentication{

}
.choose_authentication.show{
  display: block;
}
.choose_authentication input {
  margin: 0px 9px -4px 0 !important;
}
.personal_auth_tips {
  /*   text-align: center; */
  margin: 14px 0 24px;
  font-size: 14px;
  color: #ccc;
  padding-left: 150px;
}
.personal_auth em {
  color: #eb5169;
}
.personal_auth_name {
  margin: 30px 0 0 24px;
}
.personal_auth_license {
  margin: 30px 0 0 0;
}

.personal_auth_name input {
  border: 1px solid #bbbbbb;
  border-radius: 4px;
  line-height: 38px;
  padding-left: 15px;
  color: #999;
  font-size: 18px;
  width: 295px;
}
.personal_auth_name em {
  margin-right: 5px;
}
.personal_auth span {
  width: 126px;
  display: inline-block;
  font-size: 16px;
}
.personal_auth_idcard {
  margin-top: 30px;
}
.personal_auth_idcard span {
  width: 146px;
  vertical-align: top;
}
.auth_idcard {
  width: 317px;
  height: 176px;
  border: 1px solid #bbbbbb;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
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
.auth_idcard input {
  display: none;
}
.auth_idcard label {
  display: inline-block;
  font-weight: normal;
  font-size: 16px;
  width: 157px;
  height: 46px;
  line-height: 46px;
  background: #ccc;
  color: #fff;
  text-align: center;
  border-radius: 5px;
  cursor: pointer;
}
.personal_compantlicense .personal_auth_name input {
  width: 284px;
  box-sizing: border-box;
}
.personal_auth_license span {
  width: 150px;
}
.personal_auth_comlience .auth_idcard {
  width: 284px;
  height: 152px;
}
.personal_auth_comlience:last-child {
  margin-left: 40px;
}
.personal_compantlicense .over-hidden p {
  width: 284px;
  color: #ccc;
  font-size: 13px;
  line-height: 1.7em;
  margin-top: 14px;
}
.personal_agree {
  text-align: center;
  margin: 40px auto 200px;
}
.personal_agree p {
  font-size: 14px;
  color: #333;
}
.personal_agree p a {
  color: #999;
}
.personal_agree input {
  margin: 0 8px -4px 0;
}
.confirm_personal_data {
  width: 124px;
  height: 40px;
  color: #fff;
  background: #eb5169;
  border-radius: 4px;
  margin: 20px 0 0 0 !important;
  cursor: pointer;
}
.confirm_personal_data.disabled {
  background: #ebebeb;
  cursor: not-allowed;
}
.auth_idcard {
  position: relative;
  .cancle_upload {
    position: absolute;
    top: 4px;
    right: 4px;
    width: 20px;
    height: 20px;
    text-align: center;
    cursor: pointer;
    line-height: 20px;
    background: #67c23a;
    color: #fff;
    border-radius: 50%;
    font-family: element-icons!important;
    speak: none;
    font-style: normal;
    font-variant: normal;
    text-transform: none;
    vertical-align: baseline;
    display: inline-block;
    &:hover{
      background: transparent;
      color: #333;
      &:before{
        content: "\E60F"
      }
    }
  }
  .cancle_upload:before{
    content: "\E611"
  }
}
</style>

