import { OperatorEnum } from '../enums/operatorEnum';
import { genFormula, getPriority, isNumber, isOperator, TrigOperators } from "./index";

export function infix2Postfix(arrFormula: string[]): string[] {
    let result: string[] = [];
    let stack: string[] = [];

    arrFormula.forEach((item) => {
        if (isNumber(item)) {
            result.push(item);
        } else if (item === '(') {
            stack.push(item);
        } else if (item === ')') {
            while (stack.length > 0) {
                const pulledItem = stack.pop();

                if (pulledItem === '(') break;
                else if (pulledItem != null) {
                    result.push(pulledItem);
                }
            }
        } else if (isOperator(item)) {
            while (stack.length > 0) {
                const peekedItem = stack[stack.length - 1];

                if (isOperator(peekedItem) && getPriority(peekedItem) >= getPriority(item)) {
                    result.push(peekedItem);
                    stack.pop();
                } else break;
            }

            stack.push(item);
        } else {
            console.log("Something else!!!");
        }
    });

    while (stack.length > 0) {
        result.push(stack.pop() || '');
    }

    return result;
}

export const evaluatePostfix = (arrPostfix: string[]) => {
    let stack: string[] = [];

    arrPostfix.forEach((item: string) => {
        if (isNumber(item)) {
            stack.push(item);
        } else if (isOperator(item)) {
            const num1 = Number.parseFloat(stack.pop() || '0');
            let num2 = 0;

            if (!TrigOperators.includes(item)) {
                num2 = Number.parseFloat(stack.pop() || '0');
            }
            let result: number = 0;

            switch (item) {
                case OperatorEnum.addition:
                    result = num2 + num1;
                    break;
                case OperatorEnum.subtraction:
                    result = num2 - num1;
                    break;
                case OperatorEnum.multiplication:
                    result = num2 * num1;
                    break;
                case OperatorEnum.division:
                    result = num2 / num1;
                    break;
                case OperatorEnum.sin:
                    result = Math.sin(num1);
                    break;
                case OperatorEnum.cos:
                    result = Math.cos(num1);
                    break;
                case OperatorEnum.tan:
                    result = Math.tan(num1);
                    break;
                default:
                    console.log('Something else!!!');
            }

            stack.push(result.toString());
        } else {
            console.log("Something else!!!");
        }
    });

    return Number.parseFloat(stack[0]);
};

export const calculate = (expString: string) => {
    const arrFormula: string[] = genFormula(expString);
    const arrPostfix = infix2Postfix(arrFormula);
    return evaluatePostfix(arrPostfix);
};
