// debug.js

import { myEffect, myReactive } from './effect.js'
// 原始对象,包含两个属性
const data = {
  value: 1,
};

// 响应式对象
const obj = myReactive(data);

// 初始化副作用
myEffect(() => {
  obj.value = obj.value + 1
});