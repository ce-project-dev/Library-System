<template>
  <div>
      <h1>Create</h1>

    <vs-row vs-type="inline-flex" vs-justify="center" vs-align="center">
        <vs-input  :success="true"  placeholder="title"  v-model="book.title"/>
    </vs-row>

    <vs-row vs-type="inline-flex" vs-justify="center" vs-align="center">
        <vs-input  :success="true"  placeholder="Artist"  v-model="book.artist"/>
    </vs-row>

    <vs-row vs-type="inline-flex" vs-justify="center" vs-align="center">
        <vs-input  :success="true"  placeholder="genre"  v-model="book.genre"/>
    </vs-row>

    <vs-row vs-type="inline-flex" vs-justify="center" vs-align="center">
        <vs-input  :success="true"  placeholder="album"  v-model="book.album"/>
    </vs-row>

    <vs-row vs-type="inline-flex" vs-justify="center" vs-align="center">
        <vs-input  :success="true"  placeholder="albumImageURL"  v-model="book.albumImageURL"/>
    </vs-row>

    <vs-row vs-type="inline-flex" vs-justify="center" vs-align="center">
        <vs-input  :success="true"  placeholder="youtubeID"  v-model="book.youtubeID"/>
     </vs-row>

    <vs-row vs-type="inline-flex" vs-justify="center" vs-align="center">
        <vs-input  :success="true"  placeholder="lyrics"  v-model="book.lyrics"/>
    </vs-row>

    <vs-row vs-type="inline-flex" vs-justify="center" vs-align="center">
        <vs-input  :success="true"  placeholder="tab"  v-model="book.tab"/>
    </vs-row>
          <div class = "error" v-html='error'/>


        <vs-button vs-type="filled" @click = 'create'>Create</vs-button>


  </div>
</template>

<script>

import BookServices from '@/services/BookServices'

export default
{
    data()
        {
        return {
            book: {
            title :null ,
            artist : null,
            genre : null,
            album : null,
            albumImageURL: null,
            youtubeID: null,
            lyrics:  null,
            tab:  null
            },
            error: null

       }
  },
  methods: {
       async create()
       {
            this.error = null
           console.log("create book")

           const allfilled = Object
                        .keys(this.book)
                        .every(key => !!this.book[key])
            if(!allfilled)
            {
                this.error = 'Please fill all the required fields!'
                return
            }
           try
           {
               const response = await  BookServices.createBook(this.book)
               console.log(response)
           }
           catch(err)
           {
                console.log(err)
           }

       }
  }
}

</script>

<style scoped>
.error{
  color: red;
}
</style>
