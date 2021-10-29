import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Books from '@/components/Books'
import CreateBook from '@/components/CreateBook'
import VieweBook from '@/components/VieweBook'
import Restricted from '@/components/Restricted'

//import PageHeader from '@/components/pageHeader'
import Test from '@/components/Test'
import Test2 from '@/components/Test2'
Vue.use(Router)

import store from '@/store/store.js'



const router = new Router({
 routes: [
    {
      path: '/root',
      name: 'HelloWorld',
      component: HelloWorld
    },{
      path: '/register',
      name: 'Register',
      component: Register
    },{
      path: '/login',
      name: 'Login',
      component: Login
    },{
      path: '/test',
      name: 'Test',
      component: Test
    },{
      path: '/books',
      name: 'Books',
      component: Books,
      meta: { transition: 'fade-in-down' }
    },{
      path: '/books/:id',
      name: 'Book',
      component: VieweBook
    },{
      path: '/createBook',
      name: 'books-create',
      component: CreateBook
    },{
      path: '/restricted',
      name: 'Restricted',
      component: Restricted
    },{
      path: '/test2',
      name: 'Test2',
      component: Test2
    }
    /*
    , {
      path: '/pageHeader',
      name: 'PageHeader',
      component: PageHeader
    } */

  ]
})

/*
router.beforeEach((to, from, next) => {
/*
  if (to.name == 'Books' && store.getters.getState.isLoggedin && store.getters.getState.role !== 'admin')
  {
    console.log("state: "+store.getters.getState.role)
    console.log("login: "+store.getters.getState.isLoggedin)
    next({ name: 'Restricted' })
  }


  else
  next()

  console.log("state: "+store.getters.getState.role)
    console.log("login: "+store.getters.getState.isLoggedin)

});
*/
export default router;