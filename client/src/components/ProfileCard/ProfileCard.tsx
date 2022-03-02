import "./ProfileCard.scss";

import React from 'react';
import {Avatar, Button, Stack, Typography} from "@mui/material";
import { Link } from "react-router-dom";

function ProfileCard({user}:any) {
    return (
        <Link to={`/profile/${user.username}`}>
            <Button sx={{
                padding: "0.25rem",
                maxWidth: "200px",
            }}>
                <Stack direction={'row'} spacing={2} alignItems={'center'} sx={{
                    width: "100%",
                }} >
                    <Avatar
                        alt={user.name}
                        src={user.avatar}
                        sx={{ width: 40, height: 40, backgroundColor: randomHexColor() }}
                        variant={'rounded'}
                    />
                    <Stack spacing={2} alignItems={'flex-start'} sx={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}>
                        <Typography variant={'caption'} textTransform={'none'} margin={'0 !important'}>@{user.username}</Typography>
                        <Typography variant={'subtitle2'} textTransform={'none'} margin={'0 !important'} sx={{
                            lineHeight: '1.2rem',
                        }}>{user.name.split(' ')[0] || user.name || user.username}</Typography>
                    </Stack>
                </Stack>
            </Button>
        </Link>
    );
}

export default ProfileCard;