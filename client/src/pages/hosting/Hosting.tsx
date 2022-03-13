import React, {useEffect} from 'react';
import {Button, Divider, Stack, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import ListingsPage from "../listings/ListingsPage";
import {AddLocationAlt} from "@mui/icons-material";
import BookingsPage from "../bookings/bookingsPage";

function Hosting() {
    const navigate = useNavigate();
    const {user} = useSelector((state: any) => state.auth);
    const [lastListing, setLastListing] = React.useState<any>();

    useEffect(() => {
        setLastListing(localStorage.getItem('lastListing'))
    }, []);

    return (
        <Stack>
            <Stack gap={'1rem'} direction={'row'} flexWrap={'wrap'} justifyContent={'space-evenly'} alignItems={'center'} padding={'5rem 1rem'} sx={{
                background: 'linear-gradient(to right, #373a9f, #b33362)',
                color: 'white',
            }}>
                <Stack>
                    <Typography variant="h4" fontWeight={500}>Hosting</Typography>
                    <Typography variant="subtitle1" fontSize={'0.9rem'}>
                        Welcome to CRIB Hosting. Hosting is a great way to earn money by renting out your property.<br/>
                        Use the links below to get started.
                    </Typography>
                </Stack>
                {lastListing && <Button variant={'outlined'} onClick={() => {
                    navigate('/listings/new', {state: {listing: lastListing}})
                }} sx={{
                    color: 'white',
                    borderColor: 'gray',
                    backgroundColor: 'rgba(0,0,0,0.19)',
                    height: '3rem',
                    '&:hover': {
                        backgroundColor: 'rgba(0,0,0,0.38)',
                        borderColor: 'white',
                    }
                }}>
                    Complete your last listing
                </Button>}
            </Stack>
            <Stack padding={'1rem 3rem'} alignItems={'center'}>
                <Stack gap={'3rem'} direction={'row'} flexWrap={'wrap'}>
                    <Typography variant="h5" fontWeight={500}>Your Listings</Typography>
                    <Button disableElevation variant={'contained'} startIcon={<AddLocationAlt/>}
                            onClick={() => {
                                navigate('/listings/new')
                            }}>
                        Add a Listing</Button>
                </Stack>
                {user?._id && <ListingsPage host={user._id} hideOnEmpty hideFilter style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    alignItems: 'center'
                }}/>}
            </Stack>
            <Divider/>
            <Stack padding={'1rem 0rem'} alignItems={'center'}>
                <BookingsPage query={'forHosts=true'} title={'Your Guests'} width={'100%'} subtitle={
                    'These are the guests that have booked your listings. You can review their reviews and respond to their requests (TO DO).'
                } message={' '}/>
            </Stack>
        </Stack>
    );
}

export default Hosting;