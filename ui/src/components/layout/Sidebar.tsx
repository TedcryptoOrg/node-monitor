import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  useTheme,
  alpha,
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { navbarItems } from '../../Navbar';
import { useUserStore } from '../../stores/useUserStore';

const DRAWER_WIDTH = 280;

const Sidebar = () => {
  const theme = useTheme();
  const location = useLocation();
  const { user } = useUserStore();

  // Group navigation items by category
  const mainNavItems = navbarItems.filter(item => 
    ['Dashboard', 'Configurations', 'Network Status'].includes(item.name)
  );

  const managementNavItems = navbarItems.filter(item =>
    ['Notification channels', 'Users', 'Company'].includes(item.name)
  );

  const systemNavItems = navbarItems.filter(item =>
    ['Tail log', 'Audit'].includes(item.name)
  );

  const accountNavItems = navbarItems.filter(item =>
    ['Logout'].includes(item.name)
  );

  const NavSection = ({ title, items }: { title: string, items: typeof navbarItems }) => (
    <Box sx={{ mb: 2 }}>
      <Typography
        variant="overline"
        sx={{
          px: 3,
          py: 1.5,
          display: 'block',
          color: 'text.secondary',
          fontWeight: 500,
        }}
      >
        {title}
      </Typography>
      <List>
        {items.map((item) => {
          if (!user || !item.security(user)) return null;
          
          const isActive = location.pathname === item.path;
          
          return (
            <ListItem
              key={item.name}
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
              <ListItemIcon 
                sx={{ 
                  color: 'inherit',
                  minWidth: 40,
                }}
              >
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
        })}
      </List>
    </Box>
  );

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
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 600,
            background: 'linear-gradient(45deg, #2D3436 30%, #00B894 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Node Monitor
        </Typography>
      </Box>

      <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
        <NavSection title="Main" items={mainNavItems} />
        <Divider sx={{ my: 2 }} />
        <NavSection title="Management" items={managementNavItems} />
        <Divider sx={{ my: 2 }} />
        <NavSection title="System" items={systemNavItems} />
      </Box>

      <Divider />
      <Box sx={{ p: 2 }}>
        <NavSection title="Account" items={accountNavItems} />
      </Box>
    </Drawer>
  );
};

export default Sidebar;