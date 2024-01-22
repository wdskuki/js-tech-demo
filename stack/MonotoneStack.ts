class MonotoneStack {
  stack: number[]
  constructor(arr: number[]) {
    this.stack = []
    arr.forEach(item => {
      this.push(item)
    })
  }

  push(n: number) {
    if(this.stack.length === 0) {
      
      this.stack.push(n)
      console.log("PUSH", n, this.stack)
    }else {
      let top = this.stack[this.stack.length - 1]
      if(n < top) {
        
        this.stack.push(n)
        console.log("PUSH", n, this.stack)
      }else {
        while(this.stack.length) {
          let top = this.stack[this.stack.length - 1]
          if(n >= top) {
            this.pop()
          }else {
            break
          }
        }
        
        this.stack.push(n)
        console.log("PUSH", n, this.stack)
      }
    }
  }
  pop() {
   
    const n = this.stack.pop()
    console.log('POP: ', n, this.stack)
    return n
  }
}

// console.log(1111)
new MonotoneStack([2,7,5,4,6,3,4,2])
