import Notification from "../../components/NotificationSnackBar/Notification";
import ErrorGeneric from "../../components/Errors/ErrorGeneric";
import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {tryLogout} from "../../services/user.service";

function LogoutPage() {
    const {accessToken} = useSelector((state: any) => state.auth);

    useEffect(()=>{
        tryLogout()
    }, [accessToken])
    return (
        <ErrorGeneric
            title={accessToken ? "Logging Out..." : "Logged Out"}
            message={accessToken ? "Please wait while we log you out." : "You have been logged out. You can now return to the home page."}
            buttonText={"Return to Home"}
            buttonLink={"/"}
            severity={accessToken ? "info" : "success"}
        >
            <Notification message={'Logged Out'}/>
        </ErrorGeneric>
    );
}

export default LogoutPage;