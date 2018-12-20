<template>
  <div class="create-order" v-loading="loading">
    <h3 class="create_title">新建计划</h3>
    <form action class="create_order_form">
      <div class="order_link">
        <label for="order_link">投放内容
          <div class="create_order_tips">
            <img src="../../assets/create_order_tips.png" alt class="order_tips_icon">
            <div class="order_tips_description">
              <img
                src="../../assets/order_tips_description_tri.jpg"
                alt
                class="order_tips_description_tri"
              >
              <b>您要投放的链接</b>打开您想要投放的视频，
              <strong>选择“分享到&gt;复制链接”</strong>，将
              <strong>删除文字后的链接</strong>粘贴到下框。
            </div>
          </div>
        </label>
        <input
          type="text"
          id="order_link"
          name="order_link"
          v-model="orderLink"
          class="order_link_value"
          @focus="inputFocus"
          @blur="inputBlur"
        >
        <p class="create_usermessage">
          <span>抖音昵称：{{userName}}</span>
          <span>抖音号：{{douyinId}}</span>
        </p>
      </div>

      <div class="order_link order_type">
        <label for="order_typename">把视频推荐给潜在兴趣用户
          <div class="create_order_tips">
            <img src="../../assets/create_order_tips.png" alt class="order_tips_icon">
            <div class="order_tips_description">
              <img
                src="../../assets/order_tips_description_tri.jpg"
                alt
                class="order_tips_description_tri"
              >
              <b>把视频推荐给潜在兴趣用户</b>将视频展现给推荐流更多潜在兴趣用户，提升视频的播放量。
            </div>
          </div>
        </label>
        <div class="order_typename_group" v-for="(item,index) in orderTypeLists" :key="index">
          <input
            type="radio"
            name="orderType"
            :value="item.name"
            :class="{radio_checked:putwayIndex === index}"
            @click="chooseOrderType(index)"
          >
          <span>
            {{item.name}}
            <img
              src="../../assets/order_tips_description_tri.jpg"
              alt
              class="order_tips_description_tri"
              v-if="putwayIndex === index && putwayIndex != 0"
              :class="{show:putwayIndex === index}"
            >
          </span>
          <region  v-if="putwayIndex === 1 && index != 0" @getChoosedVal="getChoosedVal"></region>
        </div>
      </div>
      <div class="order_choosed_params" v-if="isShowDefaultValue">
        已选择
        <span>性别 : {{choosedSex}}</span>
        <span>年龄 : {{choosedAge}}</span>
        <span>
          地域 :
          {{choosedValue}}
        </span>
      </div>
      <div class="order_link order_increment">
        <label for="order_increment">预计播放量提升
          <div class="create_order_tips">
            <img src="../../assets/create_order_tips.png" alt class="order_tips_icon">
            <div class="order_tips_description">
              <img
                src="../../assets/order_tips_description_tri.jpg"
                alt
                class="order_tips_description_tri"
              >
              <b>预计播放量</b>自定义投放设置越精准，投放成本越高，系统将会根据您的自定义投放设置实时估算预计播放量。
            </div>
          </div>
          <div class="order_increment_number">
            <span>
              {{increNumber}}
            </span>+
          </div>
        </label>
      </div>
      <div class="order_link order_price">
        <label for="order_increment">投放金额
          <div class="create_order_tips">
            <img src="../../assets/create_order_tips.png" alt class="order_tips_icon">
            <div class="order_tips_description">
              <img
                src="../../assets/order_tips_description_tri.jpg"
                alt
                class="order_tips_description_tri"
              >
              <b>投放金额</b>投放金额为此次投放的最大消耗值，系统会尽可能100%投放完成。但投放过程中若遇到如视频删除／设好友可见或私密／人工举报／投放效率不佳，系统会自动结束投放。剩余未消耗的金额将3～48小时可退回到您的账户中心。
            </div>
          </div>
        </label>
        <div class="order_typename_group" v-for="(item,index) in PayLists" :key="index">
          <input
            type="radio"
            name="orderType"
            :class="{radio_checked:nowPayIndex === index}"
            @click="choosePayNumber(index)"
          >
          <span>
            {{item.name}}
            <img
              src="../../assets/order_tips_description_tri.jpg"
              alt
              class="order_tips_description_tri show"
              v-if="nowPayIndex === 1 &&index === 1 && showUserInputMoney"
            >
          </span>
          <div
            class="customtype_form show"
            v-if="nowPayIndex === 1 && index === 1 && showUserInputMoney"
          >
            <h3>自定义金额</h3>
            <input v-model="customPayNumber" @focus="inputFocus" @blur="inputBlur">
            <h6>金额在{{limitMoney}}~500000之间，且为100的倍数</h6>
            <h5 @click="confirmCustomPay">确定</h5>
          </div>
        </div>
        <ul class="order_price_auto" v-if="nowPayIndex === 0">
          <li
            v-for="(item,index) in payNumberList"
            :class="{checked:nowPayAutoIndex === index,disabled:index < autoPriceIndex}"
            @click="choosePayAuto(index)"
            :key="index"
          >{{item.name}}</li>
        </ul>
        <p class="order_price_auto_number">
          投放金额：
          <b>¥ {{payNumberValue}}</b>
        </p>
      </div>
      <div class="confirm_order" @click="confirmOrder">确认投放</div>
    </form>
    <div class="dymain_cover" v-if="isPaySuccess"></div>
    <div class="pay_success" v-if="isPaySuccess" :class="{show:isPaySuccess}">
      <h3 >
        <img src="../../assets/pay_success_03.jpg" alt> <span v-if="balance !== 0">投放成功</span><span v-if="balance == 0">未支付</span>
      </h3>
      <h6 v-if="balance == 0">您的订单尚未支付 <br> 请等待客户经理联系您充值后开始投放</h6>
      <h4>
        <span>{{computedCountDownNumber}}秒</span>后将跳转到订单中心
      </h4>
      <div class="pay_success_tips">
        <h5>温馨提示</h5>
        <p>1.请在安全网络环境下进行金钱支付，以防账号被盗</p>
        <p>2.本次交易解释权归上海度进信息科技有限公司所有</p>
      </div>
    </div>
  </div>
