import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  LinearProgress,
} from '@mui/material';
import { User } from '../../../types/User';
import UserTableRow from './UserTableRow';

interface UserTableProps {
  users: User[];
  isLoading: boolean;
  onDelete: (user: User) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, isLoading, onDelete }) => {
  if (isLoading) {
    return <LinearProgress />;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Is Active</TableCell>
            <TableCell>Is Admin</TableCell>
            <TableCell>Is Super Admin</TableCell>
            <TableCell>Company</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <UserTableRow 
              key={user.id} 
              user={user} 
              onDelete={onDelete}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;