import React, { useState } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { User } from '../../types/User';
import UserCard from './UserCard';
import UpsertUserModal from './UpsertUserModal';

interface UserListProps {
  users: User[];
  onDelete: (id: number) => void;
  onUpdate: () => void;
}

const UserList: React.FC<UserListProps> = ({ users, onDelete, onUpdate }) => {
  const [editUser, setEditUser] = useState<User | null>(null);
  const [openModal, setOpenModal] = useState(false);

  if (users.length === 0) {
    return (
      <Box 
        sx={{ 
          textAlign: 'center',
          py: 8,
          bgcolor: 'background.paper',
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No users found
        </Typography>
        <Typography color="text.secondary">
          Add your first user to get started
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Grid container spacing={3}>
        {users.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <UserCard
              user={user}
              onEdit={(user) => {
                setEditUser(user);
                setOpenModal(true);
              }}
              onDelete={onDelete}
            />
          </Grid>
        ))}
      </Grid>

      <UpsertUserModal
        open={openModal}
        handleClose={() => {
          setEditUser(null);
          setOpenModal(false);
        }}
        user={editUser}
        onSuccess={onUpdate}
      />
    </>
  );
};

export default UserList;