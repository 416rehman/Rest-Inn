import React from 'react';
import {FormControlLabel, IconButton, Paper, Stack, Typography} from "@mui/material";
import SwitchStyled from "../../SwitchStyled";
import {CloseRounded} from "@mui/icons-material";

interface IProps {
    label?: string;
    name: string;
    filters: {[key:string]: string},
    setFiltersHandler: (filters: {[key:string]: string}) => void;
    clearOnFalse?: boolean;
}

function BooleanFilterInput({label, name, filters, setFiltersHandler, clearOnFalse = true}: IProps) {

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (clearOnFalse && !event.target.checked) clearFilter()
        else setFiltersHandler({...filters, [name]: event.target.checked ? 'true' : 'false'})
    };

    const clearFilter = () => {
        const newFilters = {...filters};
        delete newFilters[name];
        setFiltersHandler(newFilters);
    };

    const isActive = (name: string, filters: {[key: string]: string}) => {
        return filters[name] != '' && filters[name] != undefined && filters[name] != null
    }

    return (
        <Stack borderRadius={'50%'} borderColor={'ActiveBorder'}>
            <Paper sx={{pl: '1rem', borderRadius: 150}} variant={'outlined'}>
                <FormControlLabel control={
                    <SwitchStyled size={'medium'} checked={JSON.parse(filters[name] || 'false')} name={name} onChange={handleOnChange}/>
                } label={
                    <Typography variant={'subtitle2'}>{label}</Typography>
                } />
                {(isActive(name, filters) && !clearOnFalse) && <IconButton onClick={clearFilter} aria-label={'clear'} size={'small'}>
                    <CloseRounded/>
                </IconButton>}
            </Paper>
        </Stack>
    );
}

export default BooleanFilterInput;