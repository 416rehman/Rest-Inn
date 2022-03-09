import Notification from "../../components/NotificationSnackBar/Notification";
import ErrorGeneric from "../../components/Errors/ErrorGeneric";
import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {logout} from "../../services/user.service";

function LogoutPage() {
    const {isAuthenticated} = useSelector((state: any) => state.auth);

    useEffect(()=>{
        if (localStorage.getItem('refreshToken') !== null || !isAuthenticated) {
            logout();
        }
    }, [isAuthenticated])
    return (
        <ErrorGeneric
            title={isAuthenticated ? "Logging Out..." : "Logged Out"}
            message={isAuthenticated ? "Please wait while we log you out." : "You have been logged out. You can now return to the home page."}
            buttonText={"Return to Home"}
            buttonLink={"/"}
            severity={isAuthenticated ? "info" : "success"}
        >
            <Notification message={'Logged Out'}/>
        </ErrorGeneric>
    );
}

export default LogoutPage;