import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';

interface MetricsErrorProps {
  message: string;
  onRetry: () => void;
}

const MetricsError: React.FC<MetricsErrorProps> = ({ message, onRetry }) => {
  return (
    <Box
      sx={{
        textAlign: 'center',
        py: 8,
        bgcolor: 'background.paper',
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'error.light',
      }}
    >
      <ErrorIcon sx={{ fontSize: 48, color: 'error.main', mb: 2 }} />
      <Typography variant="h6" color="error" gutterBottom>
        Failed to load metrics
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        {message}
      </Typography>
      <Button variant="contained" onClick={onRetry}>
        Retry
      </Button>
    </Box>
  );
};

export default MetricsError;