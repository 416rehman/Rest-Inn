import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import React from "react";

interface IAlertProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    title?: string;
    message?: string;
    onConfirm?: () => void;
    confirmText?: string;
    variant?: "error" | "warning" | "info" | "success";
}

function Alert({open, setOpen, title, message, onConfirm, confirmText, variant}: IAlertProps) {
    const colors = () => {
        switch (variant) {
            case "error":
                return "#f44336";
            case "warning":
                return "#ff9800";
            case "info":
                return "#2196f3";
            case "success":
                return "#4caf50";
            default:
                return "inherit";
        }
    }
    return <Dialog
        open={open}
        onClose={()=>setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        {title &&
            <DialogTitle id="alert-dialog-title" color={colors()}>
                {title}
            </DialogTitle>}
        {message && <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {message}
            </DialogContentText>
        </DialogContent>}
        <DialogActions>
            <Button onClick={()=>setOpen(false)} color={'inherit'}>Close</Button>
            {confirmText && <Button onClick={onConfirm} autoFocus color={variant || "inherit"}>
            {confirmText}
            </Button>}
        </DialogActions>
    </Dialog>
}

export default Alert;