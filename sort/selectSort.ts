/**
 * 选择排序
 * 1. 假设原始数组的范围为[0, n - 1]。
 * 2. 将数组划分为两部分，[0, i)和[i, n - 1]，其中[0, i)为左闭右开区，且为已从小到大排序好的数组，[i, n - 1]为未排序的数组。
 * 3. 遍历[i, n - 1]，找出其中最小的数的下标minValIndex，将i和minValIndex两数交换位置，这样已排序的数组从[0, i)扩充为[0, i + 1)；未排序的数组从[i, n - 1]缩小为[i + 1, n - 1]。
 * 4.遍历i从0到n - 1,并在每次遍历过程中执行步骤3，这样就能完成对[0, n - 1]的从小到大的排序。 
 * @param arr 
 */
function selectSort(arr: number[]): number[] {
  for(let i = 0; i < arr.length; i++) {
    let minValIndex = i
    for(let j = i; j < arr.length; j++) {
      if(arr[j] < arr[minValIndex]) {
        minValIndex = j
      }
    }
    [arr[i], arr[minValIndex]] = [arr[minValIndex], arr[i]]
  }
  return arr
}

(() => {
  const arr = [-1, 11, -22, 121, -11 , 0, 11, -111111]
  console.log(selectSort(arr))
})()