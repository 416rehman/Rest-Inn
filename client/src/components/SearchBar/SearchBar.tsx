/*** I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been copied
 * manually or electronically from any other source (including web sites)
 * or distributed to other students. *
 *
 *      Name: Hayaturehman Ahmadzai
 *      Student ID: hahmadzai3
 *      Creation Date: 2022-02-11
 */

import React from 'react';
import Input from '../formElements/Input/Input';
import "./searchbar.scss"

interface IProps {
    [x: string]: any;
}

function SearchBar(props: IProps) {
    return (
        <form action="/search" className={'search-bar' + (props.className || '')} {...props}>
            <Input label={'Location'} id={'location'} name={'location'} type={"text"} placeholder={"Where are you going"}/>
            <Input label={'Check In'} id={'check-in'} name={'check-in'} type={"date"} placeholder={"Add Dates"}/>
            <Input label={'Check Out'} id={'check-out'} name={'check-out'} type={"date"} placeholder={"Add Dates"}/>
            <Input label={'Guests'} id={'guests'} name={'guests'} type={"number"} placeholder={"Add Guests"}/>
        </form>
    );
}

export default SearchBar;