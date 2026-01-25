export default function two_crystal_balls(breaks: boolean[]): number {
  const jumpAmount = Math.floor(Math.sqrt(breaks.length));
  let i = jumpAmount;

  while (i < breaks.length) {
    if (breaks[i]) {
      break;
    }

    i += jumpAmount;
  }

  let j = i - jumpAmount;

  while (j <= i) {
    if (breaks[j]) {
      return j;
    }

    j++;
  }

  return -1;
}
