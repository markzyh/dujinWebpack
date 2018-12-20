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
            :class="{radio_checked:nowIndex === index}"
            @click="chooseOrderType(index)"
          >
          <span>
            {{item.name}}
            <img
              src="../../assets/order_tips_description_tri.jpg"
              alt
              class="order_tips_description_tri"
              v-if="nowIndex === index && nowIndex != 0"
              :class="{show:nowIndex === index}"
            >
          </span>
          <transition name="show">
            <div
              class="customtype_form"
              v-if="nowIndex === index && nowIndex != 0"
              :class="{show:nowIndex === index}"
            >
              <!-- <div class="customtype_form"> -->
              <div class="customtype_form_group">性别（单选）:
                <div
                  v-for="(item,index) in sexLists"
                  :key="index"
                  :class="{checked:userSexIndex === index}"
                  @click="chooseParmas(index,'userSexIndex','sexLists')"
                  class="customtype_form_btn"
                >{{item}}</div>
              </div>
              <div class="customtype_form_group">年龄（多选）:
                <div
                  v-for="(item,index) in ageLists"
                  :key="index"
                  :class="{checked:userAgeIndex.indexOf(index) != -1}"
                  @click="chooseAge(index)"
                  class="customtype_form_btn"
                >{{item}}</div>
              </div>
              <div class="customtype_form_group">地域（单选）:
                <div v-for="(item,index) in regionLists" :key="index" class="region_btn_pos">
                  <div
                    class="customtype_form_btn"
                    :class="{checked:userRegionIndex === index}"
                    @click="chooseRegion(index,'userRegionIndex','regionLists')"
                  >{{item}}</div>
                  <div
                    class="order_provice"
                    v-if="isShowProvince && userRegionIndex === index"
                    :class="{nearby:userRegionIndex === 4}"
                  >
                    <img
                      src="../../assets/order_tips_description_tri.jpg"
                      alt
                      class="order_tips_description_tri"
                    >
                    <h3>{{chooseRegionTitle}}</h3>
                    <!-- 省部分 -->
                    <div
                      class="provice_name_lists"
                      v-if="index === 1 || index === 2 || index === 3"
                    >
                      <div v-for="(item,index) in proviceLists" :key="index" class="provice_name">
                        <b
                          @click="chooseProvice(index)"
                          :class="{checked:chooseProviceIndex === index}"
                        >{{item.name}}</b>
                      </div>
                    </div>
                    <!-- 市部分 -->
                    <div class="provice_cities" v-if="index === 1 || index === 2 || index === 3">
                      <div
                        class
                        v-for="(item,index) in proviceLists"
                        :key="index"
                        v-if="chooseProviceIndex === index"
                      >
                        <span @click="chooseAll(index,'cities')" v-if="!ischooseCitiesRadio">全部</span>
                        <!-- 多选 -->
                        <span
                          v-for="(items,index) in item.cities"
                          :key="index"
                          :class="{checked:choosecitiesArray.indexOf(index) != -1 }"
                          @click="chooseCities(index)"
                          v-if="!ischooseCitiesRadio"
                        >{{items.name}}</span>
                        <!-- 单选 -->
                        <span
                          v-for="(items,index) in item.cities"
                          :key="index"
                          :class="{checked:chooseCitiesIndex === index}"
                          @click="chooseCities(index)"
                          v-if="ischooseCitiesRadio"
                        >{{items.name}}</span>
                      </div>
                    </div>
                    <!-- 区部分 -->
                    <div class="provice_area provice_cities" v-if="index === 2 || index === 3">
                      <div
                        class="dis-inline provice"
                        v-for="(item,index) in proviceLists"
                        v-if="chooseProviceIndex === index"
                        :key="index"
                      >
                        <div
                          class="dis-inline cities"
                          v-for="(cities,indexs) in item.cities"
                          v-if="chooseCitiesIndex === indexs"
                          :key="indexs"
                        >
                          <span
                            @click="chooseAll(indexs,'counties')"
                            v-if="userRegionIndex === 2"
                          >全部区县</span>
                          <!-- 多选部分 -->
                          <span
                            v-if="!ischooseCountiesRadio"
                            v-for="(counties,index) in cities.counties"
                            :class="{checked:chooseCountiesArray.indexOf(index) != -1}"
                            @click="chooseCounties(index)"
                            :key="index"
                          >{{counties.name}}</span>
                          <!-- 单选部分 -->
                          <span
                            v-if="ischooseCountiesRadio"
                            v-for="(counties,index) in cities.counties"
                            :class="{checked:chooseCountiesIndex === index}"
                            @click="chooseCounties(index)"
                            :key="index"
                          >{{counties.name}}</span>
                        </div>
                      </div>
                    </div>
                    <!-- 商圈部分 -->
                    <div class="provice_area provice_cities" v-if="index === 3">
                      <div
                        class="dis-inline provice"
                        v-for="(item,index) in proviceLists"
                        v-if="chooseProviceIndex === index"
                        :key="index"
                      >
                        <div
                          class="dis-inline cities"
                          v-for="(cities,index) in item.cities"
                          v-if="chooseCitiesIndex === index"
                          :key="index"
                        >
                          <div
                            class="dis-inline counties"
                            v-for="(counties,index) in cities.counties"
                            v-if="chooseCountiesIndex === index"
                            :key="index"
                          >
                            <span @click="chooseAll(index,'circles')">全部商圈</span>
                            <span
                              class="dis-inline circles"
                              v-for="(circles,index) in counties.circles"
                              :class="{checked:chooseCirclesArray.indexOf(index) != -1}"
                              @click="chooseCircles(index)"
                              :key="index"
                            >{{circles.name}}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- 附近部分 -->
                    <div class="province_nearby" v-if="index === 4">
                      <!-- <input type="text" class="input_address" v-model="userInputAddressName"
                                                        @change="userInputAddress"><input type="button" onclick="localMap();"
                      value="添加" class="add_input_address">-->
                      <input type="text" class="input_address" v-model="userInputAddressName">
                      <input
                        type="button"
                        value="确认"
                        class="add_input_address"
                        @click="userInputAddress"
                      >
                      <p>设置投放半径</p>
                      <div id="dist-sel">
                        <div
                          class="dis-inline nearby_group"
                          v-for="(item,index) in customRangeLists"
                          :class="{checked:choosedRangeIndex === index,outchecked:choosedRangeIndex > index}"
                          :key="index"
                        >
                          <input
                            type="radio"
                            name="RadioGroup1"
                            :value="choosedRangeValue"
                            @click="chooseNearbyKm(index)"
                            @change="showRange"
                            :checked="choosedRangeIndex === index"
                          >
                          <div class="nearby_km">{{item.name}}</div>
                          <h6 v-if="index != 4"></h6>
                        </div>
                        <div
                          class="add_nearby_km dis-inline"
                          @click="addNearbyKmList"
                        >{{addNearbyKm}}</div>
                      </div>
                      <div id="allmap" ref="allmap"></div>
                    </div>
                    <div class="region_choosed" v-if="index != 4">
                      已选：{{choosedValue}}
                      <!-- <span v-for="(item,index) in "></span>  -->
                    </div>
                    <div class="region_choosed" v-if="index === 4">
                      已选区域：
                      <span
                        v-for="(item,index) in choosedNearbyLists"
                        v-if="choosedNearbyLists.length >= 0"
                        :key="index"
                      >
                        {{item.name}}{{item.km}}&nbsp;&nbsp;
                        <b
                          class="deleteChoosedNearby"
                          @click="deleteChoosedNearby(index)"
                        >x</b>&nbsp;&nbsp;
                      </span>
                      <!-- <span v-for="(item,index) in "></span>  -->
                    </div>
                    <div class="confirm_provice" @click="confirmProvice(index)">确定</div>
                  </div>
                </div>
              </div>
              <div class="order_choosed_params">已选择
                <!--<span>性别 : {{choosedSex}}</span><span>年龄 :
                {{choosedAge.toString()}}</span>-->
                <span>
                  <!-- 地域 : -->
                  {{choosedValue}}
                </span>
              </div>
            </div>
          </transition>
        </div>
      </div>
      <div class="order_choosed_params" v-if="isShowDefaultValue">
        已选择
        <span>性别 : {{choosedSex}}</span>
        <span>年龄 : {{choosedAge.toString()}}</span>
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
              <!-- {{incrementNumber}} -->
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
      <h3>
        <img src="../../assets/pay_success_03.jpg" alt>
        <span v-if="balance !== 0">投放成功</span>
        <span v-if="balance == 0">未支付</span>
      </h3>
      <h6 v-if="balance == 0">您的订单尚未支付
        <br>请等待客户经理联系您充值后开始投放
      </h6>
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
import axios from "axios";
export default {
  name: "",
  data() {
    return {
      loading: false,
      balance: "", //用户账户余额
      douyinId: "", //抖音Id
      userName: "", //用户抖音昵称
      userInputAddressName: "", //用户输入的地址
      oldAddress: "",
      isPaySuccess: false, //最后,是否提交成功
      successCountDownNumber: 3, //成功后的倒计时
      userIsLogin: false, //用户是否登录
      nowIndex: 0, //投放方式的index值
      nowPayIndex: 0,
      incrementNumber: 40000, //预计播放提升量
      nowPayAutoIndex: 3, //点击选择充值金额的index
      payNumberValue: 800, //充值金额
      customPayNumber: "¥ 请输入金额", //自定义充值金额
      isShowDefaultValue: false,
      showUserInputMoney: true, //是否显示用户自定义金额
      userAgeIndex: [1],
      userSexIndex: 0,
      userRegionIndex: 0,
      clickProviceIndex: 0, //控制显示省
      isShowcitiesIndex: 0, //控制显示城市
      //chooseProviceArray:[0],
      chooseProviceIndex: 0, //单选择省
      choosecitiesArray: [0], //多选择市数组
      chooseCitiesIndex: 0, //单选城市
      chooseCountiesArray: [0], //多选县区数组
      chooseCountiesIndex: 0, //单选县区
      chooseCirclesArray: [0], //多选商圈数组
      //chooseCountiesIndex:0,//单选县区
      ischooseCitiesRadio: false, //控制城市是否单选
      ischooseCountiesRadio: false, //控制区县是否单选
      orderLink: "请输入您所要投放的链接",
      orderTypeName: "智能投放", //投放方式
      userSex: "不限",
      userAge: "18-22岁",
      submitAddress: "", //手动输入的地址
      choosedValue: "全国", //已经选择地区
      choosedSex: "不限", //选择的性别
      choosedAge: ["18-23岁"], //选择的年龄数组
      chooseRegionTitle: "", //地域选择的title值
      choosedRegion: "", //已经选择的地区
      choosedFlag: false, //是否已经选择过地区
      isShowCustomForm: true,
      isShowProvince: false,
      isShowProvinceTrueIndex: false,
      submitAddressRangeList: [
        //手动输入地址覆盖的范围
        {
          name: "1km",
          value: 1
        },
        {
          name: "5km",
          value: 5
        },
        {
          name: "8km",
          value: 8
        }
      ],
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
      sexLists: ["不限", "男", "女"],
      ageLists: ["不限", "18-23岁", "24-40岁", "40岁+"],
      regionLists: ["全国", "省市", "区县", "商圈", "附近"],
      proviceLists: [],
      choosedRangeIndex: 0, //已经选择的辐射范围的数组下标
      addNearbyKm: "+添加", //添加辐射km按钮的值
      choosedRangeValue: 4000, //单选按钮,选择的辐射范围的具体值
      isFirstChooseAll: false,
      choosedNearbyLists: [], //已经选择完附近,添加了的记录的数组
      customRangeLists: [
        //自定义商圈的辐射范围数组
        {
          name: "6km",
          value: 6000
        },
        {
          name: "8km",
          value: 8000
        },
        {
          name: "10km",
          value: 10000
        },
        {
          name: "12km",
          value: 12000
        },
        {
          name: "15km",
          value: 15000
        }
      ],
      mapRange: "" //辐射的值
    };
  },
  methods: {
    confirmOrder() {
      if (this.orderLink == "" || this.orderLink == "请输入您所要投放的链接") {
        this.$Notification({
          title: "温馨提示",
          message: "投放链接不能为空!",
          type: "warning"
        });
        return false;
      }
      //this.loading = true//加载
      var _this = this;
      var token = this.getCookie("token");
      //debugger
      //console.log(this)
      var orderTypeName = this.orderTypeName;
      var link = this.orderLink;
      //var customData = this.choosedSex.toString()+this.choosedAge.toString()+this.choosedValue
      var payNumber = this.payNumberValue;
      //var data = "链接:"+link+"用户自定义信息:"+customData+"投放金额:"+payNumber
      //console.log(data)
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
                _this.isPaySuccess = false;
                window.location.href = "/dist/#/order-center";
              }
            }, 1000);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //选择地域最下面的确认按钮,只用来关闭窗口
    confirmProvice: function(index) {
      console.log(index + "测试index");
      //this.isShowProvince = false
      this.showProvinceForm(false);
      console.log(this.isShowProvince);
    },
    getChoosedValue: function() {
      //console.log(this.chooseProviceIndex+'index')
      var choosedProvice = this.proviceLists[this.chooseProviceIndex].name; //省名字
      if (this.ischooseCitiesRadio == false) {
        //城市多选时
        var choosedCitiesArray = this.choosecitiesArray; //多选择市数组
        //console.log(choosedCitiesArray+"市区数组")
        var choosedCitiesName = [];
        for (var i = 0; i < choosedCitiesArray.length; i++) {
          var item = choosedCitiesArray[i];
          //console.log(item+"遍历市区数组值")
          var thisCities = this.proviceLists[this.chooseProviceIndex].cities;
          //console.log(thisCities.length+'省级下市区的长度')
          choosedCitiesName.push(thisCities[item].name);
          //console.log(thisCities[item].name+'市区的名字'+"item"+item)
        }
        //console.log(choosedCitiesName+'----------市区名称的数组')
        var choosedCitiesString = choosedCitiesName.join(",");
        //console.log(choosedCitiesString)
        this.choosedValue = choosedProvice + "-" + choosedCitiesString;
      }
      if (this.ischooseCitiesRadio == true) {
        //城市单选时
        var _this = this.proviceLists[this.chooseProviceIndex].cities;
        var choosedRadioCities = _this[this.chooseCitiesIndex].name; //单选的城市名称
        if (this.ischooseCountiesRadio == false) {
          var choosedCountiesArray = this.chooseCountiesArray; //多选择区数组
          //console.log(choosedCitiesArray+"市区数组")
          var choosedCountiesName = [];
          for (var i = 0; i < choosedCountiesArray.length; i++) {
            var item = choosedCountiesArray[i];
            choosedCountiesName.push(
              _this[this.chooseCitiesIndex].counties[item].name
            );
          }
          this.choosedValue =
            choosedProvice +
            "-" +
            choosedRadioCities +
            "---" +
            choosedCountiesName.join(",");
        } else {
          var choosedRadioCounties =
            _this[this.chooseCitiesIndex].counties[this.chooseCountiesIndex]
              .name; //单选,县区的名字
          var choosedCirclesName = [];
          var choosedCirclesArray = this.chooseCirclesArray; //多选择区数组
          for (var i = 0; i < choosedCirclesArray.length; i++) {
            var item = choosedCirclesArray[i];
            choosedCirclesName.push(
              _this[this.chooseCitiesIndex].counties[this.chooseCountiesIndex]
                .circles[item].name
            );
          }
          this.choosedValue =
            choosedProvice +
            "-" +
            choosedRadioCities +
            "-" +
            choosedRadioCounties +
            "---" +
            choosedCirclesName.join(",");
        }
      }
      /*         if(this.ischooseCitiesRadio == true && this.ischooseCountiesRadio == true){//都单选时
                      } */
    },
    chooseAll: function(index, attr) {
      //全选
      var _this = this.proviceLists[this.chooseProviceIndex];
      this.clearchooseAll(); //全选前先全部清空数组
      this.isFirstChooseAll = !this.isFirstChooseAll;
      if (this.isFirstChooseAll == true) {
        if (this.userRegionIndex === 1) {
          //省市选择
          //alert(0)
          for (var i = 0; i < _this.cities.length; i++) {
            this.choosecitiesArray.push(i);
          }
        } else if (this.userRegionIndex === 2) {
          //区选择
          for (
            var i = 0;
            i < _this.cities[this.chooseCitiesIndex].counties.length;
            i++
          ) {
            this.chooseCountiesArray.push(i);
          }
        } else if (this.userRegionIndex === 3) {
          //商圈选择
          for (
            var i = 0;
            i <
            _this.cities[this.chooseCitiesIndex].counties[
              this.chooseCountiesIndex
            ].circles.length;
            i++
          ) {
            this.chooseCirclesArray.push(i);
          }
        }
        this.getChoosedValue();
      }
      //console.log(this.choosecitiesArray)
    },
    //删除一天附近投放记录
    deleteChoosedNearby: function(index) {
      this.choosedNearbyLists.splice(index, 1);
      this.oldAddress = "";
    },
    //添加一条附近投放的记录
    addNearbyKmList: function() {
      if (
        this.oldAddress != "" &&
        this.oldAddress == this.userInputAddressName
      ) {
        this.$Notification({
          title: "温馨提示",
          message: "您选择的地址重复了!",
          type: "warning"
        });
        return false;
      }
      var address = this.userInputAddressName;
      this.oldAddress = this.userInputAddressName;
      var km = this.customRangeLists[this.choosedRangeIndex].name;
      var obj = {
        name: address,
        km: km
      };
      if (address == "") {
        this.$Notification({
          title: "温馨提示",
          message: "地址为空,请您先输入您要投放的地址!",
          type: "warning"
        });
        return false;
      } else {
        this.choosedNearbyLists.push(obj); //将已经选择的,地域+km的对象,存入数组中
        var array = [];
        for (var i = 0; i < this.choosedNearbyLists.length; i++) {
          //遍历数组,数组的每一项都是对象
          array[i] =
            this.choosedNearbyLists[i].name.toString() +
            "    " +
            this.choosedNearbyLists[i].km.toString();
        }
        //this.choosedValue//这是最后提交时的地址
        this.choosedValue = array.join(",");
        console.log(this.choosedValue);
      }
    },
    //输入地址的地图
    localMap() {
      let map = this.openMap();
      map.clearOverlays(); //先清除地图标注
      let values = this.userInputAddressName;
      let myGeo = new BMap.Geocoder();
      myGeo.getPoint(
        values,
        point => {
          if (point) {
            let mPoint = new BMap.Point(point.lng, point.lat);
            map.enableScrollWheelZoom();
            map.centerAndZoom(mPoint, 12);
            let marker = new BMap.Marker(mPoint); // 创建标注
            map.addOverlay(marker);
            let range = this.choosedRangeValue;
            let circle = new BMap.Circle(mPoint, range, {
              fillColor: "blue",
              strokeWeight: 1,
              fillOpacity: 0.2,
              strokeOpacity: 0.2
            });
            map.addOverlay(circle);
          }
        },
        "myFun"
      );
    },
    //本地地图
    openshMap() {
      let map = this.openMap();
      function myFun(result) {
        let cityName = result.name;
        map.setCenter(cityName);
      }
      let myCity = new BMap.LocalCity();
      myCity.get(myFun);
    },
    openMap() {
      //let promise = new Promise((resolve, reject) => {
      let map = new BMap.Map("allmap");
      let point = new BMap.Point(116.331398, 39.897445);
      map.centerAndZoom(point, 12);
      return map;
    },
    //用户输入框输入地址,change事件
    userInputAddress: function() {
      //alert()
      if (this.userInputAddressName == "") {
        this.$Notification({
          title: "温馨提示",
          message: "地址为空,请输入您要投放的具体地址!",
          type: "warning"
        });
      } else {
        this.localMap();
      }
    },
    //单选框change事件,显示改变的辐射范围
    showRange: function() {
      this.localMap();
    },
    //点击选择辐射范围,几km
    chooseNearbyKm: function(index) {
      this.choosedRangeIndex = index;
      this.choosedRangeValue = this.customRangeLists[index].value;
    },
    //选择附近
    chooseNearby: function() {
      this.openshMap();
    },
    //选择商圈
    chooseCircles: function(index) {
      //选择商圈
      if (this.chooseCirclesArray.indexOf(index) == -1) {
        this.chooseCirclesArray.push(index);
        console.log(this.chooseCirclesArray + "城市数组");
      } else {
        //找到点击的index在数组中的位置
        for (var i = 0; i < this.chooseCirclesArray.length; i++) {
          if (this.chooseCirclesArray[i] == index) {
            //i为点击的数字在数组中的位置
            this.chooseCirclesArray.splice(i, 1);
          }
        }
      }
      this.getChoosedValue();
    },
    chooseCounties: function(index) {
      if (this.ischooseCountiesRadio == false) {
        //区县单选时
        if (this.chooseCountiesArray.indexOf(index) == -1) {
          this.chooseCountiesArray.push(index);
          console.log(this.chooseCountiesArray + "城市数组");
        } else {
          //找到点击的index在数组中的位置
          for (var i = 0; i < this.chooseCountiesArray.length; i++) {
            if (this.chooseCountiesArray[i] == index) {
              //i为点击的数字在数组中的位置
              this.chooseCountiesArray.splice(i, 1);
            }
          }
        }
      } else {
        this.chooseCountiesIndex = index; //8
        //alert(0)
      }
      this.getChoosedValue();
    },
    clearchooseAll: function() {
      this.choosecitiesArray = [];
      this.chooseCountiesArray = [];
      this.chooseCirclesArray = [];
    },
    chooseCities: function(index, length) {
      //console.log()
      //this.clearchooseAll()
      if (this.ischooseCitiesRadio == false) {
        if (this.choosecitiesArray.indexOf(index) == -1) {
          this.choosecitiesArray.push(index);
          console.log(this.choosecitiesArray + "城市数组");
        } else {
          //找到点击的index在数组中的位置
          for (var i = 0; i < this.choosecitiesArray.length; i++) {
            if (this.choosecitiesArray[i] == index) {
              //i为点击的数字在数组中的位置
              this.choosecitiesArray.splice(i, 1);
            }
          }
        }
      } else {
        this.chooseCitiesIndex = index;
      }
      this.getChoosedValue();
    },
    showProvinceForm: function(attr) {
      this.isShowProvince = attr;
    },
    chooseProvice: function(index) {
      this.isShowcitiesIndex = index;
      this.chooseProviceIndex = index;
      //this.choosecitiesArray = []
      this.clearchooseAll();
      this.getChoosedValue(index);
    },
    //选择投放区域
    chooseRegion: function(index, attr, array) {
      if (index === 0) {
        this.choosedValue = "全国";
        this.showProvinceForm(false);
        this.ischooseCitiesRadio = false;
      } else if (index === 1) {
        this.chooseRegionTitle = "按省市选择";
        this.showProvinceForm(true);
        this.ischooseCitiesRadio = false;
      } else if (index === 2) {
        this.chooseRegionTitle = "按区县选择";
        this.showProvinceForm(true);
        this.ischooseCitiesRadio = true;
      } else if (index === 3) {
        this.chooseRegionTitle = "按商圈选择";
        this.showProvinceForm(true);
        this.ischooseCitiesRadio = true; //城市变为单选
        this.ischooseCountiesRadio = true; //区县为单选
      } else if (index === 4) {
        //选择附近
        this.chooseRegionTitle = "自定义商圈";
        this.showProvinceForm(true); //显示悬浮框
        this.choosedValue = "";
        var _this = this;
        setTimeout(function() {
          //异步的原因是v-if了,dom节点可能没有加载出来
          _this.chooseNearby(); //初始化地图
        }, 20);
        //this.chooseNearby()//初始化地图
        //alert(0)
      } else {
        this.showProvinceForm(false);
        this.ischooseCitiesRadio = false; //城市变为单选
      }
      if (this.choosedFlag == true && index != this.userRegionIndex) {
        this.$MessageBox.alert(
          "地域只支持单选,如果选择其他区域,已选择的地域将会失效",
          "修改地域选择",
          {
            confirmButtonText: "确定",
            type: "warning",
            callback: action => {
              this.choosedValue = ""; //切换地域选择方式后,清空已经选择的
              this.clearchooseAll(); //清空已经选择的,已经添加到数组中的值
              if (index === 0) {
                this.choosedValue = "全国";
              }
            }
          }
        );
      }
      this.choosedFlag = true; //改变状态,证明已经选择过地区了
      //this.chooseParmas(index,attr,array)
      this[attr] = index; //单选事件,改变单选的值
      //var _this = this //es5
    },
    //年龄选择按钮
    chooseAge: function(index) {
      if (this.userAgeIndex.indexOf(index) === -1) {
        this.userAgeIndex.push(index);
      } else {
        //找到点击的index在数组中的位置
        for (var i = 0; i < this.userAgeIndex.length; i++) {
          if (this.userAgeIndex[i] == index) {
            //i为点击的数字在数组中的位置
            this.userAgeIndex.splice(i, 1);
          }
        }
      }
      var choosedAgeArray = [];
      for (var j = 0; j < this.userAgeIndex.length; j++) {
        choosedAgeArray.push(this.ageLists[j]);
        //console.log(this.ageLists[j]+'年龄组')
      }
      this.choosedAge = choosedAgeArray;
      console.log(choosedAgeArray + "---------------已经改变的年龄组");
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
      console.log(this.nowPayAutoIndex + "---------------手动选择金额");
      this.nowPayAutoIndex = index;
      console.log(this.nowPayAutoIndex + "---------------手动选择金额");
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
      this.nowIndex = index;
      //选择投放方式后,显示默认值
      if (index === 1) {
        //选择自定义投放之后
        this.payNumberValue = 500;
        this.orderTypeName = "自定义投放";
        this.isShowDefaultValue = true; //是否显示默认选中的数据的值,比如年龄之类
        this.nowPayAutoIndex = 2; //选择自定义后,金额默认到第3个
        //            this.incrementNumber = 4000//默认提升量
        if (this.proviceLists.length == 0) {
          //只获取一次,有值就不再获取
          var _this = this; //es5
          axios.get("http://dou.fudayiliao.com/order/region").then(res => {
            //需要使用箭头函数
            console.log(res);
            _this.proviceLists = res.data; //给本地数组赋值,值就是大的json文件
          });
        }
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
      if (this.nowIndex == 0) {
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
      if (this.nowIndex == 1) {
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
          console.log(res);
          if (res.data.Data.balance) {
            this.balance = res.data.Data.balance;
          } else {
            this.balance = 0;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: {
    limitMoney: function() {
      if (this.nowIndex == 0) {
        return 800;
      }
      if (this.nowIndex == 1) {
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
      if (this.nowIndex == 0) {
        //选择智能投放时
        return 3;
      }
      if (this.nowIndex == 1) {
        //选择智能投放时
        return 2;
      }
    },
    increNumber: function() {
      if (
        (this.nowIndex == 1 &&
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
        (this.nowIndex == 1 &&
          this.nowPayIndex != 0 &&
          this.userRegionIndex == 3) ||
        this.userRegionIndex == 4
      ) {
        //当自定义投放下,商圈和附近,且手动输入金额
        var base = 3300;
        //this.payNumberValue/100 //100的多少倍
        return parseInt((base * this.payNumberValue) / 100);
      }
      if (this.nowIndex == 0 && this.nowPayIndex == 0) {
        //智能投放下的点击选择金额
        var base = 5000; //基数5000
        if (this.nowPayAutoIndex == 3) {
          return base * 8;
        } else {
          return base * (this.nowPayAutoIndex - 2) * 5;
        }
      }
      if (this.nowIndex == 0 && this.nowPayIndex != 0) {
        //智能投放下的自定义输入金额
        var base = 5000; //基数5000
        //alert(this.customPayNumber)
        //this.payNumberValue/100 //100的多少倍
        return parseInt((base * this.payNumberValue) / 100);
      }
      if (this.nowIndex == 1 && this.nowPayIndex == 0) {
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
      if (this.nowIndex == 1 && this.nowPayIndex != 0) {
        //自定义投放下的自定义输入金额
        var base = 4000;
        return parseInt((base * this.payNumberValue) / 100);
      }
    }
  },
  mounted: function() {
    this._getUsermessage(); //cookie获取用户账号名
    this.getUserInfo(); //获取用户的余额
  },
  beforeCreate() {
    //alert(0)
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
.pay_success h6 {
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
  display: none;
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