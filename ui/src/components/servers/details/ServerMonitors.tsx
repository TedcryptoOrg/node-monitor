import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
} from '@mui/material';
import { ApiServer } from '../../../types/ApiServer';
import UpsertMonitorModal from '../../monitors/UpsertMonitorModal';
import MonitorsTable from '../../configurations/details/MonitorsTable';
import AddIcon from '@mui/icons-material/Add';

interface ServerMonitorsProps {
  server: ApiServer;
  onUpdate: () => void;
}

const ServerMonitors: React.FC<ServerMonitorsProps> = ({
  server,
  onUpdate,
}) => {
  const [openMonitorModal, setOpenMonitorModal] = useState(false);

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" fontWeight={600}>
            Monitors
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenMonitorModal(true)}
            size="small"
          >
            Add Monitor
          </Button>
        </Box>

        <MonitorsTable 
          monitors={server.monitors || []}
          onUpdate={onUpdate}
        />

        <UpsertMonitorModal
          open={openMonitorModal}
          fetchData={onUpdate}
          configuration={server.configuration}
          handleClose={() => setOpenMonitorModal(false)}
          editMonitor={null}
        />
      </CardContent>
    </Card>
  );
};

export default ServerMonitors;