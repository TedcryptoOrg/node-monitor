import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { ApiServer } from '../../../types/ApiServer';
import MonitorsStatus from '../../monitors/MonitorsStatus';
import ServerLink from '../ServerLink';

interface ServerHeaderProps {
  server: ApiServer;
  onUpdate: () => void;
}

const ServerHeader: React.FC<ServerHeaderProps> = ({ 
  server,
}) => {
  return (
    <Box>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
            {server.name}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <ServerLink server={server} showAddress />
            <Typography variant="subtitle1" color="text.secondary">
              •
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {server.monitors?.length || 0} Monitors
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <MonitorsStatus monitors={server.monitors || []} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ServerHeader;