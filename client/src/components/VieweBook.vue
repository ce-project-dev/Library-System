<template>
  <div>

    <div class="col d-flex justify-content-center" >
            <b-card no-body class="overflow-hodden" style="max-width: 640px;">
            <b-row class="justify-content-lg-center mb-5" no-gutters align-v="center">
                <b-col md="6">
                    <b-card-img :src=book.coverImageURL :alt= book.title class="rounded-0"></b-card-img>
                </b-col>
                <b-col md="6">
                <b-card-body :title = book.title>
                <b-card-text>
                    <div class="author">
                        Written by {{book.author}}
                    </div>
                    <div class="edition">
                        Edition : {{book.edition}} 
                    </div>

                </b-card-text>
                <!--<b-row>-->
                <!--<b-col><b-button variant="success" @click= "navigateTo(book.id)">View</b-button></b-col>-->
                <!--<b-col><b-button v-if="($store.state.books.length == 0)"  variant="success" @click= "navigateTo(book.id)">Reserve a copy</b-button></b-col>
                </b-row>-->
                <b-col><b-button disabled v-if="(this.$store.state.books.length == 1)" variant="danger">You can only reserve a single book</b-button></b-col>
                </b-card-body>
                </b-col>
            </b-row>
            
            <b-row class="justify-content-lg-center" no-gutters align-v="center">
                <div class="mb-2" v-for="(copy,index) in copies" :key="copy.id" >
                    <b-button v-if="$store.state.isLoggedin  && ($store.state.role == 'user' && (copy.available)) && ($store.state.books.length < 1)"  class="burrowBook" variant="success" @click ="burrow(copy.id)" >
                     Burrow This Copy: {{copy.copyID}} index
                    </b-button>

                     <b-button v-if="$store.state.isLoggedin  && ($store.state.role == 'admin') &&  !(copy.available) && (!copy.lended) "  class="burrowBook" varint="primary" @click.once ="lendCopy(copy.id)" >
                     Lend This Copy: {{copy.copyID}} index
                    </b-button>

                    <b-button v-if="$store.state.isLoggedin  && ($store.state.role == 'admin') &&  !(copy.available) && (copy.lended) && !isHidden_"  class="burrowBook" variant="info" @click ="returnBook(copy.id, copy.userID)" :click="isHidden_=true">
                     Return This Copy: {{copy.copyID}}
                    </b-button>

                     <b-button v-if="$store.state.isLoggedin  && ($store.state.role == 'admin')"  class="burrowBook" variant="danger" @click ="removeCopy(copy.id)">
                     Remove This Copy: {{copy.copyID}}
                    </b-button>
                  

                    <b-button v-if="$store.state.isLoggedin  && ($store.state.role == 'admin') &&  !(copy.available) && (!copy.lended)"  class="burrowBook" variant="primary" @click.once ="restoreCopy(copy.id, copy.userID)" >
                     Restore This Copy: {{copy.copyID}}
                    </b-button>
                    

                </div>
            </b-row>

            </b-card>
        </div>
<!--
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
    -->
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
            copies: [],
            isHidden:false,
            isHidden_:false

        }
    },
    async mounted()
    {
      console.log("sjkdhjshd")
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
                const response = await BookServices.removeCopy({copyID: copyID, bookID: this.book.id, copies: (this.book.copies - 1)}, this.$store.state.token)
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
            this.$forceUpdate()
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
h5.warning{
  color: rgb(241, 10, 10);
}

</style>