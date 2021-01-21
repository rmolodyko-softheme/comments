export type OperatorResolver = (a: number, b: number) => number;

export interface Operators {
  [key: string]: OperatorResolver;
}

const DEFAULT_OPERATORS = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
} as Operators;

export function evaluateMathExpressions(text: string, operators = DEFAULT_OPERATORS) {
  const opRegExp = operatorsRegExp(operators);
  const findExpressionRegExp = new RegExp(`(\\s|^|\\()(\\d+((${opRegExp})\\d+)+)(\\s|\\)|$)`, 'g');

  return text?.replace(findExpressionRegExp, (...args) => {
    return args[1] + args[2] + `(=${calculate(args[2], operators)})` + args[args.length - 3];
  });
}

function calculate(text: string, operators: Operators): number {
  const opRegExp = operatorsRegExp(operators);
  const findExpressionRegExp = new RegExp(`\\d+(${opRegExp})\\d+`, 'g');

  const result = text.replace(findExpressionRegExp, (...args) => {
    return parseInt(
      (operators[args[1]] as OperatorResolver)(...(args[0].split(args[1]).map(Number) as [number, number])).toString(),
      10
    ).toString();
  });

  if (result === text) {
    return Number(result);
  }

  return calculate(result, operators);
}

function operatorsRegExp(operators: Operators) {
  return Object.keys(operators)
    .map((operator) => `\\` + operator)
    .join('|');
}
