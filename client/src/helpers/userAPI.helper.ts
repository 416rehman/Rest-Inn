import axios from "axios";
import {CompleteUser, NewUser} from "../@typings/users";
import store from "../redux/store";
import {AuthAction, AuthActionEnum} from "../@typings/auth";

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

                const refresh_token = store.getState().user?.refreshToken || null;
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

const renewAccessToken = (refresh_token: string): Promise<any> => {
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
                store.dispatch(action)
                resolve(res.data.data);
            }
        }).catch(err => {
            reject(err);
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
        return Promise.resolve();
};

/**
 * If refreshToken is in memory or localStorage, uses it to renew access token
 */
const renewSession = () => {
    const refresh_token = store.getState().user?.refreshToken || localStorage.getItem('refreshToken') || null;
    if (refresh_token) return renewAccessToken(refresh_token)
    else return Promise.reject();
};


export {createUser, login, logout, renewSession};