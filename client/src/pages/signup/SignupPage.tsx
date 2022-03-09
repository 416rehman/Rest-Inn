import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Card, Divider, Stack, TextField} from "@mui/material";
import {APIValidate} from "../../services/validation.service";
import {Link} from "react-router-dom";
import {createUser} from "../../services/user.service";
import {NewUser, NewUserField} from "../../@typings/users";
import {LoadingButton} from "@mui/lab";

export default function SignupPage() {

    const [errors, setErrors] = React.useState<NewUser>({});
    const [formData, setFormData] = React.useState<NewUser>({});
    const [loading, setLoading] = React.useState(false);

    const validateAll = (): Promise<boolean> => {
        return new Promise(async resolve => {
            const form_errors:NewUser = {}

            form_errors[NewUserField.email] = await APIValidate('email', formData['email'], true);
            form_errors[NewUserField.password] = await APIValidate('password', formData['password'], true);
            form_errors[NewUserField.username] = await APIValidate('username', formData['username'], true);
            form_errors[NewUserField.firstName] = await APIValidate('firstName', formData['firstName'], true);
            form_errors[NewUserField.lastName] = await APIValidate('lastName', formData['lastName'], true);

            setErrors(form_errors);

            resolve(Object.values(form_errors).every(error => error === ''))
        })
    };
    const handleSubmit = async (event: any) => {
        setLoading(true);
        event.preventDefault();

        validateAll().then(valid => {
            if (valid) createUser(formData);
        }).finally(() => setTimeout(() => setLoading(false), 500));

    };

    const handleOnBlur = (field: NewUserField, value: string, required: boolean = false) => {
        APIValidate(field, value, required).then(validation_msg => {
            if (validation_msg) setErrors({...errors, [field]: validation_msg})
            else setErrors({...errors, [field]: ''})
        })
    }

    const handleOnChange = (event: any) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    };

    return (
        <Card className={'page-content'} variant={'outlined'} sx={{
            marginTop: '2rem',
            padding: '1rem',
            height: '100%',
            maxWidth: '95%',
            width: '700px',
        }}>
            <form onSubmit={handleSubmit}>
                <Stack spacing={'1rem'} sx={{userSelect: 'none',}}>
                    <Typography variant="h6">WELCOME TO CRIB</Typography>
                    <Stack>
                        <img src="/illustrations/New York.svg" alt="New York illustration"/>
                    </Stack>

                    <Stack spacing={'1rem'}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            autoComplete={'email'}
                            name={NewUserField.email}
                            fullWidth
                            helperText={(errors && errors?.email) || ''}
                            error={!!errors?.email}
                            onBlur={(e) => {
                                handleOnBlur(NewUserField.email, e.target.value,  true)
                            }}
                            onChange={handleOnChange}
                            value={formData?.email}
                        />

                        <Stack direction={'row'} justifyContent={'space-between'} spacing={'1rem'}>
                            <TextField
                                label="First Name"
                                variant="outlined"
                                autoComplete={'given-name'}
                                name={NewUserField.firstName}
                                sx={{flex: 1}}
                                helperText={(errors && errors?.firstName) || ''}
                                error={!!errors?.firstName}
                                onBlur={(e) => {
                                    handleOnBlur(NewUserField.firstName, e.target.value,  true)
                                }}
                                onChange={handleOnChange}
                                value={formData?.firstName}
                            />
                            <TextField
                                label="Last Name"
                                variant="outlined"
                                autoComplete={'family-name'}
                                name={NewUserField.lastName}
                                sx={{ flex: 1 }}
                                helperText={(errors && errors?.lastName) || ''}
                                error={errors?.lastName?.length > 0}
                                onBlur={(e) => {
                                    handleOnBlur(NewUserField.lastName, e.target.value,  true)
                                }}
                                onChange={handleOnChange}
                                value={formData?.lastName}
                            />
                        </Stack>
                        <TextField
                            label="Username"
                            variant="outlined"
                            autoComplete={'username'}
                            name={NewUserField.username}
                            fullWidth
                            helperText={(errors && errors?.username) || ''}
                            error={!!errors?.username}
                            onBlur={(e) => {
                                handleOnBlur(NewUserField.username, e.target.value,  true)
                            }}
                            onChange={handleOnChange}
                            value={formData?.username}
                        />
                        <TextField
                            label="Password"
                            variant="outlined"
                            autoComplete={'new-password'}
                            name={NewUserField.password}
                            fullWidth
                            helperText={(errors && errors?.password) || ''}
                            error={!!errors?.password}
                            onBlur={(e) => {
                                console.log('onblur')
                                handleOnBlur(NewUserField.password, e.target.value,  true)
                            }}
                            onChange={handleOnChange}
                            value={formData?.password}
                        />

                        <LoadingButton variant="contained" disableElevation color="primary" size={'large'} type={'submit'} loading={loading}>
                            Sign Up
                        </LoadingButton>
                        <Divider/>
                        <Typography variant="body2">
                            Already have an account? <Link to={'/login'}> <Button> Log in </Button> </Link>
                        </Typography>
                    </Stack>
                </Stack>
            </form>
        </Card>
    );
}