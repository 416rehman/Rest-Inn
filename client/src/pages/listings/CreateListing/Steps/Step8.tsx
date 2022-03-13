import {
    InputAdornment,
    Stack, TextField,
    Typography
} from "@mui/material";
import React from "react";


export default function Step7({listingData, handleChange}:any) {
    const ContentElement = () => {

        return(
            <Stack gap={'2rem'}>
                <Stack>
                    <Stack>
                        <Typography variant={"body1"} fontWeight={'500'}>
                            Name Your Place
                        </Typography>
                        <Typography variant={"subtitle2"} color={'gray'}>
                            Attract guests with a listing title that highlights what makes your place special.
                        </Typography>
                    </Stack>
                    <TextField
                        fullWidth
                        helperText={'Min characters: 50, Max characters: 15'}
                        defaultValue={listingData.title || null}
                        inputProps={{ maxLength: 50, minLength: 15 }}
                        onBlur={(e) => {if (e.target.value) handleChange('title', e.target.value)}}
                    />
                </Stack>
                <Stack>
                    <Stack>
                        <Typography variant={"body1"} fontWeight={'500'}>
                            Price Your Space
                        </Typography>
                        <Typography variant={"subtitle2"} color={'gray'}>
                            This will be your price per night.
                        </Typography>
                    </Stack>
                    <TextField
                        fullWidth
                        type={"number"}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                        defaultValue={listingData.price ?? null}
                        onBlur={(e) => {if (e.target.value) handleChange('price', e.target.value)}}
                    />
                </Stack>
            </Stack>
        )
    }

    const canContinue = () => {
        return listingData.title && listingData.title.length > 16 && listingData.title.length < 50 && listingData.price && listingData.price > 0
    }

    return {
        label: "One last thing",
        content: <ContentElement/>,
        canContinue: canContinue
    }
}