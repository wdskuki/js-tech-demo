// effect.js

// 存放副作用函数的集合容器，用Set数据结构，是为了防止相同的副作用函数重复收集
const bucket = new WeakMap();

// 表示当前正在运行的副作用函数
let activeEffect = null;

// 副作用栈
let effectStack = [];

// 用于执行副作用函数的函数
export function myEffect(fn) {
  const effectFn = () => {
    // 清除依赖
    cleanup(effectFn);
    // 执行副作用函数
    activeEffect = effectFn;

    effectStack.push(activeEffect)
    fn();

    effectStack.pop()
    activeEffect = effectStack[effectStack.length - 1]
  };
  // 存储该副作用哦函数相关联的依赖
  effectFn.deps = []
  effectFn();
}

// 响应式对象。响应式对象为原始对象的Proxy代理
export const myReactive = (data) =>
  new Proxy(data, {
    get(target, key) {
      if (!activeEffect) return target[key];
      track(target, key);
      return target[key];
    },
    set(target, key, val) {
      target[key] = val;
      trigger(target, key);
      return true;
    },
  });

function track(target, key) {
  if (!activeEffect) return;
  let depsMap = bucket.get(target);
  if (!depsMap) {
    depsMap = new Map();
    bucket.set(target, depsMap);
  }
  let deps = depsMap.get(key);
  if (!deps) {
    deps = new Set();
    depsMap.set(key, deps);
  }
  deps.add(activeEffect);

  // 将deps增加到activeEffect的deps中
  activeEffect.deps.push(deps);
}

function trigger(target, key) {
  const depsMap = bucket.get(target);
  if (!depsMap) return;
  const effects = depsMap.get(key);

  const effectsToRun = new Set(effects); // 拷贝一份新的Set快照数据

  effectsToRun && effectsToRun.forEach((fn) => fn());
}

function cleanup(effectFn) {
  for (let i = 0; i < effectFn.deps.length; i++) {
    const deps = effectFn.deps[i]; // deps为对象属性关联的deps
    deps.delete(effectFn);
  }
  effectFn.deps.length = 0;
}
