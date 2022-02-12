import React from 'react';
import './App.css';

import {
    Routes,
    Route,
} from "react-router-dom";
import Home from "./routes/home/Home";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route index={true} element={<Home/>}/>
                <Route path={"listings"} element={<h1>This is the listing page</h1>}/>
            </Routes>
        </div>
    );
}

export default App;
