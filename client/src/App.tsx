import React from 'react';

import {
    Routes,
    Route,
} from "react-router-dom";
import Layout from "./layout/Layout";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import Home from "./routes/home/Home";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <Routes>
                    <Route path={'/'} element={<Layout/>}>
                        <Route index={true} element={<Home/>}/>
                        <Route path={"listings"} element={<h1>This is the listing page</h1>}/>
                    </Route>
                </Routes>
            </div>
        </ThemeProvider>
    );
}

export default App;
