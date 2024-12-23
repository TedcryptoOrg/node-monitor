import React from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { ApiServer } from '../../../types/ApiServer';
import BooleanIcon from '../../Shared/BooleanIcon';
import ConfigurationLink from '../../configurations/ConfigurationLink';

interface ServerDetailsProps {
  server: ApiServer;
}

const ServerDetails: React.FC<ServerDetailsProps> = ({ server }) => {
  console.log(server);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom fontWeight={600}>
          Server Details
        </Typography>

        <Box sx={{ '& > *:not(:last-child)': { mb: 2 } }}>
          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Status
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <BooleanIcon value={server.is_enabled} />
              <Typography>
                {server.is_enabled ? 'Enabled' : 'Disabled'}
              </Typography>
            </Box>
          </Box>

          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Configuration
            </Typography>
            {server.configuration && (
              <Chip 
                label={<ConfigurationLink configuration={server.configuration} />}
                variant="outlined"
                size="small"
              />
            )}
          </Box>

          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Created At
            </Typography>
            <Typography>
              {server.createdAt ? new Date(server.createdAt).toLocaleString() : 'N/A'}
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Last Updated
            </Typography>
            <Typography>
              {server.updatedAt ? new Date(server.updatedAt).toLocaleString() : 'N/A'}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ServerDetails;