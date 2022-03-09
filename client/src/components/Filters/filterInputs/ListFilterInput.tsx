import React, {ReactElement, useState} from 'react';
import PopoverStyled from "../../PopoverStyled/PopoverStyled";
import {Button,  Stack, ToggleButton, ToggleButtonGroup, Typography} from "@mui/material";

interface IProps {
    title: string;
    name: string;
    options: {
        value: string;
        label: string;
    }[];
    filters: { [key: string]: string },
    setFiltersHandler: (filters: { [key: string]: string }) => void;
    icon?: ReactElement;
}

function ListFilterInput({title, name, options, filters, setFiltersHandler, icon}: IProps) {
    const [selected, setSelected] = useState<string[]>(filters[name] ? filters[name].split(',') : []);

    const onChangeHandler = (event: React.MouseEvent<HTMLElement>, value: string[]) => {
        setSelected(value);
    }

    // Checks if atleast one of the provided filters is set in the provided filter object
    const isActive = (name: string, filters: { [key: string]: string | string[] }) => {
        return filters[name] != '' && filters[name] != undefined && filters[name] != null;
    }

    // checks if the selected values and the filter arrays have the same content
    const isPending = () => {
        if (filters[name] === undefined) {
            return selected.length > 0;
        }

        const appliedSelections = filters[name]?.split(',').filter(el => el.length) //filter out '' values
        return !(selected.length === appliedSelections.length && selected.every(value => value.length && appliedSelections.includes(value)));
    }

    // Returns 'contained' if atleast one of the provided filters is set in the provided filter object, else returns 'outlined'
    const handleVariant = (name: string) => {
        return isActive(name, filters) ? 'filled' : 'outlined'
    };

    // Clear the provided filters from the filters object
    const clearFilter = (name: string) => {
        const newFilters = {...filters};
        newFilters[name] = '';
        setSelected([]);
        setFiltersHandler(newFilters);
    }

    return (
        <PopoverStyled title={title} variant={handleVariant(name)} icon={icon}
                       onDelete={isActive(name, filters) ? () => {
                           clearFilter(name)
                       } : undefined}
        >

            <form onSubmit={(e) => {
                e.preventDefault();
                setFiltersHandler({...filters, [name]: selected.join(',')});
            }}>
                <Stack gap={'0.5rem'} padding={'0.5rem'}>
                    <Stack gap={'0.5rem'}>
                        <ToggleButtonGroup
                            key={name}
                            value={selected}
                            sx={{
                                flexWrap: 'wrap',
                                gap: '0.5rem',
                                '& button': {
                                    minWidth: 'fit-content',

                                    flex: '1 !important',
                                    borderRadius: '50em !important',
                                    border: '1px solid #e0e0e0 !important',
                                }
                            }}
                            onChange={onChangeHandler}>
                            {options.map(option => (
                                <ToggleButton key={option.value} value={option.value}>
                                    <Typography variant={'body2'}>{option.label}</Typography>
                                </ToggleButton>
                            ))}
                        </ToggleButtonGroup>
                    </Stack>
                    <Stack direction={'row'} gap={'0.5rem'}>
                        {isPending() &&
                            <Button type={'submit'} variant={'outlined'} color={'primary'}>Apply</Button>}
                        {isActive(name, filters) &&
                            <Button color={'error'} onClick={() => clearFilter(name)}>Clear</Button>}
                    </Stack>
                </Stack>
            </form>
        </PopoverStyled>
    );
}

export default ListFilterInput;