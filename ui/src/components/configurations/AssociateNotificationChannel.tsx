import React, { useEffect, useState } from 'react';
import { Button, Grid, Autocomplete, TextField, Box } from '@mui/material';
import { ApiNotificationChannel } from '../../types/ApiNotificationChannel';
import { ApiConfiguration } from '../../types/ApiConfiguration';
import { enqueueSnackbar } from 'notistack';
import { ApiConfigurationNotificationChannelInput } from '../../types/ApiConfigurationNotificationChannel';
import { eventEmitter } from '../../services/Events/EventEmitter';
import { EventsEnum } from '../../services/Events/EventsEnum';
import { useApi } from '../../context/ApiProvider';

interface AssociateNotificationChannelProps {
  configuration: ApiConfiguration;
}

const AssociateNotificationChannel: React.FC<AssociateNotificationChannelProps> = ({ configuration }) => {
  const api = useApi();
  const [notificationChannels, setNotificationChannels] = useState<ApiNotificationChannel[]>([]);
  const [selectedChannel, setSelectedChannel] = useState<ApiNotificationChannel | null>(null);
  const firstRender = React.useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      api?.get(`/notification-channels`)
        .then(response => {
          if (!response.ok) {
            throw Error('Failed to fetch')
          }
          return response.body;
        })
        .then(data => setNotificationChannels(data))
        .catch(error => {
          console.error('Error:', error);
          enqueueSnackbar('Failed to fetch notification channels', { variant: 'error' });
        });
      firstRender.current = false;
    }
  }, [api]);

  const handleAdd = () => {
    if (!selectedChannel) {
      enqueueSnackbar('Please select a notification channel', { variant: 'error' });
      return;
    }

    const configurationNotificationChannel: ApiConfigurationNotificationChannelInput = {
      configuration_id: configuration.id,
      notification_channel_id: selectedChannel.id,
    };

    api?.post(`/configurations/${configuration.id}/notification-channels`, configurationNotificationChannel)
      .then(response => {
        if (!response.ok) {
          throw Error('Failed to associate notification channel');
        }
        setSelectedChannel(null);
        eventEmitter.emit(EventsEnum.NOTIFICATION_CHANNEL_ASSOCIATED);
        enqueueSnackbar('Successfully associated notification channel', { variant: 'success' });
      })
      .catch(error => {
        console.error('Error:', error);
        enqueueSnackbar('Failed to associate notification channel', { variant: 'error' });
      });
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Autocomplete
            options={notificationChannels}
            getOptionLabel={(option) => option.name}
            value={selectedChannel}
            onChange={(_, newValue) => setSelectedChannel(newValue)}
            renderInput={(params) => (
              <TextField 
                {...params} 
                label="Notification Channels" 
                variant="outlined" 
                size="small"
                placeholder="Select a notification channel"
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth 
            onClick={handleAdd}
            disabled={!selectedChannel}
          >
            Add Channel
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AssociateNotificationChannel;