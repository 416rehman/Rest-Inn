import * as React from 'react';
import Popover from '@mui/material/Popover';
import { Chip} from "@mui/material";

interface IProps {
    title: string;
    children: React.ReactNode;
    variant?: 'filled' | 'outlined';
    onDelete?: () => void;
    icon?: React.ReactElement;
}

export default function PopoverStyled({title, children, variant, onDelete, icon}: IProps) {
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event?.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <Chip
                aria-describedby={id}
                label={title}
                color={'primary'}
                icon={icon}
                onClick={handleClick}
                onDelete={onDelete}
                variant={variant || "outlined"}
                sx={{
                    pl: icon ? '0.5rem' : '0',
                }}
            />
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