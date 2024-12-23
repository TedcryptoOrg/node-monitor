import React from 'react';
import { ListItem, ListItemIcon, ListItemText, useTheme, alpha } from '@mui/material';
import { Link } from 'react-router-dom';
import { NavItem as NavItemType } from '../types';

interface NavItemProps {
  item: NavItemType;
  isActive: boolean;
}

export const NavItem = ({ item, isActive }: NavItemProps) => {
  const theme = useTheme();
  
  return (
    <ListItem
      component={Link}
      to={item.path}
      sx={{
        px: 3,
        py: 1.5,
        color: isActive ? 'primary.main' : 'text.primary',
        bgcolor: isActive ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
        '&:hover': {
          bgcolor: isActive 
            ? alpha(theme.palette.primary.main, 0.12)
            : alpha(theme.palette.primary.main, 0.04),
        },
        borderRadius: 0,
        borderRight: isActive ? `3px solid ${theme.palette.primary.main}` : 'none',
        transition: theme.transitions.create(['background-color', 'border-color'], {
          duration: theme.transitions.duration.shorter,
        }),
      }}
    >
      <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
        <item.icon fontSize="small" />
      </ListItemIcon>
      <ListItemText 
        primary={item.name}
        primaryTypographyProps={{
          fontSize: '0.875rem',
          fontWeight: isActive ? 600 : 400,
        }}
      />
    </ListItem>
  );
};