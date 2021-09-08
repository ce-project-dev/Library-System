<template>
<div class="container">

  <div class="box">
    <div class="header">
  <h4>{{title}}</h4>
  </div>
  <br>
  <slot>
    empty slot
  </slot>
</div>
</div>
</template>

<script>
export default {
    props: [
        'title'
    ]

}
</script>

<style scoped>

.container {
  min-height: 30vh;
  display: flex;
  justify-content: center;
  align-items: center;

}
.box {

  width: 1000px;
 background: #E0EAFC;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #CFDEF3, #E0EAFC);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #CFDEF3, #E0EAFC); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  padding: 50px;
  border-radius: 10px;
  position: relative;
  text-align: center;

}

.vs-con-input-label  {
    width: 300px;
    height: 40px;
}

.header {

  font-size: 30px;
}


</style>
