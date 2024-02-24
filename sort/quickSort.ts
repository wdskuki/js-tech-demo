function quickSort(arr: number[], left: number, right: number): void {
  if(left < right) {
    const p = partition(arr, left, right);
    quickSort(arr, left, p - 1);
    quickSort(arr, p + 1, right);
  }
}

function partition(arr: number[], left: number, right: number): number {
  const pivot = arr[right];
  let i = left - 1;
  for(let j = left; j < right; j++) {
    if(arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
  return i + 1;
}

const t = [4,3,5,2,1, -111];
quickSort(t, 0, t.length - 1)
console.log(t);