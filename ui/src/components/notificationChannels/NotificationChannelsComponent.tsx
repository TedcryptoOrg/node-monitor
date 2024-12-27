import React from 'react';
import { Box, Typography } from '@mui/material';
import NotificationChannelsHeader from './NotificationChannelsHeader';
import NotificationChannelsList from './NotificationChannelsList';

const NotificationChannelsComponent: React.FC = () => {
  return (
    <Box>
      <NotificationChannelsHeader />
      <Box sx={{ mt: 4 }}>
        <NotificationChannelsList />
      </Box>
    </Box>
  );
};

export default NotificationChannelsComponent;