<template>
  <div>
            <vs-row vs-type="inline-flex" vs-justify="center" vs-align="center">
                   <h1>Book List</h1>

            </vs-row>
              <br> <br>
         <div v-for="book in books" :key="book.id">

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
                <br><br>
                <vs-button class="viewBook" vs-type="filled" @click ="navigateTo(book.id)">
                View
                </vs-button>
                <br> <br>
                <vs-button class="viewBook" vs-type="filled" v-if="$store.state.isLoggedin  && ($store.state.role == 'admin')">
                Add Copy
                </vs-button>
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
//import Panel from '@/components/Panel'
import Panel from './Panel.vue'
import BookServices from '@/services/BookServices'
import Pages from './Pages.vue'
export default {

    components: {
        Panel,
        Pages

    },
    data(){
        return{
            books: null
        }
    },
    
    methods: {

      navigateTo(id){
          this.$router.push({ name: 'Book', params: { id } })

      }

    },
    watch: {
        '$route.query.search': {
            immediate: true,
            async handler(value){
                this.books = (await BookServices.getBooks(value)).data
            }
        }
    }

}
</script>

<style scoped>
    .albumImage{
        width: 50%;
        margin: 0 auto;
        border-radius: 15px;
        border-color: black;

    }
    .title{
        font-size: 30px;
    }
    .album{
        font-size: 24px;
    }
    .artist{
        font-size: 18px;
    }


</style>


