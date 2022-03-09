import {isAccessExpired, renewSessionUsingRefreshToken} from "./user.service";

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
    if (isAccessExpired()) {
        renewSessionUsingRefreshToken().then();
    }

    return `${API_GATEWAY.DEV}${path || ''}${query ? '?' + query : ''}`;
}

const titleCase = (string:string) => {
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
    randomHexColor
};