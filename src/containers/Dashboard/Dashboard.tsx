import React, { useState } from 'react';

import ButtonPanel from '../../components/ButtonPanel';
import DisplayPanel from '../../components/DisplayPanel';
import { loadRandomNumber } from '../../services/random';
import {
    calculate,
    correctExpression, genFormula,
    genProperExp, isNotNumber,
    isUndefinedOrNullOrEmpty,
    isValidExpression,
    TrigOperators,
} from '../../shared/utils';
import { OperatorEnum } from '../../shared/enums/operatorEnum';
import { IExpressionResult } from '../../shared/interfaces/ExpressResult';

import './style.scss';

const Dashboard: React.FC = () => {
    const [curDisplay, setCurDisplay] = useState<string>('0');
    const [curOperator, setCurOperator] = useState<OperatorEnum>();
    const [waitingForNewValue, setWaitingForNewValue] = useState<boolean>(true);
    const [expression, setExpression] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [newExp, setNewExp] = useState(false);
    const [history, setHistory] = useState<IExpressionResult[]>([]);

    const showMessage = (msg: string) => {
        setMessage(msg);
        setTimeout(setMessage, 8000);
    };

    const handleRandNumber = async () => {
        if (waitingForNewValue) {
            const randNum = await loadRandomNumber();
            handleDigit(+randNum);
        }
    };

    const getResult = () => {
        const validationMessage = isValidExpression(expression);

        if (
            isUndefinedOrNullOrEmpty(validationMessage)
            && !isUndefinedOrNullOrEmpty(expression)
        ) {
            setMessage('');
            const newRes = calculate(expression);
            setHistory([
                { formula: expression, result: newRes },
                ...history.slice(0, 4),
            ]);
            setCurDisplay(newRes.toString());
            setCurOperator(undefined);

            const exp = correctExpression(`${
                isUndefinedOrNullOrEmpty(expression)
                    ? curDisplay
                    : expression
            }`);
            setExpression(exp);

            if (String(newRes).indexOf('e+') < 0) {
                setCurDisplay(Number(Number(newRes)
                    .toPrecision(16))
                    .toString());
            } else {
                setCurDisplay(Number(newRes)
                    .toExponential(10)
                    .toString()
                    .slice(0, 16));
            }

            setNewExp(true);
            setWaitingForNewValue(true);
        } else if (validationMessage) {
            showMessage(validationMessage);
        }
    };

    const handleDigit = (digit: number) => {
        let curDisplayValue = curDisplay;

        if (curDisplay === '0' && digit === 0) {
            return;
        }

        if (newExp) {
            setNewExp(false);
            setExpression(digit.toString());
        } else {
            setExpression(correctExpression(
                `${isUndefinedOrNullOrEmpty(digit.toString()) ? expression : `${expression}${digit}`}`,
            ));
        }
        if (waitingForNewValue) {
            curDisplayValue = '';
            setWaitingForNewValue(false);
        }

        if (curDisplay !== '0' && !waitingForNewValue) {
            curDisplayValue += digit.toString();
        } else {
            curDisplayValue = digit.toString();
        }

        setCurDisplay(curDisplayValue);
    };

    const handleParenthesis = (symbol: '(' | ')') => {
        if (newExp) {
            if (symbol === '(') {
                setNewExp(false);
                setExpression(symbol);
            }

            return;
        }

        if (!isUndefinedOrNullOrEmpty(expression)) {
            setExpression(correctExpression(`${expression}${symbol}`));
            setWaitingForNewValue(true);
        }
    };

    const handleDecimal = () => {
        if (newExp) return;

        let curInputValue = waitingForNewValue ? '0' : curDisplay;

        if (curInputValue.indexOf('.') < 0) {
            curInputValue += '.';
            setExpression(correctExpression(`${expression}.`));
        }

        setCurDisplay(curInputValue);
        setWaitingForNewValue(false);
    };

    const handleOperator = async (operator: OperatorEnum) => {
        const op = TrigOperators.includes(operator || '') ? `${operator}(` : operator;

        if (newExp) {
            setNewExp(false);
            setExpression(op);
            return;
        }

        if (isUndefinedOrNullOrEmpty(expression)) {
            setExpression(correctExpression(curDisplay, undefined));
        }

        setExpression(correctExpression(
            `${isUndefinedOrNullOrEmpty(op) ? expression : `${expression}${op}`}`,
        ));

        setCurDisplay('');
        setCurOperator(operator);
        setWaitingForNewValue(true);
    };

    const handleEqual = () => {
        if (history[0]?.formula !== expression) {
            getResult();
        }
    };

    const handleAllClear = () => {
        setCurDisplay('0');
        setExpression('');
        setCurOperator(undefined);
        setWaitingForNewValue(true);
    };

    const handleEraseOneUnit = () => {
        if (newExp) return;

        const newExpression = expression.slice(0, expression.length - 1);
        setExpression(newExpression);
        const formula = genFormula(newExpression);

        const newDisplay = formula[formula.length - 1] || '0';

        if (isNotNumber(newDisplay)) {
            setCurOperator(newDisplay as OperatorEnum);
        } else {
            setCurDisplay(newDisplay);
            setCurOperator(undefined);
        }
    };

    const onExpressionChange = (value: string) => {
        setExpression(value);
        setWaitingForNewValue(false);
    };

    return (
        <div className="dashboard-wrapper">
            {message && <div className="message-box">{message}</div>}
            <div className="calculator">
                <div className="calculator-main">
                    <DisplayPanel
                        value={curDisplay}
                        curOperator={waitingForNewValue ? curOperator : undefined}
                        expression={expression}
                        setExpression={onExpressionChange}
                        setCurOperator={setCurOperator}
                    />

                    <ButtonPanel
                        onRandNumber={handleRandNumber}
                        onDigit={handleDigit}
                        onDecimal={handleDecimal}
                        onOperator={handleOperator}
                        onEqual={handleEqual}
                        onAllClear={handleAllClear}
                        onErase={handleEraseOneUnit}
                        onParenthesis={handleParenthesis}
                    />
                </div>
                <div className="history-panel">
                    {history.map((expression, index) => (
                        <div key={index}>
                            <p className="expression">{genProperExp(expression.formula)}</p>
                            <p className="result">{expression.result}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
