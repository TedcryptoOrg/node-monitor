import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Chip,
  useTheme,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ApiNotificationChannel } from '../../types/ApiNotificationChannel';
import BooleanIcon from '../Shared/BooleanIcon';

interface NotificationChannelCardProps {
  channel: ApiNotificationChannel;
  onEdit: (channel: ApiNotificationChannel) => void;
  onDelete: (id: number) => void;
}

const NotificationChannelCard: React.FC<NotificationChannelCardProps> = ({
  channel,
  onEdit,
  onDelete,
}) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="h2" gutterBottom fontWeight={600}>
          {channel.name}
        </Typography>
        
        <Chip
          label={channel.type}
          size="small"
          sx={{
            textTransform: 'capitalize',
            bgcolor: 'primary.main',
            color: 'white',
            fontWeight: 500,
            mb: 2,
          }}
        />

        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Status:
          </Typography>
          <BooleanIcon value={channel.is_enabled} />
          <Typography variant="body2" color="text.secondary">
            {channel.is_enabled ? 'Active' : 'Inactive'}
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Created: {new Date(channel.created_at!).toLocaleDateString()}
        </Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end', px: 2, pb: 2 }}>
        <Tooltip title="Edit Channel">
          <IconButton
            size="small"
            onClick={() => onEdit(channel)}
            sx={{
              color: 'text.secondary',
              '&:hover': {
                color: 'warning.main',
                bgcolor: alpha(theme.palette.warning.main, 0.1),
              },
            }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete Channel">
          <IconButton
            size="small"
            onClick={() => onDelete(channel.id)}
            sx={{
              color: 'text.secondary',
              '&:hover': {
                color: 'error.main',
                bgcolor: alpha(theme.palette.error.main, 0.1),
              },
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default NotificationChannelCard;