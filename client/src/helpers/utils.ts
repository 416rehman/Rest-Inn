import store from "../redux/store";
import jwtDecode from "jwt-decode";
import {renewSession} from "./userAPI.helper";

enum API_GATEWAY {
    PROD = `https://rest-inn.herokuapp.com`,
    DEV = `http://localhost:8080`
}

let RENEWAL_IN_PROGRESS = false;

/**
 * Builds the API Gateway URL, and renews the accessToken if needed
 * @param path
 * @param query
 */
global.apiURL = (path: string, query?: string) => {
    // if accessToken is expired, auto-renew it
    const accessToken = store.getState().accessToken;
    if (accessToken) {
        const decodedToken: any = jwtDecode(accessToken || "");
        if (!RENEWAL_IN_PROGRESS && (decodedToken && decodedToken.exp < Date.now() / 1000)) {
            console.log("Renewing accessToken");
            RENEWAL_IN_PROGRESS = true;
            renewSession().then(() => RENEWAL_IN_PROGRESS = false);
        }
    }

    return `${API_GATEWAY.DEV}${path || ''}${query ? '?' + query : ''}`;
}

global.titleCase = (string) => {
    return string.replace(/\w\S*/g, (txt) => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    })
}

global.randomHexColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

export {};