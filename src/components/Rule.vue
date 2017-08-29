<template>
  <div>
    <div class="title">
      <legend>{{ title }}</legend>
    </div>
    <ul class="content">
      <li class="tip">{{ content }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'rule',
  data () {
    return {
      title: '规则说明',
      content: '彩票的规则说明彩票的规则说明彩票的规则说明彩票的规则说明彩票的规则说明彩票的规则说明彩票的规则说明彩票的规则说明彩票的规则说明'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.rule {
  width: 100%;
  color: #8e2424;
  margin-top: 0.5rem;
}
.rule .title{
  padding: 0 0.55rem;
}
.rule .title legend{
  height: 1px;
  line-height: 1px;
  padding: 0 0.2rem;
  margin: 0.35rem auto;
  font-size: 0.28rem;
  font-weight: bold;
  text-align: center;
  border-left: 1.75rem solid #8e2424;
  border-right: 1.75rem solid #8e2424;
}
.rule ul.content {
  list-style-type: none;
  padding: 0;
  margin: 0 0.4rem;
  font-size: 0.2rem;
  line-height: 0.3rem;
}
.rule li.tip {
  text-align: left;
}

</style>
