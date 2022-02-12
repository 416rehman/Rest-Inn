import React from 'react';
import './input.scss'
interface IProps {
    label: string;
    id: string;
    name: string;
    labelClassName?: string;
    [x:string]: any;
}

function Input({label, id, name, labelClassName, ...rest}: IProps) {
    return (
        <label htmlFor={id} className={'Input ' + (labelClassName || '')}>
            {label}
            <input {...rest} />
        </label>
    );
}

export default Input;