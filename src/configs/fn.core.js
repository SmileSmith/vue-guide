export function randomBall (numberList) {
  var tempConfig = {}
  var jackpotArray
  numberList.forEach(function (element) {
    if (tempConfig.min !== element.min || tempConfig.max !== element.max || tempConfig.type !== element.type) {
      if (tempConfig) {
        tempConfig = {}
      }
      jackpotArray = new Array(element.max - element.min + 1)
      // 给奖池初始化
      var min = element.min
      for (var j = 0, jlength = jackpotArray.length; j < jlength; j++) {
        jackpotArray[j] = min
        min++
      }
      tempConfig.min = element.min
      tempConfig.max = element.max
      tempConfig.type = element.type
    } else {
      tempConfig.num++
    }
    var result = Math.floor(Math.random() * jackpotArray.length)
    element.number = (jackpotArray[result] < 10) ? '0' + jackpotArray[result] : '' + jackpotArray[result]
    jackpotArray.splice(result, 1)
  }, this)
  return numberList
}
