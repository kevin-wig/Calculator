import { OperatorEnum } from './enums/operatorEnum';

const operators: string[] = [
    OperatorEnum.multiplication,
    OperatorEnum.division,
    OperatorEnum.addition,
    OperatorEnum.subtraction,
    OperatorEnum.sin,
    OperatorEnum.cos,
    OperatorEnum.tan,
];

export const trigOperators: string[] = [
    OperatorEnum.sin,
    OperatorEnum.cos,
    OperatorEnum.tan,
];

export const isUndefinedOrNullOrEmpty = (value: any) => (value === undefined || !value || value.length === 0);

export const removeAllSpaces = (value: string) => (value.replace(/ /g, ''));

export const correctExpression = (value: string, setCurOperator = (exp: string) => {}): string => {
    let exp = value
        .replace(/\*/g, '×')
        .replace(/\//g, '÷');
    operators.forEach((i) => {
        operators.forEach((j) => {
            if (!trigOperators.includes(j)) {
                exp = exp.replace(`${trigOperators.includes(i) ? `${i}(` : i}${j}`, j);
            }
        });
    });

    if (isOperator(exp[exp.length - 1]) && setCurOperator) {
        setCurOperator(exp[exp.length - 1]);
    }
    return exp;
};

export const isOperator = (value: string) => operators.indexOf(value) > -1;

export const isNotNumber = (input: string): boolean => {
    return input === '(' || input === ')' || input === '+' || input === '-' || input === '×' || input === '÷' || input === '%';
};

export function isNumber(input: string): boolean {
    return !isNotNumber(input);
}

export const genProperExp = (expression: string): string => {
    return expression
        .replace(OperatorEnum.sin, 'sin')
        .replace(OperatorEnum.cos, 'cos')
        .replace(OperatorEnum.tan, 'tan');
};
