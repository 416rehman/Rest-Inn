import React, {useEffect, useState} from 'react';
import {getBookings} from "../../services/bookings.service";
import {Stack, Typography} from "@mui/material";
import BookingCard from "../../components/BookingCard/BookingCard";

function BookingsPage({query, title, subtitle, message, ...rest}:{query?: any, title?: string, subtitle?: string, message?: string, [x:string]: any}) {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        getBookings(query).then(data => {
            setBookings(data);
        });
    }, []);
    return (
        <Stack {...rest}>
                <Stack padding={'5rem 1rem'} flexWrap={'wrap'} justifyContent={'space-evenly'} direction={'row'} sx={{
                    background: 'linear-gradient(to right, #027669, #698b2d)',
                    color: 'white'
                }}>
                    <Stack>
                        <Typography variant={'h4'} fontWeight={'bold'}>
                            {title || 'Bookings and Reservations'}
                        </Typography>
                        <Typography variant={'subtitle1'}>
                            {subtitle || 'Here you can view all your bookings and reservations in one place.'}
                        </Typography>
                    </Stack>
                    <Stack>
                        <Typography variant={'subtitle1'}>
                            {message || `You have booked ${bookings.length || 0} times with CRIB.`}
                        </Typography>
                    </Stack>
                </Stack>
            <Stack gap={'1rem'} direction={'row'} flexWrap={'wrap'} padding={'1rem'} justifyContent={'center'}>
                {bookings?.length && bookings.map((booking: any) => {
                    return (
                        <Stack key={booking._id} sx={{
                            width: {
                                md: 'fit-content',
                                xs: '100%'
                            },
                            alignItems: 'center'
                        }}><BookingCard booking={booking} /></Stack>
                    )
                })}
            </Stack>
        </Stack>
    );
}

export default BookingsPage;