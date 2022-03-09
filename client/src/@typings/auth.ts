import {CompleteUser} from "./users";

enum AuthActionEnum {
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT",
    RENEW_ACCESS_TOKEN = "RENEW_ACCESS_TOKEN",
}

enum RoleEnum {
    ADMIN = "admin",
    USER = "user",
}

interface LoginAction {
    type: AuthActionEnum.LOGIN;
    payload: {
        user: CompleteUser;
    };
}

interface RenewTokenAction {
    type: AuthActionEnum.RENEW_ACCESS_TOKEN;
    payload: {
        accessToken: string;
        user: CompleteUser;
    };
}

interface LogoutAction {
    type: AuthActionEnum.LOGOUT;
    payload: {}
}

interface AuthState {
    user: CompleteUser | null;
    accessToken: string | null;
    isAuthenticated: boolean;
}

type AuthAction = LoginAction | RenewTokenAction | LogoutAction;

export {AuthActionEnum, RoleEnum}
export type { AuthState, AuthAction };
