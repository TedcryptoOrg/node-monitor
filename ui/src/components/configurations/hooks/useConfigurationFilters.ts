import { useState, useEffect } from 'react';
import { ApiConfiguration } from '../../../types/ApiConfiguration';

export const useConfigurationFilters = (configurations: ApiConfiguration[]) => {
  const [search, setSearch] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [filteredConfigurations, setFilteredConfigurations] = useState<ApiConfiguration[]>(configurations);

  useEffect(() => {
    let filtered = [...configurations];

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(config => 
        config.name.toLowerCase().includes(searchLower) ||
        config.chain.toLowerCase().includes(searchLower)
      );
    }

    // Apply company filter
    if (selectedCompany) {
      filtered = filtered.filter(config => {
        // Handle both cases where company might be in the root or nested
        const companyId = config.company?.id || config?.company_id;
        return companyId?.toString() === selectedCompany;
      });
    }

    // Apply status filter
    if (selectedStatus) {
      filtered = filtered.filter(config => {
        const hasError = config.monitors?.some(m => !m.status);
        const hasWarning = config.monitors?.some(m => m.status && m.last_error);
        
        switch (selectedStatus) {
          case 'healthy':
            return !hasError && !hasWarning;
          case 'warning':
            return !hasError && hasWarning;
          case 'error':
            return hasError;
          default:
            return true;
        }
      });
    }

    setFilteredConfigurations(filtered);
  }, [configurations, search, selectedCompany, selectedStatus]);

  return {
    search,
    setSearch,
    selectedCompany,
    setSelectedCompany,
    selectedStatus,
    setSelectedStatus,
    filteredConfigurations
  };
};