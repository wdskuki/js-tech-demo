// 原始对象,包含两个属性
const data = {
  value: 1,
};

// 存放副作用函数的集合容器。之所以是用Set数据结构，是为了防止相同的副作用函数重复收集
const bucket = new WeakMap();

// 表示当前正在运行的副作用函数
let activeEffect = null;

// 副作用栈
let effectStack = [];
// 用于执行副作用函数的函数
function effect(fn, options = {}) {
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
  // 将options挂载到effectFn上
  effectFn.options = options
  effectFn();
}

// 响应式对象。响应式对象为原始对象的Proxy代理
const obj = new Proxy(data, {
  get(target, key) {
    if(!activeEffect) return target[key]
    track(target, key);
    return target[key];
  },
  set(target, key, val) {
    target[key] = val;
    trigger(target, key);
    return true;
  },
});

function track(target, key){
  if(!activeEffect) return
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

  activeEffect.deps.push(deps);
}

function cleanup(effectFn) {
  for(let i = 0; i < effectFn.deps.length; i++) {
    const deps = effectFn.deps[i]
    deps.delete(effectFn)
  }
  effectFn.deps.length = 0
}

function trigger(target, key) {
  const depsMap = bucket.get(target)
  if(!depsMap) return
  const effects = depsMap.get(key)

  // const effectsToRun = new Set(effects)
  const effectToRun = new Set()
  effects && effects.forEach(effectFn => {
    if(effectFn !== activeEffect) {
      effectToRun.add(effectFn)
    }
  })
  effectToRun && effectToRun.forEach(fn => {
    if(fn.options.scheduler) {
      fn.options.scheduler(fn)
    }else {
      fn()
    }
  })
}


////////////////////////////////////

effect(() => {
  console.log(obj.value)
}, {
  scheduler(fn) {
    setTimeout(() => {
      fn()
    }, 3000)
  }
})

obj.value++

console.log('end')


