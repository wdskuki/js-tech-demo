self.onmessage = function(event) {
  const start = event.data.start
  const end = event.data.end
  let sum = 0
  for(let i = start; i <= end; i++) {
    sum += i
  }
  self.postMessage(sum);
}