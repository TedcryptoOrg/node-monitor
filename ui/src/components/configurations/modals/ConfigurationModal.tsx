import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';
import ConfigurationForm from './ConfigurationForm';
import { ApiConfiguration } from '../../../types/ApiConfiguration';

interface ConfigurationModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  name: string;
  setName: (name: string) => void;
  chain: string;
  setChain: (chain: string) => void;
  isEnabled: boolean;
  setIsEnabled: (enabled: boolean) => void;
  configuration: ApiConfiguration | null;
}

const ConfigurationModal: React.FC<ConfigurationModalProps> = ({
  open,
  onClose,
  onSubmit,
  title,
  name,
  setName,
  chain,
  setChain,
  isEnabled,
  setIsEnabled,
  configuration,
}) => {
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
        }
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Typography variant="h6" component="h2" fontWeight={600}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {configuration ? 'Update configuration details' : 'Add a new node configuration'}
        </Typography>
      </DialogTitle>

      <DialogContent>
        <ConfigurationForm
          name={name}
          setName={setName}
          chain={chain}
          setChain={setChain}
          isEnabled={isEnabled}
          setIsEnabled={setIsEnabled}
        />
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={onSubmit} variant="contained">
          {configuration ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfigurationModal;