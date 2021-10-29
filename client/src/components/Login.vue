<template>
<div>

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
         <vs-input   :warning="true" type="password" class="testp"   placeholder="Enter Your Password" v-model="password"/>
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
          this.$store.dispatch('setBooks', response.data.results)
          this.$store.dispatch('setDueDates', response.data.due)
          
          if(response.data.user.role == 'admin')
          {
            console.log("admin")
            this.$router.push({ path: 'books' })
          }
          else
          {
            console.log("user")
            this.$router.push({ path: 'root' })
          }

 
          
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