<template>
  <div class="centerx">

    <vs-navbar
      v-model="indexActive"
      :color="colorx"
      text-color="rgba(255,255,255,.6)"
      active-text-color="rgba(255,255,255,1)"
      class="myNavbar">
      <div slot="title">

        <vs-navbar-title>
          <router-link to="root" color="white">Public Library</router-link>
        </vs-navbar-title>
      </div>

      <vs-navbar-item index="0" >
        <router-link to="root">Home</router-link>
      </vs-navbar-item>

      <vs-navbar-item index="1">
        <router-link to="books">Browse</router-link>
      </vs-navbar-item>

      <vs-navbar-item index="2">
        <router-link v-if="!$store.state.isLoggedin" to="register">Sign Up!</router-link>
      </vs-navbar-item>

      <vs-navbar-item index="3">
        <router-link v-if="!$store.state.isLoggedin" to="login">Login</router-link>
      </vs-navbar-item>

      <vs-navbar-item index="4">

         <router-link v-if="$store.state.isLoggedin" @click.native="logout" to="root">Logout</router-link>
      </vs-navbar-item>

  <vs-navbar-item index="5">
    <vs-input icon="search" placeholder="Search Book" />

 </vs-navbar-item>


      <vs-spacer></vs-spacer>


    </vs-navbar>
  </div>
</template>

<script>
export default {

  data()
  {
    return {
      colorx:'primary',
    indexActive: 0
    }
  },
  methods:  {
      logout()
      {
        console.log("logout")

        this.$store.dispatch('setToken', null)
        this.$store.dispatch('setUser', null)

      },
      navigateTo(route){
        this.$router.push(route)
      }

    }


}
</script>





