function updateHeap(arr: number[], n: number, index: number) {
  const left = index + index + 1
  const right = index + index + 2
  if(left < n && arr[left] > arr[index]) {
    [arr[left], arr[index]] = [arr[index], arr[left]]
    updateHeap(arr, n, left)
  }
  if(right < n && arr[right] > arr[index]) {
    [arr[right], arr[index]] = [arr[index], arr[right]]
    updateHeap(arr, n, right)
  }
}

function buildHead(arr: number[], n: number) {
  for(let i = arr.length - 1; i >= 0; i--) {
    updateHeap(arr, n, i)
  }
}

function headSort(arr: number[]) {
  let n = arr.length
  while(n >= 1) {
    buildHead(arr, n);
    [arr[0], arr[n - 1]] = [arr[n - 1], arr[0]]
    n--
  }
}

const arr = [3,2,1,311,211,31, -12]

headSort(arr)
console.log(arr)