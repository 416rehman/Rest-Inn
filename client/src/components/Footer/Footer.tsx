import React from 'react';
import {Button, IconButton} from "@mui/material";
import {
    FacebookOutlined,
    HomeOutlined,
    Instagram,
    Twitter,
    YouTube
} from "@mui/icons-material";
import "./Footer.scss"
import {Link} from "react-router-dom";

function Footer() {
    return (
        <div className={'footer'}>
            <div className={'listings-footer'}>
                <div className={'footer-links'}>
                    <Link to={'/'}><Button startIcon={<HomeOutlined/>}>Home</Button></Link>
                    <Link to={'/listings'}><Button>All Listings</Button></Link>
                    <Link to={'/auth/login'}><Button >Log In</Button></Link>
                    <Link to={'/auth/signup'}><Button>Sign Up</Button></Link>
                    <Link to={'/auth/forgot'}><Button>Forgot Password</Button></Link>
                </div>
            </div>
            <div className={'social-footer'}>
                    <p>
                        <span>
                            <a href={'https://www.facebook.com/'}>
                                <IconButton aria-label={'facebook'}>
                                    <FacebookOutlined/>
                                </IconButton>
                            </a>
                        </span>
                        <span>
                            <a href={'https://www.instagram.com/'}>
                                <IconButton aria-label={'instagram'}>
                                    <Instagram/>
                                </IconButton>
                            </a>
                        </span>
                        <span>
                            <a href={'https://www.twitter.com/'}>
                                <IconButton aria-label={'twitter'}>
                                    <Twitter/>
                                </IconButton>
                            </a>
                        </span>
                        <span>
                            <a href={'https://www.youtube.com/'}>
                                <IconButton aria-label={'youtube'}>
                                    <YouTube/>
                                </IconButton>
                            </a>
                        </span>
                    </p>
            </div>
        </div>
    );
}

export default Footer;