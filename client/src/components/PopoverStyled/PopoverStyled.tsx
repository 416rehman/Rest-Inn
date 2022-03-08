import * as React from 'react';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';

interface IProps {
    title: string;
    children: React.ReactNode;
    variant?: 'text' | 'outlined' | 'contained';
}
export default function PopoverStyled({ title, children, variant }: IProps) {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <Button aria-describedby={id} variant={variant || "outlined"} onClick={handleClick}>
                {title || 'More'}
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                {children}
            </Popover>
        </div>
    );
}