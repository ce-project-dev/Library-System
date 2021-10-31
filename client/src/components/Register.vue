<template>
<div class="container">

  <div class="box">
    <div class="header">
  <h4>Sign Up Users!</h4>
</div>
<br>
    <vs-row vs-type="inline-flex" vs-justify="center" vs-align="center">
        <vs-input :success="true"  placeholder="Enter Email"  v-model="email"/>
    </vs-row>

    <vs-row vs-type="inline-flex" vs-justify="center" vs-align="center">
         <vs-input :success="true"  placeholder="Enter User Name" v-model="name"/>
    </vs-row>

    <vs-row vs-type="inline-flex" vs-justify="center" vs-align="center">
         <vs-input :success="psuc" :danger="perr" :danger-text="perrorText" type="password" autocomplete="new-password" placeholder="Enter Password" v-model="password"/>
    </vs-row>

    
<br>
<br>


<vs-button vs-type="filled" @click = 'register'>Register</vs-button>
<br><br>
<transition name="fade">
    <div class = "error"  v-if="error" v-html='error'/>
  </transition>
  </div>


</div>
</template>


<script>

import AuthenticationService from '@/services/AuthenticationService.js'

export default {
  data()
  {
    return {
      email: '',
      name: '',
      password: '',
      error: null
    }
  },
  computed :
  {
      perr() {
        return this.password.length < 8 || this.password.length > 32
    },
    perrorText()
    {
        if (this.password.length < 8 && this.password.length != 0)
        {
            return 'Password should be at least 8 characters'
        }
        else if (this.password.length > 32)
        {
            return 'Password should be at most 80 characters'
        }
        else
        return ''
    },
    psuc()
    {
      if (this.password.length < 8 || this.password.length > 32)
        {
            return false
        }
        else
        {
            return true
        }
    }

  }
  ,
  methods: {
  async register()
      {
        this.error = null
        console.log("reg");
        try
        {
          const response = await AuthenticationService.register(
          {
            email : this.email,
            password : this.password,
            name : this.name
          }
        )
          this.$store.dispatch('setToken', response.data.token)
          this.$store.dispatch('setUser', response.data.user)
        }
        catch(error)
        {

            if(error.response.data.message)
            {
                this.error = error.response.data.message
            }
            else
            {
                this.error = error.response.data.error
            }

        }
        this.$router.push({ path: 'login' })
      }
  }
}
</script>


<style scoped>

.container {
  min-height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;

}


.error{
  color: red;
}


.box {

  width: 500px;
 background: #E0EAFC;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #CFDEF3, #E0EAFC);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #CFDEF3, #E0EAFC); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  padding: 50px;
  border-radius: 10px;
  position: relative;
  text-align: center;

}

.vs-con-input-label  {
    width: 300px;
    height: 40px;
}

.header {
  font-size: 30px;
}




</style>