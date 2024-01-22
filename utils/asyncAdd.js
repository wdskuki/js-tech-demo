function asyncAdd(a, b, callback) {
  setTimeout(() => {
    callback(null, a + b)
  }, 500)
}


const promiseAdd = (a, b) => {
  return new Promise((resolve, reject) => {
    asyncAdd(a, b, (err, data) => {
      if(err) {
        reject(err)
      }else {
        resolve(data)
      }
    })
  })
}

// promiseAdd(1,2).then(data => {
//   console.log(data)
// }).catch(err => {
//   console.error(err)
// })


function serialSum(...args) {
  return args.reduce((pre, cur) => pre.then(res => promiseAdd(res, cur)), Promise.resolve(0))
}


async function parallelSum(...args) {
  if(args.length === 1) return args[0]

  const list = []
  for(let i = 0; i < args.length; i+=2) {
    list.push(promiseAdd(args[i], args[i+1] || 0))
  }

  let result = []
  // ;(async () => {
    result = await Promise.all(list)
  // })()
  return parallelSum(...result)
}


// async function serialSum(...args) {
//   return args.reduce((task, now) => task.then(res => promiseAdd(res, now)), Promise.resolve(0))
// }



serialSum(1,2,3,4,5).then(res => {
  console.log(res)
})

;(async () => {
  await parallelSum(1,2,3,4,5).then(res => {
    console.log('parallelSum: ', res)
  })
})()
