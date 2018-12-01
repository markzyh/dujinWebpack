import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
import CreateOrder from '@/components/create-order/create-order'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'CreateOrder',
      redirect: '/create-order',
      component: CreateOrder
    },
    {
      path: '/create-order',
      name: 'CreateOrder',
      component: CreateOrder
    },
  ]
})
