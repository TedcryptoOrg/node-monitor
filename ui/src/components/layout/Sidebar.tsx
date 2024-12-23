import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { navbarItems } from '../../Navbar';
import { useUserStore } from '../../stores/useUserStore';

const DRAWER_WIDTH = 280;

const Sidebar = () => {
  const theme = useTheme();
  const location = useLocation();
  const { user } = useUserStore();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          bgcolor: 'background.paper',
          borderRight: '1px solid',
          borderColor: 'divider',
        },
      }}
    >
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Node Monitor
        </Typography>
      </Box>
      <List>
        {navbarItems.map((item) => {
          if (!user || !item.security(user)) return null;
          
          const isActive = location.pathname === item.path;
          
          return (
            <ListItem
              key={item.name}
              component={Link}
              to={item.path}
              sx={{
                color: isActive ? 'primary.main' : 'text.primary',
                bgcolor: isActive ? 'action.selected' : 'transparent',
                '&:hover': {
                  bgcolor: 'action.hover',
                },
                borderRadius: 1,
                mx: 1,
                mb: 0.5,
              }}
            >
              <ListItemIcon sx={{ color: 'inherit' }}>
                <item.icon />
              </ListItemIcon>
              <ListItemText 
                primary={item.name}
                primaryTypographyProps={{
                  fontWeight: isActive ? 600 : 400,
                }}
              />
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar;