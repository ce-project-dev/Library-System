<template>
    <div>
        <vs-row vs-type="inline-flex" vs-justify="center" vs-align="center">
                   <h1>Users who borrowed books</h1>

            </vs-row>
              <br> <br>
        <!--
        <div class="col d-flex justify-content-center">
            <b-row class="justify-content-lg-center"   no-gutters align-v="center" align-h="center">
            <b-table responsive :items="lenders" :fields="fields"></b-table>
            </b-row>
        </div> -->

        <div v-for="lender in lenders">
            <div class = "justify-content-center">
                <b-card >
                    <b-row class="justify-content-lg-center" no-gutters align-v="center">
                        <b-col >
                            First name: {{lender.fname}}
                        </b-col><b-col>
                            Last name: {{lender.lname}}
                            </b-col><b-col>
                            Email: {{lender.email}}
                            </b-col><b-col>
                            Enroll: {{lender.enroll}}
                            </b-col><b-col>
                            Due date: {{lender.dueDate}}
                        </b-col>
                        <b-col >
                            <b-button variant="success">Accept Return</b-button>
                        </b-col>
                        
                    </b-row>
                </b-card>
            </div>
        
        </div>
        <!--
        <div v-for="book in books" :key="book.id">
  
        <div class="col d-flex justify-content-center" >
            <b-card no-body class="overflow-hodden" style="max-width: 640px;">
            <b-row class="justify-content-lg-center" no-gutters align-v="center">
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
                <b-row>
                <b-col><b-button variant="success" @click= "navigateTo(book.id)">View</b-button></b-col>
                <b-col><b-button variant="warning" @click= "navigateTo(book.id)">Reserve</b-button></b-col>
                </b-row>
                
                </b-card-body>
                </b-col>
            </b-row>
            </b-card>
        </div> -->
    </div>
</template>

<script>
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
            fields:[
                {key: "fname",label:"First Name"},
                {key: "lname",label:"Last Name"},
                {key: "email",label:"Email"},
                {key: "dueDate",label:"Due Date"},
            ],
            lenders: []
        }
    },
    async mounted(){
        this.lenders = (await BookServices.getLenders(this.$store.state.token)).data.books
    }

    /*
    methods: {

      navigateTo(id){
          this.$router.push({ name: 'Book', params: { id } })

      },
         async addCopy()
        {
             try
            {
                const response = await BookServices.getLenders(this.$store.state.token)
            }
          catch (error)
            {
                console.log(error)
            }
        }
 
    },
    watch: {
        '$route.query.search': {
            immediate: true,
            async handler(value){
                this.books = (await BookServices.getBooks(value)).data
                console.log("books :" + this.books)
            }
        }
    }*/

}
</script>