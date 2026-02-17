export default function bfs(
  list: WeightedAdjacencyList,
  source: number,
  needle: number
): number[] | null {
  const seen: boolean[] = new Array(list.length).fill(false);
  const from: number[] = new Array(list.length).fill(-1);
  const queue: number[] = [source];

  while (queue.length) {
    const vertex = queue.shift()!;
    seen[vertex] = true;

    if (vertex === needle) {
      break;
    }

    for (const entry of list[vertex]) {
      const neighbor = entry.to;

      if (!seen[neighbor]) {
        from[neighbor] = vertex;
        queue.push(neighbor);
      }
    }
  }

  const path: number[] = [];
  let value = needle;

  while (from[value] > -1) {
    path.push(value);
    value = from[value];
  }

  if (path.length) {
    path.push(source);
    return path.reverse();
  }

  return null;
}
