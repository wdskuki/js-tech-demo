// debug.js

import { myEffect, myReactive } from './effect.js'
// 原始对象,包含两个属性
const data = {
  ok: true,
  text1: "hello world 1",
  text2: "hello world 2",
};

// 响应式对象
const obj = myReactive(data);

// 副作用嵌套
myEffect(function effectOuter() {
  myEffect(function effectInner() {
    console.log('effectInner', obj.text2)
  })
  console.log('effectOuter', obj.text1)
});

// 模拟2s后修改数据
setTimeout(() => {
  obj.text1 = 'HELLO WORLD 1';
}, 2000)

