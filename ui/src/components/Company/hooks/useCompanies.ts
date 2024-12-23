import { useState, useCallback, useEffect } from 'react';
import { Company } from '../../../types/Company';
import { useApi } from '../../../context/ApiProvider';
import { enqueueSnackbar } from 'notistack';

export const useCompanies = () => {
  const api = useApi();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCompanies = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api?.get('/companies');
      if (!response?.ok) {
        throw new Error(response?.body?.message || 'Failed to fetch companies');
      }
      setCompanies(response.body.results ?? []);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      console.error('Error fetching companies:', errorMessage);
      enqueueSnackbar(`Failed to fetch companies: ${errorMessage}`, { variant: 'error' });
      setCompanies([]);
    } finally {
      setIsLoading(false);
    }
  }, [api]);

  const deleteCompany = useCallback(async (id: number) => {
    try {
      const response = await api?.delete(`/companies/${id}`);
      if (!response?.ok) {
        throw new Error(response?.body?.message || 'Failed to delete company');
      }
      enqueueSnackbar('Company deleted successfully!', { variant: 'success' });
      await fetchCompanies();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      console.error('Error deleting company:', errorMessage);
      enqueueSnackbar(`Failed to delete company: ${errorMessage}`, { variant: 'error' });
    }
  }, [api, fetchCompanies]);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  return {
    companies,
    isLoading,
    fetchCompanies,
    deleteCompany,
  };
};