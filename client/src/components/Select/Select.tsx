import React, { useEffect } from 'react';
import './select.scss';

interface IProps {
    name?: string;
    options: JSX.Element[];
    className?: string;
    [x:string]: any
}

function Select({name, options, className, ...rest}: IProps) {
    const [selectedOptionIndex, setSelectedOptionIndex] = React.useState(options.findIndex(option => option.props.selected));
    const [allOptions, setAllOptions] = React.useState<JSX.Element[]>(options);

    const [isOpen, setIsOpen] = React.useState(false);

    useEffect(() => {
        setAllOptions(options.map((option, index) => {
            return React.cloneElement(option, {
                onClick: handleSelection,
                option_id: index,
                selected: index === selectedOptionIndex
            });
        }))
    }, [selectedOptionIndex]);


    useEffect(() => {
        window.addEventListener('click', handleClickOutside);
    }, []);

    const handleClickOutside = (event: any) => {
        if (!event.target.classList.contains('select-option') && !event.target.classList.contains('select-input')) {
            setIsOpen(false);
        }
    };

    const handleKeyUp = (e:any) => {
        let newIndex = selectedOptionIndex;
        const keycode = e.which || e.keyCode;
        if (keycode === 40) {
            newIndex = newIndex + 1 < allOptions.length ? newIndex + 1 : 0;
            setSelectedOptionIndex(newIndex);
        } else if (keycode === 38) {
            newIndex = newIndex - 1 >= 0 ? newIndex - 1 : allOptions.length - 1;
            setSelectedOptionIndex(newIndex);
        } else if (keycode === 13) {
            setIsOpen(false);
        }
    }

    const handleSelection = (e: any) => {
        const newSelectedOptionIndex = parseInt(e.target.getAttribute('option_id'));
        if (newSelectedOptionIndex === selectedOptionIndex) return;

        setSelectedOptionIndex(newSelectedOptionIndex);
    }

    const handleToggle = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className={'Select'} onKeyUp={handleKeyUp}>

            <input type="text" name={name} value={selectedOptionIndex > -1 ? options[selectedOptionIndex].props.value : ''}
                   className={'select-input ' + className} {...rest} onClick={handleToggle} />
            <ul className={'select-list ' + (isOpen ? 'open ' : '')} role={'listbox'}>
                {allOptions.map((option: JSX.Element, index: number) => {
                    return (
                        <li key={index} role={'option'}>
                            {option}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Select;