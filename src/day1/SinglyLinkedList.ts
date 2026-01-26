class Node<T> {
  value: T;
  next?: Node<T>;

  constructor(value: T, next?: Node<T>) {
    this.value = value;
    this.next = next;
  }
}

export default class SinglyLinkedList<T> {
  private head?: Node<T>;
  public length: number;

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

    newNode.next = this.head;
    this.head = newNode;
    this.length++;
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

    if (!this.head) {
      this.head = newNode;
      return;
    }

    let currNode = this.head;

    while (currNode.next) {
      currNode = currNode.next;
    }

    currNode.next = newNode;
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

    let currNode = this.head;
    let result: T | undefined = undefined;

    while (currNode.next) {
      if (currNode.next.value === item) {
        const targetNode = currNode.next;

        currNode.next = targetNode.next;
        targetNode.next = undefined;
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
    targetNode.next = undefined;
    this.length--;

    return targetNode.value;
  }
}
