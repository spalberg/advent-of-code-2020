import { getPuzzleInput } from './utils';

type Edge = {
  from: string;
  to: string;
  count: number;
};

function parseInput(input: string) {
  return input
    .split('\n')
    .filter(Boolean)
    .map((l) => l.match(/^(.*) bags contain (.*)\.$/))
    .flatMap(([, from, unparsedTo]) => parseTo(unparsedTo, from));
}

function parseTo(unparsedTo: string, from: string): Edge[] {
  if (unparsedTo === 'no other bags') return [];
  return unparsedTo
    .split(', ')
    .map((i) => i.match(/^(\d+) (.*) bags?$/))
    .map(([, count, to]) => ({ from, to, count: parseInt(count, 10) }));
}

function part1(input: string, source: string) {
  const edges = parseInput(input);
  const bagsContainingSource = new Set<string>();
  const todo = [source];

  while (todo.length > 0) {
    const node = todo.pop();
    edges
      .filter(({ to }) => node === to)
      .forEach(({ from }) => {
        if (bagsContainingSource.has(from)) return;
        bagsContainingSource.add(from);
        todo.push(from);
      });
  }

  return bagsContainingSource.size;
}

function getContainedBagCount(edges: Edge[], source: string) {
  const containments = edges.filter(({ from }) => from === source);
  return containments.reduce(
    (acc, { count, to }) => acc + count * (getContainedBagCount(edges, to) + 1),
    0,
  );
}

function part2(input: string, source: string) {
  const edges = parseInput(input);
  return getContainedBagCount(edges, source);
}

console.log(`Part 1: ${part1(getPuzzleInput('07'), 'shiny gold')}`);
console.log(`Part 2: ${part2(getPuzzleInput('07'), 'shiny gold')}`);
