import React, { useState } from 'react';

import DisplayPanel from '../../components/DisplayPanel';
import ButtonPanel from '../../components/ButtonPanel';
import {
    correctExpression,
    genProperExp,
    isUndefinedOrNullOrEmpty,
    isValidExpression,
    TrigOperators,
} from '../../shared/utils';
import { OperatorEnum } from '../../shared/enums/operatorEnum';

import './style.scss';

const Dashboard: React.FC = () => {
    const [curDisplay, setCurDisplay] = useState<string>('0');
    const [curOperator, setCurOperator] = useState<OperatorEnum>();
    const [result, setResult] = useState<number>(0);
    const [waitingForNewValue, setWaitingForNewValue] = useState<boolean>(true);
    const [expression, setExpression] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [newExp, setNewExp] = useState(false);

    const showMessage = (msg: string) => {
        setMessage(msg);
        setTimeout(setMessage, 8000);
    };

    const getResult = () => {
        const validationMessage = isValidExpression(expression);

        if (
            isUndefinedOrNullOrEmpty(validationMessage)
            && !isUndefinedOrNullOrEmpty(expression)
        ) {
            setMessage('');
            return true;
        } else if (validationMessage) {
            showMessage(validationMessage);
        }

        return false;
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
            setResult(0);
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
        setResult(0);
        setCurOperator(operator);
        setWaitingForNewValue(true);
    };

    const handleEqual = async () => {
        getResult();
    };

    const handleAllClear = () => {
        setCurDisplay('0');
        setExpression('');
        setCurOperator(undefined);
        setResult(0);
        setWaitingForNewValue(true);
    };

    const handleEraseOneUnit = () => {
        if (!waitingForNewValue) {
            const newExpression = expression.slice(0, expression.length - 1);
            setExpression(newExpression);

            let newDisplay = curDisplay;
            newDisplay = newDisplay.slice(0, newDisplay.length - 1);
            if (newDisplay.length === 0) {
                newDisplay = '0';
            }
            setCurDisplay(newDisplay);
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
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
