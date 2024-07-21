// effect.js

// 存放副作用函数的集合容器，用Set数据结构，是为了防止相同的副作用函数重复收集
const bucket = new WeakMap();

// 表示当前正在运行的副作用函数
let activeEffect = null;

// 副作用栈
let effectStack = [];

// 用于执行副作用函数的函数
export function myEffect(fn, options = {}) {
  const effectFn = () => {
    // 清除依赖
    cleanup(effectFn);
    // 执行副作用函数
    activeEffect = effectFn;

    effectStack.push(activeEffect);
    const ret = fn();

    effectStack.pop();
    activeEffect = effectStack[effectStack.length - 1];
    return ret;
  };
  // 存储该副作用哦函数相关联的依赖
  effectFn.deps = [];
  // 将options挂载到effectFn上
  effectFn.options = options;

  // 只有非lazy，才执行
  if (!options.lazy) {
    effectFn();
  } else {
    return effectFn;
  }
  // effectFn();
}

// 计算属性
export function myComputed(getter) {
  let value;
  let dirty = true;
  const effectFn = myEffect(getter, {
    lazy: true,
    scheduler() {
      dirty = true
    }
  })
  const obj = {
    get value() {
      if (dirty) {
        console.log('get property');
        value = effectFn();
        dirty = false;
        return value;
      } else {
        console.log('cache value');
        return value;
      }
    }
  }
  return obj
}

// watch
export function myWatch(obj, cb) {
  let getter

  if(typeof obj === 'function') {
    getter = obj
  }else {
    getter = () => traverse(obj)
  }
  myEffect(() => getter(), {
    scheduler() {
      cb();
    }
  })
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

  // const effectsToRun = new Set(effects)
  const effectToRun = new Set();
  effects &&
    effects.forEach((effectFn) => {
      // 当前的副作用函数和activeEffect不一样，才会添加到执行集合中
      if (effectFn !== activeEffect) {
        effectToRun.add(effectFn);
      }
    });
  effectToRun &&
    effectToRun.forEach((fn) => {
      if (fn.options.scheduler) {
        // 判断是否有scheduler定义
        fn.options.scheduler(fn);
      } else {
        fn();
      }
    });
}

function cleanup(effectFn) {
  for (let i = 0; i < effectFn.deps.length; i++) {
    const deps = effectFn.deps[i]; // deps为对象属性关联的deps
    deps.delete(effectFn);
  }
  effectFn.deps.length = 0;
}

// 遍历对象的所有属性
function traverse(value, seen = new Set()) {
  if(typeof value !== 'object' || value === null || seen.has(value)) {
    return
  }
  seen.add(value)

  for(const k in value) {
    traverse(value[k], seen)
  }
  return value
}