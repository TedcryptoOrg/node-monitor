import React from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { ApiConfiguration } from '../../../types/ApiConfiguration';
import BooleanIcon from '../../Shared/BooleanIcon';

interface ConfigurationDetailsProps {
  configuration: ApiConfiguration;
}

const ConfigurationDetails: React.FC<ConfigurationDetailsProps> = ({ configuration }) => {
  console.log(configuration);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom fontWeight={600}>
          Configuration Details
        </Typography>

        <Box sx={{ '& > *:not(:last-child)': { mb: 2 } }}>
          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Status
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <BooleanIcon value={configuration.is_enabled} />
              <Typography>
                {configuration.is_enabled ? 'Enabled' : 'Disabled'}
              </Typography>
            </Box>
          </Box>

          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Company
            </Typography>
            <Chip 
              label={configuration.company?.name || 'No Company'} 
              size="small"
              variant="outlined"
            />
          </Box>

          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Created At
            </Typography>
            <Typography>
              {new Date(configuration.createdAt).toLocaleString()}
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Last Updated
            </Typography>
            <Typography>
              {new Date(configuration.updatedAt).toLocaleString()}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ConfigurationDetails;