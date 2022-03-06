import * as React from 'react';
import TextField from '@mui/material/TextField';
import DatePicker, {DatePickerProps} from '@mui/lab/DatePicker';
import CalendarPickerSkeleton from '@mui/lab/CalendarPickerSkeleton';
import axios from "axios";
import {PickersDay} from "@mui/lab";

function fetchReservedDates(listingId: string): Promise<ReservedDates>{
    return new Promise<ReservedDates>((resolve, reject) => {
        axios.get(apiURL(`/properties/${listingId}/reserved-dates`))
            .then(res => {
                resolve(res.data.data);
            })
            .catch(err => {
                reject(err);
            });
    });
}

const initialDate = new Date();

interface IProps {
    listingId: string;
    dpProps?: DatePickerProps<any>;
}

function DynamicDatePicker({listingId, dpProps}: IProps) {
    const [reservedDates, setReservedDates] = React.useState<ReservedDates>({});
    const [reservedDays, setReservedDays] = React.useState<Number[]>([]);
    const [value, setValue] = React.useState<Date | null>(null);

    const [isLoading, setIsLoading] = React.useState(true);

    /**
     * Returns the reserved dates for the given month
     *
     * @param date
     * @returns {Number[]} The reserved dates for the given month
     */
    const getReservedDaysOfMonth = (date: Date) => {
        const currentYear = date.getFullYear();
        const currentMonth = date.getMonth();

        // Changes the date string (e.g. "2019-01-01-00:00:00") to a date number (e.g. 1, 2, 3, ...)
        return reservedDates[currentYear]?.[currentMonth]?.map(day => new Date(day).getDate()) || [];
    };

    React.useEffect(() => {
        fetchReservedDates(listingId).then(dates => {
            setReservedDates(dates);
            setReservedDays(getReservedDaysOfMonth(initialDate));
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            setIsLoading(false);
        });
    }, []);

    const handleMonthChange = (date: Date) => {
        setIsLoading(true);
        setReservedDays(getReservedDaysOfMonth(date))
        setIsLoading(false);
    };

    return (
            <DatePicker
                // Format the input field
                renderInput={(params) => <TextField {...params}  size={'small'} variant={'standard'}/>}


                {...dpProps}

                value={value}
                onChange={(newDate) => {
                    setValue(newDate);
                    handleMonthChange(newDate || initialDate);
                    dpProps?.onChange(newDate);
                }}
                onMonthChange={(newDate)=>{
                    handleMonthChange(newDate);
                    dpProps?.onMonthChange && dpProps?.onMonthChange(newDate);
                }}

                // Allow selecting the same day - Fixes a bug where the date picker does not reflect if the date is typed in
                allowSameDateSelection={true}

                defaultCalendarMonth={initialDate}

                // Disable reserved days
                shouldDisableDate={(date) => {
                    return reservedDays.indexOf(date.getDate()) >= 0;
                }}

                // Handle loading
                loading={isLoading}
                renderLoading={() => <CalendarPickerSkeleton />}

                // Format the days
                renderDay={(day, _value, pickersDayProps) => {
                    const isReserved = reservedDays.indexOf(day.getDate()) >= 0;
                    return (
                        <PickersDay {...pickersDayProps} sx={{
                            textDecoration: isReserved ? 'line-through' : 'none',
                        }} />
                    );
                }}
            />
    );
}

export default DynamicDatePicker;