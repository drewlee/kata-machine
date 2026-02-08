export default class MinHeap {
  public length: number;
  private data: number[];

  constructor() {
    this.data = [];
    this.length = 0;
  }

  insert(value: number): void {
    this.data[this.length] = value;
    this.heapifyUp(this.length);
    this.length++;
  }

  delete(): number {
    if (this.length === 0) {
      return -1;
    }

    const out = this.data[0];
    this.length--;

    if (this.length === 0) {
      this.data = [];
      return out;
    }

    this.data[0] = this.data[this.length];
    this.heapifyDown(0);

    return out;
  }

  private heapifyDown(idx: number): void {
    if (idx >= this.length) {
      return;
    }

    const lIdx = this.leftChild(idx);
    const rIdx = this.rightChild(idx);

    if (lIdx >= this.length) {
      return;
    }

    const lV = this.data[lIdx];
    const rV = this.data[rIdx];
    const v = this.data[idx];

    if (lV > rV && v > rV) {
      [this.data[rIdx], this.data[idx]] = [this.data[idx], this.data[rIdx]];
      this.heapifyDown(rIdx);
    } else if (rV > lV && v > lV) {
      [this.data[lIdx], this.data[idx]] = [this.data[idx], this.data[lIdx]];
      this.heapifyDown(lIdx);
    }
  }

  private heapifyUp(idx: number): void {
    if (idx === 0) {
      return;
    }

    const p = this.parent(idx);
    const pVal = this.data[p];
    const v = this.data[idx];

    if (pVal > v) {
      [this.data[idx], this.data[p]] = [this.data[p], this.data[idx]];
      this.heapifyUp(p);
    }
  }

  private parent(idx: number): number {
    return Math.floor((idx - 1) / 2);
  }

  private leftChild(idx: number) {
    return idx * 2 + 1;
  }

  private rightChild(idx: number) {
    return idx * 2 + 2;
  }
}
