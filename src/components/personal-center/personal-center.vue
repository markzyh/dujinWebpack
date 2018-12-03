<template>
  <div class="personal-data">
    <h3 class="create_title">生成订单</h3>
    <div class="person_info">
      <img src="../../assets/grxx_icon.png" alt>
      <ul class="person_info_ul">
        <li>
          会 &nbsp;员 &nbsp;名 :
          <span>{{userName}}</span>
        </li>
        <li>
          客户经理 :
          <span>{{userManager}}</span>
        </li>
        <li>
          抖 &nbsp;音 &nbsp;号 :
          <span>{{douyinId}}</span>
        </li>
        <li>
          手机号码 :
          <span>{{userManagePhone}}</span>
        </li>
        <li>
          手机号码 :
          <span>{{userCellphoneNumber}}</span>
        </li>
        <li>
          Q Q号码 :
          <span>{{userManageQQ}}</span>
        </li>
        <li>
          账户余额 :
          <span>{{userBalance}}</span>
        </li>
      </ul>
    </div>
    <div class="person_ding">
      <div class="ding">
        <img src="../../assets/grxx_icon01.png" alt>未支付订单
        <span>{{unpaidOrder}}</span>
      </div>
      <div class="ding ywc">
        <img src="../../assets/grxx_icon02.png" alt>已完成订单
        <span>{{completeOrder}}</span>
      </div>
      <div class="ding">
        <img src="../../assets/grxx_icon03.png" alt>执行中订单
        <span>{{executingOrder}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "",
  data() {
    return {
      userName: "", //用户名
      userManager: "张图图", //客户经理
      userManagePhone: "", //客户经理手机号
      userManageQQ: "", //客户经理QQ
      douyinId: "", //抖音ID
      userCellphoneNumber: "", //用户手机号
      userBalance: "4500", //用户账户余额
      unpaidOrder: 0, //未支付
      completeOrder: 0, //已完成
      executingOrder: 0, //执行中
      token: "",
      userInfo: [] //获取的用户信息
    };
  },
  methods: {
    getUserInfo() {
      var token = this.getCookie("token");
      console.log(token);
      var _this = this;
      axios
        .post("/account/GetUserInfo", {
          Token: token
        },{
          headers:{
            'content-type': 'application/x-www-form-urlencoded'
          }
        })
        .then(function(res) {
          if (res.data.Code == 11) {
            userLoginOut();
            return false;
          }
          _this.userInfo = res.data.Data;
          _this.setUserInfo();
          _this.setOrderInfo();
          console.log(_this.userInfo);
        });
    },
    setUserInfo() {
      var _this = this.userInfo.user;
      this.userName = _this.Name;
      this.userManager = _this.Customer;
      this.douyinId = _this.DouyinId;
      this.userCellphoneNumber = _this.Phone;
      this.userBalance = this.userInfo.balance;
      this.userManagePhone = _this.CustomerPhone;
      this.userManageQQ = _this.CustomerQQ;
    },
    setOrderInfo() {
      var _this = this.userInfo.order;
      this.unpaidOrder = _this.notpay;
      this.completeOrder = _this.complete;
      this.executingOrder = _this.runing;
    }
  },
  mounted() {
    this.getUserInfo();
  },
  beforeCreate() {
    this.limit()//全局
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.personal-center{padding: 50px;}
.htlist_ul {
  width: 1035px;
  height: 755px;
  float: left;
  margin-left: 40px;
  background: #fefefe;
  color: #333333;
}

.htlist_ul .htlist_ulC {
  width: 950px;
  margin: 0 auto;
}

.htlist_ulC h3 {
  font-size: 20px;
  line-height: 50px;
  font-weight: normal;
  width: 100%;
  border-bottom: 1px solid #999999;
  padding-top: 30px;
}

.person_info {
  width: 100%;
  height: 195px;
  border: 1px solid #bbbbbb;
  margin-top: 18px;
  display: flex;
}

.person_info > img {
  width: 121px;
  height: 121px;
  margin: 36px 30px 0 36px;
}

.person_info_ul {
  margin-top: 35px;
}

.person_info_ul > li {
  width: 290px;
  float: left;
  font-size: 16px;
  line-height: 40px;
  color: #666666;
}

.person_info_ul > li > span {
  margin-left: 15px;
  color: #b8b8b8;
}

.person_info_ul > li:nth-child(1) > span {
  color: #333333;
}

.person_info_ul > li:nth-child(5) > span {
  color: #eb5169;
}

.person_ding {
  display: flex;
  margin-top: 50px;
}

.person_ding > .ding {
  width: 284px;
  height: 140px;
  background: #fff6f7;
  border-radius: 10px;
  font-size: 20px;
  color: #666666;
}

.person_ding > .ding > img {
  margin: 38px 15px -23px 30px;
}

.person_ding .ywc {
  margin: 0 50px;
}

.person_ding > .ding > span {
  color: #eb5169;
  font-size: 34px;
  margin-left: 12px;
}
</style>

