class Node<T> {
  value: T;
  next?: Node<T>;
  prev?: Node<T>;

  constructor(value: T) {
    this.value = value;
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
   * Helper function to retrieve the node at the specified index.
   *
   * @param idx - Index to get the node at.
   * @returns The node.
   */
  private getNodeAt(idx: number): Node<T> | undefined {
    // Minor optimization if idx is the last item in the list.
    if (idx === this.length - 1) {
      return this.tail;
    }

    let currNode = this.head;
    let currIdx = 0;

    while (currNode && currIdx < idx) {
      currNode = currNode.next;
      currIdx++;
    }

    return currNode;
  }

  /**
   * Helper function to remove the specified node.
   *
   * @param node - Node to remove.
   */
  private removeNode(node: Node<T>): void {
    const prevNode = node.prev;
    const nextNode = node.next;

    if (prevNode) {
      prevNode.next = nextNode;
    }

    if (nextNode) {
      nextNode.prev = prevNode;
    }

    if (this.head === node) {
      this.head = nextNode;
    }

    if (this.tail === node) {
      this.tail = prevNode;
    }

    node.prev = undefined;
    node.next = undefined;
    this.length--;
  }

  /**
   * Inserts an item at the beginning of the list.
   *
   * @param item - Value to insert.
   */
  prepend(item: T): void {
    const newNode = new Node(item);
    this.length++;

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      return;
    }

    this.head.prev = newNode;
    newNode.next = this.head;
    this.head = newNode;
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
   * Inserts an item into the list at the specified index.
   *
   * @param item - Value to insert.
   * @param idx - Index to insert the value at.
   */
  insertAt(item: T, idx: number): void {
    if (idx < 0 || idx > this.length) {
      return;
    }

    if (idx === 0) {
      this.prepend(item);
      return;
    }

    if (idx === this.length) {
      this.append(item);
      return;
    }

    if (!this.head) {
      return;
    }

    const currNode = this.getNodeAt(idx)!;
    const prevNode = currNode.prev;
    const newNode = new Node(item);

    if (prevNode) {
      prevNode.next = newNode;
    }

    newNode.prev = prevNode;
    newNode.next = currNode;
    currNode.prev = newNode;
    this.length++;
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

    let currNode = this.head;

    while (currNode) {
      if (currNode.value === item) {
        this.removeNode(currNode);
        break;
      }

      currNode = currNode.next!;
    }

    return currNode?.value;
  }

  /**
   * Gets the value at the specified index.
   *
   * @param idx - Index to get the value for.
   * @returns The value.
   */
  get(idx: number): T | undefined {
    if (idx < 0 || idx >= this.length) {
      return;
    }

    const node = this.getNodeAt(idx);
    return node?.value;
  }

  /**
   * Removes the value at the specified index.
   *
   * @param idx - Index to remove the value at.
   * @returns The removed value, or `undefined` if the index is out of bounds.
   */
  removeAt(idx: number): T | undefined {
    if (idx < 0 || idx > this.length || !this.head) {
      return;
    }

    const node = this.getNodeAt(idx)!;
    this.removeNode(node);

    return node.value;
  }
}
