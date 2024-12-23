import React, { useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
  LinearProgress,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CardActionArea,
} from '@mui/material';
import { ApiConfiguration } from '../../types/ApiConfiguration';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import StorageIcon from '@mui/icons-material/Storage';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import { useApi } from '../../context/ApiProvider';
import { enqueueSnackbar } from 'notistack';
import MonitorsStatus from '../monitors/MonitorsStatus';
import UpsertConfigurationModal from './UpsertConfigurationModal';

interface ConfigurationsListProps {
  configurations: ApiConfiguration[];
  onConfigurationUpdated: () => void;
  isLoading: boolean;
}

const ConfigurationsList: React.FC<ConfigurationsListProps> = ({
  configurations,
  onConfigurationUpdated,
  isLoading,
}) => {
  const api = useApi();
  const navigate = useNavigate();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedConfig, setSelectedConfig] = useState<ApiConfiguration | null>(null);

  const handleEdit = (config: ApiConfiguration) => {
    setSelectedConfig(config);
    setEditModalOpen(true);
  };

  const handleDeleteClick = (config: ApiConfiguration) => {
    setSelectedConfig(config);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedConfig) return;

    try {
      const response = await api?.delete(`/configurations/${selectedConfig.id}`);
      if (response?.ok) {
        enqueueSnackbar('Configuration deleted successfully', { variant: 'success' });
        onConfigurationUpdated();
      } else {
        throw new Error('Failed to delete configuration');
      }
    } catch (error) {
      console.error('Error:', error);
      enqueueSnackbar('Failed to delete configuration', { variant: 'error' });
    } finally {
      setDeleteDialogOpen(false);
      setSelectedConfig(null);
    }
  };

  if (isLoading) {
    return <LinearProgress />;
  }

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
    <>
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
              <CardActionArea onClick={() => navigate(`/configurations/${config.id}`)}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h6" component="h2" fontWeight={600}>
                      {config.name}
                    </Typography>
                    <MonitorsStatus monitors={config.monitors || []} />
                  </Box>

                  <Stack spacing={2}>
                    <Box>
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

                    <Stack direction="row" spacing={2}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <StorageIcon fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary">
                          {config.servers?.length || 0} Servers
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <MonitorHeartIcon fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary">
                          {config.monitors?.length || 0} Monitors
                        </Typography>
                      </Box>
                    </Stack>
                  </Stack>
                </CardContent>
              </CardActionArea>

              <CardActions sx={{ p: 2, gap: 1 }}>
                <Button
                  size="small"
                  variant="outlined"
                  color="primary"
                  startIcon={<EditIcon />}
                  onClick={() => handleEdit(config)}
                  fullWidth
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDeleteClick(config)}
                  fullWidth
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {editModalOpen && (
        <UpsertConfigurationModal
          open={editModalOpen}
          fetchData={onConfigurationUpdated}
          configuration={selectedConfig}
          handleClose={() => {
            setSelectedConfig(null);
            setEditModalOpen(false);
          }}
        />
      )}

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Delete Configuration</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the configuration "{selectedConfig?.name}"? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConfigurationsList;