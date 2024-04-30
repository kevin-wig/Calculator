import React from 'react';

import { OperatorEnum } from '../../shared/enums/operatorEnum';
import { correctExpression, genProperExp, getValuableOperator, isUndefinedOrNullOrEmpty } from '../../shared/utils';

import './style.scss';

interface IDisplayPanelProps {
    expression: string
    value: string
    curOperator?: OperatorEnum;
    setExpression: (exp: string, setCurOperator: (op: OperatorEnum) => void) => void;
    setCurOperator: (operator: OperatorEnum) => void;
}

const DisplayPanel: React.FC<IDisplayPanelProps> = (props) => {
    const {
        value, expression, curOperator, setCurOperator, setExpression
    } = props;
    return (
        <div className="display-pan">
            <div className="expression-wrapper">
                <input
                    className="expression-view"
                    onChange={(e) => {
                       setExpression(correctExpression(String(e.target.value)), setCurOperator);
                    }}
                    value={genProperExp(expression)}
                    readOnly
                />
            </div>

            <div className="current-value-view">
                {isUndefinedOrNullOrEmpty(curOperator) ? value : curOperator ? getValuableOperator(curOperator) : ''}
            </div>
        </div>
    );
};

export default DisplayPanel;
