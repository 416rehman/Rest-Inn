import React from 'react';
import {Link} from "react-router-dom";
import {Button} from "@mui/material";
import { HomeOutlined} from "@mui/icons-material";
import { useNavigate  } from 'react-router-dom';
import PortraitCard from "../../components/PortraitCard/PortraitCard";

function InvalidPage()
{
    let history = useNavigate();

    return (
        <div className={'page-content'}>
            <h1>Uh oh! We couldn't find the page you are looking for 😣 </h1>
            <p>The link may be broken, or the page may have been removed. Check to see if the link you're trying to open is correct.</p>
            <Link to={'/'}><Button variant="contained" disableElevation startIcon={<HomeOutlined/>}>Go to Home</Button></Link> <Button onClick={()=>{history(-1)}}>Go Back</Button>
            <PortraitCard name={'Apartment'} image={'https://images.unsplash.com/photo-1460317442991-0ec209397118?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'} url={'/listings?type=apartment'}/>
        </div>
    );
}

export default InvalidPage;