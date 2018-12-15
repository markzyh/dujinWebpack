const getters = {
  getshowLoginForm(state) {
    return state.isLogin
  }
}
const actions = {

  showLoginFormAction(state, status) {
    state.commit('showLoginForm', status)
  },
}
const mutations = {
  showLoginForm(state, status) {
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