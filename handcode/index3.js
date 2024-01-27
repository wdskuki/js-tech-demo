// 请求并发控制
class TaskQueue{
  constructor(n) {
    this.max = n
    this.cur = 0
    this.list = []
  }

  task(fn) {
    return function() {
      fn().finally(() => {
        this.cur--
        if(this.cur <= this.max && this.list.length) {
          const t = this.list.shift()
          t()
        }
      })
    }
  }

  inQueue(fn) {
    this.list.push(this.task(fn));
    this.cur++
    if(this.cur <= this.max) {
      const t = this.list.shift()
      t()
    }
  }
}

// 实现lazy链式调用: person.eat().sleep(2).eat()
class Person {
  constructor() {
    this.list = []
  }

  inQueue() {

  }

  eat() {
    return new Promise(resolve => {
      console.log(set)
      return this
    })
  }

  sleep(val) {
    return new Promise(resolve => {
      console.log(val)
      return this
    })
  }
}

const person = new Person()

console.log(person.eat().sleep(2).eat())
