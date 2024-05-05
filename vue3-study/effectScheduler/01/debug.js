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
})

obj.value++

console.log('end')
