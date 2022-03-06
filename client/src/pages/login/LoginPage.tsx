import React, {useState} from 'react';
import {Button, Card, Divider, IconButton, InputAdornment, Stack, TextField, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {Visibility, VisibilityOff} from "@mui/icons-material";

function LoginPage() {

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    return (
        <Card className={'page-content'} variant={'outlined'} sx={{
            marginTop: '2rem',
            padding: '1rem',
            height: '100%',
            maxWidth: '95%',
            width: '700px',
        }}>
            <form>
                <Stack spacing={'1rem'} sx={{userSelect: 'none',}}>
                    <Typography textAlign={'center'} variant={'h6'}> Welcome to CRIB </Typography>
                    <Stack spacing={'1rem'} sx={{
                        filter: 'opacity(0.5)',
                    }}>
                        <img src={'/illustrations/Paris.svg'} alt={'Paris'}/>
                    </Stack>
                    <Stack spacing={2}>
                        <TextField type={'text'} placeholder={'Username'} variant={'outlined'} label={'Username'}/>
                        <TextField placeholder={'Password'} label={'Password'}
                                   type={showPassword ? "text" : "password"} // <-- This is where the magic happens
                            // onChange={someChangeHandler}
                                   InputProps={{ // <-- This is where the toggle button is added.
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
                                   }}/>

                        <Button type={'submit'} fullWidth variant={'contained'} disableElevation
                                size={'large'}>Login</Button>

                        <Divider variant={'middle'}/>

                        <Stack direction={'row'} alignItems={'baseline'} spacing={'1rem'} justifyContent={'space-between'} flexWrap={'wrap'}>
                            <Link to={'/forgot-password'}><Button>Forgot Password?</Button></Link>
                            <Stack direction={'row'} alignItems={'baseline'} spacing={'1rem'}>
                                <Typography variant={'body2'} color={'dimgray'}> Not Registered Yet?</Typography>
                                <Link to={'/signup'}><Button>Sign Up</Button></Link>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
            </form>
        </Card>
    );
}

export default LoginPage;