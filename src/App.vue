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
  created () {
      this.$http.get('/.auth/me')
        .then(response => { 
          localStorage.token = 'Bearer ' + response.data[0].access_token })
  }
}
</script>
