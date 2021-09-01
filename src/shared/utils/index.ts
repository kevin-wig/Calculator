import { OperatorEnum } from '../enums/operatorEnum';

export * from './expression';

export const Operators: string[] = [
    OperatorEnum.multiplication,
    OperatorEnum.division,
    OperatorEnum.addition,
    OperatorEnum.subtraction,
    OperatorEnum.sin,
    OperatorEnum.cos,
    OperatorEnum.tan,
];

export const TrigOperators: string[] = [
    OperatorEnum.sin,
    OperatorEnum.cos,
    OperatorEnum.tan,
];

export const isUndefinedOrNullOrEmpty = (value: any) => (value === undefined || !value || value.length === 0);

export const removeAllSpaces = (value: string) => (value.replace(/ /g, ''));

export const isNotNumber = (input: string): boolean => {
    return input === '(' || input === ')' || Operators.includes(input);
};

export const isNumber = (input: string): boolean => {
    return !isNotNumber(input);
};
