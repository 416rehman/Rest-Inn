import React, {useEffect} from 'react';

import {Route, Routes,} from "react-router-dom";
import Layout from "./layout/Layout";
import {ThemeProvider} from "@mui/material";
import theme from "./theme";
import HomePage from "./pages/home/HomePage";
import NotFoundPage from "./pages/notFound/NotFoundPage";
import ListingsPage from "./pages/listings/ListingsPage";
import ListingDescriptionPage from "./pages/listings/ListingDescriptionPage/ListingDescriptionPage";
import LoginPage from "./pages/login/LoginPage";
import SignupPage from "./pages/signup/SignupPage";
import LogoutPage from "./pages/logout/LogoutPage";
import {renewSessionUsingRefreshToken} from "./services/user.service";
import {refreshMetaData} from "./services/listing.service";
import SecuredRoute from 'components/SecuredRoute/SecuredRoute';

function App() {
    useEffect(() => {
        renewSessionUsingRefreshToken()
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
                            <Route path={":listingId"} element={<ListingDescriptionPage/>}/>
                        </Route>
                        <Route path={"login"} element={<SecuredRoute visitorOnly><LoginPage/></SecuredRoute>}/>
                        <Route path={"signup"} element={<SecuredRoute visitorOnly><SignupPage/></SecuredRoute>}/>
                        <Route path={"logout"} element={<SecuredRoute><LogoutPage/></SecuredRoute>}/>


                        <Route path={'*'} element={<NotFoundPage/>}/>
                    </Route>
                </Routes>
            </div>
        </ThemeProvider>
    )
        ;
}

export default App;

