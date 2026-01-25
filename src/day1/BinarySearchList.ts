export default function bs_list(haystack: number[], needle: number): boolean {
  let low = 0;
  let high = haystack.length;

  while (low < high) {
    const mid = low + Math.floor((high - low) / 2);
    const value = haystack[mid];

    if (value === needle) {
      return true;
    } else if (value > needle) {
      high = mid;
    } else { // value < needle
      low = mid + 1;
    }
  }

  return false;
}
