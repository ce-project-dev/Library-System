<template>
  <div>
    <panel title="Lyrics">
    </panel>
    <h1>123</h1>
  </div>
</template>

<script>
import Panel from './Panel.vue'
import BookServices from '@/services/BookServices'

export default {
   data(){
        return{
            song: {}
        }
    },
    async mounted()
    {
      const songId = this.$store.state.route.params.id
      this.song = (await  BookServices.getBook (songId)).data
      console.log(this.song.lyrics)
    },
    components: {
        Panel
    }
}
</script>

