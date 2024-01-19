class MyPromise {
  constructor(fn) {
    this.resolvedCallbacks = []
    this.rejectedCallbacks = []
    this.value = ''
    this.state = 'PENDING' // 'PENDING'/'FULFILLED'/'REJECTED'

    fn(this.resolve.bind(this), this.reject.bind(this))
  }

  then(onFulfilled, onRejected) {
    if(this.state === 'PENDING') {
      this.resolvedCallbacks.push(onFulfilled)
      this.rejectedCallbacks.push(onRejected)
    }
    if(this.state === 'FULFILLED') {
      onFulfilled(this.value)
    }

    if(this.state === 'REJECTED') {
      onRejected(this.value)
    }
    return this
  }

  resolve(value) {
    if(this.state === 'PENDING') {
      this.state = 'FUlFILLED'
      this.value = value
      this.resolvedCallbacks.forEach(cb => cb(value))
    }
  }

  reject(value) {
    if(this.state === 'PENDING') {
      this.state = 'REJECTED'
      this.value = value
      this.rejectedCallbacks.forEach(cb => cb(value))
    }
  }
}