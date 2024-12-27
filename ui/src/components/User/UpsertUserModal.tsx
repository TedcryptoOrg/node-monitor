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
import { User, UserInput } from '../../types/User';
import CompanyAutocomplete from '../Company/CompanyAutocomplete';
import { useApi } from '../../context/ApiProvider';
import { enqueueSnackbar } from 'notistack';

interface UpsertUserModalProps {
  open: boolean;
  handleClose: () => void;
  user: User | null;
  onSuccess: () => void;
}

const UpsertUserModal: React.FC<UpsertUserModalProps> = ({
  open,
  handleClose,
  user,
  onSuccess,
}) => {
  const api = useApi();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [company, setCompany] = useState<any>(null);

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setIsActive(user.is_active);
      setIsAdmin(user.is_admin);
      setIsSuperAdmin(user.is_super_admin);
      setCompany(user.company);
    } else {
      setUsername('');
      setPassword('');
      setIsActive(true);
      setIsAdmin(false);
      setIsSuperAdmin(false);
      setCompany(null);
    }
  }, [user]);

  const handleSubmit = async () => {
    if (!company) {
      enqueueSnackbar('Please select a company', { variant: 'error' });
      return;
    }

    if (!user && !password) {
      enqueueSnackbar('Password is required for new users', { variant: 'error' });
      return;
    }

    const userData: UserInput = {
      username,
      is_active: isActive,
      is_admin: isAdmin,
      is_super_admin: isSuperAdmin,
      company_id: company.id,
      ...(password && { raw_password: password }),
    };

    try {
      const response = await api?.[user ? 'put' : 'post'](
        user ? `/users/${user.id}` : '/users',
        userData
      );

      if (!response?.ok) {
        throw new Error(response?.body?.message || 'Failed to save user');
      }

      enqueueSnackbar(`User ${user ? 'updated' : 'created'} successfully`, {
        variant: 'success',
      });
      onSuccess();
      handleClose();
    } catch (error) {
      console.error('Error:', error);
      enqueueSnackbar(`Failed to ${user ? 'update' : 'create'} user`, {
        variant: 'error',
      });
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6" component="div" fontWeight={600}>
          {user ? 'Edit' : 'Add'} User
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            required
          />

          {!user && (
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
            />
          )}

          <CompanyAutocomplete
            company={company}
            setCompany={setCompany}
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

          <FormControlLabel
            control={
              <Switch
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
            }
            label="Admin"
          />

          <FormControlLabel
            control={
              <Switch
                checked={isSuperAdmin}
                onChange={(e) => setIsSuperAdmin(e.target.checked)}
              />
            }
            label="Super Admin"
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={handleClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained">
          {user ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpsertUserModal;