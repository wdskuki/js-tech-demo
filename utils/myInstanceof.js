function myInstanceof(object, classFunc) {
  if(typeof object !== 'object') {
    return false
  }
  const prototype = Object.getPrototypeOf(object)
  if(prototype === null) {
    return false
  }
  if(prototype === classFunc.prototype) {
    return true
  }else {
    return myInstanceof(prototype, classFunc)
  }
}


console.log(myInstanceof(1, Number))
console.log(myInstanceof("1", String))
console.log(myInstanceof([1,2,3], Array))
console.log(myInstanceof({name: "tom"}, Object))
console.log(myInstanceof(new Date(), Date))
console.log(myInstanceof(new Date(), Object))
console.log(myInstanceof(new Date(), Array))

