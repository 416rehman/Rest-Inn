import {AuthAction, AuthState} from "../../@typings/auth";

const initialState : AuthState = {
    isAuthenticated: false,
    user: null,
    accessToken: null,
};

export default (state = initialState, action:AuthAction) => {
    switch (action.type) {
        case 'LOGIN':
            console.log(action);
            return {
                ...state,
                isAuthenticated: false,
                user: action.payload.user,
                accessToken: null,
            };
        case 'LOGOUT':
            console.log('LOGOUT');
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                refreshToken: null,
                accessToken: null,
            };
        case 'RENEW_ACCESS_TOKEN':
            console.log('RENEW_ACCESS_TOKEN');
            return {
                ...state,
                user: action.payload.user,
                accessToken: action.payload.accessToken,
                isAuthenticated: true
            };
        default:
            return state;
    }
};