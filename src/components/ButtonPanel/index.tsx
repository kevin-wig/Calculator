import React  from 'react';

import { Button } from '../Button';

import './style.scss';

const ButtonPanel: React.FC = () => {
    return (
        <div className="button-pan">
            <Button className="clear-button" text="CE" />
            <Button className="clear-button" text="◀" />
            <Button className="operation-button" text="(" />
            <Button className="operation-button" text=")" />

            {['sin', 'cos', 'tan'].map((i) => <Button key={i} className="operation-button" text={`${i}`} />)}
            <Button className="operation-button" text="÷" />

            {[7, 8, 9].map((i) => <Button key={i} className="button" text={`${i}`} />)}
            <Button className="operation-button" text="×" />

            {[4, 5, 6].map((i) => <Button key={i} className="button" text={`${i}`} />)}
            <Button className="operation-button" text="-" />

            {[1, 2, 3].map((i) => <Button key={i} className="button" text={`${i}`} />)}
            <Button className="operation-button" text="+" />

            <Button className="button" text="0" />
            <Button className="operation-button" text="." />
            <Button className="equal-button" text="=" />
        </div>
    );
};

export default ButtonPanel;
