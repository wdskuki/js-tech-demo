// debug.js

import { myEffect, myReactive, myComputed } from './effect.js'
// 原始对象
const data = {
  a: 1,
  b: 2,
};

// 响应式对象
const obj = myReactive(data);

// const effectFn = myEffect(() => {
//   return obj.a + obj.b
// }, {
//   lazy: true
// })

// console.log(effectFn())

const sum = myComputed(() => {
  return obj.a + obj.b
})

console.log(sum.value)


obj.a = 2

console.log(sum.value)
console.log(sum.value)
console.log(sum.value)