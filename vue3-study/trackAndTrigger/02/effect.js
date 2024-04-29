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
export const myReactive = (data) => new Proxy(data, {
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
