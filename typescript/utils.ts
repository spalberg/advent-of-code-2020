import { readFileSync } from 'fs';

export function getPuzzleInput(day: string) {
  return readFileSync(`../inputs/${day}.txt`).toString();
}
