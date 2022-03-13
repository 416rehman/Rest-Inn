import React, from 'react';
import {Button, Stack, TextField, Typography} from "@mui/material";
import {Add, Remove} from "@mui/icons-material";
import {styled} from "@mui/material/styles";

interface IProps {
    name?: string;
    title: string;
    helperText?: string;
    value: number;
    min?: number;
    max?: number;
    onIncrement?: () => void;
    onDecrement?: () => void;
    onChange?: (name: string | undefined, value: number) => void;
    width?: any;
    showOutline?: boolean;
    maxWidth?: any;
    step?: number;
}


function CounterInput(props: IProps ) {

    const CircleButton = styled(Button)({
        height: '100%',
        borderRadius: '50%',
        minWidth: 'unset',
        borderColor: props.showOutline ? 'rgba(0,0,0,0.21)' : 'transparent',
        color: 'black',
        '&:hover': {
            borderColor: 'black',
        },
        '&:disabled': {
            borderColor: 'transparent',
        },
    });

    const [value, setValue] = React.useState(props.value);

    const handleIncrement = () => {
        props.onChange && props.onChange(props.name, value + (props.step || 1));
        if (props.max !== undefined && value >= props.max) {
            return;
        }
        setValue(value + (props.step || 1));
        if (props.onIncrement) {
            props.onIncrement();
        }

    };

    const handleDecrement = () => {
        props.onChange && props.onChange(props.name, value - (props.step || 1));
        if (props.min !== undefined && value <= props.min) {
            return;
        }
        setValue(value - (props.step || 1));
        if (props.onDecrement) {
            props.onDecrement();
        }
    };

    return (
        <Stack direction={'row'} width={props.width} maxWidth={props.maxWidth} gap={'1rem'} justifyContent={'space-between'}>
            <Stack>
                <Typography variant="body2" fontWeight={500}>{props.title}</Typography>
                <Typography variant="body2" color={'darkgrey'}>{props.helperText}</Typography>
            </Stack>
            <Stack direction={'row'} alignItems={'center'} maxWidth={100}>
                <Stack width={33}>
                    <CircleButton size={'small'} variant={'outlined'} onClick={handleDecrement}
                                     disabled={props.min !== undefined && value <= props.min}> <Remove/> </CircleButton>
                </Stack>
                <TextField
                    name={props.name}
                    value={value ?? ''}
                    InputProps={{
                        readOnly: true,
                        sx: {
                            fontWeight: 500,
                            pointerEvents: 'none',
                            '&::before': {
                                borderBottom: '0',
                            },
                            '& input': {
                                textAlign: 'center',
                            },
                        }
                    }}

                    variant="standard"
                />
                <Stack width={33}>
                    <CircleButton size={'small'} variant={'outlined'} onClick={handleIncrement}
                                  disabled={props.max !== undefined && value >= props.max}> <Add/> </CircleButton>
                </Stack>
            </Stack>
        </Stack>
    );
}

export default CounterInput;