import React from 'react';
import { ListItem, ListItemIcon, ListItemText, useTheme, alpha, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import { NavItem as NavItemType } from '../types';

interface NavItemProps {
    item: NavItemType;
    isActive: boolean;
    isCollapsed: boolean;
}

export const NavItem = ({ item, isActive, isCollapsed }: NavItemProps) => {
    const theme = useTheme();

    const listItem = (
        <ListItem
            component={Link}
            to={item.path}
            sx={{
                minHeight: 40,
                px: 2,
                py: 0.5,
                color: isActive ? 'primary.main' : 'text.primary',
                bgcolor: isActive ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
                '&:hover': {
                    bgcolor: isActive
                        ? alpha(theme.palette.primary.main, 0.12)
                        : alpha(theme.palette.primary.main, 0.04),
                },
                borderRadius: 1,
                mx: 1,
                mb: 0.5,
                transition: theme.transitions.create(['background-color', 'color'], {
                    duration: theme.transitions.duration.shorter,
                }),
            }}
        >
            <ListItemIcon
                sx={{
                    color: 'inherit',
                    minWidth: 36,
                    mr: isCollapsed ? 0 : 1.5,
                }}
            >
                <item.icon fontSize="small" />
            </ListItemIcon>
            {!isCollapsed && (
                <ListItemText
                    primary={item.name}
                    primaryTypographyProps={{
                        fontSize: '0.875rem',
                        fontWeight: isActive ? 600 : 400,
                    }}
                />
            )}
        </ListItem>
    );

    if (isCollapsed) {
        return (
            <Tooltip title={item.name} placement="right">
                {listItem}
            </Tooltip>
        );
    }

    return listItem;
};