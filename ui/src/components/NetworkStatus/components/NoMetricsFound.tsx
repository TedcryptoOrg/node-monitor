import React from 'react';
import { Box, Typography } from '@mui/material';
import StorageIcon from '@mui/icons-material/Storage';

const NoMetricsFound = () => (
  <Box
    sx={{
      textAlign: 'center',
      py: 8,
      bgcolor: 'background.paper',
      borderRadius: 2,
      border: '1px solid',
      borderColor: 'divider',
    }}
  >
    <StorageIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
    <Typography variant="h6" color="text.secondary" gutterBottom>
      No metrics available
    </Typography>
    <Typography color="text.secondary">
      Add servers to your configurations to start monitoring metrics
    </Typography>
  </Box>
);

export default NoMetricsFound;