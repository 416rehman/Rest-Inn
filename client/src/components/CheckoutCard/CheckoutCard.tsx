import React from 'react';
import {Button, Card, Divider, Rating, Stack, TextField, Tooltip, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import {LoadingButton, LocalizationProvider} from "@mui/lab";
import DateAdapter from '@mui/lab/AdapterDateFns';
import DynamicDatePicker from "../DynamicDatePicker/DynamicDatePicker";
import CounterInput from "../Inputs/CounterInput/CounterInput";
import {ListingPartial} from "../../@typings/listings";
import {useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import {apiURL, securedPOST} from "../../services/helper.service";
import Alert from "../Alert/Alert";

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
    const location = useLocation();
    const navigate = useNavigate();
    const {accessToken} = useSelector((state: any) => state.auth);

    const [bookingInfo, setBookingInfo] = React.useState<any>({
        checkIn: undefined,
        checkOut: undefined,
        guests: {
            adults: 1,
            children: 0,
            infants: 0
        },
    });
    const [isLoading, setIsLoading] = React.useState(false);
    const [errors, setErrors] = React.useState<{ [id: string]: string }>({});
    const [bookingSuccess, setBookingSuccess] = React.useState(false);
    const [bookedDialogOpen, setBookedDialogOpen] = React.useState(false);

    const getNights = () => {
        if (bookingInfo.checkIn && bookingInfo.checkOut) {
            return (Math.round((bookingInfo.checkOut.getTime() - bookingInfo.checkIn.getTime()) / (1000 * 60 * 60 * 24)));
        }
        return 1;
    }

    const handleCheckIn = (date: Date | null) => {
        setBookingInfo({
            ...bookingInfo,
            checkIn: date,
        });
    }

    const handleCheckOut = (date: Date | null) => {
        setBookingInfo({
            ...bookingInfo,
            checkOut: date,
        });
    }

    const onCheckout = () => {
        setIsLoading(true);
        securedPOST(apiURL('/bookings'), {...bookingInfo, property: listing._id}).then(() => {
            setBookingSuccess(true);
            setBookedDialogOpen(true);
        }).catch(err => {
            setErrors({...errors, 'general': err.response.data.message || 'Something went wrong'});
            setTimeout(() => {
                setErrors({...errors, 'general': ''});
            }, 5000);
        }).finally(() => {
            setTimeout(() => {
                setIsLoading(false);
            }, 200);
        });
    }

    return (
        <Card variant={'elevation'} elevation={2} sx={{
            backgroundColor: '#FAFBFD',
            boxShadow: '-1px 11px 20px 4px rgb(0 0 0 / 10%);',
            overflow: 'clip'
        }}>

            <Stack gap={'2rem'} padding={'2rem'}>
                <Alert open={bookedDialogOpen} setOpen={setBookedDialogOpen} title={'Booking Successful'}
                       message={'Your booking has been successfully placed. You can check your booking details in your bookings page.'}
                       confirmText={'Go to my bookings'}
                       variant={'success'}
                       onConfirm={() => navigate('/bookings')}/>

                <Stack gap={'0.5rem'}>
                    <Tooltip title={`${listing.rating?.count} ratings with an average of ${listing.rating?.average}`}>
                        <Stack direction={'row'} color={'darkgrey'}>
                            <StyledRating name="half-rating-read" defaultValue={listing.rating?.average} precision={0.5}
                                          readOnly size={'small'} sx={{
                                iconFilled: {
                                    color: 'red'
                                }
                            }}/> <Typography variant={'caption'}> / {listing.rating?.average}</Typography>
                        </Stack>
                    </Tooltip>
                    <Typography variant={'h5'} textTransform={'capitalize'}>{listing.title}</Typography>
                    <Stack direction={'row'} color={'darkgrey'} spacing={1}>
                        <Typography variant={'caption'}>{listing.guests || 1} Guests · </Typography>
                        <Typography variant={'caption'}>{listing.bedrooms || 0} Bedrooms · </Typography>
                        <Typography variant={'caption'}>{listing.beds || 0} Beds · </Typography>
                        <Typography variant={'caption'}>{listing.baths || 0} Baths</Typography>
                    </Stack>
                    <Divider variant={'middle'}/>
                </Stack>

                <Stack>
                    <LocalizationProvider dateAdapter={DateAdapter}>
                        <Stack gap={'1rem'}>
                            <DynamicDatePicker listingId={listing._id ?? null} dpProps={{
                                clearable: true,
                                onAccept: handleCheckIn,
                                label: 'Check In',
                                value: bookingInfo.checkIn || null,
                                onChange: handleCheckIn,
                                minDate: new Date(),
                                maxDate: bookingInfo.checkOut ? (new Date(bookingInfo.checkOut).setDate(bookingInfo.checkOut.getDate() - 1)) : null,
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
                            <DynamicDatePicker listingId={listing._id || null} dpProps={{
                                label: 'Check Out',
                                value: bookingInfo.checkOut || null,
                                onChange: handleCheckOut,
                                clearable: true,
                                onAccept: handleCheckOut,
                                minDate: bookingInfo.checkIn ? new Date(bookingInfo.checkIn).setDate(bookingInfo.checkIn.getDate() + 1) : new Date(),
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
                    <CounterInput value={1} helperText={`18+ years`} title={'Adults'} min={1}
                                  onChange={(name, value) => setBookingInfo({
                                      ...bookingInfo,
                                      guests: {
                                          ...bookingInfo.guests,
                                          adults: value,
                                      }
                                  })} max={listing.guests ? listing.guests - bookingInfo.guests['children'] : 5}/>

                    <CounterInput value={0} helperText={`2-17 years`} title={'Children'}
                                  onChange={(name, value) => setBookingInfo({
                                      ...bookingInfo,
                                      guests: {
                                          ...bookingInfo.guests,
                                          children: value,
                                      }
                                  })} min={0}
                                  max={listing.guests ? listing.guests - bookingInfo.guests['adults'] : (5)}/>
                    <CounterInput value={0} helperText={`less than 2 years`} title={'Infants'} min={0} max={5}/>
                </Stack>

                <Divider variant={'middle'}/>

                <Stack spacing={'1rem'}>
                    <Stack>
                        <Stack direction={'row'} justifyContent={'space-between'} color={'darkgrey'}>
                            <Typography variant={'caption'}>{`$${listing.price} X ${getNights()} Nights`}</Typography>
                            <Typography variant={'caption'}>{`$${(listing.price ?? 1) * (getNights())}`}</Typography>
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
                        <Typography variant={'h5'}>{`$${
                            (listing.price ?? 1) * (getNights()) + 60 + 30
                        }`}</Typography>
                    </Stack>
                </Stack>

                <Stack>
                    {(accessToken ?
                            (
                                bookingInfo.checkIn && bookingInfo.checkOut ?
                                    (
                                        bookingSuccess ?
                                            <Button variant={'outlined'} disabled color={'success'} onClick={onCheckout}
                                                    disableElevation sx={{padding: '1rem',}}>
                                                Booking Successful
                                            </Button>
                                            :
                                            <LoadingButton loading={isLoading} variant={'contained'}
                                                           color={errors['general'] ? 'error' : 'primary'}
                                                           onClick={onCheckout} disableElevation
                                                           sx={{padding: '1rem',}}>
                                                {errors['general'] ? errors['general'] : 'Book Now'}</LoadingButton>
                                    )
                                    :
                                    <Button variant={'outlined'} disabled color={'primary'} onClick={onCheckout}
                                            disableElevation sx={{padding: '1rem',}}>
                                        Add Check-in and Check-out Dates to Book
                                    </Button>
                            )
                            :
                            <Button variant={'contained'} color={'primary'}
                                    onClick={() => {
                                        navigate('/login', {
                                            state: {
                                                redirect: location.pathname,
                                            }
                                        })
                                    }
                                    } disableElevation
                                    sx={{padding: '1rem',}}>
                                Login To Book
                            </Button>
                    )
                    }
                </Stack>
            </Stack>
        </Card>
    );
}

export default CheckoutCard;