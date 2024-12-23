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
  Link,
} from '@mui/material';
import { ApiServer } from '../../../types/ApiServer';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import BooleanIcon from '../../Shared/BooleanIcon';
import { useApi } from '../../../context/ApiProvider';
import { enqueueSnackbar } from 'notistack';
import MonitorsStatus from '../../monitors/MonitorsStatus';
import { useNavigate } from 'react-router-dom';
import UpsertServerModal from '../../servers/UpsertServerModal';

interface ServersTableProps {
  servers: ApiServer[];
  onUpdate: () => void;
}

const ServersTable: React.FC<ServersTableProps> = ({ servers, onUpdate }) => {
  const api = useApi();
  const navigate = useNavigate();
  const [editServer, setEditServer] = useState<ApiServer | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const handleDelete = async (server: ApiServer) => {
    if (!server?.id) {
      enqueueSnackbar('Invalid server ID', { variant: 'error' });
      return;
    }

    try {
      const response = await api?.delete(`/servers/${server.id}`);
      if (response?.ok) {
        enqueueSnackbar('Server deleted successfully', { variant: 'success' });
        onUpdate();
      } else {
        throw new Error('Failed to delete server');
      }
    } catch (error) {
      console.error('Error:', error);
      enqueueSnackbar('Failed to delete server', { variant: 'error' });
    }
  };

  const handleEdit = (server: ApiServer) => {
    if (!server?.configuration?.id) {
      enqueueSnackbar('Invalid server configuration', { variant: 'error' });
      return;
    }
    setEditServer(server);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setEditServer(null);
    setOpenModal(false);
  };

  if (!servers?.length) {
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
          No servers configured yet
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
              <TableCell>Address</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Active</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {servers.map((server) => (
              <TableRow 
                key={server.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Typography 
                    component={Link}
                    href={`/servers/${server.id}`}
                    color="primary"
                    sx={{ 
                      fontWeight: 500,
                      textDecoration: 'none',
                      '&:hover': { textDecoration: 'underline' }
                    }}
                  >
                    {server.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Link
                    href={server.address}
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
                    {server.address}
                    <OpenInNewIcon sx={{ fontSize: 14 }} />
                  </Link>
                </TableCell>
                <TableCell>
                  <MonitorsStatus monitors={server.monitors || []} />
                </TableCell>
                <TableCell>
                  <BooleanIcon value={server.is_enabled} />
                </TableCell>
                <TableCell align="right">
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                    <Tooltip title="View Details">
                      <IconButton
                        size="small"
                        onClick={() => navigate(`/servers/${server.id}`)}
                        sx={{ color: 'primary.main' }}
                      >
                        <OpenInNewIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit Server">
                      <IconButton 
                        size="small"
                        onClick={() => handleEdit(server)}
                        sx={{ color: 'warning.main' }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Server">
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(server)}
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

      {editServer && (
        <UpsertServerModal
          open={openModal}
          fetchData={onUpdate}
          configurationId={editServer.configuration?.id}
          editServer={editServer}
          handleClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default ServersTable;