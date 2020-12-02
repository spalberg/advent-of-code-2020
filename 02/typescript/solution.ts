// @ts-ignore
const input: string = require("fs").readFileSync("../input.txt").toString();

type Data = {
  min: number;
  max: number;
  char: string;
  password: string;
};
const data: Data[] = input
  .split("\n")
  .filter(Boolean)
  .map((line) => new RegExp(/^(\d+)-(\d+) (\w): (.*)/).exec(line))
  .map(([_, min, max, char, password]) => ({
    min: parseInt(min, 10),
    max: parseInt(max, 10),
    char,
    password,
  }));

function part1(data: Data[]) {
  let valid = 0;
  for (const d of data) {
    let count = 0;
    for (const s of d.password) {
      if (s === d.char) count += 1;
    }
    if (count >= d.min && count <= d.max) valid += 1;
  }
  return valid;
}

function part2(data: Data[]) {
  let valid = 0;
  for (const d of data) {
    if ((d.password[d.min - 1] === d.char) !== (d.password[d.max - 1] === d.char))
      valid += 1;
  }
  return valid;
}

console.log(`Part 1: ${part1(data)}`);
console.log(`Part 2: ${part2(data)}`);
