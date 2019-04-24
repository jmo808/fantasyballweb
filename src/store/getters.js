// https://vuex.vuejs.org/en/getters.html

export default {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status
}
