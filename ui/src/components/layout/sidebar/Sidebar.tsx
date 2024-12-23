import React from 'react';
import { Box, Drawer, Divider } from '@mui/material';
import { Logo } from './components/Logo';
import { NavSection } from './components/NavSection';
import { useNavSections } from './hooks/useNavSections';
import { DRAWER_WIDTH } from './constants';

const Sidebar = () => {
  const sections = useNavSections();

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
      <Logo />

      <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
        <NavSection section={sections.main} />
        <Divider sx={{ my: 2 }} />
        <NavSection section={sections.management} />
        <Divider sx={{ my: 2 }} />
        <NavSection section={sections.system} />
      </Box>

      <Divider />
      <Box sx={{ p: 2 }}>
        <NavSection section={sections.account} />
      </Box>
    </Drawer>
  );
};

export default Sidebar;