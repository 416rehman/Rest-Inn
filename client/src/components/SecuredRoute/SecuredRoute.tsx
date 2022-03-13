import React from 'react';
import { Navigate, useLocation} from 'react-router-dom';
import { RoleEnum} from "../../@typings/auth";
import ErrorGeneric from "../Errors/ErrorGeneric";
import {useSelector} from "react-redux";
import {validateTokenAndGetInfo} from "../../services/user.service";

interface IProps {
    visitorOnly?: boolean | undefined;
    requiredRoles?: RoleEnum[];
    navToOnFail?: string;
    notImplemented?: boolean;
    children: React.ReactNode;
}

/**
 * SecuredRoute is a component that checks if the user is authenticated and has the required role.
 * If the user is not authenticated, it redirects to the login page.
 *
 * @param requiredRole {RoleEnum} The optional required role of the user.
 * @param visitorOnly {boolean} If true, the user must not be authenticated.
 * @param navToOnFail {string} The path to redirect to if the user is not authenticated.
 * @param children {React.ReactNode} The route to be rendered if security check passes.
 */
function SecuredRoute({requiredRoles, visitorOnly, navToOnFail, children, notImplemented}: IProps) {
    const {auth} = useSelector((state: any) => state);
    const location = useLocation();
    if (notImplemented) {
        return <ErrorGeneric
            title={"We're sorry, this feature is not implemented yet."} severity={'error'}
            message={"We're working hard to implement this feature. Please check back later." }
        />
    }
    if (visitorOnly) {
        if (validateTokenAndGetInfo()) return <Navigate to={'/'}/>;
    }
    else {
        // Not logged in
        if (!validateTokenAndGetInfo())
            return <Navigate to={navToOnFail || "/login"} state={location.state}/>;
        // Logged in
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

export default SecuredRoute;