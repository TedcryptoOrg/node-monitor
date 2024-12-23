import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControlLabel,
  Switch,
  Box,
  Typography,
} from '@mui/material';
import { Company, CompanyInput } from '../../types/Company';
import { useApi } from '../../context/ApiProvider';
import { enqueueSnackbar } from 'notistack';

interface UpsertCompanyModalProps {
  open: boolean;
  handleClose: () => void;
  company: Company | null;
  onSuccess: () => void;
}

export const UpsertCompanyModal: React.FC<UpsertCompanyModalProps> = ({
  open,
  handleClose,
  company,
  onSuccess,
}) => {
  const api = useApi();
  const [name, setName] = useState('');
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (company) {
      setName(company.name);
      setIsActive(company.is_active);
    } else {
      setName('');
      setIsActive(true);
    }
  }, [company]);

  const handleSubmit = async () => {
    const companyData: CompanyInput = {
      name,
      is_active: isActive,
    };

    try {
      const response = await api?.[company ? 'put' : 'post'](
        company ? `/companies/${company.id}` : '/companies',
        companyData
      );

      if (!response?.ok) {
        throw new Error(response?.body?.message || 'Failed to save company');
      }

      enqueueSnackbar(`Company ${company ? 'updated' : 'created'} successfully`, {
        variant: 'success',
      });
      onSuccess();
      handleClose();
    } catch (error) {
      console.error('Error:', error);
      enqueueSnackbar(`Failed to ${company ? 'update' : 'create'} company`, {
        variant: 'error',
      });
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6" component="div" fontWeight={600}>
          {company ? 'Edit' : 'Add'} Company
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
          />

          <FormControlLabel
            control={
              <Switch
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
              />
            }
            label="Active"
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={handleClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained">
          {company ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};