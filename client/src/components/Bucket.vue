<template>
  <div>
            <vs-row vs-type="inline-flex" vs-justify="center" vs-align="center">
                   <h1>Reserved Books</h1>

            </vs-row>
              <br> <br>
         <div v-for="(book, index) in $store.getters.getState.books" :key="book.id">
         
        <panel>
            <vs-row>
            <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="6">
                <div>
                <br>
            <vs-row vs-type="inline-flex" vs-justify="center" vs-align="center">
                    <div class="title">
                    {{book.title}} {{$store.getters.getState.dueDates[index]}}
                </div>
            </vs-row>
                <vs-row vs-type="inline-flex" vs-justify="center" vs-align="center">
                     <div class="author">
                    {{book.author}}
                </div>
                </vs-row>

                <vs-row vs-type="inline-flex" vs-justify="center" vs-align="center">
                  <div class="edition">
                    {{book.edition}} {{copies.length}}
                </div>
                </vs-row>
                 <br> <br>
                <vs-row vs-type="inline-flex" vs-justify="center" vs-align="center">
                   
                 <vs-button v-if="$store.state.isLoggedin  && ($store.state.role == 'user') && ($store.state.books.length == 1) && (copies.length == 0) "  class="burrowBook" vs-type="filled" @click ="dropBook()">
                     Drop Book 
                </vs-button>


                </vs-row>

                <br><br>
              
            </div>
           </vs-col>
            <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="6">
               <img class = "coverImageURL" :src="book.coverImageURL" />
             </vs-col>
            </vs-row>
             
         </panel>

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
      
         this.results = (await  BookServices.burrowedBooks (this.$store.state.user.id)).data
        

      //this.copies = this.results.copies
      //console.log("this books: "+ this.book)
      this.$store.dispatch('setBooks', this.results.results)
      this.$store.dispatch('setDueDates', this.results.due)

        
    console.log("this books: "+ (this.$store.state.books[0].id))
   
        if(this.$store.state.books.length == 1)
        {
            this.copies = (await  BookServices.burrowedCopies ({userID: this.$store.state.user.id, bookID: this.$store.state.books[0].id})).data.lended
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
            const response = await BookServices.dropBook( {userID: this.$store.state.user.id, bookID: this.$store.state.books[0].id})
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