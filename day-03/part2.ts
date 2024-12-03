export async function solve(): Promise<number> {
  const input = await Deno.readTextFile('./input.txt');
  const lines = input.split('\n');
  const segments = lines.join('').split(/(?=do\(\)|don\'t\(\))/);

  const values = [];

  for (const line of segments.filter(x => !x.startsWith(`don't()`))) {
    const operations = line.match(/mul\(\d+,\d+\)/g);

    // console.log(operations)

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
  console.log('response from part1: 196826776')
  console.log("🚀 ~ answer:", answer)
}
