import React from 'react';
import {Button, IconButton, Stack, Tooltip} from "@mui/material";
import {
    HomeOutlined, HttpRounded,
    Instagram, LaunchRounded,
    Twitter,
    YouTube
} from "@mui/icons-material";
import "./Footer.scss"
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {apiURL} from "../../services/helper.service";

function Footer() {
    const auth= useSelector((state: any) => state.auth);

    return (
        <Stack className={'footer'} direction={'row'} justifyContent={'space-between'} mt={'2rem'} sx={{
            padding: '1rem',
            backgroundColor: '#F7F7F7',
            borderTop: '1px solid #e5e5e5',
            '@media screen and (max-width: 600px)': {
                flexDirection: 'column',
            }
        }}>
            <Stack className={'listings-footer'} direction={'row'}>
                <div className={'footer-links'}>
                    <Link to={'/'}><Button startIcon={<HomeOutlined/>}>Home</Button></Link>
                    <Link to={'/listings'}><Button>Listings</Button></Link>
                    {!auth?.accessToken && <>
                        <Link to={'/auth/login'}><Button>Log In</Button></Link>
                        <Link to={'/auth/signup'}><Button>Sign Up</Button></Link>
                        <Link to={'/auth/forgot'}><Button>Forgot Password</Button></Link>
                    </>}
                    <a href={apiURL('')}><Button endIcon={<LaunchRounded/>}>Developers / API</Button></a>
                </div>
            </Stack>
            <Stack className={'social-footer'} direction={'row'} justifyContent={'end'} alignItems={'center'}>
                <Tooltip title={'API'}>
                    <a href={apiURL('')}>
                        <IconButton aria-label={'api'}>
                            <HttpRounded/>
                        </IconButton>
                    </a>
                </Tooltip>
                <Tooltip title={'Instagram'}>
                    <a href={'https://www.instagram.com/'}>
                        <IconButton aria-label={'instagram'}>
                            <Instagram/>
                        </IconButton>
                    </a>
                </Tooltip>
                <Tooltip title={'Twitter'}>
                    <a href={'https://www.twitter.com/'}>
                        <IconButton aria-label={'twitter'}>
                            <Twitter/>
                        </IconButton>
                    </a>
                </Tooltip>
                <Tooltip title={'Youtube'}>
                    <a href={'https://www.youtube.com/'}>
                        <IconButton aria-label={'youtube'}>
                            <YouTube/>
                        </IconButton>
                    </a>
                </Tooltip>
            </Stack>
        </Stack>
    );
}

export default Footer;