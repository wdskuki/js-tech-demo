// 实现Object.create
function create(obj) {
  function F() {};
  F.prototype = obj;
  F.prototype.constructor = F;

  return new F();
}

// 实现instanceof方法
function myInstanceof(obj, Func) {
  let proto = Object.getPrototypeOf(obj)
  while(proto) {
    if(proto === Func.prototype) {
      return true
    }else {
      proto = Object.getPrototypeOf(proto)
    }
  }
  return false
}

// 实现new关键字
function newFunc(Func, ...args) {
  const ret = Object.create(Func.prototype)
  const result = Func.apply(ret, args)
  if(result && typeof result === 'object') return result
  return ret
}

// 拦截构造函数
function Person(name) {
  if(new.target !== undefined) {
    console.log('拦截构造函数')
    this.name = name
  }else {
    console.error('报错')
  }
}
// const a = new Person('wds')

// ES5继承
function Father(name, age) {
  this.name = name
  this.age = age
} 

Father.prototype.x = 1
Father.prototype.sayName = function() {
  console.log(this.name, '666')
}

function Child(name, age) {
  Father.call(this, name, age)
  this.a = 1
}

Child.prototype = Object.create(Father.prototype)
Child.prototype.constructor = Child
// const c = new Child('wds', 34)
// console.log(c.sayName())


// 防抖函数
function debounce(fn, wait) {
  let timer = null
  return function(...args) {
    if(timer) {
      clearTimeout(timer)
      timer = null
    }else {
      timer = setTimeout(() => {
        fn.apply(this, args)
      }, wait)
    }
  }
}

// 截流函数
function throttle(fn, delay) {
  let timer = null
  return function(...args) {
    if(timer) {
      return
    }else {
      timer = setTimeout(() => {
        fn.apply(this, args)
        timer = null
      }, delay)
    }
  }
}

function throttle2(fn, delay) {
  let now = 0
  return function (...args) {
    const now2 = Date.now()
    if(now2 - now > delay) {
      fn.apply(this, args)
      now = now2
    }else {
      return
    }
  }
}

//  类型判断函数
function getType(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1)
}

// 实现call函数
Function.prototype.myCall = function(context, ...args) {
  if(typeof this !== 'function') {
    throw new Error()
  }
  context = context || window
  const symbol = Symbol('customCall')
  context[symbol] = this
  const ret = context[symbol](...args)
  delete context[symbol]
  return ret
}

// 实现apply函数
Function.prototype.myApply = function(context, args) {
  if(typeof this !== 'function') {
    throw new Error()
  }
  context = context || window
  const symbol = Symbol('customCall')
  context[symbol] = this
  const ret = context[symbol](...args)
  delete context[symbol]
  return ret
}

// 实现bind函数
Function.prototype.myBind = function(context, ...args) {
  if(typeof this !== 'function') {
    throw new Error()
  }
  const fn = this

  return function (...args2) {
    return fn.apply(context, [...args, ...args2])
  }
}

// 浅拷贝
// const target = {}
// Object.assign(target, {a:1}, {b:2, c: {d: 1}})
// console.log(target)
function shallowCopy(obj) {
  if(!obj || typeof obj !== 'object') return obj;
  if(obj instanceof Array) {
    const ret = []
    for(let i = 0; i < obj.length; i++) {
      ret.push(obj[i])
    }
    return ret
  }else {
    const ret = {}
    for(let key in obj) {
      if(obj.hasOwnProperty(key)) {
        ret[key] = obj[key]
      }
    }
    return ret
  }
}

// 深拷贝
function deepCopy(obj, map) {
  if(typeof obj !== object || obj === null) return obj

  if(map.has(obj)) return map.get(obj)
  const ret = {}
  map.set(obj, ret)
  for(let key in obj) {
    if(obj.hasOwnProperty(key)) {
      if(typeof obj[key] === 'object') {
        if(map.has(obj[key])) {
          ret[key] = map.get(obj[key])
        }else {
          ret[key] = deepCopy(obj[key])
        }
      }else {
        ret[key] = obj[key]
      }
    }
  }
  return ret
}

// 实现async/await
function getNum(n) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(n+1)
    }, 1000)
  })
}

function aysncFun(fn) {
  var gen = fn()

  function next(data) {
    var result = gen.next(data);
    if(result.data) return result.value;
    result.value.thne(data => {
      next(data)
    })
  }
  next();
}

function* func() {
  var f1 = yield genNum(1)
  var f2 = yield genNum(f1)
  console.log(2)
}

asyncFun(func)


// ES5实现map函数
Array.prototype.myMap = function(fn, thisArg) {
  const self = this
  const ret = []
  for(let i = 0; i < self.length; i++) {
    ret.push(fn.call(thisArg, self[i], i, self))
  }
  return ret
}

// ES5实现reduce函数
Array.prototype.myReduce = function(callbackFn, initialValue) {
  let ret = null
  if(initialValue) {
    ret = initialValue
  }else {
    ret = this[0]
  }
  let startIndex = initialValue ? 0 : 1
  for(let i = startIndex; i < this.length; i++) {
    ret = callbackFn.call(null, ret, this[i], i, this)
  }
  return ret
}