function merge_sort_recursive(arr: number[], left: number, right: number): [number, number] {
  if (right - left <= 1) {
    return [left, right];
  }

  const mid = Math.floor((left + right) / 2);
  const leftHalf = merge_sort_recursive(arr, left, mid);
  const rightHalf = merge_sort_recursive(arr, mid, right);
  merge_arrays(arr, leftHalf, rightHalf);

  return [left, right];
}

function merge_arrays(arr: number[], leftArr: number[], rightArr: number[]): void {
  const leftCopy = arr.slice(leftArr[0], leftArr[1]);
  const rightCopy = arr.slice(rightArr[0], rightArr[1]);

  let current = leftArr[0];
  let i = 0;
  let j = 0;

  while (i < leftCopy.length && j < rightCopy.length) {
    if (leftCopy[i] <= rightCopy[j]) {
      arr[current] = leftCopy[i];
      i++;
    } else {
      arr[current] = rightCopy[j];
      j++;
    }
    current++;
  }

  if (i < leftCopy.length) {
    for (let n = i; n < leftCopy.length; n++) {
      arr[current] = leftCopy[n];
      current++;
    }
  }

  if (j < rightCopy.length) {
    for (let n = j; n < rightCopy.length; n++) {
      arr[current] = rightCopy[n];
      current++;
    }
  }
}

export default function merge_sort(arr: number[]): void {
  if (arr.length <= 1) {
    return;
  }

  merge_sort_recursive(arr, 0, arr.length);
}
