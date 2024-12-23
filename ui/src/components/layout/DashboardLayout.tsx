import React from 'react';
import { Box, Container, CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from '../../theme';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: 'background.default',
            p: 3,
            minHeight: '100vh',
          }}
        >
          <Container maxWidth="xl">
            {children}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default DashboardLayout;