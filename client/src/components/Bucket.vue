<template>
  <div>
            <vs-row vs-type="inline-flex" vs-justify="center" vs-align="center">
                   <h1>Your Books</h1>

            </vs-row>
              <br> <br>
         <div v-for="(book, index) in $store.getters.getState.books" :key="book.id">

         <div class="col d-flex justify-content-center" >
            <b-card no-body class="overflow-hodden" style="max-width: 640px;">
            <b-row class="justify-content-lg-center" no-gutters align-v="center">
                <b-col md="6">
                    <b-card-img :src=book.coverImageURL :alt= book.title class="rounded-0"></b-card-img>
                </b-col>
                <b-col md="6">
                <b-card-body :title = book.title>
                <b-card-text>
                    <div>Due date : {{$store.getters.getState.dueDates[index]}}</div>
                    <div class="author">
                        Written by {{book.author}}
                    </div>
                    <div class="edition">
                        Edition : {{book.edition}} 
                    </div>

                </b-card-text>
                <b-row>
                
                <b-col><b-button 
                  v-if="$store.state.isLoggedin && ($store.state.role == 'user') && ($store.state.books.length == 1) && (copies.length == 0)" 
                  variant="danger" 
                  @click= "dropBook()">Drop Book</b-button></b-col>
                </b-row>
                
                </b-card-body>
                </b-col>
            </b-row>
            </b-card>
        </div>
         
        <br>
        </div>


  </div>
</template>



<script>

import Panel from './Panel.vue'
import BookServices from '@/services/BookServices'
import Pages from './Pages.vue'


export default {
   data(){
        return{
            results: {},
            books: [],
            copies: null,
            burrows: {}
        }
    },
    async mounted()
    {   
        //this.results = {h:"123"}
      
         this.results = (await  BookServices.burrowedBooks (this.$store.state.user.id, this.$store.state.token)).data
        

      //this.copies = this.results.copies
      //console.log("this books: "+ this.book)
      this.$store.dispatch('setBooks', this.results.results)
      this.$store.dispatch('setDueDates', this.results.due)

        
    console.log("this books: "+ (this.$store.state.books[0].id))
   
        if(this.$store.state.books.length == 1)
        {
            this.copies = (await  BookServices.burrowedCopies ({userID: this.$store.state.user.id, bookID: this.$store.state.books[0].id}, this.$store.state.token)).data.lended
            console.log("current copies: " + this.copies)
        }
    
        
      console.log("here")
    },
   
  methods: {

async dropBook()
    {
          //console.log("drop :" +this.$store.state.books[0].id)
          //console.log("drop :" +this.$store.state.user.id)
        try
        {
            const response = await BookServices.dropBook( {userID: this.$store.state.user.id, bookID: this.$store.state.books[0].id}, this.$store.state.token)
        }
        catch (error)
        {
            console.log(error)
        }
        this.$store.dispatch('setBooks', [])
    }
  },
  components: {
        Panel,
        Pages

    }
}
</script>