import React from 'react';

import {
    Routes,
    Route,
} from "react-router-dom";
import Layout from "./layout/Layout";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import HomePage from "./pages/home/HomePage";
import InvalidPage from "./pages/404/404Page";
import ListingsPage from "./pages/listings/ListingsPage";
import ListingDescriptionPage from "./pages/listings/ListingDescriptionPage/ListingDescriptionPage";
import LoginPage from "./pages/login/LoginPage";
import SignupPage from "./pages/signup/SignupPage";

function App() {
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

                        <Route path={'login'} element={<LoginPage/>}/>
                        <Route path={'signup'} element={<SignupPage/>}/>

                        <Route path={'*'} element={<InvalidPage/>}/>
                    </Route>
                </Routes>
            </div>
        </ThemeProvider>
    );
}

export default App;
