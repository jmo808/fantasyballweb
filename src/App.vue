<template>
  <v-app>

    <core-drawer />

    <core-view />
  </v-app>
</template>

<style lang="scss">
@import '@/styles/index.scss';

/* Remove in 1.2 */
.v-datatable thead th.column.sortable i {
  vertical-align: unset;
}
</style>
<script>

export default {
  beforeCreate () {
    this.$http.get('/.auth/me')
      .then(response => { localStorage.token = 'Bearer ' + response.data[0].access_token 
        this.$http.defaults.headers.common['Authorization'] = localStorage.token})
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
} 
</script>
