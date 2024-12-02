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
          return false;
        }
        break;
      case Order.DESCENDING:
        if (last > value)  {
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

export async function bruteforce(): Promise<number> {
  const input = await Deno.readTextFile('./input.txt');
  const lines = input.split('\n');

  let safeReports = 0;

  for (const line of lines) {
    const item = line.split(/\s/).map(Number);

    // if is safe with one item removed, break the loop and count as safe report
    for (let i = 0; i < item.length; i++) {
      const report = item.slice(0, i).concat(item.slice(i + 1));

      if (checkReportIsSafe(report)) {
        safeReports += 1;
        break;
      }
    }
  }

  return safeReports;
}


if (import.meta.main) {
  const answer = await bruteforce();
  console.log("🚀 ~ answer:", answer)
}
