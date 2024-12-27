import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, Grid, LinearProgress } from '@mui/material';
import { ApiServer } from '../../../types/ApiServer';
import { useApi } from '../../../context/ApiProvider';

interface ServerMetricsProps {
  server: ApiServer;
}

const ServerMetrics: React.FC<ServerMetricsProps> = ({ server }) => {
  const api = useApi();
  const [metrics, setMetrics] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await api?.get(`/servers/${server.id}/metrics`);
        if (response?.ok) {
          setMetrics(response.body);
        }
      } catch (error) {
        console.error('Error fetching metrics:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, [api, server.id]);

  const formatBytes = (bytes: number) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent>
          <LinearProgress />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom fontWeight={600}>
          System Metrics
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Disk Usage
              </Typography>
              <Typography variant="h5" fontWeight={500}>
                {metrics?.usedDiskSpacePercentage}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {formatBytes(metrics?.usedDiskSpace)} of {formatBytes(metrics?.totalDiskSpace)}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Memory Usage
              </Typography>
              <Typography variant="h5" fontWeight={500}>
                {metrics?.memoryUsagePercentage}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {formatBytes(metrics?.memoryUsage)} of {formatBytes(metrics?.totalMemory)}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ServerMetrics;