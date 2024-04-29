import { myEffect, myReactive } from './effect.js'
// 原始对象,包含两个属性
const data = {
  text1: "hello world 1",
  text2: "hello world 2",
};

// 响应式对象
const obj = myReactive(data);

// 定义第一个副作用函数
function effectText1() {
  console.log("effect text 1", obj.text1);
}

// 定义第二个副作用函数
function effectText2() {
  console.log("effect text 2", obj.text2);
}

// 初始化依次执行副作用函数，触发Proxy的get
myEffect(effectText1);
myEffect(effectText2);

// 模拟2s后修改数据
setTimeout(() => {
  obj.text2 = 'HELLO WORLD 2'
}, 2000);
