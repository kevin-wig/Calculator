import React from "react";

import './style.scss'

interface IButtonProps
    extends React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > {
    icon?: string;
    color?: string;
    text: string;
}

export const Button: React.FC<IButtonProps> = (props) => {
    const {
        className = "",
        text,
        icon,
        ...restProps
    } = props;

    return (
        <button className={`button-style ${className}`} {...restProps}>
            <p className="text-wrapper">{text}</p>
        </button>
    );
};
