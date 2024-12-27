import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Chip,
  Typography,
  IconButton,
  Tooltip,
  Skeleton,
} from '@mui/material';
import { ApiMonitor } from "../../types/ApiMonitor";
import ConfigurationLink from "../configurations/ConfigurationLink";
import ServerLink from "../servers/ServerLink";
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useNavigate } from 'react-router-dom';

interface MonitorsTableProps {
  monitors: ApiMonitor[];
  type: 'error' | 'warning';
  isLoading: boolean;
}

const MonitorsTable: React.FC<MonitorsTableProps> = ({ monitors, type, isLoading }) => {
  const navigate = useNavigate();

  const getStatusChip = (monitor: ApiMonitor) => {
    if (type === 'error') {
      return (
        <Chip
          icon={<ErrorIcon />}
          label="Critical"
          color="error"
          size="small"
          sx={{ fontWeight: 500 }}
        />
      );
    }
    return (
      <Chip
        icon={<WarningIcon />}
        label="Warning"
        color="warning"
        size="small"
        sx={{ fontWeight: 500 }}
      />
    );
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleString();
  };

  const handleViewDetails = (serverId: number | undefined) => {
    if (serverId) {
      navigate(`/servers/${serverId}`);
    }
  };

  if (isLoading) {
    return (
      <Box>
        {[1, 2, 3].map((i) => (
          <Skeleton 
            key={i} 
            variant="rectangular" 
            height={52} 
            sx={{ mb: 1, borderRadius: 1 }} 
          />
        ))}
      </Box>
    );
  }

  if (monitors.length === 0) {
    return (
      <Box sx={{ 
        textAlign: 'center', 
        py: 8,
        bgcolor: 'background.paper',
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider'
      }}>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No {type === 'error' ? 'critical issues' : 'warnings'} found
        </Typography>
        <Typography color="text.secondary">
          All systems are running smoothly
        </Typography>
      </Box>
    );
  }

  return (
    <TableContainer 
      component={Paper} 
      elevation={0}
      sx={{ 
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Status</TableCell>
            <TableCell>Configuration</TableCell>
            <TableCell>Monitor</TableCell>
            <TableCell>Server</TableCell>
            <TableCell>Message</TableCell>
            <TableCell>Last Check</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {monitors.map((monitor, index) => (
            <TableRow 
              key={index}
              sx={{ 
                '&:last-child td, &:last-child th': { border: 0 },
                '&:hover': { bgcolor: 'action.hover' }
              }}
            >
              <TableCell>
                {getStatusChip(monitor)}
              </TableCell>
              <TableCell>
                {monitor.configuration && (
                  <ConfigurationLink configuration={monitor.configuration} />
                )}
              </TableCell>
              <TableCell>
                <Typography variant="body2" fontWeight={500}>
                  {monitor.name}
                </Typography>
              </TableCell>
              <TableCell>
                {monitor.server && (
                  <ServerLink server={monitor.server} showAddress={false} />
                )}
              </TableCell>
              <TableCell>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    maxWidth: 300,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {monitor.last_error || 'No error message'}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" color="text.secondary">
                  {formatDate(monitor.last_check)}
                </Typography>
              </TableCell>
              <TableCell align="right">
                {monitor.server && (
                  <Tooltip title="View Server Details">
                    <IconButton 
                      size="small"
                      onClick={() => handleViewDetails(monitor.server?.id)}
                      sx={{ color: 'primary.main' }}
                    >
                      <OpenInNewIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MonitorsTable;