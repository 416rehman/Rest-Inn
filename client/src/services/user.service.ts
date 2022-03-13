import axios from "axios";
import {CompleteUser, NewUser} from "../@typings/users";
import store from "../redux/store";
import {AuthAction, AuthActionEnum, AuthState} from "../@typings/auth";
import {apiURL, securedPOST} from "./helper.service";
import jwtDecode from "jwt-decode";

let TOKEN_RENEWAL_IN_PROGRESS = false;

const createUser = async (user: NewUser): Promise<CompleteUser> => {
    return new Promise<CompleteUser>((resolve, reject) => {
        axios.post(apiURL('/users'), user).then(res => {
            if (res.data.data) {
                renewAccessToken(res.data.data.refreshToken).then(() => {
                    resolve(res.data.data);
                }).catch(err => {
                    reject(err);
                });
            } else {
                reject(res.data.error);
            }
        }).catch(err => {
            reject(err);
        });
    });
};

const login = async (email: string, password: string) => {
    return new Promise<CompleteUser>((resolve, reject) => {
        axios.post(apiURL('/auth/login'), {email, password}).then(res => {
            if (res.data.data) {
                localStorage.setItem('refreshToken', res.data.data.refreshToken);
                tryRenewSessionUsingRefreshToken();
            } else {
                reject(res.data.error);
            }
        }).catch(err => {
            reject(err?.response?.data?.error || 'Login or Password is invalid');
        });
    });
};

/**
 * Renews access token by exchanging refresh token
 * @summary Only one renewal at a time
 * @param refresh_token
 */
const renewAccessToken = (refresh_token: string): Promise<any> => {
    if (TOKEN_RENEWAL_IN_PROGRESS) return new Promise((resolve, reject) => {
        reject('Token renewal in progress');
    });

    TOKEN_RENEWAL_IN_PROGRESS = true;
    localStorage.removeItem('accessToken');

    return new Promise<any>((resolve, reject) => {
        if (!refresh_token?.length) {
            reject('Please provide a refresh token');
        }

        securedPOST(apiURL('/auth/token'), {}, true).then(res => {
            try {
                localStorage.setItem('accessToken', res.data.data.accessToken);
                store.dispatch({
                    type: AuthActionEnum.SET_ACCESS_TOKEN,
                    payload: res.data.data.accessToken
                })
                store.dispatch({
                    type: AuthActionEnum.SET_USER,
                    payload: res.data.data.user
                })
                resolve(res.data.data);
            } catch (err) {
                reject(err);
            }
        }).catch(err => {
            reject(err);
        }).finally(() => {
            TOKEN_RENEWAL_IN_PROGRESS = false;
        });
    });
};

/** Clears the user's session from memory and localstorage **/
const tryLogout = async () => {
    const action: AuthAction = {
        type: AuthActionEnum.CLEAR_ALL,
        payload: {}
    }
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('lastListing');
    store.dispatch(action)
};

/**
 * If refreshToken is in localStorage, uses it to renew access token
 * @returns {Boolean} true if renewal was successful, false otherwise
 */
const tryRenewSessionUsingRefreshToken = () => {
    const refresh_token = localStorage.getItem('refreshToken') || null;
    if (refresh_token) renewAccessToken(refresh_token).then(() => {
        return true;
    }).catch(() => {
        return false;
    });
};

/** Check if the accessToken in the memory or localStorage is valid **/
const validateTokenAndGetInfo = () => {
    const authState: AuthState = store.getState().auth
    const accessToken = authState.accessToken || localStorage.getItem('accessToken') || null;

    if (accessToken) {
        const decoded: any = jwtDecode('' + accessToken);

        if (decoded.exp > Date.now() / 1000) {
            return decoded;
        }
    }
    return false;
}


export {createUser, login, tryLogout, tryRenewSessionUsingRefreshToken, validateTokenAndGetInfo};