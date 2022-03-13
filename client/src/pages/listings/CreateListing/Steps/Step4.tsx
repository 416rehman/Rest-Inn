import { Divider, Stack, TextField, Typography} from "@mui/material";
import React, {useEffect} from "react";
import {stepProps} from "./@typings";
import {usePlacesWidget} from "react-google-autocomplete";
import {parseLocationFromPlace} from "../../../../services/geo.service";
import countries from "../../../../services/geo.service";

export default function Step4({listingData, handleChange, setListingData}: stepProps | any) {
    const ContentElement = () => {

        const [countryCode, setCountryCode] = React.useState(countries.getCountryByName(listingData.location?.country || '')?.code);

        useEffect(() => {
            setCountryCode(countries.getCountryByName(listingData.location?.country || '')?.code);
        }, [listingData.location?.country]);

        const handlePlaceSelection = (place: any) => {
            console.log('place')
            const parsedPlace = parseLocationFromPlace(place);
            setListingData({
                ...listingData,
                location: {
                    ...listingData.location,
                    ...parsedPlace
                }
            });
        };

        const {ref: materialRef} = usePlacesWidget({
            apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
            onPlaceSelected: handlePlaceSelection,
            inputAutocompleteValue: "country",
            options: {
                componentRestrictions: {country: countryCode},
                types: ['address']
            },
        });

        return listingData.location?.country ?
            <Stack gap={'2rem'}>
                <Stack>
                    <Typography variant={"body1"} fontWeight={'500'}>
                        Where in <strong>{listingData.location?.country}</strong> are you located?
                    </Typography>
                    <Typography variant={"subtitle2"} color={'gray'}>
                        Don't worry, guests will only get your exact address once they've booked a reservation.
                    </Typography>
                </Stack>
                <Stack gap={'1rem'}>
                    <TextField
                        defaultValue={listingData.location?.street}
                        fullWidth
                        name={'street'}
                        variant="outlined"
                        label="Address *"
                        inputRef={materialRef}
                    />
                    <TextField
                        defaultValue={listingData.location?.unit}
                        onBlur={(e) => handleChange(e.target.name, e.target.value)}
                        fullWidth
                        name={'unit'}
                        variant="outlined"
                        label="Unit"/>
                    <Divider variant={'middle'}/>
                    <TextField
                        defaultValue={listingData.location?.city}
                        onBlur={(e) => handleChange(e.target.name, e.target.value)}
                        fullWidth
                        name={'city'}
                        variant="outlined"
                        label="City *"/>
                    <TextField
                        defaultValue={listingData.location?.province}
                        onBlur={(e) => handleChange(e.target.name, e.target.value)}
                        fullWidth
                        name={'province'}
                        variant="outlined"
                        label="Province / State *"/>
                    <TextField
                        defaultValue={listingData.location?.postalCode}
                        onBlur={(e) => handleChange(e.target.name, e.target.value)}
                        fullWidth
                        name={'postalCode'}
                        variant="outlined"
                        inputProps={{ maxLength: 10 }}
                        label="Postal Code / ZIP Code *"/>
                </Stack>
            </Stack> : <Stack>
                <Typography variant={"body1"} fontWeight={'500'}>
                    Uh oh! We can't find your country. Please go back and select your country.
                </Typography>
            </Stack>
    }

    const canContinue = () => {
        return ['street', 'city', 'province', 'postalCode'].every((field: string) => {
            const f = listingData['location'][field as keyof typeof listingData];
            return f !== undefined && f !== null && f !== '';
        })
    }

    return {
        label: "Where's your place located?",
        content: <ContentElement/>,
        canContinue: canContinue
    }
}