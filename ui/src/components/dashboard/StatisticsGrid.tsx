import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StorageIcon from '@mui/icons-material/Storage';
import StatusCard from './StatusCard';
import { useApi } from '../../context/ApiProvider';

interface DashboardStats {
  criticalIssues: number;
  warnings: number;
  healthyNodes: number;
  totalStorage: number;
  storageUsed: number;
}

const StatisticsGrid: React.FC = () => {
  const api = useApi();
  const [stats, setStats] = useState<DashboardStats>({
    criticalIssues: 0,
    warnings: 0,
    healthyNodes: 0,
    totalStorage: 0,
    storageUsed: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [criticalResponse, warningsResponse, nodesResponse] = await Promise.all([
          api?.get('/monitors/failed'),
          api?.get('/monitors/warnings'),
          api?.get('/servers')
        ]);

        const criticalCount = criticalResponse?.ok ? criticalResponse.body.length : 0;
        const warningsCount = warningsResponse?.ok ? warningsResponse.body.length : 0;
        const totalNodes = nodesResponse?.ok ? nodesResponse.body.length : 0;
        const healthyNodes = totalNodes - criticalCount;

        setStats({
          criticalIssues: criticalCount,
          warnings: warningsCount,
          healthyNodes: healthyNodes,
          totalStorage: 0, // These would come from a different endpoint
          storageUsed: 0
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [api]);

  const formatStorageSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <StatusCard
          title="Critical Issues"
          value={stats.criticalIssues.toString()}
          icon={ErrorIcon}
          color="#f44336"
          isLoading={isLoading}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatusCard
          title="Warnings"
          value={stats.warnings.toString()}
          icon={WarningIcon}
          color="#ff9800"
          isLoading={isLoading}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatusCard
          title="Healthy Nodes"
          value={stats.healthyNodes.toString()}
          icon={CheckCircleIcon}
          color="#4caf50"
          isLoading={isLoading}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatusCard
          title="Storage Usage"
          value={formatStorageSize(stats.storageUsed)}
          icon={StorageIcon}
          color="#2196f3"
          trend={stats.totalStorage > 0 ? `${Math.round((stats.storageUsed / stats.totalStorage) * 100)}%` : undefined}
          trendLabel="of capacity"
          isLoading={isLoading}
        />
      </Grid>
    </Grid>
  );
};

export default StatisticsGrid;