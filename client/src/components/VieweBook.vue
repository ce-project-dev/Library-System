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
                      <vs-button v-if="$store.state.isLoggedin  && ($store.state.role == 'user' && (copy.available))"  class="burrowBook" vs-type="filled" @click ="burrow(copy.id)">
                     Burrow This Copy: {{copy.copyID}}
                    </vs-button>
                     <vs-button v-if="$store.state.isLoggedin  && ($store.state.role == 'admin')"  class="burrowBook" vs-type="filled" @click ="removeCopy(copy.id)">
                     Remove This Copy: {{copy.copyID}}
                    </vs-button>
                  

                    <vs-button v-if="$store.state.isLoggedin  && ($store.state.role == 'admin') &&  !(copy.available)"  class="burrowBook" vs-type="filled" @click ="returnCopy(copy.id, copy.userID)">
                     Return This Copy: {{copy.copyID}}
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
      //console.log(this.copies)
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
           const response = await BookServices.burrow( {userID: this.$store.getters.getState.user.id, bookID: this.book.id}, cID)
      }
      catch (error)
      {
          console.log(error)
      }

      vm.$forceUpdate();
      },
    async returnCopy(copyID, userID)
       {
         console.log("copy: "+ copyID)
         console.log("user: "+ userID)
         console.log("book: "+ this.book.id)
         
          try
            {
                const response = await BookServices.returnCopy({bookID:  this.book.id, copyID: copyID, userID: userID})
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
                const response = await BookServices.removeCopy(copyID, {copyID: copyID, bookID: this.book.id, copies: (this.book.copies - 1)})
            }
          catch (error)
            {
                console.log(error)
            }
       }
  },

}
</script>

