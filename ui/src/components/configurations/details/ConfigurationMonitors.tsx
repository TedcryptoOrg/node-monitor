import React, {useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
} from '@mui/material';
import { ApiConfiguration } from '../../../types/ApiConfiguration';
import UpsertMonitorModal from '../../monitors/UpsertMonitorModal';
import MonitorsTable from './MonitorsTable';
import AddIcon from '@mui/icons-material/Add';
import {useApi} from "../../../context/ApiProvider";
import {ApiMonitor} from "../../../types/ApiMonitor";

interface ConfigurationMonitorsProps {
  configuration: ApiConfiguration;
  onUpdate: () => void;
}

const ConfigurationMonitors: React.FC<ConfigurationMonitorsProps> = ({
  configuration,
  onUpdate,
}) => {
  const api = useApi();
  const [configurationMonitors, setConfigurationMonitors] = useState<ApiMonitor[]>([]);
  const [openMonitorModal, setOpenMonitorModal] = useState(false);

  useEffect(() => {
    api?.get(`/configurations/${configuration.id}/monitors`).then((response) => {
      if (response.ok) {
        setConfigurationMonitors(response.body);
      }
    });
  }, [api, setConfigurationMonitors]);

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
          monitors={configurationMonitors}
          onUpdate={onUpdate}
        />

        <UpsertMonitorModal
          open={openMonitorModal}
          fetchData={onUpdate}
          configuration={configuration}
          handleClose={() => setOpenMonitorModal(false)}
          editMonitor={null}
        />
      </CardContent>
    </Card>
  );
};

export default ConfigurationMonitors;