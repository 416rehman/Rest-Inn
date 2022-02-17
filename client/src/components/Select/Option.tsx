import React from 'react';
import './option.scss'

interface IProps {
    selected?: boolean;
    children?: React.ReactNode;
    className?: string;
    value: string;
    showValue?: boolean;
    [x: string]: any;
}

function Option({value, selected, children, className, showValue, ...rest}: IProps) {
    return (
        <div className={'Option ' + (selected ? 'selected-option ' : '') + (className || '')} {...rest}>
            {showValue && <span className="Option__value">{value} | </span>}{children}
        </div>
    );
}

export default Option;