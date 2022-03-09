import {Alert, AlertTitle, Button, Divider, Stack} from '@mui/material';
import React from 'react';
import {LaunchOutlined} from "@mui/icons-material";

interface IProps {
    errorCode?: string;
}

function ErrorApi({errorCode}: IProps) {
    return (
    <Alert severity="error" sx={{
        marginInlineStart: 'auto',
        marginInlineEnd: 'auto',
        width: 'fit-content',
        marginBlockStart: '2%',
    }}>
        <AlertTitle>Error {errorCode}</AlertTitle>
        There was an error while establishing a connection with the server — <strong>Please Try
        Again</strong><br/><br/>
        <Divider variant={'middle'} sx={{
            margin: '1rem 0'
        }}/>
        <Stack direction={'row'} gap={'1rem'}>
            <Button variant="outlined" color={"error"} disableElevation onClick={() => window.location.reload()}
                    endIcon={<LaunchOutlined/>}>
                Check API Status
            </Button>
            <Button color={"error"} disableElevation onClick={() => window.location.reload()}>
                Reload
            </Button>
        </Stack>
    </Alert>
    );
}

export default ErrorApi;