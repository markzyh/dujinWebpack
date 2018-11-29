<template>
  <div class="slider-verification">
    <!-- 登录注册模块 -->
    <div class="flied_tc" :class="{show:isShowLoginForm == true}" v-if="isShowLoginForm">
      <div class="close_login_form" @click="hideLoginForm">x</div>
      <div class="flied_td">
        <h4>快速登录</h4>
        <div class="flied_te">
          <input type="tel" id="userphone" placeholder="输入手机号">
        </div>
        <div class="flied_tf">
          <swiper :options="swiperOption" ref="mySwiper" dir="rtl">
            <!-- dir控制了方向 -->
            <!-- <swiper :options="swiperOption" ref="mySwiper" @someSwiperEvent="callback"> -->
            <!-- slides -->
            <swiper-slide class="slider1">
              <span></span>
            </swiper-slide>
            <swiper-slide ref="swiper-no-swiping" class="swiper-no-swiping slider2">

            </swiper-slide>
            <!-- 无法滑动 -->
            <!-- Optional controls -->
            <!--  <div class="swiper-pagination" slot="pagination"></div> -->
            <!-- <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
            <div class="swiper-scrollbar" slot="scrollbar"></div>-->
          </swiper>
        </div>
        <div class="flied_tg cl">
          <input class="flied_th fl" type="text" placeholder="验证码" id="check_code">
          <input
            class="flied_ti fr"
            type="button"
            value="获取手机验证码"
            disabled="disabled"
            id="get_check"
            onclick="getCheckNumber()"
          >
        </div>
        <input class="flied_tj" type="button" value="立即登录" onclick="userLogin()">
      </div>
    </div>
    <!-- 登录注册模块 end -->
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";

import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  components: {
    swiper,
    swiperSlide
  },
  props: ["isShowLoginForm"],
  name: "slider-verification",
  data() {
    return {
      swiperOption: {
        // some swiper options/callbacks
        // 所有的参数同 swiper 官方 api 参数
        // ...
        //virtualTranslate: true, //不显示滑动效果
        noSwiping: true, //禁止滑动,没用
        pagination: {
          el: ".swiper-pagination",
          type: "progressbar"
        }
      }
    };
  },
  methods: {
    //隐藏登录窗口,给父组件传值
    hideLoginForm() {
      this.$emit("hideLoginForm");
    }
  },
  mounted() {
    // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
    // console.log('this is current swiper instance object', this.swiper)
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.swiper-container {
  width: 100%;
  height: 100%;
  .swiper-slide {
    text-align: left !important;
    span {
      display: inline-block;
      width: 40px;
      height: 40px;
      border:1px;
      background: #fff;
    }
  }
  .slider2{
    background: #19be6b !important;
    text-align: right;
    span{
      
    }
  }
}
.swiper-pagination {
  height: 100% !important;
}
.swiper-pagination span {
  -webkit-transform-origin: left top !important;
  -ms-transform-origin: left top !important;
  transform-origin: left top !important;
}
</style>

