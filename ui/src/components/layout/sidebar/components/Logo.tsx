import React from 'react';
import { Box, Typography } from '@mui/material';

export const Logo = () => (
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
);