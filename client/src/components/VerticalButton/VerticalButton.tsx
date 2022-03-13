import React from 'react';
import {Card, CardActionArea, Stack, Typography} from "@mui/material";
import "./VerticalButton.scss";
interface IProps {
    icon: any;
    label: string;
    outlined?: boolean;
    onClick?: () => void;
    [x: string]: any;
    typographyProps?: any;
    elevation?: number;
}

function VerticalButton({icon, label, outlined, onClick, typographyProps, elevation, ...rest}: IProps) {
    return (
        <Card className={'vertical-button'} variant={(outlined && 'outlined') || 'elevation'} elevation={elevation || 0} {...rest} sx={{
            minWidth: 50,
            maxWidth: 50,
            textAlign: 'center',
            height: 75,
            margin: 0,
            ...rest.sx
        }} >
            <CardActionArea onClick={onClick} sx={{
                height: '100%',
            }}>
                <Stack alignItems={'center'}>
                    {icon}
                    <Typography variant="caption" fontWeight={'medium'} {...typographyProps}>
                        {label}
                    </Typography>
                </Stack>
            </CardActionArea>
        </Card>
    );
}

export default VerticalButton;