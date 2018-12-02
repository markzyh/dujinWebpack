import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
import CreateOrder from '@/components/create-order/create-order'
import PersonalCenter from '@/components/personal-center/personal-center'
import OrderCenter from '@/components/order-center/order-center'
import OrderDetails from '@/components/order-details/order-details'
import Consumption from '@/components/consumption/consumption'
import PersonalData from '@/components/personal-data/personal-data'
import ChangePhone from '@/components/change-phone/change-phone'
import ChangePassword from '@/components/change-password/change-password'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '',
      meta:{
        title:'首页'
      },
      name: 'CreateOrder',
      redirect: '/create-order',
      component: CreateOrder
    },
    {
      path: '/create-order',
      meta:{
        title:'新建计划'
      },
      name: 'CreateOrder',
      component: CreateOrder
    },
    {
      path:'/personal-center',
      meta:{
        title:'用户中心'
      },
      name:'PersonalCenter',
      component:PersonalCenter
    }
    ,
    {
      path:'/order-center',
      meta:{
        title:'订单中心'
      },
      name:'OrderCenter',
      component:OrderCenter
    }
    ,
    {
      path:'/order-details',
      meta:{
        title:'订单详情'
      },
      name:'OrderDetails',
      component:OrderDetails
    }
    ,
    {
      path:'/consumption',
      meta:{
        title:'订单详情'
      },
      name:'Consumption',
      component:Consumption
    }
    ,
    {
      path:'/personal-data',
      meta:{
        title:'编辑资料'
      },
      name:'PersonalData',
      component:PersonalData
    },
    {
      path:'/change-phone',
      meta:{
        title:'修改手机号'
      },
      name:'ChangePhone',
      component:ChangePhone
    },
    {
      path:'/change-password',
      meta:{
        title:'修改密码'
      },
      name:'ChangePassword',
      component:ChangePassword
    }
  ]
})
