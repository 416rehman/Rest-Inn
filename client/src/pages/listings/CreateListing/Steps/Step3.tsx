import {Autocomplete, FormControl, Stack, TextField, Typography} from "@mui/material";
import React from "react";
import {stepProps} from "./@typings";
import countries from "../../../../services/geo.service";

export default function Step3({listingData, handleChange}: stepProps) {
    const countryNames = countries.getAllNames();

    const ContentElement = () => {
        return <Stack gap={'1rem'}>
            <Stack gap={'2rem'}>
                <Typography variant={"body1"} fontWeight={'500'}>
                    What's the country of your listing?
                </Typography>
                <Typography variant={"subtitle2"} color={'gray'}>
                    We'll use this to so guests know where to find you.
                </Typography>
                <FormControl>
                    <Autocomplete
                        value={listingData.location?.country ?? null}
                        id="country-combo-box"
                        options={countryNames}
                        onChange={(event, value) => {
                            if (value) handleChange('country', value)
                        }}
                        renderInput={(params) => <TextField {...params} name={'country'} label="Country / Region"/>}
                    />
                </FormControl>
            </Stack>
        </Stack>
    }

    const canContinue = () => {
        const loc: any = listingData['location']
        return ['country'].every((field: string) => {
            const f = loc[field];
            return f !== undefined && f !== null && f !== '';
        })
    }

    return {
        label: "Let's narrow down your location",
        content: <ContentElement/>,
        canContinue: canContinue
    }
}