interface TrieNode {
  keys: { [key: string]: TrieNode },
  isEnd: boolean;
}

export default class Trie {
  private root: TrieNode;

  constructor() {
    this.root = {
      keys: {},
      isEnd: false,
    };
  }

  /**
   * Inserts a new word into the trie.
   *
   * @param item - Word to insert.
   */
  insert(item: string): void {
    let node = this.root;

    for (const char of item) {
      if (node.keys[char] === undefined) {
        node.keys[char] = {
          keys: {},
          isEnd: false,
        };
      }

      node = node.keys[char];
    }

    node.isEnd = true;
  }

  /**
   * Delete the specified word from the trie.
   *
   * @param item - Word to delete.
   */
  delete(item: string): void {
    const stack: [TrieNode, string][] = [];
    let node = this.root;

    for (const char of item) {
      if (node.keys[char] === undefined) {
        return;
      }

      stack.push([node, char]);
      node = node.keys[char];
    }

    if (!node.isEnd) {
      return;
    }

    node.isEnd = false;

    while (stack.length) {
      const [node, char] = stack.pop()!;

      if (!Object.keys(node.keys[char].keys).length && !node.isEnd) {
        delete node.keys[char];
      }
    }
  }

  /**
   * Returns an array of words matching the specified prefix.
   *
   * @param partial - Prefix to search on.
   * @returns Words matching the prefix.
   */
  find(partial: string): string[] {
    const result: string[] = [];
    let prefix = '';
    let node = this.root;

    for (const char of partial) {
      if (node.keys[char] === undefined) {
        return result;
      }

      prefix += char;

      if (node.isEnd) {
        result.push(prefix);
      }

      node = node.keys[char];
    }

    const stack: [TrieNode, string][] = [[node, prefix]];

    while (stack.length) {
      const [node, prefix] = stack.pop()!;

      if (node.isEnd) {
        result.push(prefix);
      }

      const chars = Object.keys(node.keys);

      for (const char of chars) {
        stack.push([node.keys[char], prefix + char]);
      }
    }

    return result;
  }
}
