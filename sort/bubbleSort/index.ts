/**
 * sort input array from small to large
 */
function bubbleSort(arr:number[]):number[] {
  for(let i = 0; i < arr.length; i++) {
    for(let j = i + 1; j < arr.length; j++) {
      if(arr[i] > arr[j]) {
        [arr[i], arr[j]] = [arr[j], arr[i]] // 交换两个数
      }
    }
  }
  return arr
}

(() => {
  const arr = [-1,1,0,3,111,2]
  bubbleSort(arr)
  console.log(arr)
})()

