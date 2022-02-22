import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './stylesheets/stylesheet.scss';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {CssBaseline} from "@mui/material";
const prodAPI = 'https://rest-inn.herokuapp.com';
const devAPI = 'http://localhost:8080';
global.api = prodAPI;
global.apiURL = (path: string, query?:string) => `${global.api}${path||''}?${query||''}`

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <CssBaseline>
                <App/>
            </CssBaseline>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
