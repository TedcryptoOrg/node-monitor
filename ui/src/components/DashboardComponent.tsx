import React from 'react';
import { Box, Container, Grid, Typography, Paper } from '@mui/material';
import StatisticsGrid from './dashboard/StatisticsGrid';
import MonitoringIssues from './dashboard/MonitoringIssues';

const DashboardComponent: React.FC = () => {
  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
          Dashboard Overview
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Monitor your node performance and system health
        </Typography>
      </Box>

      <StatisticsGrid />
      
      <Box sx={{ mt: 4 }}>
        <Paper 
          elevation={0}
          sx={{ 
            p: 3, 
            bgcolor: 'background.default',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2
          }}
        >
          <Typography variant="h6" gutterBottom fontWeight={600}>
            System Monitoring
          </Typography>
          <MonitoringIssues />
        </Paper>
      </Box>
    </Box>
  );
};

export default DashboardComponent;