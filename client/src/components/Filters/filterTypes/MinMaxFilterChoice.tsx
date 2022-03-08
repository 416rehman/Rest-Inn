import PopoverStyled from "../../PopoverStyled/PopoverStyled";
import {Button, Stack, TextField} from "@mui/material";
import {useEffect, useState} from "react";

interface IProps {
    title: string;
    fields: {
        name: string;
        label: string;
    }[];
    filters: {[key:string]: string},
    setFiltersHandler: (filters: {[key:string]: string}) => void;
    minValue?: number;
    maxValue?: number;
}

export default function MinMaxFilterChoice({title, fields, filters, setFiltersHandler, minValue, maxValue}: IProps) {
    const [pendingFilters, setPendingFilters] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        setPendingFilters(filters);
    }, [filters]);

    const fieldNames = fields.map(field => field.name);
    const onChangeHandler = (e?: any) => {
        const {name, value} = e.target;
        if (maxValue != undefined && value > maxValue) return;
        if (minValue != undefined && value < minValue) return;
        if (name) setPendingFilters({...pendingFilters, [name]: value})
    }

    // Checks if atleast one of the provided filters is set in the provided filter object
    const isActive = (names: string[], filters: {[key: string]: string}) => {
        return names.some(name => filters[name] != '' && filters[name] != undefined && filters[name] != null)
    }

    // Returns 'contained' if atleast one of the provided filters is set in the provided filter object, else returns 'outlined'
    const handleVariant = (names: string[]) => {
        return isActive(names, filters) ? 'contained' : 'outlined'
    }

    // Clear the provided filters from the filters object
    const clearFilter = (names: string[]) => {
        const newFilters = {...filters};
        names.forEach(name => {
            newFilters[name] = '';
        })

        setFiltersHandler(newFilters);
    }

    const onInputHandler= (e: any) => {
        // make sure the value is within the min and max values
        const {name, value} = e.target;
        if (maxValue != undefined && value > maxValue) e.target.value = maxValue;
        if (minValue != undefined && value < minValue) e.target.value = minValue;
        setPendingFilters({...pendingFilters, [name]: value})
    }

    return (<PopoverStyled title={title} variant={handleVariant(fieldNames)}>
        <form onSubmit={(e) => { e.preventDefault();  setFiltersHandler(pendingFilters);}}>
            <Stack gap={'0.5rem'} padding={'1rem 0.5rem 0.5rem 0.5rem'}>
                <Stack direction={'row'} gap={'1rem'} flexWrap={'wrap'}>
                    {fields.map(field => (
                        <TextField key={field.name} label={field.label} type={'number'} name={field.name} size={'small'}
                                   value={pendingFilters[field.name]} onChange={onChangeHandler} onInput={onInputHandler}/>
                    ))}
                </Stack>
                <Stack direction={'row'} gap={'0.5rem'}>
                    {isActive(fieldNames, pendingFilters) && <Button type={'submit'} variant={'outlined'} color={'primary'}>Apply</Button>}
                    {isActive(fieldNames, filters) && <Button color={'error'} onClick={() => clearFilter(fieldNames)}>Clear</Button>}
                </Stack>
            </Stack>
        </form>
    </PopoverStyled>)
}