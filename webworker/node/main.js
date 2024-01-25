import { Worker } from 'node:worker_threads'

const num = 10000000000
const worker = new Worker('./worker.js')
worker.postMessage(num)

worker.on('message', sum => {
  console.log('Main sum', sum)
})
console.log('end')