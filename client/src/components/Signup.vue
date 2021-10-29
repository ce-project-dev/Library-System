<template>
  <div>
    <h2>Sign Up with your credentials</h2>
    <b-form @submit="register" v-if=true oninput='up2.setCustomValidity(up2.value!=up.value ?"Passwords do not match":"")'>

      <!--<vs-row vs-type="inline-flex" vs-justify="center" vs-align="center"> /-->
      <div class="container" max-width=50px>
      
      <b-form-group
        id="input-group-1"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.fname"
          placeholder="First Name"
          required
        ></b-form-input>
      </b-form-group> 
      <!--<vs-row>

      <vs-row vs-type="inline-flex" vs-justify="center" vs-align="center">/-->
       <b-form-group
        id="input-group-1"
        
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.lname"
          placeholder="Last Name"
          required
        ></b-form-input>
      </b-form-group>
      <!--</vs-row>

      <vs-row vs-type="inline-flex" vs-justify="center" vs-align="center"> /-->
       <b-form-group
        id="input-group-1"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.enroll"
          
          placeholder="Enroll number"
          required
        ></b-form-input>
      </b-form-group>
      <!--</vs-row>


      <vs-row vs-type="inline-flex" vs-justify="center" vs-align="center"> /-->
      <b-form-group
        id="input-group-1"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          placeholder="Email"
          required
        ></b-form-input>
      </b-form-group>
       <!--</vs-row>

      <vs-row vs-type="inline-flex" vs-justify="center" vs-align="center"> /-->
      <b-form-group
        id="input-group-1"
        label-for="password1"
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
      <!--</vs-row>

      <vs-row vs-type="inline-flex" vs-justify="center" vs-align="center"> /-->
      <b-form-group
        id="input-group-1"
        label-for="password2"
      >
        <b-form-input
          id="password2"
          v-model="form.c_password"
          type="password"
          placeholder="Confirm Password"
          required
          name=up2
        ></b-form-input>
      </b-form-group>
      <!--</vs-row>-->

      <b-button type="submit" variant="primary">Sign Up</b-button>
     </div> 
    </b-form>
    <div>
    <transition name="fade">
      <div class = "error"  v-if="error" v-html='error'/>
    </transition>
    </div>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card> 
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
          email: '',
          password: '',
          c_password:'',
          enroll: '',
          error: null
        }//,
        // show: true
      }
    },
    
  /*computed :
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

  },*/
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
          const response = await AuthenticationService.register(
          {
            email : this.form.email,
            password : this.form.password,
            fname : this.form.fname,
            lname: this.form.lname,
            enroll: this.form.enroll


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
      }
    }
  }
</script>