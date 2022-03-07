import React from 'react';
import {Button, Card, Divider, Rating, Stack, TextField, Tooltip, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import {LocalizationProvider} from "@mui/lab";
import DateAdapter from '@mui/lab/AdapterDateFns';
import DynamicDatePicker from "../DynamicDatePicker/DynamicDatePicker";
import Counter from "../Counter/Counter";
import {ListingPartial} from "../../@typings/listings";

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

function CheckoutCard({listing}: IProps) {

    const [checkInDate, setCheckInDate] = React.useState<Date | null>(null);
    const [checkOutDate, setCheckOutDate] = React.useState<Date | null>(null);

    const [errors, setErrors] = React.useState<{ [id: string]: string }>({});

    const getNights = () => {
        if (checkInDate && checkOutDate) {
            return Math.round((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
        }
        return 1;
    }

    return (
        <Card variant={'elevation'} elevation={2} sx={{
            backgroundColor: '#FAFBFD',
            boxShadow: '-1px 11px 20px 4px rgb(0 0 0 / 10%);',
        }}>
            <Stack spacing={2} padding={'1rem 2rem'}>
                <Stack spacing={1}>
                    <Tooltip title={`${listing.rating.count} ratings with an average of ${listing.rating.average}`}>
                        <Stack direction={'row'} color={'darkgrey'}>
                            <StyledRating name="half-rating-read" defaultValue={listing.rating.average} precision={0.5}
                                          readOnly size={'small'} sx={{
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
                            <DynamicDatePicker listingId={listing._id} dpProps={{
                                label: 'Check In',
                                value: checkInDate,
                                onChange: (date: Date | null) => {
                                    setCheckInDate(date)
                                },
                                maxDate: checkOutDate ? new Date(checkOutDate.getTime() - (1000 * 60 * 60 * 24)) : null,
                                onError: (error) => {
                                    if (error === 'shouldDisableDate')
                                        setErrors({...errors, 'check-in-date': 'Reserved Date'})
                                    else if (error)
                                        setErrors({...errors, 'check-in-date': 'Invalid Date'})
                                    else
                                        setErrors({...errors, 'check-in-date': ''})
                                },
                                renderInput: (params) => <TextField {...params} id={'check-in-date'}
                                                                    helperText={errors['check-in-date'] || ''}
                                                                    variant={'standard'} size={'small'}/>
                            }}/>
                            <DynamicDatePicker listingId={listing._id} dpProps={{
                                label: 'Check Out',
                                value: checkOutDate,
                                onChange: (date: Date | null) => {
                                    setCheckOutDate(date)
                                },
                                minDate: checkInDate ? new Date(checkInDate.getTime() + (1000 * 60 * 60 * 24)) : null,
                                onError: (error) => {
                                    if (error === 'shouldDisableDate')
                                        setErrors({...errors, 'check-out-date': 'Reserved Date'})
                                    else if (error)
                                        setErrors({...errors, 'check-out-date': 'Invalid Date'})
                                    else
                                        setErrors({...errors, 'check-out-date': ''})
                                },
                                renderInput: (params) => <TextField {...params} id={'check-out-date'}
                                                                    helperText={errors['check-out-date'] || ''}
                                                                    variant={'standard'} size={'small'}/>
                            }}/>
                        </Stack>
                    </LocalizationProvider>
                </Stack>
                <Stack spacing={2}>
                    <Counter value={1} onIncrement={()=>{}} onDecrement={()=>{}} helperText={'18+'} title={'Adults'} min={1} max={listing.guests || 5}/>
                    <Counter value={0} onIncrement={()=>{}} onDecrement={()=>{}} helperText={'Under 18'} title={'Children'} min={0} max={5}/>
                    <Counter value={0} onIncrement={()=>{}} onDecrement={()=>{}} helperText={'Under 2'} title={'Infant'} min={0} max={5}/>
                </Stack>
                <Divider variant={'middle'}/>
                <Stack spacing={'1rem'}>
                    <Stack>
                        <Stack direction={'row'} justifyContent={'space-between'} color={'darkgrey'}>
                            <Typography variant={'caption'}>{`$${listing.price} X ${getNights()} Nights`}</Typography>
                            <Typography variant={'caption'}>{`$${listing.price * (getNights())}`}</Typography>
                        </Stack>
                        <Stack direction={'row'} justifyContent={'space-between'} color={'darkgrey'}>
                            <Typography variant={'caption'}>{`Cleaning Fee`}</Typography>
                            <Typography variant={'caption'}>{`$60`}</Typography>
                        </Stack>
                        <Stack direction={'row'} justifyContent={'space-between'} color={'darkgrey'}>
                            <Typography variant={'caption'}>{`Service Fee`}</Typography>
                            <Typography variant={'caption'}>{`$30`}</Typography>
                        </Stack>
                    </Stack>
                    <Stack direction={'row'} justifyContent={'space-between'}>
                        <Typography variant={'caption'} color={'darkgrey'}>{`Total`}</Typography>
                        <Typography variant={'h5'}>{`$${listing.price * (getNights()) + 60 + 30}`}</Typography>
                    </Stack>
                </Stack>
                <Stack>
                    <Button variant={'contained'} color={'primary'} disableElevation sx={{
                        padding : '1rem',
                    }}>
                        <Typography variant={'button'}>{'Book Now'}</Typography>
                    </Button>
                </Stack>
            </Stack>
        </Card>
    );
}

export default CheckoutCard;