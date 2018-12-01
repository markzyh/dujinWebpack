<template>
  <div class="ht_contentC dy-nav">
    <ul class="ht_content_ul">
      <router-link
        tag="li"
        active-class="selected"
        v-for="(item,index) in navLists"
        :key="index"
        :to="{path:item.path}"
        :class="{child:item.isChild}"
        exact
      >
        <i></i>
        {{item.name}}
      </router-link>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      navLists: [
        {
          name: "用户中心",
          path: "/personal-center"
        },
        {
          name: "新建计划",
          path: "/create-order"
        },
        {
          name: "订单中心",
          path: "/order-center"
        },
        {
          name: "充值与消费",
          path: "/consumption"
        },
        {
          name: "个人资料",
          //path: '/'
        },
        {
          name: "资料编辑",
          path: "/personal-data",
          isChild: true
        },
        {
          name: "修改手机号码",
          path: "/change-phone",
          isChild: true
        },
        {
          name: "修改密码",
          path: "/change-password",
          isChild: true
        },
        {
          name: "增值服务",
          
        },
        {
          name: "企业认证",
          path: "/company-auth",
          isChild: true
        },
        {
          name: "商品分享功能",
          path: false,
          isChild: true
        },
        {
          name: "直播权限",
          path: false,
          isChild: true
        },
        {
          name: "60秒权限",
          path: false,
          isChild: true
        },
        {
          name: "常见问题",
          path: "/common-problem"
        }
      ]
    };
  },
  methods:{},
  computed: {

  },
  mounted() {

  }
};
</script>
<style lang="scss">
.dy-nav {
  width: 218px;
}
.ht_content {
  width: 1300px;
  margin: 40px auto;
  height: 755px;
  clear: both;
}

.ht_contentC {
  width: 215px;
  background: #fefefe;
}

.ht_content_ul {
  padding: 70px 0;
  position: relative;
}
/*.ht_content_ul li:nth-child(10){display: none !important;}*/

.ht_content_ul > li {
  height: 45px;
  font-size: 18px;
  line-height: 45px;
  color: #333333;
  padding-left: 20px;
  cursor: pointer;
}

.ht_content_ul > li.selected {
  color: #eb5169 !important;
  background: #f0f0f0;
  border-left: 2px solid #eb5169;
}
.ht_content_ul > li.selected a {
  color: #eb5169 !important;
}
.ht_content_ul > li.official i {
  background: url(/images/djback_consumption.png) no-repeat;
}
.ht_content_ul > li .show_problem i {
  background: url(/images/djback_problems.png) no-repeat;
}
.ht_content_ul > li.official.selected i {
  background: url(/images/djback_consumption_hover.png) no-repeat;
}
.ht_content_ul > li.show_problem_li.selected i {
  background: url(/images/djback_problems_hover.png) no-repeat;
}

.ht_content_ul > li i {
  display: inline-block;
  width: 24px;
  height: 22px;
  margin-bottom: -5px;
  margin-right: 14px;
}

.ht_content_ul > li:nth-child(1) i {
  background: url(/images/ht_list01.png) no-repeat;
}

.ht_content_ul > li:nth-child(2) i {
  background: url(/images/dy-putin-icon.png) no-repeat;
}

.ht_content_ul > li:nth-child(3) i {
  background: url(/images/ht_list02.png) no-repeat;
}

.ht_content_ul > li:nth-child(4) i {
  background: url(/images/ht_list03.png) no-repeat;
}

.ht_content_ul > li:nth-child(5) i {
  background: url(/images/ht_list04.png) no-repeat;
}

.ht_content_ul > li.selected:nth-child(1) i {
  background: url(/images/ht_hover01.png) no-repeat;
}

.ht_content_ul > li.selected:nth-child(2) i {
  background: url(/images/dy-putin-icon-hover.png) no-repeat;
}

.ht_content_ul > li.selected:nth-child(3) i {
  background: url(/images/ht_hover02.png) no-repeat;
}

.ht_content_ul > li.selected:nth-child(4) i {
  background: url(/images/ht_hover03.png) no-repeat;
}

.ht_content_ul > li.selected:nth-child(5) i {
  background: url(/images/ht_hover04.png) no-repeat;
}

/*.ht_content_ul > li:nth-child(6) a, .ht_content_ul > li:nth-child(7) a, .ht_content_ul > li:nth-child(8) a, .ht_content_ul > li:nth-child(9) a{ font-size: 16px; color: #999999; }*/
.ht_content_ul li.child {
  font-size: 16px;
  color: #999999;
}

.ht_content_ul > li.on {
  background: #f0f0f0;
  border-left: 2px solid #eb5169;
  color: #eb5169;
}

.ht_content_ul > li:nth-child(1).on i {
  background: url(/images/ht_hover01.png) no-repeat;
}

.ht_content_ul > li:nth-child(2).on i {
  background: url(/images/ht_hover02.png) no-repeat;
}

.ht_content_ul > li:nth-child(3).on i {
  background: url(/images/ht_hover03.png) no-repeat;
}

.ht_content_ul > li:nth-child(4).on i {
  background: url(/images/ht_list04.png) no-repeat;
}
</style>

