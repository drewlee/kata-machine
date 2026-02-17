export default class RingBuffer<T> {
  array: T[];
  length: number;
  readIdx: number;
  writeIdx: number;

  constructor(capacity = 3) {
    this.array = new Array(capacity);
    this.length = 0;
    this.readIdx = 0;
    this.writeIdx = 0;
  }

  push(value: T): void {
    if (this.length === this.array.length) {
      throw new Error('Capacity exceeded');
    }

    this.array[this.writeIdx] = value;
    this.writeIdx = (this.writeIdx + 1) % this.array.length;
    this.length++;
  }

  get(index: number): T | undefined {
    if (index >= this.length) {
      return;
    }

    const getIdx = (this.readIdx + index) % this.array.length;
    return this.array[getIdx];
  }

  pop(): T | undefined {
    if (this.length === 0) {
      return;
    }

    const value = this.array[this.readIdx];
    this.readIdx = (this.readIdx + 1) % this.array.length;
    this.length--;

    return value;
  }
}
