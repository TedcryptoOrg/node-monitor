import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  LinearProgress,
} from '@mui/material';
import { useApi } from "../../context/ApiProvider";
import ConfigurationsList from './ConfigurationsList';
import ConfigurationHeader from './ConfigurationHeader';
import ConfigurationFilters from './ConfigurationFilters';
import { ApiConfiguration } from '../../types/ApiConfiguration';
import { useConfigurationFilters } from './hooks/useConfigurationFilters';
import { useCompanies } from './hooks/useCompanies';

const ConfigurationsComponent: React.FC = () => {
  const api = useApi();
  const [isLoading, setIsLoading] = useState(true);
  const [configurations, setConfigurations] = useState<ApiConfiguration[]>([]);
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

  const fetchData = useCallback(() => {
    setIsLoading(true);
    api?.get(`/configurations`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch configurations');
        }
        return response.body;
      })
      .then(data => {
        setConfigurations(data);
      })
      .catch((error) => {
        console.error('Error:', error);
        setConfigurations([]);
      })
      .finally(() => setIsLoading(false));
  }, [api]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Box>
      <ConfigurationHeader onConfigurationAdded={fetchData} />
      
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

        {isLoading ? (
          <Box sx={{ width: '100%' }}>
            <LinearProgress />
          </Box>
        ) : (
          <ConfigurationsList 
            configurations={filteredConfigurations}
            onConfigurationUpdated={fetchData}
          />
        )}
      </Box>
    </Box>
  );
};

export default ConfigurationsComponent;