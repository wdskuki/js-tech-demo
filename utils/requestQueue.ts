// 模拟所有的请求URL集合
const urls = ['url1', 'url2', 'url3', 'url4', 'url5', 'url6']

// 模拟请求体
function request(url: string) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`finished ${url}`)
    }, Math.random() * 10000)
  })
}

// 请求队列class
class RequestQueue {
  private maxConcurrentRequests: number = 0
  private currentRequests: number = 0
  private queue: Array<Function> = []
  constructor(num: number) {
    this.maxConcurrentRequests = num
  }

  enqueue(fn: Function) {
    /**
     * 返回一个Promise对象
     */
    return new Promise((resolve, reject) => {
      // 需要添加到queue中的函数体
      const run = async () => {
        try {
          this.currentRequests++
          const result = await fn()
          resolve(result)
        }catch(error) {
          reject(error)
        }finally {
          this.currentRequests--
          if(this.queue.length > 0) {
            const next = this.queue.shift() as Function
            next()
          }
        }
      }
      
      // 主流程
      if(this.currentRequests < this.maxConcurrentRequests) {
        // 如果当前运行的请求数小于最大并发数，则直接运行
        run()
      }else {
        // 否则添加到队列中，等待后续执行
        this.queue.push(run)
      }
    })
  }
}

const rq = new RequestQueue(3)

urls.forEach(url => {
  rq.enqueue(() => request(url)).then(res => {
    console.log(`Resolved result: ${res}`)
  }).catch(err => {
    console.error(`Error: ${err}`)
  })
})


