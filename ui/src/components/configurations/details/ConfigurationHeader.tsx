import React from 'react';
import { Box, Typography, Grid, Chip } from '@mui/material';
import { ApiConfiguration } from '../../../types/ApiConfiguration';
import MonitorsStatus from '../../monitors/MonitorsStatus';

interface ConfigurationHeaderProps {
  configuration: ApiConfiguration;
  onUpdate: () => void;
}

const ConfigurationHeader: React.FC<ConfigurationHeaderProps> = ({ 
  configuration,
}) => {
  return (
    <Box>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
            {configuration.name}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Chip 
              label={configuration.chain}
              color="primary"
              size="small"
            />
            <Typography variant="subtitle1" color="text.secondary">
              {configuration.servers?.length || 0} Servers • {configuration.monitors?.length || 0} Monitors
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <MonitorsStatus monitors={configuration.monitors || []} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ConfigurationHeader;