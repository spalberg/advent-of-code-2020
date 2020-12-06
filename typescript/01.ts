import { getPuzzleInput } from './utils';

function getNumbers(input: string) {
  return input
    .split('\n')
    .filter(Boolean)
    .map((n) => parseInt(n, 10))
    .sort((a, b) => a - b);
}

function part1(input: string) {
  const numbers = getNumbers(input);
  let end = numbers.length;
  for (let i = 0; i < end; i += 1) {
    for (let j = i + 1; j < end; j += 1) {
      if (numbers[i] + numbers[j] === 2020) {
        return numbers[i] * numbers[j];
      } else if (numbers[i] + numbers[j] > 2020) {
        end = j;
        break;
      }
    }
  }
  return -1;
}

function part2(input: string) {
  const numbers = getNumbers(input);
  let end = numbers.length;
  for (let i = 0; i < end; i += 1) {
    for (let j = i + 1; j < end; j += 1) {
      for (let k = j + 1; k < end; k += 1) {
        const sum = numbers[i] + numbers[j] + numbers[k];
        if (sum === 2020) {
          return numbers[i] * numbers[j] * numbers[k];
        } else if (sum > 2020) {
          end = k;
          break;
        }
      }
    }
  }
  return -1;
}

console.log(`Part 1: ${part1(getPuzzleInput('01'))}`);
console.log(`Part 2: ${part2(getPuzzleInput('01'))}`);
