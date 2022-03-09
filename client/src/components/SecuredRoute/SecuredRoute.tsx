import React from 'react';
import { Navigate, useLocation} from 'react-router-dom';
import { RoleEnum} from "../../@typings/auth";
import ErrorGeneric from "../Errors/ErrorGeneric";
import {useSelector} from "react-redux";

interface IProps {
    visitorOnly?: boolean | undefined;
    requiredRoles?: RoleEnum[];
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
function SecuredElement({requiredRoles, visitorOnly, children}: IProps) {
    const {auth} = useSelector((state: any) => state);
    const location = useLocation();

    if (visitorOnly) {
        if (auth.isAuthenticated) {
            return <Navigate to={'/'}/>;
        }
    } else {
        if (!auth.isAuthenticated && location.pathname !== '/logout')
            return <Navigate to="/login"/>;
        else {
            if (requiredRoles && auth.user) {
                const authorized = requiredRoles.some(role => auth.user?.role === role)
                if (!authorized) {
                    return <ErrorGeneric
                        title={'Missing Permissions'} severity={'error'}
                        message={'You do not have the required permissions to access this page.'}
                    />
                }
            }
        }
    }

    return <>{children}</>;
}

export default SecuredElement;