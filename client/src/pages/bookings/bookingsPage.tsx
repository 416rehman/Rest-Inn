import React, {useEffect, useState} from 'react';
import {getBookings} from "../../services/bookings.service";
import ListingCard from "../../components/ListingCard/ListingCard";
import {Divider, Grid, Stack, Typography} from "@mui/material";

import Barcode from 'react-barcode';

const BookingCard = ({booking}: { booking: any }) => {
    return <Stack width={500} gap={'0.5rem'} sx={{backgroundColor: '#D9D9D9', borderRadius: '2rem', padding: '2rem'}}>
        <Stack justifyContent={'space-between'} direction={'row'}>
            <Stack alignItems={'flex-start'}>
                <Typography variant={'subtitle2'} color={'gray'}>CHECK IN</Typography>
                <Typography variant={'subtitle2'}
                            fontWeight={600}>{new Date(booking.checkIn).toDateString()}</Typography>
            </Stack>
            <Stack alignItems={'flex-end'}>
                <Typography variant={'subtitle2'} color={'gray'}>CHECK OUT</Typography>
                <Typography variant={'subtitle2'}
                            fontWeight={600}>{new Date(booking.checkOut).toDateString()}</Typography>
            </Stack>
        </Stack>
        <Divider/>
        <Stack direction={'row'} justifyContent={'space-between'}>
            <Stack alignItems={'center'}>
                <Typography variant={'subtitle2'} color={'gray'}>ADULTS</Typography>
                <Typography variant={'subtitle2'} fontWeight={600}>{booking.guests.adults || 1}</Typography>
            </Stack>
            <Stack alignItems={'center'}>
                <Typography variant={'subtitle2'} color={'gray'}>CHILDREN</Typography>
                <Typography variant={'subtitle2'} fontWeight={600}>{booking.guests.children || 1}</Typography>
            </Stack>
            <Stack alignItems={'center'}>
                <Typography variant={'subtitle2'} color={'gray'}>INFANTS</Typography>
                <Typography variant={'subtitle2'} fontWeight={600}>{booking.guests.infants || 1}</Typography>
            </Stack>
        </Stack>
        <Divider/>

        <Stack justifyContent={'space-between'} direction={'row'}>
            <Stack alignItems={'flex-start'}>
                <Typography variant={'subtitle2'} color={'gray'}>GUEST</Typography>
                <Typography variant={'subtitle2'} fontWeight={600}>{booking.user.username}</Typography>
            </Stack>
            <Stack alignItems={'flex-end'}>
                <Typography variant={'subtitle2'} color={'gray'}>Nights</Typography>
                <Typography variant={'subtitle2'} fontWeight={600}>{
                    new Date(booking.checkOut).getDate() - new Date(booking.checkIn).getDate()
                }</Typography>
            </Stack>
        </Stack>
        <Divider/>
        <Stack>
            <Typography variant={'subtitle2'} color={'gray'}>CONFIRMATION</Typography>
            {booking.confirmationCode ?
                <Barcode value={booking.confirmationCode} fontSize={14} width={2} height={30} format={"CODE128"}/>
                : <Barcode value={booking._id} fontSize={14} background={"transparent"} width={1.5} height={30}
                           format={"CODE128"}/>}
        </Stack>

        <ListingCard listing={booking.property} color={'rgba(255,255,255,0.51) !important'}/>
    </Stack>
}

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
                {bookings && bookings.map((booking: any) => {
                    return (
                        <Grid item key={booking._id}><BookingCard booking={booking}/></Grid>
                    )
                })}
            </Stack>
        </Stack>
    );
}

export default BookingsPage;