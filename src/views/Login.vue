<template>
  <v-container
    fill-height
    fluid
  >
    <v-layout
      justify-center
      wrap
    >
      <v-flex
        xs12
        md8
      >
        <material-card
            color="green"
            title="Login"
        >
            <v-btn
            class="mx-0 font-weight-light"
            color="success"
            @click="login"
            >
                Login
            </v-btn>
        </material-card>
        </v-flex>
    </v-layout>
    </v-container>
</template>
<script>
export default {
    methods: {
        login () {
            
        }
    }
}
</script>
