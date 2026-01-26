class Node<T> {
  value: T;
  next?: Node<T>;

  constructor(value: T, next?: Node<T>) {
    this.value = value;
    this.next = next;
  }
}

export default class Queue<T> {
  public length: number;
  head?: Node<T>;
  tail?: Node<T>;

  constructor() {
    this.length = 0;
  }

  enqueue(item: T): void {
    const node = new Node(item);
    this.length++;

    if (!this.tail) {
      this.head = node;
      this.tail = node;
      return;
    }

    this.tail.next = node;
    this.tail = node;
  }

  deque(): T | undefined {
    if (!this.head) {
      return;
    }

    const head = this.head;
    this.head = this.head.next;

    if (this.tail === head) {
      this.tail = undefined;
    }

    head.next = undefined;
    this.length--;

    return head.value;
  }

  peek(): T | undefined {
    return this.head?.value;
  }
}
