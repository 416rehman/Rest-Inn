import React from 'react';
import {useSelector} from "react-redux";
import {Navigate, useLocation} from 'react-router-dom';
import {RoleEnum, RootState} from "../../@typings/auth";
import InvalidPage from "../InvalidPage/InvalidPage";
import {Alert} from "@mui/material";

interface IProps {
    visitorOnly?: boolean;
    requiredRole?: RoleEnum;
    children: React.ReactNode;
}

/**
 * SecuredRoute is a component that checks if the user is authenticated and has the required role.
 * If the user is not authenticated, it redirects to the login page.
 *
 * @param requiredRole {RoleEnum} The optional required role of the user.
 * @param visitorOnly {boolean} If true, the user must not be authenticated.
 * @param children {React.ReactNode} The route to be rendered if security check passes.
 */
function SecuredRoute({requiredRole, visitorOnly, children}: IProps) {
    const auth = useSelector((state: RootState) => state);
    const location = useLocation();

    if (visitorOnly) {
        if (auth.isAuthenticated)
            return <Navigate to={'/'}/>;
    } else {
        if (!auth.isAuthenticated && location.pathname !== '/logout')
            return <Navigate to="/login" state={{from: location}}/>;
        else {
            if (requiredRole && auth.user && auth.user.role !== requiredRole) {
                return <InvalidPage title={'Missing Permissions'}>
                    <Alert severity="error">
                        You do not have the required permissions to access this page.
                    </Alert>
                </InvalidPage>;
            }
        }
    }

    return <>{children}</>;
}

export default SecuredRoute;