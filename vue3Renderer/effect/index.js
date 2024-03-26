// 1. 原始对象
const data = { text: "hello world" };

// 2. 存放副作用函数的集合
const bucket = new Set();

// 3. 响应式对象
const obj = new Proxy(data, {
  get(target, key) {
    bucket.add(effect1);
    bucket.add(effect2);
    return target[key];
  },
  set(target, key, val) {
    target[key] = val;
    bucket.forEach((fn) => fn());
    return true;
  },
});

// 4. 第一个副作用函数
function effect1() {
  console.log("effect 1", obj.text);
}

// 4. 第二个副作用函数
function effect2() {
  console.log("effect 2", obj.text);
}

// 执行副作用函数，触发 get
effect1();
effect2();

// 模拟2s后修改数据
setTimeout(() => {
  obj.text = "HELLO WORLD";
}, 2000);