</template>

<script>
import Region from "@/components/create-order/region";
export default {
  components:{Region},
  name: "",
  data() {
    return {
      isshowDialog:false,
      loading:false,
      balance:'',//用户账户余额
      douyinId: "", //抖音Id
      userName: "", //用户抖音昵称
      isPaySuccess: false, //最后,是否提交成功
      successCountDownNumber: 3, //成功后的倒计时
      userIsLogin: false, //用户是否登录
      putwayIndex: 0, //投放方式的index值
      nowPayIndex: 0,
      incrementNumber: 40000, //预计播放提升量
      nowPayAutoIndex: 3, //点击选择充值金额的index
      payNumberValue: 800, //充值金额
      customPayNumber: "¥ 请输入金额", //自定义充值金额
      isShowDefaultValue: false,
      showUserInputMoney: true, //是否显示用户自定义金额
      userRegionIndex: 0,
      orderLink: "请输入您所要投放的链接",
      orderTypeName: "智能投放", //投放方式
      choosedValue: "全国", //已经选择地区
      choosedSex: "不限", //选择的性别
      choosedAge: "18-23岁", //选择的年龄数组
      orderTypeLists: [
        {
          name: "系统智能投放",
          orderTypeName: "系统智能投放",
          isChecked: true,
          isCustom: false
        },
        {
          name: "自定义定向投放",
          orderTypeName: "自定义定向投放",
          isChecked: false,
          isCustom: false
        }
      ],
      PayLists: [
        {
          name: "系统定义金额"
        },
        {
          name: "自定义投放"
        }
      ],
      payNumberList: [
        {
          name: "¥ 100",
          value: 100
        },
        {
          name: "¥ 200",
          value: 200
        },
        {
          name: "¥ 500",
          value: 500
        },
        {
          name: "¥ 800",
          value: 800
        },
        {
          name: "¥ 1000",
          value: 1000
        },
        {
          name: "¥ 1500",
          value: 1500
        },
        {
          name: "¥ 2000",
          value: 2000
        },
        {
          name: "¥ 2500",
          value: 2500
        },
        {
          name: "¥ 3000",
          value: 3000
        },
        {
          name: "¥ 3500",
          value: 3500
        },
        {
          name: "¥ 4000",
          value: 4000
        }
      ],
    };
  },
  methods: {
    showDialog(){
      this.isshowDialog = true
    },
    //子组件触发的事件
    getChoosedVal(obj){
      this.userRegionIndex = obj.userRegionIndex
      this.choosedSex = this.checkUndefined(obj.choosedSex,'不限')
      this.choosedAge = this.checkUndefined(obj.choosedAge,'18-23岁')
      this.choosedValue = this.checkUndefined(obj.choosedValue,'全国')  
    },
    checkUndefined(attr,value){
      if(attr == undefined){
        return value
      }else{
        return attr
      }
    },
    confirmOrder() {
      if (this.orderLink == "" || this.orderLink == "请输入您所要投放的链接") {
        this.$Notification({
          title: "温馨提示",
          message: "投放链接不能为空!",
          type: "warning"
        });
        return false;
      }
      var _this = this;
      var token = this.getCookie("token");
      var orderTypeName = this.orderTypeName;
      var link = this.orderLink;
      var payNumber = this.payNumberValue;
      this.$axios
        .post("/order/Submit", {
          Url: link, //投放链接
          OrderType: orderTypeName,
          Sex: _this.choosedSex.toString(), //目标性别
          Age: _this.choosedAge.toString(), //目标年龄
          Region: _this.choosedValue, //目标地域
          Serving: _this.increNumber, //播放量暂时没做
          Money: payNumber, //投放金额
          Token: token //token值
        })
        .then(res => {
          if (res) {
            _this.isPaySuccess = true;
            var interval = setInterval(() => {
              //倒计时
              _this.successCountDownNumber--;
              if (_this.successCountDownNumber == 0) {
                clearInterval(interval);
                /* this.$router.push({
                  path: "/order-center"
                }); */
                _this.isPaySuccess = false
                window.location.href = '/dist/#/order-center'
              }
            }, 1000);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    //手动选择金额
    choosePayAuto: function(index) {
      if (index < this.autoPriceIndex) {
        //控制点击金额,如果小于computed值,就不做点击事件
        return false;
      }
      if (index == 3) {
        this.incrementNumber = 40000;
      }
      if (index == 4) {
        this.incrementNumber = 50000;
      }
      if (index == 5) {
        this.incrementNumber = 100000;
      }

      this.nowPayAutoIndex = index;
      this.payNumberValue = this.payNumberList[index].value;
    },
    //单选按钮,改变单选的值,改变已经选择的值
    chooseParmas: function(index, attr, array) {
      this[attr] = index;
      var _thisArray = this[array]; //取得对应数组的值
      this.choosedSex = _thisArray[index];
    },
    confirmCustomPay: function() {
      //点击确认金额后验证数字的格式
      if (this.checkCustomPayNumber(this.customPayNumber) != false) {
        this.payNumberValue = this.customPayNumber; //输入的金额等于显示的金额
        //alert(this.customPayNumber)
        this.nowPayIndex = 1; //金额的方式
        this.showUserInputMoney = false;
        //return false
      } else {
        return false;
      }
    },
    choosePayNumber: function(index) {
      this.nowPayIndex = index;
      if (index == 1) {
        this.showUserInputMoney = true;
      }
    },
    //选择投放方式
    chooseOrderType: function(index) {
      this.putwayIndex = index;
      //选择投放方式后,显示默认值
      if (index === 1) {
        //选择自定义投放之后
        this.payNumberValue = 500;
        this.orderTypeName = "自定义投放";
        this.isShowDefaultValue = true; //是否显示默认选中的数据的值,比如年龄之类
        this.nowPayAutoIndex = 2; //选择自定义后,金额默认到第3个
        //            this.incrementNumber = 4000//默认提升量
        
      } else {
        this.payNumberValue = 800;
        this.orderTypeName = "智能投放";
        this.nowPayAutoIndex = 3;
        this.isShowDefaultValue = false;
      }
      //console.log(this.orderTypeName)
    },
    checkCustomPayNumber: function(number) {
      if (number == "¥ 请输入金额") {
        this.$Notification({
          title: "温馨提示",
          message: "金额为空,请您输入计划投放的金额!",
          type: "warning"
        });
        return false;
      }
      //监听自定义输入的金额
      if (this.putwayIndex == 0) {
        //选择智能投放时
        if (number < 800 || number > 500000) {
          this.$Notification({
            title: "温馨提示",
            message: "金额在必须是800~500000之间!",
            type: "warning"
          });
          return false;
        } else if (number % 100 != 0) {
          this.$Notification({
            title: "温馨提示",
            message: "金额必须是数字且是100的倍数!",
            type: "warning"
          });
          return false;
        }
      }
      if (this.putwayIndex == 1) {
        //选择自定义投放时
        if (number < 500 || number > 500000) {
          this.$Notification({
            title: "温馨提示",
            message: "金额在必须是500~500000之间!",
            type: "warning"
          });
          return false;
        } else if (number % 100 != 0) {
          this.$Notification({
            title: "温馨提示",
            message: "金额必须是数字且是100的倍数!",
            type: "warning"
          });
          return false;
        }
      } else {
        return true;
      }
    },
    inputFocus: function() {
      if (this.orderLink == "请输入您所要投放的链接") {
        this.orderLink = "";
      }
      if (this.customPayNumber == "¥ 请输入金额") {
        this.customPayNumber = "";
      }
    },
    inputBlur: function() {
      if (this.orderLink == "") {
        this.orderLink = "请输入您所要投放的链接";
      }
      if (this.customPayNumber == "") {
        this.customPayNumber = "¥ 请输入金额";
      }
    },
    _getUsermessage: function() {
      //var userObj = getUsermessage();
      let userName = this.getCookie("userName");
      let douyinId = this.getCookie("douyinId");
      this.userName = userName;
      this.douyinId = douyinId;
    },
    getUserInfo() {
      var token = this.getCookie("token");
      this.$axios({
        method: "post",
        url: "/account/GetUserInfo",
        data: {
          Token: token
        }
      })
        .then(res => {
          console.log(res)
          if(res.data.Data.balance){
            this.balance = res.data.Data.balance
          }else{
            this.balance = 0
          }
          
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: {
    limitMoney: function() {
      if (this.putwayIndex == 0) {
        return 800;
      }
      if (this.putwayIndex == 1) {
        return 500;
      }
    },
    computedCountDownNumber: function() {
      //提交成功后的倒计时
      if (this.isPaySuccess == true) {
        var number;
        number = this.successCountDownNumber;
        return number;
      }
    },
    autoPriceIndex: function() {
      if (this.putwayIndex == 0) {
        //选择智能投放时
        return 3;
      }
      if (this.putwayIndex == 1) {
        //选择智能投放时
        return 2;
      }
    },
    increNumber: function() {
      if (
        (this.putwayIndex == 1 &&
          this.nowPayIndex == 0 &&
          this.userRegionIndex == 3) ||
        this.userRegionIndex == 4
      ) {
        //当自定义投放下,商圈和附近,且点击选择金额时
        var base = 3300;
        if (this.nowPayAutoIndex == 2) {
          return base * 5;
        }
        if (this.nowPayAutoIndex == 3) {
          return base * 8;
        } else {
          return base * (this.nowPayAutoIndex - 2) * 5;
        }
      }
      if (
        (this.putwayIndex == 1 &&
          this.nowPayIndex != 0 &&
          this.userRegionIndex == 3) ||
        this.userRegionIndex == 4
      ) {
        //当自定义投放下,商圈和附近,且手动输入金额
        var base = 3300;
        //this.payNumberValue/100 //100的多少倍
        return parseInt((base * this.payNumberValue) / 100);
      }
      if (this.putwayIndex == 0 && this.nowPayIndex == 0) {
        //智能投放下的点击选择金额
        var base = 5000; //基数5000
        if (this.nowPayAutoIndex == 3) {
          return base * 8;
        } else {
          return base * (this.nowPayAutoIndex - 2) * 5;
        }
      }
      if (this.putwayIndex == 0 && this.nowPayIndex != 0) {
        //智能投放下的自定义输入金额
        var base = 5000; //基数5000
        return parseInt((base * this.payNumberValue) / 100);
      }
      if (this.putwayIndex == 1 && this.nowPayIndex == 0) {
        //自定义投放下的点击选择金额
        var base = 4000;
        if (this.nowPayAutoIndex == 2) {
          return base * 5;
        }
        if (this.nowPayAutoIndex == 3) {
          return base * 8;
        } else {
          return base * (this.nowPayAutoIndex - 2) * 5;
        }
      }
      if (this.putwayIndex == 1 && this.nowPayIndex != 0) {
        //自定义投放下的自定义输入金额
        var base = 4000;
        return parseInt((base * this.payNumberValue) / 100);
      }
    }
  },
  mounted: function() {
    this._getUsermessage();//cookie获取用户账号名
    this.getUserInfo()//获取用户的余额
  },
  beforeCreate() {

  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.create-order {
  padding: 50px;
}

.dybox {
  width: 1300px;
  margin: 40px auto;
  display: flex;
  justify-content: flex-start;
}

.dis-inline {
  display: inline-block;
}

input,
select {
  border: none;
  -webkit-appearance: none;
  appearance: none;
  -moz-appearance: none;
}

input[type="radio"] {
  width: 18px;
  height: 18px;
  border: 1px solid #999;
  border-radius: 50%;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  cursor: pointer;
}

.dy-nav {
  width: 218px;
}

.dy-content {
  width: 1034px;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  margin: 0 auto;
  background: #fff;
  /*border-top: 1px solid transparent; */
  padding: 50px;
  margin-left: 50px;
}

.dymain_cover {
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  z-index: 998;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}

#allmap {
  width: 100%;
  height: 300px;
}

#dist-sel {
  margin-left: 10px;
  margin-bottom: 14px;
}

.province_nearby .input_address {
  border: 1px solid #d5d5d5;
  width: 475px;
  height: 30px;
  line-height: 30px;
  padding-left: 16px;
  box-sizing: border-box;
  background-image: url(../../assets/province_nearby_mapicon.png);
  background-repeat: no-repeat;
  background-position: left center;
  background-origin: content-box;
  text-indent: 1.2em;
}

.province_nearby p {
  font-size: 14px;
  color: #999;
  margin: 14px;
}

.add_input_address {
  width: 77px;
  height: 32px;
  line-height: 32px;
  background: #d5d5d5;
  color: #666;
  cursor: pointer;
}

.deleteChoosedNearby {
  font-weight: normal;
  cursor: pointer;
  color: #eb5169;
}

.nearby_group {
  position: relative;
  margin-right: 80px;
}

.province_nearby .nearby_group.checked input {
  width: 17px;
  height: 17px;
  border: none;
  background: url(../../assets/province_nearby_choosed.png) no-repeat center;
}

.province_nearby .nearby_group.checked h6 {
  width: 89px;
  left: 16px;
}

.province_nearby .nearby_group.checked .nearby_km {
  color: #ee687d;
}

.province_nearby .nearby_group.outchecked input {
  border-color: #ee687d;
}

.province_nearby .nearby_group.outchecked .nearby_km {
  color: #ee687d;
}

.province_nearby .nearby_group.outchecked h6 {
  background: #eb5169;
}

.nearby_group:nth-child(5) {
  margin-right: 0;
}

.province_nearby .nearby_group input {
  width: 15px;
  height: 15px;
  border: 1px solid #666;
  margin: 0 !important;
}

.nearby_km {
  margin-left: -8px;
  width: 32px;
  color: #666;
  font-size: 14px;
}

.add_nearby_km {
  width: 78px;
  height: 32px;
  line-height: 32px;
  background: #eb5169;
  text-align: center;
  color: #fff;
  margin: 2px 0 0 24px;
  vertical-align: top;
  cursor: pointer;
}

.nearby_group h6 {
  position: absolute;
  width: 90px;
  height: 2px;
  background: #666;
  top: 9px;
  left: 15px;
}

.create_usermessage {
  font-size: 16px;
  color: #999;
  margin-top: 30px;
}

.create_usermessage span {
  display: inline-block;
  width: 26%;
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
.pay_success h6{
    font-weight: normal;
    margin: 0 40px 40px;
    margin-top: 60px;
    font-size: 20px;
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

.create_title {
  font-size: 20px;
  font-weight: normal;
  text-align: left;
  margin: 0 auto;
  border-bottom: 1px solid #868686;
  padding-bottom: 20px;
}

.create_order_form label {
  display: block;
  font-size: 16px;
  margin: 26px 0 10px;
  text-indent: 0.5em;
  color: #333;
}

.create_order_tips {
  position: relative;
  display: inline-block;
  width: 19px;
  text-indent: 0;
}

.order_tips_description {
  position: absolute;
  width: 270px;
  height: auto;
  border: 1px solid #ccc;
  padding: 20px;
  background: #fff;
  left: 50%;
  margin-left: -135px;
  top: 36px;
  line-height: 1.65em;
  color: #999;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  display: none;
  z-index: 2222;
  text-align: left;
}

.order_tips_description b {
  text-indent: 0;
  display: block;
  text-align: center;
  width: 100%;
  font-weight: normal;
  color: #666;
  margin-bottom: 10px;
  font-size: 16px;
}

.order_tips_description strong {
  font-size: 16px;
  color: #333;
  font-weight: normal;
}

/*   .order_tips_description_tri {
    width: 21px;
    height: 11px;
    position: absolute;
    top: -11px;
    left: 50%;
    margin-left: -10px;
    z-index: 3;
  }
 */
.order_tips_icon {
  cursor: pointer;
  margin-bottom: -3px;
  width: 19px;
  height: 19px;
}

.create_order_tips:hover .order_tips_description {
  display: block;
}

.order_link {
  border-bottom: 1px dashed #f0f0f0;
  padding-bottom: 30px;
  font-size: 16px;
  color: #999;
}

.order_link_value {
  background-image: url(../../assets/order_link_icon_03.png);
  background-repeat: no-repeat;
  background-position: left center;
  background-origin: content-box;
  width: 564px;
  border: 1px solid #a4a4a4;
  border-radius: 5px;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  line-height: 56px;
  background-color: transparent;
  padding-left: 22px;
  text-indent: 2em;
  font-size: 16px;
  color: #ccc;
}

.customtype_form {
  background: #fff;
  border: 1px solid #ccc;
  display: inline-block;
  padding: 0 20px 20px;
  width: 200%;
  margin-left: -140px;
  margin-top: 15px;
  /* position: absolute; */
  /* left: -170px;
top: 36px;
z-index: 2; */

}

.customtype_form.show {
  display: inline-block;
}

.customtype_form .customtype_form_btn {
  display: inline-block;
  width: 66px;
  line-height: 26px;
  text-align: center;
  color: #999;
  border: 1px solid #d5d5d5;
  margin-left: 14px;
  text-indent: 0;
  cursor: pointer;
  position: relative;
}

.customtype_form .customtype_form_btn.checked {
  color: #eb5169;
  border: 1px solid;
}

.customtype_form_choosed {
}

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

/*   .order_typename_group .order_tips_description_tri {
    left: 30px;
    margin-left: 0;
    top: 26px;
  } */

.order_increment_number {
  margin-left: 20px;
  display: inline-block;
  font-size: 24px;
  color: #eb5169;
  vertical-align: middle;
  margin-bottom: 7px;
}

.show-enter-active,
.show-leave-active {
  transition: opacity 0.5s;
}

.show-enter,
.show-leave-to {
  opacity: 0;
}

.customtype_form_group {
  margin-top: 20px;
}

.customtype_form_group .checked {
  color: #ff0000;
}

.order_provice {
  position: absolute;
  background: #fff;
  border: 1px solid #ccc;
  padding: 20px;
  width: 400px;
  top: 42px;
  left: 50%;
  margin-left: -220px;
  padding-bottom: 20px;
  z-index: 99;
}

.order_provice.nearby {
  width: 620px;
  margin-left: -310px;
  box-sizing: border-box;
  padding: 30px;
}

.order_provice h3 {
  font-weight: normal;
  font-size: 16px;
  margin-bottom: 16px;
  text-align: center;
  color: #666;
}

.region_btn_pos {
  position: relative;
  display: inline-block;
  margin-left: 14px;
}

.region_btn_pos:nth-child(3) {
  margin-right: 120px;
}

.region_btn_pos:nth-child(4) {
  margin-left: 117px;
  margin-top: 20px;
}

.region_btn_pos:nth-child(5) {
  margin-top: 20px;
}

.region_btn_pos .customtype_form_btn {
  margin-left: 0;
}

.region_btn_pos .order_tips_description_tri {
  top: -11px;
  left: 50%;
  margin-left: -11px;
}

.provice_name_lists {
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 10px;
}

.provice_name_lists b {
  font-weight: normal;
  font-size: 16px;
  margin: 8px;
  display: inline-block;
  cursor: pointer;
  color: #999;
}

.provice_name_lists .provice_name {
  display: inline-block;
  /* padding-bottom: 8px;
border-bottom: 1px solid #e5e5e5; */
}

.provice_cities {
  color: #ff0000;
  margin-top: 10px;
  border-bottom: 1px solid #e5e5e5;
}

.provice_cities span {
  font-size: 16px;
  margin: 8px;
  display: inline-block;
  cursor: pointer;
  color: #999;
}

.provice_name_wide {
  height: 34px;
  overflow: hidden;
}

.region_choosed {
  margin-top: 10px;
  color: #999;
  line-height: 1.65em;
}

.confirm_provice {
  font-size: 16px;
  color: #fff;
  width: 80px;
  height: 26px;
  text-align: center;
  line-height: 26px;
  background: #eb5169;
  margin: 20px auto 0;
  cursor: pointer;
}

.order_choosed_params {
  font-size: 16px;
  color: #999;
  margin-left: 30px;
  margin-top: 18px;
}

.order_choosed_params.top {
  margin-left: 0;
}

.order_choosed_params.top span {
  border: none;
  text-align: left;
}

.order_choosed_params span {
  display: inline-block;
  padding: 2px 6px;
  line-height: 26px;
  text-align: left;
  color: #999;
  /* border: 1px solid #d5d5d5;*/
  margin-left: 14px;
  text-indent: 0;
  cursor: pointer;
}

.order_price .customtype_form {
  width: 284px;
  margin-left: -76px;
}

.order_price .customtype_form h3 {
  font-size: 16px;
  color: #666;
  margin-top: 16px;
}

.order_price .customtype_form input {
  width: 240px;
  height: 32px;
  line-height: 32px;
  margin: 20px auto 10px;
  background: #f5f5f5;
  color: #dadada;
  padding-left: 6px;
}

.order_price .customtype_form h6 {
  font-weight: normal;
  font-size: 13px;
  color: #666;
}

.order_price .customtype_form h5 {
  width: 80px;
  height: 26px;
  line-height: 26px;
  color: #fff;
  margin: 16px auto 0;
  background: #eb5169;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
}

.order_price_auto {
  overflow: hidden;
  width: 650px;
}

.order_price_auto li {
  float: left;
  cursor: pointer;
  font-size: 16px;
  color: #999;
  padding: 2px 0;
  border: 1px solid #d5d5d5;
  margin-left: 34px;
  margin-top: 24px;
  width: 70px;
  text-align: center;
}

.order_price_auto li:nth-child(6) {
  margin-right: 57px;
}

.order_price_auto li:nth-child(7) {
  margin-left: -22px;
}

.order_price_auto li.checked {
  color: #eb5169;
  border: 1px solid;
}

.order_price_auto li.disabled {
  cursor: not-allowed;
  color: #ebebeb;
}

.order_price_auto_number {
  width: 95%;
  height: 82px;
  line-height: 82px;
  background: #f5f5f5;
  font-size: 16px;
  padding-left: 33px;
  margin: 30px auto;
}

.order_price_auto_number b {
  font-weight: normal;
  font-size: 24px;
  color: #eb5169;
}

.confirm_order {
  font-size: 20px;
  color: #fff;
  cursor: pointer;
  width: 180px;
  height: 52px;
  line-height: 52px;
  text-align: center;
  margin: 40px auto;
  background: #eb5169;
  border-radius: 5px;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
}
</style>
