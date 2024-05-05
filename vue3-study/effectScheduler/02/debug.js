// debug.js

import { myEffect, myReactive } from './effect.js'
// 原始对象
const data = {
  value: 1,
};

// 响应式对象
const obj = myReactive(data);

myEffect(() => {
  console.log(obj.value)
}, {
  scheduler(fn) {
    setTimeout(() => {
      fn()
    }, 3000)
  }
})

obj.value++

console.log('end')
