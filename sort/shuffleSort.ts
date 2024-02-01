function shuffleSort(arr: number[]):void {
  for(let i = 0; i < arr.length; i++) {
    const index = Math.floor(Math.random() * (arr.length - i) + i);
    [arr[i], arr[index]] = [arr[index], arr[i]];
  }
}

const arr2 = [0,1,2,3,4,5,6,7,8,9];
const ret = new Array(arr2.length).fill(0)
for(let i = 0; i < 10000000; i++) {
  shuffleSort(arr2)
  const index = arr2.indexOf(0)
  ret[index] += 1
}

console.log(ret)