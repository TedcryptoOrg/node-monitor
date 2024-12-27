import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Grid, LinearProgress } from '@mui/material';
import { ApiConfiguration } from '../../types/ApiConfiguration';
import { useApi } from '../../context/ApiProvider';
import { enqueueSnackbar } from 'notistack';
import ConfigurationHeader from './details/ConfigurationHeader';
import ConfigurationDetails from './details/ConfigurationDetails';
import ConfigurationServers from './details/ConfigurationServers';
import ConfigurationMonitors from './details/ConfigurationMonitors';
import ConfigurationNotifications from './details/ConfigurationNotifications';

const ConfigurationOverview: React.FC = () => {
  const api = useApi();
  const { id } = useParams<{ id: string }>();
  const [isLoading, setLoading] = useState(true);
  const [configuration, setConfiguration] = useState<ApiConfiguration | null>(null);

  const fetchData = useCallback(() => {
    setLoading(true);
    api?.get(`/configurations/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch configuration');
        }
        return response.body;
      })
      .then(data => setConfiguration(data))
      .catch((error) => {
        console.error('Error:', error);
        enqueueSnackbar('Failed to fetch configuration data!', { variant: 'error' });
        setConfiguration(null);
      })
      .finally(() => setLoading(false));
  }, [id, api]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (isLoading) {
    return <LinearProgress />;
  }

  if (!configuration) {
    return null;
  }

  return (
    <Box>
      <ConfigurationHeader configuration={configuration} onUpdate={fetchData} />
      
      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12} md={4}>
          <ConfigurationDetails configuration={configuration} />
        </Grid>
        
        <Grid item xs={12} md={8}>
          <ConfigurationNotifications configuration={configuration} />
        </Grid>

        <Grid item xs={12}>
          <ConfigurationServers 
            configuration={configuration} 
            onUpdate={fetchData}
          />
        </Grid>

        <Grid item xs={12}>
          <ConfigurationMonitors 
            configuration={configuration}
            onUpdate={fetchData}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ConfigurationOverview;