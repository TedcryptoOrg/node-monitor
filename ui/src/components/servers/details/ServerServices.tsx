import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Link,
} from '@mui/material';
import { ApiServer } from '../../../types/ApiServer';
import { ApiService } from '../../../types/ApiService';
import UpsertServiceModal from '../../services/UpsertServiceModal';
import BooleanIcon from '../../Shared/BooleanIcon';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useApi } from '../../../context/ApiProvider';
import { enqueueSnackbar } from 'notistack';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

interface ServerServicesProps {
  server: ApiServer;
  onUpdate: () => void;
}

const ServerServices: React.FC<ServerServicesProps> = ({ server, onUpdate }) => {
  const api = useApi();
  const [services, setServices] = useState<ApiService[]>([]);
  const [openServiceModal, setOpenServiceModal] = useState(false);
  const [editService, setEditService] = useState<ApiService | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api?.get(`/servers/${server.id}/services`);
        if (response?.ok) {
          setServices(response.body || []);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, [api, server.id]);

  const handleDelete = async (id: number) => {
    try {
      const response = await api?.delete(`/services/${id}`);
      if (response?.ok) {
        enqueueSnackbar('Service deleted successfully', { variant: 'success' });
        onUpdate();
      }
    } catch (error) {
      console.error('Error:', error);
      enqueueSnackbar('Failed to delete service', { variant: 'error' });
    }
  };

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" fontWeight={600}>
            Services
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenServiceModal(true)}
            size="small"
          >
            Add Service
          </Button>
        </Box>

        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {services.map((service) => (
                <TableRow key={service.id}>
                  <TableCell>{service.name}</TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                      {service.type}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Link
                        href={service.address}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5,
                          color: 'text.secondary',
                          textDecoration: 'none',
                          '&:hover': { textDecoration: 'underline' }
                        }}
                    >
                      {service.address}
                      <OpenInNewIcon sx={{ fontSize: 14 }} />
                    </Link>
                  </TableCell>
                  <TableCell>
                    <BooleanIcon value={service.is_enabled} />
                  </TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                      <Tooltip title="Edit Service">
                        <IconButton
                          size="small"
                          onClick={() => {
                            setEditService(service);
                            setOpenServiceModal(true);
                          }}
                          sx={{ color: 'warning.main' }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Service">
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(service.id!)}
                          sx={{ color: 'error.main' }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <UpsertServiceModal
          open={openServiceModal}
          fetchData={onUpdate}
          server={server}
          editService={editService}
          handleClose={() => {
            setEditService(null);
            setOpenServiceModal(false);
          }}
        />
      </CardContent>
    </Card>
  );
};

export default ServerServices;