import React from 'react';
import { TableRow, TableCell, Button } from '@mui/material';
import { User } from '../../../types/User';
import BooleanIcon from '../../Shared/BooleanIcon';
import CompanyLink from '../../Company/CompanyLink';
import UserLink from '../UserLink';

interface UserTableRowProps {
  user: User;
  onDelete: (user: User) => void;
}

const UserTableRow: React.FC<UserTableRowProps> = ({ user, onDelete }) => {
  return (
    <TableRow>
      <TableCell>{user.id}</TableCell>
      <TableCell>
        <UserLink user={user} />
      </TableCell>
      <TableCell>
        <BooleanIcon value={user.is_active} />
      </TableCell>
      <TableCell>
        <BooleanIcon value={user.is_admin} />
      </TableCell>
      <TableCell>
        <BooleanIcon value={user.is_super_admin} />
      </TableCell>
      <TableCell>
        <CompanyLink company={user.company} />
      </TableCell>
      <TableCell>
        <Button 
          variant="contained" 
          color="error" 
          onClick={() => onDelete(user)}
        >
          Delete
        </Button>
        <Button 
          variant="contained" 
          color="warning" 
          href={`/users/${user.id}/edit`}
        >
          Edit
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default UserTableRow;