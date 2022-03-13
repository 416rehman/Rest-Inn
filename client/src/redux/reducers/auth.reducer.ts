import {AuthAction, AuthActionEnum, AuthState} from "../../@typings/auth";

const initialState : AuthState = {
    user: null,
    accessToken: null,
};

export default (state = initialState, action:AuthAction) => {
    switch (action.type) {
        case AuthActionEnum.SET_USER:
            return {
                ...state,
                user: action.payload
            };
        case AuthActionEnum.CLEAR_ALL:
            return {
                ...state,
                user: null,
                accessToken: null,
            };
        case AuthActionEnum.SET_ACCESS_TOKEN:
            return {
                ...state,
                accessToken: action.payload,
            };
        default:
            return state;
    }
};