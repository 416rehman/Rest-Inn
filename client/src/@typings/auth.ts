import {CompleteUser} from "./users";

enum AuthActionEnum {
    SET_USER = "SET_USER",
    CLEAR_ALL = "CLEAR_ALL",
    SET_ACCESS_TOKEN = "SET_ACCESS_TOKEN",
}

enum RoleEnum {
    ADMIN = "admin",
    USER = "user",
}

interface LoginAction {
    type: AuthActionEnum.SET_USER;
    payload: {
        user: CompleteUser;
    };
}

interface RenewTokenAction {
    type: AuthActionEnum.SET_ACCESS_TOKEN;
    payload: {
        accessToken: string;
    };
}

interface LogoutAction {
    type: AuthActionEnum.CLEAR_ALL;
    payload: {}
}

interface AuthState {
    user: CompleteUser | null;
    accessToken: string | null;
}

type AuthAction = LoginAction | RenewTokenAction | LogoutAction;

export {AuthActionEnum, RoleEnum}
export type { AuthState, AuthAction };
