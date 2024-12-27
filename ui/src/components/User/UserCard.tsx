import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Chip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { User } from '../../types/User';
import BooleanIcon from '../Shared/BooleanIcon';
import CompanyLink from '../Company/CompanyLink';

interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onEdit, onDelete }) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="h2" gutterBottom fontWeight={600}>
          {user.username}
        </Typography>
        
        <Box sx={{ mb: 2 }}>
          {user.is_super_admin && (
            <Chip 
              label="Super Admin"
              color="error"
              size="small"
              sx={{ mr: 1 }}
            />
          )}
          {user.is_admin && (
            <Chip 
              label="Admin"
              color="warning"
              size="small"
            />
          )}
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Company: <CompanyLink company={user.company} />
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Status:
            </Typography>
            <BooleanIcon value={user.is_active} />
          </Box>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
        <Tooltip title="Edit User">
          <IconButton size="small" onClick={() => onEdit(user)} color="primary">
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete User">
          <IconButton size="small" onClick={() => onDelete(user.id)} color="error">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default UserCard;