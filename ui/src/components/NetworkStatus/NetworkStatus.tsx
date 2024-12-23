import React from 'react';
import { Box, Typography } from '@mui/material';
import MetricsTable from './components/MetricsTable';
import { useMetrics } from './hooks/useMetrics';

const NetworkStatus: React.FC = () => {
  const { metricsMap, configurations, isLoading, error, refetch } = useMetrics();

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
        Network Status
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Monitor system resources and performance metrics across your nodes
      </Typography>

      <Box sx={{ mt: 4 }}>
        <MetricsTable 
          metricsMap={metricsMap}
          configurations={configurations}
          isLoading={isLoading}
          error={error}
          onRetry={refetch}
        />
      </Box>
    </Box>
  );
};

export default NetworkStatus;