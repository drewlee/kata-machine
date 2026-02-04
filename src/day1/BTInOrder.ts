function walk(curr: BinaryNode<number> | null, path: number[]): number[] {
  if (!curr) {
    return path;
  }

  // Pre
  walk(curr.left, path);
  
  // Recurse
  path.push(curr.value);

  // Post
  walk(curr.right, path);

  return path;
}

export default function in_order_search(head: BinaryNode<number>): number[] {
  return walk(head, []);
}
