<template>
  <div class="jackpot">
    <div class="jackpot-content">
      <i class="jackpot-icon"></i>
      <span>奖池</span>
      <span class="jackpot-number" v-for="yNumber in jackpotData.yNumbers" > {{yNumber}}</span>
      <span>亿</span>
      <span class="jackpot-number" v-for="wNumber in jackpotData.wNumbers" > {{wNumber}}</span>
      <span>万</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'jackpot',
  data () {
    return {}
  },
  props: ['jackpotData']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.jackpot{
  height: 0.7rem;
  background-color: #ffe6e6;
  margin: 0 -0.2rem;
  border-radius: 0 0 0.18rem 0.18rem;
}
.jackpot-content{
  padding-top: 0.2rem;
  color: #666;
}
.jackpot-icon{
  display: inline-block;
  position: relative;
  top: 0.03rem;
  width: 0.26rem;
  height: 0.26rem;
  background: url("../../assets/icon_rmb.png");
  background-size: cover;
}
.jackpot-number{
  display: inline-block;
  margin-right: 1px;
  width: 0.2rem;
  background-color: #f2514a;
  color: #fff;
  border-radius: 0.06rem;
}
</style>
