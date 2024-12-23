import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Grid,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import UpsertConfigurationModal from './UpsertConfigurationModal';

interface ConfigurationHeaderProps {
  onConfigurationAdded: () => void;
}

const ConfigurationHeader: React.FC<ConfigurationHeaderProps> = ({ onConfigurationAdded }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <Box>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
            Node Configurations
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Manage your node monitoring configurations
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenModal(true)}
            sx={{
              background: 'linear-gradient(45deg, #2D3436 30%, #00B894 90%)',
              color: 'white',
              boxShadow: '0 3px 5px 2px rgba(0, 184, 148, .3)',
            }}
          >
            Add Configuration
          </Button>
        </Grid>
      </Grid>

      <UpsertConfigurationModal
        open={openModal}
        fetchData={onConfigurationAdded}
        configuration={null}
        handleClose={() => setOpenModal(false)}
      />
    </Box>
  );
};

export default ConfigurationHeader;