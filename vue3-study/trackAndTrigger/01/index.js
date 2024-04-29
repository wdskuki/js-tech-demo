// 原始对象
const data = { text: "hello world" };

// 存放副作用函数的容器，用Set数据结构，是为了防止相同的副作用函数重复收集
const bucket = new Set();

// 响应式对象，响应式对象为原始对象的Proxy代理
const obj = new Proxy(data, {
  get(target, key) {
    // 将2个副作用函数添加到容器中
    bucket.add(effect1);
    bucket.add(effect2);
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
effect1();
effect2();

// 模拟2s后修改数据
setTimeout(() => {
  obj.text = "HELLO WORLD";
}, 2000);
