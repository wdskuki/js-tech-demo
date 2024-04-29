// debug.js

import { myEffect, myReactive } from './effect.js'

// 原始对象,包含两个属性
const data = {
  text: "hello world",
};

// 响应式对象
const obj = myReactive(data);

// 定义第一个副作用函数
function effect1() {
  console.log("effect 1", obj.text);
}

// 定义第二个副作用函数
function effect2() {
  console.log("effect 2", obj.text);
}

// 初始化依次执行副作用函数，触发Proxy的get
myEffect(effect1);
myEffect(effect2);

// 模拟2s后修改数据
setTimeout(() => {
  obj.text = 'HELLO WORLD'
}, 2000);
