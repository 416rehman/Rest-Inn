import React, {useEffect} from 'react';

import {Route, Routes,} from "react-router-dom";
import Layout from "./layout/Layout";
import {ThemeProvider} from "@mui/material";
import theme from "./theme";
import HomePage from "./pages/home/HomePage";
import NotFoundPage from "./pages/notFound/NotFoundPage";
import ListingsPage from "./pages/listings/ListingsPage";
import ListingDescriptionPage from "./pages/listings/ListingDescription/ListingDescriptionPage";
import LoginPage from "./pages/login/LoginPage";
import SignupPage from "./pages/signup/SignupPage";
import LogoutPage from "./pages/logout/LogoutPage";
import {tryRenewSessionUsingRefreshToken} from "./services/user.service";
import {refreshMetaData} from "./services/listing.service";
import SecuredRoute from 'components/SecuredRoute/SecuredRoute';
import CreateListing from "./pages/listings/CreateListing/CreateListing";
import HostingPage from "./pages/hosting/Hosting";
import BookingsPage from "./pages/bookings/bookingsPage";

function App() {
    useEffect(() => {
        tryRenewSessionUsingRefreshToken()
        refreshMetaData();
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <Routes>
                    <Route path={'/'} element={<Layout/>}>
                        <Route index={true} element={<HomePage/>}/>

                        <Route path={"listings"}>
                            <Route index={true} element={<ListingsPage/>}/>
                            <Route path={"new"} element={<SecuredRoute><CreateListing/></SecuredRoute>}/>
                            <Route path={":listingId"} element={<ListingDescriptionPage/>}/>
                            <Route path={":listingId/edit"} element={<SecuredRoute><CreateListing/></SecuredRoute>}/>
                        </Route>
                        <Route path={'hosting'}>
                            <Route index={true} element={<SecuredRoute><HostingPage/></SecuredRoute>}/>
                        </Route>
                        <Route path={'bookings'}>
                            <Route index={true} element={<SecuredRoute><BookingsPage/></SecuredRoute>}/>
                        </Route>

                        <Route path={"login"} element={<SecuredRoute visitorOnly><LoginPage/></SecuredRoute>}/>
                        <Route path={"signup"} element={<SecuredRoute visitorOnly><SignupPage/></SecuredRoute>}/>
                        <Route path={"logout"} element={<SecuredRoute navToOnFail={'/'}><LogoutPage/></SecuredRoute>}/>
                        <Route path={"settings"} element={<SecuredRoute notImplemented><LogoutPage/></SecuredRoute>}/>
                        <Route path={'profile'}>
                            <Route path={':username'} element={<SecuredRoute notImplemented><LoginPage/></SecuredRoute>}/>
                        </Route>


                        <Route path={'*'} element={<NotFoundPage/>}/>
                    </Route>
                </Routes>
            </div>
        </ThemeProvider>
    );
}

export default App;

