function myNew(fn, ...args) {
  const obj = Object.create(fn.prototype)
  const result = fn.apply(obj, args)
  const typeName =typeof result
  if(typeName === 'object' || typeName === 'function') {
    return result
  }else {
    return obj
  }
}

function Father(age) {
  this.age = age
}

const fa = new Father(61)
console.log(fa.age)
const fa2 = myNew(Father, 62)
console.log(fa2.age)