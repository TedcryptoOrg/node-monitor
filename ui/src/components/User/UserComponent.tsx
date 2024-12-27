import React from 'react';
import { Box } from '@mui/material';
import UserHeader from './UserHeader';
import UserList from './UserList';
import { useUsers } from './hooks/useUsers';

const UserComponent: React.FC = () => {
  const { users, isLoading, deleteUser, fetchUsers } = useUsers();

  return (
    <Box>
      <UserHeader />
      <Box sx={{ mt: 4 }}>
        <UserList 
          users={users}
          onDelete={deleteUser}
          onUpdate={fetchUsers}
        />
      </Box>
    </Box>
  );
};

export default UserComponent;