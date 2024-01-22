function isEqual(obj1, obj2) {
  if(isObject(obj1) && isObject(obj2)) {
    const key1 = Object.keys(obj1)
    const key2 = Object.keys(obj2)
    if(key1.length !== key2.length) {
      return false
    }
    for(let key in obj1) {
      if(!isEqual(obj1[key], obj2[key])) {
        return false
      }
    }
    return true
  }else {
    return obj1 === obj2
  }
}

function isObject(obj) {
  return typeof obj === 'object'
}