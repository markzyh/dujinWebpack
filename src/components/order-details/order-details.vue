<template>
  <div class="order-details">
    <div class="order_main">
      <h4 class="order_maina">订单状态</h4>
      <div class="order_status">
        <div class="status_panel done">
          <div class="status_name">
            <span>提交订单</span>
          </div>
          <div class="status_line done"></div>
          <div class="status_date">下单时间：{{createTime}}</div>
          <div class="order_money">下单金额：¥{{orderInfo.Money}}</div>
        </div>
        <div class="status_panel done">
          <div class="status_name">
            <span>审核中</span>
          </div>
          <div class="status_line" :class="{done:orderStatus >= 2}"></div>
          <div class="status_date" v-if="orderStatus >= 2">审核通过：</div>
          <div class="status_date" v-if="orderStatus >= 2">{{payTime}}</div>
          <div class="status_not" v-if="orderStatus == 0">正在审核</div>
          <div class="status_not" v-if="orderStatus == 1">审核不通过</div>
          <div class="money_back" v-if="orderStatus == 1">资金已返账户余额</div>
        </div>
        <div class="status_panel" :class="{done:orderStatus >= 2}">
          <div class="status_name">
            <span>投放中</span>
          </div>
          <div class="status_line" :class="{done:orderStatus >= 3}"></div>
          <div class="status_date" v-if="orderStatus == 2">正在投放</div>
          <div class="status_date" v-if="orderStatus > 2">投放完成</div>
          <!-- <div class="status_date" v-if="orderStatus > 0">{{payTime}}</div>
          <div class="status_not" v-if="orderStatus ==0">正在审核</div>-->
        </div>
        <!--  <div class="status_panel">
                        <div class="status_name">
                            <span>投放中</span>
                        </div>
                        <div class="status_line"></div>
                        <div class="status_not">正在审核</div>
        </div>-->
        <div class="status_panel" :class="{done:orderStatus >= 3}">
          <div class="status_name">
            <span>已完成</span>
          </div>
          <div class="status_date" v-if="orderStatus == 3">投放成功：</div>
          <div class="status_date" v-if="orderStatus == 3">{{completeTime}}</div>
        </div>
      </div>
      <h4 class="order_mainj">投放内容</h4>
      <div class="order_maink">
        <img src="../../assets/ht_yh_winco.png" alt>
        <div class="dis-inline">
          <i>抖音昵称：{{userName}}</i>
          <i>抖音号：{{douyinId}}</i>
        </div>

        <div class="cl fr order_link">投放链接：{{orderLink}}</div>
      </div>
      <div class="order_mainn cl">
        <div class="compony_auth_label dis-inline">已消耗金额
          <div class="create_order_tips">
            <img src="../../assets/create_order_tips.png" alt class="order_tips_icon">
            <div class="order_tips_description">
              <img
                src="../../assets/order_tips_description_tri.jpg"
                alt
                class="order_tips_description_tri"
              >
              <b>已消耗金额</b>本次投放中，已经用于视频投放的金额。
            </div>
          </div>
          <span>¥{{costMoney}}</span>
        </div>
        <div class="compony_auth_label dis-inline">消耗完成度
          <div class="create_order_tips">
            <img src="../../assets/create_order_tips.png" alt class="order_tips_icon">
            <div class="order_tips_description">
              <img
                src="../../assets/order_tips_description_tri.jpg"
                alt
                class="order_tips_description_tri"
              >
              <b>消耗完成度</b>设置投放的金额中已经消耗金额的比例（计算公式：已消耗金额
              /
              本次投放总金额）
            </div>
          </div>
          <span>{{costMoney/orderMoney*100}}%</span>
        </div>
      </div>
      <h4 class="order_mainj">数据总览</h4>
      <ul class="order_mainr cl">
        <!--<li>
                        <i></i><span>展示量</span><em>0</em>
        </li>-->
        <li>
          <i></i>
          <span>播放量</span>
          <em>{{playCount}}</em>
        </li>
        <li>
          <i></i>
          <span>互动量</span>
          <em>{{interactionCount}}</em>
        </li>
      </ul>
      <h4 class="order_mainj">互动数据</h4>
      <ul class="order_mainr order_mains cl">
        <li>
          <i></i>
          <span>分享数</span>
          <em>{{shareCount}}</em>
        </li>
        <li>
          <i></i>
          <span>评论数</span>
          <em>{{commentCount}}</em>
        </li>
        <li>
          <i></i>
          <span>点赞数</span>
          <em>{{likeCount}}</em>
        </li>
      </ul>
      <h4 class="order_mainj">帮助中心</h4>
      <div class="order_maint cl">
        <div class="order_mainu fl">
          <h5>常见问题</h5>
          <p>
            更多问题请拨打DOU+加速官方电话
            <a href>400-040-2120</a>
          </p>
        </div>
        <img class="fr" @click="showProblems" src="../../assets/ht_yh_iconf.png" alt>
      </div>
    </div>
    <div class="dialog_a" v-if="isShowProblems" :class="{show:isShowProblems}">
      <div class="dialog_b details">
        <img src="../../assets/ht_hoverd.png" @click="closeProblems" alt>
      </div>
      <div class="dialog_c">
        <h4 class="dialog_d">
          <img src="/static/images/ht_hovere.png" alt>
          <span>
            <p>DOU+加速是什么？</p>
          </span>
        </h4>
        <p class="dialog_e">DOU+加速是一款视频加热工具，购买并使用后，可实现将视频推荐给更多兴趣用户，提升视频的播放量与互动量。</p>
        <h4 class="dialog_d">
          <img src="/static/images/ht_hovere.png" alt>
          <span>
            <p>DOU+加速是什么？</p>
          </span>
        </h4>
        <div class="dialog_f">
          <i>STEP1</i>
          <a href="/">进入官网</a>
        </div>
        <div class="dialog_g">
          <p class="dialog_g">
            点击进入度进营销官方网站：
            <a href="http://douyin.dujin021.com/">douyin.dujin021.com/</a>
          </p>
        </div>
        <!--<img class="dialog_h" src="../../assets/ht_wxa.jpg" alt="">-->
        <div class="dialog_f">
          <i>STEP2</i>
          <a href="/">登录/注册</a>
        </div>
        <p class="dialog_g">点击网站对话按钮，登录/注册，完成验证</p>
        <img class="dialog_h" src="/static/images/ht_hoverf.png" alt>
        <div class="dialog_f">
          <i>STEP3</i>
          <a href="/">登录/注册</a>
        </div>
        <p class="dialog_g">1、投放内容输入：点击“新建计划”，输入投放视频链接，</p>
        <img class="dialog_h" src="/static/images/ht_hoverg.jpg" alt>
        <p class="dialog_g">投放视频链接具体输入步骤如下：</p>
        <p class="dialog_g">(1)打开您想要投放的视频</p>
        <img class="dialog_h" src="/static/images/ddzx_a.jpg" alt>
        <p class="dialog_g">(2)选择“分享到&gt;复制链接”</p>
        <img class="dialog_h" src="/static/images/ddzx_b.jpg" alt>
        <p class="dialog_g">(3)删除链接中的文字，并将链接粘贴到输入框”</p>
        <img class="dialog_h" src="/static/images/ddzx_c.jpg" alt>
        <img class="dialog_h" src="/static/images/ddzx_d.jpg" alt>
        <p class="dialog_g">2、把视频推荐给潜在兴趣客户：您可以选择“系统智能投放”或者“自定义定向投放”，如下图：</p>
        <img class="dialog_h" src="/static/images/ddzx_e.jpg" alt>
        <p class="dialog_g">(1)您可以选择“系统智能投放”，如下图：</p>
        <img class="dialog_h" src="/static/images/ddzx_e.jpg" alt>

        <p class="dialog_g">(2)您也可以选择“自定义定向投放”，自定义选择投放用户的性别、年龄和地域，如下图：</p>
        <img class="dialog_h" src="/static/images/ddzx_f.jpg" alt>

        <p class="dialog_g">3、预计播放量提升：系统根据您的投放设置实时估算预计播放量，如下图：</p>
        <img class="dialog_h" src="/static/images/ddzx_p.jpg" alt>
        <p class="dialog_g">4、投放金额：您可以根据需求选择“系统定义金额”或“自定义金额”，如下图：</p>
        <img class="dialog_h" src="/static/images/ddzx_g.jpg" alt>
        <p class="dialog_g">(1) 您可以选择“系统定义金额”，如下图：</p>
        <img class="dialog_h" src="/static/images/ddzx_h.jpg" alt>
        <p class="dialog_g">5、点击确定，完成支付</p>
        <img class="dialog_h" src="/static/images/ddzx_j.jpg" alt>
        <div class="dialog_f">
          <i>STEP4</i>
          <a href="/">订单中心</a>
        </div>
        <p class="dialog_g">1、点击订单中心，随时查看订单情况</p>
        <img class="dialog_h" src="/static/images/ddzx_k.jpg" alt>
        <p class="dialog_g">2、点击“订单编号”查看“订单状态”</p>
        <img class="dialog_h" src="/static/images/ddzx_l.jpg" alt>
        <h4 class="dialog_d">
          <img src="/static/images/ht_hovere.png" alt>
          <span>
            <p>使用DOU+加速常见问题Q&A：</p>
          </span>
        </h4>
        <p class="dialog_i">1.DOU+加速如何投放视频？</p>
        <p class="dialog_g">DOU+加速支持自投广告，立足于帮助客户进行视频投放，如需投放，请按相对应的操作模式，选择您想要投放的视频，点击用户中心的“新建计划”进行投放。</p>
        <p class="dialog_i">2.使用DOU+加速的视频会展现在哪？</p>
        <p class="dialog_g">使用DOU+加速的视频会出现在抖音-首页推荐流里，根据抖音的高效能推荐算法，视频会展现给对该视频感兴趣的用户或潜在粉丝。</p>
        <p class="dialog_i">3.使用DOU+加速的视频会投放给谁？</p>
        <p class="dialog_g">目前支持三组定向模式： 模式1：系统智能投放，系统会智能选择可能对该视频感兴趣的用户或潜在粉丝，对其进行视频展现。</p>
        <p class="dialog_g">模式2：自定义投放，客户自主选择想要看到视频的用户类型：可以选择性别、年龄、兴趣、关键词、作息、时间、天气、职业等方式。</p>
        <p class="dialog_g">模式3：精准投放，精准定位受众用户的年龄及所在地域、商圈位置，以及用户附近6公里区域范围内。</p>
        <p class="dialog_i">4.使用了DOU+加速的视频，加热会持续多久？</p>
        <p class="dialog_g">最长不超过48小时。以下情况可能会停止加热：</p>
        <p class="dialog_g">可能性1：视频内容的“权限设置”修改为私密或者删除了视频。</p>
        <p class="dialog_g">可能性2：超过48小时。未消费的费用预计将在3-48个小时内会退还到“账户余额”中可点击用户中心查看。</p>
        <p class="dialog_i">5.审核被拒绝后，钱会被退到哪里？</p>
        <p class="dialog_g">预计将在3—48个小时内会退还到“账户余额”中，可在“用户中心”的“个人资料”中查看。</p>
        <p class="dialog_i">6.订单的消耗如何计算的？</p>
        <p class="dialog_g">视频每展示给一位用户，系统会自动扣除一部分金额，直到扣减完购买金额或订单投放终止。</p>
        <p class="dialog_i">7.购买后可以提供发票吗？</p>
        <p class="dialog_g dialog_k">可以！请联系您的客户经理。 请提供以下开票资料： 抖音 ID、昵称，开票金额（累计开票金额≤充值金额）</p>

        <h4 class="dialog_d">
          <img src="/static/images/ht_hovere.png" alt>
          <span>
            <p>联系方式</p>
          </span>
        </h4>
        <ul class="dialog_j">
          <li>
            <img src="../../assets/ddzx_m.jpg" alt>
            <a href="http://sighttp.qq.com/msgrd?v=1&uin=2082379729" target="_blank">QQ：2082379729</a>
          </li>
          <li>
            <img src="../../assets/ddzx_n.jpg" alt>电话: 400-040-2120
          </li>
          <li>
            <img src="../../assets/ddzx_o.jpg" alt>
            <a href="mailto:service@dujin021.com" target="_blank">邮箱: service@dujin021.com</a>
          </li>
        </ul>
      </div>
      <img src="../../assets/ht_hoverk.jpg" alt style="width:100%">
    </div>
  </div>
