<template>
  <div class="full-width-image"></div>
</template>

<script>
export default {
  name: 'logo'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.logo.full-width-image{
  /*保持图片2:1的比例*/
  width: 100%;
  padding-bottom: 50%;
  background: url("../assets/logo.png") center top no-repeat;
  background-size: 100% 100%;  
}

</style>
