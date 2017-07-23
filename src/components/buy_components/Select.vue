<template>
  <div class="select" v-if="selectConfig">
    <p class="select-title" v-if="!loading" v-bind:class="{'select-inline': !selectConfig.title_inline, 'select-unit': selectConfig.number_title}">
      <span class="select-recommend" v-if="selectConfig.recommend">
        <div class="recommend-toparrow"></div>{{selectConfig.recommend_icon}}
      </span> {{ selectConfig.title }}:
    </p>
    <div class="select-title" v-if="loading">
      Loading...
    </div>    
    <div class="select-numberline" v-bind:class="{'select-inline': !selectConfig.title_inline, 'select-unit': selectConfig.number_title}">
      <span class="select-number"  v-for="numberObj in numberList">
        <span class="select-number-title" v-if="selectConfig.number_title && numberObj.title"> {{ numberObj.title }} </span>
        <span class="select-number-value" v-bind:class="{'sp-blue': numberObj.type == 'sp_blue', 'sp-white': numberObj.type == 'sp_white'}"> {{ numberObj.number }} </span>
      </span>
      <span class="select-refresh" v-if="selectConfig.number_refresh" @click="getRandomBall($event)"></span>
    </div>
    <div class="select-submit">
      <select-dropdown class="select-money" 
        :optionList="moneyList"  :initSelect="selectedMoney" value="number" show="show"
        v-on:select="changeMoney">
      </select-dropdown><button class="select-button">{{ selectConfig.submit_button }}</button>
    </div>
  </div>
</template>

<script>
import MoneyList from '@/configs/dropdown.moneyList.js'
import Dropdown from '@/components/common_components/Dropdown.vue'
import { randomBall } from '@/configs/fn.core'
// const moneyList = resolve => require(['@/configs/dropdown.moneyList.js'], resolve)
// const Multiple7 = resolve => require(['@/configs/config.multiple7.js'], resolve)

export default {
  name: 'select',
  data () {
    return {
      moneyList: MoneyList.moneyList,
      selectedMoney: 10,
      numberList: this.getRandomBall()
    }
  },
  props: ['selectConfig', 'loading'],
  watch: {
    selectConfig: 'getRandomBall'
  },
  components: {
    'select-dropdown': Dropdown
  },
  methods: {
    changeMoney: function (money) {
      this.selectedMoney = money
    },
    getRandomBall: function (event) {
      if (!this.selectConfig.numberList) {
        return
      }
      this.numberList = randomBall(this.selectConfig.numberList)
      if (!event || !event.currentTarget) {
        return this.numberList
      }
      var refreshElement = event.currentTarget
      refreshElement.classList.remove('rotate')
      window.setTimeout(function () {
        refreshElement.classList.add('rotate')
      }, 0)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.select {
  padding-bottom: 0.1rem;
  text-align: left;
}

.select-title {
  line-height: 0.5rem;
  color: #979696;
  text-align: left;
  font-size: 0.22rem;
}

.select-recommend {
  display: inline-block;
  position: relative;
  top: -0.02rem;
  line-height: 0.27rem;
  height: 0.3rem;
  width: 0.2rem;
  background-color: #f2514a;
  color: #fff;
  text-align: center;
  font-size: 0.15rem;
}

.recommend-toparrow {
  position: absolute;
  bottom: 0;
  border-bottom: 0.06rem solid #fff;
  border-left: 0.1rem solid transparent;
  border-right: 0.1rem solid transparent;
  width: 0;
  height: 0;
}

.select-numberline {
  text-align: left;
}
.select-inline{
  display: inline-block;
  line-height: 0.9rem;
  margin-top: 0.2rem;
  margin-right: 0.15rem;
}
.select-unit{
  height: 0.9rem;
  line-height: 1.2rem;
}
.select-number {
  display: inline-block;
  line-height: 0.5rem;
  width: 0.5rem;
  height: 0.5rem;
  margin-top: 0.1rem;
  margin-right: 0.2rem;
  text-align: center;
}
.select-number-title{
  display: block;
  color: #979696;
}
.select-number-value{
  display: block;
  background-color: #f2514a;
  color: #fff;
  font-size: 0.26rem;
  border-radius: 0.26rem;
  border: 1px solid #fff;
}
.sp-blue {
  background-color: #4493f4;
  border: 1px solid #4493f4;
}

.sp-white {
  background-color: #fff;
  color: #f2514a;
  border: 1px solid #f2514a;
}

.select-refresh {
  display: inline-block;
  position: relative;
  top: 0.06rem;
  width: 0.35rem;
  height: 0.35rem;
  background: url("../../assets/icon_refresh.png");
  background-size: cover;
}
.select-submit{
  text-align: left;
  vertical-align: middle;
  line-height: 0.9rem;
  height: 0.9rem;
}
.select-money {
  display: inline-block;
  width: 1.3rem;
  margin-right: 0.2rem;   
}

.select-button{
  display: inline-block;
  line-height: 0.5rem;
  height: 0.5rem;
  width: 4.08rem;
  background-color: #f2514a;
  color: #fff;
  border: 0;
  font-family: inherit;
  font-size: 0.25rem;
  border-radius: 0.08rem;
}
.select-refresh.rotate {
  transition: All 0.4s ease-in-out;
  -webkit-transition: All 0.4s ease-in-out;
  -moz-transition: All 0.4s ease-in-out;
  -o-transition: All 0.4s ease-in-out;
}
.select-refresh.rotate {
  transform: rotate(360deg);
  -webkit-transform: rotate(360deg);
  -moz-transform: rotate(360deg);
  -o-transform: rotate(360deg);
  -ms-transform: rotate(360deg);
}
</style>
