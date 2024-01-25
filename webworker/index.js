// const workerArray = [
//   new Worker("worker.js"), 
//   new Worker("worker.js"), 
//   new Worker("worker.js"),
//   new Worker("worker.js"), 
//   new Worker("worker.js"),
//   new Worker("worker.js"),
//   new Worker("worker.js"), 
//   new Worker("worker.js"),
//   new Worker("worker.js"),
//   new Worker("worker.js"),
// ];

const workerArray = new Array(navigator.hardwareConcurrency).fill(new Worker('./worker.js'))
const num = 100000000;

let totalCount = 0;

run(10)
function run(total) {
  let count = 0;
  let sum = 0;
  const startTimestamp = performance.now();
  workerArray.forEach((item) => {
    item.onmessage = function (event) {
      sum += event.data;
      count++;
      if (count === workerArray.length) {
        const endTimestamp = performance.now();
        console.log(`Worker,  total Sum: ${sum}, cost time: ${endTimestamp - startTimestamp}`);
        const node = document.createElement('div')
        node.innerText = `${endTimestamp - startTimestamp}`
        document.getElementById('app').appendChild(node)
        totalCount++;
        if(totalCount < total) {
          run(total)
        } 
      }
    };
  });

  let start = 1;
  const duration = Math.ceil(num / workerArray.length);
  workerArray.forEach((item) => {
    const end = Math.min(start + duration, num);
    console.log("postMessage", start, end);
    item.postMessage({
      start: start,
      end: end,
    });
    start = end + 1;
  });
}