</template> 
<script>
export default {
  data() {
    return {
      orderNumber: "", //传递的订单编号
      isShowProblems: false,
      userName: "",
      douyinId: "",
      orderInfo: "", //用户信息对象
      //orderStatus:0,
      orderLink: "", //投放链接
      playCount: "", //播放量
      interactionCount: "", //互动量
      shareCount: "", //分享量
      commentCount: "", //评论量
      likeCount: "", //点赞量
      orderMoney: "", //下单金额
      createTime: "", //下单时间
      payTime: "", //审核通过时间
      completeTime: "", //完成时间
      costMoney: "", //消耗金额
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
        },
        {
          name: "",
          value: 4
        },
        {
          name: "",
          value: 5
        },
        {
          name: "",
          value: 6
        }
      ],
      orderStatus: 0
    };
  },
  methods: {
    //常见问题
    showProblems: function() {
      this.isShowProblems = true;
    },
    closeProblems: function() {
      this.isShowProblems = false;
    },
    //查询订单状态
    chenckOrderStatus: function() {
      this.orderStatus = this.orderInfo.Status;
      for (var i = 0; i < this.statusLists.length; i++) {
        if (this.statusLists[i] == this.orderStatus) {
        }
      }
    },
    getOrderMessage: function() {
      this.createTime = this.transformDateStamp(
        parseInt(this.orderInfo.CreateDateTime.substr(6, 19))
      );
      this.payTime = this.transformDateStamp(
        parseInt(this.orderInfo.PayTime.substr(6, 19))
      );
      this.completeTime = this.transformDateStamp(
        parseInt(this.orderInfo.CompleteTime.substr(6, 19))
      );
    },
    //根据订单信息渲染页面
    getUserMessage: function() {
      this.userName = this.getCookie("userName");
      this.douyinId = this.getCookie("douyinId");
      this.orderLink = this.orderInfo.Url;
      this.playCount = this.chenckIsNull(this.orderInfo.PlayCount);
      this.interactionCount = this.chenckIsNull(
        this.orderInfo.InteractionCount
      );
      this.shareCount = this.chenckIsNull(this.orderInfo.ShareCount);
      this.commentCount = this.chenckIsNull(this.orderInfo.CommentCount);
      this.likeCount = this.chenckIsNull(this.orderInfo.LikeCount);
      this.orderMoney = this.chenckIsNull(this.orderInfo.Money);
      this.costMoney = this.chenckIsNull(this.orderInfo.Consume);
      this.orderDate = this.transformDateStamp(this.orderInfo.CreateDateTime);
      //this.chenckOrderStatus()//检查订单的状态,显示页面上
    },
    //检测是否为空,空就返回0
    chenckIsNull(params) {
      if (params == null) {
        return 0;
      } else {
        return params;
      }
    },
    //获取订单信息
    getOrderInfo(orderNumber) {
      let token = this.getCookie("token");
      //var OrderNumber = this.orderNumber;
      //var _this = this;
      this.$axios
        .post("/order/GetOrderDetail", {
          Token: token,
          OrderNumber: orderNumber
        })
        .then(res => {
          if (res) {
            this.orderInfo = res.data.Data;
            this.orderStatus = res.data.Data.Status;
            this.getOrderMessage();
            this.getUserMessage();
            console.log(this.orderInfo)
          }
        });
    },
    //获取用户的账户信息
    getPaymentList(){
      let token = this.getCookie("token");
      this.$axios
        .post("/Payment/GetPaymentList", {
          Token: token,
        })
        .then(res => {
          if (res) {
            console.log(res)
          }
        });
    }
  },
  mounted() {
    this.orderNumber = this.$route.query.orderNumber;
    this.getOrderInfo(this.orderNumber);
    this.getPaymentList()
    //console.log(this.$route.query.orderNumber);
  },
  beforeCreate() {}
};
</script>
<style lang="scss" scoped>
/* .dy-content{
    margin:0;
    background: none;
    padding:0;
} */
/*订单详情*/
.order_status {
  display: flex;
  width: 1166px;
  padding-left: 116px;
  margin: 20px 0 0;
}
.order-details {
  .order_link {
    margin-right: 200px;
    color: #999;
    margin-top: 24px;
  }
}
.status_not {
  margin-top: 14px;
  position: absolute;
  width: 100px;
  margin-left: -26px;
  text-align: center;
}
.status_line {
  width: 238px;
  height: 1px;
  background: #dddddd;
  left: 50px;
  top: 12px;
  position: absolute;
}
.status_panel {
  position: relative;
  width: 25%;
}
.status_panel {
  font-size: 18px;
  color: #333;
}
.status_panel:first-child .status_line {
  left: 70px;
  width: 218px;
}
.status_panel.done .status_name {
  color: #eb5169;
}
.status_line.done {
  background: #eb5169;
}
.status_panel .status_date {
  font-size: 18px;
  color: #333;
}
.status_name {
  font-size: 16px;
  color: #999;
}
.status_panel .status_date,
.status_panel .order_money {
  margin: 14px 0 0 -16px;
}
.status_panel.done .money_back {
  position: absolute;
  width: 160px;
  margin: 45px 0 0 -38px !important;
}
.status_panel.done .status_date,
.status_panel.done .money_back,
.status_panel.done .order_money {
  font-size: 16px;
  color: #ccc;
  margin: 14px 0 0 -2px;
}
/* -------*/
.order_main {
  width: 1300px;
  background: #ffffff;
  padding: 0px 68px 129px 68px;
  margin: 42px auto auto auto;
}
h4.order_maina {
  height: 87px;
  line-height: 120px;
  text-align: center;
  color: #333333;
  font-size: 20px;
  font-weight: normal;
  border-bottom: 1px solid #999999;
}
.order_mainb {
  font-size: 16px;
  height: 75px;
  line-height: 76px;
  width: 940px;
  margin: auto;
}
.order_mainb dt {
  float: left;
  margin: 0px 6px;
  color: #999999;
}
.order_mainb dt.order_maind {
  color: #eb5169;
}
.order_mainb span {
  display: inline-block;
  height: 1px;
  width: 226px;
  margin-top: 40px;
  background: #dddddd;
  vertical-align: top;
}
.order_mainb span.order_mainc {
  background: #eb5169;
}
.order_maine {
  width: 940px;
  border-bottom: 1px dashed #f0f0f0;
  box-sizing: border-box;
  padding-bottom: 30px; /* display: flex;*/
  margin: 0 auto;
}
.order_maine span {
  font-size: 14px;
  color: #ccc;
}
.order_maine .order_mainf span {
  display: block;
  color: #cccccc;
  line-height: 17px;
}
.order_maine .order_maing {
  font-size: 20px;
  color: #333333;
  margin-top: -8px; /*margin-left: 212px;*/
}
.order_maine .order_tips {
  width: 25%;
  height: 70px;
}
.order_maine .order_tips.notpay {
  margin-left: 40px;
}
.order_maine .order_maing.ordered {
  margin-left: 4px;
}
.order_maine .order_maing.success {
  margin-left: 20px;
  width: 90px;
}
.order_maine .order_maing b {
  display: block;
  font-weight: normal;
  font-size: 18px;
}
.order_maine span.order_mainh {
  margin-bottom: 16px;
}
.order_maine em.order_maini {
  margin-left: 10px;
}
h4.order_mainj {
  color: #333333;
  font-size: 16px;
  font-weight: normal;
  line-height: 63px;
  margin-left: 8px;
}
.order_maink {
  width: 1300px;
  border-bottom: 1px dashed #f0f0f0;
  padding-bottom: 24px;
}
.order_maink i {
  display: block;
  font-style: normal;
  color: #999;
}
.order_maink .dis-inline {
  vertical-align: middle;
}
.order_maink img {
  vertical-align: middle;
  margin: 0px 8px 0px 8px;
  border-radius: 50%;
  width: 69px;
}
.order_maink span.order_mainl {
  display: inline-block;
  width: 69px;
  height: 69px;
  background: #f0f0f0;
  margin-left: 28px;
}
.order_mainn {
  padding: 22px 0px;
}
.order_mainn .compony_auth_label {
  margin-left: 20px;
}
.order_mainn .compony_auth_label span {
  display: inline-block;
  margin-left: 16px;
}

