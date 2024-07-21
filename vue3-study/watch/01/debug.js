// debug.js

import { myEffect, myReactive, myComputed, myWatch } from './effect.js'
// 原始对象
const data = {
  a: 1,
};

// 响应式对象
const obj = myReactive(data);

myWatch(obj, () => {
  console.log('watch', obj.a);
})

obj.a++;
obj.a++;