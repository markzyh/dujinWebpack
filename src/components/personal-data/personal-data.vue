<template>
  <div class="personal-data">
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
            @focus="dyNameFocus"
            @blur="dyNameBlur"
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
            @focus="dyIdFocus"
            @blur="dyNameFocus"
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
      <div class="choose_authentication">
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
                <em>*</em>真实姓名：
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
                    <img :src="idcardBackURL" alt v-if="idcardBackURL != false">
                  </form>
                </div>
              </div>
            </div>
            <p
              class="personal_auth_tips"
              v-if="choosedAuthIndex === 0"
            >请上传四角完整，亮度均匀，照片清晰的二代身份证，图片格式需为JPG,JPEG格式，大小不能超过500k。</p>
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
                    <img :src="companyIdUrl" alt v-if="companyIdUrl != false">
                  </form>
                </div>
                <p>请上传最新的营业执照彩色扫描件，各字段及印章完整清晰，资质无残缺信息，图片格式需为JPG,JPEG格式，大小不能超过500k。</p>
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
                    <img :src="industryCardURL" alt v-if="industryCardURL != false">
                  </form>
                </div>
                <p>请上传最新的行业许可证彩色扫描件，各字段及印章完整清晰，资质无残缺信息，图片格式需为JPG,JPEG格式大小不能超过500k。</p>
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
          <a href>《上海度进信息科技有限公司服务使用协议》</a>
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
import axios from "axios";
export default {
  data() {
    return {
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
    //同意协议
    changeAgree: function() {
      this.isAgree = !this.isAgree;
    },
    //图片上传是验证图片
    beforeUpload(file) {
      var fileSize = 5 * 1024; //500k
      var fileType1 = "JPG";
      var fileType2 = "JPEG";
      var uploadFileType = file.type.split("/")[1];
      var uploadFileSize = file.size;
      console.log(uploadFileType);
      console.log(fileType2.toLowerCase());
      if (
        uploadFileType != fileType1 &&
        uploadFileType != fileType2 &&
        uploadFileType != fileType1.toLowerCase() &&
        uploadFileType != fileType2.toLowerCase()
      ) {
        alert("图片只支持JPG或者JPEG格式");
        return false;
      }
      if (uploadFileSize > fileSize) {
        alert("图片大小不能超过500k");
        return false;
      } else {
        return true;
      }
    },
    choosedAuth: function(index) {
      this.choosedAuthIndex = index;
    },
    /* uploadCardFace:function(){
			var file = this.$refs.upload_idcard_face.files[0]
			var formData = new FormData()
			formData.append('file',file)

		}, */
    uploadCardFace: function(event, ref, attr) {
      var file = this.$refs[ref].files[0];
      console.log(file);
      if (this.beforeUpload(file) == true) {
        var formData = new FormData();
        //var file = this.$refs.upload_idcard_face.files[0]
        formData.append("path", file);
        var _this = this;
        console.log(formData.get("path"));
        /* var instance = axios.create({
          headers: {
            "content-type": "multipart/form-data"
          }
        }); */
        //console.log(instance);
        axios({
          url: "/account/ImageUpload",
          method: "post",
          transformRequest: [
            function(data) {
              // 对 data 进行任意转换处理
              console.log(data);
              return data;
            }
          ],
          data: formData
        }).then(function(res) {
          console.log(res);
          //console.log(_this)
          console.log(attr);
          _this[attr] = "http://dou.fudayiliao.com" + res.data.Data;
          console.log(_this[attr]);
        });
      }
    },
    /* 		openFile: function (index) {
					this.$refs.upload_idcard_face.click() //模拟点击
				}, */
    checkPersonalAuth: function() {
      var realName = this.userRealName;
      var isUploadFace = this.idcardFaceURL; //不为false
      var idUploadBack = this.idcardBackURL;
      if (realName == "") {
        alert("真实姓名为必填选项");
        return false;
      }
       if(!/^[\u4E00-\u9FA5]{2,4}$/.test(realName)){
        alert('请您填写正确的姓名')
        return false
      } 
      if (isUploadFace == false) {
        alert("个人身份证正面还未上传哦!");
        return false;
      }
      if (idUploadBack == false) {
        alert("个人身份证国徽面还未上传哦!");
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
        alert("企业名称和营业执照注册号为必填选项!");
        return false;
      }
      /* if(!/^[\u4E00-\u9FA5]{2,20}$/.test(companyName)){
        alert('请您填写正确的公司名称')
        return false
      }  */
      if(!/(^(?:(?![IOZSV])[\dA-Z]){2}\d{6}(?:(?![IOZSV])[\dA-Z]){10}$)|(^\d{15}$)/.test(companyNumber)){
        alert('请您填写正确的营业执照注册号,注册号为15位或18位')
        return false
      }
      if (isUploadCompany == false) {
        alert("营业执照还未上传!");
        return false;
      }
      if (isUploadIndustry == false) {
        alert("行业许可证还未上传!");
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
      var Face, FaceBack; //身份或者营业执照,行业许可证
      if (!Name || !DouyinId) {
        alert("请填写您的抖音昵称和抖音号!");
        return false;
      }
      if (!/^[a-zA-Z0-9_]{0,15}$/.test(DouyinId)) {
        alert("抖音号最多16位,只允许字母、下划线、点和数字");
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
        Face = this.companyIdUrl; //营业执照
        FaceBack = this.industryCardURL; //行业许可证
      }
      //alert('成功')
      axios
        .post(
          "/account/Update",
          {
            Token: token,
            Name: Name,
            DouyinId: DouyinId,
            AuthType: AuthType,
            CorpId: CorpId,
            CorpName: CorpName,
            Face: Face,
            FaceBack: FaceBack,
            RealName: RealName
          },
          {
            headers: {
              "content-type": "application/x-www-form-urlencoded"
            }
          }
        )
        .then(res => {
          if (res.data.Code == 11) {
            //userLoginOut();
          }
          //console.log(res)
          alert("资料提交完成");
          let userName = res.data.Data.Name;
          let userPhone = res.data.Data.Phone;
          let token = res.data.Token;
          let douyinId = res.data.Data.DouyinId;
          this.setCookie("userName", userName, 1);
          this.setCookie("userPhone", userPhone, 1);
          this.setCookie("token", token, 1);
          this.setCookie("douyinId", douyinId, 1);
          this.$router.push({
            path: "/create-order"
          });
          //this.globalLoginOut()
          //userLoginOut();
        });
    },
    dyNameFocus: function() {
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
    }
  },
  mounted() {
    this.userCellphoneNumber = this.getCookie("userPhone");
    //this.douyinNumberVal = this.getCookie("douyinId");
    //this.douyinNameVal = this.getCookie("username");
  }
};
</script>
<style lang="scss">
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

dl.htlist_dla dd:first-child label {
  letter-spacing: 4px;
}
.personal-data{
  dl.htlist_dla input{
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
}
.order_typename_group .order_tips_description_tri {
  left: 30px;
  margin-left: 0;
  top: 26px;
}
.personal_center_rz {
  margin-top: 50px;
}
.personal_center_rz label {
  font-size: 16px;
  color: #333;
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
</style>

