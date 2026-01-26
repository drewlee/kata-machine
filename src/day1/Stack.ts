class Node<T> {
  value: T;
  prev?: Node<T>;

  constructor(value: T, next?: Node<T>) {
    this.value = value;
  }
}

export default class Stack<T> {
  public length: number;
  private head?: Node<T>;

  constructor() {
    this.length = 0;
  }

  push(item: T): void {
    const node = new Node(item);
    this.length++;

    if (!this.head) {
      this.head = node;
      return;
    }

    node.prev = this.head;
    this.head = node;
  }

  pop(): T | undefined {
    if (!this.head) {
      return;
    }

    const head = this.head;
    this.head = head.prev;
    this.length--;
    head.prev = undefined;

    return head.value;
  }

  peek(): T | undefined {
    return this.head?.value;
  }
}
