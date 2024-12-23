import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Box,
  Typography,
  Chip,
} from '@mui/material';
import { ApiMonitor } from '../../../types/ApiMonitor';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BooleanIcon from '../../Shared/BooleanIcon';
import { useApi } from '../../../context/ApiProvider';
import { enqueueSnackbar } from 'notistack';
import ServerLink from '../../servers/ServerLink';
import UpsertMonitorModal from '../../monitors/UpsertMonitorModal';

interface MonitorsTableProps {
  monitors: ApiMonitor[];
  onUpdate: () => void;
}

const MonitorsTable: React.FC<MonitorsTableProps> = ({ monitors, onUpdate }) => {
  const api = useApi();
  const [editMonitor, setEditMonitor] = useState<ApiMonitor | null>(null);
  const [openModal, setOpenModal] = useState(false);

  console.log(monitors);

  const handleDelete = async (id: number) => {
    try {
      const response = await api?.delete(`/monitors/${id}`);
      if (response?.ok) {
        enqueueSnackbar('Monitor deleted successfully', { variant: 'success' });
        onUpdate();
      } else {
        throw new Error('Failed to delete monitor');
      }
    } catch (error) {
      console.error('Error:', error);
      enqueueSnackbar('Failed to delete monitor', { variant: 'error' });
    }
  };

  const handleEdit = (monitor: ApiMonitor) => {
    setEditMonitor(monitor);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setEditMonitor(null);
    setOpenModal(false);
  };

  const getStatusChip = (monitor: ApiMonitor) => {
    if (!monitor.status) {
      return (
        <Chip 
          label="Error" 
          size="small" 
          color="error"
          sx={{ fontWeight: 500 }}
        />
      );
    }
    if (monitor.last_error) {
      return (
        <Chip 
          label="Warning" 
          size="small" 
          color="warning"
          sx={{ fontWeight: 500 }}
        />
      );
    }
    return (
      <Chip 
        label="Healthy" 
        size="small" 
        color="success"
        sx={{ fontWeight: 500 }}
      />
    );
  };

  if (monitors.length === 0) {
    return (
      <Box 
        sx={{ 
          textAlign: 'center',
          py: 4,
          bgcolor: 'background.default',
          borderRadius: 1,
          border: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Typography color="text.secondary">
          No monitors configured yet
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <TableContainer 
        component={Paper} 
        elevation={0}
        sx={{ 
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Server</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>Last Check</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {monitors.map((monitor) => (
              <TableRow 
                key={monitor.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Typography fontWeight={500}>{monitor.name}</Typography>
                </TableCell>
                <TableCell>
                  <Chip 
                    label={monitor.type} 
                    size="small"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  {monitor.server && <ServerLink server={monitor.server} />}
                </TableCell>
                <TableCell>{getStatusChip(monitor)}</TableCell>
                <TableCell>
                  <BooleanIcon value={monitor.is_enabled} />
                </TableCell>
                <TableCell>
                  {monitor.last_check 
                    ? new Date(monitor.last_check).toLocaleString()
                    : 'Never'
                  }
                </TableCell>
                <TableCell align="right">
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                    <Tooltip title="Edit Monitor">
                      <IconButton 
                        size="small"
                        onClick={() => handleEdit(monitor)}
                        sx={{ color: 'warning.main' }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Monitor">
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(monitor.id!)}
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

      {editMonitor && (
        <UpsertMonitorModal
          open={openModal}
          fetchData={onUpdate}
          configuration={editMonitor.configuration}
          editMonitor={editMonitor}
          handleClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default MonitorsTable;