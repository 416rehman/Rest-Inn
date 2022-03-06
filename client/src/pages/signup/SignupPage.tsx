import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Card, Divider, Stack, TextField} from "@mui/material";
import {APIValidate, fieldType} from "../../helpers/apiValidators";
import {Link} from "react-router-dom";

enum formField {
    firstName = 'firstName',
    lastName = 'lastName',
    email = 'email',
    password = 'password',
    username = 'username',
}

interface FormFields {
    [formField: string]: string;
}

export default function SignupPage() {
    const [errors, setErrors] = React.useState<FormFields>({});

    // TODO
    //const [formData, setFormData] = React.useState<FormFields>({});

    const apiValidate = (field: fieldType, value: string, errorKey: formField, required: boolean = false) => {
        APIValidate(field, value, required).then(validation_msg => {
            if (validation_msg) setErrors({...errors, [errorKey]: validation_msg});
            else setErrors({...errors, [errorKey]: ''});
        })
    }

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
                    <Typography variant="h6">WELCOME TO CRIB</Typography>
                    <Stack>
                        <img src="/illustrations/New York.svg" alt="New York illustration"/>
                    </Stack>

                    <Stack spacing={'1rem'}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            helperText={errors && errors?.email || ''}
                            error={!!errors?.email}
                            onBlur={(e) => {
                                apiValidate('email', e.target.value, formField.email, true)
                            }}
                        />

                        <Stack direction={'row'} justifyContent={'space-between'} spacing={'1rem'}>
                            <TextField
                                label="First Name"
                                variant="outlined"
                                sx={{
                                    flex: 1,
                                }}
                                helperText={errors && errors?.firstName || ''}
                                error={!!errors?.firstName}
                                onBlur={(e) => {
                                    apiValidate('firstName', e.target.value, formField.firstName, true)
                                }}
                            />
                            <TextField
                                label="Last Name"
                                variant="outlined"
                                sx={{
                                    flex: 1,
                                }}
                                helperText={errors && errors?.lastName || ''}
                                error={errors?.lastName?.length > 0}
                                onBlur={(e) => {
                                    apiValidate('lastName', e.target.value, formField.lastName, true)
                                }}
                            />
                        </Stack>
                        <TextField
                            label="Username"
                            variant="outlined"
                            fullWidth
                            helperText={errors && errors?.username || ''}
                            error={!!errors?.username}
                            onBlur={(e) => {
                                apiValidate('username', e.target.value, formField.username, true)
                            }}
                        />
                        <TextField
                            label="Password"
                            variant="outlined"
                            fullWidth
                            helperText={errors && errors?.password || ''}
                            error={!!errors?.password}
                            onBlur={(e) => {
                                apiValidate('password', e.target.value, formField.password, true)
                            }}
                        />

                        <Button variant="contained" disableElevation color="primary" size={'large'}>
                            Sign Up
                        </Button>
                        <Divider/>
                        <Typography variant="body2">
                            Already have an account? <Link to={'/login'}><Button>Log in</Button></Link>
                        </Typography>
                    </Stack>
                </Stack>
            </form>
        </Card>
    );
}