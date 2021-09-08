<template>
  <div id="app">
   <!-- <img src="./assets/logo.png"> -->
  <page-header/>
  <br>
    <vue-page-transition name="fade-in-right">
  <router-view/>
</vue-page-transition>
  </div>
</template>

<script>

import PageHeader from '@/components/PageHeader.vue'


//import { component } from 'vue/types/umd'
export default {
  name: 'App',
  components: {
    PageHeader

  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
