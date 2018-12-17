<template>
  <div class="order-center">
    <div class="htlist_ulC">
      <h3 class="create_title">订单中心</h3>
      <div class="orderCenter">
        <div class="order_select">
          <select
            name
            id
            class="select_or"
            v-model="choosedOrderStatus"
            @change="chooseOrderStatus"
          >
            <option v-for="(item,index) in orderStatusLists" :key="index">{{item.name}}</option>
          </select>
          <!-- <select name="" id="" class="select_time" v-model="choosedOrderTime" @change="chooseOrderTime"> -->
          <select name id class="select_time" v-model="choosedOrderTime">
            <option v-for="(item,index) in orderTimeLists" :key="index">{{item.name}}</option>
          </select>
          <div class="orderDate date_picker_group">
            <!--  <img src="images/date_icon.png" alt=""> -->
            <!-- <input
              type="text"
              name="dtBegin"
              class="date-picker start_date"
              placeholder="开始日期"
              value
              ref="start_date"
            >-->
            <date-picker
              v-model="startDateVal"
              :first-day-of-week="1"
              class="dis-inline"
              @change="screenDate"
            ></date-picker>
            <span>至</span>
            <!-- <input type="text" name="dtEnd" class="date-picker end_date" placeholder="结束日期"> -->
            <date-picker
              v-model="endDateVal"
              :first-day-of-week="2"
              class="dis-inline"
              @change="screenDate"
            ></date-picker>
          </div>
        </div>
        <div class="order_table">
          <table cellspacing="0" class="tableOrder">
            <tr>
              <th>订单编号</th>
              <th>创建时间</th>
              <th>投放金额</th>
              <th>+流量</th>
              <th>投放形式</th>
              <th>订单状态</th>
              <th>备注</th>
            </tr>
            <tr v-for="(item,index) in orderList" :key="index">
              <!-- <td @click="searchOrderNumber(item.OrderNumber)" class="order_detais_link">
                <a href="order_details.html">{{item.OrderNumber}}</a>
              </td>-->
              <router-link
                :to="{path:'/order-details',query:{orderNumber:item.OrderNumber}}"
                tag="td"
              >
                <a>{{item.OrderNumber}}</a>
              </router-link>
              <td>{{transformDateStamp(parseInt(item.CreateDateTime.substr(6, 19)))}}</td>
              <!-- <td>{{test(item.CreateDateTime)}}</td> -->
              <td>{{item.Money}}</td>
              <td>{{item.Serving}}</td>
              <td>{{item.OrderType}}</td>
              <td>{{orderStatusLists[item.Status+1].name}}</td>
              <td>正常</td>
              <!--<td><a href="">详情</a></td>-->
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import DatePicker from "vue2-datepicker";
export default {
  components: { DatePicker },
  data() {
    return {
      shortcuts: [
        {
          text: "今天",
          onClick: () => {
            this.time3 = [new Date(), new Date()];
          }
        }
      ],
      timePickerOptions: {
        start: "00:00",
        step: "00:30",
        end: "23:30"
      },
      endDateVal: "", //日期选择结束时间
      startDateVal: "", //日期选择开始时间
      token: "",
      isLogin: false,
      isShowOrderDetails: false, //是否显示订单详情
      orderList: [],
      choosedOrderStatus: "全部",
      choosedOrderTime: "下单时间",
      orderTimeLists: [
        {
          name: "下单时间",
          value: 0
        },
        {
          name: "支付时间",
          value: 1
        },
        {
          name: "完成时间",
          value: 2
        }
      ],
      orderStatusLists: [
        {
          name: "全部",
          value: ""
        },
        {
          name: "审核中",
          value: 0
        },
        {
          name: "未支付",
          value: 1
        },
        {
          name: "投放中",
          value: 2
        },
        {
          name: "已完成",
          value: 3
        }
      ]
    };
  },
  methods: {
    screenDate() {
      let Start = new Date(this.startDateVal).getTime();
      let End = new Date(this.endDateVal).getTime();
      let Status = this.choosedOrderStatus; //暂时为空
      let DataType = this.choosedOrderTime;
      if (this.chekDate(Start, End) == false) {
        alert("开始时间必须在结束时间之前");
        return false;
      } else {
        Start = this.transformDateStamp(this.startDateVal)
        End = this.transformDateStamp(this.endDateVal)
        //this.getOrderList(Status, Start, End, DataType);
        this.getOrderList(Status, Start, End, DataType);
        console.log(this.startDateVal);
        console.log(this.endDateVal);
      }
    },
    //验证时间
    chekDate: function(startDate, endDate) {
      if (parseInt(startDate) > parseInt(endDate)) {
        return false;
      } else {
        return true;
      }
    },
    //转换时间格式,转换为时间戳格式
    transformDate: function(dateString) {
      var dateYear = dateString.substring(0, 4); //取年份
      var dateMounth = dateString.substring(5, 7); //取月份
      var dateDay = dateString.substring(8, 10); //取天数
      var parseDateString = dateYear + "-" + dateMounth + "-" + dateDay; //转换为标准时间格式,可以被解析
      console.log(Date.parse(parseDateString));
      return Date.parse(parseDateString); //返回时间戳
    },
    closeProblems: function() {
      this.isShowProblems = false;
    },
    //选择筛选时间
    /* chooseOrderTime: function () {
			//this.getOrderListAttr(this.choosedOrderTime)
			this.choosedOrderTime = this
			console.log(this.choosedOrderTime)
		}, */
    //选择订单状态,根据状态查询
    chooseOrderStatus: function() {
      //var status = this.choosedOrderStatus
      var status;
      for (var i = 0; i < this.orderStatusLists.length; i++) {
        if (this.orderStatusLists[i].name == this.choosedOrderStatus) {
          if (i == 0) {
            status = '';
          } else {
            status = i - 1;
          }
        }
      }
      //var status = this.choosedOrderStatus
      //alert(this.choosedOrderStatus.value())
      //var status = index
      this.getOrderList(status);
      //this.getOrderListAttr(this.choosedOrderStatus)
      console.log(this.choosedOrderStatus);
      //console.log(this.choosedOrderStatus)
    },
    //点击查询订单,把订单号写入cookie
    searchOrderNumber: function(orderNumber) {
      //把orderNumber写入localStorage
      //this.setCookie('orderNumber',orderNumber,1)
      console.log(this.getCookie("orderNumber"));
      //localStorage.orderNumber = orderNumber;
      //alert(localStorage.orderNumber)
    },

    getOrderList: function(status, start, end, dateType) {
      //console.log(this.$route.params.orderStatus)
      if(this.$route.params.orderStatus){
        //console.log(this.$route.params.orderStatus)
        status = this.$route.params.orderStatus
      }
      //this.getToken()
      var token = this.getCookie("token");
      //console.log(token)
      var _this = this;
      axios
        .post(
          "/order/GetOrderList",
          {
            Token: token,
            Status: status,
            Start: start,
            End: end,
            DateType: dateType
          }
        )
        .then(res => {
          /* if (res.data.Code == 11) {
            alert('登录状态已过期,请重新登录')
            this.globalLoginOut()
            this.$store.dispatch("loginAction", false);
            this.$store.dispatch("showLoginFormAction", true);
          } */
          console.log(res);
          this.orderList = res.data.Data;
        });
    },
    //把时间戳转译成普通格式
    transformDateStamp: function(param) {
      //var date = new Date(parseInt(param.substr(6, 19)));
      var timeYear = new Date(param).getFullYear();
      var timeMouth = new Date(param).getMonth() + 1;
      var timeDate = new Date(param).getDate();
      var timeHours = new Date(param).getHours();
      var timeMinutes = new Date(param).getMinutes();
      var timeSeconds = new Date(param).getSeconds();
      var time =
        this.checkTen(timeYear) +
        "-" +
        this.checkTen(timeMouth) +
        "-" +
        this.checkTen(timeDate) +
        "   " +
        this.checkTen(timeHours) +
        ":" +
        this.checkTen(timeMinutes) +
        ":" +
        this.checkTen(timeSeconds);
      return time;
    },

    checkTen: function(num) {
      if (num < 10) {
        num = "0" + num;
      }
      return num;
    }
  },
  mounted: function() {
    //limit()//验证登录
    this.getOrderList();
    //this.endDatePicker(); //必须页面渲染后先执行一次,不然无法点击出现时间框,暂时还没有理解为什么
    //this.startDatePicker();
  },
  computed: {
    watchEndDateVal: function() {
      return this.endDateVal;
    }
  }
};
</script>
<style lang="scss">
.order-center{padding: 50px;}
.mx-panel-date td.today {
  background: #2a90e9;
  color: #fff;
}
.mx-panel-date td.today:hover {
  background: #2a90e9;
}
.mx-input {
  border: none !important;
  height: 40px !important;
  line-height: 40px !important;
  background: none !important;
  font-size: 14px !important;
  padding-left: 40px !important;
}
.mx-datepicker {
  margin-left: 20px;
  width: 43% !important;
}
.mx-input-append {
  left: 0;
}
.order_select {
  height: 42px;
  margin: 25px auto;
  display: flex;
}

