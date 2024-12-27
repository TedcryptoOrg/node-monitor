import React, { useState, useCallback, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import ConfigurationsList from './ConfigurationsList';
import ConfigurationHeader from './ConfigurationHeader';
import ConfigurationFilters from './ConfigurationFilters';
import { useConfigurationFilters } from './hooks/useConfigurationFilters';
import { useCompanies } from './hooks/useCompanies';
import { useApi } from '../../context/ApiProvider';
import { ApiConfiguration } from '../../types/ApiConfiguration';

const ConfigurationsComponent: React.FC = () => {
  const api = useApi();
  const [configurations, setConfigurations] = useState<ApiConfiguration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { companies } = useCompanies();
  
  const {
    search,
    setSearch,
    selectedCompany,
    setSelectedCompany,
    selectedStatus,
    setSelectedStatus,
    filteredConfigurations
  } = useConfigurationFilters(configurations);

  const fetchConfigurations = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await api?.get('/configurations');
      if (response?.ok) {
        setConfigurations(response.body);
      }
    } catch (error) {
      console.error('Error fetching configurations:', error);
    } finally {
      setIsLoading(false);
    }
  }, [api]);

  useEffect(() => {
    fetchConfigurations();
  }, [fetchConfigurations]);

  return (
    <Box>
      <ConfigurationHeader onConfigurationAdded={fetchConfigurations} />
      
      <Box sx={{ mt: 4 }}>
        <ConfigurationFilters
          search={search}
          setSearch={setSearch}
          selectedCompany={selectedCompany}
          setSelectedCompany={setSelectedCompany}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          companies={companies}
        />

        <ConfigurationsList 
          configurations={filteredConfigurations}
          onConfigurationUpdated={fetchConfigurations}
          isLoading={isLoading}
        />
      </Box>
    </Box>
  );
};

export default ConfigurationsComponent;