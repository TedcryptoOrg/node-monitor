import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import { ApiConfiguration } from '../../types/ApiConfiguration';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../../context/ApiProvider';
import { enqueueSnackbar } from 'notistack';
import MonitorsStatus from '../monitors/MonitorsStatus';

interface ConfigurationsListProps {
  configurations: ApiConfiguration[];
  onConfigurationUpdated: () => void;
}

const ConfigurationsList: React.FC<ConfigurationsListProps> = ({
  configurations,
  onConfigurationUpdated,
}) => {
  const navigate = useNavigate();
  const api = useApi();

  const handleDelete = async (id: number) => {
    try {
      const response = await api?.delete(`/configurations/${id}`);
      if (response?.ok) {
        enqueueSnackbar('Configuration deleted successfully', { variant: 'success' });
        onConfigurationUpdated();
      } else {
        throw new Error('Failed to delete configuration');
      }
    } catch (error) {
      console.error('Error:', error);
      enqueueSnackbar('Failed to delete configuration', { variant: 'error' });
    }
  };

  if (configurations.length === 0) {
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
          No configurations found
        </Typography>
        <Typography color="text.secondary">
          Start by adding your first node configuration
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {configurations.map((config) => (
        <Grid item xs={12} sm={6} md={4} key={config.id}>
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
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" component="h2" fontWeight={600}>
                  {config.name}
                </Typography>
                <MonitorsStatus monitors={config.monitors || []} />
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Chip
                  label={config.chain}
                  size="small"
                  sx={{ 
                    bgcolor: 'primary.main',
                    color: 'white',
                    fontWeight: 500
                  }}
                />
              </Box>

              <Typography variant="body2" color="text.secondary">
                {config.servers?.length || 0} Servers • {config.monitors?.length || 0} Monitors
              </Typography>
            </CardContent>

            <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
              <Tooltip title="View Details">
                <IconButton
                  size="small"
                  onClick={() => navigate(`/configurations/${config.id}`)}
                  sx={{ color: 'primary.main' }}
                >
                  <VisibilityIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit">
                <IconButton
                  size="small"
                  onClick={() => navigate(`/configurations/${config.id}/edit`)}
                  sx={{ color: 'warning.main' }}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton
                  size="small"
                  onClick={() => handleDelete(config.id)}
                  sx={{ color: 'error.main' }}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ConfigurationsList;