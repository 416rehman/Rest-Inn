import axios from "axios";
import {CompleteUser, NewUser} from "../@typings/users";
import store from "../redux/store";
import {AuthAction, AuthActionEnum} from "../@typings/auth";
import {apiURL} from "./helper.service";
import jwtDecode from "jwt-decode";

let TOKEN_RENEWAL_IN_PROGRESS = false;

const createUser = async (user: NewUser): Promise<CompleteUser> => {
    return new Promise<CompleteUser>((resolve, reject) => {
        axios.post(apiURL('/users'), user).then(res => {
            if (res.data.data) {
                resolve(res.data.data);
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
                const payload = {
                    user: res.data.data,
                }
                const action: AuthAction = {
                    type: AuthActionEnum.LOGIN,
                    payload: payload
                }
                localStorage.setItem('refreshToken', res.data.data.refreshToken);
                store.dispatch(action)

                const refresh_token = store.getState().auth.user?.refreshToken || null;
                if (refresh_token) renewAccessToken(refresh_token).then(() => {
                    resolve(res.data.data);
                }).catch(err => {
                    reject(err);
                });
                else reject('No refresh token');
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
        axios.post(apiURL('/auth/token'), {}, {headers: {'Authorization': refresh_token}}).then(res => {
            if (res.data.data) {
                const action: AuthAction = {
                    type: AuthActionEnum.RENEW_ACCESS_TOKEN,
                    payload: res.data.data
                }
                localStorage.setItem('accessToken', res.data.data.accessToken);
                store.dispatch(action)
                resolve(res.data.data);
            }
        }).catch(err => {
            reject(err);
        }).finally(() => {
            TOKEN_RENEWAL_IN_PROGRESS = false;
        });
    });
};

const logout = async () => {
        const action: AuthAction = {
            type: AuthActionEnum.LOGOUT,
            payload: {}
        }
        store.dispatch(action)
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('accessToken');
        return Promise.resolve();
};

/**
 * If refreshToken is in memory or localStorage, uses it to renew access token
 */
const renewSessionUsingRefreshToken = () => {
    const refresh_token = store.getState().auth.user?.refreshToken || localStorage.getItem('refreshToken') || null;
    if (refresh_token) return renewAccessToken(refresh_token)
    else return Promise.reject();
};

const isAccessExpired = () => {
    const accessToken = store.getState().auth.user?.accessToken || localStorage.getItem('accessToken') || null;
    if (accessToken) {
        const decoded:any = jwtDecode(''+accessToken);
        if (decoded.exp < Date.now() / 1000) {
            return true;
        }
    }
    return false;
};


export {createUser, login, logout, renewSessionUsingRefreshToken, isAccessExpired};