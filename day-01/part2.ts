export async function solve(): Promise<number> {
  const input = await Deno.readTextFile('./input.txt');
  const lines = input.split('\n');

  const items = [];
  const counter: Record<string, number> = {};

  for (const line of lines) {
    const [a, b] = line.split('   ');

    if (!a && !b) break;

    items.push(parseInt(a, 10));

    if (!counter[b]) counter[b] = 0;

    counter[b] += 1;
  }

  const similarities = [];

  for (const item of items) {
    const occurrences = counter[item] || 0;

    similarities.push(item * occurrences)
  }

  return similarities.reduce((acc, cur) => acc + cur, 0);
}


if (import.meta.main) {
  const answer = await solve();
  console.log("🚀 ~ answer:", answer)
}
