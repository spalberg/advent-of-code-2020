import { getPuzzleInput } from './utils';

type Instruction = [string, number];
function parseInstructions(input: string) {
  return input
    .split('\n')
    .filter(Boolean)
    .map((l) => l.split(' '))
    .map(([opcode, value]) => [opcode, parseInt(value, 10)] as Instruction);
}

function evaluate(instructions: Instruction[]) {
  let pc = 0;
  let acc = 0;
  let executedInstructions = new Set<Instruction>();
  while (
    !executedInstructions.has(instructions[pc]) &&
    pc >= 0 &&
    pc < instructions.length
  ) {
    const [opcode, value] = instructions[pc];
    executedInstructions.add(instructions[pc]);
    switch (opcode) {
      case 'acc':
        acc += value;
        pc += 1;
        break;
      case 'jmp':
        pc += value;
        break;
      case 'nop':
        pc += 1;
        break;
      default:
        throw new Error(`Invalid opcode encountered: ${opcode}`);
    }
  }
  return { pc, acc };
}

function part1(input: string) {
  const instructions = parseInstructions(input);
  const { acc } = evaluate(instructions);
  return acc;
}

function part2(input: string) {
  const instructions = parseInstructions(input);

  for (let i = 0; i < instructions.length; i += 1) {
    if (instructions[i][0] === 'acc') continue;
    let modifiedInstruction = [
      instructions[i][0] === 'nop' ? 'jmp' : 'nop',
      instructions[i][1],
    ] as Instruction;

    const modifiedInstructions = instructions.map((instr, idx) =>
      idx === i ? modifiedInstruction : instr,
    );

    const { pc, acc } = evaluate(modifiedInstructions);

    if (pc === modifiedInstructions.length) {
      return acc;
    }
  }

  throw new Error('Could not find a solution!');
}

console.log(`Part 1: ${part1(getPuzzleInput('08'))}`);
console.log(`Part 2: ${part2(getPuzzleInput('08'))}`);
