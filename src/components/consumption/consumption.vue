<template>
  <div class="consumption">
    <div class="htlist_ulC">
      <h3 class="create_title">账户中心</h3>
      <div class="orderCenter">
        <div class="order_select">
          <el-select class="select_or" v-model="choosedTransactionType" placeholder="请选择" @change="chooseTransactionType">
            <el-option v-for="(item,index) in transactionTypeLists" :disabled="item.disabled" :key="index" :value="item.name">{{item.name}}</el-option>
          </el-select>
          <div class="orderDate">
            <date-picker @screenDate="screenDate($event)"></date-picker>
          </div>
        </div>
        <div class="order_table" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" >
          <table cellspacing="0" class="tableOrder" v-if="!loading">
            <tr>
              <th class="consumption_number">订单编号</th>
              <th>交易类型</th>
              <th>交易金额</th>
              <th>退款金额</th>
              <th>交易前金额</th>
              <th class="consumption_time">交易时间</th>
            </tr>
            <tr v-for="(item,index) in orderList" :key="index">
              <td>{{item.PayNumber}}</td>
              <td>{{item.Type}}</td>
              <td>{{item.PayMoney}}</td>
              <td>{{item.Refund}}</td>
              <td>{{item.Balance}}</td>
              <td>{{transformDateStamp(parseInt(item.CreateDateTime.substr(6, 19)))}}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import DatePicker from "@/base/date-picker";
export default {
  components: { DatePicker },
  data() {
    return {
      loading:false,
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
    loadingAction(){
      this.loading = true
      setTimeout(() =>{
        this.loading = false
      },500)
    },
    screenDate(dateArray) {
      let Start = dateArray[0]
      let End = dateArray[1]
      let Status = ""; //暂时为空
      let Type = this.choosedTransactionType;
      this.getPaymentList(Status, Start, End, Type);

    },
    /* //验证时间
    chekDate: function(startDate, endDate) {
      if (parseInt(startDate) > parseInt(endDate)) {
        return false;
      } else {
        return true;
      }
    }, */
    //点击查询订单
    chooseTransactionType: function() {
      this.getPaymentList(this.choosedTransactionType);
      console.log(this.choosedTransactionType);
    },
    getPaymentList(type, start, end) {
      this.loadingAction()
      var token = this.getCookie("token");
      this.$axios
        .post("/Payment/GetPaymentList", {
          Token: token,
          Type: type,
          End: end,
          Start: start
        })
        .then(res => {
          if (res) {
            this.orderList = res.data.Data;
          }
        });
    }
  },
  mounted: function() {
    this.getPaymentList();
  }
};
</script>
<style lang="scss">
.consumption_time{
  width: 180px !important;
}
.consumption_number{
  width: 120px !important;
}
.consumption {
  padding: 50px;
}
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
 /*  width: 360px;
  height: 38px;
  border: 1px solid #bbbbbb;
  border-radius: 5px; */
  margin-left: 10px;
  /* font-size: 16px;
  position: relative; */
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
