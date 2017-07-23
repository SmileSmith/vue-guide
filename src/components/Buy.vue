<template>
  <div>
    <buy-peroid :peroid-data="peroidData"></buy-peroid>
    <buy-select :select-config="selectConfig" :loading="loading"></buy-select>
    <buy-jackpot :jackpot-data="jackpotData"></buy-jackpot>
  </div>
</template>

<script>
import Peroid from '@/components/buy_components/Period.vue'
import Select from '@/components/buy_components/Select.vue'
import Jackpot from '@/components/buy_components/Jackpot.vue'

// const Multiple7 = resolve => require(['@/configs/config.multiple7.js'], resolve)
// const Multiple11 = resolve => require(['@/configs/config.multiple11.js'], resolve)
// const Election5 = resolve => require(['@/configs/config.11election5.js'], resolve)
// const Direct3 = resolve => require(['@/configs/config.direct3.js'], resolve)
// const Direct5 = resolve => require(['@/configs/config.direct5.js'], resolve)
import Multiple7 from '@/configs/config.multiple7.js'
import Multiple11 from '@/configs/config.multiple11.js'
import Election5 from '@/configs/config.11election5.js'
import Direct3 from '@/configs/config.direct3.js'
import Direct5 from '@/configs/config.direct5.js'

export default {
  name: 'buy',
  data () {
    return {
      peroidData: {
        peroid: '00001',
        weekday: '周周',
        time: '00:00'
      },
      jackpotData: {
        yNumbers: '00',
        wNumbers: '0000'
      },
      selectConfig: this.getConfig(),
      loading: false
    }
  },
  watch: {
    '$route': 'initData'
  },
  mounted: function () {
    this.getCurrentPeroid()
  },
  methods: {
    initData: function () {
      this.selectConfig = this.getConfig()
      this.getCurrentPeroid()
    },
    getConfig: function () {
      var config
      switch (this.$route.params.type) {
        case 'multiple7':
          config = Multiple7
          break
        case 'multiple11':
          config = Multiple11
          break
        case 'election5':
          config = Election5
          break
        case 'direct3':
          config = Direct3
          break
        case 'direct5':
          config = Direct5
          break
        default:
          config = Multiple7
      }
      return config
    },
    getCurrentPeroid: function () {
      // 展示加载中的效果
      this.loading = true
      // 请求服务器配置信息，这里用express.router模拟 /mocks/config.buy.json
      this.$http.post('/api/getCurrentPeroid', {type: this.$route.params.type}).then(function (response) {
        this.loading = false
        this.jackpotData = response.data.data.jackpotData
        this.peroidData = response.data.data.peroidData
      }, function (rejection) {
        this.loading = false
        this.peroidData = {
          peroid: '14134',
          weekday: '周二',
          time: '09:30'
        }
        this.jackpotData = {
          yNumbers: '11',
          wNumbers: '768'
        }
      })
    }
  },
  components: {
    'buy-peroid': Peroid,
    'buy-select': Select,
    'buy-jackpot': Jackpot
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.buy {
  padding: 0 0.2rem;
  margin: 0 0.2rem 0 0.2rem;
  background-color: #fff;
  border-radius: 0.18rem;
  font-size: 0.24rem;
}
</style>
