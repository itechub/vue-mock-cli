let deepClone = function (obj) {
  let str
  let newobj = obj.constructor === Array ? [] : {}
  if (typeof obj !== 'object') {
    return
  } else if (JSON) {
    str = JSON.stringify(obj)
    newobj = JSON.parse(str)
  } else {
    for (let i in obj) {
      newobj[i] = typeof obj[i] === 'object' ? deepClone(obj[i]) : obj[i]
    }
  }
  return newobj
}

module.exports =  { deepClone }
