<template>
  <div class="centerx">

    <vs-navbar
      v-model="indexActive"
      :color="colorx"
      text-color="rgba(255,255,255,.6)"
      active-text-color="black"
      class="myNavbar">
      <div slot="title">

        <vs-navbar-title>
          <router-link v-bind:to="{ path: '/root'}" color="white">Library System</router-link>
        </vs-navbar-title>
      </div>

      <vs-navbar-item index="0" >
        <a href="/#/root" v-if="$store.state.isLoggedin">Home</a>
      </vs-navbar-item>

      <vs-navbar-item index="1">
        <a href="/#/books">Book List</a>
      </vs-navbar-item>

      <vs-navbar-item index="2">
        <router-link v-if="!$store.state.isLoggedin" to="register">Sign Up!</router-link>
      </vs-navbar-item>

      <vs-navbar-item index="3">
         <a href="/#/login" v-if="!$store.state.isLoggedin">Log In!</a>
      </vs-navbar-item>

      <vs-navbar-item index="3">
         <router-link v-if="$store.state.isLoggedin" @click.native="logout" v-bind:to="{ path: '/login'}">Logout</router-link>
      </vs-navbar-item>

  

  <vs-navbar-item index="5">
    <vs-input v-model="search" icon="search" placeholder="Search Book" />

   

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
      colorx:"#7d33ff",
      indexActive: 0,
      search: ''
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

    },
    watch: {
      search(value)
      {
        //console.log(value)
        const route = {name: 'Books'}
        if(this.search !== '')
        {
          route.query = {search: this.search}
        }
        this.$router.push(route).catch(()=>{});
      },
      '$route.query.search':{
        immediate: true,
        handler (value)
        {
          this.search = value
        }
      }
    }


}
</script>





