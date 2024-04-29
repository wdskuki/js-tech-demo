// 原始对象,包含两个属性
const data = {
  text: "hello world",
};

// 存放副作用函数的容器，用Set数据结构，是为了防止相同的副作用函数重复收集
const bucket = new Set();

// 表示当前正在运行的副作用函数
let activeEffect = null;

// 用于执行副作用函数的函数
export function myEffect(fn) {
  activeEffect = fn;
  fn(); // 执行副作用函数
}

// 响应式对象，响应式对象为原始对象的Proxy代理
const obj = new Proxy(data, {
  get(target, key) {
    if (activeEffect) {
      bucket.add(activeEffect);
    }
    return target[key];
  },
  set(target, key, val) {
    target[key] = val;
    // 将容器中的副作用函数逐一执行
    bucket.forEach((fn) => fn());
    return true;
  },
});

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
