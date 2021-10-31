<template>
    <div>
        <vs-row vs-type="inline-flex" vs-justify="center" vs-align="center">
                   <h1>Users who borrowed books</h1>

            </vs-row>
              <br> <br>
        <div>
            <b-table :items=""
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
</script>