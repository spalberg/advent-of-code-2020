// @ts-ignore
const input: string = require("fs").readFileSync("../input.txt").toString();

const map: boolean[][] = input
  .split("\n")
  .filter(Boolean)
  .map((line) => line.split("").map((token) => token === "#"));

function part1(map: boolean[][], dx: number, dy: number) {
  let x = 0;
  let y = 0;
  let encounters = 0;
  while (y < map.length) {
    if (map[y][x]) encounters += 1;
    x = (x + dx) % map[y].length;
    y = y + dy;
  }
  return encounters;
}

function part2(map: boolean[][], slopes: [number, number][]) {
  return slopes.map(([dx, dy]) => part1(map, dx, dy)).reduce((a, b) => a * b, 1);
}

console.log(`Part 1: ${part1(map, 3, 1)}`);
console.log(
  `Part 2: ${part2(map, [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ])}`
);
