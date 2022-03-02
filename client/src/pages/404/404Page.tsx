import React from 'react';
import {Link} from "react-router-dom";
import {Button} from "@mui/material";
import { HomeOutlined} from "@mui/icons-material";
import { useNavigate  } from 'react-router-dom';

function InvalidPage()
{
    let history = useNavigate();

    return (
        <div className={'page-content'}>
            <h1>Uh oh! We couldn't find the page you are looking for 😣 </h1>
            <p>The link may be broken, or the page may have been removed. Check to see if the link you're trying to open is correct.</p>
            <Link to={'/'}><Button variant="contained" disableElevation startIcon={<HomeOutlined/>}>Go to Home</Button></Link> <Button onClick={()=>{history(-1)}}>Go Back</Button>
        </div>
    );
}

export default InvalidPage;