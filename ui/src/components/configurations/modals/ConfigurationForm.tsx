import React from 'react';
import { TextField, FormControlLabel, Switch, Box } from '@mui/material';
import Chains from '../../Chains';

interface ConfigurationFormProps {
  name: string;
  setName: (name: string) => void;
  chain: string;
  setChain: (chain: string) => void;
  isEnabled: boolean;
  setIsEnabled: (enabled: boolean) => void;
}

const ConfigurationForm: React.FC<ConfigurationFormProps> = ({
  name,
  setName,
  chain,
  setChain,
  isEnabled,
  setIsEnabled,
}) => {
  return (
    <Box sx={{ mt: 2 }}>
      <TextField
        autoFocus
        fullWidth
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        sx={{ mb: 3 }}
      />

      <Box sx={{ mb: 3 }}>
        <Chains chain={chain} setChain={setChain} />
      </Box>

      <FormControlLabel
        control={
          <Switch
            checked={isEnabled}
            onChange={(e) => setIsEnabled(e.target.checked)}
            color="primary"
          />
        }
        label="Enabled"
      />
    </Box>
  );
};

export default ConfigurationForm;