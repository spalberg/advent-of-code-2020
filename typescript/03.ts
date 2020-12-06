import { getPuzzleInput } from './utils';

function parseMap(input: string): boolean[][] {
  return input
    .split('\n')
    .filter(Boolean)
    .map((line) => line.split('').map((token) => token === '#'));
}

function part1(input: string, dx: number, dy: number) {
  const map = parseMap(input);
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

function part2(input: string, slopes: [number, number][]) {
  return slopes
    .map(([dx, dy]) => part1(input, dx, dy))
    .reduce((a, b) => a * b, 1);
}

console.log(`Part 1: ${part1(getPuzzleInput('03'), 3, 1)}`);
console.log(
  `Part 2: ${part2(getPuzzleInput('03'), [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ])}`,
);
