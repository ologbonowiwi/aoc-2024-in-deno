/**
 * For example:

    3   4
    4   3
    2   5
    1   3
    3   9
    3   3
In the example list above, the pairs and distances would be as follows:

The smallest number in the left list is 1, and the smallest number in the right list is 3. The distance between them is 2.
The second-smallest number in the left list is 2, and the second-smallest number in the right list is another 3. The distance between them is 1.
The third-smallest number in both lists is 3, so the distance between them is 0.
The next numbers to pair up are 3 and 4, a distance of 1.
The fifth-smallest numbers in each list are 3 and 5, a distance of 2.
Finally, the largest number in the left list is 4, while the largest number in the right list is 9; these are a distance 5 apart.

To find the total distance between the left list and the right list, add up the distances between all of the pairs you found. In the example above, this is 2 + 1 + 0 + 1 + 2 + 5, a total distance of 11!
 */

/**
 * 3 - 1 = 2
 * 3 - 2 = 1
 * 3 - 3 = 0
 * 4 - 3 = 1
 * 5 - 3 = 2
 * 9 - 4 = 5
 * 
 * 2 + 1 + 0 + 1 + 2 + 5 = 11
 * 
 * right numbers
 * 1 + 2 + 3 + 3 + 3 + 4 = 16
 * 
 * left numbers
 * 3 + 3 + 3 + 4 + 5 + 9 = 27
 * 
 * 27 - 16 = 11
 */

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
