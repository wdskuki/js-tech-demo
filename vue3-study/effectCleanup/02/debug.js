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

// 定义第一个副作用函数
function effectOk() {
  console.log("effectOk", obj.ok ? obj.text1: obj.text2);
}

// 初始化依次执行副作用函数，触发 get
myEffect(effectOk);

// 模拟2s后修改ok
setTimeout(() => {
  obj.ok = false;
}, 2000);

// 模拟4s后修改text1
setTimeout(() => {
  obj.text1 = 'HELLO WORLD 1';
}, 4000)
