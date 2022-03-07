import Notification from "../../components/NotificationSnackBar/Notification";
import InvalidPage from "../../components/InvalidPage/InvalidPage";
import React, {useEffect} from "react";
import {Alert, AlertTitle} from "@mui/material";
import {useSelector} from "react-redux";
import {RootState} from "../../@typings/auth";
import {logout} from "../../helpers/userAPI.helper";

function LogoutPage() {
    const {isAuthenticated} = useSelector((state: RootState) => state);

    useEffect(()=>{
        if (localStorage.getItem('refreshToken') !== null || !isAuthenticated) {
            logout();
        }
    }, [])
    return (
        <InvalidPage
            title={"Logged Out"}
            buttonText={"Return to Home"}
            buttonLink={"/"}
        >
            <Alert severity="success">
                <AlertTitle>{isAuthenticated ? "Logging Out..." : "Logged Out"}</AlertTitle>
                {isAuthenticated ? "Please wait while we log you out." : "You have been logged out. You can now return to the home page."}<br/>

            </Alert>
            <Notification message={'Logged Out'}/>
        </InvalidPage>
    );
}

export default LogoutPage;