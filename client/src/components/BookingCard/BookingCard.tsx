import {Divider, Stack, Typography} from "@mui/material";
import ListingCard from "../ListingCard/ListingCard";
import React from "react";
import Barcode from 'react-barcode';

const BookingCard = ({booking}: { booking: any }) => {
    return <Stack width={'100%'} maxWidth={500} gap={'0.5rem'} justifyContent={'center'}
                  sx={{backgroundColor: '#D9D9D9', borderRadius: '2rem', padding: '2rem'}}>
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
        <Stack sx={{
            '& > svg': {
                width: '100%',
                height: 'auto',
                margin: '0 auto'
            }
        }}>
            <Typography variant={'subtitle2'} color={'gray'}>CONFIRMATION</Typography>
            {booking.confirmationCode ?
                <Barcode value={booking.confirmationCode} fontSize={14} width={2} height={30} format={"CODE128"}/>
                : <Barcode value={booking._id} fontSize={14} background={"transparent"} width={1.5} height={30}
                           format={"CODE128"}/>}
        </Stack>

        <ListingCard listing={booking.property} color={'rgba(255,255,255,0.51) !important'}/>
    </Stack>
}

export default BookingCard;