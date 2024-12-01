import { ascend, BinaryHeap } from "@std/data-structures";

export async function solve(): Promise<number> {
  const input = await Deno.readTextFile('./input.txt');
  const lines = input.split('\n');

  const minHeap1 = new BinaryHeap<number>(ascend)
  const minHeap2 = new BinaryHeap<number>(ascend)

  for (const line of lines) {
    const [a, b] = line.split('   ').map(x => parseInt(x, 10));

    if (!a && !b) break;

    minHeap1.push(a);
    minHeap2.push(b);
  }

  const diffs = [];

  while (minHeap1.length && minHeap2.length) {
    const a = minHeap1.pop();
    const b = minHeap2.pop();

    if (!a || !b) break;

    diffs.push(Math.abs(a - b));
  }

  return diffs.reduce((acc, cur) => acc + cur, 0);
}


if (import.meta.main) {
  const answer = await solve();
  console.log("🚀 ~ answer:", answer)
}
