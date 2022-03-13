import {Divider, Stack, Typography} from "@mui/material";
import CounterInput from "../../../../components/Inputs/CounterInput/CounterInput";
import React from "react";
import { stepProps } from "./@typings";

export default function Step2({listingData, handleChange}: stepProps) {
    console.log(listingData);
    const contentElement = <Stack gap={'1rem'}>
        <Stack gap={'2rem'} width={'fit-content'}>
            <Stack gap={'1rem'}>
                <Stack>
                    <Typography variant={"body1"} fontWeight={'500'}>
                        Accommodations
                    </Typography>
                    <Typography variant={"subtitle2"} color={'gray'}>
                        Check that you have enough beds to accommodate all your guests comfortably.
                    </Typography>
                </Stack>
                <CounterInput showOutline title={"Guests"} name={'guests'} value={listingData.guests || 1} min={1}
                              max={25} onChange={handleChange}/>
            </Stack>
            <Divider variant={'middle'}/>

            <Stack gap={'1rem'}>
                <Stack>
                    <Typography variant={"body1"} fontWeight={'500'}>
                        Sleeping Arrangements
                    </Typography>
                    <Typography variant={"subtitle2"} color={'gray'}>
                        How will guests sleep and use the space?
                    </Typography>
                </Stack>
                <CounterInput showOutline title={"Beds"} name={'beds'} helperText={'How many beds can guests use?'}
                              value={listingData.beds || 1} min={1} max={25} onChange={handleChange}/>
                <CounterInput showOutline title={"Bedrooms"} name={'bedrooms'}
                              helperText={'How many bedrooms are provided?'} value={listingData.bedrooms ?? 0} min={0}
                              max={25} onChange={handleChange}/>
            </Stack>
            <Divider variant={'middle'}/>

            <Stack gap={'1rem'}>
                <Stack>
                    <Typography variant={"body1"} fontWeight={'500'}>
                        Baths and Showers
                    </Typography>
                    <Typography variant={"subtitle2"} color={'gray'}>
                        Bathrooms that don't have a shower or bathtub are half bathrooms
                    </Typography>
                </Stack>
                <CounterInput showOutline name={'baths'} title={'Bathrooms'} step={0.5} value={listingData.baths || 0} min={0}
                              max={25} onChange={handleChange} helperText={'How many bathrooms are provided?'}/>
            </Stack>
        </Stack>
    </Stack>

    const canContinue = () => {
        return ['guests', 'beds', 'baths', 'bedrooms'].every((field: string) => {
            const f = listingData[field as keyof typeof listingData];
            return f !== undefined && f !== null && f !== '';
        })
    }

    return {
        label: 'How many guests can your place accommodate?',
        content: contentElement,
        canContinue: canContinue
    }
}