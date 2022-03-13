import React from 'react';
import {FormControl, FormControlLabel, Radio, FormLabel, RadioGroup, Stack, Typography} from "@mui/material";

interface IChoice {
    label: string;
    description?: string;
    value: string;
    defaultChecked?: boolean;
}

interface IProps {
    name: string;
    label: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    choices: IChoice[];
}

function RadioInput({ name, label, choices, onChange }: IProps) {
    return (
        <Stack>
            <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">
                    <Typography variant={'body1'}>{label}</Typography>
                </FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    value={choices.find(choice => choice.defaultChecked)?.value || ''}
                    name={name}
                    onChange={onChange}
                >
                    {choices.map(c=>{
                        return <FormControlLabel key={c.value} value={c.value} control={<Radio size={'small'} />}
                                                 label={<Stack>{c.label}{c.description && <Typography variant={'body2'} color={'dimgray'}>{c.description}</Typography>}</Stack>}
                                                 sx={{
                                                     padding: '1rem'
                                                 }}
                        />
                    })}
                </RadioGroup>
            </FormControl>
        </Stack>
    );
}

export default RadioInput;