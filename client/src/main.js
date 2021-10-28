// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import {BootstrapVue, BootstrapVueIcons} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import App from './App'
import router from './router'
import {sync} from 'vuex-router-sync'

import { Plugin } from 'vue-responsive-video-background-player'

Vue.use(Plugin);



import store from '@/store/store'


import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css'
Vue.use(Vuesax)

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

import VuePageTransition from 'vue-page-transition'
Vue.use(VuePageTransition)


sync(store, router)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
