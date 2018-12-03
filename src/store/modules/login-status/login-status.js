const getters = {
  getLoginStatus(state) {
    return state.isLogin
  },
}
const actions = {
  loginAction(state, status) {
    state.commit('login', status)
  },
}
const mutations = {
  login(state, status) {
    state.isLogin = status
  },

}
const state = {
  isLogin: false
}
export default {
  getters,
  actions,
  mutations,
  state
}
