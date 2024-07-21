// debug.js

import { myEffect, myReactive, myComputed, myWatch } from './effect.js'
// 原始对象
const data = {
  a: 1,
};

// 响应式对象
const obj = myReactive(data);

myWatch(obj, (newVal, oldVal) => {
  console.log('watch', `newVal = ${newVal.a}, oldVal = ${oldVal.a}`);
})

obj.a++;
obj.a++;