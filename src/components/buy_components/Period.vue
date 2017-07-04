<template>
  <div class="peroid">
    <span class="peroid-icon">
      <i class="peroid-clock-icon"></i>
    </span>
    <span class="peroid-content">
      第{{ peroidData.peroid }}期 {{peroidData.weekday}}{{peroidData.time}}开奖
    </span>
  </div>
</template>

<script>
export default {
  name: 'peroid',
  data () {
    return {}
  },
  props: ['peroidData']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.peroid{
  padding-top: 0.3rem;
  padding-bottom: 0.2rem;
  border-bottom: 1px #cbcaca solid;
  text-align: left;
  color: #666;
}
.peroid-icon{
  display: inline-block;
  position: relative;
  top: 0.03rem;  
  line-height: 0.24rem;
  width: 0.22rem;
  height: 0.22rem;
  border-radius: 0.22rem;
  border: 1px solid #666;
}
.peroid-clock-icon{
  position: absolute; 
  width: 0.05rem;
  height: 0.08rem;
  margin-left: 0.1rem;
  margin-top: 0.045rem;   
  border-left: 1px solid  #666;
  border-bottom: 1px solid #666;
}
.peroid-content{
  display: inline-block;
  height: 0.24rem;
  line-height: 0.24rem;
}
</style>
