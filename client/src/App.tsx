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

                        <Route path={'auth'}>
                            <Route index={true} element={<h1>This is the AUTH route</h1>}/>
                        </Route>

                        <Route path={'*'} element={<InvalidPage/>}/>
                    </Route>
                </Routes>
            </div>
        </ThemeProvider>
    );
}

export default App;
