import React, { useEffect } from 'react';

import { OperatorEnum } from '../../shared/enums/operatorEnum';
import { Button } from '../Button';

import './style.scss';

interface IButtonPanelProps {
    onDigit: (digit: number) => void;
    onDecimal: () => void;
    onOperator: (operator: OperatorEnum) => void;
    onEqual: () => void;
    onAllClear: () => void;
    onErase: () => void;
    onParenthesis: (symbol: '(' | ')') => void;
}

const ButtonPanel: React.FC<IButtonPanelProps> = (props) => {
    const {
        onDigit,
        onDecimal,
        onOperator,
        onEqual,
        onAllClear,
        onErase,
        onParenthesis,
    } = props;

    const handleKeyDown = (event: KeyboardEvent) => {
        const { keyCode, shiftKey } = event;

        if (keyCode === 13 || (keyCode === 187 && !shiftKey)) {
            onEqual();
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
                className="equal-button"
                text="="
                onClick={onEqual}
            />
        </div>
    );
};

export default ButtonPanel;
