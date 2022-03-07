import React, {ReactElement} from 'react';
import {Button, Stack} from "@mui/material";
import {Link} from "react-router-dom";
interface IProps {
    children?: ReactElement | ReactElement[];
    title?: string;
    buttonText?: string;
    buttonLink?: string;
    [x: string]: any;
}
function InvalidPage({title, children, buttonLink, buttonText, ...rest}: IProps) {
    return (
        <Stack {...rest} alignItems={'center'}>
            <Stack spacing={'1rem'}>
                <h1>{title || `No Listings Found`}</h1>
                {children || <p> There are no listings available for your search. </p>}
                <Link to={buttonLink || '/'}>
                    <Button>
                        {buttonText || `Return to Home`}
                    </Button>
                </Link>
            </Stack>
        </Stack>
    );
}

export default InvalidPage;