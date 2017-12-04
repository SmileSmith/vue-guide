
const election5 = {
  'name': '11election5',
  'recommend': false, // default:true, false
  'title': '粤11选5任二幸运号',
  'title_inline': false, // default:true, false
  'number_title': false, // default:false, true
  'number_refresh': true, // default:true, false
  'submit_button': '立即投注',
  'numberList': [
    {
      'number': '01',
      'type': 'normal', // default:normal, sp_blue, sp_white
      'min': 1,
      'max': 40,
      'order': 1
    },
    {
      'number': '01',
      'type': 'normal',
      'min': 1,
      'max': 40,
      'order': 2
    }
  ]
}

const direct3 = {
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

const direct5 = {
  'name': 'direct5',
  'recommend': false, // default:true, false
  'title': '排5直选',
  'title_inline': false, // default:true, false
  'number_title': true, // default:false, true
  'number_refresh': true, // default:true, false
  'submit_button': '立即投注',
  'numberList': [
    {
      'number': '01',
      'type': 'normal',
      'title': '万',
      'min': 1,
      'max': 40,
      'order': 1
    },
    {
      'number': '01',
      'type': 'normal',
      'title': '千',
      'min': 1,
      'max': 40,
      'order': 2
    },
    {
      'number': '01',
      'type': 'normal', // default:normal, sp_blue, sp_white
      'title': '百',
      'min': 1,
      'max': 40,
      'order': 3
    },
    {
      'number': '01',
      'type': 'normal',
      'title': '十',
      'min': 1,
      'max': 40,
      'order': 4
    },
    {
      'number': '01',
      'type': 'normal',
      'title': '个',
      'min': 1,
      'max': 40,
      'order': 5
    }
  ]
}

const multiple7 = {
  'name': 'multiple7',
  'recommend': true, // default:true, false
  'recommend_icon': '荐',
  'title': '复式投注幸运号码',
  'title_inline': true, // default:true, false
  'number_title': false, // default:false, true
  'number_refresh': true, // default:true, false
  'submit_button': '立即投注',
  'numberList': [
    {
      'number': '01',
      'type': 'normal', // default:normal, sp_blue, sp_white
      'min': 1,
      'max': 40,
      'order': 1
    },
    {
      'number': '01',
      'type': 'normal',
      'min': 1,
      'max': 40,
      'order': 2
    },
    {
      'number': '01',
      'type': 'normal',
      'min': 1,
      'max': 40,
      'order': 3
    },
    {
      'number': '01',
      'type': 'normal',
      'min': 1,
      'max': 40,
      'order': 4
    },
    {
      'number': '01',
      'type': 'normal',
      'min': 1,
      'max': 40,
      'order': 5
    },
    {
      'number': '01',
      'type': 'normal',
      'min': 1,
      'max': 40,
      'order': 6
    },
    {
      'number': '04',
      'type': 'sp_blue',
      'min': 1,
      'max': 12,
      'order': 7
    }
  ]
}

const multiple11 = {
  'name': 'multiple11',
  'recommend': true, // default:true, false
  'recommend_icon': '荐',
  'title': '复式投注幸运号码',
  'title_inline': true, // default:true, false
  'number_title': false, // default:false, true
  'number_refresh': false, // default:true, false
  'submit_button': '立即投注',
  'numberList': [
    {
      'number': '01',
      'type': 'sp_white', // default:normal, sp_blue, sp_white
      'min': 1,
      'max': 40,
      'order': 1
    },
    {
      'number': '01',
      'type': 'sp_white',
      'min': 1,
      'max': 40,
      'order': 2
    },
    {
      'number': '01',
      'type': 'sp_white',
      'min': 1,
      'max': 40,
      'order': 3
    },
    {
      'number': '01',
      'type': 'sp_white',
      'min': 1,
      'max': 40,
      'order': 4
    },
    {
      'number': '01',
      'type': 'sp_white',
      'min': 1,
      'max': 40,
      'order': 5
    },
    {
      'number': '01',
      'type': 'sp_white',
      'min': 1,
      'max': 40,
      'order': 6
    },
    {
      'number': '04',
      'type': 'normal',
      'min': 1,
      'max': 12,
      'order': 7
    },
    {
      'number': '04',
      'type': 'sp_white',
      'min': 1,
      'max': 12,
      'order': 8
    },
    {
      'number': '01',
      'type': 'sp_white',
      'min': 1,
      'max': 12,
      'order': 9
    },
    {
      'number': '01',
      'type': 'sp_white',
      'min': 1,
      'max': 12,
      'order': 10
    },
    {
      'number': '01',
      'type': 'normal',
      'min': 1,
      'max': 12,
      'order': 11
    }
  ]
}

// unexcept to be packed into builded file
const uselessObj = {
  name: '测试代码片段：19901205'
}
export {
  election5,
  direct3,
  direct5,
  multiple7,
  multiple11,
  uselessObj
}
