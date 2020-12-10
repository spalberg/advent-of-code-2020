import { unzipSync } from 'zlib';
import { getPuzzleInput } from './utils';

function parseNumbers(input: string) {
  return input
    .split('\n')
    .filter(Boolean)
    .map((n) => parseInt(n, 10));
}
function part1(input: string) {
  const adapters = parseNumbers(input);
  const sortedAdapters = adapters.sort((a, b) => a - b);
  const deviceJoltage = Math.max(...adapters) + 3;

  const differences = [0, 0, 0, 0];
  const chain = [0, ...sortedAdapters, deviceJoltage];
  for (let i = 1; i < chain.length; i += 1) {
    const diff = chain[i] - chain[i - 1];
    differences[diff] = differences[diff] + 1;
  }
  return differences[1] * differences[3];
}

function part2(input: string) {
  const adapters = parseNumbers(input);
  const uniqueAdapters = [...new Set(adapters)];
  const sortedUniqueAdpters = uniqueAdapters.sort((a, b) => a - b);
  const deviceJoltage = Math.max(...adapters) + 3;

  const chain = [0, ...sortedUniqueAdpters, deviceJoltage];
  const combinations = new Array(chain.length).fill(0);
  combinations[0] = 1;

  for (let i = 0; i < chain.length; i += 1) {
    for (let j = i + 1; j < chain.length; j += 1) {
      if (chain[j] - chain[i] > 3) break;
      combinations[j] += combinations[i];
    }
  }

  return combinations[chain.length - 1];
}

console.log(`Part 1: ${part1(getPuzzleInput('10'))}`);
console.log(`Part 2: ${part2(getPuzzleInput('10'))}`);
