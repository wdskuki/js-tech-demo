function binarySearch(nums: number[], left: number, right: number, target: number): number {
  while(left <= right) {
    const mid = (left + right) >> 1
    if(nums[mid] === target) {
      return mid
    }else if(target < nums[mid]) {
      right = mid - 1
    }else {
      left = mid + 1
    }
  }
  return -1
}

const arr = [1,3,5,7,9,11,13]
console.log(binarySearch(arr, 0, arr.length - 1, 12))