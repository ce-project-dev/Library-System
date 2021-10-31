<template>
  <div>
        
  

        <b-row class="justify-content-md-center" align-h="center"> 
            <b-col col md="2">
            <b-form-input v-model = "form.fname" placeholder="First Name">
            </b-form-input>
            </b-col>
        </b-row>

        <b-row class="justify-content-md-center" align-h="center"> 
            <b-col col md="2">
            <b-form-input v-model = "form.lname" placeholder="Last Name">
            </b-form-input>
            </b-col>
        </b-row>
        <b-row class="justify-content-md-center" align-h="center"> 
            <b-col col md="2">
            <b-form-input v-model = "form.enroll" placeholder="Enroll Number">
            </b-form-input>
            </b-col>
        </b-row>

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
                name=up
                ></b-form-input>
              </b-form-group>
            </b-col>
        </b-row>

        <b-row class="justify-content-md-center" align-h="center">
            <b-col col md="2">
              <b-form-group
                id="input-group-1"
                label-for="password1"
                valid-feedback="Passwords Match"
                :invalid-feedback="invalidFeedback"
                :state="state" 
              >
              <b-form-input
                id="password1"
                v-model="form.c_password"
                type="password"
                placeholder="Confirm Password"
                required
                ></b-form-input>
              </b-form-group>
            </b-col>
        </b-row>


      
      <br>
      <b-button @click="register" variant="primary">Sign Up</b-button>
      <div>
      <transition name="fade">
        <div class = "error"  v-if="error" v-html='error'/>
      </transition>
      </div>

      
 
    <!--<b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card> -->
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService.js'
  export default {
    data() {
      return {
        form: {
          fname: '',
          lname: '',
          enroll: '',
          email: '',
          password: '',
          c_password: ''
        },
        error: null,
        show: true
      }
    },
    computed :
  {  
    state(){
      return (this.form.c_password == this.form.password) && this.form.password.length !=0
    },
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
    invalidFeedback(){
      if(this.form.c_password.length >0){
        if (this.form.password != this.form.c_password){ 
          return "Passwords do not match" 
        }
      }
      else {
        return null
      }
    },

  },
    methods: {
      onSubmit(event) {
        event.preventDefault()
        alert(JSON.stringify(this.form))
      },
      async register()
      {
        this.error = null
        console.log("reg");
        try
        { 
          console.log("reg");
          const response = await AuthenticationService.register(
          {
            fname: this.form.fname,
            lname: this.form.lname,
            email : this.form.email,
            enroll : this.form.enroll,
            password : this.form.password
          }
        )
          this.$store.dispatch('setToken', response.data.token)
          this.$store.dispatch('setUser', response.data.user)
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
        this.$router.push({ path: 'login' })
      }
    }
    
  }
</script>