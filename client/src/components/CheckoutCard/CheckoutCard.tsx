import React from 'react';
import {Divider, Rating, Stack, TextField, Tooltip, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import {DatePicker, LocalizationProvider} from "@mui/lab";
import DateAdapter from '@mui/lab/AdapterDateFns';
import DynamicDatePicker from "../DynamicDatePicker/DynamicDatePicker";

interface IProps {
    listing: ListingPartial
}
const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: 'rgba(0,0,0,0.7)',
    },
    '& .MuiRating-iconHover': {
        color: '#625831',
    },
});

function CheckoutCard({listing}:IProps) {

    const [checkInDate, setCheckInDate] = React.useState<Date | null>(null);

    return (
        <Stack spacing={1}>
            <Stack spacing={1}>
                <Tooltip title={`${listing.rating.count} ratings with an average of ${listing.rating.average}`}>
                    <Stack direction={'row'} color={'darkgrey'}>
                        <StyledRating name="half-rating-read" defaultValue={listing.rating.average} precision={0.5} readOnly size={'small'} sx={{
                            iconFilled: {
                                color: 'red'
                            }
                        }}/> <Typography variant={'caption'}> / {listing.rating.average}</Typography>
                    </Stack>
                </Tooltip>
                <Typography variant={'h5'} textTransform={'capitalize'}>{listing.title}</Typography>
                <Stack direction={'row'} color={'darkgrey'} spacing={1}>
                    <Typography variant={'caption'}>{listing.guests || 1} Guests · </Typography>
                    <Typography variant={'caption'}>{listing.bedrooms || 0} Bedrooms · </Typography>
                    <Typography variant={'caption'}>{listing.beds || 0} Beds · </Typography>
                    <Typography variant={'caption'}>{listing.baths || 0} Baths</Typography>
                </Stack>
            </Stack>
            <Divider variant={'middle'}/>
            <Stack>
                <LocalizationProvider dateAdapter={DateAdapter}>
                        <Stack direction={'row'} spacing={3}>
                            <DatePicker
                                label="Check in"
                                value={checkInDate}
                                onChange={(newValue) => {
                                    setCheckInDate(newValue);
                                }}
                                renderInput={(params) => <TextField variant={'standard'} size={'small'} {...params} />}
                            />
                            <DatePicker
                                label="Check out"
                                value={checkInDate}
                                onChange={(newValue) => {
                                    setCheckInDate(newValue);
                                }}
                                renderInput={(params) => <TextField variant={'standard'} size={'small'} {...params} />}
                            />
                        </Stack>
                    </LocalizationProvider>
                 <Stack>
                     <DynamicDatePicker/>
                 </Stack>
            </Stack>
        </Stack>
    );
}

export default CheckoutCard;