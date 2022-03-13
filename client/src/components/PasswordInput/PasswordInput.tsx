import {BaseTextFieldProps, IconButton, InputAdornment, TextField} from "@mui/material";
import React, {useState} from "react";
import {Visibility, VisibilityOff} from "@mui/icons-material";

interface IProps extends BaseTextFieldProps {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    [key: string]: any;
}
function PasswordInput({onChange, ...rest}: IProps) {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    return <TextField
        {...rest}
        onChange={onChange}
        type={showPassword ? 'text' : 'password'}
        InputProps={{
            endAdornment: (
                <InputAdornment position="end">
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                    >
                        {showPassword ? <Visibility/> : <VisibilityOff/>}
                    </IconButton>
                </InputAdornment>
            )
        }}
    />;
}

export default PasswordInput;