.order_mainn .compony_auth_label:last-child {
  margin-left: 120px;
}
.order_mainn span.order_maino {
  color: #999999;
  margin-left: 20px;
  float: left;
}
.order_mainn i.order_mainp {
  display: inline-block;
  width: 19px;
  height: 19px;
  line-height: 19px;
  text-align: center;
  border: 1px solid #999999;
  border-radius: 50%;
  margin-right: 14px;
  margin-left: 9px;
}
.order_mainn em.order_mainq {
  color: #666666;
}
.dialog_l {
  position: relative;
}
.xhje_a {
  position: absolute;
}
.xhje_b {
  left: 26px;
  top: 10px;
}
.xhje_c {
  left: 26px;
  top: 10px;
}
ul.order_mainr {
  border-bottom: 1px dashed #f0f0f0;
  padding-bottom: 60px;
  margin-top: 34px;
}
ul.order_mainr li {
  line-height: 52px;
  float: left;
  width: 250px;
}
ul.order_mainr li i {
  display: inline-block;
  background: url(../../assets/ht_hovera.png) no-repeat;
  width: 52px;
  height: 52px;
  vertical-align: middle;
  background-size: 183px 150px;
}
ul.order_mainr li:nth-child(2) i {
  background-position: -64px 0px;
}
ul.order_mainr li:last-child i {
  background-position: -132px 0px;
}
ul.order_mainr li span {
  font-size: 20px;
  color: #666666;
  margin: 0px 14px 0px 28px;
  vertical-align: middle;
}
ul.order_mainr li em {
  color: #eb5169;
  font-size: 34px;
  vertical-align: middle;
}
ul.order_mainr li:first-child {
  margin-left: 55px;
}
ul.order_mainr li:nth-child(2) {
  margin-left: 122px;
}
ul.order_mainr li:last-child {
  margin-left: 143px;
}
ul.order_mainr.order_mains li:first-child i {
  background-position: 0px -63px;
}
ul.order_mainr.order_mains li:nth-child(2) i {
  background-position: -64px -63px;
}
ul.order_mainr.order_mains li:last-child i {
  background-position: -132px -62px;
}
.order_mainu {
  width: 455px;
  margin-left: 8px;
}
.order_mainu h5 {
  line-height: 20px;
  font-weight: normal;
  color: #666666;
  font-size: 14px;
}
.order_mainu p {
  color: #999999;
  font-size: 14px;
  margin-top: 20px;
}
.order_maint img {
  margin-top: 10px;
  cursor: pointer;
}
/*消费版块 */
.xhje_a {
  border: 1px solid #cccccc;
  font-size: 16px;
  color: #999999;
  width: 241px;
  padding: 10px 20px 20px 20px;
  position: relative;
}
.xhje_a h4 {
  color: #666666;
  font-size: 16px;
  font-weight: normal;
  text-align: center;
  margin-bottom: 5px;
}
.xhje_a p {
  line-height: 26px;
}
.xhje_a img {
  margin-top: -21px;
  position: absolute;
  left: 45%;
}
/* 会话框 */
.dialog_a {
  width: 100%;
  background: #ffffff; /*margin: auto; position:fixed;top: 0;left: 50%;margin-left: -380px; display: none; height:100%;*/
}
.dialog_a.show {
  display: block;
}
.dialog_b {
  background: url(/static/images/ht_hoverc.jpg) no-repeat;
  width: 100%;
  height: 180px;
}
.dialog_b.details {
  background: url(/static/images/details_problem_header.jpg) no-repeat;
  width: 100%;
  height: 180px;
}
.dialog_b img {
  float: right;
  margin: 20px 10px 0px 0px;
  cursor: pointer;
}
.dialog_c {
  width: 1034px;
  height: 918px;
  overflow-y: scroll;
  overflow-x: hidden;
  margin: 0 auto;
  overflow-y: auto;
  padding: 0 30px;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
}
.dialog_c h4.dialog_d {
  font-weight: normal;
  font-size: 30px;
  color: #333;
  line-height: 28px;
  margin-top: 18px;
}
.dialog_c .dialog_d img {
  margin-right: 6px;
  vertical-align: middle;
}
.dialog_c p.dialog_e {
  margin-left: 16px; /*width: 729px;*/
  color: #666666;
  font-size: 16px;
  padding-left: 17px;
  margin-top: 14px;
  line-height: 32px;
  border-bottom: 1px solid #cccccc;
  padding-bottom: 20px;
}
.dialog_c .dialog_d span {
  margin-left: 5px;
  display: inline-block;
  border-bottom: 9px solid transparent;
  box-sizing: border-box;
  background-clip: padding-box, border-box;
  background-origin: padding-box, border-box;
  background-image: linear-gradient(90deg, #fff, #fff),
    linear-gradient(90deg, #b6f4fe, #e6a1fd);
}
.dialog_c .dialog_d p {
  line-height: 5px;
  margin: 0px 6px;
  color: #333;
  font-size: 18px;
}
.dialog_c .dialog_f {
  line-height: 40px;
  margin-left: 31px;
  color: #333;
}
.dialog_c .dialog_f i {
  color: #333;
  font-size: 16px;
  font-style: italic;
}
.dialog_c .dialog_f a {
  color: #333;
  font-size: 16px;
  margin-left: 10px;
}
.dialog_c p.dialog_g {
  margin-left: 31px;
  font-size: 16px;
  color: #333;
  line-height: 28px;
  margin-top: 5px;
  a {
    color: #666;
  }
}
.dialog_c img.dialog_h {
  margin: 20px auto 10px 31px;
}
p.dialog_i {
  color: #666666;
  font-size: 16px;
  margin-left: 31px;
  line-height: 36px;
}
ul.dialog_j {
  margin-left: 31px;
}
ul.dialog_j li {
  line-height: 38px;
  color: #666;
  a {
    color: #666;
  }
}
ul.dialog_j li img {
  vertical-align: middle;
  margin-right: 10px;
}
p.dialog_k {
  border-bottom: 1px solid #cccccc;
  padding-bottom: 10px;
}
.datepicker {
  background: #fff;
  position: fixed;
  z-index: 10;
  border: 1px solid #ebebeb;
}
.datepicker .datepicker-days {
  background: #fff;
}
.datepicker th,
.datepicker td {
  width: 20px !important;
  height: 20px !important;
  padding: 10px !important;
}
.datepicker thead th {
  background: #fff !important;
  color: #333;
}
.datepicker .today {
  background: #286090 !important;
  color: #fff !important;
}
.dialog_a {
  width: 811px;
  height: 78%;
  background: #ffffff;
  margin: auto;
  position: fixed;
  top: 0;
  left: 50%;
  margin-left: -380px;
}
.dialog_c {
  width: 100%;
  height: 100%;
  background: #fff;
}
</style>
