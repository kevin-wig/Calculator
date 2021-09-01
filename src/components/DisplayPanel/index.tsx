import React from 'react';

import { correctExpression, genProperExp, isUndefinedOrNullOrEmpty } from '../../shared/utils';

import './style.scss';
import { OperatorEnum } from '../../shared/enums/operatorEnum';

interface IDisplayPanelProps {
    expression: string
    value: string
    curOperator?: string
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
                />
            </div>

            <div className="current-value-view">
                {isUndefinedOrNullOrEmpty(curOperator) ? `${value}` : `${curOperator || ''}`}
            </div>
        </div>
    );
};

export default DisplayPanel;
