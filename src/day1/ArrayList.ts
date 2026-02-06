export default class ArrayList<T> {
  public length: number;
  private array: T[];
  private capacity: number;

  constructor(capacity = 5) {
    this.capacity = capacity;
    this.array = new Array(capacity);
    this.length = 0;
  }

  /**
   * Increases the array list's capacity when it is about to be exceeded.
   */
  private checkCapacity() {
    if (this.length < this.capacity) {
      return;
    }

    const oldArray = this.array;
    this.capacity *= 2;
    this.array = new Array(this.capacity);

    for (let i = 0; i < this.length; i++) {
      this.array[i] = oldArray[i];
    }
  }

  /**
   * Adds a new item to the beginning of the array list.
   *
   * @param item - Item to add.
   */
  prepend(item: T): void {
    this.insertAt(item, 0);
  }

  /**
   * Inserts an item at the specified index.
   *
   * @param item - Item to add.
   * @param idx - Insertion index.
   */
  insertAt(item: T, idx: number): void {
    if (idx < 0 || idx > this.length) {
      return;
    }
    this.checkCapacity();

    // Shift items right
    for (let i = this.length; i > idx; i--) {
      this.array[i] = this.array[i - 1];
    }
    this.array[idx] = item;
    this.length++;
  }

  /**
   * Adds a new item to the end of the array list.
   *
   * @param item - Item to add.
   */
  append(item: T): void {
    this.checkCapacity();
    this.array[this.length] = item;
    this.length++;
  }

  /**
   * Removes the specified item from the array list.
   *
   * @param item - Item to remove.
   * @returns Removed item.
   */
  remove(item: T): T | undefined {
    let idx = 0;
    while (idx < this.length && item !== this.array[idx]) {
      idx++;
    }

    // Item not found
    if (idx === this.length) {
      return;
    }

    return this.removeAt(idx);
  }

  /**
   * Retrieves the item stored at the specified index.
   *
   * @param idx - Numeric index.
   * @returns The item.
   */
  get(idx: number): T | undefined {
    return this.array[idx];
  }

  /**
   * Removes and returns the item at the specified index.
   *
   * @param idx - Numeric index.
   * @returns The item.
   */
  removeAt(idx: number): T | undefined {
    if (idx < 0 || idx >= this.length) {
      return;
    }

    const item = this.array[idx];
    for (let i = idx; i < this.length - 1; i++) {
      this.array[i] = this.array[i + 1];
    }

    this.length--;
    delete this.array[this.length];
    return item;
  }
}
