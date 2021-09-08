<template>
  <div class="pageNo">
     <vs-pagination :total="10" v-model="currentx"  ></vs-pagination>
  </div>
</template>
<script>


export default {
  data: () => ({
    currentx: 8
  })
}
</script>

<style scoped>

.pageNo {
position:absolute;
    width:300px;
    bottom:50px;
    left:45%;

}
</style>
