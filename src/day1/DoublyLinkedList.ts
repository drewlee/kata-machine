class Node<T> {
  value: T;
  next?: Node<T>;
  prev?: Node<T>;

  constructor(value: T, next?: Node<T>, prev?: Node<T>) {
    this.value = value;
    this.next = next;
  }
}

export default class DoublyLinkedList<T> {
  public length: number;
  private head?: Node<T>;
  private tail?: Node<T>;

  constructor() {
    this.length = 0;
  }

  /**
   * Inserts an item at the beginning of the list.
   *
   * @param item - Value to insert.
   */
  prepend(item: T): void {
    const newNode = new Node(item);

    if (this.head) {
      this.head.prev = newNode;
    }

    newNode.next = this.head;
    this.head = newNode;
    this.length++;

    if (!this.tail) {
      this.tail = newNode;
    }
  }

  /**
   * Inserts an item into the list at the specified index.
   *
   * @param item - Value to insert.
   * @param idx - Index to insert the value at.
   */
  insertAt(item: T, idx: number): void {
    if (idx === 0) {
      this.prepend(item);
      return;
    }

    if (idx === this.length + 1) {
      this.append(item);
      return;
    }

    if (!this.head) {
      return;
    }

    let currNode = this.head;
    let currIdx = 0;

    while (currNode.next && idx !== currIdx + 1) {
      currNode = currNode.next;
      currIdx++;
    }

    const newNode = new Node(item);
    const tmp = currNode.next?.next;

    currNode.next = newNode;
    newNode.prev = currNode;
  
    if (tmp) {
      tmp.prev = newNode;
    }

    newNode.next = tmp;
    this.length++;
  }

  /**
   * Inserts an item at the end of the list.
   *
   * @param item - Value to insert.
   */
  append(item: T): void {
    const newNode = new Node(item);
    this.length++;

    if (!this.tail) {
      this.head = newNode;
      this.tail = newNode;
      return;
    }

    this.tail.next = newNode;
    newNode.prev = this.tail;
    this.tail = newNode;
  }

  /**
   * Removes the specified value from the list.
   *
   * @param item - Value to remove.
   * @returns The removed value.
   */
  remove(item: T): T | undefined {
    if (!this.head) {
      return;
    }

    if (this.head.value === item) {
      return this.removeAt(0);
    }

    if (this.tail!.value === item) {
      return this.removeAt(this.length);
    }

    let currNode = this.head;
    let result: T | undefined = undefined;

    while (currNode.next) {
      if (currNode.next.value === item) {
        const targetNode = currNode.next;

        currNode.next = targetNode.next;

        if (currNode.next) {
          currNode.next.prev = currNode;
        }

        targetNode.next = undefined;
        targetNode.prev = undefined;
        result = targetNode.value;
        this.length--;

        break;
      }

      currNode = currNode.next;
    }

    return result;
  }

  /**
   * Gets the value at the specified index.
   *
   * @param idx - Index to get the value for.
   * @returns The value.
   */
  get(idx: number): T | undefined {
    if (idx === this.length) {
      return this.tail?.value;
    }

    let currNode = this.head;
    let currIdx = 0;

    while (currNode && currIdx !== idx) {
      currNode = currNode.next;
      currIdx++;
    }

    return currNode?.value;
  }

  /**
   * Removes the value at the specified index.
   *
   * @param idx - Index to remove the value at.
   * @returns The removed value, or `undefined` if the index is out of bounds.
   */
  removeAt(idx: number): T | undefined {
    if (!this.head) {
      return;
    }

    if (idx === 0) {
      const targetNode = this.head;
      this.head = targetNode.next;

      if (this.head) {
        this.head.prev = undefined;
      }

      targetNode.prev = undefined;
      targetNode.next = undefined;
      this.length--;

      return targetNode.value;
    }

    if (idx === this.length) {
      const targetNode = this.tail!;
      this.tail = targetNode.prev;

      if (this.tail) {
        this.tail.next = undefined;
      }

      targetNode.prev = undefined;
      targetNode.next = undefined;
      this.length--;

      return targetNode.value;
    }

    let currNode = this.head;
    let currIdx = 0;

    while (currNode.next && idx !== currIdx + 1) {
      currNode = currNode.next;
      currIdx++;
    }

    // The index is out of bounds.
    if (currIdx > idx) {
      return;
    }

    const targetNode = currNode.next!;
    currNode.next = targetNode.next;

    if (currNode.next) {
      currNode.next.prev = currNode;
    }

    targetNode.prev = undefined;
    targetNode.next = undefined;
    this.length--;

    return targetNode.value;
  }
}
