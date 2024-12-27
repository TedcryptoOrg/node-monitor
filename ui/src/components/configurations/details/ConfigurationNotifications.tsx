import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { ApiConfiguration } from '../../../types/ApiConfiguration';
import ConfigurationNotificationChannelsList from '../ConfigurationNotificationChannelsList';
import AssociateNotificationChannel from '../AssociateNotificationChannel';

interface ConfigurationNotificationsProps {
  configuration: ApiConfiguration;
}

const ConfigurationNotifications: React.FC<ConfigurationNotificationsProps> = ({
  configuration,
}) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom fontWeight={600}>
          Notification Channels
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          <ConfigurationNotificationChannelsList configuration={configuration} />
        </Box>

        <AssociateNotificationChannel configuration={configuration} />
      </CardContent>
    </Card>
  );
};

export default ConfigurationNotifications;