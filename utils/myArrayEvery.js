Array.prototype.myEvery = function(callbackFn, thisArg = window) {
  for(let i = 0; i < this.length; i++) {
    if(!callbackFn.apply(thisArg, [this[i], i, this])) {
      return false
    }
  }
  return true
}



const a = [1,2,3,4,5].myEvery(function(element, index, array) {
  return element > 0
})

const b = [1,2,3,4,5].myEvery(function(element, index, array) {
  return element > 2
})

const c = [1,2,3,4,5].myEvery(function(element, index, array) {
  return element > 5
})
console.log(a, b, c)