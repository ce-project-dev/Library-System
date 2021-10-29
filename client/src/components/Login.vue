<template>
<div>

<h1>Login!</h1>

  <!-- <b-form @click="login" > -->
    <b-row class="justify-content-md-center" align-h="center"> 
            <b-col col md="2">
            <b-form-input
              id="input-1"
              v-model="form.email"
              type="email"
              placeholder="Email"
              required
            ></b-form-input>
            </b-col>
    </b-row>
    <br>  
    <b-row class="justify-content-md-center" align-h="center">
            <b-col col md="2">
              <b-form-group
                id="input-group-1"
                label-for="password1"
                :invalid-feedback="passwordInvalidFeedback"
                :state="state_"
              >
              <b-form-input
                id="password1"
                v-model="form.password"
                type="password"
                placeholder="Password"
                required
                ></b-form-input>
              </b-form-group>
            </b-col>
    </b-row>
    <br>

    <b-button @click="login" variant="primary">Log In</b-button>
  
  <!--</b-form> -->



<div>
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
      form:{
        email: '',
        password:''
      },
      error: null
    }
  }
  ,
  computed:{
    state_(){
      return (this.form.password.length >=8 && this.form.password.length <= 32) || this.form.password.length ==0
    },
    passwordInvalidFeedback(){
      if (this.form.password.length < 8){ 
        return "Minimum required password length is 8 characters" 
      }
      if( this.form.password.length >32){
        return "Maximum allowed password length is 32 characters"
      }
    },
  },
  methods: {
  async login()
      {
        this.error = null
        console.log("login");
        try
        {
          const response = await AuthenticationService.login(
          {
            email : this.form.email,
            password : this.form.password
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
            console.log(error)
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