<template>
  <div>
    <panel title = Availability>


      
   
        <div >

          <panel>
            <vs-row>
            <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="6">
                <div>
                <br>

            <vs-row vs-type="inline-flex" vs-justify="center" vs-align="center">
                    <div class="title">
                    {{book.title}}
                </div>
            </vs-row>

                <vs-row vs-type="inline-flex" vs-justify="center" vs-align="center">
                     <div class="author">
                    {{book.author}}
                </div>
                </vs-row>

                <vs-row vs-type="inline-flex" vs-justify="center" vs-align="center">
                  <div class="edition">
                    {{book.edition}}
                </div>
              <br> <br>
                 <vs-row vs-type="inline-flex" class = "warning" vs-justify="center" vs-align="center">
                <div  v-if="(this.$store.state.books.length == 1)">
                    <h2 class="warning">You already burrowed a Book!</h2>
                    
                </div>
            </vs-row>

                </vs-row>
               
            </div>

           </vs-col>
            <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="6">
               <img class = "coverImageURL" :src="book.coverImageURL" />
             </vs-col>
            </vs-row>
            
         </panel>


        </div>  
        
                <div  v-for="(copy) in copies" :key="copy.id" >
                    <vs-button v-if="$store.state.isLoggedin  && ($store.state.role == 'user' && (copy.available)) && ($store.state.books.length < 1)"  class="burrowBook" vs-type="filled" @click ="burrow(copy.id)">
                     Burrow This Copy: {{copy.copyID}}
                    </vs-button>

                     <vs-button v-if="$store.state.isLoggedin  && ($store.state.role == 'admin') &&  !(copy.available) && (!copy.lended)"  class="burrowBook" vs-type="filled" @click ="lendCopy(copy.id)">
                     Lend This Copy: {{copy.copyID}}
                    </vs-button>

                    <vs-button v-if="$store.state.isLoggedin  && ($store.state.role == 'admin') &&  !(copy.available) && (copy.lended)"  class="burrowBook" vs-type="filled" @click ="returnBook(copy.id, copy.userID)">
                     Return This Copy: {{copy.copyID}}
                    </vs-button>

                     <vs-button v-if="$store.state.isLoggedin  && ($store.state.role == 'admin')"  class="burrowBook" vs-type="filled" @click ="removeCopy(copy.id)">
                     Remove This Copy: {{copy.copyID}}
                    </vs-button>
                  

                    <vs-button v-if="$store.state.isLoggedin  && ($store.state.role == 'admin') &&  !(copy.available) && (!copy.lended)"  class="burrowBook" vs-type="filled" @click ="restoreCopy(copy.id, copy.userID)">
                     Restore This Copy: {{copy.copyID}}
                    </vs-button>
                       <br><br>

                </div>
         
              
        <div>
          
        </div>   
    </panel>
    <h1></h1>
  </div>
</template>

<script>
import Panel from './Panel.vue'
import BookServices from '@/services/BookServices'
import store from '@/store/store.js'


export default {
   data(){
        return{
            results: {},
            book: {},
            copies: []
        }
    },
    async mounted()
    {
      const bookId = this.$store.state.route.params.id
      this.results = (await  BookServices.getBook (bookId)).data
      this.book = this.results.book
      this.copies = this.results.copies
      console.log(this.copies)
    },
    components: {
        Panel
    }, 
  methods: {
  async burrow(cID)
      {
        console.log(cID)
        console.log("client: "+ this.$store.getters.getState.user.id)
      try
      {
           const response = await BookServices.burrow( {userID: this.$store.getters.getState.user.id, bookID: this.book.id}, cID, this.$store.state.token)
      }
      catch (error)
      {
          console.log(error)
      }
      this.$store.dispatch('setBooks', [this.book])
      vm.$forceUpdate();
      },

    async restoreCopy(copyID, userID)
       {
         console.log("copy: "+ copyID)
         console.log("user: "+ userID)
         console.log("book: "+ this.book.id)
         //const id = this.book.id
          try
            {
                const response = await BookServices.returnCopy({bookID:  this.book.id, copyID: copyID, userID: userID}, this.$store.state.token)
            }
          catch (error)
            {
                console.log(error)
            }
          
       },
       async removeCopy(copyID)
       {  
         //console.log(copyID)
          try
            {
                const response = await BookServices.removeCopy(copyID, {copyID: copyID, bookID: this.book.id, copies: (this.book.copies - 1)}, this.$store.state.token)
            }
          catch (error)
            {
                console.log(error)
            }
       },
       async lendCopy(copyId)
       {
          try
            {
                const response = await BookServices.lendCopy(copyId, this.$store.state.token)
            }
          catch (error)
            {
                console.log(error)
            }
       },
       async returnBook(copyID, userID)
       {
          try
            {
                const response = await BookServices.returnBook({bookID:  this.book.id, copyID: copyID, userID: userID}, this.$store.state.token)
            }
          catch (error)
            {
                console.log(error)
            }
       }
  },

}
</script>

<style scoped>
h2.warning{
  color: rgb(241, 10, 10);
}

</style>