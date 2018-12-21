<template>
  <div class="region-component">
    <!--  <transition name="show"> -->
    <div class="customtype_form">
      <div class="customtype_form_group">性别（单选）:
        <div v-for="(item,index) in sexLists" :key="index" :class="{checked:userSexIndex === index}" @click="chooseParmas(index,'userSexIndex','sexLists')"
          class="customtype_form_btn">{{item}}</div>
      </div>
      <div class="customtype_form_group">年龄（多选）:
        <div v-for="(item,index) in ageLists" :key="index" :class="{checked:userAgeIndex.indexOf(index) != -1}" @click="chooseAge(index)"
          class="customtype_form_btn">{{item}}</div>
      </div>
      <div class="customtype_form_group">地域（单选）:
        <div v-for="(item,index) in regionLists" :key="index" class="region_btn_pos">
          <div class="customtype_form_btn" :class="{checked:userRegionIndex === index}" @click="chooseRegion(index,'userRegionIndex','regionLists')">{{item}}</div>
          <div class="order_provice" v-if="isShowProvince && userRegionIndex === index" :class="{nearby:userRegionIndex === 4}">
            <img src="../../assets/order_tips_description_tri.jpg" alt class="order_tips_description_tri">
            <h3>{{chooseRegionTitle}}</h3>
            <!-- 省部分 -->
            <div class="provice_name_lists" v-if="index === 1 || index === 2 || index === 3">
              <div v-for="(item,index) in proviceLists" :key="index" class="provice_name">
                <b @click="chooseProvice(index)" :class="{checked:chooseProviceIndex === index}">{{item.name}}</b>
              </div>
            </div>
            <!-- 市部分 -->
            <div class="provice_cities" v-if="index === 1 || index === 2 || index === 3">
              <div class v-for="(item,index) in proviceLists" :key="index" v-if="chooseProviceIndex === index">
                <span @click="chooseAll(index,'cities')" v-if="!ischooseCitiesRadio">全部</span>
                <!-- 多选 -->
                <span v-for="(items,index) in item.cities" :key="index" :class="{checked:choosecitiesArray.indexOf(index) != -1 }"
                  @click="chooseCities(index)" v-if="!ischooseCitiesRadio">{{items.name}}</span>
                <!-- 单选 -->
                <span v-for="(items,index) in item.cities" :key="index" :class="{checked:chooseCitiesIndex === index}"
                  @click="chooseCities(index)" v-if="ischooseCitiesRadio">{{items.name}}</span>
              </div>
            </div>
            <!-- 区部分 -->
            <div class="provice_area provice_cities" v-if="index === 2 || index === 3">
              <div class="dis-inline provice" v-for="(item,index) in proviceLists" v-if="chooseProviceIndex === index"
                :key="index">
                <div class="dis-inline cities" v-for="(cities,indexs) in item.cities" v-if="chooseCitiesIndex === indexs"
                  :key="indexs">
                  <span @click="chooseAll(indexs,'counties')" v-if="userRegionIndex === 2">全部区县</span>
                  <!-- 多选部分 -->
                  <span v-if="!ischooseCountiesRadio" v-for="(counties,index) in cities.counties" :class="{checked:chooseCountiesArray.indexOf(index) != -1}"
                    @click="chooseCounties(index)" :key="index">{{counties.name}}</span>
                  <!-- 单选部分 -->
                  <span v-if="ischooseCountiesRadio" v-for="(counties,index) in cities.counties" :class="{checked:chooseCountiesIndex === index}"
                    @click="chooseCounties(index)" :key="index">{{counties.name}}</span>
                </div>
              </div>
            </div>
            <!-- 商圈部分 -->
            <div class="provice_area provice_cities" v-if="index === 3">
              <div class="dis-inline provice" v-for="(item,index) in proviceLists" v-if="chooseProviceIndex === index"
                :key="index">
                <div class="dis-inline cities" v-for="(cities,index) in item.cities" v-if="chooseCitiesIndex === index"
                  :key="index">
                  <div class="dis-inline counties" v-for="(counties,index) in cities.counties" v-if="chooseCountiesIndex === index"
                    :key="index">
                    <span @click="chooseAll(index,'circles')">全部商圈</span>
                    <span class="dis-inline circles" v-for="(circles,index) in counties.circles" :class="{checked:chooseCirclesArray.indexOf(index) != -1}"
                      @click="chooseCircles(index)" :key="index">{{circles.name}}</span>
                  </div>
                </div>
              </div>
            </div>
            <!-- 附近部分 -->
            <div class="province_nearby" v-if="index === 4">
              <input type="text" class="input_address" v-model="userInputAddressName">
              <input type="button" value="确认" class="add_input_address" @click="userInputAddress">
              <p>设置投放半径</p>
              <div id="dist-sel">
                <div class="dis-inline nearby_group" v-for="(item,index) in customRangeLists" :class="{checked:choosedRangeIndex === index,outchecked:choosedRangeIndex > index}"
                  :key="index">
                  <input type="radio" name="RadioGroup1" :value="choosedRangeValue" @click="chooseNearbyKm(index)"
                    @change="showRange" :checked="choosedRangeIndex === index">
                  <div class="nearby_km">{{item.name}}</div>
                  <h6 v-if="index != 4"></h6>
                </div>
                <div class="add_nearby_km dis-inline" @click="addNearbyKmList">{{addNearbyKm}}</div>
              </div>
              <div id="allmap" ref="allmap"></div>
            </div>
            <div class="region_choosed" v-if="index != 4">已选：{{choosedValue}}</div>
            <div class="region_choosed" v-if="index === 4">
              已选区域：
              <span v-for="(item,index) in choosedNearbyLists" v-if="choosedNearbyLists.length >= 0" :key="index">
                {{item.name}}{{item.km}}&nbsp;&nbsp;
                <b class="deleteChoosedNearby" @click="deleteChoosedNearby(index)">x</b>&nbsp;&nbsp;
              </span>
            </div>
            <div class="confirm_provice" @click="confirmProvice(index)">确定</div>
          </div>
        </div>
      </div>
      <div class="order_choosed_params">
        已选择
        <span>{{choosedValue}}</span>
      </div>
    </div>
    <!-- </transition> -->
  </div>
