import React, {useEffect, useRef} from 'react';
import './select.scss';
import option from "./Option";
interface IProps {
    name?: string;
    options: JSX.Element[];
    [x:string]: any
}

function Select({name, options, ...rest}: IProps) {
    const [selectedOptionIndex, setSelectedOptionIndex] = React.useState(options.findIndex(option => option.props.selected));
    const [allOptions, setAllOptions] = React.useState<JSX.Element[]>(options);

    useEffect(() => {
        setAllOptions(options.map((option, index) => {
            return React.cloneElement(option, {
                onClick: handleSelection,
                option_id: index
            });
        }))
    }, [selectedOptionIndex]);

    const handleSelection = (e: any) => {
        console.log('CLICKED')
        const newSelectedOptionIndex = parseInt(e.target.getAttribute('option_id'));
        if (newSelectedOptionIndex === selectedOptionIndex) return;

        //Reset old selected option
        if (selectedOptionIndex > -1) {
            allOptions[selectedOptionIndex] = React.cloneElement(allOptions[selectedOptionIndex], {selected: false})
        }

        //Set new selected option
        allOptions[newSelectedOptionIndex] = React.cloneElement(allOptions[newSelectedOptionIndex], {selected: true})
        setSelectedOptionIndex(newSelectedOptionIndex);
        setAllOptions(allOptions);
        console.log('ENDED')
    }

    return (
        <div>
            <button onClick={handleSelection}></button>
            <input type="text" name={name} value={selectedOptionIndex > -1 ? options[selectedOptionIndex].props.value : ''} {...rest}/>
            <div className={'options-container'}>
                {allOptions.map((option: JSX.Element, index: number) => {
                    return (
                        <div key={index}>
                            {option}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Select;