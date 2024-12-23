import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
} from '@mui/material';
import { ApiConfiguration } from '../../../types/ApiConfiguration';
import UpsertServerModal from '../../servers/UpsertServerModal';
import ServersTable from './ServersTable';
import AddIcon from '@mui/icons-material/Add';

interface ConfigurationServersProps {
  configuration: ApiConfiguration;
  onUpdate: () => void;
}

const ConfigurationServers: React.FC<ConfigurationServersProps> = ({
  configuration,
  onUpdate,
}) => {
  const [openServerModal, setOpenServerModal] = useState(false);

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" fontWeight={600}>
            Servers
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenServerModal(true)}
            size="small"
          >
            Add Server
          </Button>
        </Box>

        <ServersTable 
          servers={configuration.servers || []}
          onUpdate={onUpdate}
        />

        <UpsertServerModal
          open={openServerModal}
          fetchData={onUpdate}
          configurationId={configuration.id}
          handleClose={() => setOpenServerModal(false)}
        />
      </CardContent>
    </Card>
  );
};

export default ConfigurationServers;