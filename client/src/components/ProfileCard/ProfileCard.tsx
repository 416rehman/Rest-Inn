import "./ProfileCard.scss";

import React from 'react';
import {Avatar, Button, Stack, Typography} from "@mui/material";
import { Link } from "react-router-dom";
import {randomHexColor} from "../../services/helper.service";

interface IUser {
    username: string;
    name: string;
    avatar?: string;
}

function ProfileCard({username, name, avatar}:IUser) {
    return (
        <Link to={`/profile/${username}`}>
            <Button sx={{
                padding: "0.25rem",
                maxWidth: "200px",
            }}>
                <Stack direction={'row'} spacing={1} alignItems={'center'} sx={{
                    width: "100%",
                }} >
                    <Avatar
                        alt={name}
                        src={avatar || 'https://picsum.photos/200/300'}
                        sx={{ width: 40, height: 40, backgroundColor: randomHexColor() }}
                        variant={'rounded'}
                    />
                    <Stack spacing={2} alignItems={'flex-start'} sx={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}>
                        <Typography variant={'caption'} textTransform={'none'} margin={'0 !important'}>@{username}</Typography>
                        <Typography variant={'subtitle2'} textTransform={'none'} margin={'0 !important'} sx={{
                            lineHeight: '1.2rem',
                        }}>{name || username}</Typography>
                    </Stack>
                </Stack>
            </Button>
        </Link>
    );
}

export default ProfileCard;