import {
    Button, Divider,
    Stack, TextField,
    Typography
} from "@mui/material";
import React from "react";
import {CloseRounded} from "@mui/icons-material";

export default function Step7({listingData, handleChange}: any) {
    const ContentElement = () => {

        return (
            <Stack gap={'2rem'}>
                <Stack>
                    <Typography variant={"body1"} fontWeight={'500'}>
                        Describe your place to guests
                    </Typography>
                    <Typography variant={"subtitle2"} color={'gray'}>
                        Write a quick summary of your place. You can hightlight what's special about your space, the
                        neighborhood, and how you'll interact with guests.
                    </Typography>
                </Stack>
                <TextField
                    placeholder="Describe the decor, light, what's nearby, etc...*"
                    multiline
                    inputProps={{ maxLength: 500, minLength: 50 }}
                    helperText={'Min length: 50 characters, Max length: 500 characters'}
                    defaultValue={listingData.description || null}
                    onBlur={(e) => {
                        handleChange('description', e.target.value)
                    }}/>


                <Divider variant={'middle'}/>


                <Stack>
                    <Typography variant={"body1"} fontWeight={'500'}>
                        Set house rules for your guests
                    </Typography>
                    <Typography variant={"subtitle2"} color={'gray'}>
                        Guests must agree to your house rules before booking.
                    </Typography>
                </Stack>

                <Stack gap={'1rem'}>
                    <TextField
                        name={'rules'}
                        placeholder={'Add a house rule'}
                        inputProps={{ maxLength: 50, minLength: 3 }}
                        helperText={'Min characters: 50, Max characters: 3'}
                        onKeyPress={(e: any) => {
                            if (e.key === 'Enter' && e.target?.value) {
                                if (e.target.value.length > 3 && e.target.value.length <= 50) {
                                    handleChange('rules', [...listingData.rules, e.target.value])
                                }
                            }
                        }}
                        onBlur={(e) => {
                            if (e.target.value) {
                                if (e.target.value.length > 3 && e.target.value.length <= 50) {
                                    console.log(e.target.value.length)
                                    handleChange('rules', [...listingData.rules, e.target.value])
                                }
                            }
                        }}
                    />
                    {listingData.rules && listingData.rules.map((rule: string, index: number) => {
                        return (
                            <Stack direction={'row'} key={index} alignItems={'center'}>
                                <TextField variant={'standard'}
                                           fullWidth
                                           inputProps={{ maxLength: 50, minLength: 3 }}
                                           defaultValue={rule}
                                           onBlur={(e) => {
                                               if (e.target.value.length > 3 && e.target.value.length <= 50) {
                                                   handleChange('rules', [...listingData.rules.slice(0, index), e.target.value, ...listingData.rules.slice(index + 1)])
                                               }
                                           }}
                                />
                                <Button variant={'outlined'} size={'small'} color={'error'}
                                        sx={{
                                            minWidth: '32px',
                                            width: '32px',
                                            height: '32px',
                                            borderRadius: '50%',
                                            color: 'gray',
                                            borderColor: 'transparent',
                                            '&:hover': {
                                                borderColor: 'gray',
                                            }
                                        }}
                                        onClick={() => {
                                            handleChange('rules', [...listingData.rules.slice(0, index), ...listingData.rules.slice(index + 1)])
                                        }}><CloseRounded fontSize={'small'}/></Button>
                            </Stack>
                        )
                    })}
                </Stack>
            </Stack>
        )
    }

    const canContinue = () => {
        return (listingData.description && listingData.description.length > 25);
    }

    return {
        label: "What's your place like?",
        content: <ContentElement/>,
        canContinue: canContinue
    }
}