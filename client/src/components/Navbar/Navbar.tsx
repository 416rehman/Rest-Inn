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
import "./navbar.scss";

import {Link} from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

function Navbar() {
    return (
        <nav>
            <div id={"logo"}>
                <Link to={"/"}>
                    <img src={"/logo192.png"} alt={"logo"}/>
                </Link>
            </div>
            <SearchBar/>
        </nav>
    );
}

export default Navbar;