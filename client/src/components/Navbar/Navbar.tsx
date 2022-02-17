/*** I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been copied
 * manually or electronically from any other source (including web sites)
 * or distributed to other students. *
 *
 *      Name: Hayaturehman Ahmadzai
 *      Student ID: hahmadzai3
 *      Creation Date: 2022-02-11
 */

import React from 'react';
import "./navbar.scss";

import {Link} from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import {
    Avatar,
    Divider,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
    Tooltip,
    useMediaQuery,
    useTheme
} from "@mui/material";
import {Logout, Settings} from "@mui/icons-material";
import {styled} from "@mui/material/styles";

const MenuItemStyled = styled(MenuItem)({
    padding: 0,
    width: '100%',
    height: '100%',
});
const ListItemIconStyled = styled(ListItemIcon)({
    alignItems: 'center',
    gap: '0.5rem',
});

function Navbar() {

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <nav style={{
            backgroundColor: theme.palette.background.paper,
            borderBottom: `1px solid ${theme.palette.divider}`,
        }}>
            <div id={"logo"}>
                <Link to={"/"}>
                    <img src={isSmallScreen ? '/logo/icon.svg' : 'logo/logo.svg'} alt={"logo"}/>
                </Link>
            </div>

            <SearchBar style={{
                flexGrow: 1,
                flexShrink: 1,
                flexBasis: 'auto'
            }}/>

            <Tooltip title="Account settings">
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ml: 2}}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    style={{
                        padding: '20px'
                    }}
                >
                    <Avatar sx={{width: 32, height: 32}}>M</Avatar>
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            >
                <MenuItem>
                    <Avatar/> Profile
                </MenuItem>
                <Divider/>
                <MenuItemStyled>
                    <Link to={'listings'} style={{
                        flexGrow: 1,
                        padding: '0.5rem',
                        textDecoration: 'none'
                    }}>
                        <ListItemIconStyled>
                            <Settings fontSize="small"/>
                            Settings
                        </ListItemIconStyled>
                    </Link>
                </MenuItemStyled>
                <MenuItemStyled>
                    <Link to={'listings'} style={{
                        flexGrow: 1,
                        padding: '0.5rem',
                        textDecoration: 'none'
                    }}>
                        <ListItemIconStyled>
                            <Logout fontSize="small"/>
                            Logout
                        </ListItemIconStyled>
                    </Link>
                </MenuItemStyled>
            </Menu>
        </nav>
    );
}

export default Navbar;