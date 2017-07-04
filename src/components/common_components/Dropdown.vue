<template>
  <div class="select-option">
    <select class="select-dropdown" v-model='selected'  @change="select()">
      <option v-for="(option, index) in optionList" v-bind:value="option[value]">
        {{ option[show] }}
      </option>
    </select>
    <div class="select-downarrow-back"><div class="select-downarrow"></div></div>
  </div>
</template>

<script>
export default {
  name: 'Dropdown',
  data () {
    return { selected: this.initSelect }
  },
  props: ['optionList', 'initSelect', 'value', 'show'],
  methods: {
    select: function () {
      this.$emit('select', this.selected)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.select-dropdown {
  height: 0.5rem;
  width: 1.3rem;
  padding-left: 0.15rem;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  background-color: #fff;
  -webkit-appearance: none;
  border: 1px #cbcaca solid;
  font-size: 0.2rem;
  font-family: inherit;
  color: #cbcaca;
  border-radius: 0.08rem;
}
.select-downarrow{
  position: relative;
  /* float: right; */
  bottom: 0.12rem;
  right: 0.0795rem;
  border-top: 0.08rem solid #fff;
  border-left: 0.08rem solid transparent;
  border-right: 0.08rem solid transparent;
  width: 0;
  height: 0;  
}
.select-downarrow-back{
  position: relative;
  bottom: 0.475rem;
  left: 0.9rem;
  border-top: 0.12rem solid #9e9d9d;
  border-left: 0.12rem solid transparent;
  border-right: 0.12rem solid transparent;
  width: 0;
  height: 0;  
}
</style>
