export default function insertion_sort(arr: number[]): void {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i;

    while (j > 0 && arr[j - 1] > key) {
      arr[j] = arr[j - 1];
      j--;
    }

    arr[j] = key;
  }
}
