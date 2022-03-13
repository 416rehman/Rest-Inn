import React, {useState} from 'react';
import {
    Button,
    Card,
    Divider,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {login} from "../../services/user.service";
import {LoadingButton} from "@mui/lab";
import PasswordInput from "../../components/PasswordInput/PasswordInput";

function LoginPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [formError, setFormError] = useState('');
    const navigate = useNavigate();
    const location: any = useLocation();
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        event.preventDefault();

        login(formData.email, formData.password).then(() => {
            navigate(location.state?.redirect || '/', {state: {redirect: location.state}});
        }).catch((error) => {
            setFormError(error || 'Login or password is invalid');
        }).finally(() => {
            setLoading(false);
        });
    };

    return <Card className={'page-content'} variant={'outlined'} sx={{
        marginTop: '2rem',
        padding: '1rem',
        height: '100%',
        maxWidth: '95%',
        width: '700px',
    }}>
        <form onSubmit={handleSubmit}>
            <Stack spacing={'1rem'} sx={{userSelect: 'none',}}>
                <Typography textAlign={'center'} variant={'h6'}> Welcome to CRIB </Typography>
                <Stack spacing={'1rem'} sx={{
                    filter: 'opacity(0.5)',
                }}>
                    <img src={'/illustrations/Paris.svg'} alt={'Paris'} loading={"eager"}/>
                </Stack>
                <Stack spacing={2}>
                    <TextField
                        type={'text'}
                        placeholder={'Email'}
                        variant={'outlined'}
                        label={'Email'}
                        autoComplete={'email'}
                        error={!!formError}
                        value={formData.email}
                        onChange={(event) => setFormData({...formData, email: event.target.value})}
                    />
                    <PasswordInput
                        placeholder={'Password'}
                        label={'Password'}
                        autoComplete={'current-password'}
                        error={!!formError}
                        helperText={formError}
                        onChange={(event) => {
                            setFormData({...formData, password: event.target.value})
                        }}/>

                    <LoadingButton type={'submit'} fullWidth variant={'contained'} disableElevation loading={loading}
                                   size={'large'}>Login</LoadingButton>

                    <Divider variant={'middle'}/>

                    <Stack direction={'row'} alignItems={'baseline'} spacing={'1rem'} justifyContent={'space-between'}
                           flexWrap={'wrap'}>
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
}


export default LoginPage;