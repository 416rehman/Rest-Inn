import React, {useState} from 'react';
import "./searchbar.scss"
import {Autocomplete, Button, Stack, TextField} from "@mui/material";
import DateAdapter from '@mui/lab/AdapterDateFns';
import {DatePicker, LocalizationProvider} from "@mui/lab";
import {useSelector} from "react-redux";
import {titleCase} from "../../services/helper.service";
import {useNavigate} from "react-router-dom";

interface IProps {
    className?: string;

    [x: string]: any;
}

function SearchBar({className, ...props}: IProps) {

    const navigate = useNavigate();

    const [checkIn, setCheckIn] = useState<any>(new Date());
    const [checkOut, setCheckOut] = useState<any>(new Date());
    const [guests, setGuests] = useState<number>(1);
    const [destination, setDestination] = useState<string>("");

    const {locations} = useSelector((state: any) => state.meta);

    const handleOnSubmit = (e: any) => {
        e.preventDefault();
        navigate(`/listings?checkIn=${checkIn.toISOString()}&checkOut=${checkOut.toISOString()}&guests=${guests}&location=${(destination.split("-")[0] || destination).trim()}`);
    };

    return (
        <form onSubmit={handleOnSubmit} className={'search-bar' + (className || '')} {...props}>
            <Stack sx={{
                flexBasis: {
                    xs: '100%',
                    md: '80%'
                }
            }}>
                <Button type="submit" sx={{display: 'none'}} fullWidth variant="contained" color="primary"/>
                <Autocomplete
                    freeSolo
                    fullWidth
                    size={'small'}
                    value={destination ?? null}
                    options={locations.map(({_id}: any) => titleCase(_id.city + " - " + _id.province + ' - ' + _id.country))}
                    onChange={(event, value) => {
                        if (value) setDestination(value);
                    }}
                    renderInput={(params) => <TextField {...params} name={'location'} label="Destination"/>}
                />
            </Stack>
            <LocalizationProvider dateAdapter={DateAdapter}>
                <DatePicker
                    label="Check In"
                    value={checkIn}
                    minDate={new Date()}
                    onChange={(newValue) => {
                        setCheckIn(newValue);
                    }}
                    onAccept={(newValue) => {
                        setCheckIn(newValue);
                    }}
                    renderInput={(params) => <TextField name={'checkIn'} size="small" {...params}
                                                        sx={{display: {xs: 'none', md: 'flex',}}}/>}
                />
                <DatePicker
                    label="Check Out"
                    value={checkOut}
                    minDate={checkIn || new Date()}
                    onChange={(newValue) => {
                        setCheckOut(newValue);
                    }}
                    onAccept={(newValue) => {
                        setCheckOut(newValue);
                    }}
                    renderInput={(params) => <TextField name={'checkOut'} size={'small'} {...params}
                                                        sx={{display: {xs: 'none', md: 'flex',}}}/>}
                />
            </LocalizationProvider>
            <TextField inputProps={{inputMode: 'numeric'}} value={guests}
                       name={'guests'}
                       onChange={(e) => setGuests(parseInt(e.target.value) || 0)}
                       size="small" label={"Guests"} sx={{display: {xs: 'none', md: 'flex',}}}/>
        </form>
    );
}

export default SearchBar;