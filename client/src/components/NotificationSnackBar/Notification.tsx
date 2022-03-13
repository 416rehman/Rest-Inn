import React from 'react';
import {IconButton, Snackbar} from "@mui/material";
import {Close} from "@mui/icons-material";
interface IProps {
    message: string;
}
function Notification({message}: IProps) {
    const [open, setOpen] = React.useState(true);

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <Close fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message={message}
            action={action}
        />
    );
}

export default Notification;
