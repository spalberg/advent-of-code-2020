import { getPuzzleInput } from './utils';

function parseNumbers(input: string) {
  return input
    .split('\n')
    .filter(Boolean)
    .map((n) => parseInt(n, 10));
}

function isValidXmasNumber(position: number, preamble: number, numbers: number[]) {
  for(let i = position - preamble; i < position; i += 1) {
    for(let j = i + 1; j < position; j += 1) {
      if (numbers[i] + numbers[j] === numbers[position] && numbers[i] !== numbers[j]) return true;
    }
  }
  return false;
}

function part1(input: string, startPosition: number) {
  const numbers = parseNumbers(input);
  for(let i = startPosition; i < numbers.length; i += 1) {
    if (!isValidXmasNumber(i, startPosition, numbers)) return numbers[i];
  } 
  throw new Error("Could not solve puzzle!");
}

function part2(input: string, startPosition: number) {
  const numbers = parseNumbers(input);
  const target = part1(input, startPosition);

  let i = 0;
  while (i < numbers.length) {
    let j = i + 1;
    while(j < numbers.length){
      const set = numbers.slice(i,j);
      const sum = set.reduce((a,b) => a+b);
      if (sum < target) {
        j += 1;
        continue;
      }
      if (sum > target) {
        break;
      }
      if (sum === target) {
        return Math.max(...set) + Math.min(...set);
      }
    }
    i += 1;
  }
  throw new Error("Could not solve puzzle!");
}

console.log(`Part 1: ${part1(getPuzzleInput('09'), 25)}`);
console.log(`Part 2: ${part2(getPuzzleInput('09'), 25)}`);
