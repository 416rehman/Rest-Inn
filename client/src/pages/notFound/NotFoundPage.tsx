import React from 'react';
import {Link} from "react-router-dom";
import {Button, Stack, Typography} from "@mui/material";
import { HomeOutlined} from "@mui/icons-material";
import { useNavigate  } from 'react-router-dom';

function NotFoundPage()
{
    let history = useNavigate();

    return (
        <Stack className={'page-content'} alignItems={'center'}>
            <Stack spacing={'1rem'}>
                <Typography variant={'h4'} fontWeight={600}>Uh oh! We couldn't find the page you were looking for... 😣</Typography>
                <Typography variant={'body1'}>
                    The link may be broken, or the page may have been removed. Check to see if the link you're trying to open is correct.</Typography>
                <Stack direction={'row'} spacing={'1rem'}>
                    <Link to={'/'}><Button variant="contained" disableElevation startIcon={<HomeOutlined/>}>Go to Home</Button></Link>
                    <Button onClick={()=>{history(-1)}}>Go Back</Button>
                </Stack>
            </Stack>
        </Stack>
    );
}

export default NotFoundPage;