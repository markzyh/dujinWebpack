<template>
  <div class="consumption">
    <div class="htlist_ulC">
      <h3 class="create_title">账户中心</h3>
      <div class="orderCenter">
        <div class="order_select">
          <select
            name
            id
            class="select_or"
            @change="chooseTransactionType"
            v-model="choosedTransactionType"
          >
            <option
              v-for="(item,index) in transactionTypeLists"
              :value="item.name"
              :disabled="item.disabled"
              :key="index"
            >{{item.name}}</option>
          </select>
          <!--                             <select name="" id="" class="select_time">
                                <option value="下单时间">下单时间</option>
                                <option value="1:00">1:00</option>
                                <option value="2:00">2:00</option>
          </select>-->
          <div class="orderDate">
            <!-- <img src="images/date_icon.png" alt> -->
            <!-- <input type="text" class="date-picker start_date" placeholder="开始日期"> -->
            <date-picker
              v-model="startDateVal"
              :first-day-of-week="1"
              class="dis-inline"
              @change="screenDate"
            ></date-picker>
            <span>至</span>
            <!-- <input type="text" class="date-picker end_date" placeholder="结束日期"> -->
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
              <th>交易类型</th>
              <th>交易金额</th>
              <th>退款金额</th>
              <th>交易前金额</th>
              <th>交易时间</th>
            </tr>
            <tr v-for="(item,index) in orderList" :key="index">
              <td style="width: 120px;">{{item.PayNumber}}</td>
              <td>{{item.Type}}</td>
              <td>{{item.PayMoney}}</td>
              <td>{{item.Refund}}</td>
              <td>{{item.Balance}}</td>
              <td style="width: 180px">{{transformDateStamp(parseInt(item.CreateDateTime.substr(6, 19)))}}</td>
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
    components:{DatePicker},
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
      isShowProblems: false,
      orderNumber: "",
      choosedTransactionType: "消费类型",
      startDateVal: "",
      endDateVal: "",
      orderList: [],
      transactionTypeLists: [
        {
          name: "消费类型",
          disabled: true,
          value: ""
        },
        {
          name: "充值",
          value: 1
        },
        {
          name: "消费",
          value: 2
        }
      ]
    };
  },
  methods: {
    screenDate() {
      let Start = new Date(this.startDateVal).getTime();
      let End = new Date(this.endDateVal).getTime();
      let Status = ""; //暂时为空
      let Type = this.choosedTransactionType;
      if (this.chekDate(Start, End) == false) {
        alert("开始时间必须在结束时间之前");
        return false;
      } else {
        Start = this.transformDateStamp(this.startDateVal)
        End = this.transformDateStamp(this.endDateVal)
        //this.getOrderList(Status, Start, End, DataType);
        this.getPaymentList(Status, Start, End, Type);
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
    //点击查询订单
    chooseTransactionType: function() {
      this.getPaymentList(this.choosedTransactionType);
      console.log(this.choosedTransactionType);
    },
    getPaymentList: function(type, start, end) {
      var token = this.getCookie("token");
      var _this = this;
      axios
        .post(
          "/Payment/GetPaymentList",
          {
            Token: token,
            Type: type,
            End: end,
            Start: start
          },
          {
            headers: {
              "content-type": "application/x-www-form-urlencoded"
            }
          }
        )
        .then(function(res) {
          console.log(res);
          if (res.data.Code == 11) {
            //alert('"登录状态失效，请重新登录"')
            //userLoginOut();
          }
          _this.orderList = res.data.Data;
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
  },
  mounted: function() {
    this.getPaymentList("");
  }
};
</script>
<style lang="scss">
.consumption{padding: 50px;}
.mx-panel-date td.today {
  background: #2a90e9;
  color: #fff;
}
.mx-panel-date td.today:hover {
  background: #2a90e9;
}
.mx-input {
  border: none;
  height: 40px;
  line-height: 40px;
  background: none;
  font-size: 14px;
  padding-left: 40px;
}
.mx-datepicker {
  margin-left: 20px;
  width: 43%;
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
