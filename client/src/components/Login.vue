<template>
<div>
  <vs-row vs-type="inline-flex" vs-justify="center" vs-align="center">
  <b-form @submit="login" v-if="show"></b-form>
    <b-form-group
      id="input-group-1"
      label = "Email"
      label-for = "input-1"
      description="Enter Your Email"
    >
      <b-form-input
        id = "input-1"
        v-model="email"
        type="email"
        placeholder="Enter Your Email"
        required
      ></b-form-input>
    </b-form-group>
  </vs-row>

<h1>Login!</h1>
<br>
<div>

    <br>
   <vs-row vs-type="inline-flex" vs-justify="center" vs-align="center">
        <vs-input  :warning="true"  placeholder="Enter Your Email"  v-model="email"/>
         <br>
    </vs-row>
 <br>  <br>
    <vs-row vs-type="inline-flex" vs-justify="center" vs-align="center">
         <vs-input   :warning="true" type="password"   placeholder="Enter Your Password" v-model="password"/>
    </vs-row>

    <br><br>
<vs-button vs-type="filled" @click = 'login'>Login</vs-button>
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
      password: '',
      error: null
    }
  }
  /*,,
  computed :
  {
      perr() {
        return this.password.length < 8 || this.password.length > 32
    }

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
  */
  ,
  methods: {
  async login()
      {
        
        this.error = null
        console.log("login");
        try
        {
          const response = await AuthenticationService.login(
          {
            email : this.email,
            password : this.password
          }

        )
          this.$store.dispatch('setToken', response.data.token)
          this.$store.dispatch('setUser', response.data.user)
          this.$store.dispatch('setRole', response.data.user.role)

          this.$router.push({ path: 'home' })

          
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
      }
  }
}
</script>

<style scoped>
.error{
  color: red;
}
</style>