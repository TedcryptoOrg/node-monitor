import React, { useState } from 'react';
import { Box, Button, Typography, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { UpsertCompanyModal } from './modals/UpsertCompanyModal';

interface CompanyHeaderProps {
  onCompanyAdded: () => void;
}

export const CompanyHeader: React.FC<CompanyHeaderProps> = ({ onCompanyAdded }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <Box>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
            Companies
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Manage organizations and their settings
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
            Add Company
          </Button>
        </Grid>
      </Grid>

      <UpsertCompanyModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        company={null}
        onSuccess={onCompanyAdded}
      />
    </Box>
  );
};