export default function bfs(
  graph: WeightedAdjacencyMatrix,
  source: number,
  needle: number
): number[] | null {
  const seen = new Array(graph.length).fill(false);
  const prev = new Array(graph.length).fill(-1);
  const q: number[] = [source];

  seen[source] = true;

  while(q.length) {
    const current = q.shift()!;
    seen[current] = true;

    if (current === needle) {
      break;
    }

    const vertices = graph[current];

    for (let i = 0; i < vertices.length; i++) {
      if (vertices[i] !== 0 && !seen[i]) {
        prev[i] = current;
        q.push(i);
      }
    }
  }

  const out: number[] = [];
  let curr = needle;

  while (prev[curr] > -1) {
    out.push(curr);
    curr = prev[curr];
  }

  if (out.length) {
    return [source].concat(out.reverse());
  }

  return null;
}
