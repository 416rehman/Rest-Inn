import {MetaRootState} from "../../../../redux/reducers/meta.reducer";
import {useSelector} from "react-redux";
import {FormControl, FormLabel, InputLabel, MenuItem, Select, Stack, Typography} from "@mui/material";
import RadioInput from "../../../../components/Inputs/RadioInput/RadioInput";
import React from "react";
import { stepProps } from "./@typings";

export default function Step1({listingData, handleChange}: stepProps) {
    let {types}: MetaRootState = useSelector((state: any) => state.meta);

    const contentElement = <Stack gap={'2rem'}>
        <Stack gap={'1rem'}>
            <FormLabel id="demo-radio-buttons-group-label">
                <Typography variant={'body1'}>What kind of place are you listing?</Typography>
            </FormLabel>
            <FormControl>
                <InputLabel id={'type-label'} sx={{top: '-20%'}}>Place Type</InputLabel>
                <Select
                    value={listingData.type || ''}
                    label={'Place Type'}
                    labelId={'type-label'}
                    size={'small'}
                    name={'type'}
                    sx={{textTransform: 'capitalize'}}
                    onChange={(e) => handleChange(e.target.name, e.target.value)}>
                    {types.map((type: any) => (
                        <MenuItem key={type._id} value={type._id} sx={{textTransform: 'capitalize'}}>
                            {type._id}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Stack>
        <RadioInput name={'listingType'} label={'What will guest have?'} onChange={(e) => {
            handleChange(e.target.name, e.target.value)
        }}
                    choices={[{
                        label: 'Entire place',
                        value: 'entire place',
                        description: 'Guests have the whole place to themselves. This usually includes a bedroom, a bathroom, and a kitchen.',
                        defaultChecked: listingData['listingType'] === 'entire place'
                    }, {
                        label: 'Hotel room',
                        value: 'hotel room',
                        description: 'Guests have their own private room for sleeping, with a bathroom.',
                        defaultChecked: listingData['listingType'] === 'hotel room'
                    }, {
                        label: 'Private room',
                        value: 'private room',
                        description: 'Guests have a private room, but other areas could be shared',
                        defaultChecked: listingData['listingType'] === 'private room'
                    }, {
                        label: 'Shared room',
                        value: 'shared room',
                        description: 'Guests sleep in a bedroom or a common area that could be shared with others.',
                        defaultChecked: listingData['listingType'] === 'shared room'
                    }]}
        />
    </Stack>

    const canContinue = () => {
        return ['type', 'listingType'].every((field: string) => {
            const f = listingData[field as keyof typeof listingData];
            return f !== undefined && f !== null;
        })
    }

    return {
        label: 'Let\'s start with the basics',
        content: contentElement,
        canContinue: canContinue
    }
}