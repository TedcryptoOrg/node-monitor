import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { MetricState } from '../types/MetricState';
import { formatBytes } from '../utils/formatBytes';

interface MetricCellProps {
  metricState: MetricState | undefined;
  type: 'disk' | 'memory';
}

const MetricCell: React.FC<MetricCellProps> = ({ metricState, type }) => {
  if (!metricState) {
    return null;
  }

  if (metricState.isLoading) {
    return (
      <Box display="flex" alignItems="center">
        <CircularProgress size={20} sx={{ mr: 1 }} />
        <Typography variant="body2" color="text.secondary">
          Loading...
        </Typography>
      </Box>
    );
  }

  if (metricState.error) {
    return (
      <Typography variant="body2" color="error">
        {metricState.error}
      </Typography>
    );
  }

  if (!metricState.data) {
    return null;
  }

  if (type === 'disk') {
    const used = formatBytes(metricState.data.usedDiskSpace);
    const total = formatBytes(metricState.data.totalDiskSpace);
    return (
      <Typography>
        {metricState.data.usedDiskSpacePercentage}% ({used} / {total})
      </Typography>
    );
  }

  const used = formatBytes(metricState.data.memoryUsage);
  const total = formatBytes(metricState.data.totalMemory);
  return (
    <Typography>
      {metricState.data.memoryUsagePercentage}% ({used} / {total})
    </Typography>
  );
};

export default MetricCell;