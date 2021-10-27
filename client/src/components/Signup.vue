<template>
  <div>
  
    <b-form @submit="onSubmit" v-if="show" oninput='up2.setCustomValidity(up2.value!=up.value ?"Passwords do not match":"")'>

      <vs-row vs-type="inline-flex" vs-justify="center" vs-align="center"> 
      <b-form-group
        id="input-group-1"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.fName"
          type="String"
          placeholder="First Name"
          required
        ></b-form-input>
      </b-form-group>
      </vs-row>
      <vs-row vs-type="inline-flex" vs-justify="center" vs-align="center">
       <b-form-group
        id="input-group-1"
        
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.lName"
          type="String"
          placeholder="Last Name"
          required
        ></b-form-input>
      </b-form-group>
      </vs-row>

      <vs-row vs-type="inline-flex" vs-justify="center" vs-align="center"> 
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
      </vs-row>

      <vs-row vs-type="inline-flex" vs-justify="center" vs-align="center"> 
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
      </vs-row>

      <vs-row vs-type="inline-flex" vs-justify="center" vs-align="center"> 
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
      </vs-row>

      <b-button type="submit" variant="primary">Sign Up</b-button>
      
    </b-form>
    <!--<b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card> -->
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          fname: '',
          lname: '',
          email: '',
          password: '',
          error: null,
        },
        show: true
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

  },
    methods: {
      onSubmit(event) {
        event.preventDefault()
        alert(JSON.stringify(this.form))
      }
    }
  }
</script>