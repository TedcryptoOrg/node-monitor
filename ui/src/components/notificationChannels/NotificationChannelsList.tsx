import React, { useCallback, useEffect, useState } from 'react';
import {
  Grid,
  LinearProgress,
  Box,
  Typography,
} from '@mui/material';
import { ApiNotificationChannel } from '../../types/ApiNotificationChannel';
import { useApi } from '../../context/ApiProvider';
import { enqueueSnackbar } from 'notistack';
import NotificationChannelCard from './NotificationChannelCard';
import UpsertNotificationChannelModal from './UpsertNotificationChannelModal';

const NotificationChannelsList: React.FC = () => {
  const api = useApi();
  const [channels, setChannels] = useState<ApiNotificationChannel[]>([]);
  const [editChannel, setEditChannel] = useState<ApiNotificationChannel | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchChannels = useCallback(async () => {
    try {
      const response = await api?.get('/notification-channels');
      if (response?.ok) {
        setChannels(response.body || []);
      } else {
        throw new Error('Failed to fetch channels');
      }
    } catch (error) {
      console.error('Error:', error);
      enqueueSnackbar('Failed to fetch notification channels', { variant: 'error' });
      setChannels([]);
    } finally {
      setIsLoading(false);
    }
  }, [api]);

  useEffect(() => {
    fetchChannels();
  }, [fetchChannels]);

  const handleEdit = (channel: ApiNotificationChannel) => {
    setEditChannel(channel);
    setOpenModal(true);
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await api?.delete(`/notification-channels/${id}`);
      if (response?.ok) {
        enqueueSnackbar('Channel deleted successfully', { variant: 'success' });
        fetchChannels();
      } else {
        throw new Error('Failed to delete channel');
      }
    } catch (error) {
      console.error('Error:', error);
      enqueueSnackbar('Failed to delete channel', { variant: 'error' });
    }
  };

  if (isLoading) {
    return <LinearProgress />;
  }

  if (channels.length === 0) {
    return (
      <Box
        sx={{
          textAlign: 'center',
          py: 8,
          bgcolor: 'background.paper',
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No notification channels configured
        </Typography>
        <Typography color="text.secondary">
          Add your first notification channel to start receiving alerts
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Grid container spacing={3}>
        {channels.map((channel) => (
          <Grid item xs={12} sm={6} md={4} key={channel.id}>
            <NotificationChannelCard
              channel={channel}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </Grid>
        ))}
      </Grid>

      <UpsertNotificationChannelModal
        open={openModal}
        fetchData={fetchChannels}
        notificationChannel={editChannel}
        handleClose={() => {
          setEditChannel(null);
          setOpenModal(false);
        }}
      />
    </>
  );
};

export default NotificationChannelsList;