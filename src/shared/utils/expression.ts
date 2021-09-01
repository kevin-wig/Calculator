import { OperatorEnum } from '../enums/operatorEnum';
import { isNotNumber, Operators, TrigOperators } from './index';

export const isOperator = (value: string) => Operators.indexOf(value) > -1;

export const genProperExp = (expression: string): string => {
    return expression
        .replace(new RegExp(OperatorEnum.sin, 'g'), 'sin')
        .replace(new RegExp(OperatorEnum.cos, 'g'), 'cos')
        .replace(new RegExp(OperatorEnum.tan, 'g'), 'tan');
};

export const correctExpression = (value: string, setCurOperator = (exp: string) => {}): string => {
    let exp = value
        .replace(/\*/g, OperatorEnum.multiplication)
        .replace(/\//g, OperatorEnum.division)
        .replace(/sin/g, OperatorEnum.sin)
        .replace(/cos/g, OperatorEnum.cos)
        .replace(/tan/g, OperatorEnum.tan);
    Operators.forEach((i) => {
        Operators.forEach((j) => {
            if (!TrigOperators.includes(j)) {
                exp = exp.replace(`${TrigOperators.includes(i) ? `${i}(` : i}${j}`, j);
            }
        });
    });

    if (isOperator(exp[exp.length - 1]) && setCurOperator) {
        setCurOperator(exp[exp.length - 1]);
    }
    return exp;
};

export const genFormula = (expression: string): string[] => {
    const formula: string[] = [];
    let num = '';

    expression.split('').forEach((letter) => {
        if (isNotNumber(letter)) {
            if (num) {
                formula.push(num);
                num = '';
            }

            formula.push(letter);
        } else {
            num = num.concat(letter);
        }
    });

    if (num) {
        formula.push(num);
    }

    return formula;
};

export const isValidExpression = (expression: string) => {
    const formula = genFormula(expression);
    let isValidOperators = true;

    const checkOperators: string[] = [
        OperatorEnum.multiplication,
        OperatorEnum.division,
        OperatorEnum.sin,
        OperatorEnum.cos,
        OperatorEnum.tan,
    ];

    Operators.forEach((i) => {
        checkOperators.forEach((j) => {
            if (isValidOperators) {
                if (!TrigOperators.includes(j)) {
                    isValidOperators = !expression.includes(`${TrigOperators.includes(i) ? `${i}(` : i}${j}`);
                }
            }
        });
    });

    isValidOperators = isValidOperators && !isOperator(expression[expression.length - 1]);
    isValidOperators = isValidOperators && ![
        OperatorEnum.multiplication,
        OperatorEnum.division,
    ].includes(expression[0] as OperatorEnum);

    isValidOperators = formula.reduce((isValid: boolean, node, index): boolean => {
        if (TrigOperators.includes(node) && index > 0) {
            return isValid && isNotNumber(formula[index - 1]);
        }

        return isValid;
    }, isValidOperators);

    if (!isValidOperators) {
        return 'Wrong usage of operators';
    }

    if (formula.filter((node) => node === '(').length !== formula.filter((unit) => unit === ')').length) {
        return 'Wrong usage of parenthesis.';
    }
};

export const getValuableOperator = (operator: OperatorEnum) => {
    if (TrigOperators.includes(operator)) {
        switch (operator) {
            case OperatorEnum.sin:
                return 'sin';
            case OperatorEnum.cos:
                return 'cos';
            case OperatorEnum.tan:
                return 'tan';
        }
    }

    return operator;
};
