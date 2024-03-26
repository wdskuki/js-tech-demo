/**
 * 响应式原理
 * 1. 创建响应式对象
 * 2. 监听数据变化
 * 3. 触发更新
 * 
 */
// 原始对象
const data = {text: 'hello world'};

// 存放副作用的集合
const bucket = new WeakMap()
let activeEffect = null
// 副作用函数
function effect(fn) {
  activeEffect = fn
  fn()
}

// 响应式对象
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
    return target[key]
  },
  set(target, key, newVal) {
    target[key] = newVal
    const depsMap = bucket.get(target)
    if(!depsMap) return
    const effects = depsMap.get(key)
    effects && effects.forEach(fn => fn())
  }
})

// 执行副作用函数，触发 get
effect(() => {
  console.log(obj.text)
})

// 模拟2s后修改数据
setTimeout(() => {
  obj.text2 = 'HELLO WORLD!'
}, 2000)
