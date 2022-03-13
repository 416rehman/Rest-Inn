import {validateTokenAndGetInfo, tryRenewSessionUsingRefreshToken} from "./user.service";
import axios from "axios";

enum API_GATEWAY {
    PROD = `https://rest-inn.herokuapp.com`,
    DEV = `http://localhost:8080`
}

/**
 * Builds the API Gateway URL, and renews the accessToken if needed
 * @param path
 * @param query
 */
const apiURL = (path: string, query?: string) => {
    if (!validateTokenAndGetInfo() && localStorage.getItem('refreshToken')) {
        tryRenewSessionUsingRefreshToken();
    }
    return `${process.env.REACT_APP_API_URL}${path || ''}${query ? '?' + query : ''}`;
}

const securedGET = (path: string, useRefreshToken: boolean = false) => {
    return axios.get(path, {headers: {Authorization: (useRefreshToken ? localStorage.getItem('refreshToken') : localStorage.getItem('accessToken')) || ''}});
}
const securedPOST = (path: string, body: any, useRefreshToken: boolean = false) => {
    return axios.post(path, body, {headers: {Authorization: (useRefreshToken ? localStorage.getItem('refreshToken') : localStorage.getItem('accessToken')) || ''}});
}
const securedPUT = (path: string, body: any, useRefreshToken: boolean = false, headers?: {}) => {
    console.log('securedPUT');
    const config = {
        headers: {
            Authorization: (useRefreshToken ? localStorage.getItem('refreshToken') : localStorage.getItem('accessToken')) || '',
            ...headers
        }
    }
    return axios.put(path, body, config);
}
const securedDELETE = (path: string, useRefreshToken: boolean = false) => {
    return axios.delete(path, {headers: {Authorization: (useRefreshToken ? localStorage.getItem('refreshToken') : localStorage.getItem('accessToken')) || ''}});
}

const titleCase = (string: string) => {
    if (!string) return '';
    return string.replace(/\w\S*/g, (txt) => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    })
}

const randomHexColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

export {
    apiURL,
    titleCase,
    randomHexColor,
    securedGET,
    securedPOST,
    securedPUT,
    securedDELETE
};