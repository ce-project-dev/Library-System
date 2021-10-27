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
        
                <div  v-for="copy in copies" :key="copy.id" >
                      <vs-button v-if="$store.state.isLoggedin" class="burrowBook" vs-type="filled" @click ="burrow(copy.id)">
                     Burrow This Copy
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

        console.log(store.getters.getState.user.id)
      }
  }
}
</script>

