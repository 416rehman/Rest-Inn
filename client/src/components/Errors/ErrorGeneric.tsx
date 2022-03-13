import React, {ReactElement} from 'react';
import {Alert, AlertTitle, Button, Divider, Stack} from "@mui/material";
import {apiURL} from "../../services/helper.service";
import {LaunchOutlined} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
interface IProps {
    children?: ReactElement | ReactElement[];
    message ?: string;
    title?: string;
    buttonText?: string;
    buttonHandler?: () => void;
    severity?: 'error' | 'info' | 'success' | 'warning';
    [x: string]: any;
}
function ErrorGeneric({title, message, children, buttonHandler, buttonText, severity, ...rest}: IProps) {
    const navigate = useNavigate();
    return (
        <Stack {...rest} alignItems={'center'}>
            <Stack spacing={'1rem'}>
                <Alert severity={severity || "info"}>
                    <AlertTitle>
                        {title || `An Error Occured`}
                    </AlertTitle>
                    {message || <>Please try again later, you may have been redirected here by a broken link.<br/><br/>
                        Below are some links to help you get back on track.</>}
                    {children}
                    <Divider variant={'middle'} sx={{
                        margin: '1rem 0'
                    }}/>
                    <Stack direction={'row'} gap={'1rem'}>
                        <Button variant={'outlined'}  color={'inherit'} onClick={()=>{
                            if (buttonHandler) buttonHandler();
                            else navigate('/')
                        }}>
                            {buttonText || `Return to Home`}
                        </Button>
                        <a href={apiURL('')}>
                            <Button endIcon={<LaunchOutlined/>} color={'inherit'}>
                                {`Check API Status`}
                            </Button>
                        </a>
                    </Stack>
                </Alert>

            </Stack>
        </Stack>
    );
}

export default ErrorGeneric;