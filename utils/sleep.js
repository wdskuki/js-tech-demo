const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}

;(async () => {
  await sleep(2000)
  console.log(111)
})()