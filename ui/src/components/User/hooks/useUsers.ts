import { useState, useCallback, useEffect } from 'react';
import { User } from '../../../types/User';
import { useApi } from '../../../context/ApiProvider';
import { enqueueSnackbar } from 'notistack';

export const useUsers = () => {
  const api = useApi();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api?.get('/users');
      if (!response?.ok) {
        throw new Error(response?.body?.message || 'Failed to fetch users');
      }
      setUsers(response.body.results ?? []);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      console.error('Error fetching users:', errorMessage);
      enqueueSnackbar(`Failed to fetch users: ${errorMessage}`, { variant: 'error' });
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  }, [api]);

  const deleteUser = useCallback(async (id: number) => {
    try {
      const response = await api?.delete(`/users/${id}`);
      if (!response?.ok) {
        throw new Error(response?.body?.message || 'Failed to delete user');
      }
      enqueueSnackbar('User deleted successfully!', { variant: 'success' });
      await fetchUsers();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      console.error('Error deleting user:', errorMessage);
      enqueueSnackbar(`Failed to delete user: ${errorMessage}`, { variant: 'error' });
    }
  }, [api, fetchUsers]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    isLoading,
    fetchUsers,
    deleteUser,
  };
};