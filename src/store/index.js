import Vue from 'vue'
import Vuex from 'vuex'
import LoginStatus from '@/store/modules/login-status/login-status'
Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        LoginStatus
    }
})