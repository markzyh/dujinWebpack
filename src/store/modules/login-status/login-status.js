const getters = {
  getLoginStatus(state) {
    return state.isLogin
  },
  getShowForm(state){
    return state.showLoginForm
  }
}
const actions = {
  loginAction(state, status) {
    state.commit('login', status)
  },
  showAction(state,status){
    state.commit('showForm',status)
  }
}
const mutations = {
  login(state, status) {
    state.isLogin = status
  },
  showForm(state,status){
    state.showLoginForm = status
  }
}
const state = {
  isLogin: false,
  showLoginForm:true
}
export default {
  getters,
  actions,
  mutations,
  state
}
