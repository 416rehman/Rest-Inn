import React from 'react';
import Navbar from "../components/Navbar/Navbar";
import {Outlet} from "react-router-dom";
import Footer from "../components/Footer/Footer";
import './Layout.scss'
function Layout() {
    return (
        <React.Fragment>
            <Navbar/>
            <div className={'outlet'}>
                <Outlet/>
            </div>
            <Footer/>

        </React.Fragment>
    );
}

export default Layout;