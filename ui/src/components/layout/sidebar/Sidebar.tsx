import React, { useState } from 'react';
import {
  Box,
  Drawer,
  IconButton,
  useTheme,
  Divider,
} from '@mui/material';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuIcon from '@mui/icons-material/Menu';
import { Logo } from './components/Logo';
import { NavItems } from './components/NavItems';
import { useNavItems } from './hooks/useNavItems';
import { DRAWER_WIDTH, COLLAPSED_WIDTH } from './constants';

const Sidebar = () => {
  const theme = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { mainItems, systemItems, accountItems } = useNavItems();

  return (
      <Drawer
          variant="permanent"
          sx={{
            width: isCollapsed ? COLLAPSED_WIDTH : DRAWER_WIDTH,
            transition: theme.transitions.create('width', {
              duration: theme.transitions.duration.shorter,
            }),
            '& .MuiDrawer-paper': {
              width: isCollapsed ? COLLAPSED_WIDTH : DRAWER_WIDTH,
              transition: theme.transitions.create('width', {
                duration: theme.transitions.duration.shorter,
              }),
              boxSizing: 'border-box',
              bgcolor: 'background.paper',
              borderRight: '1px solid',
              borderColor: 'divider',
              overflowX: 'hidden',
            },
          }}
      >
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          p: 1.5,
          minHeight: 64,
        }}>
          {!isCollapsed && <Logo />}
          <IconButton
              onClick={() => setIsCollapsed(!isCollapsed)}
              sx={{ ml: 'auto' }}
              size="small"
          >
            {isCollapsed ? <MenuIcon /> : <MenuOpenIcon />}
          </IconButton>
        </Box>

        <Box sx={{
          flexGrow: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
        }}>
          <NavItems items={mainItems} isCollapsed={isCollapsed} />
          <Divider sx={{ my: 1, mx: 2 }} />
          <NavItems items={systemItems} isCollapsed={isCollapsed} />
        </Box>

        <Divider />
        <Box sx={{ p: 1 }}>
          <NavItems items={accountItems} isCollapsed={isCollapsed} />
        </Box>
      </Drawer>
  );
};

export default Sidebar;