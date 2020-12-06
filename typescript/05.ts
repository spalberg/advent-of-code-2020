import { getPuzzleInput } from './utils';

function parseBoardingPasses(input: string) {
  return input.split('\n').filter(Boolean);
}

function calculateSeatId(boardingPass: string) {
  const bitString = boardingPass.replace(/B|R/g, '1').replace(/F|L/g, '0');
  return parseInt(bitString, 2);
}

function part1(input: string) {
  const boardingPasses = parseBoardingPasses(input);
  return Math.max(...boardingPasses.map(calculateSeatId));
}

function part2(input: string) {
  const boardingPasses = parseBoardingPasses(input);
  const seatIds = boardingPasses.map(calculateSeatId).sort((a, b) => a - b);
  for (let i = 1; i < seatIds.length; i += 1) {
    if (seatIds[i - 1] + 2 === seatIds[i]) {
      return seatIds[i] - 1;
    }
  }
  throw new Error('No seat found!');
}

console.log(`Part 1: ${part1(getPuzzleInput('05'))}`);
console.log(`Part 2: ${part2(getPuzzleInput('05'))}`);
