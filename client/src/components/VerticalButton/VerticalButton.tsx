import React from 'react';
import {Card, CardActionArea, Typography} from "@mui/material";
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

function VerticalButton({icon, label, outlined, onClick, typographyProps, variant, elevation, ...rest}: IProps) {
    return (
        <Card className={'vertical-button'} variant={(outlined && 'outlined') || 'elevation'} elevation={elevation || 0} {...rest} sx={{
            maxWidth: 50,
            textAlign: 'center',
            height: 75,
            margin: 0,
        }} >
            <CardActionArea sx={{
                height: '100%',
            }}>
                {icon}
                <Typography variant="caption" fontWeight={'medium'} {...typographyProps}>
                    {label}
                </Typography>
            </CardActionArea>
        </Card>
    );
}

export default VerticalButton;