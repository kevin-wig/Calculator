import React, { useState } from 'react';

import './style.scss';
import DisplayPanel from '../../components/DisplayPanel';
import ButtonPanel from '../../components/ButtonPanel';
import { correctExpression, isUndefinedOrNullOrEmpty, trigOperators } from '../../shared/utils';
import { OperatorEnum } from '../../shared/enums/operatorEnum';

interface IDashboardProps {}

const Dashboard: React.FC<IDashboardProps> = () => {
    const [curDisplay, setCurDisplay] = useState<string>('0');
    const [curOperator, setCurOperator] = useState<OperatorEnum>();
    const [result, setResult] = useState<number>(0);
    const [waitingForNewValue, setWaitingForNewValue] = useState<boolean>(true);
    const [expression, setExpression] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [newExp, setNewExp] = useState(false);

    const handleDigit = (digit: number) => {
        let curDisplayValue = curDisplay;

        if (curDisplay === '0' && digit === 0) {
            return;
        }

        if (newExp) {
            setNewExp(false);
            setExpression('');
        } else {
            // const operator = trigOperators.includes(curOperator || '') ? `${curOperator}(` : curOperator;
            console.log(expression);
            setExpression(correctExpression(
                `${isUndefinedOrNullOrEmpty(digit) ? expression : `${expression}${digit}`}`,
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
        if (newExp) return;

        if (!isUndefinedOrNullOrEmpty(expression)) {
            console.log(correctExpression(`${expression}${symbol}`));
            setExpression(correctExpression(`${expression}${symbol}`));
        }
    };

    const handleDecimal = () => {
        if (newExp) return;

        let curInputValue = waitingForNewValue ? '0' : curDisplay;

        curInputValue += curInputValue.indexOf('.') < 0 ? '.' : '';

        setCurDisplay(curInputValue);
        setWaitingForNewValue(false);
    };

    const handleOperator = async (operator: OperatorEnum) => {
        if (newExp) return;

        if (isUndefinedOrNullOrEmpty(expression)) {
            setExpression(correctExpression(curDisplay, undefined));
        }

        // const curDisp = waitingForNewValue ? '' : curDisplay;

        const op = trigOperators.includes(operator || '') ? `${operator}(` : operator;
        setExpression(correctExpression(
            `${isUndefinedOrNullOrEmpty(op) ? expression : `${expression}${op}`}`,
        ));

        setCurDisplay('');
        setResult(0);
        setCurOperator(operator);
        setWaitingForNewValue(true);
    };

    const handleEqual = async () => {
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
            // let newDisplay = curDisplay;
            // newDisplay = newDisplay.slice(0, newDisplay.length - 1);
            // if (newDisplay.length === 0) {
            //     newDisplay = '0';
            // }
            // setCurDisplay(newDisplay);
        }
    };

    const onExpressionChange = (value: string) => {
        setExpression(value);
        setWaitingForNewValue(false);
    };

    return (
        <div className="dashboard-wrapper">
            <div className="calculator">
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
        </div>
    );
};

export default Dashboard;
