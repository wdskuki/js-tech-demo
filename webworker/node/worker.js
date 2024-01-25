import { parentPort } from 'node:worker_threads'


parentPort.on('message', value => {
  let sum = 0
  for(let i = 1; i <= value; i++) {
    sum += i
  }
  parentPort.postMessage(sum)
})