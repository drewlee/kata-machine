export default class Map<T extends (string | number), V> {
  private store: [T, V][];
  private _size: number;

  constructor() {
    this.store = new Array(10);
    this._size = 0;
  }

  /**
   * A very naive hashing algorithm.
   *
   * @param key - Key to hash.
   * @returns Hashed key.
   */
  private getHash(key: T): number {
    if (typeof key === 'number') {
      return key % this.store.length;
    }

    let sum = 0;
    for (let i = 0; i < key.length; i++) {
      let num = key[i].charCodeAt(0);
      sum += num * (i + 1);
    }

    return sum % this.store.length;
  }

  /**
   * Helper method to determine whether the provided key is valid.
   *
   * @param key - Key to check.
   * @returns Whether the key is valid.
   */
  private isValidKey(key: T): boolean {
    return !(typeof key === 'string' && key.trim() === '');
  }

  /**
   * Returns the value for the given key.
   *
   * @param key - Key to retrieve the value for.
   * @returns Key's value.
   */
  get(key: T): V | undefined {
    if (!this.isValidKey(key)) {
      return;
    }

    const idx = this.getHash(key);
    return this.store[idx]?.[1];
  }

  /**
   * Stores the value for the given key in the map.
   *
   * @param key - Key to use for the value.
   * @param value - Value to set for the given key.
   */
  set(key: T, value: V): void {
    if (!this.isValidKey(key)) {
      return;
    }

    const idx = this.getHash(key);

    if (this.store[idx] === undefined) {
      this.store[idx] = [key, value];
      this._size++;
    } else if (this.store[idx][0] === key) {
      this.store[idx][1] = value;
    }
  }

  /**
   * Deletes the value for the given key.
   *
   * @param key - Key to delete the value for.
   * @returns The deleted value for the given key.
   */
  delete(key: T): V | undefined {
    if (!this.isValidKey(key)) {
      return;
    }

    const idx = this.getHash(key);

    if (this.store[idx] !== undefined && this.store[idx][0] === key) {
      const value = this.store[idx][1];
      delete this.store[idx];
      this._size--;

      return value;
    }

    return;
  }

  /**
   * Returns the number of items stored in the map.
   *
   * @returns Map size.
   */
  size(): number {
    return this._size;
  }
}
