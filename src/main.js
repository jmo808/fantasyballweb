// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

// Components
import './components'

// Plugins
import './plugins'

// Sync router with store
import { sync } from 'vuex-router-sync'

// Application imports
import App from './App'
import i18n from '@/i18n'
import router from '@/router'
import store from '@/store'

const token = localStorage.token
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
} else {
  this.$http.get('/.auth/me')
    .then(response => { localStorage.token = 'Bearer ' + response.data[0].access_token })
  this.$http.interceptors.response.use(undefined, function (err) {
    return new Promise(function (resolve, reject) {
      if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
        this.$http.get('/.auth/refresh')
          .then(response => {
            localStorage.token = 'Bearer ' + response.data[0].access_token })
          .catch(this.$http.get('/.auth/login/aad'))
      }
      throw err
    })
  })
}

// Sync store with router
sync(store, router)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
