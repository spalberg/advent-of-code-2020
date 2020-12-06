// @ts-ignore
const input: string = require("fs").readFileSync("../input.txt").toString();

const unparsedPassports: string[] = input.split("\n\n").filter(Boolean);

function parsePassports(unparsedPassports: string[]) {
  return unparsedPassports.map(
    (up) =>
      new Map(up.split(/\s+/).map((kv) => kv.split(":") as [string, string]))
  );
}

function isPassportValid(passport: Map<string, string>) {
  return passport.size === 8 || (passport.size === 7 && !passport.has("cid"));
}

function part1(unparsedPassports: string[]) {
  const passports = parsePassports(unparsedPassports);
  return passports.filter(isPassportValid).length;
}

function isPassportStrictlyValid(passport: Map<string, string>) {
  if (!isPassportValid(passport)) return false;

  const isValidNumber = (
    value: string,
    numberOfDigits: number,
    min: number,
    max: number
  ) => {
    if (numberOfDigits > 0 && value.length !== numberOfDigits) return false;
    const num = parseInt(value, 10);
    return num >= min && num <= max;
  };

  const byr = passport.get("byr");
  const iyr = passport.get("iyr");
  const eyr = passport.get("eyr");
  const hgt = passport.get("hgt");
  const hcl = passport.get("hcl");
  const ecl = passport.get("ecl");
  const pid = passport.get("pid");

  return [
    isValidNumber(byr, 4, 1920, 2002),
    isValidNumber(iyr, 4, 2010, 2020) && isValidNumber(eyr, 4, 2020, 2030),
    hgt.endsWith("cm")
      ? isValidNumber(hgt, 0, 150, 193)
      : hgt.endsWith("in")
      ? isValidNumber(hgt, 0, 59, 76)
      : false,
    /^#(?:[0-9]|[a-f]){6}$/.test(hcl),
    ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(ecl),
    /^[0-9]{9}$/.test(pid),
  ].every((id) => id);
}

function part2(unparsedPassports: string[]) {
  const passports = parsePassports(unparsedPassports);
  return passports.filter(isPassportStrictlyValid).length;
}

console.log(`Part 1: ${part1(unparsedPassports)}`);
console.log(`Part 2: ${part2(unparsedPassports)}`);
