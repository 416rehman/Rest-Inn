import React from 'react';
import {Button, Stack, Typography} from "@mui/material";
import {Add, Remove} from "@mui/icons-material";
import {styled} from "@mui/material/styles";

interface IProps {
    title: string;
    helperText: string;
    value: number;
    min?: number;
    max?: number;
    onIncrement?: () => void;
    onDecrement?: () => void;
}

const CircleButton = styled(Button)({
    height: '100%',
    borderRadius: '50%',
    minWidth: 'unset',
    borderColor: 'transparent',
    color: 'black',
    '&:hover': {
        borderColor: 'black',
    },
    '&:disabled': {
        borderColor: 'transparent',
    },
});


function Counter(props: IProps) {
    const [value, setValue] = React.useState(props.value);

    const handleIncrement = () => {
        if (props.max !== undefined && value >= props.max) {
            return;
        }
        setValue(value + 1);
        if (props.onIncrement) {
            props.onIncrement();
        }
    };

    const handleDecrement = () => {
        if (props.min !== undefined && value <= props.min) {
            return;
        }
        setValue(value - 1);
        if (props.onDecrement) {
            props.onDecrement();
        }
    };

    return (
        <Stack direction={'row'}>
            <Stack flexBasis={'65%'}>
                <Typography variant="body2" fontWeight={500}>{props.title}</Typography>
                <Typography variant="body2" color={'darkgrey'}>{props.helperText}</Typography>
            </Stack>
            <Stack direction={'row'} alignItems={'center'} flexBasis={'35%'} flex={1} width={'100%'}>
                <CircleButton size={'small'} variant={'outlined'} onClick={handleDecrement} disabled={props.min !== undefined && value <= props.min}> <Remove/> </CircleButton>
                <Typography variant="body1" fontWeight={500} sx={{
                    margin: '0px 10px',
                    textAlign: 'center',
                    width: '100%'
                }}>{value}</Typography>
                <CircleButton size={'small'} variant={'outlined'} onClick={handleIncrement} disabled={props.max !== undefined && value >= props.max}> <Add/> </CircleButton>
            </Stack>
        </Stack>
    );
}

export default Counter;