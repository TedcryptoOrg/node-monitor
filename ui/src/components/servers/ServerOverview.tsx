import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Grid, LinearProgress } from '@mui/material';
import { ApiServer } from '../../types/ApiServer';
import { useApi } from '../../context/ApiProvider';
import { enqueueSnackbar } from 'notistack';
import ServerHeader from './details/ServerHeader';
import ServerDetails from './details/ServerDetails';
import ServerServices from './details/ServerServices';
import ServerMonitors from './details/ServerMonitors';
import ServerMetrics from './details/ServerMetrics';

const ServerOverview: React.FC = () => {
  const api = useApi();
  const { id } = useParams<{ id: string }>();
  const [server, setServer] = useState<ApiServer | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(() => {
    setIsLoading(true);
    api?.get(`/servers/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch server data');
        }
        return response.body;
      })
      .then(data => setServer(data))
      .catch(error => {
        console.error('Error:', error);
        enqueueSnackbar('Failed to fetch server data', { variant: 'error' });
        setServer(null);
      })
      .finally(() => setIsLoading(false));
    api?.get(`/servers/${id}/monitors`)
        .then(response => {
            if (!response.ok) {
            throw new Error('Failed to fetch server monitors');
            }
            return response.body;
        })
        .then(data => setServer(prev => prev ? { ...prev, monitors: data } : null))
        .catch(error => {
            console.error('Error:', error);
            enqueueSnackbar('Failed to fetch server monitors', { variant: 'error' });
        });
  }, [id, api]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (isLoading) {
    return <LinearProgress />;
  }

  if (!server) {
    return null;
  }

  return (
    <Box>
      <ServerHeader server={server} onUpdate={fetchData} />
      
      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12} md={4}>
          <ServerDetails server={server} />
        </Grid>
        
        <Grid item xs={12} md={8}>
          <ServerMetrics server={server} />
        </Grid>

        <Grid item xs={12}>
          <ServerServices 
            server={server} 
            onUpdate={fetchData}
          />
        </Grid>

        <Grid item xs={12}>
          <ServerMonitors 
            server={server}
            onUpdate={fetchData}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ServerOverview;