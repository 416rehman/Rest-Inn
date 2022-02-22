import React, {ReactElement} from 'react';
import { Button} from "@mui/material";
import {Link} from "react-router-dom";
interface IProps {
    children?: ReactElement | ReactElement[];
    title?: string;
    buttonText?: string;
    buttonLink?: string;
}
function InvalidPage({title, children, buttonLink, buttonText}: IProps) {
    return (
        <div>
            <h1>{title || `No Listings Found`}</h1>
            {children || <p> There are no listings available for your search. </p>}
            <Link to={buttonLink || '/listings'}>
                <Button>
                    {buttonText || `View All Listings`}
                </Button>
            </Link>
            {children}
        </div>
    );
}

export default InvalidPage;