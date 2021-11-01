<template>
  <div>
      <h1>Add Book</h1>
        <b-container class="bv-example-row">
        <b-row class="justify-content-md-center" align-h="center">
            <b-col col md="2">
            <b-form-input v-model = "book.title" placeholder="Title">
            </b-form-input>
            </b-col>
        </b-row>
        <b-row class="justify-content-md-center" align-h="center">
            <b-col col md="2">
            <b-form-input v-model = "book.author" placeholder="Author">
            </b-form-input>
            </b-col>
        </b-row>
        <b-row class="justify-content-md-center" align-h="center">
            <b-col col md="2">
            <b-form-input v-model = "book.edition" placeholder="Edition">
            </b-form-input>
            </b-col>
        </b-row>
        <b-row class="justify-content-md-center" align-h="center">
            <b-col col md="2">
            <b-form-input v-model = "book.copies" placeholder="Number of copies">
            </b-form-input>
            </b-col>
        </b-row>
        <b-row class="justify-content-md-center" align-h="center">
            <b-col col md="2">
            <b-form-input v-model = "book.tags" placeholder="Keywords">
            </b-form-input>
            </b-col>
        </b-row>
        <b-row class="justify-content-md-center" align-h="center">
            <b-col col md="2">
            <b-form-input v-model = "book.coverImageURL" placeholder="Cover Image URL">
            </b-form-input>
            </b-col>
        </b-row>
        
        </b-container>
    
    <div class = "error" v-html='error'/>
    <div >
    <b-button variant="success" @click = 'create'>Add Book</b-button>
    </div>

  </div>
</template>

<script>

import BookServices from '@/services/BookServices'

export default
{
    data()
        {
        return {
            book: {
            title :null ,
            author: null,
            edition: null,
            copies: null,
            tags: null,
            coverImageURL:  null
            },
            error: null

       }
  },
  methods: {
       async create()
       {
            this.error = null
           console.log("create book")

           const allfilled = Object
                        .keys(this.book)
                        .every(key => !!this.book[key])
            if(!allfilled)
            {
                this.error = 'Please fill all the required fields!'
                return
            }
           try
           {
               const response = await  BookServices.createBook(this.book,this.$store.state.token)
               console.log(response)
           }
           catch(err)
           {
                console.log(err)
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
