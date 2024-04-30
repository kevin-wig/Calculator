import React, { useEffect } from 'react';

import { OperatorEnum } from '../../shared/enums/operatorEnum';
import { Button } from '../Button';

import './style.scss';

interface IButtonPanelProps {
    onAllClear: () => void;
    onDecimal: () => void;
    onDigit: (digit: number) => void;
    onErase: () => void;
    onEqual: () => void;
    onOperator: (operator: OperatorEnum) => void;
    onParenthesis: (symbol: '(' | ')') => void;
    onRandNumber: () => void;
}

const ButtonPanel: React.FC<IButtonPanelProps> = (props) => {
    const {
        onAllClear,
        onDecimal,
        onDigit,
        onErase,
        onEqual,
        onOperator,
        onParenthesis,
        onRandNumber,
    } = props;

    const handleKeyDown = (event: KeyboardEvent) => {
        const { keyCode, shiftKey } = event;

        if (keyCode === 57 && shiftKey) {
            onParenthesis('(');
        } else if (keyCode === 48 && shiftKey) {
            onParenthesis(')');
        } else if (keyCode >= 48 && keyCode <= 57 && !shiftKey) {
            onDigit(keyCode - 48)
        } else if ((keyCode >= 96 && keyCode <= 105)) {
            onDigit(keyCode - 96)
        } else if (keyCode === 107 || (keyCode === 187 && shiftKey)) {
            onOperator(OperatorEnum.addition);
        } else if (keyCode === 109 || keyCode === 189) {
            onOperator(OperatorEnum.subtraction);
        } else if (keyCode === 106 || (keyCode === 56 && shiftKey)) {
            onOperator(OperatorEnum.multiplication);
        } else if (keyCode === 111 || keyCode === 191) {
            onOperator(OperatorEnum.division);
        } else if (keyCode === 83) { // on key s
            onOperator(OperatorEnum.sin);
        } else if (keyCode === 67) { // on key c
            onOperator(OperatorEnum.cos);
        } else if (keyCode === 84) { // on key t
            onOperator(OperatorEnum.tan);
        } else if (keyCode === 13 || (keyCode === 187 && !shiftKey)) {
            onEqual();
        } else if (keyCode === 46 || keyCode === 27) { // on ESC or Delete
            onAllClear();
        } else if (keyCode === 8) { // on Backspace
            onErase();
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    });

    return (
        <div className="button-pan">
            <Button className="clear-button" text="C" onClick={onAllClear} />
            <Button className="clear-button" text="◀" onClick={onErase} />
            <Button className="operation-button" text="(" onClick={() => onParenthesis('(')} />
            <Button className="operation-button" text=")" onClick={() => onParenthesis(')')} />

            <Button
                className="operation-button"
                text="sin"
                onClick={() => onOperator(OperatorEnum.sin)}
            />
            <Button
                className="operation-button"
                text="cos"
                onClick={() => onOperator(OperatorEnum.cos)}
            />
            <Button
                className="operation-button"
                text="tan"
                onClick={() => onOperator(OperatorEnum.tan)}
            />
            <Button
                className="operation-button"
                text="/"
                onClick={() => onOperator(OperatorEnum.division)}
            />

            {[7, 8, 9].map((i) => (
                <Button
                    key={i}
                    className="button"
                    text={`${i}`}
                    onClick={() => onDigit(i)}
                />
            ))}
            <Button
                className="operation-button"
                text="×"
                onClick={() => onOperator(OperatorEnum.multiplication)}
            />

            {[4, 5, 6].map((i) => (
                <Button
                    key={i}
                    className="button"
                    text={`${i}`}
                    onClick={() => onDigit(i)}
                />
            ))}
            <Button
                className="operation-button"
                text="-"
                onClick={() => onOperator(OperatorEnum.subtraction)}
            />

            {[1, 2, 3].map((i) => (
                <Button
                    key={i}
                    className="button"
                    text={`${i}`}
                    onClick={() => onDigit(i)}
                />
            ))}
            <Button
                className="operation-button"
                text="+"
                onClick={() => onOperator(OperatorEnum.addition)}
            />

            <Button
                className="button"
                text="0"
                onClick={() => onDigit(0)}
            />
            <Button
                className="operation-button"
                text="."
                onClick={onDecimal}
            />
            <Button
                className="button"
                text="Rand"
                onClick={onRandNumber}
            />
            <Button
                className="equal-button"
                text="="
                onClick={onEqual}
            />
        </div>
    );
};

export default ButtonPanel;
