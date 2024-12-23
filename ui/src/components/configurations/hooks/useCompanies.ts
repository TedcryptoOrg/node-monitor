import { useState, useCallback, useEffect } from 'react';
import { Company } from '../../../types/Company';
import { useApi } from '../../../context/ApiProvider';

export const useCompanies = () => {
  const api = useApi();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCompanies = useCallback(async () => {
    try {
      const response = await api?.get('/companies');
      if (response?.ok) {
        setCompanies(response.body.results || []);
      }
    } catch (error) {
      console.error('Error fetching companies:', error);
      setCompanies([]);
    } finally {
      setIsLoading(false);
    }
  }, [api]);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  return {
    companies,
    isLoading,
    fetchCompanies
  };
};