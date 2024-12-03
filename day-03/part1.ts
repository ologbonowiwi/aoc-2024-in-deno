export async function solve(): Promise<number> {
  const input = await Deno.readTextFile('./input.txt');
  const lines = input.split('\n');

  const values = [];

  for (const line of lines) {
    const operations = line.match(/mul\(\d+,\d+\)/g);

    const sum = operations!
    .map(x => {
      const [_, a, b] = x.match(/(\d+)(?:,)(\d+)/)

      return a * b || 0;
    }).reduce((acc, cur) => acc + cur, 0);

    values.push(sum)
  }

  return values.reduce((acc, cur) => acc + cur, 0)
}


if (import.meta.main) {
  const answer = await solve();
  console.log("🚀 ~ answer:", answer)
}
