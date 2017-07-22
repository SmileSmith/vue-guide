export default {
  'name': 'direct3',
  'recommend': false, // default:true, false
  'title': '福彩3D直选幸运号',
  'title_inline': false, // default:true, false
  'number_title': true, // default:false, true
  'number_refresh': true, // default:true, false
  'submit_button': '立即投注',
  'numberList': [
    {
      'number': '01',
      'type': 'normal', // default:normal, sp_blue, sp_white
      'title': '百',
      'min': 1,
      'max': 40,
      'order': 1
    },
    {
      'number': '01',
      'type': 'normal',
      'title': '十',
      'min': 1,
      'max': 40,
      'order': 2
    },
    {
      'number': '01',
      'type': 'normal',
      'title': '个',
      'min': 1,
      'max': 40,
      'order': 3
    }
  ]
}
