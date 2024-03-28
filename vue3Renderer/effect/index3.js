// 原始对象,包含两个属性
const data = {
  text1: "hello world 1",
  text2: "hello world 2",
};

// 存放副作用函数的集合容器。之所以是用Set数据结构，是为了防止相同的副作用函数重复收集
const bucket = new WeakMap();

// 表示当前正在运行的副作用函数
let activeEffect = null;

// 用于执行副作用函数的函数
function effect(fn) {
  activeEffect = fn;
  fn(); // 执行副作用函数
}

// 响应式对象。响应式对象为原始对象的Proxy代理
const obj = new Proxy(data, {
  get(target, key) {
    if(!activeEffect) return target[key]

    let depsMap = bucket.get(target)
    if(!depsMap) {
      depsMap = new Map()
      bucket.set(target, depsMap)
    }
    let deps = depsMap.get(key)
    if(!deps) {
      deps = new Set()
      depsMap.set(key, deps)
    }
    deps.add(activeEffect)

    return target[key];
  },
  set(target, key, val) {
    target[key] = val;
    const depsMap = bucket.get(target)
    if(!depsMap) return
    const effects = depsMap.get(key)
    effects && effects.forEach(fn => fn())
    return true;
  },
});

////////////////////////////////////
// 定义第一个副作用函数
function effectText1() {
  console.log("effect text 1", obj.text1);
}

function effectText2() {
  console.log("effect text 2", obj.text2)
}

// 初始化依次执行副作用函数，触发 get
effect(effectText1);
effect(effectText2);

// 模拟2s后修改数据
setTimeout(() => {
  obj.text2 = "HELLO WORLD 2";
}, 2000);
