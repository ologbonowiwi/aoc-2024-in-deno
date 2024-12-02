enum Order {
  ASCENDING,
  DESCENDING
}

function checkReportIsSafe(report: number[]): boolean {
  // filling this variable with the first item.
  // the loop below will start from the second number.
  let last = report[0];

  const order = last > report[1] ? Order.ASCENDING : Order.DESCENDING;

  for (let i = 1; i < report.length; i++) {
    const value = report[i];
    // returns false if is not increasing/decreasing properly
    switch (order) {
      case Order.ASCENDING:
        if (last < value) {
          console.log('ascending last, value :>> ', last, value);
          return false;
        }
        break;
      case Order.DESCENDING:
        if (last > value)  {
          console.log('descending last, value :>> ', last, value);
          return false;
        }
        break;
    }

    const diff = Math.abs(value - last);

    if (diff < 1 || diff > 3) return false;

    // end of the loop, change last to the current
    last = value;
  }

  return true;
}

export async function solve(): Promise<number> {
  const input = await Deno.readTextFile('./input.txt');
  const lines = input.split('\n');

  const items = [];

  for (const line of lines) {
    items.push(line.split(/\s/).map(Number));
  }

  return items.map(checkReportIsSafe).reduce((acc, cur) => acc + Number(cur), 0);
}


if (import.meta.main) {
  const answer = await solve();
  console.log("🚀 ~ answer:", answer)
}
