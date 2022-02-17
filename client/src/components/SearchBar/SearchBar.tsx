import React, {useState} from 'react';
import "./searchbar.scss"
import {TextField} from "@mui/material";
import DateAdapter from '@mui/lab/AdapterDateFns';
import { DatePicker, LocalizationProvider } from "@mui/lab";


interface IProps {
    className?: string;

    [x: string]: any;
}

function SearchBar({className, ...props}: IProps) {
    const [checkIn, setCheckIn] = useState<any>(null);
    const [checkOut, setCheckOut] = useState<any>(null);

    return (
        <form action="/search" className={'search-bar' + (className || '')} {...props}>
            <TextField
                id="destination"
                name={'destination'}
                label="Where are you going?"
                type="search"
                variant="outlined"
                size="small"
                fullWidth
                sx={{
                    flexBasis: {
                        xs: '100%',
                        md: '80%'
                    }
                }}
                InputProps={{
                    className: 'search-bar__input'
                }}/>
            <LocalizationProvider dateAdapter={DateAdapter}>
                <DatePicker
                    label="Check In"
                    value={checkIn}
                    onChange={(newValue) => {
                        setCheckIn(newValue);
                    }}
                    renderInput={(params) => <TextField name={'check-in'} size="small" {...params} sx={{ display: { xs: 'none', md: 'flex',  }}} />}
                />
                <DatePicker
                    label="Check Out"
                    value={checkOut}
                    onChange={(newValue) => {
                        setCheckOut(newValue);
                    }}
                    renderInput={(params) => <TextField name={'check-out'} size={'small'} {...params} sx={{ display: { xs: 'none', md: 'flex',  }}}  />}
                />
            </LocalizationProvider>
            <TextField inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}} size="small" label={"Guests"} sx={{ display: { xs: 'none', md: 'flex',  }}} />
        </form>
    );
}

export default SearchBar;