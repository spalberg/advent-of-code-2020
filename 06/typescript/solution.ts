// @ts-ignore
const input: string = require("fs").readFileSync("../input.txt").toString();

const groups = input
  .split("\n\n")
  .map((g) => g.split("\n"))
  .filter(Boolean);

function part1(groups: string[][]) {
  return groups
    .map((g) => new Set(g.flatMap((p) => p.split(""))).size)
    .reduce((acc, n) => acc + n, 0);
}

let intersection = <T>(s1: Set<T>, s2: Set<T>) =>
  new Set([...s1].filter((i) => s2.has(i)));

function part2(groups: string[][]) {
  return groups
    .map(
      (g) => g.flatMap((p) => new Set(p.split(""))).reduce(intersection).size
    )
    .reduce((acc, n) => acc + n, 0);
}

console.log(`Part 1: ${part1(groups)}`);
console.log(`Part 2: ${part2(groups)}`);
