import Vue from 'vue'
import Rule from '@/components/Rule'

describe('Rule.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Rule)
    const vm = new Constructor().$mount()
    // 测试获取的DOM中是都文本内容是否匹配
    // expect(vm.$el.querySelector('.lottery').textContent).to.equal('')

    expect(vm.$el.querySelector('.title').textContent).to.equal('规则说明')

    // 测试获取VUE实例中的对象数据
    // expect(vm.msg).to.equal('Welcome!')

    // 测试获取DOM中是否存在某个class
    // expect(vm.$el.classList.contains('lottery-title')).to.be.true
  })
})
