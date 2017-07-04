<template>
  <div id="lottery">
    <router-view class="logo"></router-view>
    <router-view class="buy" name="buy"></router-view>
    <router-view class="rule" name="rule"></router-view>
  </div>
</template>

<script>
export default {
  name: 'lottery'
}
</script>

<style>
#lottery {
  /*占满整屏*/
  min-height: 100vh;
  text-align: center;
  font-size: 0.14rem;
  font-family: 'Microsoft YaHei';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background:-webkit-linear-gradient(-90deg,#ca4233,#c13736);
}

</style>

