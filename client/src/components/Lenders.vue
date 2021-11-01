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


}
</script>