.order_select > select {
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  background: url("../../assets/xl_icon.png") no-repeat scroll 90px center
    transparent;
  font-size: 16px;
  color: #666666;
  padding-left: 15px;
  width: 120px;
  height: 40px;
  border: 1px solid #bbbbbb;
  border-radius: 5px;
}

.order_select .select_time {
  margin-left: 10px;
}

.orderDate {
  width: 360px;
  height: 38px;
  border: 1px solid #bbbbbb;
  border-radius: 5px;
  margin-left: 10px;
  font-size: 16px;
  position: relative;
}

.orderDate img {
  margin-left: 10px;
  margin-top: 10px;
  vertical-align: middle;
}

.orderDate > input {
  border: none;
  width: 110px;
  height: 30px;
  background: transparent;
  padding-left: 35px;
  line-height: 30px;
  font-size: 14px;
  position: absolute;
  outline: none;
}

.orderDate > span {
  position: absolute;
  margin-top: 9px;
  left: 170px;
}

table {
  font-size: 16px;
  text-align: center;
}

table td {
  height: 83px;
  border-bottom: 1px dashed #f0f0f0;
  color: #999999;
}

table th {
  font-weight: normal;
  height: 72px;
  background: #f0f0f0;
  color: #666666;
}
.start_date {
  top: 6px;
}

.end_date {
  top: 6px;
  left: 200px;
}

/* .order_table{height:530px;} */
.tableOrder th {
  padding: 0 10px;
  width: 88px;
}

.tableOrder th:nth-child(1),
.tableOrder th:nth-child(2) {
  /* padding:0 65px; */
  width: 176px;
}

.tableOrder td:nth-child(5) {
  color: #eb5169;
}

.order_detais_link a:hover {
  color: #eb5169;
  text-decoration: underline;
}
</style>