</template>

<script>
  export default {
    props: {
      putwayIndex: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        userInputAddressName: "", //用户输入的地址
        oldAddress: "",
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
      //选择地域最下面的确认按钮,只用来关闭窗口
      confirmProvice(index) {
        this.showProvinceForm(false);
      },
      //返回选择的地域的值
      getChoosedValue() {
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
              _this[this.chooseCitiesIndex].counties[this.chooseCountiesIndex].name; //单选,县区的名字
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
        this.emitChoosedParmas('choosedValue', this.choosedValue)
      },
      chooseAll: function (index, attr) {
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
              var i = 0; i < _this.cities[this.chooseCitiesIndex].counties.length; i++
            ) {
              this.chooseCountiesArray.push(i);
            }
          } else if (this.userRegionIndex === 3) {
            //商圈选择
            for (
              var i = 0; i <
              _this.cities[this.chooseCitiesIndex].counties[
                this.chooseCountiesIndex
              ].circles.length; i++
            ) {
              this.chooseCirclesArray.push(i);
            }
          }
          this.getChoosedValue();
        }
        //console.log(this.choosecitiesArray)
      },
      //删除一天附近投放记录
      deleteChoosedNearby: function (index) {
        this.choosedNearbyLists.splice(index, 1);
        this.oldAddress = "";
        this.stringNearBy(this.choosedNearbyLists)
      },
      //添加一条附近投放的记录
      addNearbyKmList: function () {
        if (this.oldAddress != "" && this.oldAddress == this.userInputAddressName) {
          this.$Notification({
            title: "温馨提示",
            message: "您选择的地址重复了!",
            type: "warning"
          });
          return false;
        }
        if (address == "") {
          this.$Notification({
            title: "温馨提示",
            message: "地址为空,请您先输入您要投放的地址!",
            type: "warning"
          });
          return false;
        } else {
          var address = this.userInputAddressName;
          this.oldAddress = this.userInputAddressName;
          var km = this.customRangeLists[this.choosedRangeIndex].name;
          let obj = {
            name: address,
            km: km
          };
          this.choosedNearbyLists.push(obj);
          this.stringNearBy(this.choosedNearbyLists)
        }
      },
      //把附近的数组数据转换为字符串
      stringNearBy(kmArray) {
        //将已经选择的,地域+km的对象,存入数组中
        var array = [];
        for (var i = 0; i < kmArray.length; i++) {
          //遍历数组,数组的每一项都是对象
          array[i] =
            kmArray[i].name.toString() +
            "    " +
            kmArray[i].km.toString();
        }
        //this.choosedValue//这是最后提交时的地址
        this.choosedValue = array.join(",");
        this.emitChoosedParmas('choosedValue', this.choosedValue)
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
      userInputAddress: function () {
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
      showRange: function () {
        this.localMap();
      },
      //点击选择辐射范围,几km
      chooseNearbyKm: function (index) {
        this.choosedRangeIndex = index;
        this.choosedRangeValue = this.customRangeLists[index].value;
      },
      //选择附近
      chooseNearby: function () {
        this.openshMap();
      },
      //选择商圈
      chooseCircles: function (index) {
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
      chooseCounties: function (index) {
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
      clearchooseAll: function () {
        this.choosecitiesArray = [];
        this.chooseCountiesArray = [];
        this.chooseCirclesArray = [];
      },
      chooseCities: function (index, length) {
        //console.log()
        //this.clearchooseAll()
        if (this.ischooseCitiesRadio == false) {
          if (this.choosecitiesArray.indexOf(index) == -1) {
            this.choosecitiesArray.push(index);
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
      showProvinceForm: function (attr) {
        this.isShowProvince = attr;
      },
      chooseProvice: function (index) {
        this.isShowcitiesIndex = index;
        this.chooseProviceIndex = index;
        //this.choosecitiesArray = []
        this.clearchooseAll();
        this.getChoosedValue(index);
      },
      //选择投放区域
      chooseRegion(index, attr, array) {
        if (index === 0) {
          this.choosedValue = "全国";
          this.showProvinceForm(false);
          this.ischooseCitiesRadio = false;
          this.emitChoosedParmas('choosedValue', this.choosedValue)
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
        } else if (index === 4) { //选择附近
          this.chooseRegionTitle = "自定义商圈";
          this.showProvinceForm(true); //显示悬浮框
          this.choosedValue = "";
          var _this = this;
          setTimeout(function () {
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
            "修改地域选择", {
              confirmButtonText: "确定",
              type: "warning",
              callback: action => {}
            }
          );
          /* this.$MessageBox.confirm('地域只支持单选,如果选择其他区域,已选择的地域将会失效,确定修改吗？', '修改地域选择', {
            distinguishCancelAndClose: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          })
            .then(() => {
              this.choosedValue = ""; //切换地域选择方式后,清空已经选择的
                this.clearchooseAll(); //清空已经选择的,已经添加到数组中的值
                if (index === 0) {
                  this.choosedValue = "全国";
                }
            })
            .catch(action => {
              
            }); */
        }
        this.choosedFlag = true; //改变状态,证明已经选择过地区了
        //this.chooseParmas(index,attr,array)
        this[attr] = index; //单选事件,改变单选的值
        //var _this = this //es5
      },
      //年龄选择按钮
      chooseAge: function (index) {
        /*       if(index === 0){//选择年龄不限制的时候
                this.userAgeIndex = [0]
                this.emitChoosedParmas('choosedAge','不限')
                return false
              } */
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
        let array = this.userAgeIndex.sort()
        let choosedAgeArray = [];
        for (var j = 0; j < array.length; j++) {
          let index = array[j]
          choosedAgeArray.push(this.ageLists[index]);
        }
        this.choosedAge = choosedAgeArray.toString();
        this.emitChoosedParmas('choosedAge', this.choosedAge)
      },

      //单选按钮,改变单选的值,改变已经选择的值
      chooseParmas: function (index, attr, array) {
        this[attr] = index;
        var _thisArray = this[array]; //取得对应数组的值
        this.choosedSex = _thisArray[index];
        this.emitChoosedParmas('choosedSex', this.choosedSex)
      },
      //向父组件传递的已选择的值
      emitChoosedParmas(key, val) {
        if (!this.choosedObj) {
          this.choosedObj = {}
        }
        this.choosedObj[key] = val
        this.choosedObj['userRegionIndex'] = this.userRegionIndex
        this.$emit('getChoosedVal', this.choosedObj)
      }
    },
    mounted() {
      if (this.proviceLists.length == 0) {
        //只获取一次,有值就不再获取
        this.$axios.get("http://dou.fudayiliao.com/order/region").then(res => {
          this.proviceLists = res.data; //给本地数组赋值,值就是大的json文件
        });
      }
    }
  };

</script>
