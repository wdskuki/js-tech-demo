class MyQueue {
  stack1: number[]
  stack2: number[]
  constructor() {
      this.stack1 = []
      this.stack2 = []
  }

  push(x: number): void {
      this.stack1.push(x)
  }

  pop(): number {
      while(this.stack1.length) {
        const t = this.stack1.pop()
        this.stack2.push(t)
      }
      return this.stack2.pop()
  }

  peek(): number {
      return this.stack2[this.stack2.length - 1]
  }

  empty(): boolean {
     return this.stack1.length === 0 && this.stack2.length === 0
  }
}

/**
* Your MyQueue object will be instantiated and called as such:
* var obj = new MyQueue()
* obj.push(x)
* var param_2 = obj.pop()
* var param_3 = obj.peek()
* var param_4 = obj.empty()
*/